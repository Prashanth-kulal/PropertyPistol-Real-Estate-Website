const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const env = require("./config/env");
const { globalLimiter } = require("./middleware/rateLimit");
const { notFound, errorHandler } = require("./middleware/error");

function createApp() {
  const app = express();
  app.set("trust proxy", 1); // behind Nginx / Render / Vercel so req.ip and rate limiting see the real client
  app.disable("x-powered-by");

  app.use(helmet());
  app.use(cors({
    origin(origin, cb) { // allow same-origin tools (curl, server-to-server) and whitelisted frontends
      if (!origin || env.corsOrigins.includes(origin)) return cb(null, true);
      cb(null, false);
    },
    credentials: true // needed for the httpOnly refresh-token cookie
  }));
  app.use(compression());
  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());
  if (process.env.NODE_ENV !== "test") app.use(morgan(env.isProd ? "combined" : "dev"));

  app.use("/api", globalLimiter, require("./routes"));
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
