/**
 * Rollback script to restore projects collection from the latest backup.
 */

const fs = require("fs");
const path = require("path");
const { connectDb, mongoose } = require("../src/config/db");
const env = require("../src/config/env");
const Project = require("../src/models/Project");

async function rollback() {
  console.log("========================================================");
  console.log("             PROJECTS ROLLBACK EXECUTION                ");
  console.log("========================================================");

  const backupFile = path.join(__dirname, "..", "seed", "backups", "latest-backup.json");
  if (!fs.existsSync(backupFile)) {
    console.error(`❌ Rollback backup file not found at ${backupFile}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(backupFile, "utf8");
  const previousDocs = JSON.parse(raw);
  console.log(`Loaded ${previousDocs.length} documents from latest backup.`);

  console.log(`Connecting to ${env.mongoUri}...`);
  await connectDb();

  console.log("Replacing projects collection with backup data...");
  await Project.deleteMany({});
  if (previousDocs.length > 0) {
    await Project.insertMany(previousDocs);
  }

  const countAfter = await Project.countDocuments({});
  console.log(`✅ Rollback complete. Current projects in DB: ${countAfter}`);

  await mongoose.disconnect();
}

rollback().catch(async (e) => {
  console.error("❌ Rollback failed:", e);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});

