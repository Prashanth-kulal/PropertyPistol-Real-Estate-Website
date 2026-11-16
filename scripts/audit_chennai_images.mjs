import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('chennai-processed-images-manifest.json', 'utf8'));

let totalImages = 0;
let validOnDisk = 0;
let broken = 0;
let brokenList = [];

for (const [pid, pdata] of Object.entries(manifest.projects)) {
  for (const img of pdata.images) {
    totalImages++;
    const diskPath = path.join('public', img.path.replace(/^\//, ''));
    if (fs.existsSync(diskPath)) {
      const size = fs.statSync(diskPath).size;
      if (size > 500) {
        validOnDisk++;
      } else {
        broken++;
        brokenList.push({ pid, path: img.path, reason: 'Empty or corrupt (<500b)' });
      }
    } else {
      broken++;
      brokenList.push({ pid, path: img.path, reason: 'File does not exist' });
    }
  }
}

console.log('=======================================================');
console.log('       COMPLETE CHENNAI IMAGE INTEGRITY AUDIT');
console.log('=======================================================');
console.log(`Total Manifest Projects: ${Object.keys(manifest.projects).length}`);
console.log(`Total Manifest Images:   ${totalImages}`);
console.log(`Valid Images on Disk:    ${validOnDisk} / ${totalImages}`);
console.log(`Broken Images Remaining: ${broken}`);
if (brokenList.length > 0) {
  console.log('Broken details:', brokenList);
} else {
  console.log('SUCCESS: Every single Chennai project image is valid and nonempty on disk!');
}
console.log('=======================================================');
