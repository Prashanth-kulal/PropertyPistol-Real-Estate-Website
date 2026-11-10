const { Schema, model } = require("mongoose");

const Testimonial = model("Testimonial", new Schema({
  name: String, city: String, property: String, rating: { type: Number, min: 1, max: 5 },
  review: String, avatar: String, published: { type: Boolean, default: true }, order: { type: Number, default: 0 }
}, { timestamps: true }));

const Faq = model("Faq", new Schema({
  q: { type: String, required: true }, a: { type: String, required: true },
  category: { type: String, default: "general" }, published: { type: Boolean, default: true }, order: { type: Number, default: 0 }
}, { timestamps: true }));

const BlogPost = model("BlogPost", new Schema({
  slug: { type: String, unique: true, required: true },
  title: { type: String, required: true }, category: { type: String, index: true },
  readTime: String, author: String, image: String, excerpt: String, body: String,
  featured: { type: Boolean, default: false }, published: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true }));

const Job = model("Job", new Schema({
  slug: { type: String, unique: true, required: true },
  title: String, department: { type: String, index: true }, location: String, type: String,
  experience: String, description: String, open: { type: Boolean, default: true }
}, { timestamps: true }));

const JobApplication = model("JobApplication", new Schema({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true, index: true },
  name: { type: String, required: true }, email: { type: String, required: true }, phone: String,
  portfolio: String, note: String, resumeUrl: String,
  status: { type: String, enum: ["new", "reviewing", "interview", "rejected", "hired"], default: "new" }
}, { timestamps: true }));

const Office = model("Office", new Schema({
  slug: { type: String, unique: true }, name: String, isHQ: Boolean, address: String,
  phone: String, email: String, hours: String, image: String, mapQuery: String
}, { timestamps: true }));

const Subscriber = model("Subscriber", new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  active: { type: Boolean, default: true }, source: String
}, { timestamps: true }));

/** Free-form key/value blobs: achievements counters, tool tiles, search shortcuts, ... */
const SiteContent = model("SiteContent", new Schema({
  key: { type: String, unique: true, required: true }, value: Schema.Types.Mixed
}, { timestamps: true }));

const TransitNetwork = model("TransitNetwork", new Schema({
  cityId: { type: String, unique: true, required: true }, data: Schema.Types.Mixed
}, { timestamps: true }));

module.exports = { Testimonial, Faq, BlogPost, Job, JobApplication, Office, Subscriber, SiteContent, TransitNetwork };
