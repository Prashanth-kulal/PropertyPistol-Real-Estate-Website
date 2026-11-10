const router = require("express").Router();
const crypto = require("crypto");
const { z } = require("zod");
const PropertySubmission = require("../models/PropertySubmission");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { optionalAuth } = require("../middleware/auth");
const { formLimiter } = require("../middleware/rateLimit");
const { normalizePhone } = require("../utils/helpers");
const { createLead } = require("../services/leads");

const clean = (v) => (v === "" || v == null ? undefined : Number(String(v).replace(/,/g, "")));
const num = (label) => z.preprocess(clean, z.number({ error: `${label} must be a number` }).positive().optional());
const numRequired = (label) => z.preprocess(clean, z.number({ error: `${label} is required` }).positive(`${label} must be positive`));

const schema = z.object({
  purpose: z.enum(["sell", "rent"]),
  propertyCategory: z.enum(["residential", "commercial"]).default("residential"),
  propertyType: z.string().max(40).default("apartment"),
  bhk: z.string().max(20).optional(),
  carpetArea: num("Carpet area"),
  furnishing: z.string().max(40).optional(),
  city: z.string().trim().min(2).max(40),
  locality: z.string().trim().min(2, "Locality is required").max(120),
  societyName: z.string().max(120).optional(),
  expectedPrice: numRequired("Expected price"),
  maintenance: num("Maintenance"),
  possession: z.string().max(40).optional(),
  amenities: z.array(z.string().max(40)).max(30).default([]),
  photos: z.array(z.string().url()).max(15).default([]),
  ownerName: z.string().trim().min(2).max(120),
  ownerEmail: z.string().email().optional().or(z.literal("")),
  ownerPhone: z.string().min(1, "Mobile number is required").max(20),
  countryCode: z.string().regex(/^\+\d{1,4}$/).default("+91")
});

/**
 * POST /api/property-submissions – /post-property (quick + full form).
 * Creates a *pending* submission for moderation AND a lead so a sales agent follows up with the owner.
 */
router.post("/", formLimiter, optionalAuth, validate({ body: schema }), asyncHandler(async (req, res) => {
  const b = req.body;
  const phone = normalizePhone(b.ownerPhone, b.countryCode);
  if (!phone) throw ApiError.badRequest("Please enter a valid mobile number");

  const sub = await PropertySubmission.create({
    reference: `PP-S-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`,
    purpose: b.purpose, propertyCategory: b.propertyCategory, propertyType: b.propertyType, bhk: b.bhk,
    carpetArea: b.carpetArea, furnishing: b.furnishing, city: b.city.toLowerCase(), locality: b.locality,
    societyName: b.societyName, expectedPrice: b.expectedPrice, maintenance: b.maintenance, possession: b.possession,
    amenities: b.amenities, photos: b.photos,
    owner: { name: b.ownerName, email: b.ownerEmail || undefined, phone, countryCode: b.countryCode },
    user: req.user?._id
  });

  await createLead({
    type: "other", name: b.ownerName, phone, countryCode: b.countryCode, email: b.ownerEmail || undefined,
    city: sub.city, message: `Owner listing submitted (${sub.reference}): ${b.purpose} ${b.bhk || ""} ${b.propertyType} in ${b.locality}`,
    payload: { submissionReference: sub.reference, purpose: b.purpose }
  }, { user: req.user, ip: req.ip, userAgent: req.get("user-agent") });

  res.status(201).json({ success: true, reference: sub.reference, status: sub.status, message: "Your property has been submitted for verification. Our team will contact you shortly." });
}));

module.exports = router;
