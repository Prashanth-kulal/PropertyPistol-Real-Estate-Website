const { Schema, model } = require("mongoose");

const STATUS_KEYS = ["new-launch", "under-construction", "ready-to-move"];

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    legacyIds: [String], // e.g. "proj-1" – lets old frontend ids still resolve
    projectId: { type: Number, index: true }, // PropertyPistol numeric project ID
    name: { type: String, required: true, trim: true },
    builder: { type: String, index: true },
    builderLogo: String,
    developerSlug: { type: String, index: true },
    city: { type: String, required: true, lowercase: true, index: true },
    cityName: String,
    region: { type: String, index: true }, // e.g. "Navi Mumbai", "South Mumbai"
    locality: { type: String, index: true }, // e.g. "Sanpada", "Worli"
    location: String, // "Sanpada, Navi Mumbai"
    fullAddress: String,
    price: String, // display string, e.g. "2.68 Cr"
    priceNumeric: { type: Number, index: true }, // rupees – used for filtering/sorting
    avgPrice: String,
    flatTypes: String,
    bhk: [Number], // [2,3] – parsed from flatTypes for filtering
    carpetArea: String,
    carpetAreaMin: Number,
    carpetAreaMax: Number,
    projectArea: String,
    possession: String,
    status: String, // display label
    statusKey: { type: String, enum: STATUS_KEYS, index: true },
    rera: String,
    rera_informations: [Schema.Types.Mixed], // QR previews & MahaRERA certificate references
    tag: String,
    isExclusive: { type: Boolean, default: false, index: true },
    rating: Number,
    reviewsCount: Number,
    images: [String],
    features: [String],
    overview: String,
    highlights: [String],
    amenities: [Schema.Types.Mixed],
    floorPlans: [Schema.Types.Mixed],
    landmarks: [Schema.Types.Mixed],
    relatedProjectSlugs: [String],
    propertyType: { type: String, default: "Apartment" },
    // GeoJSON [lng, lat] – powers "nearby" and map views
    geo: { type: { type: String, enum: ["Point"] }, coordinates: { type: [Number] } },
    listingType: { type: String, enum: ["new-project", "resale", "rent"], default: "new-project", index: true },
    source: { type: String, enum: ["catalog", "owner-submission"], default: "catalog" },
    published: { type: Boolean, default: true, index: true },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

projectSchema.index({ geo: "2dsphere" }, { sparse: true });
projectSchema.index({ name: "text", builder: "text", location: "text" }, { weights: { name: 5, builder: 3, location: 2 } });
projectSchema.index({ city: 1, statusKey: 1, priceNumeric: 1 });

// A document without coordinates must not carry an empty geo object (2dsphere rejects it)
projectSchema.pre("validate", function () {
  if (this.geo && (!this.geo.coordinates || this.geo.coordinates.length !== 2)) this.geo = undefined;
});

module.exports = model("Project", projectSchema);
module.exports.STATUS_KEYS = STATUS_KEYS;
