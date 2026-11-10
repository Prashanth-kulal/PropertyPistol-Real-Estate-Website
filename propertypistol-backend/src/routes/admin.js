const router = require("express").Router();
const { z } = require("zod");
const mongoose = require("mongoose");
const User = require("../models/User");
const Lead = require("../models/Lead");
const Project = require("../models/Project");
const City = require("../models/City");
const Developer = require("../models/Developer");
const PropertySubmission = require("../models/PropertySubmission");
const { Testimonial, Faq, BlogPost, Job, JobApplication, Office, Subscriber } = require("../models/Content");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { requireAuth, requireRole } = require("../middleware/auth");
const { slugify, priceToNumber, paginate, escapeRegex, formatInr } = require("../utils/helpers");
const { LEAD_STATUSES, LEAD_TYPES } = Lead;

router.use(requireAuth, requireRole("admin", "agent"));
const adminOnly = requireRole("admin");

// Agents only ever see leads assigned to them; admins see everything.
const leadScope = (user) => (user.role === "admin" ? {} : { assignedTo: user._id });
const oid = (id) => { if (!mongoose.isValidObjectId(id)) throw ApiError.badRequest("Invalid id"); return id; };

// ---- Dashboard -------------------------------------------------------------------------------
router.get("/stats", asyncHandler(async (req, res) => {
  const scope = leadScope(req.user);
  const since = new Date(Date.now() - 30 * 864e5);
  const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
  const [byStatus, byType, byDay, today, unassigned, responseTime, pendingSubs, topProjects, totals] = await Promise.all([
    Lead.aggregate([{ $match: { ...scope, createdAt: { $gte: since } } }, { $group: { _id: "$status", n: { $sum: 1 } } }]),
    Lead.aggregate([{ $match: { ...scope, createdAt: { $gte: since } } }, { $group: { _id: "$type", n: { $sum: 1 } } }, { $sort: { n: -1 } }]),
    Lead.aggregate([{ $match: { ...scope, createdAt: { $gte: since } } }, { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, n: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    Lead.countDocuments({ ...scope, createdAt: { $gte: startOfDay } }),
    Lead.countDocuments({ assignedTo: null, status: "new" }),
    // SLA: average minutes from lead creation to first contact (the site promises 15 minutes)
    Lead.aggregate([{ $match: { ...scope, firstContactedAt: { $ne: null }, createdAt: { $gte: since } } },
      { $group: { _id: null, avgMin: { $avg: { $divide: [{ $subtract: ["$firstContactedAt", "$createdAt"] }, 60000] } } } }]),
    req.user.role === "admin" ? PropertySubmission.countDocuments({ status: "pending" }) : 0,
    Project.find().select("name slug views").sort({ views: -1 }).limit(5).lean(),
    req.user.role === "admin" ? Promise.all([User.countDocuments(), Project.countDocuments(), Subscriber.countDocuments({ active: true })]) : [0, 0, 0]
  ]);
  const won = byStatus.find((s) => s._id === "won")?.n || 0, total = byStatus.reduce((a, s) => a + s.n, 0);
  res.json({
    success: true, windowDays: 30,
    leads: { total, today, unassigned, conversionRate: total ? +((won / total) * 100).toFixed(1) : 0, avgFirstResponseMinutes: responseTime[0] ? +responseTime[0].avgMin.toFixed(1) : null,
      byStatus: Object.fromEntries(byStatus.map((s) => [s._id, s.n])), byType: byType.map((t) => ({ type: t._id, count: t.n })), perDay: byDay.map((d) => ({ date: d._id, count: d.n })) },
    pendingSubmissions: pendingSubs, topProjects, totals: { users: totals[0], projects: totals[1], subscribers: totals[2] }
  });
}));

// ---- Leads (CRM) -----------------------------------------------------------------------------
const leadListQuery = z.object({
  status: z.enum(LEAD_STATUSES).optional(), type: z.enum(LEAD_TYPES).optional(), city: z.string().optional(),
  assignedTo: z.string().optional(), unassigned: z.enum(["true"]).optional(), q: z.string().max(80).optional(),
  from: z.coerce.date().optional(), to: z.coerce.date().optional(), page: z.coerce.number().optional(), limit: z.coerce.number().optional()
});

router.get("/leads", validate({ query: leadListQuery }), asyncHandler(async (req, res) => {
  const q = req.query, f = { ...leadScope(req.user) };
  if (q.status) f.status = q.status;
  if (q.type) f.type = q.type;
  if (q.city) f.city = q.city.toLowerCase();
  if (q.unassigned) f.assignedTo = null;
  else if (q.assignedTo && req.user.role === "admin") f.assignedTo = oid(q.assignedTo);
  if (q.from || q.to) f.createdAt = { ...(q.from && { $gte: q.from }), ...(q.to && { $lte: q.to }) };
  if (q.q) { const rx = new RegExp(escapeRegex(q.q), "i"); f.$or = [{ name: rx }, { phone: rx }, { email: rx }, { reference: rx }, { projectName: rx }]; }
  const { page, limit, skip } = paginate(q);
  const [items, total] = await Promise.all([
    Lead.find(f).select("-notes").populate("assignedTo", "name").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(), Lead.countDocuments(f)
  ]);
  res.json({ success: true, total, page, pages: Math.ceil(total / limit), items });
}));

const findLead = async (req) => {
  const lead = await Lead.findOne({ _id: oid(req.params.id), ...leadScope(req.user) });
  if (!lead) throw ApiError.notFound("Lead not found");
  return lead;
};

router.get("/leads/:id", asyncHandler(async (req, res) => {
  const lead = await Lead.findOne({ _id: oid(req.params.id), ...leadScope(req.user) }).populate("assignedTo", "name email").lean();
  if (!lead) throw ApiError.notFound("Lead not found");
  res.json({ success: true, lead });
}));

// Status changes double as an audit trail (a system note is added) and stamp first-contact time for SLA reporting.
router.patch("/leads/:id/status", validate({ body: z.object({ status: z.enum(LEAD_STATUSES), note: z.string().max(1000).optional() }) }), asyncHandler(async (req, res) => {
  const lead = await findLead(req);
  const prev = lead.status;
  lead.status = req.body.status;
  if (prev === "new" && req.body.status !== "new" && !lead.firstContactedAt) lead.firstContactedAt = new Date();
  lead.notes.push({ text: `Status: ${prev} → ${req.body.status}${req.body.note ? ` — ${req.body.note}` : ""}`, by: req.user._id, byName: req.user.name || req.user.email });
  await lead.save();
  res.json({ success: true, lead });
}));

router.patch("/leads/:id/assign", adminOnly, validate({ body: z.object({ agentId: z.string().nullable() }) }), asyncHandler(async (req, res) => {
  const lead = await findLead(req);
  if (req.body.agentId) {
    const agent = await User.findOne({ _id: oid(req.body.agentId), role: { $in: ["agent", "admin"] }, isActive: true });
    if (!agent) throw ApiError.badRequest("Agent not found");
    lead.assignedTo = agent._id; lead.assignedAt = new Date();
  } else { lead.assignedTo = undefined; lead.assignedAt = undefined; }
  await lead.save();
  res.json({ success: true, lead });
}));

router.post("/leads/:id/notes", validate({ body: z.object({ text: z.string().trim().min(1).max(2000) }) }), asyncHandler(async (req, res) => {
  const lead = await findLead(req);
  lead.notes.push({ text: req.body.text, by: req.user._id, byName: req.user.name || req.user.email });
  await lead.save();
  res.status(201).json({ success: true, notes: lead.notes });
}));

router.get("/agents", asyncHandler(async (_req, res) =>
  res.json({ success: true, items: await User.find({ role: { $in: ["agent", "admin"] }, isActive: true }).select("name email role acceptsLeads").lean() })));

// ---- Owner-submitted properties: moderation queue -------------------------------------------
router.get("/submissions", adminOnly, validate({ query: z.object({ status: z.enum(["pending", "approved", "rejected", "published"]).optional(), page: z.coerce.number().optional(), limit: z.coerce.number().optional() }) }),
  asyncHandler(async (req, res) => {
    const f = req.query.status ? { status: req.query.status } : {};
    const { page, limit, skip } = paginate(req.query);
    const [items, total] = await Promise.all([PropertySubmission.find(f).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(), PropertySubmission.countDocuments(f)]);
    res.json({ success: true, total, page, pages: Math.ceil(total / limit), items });
  }));

/** approve → optionally publish: turns the submission into a live Project card (resale/rent). */
router.patch("/submissions/:id", adminOnly,
  validate({ body: z.object({ action: z.enum(["approve", "publish", "reject"]), note: z.string().max(1000).optional() }) }),
  asyncHandler(async (req, res) => {
    const sub = await PropertySubmission.findById(oid(req.params.id));
    if (!sub) throw ApiError.notFound("Submission not found");
    if (["published"].includes(sub.status)) throw ApiError.conflict("Already published");
    const { action } = req.body;
    if (action === "reject") sub.status = "rejected";
    else sub.status = "approved";
    if (action === "publish") {
      const name = `${sub.bhk ? sub.bhk + " " : ""}${sub.propertyType} for ${sub.purpose === "rent" ? "Rent" : "Sale"} in ${sub.societyName || sub.locality}`;
      const slug = `${slugify(name)}-${sub.reference.slice(-4).toLowerCase()}`;
      const city = await City.findOne({ slug: sub.city }).select("name").lean();
      await Project.create({
        slug, name, builder: sub.owner.name, city: sub.city, cityName: city?.name, location: `${sub.locality}${city ? ", " + city.name : ""}`,
        price: sub.purpose === "rent" ? `₹${formatInr(sub.expectedPrice)}/mo` : formatInr(sub.expectedPrice), priceNumeric: sub.expectedPrice,
        flatTypes: sub.bhk, bhk: sub.bhk ? [parseInt(sub.bhk, 10)].filter(Boolean) : [], carpetArea: sub.carpetArea ? `${sub.carpetArea} sq.ft` : undefined, carpetAreaMin: sub.carpetArea, carpetAreaMax: sub.carpetArea,
        status: sub.possession === "ready-to-move" ? "Ready to Move" : "Under Construction", statusKey: sub.possession === "ready-to-move" ? "ready-to-move" : "under-construction",
        images: sub.photos, amenities: sub.amenities, propertyType: sub.propertyType, listingType: sub.purpose === "rent" ? "rent" : "resale", source: "owner-submission", tag: "Owner Listing"
      });
      sub.status = "published"; sub.publishedProjectSlug = slug;
    }
    sub.reviewNote = req.body.note; sub.reviewedBy = req.user._id; sub.reviewedAt = new Date();
    await sub.save();
    res.json({ success: true, submission: sub });
  }));

// ---- Users -----------------------------------------------------------------------------------
router.get("/users", adminOnly, validate({ query: z.object({ role: z.enum(["user", "agent", "admin"]).optional(), q: z.string().max(80).optional(), page: z.coerce.number().optional(), limit: z.coerce.number().optional() }) }),
  asyncHandler(async (req, res) => {
    const f = {};
    if (req.query.role) f.role = req.query.role;
    if (req.query.q) { const rx = new RegExp(escapeRegex(req.query.q), "i"); f.$or = [{ name: rx }, { email: rx }, { phone: rx }]; }
    const { page, limit, skip } = paginate(req.query);
    const [items, total] = await Promise.all([User.find(f).select("name email phone role isActive acceptsLeads createdAt lastLoginAt").sort({ createdAt: -1 }).skip(skip).limit(limit).lean(), User.countDocuments(f)]);
    res.json({ success: true, total, page, pages: Math.ceil(total / limit), items });
  }));

router.patch("/users/:id", adminOnly,
  validate({ body: z.object({ role: z.enum(["user", "agent", "admin"]).optional(), isActive: z.boolean().optional(), acceptsLeads: z.boolean().optional() }).strict() }),
  asyncHandler(async (req, res) => {
    if (String(req.params.id) === String(req.user._id) && (req.body.role || req.body.isActive === false)) throw ApiError.badRequest("You cannot change your own role or deactivate yourself");
    const u = await User.findByIdAndUpdate(oid(req.params.id), req.body, { new: true }).select("name email role isActive acceptsLeads");
    if (!u) throw ApiError.notFound("User not found");
    res.json({ success: true, user: u });
  }));

// ---- Content management (generic CRUD for catalogue + CMS collections) ---------------------------
const PROTECTED = new Set(["_id", "__v", "createdAt", "updatedAt", "views"]);
const writable = (Model, body) => {
  const out = {};
  for (const key of Object.keys(Model.schema.paths)) {
    const top = key.split(".")[0];
    if (PROTECTED.has(top) || !(top in body)) continue;
    out[top] = body[top];
  }
  return out;
};

function crud(path, Model, { key = "slug", derive, searchFields = ["name"] } = {}) {
  const base = `/${path}`;
  router.get(base, adminOnly, asyncHandler(async (req, res) => {
    const f = {};
    if (req.query.q) { const rx = new RegExp(escapeRegex(String(req.query.q)), "i"); f.$or = searchFields.map((k) => ({ [k]: rx })); }
    const { page, limit, skip } = paginate(req.query);
    const [items, total] = await Promise.all([Model.find(f).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean(), Model.countDocuments(f)]);
    res.json({ success: true, total, page, pages: Math.ceil(total / limit), items });
  }));
  router.post(base, adminOnly, asyncHandler(async (req, res) => {
    const data = writable(Model, req.body);
    if (derive) derive(data);
    res.status(201).json({ success: true, item: await Model.create(data) });
  }));
  router.patch(`${base}/:id`, adminOnly, asyncHandler(async (req, res) => {
    const data = writable(Model, req.body);
    if (derive) derive(data, true);
    const doc = await Model.findByIdAndUpdate(oid(req.params.id), { $set: data }, { new: true, runValidators: true });
    if (!doc) throw ApiError.notFound("Not found");
    res.json({ success: true, item: doc });
  }));
  router.delete(`${base}/:id`, adminOnly, asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(oid(req.params.id));
    if (!doc) throw ApiError.notFound("Not found");
    res.json({ success: true });
  }));
}

const deriveProject = (d, isUpdate) => {
  if (!isUpdate && !d.slug && d.name) d.slug = slugify(d.name);
  if (d.price && d.priceNumeric === undefined) d.priceNumeric = priceToNumber(d.price);
  if (d.flatTypes && !d.bhk) d.bhk = [...new Set((String(d.flatTypes).match(/\d/g) || []).map(Number).filter((n) => n > 0 && n <= 6))];
  if (d.status && !d.statusKey) {
    const t = d.status.toLowerCase();
    d.statusKey = t.includes("ready") ? "ready-to-move" : t.includes("new") || t.includes("pre") ? "new-launch" : "under-construction";
  }
  if (d.cityName === undefined && d.city) d.city = String(d.city).toLowerCase();
};
const withSlug = (field) => (d, isUpdate) => { if (!isUpdate && !d.slug && d[field]) d.slug = slugify(d[field]); };

crud("projects", Project, { derive: deriveProject, searchFields: ["name", "builder", "location"] });
crud("developers", Developer, { derive: withSlug("name") });
crud("cities", City, { derive: withSlug("name") });
crud("testimonials", Testimonial, { searchFields: ["name", "city"] });
crud("faqs", Faq, { searchFields: ["q"] });
crud("blog", BlogPost, { derive: withSlug("title"), searchFields: ["title"] });
crud("jobs", Job, { derive: withSlug("title"), searchFields: ["title"] });
crud("offices", Office, { derive: withSlug("name") });

router.get("/job-applications", adminOnly, asyncHandler(async (req, res) =>
  res.json({ success: true, items: await JobApplication.find().populate("job", "title").sort({ createdAt: -1 }).limit(200).lean() })));

module.exports = router;
