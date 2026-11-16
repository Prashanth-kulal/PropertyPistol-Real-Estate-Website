import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { MUMBAI_REGISTRY_PROJECTS } from '../src/data/mumbaiProjectsRegistry.js';

// Stage A Representative Projects
const STAGE_A_PIDS = [381, 382, 384, 385, 400, 402, 409, 411, 423, 427, 431, 437, 451, 453, 461, 463, 465, 484, 564, 8794, 9558, 20550];

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

async function runStageA() {
  console.log(`Starting Stage A processing for ${STAGE_A_PIDS.length} representative projects...`);

  const downloadQueue = [];
  const configsMap = {};

  for (const pid of STAGE_A_PIDS) {
    const regProj = MUMBAI_REGISTRY_PROJECTS.find(p => p.id === pid) || { id: pid, slug: `project-${pid}`, referenceUrl: `https://www.propertypistol.com/projects/pid-${pid}` };
    const url = regProj.referenceUrl;
    console.log(`\n[Stage A] Fetching PID ${pid}: ${regProj.slug} (${url})...`);

    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });
      if (!res.ok) {
        console.warn(`  Failed HTTP ${res.status} for PID ${pid}`);
        continue;
      }
      const html = await res.text();
      const p = extractFromHtml(html);
      if (!p) {
        console.warn(`  Could not parse Nuxt state for PID ${pid}`);
        continue;
      }

      const projDir = path.join('public', 'projects', String(pid), 'configurations');
      const unitPlansDir = path.join(projDir, 'unit-plans');
      const masterPlansDir = path.join(projDir, 'master-plans');
      const sitePlansDir = path.join(projDir, 'site-plans');

      fs.mkdirSync(unitPlansDir, { recursive: true });
      fs.mkdirSync(masterPlansDir, { recursive: true });
      fs.mkdirSync(sitePlansDir, { recursive: true });

      const projectManifest = {
        projectId: pid,
        projectName: p.project_name || regProj.name,
        slug: regProj.slug || p.website_url,
        officialSourceUrl: url,
        lastVerified: new Date().toISOString().split('T')[0],
        verificationStatus: 'VERIFIED',
        masterPlans: [],
        sitePlans: [],
        unitPlans: []
      };

      // 1. Master Plans
      if (p.master_plan_url && Array.isArray(p.master_plan_url)) {
        p.master_plan_url.forEach((mpUrl, idx) => {
          if (!mpUrl) return;
          const fileName = `master-plan-${String(idx + 1).padStart(2, '0')}.webp`;
          const localRelPath = `/projects/${pid}/configurations/master-plans/${fileName}`;
          const localAbsPath = path.join(masterPlansDir, fileName);

          projectManifest.masterPlans.push({
            id: idx + 1,
            title: `Master Plan ${idx + 1}`,
            path: localRelPath,
            originalUrl: mpUrl,
            downloaded: false
          });

          downloadQueue.push({
            url: mpUrl,
            dest: localAbsPath,
            type: 'master_plan'
          });
        });
      }

      // 2. Site / Floor Plans
      if (p.floor_plan_urls && Array.isArray(p.floor_plan_urls)) {
        p.floor_plan_urls.forEach((fpUrl, idx) => {
          if (!fpUrl) return;
          const fileName = `site-plan-${String(idx + 1).padStart(2, '0')}.webp`;
          const localRelPath = `/projects/${pid}/configurations/site-plans/${fileName}`;
          const localAbsPath = path.join(sitePlansDir, fileName);

          projectManifest.sitePlans.push({
            id: idx + 1,
            title: `Layout / Site Plan ${idx + 1}`,
            path: localRelPath,
            originalUrl: fpUrl,
            downloaded: false
          });

          downloadQueue.push({
            url: fpUrl,
            dest: localAbsPath,
            type: 'site_plan'
          });
        });
      }

      // 3. Unit Plans & Area Variants
      if (p.unit_plan && Array.isArray(p.unit_plan)) {
        for (const up of p.unit_plan) {
          const bhkLabel = up.label || 'Apartment';
          const bhkSlug = slugify(bhkLabel);

          const bhkGroup = {
            bhk: bhkLabel,
            variants: []
          };

          if (up.data && Array.isArray(up.data)) {
            for (const v of up.data) {
              const areaSqft = v.carpet_area || null;
              const areaFolder = areaSqft ? `${areaSqft}-sqft` : `variant-${v.id}`;
              const variantDir = path.join(unitPlansDir, bhkSlug, areaFolder);

              let plan2DLocalPath = null;
              let plan3DLocalPath = null;

              if (v.two_d_url) {
                fs.mkdirSync(variantDir, { recursive: true });
                const fileName2D = 'plan-2d.webp';
                plan2DLocalPath = `/projects/${pid}/configurations/unit-plans/${bhkSlug}/${areaFolder}/${fileName2D}`;
                const dest2D = path.join(variantDir, fileName2D);
                downloadQueue.push({ url: v.two_d_url, dest: dest2D, type: '2d_plan' });
              }

              if (v.three_d_url) {
                fs.mkdirSync(variantDir, { recursive: true });
                const fileName3D = 'plan-3d.webp';
                plan3DLocalPath = `/projects/${pid}/configurations/unit-plans/${bhkSlug}/${areaFolder}/${fileName3D}`;
                const dest3D = path.join(variantDir, fileName3D);
                downloadQueue.push({ url: v.three_d_url, dest: dest3D, type: '3d_plan' });
              }

              bhkGroup.variants.push({
                id: v.id,
                bhk: v.flat_type || bhkLabel,
                carpetArea: areaSqft,
                carpetAreaDisplay: areaSqft ? `${areaSqft} sq.ft` : 'On Request',
                builtUpArea: v.built_up_area || null,
                price: v.price || 'On Request',
                actualPrice: v.actual_price || 0,
                propertyType: v.property_type || 'Apartment',
                plan2D: plan2DLocalPath,
                plan3D: plan3DLocalPath,
                twoDOriginalUrl: v.two_d_url || null,
                threeDOriginalUrl: v.three_d_url || null,
                has2D: Boolean(v.two_d_url || plan2DLocalPath),
                has3D: Boolean(v.three_d_url || plan3DLocalPath)
              });
            }
          }

          projectManifest.unitPlans.push(bhkGroup);
        }
      }

      // Determine active plan types
      const planTypes = [];
      if (projectManifest.unitPlans.length > 0) planTypes.push('unit');
      if (projectManifest.masterPlans.length > 0) planTypes.push('master');
      if (projectManifest.sitePlans.length > 0) planTypes.push('site');
      projectManifest.planTypes = planTypes;

      // Write per-project manifest.json
      fs.writeFileSync(
        path.join(projDir, 'manifest.json'),
        JSON.stringify(projectManifest, null, 2),
        'utf8'
      );

      configsMap[pid] = projectManifest;
      console.log(`  Processed PID ${pid}: ${projectManifest.unitPlans.length} BHK groups, ${projectManifest.masterPlans.length} master plans, ${projectManifest.sitePlans.length} site plans`);
    } catch (err) {
      console.error(`  Error processing PID ${pid}:`, err.message);
    }
  }

  // Save download plan for python watermarker
  fs.writeFileSync(
    'scratch/stage_a_download_plan.json',
    JSON.stringify(downloadQueue, null, 2),
    'utf8'
  );
  console.log(`\nGenerated download queue of ${downloadQueue.length} plan images.`);

  // Save intermediate configs
  fs.writeFileSync(
    'scratch/stage_a_configs.json',
    JSON.stringify(configsMap, null, 2),
    'utf8'
  );
}

runStageA();
