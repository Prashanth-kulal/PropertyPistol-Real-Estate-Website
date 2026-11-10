/**
 * One-off exporter: bundles the frontend's mock data modules (src/data/*) with esbuild
 * and writes normalized JSON seed files into ./seed.
 *
 * Usage: node scripts/export-frontend-data.mjs /path/to/PropertyPistol-Real-Estate-Website-main
 */
import { build } from "esbuild";
import { writeFileSync, readFileSync, mkdtempSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const frontend = path.resolve(process.argv[2] || "../PropertyPistol-Real-Estate-Website-main");
const dataDir = path.join(frontend, "src/data");
const seedDir = path.join(here, "..", "seed");
mkdirSync(seedDir, { recursive: true });

const tmp = mkdtempSync(path.join(tmpdir(), "pp-export-"));
const entry = path.join(tmp, "entry.js");
const out = path.join(tmp, "bundle.cjs");
const imp = (n) => JSON.stringify(path.join(dataDir, n));
writeFileSync(
  entry,
  `import * as idx from ${imp("index.js")};
import * as pd from ${imp("projectsData.js")};
import * as cd from ${imp("cityData.js")};
import * as lm from ${imp("locationMapData.js")};
import * as tn from ${imp("transitNetworks.js")};
import * as dv from ${imp("developersData.js")};
export default { idx, pd, cd, lm, tn, dv };`
);
await build({ entryPoints: [entry], bundle: true, platform: "node", format: "cjs", outfile: out, logLevel: "error" });
const m = createRequire(import.meta.url)(out).default;

// ---------- helpers ----------
const slugify = (s) => String(s || "").toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const bhkList = (s = "") => {
  const out = new Set();
  for (const mt of String(s).matchAll(/(\d)(?:\s*(?:,|&|\/|and)\s*(\d))*\s*bhk/gi)) {
    const seg = mt[0].replace(/bhk/i, "");
    seg.split(/[^0-9]+/).filter(Boolean).forEach((n) => out.add(Number(n)));
  }
  if (!out.size) String(s).split(/[^0-9]+/).filter(Boolean).forEach((n) => Number(n) <= 6 && out.add(Number(n)));
  return [...out].sort();
};
const areaRange = (s = "") => {
  const nums = String(s).replace(/,/g, "").match(/\d+(\.\d+)?/g)?.map(Number) || [];
  return nums.length ? { min: Math.min(...nums), max: Math.max(...nums) } : {};
};
const crToNumber = (s) => {
  const v = String(s || "").replace(/[₹,*]|INR/gi, "").trim();
  const n = parseFloat(v);
  if (isNaN(n)) return undefined;
  if (/cr/i.test(v)) return Math.round(n * 1e7);
  if (/l(ac|akh)?s?/i.test(v)) return Math.round(n * 1e5);
  return n;
};
const statusKey = (s = "") => {
  const t = s.toLowerCase();
  if (t.includes("ready")) return "ready-to-move";
  if (t.includes("new launch") || t.includes("pre")) return "new-launch";
  if (t.includes("under")) return "under-construction";
  return "under-construction";
};

// ---------- projects: merge every source by slug ----------
const sources = [];
const cityNames = Object.fromEntries(m.idx.CITIES.map((c) => [c.id, c.name]));
sources.push(...m.idx.PROJECTS, ...m.idx.EXCLUSIVE_PROJECTS);
for (const list of Object.values(m.cd.CITY_PROPERTIES)) sources.push(...list);
for (const dev of m.dv.DEVELOPERS_DATA)
  for (const c of dev.cities || [])
    for (const p of c.projects || [])
      sources.push({ ...p, builder: p.builder || dev.name, developerSlug: dev.slug, city: p.city || c.citySlug, cityName: c.name });
sources.push(...m.pd.CANONICAL_PROJECTS);

const bySlug = new Map();
for (const p of sources) {
  const slug = m.pd.getProjectSlug(p);
  const prev = bySlug.get(slug) || {};
  const merged = { ...prev };
  for (const [k, v] of Object.entries(p)) if (v !== undefined && v !== null && v !== "") merged[k] = v;
  merged.slug = slug;
  bySlug.set(slug, merged);
}
const devByName = Object.fromEntries(m.dv.DEVELOPERS_DATA.map((d) => [d.name.toLowerCase(), d.slug]));

const projects = [...bySlug.values()].map((p) => {
  const coords = m.lm.getProjectCoordinates ? m.lm.getProjectCoordinates(p) : null;
  const landmarks = m.lm.getProjectLandmarks ? m.lm.getProjectLandmarks(p) : p.landmarks;
  const flat = p.flatTypes || p.configuration || "";
  const area = areaRange(p.carpetArea);
  const city = (p.city || "mumbai").toLowerCase();
  const priceNumeric = p.priceNumeric || crToNumber(p.price);
  const hasGeo = coords && typeof coords.lat === "number" && typeof coords.lng === "number";
  return {
    slug: p.slug,
    legacyIds: [p.id].filter(Boolean),
    name: p.name || p.title,
    builder: p.builder,
    builderLogo: p.builderLogo,
    developerSlug: p.developerSlug || devByName[String(p.builder || "").toLowerCase()],
    city,
    cityName: p.cityName || cityNames[city],
    location: p.location,
    fullAddress: p.fullAddress,
    price: p.price,
    priceNumeric,
    avgPrice: p.avgPrice,
    flatTypes: flat,
    bhk: bhkList(flat),
    carpetArea: p.carpetArea,
    carpetAreaMin: area.min,
    carpetAreaMax: area.max,
    projectArea: p.projectArea,
    possession: p.possession || p.possessionDate,
    status: p.status,
    statusKey: statusKey(p.status),
    rera: p.rera,
    tag: p.tag,
    isExclusive: m.idx.EXCLUSIVE_PROJECTS.some((e) => e.id === p.id),
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    images: p.images || (p.image ? [p.image] : []),
    features: p.features || [],
    overview: p.overview,
    highlights: p.highlights || [],
    amenities: p.amenities || [],
    floorPlans: p.floorPlans || [],
    landmarks: landmarks || [],
    relatedProjectSlugs: p.relatedProjectSlugs || [],
    propertyType: coords?.propertyType || "Apartment",
    geo: hasGeo ? { type: "Point", coordinates: [coords.lng, coords.lat] } : undefined,
    listingType: "new-project",
    published: true
  };
});

// ---------- cities ----------
const cities = m.idx.CITIES.map((c) => {
  const d = m.cd.CITY_DETAILS[c.id] || {};
  let trends = null;
  try { trends = m.cd.getPriceTrendsForCity(c.id); } catch {}
  return { ...c, ...d, slug: c.id, priceTrends: trends || undefined };
});

// ---------- developers ----------
const developers = m.dv.DEVELOPERS_DATA.map((d) => ({ ...d }));

// ---------- content + transit ----------
const content = {
  testimonials: m.idx.TESTIMONIALS,
  faqs: m.idx.FAQS,
  achievements: m.idx.ACHIEVEMENTS,
  tools: m.idx.SHOTS_TOOLS,
  searchShortcuts: m.idx.SEARCH_SHORTCUTS
};
const transit = Object.values(m.tn.CITY_TRANSIT_NETWORKS).map((n) => ({ cityId: n.cityId, data: n }));

// Page-local constants (blog articles, job openings, offices) live inside page files.
// Pull them out by locating `const NAME = [` ... `\n];` and evaluating the array literal.
const pageConst = (file, name) => {
  const src = readFileSync(path.join(frontend, "src/app", file), "utf8");
  const start = src.indexOf(`const ${name} = [`);
  if (start < 0) return [];
  const end = src.indexOf("\n];", start);
  try { return new Function(`return ${src.slice(start + `const ${name} = `.length, end + 2)}`)(); }
  catch (e) { console.warn(`skip ${name}: ${e.message}`); return []; }
};
const articles = pageConst("blog/page.js", "ARTICLES");
const jobs = pageConst("careers/page.js", "OPEN_POSITIONS");
const offices = pageConst("offices/page.js", "OFFICES");
content.articles = articles; content.jobs = jobs; content.offices = offices;

const w = (n, d) => writeFileSync(path.join(seedDir, n), JSON.stringify(d));
w("projects.json", projects);
w("cities.json", cities);
w("developers.json", developers);
w("content.json", content);
w("transit.json", transit);
console.log({ articles: articles.length, jobs: jobs.length, offices: offices.length, projects: projects.length, withGeo: projects.filter((p) => p.geo).length, cities: cities.length, developers: developers.length, transit: transit.length });
