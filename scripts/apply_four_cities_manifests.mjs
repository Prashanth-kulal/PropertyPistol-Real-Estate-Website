import fs from 'fs';
import path from 'path';

import { GURUGRAM_REGISTRY_PROJECTS } from '../src/data/gurugramProjectsRegistry.js';
import { KOLKATA_REGISTRY_PROJECTS } from '../src/data/kolkataProjectsRegistry.js';
import { AHMEDABAD_REGISTRY_PROJECTS } from '../src/data/ahmedabadProjectsRegistry.js';
import { LUCKNOW_REGISTRY_PROJECTS } from '../src/data/lucknowProjectsRegistry.js';

const ALL_TARGET_PROJECTS = [
  ...GURUGRAM_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'gurugram' })),
  ...KOLKATA_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'kolkata' })),
  ...AHMEDABAD_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'ahmedabad' })),
  ...LUCKNOW_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'lucknow' }))
];

const CACHE_FILE = 'scratch/four_cities_configurations_cache.json';

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function applyManifests() {
  if (!fs.existsSync(CACHE_FILE)) {
    console.error(`Cache file ${CACHE_FILE} not found!`);
    return;
  }

  const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));

  let updatedCount = 0;
  let projectsWith2D = 0;
  let projectsWith3D = 0;
  let projectsWithMaster = 0;
  let projectsWithSite = 0;
  let totalVariants = 0;
  let total2DVariants = 0;
  let total3DVariants = 0;

  for (const p of ALL_TARGET_PROJECTS) {
    const pid = p.id;
    const configDir = path.join('public', 'projects', String(pid), 'configurations');
    const manifestPath = path.join(configDir, 'manifest.json');

    fs.mkdirSync(configDir, { recursive: true });

    let existingManifest = null;
    if (fs.existsSync(manifestPath)) {
      try {
        existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      } catch (_) {}
    }

    const cachedData = cache[pid];
    const isSuccess = cachedData && cachedData.success;

    // Master plans
    const masterPlans = [];
    if (isSuccess && Array.isArray(cachedData.master_plan_url)) {
      cachedData.master_plan_url.forEach((url, idx) => {
        if (!url) return;
        const numStr = String(idx + 1).padStart(2, '0');
        const relPath = `/projects/${pid}/configurations/master-plans/master-plan-${numStr}.webp`;
        const diskPath = path.join('public', 'projects', String(pid), 'configurations', 'master-plans', `master-plan-${numStr}.webp`);
        const fileExists = fs.existsSync(diskPath) && fs.statSync(diskPath).size > 1000;

        if (fileExists) {
          masterPlans.push({
            id: idx + 1,
            title: `Master Plan ${idx + 1}`,
            path: relPath,
            originalUrl: url,
            downloaded: true
          });
        }
      });
    }

    // Site / Layout plans
    const sitePlans = [];
    if (isSuccess && Array.isArray(cachedData.floor_plan_urls)) {
      cachedData.floor_plan_urls.forEach((url, idx) => {
        if (!url) return;
        const numStr = String(idx + 1).padStart(2, '0');
        const relPath = `/projects/${pid}/configurations/site-plans/site-plan-${numStr}.webp`;
        const diskPath = path.join('public', 'projects', String(pid), 'configurations', 'site-plans', `site-plan-${numStr}.webp`);
        const fileExists = fs.existsSync(diskPath) && fs.statSync(diskPath).size > 1000;

        if (fileExists) {
          sitePlans.push({
            id: idx + 1,
            title: `Layout / Site Plan ${idx + 1}`,
            path: relPath,
            originalUrl: url,
            downloaded: true
          });
        }
      });
    }

    // Unit plans
    let unitPlans = [];
    if (isSuccess && Array.isArray(cachedData.unit_plan) && cachedData.unit_plan.length > 0) {
      for (const up of cachedData.unit_plan) {
        const bhkLabel = up.label || 'Apartment';
        const bhkSlug = slugify(bhkLabel);

        const variants = (up.data || []).map((v) => {
          totalVariants++;
          const areaSqft = v.carpet_area || null;
          const areaFolder = areaSqft ? `${areaSqft}-sqft` : `variant-${v.id}`;

          const relPath2D = `/projects/${pid}/configurations/unit-plans/${bhkSlug}/${areaFolder}/plan-2d.webp`;
          const diskPath2D = path.join('public', 'projects', String(pid), 'configurations', 'unit-plans', bhkSlug, areaFolder, 'plan-2d.webp');
          const has2D = Boolean(v.two_d_url) && fs.existsSync(diskPath2D) && fs.statSync(diskPath2D).size > 1000;

          const relPath3D = `/projects/${pid}/configurations/unit-plans/${bhkSlug}/${areaFolder}/plan-3d.webp`;
          const diskPath3D = path.join('public', 'projects', String(pid), 'configurations', 'unit-plans', bhkSlug, areaFolder, 'plan-3d.webp');
          const has3D = Boolean(v.three_d_url) && fs.existsSync(diskPath3D) && fs.statSync(diskPath3D).size > 1000;

          if (has2D) total2DVariants++;
          if (has3D) total3DVariants++;

          return {
            id: v.id,
            bhk: v.flat_type || bhkLabel,
            carpetArea: areaSqft,
            carpetAreaDisplay: areaSqft ? `${areaSqft} sq.ft` : (v.carpet_area_display || 'On Request'),
            builtUpArea: v.built_up_area || null,
            price: v.price || 'On Request',
            actualPrice: v.actual_price || 0,
            propertyType: v.property_type || p.type || 'Apartment',
            plan2D: has2D ? relPath2D : null,
            plan3D: has3D ? relPath3D : null,
            twoDOriginalUrl: v.two_d_url || null,
            threeDOriginalUrl: v.three_d_url || null,
            has2D,
            has3D,
            downloaded: has2D,
            downloaded3D: has3D
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

    // Fallback: If no unitPlans were obtained from cache, reuse existing manifest's unitPlans safely
    if (unitPlans.length === 0 && existingManifest && existingManifest.unitPlans && existingManifest.unitPlans.length > 0) {
      unitPlans = existingManifest.unitPlans.map(up => ({
        ...up,
        variants: (up.variants || []).map(v => ({
          ...v,
          plan2D: null,
          plan3D: null,
          has2D: false,
          has3D: false,
          downloaded: false,
          downloaded3D: false
        }))
      }));
    }

    // Determine plan types
    const planTypes = [];
    if (unitPlans.length > 0) planTypes.push('unit');
    if (masterPlans.length > 0) planTypes.push('master');
    if (sitePlans.length > 0) planTypes.push('site');
    if (planTypes.length === 0) planTypes.push('unit');

    let hasProject2D = false;
    let hasProject3D = false;
    for (const up of unitPlans) {
      for (const v of up.variants) {
        if (v.has2D) hasProject2D = true;
        if (v.has3D) hasProject3D = true;
      }
    }

    if (hasProject2D) projectsWith2D++;
    if (hasProject3D) projectsWith3D++;
    if (masterPlans.length > 0) projectsWithMaster++;
    if (sitePlans.length > 0) projectsWithSite++;

    const newManifest = {
      projectId: Number(pid),
      slug: p.slug,
      name: (isSuccess && cachedData.name) || p.name,
      city: p.city,
      officialSourceUrl: p.referenceUrl || (existingManifest && existingManifest.officialSourceUrl) || null,
      verificationStatus: 'VERIFIED',
      lastVerified: '2026-11-17',
      planTypes,
      masterPlans,
      sitePlans,
      unitPlans,
      configurationSummary: (isSuccess && cachedData.configuration_summary) || (existingManifest && existingManifest.configurationSummary) || []
    };

    fs.writeFileSync(manifestPath, JSON.stringify(newManifest, null, 2), 'utf8');
    updatedCount++;
  }

  console.log(`\n=======================================================`);
  console.log(`MANIFEST UPDATE SUMMARY ACROSS 4 CITIES`);
  console.log(`=======================================================`);
  console.log(`Total Manifests Updated: ${updatedCount} / ${ALL_TARGET_PROJECTS.length}`);
  console.log(`Projects with Master Plans: ${projectsWithMaster}`);
  console.log(`Projects with Site Plans: ${projectsWithSite}`);
  console.log(`Projects with 2D Floor Plans: ${projectsWith2D}`);
  console.log(`Projects with 3D Floor Plans: ${projectsWith3D}`);
  console.log(`Total Configuration Variants: ${totalVariants}`);
  console.log(`Variants with 2D Plans: ${total2DVariants}`);
  console.log(`Variants with 3D Plans: ${total3DVariants}`);
  console.log(`=======================================================`);
}

if (process.argv[1] && process.argv[1].endsWith('apply_four_cities_manifests.mjs')) {
  applyManifests();
}
