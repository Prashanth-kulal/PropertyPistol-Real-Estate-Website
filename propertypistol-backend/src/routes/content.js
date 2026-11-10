const router = require("express").Router();
const { z } = require("zod");
const { Testimonial, Faq, BlogPost, Job, JobApplication, Office, Subscriber, SiteContent } = require("../models/Content");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { formLimiter } = require("../middleware/rateLimit");
const { paginate, escapeRegex } = require("../utils/helpers");

router.get("/testimonials", asyncHandler(async (_req, res) =>
  res.json({ success: true, items: await Testimonial.find({ published: true }).sort({ order: 1, createdAt: 1 }).lean() })));

router.get("/faqs", validate({ query: z.object({ category: z.string().optional() }) }), asyncHandler(async (req, res) =>
  res.json({ success: true, items: await Faq.find({ published: true, ...(req.query.category ? { category: req.query.category } : {}) }).sort({ order: 1, createdAt: 1 }).lean() })));

router.get("/offices", asyncHandler(async (_req, res) =>
  res.json({ success: true, items: await Office.find().sort({ isHQ: -1 }).lean() })));

// Home-page blocks: achievements counters, tool tiles, search shortcuts ...
router.get("/site-content", asyncHandler(async (_req, res) => {
  const rows = await SiteContent.find().lean();
  res.json({ success: true, content: Object.fromEntries(rows.map((r) => [r.key, r.value])) });
}));

// ---- Blog ------------------------------------------------------------------------------------
router.get("/blog", validate({ query: z.object({ category: z.string().optional(), q: z.string().max(80).optional(), page: z.coerce.number().optional(), limit: z.coerce.number().optional() }) }),
  asyncHandler(async (req, res) => {
    const f = { published: true };
    if (req.query.category && req.query.category !== "all") f.category = req.query.category;
    if (req.query.q) { const rx = new RegExp(escapeRegex(req.query.q), "i"); f.$or = [{ title: rx }, { excerpt: rx }]; }
    const { page, limit, skip } = paginate(req.query);
    const [items, total] = await Promise.all([
      BlogPost.find(f).select("-body").sort({ featured: -1, publishedAt: -1 }).skip(skip).limit(limit).lean(), BlogPost.countDocuments(f)
    ]);
    res.json({ success: true, total, page, pages: Math.ceil(total / limit), items });
  }));

router.get("/blog/:slug", asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, published: true }).lean();
  if (!post) throw ApiError.notFound("Article not found");
  res.json({ success: true, post });
}));

router.post("/newsletter", formLimiter, validate({ body: z.object({ email: z.string().email(), source: z.string().max(40).optional() }) }),
  asyncHandler(async (req, res) => {
    // idempotent: subscribing twice is not an error (and re-activates unsubscribed addresses)
    await Subscriber.updateOne({ email: req.body.email.toLowerCase() }, { $set: { active: true }, $setOnInsert: { source: req.body.source } }, { upsert: true });
    res.status(201).json({ success: true, message: "You're subscribed!" });
  }));

// ---- Careers ---------------------------------------------------------------------------------
router.get("/jobs", validate({ query: z.object({ department: z.string().optional() }) }), asyncHandler(async (req, res) =>
  res.json({ success: true, items: await Job.find({ open: true, ...(req.query.department && req.query.department !== "all" ? { department: req.query.department } : {}) }).sort({ createdAt: -1 }).lean() })));

router.post("/jobs/:slug/apply", formLimiter,
  validate({ body: z.object({ name: z.string().trim().min(2).max(120), email: z.string().email(), phone: z.string().max(20).optional(), portfolio: z.string().url().optional().or(z.literal("")), note: z.string().max(3000).optional(), resumeUrl: z.string().url().optional() }) }),
  asyncHandler(async (req, res) => {
    const job = await Job.findOne({ slug: req.params.slug, open: true });
    if (!job) throw ApiError.notFound("This position is no longer open");
    await JobApplication.create({ ...req.body, portfolio: req.body.portfolio || undefined, job: job._id });
    res.status(201).json({ success: true, message: "Application received. Our team will be in touch." });
  }));

module.exports = router;
