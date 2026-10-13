"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Building2,
  Calendar,
  ChevronDown,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ChevronUp,
  MapPin,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Star
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import { CITIES, PROJECTS } from "@/data";

// Indian Digit-to-Words converter matching PropertyPistol exact implementation
function digitToWords(e) {
  if (!e || isNaN(e) || Number(e) <= 0) return "";
  const t = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
  const a = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const str = e.toString();
  if (str.length > 9) return "Over ₹99 Crores";
  const s = ("000000000" + str).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!s) return "";
  let l = "";
  l += s[1] != 0 ? (t[Number(s[1])] || a[s[1][0]] + " " + t[s[1][1]]) + "Crore " : "";
  l += s[2] != 0 ? (t[Number(s[2])] || a[s[2][0]] + " " + t[s[2][1]]) + "Lakh " : "";
  l += s[3] != 0 ? (t[Number(s[3])] || a[s[3][0]] + " " + t[s[3][1]]) + "Thousand " : "";
  l += s[4] != 0 ? (t[Number(s[4])] || a[s[4][0]] + " " + t[s[4][1]]) + "Hundred " : "";
  l += s[5] != 0 ? (l != "" ? "and " : "") + (t[Number(s[5])] || a[s[5][0]] + " " + t[s[5][1]]) : "";
  return l.trim() + " Rupees";
}

