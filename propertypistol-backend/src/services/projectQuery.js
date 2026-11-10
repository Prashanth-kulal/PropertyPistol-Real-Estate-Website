const { escapeRegex } = require("../utils/helpers");

const SORTS = {
  relevance: { isExclusive: -1, rating: -1, createdAt: -1 },
  "price-asc": { priceNumeric: 1 },
  "price-desc": { priceNumeric: -1 },
  rating: { rating: -1 },
  newest: { createdAt: -1 }
};

/**
 * Translates the filters used across the frontend (header search, city page, category pages,
 * AI assistant) into a single Mongo filter.
 */
function buildProjectFilter(q = {}) {
  const f = { published: true };
  if (q.city && q.city !== "all") f.city = String(q.city).toLowerCase();
  if (q.region) f.region = new RegExp(`^${escapeRegex(q.region)}$`, "i");
  if (q.locality) f.locality = new RegExp(`^${escapeRegex(q.locality)}$`, "i");
  if (q.builder) f.builder = new RegExp(`^${escapeRegex(q.builder)}$`, "i");
  if (q.developerSlug) f.developerSlug = q.developerSlug;
  if (q.status) f.statusKey = q.status;
  if (q.exclusive === true || q.exclusive === "true") f.isExclusive = true;
  if (q.listingType) f.listingType = q.listingType;
  if (q.propertyType) f.propertyType = new RegExp(`^${escapeRegex(q.propertyType)}$`, "i");
  if (q.tag) f.tag = new RegExp(`^${escapeRegex(q.tag)}$`, "i");
  if (q.bhk?.length) f.bhk = { $in: [].concat(q.bhk).map(Number) };
  if (q.minPrice || q.maxPrice) {
    f.priceNumeric = {};
    if (q.minPrice) f.priceNumeric.$gte = Number(q.minPrice);
    if (q.maxPrice) f.priceNumeric.$lte = Number(q.maxPrice);
  }
  if (q.rera === true || q.rera === "true") f.rera = { $exists: true, $ne: "" };
  if (q.q && String(q.q).trim()) {
    const rx = new RegExp(escapeRegex(String(q.q).trim()), "i");
    f.$or = [{ name: rx }, { builder: rx }, { location: rx }, { cityName: rx }, { region: rx }, { locality: rx }];
  }
  return f;
}

module.exports = { buildProjectFilter, SORTS };
