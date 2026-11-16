import fs from 'fs';
import path from 'path';
import { MUMBAI_REGISTRY_PROJECTS } from '../src/data/mumbaiProjectsRegistry.js';

const CACHE_FILE = 'scratch/mumbai_configurations_cache.json';
const DOWNLOAD_PLAN_FILE = 'scratch/mumbai_plan_images_download_plan.json';

// Load existing cache if present
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log(`Loaded existing cache with ${Object.keys(cache).length} projects.`);
  } catch (e) {
    console.warn('Failed to parse existing cache, starting fresh.');
  }
}

function extractFromHtml(html) {
  const scriptMatches = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  const targetScript = scriptMatches.find(m => m[1].includes('"ShallowReactive"') && m[1].includes('"project"'));
  if (!targetScript) return null;

  try {
    const payload = JSON.parse(targetScript[1].trim());

    function unflatten(data) {
      const memo = new Map();

      function resolve(val) {
        if (typeof val === 'number') {
          if (val >= 0 && val < data.length) {
            if (memo.has(val)) return memo.get(val);
            memo.set(val, `[Ref:${val}]`);
            const res = resolveRaw(data[val]);
            memo.set(val, res);
            return res;
          }
          return val;
        }
        return resolveRaw(val);
      }

      function resolveRaw(item) {
        if (item === null || item === undefined) return item;
        if (Array.isArray(item)) {
          if (item[0] === 'ShallowReactive' || item[0] === 'Reactive') {
            return resolve(item[1]);
          }
          return item.map(x => resolve(x));
        }
        if (typeof item === 'object') {
          const out = {};
          for (const [k, v] of Object.entries(item)) {
            out[k] = resolve(v);
          }
          return out;
        }
        return item;
      }

      return resolve(1);
    }

    const root = unflatten(payload);
    return root?.data?.project?.project || root?.data?.project;
  } catch (e) {
    return null;
  }
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function fetchProjectWithRetry(url, maxRetries = 2) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        return await res.text();
      }
      if (res.status === 404) return null;
    } catch (e) {
      if (attempt === maxRetries) throw e;
      await new Promise(r => setTimeout(r, 600));
    }
  }
  return null;
}

