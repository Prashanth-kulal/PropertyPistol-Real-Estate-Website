// HTTP-level checks that don't need a database: routing, validation, auth guards, calculators, honeypot.
const test = require("node:test");
const assert = require("node:assert/strict");
process.env.NODE_ENV = "test";
const request = require("supertest");
const { createApp } = require("../src/app");
const app = createApp();

test("health", async () => {
  const r = await request(app).get("/api/health").expect(200);
  assert.equal(r.body.status, "ok");
});

test("unknown route -> JSON 404", async () => {
  const r = await request(app).get("/api/nope").expect(404);
  assert.equal(r.body.success, false);
});

test("auth guards", async () => {
  await request(app).get("/api/auth/me").expect(401);
  await request(app).get("/api/me/wishlist").expect(401);
  await request(app).get("/api/admin/stats").expect(401);
  await request(app).get("/api/admin/leads").set("Authorization", "Bearer not.a.token").expect(401);
});

test("OTP request validates phone", async () => {
  const r = await request(app).post("/api/auth/otp/request").send({ phone: "12345" }).expect(400);
  assert.match(r.body.message, /valid 10-digit/);
});

test("OTP verify requires 4 digits", async () => {
  const r = await request(app).post("/api/auth/otp/verify").send({ phone: "9876543210", code: "12" }).expect(400);
  assert.equal(r.body.details[0].field, "code");
});

test("register enforces password length + email format", async () => {
  const r = await request(app).post("/api/auth/register").send({ name: "A", email: "bad", password: "short" }).expect(400);
  assert.ok(r.body.details.length >= 2);
});

test("lead validation (frontend field aliases accepted)", async () => {
  const r = await request(app).post("/api/leads").send({ fullName: "A", phoneNumber: "98765" }).expect(400);
  assert.ok(r.body.details.some((d) => d.field === "name"));
});

test("lead honeypot: bots get a fake success and nothing is stored", async () => {
  const r = await request(app).post("/api/leads").send({ name: "Bot Bot", phone: "9876543210", website: "http://spam" }).expect(201);
  assert.equal(r.body.success, true);
});

test("post-property validation", async () => {
  const r = await request(app).post("/api/property-submissions").send({ purpose: "sell", city: "Mumbai" }).expect(400);
  assert.ok(r.body.details.some((d) => d.field === "locality"));
  assert.ok(r.body.details.some((d) => d.field === "expectedPrice"));
});

test("catalog query validation", async () => {
  await request(app).get("/api/projects?sort=bogus").expect(400);
  await request(app).get("/api/projects?status=nope").expect(400);
  await request(app).post("/api/compare").send({ slugs: ["only-one"] }).expect(400);
});

test("EMI endpoint", async () => {
  const r = await request(app).post("/api/tools/emi").send({ principal: 5000000, ratePct: 8.5, years: 20 }).expect(200);
  assert.ok(Math.abs(r.body.emi - 43391) <= 1);
  await request(app).post("/api/tools/emi").send({ principal: -1, ratePct: 8, years: 5 }).expect(400);
});

test("eligibility + unit convert endpoints", async () => {
  const e = await request(app).post("/api/tools/loan-eligibility").send({ monthlyIncome: 100000, otherEmis: 10000, ratePct: 8.5, years: 20 }).expect(200);
  assert.equal(e.body.affordableEmi, 40000);
  const u = await request(app).get("/api/tools/unit-convert?value=2&from=acre&to=sqft").expect(200);
  assert.equal(u.body.result, 87120);
  await request(app).get("/api/tools/unit-convert?value=2&from=acre&to=furlong").expect(400);
});

test("security headers + CORS", async () => {
  const r = await request(app).get("/api/health").set("Origin", "http://localhost:3000");
  assert.equal(r.headers["access-control-allow-origin"], "http://localhost:3000");
  assert.equal(r.headers["x-powered-by"], undefined);
  assert.ok(r.headers["x-content-type-options"]);
  const bad = await request(app).get("/api/health").set("Origin", "https://evil.example");
  assert.equal(bad.headers["access-control-allow-origin"], undefined);
});
