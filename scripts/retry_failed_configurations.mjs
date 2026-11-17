import fs from 'fs';

const CACHE_FILE = 'scratch/dubai_kochi_configurations_cache.json';

const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
const failedKeys = Object.keys(cache).filter(k => !cache[k].success);

console.log(`Retrying ${failedKeys.length} failed projects...`);

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

async function fetchProjectWithRetry(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        return await res.text();
      }
      if (res.status === 404) return null;
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return null;
}

async function retryFailed() {
  let successCount = 0;
  let remainingFailed = 0;

  for (let i = 0; i < failedKeys.length; i++) {
    const pid = failedKeys[i];
    const prev = cache[pid];
    const p = prev.project;
    const url = p?.referenceUrl;

    if (!url) {
      remainingFailed++;
      continue;
    }

    const html = await fetchProjectWithRetry(url);
    if (!html) {
      remainingFailed++;
      console.log(`[${i + 1}/${failedKeys.length}] Still failed to fetch ${pid}`);
      continue;
    }

    const projectData = extractFromHtml(html);
    if (!projectData) {
      remainingFailed++;
      console.log(`[${i + 1}/${failedKeys.length}] Still failed to extract ShallowReactive for ${pid}`);
      continue;
    }

    cache[pid] = {
      success: true,
      projectId: Number(pid),
      name: projectData.project_name || p.name,
      city: p.city,
      officialSourceUrl: url,
      master_plan_url: projectData.master_plan_url || [],
      floor_plan_urls: projectData.floor_plan_urls || [],
      unit_plan: projectData.unit_plan || [],
      configuration_summary: projectData.configuration_summary || []
    };
    successCount++;
    console.log(`[${i + 1}/${failedKeys.length}] Successfully recovered ${pid} (${p.name})`);

    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`\nRetry finished: Recovered ${successCount}, Remaining failed: ${remainingFailed}`);
}

retryFailed();
