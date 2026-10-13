"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import {
  Building2,
  Users,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BarChart3,
  Search,
  BookOpen,
  Send,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Layers,
  Award,
  Zap,
  Check,
  X,
  FileText,
  SlidersHorizontal,
  ExternalLink,
  MessageSquare,
  Compass,
  Laptop,
  HelpCircle,
  Download,
  Calendar,
  Lock,
  ChevronLeft
} from "lucide-react";
import { DEVELOPERS } from "@/data";

// 6 Core Business Solutions matching PropertyPistol reference with enhanced AuraLiving details
const BUSINESS_SOLUTIONS = [
  {
    id: "outreach",
    title: "Outreach",
    badge: "Syndicate Network",
    shortCopy: "Exhaustive list of brokers in the Syndicate network to manage sourcing in a CRM format.",
    fullDescription: "Access India's largest verified channel partner ecosystem of over 85,000+ active brokers. Real-time inventory broadcast, instant digital launch invites, and tiered incentive programs ensure maximum broker engagement from day one.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    metrics: "85,000+ Active Brokers",
    highlights: [
      "Real-time broadcast of inventory & pricing",
      "Tiered brokerage incentives & instant milestone payouts",
      "Geo-targeted broker matching based on micro-market expertise"
    ],
    demoPreview: {
      type: "crm",
      title: "Syndicate Broker CRM Dashboard",
      stat1: "Active CP Registrations: 3,420",
      stat2: "Live Sourcing Velocity: 84 Site Visits / Day",
      tag: "Automated Micro-Market Sourcing"
    }
  },
  {
    id: "knowledge-center",
    title: "Knowledge Center",
    badge: "Digital Collaterals",
    shortCopy: "Standard dissemination of project specific information across all associated brokers.",
    fullDescription: "Eliminate misinformation and inaccurate claims. Distribute high-definition digital brochures, approved RERA registrations, price escalators, 3D floor plans, and interactive virtual walk-throughs in one standardized cloud repository.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    metrics: "100% Standardized Project Info",
    highlights: [
      "Verified RERA certificates & approved floor plans",
      "Instant WhatsApp shareable digital sales kits",
      "Virtual 360° walkthroughs & dynamic unit availability matrix"
    ],
    demoPreview: {
      type: "knowledge",
      title: "Developer Digital Asset Hub",
      stat1: "Digital Kits Downloaded: 14,200+",
      stat2: "RERA Diligence Verification: 100% Compliant",
      tag: "Unified Project Data Repository"
    }
  },
  {
    id: "sourcing",
    title: "Sourcing",
    badge: "Lead Protection",
    shortCopy: "Completely automated broker sourcing and centralized leads management with a single system of record ensuring transparency and ethical dealings.",
    fullDescription: "Prevent channel partner friction and overlapping customer claims. Our proprietary algorithm logs leads with timestamped digital OTP verification and strict anti-poaching protocols, fostering trusted collaboration.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    metrics: "Zero Lead Conflict Record",
    highlights: [
      "Timestamped OTP lead registration & tamper-proof audit trails",
      "Automated lead tagging & transparent attribution",
      "Instant commission lock to protect genuine channel partners"
    ],
    demoPreview: {
      type: "sourcing",
      title: "Lead Attribution & Verification Ledger",
      stat1: "Conflict Resolution Rate: 99.8%",
      stat2: "Tamper-Proof Audit: Active Real-Time",
      tag: "Ethical Channel Partner Protection"
    }
  },
  {
    id: "reduced-sales-cycle",
    title: "Reduced Sales Cycle Time",
    badge: "High Velocity",
    shortCopy: "Sourcing & lead follow-up planned with brokers in an automated manner to accelerate bookings.",
    fullDescription: "Cut down project sales cycles by an average of 42%. Algorithmic follow-up prompts, private chauffeur-driven customer site visits, and instant on-spot digital booking tokens turn interested prospects into buyers rapidly.",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    metrics: "42% Faster Inventory Absorption",
    highlights: [
      "Automated WhatsApp & SMS appointment reminders",
      "Dedicated on-site closing managers to assist channel partners",
      "Digital spot booking with instant banking pre-approval links"
    ],
    demoPreview: {
      type: "velocity",
      title: "Sales Velocity & Turnaround Matrix",
      stat1: "Average Lead-to-Visit: 3.2 Days",
      stat2: "Visit-to-Booking Conversion: 18.4%",
      tag: "Accelerated Inventory Handover"
    }
  },
  {
    id: "focused-marketing",
    title: "Focused Marketing",
    badge: "Hyper-Targeted",
    shortCopy: "Targeted campaigns with Brokers, Improved productivity & effectiveness through micro-level reporting.",
    fullDescription: "Drive high-intent buyer inquiries through precision programmatic advertising, bespoke channel partner meets, investor roadshows, and micro-market NRI campaigns across GCC and Southeast Asia.",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    metrics: "3.8x Higher Marketing ROI",
    highlights: [
      "Micro-market performance campaigns with hyper-targeted audience pools",
      "Exclusive developer launch roadshows across key metros & Dubai",
      "Continuous A/B testing of creatives, landing pages, and lead funnels"
    ],
    demoPreview: {
      type: "marketing",
      title: "Omnichannel Campaign Analytics",
      stat1: "Qualified High-Intent Inquiries: 12,850",
      stat2: "Cost Per Acquisition Optimization: -36%",
      tag: "Data-Driven Buyer Funnels"
    }
  },
  {
    id: "reporting-tool",
    title: "Reporting Tool",
    badge: "Executive BI",
    shortCopy: "Reporting tool made available for Builder leadership team to get a view of broker specific sales for their projects.",
    fullDescription: "Empower developer leadership with 360-degree real-time visibility. Access interactive analytics on broker contribution, site visit footfalls, unit absorption rates, inventory heatmaps, and financial escrow settlements.",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    metrics: "Real-Time 360° Visibility",
    highlights: [
      "Live executive dashboard for developer C-suite & sales heads",
      "Granular broker performance scorecards & payout ledgers",
      "Predictive sales forecasting driven by machine learning"
    ],
    demoPreview: {
      type: "reporting",
      title: "Executive Leadership Command Center",
      stat1: "Active Projects Tracked: 140+",
      stat2: "Total Real-Time Sales Volume: ₹428 Cr",
      tag: "Live BI & Payout Intelligence"
    }
  }
];

