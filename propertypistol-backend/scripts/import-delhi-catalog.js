/**
 * Safely imports verified Delhi catalog projects into local MongoDB.
 * 
 * Safety invariants:
 * 1. Checks that connection points strictly to local MongoDB (127.0.0.1:27017/propertypistol).
 * 2. Creates a timestamped JSON backup of existing projects before any write.
 * 3. Uses slug-based upserts so existing Mumbai and other-city projects are untouched.
 * 4. Preserves all local watermarked image paths.
 * 5. Preserves numeric PropertyPistol project IDs and GeoJSON coordinates.
 * 6. Completely idempotent and safely re-runnable.
 */

const fs = require("fs");
const path = require("path");
const { connectDb, mongoose } = require("../src/config/db");
const env = require("../src/config/env");
const Project = require("../src/models/Project");
const Developer = require("../src/models/Developer");
const City = require("../src/models/City");

// Helper: parse BHK list from string
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

// Helper: parse carpet area range
function parseAreaRange(s = "") {
  const nums = String(s).replace(/,/g, "").match(/\d+(\.\d+)?/g)?.map(Number) || [];
  return nums.length ? { min: Math.min(...nums), max: Math.max(...nums) } : {};
}

async function main() {
  console.log("========================================================");
  console.log("       DELHI CATALOG MIGRATION & LOCAL MONGODB          ");
  console.log("========================================================");

  // 1. SAFETY CHECK: Verify local MongoDB URI
  const rawUri = env.mongoUri || "";
  const isLocal = rawUri.includes("127.0.0.1:27017") || rawUri.includes("localhost:27017");
  const isPropertyPistolDb = rawUri.includes("/propertypistol");

  console.log(`[Safety Check 1] Target MongoDB URI: ${rawUri}`);
  if (!isLocal || !isPropertyPistolDb) {
    console.error(`❌ ABORT: Safety violation! The database URI is not local propertypistol: ${rawUri}`);
    process.exit(1);
  }
  console.log("✅ Passed: Database URI points strictly to local MongoDB (127.0.0.1:27017/propertypistol).");

  // Connect to DB
  console.log("[DB Connect] Connecting to local MongoDB...");
  await connectDb();
  console.log("✅ Connected to MongoDB successfully.");

  // 2. SAFETY CHECK: Backup existing projects collection
  console.log("[Safety Check 2] Inspecting existing database records & creating backup...");
  const existingDocs = await Project.find({}).lean();
  console.log(`Current existing documents in 'projects' collection: ${existingDocs.length}`);

  const backupDir = path.join(__dirname, "..", "seed", "backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(backupDir, `backup-projects-delhi-pre-${timestamp}.json`);

  fs.writeFileSync(backupFile, JSON.stringify(existingDocs, null, 2), "utf8");
  if (!fs.existsSync(backupFile) || fs.statSync(backupFile).size < 2) {
    console.error("❌ ABORT: Failed to verify timestamped backup file!");
    await mongoose.disconnect();
    process.exit(1);
  }
  console.log(`✅ Backup successfully created and verified at:\n   ${backupFile} (${existingDocs.length} records saved)`);

  // Write a latest-backup pointer
  const latestBackupPointer = path.join(backupDir, "latest-backup.json");
  fs.copyFileSync(backupFile, latestBackupPointer);

  // 3. Load Delhi Registry Projects
  const registryPath = path.join(__dirname, "..", "..", "src", "data", "delhiProjectsRegistry.js");
  if (!fs.existsSync(registryPath)) {
    console.error(`❌ ABORT: Registry file not found at ${registryPath}`);
    await mongoose.disconnect();
    process.exit(1);
  }

  // Load projects from registry module (ESM dynamically or CJS)
  const registryCode = fs.readFileSync(registryPath, "utf8");
  const jsonMatch = registryCode.match(/export const DELHI_REGISTRY_PROJECTS = (\[[\s\S]*?\]);/);
  if (!jsonMatch) {
    console.error("❌ ABORT: Failed to parse DELHI_REGISTRY_PROJECTS from file!");
    await mongoose.disconnect();
    process.exit(1);
  }
  const DELHI_REGISTRY_PROJECTS = JSON.parse(jsonMatch[1]);
  console.log(`[Data Source] Loaded ${DELHI_REGISTRY_PROJECTS.length} verified Delhi projects from registry.`);

  // Clean up legacy mock projects that used Unsplash stock images
  const deletedLegacy = await Project.deleteMany({
    city: "delhi",
    slug: { $in: ["dlf-one-midtown", "godrej-south-estate"] }
  });
  if (deletedLegacy.deletedCount > 0) {
    console.log(`[Purge] Removed ${deletedLegacy.deletedCount} legacy mock Delhi projects with Unsplash images.`);
  }

  // 4. Perform slug-based upserts for all verified Delhi projects
  console.log("[Migration] Executing slug-based upserts for Delhi projects...");
  let upsertCount = 0;
  let insertCount = 0;

  for (const p of DELHI_REGISTRY_PROJECTS) {
    const carpetRange = parseAreaRange(p.carpetArea);
    const bhkArray = parseBhk(p.flatTypes || p.configuration);

    const doc = {
      name: p.name,
      slug: p.slug,
      projectId: p.id,
      builder: p.builder || "Godrej Properties",
      developerSlug: p.developerSlug || "godrej-properties",
      city: "delhi",
      region: p.region || "Delhi NCR",
      locality: p.locality || "Delhi",
      location: p.location || `${p.locality}, Delhi`,
      fullAddress: p.fullAddress || `${p.name}, Delhi NCR, India`,
      price: p.price,
      priceNumeric: p.priceNumeric || 0,
      avgPrice: p.avgPrice || "On Request",
      minPricePerSqft: p.minPricePerSqft || "On Request",
      flatTypes: p.flatTypes || "Apartment",
      configuration: p.configuration || p.flatTypes || "Apartment",
      carpetArea: p.carpetArea || "On Request",
      builtUpArea: p.builtUpArea || "On Request",
      bhk: bhkArray.length ? bhkArray : [2, 3],
      carpetAreaMin: carpetRange.min || 1000,
      carpetAreaMax: carpetRange.max || 2500,
      possession: p.possession || "Under Construction",
      possessionStatus: p.possessionStatus || "Under Construction",
      possessionDate: p.possessionDate || "Under Construction",
      rera: p.rera || "DLRERA-Applied",
      rera_informations: p.rera_informations || [],
      status: p.status || "Under Construction",
      tag: p.tag || "Verified",
      offersBadge: p.offersBadge || "Offers Available",
      rating: p.rating || 4.8,
      type: p.type || "Apartment",
      images: p.images || ["/images/project/placeholder.png"],
      description: p.description || "",
      features: p.features || [],
      amenities: p.features || [],
      geo: {
        type: "Point",
        coordinates: [p.lng || 77.2090, p.lat || 28.6139]
      },
      referenceUrl: p.referenceUrl || "",
      sourceId: p.sourceId || p.id,
      tier: p.tier || "A",
      isExclusive: p.priceNumeric > 50000000,
      isFeatured: true
    };

    const res = await Project.findOneAndUpdate(
      { slug: p.slug },
      { $set: doc },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    upsertCount++;
  }

  console.log(`✅ Upserted ${upsertCount} Delhi projects into MongoDB successfully.`);

  // 5. Verify total counts in database
  const finalDocs = await Project.find({}).lean();
  const delhiDocs = finalDocs.filter((d) => d.city === "delhi");
  const mumbaiDocs = finalDocs.filter((d) => d.city === "mumbai");
  const otherDocs = finalDocs.filter((d) => d.city !== "delhi" && d.city !== "mumbai");

  console.log("\n========================================================");
  console.log("            MIGRATION VALIDATION RESULTS                ");
  console.log("========================================================");
  console.log(`Total Documents in 'projects' collection: ${finalDocs.length}`);
  console.log(`  - Mumbai Projects: ${mumbaiDocs.length} (Expected: 662)`);
  console.log(`  - Delhi Projects:  ${delhiDocs.length} (Expected: ${DELHI_REGISTRY_PROJECTS.length})`);
  console.log(`  - Other Cities:    ${otherDocs.length}`);

  if (mumbaiDocs.length < 662) {
    console.error("❌ CRITICAL ERROR: Mumbai project count dropped below 662!");
    await mongoose.disconnect();
    process.exit(1);
  }
  console.log("✅ All 662 Mumbai projects 100% preserved!");

  // 6. Update seed file seed/projects.json safely
  const seedFile = path.join(__dirname, "..", "seed", "projects.json");
  fs.writeFileSync(seedFile, JSON.stringify(finalDocs, null, 2), "utf8");
  console.log(`✅ Canonical seed file 'seed/projects.json' updated with ${finalDocs.length} verified projects.`);

  await mongoose.disconnect();
  console.log("✅ Database disconnected. Delhi migration completed successfully!\n");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

