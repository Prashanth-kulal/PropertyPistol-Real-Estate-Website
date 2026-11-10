const { Schema, model } = require("mongoose");

const citySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    state: String,
    popular: { type: Boolean, default: false },
    image: String,
    heroImage: String,
    tagline: String,
    description: String,
    avgPriceSqFt: String,
    appreciationRate: String,
    rentalYield: String,
    reraAuthority: String,
    stampDuty: String,
    projectsCount: Number, // marketing number shown on cards; live count is computed in the API
    localities: [{ name: String, avgPrice: String, projects: Number, tag: String, _id: false }],
    faqs: [{ q: String, a: String, _id: false }],
    priceTrends: Schema.Types.Mixed // { historicalTrend, localitiesTrend, ... } consumed by /price-trends pages
  },
  { timestamps: true }
);

module.exports = model("City", citySchema);
