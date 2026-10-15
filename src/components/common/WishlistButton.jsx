"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { getProjectSlug } from "@/data/projectsData";

export default function WishlistButton({
  project,
  className = "",
  size = "md",
  variant = "floating",
  showLabel = false
}) {
  const { isSaved, toggleSave } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  if (!project) return null;

  const targetId = project.id || project.slug || getProjectSlug(project);
  const saved = isSaved(targetId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleSave(project);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Size variations
  const sizeConfig = {
    sm: {
      btn: "w-7 h-7",
      icon: "w-3.5 h-3.5",
      text: "text-[11px]"
    },
    md: {
      btn: "w-8.5 h-8.5",
      icon: "w-4.5 h-4.5",
      text: "text-xs"
    },
    lg: {
      btn: "w-10 h-10",
      icon: "w-5 h-5",
      text: "text-sm"
    }
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={saved ? "Remove from Saved Properties" : "Save Property"}
        aria-label={saved ? "Remove from saved properties" : "Save property"}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
          saved
            ? "bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100"
            : "bg-white border-[#E8E3DA] text-[#6B7280] hover:border-rose-300 hover:text-rose-500 shadow-2xs"
        } ${isAnimating ? "scale-95" : "active:scale-95"} ${className}`}
      >
        <Heart
          className={`${currentSize.icon} transition-transform duration-200 ${
            saved ? "fill-rose-500 text-rose-500 scale-105" : ""
          } ${isAnimating ? "scale-125" : ""}`}
        />
        <span>{saved ? "Saved" : "Save"}</span>
      </button>
    );
  }

  if (variant === "minimal") {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={saved ? "Remove from Saved Properties" : "Save Property"}
        aria-label={saved ? "Remove from saved properties" : "Save property"}
        className={`p-1.5 rounded-full transition-all cursor-pointer ${
          saved
            ? "text-rose-500"
            : "text-gray-400 hover:text-rose-500 hover:bg-gray-100"
        } ${isAnimating ? "scale-125" : "hover:scale-110 active:scale-90"} ${className}`}
      >
        <Heart
          className={`${currentSize.icon} ${
            saved ? "fill-rose-500 text-rose-500" : ""
          }`}
        />
      </button>
    );
  }

  // Default "floating" circular button for card image overlays
  return (
    <button
      type="button"
      onClick={handleClick}
      title={saved ? "Remove from Saved Properties" : "Save Property"}
      aria-label={saved ? `Remove ${project.name || "property"} from saved` : `Save ${project.name || "property"}`}
      className={`relative rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md select-none ${
        currentSize.btn
      } ${
        saved
          ? "bg-white/95 text-rose-500 ring-2 ring-rose-500/30"
          : "bg-white/90 hover:bg-white text-gray-700 hover:text-rose-500 backdrop-blur-xs hover:shadow-lg"
      } ${isAnimating ? "scale-110" : "hover:scale-105 active:scale-90"} ${className}`}
    >
      <Heart
        className={`${currentSize.icon} transition-all duration-300 ${
          saved
            ? "fill-rose-500 text-rose-500 drop-shadow-xs"
            : "hover:stroke-rose-500"
        } ${isAnimating ? "animate-ping-once" : ""}`}
      />
      {showLabel && (
        <span className={`ml-1 font-bold ${currentSize.text}`}>
          {saved ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
