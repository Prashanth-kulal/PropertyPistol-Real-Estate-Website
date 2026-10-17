"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  Percent,
  Landmark,
  BadgeCheck,
  ArrowRight,
  Phone,
  MessageCircle,
  Play,
  X,
  ChevronRight,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  Compass,
  FileCheck2,
  Scale,
  Sparkles,
  Award,
  Globe2,
  ChevronDown
} from "lucide-react";

export default function DubaiDeskPage() {
  // Rotating Hero Headline Slider
  const heroHeadlines = [
    {
      line1: "WHY JUST DREAM OF DUBAI?",
      highlight: "OWN IT.",
      sub: "A Global Destination for Lifestyle, Luxury & Tax-Free Investment"
    },
    {
      line1: "TAX-FREE CAPITAL GAINS.",
      highlight: "WORLD-CLASS LIFE.",
      sub: "Unrivaled 8–10% Rental Yields in the World's Safest Cosmopolitan Hub"
    },
    {
      line1: "HOME TO 200+ NATIONALITIES.",
      highlight: "MAKE YOUR MOVE.",
      sub: "100% Freehold Ownership & 10-Year UAE Golden Visa for Global Investors"
    }
  ];

  const [activeHeadline, setActiveHeadline] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeadline((prev) => (prev + 1) % heroHeadlines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroHeadlines.length]);

  // Market Performance Active Tab
  const [marketTab, setMarketTab] = useState("quarterly"); // 'quarterly' | 'locations' | 'segments'

  // Video Reel Modal State
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+971",
    phone: "",
    email: "",
    budget: "",
    propertyType: "Apartment",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 800);
  };

  // Video Reels Data (Direct verified S3 URLs)
  const videoReels = [
    {
      id: 1,
      title: "Are you planning to buy in Dubai?",
      subtitle: "First-time investor roadmap & key areas",
      videoUrl: "https://s3.ap-south-1.amazonaws.com/pistol.website.assets/dubai_desk/dubai-reels-1.mp4",
      poster: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      tag: "Buyer's Guide"
    },
    {
      id: 2,
      title: "Investing in Real Estate? Watch This",
      subtitle: "Rental yield vs Capital appreciation analysis",
      videoUrl: "https://s3.ap-south-1.amazonaws.com/pistol.website.assets/dubai_desk/dubai-reels-2.mp4",
      poster: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80",
      tag: "Market Intel"
    },
    {
      id: 3,
      title: "Why Work With Verified Advisory?",
      subtitle: "Navigating DLD regulations & escrow safety",
      videoUrl: "https://s3.ap-south-1.amazonaws.com/pistol.website.assets/dubai_desk/dubai-reels-3.mp4",
      poster: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=600&q=80",
      tag: "Legal Diligence"
    },
    {
      id: 4,
      title: "Dubai Property Expo & Launches",
      subtitle: "Direct developer pre-launch pricing advantages",
      videoUrl: "https://s3.ap-south-1.amazonaws.com/pistol.website.assets/dubai_desk/dubai-reels-4.mp4",
      poster: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80",
      tag: "Expos & Events"
    },
    {
      id: 5,
      title: "Zero-Tax Living & Capital Wealth",
      subtitle: "How UAE tax laws compound real estate returns",
      videoUrl: "https://s3.ap-south-1.amazonaws.com/pistol.website.assets/dubai_desk/dubai-reels-5.mp4",
      poster: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=600&q=80",
      tag: "Tax Benefits"
    },
    {
      id: 6,
      title: "UAE 10-Year Golden Visa Eligibility",
      subtitle: "Property investment threshold & family residency",
      videoUrl: "https://s3.ap-south-1.amazonaws.com/pistol.website.assets/dubai_desk/dubai-reels-6.mp4",
      poster: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=600&q=80",
      tag: "Golden Visa"
    }
  ];

  // Top Performing Locations
  const topLocations = [
    {
      name: "Downtown Dubai",
      tag: "Burj Khalifa & Opera District",
      avgPrice: "AED 2,800 / sq.ft",
      rentalYield: "6.8% – 7.5%",
      growth: "+18.2% YoY",
      description: "The global center of luxury with iconic Burj Khalifa, Dubai Mall, and continuous international tenant demand.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "Dubai Marina",
      tag: "Waterfront Living",
      avgPrice: "AED 1,950 / sq.ft",
      rentalYield: "7.4% – 8.2%",
      growth: "+16.5% YoY",
      description: "World's most sought-after man-made marina boasting 3km of waterfront promenade, yacht berths, and bustling nightlife.",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "Business Bay",
      tag: "Commercial & High-Rise Hub",
      avgPrice: "AED 2,100 / sq.ft",
      rentalYield: "7.9% – 8.8%",
      growth: "+21.4% YoY",
      description: "Dubai's central business corridor bordering the Dubai Canal, delivering premier corporate rental absorption.",
      image: "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "Palm Jumeirah",
      tag: "Ultra-Luxury Island Villas",
      avgPrice: "AED 3,600 / sq.ft",
      rentalYield: "6.2% – 7.1%",
      growth: "+24.8% YoY",
      description: "World-renowned engineering marvel offering private beaches, Michelin-starred dining, and immense HNW capital growth.",
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "Dubai Hills Estate",
      tag: "Golf Course Master Community",
      avgPrice: "AED 2,250 / sq.ft",
      rentalYield: "7.1% – 7.9%",
      growth: "+19.0% YoY",
      description: "Green oasis by Emaar with an 18-hole championship golf course, mega mall, premier international schools, and parks.",
      image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=700&q=80"
    }
  ];

  // Property Segments Breakdown from Official Reference
  const propertySegments = [
    {
      name: "Freehold Properties",
      q1: "55,738",
      q2: "66,509",
      share: "95.5%",
      growth: "+19.3%",
      highlight: true
    },
    {
      name: "Non-Freehold Properties",
      q1: "2,750",
      q2: "2,973",
      share: "4.5%",
      growth: "+8.1%",
      highlight: false
    },
    {
      name: "Residential Properties",
      q1: "56,717",
      q2: "67,733",
      share: "97.2%",
      growth: "+19.4%",
      highlight: true
    },
    {
      name: "Commercial Properties",
      q1: "1,771",
      q2: "1,749",
      share: "2.8%",
      growth: "-1.2%",
      highlight: false
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Siddharth K.",
      role: "Singapore-based Tech Executive & NRI",
      quote:
        "Dubai Desk gave us complete clarity. From shortlisting the right project in Dubai Marina to handling cross-border paperwork and escrow transfers, they made international investing completely seamless.",
      stars: 5,
      location: "Invested in Dubai Marina"
    },
    {
      name: "Rekha Shah",
      role: "Business Owner, Mumbai",
      quote:
        "What I appreciated most was the zero-pressure approach. They took time to analyze our family portfolio and matched us with an exceptional off-plan property in Downtown Dubai with a 5-year payment plan.",
      stars: 5,
      location: "Invested in Downtown Dubai"
    },
    {
      name: "Abdul Rahman",
      role: "Finance Director, Abu Dhabi",
      quote:
        "As a first-time off-plan investor in Dubai Hills, I was overwhelmed by developer brochures. The AuraLiving Dubai Desk team verified the escrow status, projected rental yields objectively, and handled everything with utmost integrity.",
      stars: 5,
      location: "Invested in Dubai Hills Estate"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F2] flex flex-col font-sans text-[#252525] antialiased selection:bg-[#D6B36A] selection:text-[#14263D]">
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 1: HERO / BANNER SECTION (#banner)
            Luxury Deep Navy Palette with Gold & Dubai Teal Highlights
        ========================================================================== */}
        <section
          id="banner"
          className="relative min-h-[640px] lg:min-h-[720px] bg-[#14263D] overflow-hidden flex items-center border-b border-[#167C80]/30"
        >
          {/* Background Dubai Skyline with Luxury Gradient Overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85')"
            }}
          >
            {/* Dark Multi-layer Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#14263D]/95 via-[#14263D]/85 to-[#14263D]/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14263D] via-transparent to-[#14263D]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(#167C80_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
          </div>

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Rotating Statements & Core Value Props */}
              <div className="lg:col-span-7 space-y-6 text-white">
                {/* Exclusive Dubai Desk Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#167C80]/30 border border-[#D6B36A]/50 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#D6B36A] animate-ping" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#FAF8F2] uppercase">
                    AuraLiving Dubai Desk • Global Real Estate Advisory
                  </span>
                </div>

                {/* Rotating H1 Headlines */}
                <div className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-center">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] transition-all duration-500">
                    {heroHeadlines[activeHeadline].line1}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B36A] via-[#FAF8F2] to-[#D6B36A]">
                      {heroHeadlines[activeHeadline].highlight}
                    </span>
                  </h1>
                  <p className="mt-3 text-base sm:text-lg text-[#E6E3DC]/90 font-normal max-w-xl">
                    {heroHeadlines[activeHeadline].sub}
                  </p>
                </div>

                {/* Headline Navigation Dots */}
                <div className="flex items-center gap-2 pt-1">
                  {heroHeadlines.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHeadline(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeHeadline === idx
                          ? "w-8 bg-[#D6B36A]"
                          : "w-2 bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Switch to headline ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Value Highlights Pill Row */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-lg">
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-black text-[#D6B36A]">0%</span>
                    <span className="text-[11px] sm:text-xs text-gray-300 font-medium">Income & Capital Tax</span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-3">
                    <span className="text-xl sm:text-2xl font-black text-[#167C80]">8–10%</span>
                    <span className="text-[11px] sm:text-xs text-gray-300 font-medium">Annual Rental Yields</span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-3">
                    <span className="text-xl sm:text-2xl font-black text-white">100%</span>
                    <span className="text-[11px] sm:text-xs text-gray-300 font-medium">Foreign Freehold</span>
                  </div>
                </div>

                {/* Quick Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#talk-consultant"
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B89243] hover:from-[#E2C37E] hover:to-[#C69E4E] text-[#14263D] font-bold text-sm tracking-wide shadow-lg shadow-[#D6B36A]/20 transition-all hover:scale-[1.02] flex items-center gap-2"
                  >
                    <span>Talk to a Dubai Consultant</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#market-performance"
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
                  >
                    <span>Explore Market Stats</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Quick Lead Capture Card Overlay */}
              <div className="lg:col-span-5">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-2xl border border-[#D6B36A]/30 text-[#252525] relative">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#167C80] block">
                        Direct Concierge Desk
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#14263D]">
                        Invest in Dubai Property
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] border border-[#E6E3DC] flex items-center justify-center text-[#167C80]">
                      <Building2 className="w-5 h-5" />
                    </div>
                  </div>

                  {formSubmitted ? (
                    <div className="py-8 text-center space-y-3 animate-in fade-in">
                      <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold text-[#14263D]">Thank You!</h4>
                      <p className="text-xs text-[#697386] max-w-xs mx-auto">
                        Your inquiry has been routed to our senior Dubai investment advisor. We will connect with you within 2 hours.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs font-semibold text-[#167C80] underline hover:text-[#14263D] pt-2"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="mt-4 space-y-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E6E3DC] text-xs focus:ring-2 focus:ring-[#167C80] focus:border-[#167C80] outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Country
                          </label>
                          <select
                            value={formData.countryCode}
                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                            className="w-full px-2 py-2.5 rounded-lg border border-[#E6E3DC] text-xs bg-white focus:ring-2 focus:ring-[#167C80] outline-none"
                          >
                            <option value="+971">🇦🇪 +971</option>
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+65">🇸🇬 +65</option>
                            <option value="+966">🇸🇦 +966</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Mobile number"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E6E3DC] text-xs focus:ring-2 focus:ring-[#167C80] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E6E3DC] text-xs focus:ring-2 focus:ring-[#167C80] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Investment Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#E6E3DC] text-xs bg-white focus:ring-2 focus:ring-[#167C80] outline-none"
                        >
                          <option value="">Select Target Budget</option>
                          <option value="AED 1M - 2M">AED 1M – 2M (₹2.25 Cr – ₹4.5 Cr)</option>
                          <option value="AED 2M - 5M">AED 2M – 5M (Golden Visa Eligible)</option>
                          <option value="AED 5M - 10M">AED 5M – 10M (Luxury Waterfront)</option>
                          <option value="AED 10M+">AED 10M+ (Ultra-HNW Portfolio)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-3 rounded-xl bg-[#14263D] hover:bg-[#1A3353] text-[#FAF8F2] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {formLoading ? (
                          <span>Connecting...</span>
                        ) : (
                          <>
                            <span>Request Free Consultation</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#D6B36A]" />
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-center text-gray-400">
                        🔒 100% Confidential • Direct Developer Pricing • Zero Commission
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: A GLOBAL DESTINATION FOR LIFESTYLE, LUXURY & INVESTMENT
            Ivory (#FAF8F2) Background with Key Dubai Metrics Cards
        ========================================================================== */}
        <section className="py-16 sm:py-20 bg-[#FAF8F2] border-b border-[#E6E3DC]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#167C80] uppercase block mb-2">
                Overview & Global Capital
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight leading-tight">
                A Global Destination for Lifestyle, Luxury & Investment
              </h2>
              <h3 className="text-base sm:text-lg font-semibold text-[#D6B36A] mt-2">
                Welcome to The Global Real Estate Capital
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#697386] leading-relaxed">
                Dubai isn’t just a city — it’s one of the world’s most future-ready investment destinations. It began its journey as a modest desert trading port in the early 20th century, thriving on pearl diving, fishing, and commerce.
              </p>
              <p className="mt-2 text-sm sm:text-base text-[#697386] leading-relaxed">
                With tax-free returns, high rental yields (up to 8–10%), and a transparent, RERA-regulated market, Dubai continues to attract investors from across the globe. It offers the perfect mix of stability, lifestyle, and capital appreciation, supported by an investor-friendly environment and government-backed real estate policies. Whether you&apos;re looking to diversify your portfolio, earn passive rental income, or own a part of a globally admired skyline — Dubai real estate makes strategic and financial sense.
              </p>
            </div>

            {/* 4 Core Dubai Pillars / Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12">
              {/* Card 1: Population */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E6E3DC] shadow-sm hover:shadow-md transition-all hover:border-[#167C80]/40 group">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] text-[#14263D] flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-[#14263D] group-hover:text-[#D6B36A] transition-colors">
                  <Globe2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block">
                  Population
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#14263D] mt-1 block">
                  Over 3.5 Million
                </span>
                <p className="text-xs text-[#697386] mt-1.5">
                  Home to 200+ nationalities with rapid white-collar workforce influx.
                </p>
              </div>

              {/* Card 2: Language */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E6E3DC] shadow-sm hover:shadow-md transition-all hover:border-[#167C80]/40 group">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] text-[#14263D] flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-[#14263D] group-hover:text-[#D6B36A] transition-colors">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block">
                  Language
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#14263D] mt-1 block">
                  Arabic & English
                </span>
                <p className="text-xs text-[#697386] mt-1.5">
                  Arabic is the official language; English is universally used in commerce and law.
                </p>
              </div>

              {/* Card 3: Currency */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E6E3DC] shadow-sm hover:shadow-md transition-all hover:border-[#167C80]/40 group">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] text-[#14263D] flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-[#14263D] group-hover:text-[#D6B36A] transition-colors">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block">
                  Currency
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#14263D] mt-1 block">
                  Dirham (AED)
                </span>
                <p className="text-xs text-[#697386] mt-1.5">
                  Strictly pegged to the US Dollar ($1 = AED 3.6725) eliminating forex currency risk.
                </p>
              </div>

              {/* Card 4: Zero Tax */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E6E3DC] shadow-sm hover:shadow-md transition-all hover:border-[#167C80]/40 group">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] text-[#14263D] flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-[#14263D] group-hover:text-[#D6B36A] transition-colors">
                  <Percent className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block">
                  Zero Income Tax
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#167C80] mt-1 block">
                  0% Property Tax
                </span>
                <p className="text-xs text-[#697386] mt-1.5">
                  0% capital gains tax, 0% rental income tax, and 0% personal tax on property earnings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: WHY INVEST IN DUBAI?
            6 Strategic Pillars with Bespoke Styling
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-[#E6E3DC]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#167C80] uppercase block mb-2">
                Unbeatable Fundamentals
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
                Why Invest in Dubai?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#697386]">
                Dubai ranks among the highest globally for safety, investor security, and institutional real estate returns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
              {/* Feature 1 */}
              <div className="rounded-2xl p-7 bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#D6B36A] transition-all hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#14263D] text-[#D6B36A] flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#14263D]">
                  Ranked Among Top 5 Safest Cities Globally
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#697386] leading-relaxed">
                  Consistently recognized by international indices as one of the world&apos;s safest locations for families, businesses, and foreign capital.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl p-7 bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#D6B36A] transition-all hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#14263D] text-[#D6B36A] flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#14263D]">
                  100% Foreign Ownership of Property
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#697386] leading-relaxed">
                  Designated freehold zones grant international purchasers unrestricted freehold title deeds without needing a local Emirati partner.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl p-7 bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#D6B36A] transition-all hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#14263D] text-[#D6B36A] flex items-center justify-center mb-5">
                  <Percent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#14263D]">
                  No Property Tax or Capital Gains Tax
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#697386] leading-relaxed">
                  Retain 100% of your rental profits and capital appreciation. No stamp duty recurring taxes, annual property tax, or wealth tax.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-2xl p-7 bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#D6B36A] transition-all hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#14263D] text-[#D6B36A] flex items-center justify-center mb-5">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#14263D]">
                  8–10% Annual Rental Returns
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#697386] leading-relaxed">
                  Significantly surpasses prime global hubs like London (3.2%), New York (4.1%), and Mumbai (2.8%) in net passive rental yields.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="rounded-2xl p-7 bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#D6B36A] transition-all hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#14263D] text-[#D6B36A] flex items-center justify-center mb-5">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#14263D]">
                  AED Pegged to USD: No Forex Risk
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#697386] leading-relaxed">
                  Fixed parity with the United States Dollar shields overseas investors against emerging market currency devaluations.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="rounded-2xl p-7 bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#D6B36A] transition-all hover:-translate-y-1 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#14263D] text-[#D6B36A] flex items-center justify-center mb-5">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#14263D]">
                  Resilient Economy & Strong Governance
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#697386] leading-relaxed">
                  Robust oversight by Dubai Land Department (DLD) and RERA guarantees mandatory developer escrow accounts for off-plan safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: DUBAI'S MARKET PERFORMANCE
            Official Stats, Quarterly Analysis & Top Locations in Deep Navy/Ivory
        ========================================================================== */}
        <section
          id="market-performance"
          className="py-16 sm:py-24 bg-[#14263D] text-white border-b border-[#167C80]/30"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Header with Title and Overall KPIs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#D6B36A] uppercase block mb-2">
                  Market Intelligence & Verified Transactions
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Dubai’s Market Performance
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#E6E3DC]/80 max-w-xl">
                  Official Dubai Land Department (DLD) data demonstrating continuous expansion across freehold residential and prime commercial segments.
                </p>
              </div>

              {/* 4 Verified High-Level Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-md shrink-0">
                <div>
                  <span className="text-lg sm:text-2xl font-black text-[#D6B36A] block">127,970</span>
                  <span className="text-[10px] sm:text-xs text-gray-300 font-medium">Property Transactions</span>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <span className="text-lg sm:text-2xl font-black text-white block">₹10.24L Cr</span>
                  <span className="text-[10px] sm:text-xs text-gray-300 font-medium">Total Market Value</span>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <span className="text-lg sm:text-2xl font-black text-[#167C80] block">18.8%</span>
                  <span className="text-[10px] sm:text-xs text-gray-300 font-medium">Annual Growth Rate</span>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <span className="text-lg sm:text-2xl font-black text-[#FAF8F2] block">95.5%</span>
                  <span className="text-[10px] sm:text-xs text-gray-300 font-medium">Freehold Market Share</span>
                </div>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setMarketTab("quarterly")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  marketTab === "quarterly"
                    ? "bg-[#D6B36A] text-[#14263D] shadow-md font-bold"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                Quarterly Growth Analysis
              </button>
              <button
                onClick={() => setMarketTab("locations")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  marketTab === "locations"
                    ? "bg-[#D6B36A] text-[#14263D] shadow-md font-bold"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                Top Performing Locations
              </button>
              <button
                onClick={() => setMarketTab("segments")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  marketTab === "segments"
                    ? "bg-[#D6B36A] text-[#14263D] shadow-md font-bold"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                Market Value & Ownership Distribution
              </button>
            </div>

            {/* Tab 1 Content: Quarterly Growth Analysis & Property Segments Table */}
            {marketTab === "quarterly" && (
              <div className="mt-8 space-y-6 animate-in fade-in duration-300">
                {/* Summary Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#167C80]/20 p-5 rounded-2xl border border-[#167C80]/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#167C80] text-white flex items-center justify-center font-bold">
                      Q1
                    </div>
                    <div>
                      <span className="text-xs text-gray-300 block">Q1 Recorded Momentum</span>
                      <span className="text-base font-bold text-white">58,488 Transactions • ₹4.58L Cr Value</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D6B36A] text-[#14263D] flex items-center justify-center font-bold">
                      Q2
                    </div>
                    <div>
                      <span className="text-xs text-gray-300 block">Q2 Surge in Freehold Demand</span>
                      <span className="text-base font-bold text-[#D6B36A]">+19.3% Growth in Foreign Buyer Acquisitions</span>
                    </div>
                  </div>
                </div>

                {/* Data Table Matching Reference */}
                <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/5">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/15 bg-white/10 text-[#D6B36A] uppercase text-[11px] tracking-wider font-bold">
                        <th className="py-4 px-5">Property Segment</th>
                        <th className="py-4 px-5">Q1 Transactions</th>
                        <th className="py-4 px-5">Q2 Transactions</th>
                        <th className="py-4 px-5">Total Share</th>
                        <th className="py-4 px-5 text-right">Growth Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {propertySegments.map((row, i) => (
                        <tr
                          key={i}
                          className={`hover:bg-white/10 transition-colors ${
                            row.highlight ? "font-semibold" : "text-gray-300"
                          }`}
                        >
                          <td className="py-4 px-5 flex items-center gap-2 text-white">
                            <span className="w-2 h-2 rounded-full bg-[#167C80]" />
                            {row.name}
                          </td>
                          <td className="py-4 px-5 text-gray-200">{row.q1}</td>
                          <td className="py-4 px-5 text-gray-200">{row.q2}</td>
                          <td className="py-4 px-5 text-[#FAF8F2]">{row.share}</td>
                          <td className="py-4 px-5 text-right">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                row.growth.startsWith("+")
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              }`}
                            >
                              {row.growth}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2 Content: Top Performing Locations */}
            {marketTab === "locations" && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {topLocations.map((loc, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#D6B36A] transition-all hover:-translate-y-1 group"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={loc.image}
                        alt={loc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14263D] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#14263D]/80 backdrop-blur-md text-[10px] font-bold text-[#D6B36A] border border-[#D6B36A]/40 uppercase tracking-wide">
                        {loc.tag}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white group-hover:text-[#D6B36A] transition-colors">
                          {loc.name}
                        </h4>
                        <span className="text-xs font-bold text-emerald-400">{loc.growth}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-white/10">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Avg Price</span>
                          <span className="font-bold text-white">{loc.avgPrice}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Rental Yield</span>
                          <span className="font-bold text-[#167C80]">{loc.rentalYield}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {loc.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3 Content: Market Value & Distribution */}
            {marketTab === "segments" && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                {/* Distribution Box 1: Ownership */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-base font-bold text-white mb-2">
                    Ownership Type Distribution
                  </h4>
                  <p className="text-xs text-gray-300 mb-6">
                    Freehold property dominates 95.5% of the total transaction volume in the emirate, underscoring global confidence in direct deed title.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Freehold Zone Properties</span>
                        <span className="text-[#D6B36A]">95.5%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#D6B36A] to-[#167C80] w-[95.5%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Non-Freehold / Leasehold</span>
                        <span className="text-gray-400">4.5%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-white/30 w-[4.5%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distribution Box 2: Residential vs Commercial */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-base font-bold text-white mb-2">
                    Property Segment Distribution
                  </h4>
                  <p className="text-xs text-gray-300 mb-6">
                    Residential properties make up 97.2% of investor purchases, propelled by end-user migration, luxury off-plan launches, and high tenancy rates.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Residential (Apartments & Villas)</span>
                        <span className="text-[#167C80]">97.2%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-[#167C80] w-[97.2%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Commercial & Retail Assets</span>
                        <span className="text-gray-400">2.8%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-white/30 w-[2.8%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: VISION 2040: WHAT THE FUTURE HOLDS
            Dubai 2040 Urban Master Plan Transformation Strategy
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-[#FAF8F2] border-b border-[#E6E3DC]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Context & Master Plan Strategy */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold tracking-widest text-[#167C80] uppercase block">
                  Future-Proof Urban Planning
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight leading-tight">
                  Vision 2040: What the Future Holds
                </h2>
                <p className="text-sm sm:text-base text-[#697386] leading-relaxed">
                  Dubai’s 2040 Urban Master Plan is not just a development blueprint — it’s a transformation strategy. The city is set to evolve into a global hub of innovation, sustainability, and inclusive growth.
                </p>
                <p className="text-sm sm:text-base text-[#697386] leading-relaxed">
                  Long-term demand for housing, rising property values, and a robust ecosystem where real estate assets grow with the city. Invest now to ride this upward curve.
                </p>

                <div className="pt-2">
                  <a
                    href="#talk-consultant"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#167C80] hover:text-[#14263D] transition-colors"
                  >
                    <span>Consult on High-Growth 2040 Corridors</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: 4 Master Plan Strategy Pillars */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E6E3DC] shadow-sm hover:border-[#167C80] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#167C80] flex items-center justify-center font-bold text-sm mb-4">
                    01
                  </div>
                  <h4 className="text-base font-bold text-[#14263D] mb-2">
                    Massive Infrastructure Expansion
                  </h4>
                  <p className="text-xs text-[#697386] leading-relaxed">
                    Metro Blue Line extensions, new economic corridors, Al Maktoum Airport expansion, and Expo City legacy zones connecting key urban centers.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E6E3DC] shadow-sm hover:border-[#167C80] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#167C80] flex items-center justify-center font-bold text-sm mb-4">
                    02
                  </div>
                  <h4 className="text-base font-bold text-[#14263D] mb-2">
                    Wellness, Mobility & Smart Housing
                  </h4>
                  <p className="text-xs text-[#697386] leading-relaxed">
                    20-minute city concept: 80% of daily necessities reachable within a 20-minute walk or cycle, elevating tenant livability and rental demand.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E6E3DC] shadow-sm hover:border-[#167C80] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#167C80] flex items-center justify-center font-bold text-sm mb-4">
                    03
                  </div>
                  <h4 className="text-base font-bold text-[#14263D] mb-2">
                    Five Major Urban Centres
                  </h4>
                  <p className="text-xs text-[#697386] leading-relaxed">
                    Development of Deira/Bur Dubai, Downtown/Business Bay, Dubai Marina/JBR, Expo 2020 Centre, and Dubai Silicon Oasis to balance population.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E6E3DC] shadow-sm hover:border-[#167C80] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F2] text-[#167C80] flex items-center justify-center font-bold text-sm mb-4">
                    04
                  </div>
                  <h4 className="text-base font-bold text-[#14263D] mb-2">
                    60% Green & Nature Reserves
                  </h4>
                  <p className="text-xs text-[#697386] leading-relaxed">
                    60% of the emirate will comprise protected green reserves, public parks, and eco-tourism corridors, enhancing long-term environmental prestige.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: THE DESK THAT OPENS DOORS / FROM DISCOVERY TO DEAL
            Process Journey with Dual UAE & India Presence
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-[#E6E3DC]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold tracking-widest text-[#167C80] uppercase block mb-2">
                End-to-End Concierge
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
                The Desk that Opens Doors
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#697386] leading-relaxed">
                At Dubai Desk, we’re more than consultants — we’re your investment partners. With expertise across Indian and UAE real estate, we guide NRIs, expats, and first-time investors through the Dubai market with clarity and confidence.
              </p>
              <p className="mt-2 text-sm sm:text-base text-[#697386] leading-relaxed">
                Our approach is collaborative, insight-led, and focused on long-term value. We’re here to simplify the process, offer tailored advice, and support you every step of the way.
              </p>
            </div>

            {/* From Discovery to Deal Stepper Header */}
            <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-[#FAF8F2] border border-[#E6E3DC]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E6E3DC]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D6B36A] block">
                    Execution Methodology
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#14263D]">
                    From Discovery to Deal
                  </h3>
                  <p className="text-xs sm:text-sm text-[#697386] mt-1">
                    AuraLiving handles everything — from property search to paperwork ensuring a smooth, transparent, and hassle-free experience.
                  </p>
                </div>

                <a
                  href="#talk-consultant"
                  className="px-5 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#1A3353] text-[#FAF8F2] text-xs font-bold uppercase tracking-wider shrink-0 transition-all self-start md:self-auto"
                >
                  Start Your Journey
                </a>
              </div>

              {/* 4 Process Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {/* Step 1 */}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#14263D] text-[#D6B36A] flex items-center justify-center font-bold text-sm shadow-md">
                    01
                  </div>
                  <h4 className="text-base font-bold text-[#14263D]">
                    Requirement & ROI Analysis
                  </h4>
                  <p className="text-xs text-[#697386] leading-relaxed">
                    We evaluate your investment horizon, yield goals, tax advantages, and Golden Visa eligibility to create a targeted strategy.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#167C80] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    02
                  </div>
                  <h4 className="text-base font-bold text-[#14263D]">
                    Curated Shortlists & Virtual Tours
                  </h4>
                  <p className="text-xs text-[#697386] leading-relaxed">
                    With teams based in the UAE and India, we offer real-time coordination, live HD video tours, and ground-level developer vetting.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#D6B36A] text-[#14263D] flex items-center justify-center font-bold text-sm shadow-md">
                    03
                  </div>
                  <h4 className="text-base font-bold text-[#14263D]">
                    Legal Diligence & DLD Compliance
                  </h4>
                  <p className="text-xs text-[#697386] leading-relaxed">
                    100% escrow account verification, Sales and Purchase Agreement (SPA) vetting, and zero-jargon cross-border advisory.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#14263D] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    04
                  </div>
                  <h4 className="text-base font-bold text-[#14263D]">
                    Handover & Turnkey Leasing
                  </h4>
                  <p className="text-xs text-[#697386] leading-relaxed">
                    Key handover coordination, snagging audit, tenant onboarding, and continuous rental disbursement into your offshore or local bank.
                  </p>
                </div>
              </div>

              {/* Multilingual Support Banner */}
              <div className="mt-8 pt-6 border-t border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#697386]">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[#167C80]" />
                  <span>
                    <strong>Support in Multiple Languages:</strong> English, Hindi, Telugu, Marathi, Gujarati & Arabic.
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#14263D] font-semibold">
                  <span>No jargon. No pushy sales. Transparent developer-direct terms.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: QUICK GUIDES (VIDEO REELS & INSIGHTS)
            Interactive Video Reels with Modal Player
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-[#FAF8F2] border-b border-[#E6E3DC]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#167C80] uppercase block mb-1">
                  Video Intelligence
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
                  Quick Guides
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#697386]">
                  Your rapid-fire guide to understanding Dubai — areas, trends, and smart moves.
                </p>
              </div>

              <div className="text-xs font-semibold text-[#167C80] flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Click any card to watch guide</span>
              </div>
            </div>

            {/* 6 Video Reel Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mt-10">
              {videoReels.map((reel) => (
                <div
                  key={reel.id}
                  onClick={() => setSelectedVideo(reel)}
                  className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-[#14263D] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#E6E3DC] hover:border-[#D6B36A]"
                >
                  {/* Poster Image */}
                  <img
                    src={reel.poster}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14263D] via-[#14263D]/40 to-black/30" />

                  {/* Top Tag Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-bold text-white border border-white/30 uppercase">
                    {reel.tag}
                  </div>

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#D6B36A] text-[#14263D] flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="text-xs font-bold leading-snug line-clamp-2">
                      {reel.title}
                    </h4>
                    <p className="text-[10px] text-gray-300 mt-1 line-clamp-1 font-normal">
                      {reel.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Reel Modal Player */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-[#14263D] rounded-2xl overflow-hidden max-w-md w-full border border-[#D6B36A]/40 shadow-2xl relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D6B36A] font-bold block">
                    {selectedVideo.tag}
                  </span>
                  <h4 className="text-sm font-bold truncate max-w-[280px]">
                    {selectedVideo.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-[9/16] max-h-[580px] bg-black relative">
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 bg-[#14263D] text-center border-t border-white/10">
                <a
                  href="#talk-consultant"
                  onClick={() => setSelectedVideo(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#D6B36A] hover:underline"
                >
                  <span>Have questions on this topic? Talk to Dubai Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 8: WHAT OUR HAPPY CUSTOMERS SAY! (TESTIMONIALS)
            Verified International Investor Reviews
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-[#E6E3DC]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold tracking-widest text-[#167C80] uppercase block mb-2">
                Investor Experiences
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14263D] tracking-tight">
                What our Happy Customers say!
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#697386]">
                Read genuine feedback from cross-border investors who acquired high-performing Dubai assets through our desk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-7 bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#167C80] transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 text-[#D6B36A] mb-4">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-[#252525] leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E6E3DC] flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#14263D]">{item.name}</h4>
                      <p className="text-[11px] text-[#697386]">{item.role}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-[#E6E3DC] text-[#167C80]">
                      {item.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: TALK TO A DUBAI DESK CONSULTANT TODAY
            Comprehensive Lead Form & Contact Suite in Deep Navy (#14263D)
        ========================================================================== */}
        <section
          id="talk-consultant"
          className="py-16 sm:py-24 bg-gradient-to-b from-[#14263D] to-[#0D1929] text-white relative overflow-hidden"
        >
          {/* Subtle Background Ornament */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#167C80]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D6B36A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Direct Phone, WhatsApp, and Presence Details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#D6B36A] uppercase block mb-2">
                    Let&apos;s Connect
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    Talk to a Dubai Desk Consultant Today
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#E6E3DC]/90 leading-relaxed">
                    Your goals. Our guidance. Let’s make it happen — in Dubai.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  {/* WhatsApp Direct Option */}
                  <a
                    href="https://wa.me/918080190190?text=Hi%20AuraLiving%20Dubai%20Desk,%20I%20am%20interested%20in%20Dubai%20property%20investment"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">
                        Instant WhatsApp Chat
                      </span>
                      <span className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors">
                        Connect with Dubai Concierge
                      </span>
                      <p className="text-[11px] text-gray-400 mt-0.5">Average response time: &lt; 5 mins</p>
                    </div>
                  </a>

                  {/* Phone Direct Line */}
                  <a
                    href="tel:18008080190"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#D6B36A] text-[#14263D] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">
                        Toll-Free Direct Hotline
                      </span>
                      <span className="text-sm font-bold text-white group-hover:text-[#D6B36A] transition-colors">
                        +91 8080 190190
                      </span>
                      <p className="text-[11px] text-gray-400 mt-0.5">Available Mon–Sat, 9:00 AM – 9:00 PM GST/IST</p>
                    </div>
                  </a>

                  {/* Physical Office Presence */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-[#167C80] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed">
                      <span className="text-[10px] text-[#D6B36A] uppercase tracking-wider block font-bold">
                        Dubai International Office
                      </span>
                      <p className="font-semibold text-white mt-0.5">
                        The Citadel Tower, Al Marasi Dr, Business Bay, Dubai, UAE
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Coordinated with corporate offices in Mumbai, Bengaluru, Pune & Delhi NCR.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Full Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-6 sm:p-9 text-[#252525] shadow-2xl border border-[#D6B36A]/40">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#14263D]">
                    Schedule Your Free Private Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#697386] mt-1 mb-6">
                    Fill out the form below. An accredited AuraLiving Dubai specialist will prepare a customized portfolio recommendation.
                  </p>

                  {formSubmitted ? (
                    <div className="py-12 text-center space-y-4 animate-in fade-in">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-bold text-[#14263D]">
                        Inquiry Received Successfully!
                      </h4>
                      <p className="text-sm text-[#697386] max-w-md mx-auto">
                        Thank you for reaching out to AuraLiving Dubai Desk. Our senior investment director will contact you via WhatsApp and email with verified project sheets.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl bg-[#14263D] text-white font-semibold text-xs transition-all hover:bg-[#1A3353]"
                      >
                        Submit another requirement
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 rounded-xl border border-[#E6E3DC] text-xs sm:text-sm focus:ring-2 focus:ring-[#167C80] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#E6E3DC] text-xs sm:text-sm focus:ring-2 focus:ring-[#167C80] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Country Code
                          </label>
                          <select
                            value={formData.countryCode}
                            onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                            className="w-full px-2 py-3 rounded-xl border border-[#E6E3DC] text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#167C80] outline-none"
                          >
                            <option value="+971">🇦🇪 +971 (UAE)</option>
                            <option value="+91">🇮🇳 +91 (India)</option>
                            <option value="+1">🇺🇸 +1 (US/CA)</option>
                            <option value="+44">🇬🇧 +44 (UK)</option>
                            <option value="+65">🇸🇬 +65 (SG)</option>
                            <option value="+966">🇸🇦 +966 (KSA)</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Phone number"
                            className="w-full px-4 py-3 rounded-xl border border-[#E6E3DC] text-xs sm:text-sm focus:ring-2 focus:ring-[#167C80] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Target Investment Budget
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#E6E3DC] text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#167C80] outline-none"
                          >
                            <option value="">Select Target Budget</option>
                            <option value="AED 1M - 2M">AED 1M – 2M (₹2.25 Cr – ₹4.5 Cr)</option>
                            <option value="AED 2M - 5M">AED 2M – 5M (Golden Visa Eligible)</option>
                            <option value="AED 5M - 10M">AED 5M – 10M (Luxury Waterfront)</option>
                            <option value="AED 10M+">AED 10M+ (High-Yield Portfolios)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Preferred Asset Type
                          </label>
                          <select
                            value={formData.propertyType}
                            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#E6E3DC] text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#167C80] outline-none"
                          >
                            <option value="Luxury Apartment">Luxury High-Rise Apartment</option>
                            <option value="Waterfront Villa">Waterfront / Island Villa</option>
                            <option value="Off-plan High Yield">Off-plan Pre-Launch with Payment Plan</option>
                            <option value="Commercial Office">Commercial Grade-A Office Space</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Specific Requirements or Preferred Locations (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="e.g. Interested in Downtown or Marina with a 60/40 payment plan..."
                          className="w-full px-4 py-3 rounded-xl border border-[#E6E3DC] text-xs sm:text-sm focus:ring-2 focus:ring-[#167C80] outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D6B36A] via-[#D6B36A] to-[#B89243] hover:from-[#E2C37E] hover:to-[#C69E4E] text-[#14263D] font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {formLoading ? (
                          <span>Submitting...</span>
                        ) : (
                          <>
                            <span>Connect with Dubai Desk Advisor</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#167C80]" />
                          DLD & RERA Regulated
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#167C80]" />
                          0% Buyer Commission
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#167C80]" />
                          100% Escrow Account Safety
                        </span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
