import fs from 'fs';
import path from 'path';

import { GURUGRAM_REGISTRY_PROJECTS } from '../src/data/gurugramProjectsRegistry.js';
import { KOLKATA_REGISTRY_PROJECTS } from '../src/data/kolkataProjectsRegistry.js';
import { AHMEDABAD_REGISTRY_PROJECTS } from '../src/data/ahmedabadProjectsRegistry.js';
import { LUCKNOW_REGISTRY_PROJECTS } from '../src/data/lucknowProjectsRegistry.js';

const CITIES = [
  { name: 'Gurugram', projects: GURUGRAM_REGISTRY_PROJECTS },
  { name: 'Kolkata', projects: KOLKATA_REGISTRY_PROJECTS },
  { name: 'Ahmedabad', projects: AHMEDABAD_REGISTRY_PROJECTS },
  { name: 'Lucknow', projects: LUCKNOW_REGISTRY_PROJECTS }
];

console.log('===================================================================');
console.log('FOUR CITIES CONFIGURATION INVENTORY SCAN');
console.log('===================================================================');

let grandTotal = 0;
let grandManifestExists = 0;
let grandHas2D = 0;
let grandHas3D = 0;
let grandMasterPlans = 0;
let grandSitePlans = 0;
let grandDiskFiles = 0;
let grandWithRefUrl = 0;

for (const { name, projects } of CITIES) {
  let manifestExists = 0;
  let has2DCount = 0;
  let has3DCount = 0;
  let masterPlansCount = 0;
  let sitePlansCount = 0;
  let diskFilesCount = 0;
  let withRefUrl = 0;

  for (const p of projects) {
    const pid = p.id;
    if (p.referenceUrl) withRefUrl++;

    const configDir = path.join('public', 'projects', String(pid), 'configurations');
    const manifestPath = path.join(configDir, 'manifest.json');

    if (fs.existsSync(manifestPath)) {
      manifestExists++;
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        let pHas2D = false;
        let pHas3D = false;

        if (manifest.masterPlans && manifest.masterPlans.length > 0) {
          masterPlansCount++;
        }
        if (manifest.sitePlans && manifest.sitePlans.length > 0) {
          sitePlansCount++;
        }

        if (manifest.unitPlans) {
          for (const up of manifest.unitPlans) {
            for (const v of (up.variants || [])) {
              if (v.has2D || v.plan2D) pHas2D = true;
              if (v.has3D || v.plan3D) pHas3D = true;
            }
          }
        }

        if (pHas2D) has2DCount++;
        if (pHas3D) has3DCount++;
      } catch (err) {
        console.error(`Error parsing ${manifestPath}:`, err.message);
      }
    }

    if (fs.existsSync(configDir)) {
      const countImages = (dir) => {
        let count = 0;
        try {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const e of entries) {
            const full = path.join(dir, e.name);
            if (e.isDirectory()) count += countImages(full);
            else if (/\.(webp|jpg|jpeg|png)$/i.test(e.name)) count++;
          }
        } catch (_) {}
        return count;
      };
      diskFilesCount += countImages(configDir);
    }
  }

  grandTotal += projects.length;
  grandManifestExists += manifestExists;
  grandHas2D += has2DCount;
  grandHas3D += has3DCount;
  grandMasterPlans += masterPlansCount;
  grandSitePlans += sitePlansCount;
  grandDiskFiles += diskFilesCount;
  grandWithRefUrl += withRefUrl;

  console.log(`\nCity: ${name}`);
  console.log(`  Total Projects: ${projects.length}`);
  console.log(`  With Reference URL: ${withRefUrl}`);
  console.log(`  Manifest Exists: ${manifestExists}`);
  console.log(`  Projects with 2D plan flag/path: ${has2DCount}`);
  console.log(`  Projects with 3D plan flag/path: ${has3DCount}`);
  console.log(`  Projects with Master Plan: ${masterPlansCount}`);
  console.log(`  Projects with Site Plan: ${sitePlansCount}`);
  console.log(`  Configuration image files on disk: ${diskFilesCount}`);
}

console.log('\n===================================================================');
console.log(`GRAND TOTAL: ${grandTotal} projects across 4 cities`);
console.log(`  Manifests on disk: ${grandManifestExists} / ${grandTotal}`);
console.log(`  With Ref URL: ${grandWithRefUrl} / ${grandTotal}`);
console.log(`  Projects with 2D plans: ${grandHas2D}`);
console.log(`  Projects with 3D plans: ${grandHas3D}`);
console.log(`  Projects with Master plans: ${grandMasterPlans}`);
console.log(`  Projects with Site plans: ${grandSitePlans}`);
console.log(`  Total Plan Images on disk: ${grandDiskFiles}`);
console.log('===================================================================');
