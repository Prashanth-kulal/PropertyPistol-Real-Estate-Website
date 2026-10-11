// Frontend Data Access Layer
// Prepares architecture for future Express/MongoDB backend (GET /api/listings, POST /api/leads)

import {
  CITIES,
  PROJECTS,
  EXCLUSIVE_PROJECTS,
  DEVELOPERS,
  SHOTS_TOOLS,
  ACHIEVEMENTS,
  TESTIMONIALS,
  FAQS,
  SEARCH_SHORTCUTS
} from "@/data";

/**
 * Fetch listings by city or search filter
 * Maps to future: GET /api/listings?city=:city&q=:query
 */
export async function getListings({ city = "mumbai", query = "" } = {}) {
  // Simulate lightweight async response
  await new Promise((resolve) => setTimeout(resolve, 50));

  let filtered = [...PROJECTS];

  if (city && city !== "all") {
    const cityMatches = filtered.filter((p) => p.city.toLowerCase() === city.toLowerCase());
    // Fall back to all if selected city has no direct seed yet
    if (cityMatches.length > 0) {
      filtered = cityMatches;
    }
  }

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.builder.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
  }

  return filtered;
}

/**
 * Fetch exclusive luxury properties
 * Maps to future: GET /api/listings?exclusive=true
 */
export async function getExclusiveListings() {
  return EXCLUSIVE_PROJECTS;
}

/**
 * Fetch supported cities
 * Maps to future: GET /api/cities
 */
export async function getCities() {
  return CITIES;
}

/**
 * Submit lead consultation inquiry
 * Maps to future: POST /api/leads
 * Body: { name, phone, email, city, projectId, notes }
 */
export async function submitLead(leadData) {
  // Simulates network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log("[AuraLiving API] Lead received (mock mode):", leadData);

  return {
    success: true,
    message: "Thank you! An AuraLiving property advisor will connect with you within 15 minutes.",
    leadId: "lead_" + Date.now()
  };
}

/**
 * Helper to get FAQs
 */
export async function getFaqs() {
  return FAQS;
}
