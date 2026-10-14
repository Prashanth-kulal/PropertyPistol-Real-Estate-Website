"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Car,
  Train,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Check,
  Building,
  Navigation,
  Sliders,
  AlertCircle
} from "lucide-react";
import { getCommuteHubsForCity } from "@/data/cityData";

export default function CommuteTimeModal({ isOpen, onClose, cityId = "mumbai" }) {
  const router = useRouter();
  const hubs = useMemo(() => getCommuteHubsForCity(cityId), [cityId]);

  const [selectedHubId, setSelectedHubId] = useState(hubs[0]?.id || "bkc");
  const [maxTime, setMaxTime] = useState(30);
  const [selectedMode, setSelectedMode] = useState("all");

  // Keep selected hub updated if city changes
  useEffect(() => {
    if (hubs.length > 0 && !hubs.some((h) => h.id === selectedHubId)) {
      setSelectedHubId(hubs[0].id);
    }
  }, [hubs, selectedHubId]);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const currentHub = useMemo(() => {
    return hubs.find((h) => h.id === selectedHubId) || hubs[0];
  }, [hubs, selectedHubId]);

  const filteredDestinations = useMemo(() => {
    if (!currentHub?.popularDestinations) return [];
    return currentHub.popularDestinations.filter((d) => {
      const matchTime = d.timeMins <= maxTime;
      const matchMode =
        selectedMode === "all" ||
        (selectedMode === "train" &&
          (d.mode.toLowerCase().includes("train") ||
            d.mode.toLowerCase().includes("metro") ||
            d.mode.toLowerCase().includes("local"))) ||
        (selectedMode === "car" &&
          (d.mode.toLowerCase().includes("car") ||
            d.mode.toLowerCase().includes("freeway") ||
            d.mode.toLowerCase().includes("highway") ||
            d.mode.toLowerCase().includes("expressway") ||
            d.mode.toLowerCase().includes("taxi")));
      return matchTime && matchMode;
    });
  }, [currentHub, maxTime, selectedMode]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full border border-[#E8E3DA] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="commute-modal-title"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#252525] via-[#2d2d2d] to-[#1f1f1f] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D29324] text-white flex items-center justify-center shadow-lg shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FFE2A7]">
                <Sparkles className="w-3 h-3 text-[#D29324]" />
                <span>Transit &amp; Distance Engine</span>
              </div>
              <h2 id="commute-modal-title" className="text-lg sm:text-xl font-black text-white tracking-tight">
                Search by Commute Time
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Step 1: Destination Workplace Hub */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#252525] flex items-center gap-1.5">
                <span className="w-4.5 h-4.5 rounded-full bg-[#D29324] text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
                <span>Select Your Workplace / Commercial Hub</span>
              </label>
              <span className="text-[11px] text-[#6B7280]">
                Destination in {cityId.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {hubs.map((hub) => {
                const isSelected = hub.id === selectedHubId;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setSelectedHubId(hub.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-[#D29324] bg-[#FBF1DF]/60 shadow-xs ring-1 ring-[#D29324]"
                        : "border-[#E8E3DA] bg-white hover:border-gray-300 hover:bg-[#FAF8F4]"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-black text-[#252525] flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#AE7419]" />
                        <span>{hub.name}</span>
                      </div>
                      <div className="text-[10px] text-[#6B7280]">{hub.zone}</div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#D29324] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Maximum Commute Duration Slider & Preset Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#252525] flex items-center gap-1.5">
                <span className="w-4.5 h-4.5 rounded-full bg-[#D29324] text-white text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
                <span>Maximum Acceptable Travel Time</span>
              </label>
              <span className="text-xs font-black text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-full">
                &le; {maxTime} Minutes
              </span>
            </div>

            {/* Range Slider */}
            <div className="space-y-2 pt-1 pb-2">
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-full accent-[#D29324] cursor-pointer h-2 bg-[#E8E3DA] rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-bold text-[#6B7280]">
                <span>10 mins</span>
                <span>20 mins</span>
                <span>30 mins</span>
                <span>45 mins</span>
                <span>60 mins</span>
              </div>
            </div>

            {/* Quick Filter Preset Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {[15, 25, 35, 45, 60].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMaxTime(t)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    maxTime === t
                      ? "bg-[#D29324] text-white shadow-xs"
                      : "bg-[#FAF8F4] border border-[#E8E3DA] text-[#6B7280] hover:text-[#252525]"
                  }`}
                >
                  &le; {t}m
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Transit Mode Selector */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#252525] flex items-center gap-1.5 mb-2">
              <span className="w-4.5 h-4.5 rounded-full bg-[#D29324] text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
              <span>Preferred Transit Mode</span>
            </label>
            <div className="flex items-center gap-2">
              {[
                { id: "all", label: "All Modes" },
                { id: "train", label: "Suburban Train / Metro" },
                { id: "car", label: "Car / Expressway" }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMode(m.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex-1 text-center ${
                    selectedMode === m.id
                      ? "bg-[#252525] text-white shadow-xs"
                      : "bg-[#FAF8F4] border border-[#E8E3DA] text-[#6B7280] hover:text-[#252525]"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Results List */}
          <div className="space-y-2.5 pt-2 border-t border-[#E8E3DA]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#252525]">
                {filteredDestinations.length} Recommended Residential Areas
              </span>
              <span className="text-[11px] text-[#AE7419] font-bold">
                From {currentHub?.name}
              </span>
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF8F4] rounded-2xl border border-[#E8E3DA] space-y-2">
                <Clock className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs font-bold text-[#252525]">
                  No residential clusters within {maxTime} minutes of {currentHub?.name}.
                </p>
                <p className="text-[11px] text-[#6B7280]">
                  Try sliding the duration threshold to 40 or 50 minutes to view more options.
                </p>
                <button
                  type="button"
                  onClick={() => setMaxTime(45)}
                  className="px-4 py-1.5 rounded-xl bg-[#D29324] text-white text-xs font-bold shadow-xs hover:bg-[#AE7419] transition-all"
                >
                  Expand to 45 mins
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {filteredDestinations.map((dest, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] hover:border-[#D29324] hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <MapPin className="w-3.5 h-3.5 text-[#AE7419] shrink-0" />
                        <span className="text-xs sm:text-sm font-black text-[#252525]">
                          {dest.locality}
                        </span>
                        <span className="text-[10px] font-extrabold text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded-md">
                          {dest.timeMins} mins commute
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6B7280] flex items-center gap-2 flex-wrap">
                        <span>{dest.distance}</span>
                        <span>&bull;</span>
                        <span>{dest.mode}</span>
                        <span>&bull;</span>
                        <strong className="text-[#252525]">{dest.avgPrice}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push(`/${cityId}?search=${encodeURIComponent(dest.locality)}`);
                      }}
                      className="px-4 py-2 rounded-xl bg-white border border-[#D29324] text-[#AE7419] group-hover:bg-[#D29324] group-hover:text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <span>Explore Properties</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF8F4] border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <Link
            href={`/rail-network/${cityId}`}
            onClick={onClose}
            className="text-xs font-bold text-[#AE7419] hover:underline flex items-center gap-1.5"
          >
            <Train className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Switch to Rail Network Map Exploration &rarr;</span>
          </Link>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#252525] hover:bg-[#111111] text-white text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
