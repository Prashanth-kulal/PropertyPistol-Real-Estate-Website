import fs from 'fs';
import path from 'path';
import { HYDERABAD_REGISTRY_PROJECTS } from '../src/data/hyderabadProjectsRegistry.js';
import { BANGALORE_REGISTRY_PROJECTS } from '../src/data/bangaloreProjectsRegistry.js';

const CACHE_FILE = 'scratch/non_mumbai_configurations_cache.json';

if (!fs.existsSync(CACHE_FILE)) {
  console.error(`Cache file ${CACHE_FILE} not found!`);
  process.exit(1);
}

const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function generateDownloadPlan(cityName, registry, outputFile) {
  console.log(`\n=======================================================`);
  console.log(`Generating Download Plan for ${cityName.toUpperCase()} (${registry.length} projects)`);
  console.log(`=======================================================`);

  const downloadQueue = [];
  let total2D = 0;
  let total3D = 0;
  let totalMaster = 0;
  let totalSite = 0;

  for (const p of registry) {
    const pid = p.id;
    const c = cache[pid];
    if (!c) {
      console.warn(`Project ${pid} (${p.slug}) not found in cache!`);
      continue;
    }

    // Master plans
    if (c.masterPlans && Array.isArray(c.masterPlans)) {
      c.masterPlans.forEach((mp, idx) => {
        if (mp.originalUrl) {
          totalMaster++;
          const dest = path.join('public', 'projects', String(pid), 'configurations', 'master-plans', `master-plan-${String(idx + 1).padStart(2, '0')}.webp`);
          downloadQueue.push({
            pid,
            city: p.city || cityName,
            url: mp.originalUrl,
            dest,
            type: 'master_plan'
          });
        }
      });
    }

    // Site plans
    if (c.sitePlans && Array.isArray(c.sitePlans)) {
      c.sitePlans.forEach((sp, idx) => {
        if (sp.originalUrl) {
          totalSite++;
          const dest = path.join('public', 'projects', String(pid), 'configurations', 'site-plans', `site-plan-${String(idx + 1).padStart(2, '0')}.webp`);
          downloadQueue.push({
            pid,
            city: p.city || cityName,
            url: sp.originalUrl,
            dest,
            type: 'site_plan'
          });
        }
      });
    }

    // Unit plans (2D and 3D)
    if (c.unitPlans && Array.isArray(c.unitPlans)) {
      for (const up of c.unitPlans) {
        const bhkSlug = slugify(up.bhk || 'unit');
        for (const v of (up.variants || [])) {
          const areaSqft = v.carpetArea || null;
          const areaFolder = areaSqft ? `${areaSqft}-sqft` : `variant-${v.id}`;

          if (v.twoDOriginalUrl) {
            total2D++;
            const dest = path.join('public', 'projects', String(pid), 'configurations', 'unit-plans', bhkSlug, areaFolder, 'plan-2d.webp');
            downloadQueue.push({
              pid,
              city: p.city || cityName,
              url: v.twoDOriginalUrl,
              dest,
              type: '2d_plan'
            });
          }

          if (v.threeDOriginalUrl) {
            total3D++;
            const dest = path.join('public', 'projects', String(pid), 'configurations', 'unit-plans', bhkSlug, areaFolder, 'plan-3d.webp');
            downloadQueue.push({
              pid,
              city: p.city || cityName,
              url: v.threeDOriginalUrl,
              dest,
              type: '3d_plan'
            });
          }
        }
      }
    }
  }

  console.log(`Image Asset Audit for ${cityName.toUpperCase()}:`);
  console.log(`- 2D Floor Plans Available: ${total2D}`);
  console.log(`- 3D Floor Plans Available: ${total3D}`);
  console.log(`- Master Architectural Plans Available: ${totalMaster}`);
  console.log(`- Site / Tower Layout Plans Available: ${totalSite}`);
  console.log(`- Total Images in Download Queue: ${downloadQueue.length}`);

  fs.writeFileSync(outputFile, JSON.stringify(downloadQueue, null, 2), 'utf8');
  console.log(`Saved download plan to ${outputFile}.\n`);

  return downloadQueue;
}

if (process.argv[1].endsWith('process_city_configurations.mjs')) {
  const targetCity = process.argv[2] ? process.argv[2].toLowerCase() : 'hyderabad';
  if (targetCity === 'hyderabad') {
    generateDownloadPlan('hyderabad', HYDERABAD_REGISTRY_PROJECTS, 'scratch/hyderabad_images_download_plan.json');
  } else if (targetCity === 'bangalore') {
    generateDownloadPlan('bangalore', BANGALORE_REGISTRY_PROJECTS, 'scratch/bangalore_images_download_plan.json');
  } else {
    generateDownloadPlan('hyderabad', HYDERABAD_REGISTRY_PROJECTS, 'scratch/hyderabad_images_download_plan.json');
    generateDownloadPlan('bangalore', BANGALORE_REGISTRY_PROJECTS, 'scratch/bangalore_images_download_plan.json');
  }
}
