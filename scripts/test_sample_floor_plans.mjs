import fs from 'fs';
import { GURUGRAM_REGISTRY_PROJECTS } from '../src/data/gurugramProjectsRegistry.js';
import { KOLKATA_REGISTRY_PROJECTS } from '../src/data/kolkataProjectsRegistry.js';
import { AHMEDABAD_REGISTRY_PROJECTS } from '../src/data/ahmedabadProjectsRegistry.js';
import { LUCKNOW_REGISTRY_PROJECTS } from '../src/data/lucknowProjectsRegistry.js';

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

async function testSample() {
  const samples = [
    ...GURUGRAM_REGISTRY_PROJECTS.slice(0, 3),
    ...KOLKATA_REGISTRY_PROJECTS.slice(0, 3),
    ...AHMEDABAD_REGISTRY_PROJECTS.slice(0, 3),
    ...LUCKNOW_REGISTRY_PROJECTS.slice(0, 3)
  ];

  for (const p of samples) {
    console.log(`\nTesting project ${p.id} (${p.city}): ${p.name}`);
    console.log(`URL: ${p.referenceUrl}`);
    try {
      const res = await fetch(p.referenceUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      if (!res.ok) {
        console.log(`  HTTP status: ${res.status}`);
        continue;
      }
      const html = await res.text();
      const data = extractFromHtml(html);
      if (!data) {
        console.log('  No ShallowReactive project data found.');
        continue;
      }
      console.log('  Project data extracted successfully!');
      console.log('  Master plans:', data.master_plan_url);
      console.log('  Floor plans (site):', data.floor_plan_urls);
      console.log('  Unit plan count:', data.unit_plan ? data.unit_plan.length : 0);
      if (data.unit_plan && data.unit_plan.length > 0) {
        for (const up of data.unit_plan) {
          console.log(`    BHK: ${up.label}, variants: ${(up.data||[]).length}`);
          for (const v of (up.data || [])) {
            console.log(`      Variant ${v.id}: carpet=${v.carpet_area}, 2d=${v.two_d_url}, 3d=${v.three_d_url}`);
          }
        }
      }
    } catch (e) {
      console.error(`  Error: ${e.message}`);
    }
  }
}

testSample();
