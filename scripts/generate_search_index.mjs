import fs from 'fs';
import path from 'path';
import { PROJECTS, CITIES } from '../src/data/index.js';
import { DEVELOPERS_DATA } from '../src/data/developersData.js';

console.log('Generating compact, ultra-fast search index...');

function parseBhks(flatTypes) {
  if (!flatTypes) return [];
  const matches = [...String(flatTypes).matchAll(/(\d+(?:\.5)?)\s*[-]?\s*bhk/gi)].map((m) => m[1]);
  return [...new Set(matches)];
}

// 1. Cities (19 total)
const cities = CITIES.map((c) => ({
  id: c.id.toLowerCase().trim(),
  name: c.name,
  state: c.state || '',
  projectCount: c.projectsCount || 0,
  destination: `/${c.id.toLowerCase().trim()}`,
}));

// 2. Localities
const localityMap = new Map();
for (const p of PROJECTS) {
  if (!p.locality || p.locality.trim() === '' || p.locality === 'Unknown') continue;
  const cityKey = (p.city || 'mumbai').toLowerCase().trim();
  const locName = p.locality.trim();
  const key = `${cityKey}::${locName.toLowerCase()}`;
  if (!localityMap.has(key)) {
    localityMap.set(key, {
      name: locName,
      city: cityKey,
      cityName: p.cityName || cityKey.charAt(0).toUpperCase() + cityKey.slice(1),
      count: 0,
      destination: `/${cityKey}?locality=${encodeURIComponent(locName)}`,
    });
  }
  localityMap.get(key).count++;
}
const localities = Array.from(localityMap.values());

// 3. Developers (Top developers with > 0 projects)
const developerMap = new Map();
for (const d of DEVELOPERS_DATA) {
  const norm = d.name.toLowerCase().trim();
  developerMap.set(norm, {
    name: d.name,
    slug: d.slug,
    count: parseInt(d.projectCount, 10) || 0,
    cities: new Set(),
    destination: `/developers/${d.slug}`,
  });
}
for (const p of PROJECTS) {
  if (!p.builder || p.builder.trim() === '') continue;
  const norm = p.builder.trim().toLowerCase();
  if (!developerMap.has(norm)) {
    const cityKey = (p.city || 'mumbai').toLowerCase().trim();
    developerMap.set(norm, {
      name: p.builder.trim(),
      slug: null,
      count: 0,
      cities: new Set(),
      destination: `/${cityKey}?developer=${encodeURIComponent(p.builder.trim())}`,
    });
  }
  const entry = developerMap.get(norm);
  entry.count++;
  if (p.city) entry.cities.add(p.city.toLowerCase().trim());
}
const developers = Array.from(developerMap.values()).map((d) => ({
  ...d,
  cities: Array.from(d.cities),
}));

// 4. Projects (compact fields only)
const projects = PROJECTS.map((p) => ({
  id: p.id,
  slug: p.slug || p.id,
  name: p.name,
  builder: p.builder || '',
  locality: p.locality || '',
  city: (p.city || 'mumbai').toLowerCase().trim(),
  cityName: p.cityName || (p.city ? p.city.charAt(0).toUpperCase() + p.city.slice(1) : 'Mumbai'),
  flatTypes: p.flatTypes || '',
  price: p.price || '',
  bhks: parseBhks(p.flatTypes),
  destination: `/projects/${p.slug || p.id}`,
}));

const searchIndexData = {
  cities,
  localities,
  developers,
  projects,
};

const outDir = path.join('public', 'data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'search-index.json');
fs.writeFileSync(outPath, JSON.stringify(searchIndexData), 'utf8');

const stat = fs.statSync(outPath);
console.log(`Generated ${outPath} successfully!`);
console.log(`- File Size: ${(stat.size / 1024 / 1024).toFixed(2)} MB (${stat.size.toLocaleString()} bytes)`);
console.log(`- Cities: ${cities.length}`);
console.log(`- Localities: ${localities.length}`);
console.log(`- Developers: ${developers.length}`);
console.log(`- Projects: ${projects.length}`);
