const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
process.env.NODE_ENV = "test";

const { emi, eligibility, convertArea } = require("../src/services/calculators");
const { parseQuery } = require("../src/services/ai");
const { normalizePhone, priceToNumber, formatInr, slugify } = require("../src/utils/helpers");
const { buildProjectFilter } = require("../src/services/projectQuery");

test("EMI matches the standard formula", () => {
  const r = emi({ principal: 5_000_000, ratePct: 8.5, years: 20 });
  assert.ok(Math.abs(r.emi - 43391) <= 1, `emi was ${r.emi}`); // 50L @ 8.5% / 20y ≈ ₹43,391
  assert.equal(r.months, 240);
  assert.equal(r.yearly.length, 20);
  assert.ok(r.yearly.at(-1).balance <= 1);
  assert.ok(Math.abs(r.totalPayment - (r.emi * 240)) < 240); // rounding only
});

test("EMI handles 0% interest", () => assert.equal(emi({ principal: 1_200_000, ratePct: 0, years: 10 }).emi, 10000));

test("Loan eligibility inverts the EMI", () => {
  const e = eligibility({ monthlyIncome: 100000, otherEmis: 10000, ratePct: 8.5, years: 20 });
  assert.equal(e.affordableEmi, 40000);
  const back = emi({ principal: e.eligibleLoan, ratePct: 8.5, years: 20 }).emi;
  assert.ok(Math.abs(back - 40000) < 5);
  assert.equal(eligibility({ monthlyIncome: 10000, otherEmis: 9000, ratePct: 8, years: 10 }).eligibleLoan, 0);
});

test("Area conversion", () => {
  assert.equal(convertArea(1, "acre", "sqft"), 43560);
  assert.equal(convertArea(100, "sqm", "sqft"), 1076.39);
  assert.equal(convertArea(9, "sqft", "sqyd"), 1);
});

test("phone normalisation", () => {
  assert.equal(normalizePhone("+91 98765 43210"), "9876543210");
  assert.equal(normalizePhone("09876543210"), "9876543210");
  assert.equal(normalizePhone("12345"), null);
  assert.equal(normalizePhone("5551234567", "+1"), "5551234567");
});

test("price helpers", () => {
  assert.equal(priceToNumber("2.68 Cr"), 26_800_000);
  assert.equal(priceToNumber("₹85 Lacs*"), 8_500_000);
  assert.equal(formatInr(26_800_000), "2.68 Cr");
  assert.equal(formatInr(8_500_000), "85 Lacs");
  assert.equal(slugify("L&T Island Cove"), "lt-island-cove");
});

const cities = [{ slug: "mumbai", name: "Mumbai" }, { slug: "pune", name: "Pune" }, { slug: "bangalore", name: "Bangalore" }, { slug: "gurugram", name: "Gurugram" }];
test("AI query parser (the frontend's own quick prompts)", () => {
  let f = parseQuery("2 BHK in Powai or Sanpada under 2.8 Cr", cities);
  assert.deepEqual(f.bhk, [2]); assert.equal(f.maxPrice, 28_000_000);
  f = parseQuery("Luxury ready-to-move projects in Bangalore", cities);
  assert.equal(f.city, "bangalore"); assert.equal(f.status, "ready-to-move"); assert.equal(f.luxury, true);
  f = parseQuery("flats in Mumbai between 80 lakh and 1.5 cr", cities);
  assert.equal(f.minPrice, 8_000_000); assert.equal(f.maxPrice, 15_000_000);
  f = parseQuery("3 BHK in Gurgaon above 2 Cr", cities);
  assert.equal(f.city, "gurugram"); assert.equal(f.minPrice, 20_000_000);
});

test("project filter builder", () => {
  const f = buildProjectFilter({ city: "Mumbai", bhk: [2, 3], maxPrice: 3e7, status: "new-launch", q: "powai (" });
  assert.equal(f.city, "mumbai"); assert.deepEqual(f.bhk, { $in: [2, 3] });
  assert.equal(f.priceNumeric.$lte, 3e7); assert.equal(f.statusKey, "new-launch");
  assert.ok(f.$or[0].name instanceof RegExp);
  assert.doesNotThrow(() => f.$or[0].name.test("x")); // regex input was escaped
});

test("seed JSON is valid against the Mongoose schemas", async () => {
  const Project = require("../src/models/Project");
  const City = require("../src/models/City");
  const Developer = require("../src/models/Developer");
  const load = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, "../seed", n), "utf8"));
  const bad = [];
  for (const p of load("projects.json")) { try { await new Project({ ...p, source: "catalog" }).validate(); } catch (e) { bad.push(`${p.slug}: ${e.message}`); } }
  for (const { id, ...c } of load("cities.json")) { try { await new City(c).validate(); } catch (e) { bad.push(`${c.slug}: ${e.message}`); } }
  for (const { id, ...d } of load("developers.json")) { try { await new Developer(d).validate(); } catch (e) { bad.push(`${d.slug}: ${e.message}`); } }
  assert.deepEqual(bad, []);
  const slugs = load("projects.json").map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate slugs");
});
