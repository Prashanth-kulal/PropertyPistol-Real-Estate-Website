"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FAQS } from "@/data";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ShieldCheck,
  Building,
  CreditCard,
  Globe,
  PhoneCall,
  Mail,
  Sparkles
} from "lucide-react";

const CATEGORIZED_FAQS = {
  general: [
    {
      q: "Does AuraLiving charge any brokerage or consulting fees from homebuyers?",
      a: "No! AuraLiving operates strictly on a 100% Zero Brokerage model for all new developer developments, builder projects, and residential towers. All services—including 3D virtual walkthroughs, on-site accompanied visits, unit price negotiations, legal title diligence, and home loan processing—are completely free for buyers."
    },
    {
      q: "How does AuraLiving offer free advisory to homebuyers?",
      a: "As authorized digital marketing and sales channel partners for over 2,000+ Grade-A real estate developers across India and Dubai, developers remunerate our platform directly for sales facilitation. This ensures buyers never pay a single rupee in commission."
    },
    {
      q: "How do I schedule a physical site visit or request price quotes?",
      a: "You can click 'Schedule Site Visit' or 'Inquire Now' on any project page, or call our toll-free advisory hotline at +91 8080 190190. A dedicated local neighborhood specialist will arrange pick-and-drop or accompany you to the sales gallery."
    }
  ],
  rera: [
    {
      q: "How does AuraLiving guarantee RERA compliance and legal safety?",
      a: "Before publishing any residential project, our in-house legal research desk scrutinizes the project's state RERA registration certificate (MahaRERA, K-RERA, UP-RERA, etc.), sanctioned building plans, title search reports, and developer escrow bank accounts. We never list unverified or unauthorized layouts."
    },
    {
      q: "What is the difference between an Occupancy Certificate (OC) and Completion Certificate (CC)?",
      a: "A Completion Certificate (CC) certifies that the developer constructed the building adhering strictly to sanctioned municipal architectural plans. An Occupancy Certificate (OC) is issued after civic utilities (water, sewage, fire safety clearances) are connected, officially permitting residents to occupy the building. Notably, ready homes with OC are completely exempt from the 5% GST."
    },
    {
      q: "Where can I view the RERA registration number for a project?",
      a: "Every project card and project details page on AuraLiving explicitly displays its official RERA registration number and QR certificate in the title summary and legal disclaimers bar."
    }
  ],
  loans: [
    {
      q: "What tax deductions can I claim on my home loan in India?",
      a: "Under Section 80C of the Income Tax Act, you can claim a deduction of up to ₹1.5 Lakhs annually on principal repayments. Under Section 24(b), you can claim an additional deduction of up to ₹2 Lakhs annually on interest paid for a self-occupied property. Additional deductions may apply under Section 80EEA for affordable housing."
    },
    {
      q: "How does AuraLiving's Home Loan Desk expedite bank approvals?",
      a: "Our centralized mortgage team partners with leading commercial banks including SBI, HDFC, ICICI, Bank of Baroda, and Axis Bank. Because the projects featured on our platform are pre-approved by these financial institutions, property technical valuation and legal checks are already completed, reducing sanction timelines to 3-5 business days."
    },
    {
      q: "Can I use AuraLiving's EMI Calculator to plan prepayments?",
      a: "Yes! Visit our Home Loan EMI Calculator page to simulate monthly installments, view amortization schedules, and see how annual prepayments reduce total interest outgo."
    }
  ],
  nri: [
    {
      q: "Can Non-Resident Indians (NRIs) and OCIs buy residential property in India?",
      a: "Yes. Under the Foreign Exchange Management Act (FEMA) guidelines, NRIs, PIOs, and OCIs can purchase any number of residential or commercial properties in India without requiring prior approval from the Reserve Bank of India (RBI). Agricultural land, plantation properties, and farm houses are excluded."
    },
    {
      q: "Can NRIs repatriate the sale proceeds of property bought in India?",
      a: "Yes. NRIs can freely repatriate the original investment amount deposited through inward foreign remittances via NRE accounts. Capital appreciation and rental proceeds are eligible for repatriation up to USD 1 Million per financial year through Form 15CA/15CB documentation under liberalized FEMA remittance regulations."
    },
    {
      q: "Can AuraLiving manage power of attorney (POA) and remote registration for NRIs?",
      a: "Yes. Our Global NRI Desk facilitates notarized and consular-attested Power of Attorney (POA) documentation and works with developer legal teams to execute digitally registered agreements without requiring physical travel to India."
    }
  ]
};

export default function FaqPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  // Flatten or filter all FAQs
  const allFaqsList = [
    ...CATEGORIZED_FAQS.general.map((f) => ({ ...f, category: "General & Zero Brokerage" })),
    ...CATEGORIZED_FAQS.rera.map((f) => ({ ...f, category: "RERA & Legal Diligence" })),
    ...CATEGORIZED_FAQS.loans.map((f) => ({ ...f, category: "Home Loans & Taxation" })),
    ...CATEGORIZED_FAQS.nri.map((f) => ({ ...f, category: "NRI Real Estate Desk" }))
  ];

  const filteredFaqs = allFaqsList.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "general" && item.category.includes("General")) ||
      (activeTab === "rera" && item.category.includes("RERA")) ||
      (activeTab === "loans" && item.category.includes("Loans")) ||
      (activeTab === "nri" && item.category.includes("NRI"));

    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#252525]">
      <Header selectedCity="mumbai" onOpenCityModal={() => {}} onOpenAiModal={() => {}} onSearchQuery={() => {}} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#1F1F1F] via-[#2A2A2A] to-[#1F1F1F] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#D29324] text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base & Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            Frequently Asked <span className="text-[#D29324]">Questions</span>
          </h1>
          <p className="mt-4 text-gray-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-light">
            Clear, transparent answers about our zero-brokerage model, RERA verifications, home loans, and property transactions.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search by topic, e.g. RERA, stamp duty, zero brokerage, NRI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-4 py-3 pl-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#D29324] backdrop-blur-md"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Questions", icon: HelpCircle },
            { id: "general", label: "Zero Brokerage", icon: Sparkles },
            { id: "rera", label: "RERA & Legal", icon: ShieldCheck },
            { id: "loans", label: "Home Loans & Taxes", icon: CreditCard },
            { id: "nri", label: "NRI Desk", icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setOpenIndex(null); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#D29324] text-white shadow-md"
                    : "bg-white border border-[#E8E3DA] text-gray-700 hover:bg-[#F3EFE6]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden transition-all shadow-sm hover:border-[#D29324]"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FAF8F4] text-[#D29324] font-bold text-xs flex items-center justify-center shrink-0 border border-[#E8E3DA]">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1C1C1C]">
                      {faq.q}
                    </span>
                  </div>
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
                  <div className="px-6 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-[#E8E3DA] bg-[#FAF8F4]/30">
                    <p>{faq.a}</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E3DA]">
              <HelpCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-700">No matching questions found</p>
              <p className="text-xs text-gray-500 mt-1">Try searching with a different keyword or contact our toll-free support.</p>
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#1F1F1F] to-[#2B2B2B] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Still have questions?</h3>
            <p className="text-xs text-gray-300 mt-1 max-w-md">
              Our real estate and legal advisors are available 6 days a week to guide you with tailored property recommendations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+918080190190"
              className="px-5 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Toll Free: +91 8080 190190</span>
            </a>
            <a
              href="mailto:support@propertypistol.com"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-colors border border-white/20"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
