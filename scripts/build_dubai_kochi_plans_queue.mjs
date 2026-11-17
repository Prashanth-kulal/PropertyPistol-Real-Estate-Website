import fs from 'fs';
import path from 'path';

const CACHE_FILE = 'scratch/dubai_kochi_configurations_cache.json';
const QUEUE_FILE = 'scratch/dubai_kochi_plan_images_queue.json';

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function buildQueue() {
  if (!fs.existsSync(CACHE_FILE)) {
    console.error(`Cache file ${CACHE_FILE} not found!`);
    return [];
  }

  const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  const queue = [];
  let totalMasterFound = 0;
  let totalSiteFound = 0;
  let total2DFound = 0;
  let total3DFound = 0;
  let alreadyExistingOnDisk = 0;

  for (const [pidStr, data] of Object.entries(cache)) {
    if (!data.success) continue;
    const pid = Number(pidStr);

    // 1. Master Plans
    (data.master_plan_url || []).forEach((url, idx) => {
      if (!url) return;
      totalMasterFound++;
      const numStr = String(idx + 1).padStart(2, '0');
      const dest = path.join('public', 'projects', String(pid), 'configurations', 'master-plans', `master-plan-${numStr}.webp`);

      if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
        alreadyExistingOnDisk++;
      } else {
        queue.push({
          type: 'master',
          projectId: pid,
          url,
          dest
        });
      }
    });

    // 2. Site / Layout Floor Plans
    (data.floor_plan_urls || []).forEach((url, idx) => {
      if (!url) return;
      totalSiteFound++;
      const numStr = String(idx + 1).padStart(2, '0');
      const dest = path.join('public', 'projects', String(pid), 'configurations', 'site-plans', `site-plan-${numStr}.webp`);

      if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
        alreadyExistingOnDisk++;
      } else {
        queue.push({
          type: 'site',
          projectId: pid,
          url,
          dest
        });
      }
    });

    // 3. Unit Plans (2D & 3D)
    (data.unit_plan || []).forEach((up) => {
      const bhkLabel = up.label || 'Apartment';
      const bhkSlug = slugify(bhkLabel);

      (up.data || []).forEach((v) => {
        const areaSqft = v.carpet_area || null;
        const areaFolder = areaSqft ? `${areaSqft}-sqft` : `variant-${v.id}`;

        if (v.two_d_url) {
          total2DFound++;
          const dest = path.join('public', 'projects', String(pid), 'configurations', 'unit-plans', bhkSlug, areaFolder, 'plan-2d.webp');
          if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
            alreadyExistingOnDisk++;
          } else {
            queue.push({
              type: 'unit_2d',
              projectId: pid,
              variantId: v.id,
              url: v.two_d_url,
              dest
            });
          }
        }

        if (v.three_d_url) {
          total3DFound++;
          const dest = path.join('public', 'projects', String(pid), 'configurations', 'unit-plans', bhkSlug, areaFolder, 'plan-3d.webp');
          if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
            alreadyExistingOnDisk++;
          } else {
            queue.push({
              type: 'unit_3d',
              projectId: pid,
              variantId: v.id,
              url: v.three_d_url,
              dest
            });
          }
        }
      });
    });
  }

  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');

  console.log(`\n=======================================================`);
  console.log(`DUBAI & KOCHI PLAN IMAGES DISCOVERY SUMMARY`);
  console.log(`=======================================================`);
  console.log(`Master Plans discovered: ${totalMasterFound}`);
  console.log(`Site Plans discovered: ${totalSiteFound}`);
  console.log(`2D Floor Plans discovered: ${total2DFound}`);
  console.log(`3D Floor Plans discovered: ${total3DFound}`);
  console.log(`TOTAL DISCOVERED PLAN ASSETS: ${totalMasterFound + totalSiteFound + total2DFound + total3DFound}`);
  console.log(`Already on disk (Skipped): ${alreadyExistingOnDisk}`);
  console.log(`Queued for download & watermarking: ${queue.length}`);
  console.log(`Queue saved to: ${QUEUE_FILE}`);
  console.log(`=======================================================`);

  return queue;
}

if (process.argv[1] && process.argv[1].endsWith('build_dubai_kochi_plans_queue.mjs')) {
  buildQueue();
}
