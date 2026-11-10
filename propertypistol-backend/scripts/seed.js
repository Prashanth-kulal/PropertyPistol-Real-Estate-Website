/**
 * Seeds MongoDB from ./seed/*.json (generated from the frontend's mock data by export-frontend-data.mjs).
 * Idempotent: uses upserts keyed on slug, so re-running updates catalogue data without duplicating it.
 *   npm run seed          # upsert
 *   npm run seed:fresh    # wipe catalogue/content collections first (never touches users, leads, submissions)
 */
const path = require("path");
const fs = require("fs");
const { connectDb, mongoose } = require("../src/config/db");
const Project = require("../src/models/Project");
const City = require("../src/models/City");
const Developer = require("../src/models/Developer");
const { Testimonial, Faq, BlogPost, Job, Office, SiteContent, TransitNetwork } = require("../src/models/Content");
const { slugify } = require("../src/utils/helpers");

const load = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, "..", "seed", n), "utf8"));

const upsertAll = async (Model, docs, keyField) => {
  if (!docs.length) return 0;
  await Model.bulkWrite(docs.map((d) => ({ updateOne: { filter: { [keyField]: d[keyField] }, update: { $set: d }, upsert: true } })));
  return docs.length;
};

async function seed({ fresh = false } = {}) {
  if (fresh) {
    await Promise.all([Project, City, Developer, Testimonial, Faq, BlogPost, Job, Office, SiteContent, TransitNetwork].map((M) => M.deleteMany({})));
    console.log("[seed] cleared catalogue + content collections");
  }
  const projects = load("projects.json"), cities = load("cities.json"), developers = load("developers.json");
  const content = load("content.json"), transit = load("transit.json");

  // Projects owned by owners (source: owner-submission) are left alone because we only upsert by slug of catalogue items.
  const counts = {
    projects: await upsertAll(Project, projects.map((p) => ({ ...p, source: "catalog" })), "slug"),
    cities: await upsertAll(City, cities.map(({ id, ...c }) => c), "slug"),
    developers: await upsertAll(Developer, developers.map(({ id, ...d }) => d), "slug"),
    transit: await upsertAll(TransitNetwork, transit, "cityId"),
    blog: await upsertAll(BlogPost, content.articles.map((a, i) => ({
      slug: a.id || slugify(a.title), title: a.title, category: a.category, readTime: a.readTime, author: a.author,
      image: a.image, excerpt: a.excerpt, featured: !!a.featured, publishedAt: new Date(a.date) instanceof Date && !isNaN(new Date(a.date)) ? new Date(a.date) : new Date(Date.now() - i * 864e5)
    })), "slug"),
    jobs: await upsertAll(Job, content.jobs.map(({ id, ...j }) => ({ slug: id || slugify(j.title), ...j })), "slug"),
    offices: await upsertAll(Office, content.offices.map(({ id, ...o }) => ({ slug: id || slugify(o.name), ...o })), "slug")
  };

  // Collections without a natural unique key: replace wholesale (safe – they are pure CMS content)
  await Testimonial.deleteMany({}); await Testimonial.insertMany(content.testimonials.map(({ id, ...t }, i) => ({ ...t, order: i })));
  await Faq.deleteMany({}); await Faq.insertMany(content.faqs.map((f, i) => ({ q: f.q || f.question, a: f.a || f.answer, order: i })));
  for (const key of ["achievements", "tools", "searchShortcuts"]) {
    await SiteContent.updateOne({ key }, { $set: { value: content[key] } }, { upsert: true });
  }
  await Promise.all([Project, City, Developer].map((M) => M.syncIndexes()));
  counts.testimonials = content.testimonials.length; counts.faqs = content.faqs.length;
  console.log("[seed] done", counts);
}

module.exports = { seed };

if (require.main === module) {
  connectDb()
    .then(() => seed({ fresh: process.argv.includes("--fresh") }))
    .then(() => mongoose.disconnect())
    .catch((e) => { console.error("[seed] failed:", e); process.exit(1); });
}
