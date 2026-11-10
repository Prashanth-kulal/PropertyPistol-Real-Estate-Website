const env = require("./config/env");
const { connectDb, mongoose } = require("./config/db");
const { createApp } = require("./app");

(async () => {
  await connectDb();
  console.log("[db] connected");
  const server = createApp().listen(env.port, () => console.log(`[api] listening on :${env.port} (${env.isProd ? "production" : "development"})`));

  const shutdown = async (sig) => {
    console.log(`[api] ${sig} received, shutting down`);
    server.close(async () => { await mongoose.disconnect(); process.exit(0); });
    setTimeout(() => process.exit(1), 10_000).unref();
  };
  ["SIGINT", "SIGTERM"].forEach((s) => process.on(s, () => shutdown(s)));
})().catch((e) => { console.error("[fatal]", e.message); process.exit(1); });
