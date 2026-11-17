import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 1. Core modified and created data files
const coreFiles = [
  'src/data/dubaiProjectsRegistry.js',
  'src/data/kochiProjectsRegistry.js',
  'src/data/cities.js',
  'src/data/cityData.js',
  'src/data/projectsData.js',
  'src/data/index.js',
  'src/data/locationMapData.js',
  'src/data/developersData.js',
  'public/data/search-index.json',
  'dubai-processed-images-manifest.json',
  'kochi-processed-images-manifest.json',
  'propertypistol-backend/scripts/import-dubai-catalog.js',
  'propertypistol-backend/scripts/import-kochi-catalog.js',
  'propertypistol-backend/seed/projects.json',
  'propertypistol-backend/seed/cities.json',
  'scripts/extract_dubai_kochi.mjs',
  'scripts/download_dubai_kochi_images.py',
  'scripts/collect_dubai_kochi_configurations.mjs',
  'scripts/retry_failed_configurations.mjs',
  'scripts/build_dubai_kochi_plans_queue.mjs',
  'scripts/watermark_dubai_kochi_plans.py',
  'scripts/apply_dubai_kochi_manifests.mjs',
  'scripts/verify_dubai_kochi_manifest_integrity.mjs',
  'scripts/sync_dubai_kochi_backend_seed.mjs',
  'scripts/test_developers.mjs',
  'scripts/stage_task_files.mjs'
];

for (const file of coreFiles) {
  if (fs.existsSync(file)) {
    execSync(`git add "${file}"`);
    console.log(`Staged: ${file}`);
  } else {
    console.warn(`File not found, skipped: ${file}`);
  }
}

// 2. Stage only Dubai and Kochi public/projects/<pid>/ directories
const dxbManifest = JSON.parse(fs.readFileSync('dubai-processed-images-manifest.json', 'utf8'));
const kchManifest = JSON.parse(fs.readFileSync('kochi-processed-images-manifest.json', 'utf8'));

const allPids = [
  ...Object.keys(dxbManifest.projects),
  ...Object.keys(kchManifest.projects)
];

console.log(`Total Dubai & Kochi PIDs to stage: ${allPids.length}`);

// Batch git add project folders to stay within Windows command length limits
const batchSize = 40;
for (let i = 0; i < allPids.length; i += batchSize) {
  const batch = allPids.slice(i, i + batchSize);
  const existingDirs = batch
    .map(pid => path.join('public', 'projects', pid).replace(/\\/g, '/'))
    .filter(p => fs.existsSync(p));

  if (existingDirs.length > 0) {
    const cmd = `git add ${existingDirs.map(d => `"${d}"`).join(' ')}`;
    execSync(cmd);
    console.log(`Staged batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allPids.length / batchSize)} (${existingDirs.length} dirs)`);
  }
}

console.log('Verifying staging safety...');
const stagedFiles = execSync('git diff --name-only --cached').toString('utf8').split('\n').filter(Boolean);
console.log(`Total staged files: ${stagedFiles.length}`);

// Safety assertion
const forbidden = [
  'scripts/watermark_downloaded_plans.py',
  'propertypistol-backend/seed/backups/latest-backup.json'
];

for (const f of forbidden) {
  if (stagedFiles.includes(f)) {
    throw new Error(`CRITICAL VIOLATION: Forbidden file staged: ${f}`);
  }
}
console.log('SAFETY CHECK PASSED: No forbidden files are staged.');
