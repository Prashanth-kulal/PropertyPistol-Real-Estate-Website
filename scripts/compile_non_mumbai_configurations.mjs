import fs from 'fs';
import path from 'path';

const CACHE_FILE = 'scratch/non_mumbai_configurations_cache.json';

if (!fs.existsSync(CACHE_FILE)) {
  console.error(`Cache file ${CACHE_FILE} does not exist!`);
  process.exit(1);
}

const rawCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
const totalProjects = Object.keys(rawCache).length;
console.log(`Compiling configurations for ${totalProjects} non-Mumbai projects...`);

let totalVariants = 0;
let totalMasterPlans = 0;
let totalSitePlans = 0;
let total2DOriginal = 0;
let total3DOriginal = 0;
let verifiedProjects = 0;
let fallbackProjects = 0;

for (const [pidStr, proj] of Object.entries(rawCache)) {
  const pid = Number(pidStr);
  const projDir = path.join('public', 'projects', String(pid), 'configurations');

  if (!fs.existsSync(projDir)) {
    fs.mkdirSync(projDir, { recursive: true });
  }

  if (proj.verificationStatus === 'VERIFIED') {
    verifiedProjects++;
  } else {
    fallbackProjects++;
  }

  // Count metrics
  totalMasterPlans += (proj.masterPlans || []).length;
  totalSitePlans += (proj.sitePlans || []).length;

  for (const up of (proj.unitPlans || [])) {
    for (const v of (up.variants || [])) {
      totalVariants++;
      if (v.twoDOriginalUrl) total2DOriginal++;
      if (v.threeDOriginalUrl) total3DOriginal++;
    }
  }

  const manifest = {
    projectId: pid,
    slug: proj.slug,
    name: proj.name,
    city: proj.city,
    officialSourceUrl: proj.officialSourceUrl,
    verificationStatus: proj.verificationStatus,
    lastVerified: proj.lastVerified,
    planTypes: proj.planTypes || ['unit'],
    masterPlans: proj.masterPlans || [],
    sitePlans: proj.sitePlans || [],
    unitPlans: proj.unitPlans || [],
    configurationSummary: proj.configurationSummary || []
  };

  fs.writeFileSync(path.join(projDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
}

console.log(`\nCompilation Summary for Non-Mumbai Projects:`);
console.log(`- Total Projects Processed: ${totalProjects}`);
console.log(`- Verified Projects: ${verifiedProjects}`);
console.log(`- Fallback Projects: ${fallbackProjects}`);
console.log(`- Total Unit Plan Variants: ${totalVariants}`);
console.log(`- Total Master Plans: ${totalMasterPlans}`);
console.log(`- Total Site / Layout Plans: ${totalSitePlans}`);
console.log(`- Total 2D Plan Assets Sourced: ${total2DOriginal}`);
console.log(`- Total 3D Plan Assets Sourced: ${total3DOriginal}`);
console.log(`\nAll manifests written to public/projects/<pid>/configurations/manifest.json`);
