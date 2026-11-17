import fs from 'fs';
import path from 'path';
import net from 'net';

function parseBhk(s = "") {
  const out = new Set();
  for (const mt of String(s).matchAll(/(\d)(?:\s*(?:,|&|\/|and)\s*(\d))*\s*(?:bhk|bedroom|bed|br)/gi)) {
    const seg = mt[0].replace(/(?:bhk|bedroom|bed|br)/gi, "");
    for (const d of seg.matchAll(/\d/g)) {
      out.add(Number(d[0]));
    }
  }
  return Array.from(out).sort((a, b) => a - b);
}

function parseAreaRange(s = "") {
  const m = String(s).match(/(\d[\d,]*)\s*(?:-|to)\s*(\d[\d,]*)/i);
  if (m) {
    const min = Number(m[1].replace(/,/g, ""));
    const max = Number(m[2].replace(/,/g, ""));
    return { min, max };
  }
  const single = String(s).match(/(\d[\d,]*)/);
  if (single) {
    const v = Number(single[1].replace(/,/g, ""));
    return { min: v, max: v };
  }
  return { min: null, max: null };
}

function normalizeStatusKey(s = "") {
  const t = String(s).toLowerCase();
  if (t.includes("ready")) return "ready-to-move";
  if (t.includes("launch") || t.includes("new")) return "new-launch";
  return "under-construction";
}

// 1. Load registries
const dubaiRaw = fs.readFileSync('src/data/dubaiProjectsRegistry.js', 'utf8');
const dubaiMatch = dubaiRaw.match(/export const DUBAI_REGISTRY_PROJECTS = (\[[\s\S]*?\n\]);/);
const dubaiProjects = JSON.parse(dubaiMatch[1]);

const kochiRaw = fs.readFileSync('src/data/kochiProjectsRegistry.js', 'utf8');
const kochiMatch = kochiRaw.match(/export const KOCHI_REGISTRY_PROJECTS = (\[[\s\S]*?\n\]);/);
const kochiProjects = JSON.parse(kochiMatch[1]);

console.log(`Loaded ${dubaiProjects.length} Dubai projects.`);
console.log(`Loaded ${kochiProjects.length} Kochi projects.`);

// 2. Transform Dubai Projects
const transformedDubai = dubaiProjects.map((p) => {
  const areaSource = p.carpetArea && p.carpetArea !== "On Request" ? p.carpetArea : p.builtUpArea;
  const area = parseAreaRange(areaSource);
  const bhk = parseBhk(p.flatTypes);
  const hasCoords = typeof p.lat === "number" && typeof p.lng === "number" && p.lat !== 0 && p.lng !== 0;
  const slug = String(p.slug).toLowerCase().trim();

  const doc = {
    slug,
    legacyIds: [String(p.id)],
    projectId: Number(p.id),
    name: p.name,
    builder: p.builder,
    builderLogo: p.builderLogo || "",
    developerSlug: p.developerSlug || "",
    city: "dubai",
    cityName: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    currency: "AED",
    currencySymbol: "AED",
    region: p.region || "Dubai",
    locality: p.locality || "Dubai",
    location: p.location || `${p.locality || "Dubai"}, ${p.region || "Dubai"}`,
    fullAddress: p.fullAddress || "",
    price: p.price || "On Request",
    priceNumeric: typeof p.priceNumeric === "number" ? p.priceNumeric : 0,
    avgPrice: p.avgPrice || "On Request",
    flatTypes: p.flatTypes || "Residential",
    bhk,
    carpetArea: p.carpetArea || "On Request",
    carpetAreaMin: area.min,
    carpetAreaMax: area.max,
    projectArea: p.projectArea || "On Request",
    possession: p.possession || "Under Construction",
    status: p.status || "Under Construction",
    statusKey: normalizeStatusKey(p.status),
    rera: p.rera || "DLD / RERA Verified",
    rera_informations: Array.isArray(p.rera_informations) ? p.rera_informations : [],
    tag: p.tag || "DLD Verified",
    isExclusive: !!p.isExclusive,
    rating: p.rating || 4.8,
    reviewsCount: 88,
    images: Array.isArray(p.images) ? p.images : [],
    features: Array.isArray(p.features) ? p.features : [],
    overview: p.description || "",
    highlights: [
      `Prime address in ${p.location}`,
      `Developed by ${p.builder}`,
      p.rera && p.rera !== "DLD / RERA Verified" ? `DLD / RERA Permit: ${p.rera}` : "Verified PropertyPistol Dubai Listing",
      `Available Configurations: ${p.flatTypes || "On Request"}`,
      `Possession: ${p.possession || "Under Construction"}`,
      "Zero Income Tax & 10-Year Golden Visa Corridor"
    ],
    propertyType: p.type || "Apartment",
    listingType: "new-project",
    source: "catalog",
    published: true,
    views: 0,
  };

  if (hasCoords) {
    doc.geo = {
      type: "Point",
      coordinates: [p.lng, p.lat],
    };
  }

  return doc;
});

