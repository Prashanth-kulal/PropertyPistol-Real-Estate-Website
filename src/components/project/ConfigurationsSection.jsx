"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Maximize2,
  PhoneCall,
  Calendar,
  X,
  Scan,
  Building2,
  Layers,
  Map,
  Compass,
  CheckCircle2
} from "lucide-react";
import { getProjectConfigurations, cacheProjectManifest } from "@/data/configurations";

/**
 * Format price string to match the reference style: "INR 4.89 Cr" or "INR 53.91 Lacs"
 */
function formatPriceDisplay(priceStr) {
  if (!priceStr || priceStr === "On Request" || priceStr === "Price on Request") {
    return "On Request";
  }
  const clean = String(priceStr).replace(/^₹\s*/, "").trim();
  if (clean.toLowerCase().startsWith("inr")) {
    return clean;
  }
  return `INR ${clean}`;
}

/**
 * Format area display: "1000 Sq.ft."
 */
function formatAreaDisplay(areaVal) {
  if (!areaVal || areaVal === "On Request") {
    return "On Request";
  }
  const str = String(areaVal).trim();
  if (/sq\.?ft/i.test(str)) {
    return str.replace(/sq\.?ft\.?/i, "Sq.ft.");
  }
  return `${str} Sq.ft.`;
}

