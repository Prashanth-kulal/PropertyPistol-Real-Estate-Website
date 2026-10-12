"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  IndianRupee,
  CheckCircle2,
  Percent,
  Calendar,
  FileText,
  ShieldCheck,
  Building2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Info,
  Clock,
  Send,
  Sparkles,
  PhoneCall,
  UserCheck,
  Check,
  FileCheck2,
  AlertCircle
} from "lucide-react";
import Header from "@/components/layout/Header";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";

export default function HomeLoanPage() {
  // Global Header and Modal States
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // 1. Hero Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    allowSellers: true,
    whatsappUpdates: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // 2. Eligibility Calculator State
  const [income, setIncome] = useState(100000); // Monthly Net Income ₹1,00,000
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 Years
  const [otherEmis, setOtherEmis] = useState(10000); // Other EMIs ₹10,000

  // 3. Document Tabs State (salaried vs self-employed)
  const [activeDocTab, setActiveDocTab] = useState("salaried");

  // 4. FAQ Accordion State (open FAQ index)
  const [openFaq, setOpenFaq] = useState(0);

  // Format INR Currency helper
  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Math.round(val));
  };

  // Live Loan Calculation Logic
  // Using 50% FOIR (Fixed Obligation to Income Ratio)
  const calculationResults = useMemo(() => {
    const foirRatio = 0.5; // standard bank FOIR ratio
    const maxAllowedEmi = Math.max(0, income * foirRatio - otherEmis);

    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    if (maxAllowedEmi <= 0 || monthlyRate <= 0) {
      return {
        eligibleLoan: 0,
        monthlyEmi: 0,
        totalInterest: 0,
        totalAmount: 0,
        principalPercent: 50,
        interestPercent: 50
      };
    }

    // PV = EMI * [( (1+r)^n - 1 ) / ( r * (1+r)^n )]
    const discountFactor =
      (Math.pow(1 + monthlyRate, totalMonths) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
    const eligibleLoan = Math.round(maxAllowedEmi * discountFactor);

    const totalAmount = Math.round(maxAllowedEmi * totalMonths);
    const totalInterest = Math.max(0, totalAmount - eligibleLoan);

    const principalPercent = totalAmount > 0 ? Math.round((eligibleLoan / totalAmount) * 100) : 50;
    const interestPercent = 100 - principalPercent;

    return {
      eligibleLoan,
      monthlyEmi: maxAllowedEmi,
      totalInterest,
      totalAmount,
      principalPercent,
      interestPercent
    };
  }, [income, interestRate, tenureYears, otherEmis]);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.fullName || !enquiryForm.phoneNumber) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEnquirySubmitted(true);
    }, 600);
  };

  // Banking Partners Data
  const bankingPartners = [
    {
      name: "State Bank of India (SBI)",
      logo: "/images/home-loan/sbi.png",
      indicativeRate: "8.40%*",
      maxTenure: "30 Years",
      processingFee: "0.35%*"
    },
    {
      name: "HDFC Bank",
      logo: "/images/home-loan/hdfc.png",
      indicativeRate: "8.50%*",
      maxTenure: "30 Years",
      processingFee: "0.50%*"
    },
    {
      name: "ICICI Bank",
      logo: "/images/home-loan/icici.png",
      indicativeRate: "8.60%*",
      maxTenure: "30 Years",
      processingFee: "0.50%*"
    },
    {
      name: "Axis Bank",
      logo: "/images/home-loan/axis.png",
      indicativeRate: "8.70%*",
      maxTenure: "30 Years",
      processingFee: "0.50%*"
    },
    {
      name: "IDFC FIRST Bank",
      logo: "/images/home-loan/idfc.png",
      indicativeRate: "8.65%*",
      maxTenure: "30 Years",
      processingFee: "0.40%*"
    },
    {
      name: "Bajaj Housing Finance",
      logo: "/images/home-loan/bajaj-finserv.png",
      indicativeRate: "8.55%*",
      maxTenure: "30 Years",
      processingFee: "0.25%*"
    },
    {
      name: "Aditya Birla Capital",
      logo: "/images/home-loan/abc.png",
      indicativeRate: "8.75%*",
      maxTenure: "25 Years",
      processingFee: "0.50%*"
    },
    {
      name: "Godrej Housing Finance",
      logo: "/images/home-loan/ghf.png",
      indicativeRate: "8.55%*",
      maxTenure: "30 Years",
      processingFee: "0.35%*"
    }
  ];

  // FAQ Items
  const faqItems = [
    {
      question: "How to check home loan eligibility?",
      answer:
        "You can check your approximate home loan eligibility across top banks using AuraLiving’s Home Loan Eligibility Calculator above. Simply enter your net monthly income, preferred interest rate, desired loan tenure, and existing EMIs to instantly preview your maximum borrowing capacity and estimated monthly installments."
    },
    {
      question: "Can a home loan be transferred to another person?",
      answer:
        "A home loan cannot be directly transferred to another person unless the property's legal ownership is formally conveyed and transferred through a registered deed. In rare cases involving legal inheritance or court mandates, banks facilitate novation and loan restructuring after verifying the new owner's creditworthiness."
    },
    {
      question: "Is property insurance mandatory for a home loan?",
      answer:
        "Yes, most lending institutions require comprehensive property insurance as a prerequisite for loan disbursement. This safeguards the mortgaged real estate against structural damages from natural disasters, earthquakes, or fire, ensuring the collateral retains its asset value."
    },
    {
      question: "What is a top-up loan on a home loan?",
      answer:
        "A top-up loan is an additional credit facility extended over and above your existing active home loan. It requires minimal paperwork, offers competitive interest rates compared to personal loans, and can be utilized for home renovations, interior work, or personal liquidity requirements."
    },
    {
      question: "Can home loans be restructured?",
      answer:
        "Yes, lenders allow loan restructuring under qualifying scenarios such as unforeseen job transitions, medical emergencies, or regulatory guidelines. Borrowers can request tenure extensions or moratorium adjustments by submitting supporting documentation to their relationship manager."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#252525] font-sans selection:bg-[#FBF1DF] selection:text-[#AE7419]">
      {/* Global AuraLiving Header */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 1. HERO SECTION matching reference layout */}
      <section className="relative bg-gradient-to-b from-[#FDFBF7] via-white to-[#FAF8F4] pt-8 sm:pt-12 pb-16 lg:pb-20 overflow-hidden border-b border-[#E8E3DA]/60">
        {/* Subtle Decorative Golden Rings */}
        <div className="absolute top-12 right-12 lg:right-40 w-96 h-96 rounded-full border border-[#D29324]/10 pointer-events-none"></div>
        <div className="absolute top-24 right-20 lg:right-48 w-72 h-72 rounded-full border border-[#D29324]/15 pointer-events-none"></div>
        <div className="absolute top-36 right-28 lg:right-56 w-48 h-48 rounded-full border border-[#D29324]/20 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Gold Coin Pill Badge */}
              <a
                href="#calculator"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#E8E3DA] shadow-xs text-xs font-semibold text-gray-800 hover:border-[#D29324] hover:shadow-sm transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-[#FBF1DF] flex items-center justify-center text-[#D29324] font-black text-xs">
                  ₹
                </div>
                <span>Calculate how much Home Loan you can get</span>
              </a>

              {/* Main Headline matching reference */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#252525] tracking-tight leading-[1.18]">
                  Own the{" "}
                  <span className="relative inline-block text-[#D29324]">
                    home you love,
                    {/* Hand-drawn accent curved underline */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-[#D29324]"
                      viewBox="0 0 250 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 9C60 3 190 2 247 9"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#252525] tracking-tight leading-[1.18]">
                  While keeping your future secure!
                </h2>
              </div>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl font-normal">
                Make your dream home a reality with AuraLiving&apos;s trusted home loan solutions. We partner with India&apos;s leading banks to offer fast, flexible, and hassle-free mortgage options.
              </p>

              {/* 4 Feature Badges with Icons matching reference */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {/* 1. Lowest Interest Rate */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-gray-800 leading-tight">
                    Lowest<br />Interest Rate
                  </div>
                </div>

                {/* 2. Maximum Eligibility */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-gray-800 leading-tight">
                    Maximum<br />Eligibility
                  </div>
                </div>

                {/* 3. Maximum Tenure */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-gray-800 leading-tight">
                    Maximum<br />Tenure
                  </div>
                </div>

                {/* 4. Design Your EMI */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-gray-800 leading-tight">
                    Design<br />Your EMI
                  </div>
                </div>
              </div>
            </div>

            {/* Right Enquire Now Card Column (5 cols) matching reference */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="w-full max-w-[430px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E3DA] relative">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-5">
                  Looking for Home Loan? Enquire Now
                </h3>

                {enquirySubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Enquiry Received!</h4>
                    <p className="text-xs text-gray-600 px-2 leading-relaxed">
                      Thank you <span className="font-semibold text-gray-900">{enquiryForm.fullName}</span>. An AuraLiving home finance specialist will contact you at <span className="font-semibold text-gray-900">{enquiryForm.phoneNumber}</span> with personalized bank offers.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEnquirySubmitted(false);
                        setEnquiryForm({
                          fullName: "",
                          phoneNumber: "",
                          email: "",
                          allowSellers: true,
                          whatsappUpdates: true
                        });
                      }}
                      className="text-xs font-bold text-[#AE7419] hover:underline cursor-pointer pt-2 inline-block"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        required
                        value={enquiryForm.fullName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#D29324] focus:ring-2 focus:ring-[#D29324]/20 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={enquiryForm.phoneNumber}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phoneNumber: e.target.value })}
                        placeholder="Phone Number (10 Digits)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#D29324] focus:ring-2 focus:ring-[#D29324]/20 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#D29324] focus:ring-2 focus:ring-[#D29324]/20 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white"
                      />
                    </div>

                    {/* Checkboxes matching reference */}
                    <div className="space-y-2 pt-1 text-xs text-gray-600">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={enquiryForm.allowSellers}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, allowSellers: e.target.checked })}
                          className="w-4 h-4 rounded text-[#D29324] accent-[#D29324]"
                        />
                        <span>Allow other sellers to Contact</span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={enquiryForm.whatsappUpdates}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, whatsappUpdates: e.target.checked })}
                          className="w-4 h-4 rounded text-[#D29324] accent-[#D29324]"
                        />
                        <span>Get WhatsApp Updates</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D29324] to-[#AE7419] hover:from-[#AE7419] hover:to-[#8C5810] text-white font-extrabold text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer mt-2 disabled:opacity-75"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Details"}
                    </button>

                    {/* Mandatory Disclaimer */}
                    <p className="text-[10px] text-gray-400 leading-tight pt-2 text-center">
                      I authorize AuraLiving and its representatives to Call, SMS, WhatsApp me about its products and offers. This consent overrides any DND registration.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN BANNER / CALCULATOR INTRO BANNER matching reference */}
      <section className="bg-[#1C1816] text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline & Pitch */}
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Home Loan Eligibility <span className="text-[#D29324]">Calculator</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                From finding to funding, we do it all! Be one step ahead to build your dream home. Use our calculator&apos;s precise calculations to confidently plan your finances.
              </p>
            </div>

            {/* Right Graphic Badge / Building Thumbnail */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-44 sm:w-56 h-36 sm:h-44 flex items-center justify-center">
                <Image
                  src="/images/home-loan/home-loan-banner.png"
                  alt="Home Loan Architecture Graphic"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE HOME LOAN ELIGIBILITY CALCULATOR (#calculator) matching reference sliders and breakdown */}
      <section id="calculator" className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8E3DA] shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Calculate how much <span className="text-[#AE7419]">Home Loan</span> you can get
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Calculate your home loan eligibility using the sliders below
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left 4 Sliders Column (7 cols) */}
              <div className="lg:col-span-7 space-y-7">
                
                {/* 1. Monthly Net Income */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-gray-800">
                      Monthly Net Income
                    </label>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E8E3DA] shadow-xs">
                      <span className="text-xs font-bold text-gray-500">₹</span>
                      <input
                        type="number"
                        min="10000"
                        max="1000000"
                        step="5000"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-24 text-right text-xs sm:text-sm font-bold text-[#AE7419] outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="5000"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full accent-[#D29324] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                    <span>₹ 10 K</span>
                    <span>₹ 10 Lac</span>
                  </div>
                </div>

                {/* 2. Interest Rates */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-gray-800">
                      Interest Rates
                    </label>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E8E3DA] shadow-xs">
                      <input
                        type="number"
                        min="6.5"
                        max="15"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-16 text-right text-xs sm:text-sm font-bold text-[#AE7419] outline-none"
                      />
                      <span className="text-xs font-bold text-gray-500">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="6.5"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#D29324] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                    <span>6.5%</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* 3. Tenure (Years) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-gray-800">
                      Tenure (Years)
                    </label>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E8E3DA] shadow-xs">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        step="1"
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Number(e.target.value))}
                        className="w-14 text-right text-xs sm:text-sm font-bold text-[#AE7419] outline-none"
                      />
                      <span className="text-xs font-bold text-gray-500">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-[#D29324] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                    <span>1 Yr</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                {/* 4. Other EMIs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-gray-800">
                      Other EMI’s
                    </label>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E8E3DA] shadow-xs">
                      <span className="text-xs font-bold text-gray-500">₹</span>
                      <input
                        type="number"
                        min="0"
                        max="500000"
                        step="2500"
                        value={otherEmis}
                        onChange={(e) => setOtherEmis(Number(e.target.value))}
                        className="w-20 text-right text-xs sm:text-sm font-bold text-[#AE7419] outline-none"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="2500"
                    value={otherEmis}
                    onChange={(e) => setOtherEmis(Number(e.target.value))}
                    className="w-full accent-[#D29324] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                    <span>₹ 0</span>
                    <span>₹ 5 Lac</span>
                  </div>
                </div>

              </div>

              {/* Right Output Results & Donut Chart (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-lg flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Maximum Eligible Loan
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#AE7419]">
                    {formatINR(calculationResults.eligibleLoan)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on standard 50% debt-to-income banking norms
                  </p>
                </div>

                {/* Visual Ratio Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D29324]"></span>
                      Principal ({calculationResults.principalPercent}%)
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                      Interest ({calculationResults.interestPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden flex">
                    <div
                      className="bg-[#D29324] h-full transition-all duration-300"
                      style={{ width: `${calculationResults.principalPercent}%` }}
                    ></div>
                    <div
                      className="bg-gray-400 h-full transition-all duration-300"
                      style={{ width: `${calculationResults.interestPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Breakdown Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div className="p-3 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]/80">
                    <span className="text-[10px] text-gray-500 block uppercase font-bold">Estimated Monthly EMI</span>
                    <span className="text-base sm:text-lg font-black text-gray-900 mt-0.5 block">
                      {formatINR(calculationResults.monthlyEmi)}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]/80">
                    <span className="text-[10px] text-gray-500 block uppercase font-bold">Total Interest Payable</span>
                    <span className="text-base sm:text-lg font-black text-gray-900 mt-0.5 block">
                      {formatINR(calculationResults.totalInterest)}
                    </span>
                  </div>
                </div>

                {/* CTA Action */}
                <a
                  href="#home"
                  className="w-full py-3.5 rounded-xl bg-[#252525] hover:bg-[#D29324] text-white text-xs sm:text-sm font-bold text-center transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for this Loan Offer</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-[10px] text-gray-400 text-center leading-tight">
                  *Indicative estimate for demonstration purposes only. Final sanction is subject to lender credit appraisal.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR BANKING PARTNERS SECTION matching reference logos */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#E8E3DA]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Our Banking <span className="text-[#D29324]">Partners</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              We collaborate with premier commercial banks and housing finance corporations to negotiate the best mortgage terms for you.
            </p>
          </div>

          {/* Bank Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {bankingPartners.map((bank, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F4] hover:bg-white p-5 rounded-2xl border border-[#E8E3DA] hover:border-[#D29324] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Bank Logo */}
                  <div className="h-14 w-full flex items-center justify-center mb-4 p-2 bg-white rounded-xl border border-gray-100">
                    <div className="relative w-full h-10">
                      <Image
                        src={bank.logo}
                        alt={bank.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 text-center line-clamp-1 group-hover:text-[#AE7419] transition-colors">
                    {bank.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Starting Rate:</span>
                    <strong className="text-emerald-700 font-bold">{bank.indicativeRate}</strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Max Tenure:</span>
                    <span className="font-semibold text-gray-900">{bank.maxTenure}</span>
                  </div>
                </div>

                <a
                  href="#home"
                  className="mt-4 w-full py-2 rounded-lg bg-white group-hover:bg-[#D29324] text-[#AE7419] group-hover:text-white border border-[#E8E3DA] group-hover:border-[#D29324] text-[11px] font-bold text-center transition-colors block"
                >
                  Check Eligibility
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <span className="text-[11px] text-gray-400">
              *Sample indicative interest rates and terms. Loan sanction is at the sole discretion of the respective financial institution.
            </span>
          </div>

        </div>
      </section>

      {/* 5. GET STARTED ON YOUR HOME LOAN JOURNEY (DOCUMENTS & ELIGIBILITY) matching reference */}
      <section className="py-16 sm:py-20 bg-[#FAF8F4] border-t border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Get started on your <span className="text-[#D29324]">Home Loan journey</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Everything you need to know about documentation and eligibility criteria before applying.
            </p>
          </div>

          {/* Part A: Home Loan Documents Required */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-md mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  Home Loan Documents Required
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Keep these mandatory KYC and income verification documents ready for rapid sanction
                </p>
              </div>

              {/* Salaried vs Self-Employed Pill Toggle */}
              <div className="inline-flex p-1 rounded-xl bg-gray-100 border border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveDocTab("salaried")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeDocTab === "salaried"
                      ? "bg-white text-[#AE7419] shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Salaried Applicant
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDocTab("self-employed")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeDocTab === "self-employed"
                      ? "bg-white text-[#AE7419] shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Self-Employed Applicant
                </button>
              </div>
            </div>

            {/* Standard KYC Documents (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Card 1: Identity Proof */}
              <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FBF1DF] text-[#D29324] flex items-center justify-center">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Identity Proof (any one)
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> PAN Card (Mandatory)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Aadhaar Card</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Valid Passport</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Voter ID Card</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Driving License</li>
                </ul>
              </div>

              {/* Card 2: Residence Proof */}
              <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FBF1DF] text-[#D29324] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Residence Proof (any one)
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Electricity / Water Utility Bill</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Telephone / Postpaid Mobile Bill</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Valid Passport / Aadhaar Card</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Registered Rent Agreement (if rented)</li>
                </ul>
              </div>

              {/* Card 3: Other Documents */}
              <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FBF1DF] text-[#D29324] flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    General Loan Documents
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Signed Application Form + 3 Photos</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Employer Official Identity Card</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> Last 6 Months Bank Account Statement</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#D29324]" /> 12 Months Existing Loan Statement (if any)</li>
                </ul>
              </div>
            </div>

            {/* Income Proof Section (Toggled) */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF8F4] to-white border border-[#E8E3DA]">
              <h4 className="text-xs font-bold text-[#AE7419] uppercase tracking-wider mb-3">
                Income Proof Documents: {activeDocTab === "salaried" ? "For Salaried Applicant" : "For Self-Employed Applicant"}
              </h4>

              {activeDocTab === "salaried" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-700">
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                    <span>Salary Slips for the last 3 consecutive months</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                    <span>Form 16 or Income Tax Returns for last 2 assessment years</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                    <span>Bank account salary credit statements for last 6 months</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-gray-700">
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                    <span>Income Tax Returns for the last 3 years with computation</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                    <span>Balance Sheet & P&L audited by a certified CA for 3 years</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                    <span>Business registration license & commercial address proof</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                    <span>TDS Certificate (Form 26AS) / Professional Qualifications</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Part B: Home Loan Eligibility Criteria Table matching reference */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E3DA] shadow-md">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
              Home Loan Eligibility Criteria
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Standard regulatory benchmarks evaluated by Indian financial institutions
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-[#FAF8F4] text-gray-800 font-bold uppercase text-[11px] tracking-wider">
                    <th className="py-3 px-4">Eligibility Criteria</th>
                    <th className="py-3 px-4">Requirement Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">Age</td>
                    <td className="py-3.5 px-4">Minimum Age: 18 years | Maximum Age: 70 years at loan maturity</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">Resident Type</td>
                    <td className="py-3.5 px-4">Resident Indian, Non-Resident Indian (NRI), or Person of Indian Origin (PIO)</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">Employment</td>
                    <td className="py-3.5 px-4">Salaried employee, self-employed business owner, or practicing professional (Doctor, CA, etc.)</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">Net Annual Income</td>
                    <td className="py-3.5 px-4">At least ₹4–6 Lakh per annum depending on employment category and city Tier</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">Residence</td>
                    <td className="py-3.5 px-4">Permanent residence ownership or rented accommodation with at least 1 year stay history</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">Credit Score</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        750 or above
                      </span>{" "}
                      recommended from recognized credit bureaus (CIBIL / Experian)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS SECTION matching reference */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Frequently Asked <span className="text-[#D29324]">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Common questions answered by our mortgage advisors
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E8E3DA] overflow-hidden transition-all bg-white shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 hover:text-[#AE7419] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#D29324]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-[#FAF8F4]/50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. COMPLETE FOOTER SECTION WITH AURALIVING BRANDING */}
      <footer className="bg-[#181818] text-white pt-14 pb-8 border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12">
            
            {/* Left Brand Column */}
            <div className="md:col-span-4 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex items-end gap-[3px] h-7 shrink-0">
                  <span className="w-1.5 h-3 bg-[#D29324] rounded-xs"></span>
                  <span className="w-1.5 h-4.5 bg-[#AE7419] rounded-xs"></span>
                  <span className="w-1.5 h-6 bg-[#D29324] rounded-xs"></span>
                  <span className="w-1.5 h-7 bg-[#8C5810] rounded-xs"></span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-[22px] font-black tracking-tight text-white">
                      AURA<span className="text-[#D29324]">LIVING</span>
                    </span>
                    <span className="text-[12px] font-semibold text-gray-400">.com</span>
                  </div>
                  <span className="text-[8px] font-bold tracking-widest text-[#AE7419] uppercase -mt-1">
                    Your Trusted Real Estate Partner
                  </span>
                </div>
              </Link>

              <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                India&apos;s premier real estate & mortgage facilitation portal connecting prospective home buyers with verified builders, lowest loan rates, and zero-brokerage advisory.
              </p>
            </div>

            {/* Center Quick Navigation Links */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wide">
                Loan Services
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#calculator" className="hover:text-[#D29324] transition-colors">Home Loan Eligibility Calculator</a></li>
                <li><a href="#calculator" className="hover:text-[#D29324] transition-colors">EMI Calculator</a></li>
                <li><a href="#home" className="hover:text-[#D29324] transition-colors">Balance Transfer Solutions</a></li>
                <li><a href="#home" className="hover:text-[#D29324] transition-colors">Loan Against Property (LAP)</a></li>
                <li><Link href="/services/syndicate" className="hover:text-[#D29324] transition-colors">Syndicate Broker Partnership</Link></li>
              </ul>
            </div>

            {/* Right Contact Hotline Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wide">
                Contact Mortgage Support
              </h4>

              <div className="space-y-1">
                <span className="text-[11px] text-gray-400 block">Toll Free Support Hotline:</span>
                <a
                  href="tel:18008080190"
                  className="text-base sm:text-lg font-black text-[#D29324] hover:underline block"
                >
                  +91 8080 190 190
                </a>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-[11px] text-gray-400 block">Email Financial Advisory:</span>
                <a
                  href="mailto:loans@auraliving.com"
                  className="text-sm font-bold text-white hover:text-[#D29324] transition-colors block"
                >
                  loans@auraliving.com
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
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <span className="text-[10px] text-gray-600">Calculations are indicative demonstration estimates.</span>
            </div>
          </div>

        </div>
      </footer>

      {/* City Selector Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
      />

      {/* Aura AI Modal */}
      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

    </div>
  );
}
