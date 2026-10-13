"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  X,
  ExternalLink,
  Check,
  BookOpen,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Info
} from "lucide-react";

export default function RentAgreementPage() {
  // Global Header Modals State
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Top Special Offer Notification Banner State
  const [showNotification, setShowNotification] = useState(true);

  // Form State matching authentic PropertyPistol form fields exactly
  const [role, setRole] = useState("Owner"); // "Owner", "Tenant", "Other"
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion State (first item open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Handle Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !mobileNumber) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFullName("");
    setMobileNumber("");
    setEmailAddress("");
  };

  // 15 Comprehensive FAQs matching authentic reference
  const faqList = [
    {
      q: "What is the validation of an online rent agreement?",
      a: "Validation of an online rental agreement refers to the process of confirming that the agreement is legally binding, properly stamped, and enforceable under the Registration Act. This includes identity verification of both parties through Aadhaar-based biometrics and official registration with the Inspector General of Registration (IGR)."
    },
    {
      q: "Along with the Soft copy will I also get a hard copy in the online rent agreement?",
      a: "Yes. In addition to the instantly downloadable digital PDF agreement, you can opt for an official doorstep delivery of the color-printed and bound agreement copy for a nominal handling fee."
    },
    {
      q: "How to sign an online rent agreement?",
      a: "After filling in the property and tenancy details in our online form, a certified AuraLiving executive visits your doorstep at your selected time slot to capture Aadhaar-linked biometric verification, eliminating the need to visit the sub-registrar office."
    },
    {
      q: "How much is paid for a stamp duty in an online rent agreement?",
      a: "The stamp duty on an online rent agreement is determined according to state-specific government regulations (typically calculated as a percentage of the total rent plus non-refundable deposit over the lease duration). Our platform automatically computes the exact official government stamp duty and registration fees."
    },
    {
      q: "Is there only a 11 month tenure in an online rent agreement?",
      a: "Generally, online rental agreements can be drafted for any mutually agreed lease period, from a few months up to multiple years. The 11-month tenure is the most common industry standard in India as it simplifies regulatory compliance under standard tenancy laws."
    },
    {
      q: "Will I be able to edit the conditions in an online rent agreement?",
      a: "Yes! AuraLiving provides an interactive digital drafting tool where both landlord and tenant can customize standard clauses, add society bylaws, specify pet policies, and review the draft before government submission."
    },
    {
      q: "What is the time duration to complete an online rent agreement?",
      a: "While filling out the online details takes under 5 minutes, doorstep biometric capture is scheduled at your convenience within 24–48 hours. Once biometrics are completed, government e-registration is typically concluded within 2 to 3 working days."
    },
    {
      q: "How is it possible for the tenant/landlord to sign this rent agreement online?",
      a: "Both parties can complete their Aadhaar-based biometric authentication independently at their respective preferred locations—even if the landlord and tenant reside in different cities across India."
    },
    {
      q: "What is the total fee for creating the online rent agreement?",
      a: "The total fee comprises official government stamp duty, government registration charges, and AuraLiving's transparent drafting and doorstep biometric assistance fee. There are zero hidden costs, and you receive an itemized breakdown upfront."
    },
    {
      q: "Is it possible for me to execute and sign the online rent agreement from anywhere in the world?",
      a: "Yes. For Non-Resident Indians (NRIs) or landlords stationed overseas, we facilitate PoA (Power of Attorney) drafting or digital e-sign protocols to ensure seamless execution without international travel."
    },
    {
      q: "Is it possible to add multiple tenants in this Rent agreement?",
      a: "Yes, our platform supports multi-tenant co-living and joint tenancy agreements. Details and identity verifications of all co-tenants can be seamlessly added into a single registered document."
    },
    {
      q: "What if my landlord/tenant claims that they never signed the rent agreement after digitally signing it?",
      a: "Aadhaar-based biometric signatures are backed by cryptographic government audit logs, timestamps, and legal validity under Section 3A of the Information Technology Act, providing indisputable evidence in any court of law."
    },
    {
      q: "Is it necessary to print the online rent agreement, or is a soft copy sufficient?",
      a: "The digitally registered and government-stamped soft copy is 100% legally valid for all official purposes including passport applications, bank accounts, police verification, and tax exemptions (HRA). You may also keep a printed copy for physical filing."
    },
    {
      q: "What documents are required to make the online rent agreement?",
      a: "Only three simple documents are required: 1. Aadhaar Card and PAN card of Landlord and Tenant; 2. Electricity bill or Index-II / Property Tax receipt verifying the property address; 3. Aadhaar details of two witnesses."
    },
    {
      q: "What is the legal validity of an E-signature in a Rent Agreement?",
      a: "In India, The Indian Contract Act 1872, The Information Technology Act 2000, and The IT (Amendment) Act 2008 explicitly recognize Electronic Signatures and electronic government registrations as completely legal and binding contracts."
    }
  ];

  // 4 Articles in Rent Agreement Guide matching PropertyPistol
  const guideArticles = [
    {
      title: "Tenant Laws in India: Know Your Rights for a Fair Rental Experience",
      date: "Feb 18, 2025",
      description: "A comprehensive guide to tenant rights, protection against unlawful eviction, standard maintenance obligations, and security deposit return protocols.",
      category: "Tenant Rights"
    },
    {
      title: "Common Rental Agreement Mistakes to Avoid",
      date: "Feb 18, 2025",
      description: "Essential tips for landlords and tenants to ensure a smooth tenancy, avoid ambiguous termination notice periods, and clarify utility liabilities.",
      category: "Legal Advice"
    },
    {
      title: "How to Make Rental Agreement Online?",
      date: "Feb 18, 2025",
      description: "A step-by-step guide to creating a legally binding e-registered contract from home, scheduling doorstep biometrics, and receiving stamped documents.",
      category: "Step-by-Step Guide"
    },
    {
      title: "Landlord Laws in India: Essential Rights and Obligations for Property Owners",
      date: "Feb 18, 2025",
      description: "Protecting your asset and rights: an in-depth walkthrough of lawful rent revisions, eviction recourse under state rent control acts, and dispute mitigation.",
      category: "Landlord Advisory"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#252525] font-sans selection:bg-[#FBF1DF] selection:text-[#AE7419]">
      
      {/* 1. TOP SPECIAL OFFER ANNOUNCEMENT BANNER matching reference */}
      {showNotification && (
        <div className="bg-gradient-to-r from-[#D29324] via-[#AE7419] to-[#8C5810] text-white py-2 px-4 relative z-50 text-center text-xs font-semibold shadow-xs flex items-center justify-center gap-3">
          <span>
            Special Offer - Get Assured ₹500 Amazon Voucher after successful transaction!{" "}
            <Link href="/privacy-policy" className="underline hover:text-white/80 transition-colors">
              *T&amp;C Apply
            </Link>
          </span>
          <button
            type="button"
            onClick={() => setShowNotification(false)}
            aria-label="Close notification"
            className="p-1 hover:bg-black/20 rounded-full transition-colors cursor-pointer text-white/90 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. GLOBAL AURALIVING HEADER */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 3. HERO & MAIN TWO-COLUMN SECTION */}
      <main className="relative pt-6 sm:pt-10 pb-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT COLUMN: HERO HEADING, BADGES, AND SCROLLABLE CONTENT (8 COLS) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* SECTION 1: HERO TITLE & TRUST BADGES */}
              <div className="space-y-5">
                
                {/* Main Headline with Accent Underline SVG matching reference */}
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#252525] tracking-tight leading-[1.25]">
                  Hassle-Free Online Rent Agreement that{" "}
                  <span className="relative inline-block text-[#D29324]">
                    People Love
                    {/* Authentic gradient line SVG matching reference */}
                    <span className="absolute -bottom-2 left-0 w-full block">
                      <Image
                        src="/images/rent-agreement/gradient-line.svg"
                        alt="Accent Line"
                        width={220}
                        height={12}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </span>
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-2xl">
                  Get started with a simple, secure, and legally compliant rent agreement – all from the comfort of home.
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E3DA] text-xs font-bold text-[#252525] shadow-xs">
                    <Star className="w-4 h-4 text-[#D29324] fill-[#D29324]" />
                    <span>4.9 Rating – Trusted by Customers</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/30 text-xs font-bold text-[#AE7419]">
                    <ShieldCheck className="w-4 h-4 text-[#D29324]" />
                    <span>100% Legally Secure</span>
                  </div>
                </div>

                {/* Customer Testimonial Card (Visible on desktop) */}
                <div className="hidden lg:flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E3DA] shadow-xs max-w-2xl mt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D29324] to-[#AE7419] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                    RK
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs sm:text-sm text-[#252525] leading-relaxed italic">
                      &ldquo;AuraLiving made the whole rent agreement process super easy and stress-free! I didn&apos;t even have to travel because they sent a biometric device right to my doorstep. No need for any middlemen, and everything was done quickly. It&apos;s amazing how smooth and convenient they&apos;ve made this – highly recommend!&rdquo;
                    </p>
                    <div className="text-xs font-bold text-[#AE7419]">
                      — Radhika, Mumbai
                    </div>
                  </div>
                </div>

              </div>

              {/* SECTION 2: HERE'S HOW IT WORKS IN 3 EASY STEPS! */}
              <div className="space-y-6 pt-4 border-t border-[#E8E3DA]">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#AE7419] tracking-wider uppercase">
                    SAFE, SECURE AND CONVENIENT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                    Here&apos;s How It Works in 3 Easy Steps!
                  </h2>
                </div>

                {/* Process Graphic matching reference */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E3DA] shadow-xs flex justify-center">
                  {/* Desktop graphic */}
                  <div className="hidden sm:block w-full max-w-2xl">
                    <Image
                      src="/images/rent-agreement/registration-steps.svg"
                      alt="How It Works in 3 Easy Steps"
                      width={860}
                      height={260}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  {/* Mobile graphic */}
                  <div className="sm:hidden w-full max-w-xs">
                    <Image
                      src="/images/rent-agreement/registration-steps-mobile.svg"
                      alt="How It Works in 3 Easy Steps"
                      width={360}
                      height={480}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: THE MOST AFFORDABLE RENT AGREEMENT SERVICE IN MARKET! (6 CARDS) */}
              <div className="space-y-6 pt-4 border-t border-[#E8E3DA]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  The Most Affordable Rent Agreement Service in Market!
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. Lowest Price in Market */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-all space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] flex items-center justify-center">
                      <Image
                        src="/images/rent-agreement/graph-icon.svg"
                        alt="Lowest Price in Market"
                        width={28}
                        height={28}
                      />
                    </div>
                    <h3 className="text-base font-bold text-[#252525]">Lowest Price in Market</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      High-Quality Legal Documents at Affordable Prices.
                    </p>
                  </div>

                  {/* 2. Biometric KYC at Your Doorstep */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-all space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] flex items-center justify-center">
                      <Image
                        src="/images/rent-agreement/finger-icon.svg"
                        alt="Biometric KYC at Your Doorstep"
                        width={28}
                        height={28}
                      />
                    </div>
                    <h3 className="text-base font-bold text-[#252525]">Biometric KYC at Your Doorstep</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Biometrics at Home – 100% Safe and Secure.
                    </p>
                  </div>

                  {/* 3. Fast and Effortless Online Drafting */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-all space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] flex items-center justify-center">
                      <Image
                        src="/images/rent-agreement/clock-icon.svg"
                        alt="Fast and Effortless Online Drafting"
                        width={28}
                        height={28}
                      />
                    </div>
                    <h3 className="text-base font-bold text-[#252525]">Fast and Effortless Online Drafting</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Download Your Agreement – Absolutely Free!
                    </p>
                  </div>

                  {/* 4. Dedicated Relationship Manager */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-all space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] flex items-center justify-center">
                      <Image
                        src="/images/rent-agreement/rm-icon.svg"
                        alt="Dedicated Relationship Manager"
                        width={28}
                        height={28}
                      />
                    </div>
                    <h3 className="text-base font-bold text-[#252525]">Dedicated Relationship Manager</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Your Personal Point of Contact for Seamless Support.
                    </p>
                  </div>

                  {/* 5. Share a Link to Fill in the Information */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-all space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] flex items-center justify-center">
                      <Image
                        src="/images/rent-agreement/share-icon.svg"
                        alt="Share a Link to Fill in the Information"
                        width={28}
                        height={28}
                      />
                    </div>
                    <h3 className="text-base font-bold text-[#252525]">Share a Link to Fill in the Information</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      No Details? Let the Other Party Fill It In!
                    </p>
                  </div>

                  {/* 6. Assistance Over the Phone */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs hover:border-[#D29324] transition-all space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] flex items-center justify-center">
                      <Image
                        src="/images/rent-agreement/assistance-call-icon.svg"
                        alt="Assistance Over the Phone"
                        width={28}
                        height={28}
                      />
                    </div>
                    <h3 className="text-base font-bold text-[#252525]">Assistance Over the Phone</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Skip the Hassle! We&apos;ll Complete Your Form in Minutes!
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 4: WHAT IS A RENT AGREEMENT? */}
              <div className="space-y-3 pt-4 border-t border-[#E8E3DA]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  What is a Rent Agreement?
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  A rent agreement is a legally binding document between a landlord and a tenant that outlines the terms and conditions of renting a property. It clearly defines the rights and obligations of both parties, ensuring that everyone knows what is expected during the tenancy. Registering the rent agreement is a legally required process in India that involves submitting an affidavit, which provides security for both parties involved.
                </p>
              </div>

              {/* SECTION 5: WHY IS A RENT AGREEMENT IMPORTANT? */}
              <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Why is a Rent Agreement Important?
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  A rent agreement is more than just a formal requirement; it&apos;s a vital tool that safeguards both landlords and tenants. Here&apos;s why it&apos;s so important:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Clearly Defines Terms:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It clearly outlines essential aspects like the rent amount, due date, duration of the tenancy, and how the property can be used, leaving no room for ambiguity.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Establishes a Legal Bond:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      By setting clear expectations, a rent agreement creates a legally binding contract that serves as a reference point in case of any disputes.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Protects Rights:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It explicitly states the rights and duties of both parties, helping to prevent misunderstandings and ensuring that everyone&apos;s interests are protected.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Acts as Evidence:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      In the event of a disagreement, a registered rent agreement serves as solid evidence that can be presented in court to prove what was agreed upon.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Ensures Property Care:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It specifies maintenance responsibilities, encouraging tenants to take care of the property and return it in a satisfactory condition.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Facilitates Dispute Resolution:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Should issues arise, such as problems with deposit refunds or disagreements over property condition, a well-drafted agreement makes it easier to resolve them smoothly.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 6: KEY TERMS AND CONDITIONS OF A RENT AGREEMENT */}
              <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Key Terms and Conditions of a Rent Agreement
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  A comprehensive rent agreement should cover all the crucial aspects of the tenancy. Here are some of the key terms and conditions typically included:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Rent and Payment Terms:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Clearly specifies the rent amount, the due date for payment, and the accepted payment methods.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Duration of Tenancy:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Outlines the start and end dates of the agreement, as well as the length of the lease.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Security Deposit:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Details the amount of the security deposit, how it will be held, and under what conditions it will be returned to the tenant.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Use Restrictions:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Specifies that the property can only be used for residential purposes and outlines any restrictions, such as rules regarding pets or guests.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Maintenance Responsibilities:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Clarifies the responsibilities of both parties regarding the upkeep of the property, including who handles routine maintenance and repairs.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Utility Costs:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Outlines who is responsible for paying utility bills, such as electricity, water, and gas.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Termination and Eviction Terms:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Details the conditions under which either party can terminate the agreement, including the notice period required, and the circumstances under which eviction can occur.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Subletting Rules:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Specifies whether subletting the property is allowed and under what conditions.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Insurance Requirements:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Strongly encourages or requires the tenant to have renter&apos;s insurance to protect their personal belongings.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Signatories:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Requires the signatures of both the landlord and tenant, along with the date, to confirm their agreement to the terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 7: WHAT IS AN ONLINE RENT AGREEMENT FORMAT? */}
              <div className="space-y-3 pt-4 border-t border-[#E8E3DA]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  What is an Online Rent Agreement Format?
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  An online rent agreement format offers a convenient and efficient way to create a legally binding lease without the need to visit a government office. It&apos;s an electronic template that can be filled out, signed, and registered online. It covers all essential details, including the property information, landlord and tenant details, and specific terms like rent, duration, and conditions. With electronic signatures and digital submission, it simplifies the process and provides a legally compliant document.
                </p>
              </div>

              {/* SECTION 8: BENEFITS OF A RENT AGREEMENT FOR OWNERS */}
              <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Benefits of a Rent Agreement for Owners
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  A rent agreement is essential for property owners. Here are the key benefits:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Legal Protection:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It acts as a legal shield, safeguarding the owner&apos;s property rights in court if any disputes arise.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Clear Terms:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It outlines the terms of the tenancy, including rent amount, due date, duration, and property rules, reducing the risk of misunderstandings.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Proof of Terms:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It provides tangible proof of the agreed-upon conditions, making it easier to hold the tenant accountable.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Rent Tracking:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It facilitates the tracking of rent payments, helping to prevent disputes regarding payment history.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Security Deposit Terms:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It clarifies the conditions under which the security deposit will be returned, protecting the owner&apos;s financial interests.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Simplified Eviction:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      In the event of a breach of the agreement, it simplifies the eviction process by clearly outlining the conditions for termination.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 9: BENEFITS OF A RENT AGREEMENT FOR TENANTS */}
              <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Benefits of a Rent Agreement for Tenants
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  A rent agreement is equally crucial for tenants. Here&apos;s why:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Legal Security:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It protects tenants from unfair eviction and ensures their right to occupy the property for the agreed-upon duration.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Clarity of Terms:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It clarifies rent amounts, due dates, and other essential details, eliminating any ambiguity and preventing surprise increases.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Record of Rent:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It provides proof of address and tenancy, which is often required for various administrative purposes.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Deposit Protection:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It defines the terms of the security deposit, ensuring the tenant understands how it will be returned and under what conditions deductions can be made.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Fixed Rent Terms:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It locks in the rent amount for the duration of the agreement, protecting the tenant from unexpected rent hikes.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Maintenance Assurance:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      It outlines the landlord&apos;s maintenance responsibilities, ensuring that the property is kept in a livable condition.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 10: WHY CHOOSE AURALIVING FOR ONLINE RENT AGREEMENTS? */}
              <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  Why Choose AuraLiving for Online Rent Agreements?
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  When it comes to creating an online rent agreement, choosing AuraLiving is the smart choice. Here&apos;s why:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Expertise and Guidance:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Our team of legal experts is here to assist you at every step, ensuring your agreement is compliant and tailored to your specific needs.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">User-Friendly Platform:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Our intuitive platform makes the process simple, fast, and convenient, allowing you to create your agreement from the comfort of your home.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Customizable Templates:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      We offer comprehensive, customizable templates that you can adapt to reflect the unique terms of your rental arrangement.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Legal Compliance:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      We stay up-to-date on all relevant rental laws and regulations, ensuring your agreement is legally sound and enforceable.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Fast and Efficient:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Our streamlined process ensures your agreement is ready in a fraction of the time it would take through traditional methods.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E8E3DA] space-y-1">
                    <h3 className="text-sm font-bold text-[#252525]">Affordability:</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      We provide our top-quality services at competitive rates, offering exceptional value for your investment.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 11: RENT AGREEMENT FAQS (15 ACCORDIONS) */}
              <div className="space-y-6 pt-4 border-t border-[#E8E3DA]">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                    Rent Agreement FAQs
                  </h2>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8E3DA] divide-y divide-[#E8E3DA] overflow-hidden shadow-xs">
                  {faqList.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div key={index} className="transition-colors">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                          className="w-full flex items-center justify-between text-left p-4 sm:p-5 gap-4 group cursor-pointer hover:bg-gray-50/60"
                        >
                          <span className={`text-xs sm:text-sm font-bold transition-colors ${
                            isOpen ? "text-[#D29324]" : "text-[#252525] group-hover:text-[#AE7419]"
                          }`}>
                            {faq.q}
                          </span>
                          <div className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                            <Image
                              src="/images/rent-agreement/down-icon-faq.svg"
                              alt="Expand / Collapse"
                              width={14}
                              height={14}
                              className="w-3.5 h-3.5 opacity-70"
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 text-xs text-[#6B7280] leading-relaxed animate-in fade-in duration-200">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 12: RENT AGREEMENT GUIDE (4 ARTICLE CARDS) */}
              <div className="space-y-6 pt-4 border-t border-[#E8E3DA]">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                    Rent Agreement Guide
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {guideArticles.map((article, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs hover:border-[#D29324] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FBF1DF] text-[#AE7419] font-bold text-[10px]">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3 text-[#D29324]" />
                            {article.date}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-[#252525] group-hover:text-[#D29324] transition-colors leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                          {article.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#AE7419] group-hover:text-[#D29324]">
                        <span>Read Full Guide</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: STICKY FORM CARD ("Get Started on Your Rent Agreement Now!") (4 COLS) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-xl p-5 sm:p-6 space-y-5">
                
                {/* Form Title matching reference */}
                <div className="space-y-1 pb-3 border-b border-gray-100">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#252525] leading-snug">
                    Get Started on Your Rent Agreement Now!
                  </h3>
                </div>

                {isSubmitted ? (
                  /* Form Submission Confirmation View */
                  <div className="text-center py-6 space-y-4 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-[#FBF1DF] text-[#AE7419] flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-[#252525]">Request Received!</h4>
                      <p className="text-xs text-[#6B7280] max-w-xs mx-auto leading-relaxed">
                        Thank you, <span className="font-bold text-[#252525]">{fullName}</span> ({role}). Our dedicated relationship manager will reach out at <span className="font-bold text-[#252525]">+91 {mobileNumber}</span> shortly.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full py-2.5 rounded-xl bg-[#252525] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Start Another Agreement
                    </button>
                  </div>
                ) : (
                  /* Form Content matching authentic PropertyPistol form */
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* Role Selector: Pills matching PropertyPistol [ Owner ] [ Tenant ] [ Other ] */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#252525] block">
                        I am a
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Owner", "Tenant", "Other"].map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                              role === r
                                ? "bg-[#D29324] text-white border-[#D29324] shadow-xs"
                                : "bg-gray-50 text-[#6B7280] border-[#E8E3DA] hover:bg-gray-100"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label htmlFor="user-fullname" className="text-xs font-bold text-[#252525] block">
                        Full Name
                      </label>
                      <input
                        id="user-fullname"
                        type="text"
                        required
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] focus:border-[#D29324] focus:ring-1 focus:ring-[#D29324] text-xs text-[#252525] outline-none transition-all placeholder:text-[#6B7280]/60 bg-white"
                      />
                    </div>

                    {/* Mobile Number with +91 Prefix */}
                    <div className="space-y-1">
                      <label htmlFor="user-mobile" className="text-xs font-bold text-[#252525] block">
                        Mobile Number
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E8E3DA] bg-gray-50 text-xs font-semibold text-[#6B7280]">
                          +91
                        </span>
                        <input
                          id="user-mobile"
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          placeholder="Enter Mobile Number"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="w-full px-3.5 py-2.5 rounded-r-xl border border-[#E8E3DA] focus:border-[#D29324] focus:ring-1 focus:ring-[#D29324] text-xs text-[#252525] outline-none transition-all placeholder:text-[#6B7280]/60 bg-white"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                      <label htmlFor="user-email" className="text-xs font-bold text-[#252525] block">
                        Email Address
                      </label>
                      <input
                        id="user-email"
                        type="email"
                        required
                        placeholder="Enter Email Address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] focus:border-[#D29324] focus:ring-1 focus:ring-[#D29324] text-xs text-[#252525] outline-none transition-all placeholder:text-[#6B7280]/60 bg-white"
                      />
                    </div>

                    {/* CTA Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D29324] to-[#AE7419] hover:from-[#AE7419] hover:to-[#8C5810] text-white font-bold text-xs tracking-wide shadow-md shadow-[#D29324]/20 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-75"
                    >
                      <span>{isSubmitting ? "Processing..." : "Create Rent Agreement Now"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* WhatsApp Updates Checkbox matching reference */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        id="whatsapp-updates"
                        type="checkbox"
                        checked={whatsappUpdates}
                        onChange={(e) => setWhatsappUpdates(e.target.checked)}
                        className="w-4 h-4 accent-[#D29324] rounded-sm cursor-pointer"
                      />
                      <label htmlFor="whatsapp-updates" className="text-[11px] text-[#6B7280] cursor-pointer flex items-center gap-1.5 font-medium">
                        <span className="text-[#25D366] font-bold text-sm">💬</span>
                        <span>Get updates on WhatsApp</span>
                      </label>
                    </div>

                    {/* Disclaimer Note matching reference */}
                    <div className="pt-2 text-center">
                      <p className="text-[10px] text-[#6B7280]">
                        By clicking, you agree to our{" "}
                        <Link href="/privacy-policy" className="text-[#AE7419] underline hover:text-[#D29324]">
                          Terms and Conditions
                        </Link>
                      </p>
                    </div>

                  </form>
                )}

                {/* Mobile Testimonial Card (Visible only on mobile screens below the form) */}
                <div className="lg:hidden flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] text-left">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D29324] to-[#AE7419] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    RK
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-[#252525] italic leading-relaxed">
                      &ldquo;AuraLiving made the whole rent agreement process super easy! Biometrics captured at my doorstep. Highly recommend!&rdquo;
                    </p>
                    <div className="text-[11px] font-bold text-[#AE7419]">
                      — Radhika, Mumbai
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 4. GLOBAL AURALIVING FOOTER */}
      <Footer />

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
