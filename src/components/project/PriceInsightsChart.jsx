"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  getLocalityPriceTrends,
  calculatePriceChange,
  getComparisonLocalitySeries,
  slugify
} from "@/data/priceTrends";

// Official PropertyPistol color palette for comparative trends
const PALETTE = [
  { stroke: "#DEBD5A", fill: "#DEBD5A", name: "Primary (Gold)" },
  { stroke: "#8B8DE3", fill: "#8B8DE3", name: "Comp 1 (Purple)" },
  { stroke: "#F15B2A", fill: "#F15B2A", name: "Comp 2 (Coral)" },
  { stroke: "#316BB2", fill: "#316BB2", name: "Comp 3 (Blue)" }
];

export default function PriceInsightsChart({ project }) {
  // Default selected time range is 6M as per official PropertyPistol reference
  const [range, setRange] = useState("6M");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedComparisons, setSelectedComparisons] = useState([]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const citySlug = (project?.city || "mumbai").toLowerCase().trim();
  const cityName = project?.cityName || (citySlug.charAt(0).toUpperCase() + citySlug.slice(1));
  const rawLocality = project?.locality || (project?.location ? project.location.split(",")[0].trim() : "");

  // Load genuine locality price data from verified data layer
  const trendData = useMemo(() => {
    return getLocalityPriceTrends(citySlug, rawLocality);
  }, [citySlug, rawLocality]);

  // Primary locality series for the active range
  const rangeKey = range.toLowerCase();
  const primaryRawSeries = trendData?.available && trendData?.history ? trendData.history[rangeKey] || [] : [];

  // Change calculation
  const changeMeta = useMemo(() => {
    return calculatePriceChange(primaryRawSeries);
  }, [primaryRawSeries]);

  // Comparison series for up to 3 selected benchmark localities
  const comparisonSeriesList = useMemo(() => {
    if (!trendData.available || !selectedComparisons.length) return [];
    return selectedComparisons
      .map((slug, idx) => {
        const comp = getComparisonLocalitySeries(citySlug, slug, rangeKey);
        if (!comp || !comp.series || !comp.series.length) return null;
        return {
          ...comp,
          color: PALETTE[(idx + 1) % PALETTE.length].stroke
        };
      })
      .filter(Boolean);
  }, [citySlug, selectedComparisons, rangeKey, trendData.available]);

  // Chart dimensions & padding
  const width = 640;
  const height = 240;
  const padLeft = 52;
  const padRight = 24;
  const padTop = 28;
  const padBottom = 36;

  // Format date labels for X-axis
  const formatLabel = (pt) => {
    if (!pt) return "";
    const m = String(pt.month || "").slice(0, 3);
    const yr = String(pt.year || "").slice(-2);
    return `${m} ${yr}`;
  };

  // Compute combined min and max prices across all active series for scaling
  const { minPrice, maxPrice, yTicks } = useMemo(() => {
    const allPrices = [];
    primaryRawSeries.forEach(p => allPrices.push(p.price));
    comparisonSeriesList.forEach(c => {
      c.series.forEach(p => allPrices.push(p.price));
    });

    if (!allPrices.length) {
      return { minPrice: 10000, maxPrice: 30000, yTicks: [10000, 15000, 20000, 25000, 30000] };
    }

    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const spread = max - min || 4000;
    const lower = Math.max(0, Math.floor((min - spread * 0.12) / 1000) * 1000);
    const upper = Math.ceil((max + spread * 0.12) / 1000) * 1000;
    const step = (upper - lower) / 4;
    const ticks = [lower, lower + step, lower + step * 2, lower + step * 3, upper].map(v => Math.round(v / 500) * 500);

    return { minPrice: lower, maxPrice: upper, yTicks: ticks };
  }, [primaryRawSeries, comparisonSeriesList]);

  // Coordinate mappers
  const getX = (idx, total) => {
    if (total <= 1) return padLeft;
    return padLeft + (idx / (total - 1)) * (width - padLeft - padRight);
  };

  const getY = (price) => {
    if (maxPrice <= minPrice) return height / 2;
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    return height - padBottom - ratio * (height - padTop - padBottom);
  };

  // Helper to build SVG curve
  const buildPath = (series) => {
    if (!series || !series.length) return "";
    let d = `M ${getX(0, series.length)} ${getY(series[0].price)}`;
    for (let i = 0; i < series.length - 1; i++) {
      const x0 = getX(i, series.length);
      const y0 = getY(series[i].price);
      const x1 = getX(i + 1, series.length);
      const y1 = getY(series[i + 1].price);
      const mx = (x0 + x1) / 2;
      d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  };

  const primaryPathD = useMemo(() => buildPath(primaryRawSeries), [primaryRawSeries, minPrice, maxPrice]);

  const primaryAreaD = useMemo(() => {
    if (!primaryRawSeries.length || !primaryPathD) return "";
    const lastX = getX(primaryRawSeries.length - 1, primaryRawSeries.length);
    const firstX = getX(0, primaryRawSeries.length);
    const bottomY = height - padBottom;
    return `${primaryPathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [primaryPathD, primaryRawSeries]);

  // If genuine historical data is unavailable for this locality or city, show clean, truthful fallback state
  if (!trendData.available) {
    return (
      <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5 sm:p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-black text-[#252525]">
            Price Insights of {rawLocality || "Locality"}
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF8F4] text-[#8C7653] border border-[#E8E3DA] self-start">
            Historical Data Under Expansion
          </span>
        </div>
        <p className="text-xs text-[#6B7280] leading-relaxed">
          {trendData.reason || `Historical price trend metrics are currently being compiled and verified for ${rawLocality} in ${cityName}.`}
        </p>
        <div className="pt-2">
          <Link
            href={`/${citySlug}`}
            className="text-[#D29324] hover:text-[#AE7419] font-bold text-xs inline-flex items-center gap-1 hover:underline"
          >
            Explore all {cityName} projects →
          </Link>
        </div>
      </div>
    );
  }

  // Toggle selection of comparison locality
  const toggleComparison = (slug) => {
    if (selectedComparisons.includes(slug)) {
      setSelectedComparisons(selectedComparisons.filter(s => s !== slug));
    } else {
      if (selectedComparisons.length >= 3) {
        // limit to 3 comparisons as per official design
        setSelectedComparisons([...selectedComparisons.slice(1), slug]);
      } else {
        setSelectedComparisons([...selectedComparisons, slug]);
      }
    }
  };

  return (
    <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5 sm:p-6 space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-black text-[#252525]">
              Price Insights of {trendData.locality}
            </h3>
            <span className="text-xs font-bold text-[#D29324] bg-[#FAF8F4] px-2 py-0.5 rounded-md border border-[#E8E3DA]">
              ₹{trendData.currentRate.toLocaleString("en-IN")} / sq.ft
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                changeMeta.isPositive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              {changeMeta.text} change in last {range === "6M" ? "6 months" : range === "3Y" ? "3 years" : "5 years"}
            </span>
            <span className="text-[10px] text-[#6B7280]">
              ({trendData.projectCount} verified projects)
            </span>
          </div>
        </div>

        {/* Time Period Control Buttons (6M default, 3Y, 5Y) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F4] border border-[#E8E3DA] rounded-xl self-start">
          {["6M", "3Y", "5Y"].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                setRange(btn);
                setHoveredIndex(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                range === btn
                  ? "bg-[#D29324] text-white shadow-sm"
                  : "text-[#6B7280] hover:text-[#252525]"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Legend with Color Swatches */}
      <div className="flex items-center gap-3 text-xs font-semibold pt-1 flex-wrap">
        <div className="flex items-center gap-1.5 bg-[#FAF8F4] px-2.5 py-1 rounded-lg border border-[#E8E3DA]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DEBD5A]" />
          <span className="text-[#252525] font-bold">{trendData.locality}</span>
        </div>

        {comparisonSeriesList.map((comp) => (
          <div
            key={comp.slug}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-white"
            style={{ borderColor: comp.color }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: comp.color }} />
            <span className="font-bold text-xs" style={{ color: comp.color }}>
              {comp.name}
            </span>
            <button
              type="button"
              onClick={() => toggleComparison(comp.slug)}
              className="ml-1 text-gray-400 hover:text-red-500 font-bold cursor-pointer text-xs"
              title="Remove comparison"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="chartGoldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DEBD5A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#DEBD5A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines & Y-axis labels */}
          {yTicks.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#E8E3DA"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#6B7280"
                  fontFamily="sans-serif"
                >
                  {(val / 1000).toFixed(1)} K
                </text>
              </g>
            );
          })}

          {/* Locality Area fill */}
          {primaryAreaD && <path d={primaryAreaD} fill="url(#chartGoldGrad)" />}

          {/* Primary Locality Line curve (Gold) */}
          {primaryPathD && (
            <path
              d={primaryPathD}
              fill="none"
              stroke="#DEBD5A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Comparison Line curves */}
          {comparisonSeriesList.map((comp) => {
            const compD = buildPath(comp.series);
            if (!compD) return null;
            return (
              <path
                key={comp.slug}
                d={compD}
                fill="none"
                stroke={comp.color}
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}

          {/* Primary Data Points */}
          {primaryRawSeries.map((pt, i) => {
            const cx = getX(i, primaryRawSeries.length);
            const cy = getY(pt.price);
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={`prim-pt-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke="#DEBD5A"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-150"
                />
                <circle cx={cx} cy={cy} r="14" fill="transparent" />
              </g>
            );
          })}

          {/* Comparison Data Points */}
          {comparisonSeriesList.map((comp) =>
            comp.series.map((pt, i) => {
              const cx = getX(i, comp.series.length);
              const cy = getY(pt.price);
              const isHovered = hoveredIndex === i;
              return (
                <g
                  key={`comp-${comp.slug}-${i}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 5 : 3.5}
                    fill="#ffffff"
                    stroke={comp.color}
                    strokeWidth={isHovered ? 2.5 : 2}
                  />
                  <circle cx={cx} cy={cy} r="14" fill="transparent" />
                </g>
              );
            })
          )}

          {/* X-axis labels */}
          {primaryRawSeries.map((pt, i) => {
            const x = getX(i, primaryRawSeries.length);
            return (
              <text
                key={i}
                x={x}
                y={height - 12}
                textAnchor="middle"
                fontSize="9"
                fill="#6B7280"
                fontFamily="sans-serif"
              >
                {formatLabel(pt)}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredIndex !== null && primaryRawSeries[hoveredIndex] && (
          <div
            className="absolute pointer-events-none bg-[#1F2937] text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-2xl -translate-x-1/2 -translate-y-full z-20 space-y-1"
            style={{
              left: `${(getX(hoveredIndex, primaryRawSeries.length) / width) * 100}%`,
              top: `${Math.max(10, (getY(primaryRawSeries[hoveredIndex].price) / height) * 100 - 8)}%`,
            }}
          >
            <div className="text-[10px] text-gray-300 font-mono">
              {primaryRawSeries[hoveredIndex].month} {primaryRawSeries[hoveredIndex].year}
            </div>
            <div className="flex items-center gap-1.5 text-[#DEBD5A]">
              <span className="w-2 h-2 rounded-full bg-[#DEBD5A]" />
              <span>
                {trendData.locality}: ₹{primaryRawSeries[hoveredIndex].price.toLocaleString("en-IN")} / sq.ft
              </span>
            </div>
            {comparisonSeriesList.map((comp) => {
              const pt = comp.series[hoveredIndex];
              if (!pt) return null;
              return (
                <div key={comp.slug} className="flex items-center gap-1.5" style={{ color: comp.color }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.color }} />
                  <span>
                    {comp.name}: ₹{pt.price.toLocaleString("en-IN")} / sq.ft
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Comparison Selector / Nearby Localities Panel */}
      <div className="pt-2 border-t border-[#E8E3DA] space-y-3 text-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#FAF8F4] border border-[#DEBD5A] text-[#9E7A1C] font-bold text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DEBD5A]" />
              {trendData.locality}
            </span>

            {/* "Add More +" button */}
            {trendData.nearby && trendData.nearby.length > 0 && (
              <button
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`px-3 py-1 rounded-full border text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isMoreOpen
                    ? "bg-[#D29324] text-white border-[#D29324]"
                    : "bg-[#FAF8F4] text-[#6B7280] hover:text-[#252525] border-[#E8E3DA] hover:border-[#D29324]"
                }`}
              >
                <span>{isMoreOpen ? "Close ▲" : "Add More +"}</span>
              </button>
            )}
          </div>

          <Link
            href={`/${citySlug}`}
            className="text-[#D29324] hover:text-[#AE7419] font-bold text-xs inline-flex items-center gap-1 hover:underline"
          >
            See price trends in {cityName} ➜
          </Link>
        </div>

        {/* Revealed comparison localities panel */}
        {isMoreOpen && trendData.nearby && trendData.nearby.length > 0 && (
          <div className="p-3 bg-[#FAF8F4] rounded-xl border border-[#E8E3DA] space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                Compare with nearby {cityName} localities (Select up to 3):
              </span>
              <span className="text-[10px] font-bold text-[#D29324]">
                {selectedComparisons.length}/3 selected
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap max-h-40 overflow-y-auto pt-1">
              {trendData.nearby.slice(0, 20).map((loc) => {
                const isSelected = selectedComparisons.includes(loc.slug);
                return (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => toggleComparison(loc.slug)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#D29324] text-white border-[#D29324] shadow-sm"
                        : "bg-white text-[#252525] border-[#E8E3DA] hover:border-[#D29324]"
                    }`}
                  >
                    <span>{loc.name}</span>
                    {isSelected && <span className="font-bold text-[10px]">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <p className="text-[10px] text-[#6B7280] leading-relaxed">
        * Authentic price trends recorded from verified registration and market data for {trendData.locality}, {cityName}. Rates measured in ₹ / sq.ft carpet area.
      </p>
    </div>
  );
}