// Marquee Developers with expanded portfolio context
const DEVELOPER_PARTNERS = [
  {
    id: "godrej",
    name: "Godrej Properties",
    experience: "34 Years",
    projects: "140+ Projects",
    category: "luxury",
    city: "Mumbai, Pune, NCR, Bangalore",
    topProject: "Godrej Eternal Palms",
    logoText: "GODREJ",
    badge: "Grade-A Partner",
    stats: "₹3,400 Cr+ Mandate GMV"
  },
  {
    id: "lodha",
    name: "Lodha Group",
    experience: "44 Years",
    projects: "210+ Projects",
    category: "luxury",
    city: "Mumbai, Thane, Pune, London",
    topProject: "Lodha Haven & Palava",
    logoText: "LODHA",
    badge: "Strategic Titan",
    stats: "₹4,800 Cr+ Mandate GMV"
  },
  {
    id: "lnt",
    name: "L&T Realty",
    experience: "22 Years",
    projects: "85+ Projects",
    category: "highrise",
    city: "Mumbai, Bengaluru, Chennai",
    topProject: "L&T Island Cove",
    logoText: "L&T REALTY",
    badge: "Engineering Marvel",
    stats: "₹2,100 Cr+ Mandate GMV"
  },
  {
    id: "tata",
    name: "Tata Housing",
    experience: "38 Years",
    projects: "95+ Projects",
    category: "township",
    city: "Pan-India Metros",
    topProject: "Tata Serein Thane",
    logoText: "TATA HOUSING",
    badge: "Trust In Excellence",
    stats: "₹1,950 Cr+ Mandate GMV"
  },
  {
    id: "prestige",
    name: "Prestige Group",
    experience: "36 Years",
    projects: "250+ Projects",
    category: "township",
    city: "Bengaluru, Mumbai, Hyderabad",
    topProject: "Prestige City & Signature",
    logoText: "PRESTIGE",
    badge: "Southern Titan",
    stats: "₹3,900 Cr+ Mandate GMV"
  },
  {
    id: "dlf",
    name: "DLF Limited",
    experience: "75 Years",
    projects: "300+ Projects",
    category: "luxury",
    city: "Delhi NCR, Gurugram, Chandigarh",
    topProject: "DLF The Arbour",
    logoText: "DLF",
    badge: "Pioneer Developer",
    stats: "₹5,200 Cr+ Mandate GMV"
  },
  {
    id: "sobha",
    name: "Sobha Limited",
    experience: "29 Years",
    projects: "160+ Projects",
    category: "highrise",
    city: "Bengaluru, Pune, Dubai",
    topProject: "Sobha Dream Acres",
    logoText: "SOBHA",
    badge: "Craftsmanship Icon",
    stats: "₹2,400 Cr+ Mandate GMV"
  },
  {
    id: "hiranandani",
    name: "House of Hiranandani",
    experience: "40 Years",
    projects: "90+ Projects",
    category: "township",
    city: "Mumbai, Thane, Bengaluru",
    topProject: "Hiranandani Estate & Meadows",
    logoText: "HIRANANDANI",
    badge: "Integrated Townships",
    stats: "₹2,800 Cr+ Mandate GMV"
  },
  {
    id: "oberoi",
    name: "Oberoi Realty",
    experience: "31 Years",
    projects: "70+ Projects",
    category: "luxury",
    city: "Mumbai, Thane",
    topProject: "Oberoi Sky City Borivali",
    logoText: "OBEROI",
    badge: "Ultra Luxury",
    stats: "₹3,150 Cr+ Mandate GMV"
  },
  {
    id: "brigade",
    name: "Brigade Group",
    experience: "37 Years",
    projects: "180+ Projects",
    category: "commercial",
    city: "Bengaluru, Hyderabad, Chennai",
    topProject: "Brigade Icon Residences",
    logoText: "BRIGADE",
    badge: "Integrated Living",
    stats: "₹1,850 Cr+ Mandate GMV"
  },
  {
    id: "damac",
    name: "DAMAC Properties",
    experience: "22 Years",
    projects: "110+ Projects",
    category: "luxury",
    city: "Dubai, London, Riyadh",
    topProject: "DAMAC Lagoons & Hills",
    logoText: "DAMAC",
    badge: "Global Luxury",
    stats: "₹1,600 Cr+ Mandate GMV"
  },
  {
    id: "nakheel",
    name: "Nakheel",
    experience: "24 Years",
    projects: "80+ Projects",
    category: "township",
    city: "Dubai",
    topProject: "Palm Jumeirah & Islands",
    logoText: "NAKHEEL",
    badge: "Waterfront Icons",
    stats: "₹1,450 Cr+ Mandate GMV"
  }
];

