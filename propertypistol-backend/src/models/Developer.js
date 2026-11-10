const { Schema, model } = require("mongoose");

const developerSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true, index: true },
    logo: String,
    tagline: String,
    experience: String,
    projectCount: String,
    established: String,
    aboutUs: String,
    description: String,
    stats: [{ label: String, value: String, _id: false }],
    featuredProjects: [Schema.Types.Mixed],
    cities: [Schema.Types.Mixed],
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = model("Developer", developerSchema);
