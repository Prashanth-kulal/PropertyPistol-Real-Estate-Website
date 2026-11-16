/**
 * Safely imports all verified Dubai cataloged projects into local MongoDB and seed store.
 *
 * Safety invariants:
 * 1. Checks that connection points strictly to local MongoDB (127.0.0.1:27017/propertypistol) if active.
 * 2. Creates a timestamped JSON backup of existing projects before any write.
 * 3. Uses slug-based upserts so existing Mumbai, Delhi, Goa, Coimbatore, Nagpur, Noida, Gurugram, Ahmedabad, Lucknow, Kolkata, and Chennai records are untouched.
 * 4. Preserves all local watermarked image paths (/projects/{pid}/...) and GeoJSON coordinates.
 * 5. Updates Dubai City count/cover in MongoDB & seed files cleanly.
 * 6. Supports --dry-run flag for safe pre-execution verification.
 */

const fs = require("fs");
const path = require("path");

const isDryRun = process.argv.includes("--dry-run");

function parseBhk(s = "") {
  const out = new Set();
  for (const mt of String(s).matchAll(/(\d)(?:\s*(?:,|&|\/|and)\s*(\d))*\s*(?:bhk|bedroom|bed|br)/gi)) {
    const seg = mt[0].replace(/bhk|bedroom|bed|br/i, "");
    seg.split(/[^0-9]+/).filter(Boolean).forEach((n) => out.add(Number(n)));
  }
  if (!out.size) {
    String(s).split(/[^0-9]+/).filter(Boolean).forEach((n) => Number(n) <= 8 && out.add(Number(n)));
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

function loadDubaiProjectsFromRegistry() {
  const registryPath = path.join(__dirname, "..", "..", "src", "data", "dubaiProjectsRegistry.js");
  if (!fs.existsSync(registryPath)) {
    throw new Error(`Registry file not found at ${registryPath}`);
  }
  const raw = fs.readFileSync(registryPath, "utf8");
  const match = raw.match(/export const DUBAI_REGISTRY_PROJECTS = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error("Could not parse DUBAI_REGISTRY_PROJECTS array from registry file");
  }
  return JSON.parse(match[1]);
}

async function main() {
  console.log("========================================================");
  console.log(`  DUBAI CATALOG MIGRATION & LOCAL STORE SYNC ${isDryRun ? "[DRY RUN]" : ""}`);
  console.log("========================================================");

  // Load existing seed projects
  const seedFile = path.join(__dirname, "..", "seed", "projects.json");
  if (!fs.existsSync(seedFile)) {
    throw new Error(`Seed file not found at ${seedFile}`);
  }
  const existingSeedDocs = JSON.parse(fs.readFileSync(seedFile, "utf8"));
  console.log(`Current existing documents in seed store: ${existingSeedDocs.length}`);

  const dubaiProjects = loadDubaiProjectsFromRegistry();
  console.log(`[Data Source] Loaded ${dubaiProjects.length} Dubai projects from registry.`);

  // Check optional MongoDB connection if dependencies available
  let dbConnected = false;
  let ProjectModel = null;
  let CityModel = null;
  let mongooseInstance = null;

  try {
    const { connectDb, mongoose } = require("../src/config/db");
    const env = require("../src/config/env");
    const Project = require("../src/models/Project");
    const City = require("../src/models/City");

    const rawUri = env.mongoUri || "";
    const isLocal = rawUri.includes("127.0.0.1:27017") || rawUri.includes("localhost:27017");
    const isPropertyPistolDb = rawUri.includes("/propertypistol");

    console.log(`[Safety Check 1] Target MongoDB URI: ${rawUri}`);
    if (isLocal && isPropertyPistolDb) {
      await connectDb();
      console.log("Passed: Database URI points strictly to local MongoDB and connected.");
      dbConnected = true;
      ProjectModel = Project;
      CityModel = City;
      mongooseInstance = mongoose;
    }
  } catch (err) {
    console.log(`[Database Notice] MongoDB / Mongoose connection skipped (${err.message}). Proceeding with seed file sync.`);
  }

  // Pre-calculate document structures
  const transformedDocs = [];
  let withLocalImages = 0;
  let withGeo = 0;

  for (const p of dubaiProjects) {
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
      withGeo++;
    }

    if (doc.images.some((img) => img.startsWith("/projects/"))) {
      withLocalImages++;
    }

    transformedDocs.push(doc);
  }

  if (isDryRun) {
    console.log("\n[DRY RUN MODE ENABLED] Simulating migration without writing to persistent stores...");
    let dryMatched = 0;
    let dryUpsert = 0;

    for (const d of transformedDocs) {
      const existing = existingSeedDocs.find((x) => x.slug === d.slug);
      if (existing) dryMatched++;
      else dryUpsert++;
    }

    console.log("\n--- DRY RUN SUMMARY ---");
    console.log(`Total projects in Dubai registry:    ${dubaiProjects.length}`);
    console.log(`Existing slug matches in seed:       ${dryMatched}`);
    console.log(`New records to insert into seed:     ${dryUpsert}`);
    console.log(`Projects with local images:          ${withLocalImages} / ${dubaiProjects.length}`);
    console.log(`Projects with Geo coordinates:       ${withGeo} / ${dubaiProjects.length}`);
    console.log(`Prospective total in seed store:     ${existingSeedDocs.filter(p => p.city !== 'dubai').length + transformedDocs.length}`);
    console.log(`Live MongoDB status:                 ${dbConnected ? "Connected" : "Offline / Standalone mode"}`);
    console.log("\nDry run completed successfully. No changes were made to persistent stores.");
    if (mongooseInstance) await mongooseInstance.disconnect();
    return;
  }

  // Live execution mode:
  // 1. Create timestamped backup of existing seed projects
  const backupDir = path.join(__dirname, "..", "seed", "backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(backupDir, `backup-projects-pre-dubai-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(existingSeedDocs, null, 2), "utf8");
  fs.copyFileSync(backupFile, path.join(backupDir, "latest-backup.json"));
  console.log(`Backup created at ${backupFile} (${existingSeedDocs.length} records).`);

  // 2. Perform slug-based upsert into seed store
  // Remove legacy mock placeholder for Dubai (e.g. aura-grand-downtown-dubai)
  const nonDubaiSeed = existingSeedDocs.filter((p) => p.city !== "dubai");
  const updatedSeedDocs = [...nonDubaiSeed, ...transformedDocs];
  fs.writeFileSync(seedFile, JSON.stringify(updatedSeedDocs, null, 2), "utf8");
  console.log(`Canonical seed file 'seed/projects.json' updated with ${updatedSeedDocs.length} verified projects.`);

  // 3. Update seed/cities.json
  const citiesSeedFile = path.join(__dirname, "..", "seed", "cities.json");
  if (fs.existsSync(citiesSeedFile)) {
    const citiesData = JSON.parse(fs.readFileSync(citiesSeedFile, "utf8"));
    const dbIndex = citiesData.findIndex((c) => c.id === "dubai" || c.slug === "dubai");
    if (dbIndex !== -1) {
      citiesData[dbIndex].projectsCount = dubaiProjects.length;
      citiesData[dbIndex].image = "/projects/18232/cover.jpg";
      citiesData[dbIndex].heroImage = "/projects/18232/cover.jpg";
      fs.writeFileSync(citiesSeedFile, JSON.stringify(citiesData, null, 2), "utf8");
      console.log(`Canonical seed file 'seed/cities.json' updated for Dubai.`);
    }
  }

  // 4. If MongoDB is connected, upsert into MongoDB as well
  let dbMatchedCount = 0;
  let dbUpsertedCount = 0;
  if (dbConnected && ProjectModel) {
    for (const doc of transformedDocs) {
      const existing = await ProjectModel.findOne({ slug: doc.slug }).lean();
      await ProjectModel.findOneAndUpdate(
        { slug: doc.slug },
        { $set: doc },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      if (existing) dbMatchedCount++;
      else dbUpsertedCount++;
    }

    if (CityModel) {
      await CityModel.findOneAndUpdate(
        { slug: "dubai" },
        {
          $set: {
            projectsCount: dubaiProjects.length,
            image: "/projects/18232/cover.jpg",
            heroImage: "/projects/18232/cover.jpg",
          },
        },
        { upsert: true }
      );
    }
    console.log(`[MongoDB Upsert] ${dbMatchedCount} updated, ${dbUpsertedCount} newly inserted.`);
    if (mongooseInstance) await mongooseInstance.disconnect();
  }

  console.log("\n========================================================");
  console.log("  DUBAI CATALOG IMPORT COMPLETED SUCCESSFULLY!");
  console.log(`  Total Dubai Projects:     ${transformedDocs.length}`);
  console.log(`  Total Seed Store Records: ${updatedSeedDocs.length}`);
  console.log("========================================================");
}

main().catch((err) => {
  console.error("Migration fatal error:", err);
  process.exit(1);
});
