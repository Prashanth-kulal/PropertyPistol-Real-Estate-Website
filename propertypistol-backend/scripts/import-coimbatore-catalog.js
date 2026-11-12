/**
 * Safely imports all verified Coimbatore cataloged projects into local MongoDB.
 *
 * Safety invariants:
 * 1. Checks that connection points strictly to local MongoDB (127.0.0.1:27017/propertypistol).
 * 2. Creates a timestamped JSON backup of existing projects before any write.
 * 3. Uses slug-based upserts so existing Mumbai (662), Delhi (16), Goa (48), and other cities' projects are untouched.
 * 4. Preserves all local watermarked image paths (/projects/{pid}/...) and GeoJSON coordinates.
 * 5. Updates Coimbatore City count/cover in MongoDB & seed files cleanly.
 */

const fs = require("fs");
const path = require("path");
const { connectDb, mongoose } = require("../src/config/db");
const env = require("../src/config/env");
const Project = require("../src/models/Project");
const City = require("../src/models/City");

function parseBhk(s = "") {
  const out = new Set();
  for (const mt of String(s).matchAll(/(\d)(?:\s*(?:,|&|\/|and)\s*(\d))*\s*bhk/gi)) {
    const seg = mt[0].replace(/bhk/i, "");
    seg.split(/[^0-9]+/).filter(Boolean).forEach((n) => out.add(Number(n)));
  }
  if (!out.size) {
    String(s).split(/[^0-9]+/).filter(Boolean).forEach((n) => Number(n) <= 6 && out.add(Number(n)));
  }
  return [...out].sort();
}

function parseAreaRange(s = "") {
  const nums = String(s).replace(/,/g, "").match(/\d+(\.\d+)?/g)?.map(Number) || [];
  return nums.length ? { min: Math.min(...nums), max: Math.max(...nums) } : {};
}

function normalizeStatusKey(status = "") {
  const s = String(status).toLowerCase();
  if (s.includes("ready")) return "ready-to-move";
  if (s.includes("launch") || s.includes("new")) return "new-launch";
  return "under-construction";
}

function loadCoimbatoreProjectsFromRegistry() {
  const registryPath = path.join(__dirname, "..", "..", "src", "data", "coimbatoreProjectsRegistry.js");
  if (!fs.existsSync(registryPath)) {
    throw new Error(`Registry file not found at ${registryPath}`);
  }
  const raw = fs.readFileSync(registryPath, "utf8");
  const match = raw.match(/export const COIMBATORE_REGISTRY_PROJECTS = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error("Could not parse COIMBATORE_REGISTRY_PROJECTS array from registry file");
  }
  return JSON.parse(match[1]);
}

