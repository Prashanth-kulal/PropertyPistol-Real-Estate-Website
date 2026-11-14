const router = require("express").Router();
const LocalityPriceTrend = require("../models/LocalityPriceTrend");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// GET /api/price-trends/locality/:identifier?city=mumbai
// identifier can be slug or localityUuid
router.get(
  "/locality/:identifier",
  asyncHandler(async (req, res) => {
    const { identifier } = req.params;
    const city = (req.query.city || "mumbai").toLowerCase().trim();

    const record = await LocalityPriceTrend.findOne({
      city,
      $or: [
        { slug: identifier.toLowerCase().trim() },
        { localityUuid: identifier },
        { locality: new RegExp(`^${identifier.trim()}$`, "i") }
      ]
    }).lean();

    if (!record) {
      throw ApiError.notFound(`Price trends not found for locality '${identifier}' in city '${city}'`);
    }

    res.json({
      success: true,
      locality: record
    });
  })
);

// GET /api/price-trends/city/:city
// Lists all localities in a city that have verified price trends
router.get(
  "/city/:city",
  asyncHandler(async (req, res) => {
    const city = req.params.city.toLowerCase().trim();
    const items = await LocalityPriceTrend.find({ city })
      .select("locality slug localityUuid pricePerSqft displayPricePerSqft projectCount latitude longitude")
      .sort({ pricePerSqft: -1 })
      .lean();

    res.json({
      success: true,
      city,
      total: items.length,
      localities: items
    });
  })
);

// GET /api/price-trends/compare?city=mumbai&uuids=uuid1,uuid2&range=6m
router.get(
  "/compare",
  asyncHandler(async (req, res) => {
    const city = (req.query.city || "mumbai").toLowerCase().trim();
    const range = req.query.range || "6m";
    const uuids = (req.query.uuids || "").split(",").filter(Boolean);

    if (!uuids.length) {
      throw ApiError.badRequest("At least one locality UUID is required for comparison");
    }

    const records = await LocalityPriceTrend.find({
      city,
      localityUuid: { $in: uuids }
    }).lean();

    const result = records.map(r => ({
      locality: r.locality,
      slug: r.slug,
      localityUuid: r.localityUuid,
      pricePerSqft: r.pricePerSqft,
      displayPricePerSqft: r.displayPricePerSqft,
      series: (r.history && r.history[range]) || []
    }));

    res.json({
      success: true,
      city,
      range,
      datasets: result
    });
  })
);

module.exports = router;
