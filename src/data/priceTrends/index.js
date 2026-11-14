import mumbaiPriceTrends from "./mumbaiPriceTrends.js";

/**
 * Normalizes text to a clean URL-friendly and lookup-friendly slug
 */
export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Registry of city datasets (currently Mumbai is active; other cities can be added cleanly here)
const CITY_SNAPSHOTS = {
  mumbai: mumbaiPriceTrends,
};

/**
 * Retrieves verified historical price trends for a project's locality.
 *
 * @param {string} city - e.g. "mumbai", "pune", "bangalore"
 * @param {string} locality - e.g. "Panvel", "Sanpada", "Kharghar"
 * @returns {object} { available: boolean, ... }
 */
export function getLocalityPriceTrends(city = "", locality = "") {
  const normCity = String(city || "mumbai").toLowerCase().trim();
  const dataset = CITY_SNAPSHOTS[normCity];

  if (!dataset || !locality) {
    return {
      available: false,
      reason: normCity === "mumbai" ? "Locality not specified" : `Detailed historical price trends for ${city} are expanding soon.`,
      cityName: normCity,
      locality: locality || "Unknown"
    };
  }

  const rawSlug = slugify(locality);

  // 1. Direct slug match
  let matchedLoc = dataset.localities[rawSlug];

  // 2. Verified spelling / transliteration alias match
  if (!matchedLoc && dataset.aliases && dataset.aliases[rawSlug]) {
    const canonicalSlug = dataset.aliases[rawSlug];
    matchedLoc = dataset.localities[canonicalSlug];
  }

  if (!matchedLoc) {
    return {
      available: false,
      reason: `Historical price data currently unavailable for ${locality}.`,
      cityName: normCity,
      locality
    };
  }

  return {
    available: true,
    locality: matchedLoc.name,
    slug: matchedLoc.slug,
    uuid: matchedLoc.uuid,
    cityName: normCity,
    currentRate: matchedLoc.pricePerSqft,
    displayRate: matchedLoc.displayPricePerSqft,
    projectCount: matchedLoc.projectCount,
    latitude: matchedLoc.latitude,
    longitude: matchedLoc.longitude,
    history: matchedLoc.history || {},
    nearby: matchedLoc.nearby || []
  };
}

/**
 * Calculates genuine percentage change and difference across a historical series
 *
 * @param {Array} series - Array of { year, month, price, displayPrice }
 * @returns {object} { changePercent, diff, isPositive, text }
 */
export function calculatePriceChange(series = []) {
  if (!Array.isArray(series) || series.length < 2) {
    return {
      changePercent: 0,
      diff: 0,
      isPositive: true,
      text: "0%"
    };
  }

  const firstPrice = series[0].price;
  const lastPrice = series[series.length - 1].price;

  if (firstPrice <= 0) {
    return {
      changePercent: 0,
      diff: 0,
      isPositive: true,
      text: "0%"
    };
  }

  const diff = lastPrice - firstPrice;
  const changePercent = Number(((diff / firstPrice) * 100).toFixed(1));
  const isPositive = diff >= 0;

  return {
    changePercent,
    diff,
    isPositive,
    text: `${isPositive && changePercent > 0 ? "+" : ""}${changePercent}%`
  };
}

/**
 * Fetches historical series for a comparison locality in the same city
 */
export function getComparisonLocalitySeries(city = "mumbai", localitySlug = "", range = "6m") {
  const normCity = String(city || "mumbai").toLowerCase().trim();
  const dataset = CITY_SNAPSHOTS[normCity];
  if (!dataset) return null;

  const loc = dataset.localities[slugify(localitySlug)];
  if (!loc || !loc.history || !loc.history[range]) return null;

  return {
    name: loc.name,
    slug: loc.slug,
    uuid: loc.uuid,
    pricePerSqft: loc.pricePerSqft,
    displayPricePerSqft: loc.displayPricePerSqft,
    series: loc.history[range]
  };
}

export default {
  getLocalityPriceTrends,
  calculatePriceChange,
  getComparisonLocalitySeries,
  slugify
};
