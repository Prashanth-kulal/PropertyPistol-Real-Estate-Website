"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import { AlertCircle, ShieldCheck, Home } from "lucide-react";

export default function DisclaimerPage() {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      <nav aria-label="Breadcrumb" className="bg-[#FAF8F4] border-b border-[#E8E3DA] py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-xs text-[#6B7280]">
            <li>
              <Link href="/" className="hover:text-[#AE7419] transition-colors flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-[#252525]">RERA & Legal Disclaimer</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-[#D29324]" />
            <span>RERA Compliance & Disclosure Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
            AuraLiving Real Estate Advisory • Transparency & Statutory Disclosures
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-[#252525] space-y-6 text-sm leading-relaxed border-t border-[#E8E3DA] pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D29324]" />
              1. Project Information & Specifications
            </h2>
            <p className="text-[#6B7280]">
              The visual representations, artist impressions, floor plan diagrams, carpet area calculations, and price ranges displayed on AuraLiving are provided for informational guidance only. All project specifications, amenity inclusions, and completion timelines are determined by respective developer entities and are governed by state Real Estate Regulatory Authority (RERA) approvals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">2. Independent Due Diligence</h2>
            <p className="text-[#6B7280]">
              While AuraLiving conducts legal title checks and verifies RERA registration numbers prior to listing any development, prospective purchasers are advised to conduct independent physical inspections, review registered agreements for sale, and verify title encumbrances before executing binding agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">3. Calculator Estimates</h2>
            <p className="text-[#6B7280]">
              All calculations provided on our platform (including EMI Calculator, Stamp Duty Calculator, Unit Converter, and Investment ROI Calculator) are mathematical estimates intended to assist your financial planning. Actual loan sanction terms, interest rates, and municipal stamp duties are subject to banking underwriting and government gazette notifications.
            </p>
          </section>
        </div>
      </main>

      <Footer />

      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(cityId) => setSelectedCity(cityId)}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
