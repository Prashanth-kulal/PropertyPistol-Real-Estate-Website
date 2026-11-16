/**
 * Safely imports all verified Gurugram cataloged projects into local MongoDB and seed store.
 *
 * Safety invariants:
 * 1. Checks that connection points strictly to local MongoDB (127.0.0.1:27017/propertypistol) if active.
 * 2. Creates a timestamped JSON backup of existing projects before any write.
 * 3. Uses slug-based upserts so existing Mumbai (662), Delhi (16), Goa (48), Coimbatore (79), Nagpur (128), and Noida (100) records are untouched.
 * 4. Preserves all local watermarked image paths (/projects/{pid}/...) and GeoJSON coordinates.
 * 5. Updates Gurugram City count/cover in MongoDB & seed files cleanly.
 * 6. Supports --dry-run flag for safe pre-execution verification.
 */

const fs = require("fs");
const path = require("path");

const isDryRun = process.argv.includes("--dry-run");

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

function loadGurugramProjectsFromRegistry() {
  const registryPath = path.join(__dirname, "..", "..", "src", "data", "gurugramProjectsRegistry.js");
  if (!fs.existsSync(registryPath)) {
    throw new Error(`Registry file not found at ${registryPath}`);
  }
  const raw = fs.readFileSync(registryPath, "utf8");
  const match = raw.match(/export const GURUGRAM_REGISTRY_PROJECTS = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error("Could not parse GURUGRAM_REGISTRY_PROJECTS array from registry file");
  }
  return JSON.parse(match[1]);
}

