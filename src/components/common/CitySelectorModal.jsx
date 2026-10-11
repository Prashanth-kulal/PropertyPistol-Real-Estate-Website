"use client";

import React, { useState } from "react";
import { X, Search, MapPin, Check } from "lucide-react";
import { CITIES } from "@/data";

export default function CitySelectorModal({ isOpen, onClose, selectedCity, onSelectCity }) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularCities = CITIES.filter((c) => c.popular);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E3DA] bg-[#FAF8F4]">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D29324]" />
            <h3 className="text-lg font-semibold text-[#252525]">Select Your Preferred City</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#E8E3DA] bg-white">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city or state name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E8E3DA] text-sm focus:outline-hidden focus:border-[#D29324] focus:ring-1 focus:ring-[#D29324]"
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!searchTerm && (
            <div>
              <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-3">
                Popular Metros
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {popularCities.map((city) => {
                  const isSelected = selectedCity.toLowerCase() === city.id.toLowerCase();
                  return (
                    <button
                      key={city.id}
                      onClick={() => {
                        onSelectCity(city.id);
                        onClose();
                      }}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        isSelected
                          ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419] font-semibold"
                          : "border-[#E8E3DA] bg-white text-[#252525] hover:border-[#D29324] hover:bg-[#FAF8F4]"
                      }`}
                    >
                      <span>{city.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#D29324]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-3">
              {searchTerm ? "Search Results" : "All Operating Cities"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredCities.map((city) => {
                const isSelected = selectedCity.toLowerCase() === city.id.toLowerCase();
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      onSelectCity(city.id);
                      onClose();
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm transition-all text-left ${
                      isSelected
                        ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419] font-semibold"
                        : "border-[#E8E3DA] bg-white text-[#252525] hover:border-[#D29324] hover:bg-[#FAF8F4]"
                    }`}
                  >
                    <div>
                      <div className="font-medium">{city.name}</div>
                      <div className="text-xs text-gray-500">{city.projectsCount}+ Projects</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#D29324] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
