"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin,
  ExternalLink,
  Activity,
  GraduationCap,
  Trees,
  ShoppingBag,
  Train,
  Compass,
  Building2,
  Home,
  Briefcase,
  Search,
  Layers,
  ArrowRight,
  Sparkles,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";

import {
  getProjectCoordinates,
  getProjectLandmarks,
  getNearbyPropertiesForProject,
} from "@/data/locationMapData";

// Dynamically import Leaflet Map with SSR disabled
const LocationInteractiveMap = dynamic(
  () => import("./LocationInteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] sm:min-h-[460px] rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-[#FBF1DF] border border-[#D29324]/30 flex items-center justify-center text-[#D29324] animate-pulse">
          <MapPin className="w-6 h-6 animate-bounce" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-[#252525]">Loading Interactive Map…</p>
          <p className="text-[10px] text-[#6B7280]">Connecting to OpenStreetMap tiles & verified coordinates</p>
        </div>
      </div>
    ),
  }
);

export default function LocationMapSection({ project }) {
  // Discovery Mode: 'landmarks' (Connectivity & nearby amenities) vs 'properties' (Locate properties & land on map)
  const [activeMode, setActiveMode] = useState("landmarks");

  // Landmark category filter matching user specifications
  const [activeLandmarkCategory, setActiveLandmarkCategory] = useState("All");

  // Property type filter matching user specifications
  const [activePropertyType, setActivePropertyType] = useState("All");

  // Optional text search for properties
  const [propertySearchQuery, setPropertySearchQuery] = useState("");

  // Map layers overlay toggles
  const [showPropertiesOverlay, setShowPropertiesOverlay] = useState(true);
  const [showLandmarksOverlay, setShowLandmarksOverlay] = useState(true);

  // Selected item on map (either landmark or property)
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Fetch verified coordinates, landmarks, and surrounding properties
  const coordinates = useMemo(() => getProjectCoordinates(project), [project]);
  const allLandmarks = useMemo(() => getProjectLandmarks(project), [project]);
  const allProperties = useMemo(() => getNearbyPropertiesForProject(project), [project]);

  // Fallback project details
  const projectTitle = project?.title || "Property";
  const projectLocation = project?.location || `${project?.cityName || "Sanpada"}, India`;
  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${projectTitle}, ${projectLocation}`
  )}`;

  // Category definitions for landmarks
  const landmarkCategories = [
    "All",
    "Hospitals",
    "Schools",
    "Parks",
    "Shopping Centers",
    "Transport",
  ];

  // Property type definitions
  const propertyTypes = [
    { key: "All", label: "All Properties" },
    { key: "apartments", label: "Apartments" },
    { key: "houses", label: "Houses & Villas" },
    { key: "commercial", label: "Commercial" },
    { key: "land", label: "Land & Plots" },
  ];

  // Filtered landmarks based on active category
  const filteredLandmarks = useMemo(() => {
    if (activeLandmarkCategory === "All") return allLandmarks;
    return allLandmarks.filter((lm) => lm.category === activeLandmarkCategory);
  }, [allLandmarks, activeLandmarkCategory]);

  // Filtered properties based on active type & optional search query
  const filteredProperties = useMemo(() => {
    let list = allProperties;
    if (activePropertyType !== "All") {
      list = list.filter((p) => p.propertyTypeKey === activePropertyType);
    }
    if (propertySearchQuery.trim()) {
      const q = propertySearchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          (p.builder && p.builder.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allProperties, activePropertyType, propertySearchQuery]);

  // Category counts for badges
  const landmarkCounts = useMemo(() => {
    const counts = { All: allLandmarks.length };
    landmarkCategories.slice(1).forEach((cat) => {
      counts[cat] = allLandmarks.filter((lm) => lm.category === cat).length;
    });
    return counts;
  }, [allLandmarks, landmarkCategories]);

  const propertyCounts = useMemo(() => {
    const counts = { All: allProperties.length };
    propertyTypes.slice(1).forEach(({ key }) => {
      counts[key] = allProperties.filter((p) => p.propertyTypeKey === key).length;
    });
    return counts;
  }, [allProperties, propertyTypes]);

  // Icon resolver for landmark categories
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Hospitals":
        return <Activity className="w-4 h-4 text-rose-500" />;
      case "Schools":
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case "Parks":
        return <Trees className="w-4 h-4 text-emerald-500" />;
      case "Shopping Centers":
        return <ShoppingBag className="w-4 h-4 text-amber-500" />;
      case "Transport":
      default:
        return <Train className="w-4 h-4 text-indigo-500" />;
    }
  };

  // Icon resolver for property types
  const getPropertyTypeIcon = (typeKey) => {
    switch (typeKey) {
      case "apartments":
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case "houses":
        return <Home className="w-4 h-4 text-purple-600" />;
      case "commercial":
        return <Briefcase className="w-4 h-4 text-indigo-600" />;
      case "land":
        return <Trees className="w-4 h-4 text-emerald-600" />;
      default:
        return <Building2 className="w-4 h-4 text-[#D29324]" />;
    }
  };

  // Click on list item to pan and highlight on map
  const handleSelectLandmark = useCallback((lm) => {
    setSelectedItemId(lm.id);
  }, []);

  const handleSelectProperty = useCallback((prop) => {
    setSelectedItemId(prop.id);
  }, []);

  return (
    <section
      id="location"
      className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E3DA] shadow-sm space-y-6"
    >
      {/* ─────────────────────────────────────────────
          1. Header Row with Title, Google Maps & Mode Switcher
      ───────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#E8E3DA]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Locality & Connectivity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#252525]">
            Location
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5 flex items-center gap-1">
            <span className="font-semibold text-[#252525]">{projectLocation}</span>
            {coordinates && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full font-medium ml-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified GPS Coordinates
              </span>
            )}
          </p>
        </div>

        {/* Right Actions: Mode Switcher & Google Maps link */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Discovery Mode Switcher Tabs */}
          <div className="inline-flex p-1 bg-[#FAF8F4] border border-[#E8E3DA] rounded-2xl shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setActiveMode("landmarks");
                setSelectedItemId(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMode === "landmarks"
                  ? "bg-[#EA580C] text-white shadow-sm"
                  : "text-[#6B7280] hover:text-[#252525]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Nearby Landmarks</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeMode === "landmarks"
                    ? "bg-white/20 text-white"
                    : "bg-[#E8E3DA] text-[#6B7280]"
                }`}
              >
                {allLandmarks.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMode("properties");
                setSelectedItemId(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMode === "properties"
                  ? "bg-[#D29324] text-white shadow-sm"
                  : "text-[#6B7280] hover:text-[#252525]"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Locate Properties on Map</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeMode === "properties"
                    ? "bg-white/20 text-white"
                    : "bg-[#E8E3DA] text-[#6B7280]"
                }`}
              >
                {allProperties.length}
              </span>
            </button>
          </div>

          {/* Open in Google Maps external button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8E3DA] bg-white hover:border-[#D29324] text-xs font-bold text-[#AE7419] transition-all shadow-2xs"
            title="Open project in Google Maps"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          2. Category Filters & Quick Search Sub-Bar
      ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* If Active Mode === "landmarks" -> Category Pills */}
        {activeMode === "landmarks" ? (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {landmarkCategories.map((cat) => {
              const count = landmarkCounts[cat] || 0;
              const isSelected = activeLandmarkCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveLandmarkCategory(cat);
                    setSelectedItemId(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#EA580C] text-white shadow-md scale-105"
                      : "bg-[#FAF8F4] text-[#6B7280] hover:text-[#252525] border border-[#E8E3DA]"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white font-extrabold"
                        : "bg-[#E8E3DA]/80 text-[#6B7280]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          /* If Active Mode === "properties" -> Property Type Pills & Search */
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {propertyTypes.map(({ key, label }) => {
                const count = propertyCounts[key] || 0;
                const isSelected = activePropertyType === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActivePropertyType(key);
                      setSelectedItemId(null);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#D29324] text-white shadow-md scale-105"
                        : "bg-[#FAF8F4] text-[#6B7280] hover:text-[#252525] border border-[#E8E3DA]"
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-white/20 text-white font-extrabold"
                          : "bg-[#E8E3DA]/80 text-[#6B7280]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[200px] flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search name or locality…"
                value={propertySearchQuery}
                onChange={(e) => setPropertySearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] outline-none focus:border-[#D29324] transition-all"
              />
            </div>
          </div>
        )}

        {/* Quick CTA to switch modes */}
        <div className="shrink-0 flex items-center gap-3">
          {activeMode === "landmarks" ? (
            <button
              type="button"
              onClick={() => setActiveMode("properties")}
              className="text-xs font-bold text-[#AE7419] hover:text-[#D29324] inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore {allProperties.length} Nearby Properties & Plots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveMode("landmarks")}
              className="text-xs font-bold text-[#EA580C] hover:text-[#c2410c] inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View Locality Connectivity & Landmarks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          3. Main Map & Information Split View
      ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Interactive OpenStreetMap with Leaflet (60% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col space-y-2">
          {coordinates ? (
            <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-[#E8E3DA] shadow-inner">
              <LocationInteractiveMap
                project={project}
                center={coordinates}
                activeMode={activeMode}
                landmarks={filteredLandmarks}
                properties={filteredProperties}
                selectedItemId={selectedItemId}
                onSelectItem={(item) => setSelectedItemId(item.id)}
                showPropertiesOverlay={showPropertiesOverlay}
                showLandmarksOverlay={showLandmarksOverlay}
                className="h-full"
              />
            </div>
          ) : (
            /* Fallback Card when coordinates are not yet verified */
            <div className="flex-1 min-h-[380px] sm:min-h-[440px] rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="max-w-md space-y-1">
                <h4 className="text-base font-bold text-[#252525]">
                  GPS Coordinates Under Verification
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Accurate latitude and longitude coordinates are currently being verified for{" "}
                  <span className="font-semibold text-[#252525]">{projectTitle}</span> under official RERA registry records.
                </p>
                <div className="pt-2 text-xs font-medium text-[#252525]">
                  Verified Address: {project.fullAddress || projectLocation}
                </div>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Locate on Google Maps</span>
              </a>
            </div>
          )}

          {/* Interactive Legend / Notice below map */}
          <div className="flex items-center justify-between text-[11px] text-[#6B7280] px-1 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]"></span>
                <span className="font-semibold text-[#252525]">Current Project</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>Apartments</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Land / Plots</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                <span>Villas</span>
              </span>
            </div>
            <span className="italic">
              * Click any marker to view details & directions
            </span>
          </div>
        </div>

        {/* Right: Scrollable Nearby Landmarks or Available Properties (40% width on desktop) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] overflow-hidden">
          {/* Panel Header */}
          <div className="p-4 bg-white border-b border-[#E8E3DA] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#252525] block">
                {activeMode === "landmarks"
                  ? `Nearby Landmarks (${filteredLandmarks.length})`
                  : `Properties & Land Listings (${filteredProperties.length})`}
              </span>
              <span className="text-[10px] text-[#6B7280]">
                {activeMode === "landmarks"
                  ? `Showing ${activeLandmarkCategory} category amenities`
                  : `Discovered in ${projectLocation.split(",")[0].trim()} corridor`}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                activeMode === "landmarks"
                  ? "bg-amber-100/70 text-[#AE7419]"
                  : "bg-blue-100/70 text-blue-700"
              }`}
            >
              {activeMode === "landmarks" ? activeLandmarkCategory : activePropertyType}
            </span>
          </div>

          {/* Panel Scrollable Content */}
          <div className="flex-1 overflow-y-auto max-h-[440px] divide-y divide-[#E8E3DA] p-2 space-y-1">
            {/* 1. Landmarks List */}
            {activeMode === "landmarks" && (
              <>
                {filteredLandmarks.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#6B7280] space-y-2">
                    <p>No landmarks found in this category.</p>
                    <button
                      type="button"
                      onClick={() => setActiveLandmarkCategory("All")}
                      className="text-[#D29324] font-bold hover:underline"
                    >
                      Show All Categories
                    </button>
                  </div>
                ) : (
                  filteredLandmarks.map((pl) => {
                    const isSelected = selectedItemId === pl.id;
                    return (
                      <div
                        key={pl.id}
                        onClick={() => handleSelectLandmark(pl)}
                        className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-amber-100/70 border border-[#D29324] shadow-xs"
                            : "bg-white hover:bg-amber-50/40 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-center shrink-0">
                            {getCategoryIcon(pl.category)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#252525] truncate">
                              {pl.name}
                            </h4>
                            <span className="text-[10px] text-[#6B7280] block truncate">
                              {pl.type}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 justify-end text-xs font-black text-[#AE7419]">
                            <span>{pl.distance}</span>
                            <Compass className="w-3 h-3 text-[#D29324]" />
                          </div>
                          <div className="flex items-center gap-1.5 justify-end mt-0.5">
                            <span className="text-[10px] text-[#6B7280]">{pl.time}</span>
                            <span className="text-[#E8E3DA]">·</span>
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(
                                `${pl.name}, ${projectLocation}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] text-[#D29324] hover:underline font-semibold"
                            >
                              Directions →
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </>
            )}

            {/* 2. Available Properties & Land Listings */}
            {activeMode === "properties" && (
              <>
                {filteredProperties.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#6B7280] space-y-2">
                    <p>No properties match the selected filter.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePropertyType("All");
                        setPropertySearchQuery("");
                      }}
                      className="text-[#D29324] font-bold hover:underline"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredProperties.map((prop) => {
                    const isSelected = selectedItemId === prop.id;
                    return (
                      <div
                        key={prop.id}
                        onClick={() => handleSelectProperty(prop)}
                        className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col gap-2.5 ${
                          isSelected
                            ? "bg-amber-100/70 border border-[#D29324] shadow-xs"
                            : "bg-white hover:bg-amber-50/40 border border-[#E8E3DA]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-[#E8E3DA] shrink-0">
                            <img
                              src={prop.image}
                              alt={prop.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#FAF8F4] border border-[#E8E3DA] text-[#AE7419]">
                                {prop.propertyType}
                              </span>
                              {prop.isCurrentProject && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#EA580C] text-white">
                                  Current Project
                                </span>
                              )}
                              {prop.isLand && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                                  Land / Plot
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-black text-[#252525] truncate mt-1">
                              {prop.title}
                            </h4>
                            <p className="text-[10px] text-[#6B7280] truncate">
                              {prop.locality}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[9px] text-[#6B7280] block">Starting</span>
                            <span className="text-xs font-black text-[#EA580C]">
                              {prop.price}
                            </span>
                          </div>
                        </div>

                        {/* Card Footer: Specs & CTAs */}
                        <div className="flex items-center justify-between pt-1.5 border-t border-[#E8E3DA]/60 text-xs">
                          <span className="text-[10px] text-[#6B7280]">
                            {prop.specs || prop.builder}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectProperty(prop);
                              }}
                              className="text-[10px] font-bold text-[#AE7419] hover:underline"
                            >
                              View on Map
                            </button>
                            <Link
                              href={`/projects/${prop.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="px-2.5 py-1 rounded-md bg-[#EA580C] hover:bg-[#c2410c] text-white text-[10px] font-bold transition-all shadow-2xs"
                            >
                              Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