// Workflow Steps
const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Mandate Discovery & Tech Integration",
    description: "Our developer advisory team conducts a rigorous feasibility study, calibrates unit pricing ladders, and integrates project inventory into the Aura Radiate developer platform."
  },
  {
    step: "02",
    title: "Syndicate Network Broadcast",
    description: "Launch collaterals, digital sales kits, and commission matrices are instantly distributed across 85,000+ verified channel partners with zero lead friction."
  },
  {
    step: "03",
    title: "Targeted Marketing & Site Visits",
    description: "Precision omnichannel digital ad campaigns, corporate roadshows, and complimentary private chauffeur visits deliver consistent high-intent buyer footfalls."
  },
  {
    step: "04",
    title: "Automated Closures & Payout Settlement",
    description: "Digital KYC, spot pre-approvals, online token deposits, and automated broker commissions are tracked inside the executive leadership dashboard."
  }
];

// Developer FAQs
const BUILDER_FAQS = [
  {
    q: "How does AuraLiving differ from traditional channel partners?",
    a: "Unlike fragmented local brokers, AuraLiving operates as an institutional mandate partner backed by the proprietary Aura Radiate proptech platform. We syndicate over 85,000+ registered brokers under one standardized, conflict-free system with centralized leads management and real-time leadership analytics."
  },
  {
    q: "How does the platform ensure zero lead conflict between brokers?",
    a: "Every lead submitted into our system undergoes automatic timestamping and OTP verification with the prospective homebuyer. The first verified channel partner receives tamper-proof attribution for the client, eliminating duplicate claims, commission disputes, and developer administrative overhead."
  },
  {
    q: "What is the typical timeline to onboard a new developer project?",
    a: "Standard project onboarding takes between 3 to 5 business days. This includes RERA diligence verification, digital collateral compilation, creation of the 3D unit availability matrix, and configuration of the Aura Radiate cloud CRM."
  },
  {
    q: "Can developers track broker performance and sales in real time?",
    a: "Yes. Builder leadership teams receive dedicated C-suite login access to the live Reporting Tool. You can track real-time site visits, broker conversion ratios, pending paperwork, payment milestones, and regional sales velocity 24/7."
  },
  {
    q: "What geographies and property types are supported?",
    a: "We manage residential luxury apartments, integrated townships, plotted developments, and grade-A commercial assets across Mumbai MMR, Pune, Bengaluru, Delhi NCR, Hyderabad, Chennai, and Dubai."
  }
];

