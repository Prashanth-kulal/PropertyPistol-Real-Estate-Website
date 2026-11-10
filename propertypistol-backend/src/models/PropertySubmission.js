const { Schema, model } = require("mongoose");

/** Owner-posted listings from /post-property. They stay private until an admin approves them. */
const submissionSchema = new Schema(
  {
    reference: { type: String, unique: true },
    purpose: { type: String, enum: ["sell", "rent"], required: true },
    propertyCategory: { type: String, enum: ["residential", "commercial"], default: "residential" },
    propertyType: { type: String, default: "apartment" },
    bhk: String,
    carpetArea: Number,
    furnishing: String,
    city: { type: String, required: true, lowercase: true, index: true },
    locality: { type: String, required: true },
    societyName: String,
    expectedPrice: { type: Number, required: true }, // rupees (sale price or monthly rent)
    maintenance: Number,
    possession: String,
    amenities: [String],
    photos: [String], // URLs (upload to S3/Cloudinary separately; see README)
    owner: {
      name: { type: String, required: true },
      email: String,
      phone: { type: String, required: true },
      countryCode: { type: String, default: "+91" }
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "approved", "rejected", "published"], default: "pending", index: true },
    reviewNote: String,
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    publishedProjectSlug: String
  },
  { timestamps: true }
);

module.exports = model("PropertySubmission", submissionSchema);
