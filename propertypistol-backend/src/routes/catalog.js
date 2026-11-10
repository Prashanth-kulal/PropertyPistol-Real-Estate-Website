const router = require("express").Router();
const { z } = require("zod");
const Project = require("../models/Project");
const City = require("../models/City");
const Developer = require("../models/Developer");
const { TransitNetwork } = require("../models/Content");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { buildProjectFilter, SORTS } = require("../services/projectQuery");
const { paginate, haversineKm, escapeRegex } = require("../utils/helpers");

const LIST_FIELDS = "slug projectId region locality name builder builderLogo developerSlug city cityName location price priceNumeric avgPrice flatTypes bhk carpetArea possession status statusKey rera rera_informations tag isExclusive rating images features geo propertyType listingType";

const csvNums = z.preprocess((v) => (typeof v === "string" ? v.split(",").filter(Boolean).map(Number) : v), z.array(z.number()).optional());
const listQuery = z.object({
  city: z.string().optional(), region: z.string().optional(), locality: z.string().optional(), q: z.string().max(100).optional(), builder: z.string().optional(),
  developerSlug: z.string().optional(), status: z.enum(["new-launch", "under-construction", "ready-to-move"]).optional(),
  bhk: csvNums, minPrice: z.coerce.number().optional(), maxPrice: z.coerce.number().optional(),
  exclusive: z.enum(["true", "false"]).optional(), rera: z.enum(["true", "false"]).optional(),
  tag: z.string().optional(), propertyType: z.string().optional(), listingType: z.enum(["new-project", "resale", "rent"]).optional(),
  sort: z.enum(Object.keys(SORTS)).default("relevance"),
  page: z.coerce.number().optional(), limit: z.coerce.number().optional()
});

// ---- Projects --------------------------------------------------------------------------------
// GET /api/projects?city=mumbai&bhk=2,3&maxPrice=30000000&status=new-launch&sort=price-asc&page=1
router.get("/projects", validate({ query: listQuery }), asyncHandler(async (req, res) => {
  const filter = buildProjectFilter(req.query);
  const { page, limit, skip } = paginate(req.query);
  const [items, total] = await Promise.all([
    Project.find(filter).select(LIST_FIELDS).sort(SORTS[req.query.sort]).skip(skip).limit(limit).lean(),
    Project.countDocuments(filter)
  ]);
  res.json({ success: true, total, page, pages: Math.ceil(total / limit), items });
}));

// Category landing pages: /new-projects-in-mumbai, /ready-to-move-in-pune, /rera-compliant ...
const CATEGORY_FILTERS = {
  "new-projects": { status: "new-launch" },
  "ready-to-move": { status: "ready-to-move" },
  "under-construction": { status: "under-construction" },
  "rera-compliant": { rera: "true" },
  "developer-listings": {}
};
router.get("/projects/category/:category", validate({ query: listQuery }), asyncHandler(async (req, res) => {
  const base = CATEGORY_FILTERS[req.params.category];
  if (!base) throw ApiError.notFound("Unknown category");
  const filter = buildProjectFilter({ ...req.query, ...base });
  const { page, limit, skip } = paginate(req.query);
  const [items, total] = await Promise.all([
    Project.find(filter).select(LIST_FIELDS).sort(SORTS[req.query.sort]).skip(skip).limit(limit).lean(),
    Project.countDocuments(filter)
  ]);
  res.json({ success: true, category: req.params.category, total, page, pages: Math.ceil(total / limit), items });
}));

router.get("/projects/exclusive", asyncHandler(async (_req, res) => {
  res.json({ success: true, items: await Project.find({ published: true, isExclusive: true }).select(LIST_FIELDS).lean() });
}));

// Autocomplete for the hero search box: projects, localities and cities in one response
router.get("/search/suggest", validate({ query: z.object({ q: z.string().trim().min(1).max(60), city: z.string().optional() }) }),
  asyncHandler(async (req, res) => {
    const rx = new RegExp(escapeRegex(req.query.q), "i");
    const cityFilter = req.query.city && req.query.city !== "all" ? { city: req.query.city } : {};
    const [projects, cities, localities] = await Promise.all([
      Project.find({ published: true, ...cityFilter, $or: [{ name: rx }, { builder: rx }, { location: rx }] }).select("name slug location city").limit(6).lean(),
      City.find({ $or: [{ name: rx }, { slug: rx }] }).select("name slug").limit(3).lean(),
      Project.distinct("location", { published: true, location: rx })
    ]);
    res.json({
      success: true,
      projects: projects.map((p) => ({ type: "project", label: p.name, sublabel: p.location, slug: p.slug, city: p.city })),
      cities: cities.map((c) => ({ type: "city", label: c.name, slug: c.slug })),
      localities: localities.slice(0, 5).map((l) => ({ type: "locality", label: l }))
    });
  }));