async function collectAllMumbai() {
  const totalProjects = MUMBAI_REGISTRY_PROJECTS.length;
  console.log(`Starting Mumbai Configurations Collection for all ${totalProjects} projects...`);

  const pending = MUMBAI_REGISTRY_PROJECTS.filter(p => !cache[p.id]);
  console.log(`Pending projects to process: ${pending.length} (Already cached: ${Object.keys(cache).length})`);

  const concurrency = 12;
  let currentIndex = 0;
  let processedSinceSave = 0;
  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();

  async function worker(workerId) {
    while (currentIndex < pending.length) {
      const idx = currentIndex++;
      const p = pending[idx];
      const pid = p.id;
      const url = p.referenceUrl;

      try {
        const html = await fetchProjectWithRetry(url);
        if (!html) {
          cache[pid] = {
            projectId: pid,
            slug: p.slug,
            name: p.name,
            officialSourceUrl: url,
            verificationStatus: 'NOT_FOUND_OR_UNAVAILABLE',
            lastVerified: new Date().toISOString().split('T')[0],
            planTypes: ['unit'],
            masterPlans: [],
            sitePlans: [],
            unitPlans: []
          };
          failCount++;
          processedSinceSave++;
          continue;
        }

        const projectData = extractFromHtml(html);
        if (!projectData) {
          cache[pid] = {
            projectId: pid,
            slug: p.slug,
            name: p.name,
            officialSourceUrl: url,
            verificationStatus: 'UNAVAILABLE_PAYLOAD',
            lastVerified: new Date().toISOString().split('T')[0],
            planTypes: ['unit'],
            masterPlans: [],
            sitePlans: [],
            unitPlans: []
          };
          failCount++;
          processedSinceSave++;
          continue;
        }

        // Build structured project record
        const masterPlans = (projectData.master_plan_url || [])
          .filter(Boolean)
          .map((mpUrl, mpIdx) => ({
            id: mpIdx + 1,
            title: `Master Plan ${mpIdx + 1}`,
            path: `/projects/${pid}/configurations/master-plans/master-plan-${String(mpIdx + 1).padStart(2, '0')}.webp`,
            originalUrl: mpUrl
          }));

        const sitePlans = (projectData.floor_plan_urls || [])
          .filter(Boolean)
          .map((fpUrl, fpIdx) => ({
            id: fpIdx + 1,
            title: `Layout / Site Plan ${fpIdx + 1}`,
            path: `/projects/${pid}/configurations/site-plans/site-plan-${String(fpIdx + 1).padStart(2, '0')}.webp`,
            originalUrl: fpUrl
          }));

        const unitPlans = [];
        if (projectData.unit_plan && Array.isArray(projectData.unit_plan)) {
          for (const up of projectData.unit_plan) {
            const bhkLabel = up.label || 'Apartment';
            const bhkSlug = slugify(bhkLabel);

            const variants = (up.data || []).map(v => {
              const areaSqft = v.carpet_area || null;
              const areaFolder = areaSqft ? `${areaSqft}-sqft` : `variant-${v.id}`;

              return {
                id: v.id,
                bhk: v.flat_type || bhkLabel,
                carpetArea: areaSqft,
                carpetAreaDisplay: areaSqft ? `${areaSqft} sq.ft` : 'On Request',
                builtUpArea: v.built_up_area || null,
                price: v.price || 'On Request',
                actualPrice: v.actual_price || 0,
                propertyType: v.property_type || 'Apartment',
                plan2D: v.two_d_url ? `/projects/${pid}/configurations/unit-plans/${bhkSlug}/${areaFolder}/plan-2d.webp` : null,
                plan3D: v.three_d_url ? `/projects/${pid}/configurations/unit-plans/${bhkSlug}/${areaFolder}/plan-3d.webp` : null,
                twoDOriginalUrl: v.two_d_url || null,
                threeDOriginalUrl: v.three_d_url || null,
                has2D: Boolean(v.two_d_url),
                has3D: Boolean(v.three_d_url)
              };
            });

            if (variants.length > 0) {
              unitPlans.push({
                bhk: bhkLabel,
                variants
              });
            }
          }
        }

        const planTypes = [];
        if (unitPlans.length > 0) planTypes.push('unit');
        if (masterPlans.length > 0) planTypes.push('master');
        if (sitePlans.length > 0) planTypes.push('site');
        if (planTypes.length === 0) planTypes.push('unit');

        cache[pid] = {
          projectId: pid,
          slug: p.slug,
          name: projectData.project_name || p.name,
          officialSourceUrl: url,
          verificationStatus: 'VERIFIED',
          lastVerified: new Date().toISOString().split('T')[0],
          planTypes,
          masterPlans,
          sitePlans,
          unitPlans,
          configurationSummary: projectData.configuration_summary || []
        };

        successCount++;
        processedSinceSave++;

        // Save batch every 30 records
        if (processedSinceSave >= 30) {
          fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          const rate = (successCount / Math.max(1, elapsedSec)).toFixed(2);
          console.log(`[Progress] Total Cached: ${Object.keys(cache).length}/${totalProjects} | Batch Success: ${successCount}, Fail: ${failCount} | Rate: ${rate} proj/s (${elapsedSec}s elapsed)`);
          processedSinceSave = 0;
        }

      } catch (err) {
        failCount++;
        processedSinceSave++;
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, (_, i) => worker(i)));

  // Final cache save
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`\n========================================`);
  console.log(`COLLECTION COMPLETE! Total in cache: ${Object.keys(cache).length}/${totalProjects}`);
  console.log(`Success: ${successCount}, Failed: ${failCount}`);
  console.log(`========================================`);

  // Build download plan for verified images
  console.log('\nBuilding image download queue for verified plan images...');
  const downloadQueue = [];

  for (const [pidStr, proj] of Object.entries(cache)) {
    const pid = Number(pidStr);
    if (!proj || proj.verificationStatus !== 'VERIFIED') continue;

    // Master plans
    for (const mp of (proj.masterPlans || [])) {
      if (mp.originalUrl && mp.path) {
        const dest = path.join('public', mp.path.replace(/^\//, ''));
        downloadQueue.push({
          pid,
          url: mp.originalUrl,
          dest,
          type: 'master_plan'
        });
      }
    }

    // Site plans
    for (const sp of (proj.sitePlans || [])) {
      if (sp.originalUrl && sp.path) {
        const dest = path.join('public', sp.path.replace(/^\//, ''));
        downloadQueue.push({
          pid,
          url: sp.originalUrl,
          dest,
          type: 'site_plan'
        });
      }
    }

    // Unit plans
    for (const up of (proj.unitPlans || [])) {
      for (const v of (up.variants || [])) {
        if (v.twoDOriginalUrl && v.plan2D) {
          const dest = path.join('public', v.plan2D.replace(/^\//, ''));
          downloadQueue.push({
            pid,
            url: v.twoDOriginalUrl,
            dest,
            type: '2d_plan'
          });
        }
        if (v.threeDOriginalUrl && v.plan3D) {
          const dest = path.join('public', v.plan3D.replace(/^\//, ''));
          downloadQueue.push({
            pid,
            url: v.threeDOriginalUrl,
            dest,
            type: '3d_plan'
          });
        }
      }
    }
  }

  fs.writeFileSync(DOWNLOAD_PLAN_FILE, JSON.stringify(downloadQueue, null, 2), 'utf8');
  console.log(`Saved download plan with ${downloadQueue.length} images to ${DOWNLOAD_PLAN_FILE}.`);
}

collectAllMumbai();
