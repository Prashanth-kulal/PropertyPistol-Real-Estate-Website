"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import {
  ShieldCheck,
  Building2,
  Users,
  Banknote,
  Globe2,
  FileCheck2,
  Layers,
  Wrench,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Clock,
  Send,
  X,
  Compass,
  Briefcase
} from "lucide-react";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [inquiryModalService, setInquiryModalService] = useState(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Form states inside modal
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCity, setFormCity] = useState("Mumbai");

  const services = [
    {
      id: "advisory",
      hash: "residential-advisory",
      category: "buyers",
      categoryLabel: "For Home Buyers",
      title: "Zero-Brokerage Residential Advisory",
      tagline: "Unbiased, Data-Backed Property Matchmaking",
      description: "Get personalized property shortlists, sanitized private chauffeur site visits, builder price negotiations, and complete legal verification—all with zero brokerage fee.",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=700&q=80",
      features: [
        "100% Zero Brokerage on all verified developer homes",
        "Complimentary sanitized private chauffeur site visits",
        "Expert assistance in price negotiations and unit selection"
      ]
    },
    {
      id: "home-loans",
      hash: "home-loans",
      category: "financing",
      categoryLabel: "Financing & Loans",
      title: "Home Loan Advisory & Instant Approval",
      tagline: "Lowest Interest Rates with 25+ Premier Banks",
      description: "Direct tie-ups with SBI, HDFC, ICICI, Axis, and Bank of Baroda. Our dedicated in-house banking desk manages documentation, doorstep collection, and sanction within 72 hours.",
      icon: Banknote,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80",
      features: [
        "Exclusive negotiated interest rates starting at 8.35% p.a.",
        "Zero processing fees on partner developer bookings",
        "End-to-end doorstep paperwork handling"
      ]
    },
    {
      id: "builder-services",
      hash: "builder-services",
      category: "builders",
      categoryLabel: "For Developers",
      title: "Builder & Channel Partner Services",
      tagline: "Accelerating Sales for Grade-A Developers",
      description: "Strategic mandate management, national outreach campaigns, and sales acceleration for over 2,000+ real estate developers across Mumbai, Pune, NCR, and Bangalore.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80",
      features: [
        "Curated distribution across 10,000+ channel partners",
        "High-velocity launch campaigns & customer acquisition",
        "Transparent real-time sales reporting and analytics"
      ]
    },
    {
      id: "radiate-platform",
      hash: "radiate-platform",
      category: "builders",
      categoryLabel: "PropTech Platform",
      title: "Radiate Developer Platform",
      tagline: "Next-Gen Cloud CRM & Inventory Distribution",
      description: "A proprietary software suite designed specifically for real estate developers to manage real-time inventory, channel partner commissions, digital booking forms, and lead tracking.",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
      features: [
        "Live unit availability mapping & digital allocations",
        "Automated broker commission tracking and settlements",
        "Bank-grade encrypted customer data security"
      ]
    },
    {
      id: "broker-network",
      hash: "broker-network",
      category: "brokers",
      categoryLabel: "For Real Estate Brokers",
      title: "Syndicate Broker Network",
      tagline: "India's Most Trusted Broker Ecosystem",
      description: "Join over 20,000+ verified channel partners empowered by AuraLiving. Access exclusive project mandates, guaranteed on-time broker payouts, and high-converting marketing collaterals.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80",
      features: [
        "Direct access to top developer mandates with higher slabs",
        "Dedicated broker relationship manager for site tours",
        "Guaranteed 30-day payout cycles with online invoicing"
      ]
    },
    {
      id: "nri-desk",
      hash: "nri-desk",
      category: "nri",
      categoryLabel: "For Global Indians",
      title: "NRI Real Estate Desk",
      tagline: "Seamless Cross-Border Property Management",
      description: "Dedicated offices in Dubai, Sharjah, Abu Dhabi, and Singapore catering to international buyers with live HD video tours, digital Power of Attorney, NRE/NRO banking, and rental management.",
      icon: Globe2,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80",
      features: [
        "Live interactive walkthroughs from abroad",
        "Doorstep documentation and NRE/NRO tax guidance",
        "Turnkey tenant onboarding and rental disbursement"
      ]
    },
    {
      id: "legal-registration",
      hash: "legal-registration",
      category: "owners",
      categoryLabel: "Legal & Compliance",
      title: "E-Registration & Title Verification",
      tagline: "Doorstep Government Biometric Documentation",
      description: "Complete peace of mind with 30-year title deed verification, RERA litigation audits, draft agreement vetting, and doorstep government biometric e-registration.",
      icon: FileCheck2,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80",
      features: [
        "Comprehensive 30-year title search & encumbrance audit",
        "Doorstep biometric scanning for registered agreements",
        "Official legal report prepared by senior RERA advocates"
      ]
    },
    {
      id: "inspection-services",
      hash: "inspection-services",
      category: "buyers",
      categoryLabel: "Quality Assurance",
      title: "Home Inspection & PropCheck",
      tagline: "100+ Point Architectural & Engineering Audit",
      description: "Before accepting builder handover or purchasing a resale home, our certified civil engineers inspect carpet area compliance, dampness/seepage, electrical loads, and structural integrity.",
      icon: Wrench,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80",
      features: [
        "Thermal imaging audit for concealed leakage and cracks",
        "Laser carpet area measurement verifying RERA plans",
        "Detailed 40-page snagging report for builder rectification"
      ]
    }
  ];

  const filteredServices = selectedCategory === "all"
    ? services
    : services.filter((s) => s.category === selectedCategory || s.categoryLabel.toLowerCase().includes(selectedCategory));

  const handleOpenInquiry = (service) => {
    setInquiryModalService(service);
    setInquirySuccess(false);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formPhone) return;
    setInquirySuccess(true);
    setTimeout(() => {
      setInquiryModalService(null);
      setInquirySuccess(false);
      setFormName("");
      setFormPhone("");
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Header */}
      <Header
        selectedCity="mumbai"
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Banner */}
        <section className="bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F4] to-white py-14 sm:py-18 border-b border-[#E8E3DA] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-5">
              <Link href="/" className="hover:text-[#D29324] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#AE7419] font-semibold">Services</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D29324]/10 border border-[#D29324]/30 text-[#AE7419] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Full-Spectrum Real Estate Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#252525] tracking-tight leading-tight">
                Comprehensive Real Estate Solutions, <br />
                <span className="text-[#D29324]">Delivered with Integrity.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Whether you are buying a dream home, securing optimal financing, marketing a builder development, or managing cross-border assets as an NRI, AuraLiving delivers specialized services with complete transparency.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-8">
              {[
                { id: "all", label: "All Services" },
                { id: "buyers", label: "For Home Buyers" },
                { id: "financing", label: "Home Loans" },
                { id: "builders", label: "For Developers" },
                { id: "brokers", label: "For Brokers" },
                { id: "nri", label: "NRI Desk" },
                { id: "owners", label: "Legal & Registration" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-[#D29324] text-white shadow-md"
                      : "bg-white hover:bg-gray-100 text-gray-700 border border-[#E8E3DA]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Services Grid Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    id={service.hash}
                    className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D29324] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Header with Badge */}
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        <div className="absolute top-4 left-4 z-10">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                            {service.categoryLabel}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white text-[#D29324] flex items-center justify-center shadow-md shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-[#FFE2A7]">{service.tagline}</p>
                          </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors">
                          {service.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features List */}
                        <div className="pt-2 border-t border-gray-100 space-y-2">
                          {service.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D29324] shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="p-6 pt-0">
                      <button
                        type="button"
                        onClick={() => handleOpenInquiry(service)}
                        className="w-full py-3 rounded-xl bg-[#FAF8F4] hover:bg-[#D29324] border border-[#E8E3DA] hover:border-[#D29324] text-[#AE7419] hover:text-white font-bold text-xs tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer group/btn"
                      >
                        <span>Enquire About {service.title.split(" ")[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Builder & Developer Solutions Spotlight (Image on Left, Information on Right) */}
        <section id="builder-services" className="py-20 bg-[#FAF8F4] border-t border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left: Showcase Image */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
                    alt="Builder Services"
                    className="w-full h-[380px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-bold">AuraLiving Radiate Suite</h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Real-time inventory management, digitized allocation vouchers, and verified channel partner lead routing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Information & Action */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D29324]/15 border border-[#D29324]/40 text-[#AE7419] text-xs font-bold">
                  <Building2 className="w-3.5 h-3.5 text-[#D29324]" />
                  <span>Channel Partner & Developer Mandates</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
                  Powering 2,000+ Grade-A Developers Across India
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed">
                  AuraLiving works directly with India&apos;s most reputed builders—including Godrej Properties, Lodha, DLF, Sobha, and L&T Realty—providing high-velocity project launch mandates, marketing distribution, and guaranteed customer absorption.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] shadow-xs">
                    <p className="text-xl font-bold text-[#252525]">Reduced Cycle</p>
                    <p className="text-xs text-gray-500 mt-1">Accelerates inventory sales by 40% using algorithmic buyer matching.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] shadow-xs">
                    <p className="text-xl font-bold text-[#252525]">Omnichannel Outreach</p>
                    <p className="text-xs text-gray-500 mt-1">Pan-India retail footprint combined with digital high-intent sourcing.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenInquiry({ title: "Builder Services Mandate" })}
                    className="px-6 py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Developer Solutions Deck</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. NRI Real Estate Desk Spotlight */}
        <section id="nri-desk" className="py-20 bg-[#161B26] text-white relative">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80"
                    alt="Dubai Global Desk"
                    className="w-full h-[380px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-bold">Global Desks in UAE & Singapore</h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Local timezone assistance, international escrow advisory, and doorstep notary services for overseas Indians.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D29324]/20 border border-[#D29324]/40 text-[#FFE2A7] text-xs font-semibold">
                  <Globe2 className="w-3.5 h-3.5 text-[#D29324]" />
                  <span>Cross-Border Real Estate Expertise</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Seamless Remote Property Ownership for NRIs
                </h2>

                <p className="text-sm text-gray-300 leading-relaxed">
                  Living abroad shouldn&apos;t make investing back home difficult. AuraLiving provides a dedicated NRI Relationship Manager to guide you from virtual interactive tours to digital tenancy and repatriation of funds.
                </p>

                <div className="space-y-2.5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
                    <span>Monthly rental collection with automated NRE/NRO disbursements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
                    <span>Routine video inspections by certified property auditors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
                    <span>Complete compliance under FEMA and RBI remittance regulations</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenInquiry({ title: "NRI Desk Consultation" })}
                    className="px-6 py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Connect with NRI Specialist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer onSelectCity={() => {}} />

      {/* Inquiry Modal */}
      {inquiryModalService && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-gray-100">
            <button
              onClick={() => setInquiryModalService(null)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {inquirySuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#252525]">Inquiry Received!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you! An AuraLiving senior specialist for <strong>{inquiryModalService.title}</strong> will call you back within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] text-[#AE7419] text-xs font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D29324]" />
                  <span>Free Consultation</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#252525]">
                  Enquire About {inquiryModalService.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Leave your contact details and our certified advisors will provide customized assistance with zero obligation.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Phone Number *</label>
                    <div className="flex">
                      <span className="px-3.5 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-sm font-semibold text-gray-700">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full px-4 py-2.5 rounded-r-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">City of Interest</label>
                    <select
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Dubai">Dubai (UAE)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Callback Now</span>
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-2">
                    🔒 Zero Spam Promise. Your number is never shared with third parties.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* City Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity="mumbai"
        onSelectCity={() => setIsCityModalOpen(false)}
      />

      {/* AI Modal */}
      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        selectedCity="mumbai"
      />
    </div>
  );
}
