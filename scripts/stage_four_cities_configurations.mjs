import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { GURUGRAM_REGISTRY_PROJECTS } from '../src/data/gurugramProjectsRegistry.js';
import { KOLKATA_REGISTRY_PROJECTS } from '../src/data/kolkataProjectsRegistry.js';
import { AHMEDABAD_REGISTRY_PROJECTS } from '../src/data/ahmedabadProjectsRegistry.js';
import { LUCKNOW_REGISTRY_PROJECTS } from '../src/data/lucknowProjectsRegistry.js';

const ALL_TARGET_PROJECTS = [
  ...GURUGRAM_REGISTRY_PROJECTS,
  ...KOLKATA_REGISTRY_PROJECTS,
  ...AHMEDABAD_REGISTRY_PROJECTS,
  ...LUCKNOW_REGISTRY_PROJECTS
];

console.log('Staging configuration files for 970 target projects...');

const batchSize = 100;
let filesToStage = [];

for (const p of ALL_TARGET_PROJECTS) {
  const configDir = path.join('public', 'projects', String(p.id), 'configurations');
  if (fs.existsSync(configDir)) {
    filesToStage.push(configDir.replace(/\\/g, '/'));
  }
}

for (let i = 0; i < filesToStage.length; i += batchSize) {
  const batch = filesToStage.slice(i, i + batchSize);
  execSync(`git add ${batch.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit' });
}

// Stage task scripts
const TASK_SCRIPTS = [
  'scripts/scan_configurations_inventory.mjs',
  'scripts/test_sample_floor_plans.mjs',
  'scripts/collect_four_cities_configurations.mjs',
  'scripts/build_plan_images_queue.mjs',
  'scripts/watermark_four_cities_plans.py',
  'scripts/apply_four_cities_manifests.mjs',
  'scripts/verify_four_cities_manifest_integrity.mjs',
  'scripts/stage_four_cities_configurations.mjs'
];

for (const s of TASK_SCRIPTS) {
  if (fs.existsSync(s)) {
    execSync(`git add "${s}"`, { stdio: 'inherit' });
  }
}

console.log('Staging complete. Verifying staged files...');
