// AuraLiving Centralized Configurations Data Layer
// Provides lightweight, instant fallback configurations and client-side manifest hydration
// Optimized to avoid bundling massive monolithic configuration files into client bundles

// Client in-memory cache for manifests loaded via fetch
const MANIFEST_CACHE_BY_ID = new Map();
const MANIFEST_CACHE_BY_SLUG = new Map();

export function cacheProjectManifest(manifest) {
  if (!manifest) return;
  if (manifest.projectId) MANIFEST_CACHE_BY_ID.set(Number(manifest.projectId), manifest);
  if (manifest.slug) MANIFEST_CACHE_BY_SLUG.set(manifest.slug.toLowerCase().trim(), manifest);
}

/**
 * Returns configurations for a given project object, projectId, or slug.
 * Checks memory cache first, or synthesizes a fast, zero-delay fallback from the project's own verified specifications.
 */
export function getProjectConfigurations(projectOrIdentifier) {
  if (!projectOrIdentifier) return null;

  let projectId = null;
  let slug = null;
  let projectObj = null;

  if (typeof projectOrIdentifier === "object") {
    projectObj = projectOrIdentifier;
    projectId = projectObj.id || projectObj.sourceId;
    slug = projectObj.slug;
  } else if (typeof projectOrIdentifier === "number") {
    projectId = projectOrIdentifier;
  } else if (typeof projectOrIdentifier === "string") {
    const num = Number(projectOrIdentifier);
    if (!isNaN(num) && num > 0) {
      projectId = num;
    } else {
      slug = projectOrIdentifier.toLowerCase().trim();
    }
  }

  // 1. Check memory cache by project ID
  if (projectId && MANIFEST_CACHE_BY_ID.has(Number(projectId))) {
    return MANIFEST_CACHE_BY_ID.get(Number(projectId));
  }

  // 2. Check memory cache by slug
  if (slug && MANIFEST_CACHE_BY_SLUG.has(slug)) {
    return MANIFEST_CACHE_BY_SLUG.get(slug);
  }

  // 3. Graceful fast fallback synthesized from the project's own verified specs
  if (projectObj) {
    const flatTypes = (projectObj.flatTypes || projectObj.configuration || "Apartment")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const unitPlans = flatTypes.map((ft, idx) => ({
      bhk: ft,
      variants: [
        {
          id: `fb-${projectId || idx}-${idx}`,
          bhk: ft,
          carpetArea: projectObj.carpetArea || "On Request",
          carpetAreaDisplay: projectObj.carpetArea ? `${projectObj.carpetArea}` : "On Request",
          builtUpArea: projectObj.builtUpArea || null,
          price: projectObj.price || "On Request",
          propertyType: projectObj.type || "Apartment",
          plan2D: null,
          plan3D: null,
          twoDOriginalUrl: null,
          threeDOriginalUrl: null,
          has2D: false,
          has3D: false
        }
      ]
    }));

    return {
      projectId: projectId || 0,
      slug: slug || "",
      verificationStatus: "SYNTHESIZED_FALLBACK",
      officialSourceUrl: projectObj.referenceUrl || null,
      planTypes: ["unit"],
      masterPlans: [],
      sitePlans: [],
      unitPlans
    };
  }

  return null;
}

export function hasProjectConfigurations(projectOrIdentifier) {
  if (!projectOrIdentifier) return false;
  const conf = getProjectConfigurations(projectOrIdentifier);
  return Boolean(conf && conf.unitPlans && conf.unitPlans.length > 0);
}
