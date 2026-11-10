const Project = require("../models/Project");
const City = require("../models/City");
const { escapeRegex } = require("../utils/helpers");

const CITY_ALIASES = {
  mumbai: ["mumbai", "navi mumbai", "thane", "bombay"],
  delhi: ["delhi", "delhi ncr", "ncr"],
  bangalore: ["bangalore", "bengaluru"],
  gurugram: ["gurugram", "gurgaon"],
  trivandrum: ["trivandrum", "thiruvananthapuram"],
  calicut: ["calicut", "kozhikode"]
};

const money = (n, unit) => (unit && /^cr/i.test(unit) ? n * 1e7 : /^l/i.test(unit) ? n * 1e5 : n);

/** Pulls city / BHK / budget / status / keywords out of a free-text request (no LLM required). */
function parseQuery(text, knownCities = []) {
  const t = ` ${String(text).toLowerCase()} `;
  const out = { raw: text };

  for (const c of knownCities) {
    const names = [c.slug, c.name.toLowerCase(), ...(CITY_ALIASES[c.slug] || [])];
    if (names.some((n) => t.includes(` ${n} `) || t.includes(` ${n},`) || t.includes(` ${n}.`) || t.includes(` ${n}?`))) { out.city = c.slug; break; }
  }
  const bhk = [...t.matchAll(/(\d)\s*(?:,|&|and|\/)?\s*(\d)?\s*bhk/g)].flatMap((m) => [m[1], m[2]]).filter(Boolean).map(Number);
  if (bhk.length) out.bhk = [...new Set(bhk)];

  let m;
  if ((m = t.match(/(?:between|from)?\s*(\d+(?:\.\d+)?)\s*(cr|crore|l|lac|lacs|lakh|lakhs)?\s*(?:-|to|and)\s*(\d+(?:\.\d+)?)\s*(cr|crore|l|lac|lacs|lakh|lakhs)\b/))) {
    const u2 = m[4], u1 = m[2] || u2;
    out.minPrice = money(parseFloat(m[1]), u1); out.maxPrice = money(parseFloat(m[3]), u2);
  } else if ((m = t.match(/(?:under|below|within|upto|up to|less than|max(?:imum)?|budget(?: of)?)\s*₹?\s*(\d+(?:\.\d+)?)\s*(cr|crore|l|lac|lacs|lakh|lakhs)/))) {
    out.maxPrice = money(parseFloat(m[1]), m[2]);
  } else if ((m = t.match(/(?:above|over|more than|starting)\s*₹?\s*(\d+(?:\.\d+)?)\s*(cr|crore|l|lac|lacs|lakh|lakhs)/))) {
    out.minPrice = money(parseFloat(m[1]), m[2]);
  }

  if (/ready[\s-]*to[\s-]*move|\bready\b|immediate possession/.test(t)) out.status = "ready-to-move";
  else if (/under[\s-]*construction/.test(t)) out.status = "under-construction";
  else if (/new[\s-]*launch|pre[\s-]*launch/.test(t)) out.status = "new-launch";

  out.luxury = /luxury|premium|ultra|penthouse|sea view/.test(t);
  out.investment = /invest|rental yield|roi|appreciation/.test(t);
  return out;
}

async function recommend(text, { limit = 3 } = {}) {
  const cities = await City.find().select("slug name").lean();
  const f = parseQuery(text, cities);
  const filter = { published: true };
  if (f.city) filter.city = f.city;
  if (f.status) filter.statusKey = f.status;
  if (f.bhk) filter.bhk = { $in: f.bhk };
  if (f.minPrice || f.maxPrice) {
    filter.priceNumeric = {};
    if (f.minPrice) filter.priceNumeric.$gte = f.minPrice;
    if (f.maxPrice) filter.priceNumeric.$lte = f.maxPrice;
  }

  let candidates = await Project.find(filter).select("name slug builder location city cityName price priceNumeric flatTypes statusKey images rating isExclusive tag").limit(60).lean();

  // locality keywords ("powai", "sanpada") – boost projects whose location mentions a word from the query
  const words = String(text).toLowerCase().match(/[a-z]{4,}/g) || [];
  const score = (p) => {
    const loc = `${p.location} ${p.name}`.toLowerCase();
    let s = (p.rating || 0) + (p.isExclusive ? 0.5 : 0);
    for (const w of words) if (loc.includes(w) && !["with", "under", "below", "luxury", "ready", "move"].includes(w)) s += 3;
    if (f.luxury) s += (p.priceNumeric || 0) / 5e7;
    return s;
  };
  candidates = candidates.sort((a, b) => score(b) - score(a)).slice(0, limit);

  const cards = candidates.map((p) => ({
    name: p.name, slug: p.slug, loc: p.location, price: `₹${p.price}`, bhk: p.flatTypes, builder: p.builder, image: p.images?.[0]
  }));

  const filters = Object.fromEntries(Object.entries(f).filter(([k, v]) => !["raw", "luxury", "investment"].includes(k) && v !== undefined));
  const reply = cards.length
    ? `Based on current RERA verified inventory, here ${cards.length === 1 ? "is the top match" : `are the top ${cards.length} matching properties`}:`
    : "I couldn't find an exact match. Try widening your budget or choosing a nearby locality, or request a callback from a property advisor and we'll source off-market options for you.";
  return { reply, cards, filters };
}

module.exports = { parseQuery, recommend };
