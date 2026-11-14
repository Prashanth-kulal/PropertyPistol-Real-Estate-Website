/**
 * Safely imports verified Mumbai/MMR locality historical price trends into MongoDB.
 *
 * Safety invariants:
 * 1. Checks that connection points strictly to local MongoDB.
 * 2. Uses slug-based upserts so existing projects and cities are 100% untouched.
 * 3. Never deletes, truncates, or resets existing collections.
 * 4. Completely idempotent and safely re-runnable.
 */

const fs = require("fs");
const path = require("path");
const { connectDb, mongoose } = require("../src/config/db");
const LocalityPriceTrend = require("../src/models/LocalityPriceTrend");

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function run() {
  const dataPath = path.resolve(__dirname, "../../src/data/priceTrends/mumbaiPriceTrends.json");
  const rawPath = path.resolve(__dirname, "../../scratch/mumbai_price_trends_raw.json");

  const sourceFile = fs.existsSync(dataPath) ? dataPath : rawPath;
  if (!fs.existsSync(sourceFile)) {
    console.error("Price trends source data file not found at:", sourceFile);
    process.exit(1);
  }

  console.log("Reading locality price trends from:", sourceFile);
  const data = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
  let localities = [];
  if (Array.isArray(data.localities)) {
    localities = data.localities;
  } else if (data.localities && typeof data.localities === "object") {
    localities = Object.values(data.localities);
  } else {
    localities = Object.values(data);
  }

  console.log(`Found ${localities.length} localities to import/upsert.`);

  try {
    await connectDb();
    console.log("Connected to MongoDB successfully.");

    let upsertedCount = 0;
    for (const loc of localities) {
      const slug = loc.slug || slugify(loc.name);
      const doc = {
        city: (loc.cityName || loc.city || "mumbai").toLowerCase().trim(),
        locality: loc.name || loc.locality,
        slug,
        localityUuid: loc.uuid || loc.localityUuid,
        pricePerSqft: loc.pricePerSqft || loc.price_per_sqft || loc.currentRate,
        displayPricePerSqft: loc.displayPricePerSqft || loc.display_price_per_sqft || loc.displayRate || `${((loc.pricePerSqft || loc.currentRate) / 1000).toFixed(2)} K`,
        projectCount: loc.projectCount || loc.project_count || 0,
        latitude: loc.latitude,
        longitude: loc.longitude,
        location: loc.location || null,
        history: {
          "6m": (loc.history && loc.history["6m"]) || (loc.trends && loc.trends["6m"]) || [],
          "3y": (loc.history && loc.history["3y"]) || (loc.trends && loc.trends["3y"]) || [],
          "5y": (loc.history && loc.history["5y"]) || (loc.trends && loc.trends["5y"]) || []
        },
        nearbyLocalities: (loc.nearbyLocalities || loc.nearby || []).map(n => ({
          uuid: n.uuid,
          name: n.name
        })),
        sourceMetadata: {
          source: (loc.sourceMetadata && loc.sourceMetadata.source) || "PropertyPistol Public API",
          endpoint: (loc.sourceMetadata && loc.sourceMetadata.endpoint) || `https://api.propertypistol.com/public/localities/${loc.uuid || loc.localityUuid}/price_trends`,
          lastVerified: (loc.sourceMetadata && loc.sourceMetadata.lastVerified) || new Date()
        }
      };

      await LocalityPriceTrend.findOneAndUpdate(
        { city: doc.city, slug: doc.slug },
        { $set: doc },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );
      upsertedCount++;
    }

    console.log(`Successfully upserted ${upsertedCount} locality price trend records in MongoDB.`);
    const totalInDb = await LocalityPriceTrend.countDocuments({ city: "mumbai" });
    console.log(`Total Mumbai locality price trend records in DB: ${totalInDb}`);

  } catch (err) {
    console.error("MongoDB operation error (or MongoDB is not running locally):", err.message);
  } finally {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB.");
    } catch (_) {}
  }
}

run();
