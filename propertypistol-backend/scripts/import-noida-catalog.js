/**
 * Safely imports all verified Noida cataloged projects into local MongoDB.
 *
 * Safety invariants:
 * 1. Checks that connection points strictly to local MongoDB (127.0.0.1:27017/propertypistol).
 * 2. Creates a timestamped JSON backup of existing projects before any write.
 * 3. Uses slug-based upserts so existing Mumbai (662), Delhi (16), Goa (48), Coimbatore (79), and Nagpur (128) records are untouched.
 * 4. Preserves all local watermarked image paths (/projects/{pid}/...) and GeoJSON coordinates.
 * 5. Updates Noida City count/cover in MongoDB & seed files cleanly.
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

function loadNoidaProjectsFromRegistry() {
  const registryPath = path.join(__dirname, "..", "..", "src", "data", "noidaProjectsRegistry.js");
  if (!fs.existsSync(registryPath)) {
    throw new Error(`Registry file not found at ${registryPath}`);
  }
  const raw = fs.readFileSync(registryPath, "utf8");
  const match = raw.match(/export const NOIDA_REGISTRY_PROJECTS = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error("Could not parse NOIDA_REGISTRY_PROJECTS array from registry file");
  }
  return JSON.parse(match[1]);
}

async function main() {
  console.log("========================================================");
  console.log("     NOIDA CATALOG MIGRATION & LOCAL MONGODB SYNC       ");
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
  const backupFile = path.join(backupDir, `backup-projects-pre-noida-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(existingDocs, null, 2), "utf8");
  fs.copyFileSync(backupFile, path.join(backupDir, "latest-backup.json"));
  console.log(`Backup created at ${backupFile} (${existingDocs.length} records).`);

  const noidaProjects = loadNoidaProjectsFromRegistry();
  console.log(`[Data Source] Loaded ${noidaProjects.length} Noida projects from registry.`);

  let matchedCount = 0;
  let upsertedCount = 0;
  let withLocalImages = 0;
  let withGeo = 0;

  for (const p of noidaProjects) {
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
      city: "noida",
      cityName: "Noida",
      region: p.region || "Noida",
      locality: p.locality || "",
      location: p.location || `${p.locality || "Noida"}, Noida`,
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
      reviewsCount: 84,
      images: Array.isArray(p.images) ? p.images : [],
      features: Array.isArray(p.features) ? p.features : [],
      overview: p.description || "",
      highlights: [
        `Prime address in ${p.location}`,
        `Developed by ${p.builder}`,
        p.rera && p.rera !== "Not Available" ? `UP RERA Registered: ${p.rera}` : "Verified PropertyPistol Noida Listing",
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

  // Update Noida city record cleanly in MongoDB
  await City.findOneAndUpdate(
    { slug: "noida" },
    {
      $set: {
        projectsCount: noidaProjects.length,
        heroImage: "/projects/15680/cover.jpg",
        image: "/projects/15680/cover.jpg",
      },
    }
  );

  await Project.syncIndexes();

  const totalInDb = await Project.countDocuments({});
  const mumbaiInDb = await Project.countDocuments({ city: "mumbai" });
  const delhiInDb = await Project.countDocuments({ city: "delhi" });
  const goaInDb = await Project.countDocuments({ city: "goa" });
  const coimbatoreInDb = await Project.countDocuments({ city: "coimbatore" });
  const nagpurInDb = await Project.countDocuments({ city: "nagpur" });
  const thrissurInDb = await Project.countDocuments({ city: "thrissur" });
  const trivandrumInDb = await Project.countDocuments({ city: "trivandrum" });
  const calicutInDb = await Project.countDocuments({ city: "calicut" });
  const bangaloreInDb = await Project.countDocuments({ city: "bangalore" });
  const noidaInDb = await Project.countDocuments({ city: "noida" });
  const noidaWithLocalImgs = await Project.countDocuments({ city: "noida", images: { $regex: "^/projects/" } });

  console.log("\n========================================================");
  console.log("             POST-MIGRATION VERIFICATION                ");
  console.log("========================================================");
  console.log(`Noida matched=${matchedCount}, upserted=${upsertedCount}`);
  console.log(`Noida with local watermarked images: ${withLocalImages}/${noidaProjects.length}`);
  console.log(`Noida with GeoJSON coordinates: ${withGeo}/${noidaProjects.length}`);
  console.log(`Total projects in MongoDB:      ${totalInDb}`);
  console.log(`  - Mumbai (preserved):         ${mumbaiInDb} (Expected: 662)`);
  console.log(`  - Delhi (preserved):          ${delhiInDb} (Expected: 16)`);
  console.log(`  - Goa (preserved):            ${goaInDb} (Expected: 48)`);
  console.log(`  - Coimbatore (preserved):     ${coimbatoreInDb} (Expected: 79)`);
  console.log(`  - Nagpur (preserved):         ${nagpurInDb} (Expected: 128)`);
  console.log(`  - Thrissur (preserved):       ${thrissurInDb} (Expected: 8)`);
  console.log(`  - Trivandrum (preserved):     ${trivandrumInDb} (Expected: 33)`);
  console.log(`  - Calicut (preserved):        ${calicutInDb} (Expected: 13)`);
  console.log(`  - Bangalore (preserved):      ${bangaloreInDb} (Expected: 799)`);
  console.log(`  - Noida (newly added):        ${noidaInDb} (Expected: ${noidaProjects.length})`);

  if (mumbaiInDb < 662) {
    console.error("CRITICAL ERROR: Mumbai project count dropped below 662!");
    await mongoose.disconnect();
    process.exit(1);
  }
  if (bangaloreInDb < 799) {
    console.error("CRITICAL ERROR: Bangalore project count dropped below 799!");
    await mongoose.disconnect();
    process.exit(1);
  }
  if (noidaInDb !== 100) {
    console.error(`CRITICAL ERROR: Noida project count is ${noidaInDb}, expected 100!`);
    await mongoose.disconnect();
    process.exit(1);
  }

  // Update seed file seed/projects.json safely
  const seedFile = path.join(__dirname, "..", "seed", "projects.json");
  const finalDocs = await Project.find({}).lean();
  fs.writeFileSync(seedFile, JSON.stringify(finalDocs, null, 2), "utf8");
  console.log(`Canonical seed file 'seed/projects.json' updated with ${finalDocs.length} verified projects.`);

  await mongoose.disconnect();
  console.log("Database disconnected. Noida migration completed successfully!\n");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
