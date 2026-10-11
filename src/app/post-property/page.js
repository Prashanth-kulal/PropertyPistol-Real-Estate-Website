"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import {
  Building2,
  Home,
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Phone,
  PhoneCall,
  User,
  MapPin,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Trash2,
  Lock,
  Star,
  Quote
} from "lucide-react";

export default function PostPropertyPage() {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Form Mode: "quick" (initial phone hero view) vs "full_form" (3-step wizard)
  const [formMode, setFormMode] = useState("quick");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errors, setErrors] = useState({});

  // Listing Data
  const [listingData, setListingData] = useState({
    purpose: "sell", // sell or rent
    propertyCategory: "residential", // residential or commercial
    propertyType: "apartment", // apartment, villa, plot, penthouse
    bhk: "2 BHK",
    carpetArea: "",
    furnishing: "semi-furnished",
    city: "Mumbai",
    locality: "",
    societyName: "",
    expectedPrice: "",
    maintenance: "",
    possession: "ready-to-move",
    amenities: ["Parking", "Security", "Lift", "Power Backup"],
    ownerName: "",
    ownerEmail: "",
    photos: []
  });

  // FAQ open states
  const [openFaq, setOpenFaq] = useState(0);

  const availableAmenities = [
    "Parking",
    "24x7 Security",
    "Lift",
    "Power Backup",
    "Gym",
    "Swimming Pool",
    "Clubhouse",
    "Vastu Compliant",
    "Children Play Area",
    "Piped Gas",
    "Private Garden",
    "Intercom"
  ];

  const handleQuickContinue = (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrors({ mobileNumber: "Please enter a valid 10-digit mobile number" });
      return;
    }
    setErrors({});
    setFormMode("full_form");
    setCurrentStep(1);
  };

  const handleAmenityToggle = (amenity) => {
    setListingData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleMockPhotoUpload = (e) => {
    const mockImages = [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
    ];
    setListingData((prev) => ({
      ...prev,
      photos: [...prev.photos, mockImages[prev.photos.length % mockImages.length]]
    }));
  };

  const handleRemovePhoto = (index) => {
    setListingData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!listingData.carpetArea) errs.carpetArea = "Carpet area is required";
    } else if (step === 2) {
      if (!listingData.locality) errs.locality = "Locality is required";
      if (!listingData.expectedPrice) errs.expectedPrice = "Expected price is required";
    } else if (step === 3) {
      if (!listingData.ownerName) errs.ownerName = "Your name is required";
      if (!listingData.ownerEmail) errs.ownerEmail = "Your email is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitted(true);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const formatPricePreview = (val) => {
    const num = parseFloat(val);
    if (!num || isNaN(num)) return "";
    if (num >= 10000000) {
      return `₹ ${(num / 10000000).toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      return `₹ ${(num / 100000).toFixed(2)} Lakh`;
    }
    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  const faqs = [
    {
      q: "Is posting a property on AuraLiving really 100% free?",
      a: "Yes, posting your property on AuraLiving is completely free with zero listing charges, zero upfront deposit, and lifetime free visibility to genuine verified homebuyers."
    },
    {
      q: "How soon will my property listing go live?",
      a: "Once submitted, our real estate verification desk reviews the title details and confirms property specifications within 2 to 4 business hours, after which it goes live to 5,50,000+ monthly active buyers."
    },
    {
      q: "Will my contact number be exposed publicly to spammers?",
      a: "No. AuraLiving prioritizes data privacy. Your contact details are shielded behind our secure lead router. Only pre-screened, verified buyers who match your property criteria are connected to you."
    },
    {
      q: "Can AuraLiving assist with buyer home loans and agreement registration?",
      a: "Absolutely. Our in-house banking and legal desks coordinate doorstep biometric e-registration, loan pre-approvals across 25+ banks, and draft agreement vetting for both parties."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Header */}
      <Header
        selectedCity="mumbai"
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Top Hero Section with Signature Purple Gradient (Matching PropertyPistol Reference) */}
        <section className="relative bg-gradient-to-br from-[#2D245A] via-[#3C3284] to-[#4F44AF] text-white pt-12 pb-24 sm:pb-32 overflow-hidden border-b border-[#241C4A]">
          {/* Wooden Floor visual aesthetic border at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#BFA382]/30 to-transparent pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#FFE2A7] font-semibold">Post Property</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Heading, Stats & Trust Quote */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[#FFE2A7] text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-[#FFE2A7]" />
                  <span>Zero Brokerage Listing Platform</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.15] text-white">
                  Sell or Rent your property, <br />
                  <span className="text-[#FFE2A7]">effortlessly.</span>
                </h1>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl font-light">
                  AuraLiving, India&apos;s foremost real estate authority, trusted for over a decade. Our expert team ensures your property is in safe hands. Enjoy hassle-free, lifetime-free listings on our intuitive platform, with dedicated experts to support your property sales or rentals.
                </p>

                {/* 3 Stats with Gold/Orange numbers */}
                <div className="flex items-center gap-8 sm:gap-12 pt-3">
                  <div>
                    <p className="text-2xl sm:text-4xl font-black text-[#D29324]">20,000+</p>
                    <p className="text-xs text-gray-300 font-medium mt-1">Brokers</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-4xl font-black text-[#D29324]">50,000+</p>
                    <p className="text-xs text-gray-300 font-medium mt-1">Properties</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-4xl font-black text-[#D29324]">50+</p>
                    <p className="text-xs text-gray-300 font-medium mt-1">Offices Globally</p>
                  </div>
                </div>

                {/* Floating Testimonial Quote (Matching Reference Screenshot) */}
                <div className="pt-4 max-w-xl">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white/90 shadow-xl">
                    <Quote className="w-6 h-6 text-[#D29324] mb-2 opacity-80" />
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic">
                      &ldquo;Their deep knowledge, personalized advice, and ethical approach set them apart. No need to look elsewhere for future transactions.&rdquo;
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-[#FFE2A7] font-semibold">
                      <span>Mr. Deepak Pakhare — Senior UX Designer, Amazon</span>
                      <div className="flex text-[#D29324]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Form Card (With "Post a FREE Listing" ribbon) */}
              <div className="lg:col-span-5">
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-[#252525] border border-white/40">
                  {/* Purple Ribbon Badge at top-left corner */}
                  <div className="absolute -top-3 left-6 bg-[#5B51D8] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-md shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#FFE2A7]" />
                    <span>Post a FREE Listing</span>
                  </div>

                  {formMode === "quick" ? (
                    /* Initial Quick Mobile Entry Form */
                    <form onSubmit={handleQuickContinue} className="space-y-5 pt-2">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-extrabold text-[#252525] tracking-tight">
                          Create New Property Listing
                        </h2>
                        <p className="text-xs text-gray-500">
                          Enter your phone number to get started with zero listing fee.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Mobile Number
                        </label>
                        <div className="flex rounded-xl border border-gray-300 focus-within:border-[#D29324] overflow-hidden shadow-xs transition-colors">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            aria-label="Country Code"
                            className="bg-gray-100 px-3 py-3 text-sm font-semibold text-gray-700 border-r border-gray-300 focus:outline-hidden cursor-pointer"
                          >
                            <option value="+91">+91 (IND)</option>
                            <option value="+971">+971 (UAE)</option>
                            <option value="+1">+1 (USA/CAN)</option>
                            <option value="+44">+44 (UK)</option>
                            <option value="+65">+65 (SGP)</option>
                          </select>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            value={mobileNumber}
                            onChange={(e) => {
                              setMobileNumber(e.target.value.replace(/\D/g, ""));
                              if (errors.mobileNumber) setErrors({});
                            }}
                            placeholder="Mobile Number"
                            className="w-full px-4 py-3 text-sm text-gray-900 focus:outline-hidden"
                          />
                        </div>
                        {errors.mobileNumber && (
                          <p className="text-xs text-red-500 mt-1 font-medium">{errors.mobileNumber}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-extrabold text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Continue to Listing Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="relative flex py-2 items-center">
                        <div className="grow border-t border-gray-200"></div>
                        <span className="shrink mx-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                          OR
                        </span>
                        <div className="grow border-t border-gray-200"></div>
                      </div>

                      {/* Sign In with Google Simulation */}
                      <button
                        type="button"
                        onClick={() => {
                          setMobileNumber("9876543210");
                          setFormMode("full_form");
                        }}
                        className="w-full py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Sign in with Google</span>
                      </button>

                      {/* Direct Phone Assistance */}
                      <div className="text-center pt-2 text-xs text-gray-500">
                        Or Just Call us on{" "}
                        <a href="tel:18008080190" className="font-bold text-[#AE7419] hover:underline">
                          +91 80 80 190 190
                        </a>
                      </div>

                      <p className="text-[10px] text-gray-400 leading-tight text-center">
                        I authorize AuraLiving Realty Private Limited to contact me via Call, SMS, or WhatsApp regarding property recommendations and verified buyer matchmaking.
                      </p>
                    </form>
                  ) : (
                    /* In-Card Shortcut to start listing */
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#AE7419] bg-[#FBF1DF] px-2.5 py-1 rounded">
                          Mobile: {countryCode} {mobileNumber}
                        </span>
                        <button
                          onClick={() => setFormMode("quick")}
                          className="text-xs text-gray-500 hover:text-gray-800 underline cursor-pointer"
                        >
                          Change Number
                        </button>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Listing Form In Progress
                      </h3>
                      <p className="text-xs text-gray-500">
                        Scroll down to complete your property configuration, location details, and photos below.
                      </p>
                      <button
                        onClick={() => {
                          const el = document.getElementById("full-listing-form");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Jump to Form Steps</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Comprehensive 3-Step Property Listing Flow (When user clicks continue or scrolls) */}
        <section id="full-listing-form" className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#E8E3DA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            {isSubmitted ? (
              /* Success Submission Screen */
              <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E8E3DA] shadow-xl text-center max-w-2xl mx-auto space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center shadow-md animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D29324] bg-[#FBF1DF] px-3 py-1 rounded-full">
                    Listing ID: AURA-LST-89214
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
                    Congratulations! Your Property is Listed!
                  </h2>
                  <p className="text-sm text-gray-600 max-w-lg mx-auto">
                    Your {listingData.bhk} {listingData.propertyType} in {listingData.locality || "Mumbai"} has been registered successfully on AuraLiving.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-[#FAF8F4] p-5 rounded-2xl border border-[#E8E3DA] text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Purpose:</span>
                    <span className="font-bold text-gray-900 uppercase">{listingData.purpose}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Expected Value:</span>
                    <span className="font-bold text-[#AE7419]">{formatPricePreview(listingData.expectedPrice) || "₹ Negotiable"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-500">Contact Person:</span>
                    <span className="font-bold text-gray-900">{listingData.ownerName || "Property Owner"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-bold text-green-600">Verification in Progress</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                      setFormMode("quick");
                    }}
                    className="px-6 py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    Post Another Property
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-[#E8E3DA] font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Back to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              /* The 3-Step Wizard */
              <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-lg overflow-hidden">
                {/* Stepper Header */}
                <div className="bg-[#FAF8F4] border-b border-[#E8E3DA] p-6 sm:p-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between relative">
                      {/* Step Line */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
                      <div
                        className="absolute top-1/2 left-0 h-1 bg-[#D29324] -translate-y-1/2 z-0 transition-all duration-300"
                        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                      />

                      {/* Step 1 */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                            currentStep >= 1 ? "bg-[#D29324] text-white shadow-md" : "bg-white text-gray-400 border border-gray-300"
                          }`}
                        >
                          1
                        </div>
                        <span className="text-xs font-bold text-gray-800 mt-2">Property Details</span>
                      </div>

                      {/* Step 2 */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                            currentStep >= 2 ? "bg-[#D29324] text-white shadow-md" : "bg-white text-gray-400 border border-gray-300"
                          }`}
                        >
                          2
                        </div>
                        <span className="text-xs font-bold text-gray-800 mt-2">Location & Pricing</span>
                      </div>

                      {/* Step 3 */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                            currentStep === 3 ? "bg-[#D29324] text-white shadow-md" : "bg-white text-gray-400 border border-gray-300"
                          }`}
                        >
                          3
                        </div>
                        <span className="text-xs font-bold text-gray-800 mt-2">Amenities & Photos</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wizard Body */}
                <div className="p-6 sm:p-10">
                  {/* STEP 1: Property Details */}
                  {currentStep === 1 && (
                    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Step 1: Property Basics</h3>
                        <p className="text-xs text-gray-500 mt-1">Specify whether you are selling or renting out, plus your configuration.</p>
                      </div>

                      {/* Purpose: Sell vs Rent */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          I Want To
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { id: "sell", label: "Sell Property", desc: "Find verified buyers ready with pre-approved loans" },
                            { id: "rent", label: "Rent Out", desc: "Connect with screened corporate & family tenants" }
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setListingData({ ...listingData, purpose: item.id })}
                              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                                listingData.purpose === item.id
                                  ? "border-[#D29324] bg-[#FBF1DF]/50 ring-2 ring-[#D29324]/20"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <p className="text-sm font-bold text-gray-900">{item.label}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property Type */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Property Type
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { id: "apartment", label: "Apartment / Flat" },
                            { id: "villa", label: "Villa / House" },
                            { id: "plot", label: "Plot / Land" },
                            { id: "penthouse", label: "Penthouse" }
                          ].map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setListingData({ ...listingData, propertyType: t.id })}
                              className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                listingData.propertyType === t.id
                                  ? "border-[#D29324] bg-[#D29324] text-white shadow-xs"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* BHK Configuration */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Bedrooms (BHK)
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bhk) => (
                            <button
                              key={bhk}
                              type="button"
                              onClick={() => setListingData({ ...listingData, bhk })}
                              className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                listingData.bhk === bhk
                                  ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419] ring-2 ring-[#D29324]/30"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              {bhk}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Carpet Area */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Carpet Area (sq. ft.) *
                        </label>
                        <div className="relative max-w-xs">
                          <input
                            type="number"
                            required
                            value={listingData.carpetArea}
                            onChange={(e) => setListingData({ ...listingData, carpetArea: e.target.value })}
                            placeholder="e.g. 850"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                            sq. ft.
                          </span>
                        </div>
                        {errors.carpetArea && (
                          <p className="text-xs text-red-500 mt-1 font-medium">{errors.carpetArea}</p>
                        )}
                      </div>

                      {/* Furnishing Status */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Furnishing Status
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { id: "fully-furnished", label: "Fully Furnished" },
                            { id: "semi-furnished", label: "Semi-Furnished" },
                            { id: "unfurnished", label: "Unfurnished" }
                          ].map((f) => (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => setListingData({ ...listingData, furnishing: f.id })}
                              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                listingData.furnishing === f.id
                                  ? "border-[#D29324] bg-[#FAF8F4] text-[#AE7419] font-bold"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-8 py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Proceed to Location & Pricing</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Location & Financials */}
                  {currentStep === 2 && (
                    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Step 2: Location & Financials</h3>
                        <p className="text-xs text-gray-500 mt-1">Provide locality details, society name, and expected value.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* City */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                            City
                          </label>
                          <select
                            value={listingData.city}
                            onChange={(e) => setListingData({ ...listingData, city: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                          >
                            <option value="Mumbai">Mumbai</option>
                            <option value="Pune">Pune</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Delhi NCR">Delhi NCR</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Dubai">Dubai (UAE)</option>
                          </select>
                        </div>

                        {/* Locality */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                            Locality / Sector *
                          </label>
                          <input
                            type="text"
                            required
                            value={listingData.locality}
                            onChange={(e) => setListingData({ ...listingData, locality: e.target.value })}
                            placeholder="e.g. Bandra West, Whitefield, Hinjewadi"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                          />
                          {errors.locality && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{errors.locality}</p>
                          )}
                        </div>
                      </div>

                      {/* Society / Project Name */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Project or Society Name
                        </label>
                        <input
                          type="text"
                          value={listingData.societyName}
                          onChange={(e) => setListingData({ ...listingData, societyName: e.target.value })}
                          placeholder="e.g. Godrej Horizon, Lodha Park, Prestige Lake Ridge"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                        />
                      </div>

                      {/* Expected Price / Rent */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                            {listingData.purpose === "sell" ? "Expected Selling Price (₹) *" : "Expected Monthly Rent (₹) *"}
                          </label>
                          {listingData.expectedPrice && (
                            <span className="text-xs font-extrabold text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded">
                              {formatPricePreview(listingData.expectedPrice)}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                            ₹
                          </span>
                          <input
                            type="number"
                            required
                            value={listingData.expectedPrice}
                            onChange={(e) => setListingData({ ...listingData, expectedPrice: e.target.value })}
                            placeholder={listingData.purpose === "sell" ? "e.g. 15000000 (1.5 Cr)" : "e.g. 45000 (45k/mo)"}
                            className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                          />
                        </div>
                        {errors.expectedPrice && (
                          <p className="text-xs text-red-500 mt-1 font-medium">{errors.expectedPrice}</p>
                        )}
                      </div>

                      {/* Possession Status */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Availability / Possession
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {[
                            { id: "ready-to-move", label: "Ready to Move / Immediate" },
                            { id: "within-30-days", label: "Within 30 Days" },
                            { id: "under-construction", label: "Under Construction" }
                          ].map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setListingData({ ...listingData, possession: p.id })}
                              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                listingData.possession === p.id
                                  ? "border-[#D29324] bg-[#FAF8F4] text-[#AE7419] font-bold"
                                  : "border-gray-200 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-8 py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Proceed to Amenities & Photos</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Amenities & Photos */}
                  {currentStep === 3 && (
                    <form onSubmit={handleFinalSubmit} className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Step 3: Amenities & Photos</h3>
                        <p className="text-xs text-gray-500 mt-1">Add features and upload high-resolution photos to attract 3x more buyer inquiries.</p>
                      </div>

                      {/* Amenities Checkbox Tags */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Key Amenities (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {availableAmenities.map((amenity) => {
                            const isSelected = listingData.amenities.includes(amenity);
                            return (
                              <button
                                key={amenity}
                                type="button"
                                onClick={() => handleAmenityToggle(amenity)}
                                className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                                  isSelected
                                    ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419] font-bold"
                                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                }`}
                              >
                                <span className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                                  isSelected ? "bg-[#D29324] border-[#D29324] text-white" : "border-gray-300"
                                }`}>
                                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </span>
                                <span>{amenity}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Photo Upload Dropzone */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Property Photos
                        </label>
                        <div
                          onClick={handleMockPhotoUpload}
                          className="border-2 border-dashed border-gray-300 hover:border-[#D29324] rounded-2xl p-6 text-center bg-gray-50 hover:bg-[#FAF8F4] transition-all cursor-pointer space-y-2"
                        >
                          <div className="w-12 h-12 rounded-full bg-[#FBF1DF] text-[#D29324] mx-auto flex items-center justify-center">
                            <Upload className="w-6 h-6" />
                          </div>
                          <p className="text-xs font-bold text-gray-800">
                            Click here to upload property photos
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Supported: JPG, PNG, WEBP (Max 10MB each). Add at least 1 photo for higher trust score.
                          </p>
                        </div>

                        {/* Uploaded Photos Preview Grid */}
                        {listingData.photos.length > 0 && (
                          <div className="grid grid-cols-3 gap-3 pt-3">
                            {listingData.photos.map((src, idx) => (
                              <div key={idx} className="relative rounded-xl overflow-hidden h-24 border border-gray-200 group">
                                <img src={src} alt="Uploaded Property" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemovePhoto(idx);
                                  }}
                                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Owner Contact Information */}
                      <div className="bg-[#FAF8F4] p-5 rounded-2xl border border-[#E8E3DA] space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                          <User className="w-4 h-4 text-[#D29324]" />
                          <span>Owner Details for Verification</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                            <input
                              type="text"
                              required
                              value={listingData.ownerName}
                              onChange={(e) => setListingData({ ...listingData, ownerName: e.target.value })}
                              placeholder="e.g. Ramesh Kulkarni"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                            />
                            {errors.ownerName && (
                              <p className="text-xs text-red-500 mt-1 font-medium">{errors.ownerName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                            <input
                              type="email"
                              required
                              value={listingData.ownerEmail}
                              onChange={(e) => setListingData({ ...listingData, ownerEmail: e.target.value })}
                              placeholder="e.g. ramesh@example.com"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-hidden focus:border-[#D29324]"
                            />
                            {errors.ownerEmail && (
                              <p className="text-xs text-red-500 mt-1 font-medium">{errors.ownerEmail}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Publish Property Free</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. Why List on AuraLiving Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D29324] bg-[#FBF1DF] px-3.5 py-1.5 rounded-full">
                Owner Advantages
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight mt-3">
                Why Property Owners Choose AuraLiving
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                We make listing, showing, and closing your property transaction completely painless.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "100% Zero Listing Fees",
                  desc: "List your property without paying any upfront registration, listing fees, or recurring subscription charges.",
                  icon: ShieldCheck
                },
                {
                  title: "5,50,000+ Verified Buyers",
                  desc: "Direct access to high-intent active homebuyers looking across Mumbai, Pune, Bangalore, and Delhi NCR.",
                  icon: User
                },
                {
                  title: "Assigned Property Manager",
                  desc: "A dedicated property advisor verifies buyer intent, handles site visit logistics, and coordinates offers.",
                  icon: Home
                },
                {
                  title: "Guaranteed Privacy",
                  desc: "No public exposure of your personal phone number. Our privacy firewall ensures zero marketing spam.",
                  icon: Lock
                }
              ].map((adv, idx) => {
                const Icon = adv.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] hover:bg-white hover:shadow-xl hover:border-[#D29324] transition-all space-y-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E3DA] text-[#D29324] flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{adv.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{adv.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Frequently Asked Questions Section */}
        <section className="py-20 bg-[#FAF8F4] border-t border-[#E8E3DA]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#252525] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-gray-500 mt-2">Everything you need to know about listing your property on AuraLiving.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#252525] hover:text-[#AE7419] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#D29324] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer onSelectCity={() => {}} />

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
