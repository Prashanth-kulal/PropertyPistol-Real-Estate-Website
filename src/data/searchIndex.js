/**
 * Smart Property Search & Autocomplete Engine
 * Builds a fast, normalized, in-memory index from verified repository project,
 * locality, developer, city, and BHK configuration records.
 */

import { PROJECTS, CITIES } from "./index.js";
import { DEVELOPERS_DATA } from "./developersData.js";

let cachedIndex = null;

/**
 * Extracts distinct numeric BHK configurations from flatTypes string
 * e.g., "1 BHK, 2 BHK, 2.5 BHK" -> ["1", "2", "2.5"]
 */
function parseBhks(flatTypes) {
  if (!flatTypes) return [];
  const matches = [...String(flatTypes).matchAll(/(\d+(?:\.5)?)\s*[-]?\s*bhk/gi)].map((m) => m[1]);
  return [...new Set(matches)];
}

function toCompact(str) {
  return (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Builds and memoizes the searchable index once per runtime.
 * Executes in ~50ms across 5,700+ project records.
 */
export function getSearchIndex() {
  if (cachedIndex) return cachedIndex;

  // 1. Cities Index
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

  // 2. Localities Index
  const localityMap = new Map();
  for (const p of PROJECTS) {
    if (!p.locality || p.locality.trim() === "" || p.locality === "Unknown") continue;
    const cityKey = (p.city || "mumbai").toLowerCase().trim();
    const locName = p.locality.trim();
    const key = `${cityKey}::${locName.toLowerCase()}`;
    if (!localityMap.has(key)) {
      localityMap.set(key, {
        type: "locality",
        name: locName,
        city: cityKey,
        cityName: p.cityName || cityKey.charAt(0).toUpperCase() + cityKey.slice(1),
        count: 0,
        normName: locName.toLowerCase(),
        compactName: toCompact(locName),
        destination: `/${cityKey}?locality=${encodeURIComponent(locName)}`,
      });
    }
    localityMap.get(key).count++;
  }
  const localities = Array.from(localityMap.values());

  // 3. Developers Index
  const developerMap = new Map();
  for (const d of DEVELOPERS_DATA) {
    const norm = d.name.toLowerCase().trim();
    developerMap.set(norm, {
      type: "developer",
      name: d.name,
      slug: d.slug,
      projectCount: parseInt(d.projectCount, 10) || 0,
      cities: new Set(),
      normName: norm,
      compactName: toCompact(d.name),
      destination: `/developers/${d.slug}`,
    });
  }
  for (const p of PROJECTS) {
    if (!p.builder || p.builder.trim() === "") continue;
    const norm = p.builder.trim().toLowerCase();
    if (!developerMap.has(norm)) {
      const cityKey = (p.city || "mumbai").toLowerCase().trim();
      developerMap.set(norm, {
        type: "developer",
        name: p.builder.trim(),
        slug: null,
        projectCount: 0,
        cities: new Set(),
        normName: norm,
        compactName: toCompact(p.builder),
        destination: `/${cityKey}?developer=${encodeURIComponent(p.builder.trim())}`,
      });
    }
    const entry = developerMap.get(norm);
    entry.projectCount++;
    if (p.city) entry.cities.add(p.city.toLowerCase().trim());
  }
  const developers = Array.from(developerMap.values()).map((d) => ({
    ...d,
    cities: Array.from(d.cities),
  }));

  // 4. Projects Index
  const projects = PROJECTS.map((p) => ({
    type: "project",
    id: p.id,
    slug: p.slug || p.id,
    name: p.name,
    builder: p.builder || "",
    locality: p.locality || "",
    location: p.location || "",
    city: (p.city || "mumbai").toLowerCase().trim(),
    cityName: p.cityName || (p.city ? p.city.charAt(0).toUpperCase() + p.city.slice(1) : "Mumbai"),
    flatTypes: p.flatTypes || "",
    price: p.price || "",
    bhks: parseBhks(p.flatTypes),
    normName: (p.name || "").toLowerCase().trim(),
    compactName: toCompact(p.name),
    normBuilder: (p.builder || "").toLowerCase().trim(),
    compactBuilder: toCompact(p.builder),
    normLocality: (p.locality || "").toLowerCase().trim(),
    compactLocality: toCompact(p.locality),
    normLocation: (p.location || "").toLowerCase().trim(),
    compactLocation: toCompact(p.location),
    destination: `/projects/${p.slug || p.id}`,
  }));

  cachedIndex = { cities, localities, developers, projects };
  return cachedIndex;
}

/**
 * Searches the index and returns ranked, deduplicated suggestions.
 *
 * @param {string} rawQuery - The user input text.
 * @param {string} selectedCity - Currently selected city (if any).
 * @param {number} limit - Maximum number of suggestions to return (default: 8).
 * @returns {Array<object>} Ranked suggestions list.
 */
export function getSearchSuggestions(rawQuery, selectedCity = "", limit = 8) {
  if (!rawQuery || !rawQuery.trim()) return [];

  const index = getSearchIndex();
  const rawClean = rawQuery.trim().toLowerCase();
  // Normalize punctuation and extra spaces: "2-BHK" -> "2 bhk", "2bhk" -> "2bhk"
  const q = rawClean.replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  const qCompact = toCompact(rawClean);

  // Normalize city filter
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
    const matchingProjects = index.projects.filter((p) => {
      if (activeCity && p.city !== activeCity) return false;
      return p.bhks.includes(targetBhk);
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
        subtitle: `${p.locality || p.location}${p.cityName ? ", " + p.cityName : ""} • ${p.flatTypes} • ₹${p.price}`,
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
  if (!activeCity) {
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
        subtitle: `Locality in ${loc.cityName} • ${loc.count} Projects`,
        destination: loc.destination,
        city: loc.city,
        score,
      });
    }
  }

  // 3. Developer matches
  for (const dev of index.developers) {
    if (activeCity && !dev.cities.includes(activeCity)) continue;
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
        subtitle: `Developer • ${dev.projectCount}+ Projects${cityLabel}`,
        destination: dev.destination,
        city: activeCity,
        score,
      });
    }
  }

  // 4. Project matches
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
      p.compactLocality.includes(qCompact) ||
      p.normLocality.includes(q) ||
      p.compactLocation.includes(qCompact) ||
      p.normLocation.includes(q)
    ) {
      score = 420;
    } else if (p.compactBuilder.includes(qCompact) || p.normBuilder.includes(q)) {
      score = 360;
    }

    if (score > 0) {
      results.push({
        type: "project",
        badge: "PROJECT",
        id: `proj-${p.id}`,
        title: p.name,
        subtitle: `${p.locality || p.location}${p.cityName ? ", " + p.cityName : ""} • by ${p.builder} • ₹${p.price}`,
        destination: p.destination,
        city: p.city,
        price: p.price,
        score,
      });
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
 *
 * @param {string} rawQuery - The user input text.
 * @param {string} selectedCity - Currently selected city (if any).
 * @returns {object} Interpreted result with type, filter parameters, and destination URL.
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
  const matchedProject = index.projects.find((p) => {
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
  const matchedLocality = index.localities.find((loc) => {
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
  const matchedDev = index.developers.find((d) => {
    if (activeCity && !d.cities.includes(activeCity)) return false;
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
  if (!activeCity) {
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
  const partialProject = index.projects.find((p) => {
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
