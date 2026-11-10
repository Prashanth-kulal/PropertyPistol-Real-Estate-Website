// Frontend Data Access Layer – drop-in replacement for src/lib/api.js
//
// • Set NEXT_PUBLIC_API_URL (e.g. http://localhost:5000/api) to talk to the real backend.
// • Leave it unset and every function falls back to the bundled mock data, exactly like before,
//   so the site keeps working while the backend is being deployed.
//
// Existing exports keep their names and return shapes (arrays of projects/cities, { success, message, leadId }),
// so no component needs to change. New exports are added below for auth, wishlist, post-property, AI, etc.

import {
  CITIES, PROJECTS, EXCLUSIVE_PROJECTS, FAQS
} from "@/data";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
export const hasBackend = Boolean(API);

// ---------- low-level fetch with auth ----------------------------------------------------------
let accessToken = null;
let refreshing = null;
export const setAccessToken = (t) => { accessToken = t; };

async function refreshAccess() {
  if (!refreshing) {
    refreshing = fetch(`${API}/auth/refresh`, { method: "POST", credentials: "include" })
      .then(async (r) => (r.ok ? (await r.json()).accessToken : null))
      .catch(() => null)
      .finally(() => { refreshing = null; });
  }
  accessToken = await refreshing;
  return accessToken;
}

async function request(path, { method = "GET", body, auth = false, retry = true } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    credentials: "include", // sends the httpOnly refresh cookie
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401 && auth && retry && (await refreshAccess())) return request(path, { method, body, auth, retry: false });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status; err.details = data.details;
    throw err;
  }
  return data;
}

const qs = (o) => {
  const p = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => v !== undefined && v !== null && v !== "" && p.set(k, Array.isArray(v) ? v.join(",") : v));
  const s = p.toString();
  return s ? `?${s}` : "";
};

// ---------- catalogue (same signatures as before) ---------------------------------------------
export async function getListings({ city = "mumbai", query = "", ...filters } = {}) {
  if (!hasBackend) return mockListings({ city, query });
  const run = (c) => request(`/projects${qs({ city: c, q: query, limit: 50, ...filters })}`);
  let { items } = await run(city && city !== "all" ? city : undefined);
  if (!items.length && city && city !== "all" && !query) ({ items } = await run(undefined)); // same fallback as the mock
  return items;
}

export async function getExclusiveListings() {
  if (!hasBackend) return EXCLUSIVE_PROJECTS;
  return (await request("/projects/exclusive")).items;
}

export async function getCities() {
  if (!hasBackend) return CITIES;
  return (await request("/cities")).items;
}

export async function getFaqs() {
  if (!hasBackend) return FAQS;
  return (await request("/faqs")).items;
}

export async function submitLead(leadData) {
  if (!hasBackend) {
    await new Promise((r) => setTimeout(r, 600));
    return { success: true, message: "Thank you! An advisor will connect with you within 15 minutes.", leadId: "lead_" + Date.now() };
  }
  // Pass the form state through unchanged; the API understands name/fullName, phone/phoneNumber, etc.
  // Add `type` (e.g. "home-loan", "propcheck", "nri-desk") from forms other than the home page consultation.
  return request("/leads", { method: "POST", body: { ...leadData, source: { page: typeof window !== "undefined" ? window.location.pathname : undefined } } });
}

// ---------- new: project detail, search, compare, tools ---------------------------------------
export const getProject = (slug) => request(`/projects/${encodeURIComponent(slug)}`);              // { project, developer, similar }
export const getNearby = (slug, radiusKm = 10) => request(`/projects/${encodeURIComponent(slug)}/nearby${qs({ radiusKm })}`);
export const getCategoryListings = (category, params = {}) => request(`/projects/category/${category}${qs(params)}`);
export const compareProjects = (slugs) => request("/compare", { method: "POST", body: { slugs } });
export const suggestSearch = (q, city) => request(`/search/suggest${qs({ q, city })}`);
export const getCity = (slug) => request(`/cities/${slug}`);
export const getPriceTrends = (slug) => request(`/cities/${slug}/price-trends`);
export const getTransit = (slug) => request(`/cities/${slug}/transit`);
export const getDevelopers = () => request("/developers");
export const getDeveloper = (slug) => request(`/developers/${slug}`);
export const getTestimonials = () => request("/testimonials");
export const getBlog = (params = {}) => request(`/blog${qs(params)}`);
export const getJobs = (department) => request(`/jobs${qs({ department })}`);
export const applyToJob = (slug, form) => request(`/jobs/${slug}/apply`, { method: "POST", body: form });
export const getOffices = () => request("/offices");
export const subscribeNewsletter = (email) => request("/newsletter", { method: "POST", body: { email, source: "blog" } });
export const calcEmi = (principal, ratePct, years) => request("/tools/emi", { method: "POST", body: { principal, ratePct, years } });
export const calcEligibility = (body) => request("/tools/loan-eligibility", { method: "POST", body });
export const askAura = (message) => request("/tools/ai/chat", { method: "POST", body: { message } }); // { reply, cards }
export const postProperty = (form) => request("/property-submissions", { method: "POST", auth: true, body: form });

// ---------- new: auth + wishlist ---------------------------------------------------------------
export async function sendOtp(phone) { return request("/auth/otp/request", { method: "POST", body: { phone } }); }
export async function verifyOtp(phone, code, name) {
  const data = await request("/auth/otp/verify", { method: "POST", body: { phone, code, name } });
  accessToken = data.accessToken;
  return data; // { user, isNewUser, accessToken }
}
export async function loginWithEmail(email, password) {
  const data = await request("/auth/login", { method: "POST", body: { email, password } });
  accessToken = data.accessToken;
  return data;
}
export async function registerWithEmail({ name, email, password }) {
  const data = await request("/auth/register", { method: "POST", body: { name, email, password } });
  accessToken = data.accessToken;
  return data;
}
/** Call once on app start to restore the session from the refresh cookie. Returns the user or null. */
export async function restoreSession() {
  if (!hasBackend || !(await refreshAccess())) return null;
  try { return (await request("/auth/me", { auth: true })).user; } catch { return null; }
}
export async function logout() { await request("/auth/logout", { method: "POST" }).catch(() => {}); accessToken = null; }
export const getWishlist = () => request("/me/wishlist", { auth: true });
export const addToWishlist = (slug) => request(`/me/wishlist/${slug}`, { method: "PUT", auth: true });
export const removeFromWishlist = (slug) => request(`/me/wishlist/${slug}`, { method: "DELETE", auth: true });
/** After login, push the localStorage wishlist so nothing saved as a guest is lost. */
export const syncWishlist = (slugs) => request("/me/wishlist/sync", { method: "POST", auth: true, body: { slugs } });

// ---------- offline fallback (original mock behaviour) -----------------------------------------
async function mockListings({ city, query }) {
  await new Promise((r) => setTimeout(r, 50));
  let filtered = [...PROJECTS];
  if (city && city !== "all") {
    const m = filtered.filter((p) => p.city.toLowerCase() === city.toLowerCase());
    if (m.length > 0) filtered = m;
  }
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.builder.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
  }
  return filtered;
}
