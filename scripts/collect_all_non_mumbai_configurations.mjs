import fs from 'fs';
import path from 'path';

// Load non-Mumbai registries
import { PUNE_REGISTRY_PROJECTS } from '../src/data/puneProjectsRegistry.js';
import { BANGALORE_REGISTRY_PROJECTS } from '../src/data/bangaloreProjectsRegistry.js';
import { HYDERABAD_REGISTRY_PROJECTS } from '../src/data/hyderabadProjectsRegistry.js';
import { NOIDA_REGISTRY_PROJECTS } from '../src/data/noidaProjectsRegistry.js';
import { NAGPUR_REGISTRY_PROJECTS } from '../src/data/nagpurProjectsRegistry.js';
import { COIMBATORE_REGISTRY_PROJECTS } from '../src/data/coimbatoreProjectsRegistry.js';
import { GOA_REGISTRY_PROJECTS } from '../src/data/goaProjectsRegistry.js';
import { TRIVANDRUM_REGISTRY_PROJECTS } from '../src/data/trivandrumProjectsRegistry.js';
import { DELHI_REGISTRY_PROJECTS } from '../src/data/delhiProjectsRegistry.js';
import { CALICUT_REGISTRY_PROJECTS } from '../src/data/calicutProjectsRegistry.js';
import { THRISSUR_REGISTRY_PROJECTS } from '../src/data/thrissurProjectsRegistry.js';

const ALL_NON_MUMBAI = [
  ...PUNE_REGISTRY_PROJECTS,
  ...BANGALORE_REGISTRY_PROJECTS,
  ...HYDERABAD_REGISTRY_PROJECTS,
  ...NOIDA_REGISTRY_PROJECTS,
  ...NAGPUR_REGISTRY_PROJECTS,
  ...COIMBATORE_REGISTRY_PROJECTS,
  ...GOA_REGISTRY_PROJECTS,
  ...TRIVANDRUM_REGISTRY_PROJECTS,
  ...DELHI_REGISTRY_PROJECTS,
  ...CALICUT_REGISTRY_PROJECTS,
  ...THRISSUR_REGISTRY_PROJECTS
];

const CACHE_FILE = 'scratch/non_mumbai_configurations_cache.json';

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
      const timeoutId = setTimeout(() => controller.abort(), 10000);
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
      if (attempt === maxRetries) return null;
      await new Promise(r => setTimeout(r, 500));
    }
  }
  return null;
}

function synthesizeFallback(p) {
  const flatTypes = (p.flatTypes || p.configuration || "Apartment")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const unitPlans = flatTypes.map((ft, idx) => ({
    bhk: ft,
    variants: [
      {
        id: `fb-${p.id}-${idx}`,
        bhk: ft,
        carpetArea: p.carpetArea || "On Request",
        carpetAreaDisplay: p.carpetArea ? `${p.carpetArea}` : "On Request",
        builtUpArea: p.builtUpArea || null,
        price: p.price || "On Request",
        actualPrice: p.priceNumeric || 0,
        propertyType: p.type || "Apartment",
        plan2D: null,
        plan3D: null,
        twoDOriginalUrl: null,
        threeDOriginalUrl: null,
        has2D: false,
        has3D: false
      }
    ]
  }));

  return {
    projectId: p.id,
    slug: p.slug,
    name: p.name,
    city: p.city,
    officialSourceUrl: p.referenceUrl || null,
    verificationStatus: 'SYNTHESIZED_FALLBACK',
    lastVerified: new Date().toISOString().split('T')[0],
    planTypes: ['unit'],
    masterPlans: [],
    sitePlans: [],
    unitPlans,
    configurationSummary: []
  };
}

async function collectAllNonMumbai() {
  const totalProjects = ALL_NON_MUMBAI.length;
  console.log(`Starting Non-Mumbai Configurations Collection for all ${totalProjects} projects...`);

  const pending = ALL_NON_MUMBAI.filter(p => !cache[p.id]);
  console.log(`Pending projects to process: ${pending.length} (Already cached: ${Object.keys(cache).length})`);

  const concurrency = 25;
  let currentIndex = 0;
  let processedSinceSave = 0;
  let successCount = 0;
  let fallbackCount = 0;
  const startTime = Date.now();

  async function worker(workerId) {
    while (currentIndex < pending.length) {
      const idx = currentIndex++;
      const p = pending[idx];
      const pid = p.id;
      const url = p.referenceUrl;

      if (!url) {
        cache[pid] = synthesizeFallback(p);
        fallbackCount++;
        processedSinceSave++;
        continue;
      }

      try {
        const html = await fetchProjectWithRetry(url);
        if (!html) {
          cache[pid] = synthesizeFallback(p);
          fallbackCount++;
          processedSinceSave++;
          continue;
        }

        const projectData = extractFromHtml(html);
        if (!projectData) {
          cache[pid] = synthesizeFallback(p);
          fallbackCount++;
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
          city: p.city,
          officialSourceUrl: url,
          verificationStatus: unitPlans.length > 0 ? 'VERIFIED' : 'PARTIALLY_VERIFIED',
          lastVerified: new Date().toISOString().split('T')[0],
          planTypes,
          masterPlans,
          sitePlans,
          unitPlans: unitPlans.length > 0 ? unitPlans : synthesizeFallback(p).unitPlans,
          configurationSummary: projectData.configuration_summary || []
        };

        successCount++;
        processedSinceSave++;

      } catch (err) {
        cache[pid] = synthesizeFallback(p);
        fallbackCount++;
        processedSinceSave++;
      }

      // Save cache every 50 records
      if (processedSinceSave >= 50) {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
        const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
        const rate = ((successCount + fallbackCount) / Math.max(1, elapsedSec)).toFixed(2);
        console.log(`[Progress] Total Cached: ${Object.keys(cache).length}/${totalProjects} | Verified: ${successCount}, Fallback: ${fallbackCount} | Rate: ${rate} proj/s (${elapsedSec}s elapsed)`);
        processedSinceSave = 0;
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, (_, i) => worker(i)));

  // Final cache save
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`Collection complete! Total cached projects: ${Object.keys(cache).length}`);
}

collectAllNonMumbai();
