"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Star,
  Quote,
  CheckCircle2,
  Building,
  MapPin,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Vikram & Sneha Deshmukh",
    city: "Mumbai",
    locality: "Powai, Mumbai",
    project: "Hiranandani Gardens",
    role: "IT Director & Doctor",
    rating: 5,
    date: "September 2026",
    text: "Buying our 3 BHK in Powai through AuraLiving was an absolute breeze. From the very first 3D virtual tour to the on-ground negotiation and paperwork, everything was transparent. Best of all, they truly charged ZERO brokerage!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-2",
    name: "Anand Ranganathan",
    city: "Bangalore",
    locality: "Whitefield, Bangalore",
    project: "Prestige Lavender Fields",
    role: "Fintech Product VP",
    rating: 5,
    date: "August 2026",
    text: "As an engineer, I loved the commute time analysis and data-driven price trend insights on AuraLiving. Their advisory team verified all K-RERA documents before I paid the token amount. Truly professional service.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-3",
    name: "Pooja & Rohan Mehra",
    city: "Pune",
    locality: "Kharadi, Pune",
    project: "Panchshil Towers",
    role: "Senior Management Consultants",
    rating: 5,
    date: "August 2026",
    text: "We were relocating from Gurgaon to Pune and had zero local network. AuraLiving assigned a dedicated relationship manager who arranged 6 site visits in a single weekend. We finalized our dream home in 48 hours without any hassle.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-4",
    name: "Farhan & Ayesha Khan",
    city: "Dubai / Mumbai",
    locality: "Bandra West, Mumbai",
    project: "Rustomjee Seasons",
    role: "NRI Investors, Dubai",
    rating: 5,
    date: "July 2026",
    text: "Managing property purchase in India from Dubai used to be a nightmare of paperwork. AuraLiving's NRI Desk handled FEMA repatriation guidance, power of attorney, and bank home loan disbursement flawlessly. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-5",
    name: "Kavita Krishnamurthy",
    city: "Mumbai",
    locality: "Thane West",
    project: "Godrej Ascend",
    role: "Chartered Accountant",
    rating: 5,
    date: "June 2026",
    text: "The legal scrutiny and PropCheck quality inspection reports gave me complete confidence. There were no hidden fees, and the home loan desk secured a 8.35% interest rate from SBI within 5 days.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-6",
    name: "Siddharth Joshi",
    city: "Navi Mumbai",
    locality: "Kharghar, Navi Mumbai",
    project: "Adhiraj Capital City",
    role: "Commercial Pilot",
    rating: 5,
    date: "May 2026",
    text: "I was looking for high-growth potential along the upcoming Navi Mumbai International Airport corridor. AuraLiving's market intelligence showed exact infrastructure timelines and delivered unbeatable launch pricing.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  }
];

export default function TestimonialsPage() {
  const [filterCity, setFilterCity] = useState("all");

  const cities = ["all", "Mumbai", "Bangalore", "Pune", "Dubai / Mumbai", "Navi Mumbai"];

  const filtered = TESTIMONIALS.filter(
    (t) => filterCity === "all" || t.city.toLowerCase().includes(filterCity.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#252525]">
      <Header selectedCity="mumbai" onOpenCityModal={() => {}} onOpenAiModal={() => {}} onSearchQuery={() => {}} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#1F1F1F] via-[#2A2A2A] to-[#1F1F1F] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#D29324] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Stories & Verified Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Trusted by <span className="text-[#D29324]">30,000+ Families</span> Across India & Abroad
          </h1>
          <p className="mt-4 text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Real stories from real homebuyers who found their dream apartments, luxury villas, and high-yield investments with zero brokerage.
          </p>

          {/* Social Proof Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">4.9 / 5.0</div>
              <div className="text-xs text-gray-400 mt-1">Average Review Score</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">₹0</div>
              <div className="text-xs text-gray-400 mt-1">Brokerage Charged Ever</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">100%</div>
              <div className="text-xs text-gray-400 mt-1">RERA-Audited Projects</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">98.6%</div>
              <div className="text-xs text-gray-400 mt-1">Customer Recommendation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Cards */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1C1C]">Homebuyer Reviews</h2>
            <p className="text-xs text-gray-600 mt-1">Filter by metro city to read localized buyer feedback.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCity(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterCity === c
                    ? "bg-[#D29324] text-white shadow-sm"
                    : "bg-white border border-[#E8E3DA] text-gray-700 hover:bg-[#F3EFE6]"
                }`}
              >
                {c === "all" ? "All Reviews" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-[#E8E3DA] shadow-sm hover:shadow-md hover:border-[#D29324] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#D29324]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D29324]/20" />
                </div>

                <p className="text-xs text-gray-700 leading-relaxed italic mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D29324]/30"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-xs text-[#1C1C1C] truncate">{item.name}</h3>
                  <p className="text-[11px] text-gray-500 truncate">{item.role}</p>
                  <p className="text-[10px] text-[#D29324] font-medium truncate mt-0.5">
                    Purchased at {item.project} ({item.locality})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Endorsements */}
      <section className="py-14 bg-white border-t border-[#E8E3DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#1C1C1C]">Endorsed by India&apos;s Leading Developers</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            AuraLiving is the authorized channel advisory partner for over 2,000+ grade-A real estate developers nationwide.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
            {["Godrej Properties", "Lodha Group", "Prestige Estates", "Oberoi Realty", "Hiranandani", "Sobha Ltd"].map((dev) => (
              <div key={dev} className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-xs font-bold text-gray-700">
                {dev}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
