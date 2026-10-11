"use client";

import React from "react";
import {
  ShieldCheck,
  Calculator,
  ArrowLeftRight,
  Banknote,
  TrendingUp,
  FileText,
  ArrowRight,
  Wrench
} from "lucide-react";
import { SHOTS_TOOLS } from "@/data";

export default function AuraShots({ onOpenEmi, onOpenConverter, onOpenConsultation }) {
  const getIcon = (iconName) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5 text-[#D29324]";
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className={iconClass} />;
      case "Calculator":
        return <Calculator className={iconClass} />;
      case "ArrowLeftRight":
        return <ArrowLeftRight className={iconClass} />;
      case "Banknote":
        return <Banknote className={iconClass} />;
      case "TrendingUp":
        return <TrendingUp className={iconClass} />;
      case "FileText":
        return <FileText className={iconClass} />;
      default:
        return <Calculator className={iconClass} />;
    }
  };

  const handleToolClick = (action) => {
    if (action === "emi" && onOpenEmi) {
      onOpenEmi();
    } else if (action === "converter" && onOpenConverter) {
      onOpenConverter();
    } else if (action === "stamp-duty" && onOpenEmi) {
      onOpenEmi();
    } else if (onOpenConsultation) {
      onOpenConsultation();
    }
  };

  return (
    <section id="shots" className="py-14 bg-[#FAF8F4] border-b border-[#E8E3DA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
            <Wrench className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Smart Real Estate Suite</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            AuraLiving <span className="text-[#D29324]">Shots</span>
          </h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Quick smart tools and calculators to plan your property financing, taxes, and investments.
          </p>
        </div>

        {/* All 6 Items in One Single Row on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {SHOTS_TOOLS.map((tool) => (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool.action)}
              className="bg-white rounded-2xl border border-[#E8E3DA] p-3.5 sm:p-4 shadow-xs hover:shadow-lg hover:border-[#D29324] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-center group-hover:bg-[#FBF1DF] transition-colors shrink-0">
                    {getIcon(tool.icon)}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#D29324] bg-[#FBF1DF] px-1.5 py-0.5 rounded">
                    Free Tool
                  </span>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors line-clamp-1">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#6B7280] leading-snug line-clamp-2 mt-1">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-[#E8E3DA] flex items-center justify-between text-[11px] font-semibold text-[#AE7419]">
                <span>Launch Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
