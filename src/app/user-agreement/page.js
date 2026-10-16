"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import { FileText, CheckCircle2, Home } from "lucide-react";

export default function UserAgreementPage() {
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
            <li className="font-semibold text-[#252525]">User Agreement & Terms of Service</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Platform Terms & Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            User Agreement
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
            Effective Date: January 2025 • AuraLiving Platform Governance
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-[#252525] space-y-6 text-sm leading-relaxed border-t border-[#E8E3DA] pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">1. Acceptance of Terms</h2>
            <p className="text-[#6B7280]">
              By accessing or using the AuraLiving website, mobile portals, calculators, or associated real estate services, you agree to be bound by this User Agreement. If you disagree with any part of these terms, please refrain from using our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">2. Scope of Advisory Services</h2>
            <p className="text-[#6B7280]">
              AuraLiving provides digital property discovery, builder project showcases, financial calculation utilities (such as EMI, Stamp Duty, and Investment calculators), and concierge advisory assistance. All project details, prices, availability, and floor plans are sourced from authorized developers and public RERA filings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">3. Property Postings & Submissions</h2>
            <p className="text-[#6B7280]">
              Users posting individual resale or rental properties warrant that they are the legal owners or authorized representatives. AuraLiving reserves the right to screen, verify, or decline listings that do not meet verification standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">4. Intellectual Property</h2>
            <p className="text-[#6B7280]">
              All brand logos, trademarks, interactive tools, and editorial content on AuraLiving are the intellectual property of AuraLiving or its respective developer partners.
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
