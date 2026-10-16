"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CITIES } from "@/data";
import {
  Compass,
  Building2,
  Layers,
  Calculator,
  ShieldCheck,
  FileText,
  Briefcase,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function SitemapPage() {
  const SITEMAP_SECTIONS = [
    {
      title: "Popular Metro City Portals",
      icon: Building2,
      links: CITIES.map((c) => ({
        label: `Properties in ${c.name}`,
        href: `/${c.id}`
      }))
    },
    {
      title: "Property Buying Categories",
      icon: Layers,
      links: [
        { label: "New Launch Residential Projects", href: "/new-projects" },
        { label: "Ready to Move Flats & Villas", href: "/ready-to-move" },
        { label: "Under Construction Developments", href: "/under-construction" },
        { label: "100% RERA Compliant Homes", href: "/rera-compliant" },
        { label: "Exclusive Developer Listings", href: "/developer-listings" },
        { label: "Post Your Property", href: "/post-property" }
      ]
    },
    {
      title: "Services & Platform Solutions",
      icon: Briefcase,
      links: [
        { label: "Builder Services & Sales Mandates", href: "/builder-service" },
        { label: "Broker Syndicate Partner Program", href: "/services/syndicate" },
        { label: "Radiate Developer Marketing Desk", href: "/services/radiate" },
        { label: "Home Loan Services & Advisory", href: "/loan-service" },
        { label: "Global NRI Investment Desk", href: "/services/nri-desk" },
        { label: "PropCheck Quality Inspection", href: "/propcheck" },
        { label: "Home Inspection Services", href: "/home-inspection-services" },
        { label: "E-Registration Services", href: "/e-registration" },
        { label: "Rent Agreement Assistance", href: "/rent-agreement" }
      ]
    },
    {
      title: "Calculators & Financial Utilities",
      icon: Calculator,
      links: [
        { label: "Home Loan EMI Calculator", href: "/emi-calculator" },
        { label: "Real Estate Investment Calculator", href: "/investment-calculator" },
        { label: "State Stamp Duty & Cess Calculator", href: "/stamp-duty-calculator" },
        { label: "Land & Area Unit Converter", href: "/unit-converter" },
        { label: "HRA Rent Receipt Generator", href: "/rent-receipt-generator" }
      ]
    },
    {
      title: "Market Intelligence & Tools",
      icon: Compass,
      links: [
        { label: "Interactive Rail Transit Map", href: "/rail-network" },
        { label: "City Real Estate Price Trends", href: "/price-trends" },
        { label: "2,000+ Developers Directory", href: "/developers" },
        { label: "Piston AI Property Assistant", href: "/piston-ai" },
        { label: "Saved Properties Wishlist", href: "/wishlist" },
        { label: "Compare Residential Projects", href: "/compare" }
      ]
    },
    {
      title: "Company, Knowledge & Legal",
      icon: ShieldCheck,
      links: [
        { label: "About AuraLiving & Leadership", href: "/about-us" },
        { label: "Why Choose AuraLiving", href: "/why-us" },
        { label: "Careers & Open Positions", href: "/careers" },
        { label: "Real Estate Blog & Insights", href: "/blog" },
        { label: "Client Testimonials & Stories", href: "/testimonials" },
        { label: "Frequently Asked Questions (FAQ)", href: "/faq" },
        { label: "Corporate Offices Directory", href: "/offices" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service & User Agreement", href: "/user-agreement" },
        { label: "RERA Transparency & Disclaimers", href: "/disclaimer" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#252525]">
      <Header selectedCity="mumbai" onOpenCityModal={() => {}} onOpenAiModal={() => {}} onSearchQuery={() => {}} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#1F1F1F] via-[#2A2A2A] to-[#1F1F1F] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#D29324] text-xs font-semibold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Complete Website Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            AuraLiving <span className="text-[#D29324]">Sitemap</span>
          </h1>
          <p className="mt-4 text-gray-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-light">
            Quickly navigate across our verified city portals, residential categories, financial calculators, and corporate advisory services.
          </p>
        </div>
      </section>

      {/* Sitemap Sections */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITEMAP_SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E8E3DA] shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-xl bg-[#D29324]/10 text-[#D29324] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-sm font-bold text-[#1C1C1C]">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-2.5 flex-1">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-xs text-gray-600 hover:text-[#D29324] hover:underline flex items-center gap-1.5 transition-colors group"
                      >
                        <ChevronRight className="w-3 h-3 text-[#D29324] group-hover:translate-x-0.5 transition-transform shrink-0" />
                        <span className="truncate">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