export default function BuilderServicePage() {
  // Global Header Modals
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Form State matching "Interested? Enquire Now"
  const [userType, setUserType] = useState("builder"); // "builder" | "broker" | "buyer"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    city: "Mumbai",
    projectStage: "New Launch",
    whatsappUpdates: true,
    consent: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionReference, setSubmissionReference] = useState("");

  // Interactive Business Solutions Modal / Drawer
  const [selectedSolution, setSelectedSolution] = useState(null);

  // Top Developers Filter & Carousel
  const [devFilter, setDevFilter] = useState("all");
  const [devCarouselIndex, setDevCarouselIndex] = useState(0);

  // Developer Mandate Inquiry Modal
  const [mandateModalOpen, setMandateModalOpen] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  // Deck Download Modal
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [deckForm, setDeckForm] = useState({ name: "", email: "", phone: "", organization: "" });
  const [deckDownloaded, setDeckDownloaded] = useState(false);

  // Active FAQ Accordion item
  const [activeFaq, setActiveFaq] = useState(0);

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Please enter your full name";
    if (!formData.phone.trim()) {
      errors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.consent) {
      errors.consent = "You must agree to the terms to proceed";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Form Submission (Simulated Frontend Demo)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      const mockRef = `AL-MND-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionReference(mockRef);
    }, 700);
  };

  // Filtered Developers
  const filteredDevelopers = DEVELOPER_PARTNERS.filter((dev) => {
    if (devFilter === "all") return true;
    return dev.category === devFilter;
  });

  const handlePrevDev = () => {
    setDevCarouselIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, filteredDevelopers.length - 3)));
  };

  const handleNextDev = () => {
    setDevCarouselIndex((prev) => (prev + 3 < filteredDevelopers.length ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525] selection:bg-[#D29324] selection:text-white font-['Poppins',sans-serif]">
      {/* 1. GLOBAL HEADER */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* QUICK JUMP NAVIGATION BAR (Sticky pill banner) */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#E8E3DA] sticky top-[70px] z-30 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-12 flex items-center justify-between text-xs font-semibold overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center gap-6 whitespace-nowrap text-[#6B7280]">
            <a href="#overview" className="hover:text-[#D29324] transition-colors py-1">Overview</a>
            <a href="#solutions" className="hover:text-[#D29324] transition-colors py-1">Business Solutions</a>
            <a href="#enquire-now" className="hover:text-[#D29324] transition-colors py-1">Enquire Now</a>
            <a href="#developers" className="hover:text-[#D29324] transition-colors py-1">Top Developers</a>
            <a href="#workflow" className="hover:text-[#D29324] transition-colors py-1">How It Works</a>
            <a href="#faqs" className="hover:text-[#D29324] transition-colors py-1">FAQ</a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:18002094040"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#AE7419] bg-[#FBF1DF] px-3 py-1.5 rounded-full border border-[#D29324]/30 hover:bg-[#D29324] hover:text-white transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Toll Free: 1800-209-4040</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("enquire_form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Mandate Inquiry
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* 2. HERO BANNER & BREADCRUMB SECTION */}
        <section id="overview" className="relative bg-gradient-to-b from-[#FBF1DF]/60 via-[#FAF8F4] to-white border-b border-[#E8E3DA] pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden">
          {/* Subtle architectural background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#252525_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative">
            {/* Breadcrumb matching PropertyPistol's Home / Builder Service */}
            <nav className="flex items-center gap-2 text-xs font-medium text-[#6B7280] mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#D29324] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#D29324] transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[#AE7419] font-bold">Builder Service</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Heading, Platform Narrative & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#D29324]" />
                  <span>Aura Radiate Platform • Institutional Channel Partner Services</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#252525] tracking-tight leading-[1.15]">
                  Channel Partner Services for Leading <span className="text-[#D29324]">Real Estate Developers</span>
                </h1>

                <div className="space-y-4 text-sm sm:text-base text-[#6B7280] leading-relaxed">
                  <p>
                    AuraLiving offers innovative institutional brokerage services as a premier Channel Partner to leading Real Estate Companies. We partner with industry giants like <strong>The Lodha Group, Godrej Properties, L&amp;T Realty, House of Hiranandani, Prestige, and DLF</strong> to provide a cutting-edge, value-based technology platform.
                  </p>
                  <p>
                    This holistic business solution is an industry benchmark designed to help builders tap into the vast, untapped market of 85,000+ brokers and qualified buyers. Our platform provides a turnkey service that streamlines the entire journey from lead generation to customer handover, maximizing reach, speed, and profitability.
                  </p>
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById("enquire_form");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
                  >
                    <span>Enquire for Project Mandate</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setDeckModalOpen(true)}
                    className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#FBF1DF] text-[#252525] hover:text-[#AE7419] font-bold text-sm border border-[#E8E3DA] transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#D29324]" />
                    <span>Download Developer Solutions Deck</span>
                  </button>
                </div>

                {/* Security Guarantee Badge */}
                <div className="flex items-center gap-4 pt-2 text-xs text-[#6B7280]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>RERA Compliant Process</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>100% Confidential Data Room</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#D29324]" />
                    <span>Grade-A Developer Network</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Performance Metrics Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E3DA] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBF1DF] rounded-bl-full pointer-events-none"></div>

                  <div className="flex items-center justify-between mb-6 relative">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#AE7419]">Performance Track Record</span>
                      <h3 className="text-xl font-bold text-[#252525]">Aura Radiate Impact</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* 4 Performance Counter Numbers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">2,000+</div>
                      <div className="text-xs font-medium text-[#6B7280] mt-1">Grade-A Developers Onboarded</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#252525]">85,000+</div>
                      <div className="text-xs font-medium text-[#6B7280] mt-1">Active Syndicate Brokers</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#252525]">₹18,500+ Cr</div>
                      <div className="text-xs font-medium text-[#6B7280] mt-1">Total Mandate GMV Sold</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA]">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#AE7419]">42%</div>
                      <div className="text-xs font-medium text-[#6B7280] mt-1">Average Cycle Reduction</div>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="mt-6 pt-5 border-t border-[#E8E3DA] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D29324] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      GP
                    </div>
                    <div>
                      <p className="text-xs text-[#252525] italic font-medium leading-relaxed">
                        &ldquo;AuraLiving&apos;s channel partner network and digitized mandate execution accelerated our inventory absorption rate by 2.4x across our prime launches.&rdquo;
                      </p>
                      <span className="text-[11px] font-bold text-[#AE7419] block mt-1">Vice President — Marquee Developer Partner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MARQUEE DEVELOPER LOGOS WALL */}
        <section className="py-10 bg-white border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#AE7419]">
                Developer Network
              </span>
              <h3 className="text-lg font-bold text-[#252525] mt-1">
                Top Developers Under One Institutional Channel Partner Roof
              </h3>
            </div>

            {/* Horizontal Grid of Developer Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {DEVELOPER_PARTNERS.slice(0, 12).map((dev) => (
                <div
                  key={dev.id}
                  onClick={() => {
                    setSelectedDeveloper(dev);
                    setMandateModalOpen(true);
                  }}
                  className="bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] hover:border-[#D29324] p-3.5 rounded-xl transition-all cursor-pointer group text-center flex flex-col items-center justify-center min-h-[90px]"
                >
                  <span className="font-extrabold text-sm text-[#252525] tracking-tight group-hover:text-[#AE7419] transition-colors">
                    {dev.name}
                  </span>
                  <span className="text-[11px] text-[#6B7280] font-medium mt-0.5">
                    {dev.projects} • {dev.experience}
                  </span>
                  <span className="text-[10px] font-bold text-[#D29324] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Mandate Info →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. BUSINESS SOLUTIONS (The 6 Pillars from Reference) */}
        <section id="solutions" className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-bold mb-3">
                <Layers className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Proprietary Ecosystem</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
                Business Solutions for Builders
              </h2>
              <p className="text-sm sm:text-base text-[#6B7280] mt-3 leading-relaxed">
                A turnkey suite of six specialized institutional pillars engineered to eliminate channel partner friction, standardize project communication, and accelerate inventory sales velocity.
              </p>
            </div>

            {/* 6 Core Cards in 3x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {BUSINESS_SOLUTIONS.map((sol, idx) => {
                const IconComponent = sol.icon;
                return (
                  <div
                    key={sol.id}
                    className="bg-white rounded-2xl border border-[#E8E3DA] p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#D29324]/60 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Pill & Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-[#FBF1DF] text-[#AE7419] group-hover:bg-[#D29324] group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-[#AE7419] bg-[#FBF1DF] px-2.5 py-1 rounded-full border border-[#D29324]/30">
                          {sol.badge}
                        </span>
                      </div>

                      {/* Title & Reference Matching Short Copy */}
                      <h3 className="text-xl font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors mb-2">
                        {sol.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#252525] font-semibold leading-snug mb-3">
                        {sol.shortCopy}
                      </p>
                      <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                        {sol.fullDescription}
                      </p>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-2 mb-6">
                        {sol.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-[#252525]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D29324] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#AE7419]">
                        {sol.metrics}
                      </span>
                      <button
                        onClick={() => setSelectedSolution(sol)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D29324] hover:text-[#AE7419] group-hover:underline cursor-pointer"
                      >
                        <span>Live Demo Preview</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. CONSULTATION FORM ("Interested? Enquire Now" Section) */}
        <section id="enquire_form" className="py-16 sm:py-20 bg-white border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="bg-gradient-to-br from-[#FAF8F4] via-white to-[#FBF1DF] rounded-3xl border border-[#E8E3DA] shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Column: Value Proposition & Direct Reach Us Info */}
                <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#E8E3DA] flex flex-col justify-between space-y-6">
                  <div>
                    {/* Star Rating Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E8E3DA] shadow-2xs mb-4">
                      <div className="flex text-amber-500">
                        {"★".repeat(5)}
                      </div>
                      <span className="text-xs font-extrabold text-[#252525]">4.9 / 5</span>
                      <span className="text-[11px] text-[#6B7280]">• 2,000+ Developers</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight leading-tight">
                      Interested? <span className="text-[#D29324]">Enquire Now</span>
                    </h2>
                    <p className="text-sm font-semibold text-[#AE7419] mt-2">
                      Speak to our experts and get personalized services today
                    </p>
                    <p className="text-xs sm:text-sm text-[#6B7280] mt-3 leading-relaxed">
                      Connect directly with our institutional mandate directors. Whether you are launching a new flagship township or accelerating sales on existing inventory, we provide customized channel partner solutions.
                    </p>

                    {/* Highlights list */}
                    <div className="space-y-3 pt-6 text-xs text-[#252525] font-medium">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0" />
                        <span>Dedicated Mandate Director assigned within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0" />
                        <span>Confidential project feasibility & sales velocity report</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0" />
                        <span>Instant access to 85,000+ active Syndicate brokers</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0" />
                        <span>100% Zero-Conflict, timestamped OTP lead registration</span>
                      </div>
                    </div>
                  </div>

                  {/* Reach Us / Direct Hotline Card */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E3DA] shadow-xs space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#AE7419] block">
                      Direct Developer Hotline
                    </span>
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-[#D29324]" />
                      <a href="tel:18002094040" className="text-base font-extrabold text-[#252525] hover:text-[#AE7419]">
                        Toll Free: 1800-209-4040
                      </a>
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      Direct Support: <a href="mailto:support@auraliving.com" className="text-[#AE7419] font-medium hover:underline">support@auraliving.com</a>
                    </div>
                    <div className="text-[11px] text-[#6B7280] pt-1">
                      Operating Hours: Mon - Sat • 9:00 AM to 8:00 PM IST
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Consultation Lead Form */}
                <div className="lg:col-span-7 p-8 sm:p-12">
                  {formSubmitted ? (
                    <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center space-y-4 animate-in fade-in duration-300">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#252525]">
                        Inquiry Received Successfully!
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{formData.name}</strong>. Your developer service inquiry has been logged under Reference ID:
                      </p>
                      <div className="inline-block px-4 py-2 bg-[#FBF1DF] border border-[#D29324]/50 rounded-xl text-[#AE7419] font-mono font-bold text-sm">
                        {submissionReference}
                      </div>
                      <p className="text-xs text-[#6B7280]">
                        Our senior Institutional Mandate Director for <strong>{formData.city}</strong> will contact you at <strong>{formData.phone}</strong> within 2 business hours.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                              name: "",
                              phone: "",
                              email: "",
                              company: "",
                              city: "Mumbai",
                              projectStage: "New Launch",
                              whatsappUpdates: true,
                              consent: true
                            });
                          }}
                          className="px-6 py-2.5 rounded-xl bg-[#FAF8F4] hover:bg-[#FBF1DF] text-[#AE7419] border border-[#E8E3DA] text-xs font-bold transition-all cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* User Type Selector: Builder | Broker | Buyer */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                          I am inquiring as:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "builder", label: "Builder / Developer" },
                            { id: "broker", label: "Channel Partner" },
                            { id: "buyer", label: "Home Buyer" }
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setUserType(tab.id)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                                userType === tab.id
                                  ? "bg-[#D29324] text-white border-[#D29324] shadow-xs"
                                  : "bg-white text-[#252525] border-[#E8E3DA] hover:bg-[#FBF1DF]"
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name & Phone Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#252525] mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Rajiv Mehra"
                            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324] ${
                              formErrors.name ? "border-red-400" : "border-[#E8E3DA]"
                            }`}
                          />
                          {formErrors.name && (
                            <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#252525] mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E8E3DA] bg-[#FAF8F4] text-xs font-bold text-[#6B7280]">
                              +91
                            </span>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              maxLength={10}
                              placeholder="98765 43210"
                              className={`w-full px-4 py-2.5 rounded-r-xl border bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324] ${
                                formErrors.phone ? "border-red-400" : "border-[#E8E3DA]"
                              }`}
                            />
                          </div>
                          {formErrors.phone && (
                            <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Email & Organization/Project Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#252525] mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="rajiv@company.com"
                            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324] ${
                              formErrors.email ? "border-red-400" : "border-[#E8E3DA]"
                            }`}
                          />
                          {formErrors.email && (
                            <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#252525] mb-1">
                            {userType === "builder" ? "Company / Developer Name" : "Organization / Firm"}
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder={userType === "builder" ? "e.g. Apex Infra Developers" : "e.g. Mehra Real Estate"}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                          />
                        </div>
                      </div>

                      {/* Target City & Project Stage Dropdowns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#252525] mb-1">
                            Primary City
                          </label>
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                          >
                            <option value="Mumbai">Mumbai MMR</option>
                            <option value="Pune">Pune</option>
                            <option value="Bangalore">Bengaluru</option>
                            <option value="Delhi NCR">Delhi NCR / Gurugram</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Dubai">Dubai UAE</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#252525] mb-1">
                            Mandate Stage
                          </label>
                          <select
                            name="projectStage"
                            value={formData.projectStage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                          >
                            <option value="New Launch">Upcoming New Launch</option>
                            <option value="Under Construction">Under Construction Mandate</option>
                            <option value="Ready to Move">Ready-to-Move Inventory Clearance</option>
                            <option value="Plotted">Plotted / Villa Township</option>
                          </select>
                        </div>
                      </div>

                      {/* WhatsApp Updates Checkbox */}
                      <div className="pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#252525]">
                          <input
                            type="checkbox"
                            name="whatsappUpdates"
                            checked={formData.whatsappUpdates}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-[#D29324] rounded cursor-pointer"
                          />
                          <span>Receive instant feasibility analysis and mandate deck on WhatsApp</span>
                        </label>
                      </div>

                      {/* Consent & DNC disclaimer */}
                      <div>
                        <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#6B7280]">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-[#D29324] rounded mt-0.5 cursor-pointer"
                          />
                          <span>
                            I authorize AuraLiving &amp; its representatives to contact me via Call, SMS, or WhatsApp regarding Builder Mandate Services overriding any DNC/NDNC registration.
                          </span>
                        </label>
                        {formErrors.consent && (
                          <p className="text-[11px] text-red-500 mt-1">{formErrors.consent}</p>
                        )}
                      </div>

                      {/* Submit CTA Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Processing Mandate Request...</span>
                            </>
                          ) : (
                            <>
                              <span>Enquire Now</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-center text-[11px] text-[#6B7280] pt-1">
                        🔒 Safe &amp; Confidential • Demo Form with Instant Simulation
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. TOP DEVELOPERS UNDER ONE ROOF */}
        <section id="developers" className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-bold mb-2">
                  <Award className="w-3.5 h-3.5 text-[#D29324]" />
                  <span>Institutional Partnerships</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
                  Top Developers Under One Roof
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                  Direct Channel Partner mandates with India&apos;s most reputed Grade-A developers.
                </p>
              </div>

              {/* Prev / Next Carousel Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevDev}
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#FBF1DF] border border-[#E8E3DA] text-[#252525] hover:text-[#AE7419] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  title="Previous Developers"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextDev}
                  className="w-10 h-10 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  title="Next Developers"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
              {[
                { id: "all", label: "All Developers" },
                { id: "luxury", label: "Luxury & Ultra-Luxury" },
                { id: "township", label: "Integrated Townships" },
                { id: "highrise", label: "High-Rise Residential" },
                { id: "commercial", label: "Commercial & Retail" }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    setDevFilter(pill.id);
                    setDevCarouselIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    devFilter === pill.id
                      ? "bg-[#D29324] text-white border-[#D29324] shadow-xs"
                      : "bg-white text-[#252525] border-[#E8E3DA] hover:bg-[#FBF1DF]"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Developers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevelopers.slice(devCarouselIndex, devCarouselIndex + 3).map((dev) => (
                <div
                  key={dev.id}
                  className="bg-white rounded-2xl border border-[#E8E3DA] p-6 shadow-xs hover:shadow-lg hover:border-[#D29324] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419] bg-[#FBF1DF] px-2 py-0.5 rounded-full border border-[#D29324]/30">
                          {dev.badge}
                        </span>
                        <h3 className="text-xl font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors mt-2">
                          {dev.name}
                        </h3>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-center font-black text-xs text-[#D29324] tracking-tighter shrink-0">
                        {dev.logoText}
                      </div>
                    </div>

                    {/* Metadata & Key Project */}
                    <div className="space-y-2.5 py-3 border-y border-[#E8E3DA] my-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Market Presence:</span>
                        <span className="font-bold text-[#252525]">{dev.city}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Track Record:</span>
                        <span className="font-bold text-[#252525]">{dev.experience} • {dev.projects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Marquee Project:</span>
                        <span className="font-bold text-[#AE7419]">{dev.topProject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280]">Aura Mandate Volume:</span>
                        <span className="font-bold text-emerald-600">{dev.stats}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      setSelectedDeveloper(dev);
                      setMandateModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#FAF8F4] group-hover:bg-[#D29324] text-[#252525] group-hover:text-white border border-[#E8E3DA] group-hover:border-[#D29324] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <span>Request Developer Mandate Deck</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. HOW IT WORKS / MANDATE ONBOARDING WORKFLOW */}
        <section id="workflow" className="py-16 sm:py-20 bg-white border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#AE7419]">
                Structured Methodology
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] mt-2 tracking-tight">
                How We Onboard &amp; Accelerate Projects
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
                A proven 4-stage institutional execution framework built for speed, transparency, and absorption.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WORKFLOW_STEPS.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F4] rounded-2xl p-6 border border-[#E8E3DA] hover:border-[#D29324] transition-all relative group"
                >
                  <div className="text-4xl font-black text-[#D29324]/30 group-hover:text-[#D29324] transition-colors mb-3">
                    {s.step}
                  </div>
                  <h3 className="text-base font-bold text-[#252525] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. BUILDER FAQS (ACCORDION) */}
        <section id="faqs" className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#E8E3DA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-bold mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Developer Knowledge Base</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
                Everything real estate companies need to know about our mandate models and syndicate channel partners.
              </p>
            </div>

            <div className="space-y-3">
              {BUILDER_FAQS.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E8E3DA] overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#252525] hover:text-[#AE7419] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#D29324] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#6B7280] leading-relaxed border-t border-[#E8E3DA]/60 bg-[#FAF8F4]/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9. BOTTOM CALL TO ACTION BANNER */}
        <section className="py-16 bg-gradient-to-r from-[#252525] via-[#1F1F1F] to-[#252525] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D29324_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D29324] block mb-2">
              Accelerate Your Project Absorption
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Accelerate Your Project Sales with AuraLiving?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-4 leading-relaxed">
              Join over 2,000+ real estate builders leveraging India&apos;s most sophisticated institutional channel partner ecosystem and proptech platform.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <button
                onClick={() => {
                  const el = document.getElementById("enquire_form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Schedule Developer Consultation
              </button>
              <Link
                href="/services/syndicate"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Explore Syndicate Broker Network
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 10. GLOBAL FOOTER */}
      <Footer />

      {/* ================= MODALS & POPUPS ================= */}

      {/* A. Global City Selector Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(cityId) => setSelectedCity(cityId)}
      />

      {/* B. Aura AI Assistant Modal */}
      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* C. Interactive Business Solution Live Demo Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E8E3DA] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-[#FAF8F4] border-b border-[#E8E3DA]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center font-bold">
                  {React.createElement(selectedSolution.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419]">
                    Interactive Live Demo
                  </span>
                  <h3 className="text-lg font-bold text-[#252525]">
                    {selectedSolution.title} — Solution Deep Dive
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedSolution(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 border border-[#E8E3DA] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Interactive Simulation Preview */}
            <div className="p-6 space-y-5">
              <div className="bg-[#FAF8F4] rounded-2xl p-5 border border-[#E8E3DA] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#AE7419] bg-[#FBF1DF] px-2.5 py-1 rounded-full border border-[#D29324]/30">
                    {selectedSolution.demoPreview.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Platform Feed
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-[#252525]">
                  {selectedSolution.demoPreview.title}
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-[#E8E3DA]">
                    <div className="text-[11px] text-[#6B7280]">Primary Metric</div>
                    <div className="text-xs font-bold text-[#252525] mt-0.5">{selectedSolution.demoPreview.stat1}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E8E3DA]">
                    <div className="text-[11px] text-[#6B7280]">Secondary Metric</div>
                    <div className="text-xs font-bold text-[#D29324] mt-0.5">{selectedSolution.demoPreview.stat2}</div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#252525] mb-2">
                  Key Institutional Capabilities:
                </h5>
                <ul className="space-y-2">
                  {selectedSolution.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#252525]">
                      <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF1DF]/70 border border-[#D29324]/30 text-xs text-[#AE7419] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Interested in experiencing this live module with your project&apos;s inventory data? Schedule a dedicated technical walkthrough with our enterprise solutions team.
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF8F4] border-t border-[#E8E3DA] flex items-center justify-between">
              <button
                onClick={() => setSelectedSolution(null)}
                className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#252525] cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setSelectedSolution(null);
                  const el = document.getElementById("enquire_form");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Request Full Platform Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* D. Developer Mandate Inquiry Modal */}
      {mandateModalOpen && selectedDeveloper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E8E3DA] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 bg-[#FAF8F4] border-b border-[#E8E3DA]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419]">
                  Developer Mandate Deck
                </span>
                <h3 className="text-lg font-bold text-[#252525]">
                  {selectedDeveloper.name}
                </h3>
              </div>
              <button
                onClick={() => setMandateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 border border-[#E8E3DA] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Active Mandate GMV:</span>
                  <span className="font-bold text-emerald-600">{selectedDeveloper.stats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Track Record:</span>
                  <span className="font-bold text-[#252525]">{selectedDeveloper.experience} • {selectedDeveloper.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Key Showcase Project:</span>
                  <span className="font-bold text-[#AE7419]">{selectedDeveloper.topProject}</span>
                </div>
              </div>

              <p className="text-[#6B7280] leading-relaxed">
                AuraLiving manages exclusive channel partner distribution, launch acceleration, and digitized inventory allocation for <strong>{selectedDeveloper.name}</strong>. Submit your details below to receive project inventory sheets, pricing ladders, and broker commission structures.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMandateModalOpen(false);
                    const el = document.getElementById("enquire_form");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Inquire for {selectedDeveloper.name} Mandate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E. Developer Solutions Deck Download Modal */}
      {deckModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-[#E8E3DA] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 bg-[#FAF8F4] border-b border-[#E8E3DA]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419]">
                  Official Presentation
                </span>
                <h3 className="text-lg font-bold text-[#252525]">
                  Developer Solutions Deck
                </h3>
              </div>
              <button
                onClick={() => setDeckModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 border border-[#E8E3DA] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {deckDownloaded ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#252525]">Solutions Deck Sent!</h4>
                  <p className="text-xs text-[#6B7280]">
                    The official 28-page Aura Radiate Developer Solutions Deck (PDF) has been dispatched to <strong>{deckForm.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setDeckModalOpen(false);
                      setDeckDownloaded(false);
                    }}
                    className="mt-2 px-5 py-2 rounded-xl bg-[#D29324] text-white text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!deckForm.name || !deckForm.email) return;
                    setDeckDownloaded(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <p className="text-[#6B7280] leading-relaxed">
                    Download the comprehensive brochure detailing our 6 institutional solutions, syndicate broker reach, and technology integration guides.
                  </p>
                  <div>
                    <label className="block font-semibold text-[#252525] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={deckForm.name}
                      onChange={(e) => setDeckForm({ ...deckForm, name: e.target.value })}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#252525] mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={deckForm.email}
                      onChange={(e) => setDeckForm({ ...deckForm, email: e.target.value })}
                      placeholder="anand@developer.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#252525] mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={deckForm.phone}
                      onChange={(e) => setDeckForm({ ...deckForm, phone: e.target.value })}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      Instant PDF Download
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
