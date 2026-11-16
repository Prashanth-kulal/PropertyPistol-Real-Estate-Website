/**
 * Smart Property Search & Autocomplete Engine
 * Ultra-fast, lightweight in-memory search across verified projects, localities, developers, and BHK configurations.
 * Decoupled from monolithic 34+ MB registry files via compact static JSON index hydration.
 */

import { CITIES } from "./cities.js";

let cachedIndex = null;
let loadPromise = null;

function toCompact(str) {
  return (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Basic static index with CITIES for immediate synchronous availability
 */
function getFallbackIndex() {
  const cities = CITIES.map((c) => ({
    type: "city",
    id: c.id.toLowerCase().trim(),
    name: c.name,
    state: c.state || "",
    projectCount: c.projectsCount || 0,
    normName: c.name.toLowerCase().trim(),
    compactName: toCompact(c.name),
    destination: `/${c.id.toLowerCase().trim()}`,
  }));

  return {
    cities,
    localities: [],
    developers: [],
    projects: [],
  };
}

/**
 * Pre-warms the compact search index in the background
 */
export function warmUpSearchIndex() {
  if (cachedIndex) return Promise.resolve(cachedIndex);
  if (loadPromise) return loadPromise;

  if (typeof window !== "undefined") {
    loadPromise = fetch("/data/search-index.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.projects) {
          // Pre-populate compact and normalized strings for instant query matching
          const cities = (data.cities || []).map((c) => ({
            ...c,
            normName: (c.name || "").toLowerCase().trim(),
            compactName: toCompact(c.name),
          }));

          const localities = (data.localities || []).map((loc) => ({
            ...loc,
            normName: (loc.name || "").toLowerCase().trim(),
            compactName: toCompact(loc.name),
          }));

          const developers = (data.developers || []).map((d) => ({
            ...d,
            normName: (d.name || "").toLowerCase().trim(),
            compactName: toCompact(d.name),
          }));

          const projects = (data.projects || []).map((p) => ({
            ...p,
            normName: (p.name || "").toLowerCase().trim(),
            compactName: toCompact(p.name),
            normBuilder: (p.builder || "").toLowerCase().trim(),
            compactBuilder: toCompact(p.builder),
            normLocality: (p.locality || "").toLowerCase().trim(),
            compactLocality: toCompact(p.locality),
            destination: p.destination || `/projects/${p.slug || p.id}`,
          }));

          cachedIndex = { cities, localities, developers, projects };
        } else {
          cachedIndex = getFallbackIndex();
        }
        return cachedIndex;
      })
      .catch(() => {
        cachedIndex = getFallbackIndex();
        return cachedIndex;
      });

    return loadPromise;
  }

  // Node / Server environment fallback
  cachedIndex = getFallbackIndex();
  return Promise.resolve(cachedIndex);
}

/**
 * Returns the search index synchronously, triggering background load if not ready
 */
export function getSearchIndex() {
  if (cachedIndex) return cachedIndex;
  warmUpSearchIndex();
  return getFallbackIndex();
}

/**
 * Searches the index and returns ranked, deduplicated suggestions.
 */
