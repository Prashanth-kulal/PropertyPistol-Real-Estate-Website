"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  FileText,
  Home,
  IndianRupee,
  MapPin,
  User,
  Building2,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function StampDutyCalculatorPage() {
  const router = useRouter();

  const [state, setState] = useState("Maharashtra");
  const [propertyValue, setPropertyValue] = useState("5000000");
  const [buyerType, setBuyerType] = useState("Individual");
  const [propertyType, setPropertyType] = useState("Residential");

  /*
   * These are illustrative rates for calculator estimation.
   * Actual stamp duty varies by state, location, property type,
   * buyer category and applicable government rules.
   */
  const rates = {
    Maharashtra: {
      Individual: 5,
      Woman: 4,
      Company: 6,
    },
    Karnataka: {
      Individual: 5,
      Woman: 5,
      Company: 5,
    },
    Delhi: {
      Individual: 6,
      Woman: 4,
      Company: 6,
    },
    Gujarat: {
      Individual: 4.9,
      Woman: 4.9,
      Company: 4.9,
    },
    Rajasthan: {
      Individual: 6,
      Woman: 5,
      Company: 6,
    },
    Telangana: {
      Individual: 4,
      Woman: 4,
      Company: 4,
    },
    "West Bengal": {
      Individual: 6,
      Woman: 6,
      Company: 6,
    },
    "Tamil Nadu": {
      Individual: 7,
      Woman: 7,
      Company: 7,
    },
  };

  const registrationRates = {
    Maharashtra: 1,
    Karnataka: 1,
    Delhi: 1,
    Gujarat: 1,
    Rajasthan: 1,
    Telangana: 0.5,
    "West Bengal": 1,
    "Tamil Nadu": 4,
  };

  const calculation = useMemo(() => {
    const value = Number(propertyValue) || 0;

    const stampDutyRate =
      rates[state]?.[buyerType] ?? rates.Maharashtra.Individual;

    const registrationRate = registrationRates[state] ?? 1;

    const stampDuty = (value * stampDutyRate) / 100;
    const registrationCharge = (value * registrationRate) / 100;

    const totalCharges = stampDuty + registrationCharge;

    const totalPropertyCost = value + totalCharges;

    return {
      value,
      stampDutyRate,
      registrationRate,
      stampDuty,
      registrationCharge,
      totalCharges,
      totalPropertyCost,
    };
  }, [propertyValue, state, buyerType]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#252525] flex flex-col">
      <Header />

      {/* BREADCRUMB STRIP */}
      <div className="bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-[#6B7280]">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#AE7419] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="hover:text-[#AE7419] transition-colors">
                Services
              </Link>
            </li>
            <li>/</li>
            <li className="font-bold text-[#252525]">Stamp Duty Calculator</li>
          </ol>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
            <span className="font-semibold">Free Real Estate Calculator</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/30 text-[#AE7419] text-xs font-bold mb-4">
            <Calculator className="w-4 h-4" />
            AuraLiving Shots
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Stamp Duty{" "}
            <span className="text-[#D29324]">Calculator</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Estimate stamp duty and registration charges for your property
            purchase. Enter your property details below to get an instant
            estimate.
          </p>
        </div>
      </section>

      {/* MAIN CALCULATOR */}
      <section className="pb-16">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
            {/* LEFT - FORM */}
            <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-sm p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 rounded-2xl bg-[#FBF1DF] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#D29324]" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Property Details</h2>
                  <p className="text-xs text-[#6B7280]">
                    Enter your property information
                  </p>
                </div>
              </div>

              {/* STATE */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <MapPin className="w-4 h-4 text-[#D29324]" />
                  State
                </label>

                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full h-12 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] px-4 text-sm outline-none focus:border-[#D29324] focus:ring-2 focus:ring-[#D29324]/10"
                >
                  {Object.keys(rates).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* PROPERTY VALUE */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <IndianRupee className="w-4 h-4 text-[#D29324]" />
                  Property Value
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    placeholder="Enter property value"
                    className="w-full h-12 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] pl-9 pr-4 text-sm outline-none focus:border-[#D29324] focus:ring-2 focus:ring-[#D29324]/10"
                  />
                </div>

                <p className="text-[11px] text-[#6B7280] mt-2">
                  Example: ₹50,00,000
                </p>
              </div>

              {/* BUYER TYPE */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <User className="w-4 h-4 text-[#D29324]" />
                  Buyer Type
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {["Individual", "Woman", "Company"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBuyerType(type)}
                      className={`h-11 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                        buyerType === type
                          ? "bg-[#D29324] border-[#D29324] text-white"
                          : "bg-white border-[#E8E3DA] text-[#6B7280] hover:border-[#D29324] hover:text-[#AE7419]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* PROPERTY TYPE */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Home className="w-4 h-4 text-[#D29324]" />
                  Property Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {["Residential", "Commercial"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`h-12 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                        propertyType === type
                          ? "bg-[#FBF1DF] border-[#D29324] text-[#AE7419]"
                          : "bg-white border-[#E8E3DA] text-[#6B7280] hover:border-[#D29324]"
                      }`}
                    >
                      {type === "Residential" ? (
                        <Home className="w-4 h-4" />
                      ) : (
                        <Building2 className="w-4 h-4" />
                      )}

                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* RATE INFORMATION */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                <div className="flex gap-3">
                  <Info className="w-4 h-4 text-[#D29324] mt-0.5 shrink-0" />

                  <div>
                    <p className="text-xs font-bold text-[#252525]">
                      Current estimate
                    </p>

                    <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                      Stamp duty rate:{" "}
                      <span className="font-semibold text-[#AE7419]">
                        {calculation.stampDutyRate}%
                      </span>{" "}
                      · Registration charge:{" "}
                      <span className="font-semibold text-[#AE7419]">
                        {calculation.registrationRate}%
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - RESULT */}
            <div className="bg-[#252525] rounded-3xl p-5 sm:p-7 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 rounded-2xl bg-[#D29324] flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Estimated Charges
                  </h2>

                  <p className="text-xs text-white/60">
                    Based on the details entered
                  </p>
                </div>
              </div>

              {/* PROPERTY VALUE */}
              <div className="pb-5 border-b border-white/10">
                <p className="text-xs text-white/60">Property Value</p>

                <p className="text-2xl sm:text-3xl font-extrabold mt-1">
                  {formatCurrency(calculation.value)}
                </p>
              </div>

              {/* STAMP DUTY */}
              <div className="py-5 border-b border-white/10">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="text-sm font-semibold">Stamp Duty</p>
                    <p className="text-xs text-white/50 mt-1">
                      {calculation.stampDutyRate}% of property value
                    </p>
                  </div>

                  <p className="text-lg font-bold text-[#F2C56B]">
                    {formatCurrency(calculation.stampDuty)}
                  </p>
                </div>
              </div>

              {/* REGISTRATION */}
              <div className="py-5 border-b border-white/10">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Registration Charges
                    </p>

                    <p className="text-xs text-white/50 mt-1">
                      {calculation.registrationRate}% of property value
                    </p>
                  </div>

                  <p className="text-lg font-bold text-[#F2C56B]">
                    {formatCurrency(calculation.registrationCharge)}
                  </p>
                </div>
              </div>

              {/* TOTAL */}
              <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/60">
                  Total Government Charges
                </p>

                <p className="text-3xl sm:text-4xl font-extrabold text-[#F2C56B] mt-2">
                  {formatCurrency(calculation.totalCharges)}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">
                      Estimated total property cost
                    </span>

                    <span className="font-bold">
                      {formatCurrency(calculation.totalPropertyCost)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2 text-[11px] text-white/50 leading-relaxed">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <p>
                  This calculator provides an approximate estimate. Actual
                  charges may vary depending on the applicable government
                  rules, location, property value and transaction details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 bg-white border-y border-[#E8E3DA]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-9">
            <p className="text-xs font-bold uppercase tracking-wider text-[#D29324]">
              Simple & Quick
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
              How the calculator works
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-[#D29324]" />
              </div>

              <h3 className="font-bold text-sm">1. Select your state</h3>

              <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                Choose the state where your property is located.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] flex items-center justify-center mb-4">
                <IndianRupee className="w-5 h-5 text-[#D29324]" />
              </div>

              <h3 className="font-bold text-sm">2. Enter property value</h3>

              <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                Add the estimated value of the property you are purchasing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
              <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] flex items-center justify-center mb-4">
                <Calculator className="w-5 h-5 text-[#D29324]" />
              </div>

              <h3 className="font-bold text-sm">3. Get your estimate</h3>

              <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                See estimated stamp duty, registration charges and total
                government charges instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-10">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-[#D29324] shrink-0" />

              <div>
                <h3 className="font-bold text-sm">
                  Important information
                </h3>

                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                  Stamp duty and registration charges are governed by
                  respective state authorities and can change based on
                  property location, transaction value, buyer category,
                  property type and other applicable rules. Use this tool for
                  preliminary planning only and verify the final amount with
                  the relevant authority or a qualified property professional
                  before completing a transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}