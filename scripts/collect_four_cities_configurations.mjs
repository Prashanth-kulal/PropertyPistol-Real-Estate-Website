import fs from 'fs';
import path from 'path';

import { GURUGRAM_REGISTRY_PROJECTS } from '../src/data/gurugramProjectsRegistry.js';
import { KOLKATA_REGISTRY_PROJECTS } from '../src/data/kolkataProjectsRegistry.js';
import { AHMEDABAD_REGISTRY_PROJECTS } from '../src/data/ahmedabadProjectsRegistry.js';
import { LUCKNOW_REGISTRY_PROJECTS } from '../src/data/lucknowProjectsRegistry.js';

const ALL_TARGET_PROJECTS = [
  ...GURUGRAM_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'gurugram' })),
  ...KOLKATA_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'kolkata' })),
  ...AHMEDABAD_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'ahmedabad' })),
  ...LUCKNOW_REGISTRY_PROJECTS.map(p => ({ ...p, city: 'lucknow' }))
];

const CACHE_FILE = 'scratch/four_cities_configurations_cache.json';

fs.mkdirSync('scratch', { recursive: true });

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log(`Loaded existing cache with ${Object.keys(cache).length} projects.`);
  } catch (e) {
    console.warn('Failed to parse existing cache, starting fresh.');
  }
}

function extractFromHtml(html) {
  const scriptMatches = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
  const targetScript = scriptMatches.find(m => m[1].includes('"ShallowReactive"') && m[1].includes('"project"'));
  if (!targetScript) return null;

  try {
    const payload = JSON.parse(targetScript[1].trim());

    function unflatten(data) {
      const memo = new Map();

      function resolve(val) {
        if (typeof val === 'number') {
          if (val >= 0 && val < data.length) {
            if (memo.has(val)) return memo.get(val);
            memo.set(val, `[Ref:${val}]`);
            const res = resolveRaw(data[val]);
            memo.set(val, res);
            return res;
          }
          return val;
        }
        return resolveRaw(val);
      }

      function resolveRaw(item) {
        if (item === null || item === undefined) return item;
        if (Array.isArray(item)) {
          if (item[0] === 'ShallowReactive' || item[0] === 'Reactive') {
            return resolve(item[1]);
          }
          return item.map(x => resolve(x));
        }
        if (typeof item === 'object') {
          const out = {};
          for (const [k, v] of Object.entries(item)) {
            out[k] = resolve(v);
          }
          return out;
        }
        return item;
      }

      return resolve(1);
    }

    const root = unflatten(payload);
    return root?.data?.project?.project || root?.data?.project;
  } catch (e) {
    return null;
  }
}

async function fetchProjectWithRetry(url, maxRetries = 2) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        return await res.text();
      }
      if (res.status === 404) return null;
    } catch (e) {
      if (attempt === maxRetries) return null;
      await new Promise(r => setTimeout(r, 600));
    }
  }
  return null;
}

async function collectTargetConfigurations() {
  const total = ALL_TARGET_PROJECTS.length;
  console.log(`\n=======================================================`);
  console.log(`Starting Data Collection for ${total} Projects`);
  console.log(`Gurugram (180), Kolkata (444), Ahmedabad (255), Lucknow (91)`);
  console.log(`=======================================================`);

  const pending = ALL_TARGET_PROJECTS.filter(p => !cache[p.id]);
  console.log(`Total projects in queue: ${pending.length} (Already cached: ${Object.keys(cache).length})`);

  if (pending.length === 0) {
    console.log('All projects are already cached!');
    return;
  }

  const concurrency = 20;
  let currentIndex = 0;
  let successCount = 0;
  let failedCount = 0;
  let processedSinceSave = 0;
  const startTime = Date.now();

  async function worker(workerId) {
    while (currentIndex < pending.length) {
      const idx = currentIndex++;
      const p = pending[idx];
      const pid = p.id;
      const url = p.referenceUrl;

      if (!url) {
        cache[pid] = { error: 'No reference URL', project: p };
        failedCount++;
        processedSinceSave++;
        continue;
      }

      try {
        const html = await fetchProjectWithRetry(url);
        if (!html) {
          cache[pid] = { error: 'Failed to fetch HTML', project: p };
          failedCount++;
          processedSinceSave++;
          continue;
        }

        const projectData = extractFromHtml(html);
        if (!projectData) {
          cache[pid] = { error: 'Failed to parse ShallowReactive state', project: p };
          failedCount++;
          processedSinceSave++;
          continue;
        }

        cache[pid] = {
          success: true,
          projectId: pid,
          name: projectData.project_name || p.name,
          city: p.city,
          officialSourceUrl: url,
          master_plan_url: projectData.master_plan_url || [],
          floor_plan_urls: projectData.floor_plan_urls || [],
          unit_plan: projectData.unit_plan || [],
          configuration_summary: projectData.configuration_summary || []
        };
        successCount++;
        processedSinceSave++;

      } catch (err) {
        cache[pid] = { error: err.message, project: p };
        failedCount++;
        processedSinceSave++;
      }

      if (processedSinceSave >= 25) {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
        processedSinceSave = 0;
        const elapsed = (Date.now() - startTime) / 1000;
        const rate = (currentIndex) / Math.max(1, elapsed);
        console.log(`[Progress: ${currentIndex}/${pending.length}] Success: ${successCount}, Failed: ${failedCount} | Rate: ${rate.toFixed(1)} req/s`);
      }
    }
  }

  const workers = Array.from({ length: concurrency }, (_, i) => worker(i));
  await Promise.all(workers);

  // Final cache save
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  const totalElapsed = (Date.now() - startTime) / 1000;
  console.log(`\nCollection Complete in ${totalElapsed.toFixed(1)}s! Success: ${successCount}, Failed: ${failedCount}`);
}

collectTargetConfigurations();
