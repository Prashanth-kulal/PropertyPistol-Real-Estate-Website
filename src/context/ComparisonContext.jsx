"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { getProjectBySlug, getProjectSlug, CANONICAL_PROJECTS } from "@/data/projectsData";
import { CITY_PROPERTIES } from "@/data/cityData";

const ComparisonContext = createContext(null);

const STORAGE_KEY = "auraliving_compare_projects";
export const MAX_COMPARE_PROJECTS = 3;

/**
 * Resolves a full project object from any ID, slug, or partial object
 */
export function resolveCompareProject(raw) {
  if (!raw) return null;
  const targetId = typeof raw === "string" ? raw.trim().toLowerCase() : String(raw.id || raw.slug || "").trim().toLowerCase();

  // 1. Direct match in CANONICAL_PROJECTS
  const canonical = CANONICAL_PROJECTS.find(
    (p) =>
      p.id.toLowerCase() === targetId ||
      p.slug.toLowerCase() === targetId ||
      (p.name && p.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === targetId)
  );
  if (canonical) return canonical;

  // 2. Search in CITY_PROPERTIES across all cities
  for (const cityKey of Object.keys(CITY_PROPERTIES)) {
    const list = CITY_PROPERTIES[cityKey] || [];
    const found = list.find(
      (p) =>
        String(p.id).toLowerCase() === targetId ||
        String(p.slug || "").toLowerCase() === targetId ||
        (p.name && p.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === targetId)
    );
    if (found) {
      return {
        ...found,
        slug: found.slug || getProjectSlug(found),
        title: found.title || found.name
      };
    }
  }

  // 3. Fallback to getProjectBySlug
  const deepFound = getProjectBySlug(targetId);
  if (deepFound) return deepFound;

  // 4. If raw is already an object with essential fields, preserve it
  if (typeof raw === "object" && (raw.name || raw.title)) {
    return {
      id: raw.id || targetId,
      slug: raw.slug || getProjectSlug(raw),
      name: raw.name || raw.title,
      title: raw.title || raw.name,
      builder: raw.builder || "Grade-A Builder",
      location: raw.location || "Prime Location",
      price: raw.price || "Price on Request",
      avgPrice: raw.avgPrice || "",
      flatTypes: raw.flatTypes || "2, 3 BHK",
      carpetArea: raw.carpetArea || "On Request",
      possession: raw.possession || "Under Construction",
      rera: raw.rera || "Verified",
      images: raw.images || (raw.image ? [raw.image] : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"])
    };
  }

  return null;
}

export function ComparisonProvider({ children }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState(null); // { id, message, type: 'success' | 'warning' | 'removed' }

  // Hydrate safely from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelectedIds(parsed.slice(0, MAX_COMPARE_PROJECTS));
        }
      }
    } catch (e) {
      console.warn("AuraLiving Comparison: Failed to read from localStorage", e);
    }
  }, []);

  // Multi-tab sync via storage & custom events
  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSelectedIds(parsed.slice(0, MAX_COMPARE_PROJECTS));
          }
        } else {
          setSelectedIds([]);
        }
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("auraliving_compare_sync", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("auraliving_compare_sync", handleSync);
    };
  }, []);

  const triggerToast = useCallback((message, type = "success") => {
    const toastId = Date.now();
    setToast({ id: toastId, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === toastId ? null : current));
    }, 3500);
  }, []);

  const persist = useCallback((newList) => {
    setSelectedIds(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      window.dispatchEvent(new Event("auraliving_compare_sync"));
    } catch (e) {
      console.warn("AuraLiving Comparison: Failed to persist to localStorage", e);
    }
  }, []);

  // Check if a project is in the comparison selection
  const isCompared = useCallback(
    (idOrSlug) => {
      if (!idOrSlug) return false;
      const target = String(idOrSlug).toLowerCase().trim();
      return selectedIds.some((id) => String(id).toLowerCase().trim() === target);
    },
    [selectedIds]
  );

  // Toggle selection
  const toggleCompare = useCallback(
    (project) => {
      if (!project) return false;
      const resolved = resolveCompareProject(project);
      const targetId = resolved ? resolved.id || resolved.slug : String(project.id || project.slug || project);
      const cleanId = String(targetId).toLowerCase().trim();
      const projName = resolved?.name || resolved?.title || project.name || project.title || "Project";

      const exists = selectedIds.some((id) => String(id).toLowerCase().trim() === cleanId);

      if (exists) {
        // Remove
        const updated = selectedIds.filter((id) => String(id).toLowerCase().trim() !== cleanId);
        persist(updated);
        triggerToast(`Removed "${projName}" from comparison`, "removed");
        return false;
      } else {
        // Limit check
        if (selectedIds.length >= MAX_COMPARE_PROJECTS) {
          triggerToast(
            `You can compare up to ${MAX_COMPARE_PROJECTS} projects. Please remove one to add "${projName}".`,
            "warning"
          );
          return false;
        }

        // Add
        const updated = [...selectedIds, targetId];
        persist(updated);
        triggerToast(`Added "${projName}" to comparison (${updated.length}/${MAX_COMPARE_PROJECTS})`, "success");
        return true;
      }
    },
    [selectedIds, persist, triggerToast]
  );

  // Remove single project
  const removeCompare = useCallback(
    (idOrSlug) => {
      if (!idOrSlug) return;
      const target = String(idOrSlug).toLowerCase().trim();
      const updated = selectedIds.filter((id) => String(id).toLowerCase().trim() !== target);
      persist(updated);
      triggerToast("Removed project from comparison", "removed");
    },
    [selectedIds, persist, triggerToast]
  );

  // Clear all
  const clearAllCompare = useCallback(() => {
    persist([]);
    triggerToast("Cleared comparison selection", "removed");
  }, [persist, triggerToast]);

  // Resolve all currently selected project objects
  const selectedProjects = useMemo(() => {
    return selectedIds
      .map((id) => resolveCompareProject(id))
      .filter(Boolean);
  }, [selectedIds]);

  const value = useMemo(
    () => ({
      selectedIds,
      selectedProjects,
      compareCount: isMounted ? selectedIds.length : 0,
      isLoaded: isMounted,
      isCompared,
      toggleCompare,
      removeCompare,
      clearAllCompare,
      maxLimit: MAX_COMPARE_PROJECTS,
      triggerToast
    }),
    [
      selectedIds,
      selectedProjects,
      isMounted,
      isCompared,
      toggleCompare,
      removeCompare,
      clearAllCompare,
      triggerToast
    ]
  );

  return (
    <ComparisonContext.Provider value={value}>
      {children}

      {/* Global Interactive Comparison Notification Toast */}
      {toast && (
        <div className="fixed bottom-24 right-6 z-50 pointer-events-auto animate-in slide-in-from-bottom-3 fade-in duration-300">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md transition-all ${
              toast.type === "success"
                ? "bg-[#252525]/95 text-white border-[#D29324]/40 shadow-black/25"
                : toast.type === "warning"
                ? "bg-[#FFF8E6] text-[#8C5D00] border-[#E6B800] shadow-md"
                : "bg-white text-gray-800 border-gray-200 shadow-xl"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === "success"
                  ? "bg-[#D29324]/20 text-[#FFE2A7]"
                  : toast.type === "warning"
                  ? "bg-[#E6B800]/20 text-[#8C5D00]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
              ) : toast.type === "warning" ? (
                <AlertCircle className="w-4 h-4 text-[#8C5D00]" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </div>
            <div className="text-xs font-semibold max-w-xs pr-1">
              {toast.message}
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-200 p-1 cursor-pointer transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
}
