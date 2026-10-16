"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Search,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Tag
} from "lucide-react";

const ARTICLES = [
  {
    id: "mthl-coastal-road-impact",
    title: "Atal Setu & Mumbai Coastal Road: How Mega Infrastructure is Reshaping Property Capital Values",
    category: "Infrastructure",
    readTime: "6 min read",
    date: "October 14, 2026",
    author: "AuraLiving Research Desk",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    excerpt: "With drive times slashed between South Mumbai and Navi Mumbai to under 20 minutes, residential micro-markets like Ulwe, Panvel, and Worli are seeing double-digit capital appreciation.",
    featured: true
  },
  {
    id: "rera-homebuyer-checklist",
    title: "The Ultimate 2026 RERA Diligence Checklist Before Signing an Agreement for Sale",
    category: "Legal & RERA",
    readTime: "5 min read",
    date: "October 08, 2026",
    author: "Adv. Meenakshi Joshi",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    excerpt: "Understand title search reports, sanctioned building plans, MahaRERA escrow compliance, and how to verify developer milestone payment schedules safely."
  },
  {
    id: "home-loan-interest-rates-2026",
    title: "RBI Repo Rate Outlook: Finding the Best Floating & Fixed Mortgage Rates in India",
    category: "Home Loans",
    readTime: "4 min read",
    date: "September 29, 2026",
    author: "Rohan Kapoor, Banking Specialist",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Comparing interest rates across SBI, HDFC, ICICI, and Bank of Baroda. Learn how pre-payment strategies can shave off 5-7 years from your total loan tenure."
  },
  {
    id: "nri-real-estate-investments-guide",
    title: "NRI Real Estate Investment in India: FEMA Guidelines, Tax Liabilities & High-Yield Hubs",
    category: "NRI Advisory",
    readTime: "7 min read",
    date: "September 22, 2026",
    author: "Global NRI Desk",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    excerpt: "A complete step-by-step advisory on NRE/NRO banking, power of attorney execution, DTAA benefits, and maximizing rental returns in Bangalore and Mumbai."
  },
  {
    id: "top-5-pune-localities-2026",
    title: "Top 5 High-Yield Suburban Localities in Pune for First-Time Homebuyers",
    category: "Market Trends",
    readTime: "5 min read",
    date: "September 15, 2026",
    author: "Vikram Sengupta",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=800&q=80",
    excerpt: "Why Hinjawadi Phase 3, Kharadi World Trade Center Corridor, and Wakad continue to outperform traditional central markets in rental yield and capital gains."
  },
  {
    id: "ready-vs-under-construction",
    title: "Ready-to-Move vs Under-Construction: Comprehensive Financial Cost-Benefit Comparison",
    category: "Home Buying Guides",
    readTime: "5 min read",
    date: "September 02, 2026",
    author: "AuraLiving Advisory",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    excerpt: "Weighing the 5% GST exemption on OC-received properties against the attractive launch discounts and milestone payments of new developments."
  }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const categories = ["all", "Infrastructure", "Legal & RERA", "Home Loans", "Market Trends", "Home Buying Guides", "NRI Advisory"];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === "all" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#252525]">
      <Header selectedCity="mumbai" onOpenCityModal={() => {}} onOpenAiModal={() => {}} onSearchQuery={() => {}} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#1F1F1F] via-[#2A2A2A] to-[#1F1F1F] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#D29324] text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>AuraLiving Real Estate Journal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Market Insights, Trends & <span className="text-[#D29324]">Smart Home Buying</span>
          </h1>
          <p className="mt-4 text-gray-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Authoritative research, infrastructure spotlights, legal clarity, and financial guidance from India&apos;s leading property analysts.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search guides, RERA updates, market reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-4 py-3 pl-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D29324] backdrop-blur-md"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </section>

      {/* Featured Article Banner */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative h-64 lg:h-auto min-h-[280px]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#D29324] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                Featured Report
              </div>
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                  <span className="text-[#D29324] font-bold">{featuredArticle.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredArticle.readTime}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1C] leading-snug hover:text-[#D29324] transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">{featuredArticle.author}</span>
                <span className="text-xs font-bold text-[#D29324] flex items-center gap-1 group-hover:underline">
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories & Articles Grid */}
      <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#D29324] text-white shadow-sm"
                  : "bg-white border border-[#E8E3DA] text-gray-700 hover:bg-[#F3EFE6]"
              }`}
            >
              {cat === "all" ? "All Articles" : cat}
            </button>
          ))}
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-sm hover:shadow-md hover:border-[#D29324] transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1C1C1C] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {art.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#1C1C1C] group-hover:text-[#D29324] transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-500 font-medium truncate max-w-[150px]">{art.author}</span>
                  <span className="font-bold text-[#D29324] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E3DA]">
            <p className="text-sm font-semibold text-gray-700">No articles found matching your criteria</p>
            <p className="text-xs text-gray-500 mt-1">Try resetting the category filter or searching for broader terms.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#D29324] text-white text-xs font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="py-14 bg-white border-t border-[#E8E3DA]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-10 h-10 rounded-full bg-[#D29324]/10 text-[#D29324] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-[#1C1C1C]">Get Weekly Real Estate Intelligence</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto">
            Subscribe to our weekly dispatch covering upcoming pre-launches, infra corridors, and exclusive zero-brokerage deals.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 text-xs px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#D29324]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs transition-colors shrink-0 shadow-sm"
            >
              Subscribe Free
            </button>
          </form>

          {subscribed && (
            <p className="text-xs text-green-600 font-semibold mt-3 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing! Check your inbox soon.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
