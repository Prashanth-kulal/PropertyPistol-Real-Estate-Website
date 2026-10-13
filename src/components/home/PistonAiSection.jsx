"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  MapPin,
  Bot,
  Compass,
  CheckCircle2,
  Mic,
  Send,
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";
import { PROJECTS } from "@/data";

export default function PistonAiSection({ onOpenAiModal }) {
  const router = useRouter();
  const [activeQuery, setActiveQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Reference prompts from PropertyPistol /ask-ai
  const SUGGESTED_PROMPTS = [
    {
      text: "Which is the best location to invest in Mumbai?",
      category: "Investment ROI",
      loc: "Mumbai MMR"
    },
    {
      text: "Which Noida localities offer the best ROI?",
      category: "High Appreciation",
      loc: "Delhi NCR"
    },
    {
      text: "I want to buy a 2 BHK in Pune",
      category: "Budget Homes",
      loc: "Pune"
    },
    {
      text: "We want a apartment in Worli with sunset view",
      category: "Luxury Sea View",
      loc: "Worli, Mumbai"
    },
    {
      text: "Which areas in Bangalore are ideal for first-time buyers?",
      category: "First-Time Buyers",
      loc: "Bengaluru"
    }
  ];

  const handleSelectPrompt = (promptText) => {
    setActiveQuery(promptText);
  };

  return (
    <section id="piston-ai" className="py-16 sm:py-20 bg-white border-b border-[#E8E3DA] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBF1DF]/70 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D29324] fill-[#D29324]/20" />
            <span>Piston AI by AuraLiving • Next-Gen Property Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight leading-tight">
            Find Your Dream Home with <span className="text-[#D29324]">Conversational AI</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-2.5 leading-relaxed">
            Ask complex real estate questions in plain English. Analyze micro-market growth corridors, compare verified RERA projects, calculate realistic rental yields, and discover direct developer pricing with zero brokerage.
          </p>
        </div>

        {/* 
          LAYOUT IMPROVEMENT (Requested for AuraLiving):
          Image on the LEFT and related content/AI interactive console on the RIGHT!
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Luxury Architectural Visual Showcase */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden border border-[#E8E3DA] shadow-xl aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="AuraLiving AI Property Discovery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Floating Glassmorphic Badge Top Left */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-md flex items-center gap-2 text-xs font-bold text-[#252525]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>40,000+ Verified Projects Analyzed</span>
                </div>
              </div>

              {/* Floating Bottom Card: Real-Time Intelligence Snapshot */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded-full">
                    Micro-Market AI Intelligence
                  </span>
                  <span className="text-[11px] font-bold text-[#252525] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#D29324]" />
                    Avg 11.8% YoY ROI
                  </span>
                </div>
                <p className="text-xs font-bold text-[#252525] line-clamp-1">
                  Top Recommended: Powai, Hinjewadi &amp; Whitefield Corridors
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-1 border-t border-gray-100">
                  <span>Zero Brokerage Guaranteed</span>
                  <span className="font-semibold text-[#AE7419]">100% RERA Diligence</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive AI Query Console & Prompt Suggestions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* AI Console Container */}
            <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-sm relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#252525]">
                      Ask AI Advisor
                    </h3>
                    <p className="text-[11px] text-[#6B7280]">
                      Trained on 30,000+ live RERA listings &amp; transaction trends
                    </p>
                  </div>
                </div>

                <Link
                  href="/ask-ai"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#AE7419] hover:text-[#D29324] transition-colors"
                >
                  <span>Fullscreen Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Interactive Search Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (activeQuery) {
                    router.push(`/ask-ai?q=${encodeURIComponent(activeQuery)}`);
                  } else {
                    router.push("/ask-ai");
                  }
                }}
                className={`relative flex items-center rounded-2xl border bg-white shadow-xs transition-all p-2 ${
                  searchFocused
                    ? "border-[#D29324] ring-2 ring-[#D29324]/20 shadow-md"
                    : "border-[#E8E3DA]"
                }`}
              >
                <Search className="w-5 h-5 text-gray-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={activeQuery}
                  onChange={(e) => setActiveQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Ask AI: e.g. Which is the best location to invest in Mumbai?"
                  className="w-full px-3 py-2 text-xs sm:text-sm text-[#252525] placeholder-gray-400 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Disclaimer matching reference */}
              <p className="text-[11px] text-[#6B7280] mt-2 italic">
                Ask a clear and specific question to get the most accurate results.
              </p>

              {/* Clickable Example Prompts Matching Reference */}
              <div className="pt-5 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#AE7419] block">
                  Frequently Asked Property Queries:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPrompt(prompt.text)}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FBF1DF] border border-[#E8E3DA] hover:border-[#D29324] text-xs font-medium text-[#252525] transition-all text-left flex items-center gap-2 group cursor-pointer shadow-2xs"
                    >
                      <Sparkles className="w-3 h-3 text-[#D29324] group-hover:scale-110 transition-transform shrink-0" />
                      <span>{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Launch Banner */}
              <div className="mt-6 pt-5 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#252525]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Free AI Advisory • Instant Shortlist Generator</span>
                </div>
                <Link
                  href="/ask-ai"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#252525] hover:bg-[#AE7419] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Launch Piston AI Platform</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 3 AI Key Capabilities Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E3DA] shadow-2xs">
                <span className="text-xs font-bold text-[#D29324] block">Natural Language Search</span>
                <p className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">
                  Query by commute time, sunset balconies, or Vastu compliance.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E3DA] shadow-2xs">
                <span className="text-xs font-bold text-[#D29324] block">Algorithmic ROI Ranking</span>
                <p className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">
                  Correlates upcoming metro lines with 5-year capital appreciation.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E3DA] shadow-2xs">
                <span className="text-xs font-bold text-[#D29324] block">Direct Builder Pricing</span>
                <p className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">
                  Unlocks verified developer inventory with zero brokerage fees.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
