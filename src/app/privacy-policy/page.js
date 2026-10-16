"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import { ShieldCheck, Lock, Eye, FileText, ChevronRight, Home } from "lucide-react";

export default function PrivacyPolicyPage() {
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

      {/* Breadcrumb */}
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
            <li className="font-semibold text-[#252525]">Privacy Policy</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-3">
            <Lock className="w-3.5 h-3.5 text-[#D29324]" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
            Last Updated: January 2025 • AuraLiving Real Estate Advisory Platform
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-[#252525] space-y-6 text-sm leading-relaxed border-t border-[#E8E3DA] pt-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D29324]" />
              1. Information We Collect
            </h2>
            <p className="text-[#6B7280]">
              At AuraLiving, we respect your personal privacy. We collect information you provide directly when you submit enquiries, register properties, schedule site visits, use our calculators, or communicate with our property advisors. This includes your name, phone number, email address, preferred micro-market location, and budget specifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">2. How We Use Your Information</h2>
            <p className="text-[#6B7280]">
              Your details are used exclusively to facilitate personalized real estate advisory, coordinate authorized builder site visits, provide RERA-verified project brochures, process loan pre-eligibility through partner institutions, and share relevant transaction updates. We do not sell or rent your personal data to unauthorized telemarketers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">3. Zero Brokerage & Channel Partner Transparency</h2>
            <p className="text-[#6B7280]">
              AuraLiving operates as an authorized institutional channel partner for Grade-A developers across India. All project documentation, pricing data, and transaction milestones conform to relevant state Real Estate Regulatory Authority (RERA) guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">4. Data Security</h2>
            <p className="text-[#6B7280]">
              We implement industry-standard 256-bit SSL encryption and strict access control protocols to protect your personal information against unauthorized disclosure, loss, or alteration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#252525]">5. Contact Us</h2>
            <p className="text-[#6B7280]">
              If you have any questions regarding this Privacy Policy or wish to modify your preferences, contact our grievance officer at{" "}
              <a href="mailto:privacy@auraliving.com" className="text-[#AE7419] font-semibold hover:underline">
                privacy@auraliving.com
              </a>{" "}
              or call our toll-free desk at +91 8080 190190.
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
