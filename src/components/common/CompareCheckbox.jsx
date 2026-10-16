"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { useComparison } from "@/context/ComparisonContext";
import { getProjectSlug } from "@/data/projectsData";

export default function CompareCheckbox({
  project,
  className = "",
  size = "md"
}) {
  const { isCompared, toggleCompare } = useComparison();
  const [isAnimating, setIsAnimating] = useState(false);

  if (!project) return null;

  const targetId = project.id || project.slug || getProjectSlug(project);
  const checked = isCompared(targetId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleCompare(project);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: "w-5 h-5 rounded-[4px]",
    md: "w-6 h-6 rounded-[5px]",
    lg: "w-7 h-7 rounded-md"
  }[size] || "w-6 h-6 rounded-[5px]";

  const iconSizes = {
    sm: "w-3 h-3 stroke-[3]",
    md: "w-3.5 h-3.5 stroke-[3]",
    lg: "w-4 h-4 stroke-[3]"
  }[size] || "w-3.5 h-3.5 stroke-[3]";

  return (
    <button
      type="button"
      onClick={handleClick}
      title={checked ? "Remove from comparison" : "Add to comparison"}
      aria-label={checked ? "Remove from comparison" : "Add to comparison"}
      aria-checked={checked}
      role="checkbox"
      className={`relative inline-flex items-center justify-center transition-all cursor-pointer shadow-xs ${sizeClasses} ${
        checked
          ? "bg-[#EA580C] border-2 border-[#EA580C] text-white shadow-md scale-100"
          : "bg-black/35 hover:bg-black/55 border-2 border-white/90 text-transparent hover:border-white backdrop-blur-[2px]"
      } ${isAnimating ? "scale-90" : "active:scale-90"} ${className}`}
    >
      <Check
        className={`${iconSizes} transition-opacity duration-150 ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}
