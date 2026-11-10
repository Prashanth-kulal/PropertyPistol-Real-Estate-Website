const crypto = require("crypto");

const slugify = (s) =>
  String(s || "").toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const sha256 = (v) => crypto.createHash("sha256").update(String(v)).digest("hex");

const randomDigits = (n) => {
  let out = "";
  while (out.length < n) out += crypto.randomInt(0, 10);
  return out;
};

/** Normalise Indian mobile numbers to 10 digits (strips +91 / 0 / spaces). Returns null if invalid. */
const normalizePhone = (raw, countryCode = "+91") => {
  const digits = String(raw || "").replace(/\D/g, "");
  if (countryCode === "+91" || !countryCode) {
    const ten = digits.length > 10 ? digits.slice(-10) : digits;
    return /^[6-9]\d{9}$/.test(ten) ? ten : null;
  }
  return digits.length >= 6 && digits.length <= 15 ? digits : null; // NRI / Dubai numbers
};

/** "2.68 Cr" | "85 Lacs" | "₹1.2 Cr*" -> rupees (number) */
const priceToNumber = (s) => {
  const v = String(s || "").replace(/[₹,*]|INR/gi, "").trim();
  const n = parseFloat(v);
  if (Number.isNaN(n)) return undefined;
  if (/cr/i.test(v)) return Math.round(n * 1e7);
  if (/l(ac|akh)/i.test(v)) return Math.round(n * 1e5);
  return n;
};

const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const haversineKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371, rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(lat2 - lat1), dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

const paginate = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 12));
  return { page, limit, skip: (page - 1) * limit };
};

module.exports = { slugify, sha256, randomDigits, normalizePhone, priceToNumber, escapeRegex, haversineKm, paginate };

/** 26800000 -> "2.68 Cr", 8500000 -> "85 Lacs" (same display format as the seed data) */
const formatInr = (n) => {
  if (!n && n !== 0) return "";
  if (n >= 1e7) return `${+(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `${+(n / 1e5).toFixed(2)} Lacs`;
  return `${Number(n).toLocaleString("en-IN")}`;
};
module.exports.formatInr = formatInr;
