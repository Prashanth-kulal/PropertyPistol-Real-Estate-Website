import fs from 'fs';
import path from 'path';

import { DUBAI_REGISTRY_PROJECTS } from '../src/data/dubaiProjectsRegistry.js';
import { KOCHI_REGISTRY_PROJECTS } from '../src/data/kochiProjectsRegistry.js';

const ALL_TARGET_PROJECTS = [
  ...DUBAI_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'dubai' })),
  ...KOCHI_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'kochi' }))
];

let brokenImageRefs = 0;
let invalidManifests = 0;
let totalVariantsChecked = 0;
let totalMasterChecked = 0;
let totalSiteChecked = 0;

for (const p of ALL_TARGET_PROJECTS) {
  const pid = p.id;
  const manifestPath = path.join('public', 'projects', String(pid), 'configurations', 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    console.error(`Missing manifest: ${manifestPath}`);
    invalidManifests++;
    continue;
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    console.error(`Invalid JSON in ${manifestPath}:`, e.message);
    invalidManifests++;
    continue;
  }

  // Check master plans
  for (const mp of (data.masterPlans || [])) {
    totalMasterChecked++;
    const diskPath = path.join('public', mp.path.replace(/^\//, ''));
    if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size < 100) {
      console.error(`Broken master plan: ${diskPath} in project ${pid}`);
      brokenImageRefs++;
    }
  }

  // Check site plans
  for (const sp of (data.sitePlans || [])) {
    totalSiteChecked++;
    const diskPath = path.join('public', sp.path.replace(/^\//, ''));
    if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size < 100) {
      console.error(`Broken site plan: ${diskPath} in project ${pid}`);
      brokenImageRefs++;
    }
  }

  // Check unit plans
  for (const up of (data.unitPlans || [])) {
    for (const v of (up.variants || [])) {
      totalVariantsChecked++;
      if (v.has2D || v.plan2D) {
        if (!v.plan2D) {
          console.error(`has2D is true but plan2D is null in project ${pid}, variant ${v.id}`);
          brokenImageRefs++;
        } else {
          const diskPath = path.join('public', v.plan2D.replace(/^\//, ''));
          if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size < 100) {
            console.error(`Broken 2D plan file: ${diskPath} in project ${pid}`);
            brokenImageRefs++;
          }
        }
      }
      if (v.has3D || v.plan3D) {
        if (!v.plan3D) {
          console.error(`has3D is true but plan3D is null in project ${pid}, variant ${v.id}`);
          brokenImageRefs++;
        } else {
          const diskPath = path.join('public', v.plan3D.replace(/^\//, ''));
          if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size < 100) {
            console.error(`Broken 3D plan file: ${diskPath} in project ${pid}`);
            brokenImageRefs++;
          }
        }
      }
    }
  }
}

console.log('\n=======================================================');
console.log('DUBAI & KOCHI CONFIGURATION INTEGRITY AUDIT');
console.log('=======================================================');
console.log(`Projects Checked: ${ALL_TARGET_PROJECTS.length}`);
console.log(`Invalid Manifests: ${invalidManifests}`);
console.log(`Master Plans Checked: ${totalMasterChecked}`);
console.log(`Site Plans Checked: ${totalSiteChecked}`);
console.log(`Variants Checked: ${totalVariantsChecked}`);
console.log(`Broken Image References: ${brokenImageRefs}`);
console.log(`STATUS: ${brokenImageRefs === 0 && invalidManifests === 0 ? 'ALL CHECKS PASSED PERFECTLY' : 'FAILURES DETECTED'}`);
console.log('=======================================================');

if (brokenImageRefs > 0 || invalidManifests > 0) {
  process.exit(1);
}
