"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Building2,
  PhoneCall,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Smartphone,
  ShieldCheck,
  Headphones,
  FileCheck,
  Banknote,
  Globe2,
  Sparkles,
  ArrowRight,
  Download,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Compass,
  FileText,
  UserCheck,
  Send,
  Zap,
  Check
} from "lucide-react";

export default function SyndicatePage() {
  // Hero Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: ""
  });
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // About Read More state
  const [aboutExpanded, setAboutExpanded] = useState(false);

  // Active App Feature Index (0 - 5)
  const [activeFeature, setActiveFeature] = useState(0);

  // Active Video for Modal
  const [activeVideo, setActiveVideo] = useState(null);

  // Active Video Slide Index for Film Gallery Slider
  const [activeFilmSlide, setActiveFilmSlide] = useState(0);

  // Active Testimonial Slide Index (0 - 4)
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Active Technical Features Page/Offset (0 or 1)
  const [techSlide, setTechSlide] = useState(0);

  // Brochure Modal State
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [brochureForm, setBrochureForm] = useState({ name: "", phone: "", email: "" });
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  // Exclusive Projects Modal State
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);

  // Auto-slide for app features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  const handleBrochureSubmit = (e) => {
    e.preventDefault();
    if (!brochureForm.name || !brochureForm.phone) return;
    setBrochureDownloaded(true);
  };

  // Performance Milestone Indicators for AuraLiving Syndicate
  const stats = [
    { value: "25,000+", label: "Site Visits Coordinated" },
    { value: "2,500+", label: "Deals Closed Successfully" },
    { value: "650+", label: "Verified Projects Managed" },
    { value: "₹2,000 Cr+", label: "Gross Transaction Volume" }
  ];

  // 8 Benefits of Partnership with clean line-art icons
  const benefits = [
    {
      title: "Easy Tracking of Leads",
      description: "A bespoke CRM system that helps brokers track the real-time status of their client leads.",
      icon: "/images/syndicate/easy-tracking-icon.svg"
    },
    {
      title: "Ease of Payout & Paperwork",
      description: "Syndicate liaises with the Developer and Customers for all legal paperwork. Guaranteed brokerage payout on time.",
      icon: "/images/syndicate/paperwork-icon.svg"
    },
    {
      title: "Home Loans & Agreements",
      description: "Syndicate offers a one-stop solution for brokers and their clients, along with industry-leading payouts.",
      icon: "/images/syndicate/home-loan-icon.svg"
    },
    {
      title: "Market Updates & Broker Network",
      description: "Stay updated with latest trends and hot projects in your micro-market. Network with fellow brokers seamlessly.",
      icon: "/images/syndicate/market-icon.svg"
    },
    {
      title: "Client Servicing",
      description: "Professional end-to-end servicing of clients for Brokers. Right from the first call to Property Registration.",
      icon: "/images/syndicate/client-servicing-icon.svg"
    },
    {
      title: "Reduction in Overheads",
      description: "The Broker needs to focus solely on acquiring clients. Follow-ups and logistics are handled by Syndicate.",
      icon: "/images/syndicate/reductions-icon.svg"
    },
    {
      title: "Expansion of Market",
      description: "Brokers can do business in multiple micro-markets as the on-ground servicing is taken care of by our teams.",
      icon: "/images/syndicate/market-expansion-icon.svg"
    },
    {
      title: "Rental Agreement",
      description: "Get rental agreements drafted and biometrically registered at the doorstep for clients at a nominal cost.",
      icon: "/images/syndicate/rental-agreement-icon.svg"
    }
  ];

  // 6 App Features matching device mockups and capabilities
  const appFeatures = [
    {
      title: "New Launches",
      copy: "Keeping up with updates on hot project launches can be challenging in today's fast-paced market. The Syndicate App keeps you updated on new project launches across premier metropolitan cities with marketing collateral, floor plans, and RERA approvals.",
      mockup: "/images/syndicate/mock-1.png",
      icon: "/images/syndicate/new-launch-icon.svg"
    },
    {
      title: "Resale & Rental Co-Broking",
      copy: "Swift, Smart, and Seamless. Syndicate App enables real-time pairing with other verified channel partners having clients with matching requirements. Never lose a deal because of an inventory or buyer mismatch.",
      mockup: "/images/syndicate/mock-2.png",
      icon: "/images/syndicate/network.svg"
    },
    {
      title: "Syndicate Networking",
      copy: "“Network is net worth”. Nurture your professional connections in the evolving world of real estate. Through Syndicate App, you can collaborate with top-tier brokers to build your referral network, co-broke inventory, and pool buyers.",
      mockup: "/images/syndicate/mock-3.png",
      icon: "/images/syndicate/client-servicing-icon.svg"
    },
    {
      title: "Personalized Micro-site",
      copy: "Our Broker Partners save substantial time and capital by leveraging our complimentary customized microsite branded with their agency name and contact details. This gives an edge to run professional campaigns for generating leads.",
      mockup: "/images/syndicate/mock-4.png",
      icon: "/images/syndicate/personalized-microsite.svg"
    },
    {
      title: "API Integrations",
      copy: "We service leads with near real-time efficiency through robust API integration. It enables our partners to connect leading lead generation portals like 99acres, Magicbricks, Google Ads, and Meta Ads directly to our CRM systems.",
      mockup: "/images/syndicate/mock-5.png",
      icon: "/images/syndicate/modulation.svg"
    },
    {
      title: "Home Loan Services",
      copy: "Deliver best-in-class financial support to your buyers with an army of mortgage professionals at your disposal. We assist your clients in securing express approvals from India’s top banks and NBFCs at competitive interest rates.",
      mockup: "/images/syndicate/mock-6.png",
      icon: "/images/syndicate/home-loan-icon.svg"
    }
  ];

  // Film Gallery Items with generic professional video stories
  const filmVideos = [
    {
      id: "5_3ZyyO2yiY",
      title: "How Syndicate Helped Us Scale 5X",
      speaker: "Vikram Malhotra",
      firm: "Apex Realty Solutions, Mumbai",
      thumbnail: "/images/syndicate/broker-1.jpg"
    },
    {
      id: "7kjcwyV2Ub4",
      title: "Zero Overheads & Seamless Site Visit Coordination",
      speaker: "Ananya Sharma",
      firm: "Urban Edge Properties, Bengaluru",
      thumbnail: "/images/syndicate/broker-2.jpg"
    },
    {
      id: "RusZZ2mybmE",
      title: "Closing Luxury Mandates with Dedicated RM Support",
      speaker: "Rohan Mehta",
      firm: "Horizon Estates, Pune",
      thumbnail: "/images/syndicate/broker-3.jpg"
    },
    {
      id: "AgV0wBrbW3A",
      title: "Transparent Builder Liaising & Fast Payouts",
      speaker: "Sanjay Kapoor",
      firm: "Capital Crest Realty, Gurugram",
      thumbnail: "/images/syndicate/broker-4.jpg"
    }
  ];

  // 10 Technical Features with authentic SVGs
  const technicalFeatures = [
    {
      title: "Complete Control",
      desc: "360-degree history of leads, status requests, and notes.",
      icon: "/images/syndicate/complete-control.svg"
    },
    {
      title: "Real Time Update",
      desc: "Real-time updates to track customer needs and requirements.",
      icon: "/images/syndicate/real-time-update.svg"
    },
    {
      title: "Push Alerts",
      desc: "Setup reminders for next call date at a lead level for necessary follow-up.",
      icon: "/images/syndicate/push-alerts.svg"
    },
    {
      title: "Customized Listing",
      desc: "Client-specific customization without hampering other customer interests.",
      icon: "/images/syndicate/customized-listing.svg"
    },
    {
      title: "Easy Tracking",
      desc: "Track all leads, client information, and engagement as they interact.",
      icon: "/images/syndicate/easy-tracking.svg"
    },
    {
      title: "Complete Transparency",
      desc: "Visibility of post-sales comments and live updates from developers.",
      icon: "/images/syndicate/complete-transparency.svg"
    },
    {
      title: "Personalized Microsite",
      desc: "Personalized microsite for AuraLiving supported projects for lead capture.",
      icon: "/images/syndicate/personalized-microsite.svg"
    },
    {
      title: "Modulation",
      desc: "Build, automate, and optimize an end-to-end pre-sales workflow.",
      icon: "/images/syndicate/modulation.svg"
    },
    {
      title: "New Launch Updates",
      desc: "Stay updated with new launches across major metropolitan hubs.",
      icon: "/images/syndicate/new-launch-icon.svg"
    },
    {
      title: "Access to Powerful Network",
      desc: "Easy access to the Syndicate ecosystem and matching channel partners.",
      icon: "/images/syndicate/network.svg"
    }
  ];

  // Generic Fictional Broker Testimonials with Professional Portraits
  const testimonials = [
    {
      name: "Vikram Malhotra",
      firm: "Apex Realty Solutions, Mumbai",
      image: "/images/syndicate/broker-1.jpg",
      quote: "“We have been partnering with AuraLiving Syndicate for over three years. With the substantial flow of homebuyer inquiries our team generates, managing site visits and follow-ups was challenging before. AuraLiving's dedicated relationship managers and chauffeured site visit service have helped us double our closure rate while eliminating administrative overheads.”"
    },
    {
      name: "Ananya Sharma",
      firm: "Urban Edge Properties, Bengaluru",
      image: "/images/syndicate/broker-2.jpg",
      quote: "“The Syndicate platform has completely modernized how our consultancy operates. We simply log verified client preferences into the CRM, and the AuraLiving team coordinates developer presentations, property inspections, and paperwork seamlessly. The prompt commission disbursements give us unmatched peace of mind.”"
    },
    {
      name: "Rohan Mehta",
      firm: "Horizon Estates, Pune",
      image: "/images/syndicate/broker-3.jpg",
      quote: "“AuraLiving Syndicate provides real-time access to marquee developer mandates with transparent commission structures. Their home loan financing assistance and doorstep agreement documentation make client hand-holding effortless. It is an indispensable tool for any ambitious real estate professional.”"
    },
    {
      name: "Sanjay Kapoor",
      firm: "Capital Crest Realty, Gurugram",
      image: "/images/syndicate/broker-4.jpg",
      quote: "“Having worked in Indian residential real estate for over 15 years, the Syndicate mobile app stands out for its simplicity and depth. Being able to co-broke with verified channel partners across cities has unlocked lucrative multi-city mandates for our firm.”"
    },
    {
      name: "Pooja Singhania",
      firm: "Singhania Property Advisory, Hyderabad",
      image: "/images/syndicate/broker-5.jpg",
      quote: "“The personalized microsite and API integration tools provided by AuraLiving Syndicate allow us to run high-impact digital campaigns with zero technical friction. It has elevated our market positioning and client conversions significantly.”"
    }
  ];

  // 16 Builder Partners logos
  const partnerLogos = Array.from({ length: 16 }, (_, i) => `/images/syndicate/partner-${i + 1}.png`);

  return (
    <div className="min-h-screen bg-white text-[#252525] font-sans selection:bg-[#FBF1DF] selection:text-[#AE7419]">
      {/* 1. SYNDICATE STICKY SUB-NAV / HEADER */}
      <header className="bg-[#1C1C1C] text-white sticky top-0 z-30 shadow-lg border-b border-white/10 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-[68px] flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/services/syndicate" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-[#E85A2A] flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-md">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  SYNDICATE<sup className="text-[10px] font-normal text-gray-400">®</sup>
                </span>
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">
                  By AuraLiving
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13.5px] font-semibold text-gray-300">
            <a href="#home" className="text-[#E85A2A] hover:text-[#E85A2A] transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-[#E85A2A] transition-colors">
              About Us
            </a>
            <a href="#benefits" className="hover:text-[#E85A2A] transition-colors">
              Benefits
            </a>
            <a href="#features" className="hover:text-[#E85A2A] transition-colors">
              App Features
            </a>
            <a href="#tech" className="hover:text-[#E85A2A] transition-colors">
              Technical Features
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/services/syndicate/projects"
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm group"
            >
              <div className="text-right leading-tight">
                <span className="block text-[9px] text-gray-300">Exclusive</span>
                <span className="text-xs font-bold text-white">Projects</span>
              </div>
              <Building2 className="w-4 h-4 text-[#E85A2A] group-hover:scale-110 transition-transform" />
            </Link>

            <button
              onClick={() => setBrochureModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E85A2A] to-[#D29324] hover:opacity-95 text-white border border-[#E85A2A]/40 transition-all text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md group"
            >
              <div className="text-right leading-tight">
                <span className="block text-[9px] text-white/90">Download</span>
                <span className="text-xs font-extrabold text-white">Brochure</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO BANNER SECTION (#home) with Generic AuraLiving Stock Hero Banner */}
      <section
        id="home"
        className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-gray-900 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/syndicate/hero-banner.jpg')",
          backgroundPosition: "center"
        }}
      >
        {/* Dark contrast gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/65 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline Overlay */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/15 max-w-xl shadow-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85A2A]/20 border border-[#E85A2A]/30 text-[#F5C77E] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#E85A2A]" />
                  <span>AuraLiving Syndicate</span>
                </div>
                <p className="text-white text-base sm:text-lg font-medium tracking-wide">
                  India&apos;s Most Trusted Platform for
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#E85A2A] tracking-tight mt-1 mb-3">
                  Real Estate Brokers
                </h1>
                <div className="flex items-center gap-3 text-sm sm:text-base font-bold text-white pt-2 border-t border-white/20">
                  <span>Transparent</span>
                  <span className="text-[#E85A2A]">|</span>
                  <span>Dependable</span>
                  <span className="text-[#E85A2A]">|</span>
                  <span>Simple</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
                  Join India&apos;s premier broker ecosystem. Zero overheads, verified developer mandates, chauffeured site visits, and guaranteed brokerage payouts.
                </p>
              </div>
            </div>

            {/* Right: Floating Register Now Card */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="w-full max-w-[430px] bg-[#F4F5F7] rounded-[28px] p-6 sm:p-7 shadow-2xl border border-white/80 text-gray-900">
                <h3 className="text-xl sm:text-2xl font-black text-center text-gray-900 tracking-tight mb-4">
                  Register Now
                </h3>

                {formSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Registration Received!</h4>
                    <p className="text-xs text-gray-600 px-4">
                      Thank you <span className="font-semibold text-gray-900">{formData.name}</span>. Our Syndicate Partnership Manager will call you at <span className="font-semibold text-gray-900">{formData.phone}</span> within 15 minutes.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: "", phone: "", email: "", location: "" });
                      }}
                      className="text-xs font-bold text-[#E85A2A] hover:underline cursor-pointer pt-2 inline-block"
                    >
                      Register Another Partner
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Your name..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300/80 focus:border-[#E85A2A] focus:ring-2 focus:ring-[#E85A2A]/20 outline-none text-xs sm:text-sm transition-all shadow-xs"
                    />

                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="Your number..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300/80 focus:border-[#E85A2A] focus:ring-2 focus:ring-[#E85A2A]/20 outline-none text-xs sm:text-sm transition-all shadow-xs"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Your email address..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300/80 focus:border-[#E85A2A] focus:ring-2 focus:ring-[#E85A2A]/20 outline-none text-xs sm:text-sm transition-all shadow-xs"
                    />

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      placeholder="Your address..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300/80 focus:border-[#E85A2A] focus:ring-2 focus:ring-[#E85A2A]/20 outline-none text-xs sm:text-sm transition-all shadow-xs"
                    />

                    {/* Captcha checkbox */}
                    <div
                      onClick={() => setCaptchaChecked(!captchaChecked)}
                      className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-gray-300/80 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${captchaChecked ? "bg-[#E85A2A] border-[#E85A2A] text-white" : "border-gray-400 bg-gray-50"}`}>
                          {captchaChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs text-gray-700 font-medium">I&apos;m not a robot</span>
                      </div>
                      <div className="text-right flex flex-col items-center">
                        <div className="w-5 h-5 text-blue-500">
                          <svg viewBox="0 0 48 48" className="w-5 h-5 fill-current">
                            <path d="M24 8a16 16 0 1 1-16 16 1.5 1.5 0 0 1 3 0 13 13 0 1 0 13-13c-4.4 0-8.2 2.2-10.5 5.5H16a1.5 1.5 0 0 1 0 3H9a1.5 1.5 0 0 1-1.5-1.5V11a1.5 1.5 0 0 1 3 0v3.4A15.9 15.9 0 0 1 24 8z" />
                          </svg>
                        </div>
                        <span className="text-[8px] text-gray-400">reCAPTCHA</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#E85A2A] hover:bg-[#D44A1B] text-white font-extrabold text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer mt-1 disabled:opacity-75"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>

                    {/* Missed call footer text */}
                    <div className="text-center pt-1.5">
                      <span className="text-[11px] text-gray-500 block">or</span>
                      <a
                        href="tel:+918080190190"
                        className="text-xs font-bold text-gray-800 hover:text-[#E85A2A] transition-colors mt-0.5 inline-block"
                      >
                        Give a Missed Call to <span className="text-[#E85A2A]">+91 8080 190 190</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ABOUT US SECTION (#about) */}
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative Copy */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                About <span className="text-[#E85A2A]">Us</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                In the current hyper-competitive landscape of Real Estate Broking, <strong className="text-gray-900">Syndicate By AuraLiving</strong> is a revolutionary Tech Platform that helps Brokers scale their businesses with incredible ease. It is an end-to-end service platform that assists its Broker Partners by doing the heavy lifting of following up with clients, negotiations, deal closure assistance, and paperwork. It doesn&apos;t stop there—it ensures timely brokerage payout processing as well.
              </p>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Syndicate is not just restricted to primary developer sales; it is a powerful enabler for resale and rental transactions as well. It connects you with thousands of fellow brokers to close deals faster and more effectively.
              </p>

              {aboutExpanded && (
                <div className="space-y-4 pt-1 animate-in fade-in duration-300">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Syndicate has a dedicated team of specialists that helps in securing doorstep home loan approvals for your clients with best-in-class service. Syndicate is a truly empowering platform that helps brokers future-proof their business by handling client servicing end-to-end.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setAboutExpanded(!aboutExpanded)}
                className="text-sm font-bold text-[#E85A2A] hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>{aboutExpanded ? "Read Less" : "Read More"}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${aboutExpanded ? "-rotate-90" : "rotate-90"}`} />
              </button>
            </div>

            {/* Right: 4 Highlight Stat Cards */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-5 sm:gap-6">
                {stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F8F9FA] hover:bg-white p-6 sm:p-8 rounded-[24px] border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center min-h-[140px] group"
                  >
                    <div className="text-3xl sm:text-4xl font-black text-[#E85A2A] tracking-tight group-hover:scale-105 transition-transform">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-gray-800 mt-2">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BENEFITS OF PARTNERSHIP SECTION (#benefits) */}
      <section id="benefits" className="py-16 sm:py-20 bg-[#FAF8F4] border-t border-b border-gray-200/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Benefits of <span className="text-[#E85A2A]">Partnership</span>
            </h2>
          </div>

          {/* 8 Cards in 4x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-[22px] border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#E85A2A]/40 transition-all duration-300 flex flex-col items-center text-center justify-between group min-h-[220px]"
              >
                <div>
                  <div className="w-16 h-16 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 relative">
                    <Image
                      src={b.icon}
                      alt={b.title}
                      width={52}
                      height={52}
                      className="object-contain"
                    />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#E85A2A]"></div>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#E85A2A] transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FILM GALLERY SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Film <span className="text-[#E85A2A]">Gallery</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Arrows */}
            <button
              onClick={() => setActiveFilmSlide((prev) => (prev === 0 ? filmVideos.length - 1 : prev - 1))}
              className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-lg flex items-center justify-center text-gray-700 hover:text-[#E85A2A] hover:border-[#E85A2A] z-20 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveFilmSlide((prev) => (prev + 1) % filmVideos.length)}
              className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-lg flex items-center justify-center text-gray-700 hover:text-[#E85A2A] hover:border-[#E85A2A] z-20 cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Video Showcase Card */}
            <div
              onClick={() => setActiveVideo(filmVideos[activeFilmSlide])}
              className="bg-[#1C1C1C] rounded-[28px] overflow-hidden shadow-2xl border border-gray-200 cursor-pointer group relative aspect-video flex items-center justify-center"
            >
              <div className="absolute inset-0 grid grid-cols-12 opacity-90">
                {/* Left Branding */}
                <div className="col-span-5 bg-white p-8 flex flex-col justify-between hidden sm:flex">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-[#E85A2A] text-white font-black text-xs flex items-center justify-center">S</div>
                      <span className="text-lg font-black text-gray-900">SYNDICATE</span>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">By AuraLiving</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-lg font-black text-gray-900 block leading-tight">Transparent</span>
                    <span className="text-lg font-black text-gray-900 block leading-tight">Dependable</span>
                    <span className="text-lg font-black text-gray-900 block leading-tight">Simple</span>
                  </div>
                </div>

                {/* Right Video Thumbnail */}
                <div className="col-span-12 sm:col-span-7 relative bg-gray-900">
                  <Image
                    src={filmVideos[activeFilmSlide].thumbnail}
                    alt={filmVideos[activeFilmSlide].speaker}
                    fill
                    className="object-cover object-top opacity-85 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors"></div>
                </div>
              </div>

              {/* YouTube Style Large Red Play Button */}
              <div className="relative z-10 w-20 h-14 bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300">
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </div>

              {/* Video Title info on bottom bar */}
              <div className="absolute bottom-4 left-6 right-6 z-10 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl flex items-center justify-between text-white text-xs">
                <div>
                  <span className="font-bold">{filmVideos[activeFilmSlide].speaker}</span>
                  <span className="text-gray-400 ml-2">({filmVideos[activeFilmSlide].firm})</span>
                </div>
                <span className="text-[#E85A2A] font-bold">Watch Video Story →</span>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {filmVideos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFilmSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${activeFilmSlide === idx ? "w-6 bg-[#E85A2A]" : "bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. APP FEATURES SECTION (#features) WITH PROPERLY ALIGNED MOBILE PHONE MOCKUP */}
      <section id="features" className="py-16 sm:py-20 bg-[#FAF2E9] border-t border-b border-gray-200/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              App <span className="text-[#E85A2A]">Features</span>
            </h2>
          </div>

          {/* Interactive Feature Display */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Smartphone Device Mockup - Perfectly Aligned, Centered & Unclipped */}
            <div className="md:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-[310px] sm:max-w-[340px] aspect-[9/18.5] flex items-center justify-center">
                <Image
                  src={appFeatures[activeFeature].mockup}
                  alt={appFeatures[activeFeature].title}
                  fill
                  sizes="(max-width: 640px) 290px, 340px"
                  className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.22)] transition-all duration-500"
                  priority
                />
              </div>
            </div>

            {/* Right: Feature Content Card */}
            <div className="md:col-span-6 space-y-5">
              <div className="bg-white rounded-[26px] p-7 sm:p-9 shadow-xl border-t-4 border-[#E85A2A] relative">
                {/* Icon */}
                <div className="w-14 h-14 mb-4 flex items-center justify-center">
                  <Image
                    src={appFeatures[activeFeature].icon}
                    alt={appFeatures[activeFeature].title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  {appFeatures[activeFeature].title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mt-3">
                  {appFeatures[activeFeature].copy}
                </p>

                {/* Slide Controls & Dots */}
                <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                  {/* Dots */}
                  <div className="flex items-center gap-1.5">
                    {appFeatures.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveFeature(idx)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${activeFeature === idx ? "w-5 bg-[#E85A2A]" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>

                  {/* Arrow buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveFeature((prev) => (prev === 0 ? appFeatures.length - 1 : prev - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:border-[#E85A2A] flex items-center justify-center text-gray-600 hover:text-[#E85A2A] cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveFeature((prev) => (prev + 1) % appFeatures.length)}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:border-[#E85A2A] flex items-center justify-center text-gray-600 hover:text-[#E85A2A] cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. END TO END SUPPORT SECTION */}
      <section id="support" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              End to End <span className="text-[#E85A2A]">Support</span>
            </h2>
          </div>

          <div className="w-full max-w-5xl mx-auto">
            {/* Desktop Infographic SVG */}
            <div className="hidden md:block">
              <Image
                src="/images/syndicate/infographic-desktop.svg"
                alt="End to End Support Pipeline"
                width={1100}
                height={350}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Mobile Infographic SVG */}
            <div className="block md:hidden">
              <Image
                src="/images/syndicate/infographic-mobile.svg"
                alt="End to End Support Pipeline"
                width={500}
                height={600}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 8. TECHNICAL FEATURES SECTION (#tech) */}
      <section id="tech" className="py-16 sm:py-20 bg-[#F8F9FA] border-t border-b border-gray-200/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Technical <span className="text-[#E85A2A]">Features</span>
            </h2>
          </div>

          <div className="relative">
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={() => setTechSlide((prev) => (prev === 0 ? 1 : 0))}
                className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center text-gray-700 hover:text-[#E85A2A] hover:border-[#E85A2A] cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTechSlide((prev) => (prev === 0 ? 1 : 0))}
                className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center text-gray-700 hover:text-[#E85A2A] hover:border-[#E85A2A] cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 5 Cards per view */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {(techSlide === 0 ? technicalFeatures.slice(0, 5) : technicalFeatures.slice(5, 10)).map((tf, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[22px] border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group min-h-[220px]"
                >
                  <div>
                    <div className="w-12 h-12 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      <Image
                        src={tf.icon}
                        alt={tf.title}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#E85A2A] transition-colors leading-snug">
                      {tf.title}
                    </h3>

                    <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                      {tf.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION WITH GENERIC PROFESSIONAL PORTRAITS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Our <span className="text-[#E85A2A]">Testimonials</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Arrows */}
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-700 hover:text-[#E85A2A] hover:border-[#E85A2A] cursor-pointer z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-700 hover:text-[#E85A2A] hover:border-[#E85A2A] cursor-pointer z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Testimonial Card */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center bg-[#FAF2E9]/60 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute right-6 top-4 text-9xl font-serif text-[#E85A2A]/10 select-none pointer-events-none">
                “
              </div>

              {/* Left Broker Photo */}
              <div className="sm:col-span-5 flex justify-center mb-6 sm:mb-0">
                <div className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-100">
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Right Floating Quote Card */}
              <div className="sm:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 sm:-ml-8 relative z-10">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  {testimonials[activeTestimonial].name}
                </h3>
                <p className="text-xs font-semibold text-[#E85A2A] mt-0.5">
                  {testimonials[activeTestimonial].firm}
                </p>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mt-4">
                  {testimonials[activeTestimonial].quote}
                </p>

                <button
                  type="button"
                  onClick={() => setActiveVideo(filmVideos[0])}
                  className="mt-5 px-4 py-2 rounded-xl bg-[#E85A2A] text-white text-xs font-bold hover:bg-[#D44A1B] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video Story</span>
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${activeTestimonial === idx ? "w-6 bg-[#E85A2A]" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 10. BUILDER PARTNERS SECTION */}
      <section className="py-16 sm:py-20 bg-[#FAF8F4] border-t border-gray-200/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Our <span className="text-[#E85A2A]">Builder Partners</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 items-center">
            {partnerLogos.map((logo, idx) => (
              <div
                key={idx}
                className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-center h-20 group"
              >
                <div className="relative w-full h-12 grayscale group-hover:grayscale-0 transition-all opacity-85 group-hover:opacity-100">
                  <Image
                    src={logo}
                    alt={`Builder Partner ${idx + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. REWARDS & RECOGNITIONS SECTION WITH PRESTIGIOUS GENERIC TROPHY & MEDALS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Rewards & <span className="text-[#E85A2A]">Recognitions</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Big Award Card with golden trophy photo */}
            <div className="md:col-span-7 bg-[#F8F9FA] rounded-[26px] p-6 sm:p-8 border border-gray-200/80 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[#E85A2A] uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-gray-200 inline-block mb-3">
                  National Honors – 2024
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
                  PropTech Platform Innovation Of The Year
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Honored for pioneering transparent real estate broker technology & co-broking solutions.
                </p>
              </div>

              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mt-6 shadow-inner bg-white">
                <Image
                  src="/images/syndicate/award-trophy.jpg"
                  alt="PropTech Platform Innovation Award"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Stacked Award Cards */}
            <div className="md:col-span-5 flex flex-col gap-6 justify-between">
              {/* Card 1 */}
              <div className="bg-[#F8F9FA] rounded-[26px] p-6 border border-gray-200/80 shadow-md flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-[#E85A2A] uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-gray-200 inline-block mb-2">
                    Industry Excellence – 2023
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">
                    Best Real Estate Advisory & Channel Partner Enabler
                  </h4>
                </div>
                <div className="relative w-full h-28 mt-4 rounded-xl overflow-hidden bg-white shadow-xs">
                  <Image
                    src="/images/syndicate/award-medal.jpg"
                    alt="Industry Excellence Award"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#F8F9FA] rounded-[26px] p-6 border border-gray-200/80 shadow-md flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-[#E85A2A] uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-gray-200 inline-block mb-2">
                    PropTech Summit – 2023
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">
                    Innovative Channel Partner Technology Provider
                  </h4>
                </div>
                <div className="relative w-full h-24 mt-4">
                  <Image
                    src="/images/syndicate/rr-icon-2.png"
                    alt="International Brand Equity Award"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 12. COMPLETE FOOTER SECTION WITH AURALIVING BRANDING */}
      <footer className="bg-[#121212] text-white pt-14 pb-8 border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12">
            
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

              <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                India&apos;s premier tech-enabled real estate platform connecting home buyers, channel partners, and Grade-A developers across the country.
              </p>
            </div>

            {/* Center Follow Us & App Downloads */}
            <div className="md:col-span-4 space-y-5">
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide mb-3">
                  Follow Us
                </h4>
                <div className="flex items-center gap-3">
                  {[
                    { name: "Instagram", href: "https://instagram.com" },
                    { name: "Facebook", href: "https://facebook.com" },
                    { name: "LinkedIn", href: "https://linkedin.com" },
                    { name: "YouTube", href: "https://youtube.com" }
                  ].map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E85A2A] text-white flex items-center justify-center transition-colors text-xs font-bold"
                    >
                      {s.name.charAt(0)}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white tracking-wide mb-3">
                  Download the App
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.propertypistol.syndicate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-[#E85A2A]" />
                    <div className="text-left leading-tight">
                      <span className="block text-[8px] text-gray-400">GET IT ON</span>
                      <span>Google Play</span>
                    </div>
                  </a>

                  <a
                    href="https://apps.apple.com/in/app/propertypistol-syndicate/id1527878484"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Globe2 className="w-4 h-4 text-[#E85A2A]" />
                    <div className="text-left leading-tight">
                      <span className="block text-[8px] text-gray-400">Download on the</span>
                      <span>App Store</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Hotline Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wide">
                Contact Us
              </h4>

              <div className="space-y-1">
                <span className="text-[11px] text-gray-400 block">For New Registration (Missed Call):</span>
                <a
                  href="tel:+918080190190"
                  className="text-base sm:text-lg font-black text-[#E85A2A] hover:underline block"
                >
                  +91 8080 190 190
                </a>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-[11px] text-gray-400 block">For Partner Support:</span>
                <a
                  href="mailto:syndicate@auraliving.com"
                  className="text-sm font-bold text-white hover:text-[#E85A2A] transition-colors block"
                >
                  syndicate@auraliving.com
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
            </div>
          </div>

        </div>
      </footer>

      {/* MODAL 1: VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1C1C1C] w-full max-w-3xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{activeVideo.title}</h3>
                <p className="text-xs text-gray-400">{activeVideo.speaker} • {activeVideo.firm}</p>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: BROCHURE MODAL */}
      {brochureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setBrochureModalOpen(false);
                setBrochureDownloaded(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {brochureDownloaded ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Download className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Brochure Download Started!</h3>
                <p className="text-xs text-gray-600">
                  A high-resolution PDF copy has also been sent to your WhatsApp and email address.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBrochureModalOpen(false);
                    setBrochureDownloaded(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#E85A2A] text-white text-xs font-bold hover:bg-[#D44A1B] transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">Download Syndicate Brochure</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Get full details on commission structures, tech tools, and developer mandates.
                </p>

                <form onSubmit={handleBrochureSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={brochureForm.name}
                      onChange={(e) => setBrochureForm({ ...brochureForm, name: e.target.value })}
                      placeholder="Your name..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#E85A2A] outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={brochureForm.phone}
                      onChange={(e) => setBrochureForm({ ...brochureForm, phone: e.target.value })}
                      placeholder="Your 10-digit number..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#E85A2A] outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={brochureForm.email}
                      onChange={(e) => setBrochureForm({ ...brochureForm, email: e.target.value })}
                      placeholder="Your email address..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#E85A2A] outline-none text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#E85A2A] hover:bg-[#D44A1B] text-white font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Brochure</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: EXCLUSIVE PROJECTS MODAL */}
      {projectsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setProjectsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#E85A2A] uppercase tracking-wider bg-[#FAF2E9] px-2.5 py-0.5 rounded-md">
                Active Mandates
              </span>
              <h3 className="text-xl font-black text-gray-900 mt-2">Exclusive Syndicate Opportunities</h3>
              <p className="text-xs text-gray-500 mt-1">
                Priority broker mandates with accelerated spot payouts and developer incentives.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { name: "Aura Royale Skies", city: "Worli, South Mumbai", config: "3 & 4 BHK Luxury Homes", price: "Starting ₹7.5 Cr*", commission: "3.5% Spot Payout" },
                { name: "Emerald Woods Phase II", city: "Whitefield, Bengaluru", config: "2 & 3 BHK High-Rise Condos", price: "Starting ₹1.2 Cr*", commission: "3.0% Spot Payout" },
                { name: "The Crest Residences", city: "Kharadi, Pune", config: "Premium 2, 3 & 4.5 BHK", price: "Starting ₹98 Lac*", commission: "3.25% Spot Payout" },
                { name: "Prestige Solitaire Palms", city: "Gachibowli, Hyderabad", config: "3 & 4 BHK Skyline Mansions", price: "Starting ₹2.4 Cr*", commission: "3.25% Spot Payout" }
              ].map((proj, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{proj.name}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#E85A2A]" />
                      <span>{proj.city}</span>
                      <span className="text-gray-300">•</span>
                      <span>{proj.config}</span>
                    </p>
                    <span className="inline-block text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1.5 border border-emerald-200">
                      {proj.commission}
                    </span>
                  </div>

                  <div className="text-right sm:self-center shrink-0">
                    <span className="block text-xs font-bold text-gray-900">{proj.price}</span>
                    <a
                      href="#home"
                      onClick={() => setProjectsModalOpen(false)}
                      className="mt-1 inline-block text-[11px] font-bold text-[#E85A2A] hover:underline"
                    >
                      Request Inventory →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={() => setProjectsModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Close Opportunities
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
