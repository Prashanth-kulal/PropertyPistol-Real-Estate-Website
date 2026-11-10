const router = require("express").Router();
const { z } = require("zod");
const User = require("../models/User");
const Project = require("../models/Project");
const Lead = require("../models/Lead");
const PropertySubmission = require("../models/PropertySubmission");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { requireAuth } = require("../middleware/auth");

router.use(requireAuth);

const CARD = "slug name builder city location price priceNumeric avgPrice flatTypes carpetArea status tag rating images rera";
const MAX_WISHLIST = 200;

router.get("/wishlist", asyncHandler(async (req, res) => {
  const items = await Project.find({ slug: { $in: req.user.wishlist }, published: true }).select(CARD).lean();
  const order = new Map(req.user.wishlist.map((s, i) => [s, i]));
  items.sort((a, b) => order.get(b.slug) - order.get(a.slug)); // most recently saved first
  res.json({ success: true, slugs: req.user.wishlist, items });
}));

router.put("/wishlist/:slug", asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  if (!(await Project.exists({ slug }))) throw ApiError.notFound("Project not found");
  if (req.user.wishlist.length >= MAX_WISHLIST) throw ApiError.badRequest("Wishlist is full");
  await User.updateOne({ _id: req.user._id }, { $addToSet: { wishlist: slug } });
  res.json({ success: true, saved: true });
}));

router.delete("/wishlist/:slug", asyncHandler(async (req, res) => {
  await User.updateOne({ _id: req.user._id }, { $pull: { wishlist: req.params.slug.toLowerCase() } });
  res.json({ success: true, saved: false });
}));

// After login, merge whatever the visitor saved in localStorage before signing in
router.post("/wishlist/sync", validate({ body: z.object({ slugs: z.array(z.string().max(120)).max(100) }) }), asyncHandler(async (req, res) => {
  const valid = await Project.find({ slug: { $in: req.body.slugs.map((s) => s.toLowerCase()) } }).distinct("slug");
  const u = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: { $each: valid } } }, { new: true });
  res.json({ success: true, slugs: u.wishlist });
}));

router.get("/enquiries", asyncHandler(async (req, res) => {
  const items = await Lead.find({ user: req.user._id }).select("reference type projectName projectSlug status createdAt").sort({ createdAt: -1 }).limit(50).lean();
  res.json({ success: true, items });
}));

router.get("/properties", asyncHandler(async (req, res) => {
  const items = await PropertySubmission.find({ user: req.user._id }).select("reference purpose propertyType bhk city locality expectedPrice status reviewNote createdAt").sort({ createdAt: -1 }).lean();
  res.json({ success: true, items });
}));

module.exports = router;
