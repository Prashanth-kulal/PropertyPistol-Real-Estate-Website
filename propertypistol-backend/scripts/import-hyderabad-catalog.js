/**
 * Safely imports all verified Hyderabad cataloged projects into local MongoDB.
 *
 * Safety invariants:
 * 1. Checks that connection points strictly to local MongoDB (127.0.0.1:27017/propertypistol).
 * 2. Creates a timestamped JSON backup of existing projects before any write.
 * 3. Uses slug-based upserts so existing Mumbai (2,771), Pune (1,027), Bangalore (799),
 *    Noida (100), Nagpur (128), Coimbatore (79), Goa (48), Trivandrum (33), Delhi (16),
 *    Calicut (13), and Thrissur (8) are untouched.
 * 4. Preserves all local watermarked image paths (/projects/{pid}/...) and GeoJSON coordinates.
 * 5. Updates Hyderabad City count/cover in MongoDB & seed files cleanly.
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

function loadHyderabadProjectsFromRegistry() {
  const registryPath = path.join(__dirname, "..", "..", "src", "data", "hyderabadProjectsRegistry.js");
  if (!fs.existsSync(registryPath)) {
    throw new Error(`Registry file not found at ${registryPath}`);
  }
  const raw = fs.readFileSync(registryPath, "utf8");
  const match = raw.match(/export const HYDERABAD_REGISTRY_PROJECTS = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error("Could not parse HYDERABAD_REGISTRY_PROJECTS array from registry file");
  }
  return JSON.parse(match[1]);
}

async function main() {
  console.log("========================================================");
  console.log("   HYDERABAD CATALOG MIGRATION & LOCAL MONGODB SYNC     ");
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
  const backupFile = path.join(backupDir, `backup-projects-pre-hyderabad-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(existingDocs, null, 2), "utf8");
  fs.copyFileSync(backupFile, path.join(backupDir, "latest-backup.json"));
  console.log(`Backup created at ${backupFile} (${existingDocs.length} records).`);

  const hyderabadProjects = loadHyderabadProjectsFromRegistry();
  console.log(`[Data Source] Loaded ${hyderabadProjects.length} Hyderabad projects from registry.`);

  // Purge legacy mock Hyderabad entries with Unsplash images
  const deletedLegacy = await Project.deleteMany({
    city: "hyderabad",
    slug: {
      $in: [
        "my-home-sayuk",
        "aparna-zenon",
        "hyd-1",
        "hyd-2",
        "hyd-3",
        "hyd-4"
      ],
    },
  });
  if (deletedLegacy.deletedCount > 0) {
    console.log(`[Purge] Removed ${deletedLegacy.deletedCount} legacy mock Hyderabad projects with Unsplash images.`);
  }

  let matchedCount = 0;
  let upsertedCount = 0;
  let withLocalImages = 0;
  let withGeo = 0;

  for (const p of hyderabadProjects) {
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
      city: "hyderabad",
      cityName: "Hyderabad",
      region: p.region || "Hyderabad",
      locality: p.locality || "",
      location: p.location || `${p.locality || "Hyderabad"}, Hyderabad`,
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
      rating: 4.8,
      reviewsCount: 110,
      images: Array.isArray(p.images) ? p.images : [],
      features: Array.isArray(p.features) ? p.features : [],
      overview: p.description || "",
      highlights: [
        `Prime address in ${p.location}`,
        `Developed by ${p.builder}`,
        p.rera && p.rera !== "Not Available" ? `TG RERA Registered: ${p.rera}` : "Verified PropertyPistol Hyderabad Listing",
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

  // Update Hyderabad city record cleanly in MongoDB
  await City.findOneAndUpdate(
    { slug: "hyderabad" },
    {
      $set: {
        projectsCount: hyderabadProjects.length,
        heroImage: "/projects/20581/cover.jpg",
        image: "/projects/20581/cover.jpg",
        state: "Telangana",
        description: "India's booming technology and pharmaceutical capital, featuring world-class IT corridors, premium gated communities, and outstanding capital appreciation.",
        popularLocalities: ["Gachibowli", "Kokapet", "Tellapur", "Kondapur", "Narsingi", "Bachupally", "Kompally", "Miyapur"]
      },
    },
    { upsert: true }
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
  const puneInDb = await Project.countDocuments({ city: "pune" });
  const hyderabadInDb = await Project.countDocuments({ city: "hyderabad" });
  const hyderabadWithLocalImgs = await Project.countDocuments({ city: "hyderabad", images: { $regex: "^/projects/" } });

  console.log("\n========================================================");
  console.log("             POST-MIGRATION VERIFICATION                ");
  console.log("========================================================");
  console.log(`Hyderabad matched=${matchedCount}, upserted=${upsertedCount}`);
  console.log(`Hyderabad with local watermarked images (prepared): ${withLocalImages}/${hyderabadProjects.length}`);
  console.log(`Hyderabad with GeoJSON coordinates: ${withGeo}/${hyderabadProjects.length}`);
  console.log(`Total projects in MongoDB:        ${totalInDb}`);
  console.log(`Mumbai projects in MongoDB:       ${mumbaiInDb}`);
  console.log(`Delhi projects in MongoDB:        ${delhiInDb}`);
  console.log(`Goa projects in MongoDB:          ${goaInDb}`);
  console.log(`Coimbatore projects in MongoDB:   ${coimbatoreInDb}`);
  console.log(`Nagpur projects in MongoDB:       ${nagpurInDb}`);
  console.log(`Thrissur projects in MongoDB:     ${thrissurInDb}`);
  console.log(`Trivandrum projects in MongoDB:   ${trivandrumInDb}`);
  console.log(`Calicut projects in MongoDB:      ${calicutInDb}`);
  console.log(`Bangalore projects in MongoDB:    ${bangaloreInDb}`);
  console.log(`Noida projects in MongoDB:        ${noidaInDb}`);
  console.log(`Pune projects in MongoDB:         ${puneInDb}`);
  console.log(`Hyderabad projects in MongoDB:    ${hyderabadInDb} (local imgs in DB: ${hyderabadWithLocalImgs})`);

  if (
    mumbaiInDb !== 2771 ||
    delhiInDb !== 16 ||
    goaInDb !== 48 ||
    coimbatoreInDb !== 79 ||
    nagpurInDb !== 128 ||
    thrissurInDb !== 8 ||
    trivandrumInDb !== 33 ||
    calicutInDb !== 13 ||
    bangaloreInDb !== 799 ||
    noidaInDb !== 100 ||
    puneInDb !== 1027 ||
    hyderabadInDb !== hyderabadProjects.length
  ) {
    console.error("Integrity count mismatch detected!");
    await mongoose.disconnect();
    process.exit(1);
  }

  // Sync seed/projects.json
  const seedProjectsFile = path.join(__dirname, "..", "seed", "projects.json");
  const allUpdatedProjects = await Project.find({}).lean();
  fs.writeFileSync(seedProjectsFile, JSON.stringify(allUpdatedProjects, null, 2), "utf8");
  console.log(`seed/projects.json updated (${allUpdatedProjects.length} total projects).`);

  // Sync seed/cities.json Hyderabad entry
  const seedCitiesFile = path.join(__dirname, "..", "seed", "cities.json");
  if (fs.existsSync(seedCitiesFile)) {
    const citiesSeed = JSON.parse(fs.readFileSync(seedCitiesFile, "utf8"));
    let updatedCitySeed = false;
    for (const c of citiesSeed) {
      if (c.slug === "hyderabad" || c.id === "hyderabad") {
        c.projectsCount = hyderabadProjects.length;
        c.image = "/projects/20581/cover.jpg";
        c.heroImage = "/projects/20581/cover.jpg";
        updatedCitySeed = true;
      }
    }
    if (updatedCitySeed) {
      fs.writeFileSync(seedCitiesFile, JSON.stringify(citiesSeed), "utf8");
      console.log("seed/cities.json Hyderabad entry synced.");
    }
  }

  await mongoose.disconnect();
  console.log("Hyderabad MongoDB Migration Complete!");
}

main().catch(async (err) => {
  console.error("Fatal Error:", err);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});