export function getSearchSuggestions(rawQuery, selectedCity = "", limit = 8) {
  if (!rawQuery || !rawQuery.trim()) return [];

  const index = getSearchIndex();
  const rawClean = rawQuery.trim().toLowerCase();
  const q = rawClean.replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  const qCompact = toCompact(rawClean);

  const cityTrim = (selectedCity || "").toLowerCase().trim();
  const activeCity = cityTrim === "all" || cityTrim === "select city" || !cityTrim ? null : cityTrim;

  // Check for BHK query pattern: "2bhk", "2 bhk", "2-bhk", "3bhk", etc.
  const bhkMatch = q.match(/^(\d+(?:\.5)?)\s*bhk$/i) || qCompact.match(/^(\d+(?:\.5)?)\s*bhk$/i);
  const targetBhk = bhkMatch ? bhkMatch[1] : null;

  const results = [];

  // ==========================================
  // CASE 1: BHK Configuration Query
  // ==========================================
  if (targetBhk) {
    const matchingProjects = (index.projects || []).filter((p) => {
      if (activeCity && p.city !== activeCity) return false;
      return p.bhks && p.bhks.includes(targetBhk);
    });

    const cityLabel = activeCity
      ? index.cities.find((c) => c.id === activeCity)?.name || activeCity.toUpperCase()
      : "Pan-India";

    results.push({
      type: "bhk",
      badge: "CONFIG",
      id: `bhk-${targetBhk}-${activeCity || "all"}`,
      title: `${targetBhk} BHK Properties`,
      subtitle: `${matchingProjects.length}+ verified ${targetBhk} BHK homes in ${cityLabel}`,
      destination: activeCity ? `/${activeCity}?bhk=${targetBhk}` : `/projects?bhk=${targetBhk}`,
      city: activeCity,
      bhk: targetBhk,
      score: 1000,
    });

    for (const p of matchingProjects.slice(0, limit - 1)) {
      results.push({
        type: "project",
        badge: "PROJECT",
        id: `proj-${p.id}`,
        title: p.name,
        subtitle: `${p.locality || ""}${p.cityName ? ", " + p.cityName : ""} • ${p.flatTypes || ""} • ₹${p.price || ""}`,
        destination: p.destination,
        city: p.city,
        price: p.price,
        score: 500,
      });
    }

    return results;
  }

  // ==========================================
  // CASE 2: Textual Matches (City, Locality, Developer, Project)
  // ==========================================

  // 1. City matches (only when searching cross-city / no city selected)
  if (!activeCity && index.cities) {
    for (const c of index.cities) {
      if (c.compactName === qCompact || c.normName === q) {
        results.push({
          type: "city",
          badge: "CITY",
          id: `city-${c.id}`,
          title: c.name,
          subtitle: `City in ${c.state || "India"} • ${c.projectCount ? c.projectCount + "+ Projects" : "Explore Properties"}`,
          destination: c.destination,
          city: c.id,
          score: 950,
        });
      } else if (c.compactName.startsWith(qCompact) || c.normName.startsWith(q)) {
        results.push({
          type: "city",
          badge: "CITY",
          id: `city-${c.id}`,
          title: c.name,
          subtitle: `City in ${c.state || "India"} • ${c.projectCount ? c.projectCount + "+ Projects" : "Explore Properties"}`,
          destination: c.destination,
          city: c.id,
          score: 850,
        });
      }
    }
  }

  // 2. Locality matches
  if (index.localities) {
    for (const loc of index.localities) {
      if (activeCity && loc.city !== activeCity) continue;
      let score = 0;
      if (loc.compactName === qCompact || loc.normName === q) {
        score = 900;
      } else if (loc.compactName.startsWith(qCompact) || loc.normName.startsWith(q)) {
        score = 750;
      } else if (loc.compactName.includes(qCompact) || loc.normName.includes(q)) {
        score = 550;
      }

      if (score > 0) {
        results.push({
          type: "locality",
          badge: "LOCALITY",
          id: `loc-${loc.city}-${loc.name}`,
          title: loc.name,
          subtitle: `Locality in ${loc.cityName || loc.city} • ${loc.count || ""} Projects`,
          destination: loc.destination,
          city: loc.city,
          score,
        });
      }
    }
  }

  // 3. Developer matches
  if (index.developers) {
    for (const dev of index.developers) {
      if (activeCity && dev.cities && !dev.cities.includes(activeCity)) continue;
      const cityLabel = activeCity
        ? ` in ${activeCity.charAt(0).toUpperCase() + activeCity.slice(1)}`
        : "";
      let score = 0;
      if (dev.compactName === qCompact || dev.normName === q) {
        score = 880;
      } else if (dev.compactName.startsWith(qCompact) || dev.normName.startsWith(q)) {
        score = 720;
      } else if (dev.compactName.includes(qCompact) || dev.normName.includes(q)) {
        score = 480;
      }

      if (score > 0) {
        results.push({
          type: "developer",
          badge: "DEVELOPER",
          id: `dev-${dev.name}`,
          title: dev.name,
          subtitle: `Developer • ${dev.count || ""}+ Projects${cityLabel}`,
          destination: dev.destination,
          city: activeCity,
          score,
        });
      }
    }
  }

  // 4. Project matches
  if (index.projects) {
    for (const p of index.projects) {
      if (activeCity && p.city !== activeCity) continue;

      let score = 0;
      if (p.compactName === qCompact || p.normName === q) {
        score = 920;
      } else if (p.compactName.startsWith(qCompact) || p.normName.startsWith(q)) {
        score = 780;
      } else if (p.compactName.includes(qCompact) || p.normName.includes(q)) {
        score = 620;
      } else if (
        p.compactLocality && (p.compactLocality.includes(qCompact) || p.normLocality.includes(q))
      ) {
        score = 420;
      } else if (p.compactBuilder && (p.compactBuilder.includes(qCompact) || p.normBuilder.includes(q))) {
        score = 360;
      }

      if (score > 0) {
        results.push({
          type: "project",
          badge: "PROJECT",
          id: `proj-${p.id}`,
          title: p.name,
          subtitle: `${p.locality || ""}${p.cityName ? ", " + p.cityName : ""} • by ${p.builder} • ₹${p.price}`,
          destination: p.destination,
          city: p.city,
          price: p.price,
          score,
        });
      }
    }
  }

  // Sort by score descending, then shorter title length
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.title.length - b.title.length;
  });

  // Deduplicate results
  const seen = new Set();
  const deduped = [];
  for (const item of results) {
    const key = `${item.type}:${item.title}:${item.city || ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
    if (deduped.length >= limit) break;
  }

  return deduped;
}

/**
 * Interprets a freeform search query string to resolve intent, destination URL,
 * and filter criteria for form submissions.
 */
export function interpretSearchQuery(rawQuery, selectedCity = "") {
  if (!rawQuery || !rawQuery.trim()) {
    const cityTrim = (selectedCity || "").toLowerCase().trim();
    if (cityTrim && cityTrim !== "all" && cityTrim !== "select city") {
      return { type: "city", city: cityTrim, destination: `/${cityTrim}` };
    }
    return { type: "none", destination: "/projects" };
  }

  const rawClean = rawQuery.trim().toLowerCase();
  const q = rawClean.replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  const qCompact = toCompact(rawClean);

  const cityTrim = (selectedCity || "").toLowerCase().trim();
  const activeCity = cityTrim === "all" || cityTrim === "select city" || !cityTrim ? null : cityTrim;

  // 1. Check BHK query pattern: "2bhk", "2 bhk", "2-bhk", "3bhk", etc.
  const bhkMatch = q.match(/^(\d+(?:\.5)?)\s*bhk$/i) || qCompact.match(/^(\d+(?:\.5)?)\s*bhk$/i);
  if (bhkMatch) {
    const bhkNum = bhkMatch[1];
    return {
      type: "bhk",
      bhk: bhkNum,
      bhkLabel: `${bhkNum} BHK`,
      city: activeCity,
      destination: activeCity ? `/${activeCity}?bhk=${bhkNum}` : `/projects?bhk=${bhkNum}`,
    };
  }

  const index = getSearchIndex();

  // 2. Check exact or high-confidence Project match
  const matchedProject = (index.projects || []).find((p) => {
    if (activeCity && p.city !== activeCity) return false;
    return p.compactName === qCompact || p.normName === q;
  });
  if (matchedProject) {
    return {
      type: "project",
      project: matchedProject,
      destination: matchedProject.destination,
    };
  }

  // 3. Check exact Locality match
  const matchedLocality = (index.localities || []).find((loc) => {
    if (activeCity && loc.city !== activeCity) return false;
    return loc.compactName === qCompact || loc.normName === q;
  });
  if (matchedLocality) {
    const targetCity = activeCity || matchedLocality.city;
    return {
      type: "locality",
      locality: matchedLocality.name,
      city: targetCity,
      destination: `/${targetCity}?locality=${encodeURIComponent(matchedLocality.name)}`,
    };
  }

  // 4. Check Developer match
  const matchedDev = (index.developers || []).find((d) => {
    if (activeCity && d.cities && !d.cities.includes(activeCity)) return false;
    return d.compactName === qCompact || d.normName === q;
  });
  if (matchedDev) {
    return {
      type: "developer",
      developer: matchedDev.name,
      slug: matchedDev.slug,
      city: activeCity,
      destination: matchedDev.slug
        ? `/developers/${matchedDev.slug}`
        : activeCity
        ? `/${activeCity}?developer=${encodeURIComponent(matchedDev.name)}`
        : `/projects?developer=${encodeURIComponent(matchedDev.name)}`,
    };
  }

  // 5. Check City match (if searching cross-city)
  if (!activeCity && index.cities) {
    const matchedCity = index.cities.find(
      (c) => c.compactName === qCompact || c.normName === q
    );
    if (matchedCity) {
      return {
        type: "city",
        city: matchedCity.id,
        destination: `/${matchedCity.id}`,
      };
    }
  }

  // 6. Check partial project match
  const partialProject = (index.projects || []).find((p) => {
    if (activeCity && p.city !== activeCity) return false;
    return p.compactName.startsWith(qCompact) || p.normName.startsWith(q);
  });
  if (partialProject && qCompact.length >= 4) {
    return {
      type: "project",
      project: partialProject,
      destination: partialProject.destination,
    };
  }

  // 7. Fallback general query
  return {
    type: "general",
    query: rawQuery.trim(),
    city: activeCity,
    destination: activeCity
      ? `/${activeCity}?q=${encodeURIComponent(rawQuery.trim())}`
      : `/projects?q=${encodeURIComponent(rawQuery.trim())}`,
  };
}
