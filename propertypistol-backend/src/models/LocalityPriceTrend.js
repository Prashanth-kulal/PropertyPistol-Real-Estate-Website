const { Schema, model } = require("mongoose");

const pricePointSchema = new Schema(
  {
    year: { type: Number, required: true },
    month: { type: String, required: true },
    price: { type: Number, required: true },
    displayPrice: { type: String, required: true }
  },
  { _id: false }
);

const nearbyLocalitySchema = new Schema(
  {
    uuid: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);

const localityPriceTrendSchema = new Schema(
  {
    city: { type: String, required: true, lowercase: true, index: true },
    locality: { type: String, required: true, index: true },
    slug: { type: String, required: true, lowercase: true },
    localityUuid: { type: String, required: true, index: true },
    pricePerSqft: { type: Number, required: true },
    displayPricePerSqft: { type: String, required: true },
    projectCount: { type: Number, default: 0 },
    latitude: Number,
    longitude: Number,
    location: String,
    history: {
      "6m": [pricePointSchema],
      "3y": [pricePointSchema],
      "5y": [pricePointSchema]
    },
    nearbyLocalities: [nearbyLocalitySchema],
    sourceMetadata: {
      source: { type: String, default: "PropertyPistol Public API" },
      endpoint: String,
      lastVerified: Date
    }
  },
  { timestamps: true }
);

// Compound unique index on city + slug
localityPriceTrendSchema.index({ city: 1, slug: 1 }, { unique: true });

module.exports = model("LocalityPriceTrend", localityPriceTrendSchema);
