"use client";

import React, { useState } from "react";
import { Star, Home, Building, Trophy, DollarSign, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data";

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prev = () => {
    setActiveTestimonial((idx) => (idx === 0 ? TESTIMONIALS.length - 1 : idx - 1));
  };

  const next = () => {
    setActiveTestimonial((idx) => (idx === TESTIMONIALS.length - 1 ? 0 : idx + 1));
  };

  const t = TESTIMONIALS[activeTestimonial];

  return (
    <section id="testimonials" className="py-16 bg-[#FAF8F4] border-b border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#E8E3DA] shadow-2xs mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-700">4.8 Rating on Google</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            We Are Loved by People From All Parts of India
          </h2>
          <p className="text-sm text-[#6B7280] mt-1.5">
            Real families, genuine zero-brokerage experiences, and trusted home buying journeys.
          </p>
        </div>

        {/* 4 Metrics Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#252525]">30,000+</div>
              <div className="text-xs text-gray-500 font-medium">Homes Sold</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#252525]">5,000+</div>
              <div className="text-xs text-gray-500 font-medium">Projects Managed</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#252525]">
                India’s <span className="text-sm">No.</span> 1
              </div>
              <div className="text-xs text-gray-500 font-medium">Retail Brokerage Firm</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#252525]">
                <span className="text-sm">USD</span> ~3 Billion
              </div>
              <div className="text-xs text-gray-500 font-medium">Worth of Transactions</div>
            </div>
          </div>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E8E3DA] p-8 sm:p-10 shadow-lg relative">
          <Quote className="w-12 h-12 text-[#FBF1DF] absolute top-6 right-6 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border-2 border-[#D29324] shrink-0 shadow-md">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">
                &ldquo;{t.review}&rdquo;
              </p>

              <div>
                <h4 className="text-base font-bold text-[#252525]">{t.name}</h4>
                <p className="text-xs text-[#AE7419] font-medium">{t.property}</p>
              </div>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E8E3DA]">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeTestimonial ? "w-6 bg-[#D29324]" : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
