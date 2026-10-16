"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ArrowRight, Trash2 } from "lucide-react";
import { useComparison } from "@/context/ComparisonContext";
import { getProjectSlug } from "@/data/projectsData";

export default function CompareTray() {
  const router = useRouter();
  const {
    selectedProjects,
    selectedIds,
    removeCompare,
    clearAllCompare,
    maxLimit,
    isLoaded
  } = useComparison();

  if (!isLoaded || selectedProjects.length === 0) {
    return null;
  }

  const handleCompareClick = () => {
    // Navigate to /compare with selected project IDs in query param for shareability & direct link support
    const query = selectedProjects.map((p) => p.slug || p.id).join(",");
    router.push(`/compare?projects=${encodeURIComponent(query)}`);
  };

  return (
    <div
      id="comparison_tray"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[94vw] sm:max-w-[460px] bg-white rounded-2xl shadow-2xl border border-gray-200/90 p-4 transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in"
      style={{
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 1px 1px rgba(0, 0, 0, 0.05)"
      }}
    >
      {/* Header with Title and Clear Action */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
          <span className="text-xs font-bold text-gray-800">
            Compare Projects ({selectedProjects.length}/{maxLimit})
          </span>
        </div>
        <button
          type="button"
          onClick={clearAllCompare}
          className="text-[11px] font-semibold text-gray-400 hover:text-[#EA580C] transition-colors flex items-center gap-1 cursor-pointer"
          title="Clear all selected projects"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Row of Selected Project Cards */}
      <div className="flex items-start gap-2.5 overflow-x-auto no-scrollbar py-1">
        {selectedProjects.map((project) => {
          const id = project.id || project.slug;
          const image =
            Array.isArray(project.images) && project.images.length > 0
              ? project.images[0]
              : project.image ||
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80";

          const displayName = project.title || project.name || "Project";

          return (
            <div
              key={id}
              className="w-24 sm:w-28 shrink-0 flex flex-col group relative"
            >
              {/* Thumbnail Container */}
              <div className="w-full h-18 sm:h-20 rounded-xl overflow-hidden relative border border-gray-200 bg-gray-100 shadow-2xs">
                <img
                  src={image}
                  alt={displayName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Remove 'X' overlay button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCompare(id);
                  }}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs z-10"
                  title={`Remove ${displayName} from comparison`}
                  aria-label={`Remove ${displayName}`}
                >
                  <X className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>

              {/* Title */}
              <span
                className="text-[11px] font-semibold text-gray-800 truncate mt-1 text-center"
                title={displayName}
              >
                {displayName}
              </span>
            </div>
          );
        })}

        {/* Empty slots placeholders if fewer than maxLimit */}
        {Array.from({ length: Math.max(0, maxLimit - selectedProjects.length) }).map(
          (_, idx) => (
            <div
              key={`empty-${idx}`}
              className="w-24 sm:w-28 shrink-0 flex flex-col items-center justify-center h-18 sm:h-20 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/70 text-gray-400 p-2 text-center"
            >
              <span className="text-[10px] font-medium leading-tight">
                + Add Project
              </span>
            </div>
          )
        )}
      </div>

      {/* Footer bar matching reference screenshot */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
        <span className="text-[11px] sm:text-xs text-gray-500 font-medium">
          Compare upto {maxLimit} projects
        </span>

        <button
          type="button"
          onClick={handleCompareClick}
          className="px-5 py-2 sm:py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#D29324] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>Compare</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
