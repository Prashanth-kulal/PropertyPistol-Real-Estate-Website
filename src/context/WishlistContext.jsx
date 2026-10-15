"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { Heart, Check, X } from "lucide-react";
import { getProjectSlug } from "@/data/projectsData";

const WishlistContext = createContext(null);

const STORAGE_KEY = "auraliving_saved_properties";

/**
 * Normalizes property data from any format into a consistent structure
 */
function normalizeProperty(p) {
  if (!p) return null;
  const slug = p.slug || getProjectSlug(p);
  const id = String(p.id || slug);
  const name = p.name || p.title || "Luxury Residence";
  const builder = p.builder || "Grade-A Builder";
  const location = p.location || "Prime Location";
  const price = p.price || p.priceRange || "Price on Request";
  const avgPrice = p.avgPrice || "";
  const flatTypes = p.flatTypes || p.configuration || "2, 3 BHK";
  const carpetArea = p.carpetArea || "";
  
  let images = [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    images = p.images;
  } else if (p.image) {
    images = [p.image];
  } else {
    images = [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
    ];
  }

  const tag = p.tag || p.badge || "Verified";
  const status = p.status || "Ready to Move";
  const rera = p.rera || "";
  const rating = p.rating || 4.9;

  return {
    id,
    slug,
    name,
    builder,
    location,
    price,
    avgPrice,
    flatTypes,
    carpetArea,
    images,
    image: images[0],
    tag,
    status,
    rera,
    rating,
    savedAt: Date.now()
  };
}

export function WishlistProvider({ children }) {
  const [savedProperties, setSavedProperties] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState(null); // { id, message, type: 'added' | 'removed' }

  // Safe client hydration from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedProperties(parsed);
        }
      }
    } catch (e) {
      console.warn("AuraLiving Wishlist: Failed to read from localStorage", e);
    }
  }, []);

  // Multi-tab sync via storage event and custom events
  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSavedProperties(parsed);
          }
        } else {
          setSavedProperties([]);
        }
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("auraliving_wishlist_sync", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("auraliving_wishlist_sync", handleSync);
    };
  }, []);

  const triggerToast = useCallback((message, type = "added") => {
    const toastId = Date.now();
    setToast({ id: toastId, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === toastId ? null : current));
    }, 3200);
  }, []);

  const persist = useCallback((newList) => {
    setSavedProperties(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      window.dispatchEvent(new Event("auraliving_wishlist_sync"));
    } catch (e) {
      console.warn("AuraLiving Wishlist: Failed to persist to localStorage", e);
    }
  }, []);

  // Check if a property is saved by id or slug
  const isSaved = useCallback(
    (idOrSlug) => {
      if (!idOrSlug) return false;
      const target = String(idOrSlug).toLowerCase();
      return savedProperties.some(
        (p) =>
          String(p.id).toLowerCase() === target ||
          String(p.slug).toLowerCase() === target
      );
    },
    [savedProperties]
  );

  // Toggle property saved state
  const toggleSave = useCallback(
    (project) => {
      if (!project) return false;
      const normalized = normalizeProperty(project);
      const targetId = normalized.id.toLowerCase();
      const targetSlug = normalized.slug.toLowerCase();

      const existingIndex = savedProperties.findIndex(
        (p) =>
          String(p.id).toLowerCase() === targetId ||
          String(p.slug).toLowerCase() === targetSlug
      );

      if (existingIndex >= 0) {
        // Remove
        const updated = savedProperties.filter((_, idx) => idx !== existingIndex);
        persist(updated);
        triggerToast(`Removed "${normalized.name}" from Saved Properties`, "removed");
        return false;
      } else {
        // Add to front (prevent duplicate)
        const updated = [normalized, ...savedProperties.filter(
          (p) =>
            String(p.id).toLowerCase() !== targetId &&
            String(p.slug).toLowerCase() !== targetSlug
        )];
        persist(updated);
        triggerToast(`Saved "${normalized.name}" to Saved Properties!`, "added");
        return true;
      }
    },
    [savedProperties, persist, triggerToast]
  );

  // Explicit remove
  const removeSave = useCallback(
    (idOrSlug) => {
      if (!idOrSlug) return;
      const target = String(idOrSlug).toLowerCase();
      const itemToRemove = savedProperties.find(
        (p) =>
          String(p.id).toLowerCase() === target ||
          String(p.slug).toLowerCase() === target
      );
      const updated = savedProperties.filter(
        (p) =>
          String(p.id).toLowerCase() !== target &&
          String(p.slug).toLowerCase() !== target
      );
      persist(updated);
      if (itemToRemove) {
        triggerToast(`Removed "${itemToRemove.name}" from Saved Properties`, "removed");
      }
    },
    [savedProperties, persist, triggerToast]
  );

  // Clear all
  const clearAllSaved = useCallback(() => {
    persist([]);
    triggerToast("Cleared all saved properties", "removed");
  }, [persist, triggerToast]);

  const value = useMemo(
    () => ({
      savedProperties,
      savedCount: isMounted ? savedProperties.length : 0,
      isLoaded: isMounted,
      isSaved,
      toggleSave,
      removeSave,
      clearAllSaved,
      triggerToast
    }),
    [savedProperties, isMounted, isSaved, toggleSave, removeSave, clearAllSaved, triggerToast]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}

      {/* Global Interactive Wishlist Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-auto animate-in slide-in-from-bottom-3 fade-in duration-300">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md transition-all ${
              toast.type === "added"
                ? "bg-stone-900/95 text-white border-amber-500/40 shadow-black/20"
                : "bg-white text-gray-800 border-gray-200 shadow-lg"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === "added"
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              }`}
            >
              {toast.type === "added" ? (
                <Heart className="w-4 h-4 fill-current text-rose-500" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </div>
            <div className="text-xs font-semibold max-w-xs pr-2">
              {toast.message}
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-white p-1 cursor-pointer transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
