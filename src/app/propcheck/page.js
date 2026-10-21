"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  X,
  FileText,
  Building2,
  SlidersHorizontal,
  Sparkles,
  Search,
  Eye,
  Check,
  Calendar,
  Layers,
  Award,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";

export default function PropCheckPage() {
  // Global Header and Modals State
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Contact / Inspection Booking Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "Mumbai",
    propertyType: "2 BHK",
    inspectionStage: "Pre-Handover Snagging",
    notes: ""
  });

  // Sample Report Lightbox Modal State
  const [activeReportIndex, setActiveReportIndex] = useState(null);

  // Interactive PropCheck Inspection Estimator State
  const [bhkConfig, setBhkConfig] = useState("2 BHK");
  const [carpetArea, setCarpetArea] = useState(850); // sq ft
  const [packageType, setPackageType] = useState("comprehensive"); // basic, comprehensive, premium
  const [citySelection, setCitySelection] = useState("Mumbai");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Dynamic Cost Calculation for the Estimator
  const estimation = useMemo(() => {
    let baseRatePerSqFt = 4.5;
    if (packageType === "basic") baseRatePerSqFt = 3.5;
    if (packageType === "premium") baseRatePerSqFt = 6.0;

    const estimatedCost = Math.round(carpetArea * baseRatePerSqFt);
    const estimatedCheckpoints = packageType === "basic" ? 95 : packageType === "comprehensive" ? 165 : 240;
    const estimatedHours = packageType === "basic" ? "2.5 - 3 Hours" : packageType === "comprehensive" ? "3.5 - 4.5 Hours" : "5 - 6 Hours";

    return {
      cost: estimatedCost,
      checkpoints: estimatedCheckpoints,
      duration: estimatedHours,
      reportTurnaround: "Within 24 Hours"
    };
  }, [carpetArea, packageType]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.fullName || !bookingData.phoneNumber) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 700);
  };

  const handleBookingReset = () => {
    setBookingData({
      fullName: "",
      phoneNumber: "",
      city: "Mumbai",
      propertyType: "2 BHK",
      inspectionStage: "Pre-Handover Snagging",
      notes: ""
    });
    setFormSubmitted(false);
  };

  // Sample report pages
  const sampleReports = [
    { id: 1, src: "/images/propcheck/sample-report-1.png", title: "Executive Audit Summary" },
    { id: 2, src: "/images/propcheck/sample-report-2.png", title: "Civil & Structural Analysis" },
    { id: 3, src: "/images/propcheck/sample-report-3.png", title: "Electrical Safety Audit" },
    { id: 4, src: "/images/propcheck/sample-report-4.png", title: "Plumbing & Moisture Detection" },
    { id: 5, src: "/images/propcheck/sample-report-5.png", title: "Doors, Windows & Carpentry" },
    { id: 6, src: "/images/propcheck/sample-report-6.png", title: "Finishes, Flooring & Paint" },
    { id: 7, src: "/images/propcheck/sample-report-7.png", title: "RERA Area Verification" },
    { id: 8, src: "/images/propcheck/sample-report-8.png", title: "Snagging Priority Matrix" }
  ];

  // FAQ List matching reference
  const faqList = [
    {
      q: "Why is home inspection important?",
      a: "Home inspection services enlighten homebuyers about the maintenance and repair costs of the property before finalizing agreements. Moreover, it helps compute the accurate fair cost of the home, prevents sudden out-of-pocket restoration expenses, and gives unshakeable peace of mind."
    },
    {
      q: "What is the purpose of an inspection?",
      a: "The main objective of home inspection services is to evaluate the structural, architectural, electrical, and plumbing synopsis of the property to ensure safety, code compliance, and builder quality promises."
    },
    {
      q: "What do they look for in a home inspection?",
      a: "The home inspection process entails a meticulous examination of floor plans, civil tiling, dampness/seepage, hollow tile detection, wiring loads, plumbing water pressure, drainage slope, and interior amenities conducted by certified engineers using thermal and acoustic equipment."
    },
    {
      q: "How can one choose home inspection services?",
      a: "Choosing an accredited home inspection service that provides an unbiased, third-party, technology-backed inspection with a comprehensive 50+ page photographic audit report is highly advisable."
    },
    {
      q: "Why do home inspection service agencies provide certificates to the owners?",
      a: "The certificates and official snagging scorecards authenticate the fitness, habitability, and structural soundness of the property, serving as legal verification proof during builder handovers."
    },
    {
      q: "Is it necessary to have a home inspection for a freshly constructed property?",
      a: "Yes! Even in freshly built towers, unforeseen developer construction defects such as sub-surface seepage, circuit reversals, improper slope in balconies, and micro-cracks exist. Inspecting before possession ensures the builder rectifies them free of cost under defect liability."
    },
    {
      q: "Can one claim to the developers or sellers on the compromised property features?",
      a: "Yes. The certificate and snag checklist from AuraLiving PropCheck accentuates transparency between homebuyers and builders, providing undeniable photographic proof for snag resolution before final registry handover."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#252525] font-sans selection:bg-[#FBF1DF] selection:text-[#AE7419]">
      {/* 1. Global AuraLiving Header */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. HERO SECTION matching reference layout & styling */}
      <section className="relative bg-[#1A1F26] text-white overflow-hidden border-b border-gray-800">
        {/* Ambient Subtle Gradients */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#D29324]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#AE7419]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-16 lg:pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#FBF1DF] tracking-wide">
                <ShieldCheck className="w-4 h-4 text-[#D29324]" />
                <span>AuraLiving PropCheck • Certified Due Diligence</span>
              </div>

              {/* H1 & H2 matching reference */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                  Home Inspection <span className="text-[#D29324]">Service</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-medium text-gray-200">
                  Protect your Home! Save Time and Money
                </h2>
              </div>

              {/* Reference Lead Paragraph */}
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                Our accredited professionals conduct a thorough property assessment to guarantee the structural integrity of your home. These experts scrutinize every aspect of the property, protecting buyers&apos; interests. You can assess potential issues through a comprehensive report.
              </p>

              {/* 3 Reference Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 pb-2 max-w-2xl">
                {/* 1. Discover Significant Issues */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center sm:text-left flex sm:flex-col items-center sm:items-start gap-3 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#D29324]/20 text-[#D29324] flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Discover Significant Issues</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Prior to Ownership Transfer</p>
                  </div>
                </div>

                {/* 2. Safeguard Your Investment */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center sm:text-left flex sm:flex-col items-center sm:items-start gap-3 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#D29324]/20 text-[#D29324] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Safeguard Your Investment</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Ensure You Receive Your Money&apos;s Worth</p>
                  </div>
                </div>

                {/* 3. Secure Your Family's Safety */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center sm:text-left flex sm:flex-col items-center sm:items-start gap-3 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#D29324]/20 text-[#D29324] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Secure Your Family&apos;s Safety</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Against Severe Household Mishaps</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-sm shadow-lg shadow-[#D29324]/30 flex items-center gap-2 group transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Contact Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveReportIndex(0)}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FBF1DF] hover:text-white font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#D29324]" />
                  <span>View Sample Report</span>
                </button>
              </div>
            </div>

            {/* Right Visual Graphic Column (5 cols on lg) */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              {/* Reference Speech Bubbles */}
              <div className="flex items-center justify-center gap-3 mb-2 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 shadow-md">
                  <span className="text-xs font-bold text-white">Why invest in repairs</span>
                </div>
                <div className="bg-[#D29324] text-white rounded-full px-4 py-1.5 shadow-md">
                  <span className="text-xs font-bold">when you can be well-prepared?</span>
                </div>
              </div>

              {/* Central Character & House Illustration */}
              <div className="relative w-full max-w-[380px] h-[340px] sm:h-[380px] flex items-center justify-center">
                <Image
                  src="/images/propcheck/prop-check.png"
                  alt="AuraLiving PropCheck Inspection Specialist"
                  width={340}
                  height={320}
                  className="object-contain relative z-10 drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Sofa Foreground Graphic */}
              <div className="relative -mt-16 w-full max-w-[420px] flex justify-center z-20">
                <Image
                  src="/images/propcheck/sofa-prop-check.png"
                  alt="Living Room Inspection Graphic"
                  width={420}
                  height={130}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAIN BODY CONTAINER (Left 8 Cols Content + Right 4 Cols Sticky Booking Form) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* LEFT COLUMN: All Core Inspection Sections (8 cols) */}
          <div className="lg:col-span-8 space-y-16">

            {/* SECTION A: What does Home Inspection cover? */}
            <section id="coverage" className="space-y-6">
              <div className="text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#AE7419] tracking-wider uppercase">
                  <Layers className="w-3.5 h-3.5 text-[#D29324]" />
                  <span>Comprehensive Audit Scope</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  What does Home Inspection cover?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Detailed engineered evaluation covering 150+ critical health, safety, and construction parameters.
                </p>
              </div>

              {/* 4 Inspection Scope Cards (Row 1 & Row 2 layout matching reference) */}
              <div className="space-y-4">
                {/* Row 1: Quality Check (wider) & Brand Check */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Card 1: Quality Check */}
                  <div
                    className="sm:col-span-7 relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[250px] p-6 text-white flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      backgroundImage: "url('/images/propcheck/quality-check.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 group-hover:from-black/90 transition-colors"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <Image src="/images/propcheck/blue-check.svg" alt="Check" width={20} height={20} />
                      <span className="text-lg font-bold text-white tracking-wide">Quality Check</span>
                    </div>
                    <div className="relative z-10 text-xs sm:text-sm text-gray-200 leading-relaxed">
                      Evaluate the structural integrity and architectural design of the property, including load beams, foundation levels, and plaster cohesion.
                    </div>
                  </div>

                  {/* Card 2: Brand Check */}
                  <div
                    className="sm:col-span-5 relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[250px] p-6 text-white flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      backgroundImage: "url('/images/propcheck/brand-check.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 group-hover:from-black/90 transition-colors"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <Image src="/images/propcheck/blue-check.svg" alt="Check" width={20} height={20} />
                      <span className="text-lg font-bold text-white tracking-wide">Brand Check</span>
                    </div>
                    <div className="relative z-10 text-xs sm:text-sm text-gray-200 leading-relaxed">
                      Evaluate the authenticity and quality grade of raw materials, electrical cabling, and sanitary fixtures specified in agreement.
                    </div>
                  </div>
                </div>

                {/* Row 2: Material Check & Dimension Verification (wider) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Card 3: Material Check */}
                  <div
                    className="sm:col-span-5 relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[250px] p-6 text-white flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      backgroundImage: "url('/images/propcheck/material-check.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 group-hover:from-black/90 transition-colors"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <Image src="/images/propcheck/blue-check.svg" alt="Check" width={20} height={20} />
                      <span className="text-lg font-bold text-white tracking-wide">Material Check</span>
                    </div>
                    <div className="relative z-10 text-xs sm:text-sm text-gray-200 leading-relaxed">
                      Examine the materials used in the construction process, thermal insulation, damp-proofing, and glass grade.
                    </div>
                  </div>

                  {/* Card 4: Dimension Verification */}
                  <div
                    className="sm:col-span-7 relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[250px] p-6 text-white flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      backgroundImage: "url('/images/propcheck/dimension-check.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 group-hover:from-black/90 transition-colors"></div>
                    <div className="relative z-10 flex items-center gap-2">
                      <Image src="/images/propcheck/blue-check.svg" alt="Check" width={20} height={20} />
                      <span className="text-lg font-bold text-white tracking-wide">Dimension Verification</span>
                    </div>
                    <div className="relative z-10 text-xs sm:text-sm text-gray-200 leading-relaxed">
                      Verify property&apos;s dimensions, laser-measured carpet area, and balcony limits as promised by developer layout blueprints.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION B: Why choose Home Inspection Services? (4 Benefits Grid) */}
            <section className="bg-[#FAF8F4] border border-[#E8E3DA] rounded-3xl p-6 sm:p-10 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Why choose Home Inspection Services?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
                  A certified inspection safeguards your capital, ensures safety, and prevents post-handover surprises.
                </p>
              </div>

              {/* 4 Feature Items matching reference SVGs/PNGs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* 1. Identify Hidden Problems */}
                <div className="text-center space-y-3 p-4 bg-white rounded-2xl border border-[#E8E3DA]/80 shadow-xs hover:border-[#D29324]/50 transition-colors">
                  <div className="w-20 h-20 mx-auto flex items-center justify-center">
                    <Image
                      src="/images/propcheck/service-identify.png"
                      alt="Identify Hidden Problems"
                      width={80}
                      height={76}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base font-bold text-[#252525]">Identify Hidden Problems</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Home Inspector discovers hidden and expensive problems that are not always apparent when homebuyers view the home with family members and a real estate agent.
                  </p>
                </div>

                {/* 2. Save Time & Money */}
                <div className="text-center space-y-3 p-4 bg-white rounded-2xl border border-[#E8E3DA]/80 shadow-xs hover:border-[#D29324]/50 transition-colors">
                  <div className="w-20 h-20 mx-auto flex items-center justify-center">
                    <Image
                      src="/images/propcheck/service-save.png"
                      alt="Save Time & Money"
                      width={90}
                      height={76}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base font-bold text-[#252525]">Save Time & Money</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Home inspection ensures the property is in good condition, devoid of any structural, plumbing, and material shortcomings before releasing payments.
                  </p>
                </div>

                {/* 3. Ensure Safety */}
                <div className="text-center space-y-3 p-4 bg-white rounded-2xl border border-[#E8E3DA]/80 shadow-xs hover:border-[#D29324]/50 transition-colors">
                  <div className="w-20 h-20 mx-auto flex items-center justify-center">
                    <Image
                      src="/images/propcheck/service-ensure.png"
                      alt="Ensure Safety"
                      width={85}
                      height={78}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base font-bold text-[#252525]">Ensure Safety</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Home Inspection identifies safety issues such as loose wiring, non-grounded sockets, illegal installations, and faulty fire systems needing urgent repair.
                  </p>
                </div>

                {/* 4. Provide Negotiation Leverage */}
                <div className="text-center space-y-3 p-4 bg-white rounded-2xl border border-[#E8E3DA]/80 shadow-xs hover:border-[#D29324]/50 transition-colors">
                  <div className="w-20 h-20 mx-auto flex items-center justify-center">
                    <Image
                      src="/images/propcheck/service-provide.png"
                      alt="Provide Negotiation Leverage"
                      width={95}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-base font-bold text-[#252525]">Provide Negotiation Leverage</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Homebuyers can ask the seller to fix the problems mentioned in the report or negotiate with the seller/developer to reduce the property price accordingly.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION C: Why choose AuraLiving for Inspection? (3 Cards Slider) */}
            <section className="space-y-6">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Why choose <span className="text-[#D29324]">AuraLiving</span> for Inspection?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Precision digital sensors, accredited civil engineers, and unbiased institutional rigor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Visual Assistance */}
                <div
                  className="relative rounded-2xl overflow-hidden min-h-[320px] p-6 text-white flex flex-col justify-end shadow-md group"
                  style={{
                    backgroundImage: "url('/images/propcheck/inspection-2.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-4 space-y-2">
                    <h3 className="text-base font-bold text-white">Visual Assistance</h3>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      Provides technology-enabled 360‑degree walkthrough and thermal acoustic mapping of the property.
                    </p>
                  </div>
                </div>

                {/* Card 2: Comprehensive Analysis */}
                <div className="bg-[#0B3B48] text-white rounded-2xl p-6 min-h-[320px] flex flex-col justify-between border border-cyan-900 shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">Comprehensive Analysis</h3>
                    <p className="text-xs text-cyan-100/80 leading-relaxed">
                      Covers all 150+ parameters required to be assessed for home inspections, including electrical phase balancing, slope gradient, and moisture readings.
                    </p>
                    <div className="pt-2 border-t border-cyan-800/80 flex items-center gap-1.5 text-xs text-[#D29324] font-semibold">
                      <span>150+ Parameters Audited</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Accurate Estimation */}
                <div
                  className="relative rounded-2xl overflow-hidden min-h-[320px] p-6 text-white flex flex-col justify-end shadow-md group"
                  style={{
                    backgroundImage: "url('/images/propcheck/inspection-2.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/25 rounded-xl p-4 space-y-2">
                    <h3 className="text-base font-bold text-white">Accurate Estimation</h3>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      Employs methodical laser techniques to compute carpet area and verify layout blueprints against developer agreements.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION D: Sample Report - Key Highlights (Interactive Gallery & Lightbox) */}
            <section className="bg-[#FAF8F4] border border-[#E8E3DA] rounded-3xl p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                    Sample Report - <span className="text-[#D29324]">Key Highlights</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Click any sample page to preview the high-resolution engineering inspection audit.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500">8 Pages Documented</span>
                </div>
              </div>

              {/* 4 Interactive Thumbnails matching reference UI */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sampleReports.slice(0, 4).map((report, idx) => (
                  <div
                    key={report.id}
                    onClick={() => setActiveReportIndex(idx)}
                    className="group relative rounded-2xl overflow-hidden border border-[#E8E3DA] bg-white cursor-pointer shadow-xs hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    <div className="aspect-[3/4] relative bg-gray-100">
                      <Image
                        src={report.src}
                        alt={report.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Plus icon hover overlay matching reference */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-[#D29324] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                          +
                        </div>
                      </div>
                    </div>
                    <div className="p-2.5 text-center bg-white border-t border-gray-100">
                      <span className="text-xs font-bold text-gray-800 line-clamp-1">{report.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Pages CTA */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setActiveReportIndex(0)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#E8E3DA] hover:border-[#D29324] text-xs font-bold text-gray-800 hover:text-[#D29324] shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#D29324]" />
                  <span>Inspect All 8 Pages in Full Lightbox</span>
                </button>
              </div>
            </section>

            {/* SECTION E: INTERACTIVE PROPCHECK ESTIMATOR & CHECKLIST TOOL (Simulated Results Flow) */}
            <section id="estimator" className="bg-white border-2 border-[#D29324]/30 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] text-xs font-bold text-[#AE7419]">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Instant Estimate Calculator</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  PropCheck Inspection Cost &amp; Scope Estimator
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Select your apartment specifications to calculate estimated inspection duration, checkpoints tested, and fee breakdown.
                </p>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FAF8F4] p-5 sm:p-6 rounded-2xl border border-[#E8E3DA]">
                {/* 1. BHK Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Property Configuration
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["1 BHK", "2 BHK", "3 BHK", "4 BHK+"].map((bhk) => (
                      <button
                        key={bhk}
                        type="button"
                        onClick={() => {
                          setBhkConfig(bhk);
                          if (bhk === "1 BHK") setCarpetArea(550);
                          if (bhk === "2 BHK") setCarpetArea(850);
                          if (bhk === "3 BHK") setCarpetArea(1350);
                          if (bhk === "4 BHK+") setCarpetArea(2100);
                        }}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          bhkConfig === bhk
                            ? "bg-[#D29324] text-white border-[#D29324] shadow-xs"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#D29324]/50"
                        }`}
                      >
                        {bhk}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Package Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Audit Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "basic", label: "Basic" },
                      { id: "comprehensive", label: "Standard" },
                      { id: "premium", label: "Full Audit" }
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setPackageType(pkg.id)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          packageType === pkg.id
                            ? "bg-[#252525] text-white border-[#252525] shadow-xs"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {pkg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Carpet Area Slider */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Carpet Area (sq. ft.)
                    </label>
                    <span className="text-sm font-extrabold text-[#D29324]">
                      {carpetArea.toLocaleString()} sq. ft.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="350"
                    max="3500"
                    step="50"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(Number(e.target.value))}
                    className="w-full accent-[#D29324] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>350 sq.ft. (Compact)</span>
                    <span>1,800 sq.ft. (Mid-Large)</span>
                    <span>3,500 sq.ft. (Luxury/Duplex)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Estimated Output Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FBF1DF] border border-[#E8E3DA]">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gray-600 block">Indicative Fee:</span>
                  <div className="text-xl sm:text-2xl font-black text-[#AE7419]">
                    ₹{estimation.cost.toLocaleString()}*
                  </div>
                  <span className="text-[10px] text-gray-500 block">Excl. taxes</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gray-600 block">Checkpoints:</span>
                  <div className="text-xl sm:text-2xl font-black text-gray-900">
                    {estimation.checkpoints}+
                  </div>
                  <span className="text-[10px] text-gray-500 block">Physical &amp; digital tests</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gray-600 block">On-Site Duration:</span>
                  <div className="text-lg sm:text-xl font-bold text-gray-900">
                    {estimation.duration}
                  </div>
                  <span className="text-[10px] text-gray-500 block">By 2 senior engineers</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gray-600 block">Report Delivery:</span>
                  <div className="text-lg sm:text-xl font-bold text-[#D29324]">
                    24 Hours
                  </div>
                  <span className="text-[10px] text-gray-500 block">PDF + high-res gallery</span>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3 pt-1 text-xs text-gray-500">
                <span className="italic">*Prices and checkpoints are simulated demonstration calculations.</span>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-5 py-2 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Book for this Specification
                </button>
              </div>
            </section>

            {/* SECTION F: FAQs Section */}
            <section className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Common queries answered regarding property audit timelines, developer obligations, and certificates.
                </p>
              </div>

              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {faqList.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} className="py-4">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                      >
                        <span className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? "text-[#D29324]" : "text-gray-900 group-hover:text-[#AE7419]"
                        }`}>
                          {faq.q}
                        </span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 bg-[#FBF1DF] text-[#D29324]" : "text-gray-400 bg-gray-50"
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="pt-3 pr-8 text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in duration-200">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Reference Disclaimer */}
              <p className="text-xs text-gray-400 leading-relaxed italic pt-4">
                Disclaimer: You are hereby informed that AuraLiving is acting as an independent advisory and partner facilitator connecting customers with certified third-party inspection specialists. Simulated values and sample reports are for demonstration and informational purposes only.
              </p>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Enquiry Form (4 cols on lg) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl border border-[#E8E3DA] p-6 sm:p-7 shadow-lg shadow-black/5 space-y-6">
              
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FBF1DF] text-[10px] font-bold text-[#AE7419]">
                  <Sparkles className="w-3 h-3" />
                  <span>Instant Booking</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#252525]">
                  Schedule Property Inspection
                </h3>
                <p className="text-xs text-gray-500">
                  Book certified engineers to audit your apartment before final handover or registration.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#D29324]/30 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#D29324]/20 text-[#D29324] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#252525]">Booking Request Received!</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Thank you, <span className="font-semibold text-gray-800">{bookingData.fullName}</span>. An inspection manager will call you within 15 minutes to confirm the engineer slot.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleBookingReset}
                    className="w-full py-2.5 rounded-xl bg-white border border-[#E8E3DA] hover:border-[#D29324] text-xs font-bold text-gray-700 hover:text-[#D29324] transition-colors cursor-pointer"
                  >
                    Submit Another Property
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prashanth Kulal"
                      value={bookingData.fullName}
                      onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#D29324] focus:ring-1 focus:ring-[#D29324] text-xs text-gray-900 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 block">
                      Phone Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-xs font-medium text-gray-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile number"
                        value={bookingData.phoneNumber}
                        onChange={(e) => setBookingData({ ...bookingData, phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-gray-200 focus:border-[#D29324] focus:ring-1 focus:ring-[#D29324] text-xs text-gray-900 outline-none transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* City Selection */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 block">
                      City *
                    </label>
                    <select
                      value={bookingData.city}
                      onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#D29324] focus:ring-1 focus:ring-[#D29324] text-xs text-gray-900 outline-none transition-all bg-white cursor-pointer"
                    >
                      <option value="Mumbai">Mumbai &amp; Thane</option>
                      <option value="Pune">Pune &amp; PCMC</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Delhi NCR">Delhi NCR / Gurugram</option>
                      <option value="Dubai">Dubai Desk</option>
                    </select>
                  </div>

                  {/* Property Configuration */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 block">
                        Configuration
                      </label>
                      <select
                        value={bookingData.propertyType}
                        onChange={(e) => setBookingData({ ...bookingData, propertyType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#D29324] text-xs text-gray-900 outline-none bg-white cursor-pointer"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK+">4 BHK / Villa</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 block">
                        Inspection Stage
                      </label>
                      <select
                        value={bookingData.inspectionStage}
                        onChange={(e) => setBookingData({ ...bookingData, inspectionStage: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-[#D29324] text-xs text-gray-900 outline-none bg-white cursor-pointer"
                      >
                        <option value="Pre-Handover Snagging">Pre-Handover Snagging</option>
                        <option value="Resale Purchase">Resale Purchase Audit</option>
                        <option value="Renovation Assessment">Renovation Assessment</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs tracking-wide shadow-md shadow-[#D29324]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span>Scheduling Engineer...</span>
                    ) : (
                      <>
                        <span>Book Inspection Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {/* Call to Talk */}
                  <div className="pt-2 text-center border-t border-gray-100 space-y-1">
                    <span className="text-[11px] text-gray-500 block">Need immediate guidance?</span>
                    <a
                      href="tel:18008080190"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#AE7419] hover:text-[#D29324] transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Toll Free: +91 8080 190190</span>
                    </a>
                  </div>

                  <p className="text-[10px] text-gray-400 text-center leading-tight">
                    By submitting, you agree to receive inspection scheduling calls &amp; WhatsApp updates from AuraLiving PropCheck.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* 4. MODAL: CONTACT & BOOKING DIALOG (for mobile / navbar trigger) */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl border border-gray-100">
            <button
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 mb-5">
              <span className="text-xs font-bold text-[#D29324] uppercase tracking-wider">AuraLiving PropCheck</span>
              <h3 className="text-xl font-bold text-[#252525]">Book Property Inspection</h3>
              <p className="text-xs text-gray-500">Certified engineers inspect your home before handover.</p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D29324]/20 text-[#D29324] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-gray-900">Request Confirmed</h4>
                <p className="text-xs text-gray-600">Our engineering coordinator will connect with you promptly.</p>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-[#252525] text-white text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={bookingData.fullName}
                    onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#D29324]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={bookingData.phoneNumber}
                    onChange={(e) => setBookingData({ ...bookingData, phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#D29324]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">City</label>
                    <select
                      value={bookingData.city}
                      onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none bg-white cursor-pointer"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Config</label>
                    <select
                      value={bookingData.propertyType}
                      onChange={(e) => setBookingData({ ...bookingData, propertyType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none bg-white cursor-pointer"
                    >
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK+">4 BHK+</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold tracking-wide mt-2 transition-colors cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Schedule Inspection"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. MODAL: SAMPLE REPORT LIGHTBOX PREVIEW */}
      {activeReportIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden relative shadow-2xl border border-white/20">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF8F4]">
              <div>
                <span className="text-[10px] font-bold text-[#D29324] uppercase tracking-wider block">
                  AuraLiving PropCheck • Sample Audit Page {activeReportIndex + 1} of {sampleReports.length}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-gray-900">
                  {sampleReports[activeReportIndex].title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveReportIndex(null)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High-res Image Preview */}
            <div className="p-4 overflow-y-auto flex-1 flex items-center justify-center bg-gray-50">
              <div className="relative w-full max-w-[500px] aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-gray-200">
                <Image
                  src={sampleReports[activeReportIndex].src}
                  alt={sampleReports[activeReportIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-3 sm:p-4 border-t border-gray-100 bg-white flex items-center justify-between">
              <button
                type="button"
                disabled={activeReportIndex === 0}
                onClick={() => setActiveReportIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              <span className="text-xs font-semibold text-gray-500">
                {activeReportIndex + 1} / {sampleReports.length}
              </span>

              <button
                type="button"
                disabled={activeReportIndex === sampleReports.length - 1}
                onClick={() => setActiveReportIndex((prev) => Math.min(sampleReports.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. GLOBAL FOOTER matching AuraLiving dark aesthetic */}
      <footer className="bg-[#1C1F26] text-white border-t border-gray-800 pt-16 pb-12 mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Brand Column */}
            <div className="md:col-span-4 space-y-4">
              <Link href="/" className="inline-block group" aria-label="Deepshi Group of Companies Home">
                <Image
                  src="/images/logo/logo-white.png"
                  alt="Deepshi Group of Companies"
                  width={240}
                  height={101}
                  className="h-11 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </Link>

              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                AuraLiving PropCheck empowers homebuyers with institutional-grade due diligence, structural checks, and snagging inspections before property handover.
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[#D29324]" />
                <span>Accredited Engineering Inspectors</span>
              </div>
            </div>

            {/* Center Quick Navigation Links */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wide">
                PropCheck Solutions
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#coverage" className="hover:text-[#D29324] transition-colors">Inspection Coverage &amp; Scope</a></li>
                <li><a href="#estimator" className="hover:text-[#D29324] transition-colors">Cost &amp; Checkpoints Estimator</a></li>
                <li><button type="button" onClick={() => setActiveReportIndex(0)} className="hover:text-[#D29324] transition-colors text-left cursor-pointer">Sample Inspection Report</button></li>
                <li><Link href="/home-loan" className="hover:text-[#D29324] transition-colors">Home Loan Assistance</Link></li>
                <li><Link href="/services/syndicate" className="hover:text-[#D29324] transition-colors">Syndicate Broker Platform</Link></li>
              </ul>
            </div>

            {/* Right Contact Hotline Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wide">
                Inspection Helpdesk
              </h4>

              <div className="space-y-1">
                <span className="text-[11px] text-gray-400 block">Toll-Free Booking Hotline:</span>
                <a
                  href="tel:18008080190"
                  className="text-base sm:text-lg font-black text-[#D29324] hover:underline block"
                >
                  +91 8080 190 190
                </a>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-[11px] text-gray-400 block">Email Inspection Desk:</span>
                <a
                  href="mailto:propcheck@auraliving.com"
                  className="text-sm font-bold text-white hover:text-[#D29324] transition-colors block"
                >
                  propcheck@auraliving.com
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Legal Bar */}
          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
            <div>
              © 2026 AuraLiving. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <span>|</span>
              <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <span className="text-[10px] text-gray-600">Simulated demonstration estimates.</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating CTA button on mobile when scrolling */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsContactModalOpen(true)}
          className="w-full py-3.5 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Book Inspection Now</span>
        </button>
      </div>

      {/* Global Modals for Header */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

    </div>
  );
}
