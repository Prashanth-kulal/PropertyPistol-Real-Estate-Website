"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Train,
  MapPin,
  ArrowRight,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Car
} from "lucide-react";
import {
  MUMBAI_RAIL_PATHS,
  MUMBAI_STATIONS,
  TRANSIT_LINES
} from "@/data/mumbaiTransitData";

export default function RailNetworkMap({ cityId = "mumbai", onOpenCommuteModal }) {
  const router = useRouter();

  // Map viewport transformation state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Filter & Selection State
  const [selectedLine, setSelectedLine] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const containerRef = useRef(null);
  const svgRef = useRef(null);

  // Filtered station suggestions for search autocomplete
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return MUMBAI_STATIONS.filter(
      (s) => s.name.toLowerCase().includes(q) || s.line.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery]);

  // Center on a station when selected
  const handleSelectStation = (station) => {
    setSelectedStation(station);
    setShowSearchDropdown(false);
    setSearchQuery(station.name);

    // Calculate pan to bring station to center (SVG viewBox is 1320x1002)
    const targetScale = Math.max(scale, 1.4);
    setScale(targetScale);
    const targetX = 660 - station.position.x * targetScale;
    const targetY = 500 - station.position.y * targetScale;
    setPan({ x: targetX, y: targetY });
  };

  // Zoom controls
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev * 1.25, 3.2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev / 1.25, 0.75));
  };

  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setSelectedStation(null);
    setSearchQuery("");
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left-click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag support for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.75), 3.2));
  };

  return (
    <div className="space-y-4">
      {/* Search Header & Transit Line Toggles */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E3DA] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Autocomplete Station Search */}
          <div className="relative flex-1 max-w-lg">
            <div className="flex items-center gap-2 bg-[#FAF8F4] border border-[#E8E3DA] rounded-2xl px-4 py-2.5 focus-within:border-[#D29324] focus-within:ring-2 focus-within:ring-[#D29324]/20 transition-all">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search Railway or Metro Station (e.g. Dadar, Bandra, Thane)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full text-xs sm:text-sm font-semibold text-[#252525] bg-transparent focus:outline-hidden placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStation(null);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E8E3DA] shadow-2xl p-2 z-50 space-y-1 animate-in fade-in duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Matching Transit Stations
                </div>
                {searchResults.map((st) => (
                  <button
                    key={st.uuid || st.id}
                    type="button"
                    onClick={() => handleSelectStation(st)}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FAF8F4] flex items-center justify-between text-xs transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
                        <Train className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors">
                          {st.name}
                        </div>
                        <div className="text-[10px] text-[#6B7280]">{st.line}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-[#D29324] block">
                        {st.newProjectsCount} Projects
                      </span>
                      <span className="text-[9px] text-[#6B7280]">{st.avgPrice}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            {onOpenCommuteModal && (
              <button
                type="button"
                onClick={onOpenCommuteModal}
                className="px-4 py-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] text-xs font-bold text-[#252525] hover:text-[#AE7419] transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <Car className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Search by Commute Time</span>
              </button>
            )}
          </div>
        </div>

        {/* Transit Line Legend & Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#E8E3DA]">
          <span className="text-[11px] font-bold text-[#6B7280] whitespace-nowrap mr-1">
            Filter Lines:
          </span>
          {TRANSIT_LINES.map((line) => {
            const isSelected = selectedLine === line.id;
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => setSelectedLine(line.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#252525] text-white shadow-xs"
                    : "bg-[#FAF8F4] border border-[#E8E3DA] text-[#6B7280] hover:text-[#252525]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: line.color }}
                />
                <span>{line.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Map Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] bg-[#F7F9FC] rounded-3xl border-2 border-[#D4E1F4] overflow-hidden shadow-md select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {/* Floating Pan & Zoom Controls */}
        <div className="absolute top-5 right-5 z-20 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8E3DA] shadow-lg overflow-hidden divide-y divide-gray-100">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#D29324] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#D29324] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-[#D29324] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
            title="Reset Map View"
            aria-label="Reset Map"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="px-2 py-1 text-[9px] font-extrabold text-[#6B7280] bg-gray-50 text-center">
            {Math.round(scale * 100)}%
          </div>
        </div>

        {/* Floating Station Card (PropertyPistol RailNetworkCard) */}
        {selectedStation && (
          <div className="absolute top-5 left-5 z-20 max-w-sm w-full bg-white rounded-3xl border border-[#E8E3DA] shadow-2xl p-5 space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-md inline-block uppercase tracking-wider">
                  {selectedStation.line}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#252525]">
                  {selectedStation.name} Railway Station
                </h3>
                <p className="text-[11px] text-[#6B7280]">
                  Prime Suburban Transit Node &bull; Mumbai Rail Network
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStation(null)}
                className="w-7 h-7 rounded-full bg-[#FAF8F4] hover:bg-[#FBF1DF] text-gray-500 hover:text-[#AE7419] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-2 border-t border-[#E8E3DA] grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-[#6B7280] block">Avg Price per sq.ft</span>
                <span className="font-extrabold text-[#252525] text-sm">{selectedStation.avgPrice}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B7280] block">Verified Projects</span>
                <span className="font-extrabold text-[#D29324] text-sm">
                  {selectedStation.newProjectsCount} New Projects
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/${cityId}?search=${encodeURIComponent(selectedStation.name)}`}
                className="w-full py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore Properties Near {selectedStation.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Map Instructions / Hint Badge */}
        <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E8E3DA] shadow-xs text-[11px] font-semibold text-[#252525]">
            <Sparkles className="w-3 h-3 text-[#D29324]" />
            <span>Click any station or drag to pan around the Mumbai rail map</span>
          </div>
        </div>

        {/* SVG Transit Canvas */}
        <svg
          ref={svgRef}
          viewBox="0 0 1320 1002"
          className="w-full h-full transition-transform duration-75"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "center center"
          }}
        >
          {/* Subtle Map Grid lines for geographic feel */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1320" height="1002" fill="url(#grid)" opacity="0.4" />

          {/* Real Transit Vector Paths */}
          <g className="transit-lines">
            {MUMBAI_RAIL_PATHS.map((p, idx) => {
              let pathColor = p.stroke || "#373F44";

              // Dim unselected lines when filtering
              let opacity = 0.95;
              if (selectedLine !== "all") {
                if (
                  selectedLine === "western" &&
                  pathColor !== "#F5821F" &&
                  pathColor !== "#FC8EAC"
                ) {
                  opacity = 0.25;
                } else if (
                  selectedLine === "central" &&
                  pathColor !== "#FDB813" &&
                  pathColor !== "#373F44"
                ) {
                  opacity = 0.25;
                } else if (
                  selectedLine === "harbour" &&
                  pathColor !== "#00A3E0" &&
                  pathColor !== "#4682B4"
                ) {
                  opacity = 0.25;
                } else if (
                  selectedLine === "trans-harbour" &&
                  pathColor !== "#00A651"
                ) {
                  opacity = 0.25;
                }
              }

              return (
                <path
                  key={idx}
                  d={p.d}
                  stroke={pathColor}
                  strokeWidth={p.strokeWidth || "4"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity={opacity}
                  className="transition-opacity duration-300"
                />
              );
            })}
          </g>

          {/* Real Stations & Junction Pins */}
          <g className="transit-stations">
            {MUMBAI_STATIONS.map((st) => {
              const isSelected = selectedStation?.id === st.id;
              const isLineMatch =
                selectedLine === "all" || st.lineKey === selectedLine;

              const stationFill = isSelected
                ? "#D29324"
                : isLineMatch
                ? "#252525"
                : "#94A3B8";

              const textFill = isSelected
                ? "#AE7419"
                : isLineMatch
                ? "#252525"
                : "#94A3B8";

              const stationOpacity = isLineMatch ? 1 : 0.4;

              return (
                <g
                  key={st.uuid || st.id}
                  id={st.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectStation(st);
                  }}
                  className="cursor-pointer group station-node"
                  opacity={stationOpacity}
                >
                  {/* Active Pulse Ring */}
                  {isSelected && (
                    <circle
                      cx={st.position.x}
                      cy={st.position.y}
                      r="10"
                      fill="none"
                      stroke="#D29324"
                      strokeWidth="2"
                      opacity="0.8"
                    />
                  )}

                  {/* Station Shape */}
                  {st.type === "junction" ? (
                    <rect
                      x={st.position.x - (st.width || 18) / 2}
                      y={st.position.y - (st.height || 8) / 2}
                      width={st.width || 18}
                      height={st.height || 8}
                      rx="2.5"
                      fill={stationFill}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="group-hover:fill-[#D29324] transition-colors"
                    />
                  ) : st.type === "main_station" ? (
                    <circle
                      cx={st.position.x}
                      cy={st.position.y}
                      r="5.5"
                      fill={stationFill}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="group-hover:fill-[#D29324] transition-colors"
                    />
                  ) : (
                    <circle
                      cx={st.position.x}
                      cy={st.position.y}
                      r="3.8"
                      fill={stationFill}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      className="group-hover:fill-[#D29324] transition-colors"
                    />
                  )}

                  {/* Station Label */}
                  {st.text_position && (
                    <text
                      x={st.text_position.x}
                      y={st.text_position.y}
                      fill={textFill}
                      fontSize="7.5"
                      fontWeight={isSelected || st.type === "main_station" ? "700" : "500"}
                      className="group-hover:fill-[#AE7419] group-hover:font-bold transition-all pointer-events-none"
                    >
                      {st.name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Honest Transparency Note */}
      <div className="flex items-center justify-between text-xs text-[#6B7280] px-2">
        <span>
          Transit alignments mapped to the official Mumbai Suburban Railway Network &amp; Metro corridors.
        </span>
        <span className="text-[11px] text-gray-400">
          Illustrative market rates &bull; 0% Brokerage with AuraLiving
        </span>
      </div>
    </div>
  );
}
