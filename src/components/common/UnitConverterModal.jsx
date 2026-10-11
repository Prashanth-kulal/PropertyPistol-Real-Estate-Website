"use client";

import React, { useState } from "react";
import { X, ArrowLeftRight } from "lucide-react";

export default function UnitConverterModal({ isOpen, onClose }) {
  const [value, setValue] = useState(1000);
  const [unit, setUnit] = useState("sqft");

  if (!isOpen) return null;

  // Convert input value to Sq Ft base
  const toSqFt = {
    sqft: 1,
    sqm: 10.7639,
    acres: 43560,
    guntha: 1089,
    bigha: 27000,
    gaj: 9
  };

  const sqFtVal = (Number(value) || 0) * (toSqFt[unit] || 1);

  const conversions = [
    { label: "Square Feet (sq.ft)", val: sqFtVal.toFixed(2) },
    { label: "Square Meters (sq.m)", val: (sqFtVal / 10.7639).toFixed(2) },
    { label: "Acres", val: (sqFtVal / 43560).toFixed(4) },
    { label: "Guntha (Maharashtra/Karnataka)", val: (sqFtVal / 1089).toFixed(2) },
    { label: "Gaj / Sq. Yards", val: (sqFtVal / 9).toFixed(2) },
    { label: "Bigha (approx)", val: (sqFtVal / 27000).toFixed(4) }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E3DA] bg-[#FAF8F4]">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-[#D29324]" />
            <h3 className="text-lg font-semibold text-[#252525]">Real Estate Unit Converter</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Enter Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-3 py-2 border border-[#E8E3DA] rounded-lg text-sm focus:border-[#D29324] focus:outline-hidden"
              />
            </div>
            <div className="w-40">
              <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 border border-[#E8E3DA] rounded-lg text-sm focus:border-[#D29324] focus:outline-hidden bg-white"
              >
                <option value="sqft">Sq. Ft</option>
                <option value="sqm">Sq. Meter</option>
                <option value="acres">Acres</option>
                <option value="guntha">Guntha</option>
                <option value="gaj">Gaj</option>
                <option value="bigha">Bigha</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
              Converted Values:
            </p>
            <div className="divide-y divide-[#E8E3DA] border border-[#E8E3DA] rounded-xl overflow-hidden bg-[#FAF8F4]">
              {conversions.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center px-4 py-2.5 text-sm">
                  <span className="text-gray-600 text-xs">{item.label}</span>
                  <span className="font-bold text-[#AE7419]">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#D29324] text-white font-medium text-sm hover:bg-[#AE7419] transition-colors"
          >
            Close Converter
          </button>
        </div>
      </div>
    </div>
  );
}
