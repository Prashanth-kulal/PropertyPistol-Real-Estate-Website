"use client";

import React, { useState, useMemo, Suspense, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Download,
  Building,
  Heart,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Award,
  Crown,
  Quote,
  Star,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  ArrowUpRight,
  Train,
  Car,
  TrendingUp,
  BarChart3
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import AuraShots from "@/components/home/AuraShots";
import ConsultationForm from "@/components/home/ConsultationForm";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";
import EmiCalculatorModal from "@/components/common/EmiCalculatorModal";
import UnitConverterModal from "@/components/common/UnitConverterModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import CommuteTimeModal from "@/components/common/CommuteTimeModal";
import WishlistButton from "@/components/common/WishlistButton";
import { CITIES, DEVELOPERS, getProjectSlug } from "@/data";
import {
  getCityDetails,
  getPropertiesForCity,
  getPriceTrendsForCity,
  getRailTransitForCity
} from "@/data/cityData";

function CityPageContent() {
  const params = useParams();
  const router = useRouter();

  // Normalize city parameter
  const rawCityParam = params?.city;
  const cityParam = Array.isArray(rawCityParam) ? rawCityParam[0] : rawCityParam || "mumbai";
  const cityId = cityParam.toLowerCase().trim();

  // Find matching city in registered CITIES
  const matchedCity = useMemo(() => {
    return CITIES.find(
      (c) => c.id.toLowerCase() === cityId || c.name.toLowerCase() === cityId.replace(/-/g, " ")
    );
  }, [cityId]);

  const cityData = useMemo(() => {
    return getCityDetails(matchedCity ? matchedCity.id : cityId);
  }, [matchedCity, cityId]);

  const cityProperties = useMemo(() => {
    return getPropertiesForCity(matchedCity ? matchedCity.id : cityId);
  }, [matchedCity, cityId]);

  const railData = useMemo(() => {
    return getRailTransitForCity(matchedCity ? matchedCity.id : cityId);
  }, [matchedCity, cityId]);

  const priceTrendsData = useMemo(() => {
    return getPriceTrendsForCity(matchedCity ? matchedCity.id : cityId);
  }, [matchedCity, cityId]);

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isConverterModalOpen, setIsConverterModalOpen] = useState(false);
  const [isCommuteModalOpen, setIsCommuteModalOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState(null);

  // Search query & filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [toastMessage, setToastMessage] = useState("");

  // Sliders refs
  const trendingSliderRef = useRef(null);
  const featuredSliderRef = useRef(null);
  const newProjectsSliderRef = useRef(null);
  const localitiesSliderRef = useRef(null);
  const developersSliderRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleToggleWishlist = (projectId, e) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const updated = !prev[projectId];
      showToast(updated ? "Added to your saved wishlist!" : "Removed from your saved wishlist.");
      return { ...prev, [projectId]: updated };
    });
  };

  const scrollSlider = (ref, offset) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Filter properties by search or locality
  const displayedTrending = useMemo(() => {
    let list = [...cityProperties];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.builder.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    if (selectedLocality) {
      const locQ = selectedLocality.toLowerCase();
      list = list.filter((p) => p.location.toLowerCase().includes(locQ));
    }
    return list;
  }, [cityProperties, searchQuery, selectedLocality]);

  // Featured and New projects subsets
  const displayedFeatured = useMemo(() => {
    return cityProperties.filter((p) => p.tag === "Featured" || p.status === "Ready to Move").slice(0, 6);
  }, [cityProperties]);

  const displayedNewLaunches = useMemo(() => {
    return cityProperties.filter((p) => p.status === "New Launch" || p.status === "Under Construction").slice(0, 6);
  }, [cityProperties]);

  // If unknown city with no match
  if (!matchedCity && cityProperties.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-[#252525]">
        <Header
          selectedCity="mumbai"
          onOpenCityModal={() => setIsCityModalOpen(true)}
          onOpenAiModal={() => setIsAiModalOpen(true)}
        />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center mx-auto shadow-sm">
            <MapPin className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#252525]">
            City Not Found: &ldquo;{cityParam}&rdquo;
          </h1>
          <p className="text-sm text-[#6B7280] max-w-lg leading-relaxed">
            We currently curate exclusive, verified zero-brokerage properties across 18 major metropolitan hubs in India &amp; UAE. Please explore one of our top active metros below:
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 pt-4 max-w-2xl">
            {CITIES.map((c) => (
              <Link
                key={c.id}
                href={`/${c.id}`}
                className="px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-xs font-bold text-[#252525] hover:border-[#D29324] hover:text-[#AE7419] transition-all shadow-xs"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all shadow-md"
            >
              <span>Back to AuraLiving Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Reusable Property Card matching PropertyPistol layout
  const renderPropertyCard = (project) => {
    const isSaved = !!wishlist[project.id];
    const image = project.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";
    const projectSlug = getProjectSlug(project);

    return (
      <div
        key={project.id}
        className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
      >
        {/* Card Header & Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <Link href={`/projects/${projectSlug}`} className="block w-full h-full">
            <img
              src={image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            {project.tag && (
              <span className="px-2 py-0.5 rounded-md bg-[#D29324] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                {project.tag}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
              {project.status}
            </span>
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-20">
            <WishlistButton project={project} size="md" variant="floating" />
          </div>

          {/* Price Tag Overlay */}
          <Link href={`/projects/${projectSlug}`} className="absolute bottom-3 inset-x-3 flex items-end justify-between z-10 text-white">
            <div>
              <div className="text-lg font-black drop-shadow-sm">
                ₹{project.price}
              </div>
              <div className="text-[10px] text-gray-200 font-semibold drop-shadow-xs">
                {project.avgPrice}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded text-gray-200 font-mono">
                {project.rera ? "RERA" : "Verified"}
              </span>
            </div>
          </Link>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-[#AE7419] block uppercase tracking-wide truncate">
              {project.builder}
            </span>

            <Link href={`/projects/${projectSlug}`}>
              <h3 className="text-sm font-extrabold text-[#252525] line-clamp-1 group-hover:text-[#D29324] transition-colors">
                {project.name}
              </h3>
            </Link>

            <div className="flex items-center gap-1 text-xs text-[#6B7280]">
              <MapPin className="w-3.5 h-3.5 text-[#AE7419] shrink-0" />
              <span className="truncate">{project.location}</span>
            </div>

            <div className="pt-2 border-t border-[#E8E3DA] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#252525]">{project.flatTypes}</span>
              <span className="text-[11px] text-[#6B7280]">{project.carpetArea}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 border-t border-[#E8E3DA] flex items-center gap-2">
            <button
              type="button"
              onClick={() => setInquiryProject(project)}
              className="flex-1 py-2 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Callback</span>
            </button>

            <Link
              href={`/projects/${projectSlug}`}
              className="px-3 py-2 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-[#252525] hover:text-[#AE7419] text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
              title="View Project"
            >
              View
            </Link>

            <button
              type="button"
              onClick={() => showToast(`Brochure for ${project.name} sent to your email!`)}
              className="p-2 rounded-xl border border-[#E8E3DA] text-[#6B7280] hover:text-[#AE7419] hover:bg-[#FAF8F4] transition-all cursor-pointer"
              title="Download Brochure"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#252525] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Global Header with Selected City */}
      <Header
        selectedCity={matchedCity ? matchedCity.id : cityId}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onSearchQuery={(q) => setSearchQuery(q)}
      />

      {/* 2. Breadcrumbs matching PropertyPistol */}
      <div className="bg-[#FAF8F4] border-b border-[#E8E3DA] py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
            <Link href="/" className="hover:text-[#D29324] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#AE7419] font-bold capitalize">
              {cityData.name}
            </span>
          </nav>
        </div>
      </div>

      {/* 3. Hero Banner & Search Area (Pre-selected to this City) */}
      <HeroBanner
        selectedCity={matchedCity ? matchedCity.id : cityId}
        isCityPage={true}
        onSelectCity={(newCityId) => router.push(`/${newCityId}`)}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenCommuteModal={() => setIsCommuteModalOpen(true)}
        onSearch={(query) => setSearchQuery(query)}
      />

      {/* EXPLORE CATEGORIES IN [CITY] SECTION */}
      <section className="py-12 bg-[#FAF8F4] border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Verified Classifications</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                Explore Categories in {cityData.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                Navigate directly to verified developments by handover status, RERA audit, or builder allocations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {[
              {
                title: "New Projects",
                slug: `new-projects-in-${cityData.id}`,
                desc: "Upcoming & newly launched residential towers",
                icon: Building,
                badge: "Pre-Launch Offers"
              },
              {
                title: "Ready to Move",
                slug: `ready-to-move-properties-in-${cityData.id}`,
                desc: "100% completed homes with OC & zero GST",
                icon: CheckCircle2,
                badge: "Immediate Handover"
              },
              {
                title: "Under Construction",
                slug: `under-construction-properties-in-${cityData.id}`,
                desc: "Ongoing developments with milestone plans",
                icon: Clock,
                badge: "High Appreciation"
              },
              {
                title: "RERA Compliant",
                slug: `rera-compliant-properties-in-${cityData.id}`,
                desc: "State RERA audited & carpet guaranteed",
                icon: ShieldCheck,
                badge: "100% Verified"
              },
              {
                title: "Developer Listings",
                slug: `developer-listings-in-${cityData.id}`,
                desc: "Direct Grade-A builder allocations",
                icon: Crown,
                badge: "Direct Allotment"
              }
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/${cityData.id}/buy/${cat.slug}`}
                  className="bg-white rounded-2xl border border-[#E8E3DA] p-4.5 shadow-xs hover:border-[#D29324] hover:shadow-lg transition-all flex flex-col justify-between space-y-3 group cursor-pointer"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF8F4] group-hover:bg-[#FBF1DF] text-[#D29324] flex items-center justify-center transition-colors shadow-2xs">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded">
                        {cat.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-[#252525] group-hover:text-[#AE7419] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-[#6B7280] leading-snug mt-1">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E8E3DA] flex items-center justify-between text-xs font-bold text-[#AE7419]">
                    <span>Explore &rarr;</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION 1: Trending Projects in [City] */}
      <section className="py-14 bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with "View All" */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Brokerage Portfolio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                Trending Projects in {cityData.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                Handpicked verified developments in {cityData.name} with direct builder pricing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedLocality("")}
                className="text-xs font-bold text-[#AE7419] hover:text-[#D29324] transition-colors hidden sm:block"
              >
                View All &rarr;
              </button>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollSlider(trendingSliderRef, -340)}
                  className="w-9 h-9 rounded-full bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 hover:text-[#AE7419] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider(trendingSliderRef, 340)}
                  className="w-9 h-9 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Project Cards Carousel Track */}
          <div
            ref={trendingSliderRef}
            className="flex items-stretch gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-3 pt-1"
          >
            {displayedTrending.map(renderPropertyCard)}
          </div>
        </div>
      </section>

      {/* 5. SECTION 2: Exclusive Deals in [City] */}
      <section className="py-14 bg-[#FAF8F4] border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
                <Crown className="w-3.5 h-3.5 text-[#D29324]" />
                <span>AuraLiving Signature</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                Exclusive Deals in {cityData.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                Limited allotment inventory and luxury waterfront penthouses in {cityData.name}.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("top-localities");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-bold text-[#AE7419] hover:text-[#D29324] transition-colors hidden sm:block"
            >
              View All &rarr;
            </button>
          </div>

          {/* Exclusive Spotlight Showcase Card */}
          <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] overflow-hidden group">
                <img
                  src={cityProperties[0]?.images?.[1] || cityData.heroImage}
                  alt={cityData.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#D29324] text-white text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Exclusive Pre-Launch</span>
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs text-[#FFE2A7] font-bold block mb-1">
                    Direct Builder Allotment
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">
                    {cityProperties[0]?.name || `Signature Horizon ${cityData.name}`}
                  </h3>
                  <p className="text-xs text-gray-200 mt-1">
                    {cityProperties[0]?.location || cityData.name} &bull; Zero Brokerage Guaranteed
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF8F4] space-y-4">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-md inline-block">
                    Limited Tier Units
                  </span>
                  <h4 className="text-xl font-extrabold text-[#252525]">
                    VIP Access &amp; Spot Booking Benefits
                  </h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Enjoy privileged pre-launch rates, customized payment milestones, and dedicated relationship manager site tours across {cityData.name}.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E8E3DA] text-xs">
                    <div>
                      <span className="text-[10px] text-[#6B7280] block">Avg. Capital Gain</span>
                      <span className="font-extrabold text-[#252525]">{cityData.appreciationRate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7280] block">Gross Rental Yield</span>
                      <span className="font-extrabold text-[#252525]">{cityData.rentalYield}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E3DA]">
                  <button
                    type="button"
                    onClick={() => {
                      setInquiryProject({
                        id: `exclusive-${cityData.id}`,
                        name: `Exclusive Deals in ${cityData.name}`,
                        city: cityData.name
                      });
                    }}
                    className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request VIP Allotment Callback</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 3: Featured Projects in [City] */}
      {displayedFeatured.length > 0 && (
        <section className="py-14 bg-white border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Featured Projects in {cityData.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                  Top-rated gated residential communities with high livability scores.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollSlider(featuredSliderRef, -340)}
                  className="w-9 h-9 rounded-full bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 hover:text-[#AE7419] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider(featuredSliderRef, 340)}
                  className="w-9 h-9 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={featuredSliderRef}
              className="flex items-stretch gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-3 pt-1"
            >
              {displayedFeatured.map(renderPropertyCard)}
            </div>
          </div>
        </section>
      )}

      {/* 7. SECTION 4: New Projects in [City] */}
      {displayedNewLaunches.length > 0 && (
        <section className="py-14 bg-[#FAF8F4] border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  New Projects in {cityData.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                  Newly launched residential towers and upcoming handovers in {cityData.name}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollSlider(newProjectsSliderRef, -340)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 hover:text-[#AE7419] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider(newProjectsSliderRef, 340)}
                  className="w-9 h-9 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={newProjectsSliderRef}
              className="flex items-stretch gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-3 pt-1"
            >
              {displayedNewLaunches.map(renderPropertyCard)}
            </div>
          </div>
        </section>
      )}

      {/* 8. SECTION 5: Top Localities in [City] matching PropertyPistol id="top-localities" */}
      <section id="top-localities" className="py-14 bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Micro-Market Insights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                Top Localities
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                Explore real estate pricing and active developments across prime neighborhoods in {cityData.name}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollSlider(localitiesSliderRef, -300)}
                className="w-9 h-9 rounded-full bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 hover:text-[#AE7419] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider(localitiesSliderRef, 300)}
                className="w-9 h-9 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Localities Track */}
          <div
            ref={localitiesSliderRef}
            className="flex items-stretch gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-3 pt-1"
          >
            {cityData.localities.map((loc, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedLocality(loc.name);
                  const el = document.getElementById("top-projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-[220px] sm:w-[250px] shrink-0 bg-[#FAF8F4] rounded-2xl p-5 border border-[#E8E3DA] hover:border-[#D29324] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded-md inline-block">
                    {loc.tag || "Prime Hub"}
                  </span>
                  <h4 className="text-base font-extrabold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate">
                    {loc.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-[#E8E3DA] text-xs">
                  <span className="font-extrabold text-[#252525] block">
                    {loc.avgPrice}
                  </span>
                  <span className="text-[10px] text-[#6B7280]">
                    Avg price per sq.ft.
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#AE7419] pt-1">
                  <span>{loc.projects} Projects</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Search by Rail Network or Commute Time */}
      <section className="py-14 bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
                <Train className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Transit-Oriented Living</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                Search by Rail Network or Commute Time in {cityData.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                Explore verified developments near prime railway &amp; metro interchanges, or calculate door-to-door commute to work.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsCommuteModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] text-xs font-bold text-[#252525] hover:border-[#D29324] hover:text-[#AE7419] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Car className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Filter by Commute Time</span>
              </button>

              <Link
                href={`/rail-network/${cityData.id}`}
                className="px-4 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>All Rail Stations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Popular Stations Preview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(railData.stations || []).slice(0, 4).map((station) => (
              <div
                key={station.id}
                className="bg-[#FAF8F4] rounded-2xl border border-[#E8E3DA] p-4.5 hover:border-[#D29324] hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] font-bold text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded">
                      {station.tag}
                    </span>
                    <Train className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#D29324]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate">
                    {station.name}
                  </h4>
                  <span className="text-[10px] text-[#6B7280] block mt-0.5 truncate">{station.line}</span>
                </div>

                <div className="pt-2 border-t border-[#E8E3DA] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-[#252525] block">{station.avgPrice}</span>
                    <span className="text-[9px] text-[#6B7280]">Avg rate</span>
                  </div>
                  <Link
                    href={`/${cityData.id}?search=${encodeURIComponent(station.name)}`}
                    className="font-bold text-[#AE7419] hover:underline text-[11px]"
                  >
                    {station.newProjectsCount} Projects &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SECTION 6: Featured Developers in [City] matching PropertyPistol id="featured-developers" */}
      <section id="featured-developers" className="py-14 bg-[#FAF8F4] border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
                <Award className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Tier-1 Construction Quality</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                Featured Developers in {cityData.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                Direct partnerships with India&apos;s leading RERA-registered developers in {cityData.name}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollSlider(developersSliderRef, -280)}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#FBF1DF] border border-[#E8E3DA] text-gray-700 hover:text-[#AE7419] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider(developersSliderRef, 280)}
                className="w-9 h-9 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={developersSliderRef}
            className="flex items-stretch gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-3 pt-1"
          >
            {DEVELOPERS.map((dev) => (
              <div
                key={dev.id}
                onClick={() => setSearchQuery(dev.name)}
                className="w-[200px] sm:w-[220px] shrink-0 bg-white rounded-2xl p-5 border border-[#E8E3DA] text-center shadow-xs hover:border-[#D29324] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F4] text-[#D29324] flex items-center justify-center font-black mx-auto mb-3 text-sm group-hover:bg-[#FBF1DF] transition-colors">
                  {dev.name.slice(0, 2).toUpperCase()}
                </div>
                <h4 className="text-xs font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors truncate">
                  {dev.name}
                </h4>
                <span className="text-[10px] text-[#6B7280] block mt-1">{dev.projects}</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">{dev.experience} Exp.</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Price Trends in [City] Preview */}
      <section className="py-14 bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F4] rounded-3xl border border-[#E8E3DA] p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] text-[#AE7419] text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5 text-[#D29324]" />
                  <span>Real Estate Analytics</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Price Trends in {cityData.name} - 2026
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl leading-relaxed">
                  Average property rates have appreciated by <strong className="text-emerald-600">{priceTrendsData.yoyAppreciation}</strong> over the past year. Track micro-market capital values, rental yield benchmarks, and quarterly historical movements.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D29324]"></span>
                    <span className="text-[#6B7280]">Average Benchmark:</span>
                    <strong className="text-[#252525]">{priceTrendsData.avgPrice}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[#6B7280]">Gross Rental Yield:</span>
                    <strong className="text-[#252525]">{priceTrendsData.rentalYield}</strong>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/${cityData.id}/price-trends`}
                  className="px-6 py-3 rounded-2xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>View Full Price Trends &amp; Charts</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SECTION 7: PropertyPistol Shots / AuraShots */}
      <AuraShots
        onOpenEmi={() => setIsEmiModalOpen(true)}
        onOpenConverter={() => setIsConverterModalOpen(true)}
        onOpenConsultation={() => {
          const el = document.getElementById("consultation_form");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 11. SECTION 8: FREE Expert Consultation matching PropertyPistol id="consultation_form" */}
      <ConsultationForm selectedCity={matchedCity ? matchedCity.id : cityId} />

      {/* 12. SECTION 9: Frequently Asked Questions about [City] */}
      {cityData.faqs && cityData.faqs.length > 0 && (
        <section id="faq0" className="py-16 bg-[#FAF8F4] border-b border-[#E8E3DA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Local Market Knowledge</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Everything you need to know about buying real estate, registration, and documentation in {cityData.name}.
              </p>
            </div>

            <div className="space-y-3">
              {cityData.faqs.map((faq, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all ${
                      isOpen
                        ? "border-[#D29324] bg-white shadow-xs"
                        : "border-[#E8E3DA] bg-white hover:border-gray-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaqIndex(isOpen ? -1 : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-[#252525]">
                        {faq.q}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                          isOpen
                            ? "bg-[#D29324] text-white rotate-180"
                            : "bg-[#FAF8F4] text-gray-500"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs text-[#6B7280] leading-relaxed border-t border-[#E8E3DA] bg-[#FAF8F4]/30">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 13. SECTION 10: Testimonials matching PropertyPistol id="homeTestimonials" */}
      <TestimonialsSection />

      {/* 14. Global Footer */}
      <Footer />

      {/* --- Interactive Modals --- */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={matchedCity ? matchedCity.id : cityId}
        onSelectCity={(newCityId) => {
          setIsCityModalOpen(false);
          router.push(`/${newCityId}`);
        }}
      />

      <ProjectInquiryModal
        isOpen={!!inquiryProject}
        onClose={() => setInquiryProject(null)}
        project={inquiryProject}
      />

      <EmiCalculatorModal
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
      />

      <UnitConverterModal
        isOpen={isConverterModalOpen}
        onClose={() => setIsConverterModalOpen(false)}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectProject={(proj) => setInquiryProject(proj)}
      />

      <CommuteTimeModal
        isOpen={isCommuteModalOpen}
        onClose={() => setIsCommuteModalOpen(false)}
        cityId={matchedCity ? matchedCity.id : cityId}
      />
    </div>
  );
}

export default function CityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CityPageContent />
    </Suspense>
  );
}
