const router = require("express").Router();
const { z } = require("zod");
const Lead = require("../models/Lead");
const Project = require("../models/Project");
const { LEAD_TYPES } = Lead;
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { optionalAuth } = require("../middleware/auth");
const { formLimiter } = require("../middleware/rateLimit");
const { normalizePhone } = require("../utils/helpers");
const { createLead } = require("../services/leads");

// The site has ~15 forms that use slightly different field names (name/fullName, phone/phoneNumber...).
// Accept the aliases here so the frontend can post its form state as-is.
const ALIASES = { fullName: "name", phoneNumber: "phone", mobile: "phone", mobileNumber: "phone", notes: "message", note: "message", comments: "message" };
const TOP = new Set(["type", "name", "phone", "countryCode", "email", "city", "projectId", "projectSlug", "projectName", "preferredDate", "message", "source", "website"]);
const CONSENT = new Set(["agree", "consent", "whatsappUpdates", "allowSellers"]);

function normalizeBody(raw = {}) {
  const top = {}, payload = {}, consent = {};
  for (const [k0, v] of Object.entries(raw)) {
    const k = ALIASES[k0] || k0;
    if (v === undefined || v === null || v === "") continue;
    if (TOP.has(k)) top[k] = v;
    else if (CONSENT.has(k)) consent[k] = !!v;
    else if (["string", "number", "boolean"].includes(typeof v) || Array.isArray(v)) payload[k] = v;
  }
  return { ...top, payload, consentFlags: consent };
}

const leadSchema = z.object({
  type: z.enum(LEAD_TYPES).default("consultation"),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  countryCode: z.string().regex(/^\+\d{1,4}$/).default("+91"),
  email: z.string().email().optional(),
  city: z.string().trim().max(40).optional(),
  projectId: z.string().max(80).optional(),
  projectSlug: z.string().max(120).optional(),
  projectName: z.string().max(160).optional(),
  preferredDate: z.string().max(60).optional(),
  message: z.string().max(2000).optional(),
  source: z.object({ page: z.string().max(300), utmSource: z.string(), utmMedium: z.string(), utmCampaign: z.string() }).partial().optional(),
  website: z.string().optional(), // honeypot – real users never fill this
  payload: z.record(z.string(), z.any()).refine((o) => JSON.stringify(o).length < 4000, "Extra fields too large"),
  consentFlags: z.record(z.string(), z.boolean())
});

/**
 * POST /api/leads – the single endpoint behind every "Talk to an expert / Book site visit / Enquire" form.
 * Anonymous allowed; if a bearer token is present the lead is linked to that user.
 */
router.post("/", formLimiter, optionalAuth,
  (req, _res, next) => { req.body = normalizeBody(req.body); next(); },
  validate({ body: leadSchema }),
  asyncHandler(async (req, res) => {
    const b = req.body;
    if (b.website) return res.status(201).json({ success: true, message: "Thank you!" }); // bot: pretend success, store nothing

    const phone = normalizePhone(b.phone, b.countryCode);
    if (!phone) throw ApiError.badRequest("Please enter a valid mobile number");

    let projectSlug = b.projectSlug, projectName = b.projectName, city = b.city?.toLowerCase();
    if (b.projectId || b.projectSlug) {
      const key = (b.projectSlug || b.projectId).toLowerCase();
      const p = await Project.findOne({ $or: [{ slug: key }, { legacyIds: b.projectId || b.projectSlug }] }).select("slug name city").lean();
      if (p) { projectSlug = p.slug; projectName = p.name; city = city || p.city; }
    }

    const { lead, duplicate } = await createLead({
      type: b.type, name: b.name, phone, countryCode: b.countryCode, email: b.email?.toLowerCase(),
      city, projectSlug, projectName, preferredDate: b.preferredDate, message: b.message,
      payload: b.payload, consent: { whatsappUpdates: b.consentFlags.whatsappUpdates, shareWithPartners: b.consentFlags.allowSellers },
      source: b.source
    }, { user: req.user, ip: req.ip, userAgent: req.get("user-agent") });

    res.status(duplicate ? 200 : 201).json({
      success: true,
      duplicate,
      leadId: lead.reference,
      message: "Thank you! A PropertyPistol property advisor will connect with you within 15 minutes."
    });
  }));

module.exports = router;
