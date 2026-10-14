"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Train,
  Car,
  MapPin,
  ArrowLeft,
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Building,
  ChevronRight,
  ChevronDown,
  Navigation,
  Compass
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import CommuteTimeModal from "@/components/common/CommuteTimeModal";
import ConsultationForm from "@/components/home/ConsultationForm";
import RailNetworkMap from "@/components/transit/RailNetworkMap";
import { CITIES } from "@/data";
import { getRailTransitForCity, getCityDetails } from "@/data/cityData";
import { POPULAR_RAIL_HUBS } from "@/data/mumbaiTransitData";

function RailNetworkPageContent() {
  const params = useParams();
  const router = useRouter();

  const rawCityParam = params?.city;
  const cityParam = Array.isArray(rawCityParam) ? rawCityParam[0] : rawCityParam || "mumbai";
  const cityId = cityParam.toLowerCase().trim();

  const matchedCity = useMemo(() => {
    return (
      CITIES.find(
        (c) => c.id.toLowerCase() === cityId || c.name.toLowerCase() === cityId.replace(/-/g, " ")
      ) || CITIES[0]
    );
  }, [cityId]);

  const railData = useMemo(() => {
    return getRailTransitForCity(matchedCity.id);
  }, [matchedCity.id]);

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCommuteModalOpen, setIsCommuteModalOpen] = useState(false);

  // Back button returning to originating City page
  const handleBack = () => {
    if (
      typeof window !== "undefined" &&
      window.history.length > 1 &&
      document.referrer &&
      document.referrer.includes(window.location.host) &&
      !document.referrer.endsWith(window.location.pathname)
    ) {
      router.back();
    } else {
      router.push(`/${matchedCity.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Global Header */}
      <Header
        selectedCity={matchedCity.id}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Breadcrumbs & Back Navigation Header */}
      <div className="bg-white border-b border-[#E8E3DA] py-2.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-[#FBF1DF] text-xs font-bold text-[#252525] hover:text-[#AE7419] transition-all cursor-pointer shadow-2xs shrink-0 group"
              title={`Back to ${matchedCity.name} City Page`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D29324] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>

            <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link href="/" className="hover:text-[#D29324] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href={`/${matchedCity.id}`} className="hover:text-[#D29324] transition-colors capitalize">
                {matchedCity.name}
              </Link>
              <span>/</span>
              <span className="text-[#AE7419] font-bold">Rail Network</span>
            </nav>
          </div>

          <Link
            href={`/${matchedCity.id}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#AE7419] hover:text-[#D29324] shrink-0 transition-colors"
          >
            <span>{matchedCity.name} City Overview</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10 flex-1">
        {/* 3. Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF1DF] text-[#AE7419] text-xs font-extrabold uppercase tracking-wider">
            <Train className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Interactive Transit Map</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#252525] tracking-tight">
            Explore Properties by Rail Network in {matchedCity.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-3xl leading-relaxed">
            Navigate Mumbai&apos;s Western, Central, Harbour, and Trans-Harbour suburban rail corridors. Inspect station nodes, average capital rates, and discover verified zero-brokerage homes within walking distance.
          </p>
        </div>

        {/* 4. Prominent Interactive Rail Network Map */}
        <section aria-label="Interactive Rail Network Map">
          <RailNetworkMap
            cityId={matchedCity.id}
            onOpenCommuteModal={() => setIsCommuteModalOpen(true)}
          />
        </section>

        {/* 5. Popular Stations Section (Matching PropertyPistol PopularStations) */}
        <section className="space-y-5 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prime Interchanges</span>
              </div>
              <h2 className="text-2xl font-black text-[#252525] tracking-tight">
                Popular Stations in {matchedCity.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Key transportation and residential junctions with high connectivity and strong capital appreciation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCommuteModalOpen(true)}
              className="text-xs font-bold text-[#AE7419] hover:text-[#D29324] transition-colors hidden sm:flex items-center gap-1 cursor-pointer"
            >
              <span>Calculate Commute Time</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POPULAR_RAIL_HUBS.map((station) => (
              <div
                key={station.id}
                className="bg-white rounded-3xl border border-[#E8E3DA] p-5 shadow-xs hover:shadow-lg hover:border-[#D29324] transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded-md">
                      {station.tag}
                    </span>
                    <Train className="w-4 h-4 text-gray-400 group-hover:text-[#D29324] transition-colors" />
                  </div>

                  <h3 className="text-base font-extrabold text-[#252525] group-hover:text-[#AE7419] transition-colors">
                    {station.name}
                  </h3>

                  <div className="text-[11px] text-[#6B7280] font-medium">
                    {station.line}
                  </div>

                  <div className="pt-2 border-t border-[#E8E3DA] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-extrabold text-[#252525] block">{station.avgPrice}</span>
                      <span className="text-[10px] text-[#6B7280]">Avg price per sqft</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#D29324] block">{station.projects}</span>
                      <span className="text-[10px] text-[#6B7280]">New Projects</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <Link
                  href={`/${matchedCity.id}?search=${encodeURIComponent(station.name)}`}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F4] group-hover:bg-[#D29324] text-[#AE7419] group-hover:text-white border border-[#E8E3DA] group-hover:border-[#D29324] text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Near {station.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Commute Time Feature Showcase Card */}
        <section className="bg-gradient-to-r from-[#252525] via-[#2d2d2d] to-[#1f1f1f] text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE2A7] bg-white/10 px-3 py-1 rounded-full inline-block">
              Time-Based Property Discovery
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Filter Homes by Commute Time to Your Workplace
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Don&apos;t limit your search by municipal ward boundaries. Calculate real door-to-door transit times to BKC, Lower Parel, SEEPZ, or Airoli and explore residential nodes within 15 to 45 minutes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCommuteModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Launch Commute Calculator</span>
          </button>
        </section>

        {/* 7. Free Expert Consultation Form */}
        <ConsultationForm selectedCity={matchedCity.id} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={matchedCity.id}
        onSelectCity={(newCity) => {
          setIsCityModalOpen(false);
          router.push(`/rail-network/${newCity}`);
        }}
      />

      <CommuteTimeModal
        isOpen={isCommuteModalOpen}
        onClose={() => setIsCommuteModalOpen(false)}
        cityId={matchedCity.id}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}

export default function RailNetworkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RailNetworkPageContent />
    </Suspense>
  );
}
