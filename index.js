/**
 * AuraLiving / PropertyPistol — Hostinger Production Server Entry Point
 *
 * This file serves as the canonical startup entry file for Hostinger Node.js
 * Application runner (Passenger / PM2 / cPanel Node.js Selector).
 *
 * It boots the compiled Next.js production application, routes all incoming
 * requests (including the homepage '/') to Next.js App Router, and listens on
 * the port assigned by Hostinger via process.env.PORT.
 */

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT, 10) || 3000;

// Initialize Next.js in production mode
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    server.listen(port, () => {
      console.log(`> AuraLiving Next.js server ready on http://${hostname}:${port} (PID: ${process.pid})`);
    });

    // Graceful process termination handlers
    process.on("SIGTERM", () => {
      console.log("SIGTERM received, closing HTTP server...");
      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received, closing HTTP server...");
      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js application server:", err);
    process.exit(1);
  });