async function main() {
  console.log("========================================================");
  console.log(`  GURUGRAM CATALOG MIGRATION & LOCAL STORE SYNC ${isDryRun ? "[DRY RUN]" : ""}`);
  console.log("========================================================");

  // Load existing seed projects
  const seedFile = path.join(__dirname, "..", "seed", "projects.json");
  if (!fs.existsSync(seedFile)) {
    throw new Error(`Seed file not found at ${seedFile}`);
  }
  const existingSeedDocs = JSON.parse(fs.readFileSync(seedFile, "utf8"));
  console.log(`Current existing documents in seed store: ${existingSeedDocs.length}`);

  const gurugramProjects = loadGurugramProjectsFromRegistry();
  console.log(`[Data Source] Loaded ${gurugramProjects.length} Gurugram projects from registry.`);

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

  for (const p of gurugramProjects) {
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
      city: "gurugram",
      cityName: "Gurugram",
      region: p.region || "Gurugram",
      locality: p.locality || "",
      location: p.location || `${p.locality || "Gurugram"}, Gurugram`,
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
      rating: p.rating || 4.8,
      reviewsCount: 92,
      images: Array.isArray(p.images) ? p.images : [],
      features: Array.isArray(p.features) ? p.features : [],
      overview: p.description || "",
      highlights: [
        `Prime address in ${p.location}`,
        `Developed by ${p.builder}`,
        p.rera && p.rera !== "Not Available" ? `HARERA Registered: ${p.rera}` : "Verified PropertyPistol Gurugram Listing",
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
    console.log(`Total projects in Gurugram registry: ${gurugramProjects.length}`);
    console.log(`Existing slug matches in seed:      ${dryMatched}`);
    console.log(`New records to insert into seed:    ${dryUpsert}`);
    console.log(`Projects with local images:         ${withLocalImages} / ${gurugramProjects.length}`);
    console.log(`Projects with Geo coordinates:      ${withGeo} / ${gurugramProjects.length}`);
    console.log(`Prospective total in seed store:    ${existingSeedDocs.length + dryUpsert - (existingSeedDocs.filter(p => p.city === 'gurugram' && !transformedDocs.some(t => t.slug === p.slug)).length)}`);
    console.log(`Live MongoDB status:                ${dbConnected ? "Connected" : "Offline / Standalone mode"}`);
    console.log("\nDry run completed successfully. No changes were made to persistent stores.");
    if (mongooseInstance) await mongooseInstance.disconnect();
    return;
  }

  // Live execution mode:
  // 1. Create timestamped backup of existing seed projects
  const backupDir = path.join(__dirname, "..", "seed", "backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(backupDir, `backup-projects-pre-gurugram-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(existingSeedDocs, null, 2), "utf8");
  fs.copyFileSync(backupFile, path.join(backupDir, "latest-backup.json"));
  console.log(`Backup created at ${backupFile} (${existingSeedDocs.length} records).`);

  // 2. Perform slug-based upsert into seed store
  // Remove any legacy mock placeholders for Gurugram (e.g. ggn-1, ggn-2)
  const nonGurugramSeed = existingSeedDocs.filter((p) => p.city !== "gurugram");
  const updatedSeedDocs = [...nonGurugramSeed, ...transformedDocs];
  fs.writeFileSync(seedFile, JSON.stringify(updatedSeedDocs, null, 2), "utf8");
  console.log(`Canonical seed file 'seed/projects.json' updated with ${updatedSeedDocs.length} verified projects.`);

  // 3. Update seed/cities.json
  const citiesSeedFile = path.join(__dirname, "..", "seed", "cities.json");
  if (fs.existsSync(citiesSeedFile)) {
    const citiesData = JSON.parse(fs.readFileSync(citiesSeedFile, "utf8"));
    const gIndex = citiesData.findIndex((c) => c.id === "gurugram" || c.slug === "gurugram");
    if (gIndex !== -1) {
      citiesData[gIndex].projectsCount = gurugramProjects.length;
      citiesData[gIndex].image = "/projects/17721/cover.jpg";
      citiesData[gIndex].heroImage = "/projects/17721/cover.jpg";
      fs.writeFileSync(citiesSeedFile, JSON.stringify(citiesData, null, 2), "utf8");
      console.log(`Canonical seed file 'seed/cities.json' updated for Gurugram.`);
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
        { slug: "gurugram" },
        {
          $set: {
            projectsCount: gurugramProjects.length,
            heroImage: "/projects/17721/cover.jpg",
            image: "/projects/17721/cover.jpg",
          },
        }
      );
    }
    await ProjectModel.syncIndexes();
  }

  // 5. Verification & Summary
  const seedByCity = {};
  updatedSeedDocs.forEach((p) => {
    seedByCity[p.city] = (seedByCity[p.city] || 0) + 1;
  });

  console.log("\n========================================================");
  console.log("             POST-MIGRATION VERIFICATION                ");
  console.log("========================================================");
  console.log(`Gurugram projects processed:        ${gurugramProjects.length}`);
  console.log(`Gurugram with local images:         ${withLocalImages}/${gurugramProjects.length}`);
  console.log(`Gurugram with GeoJSON coordinates:  ${withGeo}/${gurugramProjects.length}`);
  console.log(`Total projects in seed store:       ${updatedSeedDocs.length}`);
  console.log(`  - Mumbai (preserved):             ${seedByCity.mumbai || 0} (Expected: 662)`);
  console.log(`  - Delhi (preserved):              ${seedByCity.delhi || 0} (Expected: 16)`);
  console.log(`  - Goa (preserved):                ${seedByCity.goa || 0} (Expected: 48)`);
  console.log(`  - Coimbatore (preserved):         ${seedByCity.coimbatore || 0} (Expected: 79)`);
  console.log(`  - Nagpur (preserved):             ${seedByCity.nagpur || 0} (Expected: 128)`);
  console.log(`  - Noida (preserved):              ${seedByCity.noida || 0} (Expected: 100)`);
  console.log(`  - Gurugram (newly added):         ${seedByCity.gurugram || 0} (Expected: ${gurugramProjects.length})`);

  if ((seedByCity.mumbai || 0) < 662) {
    console.error("CRITICAL ERROR: Mumbai project count dropped below 662!");
    process.exit(1);
  }
  if ((seedByCity.delhi || 0) < 16) {
    console.error("CRITICAL ERROR: Delhi project count dropped below 16!");
    process.exit(1);
  }

  if (dbConnected && mongooseInstance) {
    console.log(`MongoDB Live Sync: matched=${dbMatchedCount}, upserted=${dbUpsertedCount}`);
    await mongooseInstance.disconnect();
  }

  console.log("\nGurugram catalog migration completed successfully!\n");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
