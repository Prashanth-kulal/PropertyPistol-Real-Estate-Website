"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Printer,
  Download,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Edit2,
  Calendar,
  Send,
  Building2,
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const YEARS = [2023, 2024, 2025, 2026];

export default function RentReceiptGeneratorPage() {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Workflow Steps: 1 = Tenant & Rent, 2 = Landlord & Property, 3 = Final Confirmation
  const [currentStep, setCurrentStep] = useState(1);
  const [showGeneratedPreview, setShowGeneratedPreview] = useState(false);

  // Exact PropertyPistol Form Data
  const [formData, setFormData] = useState({
    tenantName: "Rahul Sharma",
    rent: "32000",
    fromMonth: 3, // April (0-indexed)
    fromYear: 2024,
    toMonth: 5, // June (0-indexed)
    toYear: 2024,
    landlordName: "Vikramaditya Mehta",
    landlordPan: "ABCDE1234F",
    address: "Flat 402, Sunshine Heights, Hiranandani Gardens, Powai, Mumbai - 400076"
  });

  const [panError, setPanError] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  // "Looking for Property? Enquire Now" Form State
  const [propertyEnquiry, setPropertyEnquiry] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    allowOtherSellers: true,
    whatsappUpdates: true
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Validate PAN format
  const handlePanChange = (val) => {
    const pan = val.toUpperCase().slice(0, 10);
    setFormData((prev) => ({ ...prev, landlordPan: pan }));
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (pan.length > 0 && !panRegex.test(pan)) {
      setPanError("Invalid PAN Format (e.g. ABCDE1234F)");
    } else {
      setPanError("");
    }
  };

  // Step 1 validation
  const handleStep1Next = () => {
    if (!formData.tenantName.trim()) {
      alert("Please enter Tenant Full Name");
      return;
    }
    if (!formData.rent || Number(formData.rent) <= 0) {
      alert("Please enter a valid Monthly Rent");
      return;
    }
    setCurrentStep(2);
  };

  // Step 2 validation
  const handleStep2Next = () => {
    if (!formData.landlordName.trim()) {
      alert("Please enter Landlord Full Name");
      return;
    }
    if (!formData.address.trim()) {
      alert("Please enter Property Address");
      return;
    }
    if (panError) {
      alert("Please correct the Landlord PAN or leave it empty");
      return;
    }
    setCurrentStep(3);
  };

  // Reset form
  const handleStartAgain = () => {
    setFormData({
      tenantName: "",
      rent: "",
      fromMonth: new Date().getMonth(),
      fromYear: new Date().getFullYear(),
      toMonth: new Date().getMonth(),
      toYear: new Date().getFullYear(),
      landlordName: "",
      landlordPan: "",
      address: ""
    });
    setPanError("");
    setCurrentStep(1);
    setShowGeneratedPreview(false);
  };

  // Handle Enquiry submission (Demo behaviour, frontend-only)
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  // Generate list of months between fromMonth/fromYear and toMonth/toYear
  const generatedReceipts = useMemo(() => {
    const receipts = [];
    const startDate = new Date(formData.fromYear, formData.fromMonth, 1);
    const endDate = new Date(formData.toYear, formData.toMonth, 1);

    if (startDate > endDate) {
      receipts.push({
        id: "001",
        month: MONTHS[formData.fromMonth],
        year: formData.fromYear
      });
      return receipts;
    }

    let curr = new Date(startDate);
    let count = 1;
    while (curr <= endDate && count <= 12) {
      receipts.push({
        id: String(count).padStart(3, "0"),
        month: MONTHS[curr.getMonth()],
        year: curr.getFullYear()
      });
      curr.setMonth(curr.getMonth() + 1);
      count++;
    }
    return receipts;
  }, [formData.fromMonth, formData.fromYear, formData.toMonth, formData.toYear]);

  // Exact PropertyPistol FAQs
  const faqs = [
    {
      q: "Is Revenue Stamp Required For Rent Receipts?",
      a: "The need for a revenue stamp depends on the payment mode you have used to pay your rent. You need a revenue stamp on your receipt if you pay your rent with cash, and it's more than Rs. 5,000. However, if you have paid rent through a check, bank transfer, or any other non-cash way, there is no need for a revenue stamp."
    },
    {
      q: "How much tax benefit is availed by submitting rent receipts to employers?",
      a: "The maximum tax savings depend on multiple factors. Your tax benefit is restricted upto the lowest of the following three variables: (1) HRA received from your employer, (2) Actual rent paid less 10% of your basic salary, or (3) 50% of basic pay if you live in a metropolitan city and 40% for a non-metropolitan city."
    },
    {
      q: "Is the landlord's PAN required to claim HRA?",
      a: "If your annual rent is over Rs 1,00,000, you must use the landlord's PAN number to claim an HRA exemption."
    },
    {
      q: "What evidence is required to claim HRA?",
      a: "You need a rent agreement and rent slips to claim HRA exemption."
    },
    {
      q: "My landlord is refusing to give me a rent receipt. What can I do?",
      a: "In this case, you can use the online rent receipt generator to create a rent receipt and get it signed by your landlord."
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

      {/* Breadcrumb matching PropertyPistol */}
      <div className="bg-white border-b border-[#E8E3DA] py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
            <Link href="/" className="hover:text-[#D29324] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="capitalize">{selectedCity}</span>
            <span>/</span>
            <span className="text-[#AE7419] font-bold">Rent Receipt Generator</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 w-full space-y-12">
        
        {/* Top Two-Column Workspace: Multi-Step Cards on Left, "Looking for Property? Enquire Now" on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Multi-Step Form Cards (Exact PropertyPistol Workflow) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* CARD 1: Tenant & Rent Card */}
            <div
              className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-sm transition-all duration-300 relative ${
                currentStep > 1 ? "opacity-60 bg-gray-50/60" : ""
              }`}
            >
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold text-[#AE7419] hover:text-[#D29324]"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
              )}

              <h3 className="text-base font-extrabold text-[#252525] mb-4">
                1. Tenant &amp; Rent Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#6B7280] block mb-1">
                    Tenant Full Name *
                  </label>
                  <input
                    type="text"
                    disabled={currentStep > 1}
                    value={formData.tenantName}
                    onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                    placeholder="Enter Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-semibold bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#6B7280] block mb-1">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    disabled={currentStep > 1}
                    value={formData.rent}
                    onChange={(e) => setFormData({ ...formData, rent: e.target.value.replace(/[^0-9]/g, "") })}
                    placeholder="Enter Rent"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-sm font-bold bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#6B7280] block mb-1">
                    Rent Paying Period *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#6B7280]">From Month &amp; Year</span>
                      <div className="flex gap-1.5">
                        <select
                          disabled={currentStep > 1}
                          value={formData.fromMonth}
                          onChange={(e) => setFormData({ ...formData, fromMonth: Number(e.target.value) })}
                          className="w-full px-2 py-1.5 rounded-lg border border-[#E8E3DA] text-xs font-bold bg-[#FAF8F4]"
                        >
                          {MONTHS.map((m, idx) => (
                            <option key={m} value={idx}>{m.slice(0, 3)}</option>
                          ))}
                        </select>
                        <select
                          disabled={currentStep > 1}
                          value={formData.fromYear}
                          onChange={(e) => setFormData({ ...formData, fromYear: Number(e.target.value) })}
                          className="w-20 px-2 py-1.5 rounded-lg border border-[#E8E3DA] text-xs font-bold bg-[#FAF8F4]"
                        >
                          {YEARS.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-[#6B7280]">To Month &amp; Year</span>
                      <div className="flex gap-1.5">
                        <select
                          disabled={currentStep > 1}
                          value={formData.toMonth}
                          onChange={(e) => setFormData({ ...formData, toMonth: Number(e.target.value) })}
                          className="w-full px-2 py-1.5 rounded-lg border border-[#E8E3DA] text-xs font-bold bg-[#FAF8F4]"
                        >
                          {MONTHS.map((m, idx) => (
                            <option key={m} value={idx}>{m.slice(0, 3)}</option>
                          ))}
                        </select>
                        <select
                          disabled={currentStep > 1}
                          value={formData.toYear}
                          onChange={(e) => setFormData({ ...formData, toYear: Number(e.target.value) })}
                          className="w-20 px-2 py-1.5 rounded-lg border border-[#E8E3DA] text-xs font-bold bg-[#FAF8F4]"
                        >
                          {YEARS.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {currentStep === 1 && (
                  <button
                    type="button"
                    onClick={handleStep1Next}
                    className="w-full py-2.5 rounded-xl border border-[#D29324] text-[#AE7419] font-bold text-xs hover:bg-[#D29324] hover:text-white transition-all shadow-xs"
                  >
                    Next &rarr;
                  </button>
                )}
              </div>
            </div>

            {/* CARD 2: Landlord & Property Card */}
            {currentStep >= 2 && (
              <div
                className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-sm transition-all duration-300 relative ${
                  currentStep > 2 ? "opacity-60 bg-gray-50/60" : ""
                }`}
              >
                {currentStep > 2 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold text-[#AE7419] hover:text-[#D29324]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                )}

                <h3 className="text-base font-extrabold text-[#252525] mb-4">
                  2. Landlord &amp; Property Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] block mb-1">
                      Landlord’s Full Name *
                    </label>
                    <input
                      type="text"
                      disabled={currentStep > 2}
                      value={formData.landlordName}
                      onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
                      placeholder="Enter Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-semibold bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[#6B7280]">
                        Landlord’s PAN Card (Optional)
                      </label>
                      {panError && (
                        <span className="text-[10px] text-rose-600 font-bold">{panError}</span>
                      )}
                    </div>
                    <input
                      type="text"
                      maxLength={10}
                      disabled={currentStep > 2}
                      value={formData.landlordPan}
                      onChange={(e) => handlePanChange(e.target.value)}
                      placeholder="Enter PAN Number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] font-mono text-xs font-bold bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden uppercase disabled:bg-gray-100"
                    />
                    <span className="text-[10px] text-[#6B7280] block mt-1">
                      Required if annual rent exceeds ₹1,00,000 for HRA deduction.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#6B7280] block mb-1">
                      Property Address *
                    </label>
                    <textarea
                      rows={2}
                      disabled={currentStep > 2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter Full Address"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden resize-none disabled:bg-gray-100"
                    />
                  </div>

                  {currentStep === 2 && (
                    <button
                      type="button"
                      onClick={handleStep2Next}
                      className="w-full py-2.5 rounded-xl border border-[#D29324] text-[#AE7419] font-bold text-xs hover:bg-[#D29324] hover:text-white transition-all shadow-xs"
                    >
                      Generate Receipt &rarr;
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* CARD 3: Final Confirmation Card */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-md space-y-5 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
                    RENT PAID TO
                  </span>
                  <h3 className="text-lg font-black text-[#252525]">
                    {formData.landlordName}
                  </h3>
                  <div className="text-base font-extrabold text-[#AE7419]">
                    ₹{Number(formData.rent).toLocaleString("en-IN")}{" "}
                    <span className="text-xs font-medium text-[#6B7280]">per month</span>
                  </div>
                  <div className="text-xs text-[#6B7280] pt-1">
                    {generatedReceipts.length === 1
                      ? `For ${generatedReceipts[0].month} ${generatedReceipts[0].year}`
                      : `From ${generatedReceipts[0].month} ${generatedReceipts[0].year} To ${generatedReceipts[generatedReceipts.length - 1].month} ${generatedReceipts[generatedReceipts.length - 1].year}`}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleStartAgain}
                    className="flex-1 py-2.5 rounded-xl border border-[#E8E3DA] text-[#6B7280] font-bold text-xs hover:text-[#252525] bg-[#FAF8F4]"
                  >
                    Start Again
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGeneratedPreview(!showGeneratedPreview)}
                    className="flex-1 py-2.5 rounded-xl border border-[#D29324] text-[#AE7419] font-bold text-xs hover:bg-[#FBF1DF] transition-all flex items-center justify-center gap-1.5"
                  >
                    {showGeneratedPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showGeneratedPreview ? "Hide Preview" : "Preview Receipts"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 rounded-xl bg-[#D29324] text-white font-bold text-xs hover:bg-[#AE7419] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Print</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: EXACT MISSING "Looking for Property? Enquire Now" SECTION */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3DA] shadow-md space-y-5">
              
              <div className="border-b border-[#E8E3DA] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Assistance Desk
                </span>
                <h3 className="text-lg font-extrabold text-[#252525]">
                  Looking for Property? Enquire Now
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Get personalized recommendations from verified zero-brokerage property advisors.
                </p>
              </div>

              {enquirySubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2.5 animate-in fade-in duration-300">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    Thank You for Sharing Your Details!
                  </h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Our property relationship manager will connect with you shortly with verified listings.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEnquirySubmitted(false)}
                    className="text-xs font-semibold text-emerald-800 underline pt-1"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  {/* 1. Full Name */}
                  <div>
                    <label className="text-xs font-bold text-[#252525] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={propertyEnquiry.fullName}
                      onChange={(e) => setPropertyEnquiry({ ...propertyEnquiry, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                    />
                  </div>

                  {/* 2. Phone Number */}
                  <div>
                    <label className="text-xs font-bold text-[#252525] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={propertyEnquiry.phoneNumber}
                      onChange={(e) => setPropertyEnquiry({ ...propertyEnquiry, phoneNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                    />
                  </div>

                  {/* 3. Email */}
                  <div>
                    <label className="text-xs font-bold text-[#252525] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={propertyEnquiry.email}
                      onChange={(e) => setPropertyEnquiry({ ...propertyEnquiry, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium bg-[#FAF8F4] focus:border-[#D29324] focus:outline-hidden"
                    />
                  </div>

                  {/* 4. Checkbox: Allow other sellers to Contact */}
                  <div className="pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propertyEnquiry.allowOtherSellers}
                        onChange={(e) => setPropertyEnquiry({ ...propertyEnquiry, allowOtherSellers: e.target.checked })}
                        className="w-4 h-4 rounded text-[#D29324] accent-[#D29324] focus:ring-0"
                      />
                      <span className="text-xs font-medium text-[#252525]">
                        Allow other sellers to Contact
                      </span>
                    </label>
                  </div>

                  {/* 5. Checkbox: Get WhatsApp Updates */}
                  <div>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={propertyEnquiry.whatsappUpdates}
                        onChange={(e) => setPropertyEnquiry({ ...propertyEnquiry, whatsappUpdates: e.target.checked })}
                        className="w-4 h-4 rounded text-[#D29324] accent-[#D29324] focus:ring-0"
                      />
                      <span className="text-xs font-medium text-[#252525]">
                        Get WhatsApp Updates
                      </span>
                    </label>
                  </div>

                  {/* Consent Text */}
                  <p className="text-[10px] text-[#6B7280] leading-relaxed pt-1 border-t border-[#E8E3DA]">
                    I authorize PROPERTY PISTOL REALTY PRIVATE LIMITED and its representatives to Call, SMS, RCS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                  </p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Get Contact Details</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CONDITIONALLY RENDERED RECEIPT PREVIEWS: Only visible when user completes form and requests preview */}
        {currentStep === 3 && showGeneratedPreview && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-md space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#AE7419] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#D29324]" />
                  Generated Rent Receipts ({generatedReceipts.length} Slip{generatedReceipts.length > 1 ? "s" : ""})
                </span>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Ready for HRA Tax Exemption submission under Section 10(13A).
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slips</span>
              </button>
            </div>

            {/* Individual Receipt Cards */}
            <div className="space-y-4">
              {generatedReceipts.map((rcpt) => (
                <div
                  key={rcpt.id}
                  className="bg-[#FAF8F4] rounded-2xl p-6 border border-[#E8E3DA] shadow-xs space-y-4 print:border-none print:shadow-none print:bg-white"
                >
                  <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-black text-[#252525] tracking-wide">
                        RENT RECEIPT
                      </span>
                      <span className="text-xs font-bold text-[#6B7280]">
                        {rcpt.month} {rcpt.year}
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#6B7280]">
                      Receipt No. : <strong className="text-[#252525]">{rcpt.id}</strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#252525] leading-relaxed">
                    Received a sum of{" "}
                    <strong className="text-[#AE7419] font-extrabold">
                      Rs {Number(formData.rent || 0).toLocaleString("en-IN")}/-
                    </strong>{" "}
                    from{" "}
                    <strong className="font-bold underline decoration-[#D29324] underline-offset-4">
                      {formData.tenantName || "____________________"}
                    </strong>{" "}
                    towards the rent of property located at{" "}
                    <strong className="font-semibold">
                      {formData.address || "________________________________________"}
                    </strong>{" "}
                    for the month of{" "}
                    <strong className="text-[#252525]">
                      {rcpt.month} {rcpt.year}
                    </strong>
                    .
                  </p>

                  <div className="pt-4 border-t border-[#E8E3DA] flex items-end justify-between text-xs">
                    <div>
                      <div className="font-semibold text-[#6B7280]">
                        Date : <strong className="text-[#252525]">1 {rcpt.month} {rcpt.year}</strong>
                      </div>
                      <div className="text-[10px] text-[#6B7280] italic mt-0.5">
                        Generated through www.auraliving.com
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="font-bold text-[#252525]">
                        {formData.landlordName || "____________________"}
                      </div>
                      {formData.landlordPan && (
                        <div className="text-[10px] font-mono font-semibold text-[#6B7280]">
                          PAN: {formData.landlordPan}
                        </div>
                      )}
                      <div className="w-20 h-10 border border-dashed border-rose-300 bg-rose-50/50 rounded flex items-center justify-center text-[8px] text-rose-700 font-bold ml-auto mt-1">
                        REVENUE STAMP
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ARTICLES & FAQS SECTION (Exact PropertyPistol Content) */}
        <div className="pt-10 border-t border-[#E8E3DA] space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left 8 cols: PropertyPistol exact informative text */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-[#252525]">
                  What is Rent Receipt?
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  The rent receipt is the physical document issued by the landlord to the tenant as proof of rent payment. 
                  It includes details such as the tenant’s name, address, rent amount, payment mode, tenancy period, and landlord’s signature.
                  Typically, it is issued by the landlord only, but if you don’t receive a rent receipt, you can use an online rent receipt 
                  that can be downloaded from the rent receipt generator tool.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-[#252525]">
                  Why do you Need Rent Receipts?
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  Rent receipts serve as evidence of rent paid to the landlord. And, if you are a salaried individual, these rent receipts 
                  can help you to save your taxes. If you are a salaried individual, you may also get a house rent allowance as part of your CTC. 
                  The employer gives it to cover your accommodation expenses, but it is taxable, too. However, the complete HRA amount is not taxable; 
                  you can claim HRA exemption as per the HRA rules. Your employer may ask you to submit rent receipts to claim this exemption. 
                  This is where you need rent receipts to claim HRA exemption and save your taxes.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold text-[#252525]">
                  How to Download Rent Slip through AuraLiving’s Rent Receipt Generator?
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Please find below the steps to generate the rent receipts for FREE using the approved house rent receipt format:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-[#6B7280] pl-4 list-disc">
                  <li>
                    <strong className="text-[#252525]">Step 1:</strong> To generate an online rent receipt, you need to first fill out your full name and the monthly rent you pay.
                  </li>
                  <li>
                    <strong className="text-[#252525]">Step 2:</strong> Enter the duration for which you need to generate the rent receipts.
                  </li>
                  <li>
                    <strong className="text-[#252525]">Step 3:</strong> Fill in your house owner&apos;s name, PAN number (if you have) and the full address of the rented property, where you reside.
                  </li>
                  <li>
                    <strong className="text-[#252525]">Step 4:</strong> On the final screen, you can preview the sample, print or download rent receipts pdf with just a single click.
                  </li>
                </ul>
              </div>

              {/* Exact FAQs */}
              <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
                <h3 className="text-base font-bold text-[#252525] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#D29324]" />
                  <span>Frequently Asked Questions</span>
                </h3>

                <div className="space-y-3">
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
            </div>

            {/* Right 4 cols: Quick Rental Desk Callout */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-[#E8E3DA] shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#252525]">
                  Need a Registered Rent Agreement?
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Generate legally valid, e-stamped and biometrically verified leave and license agreements delivered directly to your doorstep.
                </p>
                <Link
                  href="/rent-agreement"
                  className="w-full py-2.5 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all text-center block shadow-sm"
                >
                  Create Agreement Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

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
