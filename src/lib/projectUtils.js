// Lightweight project utilities without heavy data dependencies
// Used by Wishlist, Compare, Navigation, and Card components to prevent bundling 34+ MB registries into RootLayout

export const ID_TO_SLUG_MAP = {
  "godrej-ascend": "godrej-ascend",
  "lodha-corinthia": "lodha-corinthia",
  "mahindra-marina-64": "mahindra-marina-64",
  "proj-1": "godrej-eternal-palms",
  "proj-2": "lt-island-cove",
  "proj-3": "lt-elixir-reserve",
  "proj-4": "tata-orbis",
  "proj-5": "kanakia-valley",
  "proj-6": "lt-vayam",
  "proj-7": "prestige-falcon-city",
  "proj-8": "godrej-woodsville",
  "proj-9": "dlf-the-arbour",
  "mum-1": "godrej-eternal-palms",
  "mum-2": "lt-island-cove",
  "mum-3": "lt-elixir-reserve",
  "del-1": "godrej-south-estate-prima-4709",
  "del-2": "tarc-kailasa-15408",
  "pune-1": "godrej-woodsville",
  "blr-1": "prestige-falcon-city",
  "ex-1": "aura-signature-waterfront",
  "ex-2": "aura-palms-golf-estate",
  "ex-3": "aura-grand-downtown-dubai"
};

/**
 * Generates a canonical, URL-safe slug from any project object
 */
export function getProjectSlug(project) {
  if (!project) return "godrej-eternal-palms";

  if (project.slug && project.slug.trim()) {
    return project.slug.trim().toLowerCase();
  }

  if (project.id && ID_TO_SLUG_MAP[project.id]) {
    return ID_TO_SLUG_MAP[project.id];
  }

  const name = project.title || project.name || "";
  if (!name) return project.id ? String(project.id).toLowerCase() : "godrej-eternal-palms";

  const generatedSlug = name
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return generatedSlug || "godrej-eternal-palms";
}

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
