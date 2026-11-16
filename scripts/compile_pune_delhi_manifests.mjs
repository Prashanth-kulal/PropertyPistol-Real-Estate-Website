import fs from 'fs';
import path from 'path';
import { PUNE_REGISTRY_PROJECTS } from '../src/data/puneProjectsRegistry.js';
import { DELHI_REGISTRY_PROJECTS } from '../src/data/delhiProjectsRegistry.js';

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

export function compileCity(cityName, registry) {
  console.log(`\n=======================================================`);
  console.log(`Compiling Manifests for ${cityName.toUpperCase()} (${registry.length} projects)`);
  console.log(`=======================================================`);

  let verifiedCount = 0;
  let withFloorPlansCount = 0;
  let total2DOnDisk = 0;
  let total3DOnDisk = 0;
  let totalMasterOnDisk = 0;
  let totalSiteOnDisk = 0;
  let totalVariants = 0;
  let missingSourceCount = 0;

  for (const regProj of registry) {
    const pid = regProj.id;
    const proj = cache[pid];

    if (!proj) {
      missingSourceCount++;
      continue;
    }

    if (proj.verificationStatus === 'VERIFIED') {
      verifiedCount++;
    }

    const projDir = path.join('public', 'projects', String(pid), 'configurations');
    if (!fs.existsSync(projDir)) {
      fs.mkdirSync(projDir, { recursive: true });
    }

    // Process Master Plans
    const verifiedMasterPlans = [];
    for (let mpIdx = 0; mpIdx < (proj.masterPlans || []).length; mpIdx++) {
      const mp = proj.masterPlans[mpIdx];
      const relPath = `/projects/${pid}/configurations/master-plans/master-plan-${String(mpIdx + 1).padStart(2, '0')}.webp`;
      const diskPath = path.join('public', relPath.replace(/^\//, ''));
      const onDisk = fs.existsSync(diskPath);

      if (onDisk) {
        totalMasterOnDisk++;
        verifiedMasterPlans.push({
          id: mp.id || mpIdx + 1,
          title: mp.title || `Master Plan ${mpIdx + 1}`,
          path: relPath,
          originalUrl: mp.originalUrl,
          downloaded: true
        });
      } else {
        verifiedMasterPlans.push({
          id: mp.id || mpIdx + 1,
          title: mp.title || `Master Plan ${mpIdx + 1}`,
          path: null,
          originalUrl: mp.originalUrl,
          downloaded: false
        });
      }
    }

    // Process Site Plans
    const verifiedSitePlans = [];
    for (let spIdx = 0; spIdx < (proj.sitePlans || []).length; spIdx++) {
      const sp = proj.sitePlans[spIdx];
      const relPath = `/projects/${pid}/configurations/site-plans/site-plan-${String(spIdx + 1).padStart(2, '0')}.webp`;
      const diskPath = path.join('public', relPath.replace(/^\//, ''));
      const onDisk = fs.existsSync(diskPath);

      if (onDisk) {
        totalSiteOnDisk++;
        verifiedSitePlans.push({
          id: sp.id || spIdx + 1,
          title: sp.title || `Layout / Site Plan ${spIdx + 1}`,
          path: relPath,
          originalUrl: sp.originalUrl,
          downloaded: true
        });
      } else {
        verifiedSitePlans.push({
          id: sp.id || spIdx + 1,
          title: sp.title || `Layout / Site Plan ${spIdx + 1}`,
          path: null,
          originalUrl: sp.originalUrl,
          downloaded: false
        });
      }
    }

    // Process Unit Plans
    let projHasFloorPlan = false;
    const verifiedUnitPlans = [];
    for (const up of (proj.unitPlans || [])) {
      const bhkLabel = up.bhk || 'Apartment';
      const bhkSlug = slugify(bhkLabel);
      const verifiedVariants = [];

      for (const v of (up.variants || [])) {
        totalVariants++;
        const areaSqft = v.carpetArea || null;
        const areaFolder = areaSqft ? `${areaSqft}-sqft` : `variant-${v.id}`;

        let plan2DPath = null;
        let downloaded2D = false;
        if (v.twoDOriginalUrl) {
          const expected2D = `/projects/${pid}/configurations/unit-plans/${bhkSlug}/${areaFolder}/plan-2d.webp`;
          const diskPath = path.join('public', expected2D.replace(/^\//, ''));
          if (fs.existsSync(diskPath)) {
            plan2DPath = expected2D;
            downloaded2D = true;
            total2DOnDisk++;
            projHasFloorPlan = true;
          }
        }

        let plan3DPath = null;
        let downloaded3D = false;
        if (v.threeDOriginalUrl) {
          const expected3D = `/projects/${pid}/configurations/unit-plans/${bhkSlug}/${areaFolder}/plan-3d.webp`;
          const diskPath = path.join('public', expected3D.replace(/^\//, ''));
          if (fs.existsSync(diskPath)) {
            plan3DPath = expected3D;
            downloaded3D = true;
            total3DOnDisk++;
            projHasFloorPlan = true;
          }
        }

        verifiedVariants.push({
          id: v.id,
          bhk: v.bhk || bhkLabel,
          carpetArea: v.carpetArea || null,
          carpetAreaDisplay: v.carpetAreaDisplay || (v.carpetArea ? `${v.carpetArea} sq.ft` : 'On Request'),
          builtUpArea: v.builtUpArea || null,
          price: v.price || 'On Request',
          actualPrice: v.actualPrice || 0,
          propertyType: v.propertyType || regProj.type || 'Apartment',
          plan2D: plan2DPath,
          plan3D: plan3DPath,
          twoDOriginalUrl: v.twoDOriginalUrl || null,
          threeDOriginalUrl: v.threeDOriginalUrl || null,
          has2D: Boolean(plan2DPath || v.twoDOriginalUrl),
          has3D: Boolean(plan3DPath || v.threeDOriginalUrl),
          downloaded: downloaded2D,
          downloaded3D: downloaded3D
        });
      }

      if (verifiedVariants.length > 0) {
        verifiedUnitPlans.push({
          bhk: bhkLabel,
          variants: verifiedVariants
        });
      }
    }

    if (projHasFloorPlan || (proj.unitPlans || []).some(up => (up.variants || []).some(v => v.twoDOriginalUrl || v.threeDOriginalUrl))) {
      withFloorPlansCount++;
    }

    // Determine available plan tabs
    const planTypes = [];
    if (verifiedUnitPlans.length > 0) planTypes.push('unit');
    if (verifiedMasterPlans.length > 0) planTypes.push('master');
    if (verifiedSitePlans.length > 0) planTypes.push('site');
    if (planTypes.length === 0) planTypes.push('unit');

    const manifest = {
      projectId: pid,
      slug: regProj.slug || proj.slug,
      name: regProj.name || proj.name,
      city: regProj.city || proj.city || cityName,
      officialSourceUrl: regProj.referenceUrl || proj.officialSourceUrl,
      verificationStatus: proj.verificationStatus || 'VERIFIED',
      lastVerified: new Date().toISOString().split('T')[0],
      planTypes,
      masterPlans: verifiedMasterPlans,
      sitePlans: verifiedSitePlans,
      unitPlans: verifiedUnitPlans,
      configurationSummary: proj.configurationSummary || []
    };

    fs.writeFileSync(path.join(projDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  }

  const report = {
    city: cityName,
    registryCount: registry.length,
    officialMatched: registry.length - missingSourceCount,
    verifiedCount,
    withFloorPlansCount,
    total2DOnDisk,
    total3DOnDisk,
    totalMasterOnDisk,
    totalSiteOnDisk,
    totalVariants,
    missingSourceCount
  };

  console.log(`Summary for ${cityName.toUpperCase()}:`);
  console.log(`- Projects in Registry: ${report.registryCount}`);
  console.log(`- Official Pages Matched: ${report.officialMatched}`);
  console.log(`- Projects with Verified Configurations: ${report.verifiedCount}`);
  console.log(`- Projects with Genuine Floor Plans: ${report.withFloorPlansCount}`);
  console.log(`- 2D Floor Plans on Disk: ${report.total2DOnDisk}`);
  console.log(`- 3D Floor Plans on Disk: ${report.total3DOnDisk}`);
  console.log(`- Master Plans on Disk: ${report.totalMasterOnDisk}`);
  console.log(`- Site / Layout Plans on Disk: ${report.totalSiteOnDisk}`);
  console.log(`- Total Unit Plan Variants: ${report.totalVariants}`);
  console.log(`- Projects Missing Source Data: ${report.missingSourceCount}`);

  return report;
}

if (process.argv[1].endsWith('compile_pune_delhi_manifests.mjs')) {
  const puneReport = compileCity('pune', PUNE_REGISTRY_PROJECTS);
  const delhiReport = compileCity('delhi', DELHI_REGISTRY_PROJECTS);

  fs.writeFileSync('scratch/pune_delhi_compilation_report.json', JSON.stringify({ puneReport, delhiReport }, null, 2), 'utf8');
  console.log(`\nCompilation complete! Report saved to scratch/pune_delhi_compilation_report.json`);
}