// Slug OR legacy id ("proj-1") both resolve; view counter is a cheap popularity signal.
router.get("/projects/:slug", asyncHandler(async (req, res) => {
  const key = req.params.slug.toLowerCase();
  const project = await Project.findOneAndUpdate({ $or: [{ slug: key }, { legacyIds: req.params.slug }], published: true }, { $inc: { views: 1 } }, { new: true }).lean();
  if (!project) throw ApiError.notFound("Project not found");
  const [developer, similar] = await Promise.all([
    project.developerSlug ? Developer.findOne({ slug: project.developerSlug }).select("slug name logo tagline experience projectCount").lean() : null,
    Project.find({ published: true, slug: { $ne: project.slug }, $or: [{ slug: { $in: project.relatedProjectSlugs || [] } }, { city: project.city }] })
      .select(LIST_FIELDS).sort({ rating: -1 }).limit(4).lean()
  ]);
  res.json({ success: true, project, developer, similar });
}));

// "Nearby properties" / map view – uses the 2dsphere index when the project has coordinates
router.get("/projects/:slug/nearby", validate({ query: z.object({ radiusKm: z.coerce.number().min(0.5).max(50).default(10) }) }),
  asyncHandler(async (req, res) => {
    const p = await Project.findOne({ slug: req.params.slug.toLowerCase() }).select("geo slug").lean();
    if (!p) throw ApiError.notFound("Project not found");
    if (!p.geo?.coordinates) return res.json({ success: true, items: [] });
    const [lng, lat] = p.geo.coordinates;
    const items = await Project.find({
      published: true, slug: { $ne: p.slug },
      geo: { $nearSphere: { $geometry: p.geo, $maxDistance: req.query.radiusKm * 1000 } }
    }).select(LIST_FIELDS).limit(10).lean();
    res.json({ success: true, items: items.map((i) => ({ ...i, distanceKm: Math.round(haversineKm(lat, lng, i.geo.coordinates[1], i.geo.coordinates[0]) * 10) / 10 })) });
  }));

// Side-by-side comparison tray (max 4)
router.post("/compare", validate({ body: z.object({ slugs: z.array(z.string()).min(2).max(4) }) }), asyncHandler(async (req, res) => {
  const items = await Project.find({ slug: { $in: req.body.slugs.map((s) => s.toLowerCase()) }, published: true })
    .select(LIST_FIELDS + " amenities highlights possession carpetAreaMin carpetAreaMax").lean();
  const order = new Map(req.body.slugs.map((s, i) => [s.toLowerCase(), i]));
  items.sort((a, b) => order.get(a.slug) - order.get(b.slug));
  res.json({ success: true, items });
}));

// ---- Cities ----------------------------------------------------------------------------------
router.get("/cities", validate({ query: z.object({ popular: z.enum(["true", "false"]).optional() }) }), asyncHandler(async (req, res) => {
  const filter = req.query.popular ? { popular: req.query.popular === "true" } : {};
  const cities = await City.find(filter).select("slug name state popular image projectsCount").lean();
  const live = await Project.aggregate([{ $match: { published: true } }, { $group: { _id: "$city", n: { $sum: 1 } } }]);
  const counts = Object.fromEntries(live.map((l) => [l._id, l.n]));
  res.json({ success: true, items: cities.map((c) => ({ ...c, id: c.slug, liveProjects: counts[c.slug] || 0 })) });
}));

router.get("/cities/:slug", asyncHandler(async (req, res) => {
  const city = await City.findOne({ slug: req.params.slug.toLowerCase() }).select("-priceTrends").lean();
  if (!city) throw ApiError.notFound("City not found");
  res.json({ success: true, city: { ...city, id: city.slug } });
}));

router.get("/cities/:slug/price-trends", asyncHandler(async (req, res) => {
  const city = await City.findOne({ slug: req.params.slug.toLowerCase() }).select("slug name priceTrends").lean();
  if (!city?.priceTrends) throw ApiError.notFound("No price trends for this city");
  res.json({ success: true, ...city.priceTrends });
}));

router.get("/cities/:slug/transit", asyncHandler(async (req, res) => {
  const n = await TransitNetwork.findOne({ cityId: req.params.slug.toLowerCase() }).lean();
  if (!n) throw ApiError.notFound("No transit network for this city");
  res.json({ success: true, network: n.data });
}));

// ---- Developers ------------------------------------------------------------------------------
router.get("/developers", asyncHandler(async (_req, res) => {
  res.json({ success: true, items: await Developer.find({ published: true }).select("slug name logo tagline experience projectCount established stats").lean() });
}));

router.get("/developers/:slug", asyncHandler(async (req, res) => {
  const dev = await Developer.findOne({ slug: req.params.slug, published: true }).lean();
  if (!dev) throw ApiError.notFound("Developer not found");
  const [projects, related] = await Promise.all([
    Project.find({ developerSlug: dev.slug, published: true }).select(LIST_FIELDS).lean(),
    Developer.find({ slug: { $ne: dev.slug }, published: true }).select("slug name logo tagline").limit(4).lean()
  ]);
  res.json({ success: true, developer: dev, projects, related });
}));

module.exports = router;
