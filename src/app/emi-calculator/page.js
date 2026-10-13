"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Percent,
  Calendar,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Building2,
  Coins,
  Send,
  PhoneCall,
  Sparkles,
  Info,
  Clock,
  UserCheck
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";

export default function EmiCalculatorPage() {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Exact PropertyPistol Calculator Inputs
  const [monthlyNetIncome, setMonthlyNetIncome] = useState(100000); // Default ₹1,00,000
  const [interestRate, setInterestRate] = useState(8.5); // Default 8.5%
  const [tenureYears, setTenureYears] = useState(20); // Default 20 Years
  const [otherEmi, setOtherEmi] = useState(10000); // Default ₹10,000

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: ""
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Modal State for "Get in Touch"
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  // Helper to convert number to words for min/max labels (e.g. 10000 -> 10 Thousand, 10000000 -> 1 Crore)
  const inWords = (num) => {
    if (num >= 10000000) return `${num / 10000000} Crore`;
    if (num >= 100000) return `${num / 100000} Lakh`;
    if (num >= 1000) return `${num / 1000} Thousand`;
    return `${num}`;
  };

  const formatINR = (val) => {
    if (isNaN(val) || val === null || val === undefined) return "0";
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0
    }).format(Math.round(val));
  };

  // PropertyPistol's Exact Calculation Formula
  const calculation = useMemo(() => {
    const income = Number(monthlyNetIncome) || 0;
    const existingEmi = Number(otherEmi) || 0;
    const rate = Number(interestRate) || 0;
    const tenure = Number(tenureYears) || 0;

    if (isNaN(income) || isNaN(existingEmi) || isNaN(rate) || isNaN(tenure)) {
      return {
        isValid: false,
        sorryMessage: "One or more of the fields is invalid. Please reevaluate your input.",
        homeLoan: 0,
        homeLoanEmi: 0,
        totalInterestPayable: 0,
        loanAmountPercent: 50,
        interestPercent: 50
      };
    }

    // Exact PropertyPistol FOIR eligibility tier formula:
    let maxAllowedEmi = 0;
    if (income >= 0 && income < 25000) {
      maxAllowedEmi = 0;
    } else if (income >= 25000 && income <= 50000) {
      maxAllowedEmi = income / 2;
    } else if (income > 50000 && income < 100000) {
      maxAllowedEmi = income * 0.6;
    } else if (income >= 100000) {
      maxAllowedEmi = income * 0.65;
    }

    if (maxAllowedEmi < existingEmi) {
      return {
        isValid: false,
        sorryMessage: "Your existing EMI exceeds the maximum home loan EMI. Please reevaluate your input.",
        homeLoan: 0,
        homeLoanEmi: 0,
        totalInterestPayable: 0,
        loanAmountPercent: 50,
        interestPercent: 50
      };
    }

    const netEmi = maxAllowedEmi - existingEmi;

    if (rate === 0 || tenure === 0 || netEmi <= 0) {
      return {
        isValid: false,
        sorryMessage: "You are ineligible for Home Loan",
        homeLoan: 0,
        homeLoanEmi: 0,
        totalInterestPayable: 0,
        loanAmountPercent: 50,
        interestPercent: 50
      };
    }

    // PropertyPistol loan principal from EMI formula:
    const n = tenure * 12;
    const e = rate / (12 * 100);
    const b = Math.pow(1 + e, n);
    const homeLoan = Math.round((netEmi * (b - 1)) / (e * b));
    const totalInterestPayable = Math.max(0, netEmi * n - homeLoan);
    const totalAmount = homeLoan + totalInterestPayable;

    const loanAmountPercent = totalAmount > 0 ? Math.round((homeLoan / totalAmount) * 100) : 50;
    const interestPercent = 100 - loanAmountPercent;

    return {
      isValid: true,
      sorryMessage: "",
      homeLoan,
      homeLoanEmi: Math.round(netEmi),
      totalInterestPayable,
      loanAmountPercent,
      interestPercent
    };
  }, [monthlyNetIncome, interestRate, tenureYears, otherEmi]);

  // Banking partners matching PropertyPistol
  const bankingPartners = [
    { name: "HDFC Bank", logo: "HDFC Bank", rate: "8.40%*" },
    { name: "Axis Bank", logo: "Axis Bank", rate: "8.50%*" },
    { name: "State Bank of India", logo: "SBI", rate: "8.40%*" },
    { name: "ICICI Bank", logo: "ICICI Bank", rate: "8.50%*" },
    { name: "Aditya Birla Capital", logo: "Aditya Birla", rate: "8.65%*" },
    { name: "IDFC First Bank", logo: "IDFC FIRST", rate: "8.55%*" },
    { name: "Bajaj Finserv", logo: "Bajaj Finserv", rate: "8.60%*" },
    { name: "Godrej Housing Finance", logo: "Godrej Capital", rate: "8.50%*" }
  ];

  // FAQs matching PropertyPistol loan-service
  const faqs = [
    {
      q: "How to check home loan eligibility?",
      a: "You can check home loan eligibility for various banks and financial institutions using AuraLiving’s Home Loan Eligibility Calculator by simply entering basic details, such as income and existing liabilities."
    },
    {
      q: "Can a home loan be transferred to another person?",
      a: "A home loan cannot be transferred to another person unless the property ownership is also transferred. In some rare cases, a bank does allow for a home loan transfer in cases of inheritance or legal issues."
    },
    {
      q: "Is property insurance mandatory for a home loan?",
      a: "Yes, most lenders require property insurance as a condition for approving a home loan. It protects the property against damages due to natural calamities or fire, safeguarding the asset used as collateral."
    },
    {
      q: "What is a top-up loan on a home loan?",
      a: "A top-up loan is an additional loan granted over and above your existing home loan. It eliminates the need for extra paperwork and is readily accessible to borrowers with strong credit profiles."
    },
    {
      q: "Can home loans be restructured?",
      a: "Yes, under specific conditions, such as job loss, medical emergencies, or regulatory moratoriums, some lenders do allow for loan restructuring. However, you need to provide documents confirming the reason for the loan restructuring. The bank can also restructure the loan if you have a pending balance at the end of the loan tenure."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525]">
      {/* Global Header */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 1. HERO SECTION: Title, 4 Feature Pills, and Quick Enquiry Form */}
      <section className="bg-white border-b border-[#E8E3DA] py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-bold">
                <Coins className="w-4 h-4 text-[#D29324]" />
                <span>Calculate how much Home Loan you can get</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#252525] tracking-tight leading-tight">
                Own the{" "}
                <span className="relative inline-block text-[#D29324]">
                  home you love,
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 347 16"
                    className="absolute -bottom-2 left-0 w-full text-[#D29324]/60 fill-none stroke-current stroke-2"
                  >
                    <path d="M1.06778 11.041C128.535 -1.23448 376.852 -3.50706 342.81 14.5279" />
                  </svg>
                </span>
                <br />
                While keeping your future secure!
              </h1>

              <p className="text-sm sm:text-base text-[#6B7280] max-w-2xl leading-relaxed">
                Make your dream home a reality with AuraLiving&apos;s trusted home loan solutions.
                We partner with leading banks to offer fast, flexible, and hassle-free mortgage options.
              </p>

              {/* 4 Feature Pills in a Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold shrink-0">
                    <Percent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#252525] leading-tight">
                    Lowest<br />Interest Rate
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#252525] leading-tight">
                    Maximum<br />Eligibility
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#252525] leading-tight">
                    Maximum<br />Tenure
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#252525] leading-tight">
                    Design<br />Your EMI
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Enquiry Form Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-md space-y-4">
                <div className="border-b border-[#E8E3DA] pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Free Consultation
                  </span>
                  <h3 className="text-base font-extrabold text-[#252525]">
                    Looking for Home Loan? Enquire Now
                  </h3>
                </div>

                {enquirySubmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-900">Enquiry Received!</h4>
                    <p className="text-xs text-emerald-700">
                      Our home loan specialist will reach out within 2 hours with the best bank offers.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setEnquirySubmitted(true);
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="text-xs font-bold text-[#252525] block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={enquiryForm.fullName}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] text-xs font-medium bg-white focus:border-[#D29324] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#252525] block mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={enquiryForm.phoneNumber}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phoneNumber: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] text-xs font-medium bg-white focus:border-[#D29324] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#252525] block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] text-xs font-medium bg-white focus:border-[#D29324] focus:outline-hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all shadow-md flex items-center justify-center gap-2 pt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Details</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN BANNER: Title & Description */}
      <section className="bg-gradient-to-r from-[#FBF1DF]/60 to-[#FAF8F4] py-8 border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
            Home Loan <span className="text-[#D29324]">Eligibility Calculator</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-3xl mt-1 leading-relaxed">
            From finding to funding, we do it all! Be one step ahead to build your dream home.
            Use our calculator for precise calculations to confidently plan your finances.
          </p>
        </div>
      </section>

      {/* 3. CALCULATOR WORKBENCH: EXACT PROPERTYPISTOL #emi-calculator */}
      <section id="emi-calculator" className="py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-lg overflow-hidden">
            
            <div className="p-6 sm:p-8 border-b border-[#E8E3DA] bg-[#FAF8F4]/50">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#252525]">
                Calculate how much Home Loan you can get
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E3DA]">
              
              {/* LEFT COLUMN: The 4 Exact PropertyPistol Input Sliders */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-7">
                
                {/* 1. Monthly Net Income */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-[#252525]">
                      Monthly Net Income
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B7280]">₹</span>
                      <input
                        type="number"
                        min={10000}
                        max={10000000}
                        step={10000}
                        value={monthlyNetIncome}
                        onChange={(e) => setMonthlyNetIncome(Number(e.target.value))}
                        className="w-36 sm:w-44 pl-7 pr-3 py-1.5 rounded-xl border border-[#E8E3DA] text-right font-bold text-[#252525] text-sm bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={10000}
                    max={10000000}
                    step={10000}
                    value={monthlyNetIncome}
                    onChange={(e) => setMonthlyNetIncome(Number(e.target.value))}
                    className="w-full accent-[#D29324] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>₹ {inWords(10000)}</span>
                    <span className="font-semibold text-[#AE7419]">₹ {formatINR(monthlyNetIncome)}</span>
                    <span>₹ {inWords(10000000)}</span>
                  </div>
                </div>

                {/* 2. Interest Rates */}
                <div className="space-y-2 pt-2 border-t border-[#E8E3DA]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-[#252525]">
                      Interest Rates
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        max={15}
                        step={0.5}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-24 sm:w-28 pr-7 pl-3 py-1.5 rounded-xl border border-[#E8E3DA] text-right font-bold text-[#252525] text-sm bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B7280]">%</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={15}
                    step={0.5}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#D29324] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>0%</span>
                    <span className="font-semibold text-[#AE7419]">{interestRate}% p.a.</span>
                    <span>15%</span>
                  </div>
                </div>

                {/* 3. Tenure (Years) */}
                <div className="space-y-2 pt-2 border-t border-[#E8E3DA]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-[#252525]">
                      Tenure (Years)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={1}
                        max={30}
                        step={1}
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Number(e.target.value))}
                        className="w-20 pl-3 pr-2 py-1.5 rounded-xl border border-[#E8E3DA] text-right font-bold text-[#252525] text-sm bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                      />
                      <span className="text-xs font-bold text-[#6B7280]">
                        {tenureYears === 1 ? "Year" : "Years"}
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-[#D29324] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>1 Yr</span>
                    <span className="font-semibold text-[#AE7419]">{tenureYears} Years</span>
                    <span>30 Yr</span>
                  </div>
                </div>

                {/* 4. Other EMI’s */}
                <div className="space-y-2 pt-2 border-t border-[#E8E3DA]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-[#252525]">
                      Other EMI’s
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B7280]">₹</span>
                      <input
                        type="number"
                        min={0}
                        max={500000}
                        step={1000}
                        value={otherEmi}
                        onChange={(e) => setOtherEmi(Number(e.target.value))}
                        className="w-36 sm:w-44 pl-7 pr-3 py-1.5 rounded-xl border border-[#E8E3DA] text-right font-bold text-[#252525] text-sm bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={500000}
                    step={1000}
                    value={otherEmi}
                    onChange={(e) => setOtherEmi(Number(e.target.value))}
                    className="w-full accent-[#D29324] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>₹ 0</span>
                    <span className="font-semibold text-[#AE7419]">₹ {formatINR(otherEmi)}</span>
                    <span>₹ {inWords(500000)}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: PropertyPistol Exact Results Box (`emi-result`) */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col items-center justify-center bg-[#FAF8F4]/30 text-center">
                {calculation.isValid ? (
                  <div className="w-full space-y-6">
                    {/* Congratulations Banner */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-3 py-1 rounded-full">
                        Congratulations!
                      </span>
                      <p className="text-xs text-[#6B7280] pt-2">
                        You are eligible for the loan amount of
                      </p>
                      <div className="text-3xl sm:text-4xl font-black text-[#AE7419] tracking-tight">
                        ₹ {formatINR(calculation.homeLoan)}
                      </div>
                    </div>

                    {/* Circular Doughnut Visualization (Matching PropertyPistol chart) */}
                    <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background / Total Interest Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke="#757574"
                          strokeWidth="14"
                          fill="transparent"
                        />
                        {/* Loan Amount Stroke */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke="#D29324"
                          strokeWidth="14"
                          fill="transparent"
                          strokeDasharray="238.76"
                          strokeDashoffset={238.76 * (1 - calculation.loanAmountPercent / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Principal</span>
                        <span className="text-base font-extrabold text-[#252525]">{calculation.loanAmountPercent}%</span>
                      </div>
                    </div>

                    {/* Chart Legend */}
                    <div className="flex items-center justify-center gap-6 text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#D29324]"></span>
                        <span className="text-[#252525]">Loan Amount</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#757574]"></span>
                        <span className="text-[#6B7280]">Total Interest</span>
                      </div>
                    </div>

                    {/* EMI Readout */}
                    <div className="pt-2 border-t border-[#E8E3DA] space-y-1">
                      <span className="text-xs text-[#6B7280] block">Your EMI will be</span>
                      <div className="text-2xl font-black text-[#252525]">
                        <span className="text-[#AE7419]">₹ {formatINR(calculation.homeLoanEmi)}</span>
                        <span className="text-xs font-semibold text-[#6B7280] ml-1">/ Month</span>
                      </div>
                      <span className="text-[11px] text-[#6B7280] block">
                        Note: This is an estimate, actual amount may vary.
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => setIsGetInTouchOpen(true)}
                      className="w-full py-3 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all shadow-md"
                    >
                      Get in Touch
                    </button>
                  </div>
                ) : (
                  <div className="w-full p-6 text-center space-y-3">
                    <span className="text-base font-bold text-rose-600 block">Sorry!</span>
                    <p className="text-xs text-[#6B7280] max-w-xs mx-auto">
                      {calculation.sorryMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OVERVIEW SECTION (Matching PropertyPistol's 8-year legacy text) */}
      <section className="py-12 bg-white border-y border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-4xl mx-auto text-center">
            Over the last 8 years, AuraLiving has found a significant gap while handling the financial needs of 
            various stakeholders in this industry. The property dealings fall through the crack for want of funds — 
            either by the developer or the buyer. AuraLiving has established a dedicated vertical that has been 
            successfully handling the loan requirements for all the stakeholders. The company aims to provide you with 
            hassle-free financing options with rapid approvals, flexible options and timely closings!
          </p>
        </div>
      </section>

      {/* 5. BANKING PARTNERS SECTION */}
      <section className="py-14 bg-[#FAF8F4]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#252525]">
              Our Banking Partners
            </h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Tie-ups with India&apos;s most reputed financial institutions for preferential interest rates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bankingPartners.map((bank, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#E8E3DA] text-center shadow-xs hover:border-[#D29324] hover:shadow-md transition-all space-y-1.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold mx-auto mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#252525]">{bank.name}</h4>
                <span className="text-[11px] font-semibold text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded-md inline-block">
                  Rates from {bank.rate}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOME LOAN JOURNEY & DOCUMENT CHECKLIST TABLES (Exact PropertyPistol tables) */}
      <section className="py-14 bg-white border-t border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#252525]">
              Get started on your Home Loan journey
            </h2>
          </div>

          {/* Table 1: Home Loan Documents Required */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-[#AE7419]">
              Home Loan Documents Required
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#E8E3DA]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F4] text-[#252525] font-bold border-b border-[#E8E3DA]">
                  <tr>
                    <th className="p-3.5">Identity Proof (any one)</th>
                    <th className="p-3.5">Residence Proof (any one)</th>
                    <th className="p-3.5">Other Documents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DA] text-[#6B7280]">
                  <tr>
                    <td className="p-3.5">Driving License</td>
                    <td className="p-3.5">Copy of Electricity Bill / Water Bill / Telephone Bill</td>
                    <td className="p-3.5">Employer Identity Card</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">PAN Card</td>
                    <td className="p-3.5">Copy of valid Passport / Aadhaar Card / Driving License</td>
                    <td className="p-3.5">Duly filled loan application form affixed with 3 passport size photographs</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Voter ID</td>
                    <td className="p-3.5">—</td>
                    <td className="p-3.5">Loan account statement for the previous 12 months if ongoing loan exists</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Valid Passport</td>
                    <td className="p-3.5">—</td>
                    <td className="p-3.5">Bank account statements for all accounts owned for the last 6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Income Proof Documents */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-[#AE7419]">
              Income Proof Documents
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#E8E3DA]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F4] text-[#252525] font-bold border-b border-[#E8E3DA]">
                  <tr>
                    <th className="p-3.5 w-1/2">For Self-employed Applicant / Co-applicant</th>
                    <th className="p-3.5 w-1/2">For Salaried Applicant / Co-applicant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DA] text-[#6B7280]">
                  <tr>
                    <td className="p-3.5">Income Tax Returns for the last 3 years</td>
                    <td className="p-3.5">Salary Slips for the last three months</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Certificate of Qualification (for Doctors, CAs, Professionals)</td>
                    <td className="p-3.5">Copy of Form 16 or Income Tax Returns for the last 2 years</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Audited Balance Sheet &amp; Profit and Loss statement for previous 3 years</td>
                    <td className="p-3.5">—</td>
                  </tr>
                  <tr>
                    <td className="p-3.5">Business License Details &amp; Business Address Proof</td>
                    <td className="p-3.5">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 3: Home Loan Eligibility */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-[#AE7419]">
              Home Loan Eligibility
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#E8E3DA]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F4] text-[#252525] font-bold border-b border-[#E8E3DA]">
                  <tr>
                    <th className="p-3.5 w-1/3">Eligibility Criteria</th>
                    <th className="p-3.5 w-2/3">Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DA] text-[#6B7280]">
                  <tr>
                    <td className="p-3.5 font-bold text-[#252525]">Age</td>
                    <td className="p-3.5">Minimum Age: 18 years and Maximum Age: 70 years</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-[#252525]">Resident Type</td>
                    <td className="p-3.5">Resident Indian, Non-Resident Indian (NRI), or Person of Indian Origin (PIO)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-[#252525]">Employment</td>
                    <td className="p-3.5">Salaried or Self-employed professional/business owner</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-[#252525]">Net Annual Income</td>
                    <td className="p-3.5">At least Rs. 5-6 Lakhs depending on the type of employment</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-[#252525]">Credit Score</td>
                    <td className="p-3.5">A credit score of at least 750 or more obtained from CIBIL / Experian</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs (Matching PropertyPistol FAQ list) */}
      <section className="py-14 bg-[#FAF8F4]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-5">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#252525]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E8E3DA] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#252525] flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D29324] transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 text-xs text-[#6B7280] leading-relaxed border-t border-[#E8E3DA] bg-[#FAF8F4]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* Modal: Get in Touch / Apply for Home Loan */}
      {isGetInTouchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-[#E8E3DA] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#252525]">Apply for Home Loan</h3>
                <p className="text-xs text-[#6B7280]">Eligible Amount: ₹ {formatINR(calculation.homeLoan)}</p>
              </div>
              <button
                onClick={() => setIsGetInTouchOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Our home loan relationship manager will contact you shortly.");
                setIsGetInTouchOpen(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-bold text-[#252525] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] text-xs bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#252525] block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] text-xs bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all shadow-md"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
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
