const { Schema, model } = require("mongoose");

/**
 * One collection for every "someone wants to be called back" form on the site.
 * `type` says which form it came from; type-specific fields live in `payload`.
 */
const LEAD_TYPES = [
  "consultation",      // home page FREE Expert Consultation
  "project-inquiry",   // ProjectInquiryModal / site visit on a project page
  "property-advisory", // /property-advisory
  "home-loan",         // /home-loan enquiry
  "propcheck",         // /propcheck inspection booking
  "nri-desk", "dubai-desk",
  "builder-service",   // builders / brokers / buyers on /services/builder-service
  "syndicate", "radiate",
  "rent-agreement", "rent-receipt", "loan-service", "broker-services",
  "deck-download",     // builder-service pitch-deck gate
  "contact", "other"
];

const LEAD_STATUSES = ["new", "contacted", "qualified", "site-visit-scheduled", "negotiation", "won", "lost", "spam"];

const noteSchema = new Schema(
  { text: String, by: { type: Schema.Types.ObjectId, ref: "User" }, byName: String, at: { type: Date, default: Date.now } },
  { _id: false }
);

const leadSchema = new Schema(
  {
    reference: { type: String, unique: true, index: true }, // e.g. PP-L-20261110-4F2A
    type: { type: String, enum: LEAD_TYPES, default: "consultation", index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, index: true },
    countryCode: { type: String, default: "+91" },
    email: { type: String, lowercase: true, trim: true },
    city: { type: String, lowercase: true, index: true },
    projectSlug: { type: String, index: true },
    projectName: String,
    preferredDate: String,
    message: { type: String, maxlength: 2000 },
    payload: Schema.Types.Mixed, // budget, bhk, purpose, company, inspectionStage, ...
    consent: { whatsappUpdates: Boolean, shareWithPartners: Boolean },
    user: { type: Schema.Types.ObjectId, ref: "User" }, // set when submitted by a logged-in user
    status: { type: String, enum: LEAD_STATUSES, default: "new", index: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", index: true },
    assignedAt: Date,
    firstContactedAt: Date, // used for the "call back within 15 minutes" SLA metric
    duplicateOf: { type: Schema.Types.ObjectId, ref: "Lead" },
    notes: [noteSchema],
    source: {
      page: String, utmSource: String, utmMedium: String, utmCampaign: String,
      ip: String, userAgent: String
    }
  },
  { timestamps: true }
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ phone: 1, projectSlug: 1, type: 1, createdAt: -1 });

module.exports = model("Lead", leadSchema);
module.exports.LEAD_TYPES = LEAD_TYPES;
module.exports.LEAD_STATUSES = LEAD_STATUSES;
