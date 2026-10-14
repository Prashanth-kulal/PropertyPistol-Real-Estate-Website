"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ArrowLeft,
  Search,
  TrendingUp,
  HelpCircle,
  ChevronDown,
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter,
  BarChart3,
  Calendar,
  Percent,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import ConsultationForm from "@/components/home/ConsultationForm";
import { CITIES, DEVELOPERS } from "@/data";
import { getPriceTrendsForCity, getCityDetails } from "@/data/cityData";

function PriceTrendsPageContent() {
  const params = useParams();
  const router = useRouter();

  const rawCityParam = params?.city;
  const cityParam = Array.isArray(rawCityParam) ? rawCityParam[0] : rawCityParam || "mumbai";
  const cityId = cityParam.toLowerCase().trim();

  const matchedCity = useMemo(() => {
    return (
      CITIES.find(
        (c) => c.id.toLowerCase() === cityId || c.name.toLowerCase() === cityId.replace(/-/g, " ")
      ) || CITIES[0]
    );
  }, [cityId]);

  const trendsData = useMemo(() => {
    return getPriceTrendsForCity(matchedCity.id);
  }, [matchedCity.id]);

  const cityDetails = useMemo(() => {
    return getCityDetails(matchedCity.id);
  }, [matchedCity.id]);

  // State
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [localitySearch, setLocalitySearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("growth-high");
  const [activeFaq, setActiveFaq] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Safe Back Navigation returning to originating City Page
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
      router.back();
    } else {
      router.push(`/${matchedCity.id}`);
    }
  };

  // Filtered and sorted localities
  const filteredLocalities = useMemo(() => {
    let list = [...(trendsData.localitiesTrend || [])];
    if (localitySearch.trim()) {
      const q = localitySearch.toLowerCase().trim();
      list = list.filter((l) => l.name.toLowerCase().includes(q));
    }
    if (selectedSort === "price-high") {
      list.sort((a, b) => parseInt(b.avgRate.replace(/[^0-9]/g, "")) - parseInt(a.avgRate.replace(/[^0-9]/g, "")));
    } else if (selectedSort === "price-low") {
      list.sort((a, b) => parseInt(a.avgRate.replace(/[^0-9]/g, "")) - parseInt(b.avgRate.replace(/[^0-9]/g, "")));
    } else if (selectedSort === "growth-high") {
      list.sort((a, b) => parseFloat(b.yoyGrowth) - parseFloat(a.yoyGrowth));
    }
    return list;
  }, [trendsData.localitiesTrend, localitySearch, selectedSort]);

  // Calculate SVG chart coordinates
  const chartPoints = trendsData.historicalTrend;
  const minRate = Math.min(...chartPoints.map((p) => p.avgRate)) * 0.95;
  const maxRate = Math.max(...chartPoints.map((p) => p.avgRate)) * 1.05;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Global Header */}
      <Header
        selectedCity={matchedCity.id}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Breadcrumbs & Back Navigation Header */}
      <div className="bg-white border-b border-[#E8E3DA] py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-[#FBF1DF] text-xs font-bold text-[#252525] hover:text-[#AE7419] transition-all cursor-pointer shadow-2xs shrink-0 group"
              title={`Back to ${matchedCity.name} City Page`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D29324] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>

            <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link href="/" className="hover:text-[#D29324] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href={`/${matchedCity.id}`} className="hover:text-[#D29324] transition-colors capitalize">
                {matchedCity.name}
              </Link>
              <span>/</span>
              <span className="text-[#AE7419] font-bold">Price Trends</span>
            </nav>
          </div>

          <Link
            href={`/${matchedCity.id}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#AE7419] hover:text-[#D29324] shrink-0 transition-colors"
          >
            <span>{matchedCity.name} Overview</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 flex-1">
        {/* 3. Hero Header & Overview Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF1DF] text-[#AE7419] text-xs font-extrabold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Market Intelligence Report</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#252525] tracking-tight">
                Price Trends in {matchedCity.name} - 2026
              </h1>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-3xl leading-relaxed">
                Track historical appreciation, micro-market pricing, and rental yields across verified residential corridors in {matchedCity.name}.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-xs font-bold text-[#252525] hover:border-[#D29324] hover:text-[#AE7419] transition-all flex items-center gap-2 self-start lg:self-center shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D29324]" />
              <span>Change City: {matchedCity.name}</span>
            </button>
          </div>

          {/* Quick Metrics Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-[#E8E3DA]">
            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                Average Land / Flat Rate
              </span>
              <div className="text-lg sm:text-2xl font-black text-[#252525] mt-1">
                {trendsData.avgPrice}
              </div>
              <span className="text-[10px] text-[#6B7280]">Per sq.ft net carpet</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                1-Year Appreciation
              </span>
              <div className="text-lg sm:text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>{trendsData.yoyAppreciation}</span>
              </div>
              <span className="text-[10px] text-[#6B7280]">YoY capital growth</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                3-Year Growth Rate
              </span>
              <div className="text-lg sm:text-2xl font-black text-[#D29324] mt-1">
                {trendsData.threeYearGrowth}
              </div>
              <span className="text-[10px] text-[#6B7280]">Compounded appreciation</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                Gross Rental Yield
              </span>
              <div className="text-lg sm:text-2xl font-black text-[#252525] mt-1">
                {trendsData.rentalYield}
              </div>
              <span className="text-[10px] text-[#6B7280]">Annualized yield</span>
            </div>
          </div>
        </div>

        {/* 4. Interactive Price Trends Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#D29324]" />
                <h2 className="text-lg sm:text-xl font-extrabold text-[#252525]">
                  Quarterly Capital Rate Movement (2023 - 2026)
                </h2>
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Weighted average benchmark rate per square foot across {matchedCity.name} metropolitan region.
              </p>
            </div>

            <span className="text-[10px] font-bold text-gray-500 bg-[#FAF8F4] px-2.5 py-1 rounded-lg border border-[#E8E3DA] shrink-0 self-start sm:self-auto">
              Sample Illustrative Market Data
            </span>
          </div>

          {/* SVG Chart Graphic */}
          <div className="pt-4">
            <div className="h-64 sm:h-72 w-full relative flex items-end justify-between gap-1 sm:gap-2 px-2 pb-8 border-b border-gray-200">
              {chartPoints.map((pt, idx) => {
                const heightPercent = ((pt.avgRate - minRate) / (maxRate - minRate)) * 80 + 15;
                const isHovered = hoveredPoint?.period === pt.period;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                  >
                    {/* Tooltip Popup */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 bg-[#252525] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xl whitespace-nowrap animate-in fade-in duration-150">
                        <div>₹{pt.avgRate.toLocaleString("en-IN")}/sq.ft</div>
                        <div className="text-[#FFE2A7] text-[9px]">{pt.period}</div>
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[36px] rounded-t-lg transition-all duration-300 ${
                        isHovered
                          ? "bg-[#AE7419] shadow-md"
                          : idx === chartPoints.length - 1
                          ? "bg-[#D29324]"
                          : "bg-[#FBF1DF] group-hover:bg-[#D29324]/70"
                      }`}
                    />

                    {/* X-axis Label */}
                    <span className="absolute -bottom-6 text-[9px] sm:text-[10px] font-semibold text-[#6B7280] truncate max-w-full">
                      {pt.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Locality Price Trends Breakdown Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#252525]">
                Locality Wise Price Trends in {matchedCity.name}
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Compare capital benchmarks, YoY appreciation rate, and rental yields across prime micro-markets.
              </p>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative flex items-center bg-[#FAF8F4] rounded-xl border border-[#E8E3DA] px-3 py-1.5 focus-within:border-[#D29324]">
                <Search className="w-3.5 h-3.5 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={localitySearch}
                  onChange={(e) => setLocalitySearch(e.target.value)}
                  placeholder="Filter by locality..."
                  className="w-36 sm:w-48 text-xs font-semibold text-[#252525] bg-transparent focus:outline-hidden"
                />
              </div>

              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-xs font-bold text-[#252525] focus:outline-hidden cursor-pointer"
              >
                <option value="growth-high">Highest Growth (YoY)</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E8E3DA] text-[#6B7280] uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Locality</th>
                  <th className="py-3 px-3">Avg. Rate / sq.ft</th>
                  <th className="py-3 px-3">Typical Range</th>
                  <th className="py-3 px-3">YoY Change</th>
                  <th className="py-3 px-3">Rental Yield</th>
                  <th className="py-3 px-3">Active Projects</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E3DA]">
                {filteredLocalities.map((loc, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F4] transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-extrabold text-[#252525]">{loc.name}</div>
                      <span className="text-[10px] text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded-sm inline-block mt-0.5">
                        {loc.tag}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-extrabold text-[#252525]">
                      {loc.avgRate}
                    </td>
                    <td className="py-3.5 px-3 text-[#6B7280] font-mono text-[11px]">
                      {loc.priceRange}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-emerald-600">
                      {loc.yoyGrowth}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#252525]">
                      {loc.rentalYield}
                    </td>
                    <td className="py-3.5 px-3 text-[#6B7280] font-medium">
                      {loc.projectsCount}+ Projects
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href={`/${matchedCity.id}?search=${encodeURIComponent(loc.name)}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF8F4] hover:bg-[#D29324] hover:text-white border border-[#E8E3DA] font-bold text-[11px] text-[#AE7419] transition-all cursor-pointer"
                      >
                        <span>View Homes</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Top Developers in [City] */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#252525]">
            Top Developers Driving Growth in {matchedCity.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DEVELOPERS.map((dev) => (
              <div
                key={dev.id}
                className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] text-center hover:border-[#D29324] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#D29324] flex items-center justify-center font-black mx-auto mb-2 text-xs shadow-2xs">
                  {dev.name.slice(0, 2).toUpperCase()}
                </div>
                <h4 className="text-xs font-bold text-[#252525] truncate">{dev.name}</h4>
                <span className="text-[10px] text-[#6B7280] block mt-0.5">{dev.projects}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Price Trends FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#D29324]" />
            <h2 className="text-lg sm:text-xl font-extrabold text-[#252525]">
              Frequently Asked Questions About Property Rates in {matchedCity.name}
            </h2>
          </div>

          <div className="space-y-3">
            {trendsData.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#E8E3DA] rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#252525] flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D29324] transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs text-[#6B7280] leading-relaxed border-t border-[#E8E3DA] bg-[#FAF8F4]/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 8. Free Expert Consultation Form */}
        <ConsultationForm selectedCity={matchedCity.id} />
      </main>

      {/* 9. Global Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={matchedCity.id}
        onSelectCity={(newCity) => {
          setIsCityModalOpen(false);
          router.push(`/${newCity}/price-trends`);
        }}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}

export default function PriceTrendsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PriceTrendsPageContent />
    </Suspense>
  );
}
