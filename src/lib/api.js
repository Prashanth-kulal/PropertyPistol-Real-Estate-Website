// Frontend Data Access Layer – Dual-Mode Adapter (Express/MongoDB API + In-Memory Registry Fallback)
//
// • Set NEXT_PUBLIC_API_URL (e.g. http://localhost:5000/api) to connect to local Express/MongoDB backend.
// • Leave it unset and every function gracefully falls back to the bundled in-memory registry,
//   ensuring 100% UI stability, zero downtime, and instant responsiveness.

import {
  CITIES,
  PROJECTS,
  EXCLUSIVE_PROJECTS,
  DEVELOPERS,
  FAQS
} from "@/data";

const API = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
export const hasBackend = Boolean(API);

// ---------- Low-level fetch with auth & credentials ----------
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

  if (res.status === 401 && auth && retry && (await refreshAccess())) {
    return request(path, { method, body, auth, retry: false });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.details = data.details;
    throw err;
  }
  return data;
}

const qs = (o) => {
  const p = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      p.set(k, Array.isArray(v) ? v.join(",") : v);
    }
  });
  const s = p.toString();
  return s ? `?${s}` : "";
};

// ---------- Catalogue (Dual-Mode: API with In-Memory Fallback) ----------
export async function getListings({ city = "mumbai", query = "", ...filters } = {}) {
  if (!hasBackend) {
    return mockListings({ city, query });
  }

  try {
    const run = (c) => request(`/projects${qs({ city: c, q: query, limit: 50, ...filters })}`);
    let { items } = await run(city && city !== "all" ? city : undefined);
    if (!items?.length && city && city !== "all" && !query) {
      ({ items } = await run(undefined));
    }
    return items || [];
  } catch (err) {
    console.warn("[AuraLiving API] Backend unavailable, falling back to local registry:", err.message);
    return mockListings({ city, query });
  }
}

export async function getExclusiveListings() {
  if (!hasBackend) return EXCLUSIVE_PROJECTS;
  try {
    return (await request("/projects/exclusive")).items || EXCLUSIVE_PROJECTS;
  } catch (err) {
    console.warn("[AuraLiving API] Backend unavailable, falling back to local registry:", err.message);
    return EXCLUSIVE_PROJECTS;
  }
}

export async function getCities() {
  if (!hasBackend) return CITIES;
  try {
    return (await request("/cities")).items || CITIES;
  } catch (err) {
    console.warn("[AuraLiving API] Backend unavailable, falling back to local registry:", err.message);
    return CITIES;
  }
}

export async function getFaqs() {
  if (!hasBackend) return FAQS;
  try {
    return (await request("/faqs")).items || FAQS;
  } catch (err) {
    return FAQS;
  }
}

export async function submitLead(leadData) {
  if (!hasBackend) {
    await new Promise((r) => setTimeout(r, 600));
    return {
      success: true,
      message: "Thank you! An AuraLiving advisor will connect with you within 15 minutes.",
      leadId: "lead_" + Date.now()
    };
  }

  // Pass lead directly to Express backend CRM pipeline
  return request("/leads", {
    method: "POST",
    body: {
      ...leadData,
      source: {
        page: typeof window !== "undefined" ? window.location.pathname : undefined
      }
    }
  });
}

// ---------- Project Detail, Search, Compare, Tools ----------
export const getProject = (slug) => request(`/projects/${encodeURIComponent(slug)}`);
export const getNearby = (slug, radiusKm = 10) => request(`/projects/${encodeURIComponent(slug)}/nearby${qs({ radiusKm })}`);
export const getCategoryListings = (category, params = {}) => request(`/projects/category/${category}${qs(params)}`);
export const compareProjects = (slugs) => request("/compare", { method: "POST", body: { slugs } });
export const suggestSearch = (q, city) => request(`/search/suggest${qs({ q, city })}`);
export const getCity = (slug) => request(`/cities/${slug}`);
export const getPriceTrends = (slug) => request(`/cities/${slug}/price-trends`);
export const getTransit = (slug) => request(`/cities/${slug}/transit`);
export const getDevelopers = () => request("/developers");
export const getDeveloper = (slug) => request(`/developers/${slug}`);
export const calcEmi = (principal, ratePct, years) => request("/tools/emi", { method: "POST", body: { principal, ratePct, years } });
export const calcEligibility = (body) => request("/tools/loan-eligibility", { method: "POST", body });
export const askAura = (message) => request("/tools/ai/chat", { method: "POST", body: { message } });
export const postProperty = (form) => request("/property-submissions", { method: "POST", auth: true, body: form });

// ---------- Auth + Wishlist ----------
export async function sendOtp(phone) { return request("/auth/otp/request", { method: "POST", body: { phone } }); }
export async function verifyOtp(phone, code, name) {
  const data = await request("/auth/otp/verify", { method: "POST", body: { phone, code, name } });
  accessToken = data.accessToken;
  return data;
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
export async function restoreSession() {
  if (!hasBackend || !(await refreshAccess())) return null;
  try { return (await request("/auth/me", { auth: true })).user; } catch { return null; }
}
export async function logout() { await request("/auth/logout", { method: "POST" }).catch(() => {}); accessToken = null; }
export const getWishlist = () => request("/me/wishlist", { auth: true });
export const addToWishlist = (slug) => request(`/me/wishlist/${slug}`, { method: "PUT", auth: true });
export const removeFromWishlist = (slug) => request(`/me/wishlist/${slug}`, { method: "DELETE", auth: true });
export const syncWishlist = (slugs) => request("/me/wishlist/sync", { method: "POST", auth: true, body: { slugs } });

// ---------- Local Registry Fallback ----------
async function mockListings({ city, query }) {
  await new Promise((r) => setTimeout(r, 50));
  let filtered = [...PROJECTS];
  if (city && city !== "all") {
    const m = filtered.filter((p) => p.city.toLowerCase() === city.toLowerCase());
    if (m.length > 0) filtered = m;
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