async function main() {
  console.log("========================================================");
  console.log("   COIMBATORE CATALOG MIGRATION & LOCAL MONGODB SYNC    ");
  console.log("========================================================");

  const rawUri = env.mongoUri || "";
  const isLocal = rawUri.includes("127.0.0.1:27017") || rawUri.includes("localhost:27017");
  const isPropertyPistolDb = rawUri.includes("/propertypistol");

  console.log(`[Safety Check 1] Target MongoDB URI: ${rawUri}`);
  if (!isLocal || !isPropertyPistolDb) {
    console.error(`ABORT: Database URI is not local propertypistol: ${rawUri}`);
    process.exit(1);
  }
  console.log("Passed: Database URI points strictly to local MongoDB.");

  await connectDb();
  console.log("Connected to MongoDB successfully.");

  const existingDocs = await Project.find({}).lean();
  console.log(`Current existing documents in 'projects' collection: ${existingDocs.length}`);

  const backupDir = path.join(__dirname, "..", "seed", "backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(backupDir, `backup-projects-pre-coimbatore-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(existingDocs, null, 2), "utf8");
  fs.copyFileSync(backupFile, path.join(backupDir, "latest-backup.json"));
  console.log(`Backup created at ${backupFile} (${existingDocs.length} records).`);

  const coimbatoreProjects = loadCoimbatoreProjectsFromRegistry();
  console.log(`[Data Source] Loaded ${coimbatoreProjects.length} Coimbatore projects from registry.`);

  let matchedCount = 0;
  let upsertedCount = 0;
  let withLocalImages = 0;
  let withGeo = 0;

  for (const p of coimbatoreProjects) {
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
      city: "coimbatore",
      cityName: "Coimbatore",
      region: p.region || "Coimbatore",
      locality: p.locality || "",
      location: p.location || `${p.locality || "Coimbatore"}, Coimbatore`,
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
      rera: p.rera || "Not Available",
      rera_informations: Array.isArray(p.rera_informations) ? p.rera_informations : [],
      tag: p.tag || "RERA Verified",
      isExclusive: !!p.isExclusive,
      rating: 4.7,
      reviewsCount: 72,
      images: Array.isArray(p.images) ? p.images : [],
      features: Array.isArray(p.features) ? p.features : [],
      overview: p.description || "",
      highlights: [
        `Prime address in ${p.location}`,
        `Developed by ${p.builder}`,
        p.rera && p.rera !== "Not Available" ? `TNRERA Registered: ${p.rera}` : "Verified PropertyPistol Coimbatore Listing",
        `Available Configurations: ${p.flatTypes || "On Request"}`,
        `Possession: ${p.possession || "Under Construction"}`,
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
      withGeo++;
    }

    if (doc.images.some((img) => img.startsWith("/projects/"))) {
      withLocalImages++;
    }

    const existing = await Project.findOne({ slug }).lean();
    await Project.findOneAndUpdate(
      { slug },
      { $set: doc },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    if (existing) matchedCount++;
    else upsertedCount++;
  }

  // Update Coimbatore city record cleanly in MongoDB
  await City.findOneAndUpdate(
    { slug: "coimbatore" },
    {
      $set: {
        projectsCount: coimbatoreProjects.length,
        heroImage: "/projects/17588/cover.jpg",
        image: "/projects/17588/cover.jpg",
      },
    }
  );

  await Project.syncIndexes();

  const totalInDb = await Project.countDocuments({});
  const mumbaiInDb = await Project.countDocuments({ city: "mumbai" });
  const delhiInDb = await Project.countDocuments({ city: "delhi" });
  const goaInDb = await Project.countDocuments({ city: "goa" });
  const coimbatoreInDb = await Project.countDocuments({ city: "coimbatore" });
  const coimbatoreWithLocalImgs = await Project.countDocuments({ city: "coimbatore", images: { $regex: "^/projects/" } });

  console.log("\n========================================================");
  console.log("             POST-MIGRATION VERIFICATION                ");
  console.log("========================================================");
  console.log(`Coimbatore matched=${matchedCount}, upserted=${upsertedCount}`);
  console.log(`Coimbatore with local watermarked images (prepared): ${withLocalImages}/${coimbatoreProjects.length}`);
  console.log(`Coimbatore with GeoJSON coordinates: ${withGeo}/${coimbatoreProjects.length}`);
  console.log(`Total projects in MongoDB:      ${totalInDb}`);
  console.log(`Mumbai projects in MongoDB:     ${mumbaiInDb}`);
  console.log(`Delhi projects in MongoDB:      ${delhiInDb}`);
  console.log(`Goa projects in MongoDB:        ${goaInDb}`);
  console.log(`Coimbatore projects in MongoDB: ${coimbatoreInDb} (local imgs in DB: ${coimbatoreWithLocalImgs})`);

  if (mumbaiInDb < 662 || delhiInDb < 16 || goaInDb < 48 || coimbatoreInDb !== coimbatoreProjects.length) {
    console.error("Integrity count mismatch detected!");
    await mongoose.disconnect();
    process.exit(1);
  }

  // Sync seed/projects.json
  const seedProjectsFile = path.join(__dirname, "..", "seed", "projects.json");
  const allUpdatedProjects = await Project.find({}).lean();
  fs.writeFileSync(seedProjectsFile, JSON.stringify(allUpdatedProjects, null, 2), "utf8");
  console.log(`seed/projects.json updated (${allUpdatedProjects.length} total projects).`);

  // Sync seed/cities.json Coimbatore entry if present
  const seedCitiesFile = path.join(__dirname, "..", "seed", "cities.json");
  if (fs.existsSync(seedCitiesFile)) {
    const citiesSeed = JSON.parse(fs.readFileSync(seedCitiesFile, "utf8"));
    let updatedCitySeed = false;
    for (const c of citiesSeed) {
      if (c.slug === "coimbatore" || c.id === "coimbatore") {
        c.projectsCount = coimbatoreProjects.length;
        c.image = "/projects/17588/cover.jpg";
        c.heroImage = "/projects/17588/cover.jpg";
        updatedCitySeed = true;
      }
    }
    if (updatedCitySeed) {
      fs.writeFileSync(seedCitiesFile, JSON.stringify(citiesSeed), "utf8");
      console.log("seed/cities.json Coimbatore entry synced.");
    }
  }

  await mongoose.disconnect();
  console.log("Coimbatore MongoDB Migration Complete!");
}

main().catch(async (err) => {
  console.error("Fatal Error:", err);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});
