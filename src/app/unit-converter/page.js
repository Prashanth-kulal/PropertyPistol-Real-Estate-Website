"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  Calculator,
  CheckCircle2,
  Home,
  RefreshCw,
  Ruler,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnitConverterPage() {
  const router = useRouter();

  const [value, setValue] = useState("1000");
  const [fromUnit, setFromUnit] = useState("sqft");
  const [toUnit, setToUnit] = useState("sqm");

  const units = {
    sqft: {
      name: "Square Feet",
      short: "sq. ft.",
      toSqFt: 1,
    },
    sqm: {
      name: "Square Metres",
      short: "sq. m.",
      toSqFt: 10.7639104167,
    },
    sqyd: {
      name: "Square Yards",
      short: "sq. yd.",
      toSqFt: 9,
    },
    acre: {
      name: "Acres",
      short: "acre",
      toSqFt: 43560,
    },
    hectare: {
      name: "Hectares",
      short: "ha",
      toSqFt: 107639.104167,
    },
  };

  const result = useMemo(() => {
    const input = Number(value);

    if (!Number.isFinite(input)) {
      return 0;
    }

    const valueInSqFt = input * units[fromUnit].toSqFt;

    return valueInSqFt / units[toUnit].toSqFt;
  }, [value, fromUnit, toUnit]);

  const formatNumber = (number) => {
    if (!Number.isFinite(number)) return "0";

    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 6,
    }).format(number);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const resetConverter = () => {
    setValue("1000");
    setFromUnit("sqft");
    setToUnit("sqm");
  };

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#252525]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#AE7419] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#FBF1DF] border border-[#D29324]/30 flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-[#D29324]" />
              </div>

              <div>
                <div className="font-extrabold text-[#252525]">
                  AuraLiving
                </div>

                <div className="text-[10px] uppercase tracking-wider text-[#AE7419] font-bold">
                  Smart Tools
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
              Free Tool
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/30 text-[#AE7419] text-xs font-bold mb-4">
            <Ruler className="w-4 h-4" />
            AuraLiving Shots
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Unit{" "}
            <span className="text-[#D29324]">Converter</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Quickly convert property measurements between square feet,
            square metres, square yards, acres and hectares.
          </p>
        </div>
      </section>

      {/* CONVERTER */}
      <section className="pb-16">
        <div className="max-w-[950px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-sm p-5 sm:p-8">
            {/* TITLE */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-[#FBF1DF] flex items-center justify-center">
                <Calculator className="w-5 h-5 text-[#D29324]" />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Property Area Converter
                </h2>

                <p className="text-xs text-[#6B7280] mt-1">
                  Enter a value and choose the units you want to convert.
                </p>
              </div>
            </div>

            {/* INPUT AREA */}
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              {/* FROM */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  From
                </label>

                <input
                  type="number"
                  min="0"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full h-12 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] px-4 text-sm outline-none focus:border-[#D29324] focus:ring-2 focus:ring-[#D29324]/10"
                />

                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full h-12 mt-3 rounded-xl border border-[#E8E3DA] bg-white px-4 text-sm outline-none focus:border-[#D29324] focus:ring-2 focus:ring-[#D29324]/10"
                >
                  {Object.entries(units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.short})
                    </option>
                  ))}
                </select>
              </div>

              {/* SWAP */}
              <button
                type="button"
                onClick={swapUnits}
                className="w-12 h-12 rounded-xl bg-[#D29324] text-white flex items-center justify-center hover:bg-[#AE7419] transition-colors mx-auto"
                title="Swap units"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              {/* TO */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  To
                </label>

                <div className="w-full h-12 rounded-xl border border-[#E8E3DA] bg-[#FBF1DF] px-4 flex items-center text-lg font-bold text-[#AE7419]">
                  {formatNumber(result)}
                </div>

                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full h-12 mt-3 rounded-xl border border-[#E8E3DA] bg-white px-4 text-sm outline-none focus:border-[#D29324] focus:ring-2 focus:ring-[#D29324]/10"
                >
                  {Object.entries(units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.short})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* RESULT */}
            <div className="mt-8 rounded-2xl bg-[#252525] p-5 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs text-white/60">
                    Conversion Result
                  </p>

                  <p className="text-xl sm:text-2xl font-extrabold mt-1">
                    {formatNumber(Number(value) || 0)}{" "}
                    <span className="text-[#F2C56B]">
                      {units[fromUnit].short}
                    </span>
                  </p>
                </div>

                <ArrowLeftRight className="hidden sm:block w-5 h-5 text-[#D29324]" />

                <div className="sm:text-right">
                  <p className="text-xs text-white/60">
                    Converted Value
                  </p>

                  <p className="text-2xl sm:text-3xl font-extrabold mt-1 text-[#F2C56B]">
                    {formatNumber(result)}{" "}
                    <span className="text-white text-base">
                      {units[toUnit].short}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* RESET */}
            <div className="flex justify-end mt-5">
              <button
                type="button"
                onClick={resetConverter}
                className="flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#AE7419] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Converter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON CONVERSIONS */}
      <section className="py-14 bg-white border-y border-[#E8E3DA]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-9">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D29324]">
              Common Property Conversions
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
              Useful area conversions
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <Home className="w-5 h-5 text-[#D29324] mb-3" />

              <h3 className="font-bold text-sm">
                Square Feet → Square Metres
              </h3>

              <p className="text-xs text-[#6B7280] mt-2">
                1 sq. ft. = 0.092903 sq. m.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <Home className="w-5 h-5 text-[#D29324] mb-3" />

              <h3 className="font-bold text-sm">
                Square Feet → Square Yards
              </h3>

              <p className="text-xs text-[#6B7280] mt-2">
                1 sq. ft. = 0.111111 sq. yd.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <Home className="w-5 h-5 text-[#D29324] mb-3" />

              <h3 className="font-bold text-sm">
                Acre → Square Feet
              </h3>

              <p className="text-xs text-[#6B7280] mt-2">
                1 acre = 43,560 sq. ft.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <Home className="w-5 h-5 text-[#D29324] mb-3" />

              <h3 className="font-bold text-sm">
                Hectare → Square Feet
              </h3>

              <p className="text-xs text-[#6B7280] mt-2">
                1 hectare = 107,639.10 sq. ft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMATION */}
      <section className="py-12">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5">
            <div className="flex gap-3">
              <Ruler className="w-5 h-5 text-[#D29324] shrink-0" />

              <div>
                <h3 className="font-bold text-sm">
                  Why use a property unit converter?
                </h3>

                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                  Property listings may use different area units depending
                  on the location and type of property. This tool helps you
                  quickly compare measurements and understand the actual
                  size of a property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#252525] text-white py-7">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="font-extrabold">AuraLiving</p>

              <p className="text-xs text-white/50 mt-1">
                Smart tools for smarter property decisions.
              </p>
            </div>

            <button
              onClick={() => router.push("/")}
              className="text-xs font-semibold text-[#F2C56B] hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}