// 3. Transform Kochi Projects
const transformedKochi = kochiProjects.map((p) => {
  const areaSource = p.carpetArea && p.carpetArea !== "On Request" ? p.carpetArea : p.builtUpArea;
  const area = parseAreaRange(areaSource);
  const bhk = parseBhk(p.flatTypes || p.configuration);
  const hasCoords = typeof p.lat === "number" && typeof p.lng === "number" && p.lat !== 0 && p.lng !== 0;
  const slug = String(p.slug).toLowerCase().trim();

  const doc = {
    slug,
    legacyIds: [String(p.id)],
    projectId: Number(p.id),
    name: p.name,
    builder: p.builder,
    builderLogo: p.builderLogo || "",
    developerSlug: p.developerSlug || "",
    city: "kochi",
    cityName: "Kochi",
    region: p.region || "Kochi",
    locality: p.locality || "",
    location: p.location || `${p.locality || "Kochi"}, Kochi`,
    fullAddress: p.fullAddress || "",
    price: p.price || "On Request",
    priceNumeric: typeof p.priceNumeric === "number" ? p.priceNumeric : 0,
    avgPrice: p.avgPrice || "On Request",
    minPricePerSqft: p.minPricePerSqft || "On Request",
    flatTypes: p.flatTypes || "Residential",
    configuration: p.configuration || p.flatTypes || "Residential",
    bhk,
    carpetArea: p.carpetArea || "On Request",
    builtUpArea: p.builtUpArea || "On Request",
    carpetAreaMin: area.min,
    carpetAreaMax: area.max,
    projectArea: p.projectArea || "On Request",
    possession: p.possession || "Under Construction",
    possessionStatus: p.possessionStatus || "Under Construction",
    possessionDate: p.possessionDate || "Under Construction",
    status: p.status || "Under Construction",
    statusKey: normalizeStatusKey(p.status),
    rera: p.rera || "Not Available",
    rera_informations: Array.isArray(p.rera_informations) ? p.rera_informations : [],
    tag: p.tag || "K-RERA Verified",
    offersBadge: p.offersBadge || "Offers Available",
    isExclusive: p.priceNumeric > 20000000,
    isFeatured: true,
    rating: p.rating || 4.8,
    reviewsCount: 65,
    images: Array.isArray(p.images) ? p.images : [],
    features: Array.isArray(p.features) ? p.features : [],
    amenities: Array.isArray(p.features) ? p.features : [],
    overview: p.description || "",
    description: p.description || "",
    highlights: [
      `Prime address in ${p.location}`,
      `Developed by ${p.builder}`,
      p.rera && p.rera !== "Not Available" ? `K-RERA Registration: ${p.rera}` : "Verified PropertyPistol Kochi Listing",
      `Available Configurations: ${p.flatTypes || "On Request"}`,
      `Possession: ${p.possession || "Under Construction"}`
    ],
    propertyType: p.type || "Apartment",
    listingType: "new-project",
    source: "catalog",
    published: true,
    views: 0,
  };

  if (hasCoords) {
    doc.geo = {
      type: "Point",
      coordinates: [p.lng, p.lat],
    };
  }

  return doc;
});

// 4. Update seed/projects.json
const seedProjectsPath = path.join('propertypistol-backend', 'seed', 'projects.json');
const existingProjects = JSON.parse(fs.readFileSync(seedProjectsPath, 'utf8'));
console.log(`Existing projects in seed before update: ${existingProjects.length}`);

// Backup existing projects file safely (without touching latest-backup.json)
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = path.join('propertypistol-backend', 'seed', 'backups', `backup-projects-pre-dubai-kochi-${timestamp}.json`);
fs.writeFileSync(backupPath, JSON.stringify(existingProjects, null, 2), 'utf8');
console.log(`Created backup at ${backupPath}`);

// Remove any existing placeholder dubai or kochi records
const baseProjects = existingProjects.filter(p => p.city !== 'dubai' && p.city !== 'kochi');
console.log(`Base projects (excluding old dubai/kochi): ${baseProjects.length}`);

const mergedProjects = [...baseProjects, ...transformedDubai, ...transformedKochi];
fs.writeFileSync(seedProjectsPath, JSON.stringify(mergedProjects, null, 2), 'utf8');
console.log(`Updated ${seedProjectsPath} with ${mergedProjects.length} total projects.`);

// 5. Update seed/cities.json
const seedCitiesPath = path.join('propertypistol-backend', 'seed', 'cities.json');
const existingCities = JSON.parse(fs.readFileSync(seedCitiesPath, 'utf8'));

for (const c of existingCities) {
  if (c.id === 'dubai') {
    c.projectsCount = 514;
    c.image = '/projects/18232/cover.jpg';
    c.heroImage = '/projects/18232/cover.jpg';
  } else if (c.id === 'kochi') {
    c.projectsCount = 28;
    c.image = '/projects/11928/cover.jpg';
    c.heroImage = '/projects/11928/cover.jpg';
  }
}
fs.writeFileSync(seedCitiesPath, JSON.stringify(existingCities, null, 2), 'utf8');
console.log(`Updated ${seedCitiesPath} successfully.`);

// 6. Probe MongoDB port 27017
const socket = new net.Socket();
socket.setTimeout(2000);
socket.on('connect', () => {
  console.log('MongoDB service check: Port 27017 is OPEN (MongoDB running).');
  socket.destroy();
});
socket.on('timeout', () => {
  console.log('MongoDB service check: Connection timed out (MongoDB service offline).');
  socket.destroy();
});
socket.on('error', (err) => {
  console.log(`MongoDB service check: ${err.message} (MongoDB service offline - import status: Pending).`);
});
socket.connect(27017, '127.0.0.1');