// Compact inWords converter (e.g. 5000000 -> 50 Lakh, 11300000 -> 1.13 Crore)
function inWords(num) {
  if (!num || isNaN(num) || Number(num) <= 0) return "0";
  const n = Math.round(Number(num));
  if (n >= 10000000) return `${(n / 10000000).toFixed(2)} Crore`;
  if (n >= 100000) return `${(n / 100000).toFixed(2)} Lakh`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)} Thousand`;
  return `${n}`;
}

const CITY_LOCALITIES = {
  mumbai: [
    { name: "Bandra West", rate: 10.5 },
    { name: "Powai", rate: 9.8 },
    { name: "Andheri East", rate: 8.5 },
    { name: "Worli", rate: 11.2 },
    { name: "Sanpada, Navi Mumbai", rate: 9.2 },
    { name: "Thane West", rate: 8.8 }
  ],
  pune: [
    { name: "Hinjewadi", rate: 11.4 },
    { name: "Baner", rate: 10.2 },
    { name: "Kharadi", rate: 12.0 },
    { name: "Wakad", rate: 9.6 }
  ],
  bangalore: [
    { name: "Whitefield", rate: 12.5 },
    { name: "Sarjapur Road", rate: 11.8 },
    { name: "Indiranagar", rate: 10.0 },
    { name: "Electronic City", rate: 9.4 }
  ],
  delhi: [
    { name: "Golf Course Road", rate: 13.2 },
    { name: "Sector 150 Noida", rate: 11.5 },
    { name: "Cyber City Gurugram", rate: 12.0 }
  ],
  hyderabad: [
    { name: "Gachibowli", rate: 12.8 },
    { name: "HITEC City", rate: 13.5 },
    { name: "Kondapur", rate: 11.0 }
  ]
};

export default function InvestmentCalculatorPage() {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Exact PropertyPistol Form Inputs
  const [investmentValue, setInvestmentValue] = useState(5000000); // Default ₹50 Lakhs
  const [tenure, setTenure] = useState(10); // Default 10 Years
  const [city, setCity] = useState("mumbai");
  const [locality, setLocality] = useState("Bandra West");
  const [showInvestmentResult, setShowInvestmentResult] = useState(true);

  const availableLocalities = CITY_LOCALITIES[city] || CITY_LOCALITIES["mumbai"];

  // Current average appreciation percentage
  const currentLocalityObj = availableLocalities.find((l) => l.name === locality) || availableLocalities[0];
  const avgAppreciationPercentage = currentLocalityObj ? currentLocalityObj.rate : 9.5;

  // Handle city change
  const handleCityChange = (newCity) => {
    setCity(newCity);
    const locs = CITY_LOCALITIES[newCity] || CITY_LOCALITIES["mumbai"];
    setLocality(locs[0].name);
  };

  // PropertyPistol Exact Investment & FD Calculation Formula
  const calculation = useMemo(() => {
    const P = Math.max(0, Number(investmentValue) || 0);
    const T = Math.max(1, Math.min(30, Number(tenure) || 1));
    const locs = CITY_LOCALITIES[city] || CITY_LOCALITIES["mumbai"];
    const locObj = locs.find((l) => l.name === locality) || locs[0];
    const rate = locObj ? locObj.rate : 9.5;
    const l = rate / 100;

    const tenures = [];
    const investedPerYear = [];
    const gainPerYear = [];

    for (let d = 0; d < T; d++) {
      tenures.push(`${d + 1}Y`);
      investedPerYear.push(P);
      const g = P * Math.pow(1 + l, d + 1) - P;
      gainPerYear.push(Math.round(g));
    }

    const futureValue = P * Math.pow(1 + l, T);
    const gains = futureValue - P;

    // FD Value: Difference between Real Estate return and standard 6.5% Fixed Deposit
    // PropertyPistol formula: fdValue = futureValue - investmentValue * Math.pow(1 + 0.065, tenure)
    const fdFutureValue = P * Math.pow(1 + 0.065, T);
    const fdValue = Math.max(0, futureValue - fdFutureValue);

    return {
      tenures,
      investedPerYear,
      gainPerYear,
      futureValue: Math.round(futureValue),
      gains: Math.round(gains),
      fdValue: Math.round(fdValue),
      maxBarTotal: P + Math.round(gains)
    };
  }, [investmentValue, tenure, city, locality]);

  // Matching projects for city
  const matchingProjects = PROJECTS.filter(
    (p) => p.city.toLowerCase() === city.toLowerCase()
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525]">
      {/* Global Header */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 1. EXACT PROPERTYPISTOL HEADER WRAPPER */}
      <section className="bg-white border-b border-[#E8E3DA] py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-bold mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-[#D29324]" />
              <span>AuraLiving Shots • Micro-Market Real Estate Engine</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#252525] tracking-tight">
              Investment <span className="text-[#D29324]">Calculator</span>
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280] mt-2 leading-relaxed">
              Real estate is a great choice to meet any of your investment goals. 
              Use the investment calculator to find the capital gain of your real estate investments.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE EXACT CALCULATOR WRAPPER */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full space-y-12">
        <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-md p-6 sm:p-8 space-y-8">
          
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#252525]">
            Calculate the future value of your real estate investment
          </h2>

          {/* 4 Exact Inputs in One Row on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* Input 1: I want to invest */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">
                I want to invest
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#6B7280]">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={investmentValue}
                  onChange={(e) => setInvestmentValue(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#E8E3DA] font-bold text-sm bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                />
              </div>
              <span className="text-[11px] text-[#AE7419] font-medium block truncate">
                {digitToWords(investmentValue)}
              </span>
            </div>

            {/* Input 2: For a period of */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">
                For a period of
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={tenure}
                  onChange={(e) => {
                    const val = Number(e.target.value.replace(/[^0-9]/g, "")) || 1;
                    setTenure(Math.min(30, Math.max(1, val)));
                  }}
                  className="w-full pl-3.5 pr-14 py-2.5 rounded-xl border border-[#E8E3DA] font-bold text-sm bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                />
                <span className="absolute right-8 text-xs font-semibold text-[#6B7280]">Yrs</span>
                <div className="absolute right-2 flex flex-col">
                  <button
                    type="button"
                    onClick={() => setTenure(Math.min(30, tenure + 1))}
                    className="p-0.5 text-gray-400 hover:text-[#D29324]"
                    title="Increase Tenure"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTenure(Math.max(1, tenure - 1))}
                    className="p-0.5 text-gray-400 hover:text-[#D29324]"
                    title="Decrease Tenure"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <span className="text-[11px] text-[#6B7280] block">
                Max 30 Years
              </span>
            </div>

            {/* Input 3: In the city of */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">
                In the city of
              </label>
              <select
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] font-bold text-sm bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <span className="text-[11px] text-[#6B7280] block">
                Selected Metro Hub
              </span>
            </div>

            {/* Input 4: In this locality */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block">
                In this locality
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] font-bold text-sm bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
              >
                {availableLocalities.map((loc) => (
                  <option key={loc.name} value={loc.name}>{loc.name}</option>
                ))}
              </select>
              <span className="text-[11px] text-[#6B7280] block truncate">
                This might give you <strong className="text-[#AE7419] font-bold">{avgAppreciationPercentage}%</strong> returns
              </span>
            </div>

            {/* Button: Calculate */}
            <div>
              <button
                type="button"
                onClick={() => setShowInvestmentResult(true)}
                className="w-full py-2.5 rounded-xl bg-[#D29324] text-white font-bold text-sm hover:bg-[#AE7419] transition-all shadow-md text-center h-[42px]"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* 3. EXACT RESULTS SECTION: WHAT YOU GET */}
          {showInvestmentResult && (
            <div className="pt-8 border-t border-[#E8E3DA] space-y-8 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* LEFT: Stacked Bar Chart (Total Invested vs Gains over Years) */}
                <div className="lg:col-span-7 bg-[#FAF8F4] p-6 sm:p-7 rounded-3xl border border-[#E8E3DA] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#252525] uppercase tracking-wider">
                      What you get:
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                        <span className="text-[#6B7280]">Total Invested</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#D29324]"></span>
                        <span className="text-[#AE7419]">Gains</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Multi-Year Stacked Bar Visualization */}
                  <div className="w-full h-64 flex items-end justify-between gap-1 pt-6 px-2">
                    {calculation.tenures.map((yrLabel, idx) => {
                      const totalBarVal = calculation.investedPerYear[idx] + calculation.gainPerYear[idx];
                      const heightPercent = calculation.maxBarTotal > 0
                        ? Math.max(15, (totalBarVal / calculation.maxBarTotal) * 100)
                        : 20;
                      const investedHeightPercent = (calculation.investedPerYear[idx] / totalBarVal) * 100;
                      const gainHeightPercent = (calculation.gainPerYear[idx] / totalBarVal) * 100;

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                          {/* Floating Tooltip */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#252525] text-white text-[10px] rounded px-1.5 py-0.5 mb-1 pointer-events-none whitespace-nowrap z-10">
                            ₹{inWords(totalBarVal)}
                          </div>

                          {/* Stacked Bar Container */}
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[28px] rounded-t-md overflow-hidden flex flex-col-reverse shadow-xs"
                          >
                            {/* Invested Part (Gray) */}
                            <div
                              style={{ height: `${investedHeightPercent}%` }}
                              className="w-full bg-gray-300 transition-all duration-300"
                            ></div>
                            {/* Gains Part (Gold) */}
                            <div
                              style={{ height: `${gainHeightPercent}%` }}
                              className="w-full bg-[#D29324] transition-all duration-300"
                            ></div>
                          </div>

                          {/* X-axis Label */}
                          <span className="text-[10px] text-[#6B7280] font-semibold mt-2">
                            {yrLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT: Results Highlights, FD Badge & 3 Metric Cards */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Exact PropertyPistol FD Comparison Badge */}
                  {calculation.fdValue > 0 && (
                    <div className="p-4 rounded-2xl bg-[#FBF1DF] border border-[#D29324]/30 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D29324] text-white flex items-center justify-center font-bold shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-[#252525]">
                        In Real Estate you’ll earn{" "}
                        <strong className="text-[#AE7419] font-extrabold text-sm">
                          ₹ {inWords(calculation.fdValue)}
                        </strong>{" "}
                        more than an FD.
                      </div>
                    </div>
                  )}

                  {/* 3 Summary Result Boxes */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#FAF8F4] p-3.5 rounded-2xl border border-[#E8E3DA] text-center sm:text-left">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                        Total Invested
                      </span>
                      <div className="text-sm sm:text-base font-extrabold text-[#252525] mt-1">
                        ₹ {inWords(investmentValue)}
                      </div>
                    </div>

                    <div className="bg-[#FAF8F4] p-3.5 rounded-2xl border border-[#E8E3DA] text-center">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                        Gains
                      </span>
                      <div className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1">
                        ₹ {inWords(calculation.gains)}
                      </div>
                    </div>

                    <div className="bg-[#FAF8F4] p-3.5 rounded-2xl border border-[#E8E3DA] text-center sm:text-right">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                        Future value
                      </span>
                      <div className="text-sm sm:text-base font-extrabold text-[#AE7419] mt-1">
                        ₹ {inWords(calculation.futureValue)}
                      </div>
                    </div>
                  </div>

                  {/* Top Projects CTA Section */}
                  <div className="pt-2 text-center space-y-3">
                    <div className="text-xs font-bold text-[#252525] uppercase tracking-wider border-t border-[#E8E3DA] pt-3">
                      Top Projects to fulfill your investment goals
                    </div>

                    <a
                      href="#matching-projects"
                      className="w-full py-3 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all shadow-md inline-block text-center"
                    >
                      View Properties in {locality}
                    </a>

                    {/* Toll-Free Support Box */}
                    <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280] pt-1">
                      <PhoneCall className="w-3.5 h-3.5 text-[#D29324]" />
                      <span>For any assistance call us Toll Free:</span>
                      <a href="tel:18002094040" className="font-bold text-[#252525] hover:text-[#D29324]">
                        1800-209-4040
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. MATCHING PROJECTS SHOWCASE SECTION */}
        <section id="matching-projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#252525]">
                Curated Investment Projects in <span className="text-[#D29324]">{locality}</span>
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                RERA-approved developer inventory offering top capital appreciation potential.
              </p>
            </div>
            <Link
              href="/#top-projects"
              className="text-xs font-bold text-[#AE7419] hover:text-[#D29324] flex items-center gap-1"
            >
              <span>Explore All Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border border-[#E8E3DA] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={proj.images[0]}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#D29324] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {proj.tag || "High ROI"}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-[#252525] flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {proj.rating}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-xs text-[#6B7280] font-semibold">{proj.builder}</span>
                    <h4 className="text-base font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors">
                      {proj.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                      <MapPin className="w-3.5 h-3.5 text-[#D29324]" />
                      <span>{proj.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E8E3DA] mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#6B7280] block">Starting Price</span>
                    <span className="text-sm font-extrabold text-[#AE7419]">₹ {proj.price}</span>
                  </div>
                  <Link
                    href="/#shots"
                    className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-xs font-bold text-[#252525] hover:bg-[#D29324] hover:text-white transition-colors"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(cityId) => setSelectedCity(cityId)}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