export default function ConfigurationsSection({ project, onOpenEnquiry, onScheduleVisit }) {
  // Load initial genuine project configurations from centralized data layer
  const initialData = useMemo(() => {
    return getProjectConfigurations(project);
  }, [project]);

  const [configData, setConfigData] = useState(initialData);

  // Synchronize state if project prop changes
  useEffect(() => {
    setConfigData(getProjectConfigurations(project));
  }, [project]);

  // Client-side hydration from per-project manifest.json
  useEffect(() => {
    const pid = project?.id || project?.sourceId;
    if (!pid) return;

    if (configData?.verificationStatus === "VERIFIED" && configData?.projectId === Number(pid)) {
      return;
    }

    fetch(`/projects/${pid}/configurations/manifest.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((manifest) => {
        if (manifest && manifest.unitPlans && manifest.unitPlans.length > 0) {
          cacheProjectManifest(manifest);
          setConfigData(manifest);
        }
      })
      .catch(() => {});
  }, [project?.id, project?.sourceId, configData?.verificationStatus, configData?.projectId]);

  // Determine available genuine plan types (Unit Plans | Master Plan | Site Plan)
  const availablePlanTypes = useMemo(() => {
    if (!configData) return ["unit"];
    const types = [];
    if (configData.unitPlans && configData.unitPlans.length > 0) types.push("unit");
    if (configData.masterPlans && configData.masterPlans.length > 0) types.push("master");
    if (configData.sitePlans && configData.sitePlans.length > 0) types.push("site");
    return types.length > 0 ? types : ["unit"];
  }, [configData]);

  const [activePlanType, setActivePlanType] = useState(availablePlanTypes[0] || "unit");
  const [activeBhkIndex, setActiveBhkIndex] = useState(0);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [viewMode, setViewMode] = useState("2D"); // '2D' or '3D'
  const [lightboxUrl, setLightboxUrl] = useState(null);

  // Synchronize active plan type if available types change
  useEffect(() => {
    if (!availablePlanTypes.includes(activePlanType)) {
      setActivePlanType(availablePlanTypes[0] || "unit");
    }
  }, [availablePlanTypes, activePlanType]);

  // Reset variant index when BHK index changes
  useEffect(() => {
    setActiveVariantIndex(0);
  }, [activeBhkIndex]);

  // Active BHK group
  const activeBhkGroup = configData?.unitPlans?.[activeBhkIndex] || null;
  // Active area variant
  const activeVariant =
    activeBhkGroup?.variants?.[activeVariantIndex] || activeBhkGroup?.variants?.[0] || null;

  // Determine available 2D / 3D images for the selected variant
  const has2D = Boolean(activeVariant?.plan2D || activeVariant?.twoDOriginalUrl);
  const has3D = Boolean(activeVariant?.plan3D || activeVariant?.threeDOriginalUrl);

  // Sync viewMode preference
  useEffect(() => {
    if (has2D) {
      setViewMode("2D");
    } else if (has3D) {
      setViewMode("3D");
    } else {
      setViewMode("2D");
    }
  }, [activeVariant, has2D, has3D]);

  // Active displayed image for unit plan
  const unitPlanImage = useMemo(() => {
    if (!activeVariant) return null;
    if (viewMode === "2D" && (activeVariant.plan2D || activeVariant.twoDOriginalUrl)) {
      return activeVariant.plan2D || activeVariant.twoDOriginalUrl;
    }
    if (viewMode === "3D" && (activeVariant.plan3D || activeVariant.threeDOriginalUrl)) {
      return activeVariant.plan3D || activeVariant.threeDOriginalUrl;
    }
    return null;
  }, [activeVariant, viewMode]);

  // Active master plan image
  const [activeMasterPlanIdx, setActiveMasterPlanIdx] = useState(0);
  const currentMasterPlan =
    configData?.masterPlans?.[activeMasterPlanIdx] || configData?.masterPlans?.[0] || null;

  // Active site plan image
  const [activeSitePlanIdx, setActiveSitePlanIdx] = useState(0);
  const currentSitePlan =
    configData?.sitePlans?.[activeSitePlanIdx] || configData?.sitePlans?.[0] || null;

  // Escape key listener for lightbox modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setLightboxUrl(null);
    };
    if (lightboxUrl) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxUrl]);

  return (
    <section id="configurations" className="scroll-mt-32 space-y-4">
      {/* 1. Header with Title & Genuine Plan Tabs */}
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
          Configurations
        </h2>

        {/* Dynamic Plan Categories (Unit Plans | Master Plan | Site Plan) */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActivePlanType("unit")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activePlanType === "unit"
                ? "border-2 border-[#EA580C] text-[#252525] bg-white shadow-2xs"
                : "border border-gray-200 text-gray-600 hover:text-gray-900 bg-white"
            }`}
          >
            Unit Plans
          </button>

          {availablePlanTypes.includes("master") && (
            <button
              type="button"
              onClick={() => setActivePlanType("master")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activePlanType === "master"
                  ? "border-2 border-[#EA580C] text-[#252525] bg-white shadow-2xs"
                  : "border border-gray-200 text-gray-600 hover:text-gray-900 bg-white"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              Master Plan
            </button>
          )}

          {availablePlanTypes.includes("site") && (
            <button
              type="button"
              onClick={() => setActivePlanType("site")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activePlanType === "site"
                  ? "border-2 border-[#EA580C] text-[#252525] bg-white shadow-2xs"
                  : "border border-gray-200 text-gray-600 hover:text-gray-900 bg-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Site Plan
            </button>
          )}
        </div>
      </div>

      {/* 2. UNIT PLANS MAIN CARD */}
      {activePlanType === "unit" && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
          {/* Top of Card: Boxed BHK buttons & Area selectors */}
          <div className="p-6 pb-0">
            {/* Boxed BHK Button(s) */}
            {configData?.unitPlans && configData.unitPlans.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
                {configData.unitPlans.map((grp, idx) => {
                  const isActive = activeBhkIndex === idx;
                  return (
                    <button
                      key={grp.bhk || idx}
                      type="button"
                      onClick={() => setActiveBhkIndex(idx)}
                      className={`px-6 py-2.5 rounded-sm text-sm font-bold transition-all cursor-pointer border ${
                        isActive
                          ? "border-gray-300 border-b-2 border-b-[#EA580C] bg-white text-[#252525] shadow-2xs"
                          : "border-gray-200 text-gray-500 hover:text-gray-900 bg-gray-50/60"
                      }`}
                    >
                      {grp.bhk}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Area Size Selector (under selected BHK) */}
            {activeBhkGroup?.variants && activeBhkGroup.variants.length > 0 && (
              <div className="flex items-center gap-8 overflow-x-auto pt-2 pb-0 scrollbar-none">
                {activeBhkGroup.variants.map((v, vIdx) => {
                  const label = formatAreaDisplay(v.carpetArea || v.carpetAreaDisplay || `Variant ${vIdx + 1}`);
                  const isActive = activeVariantIndex === vIdx;
                  return (
                    <button
                      key={v.id || vIdx}
                      type="button"
                      onClick={() => setActiveVariantIndex(vIdx)}
                      className={`text-sm font-bold transition-all relative pb-2.5 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "text-[#252525] border-b-2 border-[#EA580C]"
                          : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Full-width Divider Line */}
          <div className="border-b border-gray-200 w-full" />

          {/* Two-Column Layout (Left Specs | Right Plan Image with 2D/3D toggle) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* LEFT COLUMN: 2x2 Specifications Grid */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                {/* Price */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <span className="font-semibold text-gray-400">₹</span> Price:
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#252525] mt-1.5 tracking-tight">
                    {formatPriceDisplay(activeVariant?.price || project?.price)}
                  </div>
                </div>

                {/* Builtup Area */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Scan className="w-3.5 h-3.5 text-gray-400" /> Builtup Area:
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#252525] mt-1.5 tracking-tight">
                    {formatAreaDisplay(activeVariant?.builtUpArea || project?.builtUpArea || "On Request")}
                  </div>
                </div>

                {/* Carpet Area */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Scan className="w-3.5 h-3.5 text-gray-400" /> Carpet Area:
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#252525] mt-1.5 tracking-tight">
                    {formatAreaDisplay(activeVariant?.carpetArea || project?.carpetArea || "On Request")}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" /> Property Type:
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#252525] mt-1.5 tracking-tight">
                    {activeVariant?.propertyType || project?.type || "Apartment"}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Plan Image Container with 2D / 3D pill toggle */}
            <div className="p-6 md:p-8 relative flex flex-col items-center justify-center min-h-[320px]">
              {/* 2D / 3D Pill Toggle positioned in UPPER RIGHT corner */}
              <div className="absolute top-4 right-4 z-10">
                <div className="inline-flex rounded-full border border-gray-300 bg-white p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewMode("2D")}
                    disabled={!has2D && !has3D}
                    className={`px-3.5 py-1 rounded-l-full text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "2D"
                        ? "bg-[#EA580C] text-white shadow-2xs"
                        : "text-gray-400 hover:text-gray-700 bg-transparent"
                    }`}
                  >
                    2D
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("3D")}
                    disabled={!has3D}
                    className={`px-3.5 py-1 rounded-r-full text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "3D"
                        ? "bg-[#EA580C] text-white shadow-2xs"
                        : has3D
                        ? "text-gray-400 hover:text-gray-700 bg-transparent"
                        : "text-gray-300 cursor-not-allowed bg-transparent"
                    }`}
                  >
                    3D
                  </button>
                </div>
              </div>

              {/* Plan Visualization or Request Placeholder */}
              {unitPlanImage ? (
                <div className="w-full flex flex-col items-center justify-center group">
                  <div className="relative max-h-72 w-full flex items-center justify-center p-2">
                    <img
                      src={unitPlanImage}
                      alt={`${activeBhkGroup?.bhk || "Unit Plan"} ${activeVariant?.carpetArea ? `${activeVariant.carpetArea} sq.ft` : ""}`}
                      className="max-h-64 max-w-full object-contain transition-transform duration-300 group-hover:scale-102"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => setLightboxUrl(unitPlanImage)}
                      className="absolute bottom-2 right-2 px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-800 border border-gray-200 text-xs font-bold backdrop-blur-sm flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                      title="Enlarge blueprint"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#EA580C]" />
                      <span className="hidden sm:inline">Enlarge</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* REQUEST FOR PLAN IMAGE PLACEHOLDER WITH DIAGONAL CORNER RIBBONS */
                <div
                  onClick={onOpenEnquiry}
                  className="flex flex-col items-center justify-center cursor-pointer group mt-4 sm:mt-0"
                >
                  <div className="relative w-64 sm:w-72 h-44 rounded-xl overflow-hidden border border-gray-100 bg-[#F9FAFB] shadow-xs flex items-center justify-center transition-all group-hover:border-orange-200 group-hover:shadow-sm">
                    {/* Top-Left Diagonal Ribbon with "REQUEST" */}
                    <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden pointer-events-none z-10">
                      <div className="absolute top-4 -left-7 w-28 -rotate-45 bg-[#EA580C] text-white text-[9px] font-black uppercase tracking-wider py-0.5 text-center shadow-xs">
                        REQUEST
                      </div>
                    </div>

                    {/* Bottom-Right Diagonal Ribbon */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden pointer-events-none z-10">
                      <div className="absolute bottom-4 -right-7 w-28 -rotate-45 bg-[#EA580C] py-1 shadow-xs" />
                    </div>

                    {/* Faded Blueprint Schematic Illustration */}
                    <div className="w-full h-full p-4 flex items-center justify-center opacity-40 group-hover:opacity-55 transition-opacity">
                      <svg
                        viewBox="0 0 200 130"
                        className="w-full h-full stroke-gray-400 fill-none"
                        strokeWidth="1.5"
                      >
                        {/* Outer walls */}
                        <rect x="10" y="10" width="180" height="110" rx="3" />
                        {/* Living Room */}
                        <rect x="10" y="10" width="100" height="70" />
                        {/* Kitchen */}
                        <rect x="110" y="10" width="80" height="45" />
                        {/* Bedroom 1 */}
                        <rect x="10" y="80" width="90" height="40" />
                        {/* Bedroom 2 */}
                        <rect x="100" y="55" width="90" height="65" />
                        {/* Door arcs & internal markers */}
                        <path d="M 60 80 Q 70 70 80 80" strokeDasharray="2,2" />
                        <path d="M 140 55 Q 150 45 160 55" strokeDasharray="2,2" />
                        <line x1="25" y1="20" x2="45" y2="20" strokeWidth="2" stroke="#9CA3AF" />
                        <line x1="125" y1="20" x2="145" y2="20" strokeWidth="2" stroke="#9CA3AF" />
                      </svg>
                    </div>
                  </div>

                  {/* Caption underneath placeholder */}
                  <span className="mt-3 text-xs font-semibold tracking-wider text-gray-400 group-hover:text-[#EA580C] transition-colors uppercase">
                    REQUEST FOR PLAN IMAGE
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. MASTER PLAN CONTENT */}
      {activePlanType === "master" && configData?.masterPlans?.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#252525]">
              Master Architectural Plan
            </span>
            {configData.masterPlans.length > 1 && (
              <div className="flex items-center gap-2">
                {configData.masterPlans.map((mp, idx) => (
                  <button
                    key={mp.id || idx}
                    type="button"
                    onClick={() => setActiveMasterPlanIdx(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      activeMasterPlanIdx === idx
                        ? "bg-[#EA580C] text-white border-[#EA580C]"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    Plan {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 p-4 flex items-center justify-center group">
            <img
              src={currentMasterPlan?.path || currentMasterPlan?.originalUrl}
              alt={`${project?.name || "Project"} Master Plan`}
              className="max-h-[460px] w-full object-contain rounded-lg"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => setLightboxUrl(currentMasterPlan?.path || currentMasterPlan?.originalUrl)}
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-gray-800 border border-gray-200 text-xs font-bold backdrop-blur-sm flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#EA580C]" />
              Full View
            </button>
          </div>
        </div>
      )}

      {/* 4. SITE / LAYOUT PLAN CONTENT */}
      {activePlanType === "site" && configData?.sitePlans?.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#252525]">
              Site & Tower Layout Plan
            </span>
            {configData.sitePlans.length > 1 && (
              <div className="flex items-center gap-2">
                {configData.sitePlans.map((sp, idx) => (
                  <button
                    key={sp.id || idx}
                    type="button"
                    onClick={() => setActiveSitePlanIdx(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                      activeSitePlanIdx === idx
                        ? "bg-[#EA580C] text-white border-[#EA580C]"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    Layout {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 p-4 flex items-center justify-center group">
            <img
              src={currentSitePlan?.path || currentSitePlan?.originalUrl}
              alt={`${project?.name || "Project"} Site Plan`}
              className="max-h-[460px] w-full object-contain rounded-lg"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => setLightboxUrl(currentSitePlan?.path || currentSitePlan?.originalUrl)}
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-gray-800 border border-gray-200 text-xs font-bold backdrop-blur-sm flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#EA580C]" />
              Full View
            </button>
          </div>
        </div>
      )}

      {/* 5. LIGHTBOX MODAL */}
      {lightboxUrl && (
        <div className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLightboxUrl(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors shadow-lg z-20"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxUrl}
            alt="Floor Plan Full View"
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
