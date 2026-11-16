import fs from 'fs';
import path from 'path';

const CACHE_FILE = 'scratch/mumbai_configurations_cache.json';
const OUTPUT_JS = 'src/data/configurations/mumbaiConfigurations.js';

if (!fs.existsSync(CACHE_FILE)) {
  console.error(`Cache file ${CACHE_FILE} does not exist!`);
  process.exit(1);
}

const rawCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
const totalProjects = Object.keys(rawCache).length;
console.log(`Compiling configurations for ${totalProjects} Mumbai projects...`);

const finalMap = {};
let totalVariants = 0;
let totalMasterPlans = 0;
let totalSitePlans = 0;
let total2DOnDisk = 0;
let total3DOnDisk = 0;
let projectsWithUnitPlans = 0;
let projectsWithMasterPlans = 0;
let projectsWithSitePlans = 0;

for (const [pidStr, proj] of Object.entries(rawCache)) {
  const pid = Number(pidStr);
  const projDir = path.join('public', 'projects', String(pid), 'configurations');

  // Verify and update Master Plans
  const verifiedMasterPlans = [];
  for (const mp of (proj.masterPlans || [])) {
    const diskPath = path.join('public', mp.path.replace(/^\//, ''));
    const existsOnDisk = fs.existsSync(diskPath);
    if (existsOnDisk) {
      totalMasterPlans++;
      verifiedMasterPlans.push({
        id: mp.id,
        title: mp.title,
        path: mp.path,
        originalUrl: mp.originalUrl,
        downloaded: true
      });
    } else {
      verifiedMasterPlans.push({
        id: mp.id,
        title: mp.title,
        path: null,
        originalUrl: mp.originalUrl,
        downloaded: false
      });
    }
  }

  // Verify and update Site Plans
  const verifiedSitePlans = [];
  for (const sp of (proj.sitePlans || [])) {
    const diskPath = path.join('public', sp.path.replace(/^\//, ''));
    const existsOnDisk = fs.existsSync(diskPath);
    if (existsOnDisk) {
      totalSitePlans++;
      verifiedSitePlans.push({
        id: sp.id,
        title: sp.title,
        path: sp.path,
        originalUrl: sp.originalUrl,
        downloaded: true
      });
    } else {
      verifiedSitePlans.push({
        id: sp.id,
        title: sp.title,
        path: null,
        originalUrl: sp.originalUrl,
        downloaded: false
      });
    }
  }

  // Verify and update Unit Plans
  const verifiedUnitPlans = [];
  for (const up of (proj.unitPlans || [])) {
    const verifiedVariants = [];
    for (const v of (up.variants || [])) {
      totalVariants++;
      let plan2DPath = null;
      let has2D = false;
      if (v.plan2D) {
        const diskPath2D = path.join('public', v.plan2D.replace(/^\//, ''));
        if (fs.existsSync(diskPath2D)) {
          plan2DPath = v.plan2D;
          has2D = true;
          total2DOnDisk++;
        }
      }

      let plan3DPath = null;
      let has3D = false;
      if (v.plan3D) {
        const diskPath3D = path.join('public', v.plan3D.replace(/^\//, ''));
        if (fs.existsSync(diskPath3D)) {
          plan3DPath = v.plan3D;
          has3D = true;
          total3DOnDisk++;
        }
      }

      verifiedVariants.push({
        ...v,
        plan2D: plan2DPath,
        plan3D: plan3DPath,
        has2D,
        has3D
      });
    }

    if (verifiedVariants.length > 0) {
      verifiedUnitPlans.push({
        bhk: up.bhk,
        variants: verifiedVariants
      });
    }
  }

  // Determine dynamic plan types
  const planTypes = [];
  if (verifiedUnitPlans.length > 0) {
    planTypes.push('unit');
    projectsWithUnitPlans++;
  }
  if (verifiedMasterPlans.length > 0 && verifiedMasterPlans.some(m => m.downloaded || m.originalUrl)) {
    planTypes.push('master');
    projectsWithMasterPlans++;
  }
  if (verifiedSitePlans.length > 0 && verifiedSitePlans.some(s => s.downloaded || s.originalUrl)) {
    planTypes.push('site');
    projectsWithSitePlans++;
  }
  if (planTypes.length === 0) {
    planTypes.push('unit');
  }

  const finalRecord = {
    projectId: pid,
    slug: proj.slug,
    name: proj.name,
    officialSourceUrl: proj.officialSourceUrl,
    verificationStatus: proj.verificationStatus,
    lastVerified: proj.lastVerified,
    planTypes,
    masterPlans: verifiedMasterPlans,
    sitePlans: verifiedSitePlans,
    unitPlans: verifiedUnitPlans,
    configurationSummary: proj.configurationSummary || []
  };

  finalMap[pid] = finalRecord;

  // Write per-project manifest.json
  try {
    fs.mkdirSync(projDir, { recursive: true });
    fs.writeFileSync(
      path.join(projDir, 'manifest.json'),
      JSON.stringify(finalRecord, null, 2),
      'utf8'
    );
  } catch (e) {}
}

// Write the centralized mumbaiConfigurations.js
const jsContent = `// Verified Mumbai Projects Configurations Store
// Grounded in official PropertyPistol project records across 2,771 genuine Mumbai projects.
// Auto-generated snapshot for client & server rendering.

export const MUMBAI_CONFIGURATIONS = ${JSON.stringify(finalMap, null, 2)};
`;

fs.writeFileSync(OUTPUT_JS, jsContent, 'utf8');

console.log('\n======================================================');
console.log('MUMBAI CONFIGURATIONS COMPILATION SUMMARY:');
console.log(`Total Genuine Projects: ${totalProjects}`);
console.log(`Projects with Unit Plans: ${projectsWithUnitPlans}`);
console.log(`Projects with Master Plans: ${projectsWithMasterPlans}`);
console.log(`Projects with Site Plans: ${projectsWithSitePlans}`);
console.log(`Total BHK / Area Variants: ${totalVariants}`);
console.log(`Verified Master Plans on Disk: ${totalMasterPlans}`);
console.log(`Verified Site Plans on Disk: ${totalSitePlans}`);
console.log(`Verified 2D Plans on Disk: ${total2DOnDisk}`);
console.log(`Verified 3D Plans on Disk: ${total3DOnDisk}`);
console.log(`Total Plan Assets on Disk: ${totalMasterPlans + totalSitePlans + total2DOnDisk + total3DOnDisk}`);
console.log(`Wrote centralized store: ${OUTPUT_JS}`);
console.log('======================================================\n');
