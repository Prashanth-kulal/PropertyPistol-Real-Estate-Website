import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const filesToExtract = [
  'src/data/dubaiProjectsRegistry.js',
  'src/data/kochiProjectsRegistry.js',
  'dubai-processed-images-manifest.json',
  'kochi-processed-images-manifest.json',
  'propertypistol-backend/scripts/import-dubai-catalog.js',
  'propertypistol-backend/scripts/import-kochi-catalog.js'
];

const remoteRef = 'remotes/origin/feature/multiple-city-projects';

console.log(`Extracting Dubai and Kochi files from ${remoteRef}...`);

for (const file of filesToExtract) {
  try {
    const content = execSync(`git show "${remoteRef}:${file}"`, {
      maxBuffer: 50 * 1024 * 1024,
      encoding: 'buffer'
    });
    const targetPath = path.resolve(process.cwd(), file);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, content);
    console.log(`Extracted: ${file} (${content.length} bytes)`);
  } catch (err) {
    console.error(`Failed to extract ${file}:`, err.message);
  }
}
