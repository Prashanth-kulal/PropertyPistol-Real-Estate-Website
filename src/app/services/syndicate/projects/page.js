"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Share2,
  Download,
  Play,
  X,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Compass,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  MessageCircle,
  HelpCircle,
  QrCode,
  Smartphone,
  ChevronDown
} from "lucide-react";

// Verified project opportunities with real details, videos, and broker payouts
const SYNDICATE_PROJECTS = [
  {
    id: "syn-proj-1",
    title: "Upcoming Launch In Ghansoli",
    developer: "Marquee Tier-1 Developer",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Ghansoli, Navi Mumbai",
    price: "Starting ₹1.99 Cr*",
    priceNumeric: 19900000,
    config: "2 & 3 BHK Luxury",
    carpetArea: "750 - 1,180 sq.ft",
    status: "Hot Launch",
    statusBadge: "HOT LAUNCH",
    commission: "3.5% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/4zArth3pU6c",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    possession: "Dec 2027",
    rera: "P51700048129",
    tag: "Exclusive Mandate",
    rating: 4.9
  },
  {
    id: "syn-proj-2",
    title: "Mahindra Rainforest",
    developer: "Mahindra Lifespaces",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Kandivali East, Western Suburbs",
    price: "Starting ₹2.15 Cr*",
    priceNumeric: 21500000,
    config: "2 & 3 BHK Nature Homes",
    carpetArea: "680 - 1,120 sq.ft",
    status: "Hot Launch",
    statusBadge: "EXCLUSIVE ALLOCATION",
    commission: "3.25% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/u0WG-XZJkbs",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    possession: "Mid 2027",
    rera: "P51800034102",
    tag: "Priority Brokerage",
    rating: 4.8
  },
  {
    id: "syn-proj-3",
    title: "Upcoming Launch In Malad",
    developer: "Top Metro Developer",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Malad West, Link Road Corridor",
    price: "Starting ₹1.85 Cr*",
    priceNumeric: 18500000,
    config: "2 & 3 BHK High-Rise",
    carpetArea: "710 - 1,050 sq.ft",
    status: "Under Construction",
    statusBadge: "HOT LAUNCH",
    commission: "3.5% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/6SW7AK3qkH0",
    thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    possession: "Late 2027",
    rera: "P51800051280",
    tag: "Pre-Launch Privilege",
    rating: 4.9
  },
  {
    id: "syn-proj-4",
    title: "Godrej Country Estate",
    developer: "Godrej Properties",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Manor, Mumbai-Ahmedabad Corridor",
    price: "Starting ₹65 Lac*",
    priceNumeric: 6500000,
    config: "Luxury Plotted Enclave",
    carpetArea: "1,200 - 3,500 sq.ft",
    status: "Ready to Move",
    statusBadge: "READY POSSESSION",
    commission: "3.0% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/y5f3dhY-iiE",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    possession: "Immediate Registration",
    rera: "P52000021980",
    tag: "Fast Track Closures",
    rating: 4.7
  },
  {
    id: "syn-proj-5",
    title: "Godrej Varanya",
    developer: "Godrej Properties",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Kharghar, Navi Mumbai",
    price: "Starting ₹1.45 Cr*",
    priceNumeric: 14500000,
    config: "2 & 3 BHK Forest Residences",
    carpetArea: "740 - 1,220 sq.ft",
    status: "Under Construction",
    statusBadge: "NEW RELEASE",
    commission: "3.25% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/5PzEccIHE5U",
    thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    possession: "Q1 2028",
    rera: "P52000049104",
    tag: "Direct Escrow Payout",
    rating: 4.8
  },
  {
    id: "syn-proj-6",
    title: "Mahindra BeaconHill",
    developer: "Mahindra Lifespaces",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Thane West, Ghodbunder Road",
    price: "Starting ₹1.68 Cr*",
    priceNumeric: 16800000,
    config: "2, 3 & 4 BHK Hill-Facing",
    carpetArea: "760 - 1,480 sq.ft",
    status: "Hot Launch",
    statusBadge: "HOT LAUNCH",
    commission: "3.25% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/wWuebd-PxKo",
    thumbnail: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80",
    possession: "Dec 2027",
    rera: "P51700054321",
    tag: "Exclusive Mandate",
    rating: 4.8
  },
  {
    id: "syn-proj-7",
    title: "Puravankara Estrella",
    developer: "Puravankara Limited",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Lokhandwala, Andheri West",
    price: "Starting ₹3.85 Cr*",
    priceNumeric: 38500000,
    config: "3 & 4 BHK Ultra-Luxury",
    carpetArea: "1,150 - 2,100 sq.ft",
    status: "Under Construction",
    statusBadge: "HIGH PAYOUT",
    commission: "3.75% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/dNexeyE87bA",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    possession: "Q3 2028",
    rera: "P51800062145",
    tag: "High Value Ticket",
    rating: 4.9
  },
  {
    id: "syn-proj-8",
    title: "DLF The Westpark",
    developer: "DLF Limited",
    city: "gurugram",
    cityName: "Gurugram",
    location: "Sector 63, Golf Course Extension",
    price: "Starting ₹3.20 Cr*",
    priceNumeric: 32000000,
    config: "3 & 4 BHK Executive Suites",
    carpetArea: "1,850 - 2,800 sq.ft",
    status: "Hot Launch",
    statusBadge: "HOT LAUNCH",
    commission: "3.5% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/VylPt4acaIY",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    possession: "Q4 2027",
    rera: "RC/REP/HARERA/GGM/2023/108",
    tag: "NCR Marquee Mandate",
    rating: 5.0
  },
  {
    id: "syn-proj-9",
    title: "Birla Mrida",
    developer: "Birla Estates",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Worli, South Mumbai",
    price: "Starting ₹4.50 Cr*",
    priceNumeric: 45000000,
    config: "3 & 4 BHK Sea View",
    carpetArea: "1,280 - 2,450 sq.ft",
    status: "Under Construction",
    statusBadge: "ICONIC TOWER",
    commission: "3.5% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/00Zh7rfxYu0",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    possession: "Dec 2028",
    rera: "P51900052341",
    tag: "Ultra Luxury Portfolio",
    rating: 4.9
  },
  {
    id: "syn-proj-10",
    title: "Lodha Sewri Horizon",
    developer: "Lodha Group (Macrotech)",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Sewri West, Eastern Seaboard",
    price: "Starting ₹2.95 Cr*",
    priceNumeric: 29500000,
    config: "2 & 3 BHK Harbor Front",
    carpetArea: "820 - 1,350 sq.ft",
    status: "Hot Launch",
    statusBadge: "HOT LAUNCH",
    commission: "3.5% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/z0opoYRgPcA",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    possession: "Mid 2027",
    rera: "P51900048123",
    tag: "Trans-Harbour Link Proximity",
    rating: 4.8
  },
  {
    id: "syn-proj-11",
    title: "The Gateway by L&T",
    developer: "L&T Realty",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Sewri-Parel Junction",
    price: "Starting ₹3.40 Cr*",
    priceNumeric: 34000000,
    config: "3 & 4 BHK Signature Condos",
    carpetArea: "1,050 - 1,980 sq.ft",
    status: "Under Construction",
    statusBadge: "SIGNATURE PROJECT",
    commission: "3.25% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/x54rPzE4UM0",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    possession: "Q2 2028",
    rera: "P51900051908",
    tag: "Flagship Urban Center",
    rating: 4.9
  },
  {
    id: "syn-proj-12",
    title: "Prestige Falcon City",
    developer: "Prestige Group",
    city: "bangalore",
    cityName: "Bengaluru",
    location: "Kanakapura Road, South Bangalore",
    price: "Starting ₹1.42 Cr*",
    priceNumeric: 14200000,
    config: "2 & 3 BHK High-Rise",
    carpetArea: "1,204 - 1,588 sq.ft",
    status: "Ready to Move",
    statusBadge: "READY POSSESSION",
    commission: "3.0% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/5P7ML7D3HtA",
    thumbnail: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
    possession: "Immediate Handover",
    rera: "PRM/KA/RERA/1251/310/PR/170915/000204",
    tag: "Tech Corridor Magnet",
    rating: 4.8
  },
  {
    id: "syn-proj-13",
    title: "Kolte Patil Life Republic",
    developer: "Kolte-Patil Developers",
    city: "pune",
    cityName: "Pune",
    location: "Hinjewadi, IT Park Hub",
    price: "Starting ₹68 Lac*",
    priceNumeric: 6800000,
    config: "2 & 3 BHK Smart Condos",
    carpetArea: "690 - 1,020 sq.ft",
    status: "Hot Launch",
    statusBadge: "HOT LAUNCH",
    commission: "3.25% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/5P7ML7D3HtA",
    thumbnail: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=800&q=80",
    possession: "Mid 2026",
    rera: "P52100026875",
    tag: "High Volume Inventory",
    rating: 4.7
  },
  {
    id: "syn-proj-14",
    title: "Godrej Woodsville",
    developer: "Godrej Properties",
    city: "pune",
    cityName: "Pune",
    location: "Hinjewadi Phase 1, Pune",
    price: "Starting ₹75 Lac*",
    priceNumeric: 7500000,
    config: "2 & 3 BHK Elevated Living",
    carpetArea: "720 - 1,080 sq.ft",
    status: "Under Construction",
    statusBadge: "FAST CLOSING",
    commission: "3.25% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/5P7ML7D3HtA",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    possession: "Dec 2026",
    rera: "P52100046729",
    tag: "Metro Connected",
    rating: 4.8
  },
  {
    id: "syn-proj-15",
    title: "Sobha Dream Acres",
    developer: "Sobha Limited",
    city: "bangalore",
    cityName: "Bengaluru",
    location: "Panathur, Outer Ring Road",
    price: "Starting ₹98 Lac*",
    priceNumeric: 9800000,
    config: "1 & 2 BHK Techie Enclave",
    carpetArea: "660 - 920 sq.ft",
    status: "Ready to Move",
    statusBadge: "READY POSSESSION",
    commission: "3.0% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/5P7ML7D3HtA",
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    possession: "Immediate Handover",
    rera: "PRM/KA/RERA/1251/446/PR/170915/000155",
    tag: "Instant Spot Payout",
    rating: 4.7
  },
  {
    id: "syn-proj-16",
    title: "Aura Royale Skies",
    developer: "AuraLiving Landmark Dev",
    city: "mumbai",
    cityName: "Mumbai",
    location: "Worli, South Mumbai",
    price: "Starting ₹7.50 Cr*",
    priceNumeric: 75000000,
    config: "3, 4 & 5 BHK Skyline Mansions",
    carpetArea: "2,200 - 4,800 sq.ft",
    status: "Under Construction",
    statusBadge: "SPOT PAYOUT 3.5%",
    commission: "3.5% Spot Payout",
    videoUrl: "https://www.youtube.com/embed/5P7ML7D3HtA",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    possession: "Q4 2028",
    rera: "P51900049980",
    tag: "Crown Mandate",
    rating: 5.0
  }
];

const CITIES_FILTER = [
  { id: "all", name: "All Cities", count: 16 },
  { id: "mumbai", name: "Mumbai", count: 9 },
  { id: "pune", name: "Pune", count: 2 },
  { id: "bangalore", name: "Bengaluru", count: 2 },
  { id: "gurugram", name: "Gurugram / NCR", count: 1 },
  { id: "hyderabad", name: "Hyderabad", count: 1 },
  { id: "nagpur", name: "Nagpur", count: 1 }
];

const STATUS_FILTERS = [
  { id: "all", label: "All Opportunities" },
  { id: "Hot Launch", label: "🔥 Hot Launches" },
  { id: "Under Construction", label: "Under Construction" },
  { id: "Ready to Move", label: "Ready Possession" },
  { id: "high_payout", label: "3.5%+ High Payout" }
];

export default function SyndicateProjectsPage() {
  // Filter states
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const [activeVideoTitle, setActiveVideoTitle] = useState("");

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareProject, setShareProject] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProjectForEnquiry, setSelectedProjectForEnquiry] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    agency: "",
    city: "Mumbai",
    notes: ""
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);

  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [brochureProject, setBrochureProject] = useState(null);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);
  const [brochureForm, setBrochureForm] = useState({ name: "", phone: "", email: "" });

  // Floating widget & scroll to top state
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQrWidget, setShowQrWidget] = useState(true);

  // FAQ open item
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return SYNDICATE_PROJECTS.filter((proj) => {
      // City filter
      if (selectedCity !== "all" && proj.city !== selectedCity) return false;

      // Status filter
      if (selectedStatus === "high_payout") {
        if (!proj.commission.includes("3.5%") && !proj.commission.includes("3.75%")) return false;
      } else if (selectedStatus !== "all" && proj.status !== selectedStatus) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = proj.title.toLowerCase().includes(q);
        const matchesDev = proj.developer.toLowerCase().includes(q);
        const matchesLoc = proj.location.toLowerCase().includes(q);
        const matchesCity = proj.cityName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDev && !matchesLoc && !matchesCity) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.priceNumeric - b.priceNumeric;
      if (sortBy === "price_desc") return b.priceNumeric - a.priceNumeric;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "payout") {
        const getNum = (str) => parseFloat(str) || 0;
        return getNum(b.commission) - getNum(a.commission);
      }
      return 0; // default recommended order
    });
  }, [selectedCity, selectedStatus, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const element = document.getElementById("projects-grid-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenVideo = (videoUrl, title) => {
    setActiveVideoUrl(videoUrl || "https://www.youtube.com/embed/4zArth3pU6c");
    setActiveVideoTitle(title || "Exclusive Project Walkthrough");
    setVideoModalOpen(true);
  };

  const handleOpenShare = (project) => {
    setShareProject(project);
    setCopiedLink(false);
    setShareModalOpen(true);
  };

  const handleCopyShareLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/services/syndicate/projects?proj=${shareProject?.id || ""}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      });
    }
  };

  const handleOpenEnquiry = (project = null) => {
    setSelectedProjectForEnquiry(project);
    setEnquirySubmitted(false);
    setEnquiryModalOpen(true);
  };

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) return;
    setIsSubmittingEnquiry(true);
    setTimeout(() => {
      setIsSubmittingEnquiry(false);
      setEnquirySubmitted(true);
    }, 700);
  };

  const handleOpenBrochure = (project) => {
    setBrochureProject(project);
    setBrochureDownloaded(false);
    setBrochureModalOpen(true);
  };

  const handleSubmitBrochure = (e) => {
    e.preventDefault();
    if (!brochureForm.name || !brochureForm.phone) return;
    setBrochureDownloaded(true);
  };

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedStatus("all");
    setSearchQuery("");
    setSortBy("recommended");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#252525] font-sans selection:bg-[#D6B36A]/20 selection:text-[#14263D]">
      
      {/* 1. DEDICATED SYNDICATE HEADER (Fixed at top-0 with NO white gap) */}
      <header className="bg-[#14263D] text-white sticky top-0 z-40 shadow-xl border-b border-[#D6B36A]/20 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-[72px] flex items-center justify-between">
          
          {/* Left Brand Identity */}
          <div className="flex items-center gap-3">
            <Link href="/services/syndicate" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6B36A] to-[#167C80] flex items-center justify-center font-black text-white text-xl tracking-tighter shadow-md group-hover:scale-105 transition-transform">
                S
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                    SYNDICATE
                  </span>
                  <span className="text-[10px] font-bold text-[#D6B36A] bg-[#D6B36A]/15 px-1.5 py-0.5 rounded uppercase tracking-wider border border-[#D6B36A]/30">
                    Broker Desk
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-gray-300 tracking-wider uppercase mt-1">
                  By AuraLiving
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-gray-200">
            <Link
              href="/services/syndicate"
              className="hover:text-[#D6B36A] transition-colors py-1 text-gray-300"
            >
              Home
            </Link>
            <Link
              href="/services/syndicate/projects"
              className="text-white font-bold bg-[#167C80] px-3.5 py-1.5 rounded-full border border-[#D6B36A]/40 shadow-xs flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D6B36A]" />
              <span>Exclusive Projects</span>
            </Link>
            <Link
              href="/services/syndicate#benefits"
              className="hover:text-[#D6B36A] transition-colors py-1 text-gray-300"
            >
              Partner Benefits
            </Link>
            <Link
              href="/services/syndicate#features"
              className="hover:text-[#D6B36A] transition-colors py-1 text-gray-300"
            >
              Mobile App
            </Link>
            <a
              href="#why-syndicate"
              className="hover:text-[#D6B36A] transition-colors py-1 text-gray-300"
            >
              Why Syndicate
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+918080190190"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 border border-white/15 text-xs font-semibold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D6B36A]" />
              <span>8080 190 190</span>
            </a>

            <button
              onClick={() => handleOpenEnquiry(null)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#167C80] hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer border border-[#D6B36A]/50 transition-all hover:scale-[1.02]"
            >
              <span>Partner Allocation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. BREADCRUMB BAR */}
      <section className="bg-white border-b border-[#E6E3DC] py-2.5 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs text-[#697386]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#167C80] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services/syndicate" className="hover:text-[#167C80] transition-colors">
              Syndicate Broker Platform
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#14263D]">
              Exclusive Launch Opportunities & Projects
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 font-medium">
            <span className="inline-flex items-center gap-1 text-[#167C80]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RERA Registered Mandates Only</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="inline-flex items-center gap-1 text-[#D6B36A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spot Commission Guaranteed</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. HERO & PERFORMANCE STATS SECTION (AuraLiving Visual Redesign) */}
      <section className="relative bg-[#14263D] text-white overflow-hidden py-12 lg:py-16 border-b border-[#D6B36A]/20">
        {/* Subtle decorative glow accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#167C80]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-t from-[#D6B36A]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Headline & Overview */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#167C80]/30 border border-[#D6B36A]/40 text-[#D6B36A] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span>Certified Broker Mandates & Launches</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                New Launch Opportunities for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6B36A] to-amber-200">
                  Real Estate Brokers
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                India’s premier channel partner ecosystem. Gain priority access to hot project launches from top developers with guaranteed spot payouts, chauffeured buyer site visits, and automated paperwork execution.
              </p>

              {/* 3 Value Pillars */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold text-gray-200">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B36A]" />
                  <span>Transparent Escrow Payouts</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#167C80]" />
                  <span>Direct Developer Inventory</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#D6B36A]" />
                  <span>Doorstep Documentation</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => handleOpenEnquiry(null)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#167C80] hover:opacity-95 text-white font-extrabold text-sm flex items-center gap-2.5 shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Users className="w-4 h-4" />
                  <span>Register as Channel Partner</span>
                </button>

                <button
                  onClick={() => handleOpenVideo("https://www.youtube.com/embed/5P7ML7D3HtA", "AuraLiving Syndicate Overview")}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm flex items-center gap-2.5 transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#D6B36A] flex items-center justify-center text-[#14263D]">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch Network Video</span>
                </button>
              </div>
            </div>

            {/* Right: Milestone Performance Cards (Matching Reference "ABOUT SYNDICATE") */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl relative">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-bold text-[#D6B36A] tracking-widest uppercase">
                      ABOUT SYNDICATE
                    </span>
                    <h3 className="text-lg font-extrabold text-white">Track Record & Scale</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#167C80]/30 border border-[#167C80] flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#D6B36A]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6B36A]/40 transition-colors">
                    <span className="text-2xl sm:text-3xl font-black text-[#D6B36A] block">
                      25,000+
                    </span>
                    <span className="text-xs text-gray-300 font-medium mt-1 block">
                      Site Visits Done
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6B36A]/40 transition-colors">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">
                      ₹40 CR+
                    </span>
                    <span className="text-xs text-gray-300 font-medium mt-1 block">
                      Brokerage Released
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6B36A]/40 transition-colors">
                    <span className="text-2xl sm:text-3xl font-black text-[#167C80] block">
                      500+
                    </span>
                    <span className="text-xs text-gray-300 font-medium mt-1 block">
                      Cross Border Deals
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6B36A]/40 transition-colors">
                    <span className="text-2xl sm:text-3xl font-black text-white block">
                      25,000+
                    </span>
                    <span className="text-xs text-gray-300 font-medium mt-1 block">
                      Channel Partners
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
                    <span>Instant CRM Integration</span>
                  </span>
                  <Link
                    href="/services/syndicate"
                    className="text-[#D6B36A] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Full Platform Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SEARCH, CITY TABS & FILTER BAR */}
      <section id="projects-grid-section" className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-[#E6E3DC] shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5">
          
          {/* Top row: Search input & Sorting */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-3">
            {/* Search Box */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#697386] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by project, developer or location..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#FAF8F2] border border-[#E6E3DC] focus:border-[#167C80] focus:bg-white text-xs text-[#252525] outline-none transition-all placeholder:text-[#697386]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right: Sort controls & Active count */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs font-semibold text-[#697386]">
                <strong className="text-[#14263D]">{filteredProjects.length}</strong> Opportunities Found
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#697386] uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF8F2] border border-[#E6E3DC] text-xs font-medium text-[#14263D] focus:border-[#167C80] outline-none cursor-pointer"
                >
                  <option value="recommended">Featured / Recommended</option>
                  <option value="payout">Highest Payout %</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Broker Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom row: City Selection Tabs (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
            {CITIES_FILTER.map((city) => {
              const active = selectedCity === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-[#14263D] text-[#D6B36A] shadow-md border border-[#14263D]"
                      : "bg-[#FAF8F2] text-[#697386] hover:bg-gray-200 border border-[#E6E3DC]"
                  }`}
                >
                  <span>{city.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      active ? "bg-[#D6B36A] text-[#14263D]" : "bg-gray-200 text-[#697386]"
                    }`}
                  >
                    {city.id === "all"
                      ? SYNDICATE_PROJECTS.length
                      : SYNDICATE_PROJECTS.filter((p) => p.city === city.id).length}
                  </span>
                </button>
              );
            })}

            {/* Status pills divider */}
            <div className="h-4 w-[1px] bg-gray-300 mx-1 shrink-0"></div>

            {/* Quick status filter pills */}
            {STATUS_FILTERS.map((status) => {
              const active = selectedStatus === status.id;
              return (
                <button
                  key={status.id}
                  onClick={() => {
                    setSelectedStatus(status.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    active
                      ? "bg-[#167C80] text-white shadow-xs border border-[#167C80]"
                      : "bg-white text-[#697386] hover:bg-[#FAF8F2] border border-[#E6E3DC]"
                  }`}
                >
                  {status.label}
                </button>
              );
            })}

            {(selectedCity !== "all" || selectedStatus !== "all" || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-[#E85A2A] hover:underline px-2 shrink-0 cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 5. PROJECT CARDS SHOWCASE GRID */}
      <section className="py-10 lg:py-14 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {paginatedProjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6E3DC] shadow-xs max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F2] flex items-center justify-center mx-auto text-[#697386] mb-4">
              <Building2 className="w-8 h-8 text-[#167C80]" />
            </div>
            <h3 className="text-lg font-bold text-[#14263D]">No Projects Found</h3>
            <p className="text-xs text-[#697386] mt-1 mb-6">
              We couldn’t find any opportunities matching your active filters. Try broadening your city or search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#14263D] text-[#D6B36A] font-bold text-xs hover:bg-[#167C80] hover:text-white transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
            {paginatedProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E6E3DC] shadow-sm hover:shadow-xl hover:border-[#D6B36A]/50 transition-all duration-300 flex flex-col sm:flex-row group"
              >
                
                {/* Left: Media Image & Video Trigger Header */}
                <div className="w-full sm:w-[240px] md:w-[270px] shrink-0 relative min-h-[190px] sm:min-h-full overflow-hidden bg-gray-900">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-[#14263D]/90 text-[#D6B36A] border border-[#D6B36A]/40 backdrop-blur-xs">
                      {proj.statusBadge}
                    </span>

                    <button
                      onClick={() => handleOpenShare(proj)}
                      className="w-7 h-7 rounded-full bg-black/50 hover:bg-[#167C80] text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                      title="Share Opportunity"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Play Video Walkthrough Overlay */}
                  <button
                    onClick={() => handleOpenVideo(proj.videoUrl, proj.title)}
                    className="absolute inset-0 flex items-center justify-center group/btn cursor-pointer"
                    title="Watch Walkthrough Film"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#167C80]/90 text-white flex items-center justify-center shadow-lg group-hover/btn:scale-110 group-hover/btn:bg-[#D6B36A] group-hover/btn:text-[#14263D] transition-all">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </button>

                  {/* Bottom Image Stats (City & Payout) */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1 text-gray-200 text-[10px] font-semibold bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      <MapPin className="w-3 h-3 text-[#D6B36A]" />
                      <span>{proj.cityName}</span>
                    </div>

                    <span className="bg-[#167C80] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs border border-white/20">
                      {proj.commission}
                    </span>
                  </div>
                </div>

                {/* Right: Card Body Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Developer Name */}
                    <span className="text-[11px] font-bold text-[#167C80] uppercase tracking-wider block">
                      {proj.developer}
                    </span>

                    {/* Project Title */}
                    <h3 className="text-base font-extrabold text-[#14263D] mt-0.5 line-clamp-1 group-hover:text-[#167C80] transition-colors">
                      {proj.title}
                    </h3>

                    {/* Location detail */}
                    <p className="text-xs text-[#697386] mt-1 flex items-center gap-1 line-clamp-1">
                      <Compass className="w-3.5 h-3.5 text-[#D6B36A] shrink-0" />
                      <span>{proj.location}</span>
                    </p>

                    {/* Specifications grid */}
                    <div className="mt-3 pt-2.5 border-t border-[#E6E3DC] grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-[#697386] block font-medium">
                          Configuration
                        </span>
                        <span className="font-bold text-[#252525] block truncate">
                          {proj.config}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#697386] block font-medium">
                          Carpet Area
                        </span>
                        <span className="font-bold text-[#252525] block truncate">
                          {proj.carpetArea}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mt-2.5 pt-2 border-t border-[#E6E3DC] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#697386] block font-medium">
                          Price Point
                        </span>
                        <span className="text-sm font-extrabold text-[#14263D]">
                          {proj.price}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[#697386] block font-medium">
                          Possession
                        </span>
                        <span className="text-xs font-semibold text-emerald-700">
                          {proj.possession}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action CTAs */}
                  <div className="pt-2.5 border-t border-[#E6E3DC] grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenBrochure(proj)}
                      className="w-full py-2 px-2 rounded-xl bg-[#FAF8F2] hover:bg-gray-200 text-[#14263D] border border-[#E6E3DC] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#167C80]" />
                      <span>Brochure</span>
                    </button>

                    <button
                      onClick={() => handleOpenEnquiry(proj)}
                      className="w-full py-2 px-2 rounded-xl bg-[#14263D] hover:bg-[#167C80] text-[#D6B36A] hover:text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* 6. NUMBERED PAGINATION (Matching Reference Behavior) */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E6E3DC]">
            <span className="text-xs text-[#697386] font-medium">
              Showing page <strong className="text-[#14263D]">{currentPage}</strong> of{" "}
              <strong className="text-[#14263D]">{totalPages}</strong> ({filteredProjects.length} total projects)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl border border-[#E6E3DC] text-xs font-bold flex items-center gap-1 transition-colors ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-white text-[#14263D] hover:bg-[#FAF8F2] cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#14263D] text-[#D6B36A] shadow-md border border-[#14263D]"
                      : "bg-white text-[#697386] border border-[#E6E3DC] hover:bg-[#FAF8F2]"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl border border-[#E6E3DC] text-xs font-bold flex items-center gap-1 transition-colors ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-white text-[#14263D] hover:bg-[#FAF8F2] cursor-pointer"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </section>

      {/* 7. WHY SYNDICATE / BROKER VALUE PROPOSITION SECTION */}
      <section id="why-syndicate" className="py-16 bg-white border-t border-b border-[#E6E3DC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-[#167C80] tracking-widest uppercase bg-[#167C80]/10 px-3 py-1 rounded-full">
              The AuraLiving Syndicate Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14263D] mt-3">
              Why 25,000+ Brokers Rely on Syndicate
            </h2>
            <p className="text-xs sm:text-sm text-[#697386] mt-2">
              Transforming fragmented property brokerage into an institutional-grade, tech-powered powerhouse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#D6B36A] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#14263D] text-[#D6B36A] flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#14263D]">Guaranteed Spot Payouts</h4>
              <p className="text-xs text-[#697386] mt-2 leading-relaxed">
                Direct escrow disbursements on agreement execution. Real-time milestone tracking eliminates delayed developer receivables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#167C80] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#167C80] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#14263D]">Chauffeured Site Visits</h4>
              <p className="text-xs text-[#697386] mt-2 leading-relaxed">
                Complimentary luxury fleet transportation for your high-net-worth clients with trained relationship managers at site.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#D6B36A] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#14263D] text-[#D6B36A] flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#14263D]">Zero Documentation Hassle</h4>
              <p className="text-xs text-[#697386] mt-2 leading-relaxed">
                Our in-house legal and home loan desk handles draft review, stamp duty, e-registration, and mortgage sanctions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#E6E3DC] hover:border-[#167C80] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#167C80] text-white flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#14263D]">National Co-Broking</h4>
              <p className="text-xs text-[#697386] mt-2 leading-relaxed">
                Pair matching client requirements with certified channel partners across Mumbai, Bangalore, Pune, and Dubai.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. MARQUEE DEVELOPER ALLIANCES CAROUSEL */}
      <section className="py-12 bg-[#FAF8F2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-bold text-[#167C80] uppercase tracking-widest">
                Tier-1 Builder Network
              </span>
              <h3 className="text-lg font-black text-[#14263D]">Developers Partnered with Syndicate</h3>
            </div>
            <span className="text-xs text-[#697386] font-medium">
              100% RERA Certified Priority Mandates
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              "Godrej Properties",
              "Lodha Group",
              "Mahindra Lifespaces",
              "L&T Realty",
              "Puravankara",
              "DLF Limited"
            ].map((dev, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border border-[#E6E3DC] flex items-center justify-center text-center shadow-2xs hover:border-[#D6B36A] transition-colors"
              >
                <div className="space-y-1">
                  <Building2 className="w-5 h-5 text-[#167C80] mx-auto" />
                  <span className="text-xs font-bold text-[#14263D] block">{dev}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-14 bg-white border-t border-[#E6E3DC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold text-[#167C80] uppercase tracking-widest bg-[#167C80]/10 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl font-black text-[#14263D] mt-2">
              Syndicate Broker Partnership Q&A
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How does the Spot Brokerage Disbursement work?",
                a: "Once your client’s agreement for sale is executed and builder confirmation is logged in the Syndicate CRM, the agreed commission is transferred directly to your registered bank account without waiting for prolonged builder payment cycles."
              },
              {
                q: "What is required to register as an AuraLiving Syndicate Channel Partner?",
                a: "Brokers require a valid state RERA registration certificate, basic KYC (PAN and GST if applicable), and a bank cancel cheque for automated commission credits."
              },
              {
                q: "How do I request a chauffeured site visit for a client?",
                a: "You can book site visits directly via the Syndicate mobile app or through your dedicated Relationship Manager with 3 hours prior notice in Mumbai, Pune, and Bangalore."
              },
              {
                q: "Can I co-broke inventory in other cities like Dubai or Gurugram?",
                a: "Yes! Syndicate’s Cross-Border and Inter-City network lets you refer clients moving to other metropolitan hubs, earning your co-broking share while local ground teams manage physical site inspections."
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E6E3DC] bg-[#FAF8F2] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#14263D] cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#167C80] transition-transform duration-200 shrink-0 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-[#697386] leading-relaxed border-t border-[#E6E3DC]/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PRE-FOOTER CALL TO ACTION & CONTACT SECTION */}
      <section className="bg-gradient-to-r from-[#14263D] to-[#167C80] text-white py-14 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[11px] font-bold text-[#D6B36A] uppercase tracking-widest">
                Partner Desk 24/7 Helpline
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ready to Expand Your Brokerage Portfolio?
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 max-w-xl">
                Get on-boarded in less than 5 minutes. Speak with an AuraLiving Syndicate relationship manager today.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="tel:+918080190190"
                className="px-6 py-3.5 rounded-xl bg-white text-[#14263D] font-extrabold text-xs flex items-center justify-center gap-2.5 shadow-lg hover:bg-[#FAF8F2] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#167C80]" />
                <span>Call Toll Free: +91 8080 190190</span>
              </a>

              <button
                onClick={() => handleOpenEnquiry(null)}
                className="px-6 py-3.5 rounded-xl bg-[#D6B36A] hover:bg-[#c49f53] text-[#14263D] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <span>Request Broker Onboarding</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER (Matching Reference Structure with AuraLiving Design) */}
      <footer className="bg-white border-t border-[#E6E3DC] pt-10 pb-16 text-xs text-[#697386]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-[#E6E3DC] text-center md:text-left">
            {/* Toll Free Card */}
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E6E3DC]">
              <span className="text-[11px] text-[#697386] block font-medium">For Queries Call Toll Free</span>
              <a href="tel:+918080190190" className="text-base font-bold text-[#14263D] hover:text-[#167C80] transition-colors mt-0.5 block">
                +91 8080 190190
              </a>
            </div>

            {/* Mobile App Download Card */}
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E6E3DC]">
              <span className="text-[11px] text-[#697386] block font-medium text-center mb-2">Download Syndicate Mobile App</span>
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://apps.apple.com/in/app/syndicate-members/id1461759639"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#14263D] text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#167C80] transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.brokerapp.mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#14263D] text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#167C80] transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#167C80]" />
                  <span>Google Play</span>
                </a>
              </div>
            </div>

            {/* Platform Trust Card */}
            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#E6E3DC]">
              <span className="text-[11px] text-[#697386] block font-medium text-center md:text-left">Channel Partner Trust</span>
              <p className="text-[11px] text-[#252525] font-semibold mt-1">
                India's Most Trusted Platform for Real Estate Brokers
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>
              © 2026 AuraLiving Real Estate Technologies Pvt. Ltd. All Rights Reserved.
            </p>

            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-[#167C80] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-[#167C80] transition-colors">
                Terms & Conditions
              </Link>
              <span>•</span>
              <Link href="/disclaimer" className="hover:text-[#167C80] transition-colors">
                RERA Disclaimer
              </Link>
            </div>
          </div>

        </div>
      </footer>

      {/* 12. FLOATING DOWNLOAD QR CODE / APP WIDGET (Matching Reference) */}
      {showQrWidget && (
        <div className="fixed bottom-6 right-6 z-30 hidden md:flex flex-col items-center p-3 rounded-2xl bg-white border border-[#E6E3DC] shadow-2xl animate-fade-in max-w-[130px]">
          <button
            onClick={() => setShowQrWidget(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center text-[10px] cursor-pointer"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
          <span className="text-[10px] font-bold text-[#14263D] text-center leading-tight mb-2">
            Download<br />Syndicate App
          </span>
          <div className="w-20 h-20 bg-[#FAF8F2] p-1.5 rounded-lg border border-[#E6E3DC] flex items-center justify-center">
            <QrCode className="w-16 h-16 text-[#14263D]" />
          </div>
          <span className="text-[9px] text-[#697386] font-medium mt-1.5 text-center">
            Scan to Install
          </span>
        </div>
      )}

      {/* 13. FLOATING SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-30 w-11 h-11 rounded-full bg-[#14263D] hover:bg-[#167C80] text-[#D6B36A] hover:text-white flex items-center justify-center shadow-xl transition-all cursor-pointer"
          title="Scroll to Top"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </button>
      )}

      {/* MODAL 1: VIDEO MODAL */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <div className="p-4 bg-[#14263D] flex items-center justify-between border-b border-white/10">
              <span className="text-xs font-bold text-[#D6B36A] truncate max-w-md">
                {activeVideoTitle}
              </span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`${activeVideoUrl}?autoplay=1`}
                title={activeVideoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SHARE OPPORTUNITY MODAL */}
      {shareModalOpen && shareProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-[#E6E3DC] relative">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-bold text-[#167C80] uppercase tracking-wider">
              Share Mandate
            </span>
            <h3 className="text-lg font-bold text-[#14263D] mt-1">
              {shareProject.title}
            </h3>
            <p className="text-xs text-[#697386] mt-0.5">
              {shareProject.developer} • {shareProject.location}
            </p>

            <div className="mt-5 space-y-3">
              <button
                onClick={handleCopyShareLink}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F2] hover:bg-gray-100 border border-[#E6E3DC] text-xs font-bold text-[#14263D] flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="truncate mr-2">Copy Project Opportunity Link</span>
                {copiedLink ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
                    <Check className="w-4 h-4" /> Copied!
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-[#167C80]" />
                )}
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Check out this exclusive mandate on AuraLiving Syndicate: ${shareProject.title} (${shareProject.location}) - Starting ${shareProject.price}. Payout: ${shareProject.commission}. Details: https://www.auraliving.com/services/syndicate/projects`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366]/10 text-[#075e54] border border-[#25D366]/30 text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `https://www.auraliving.com/services/syndicate/projects`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/30 text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#0077b5]/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ENQUIRY / LEAD MODAL (Matching FormModal Reference) */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E6E3DC] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {enquirySubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-[#14263D]">
                  Application Received!
                </h3>
                <p className="text-xs text-[#697386] max-w-sm mx-auto leading-relaxed">
                  Thank you for registering interest with AuraLiving Syndicate. Our broker relationship director will connect with you within 30 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setEnquiryModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#14263D] text-[#D6B36A] text-xs font-bold hover:bg-[#167C80] hover:text-white transition-colors cursor-pointer"
                >
                  Close & Explore Opportunities
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-bold text-[#167C80] uppercase tracking-wider bg-[#167C80]/10 px-2.5 py-0.5 rounded">
                  {selectedProjectForEnquiry ? "Direct Project Mandate" : "Channel Partner Onboarding"}
                </span>

                <h3 className="text-xl font-black text-[#14263D] mt-2">
                  {selectedProjectForEnquiry
                    ? `Request Allocation: ${selectedProjectForEnquiry.title}`
                    : "Become a Verified Syndicate Partner"}
                </h3>
                <p className="text-xs text-[#697386] mt-1 mb-5">
                  Instant access to spot broker payouts, client transportation, and marketing collateral.
                </p>

                <form onSubmit={handleSubmitEnquiry} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#252525] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E3DC] focus:border-[#167C80] text-xs text-[#252525] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#252525] uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E3DC] focus:border-[#167C80] text-xs text-[#252525] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#252525] uppercase tracking-wider mb-1">
                        Operating City
                      </label>
                      <select
                        value={enquiryForm.city}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E3DC] focus:border-[#167C80] text-xs text-[#252525] outline-none bg-white"
                      >
                        <option value="Mumbai">Mumbai MMR</option>
                        <option value="Pune">Pune</option>
                        <option value="Bangalore">Bengaluru</option>
                        <option value="Gurugram">Gurugram / Delhi NCR</option>
                        <option value="Hyderabad">Hyderabad</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#252525] uppercase tracking-wider mb-1">
                      Brokerage Firm / Agency Name
                    </label>
                    <input
                      type="text"
                      value={enquiryForm.agency}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, agency: e.target.value })}
                      placeholder="e.g. Apex Realty Advisors"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E3DC] focus:border-[#167C80] text-xs text-[#252525] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#252525] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      placeholder="partner@firm.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E3DC] focus:border-[#167C80] text-xs text-[#252525] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingEnquiry}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#14263D] to-[#167C80] hover:opacity-95 text-[#D6B36A] font-extrabold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    {isSubmittingEnquiry ? (
                      <span>Verifying Credentials...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
                        <span>Submit Allocation Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: BROCHURE DOWNLOAD MODAL */}
      {brochureModalOpen && brochureProject && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E6E3DC] relative">
            <button
              onClick={() => setBrochureModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {brochureDownloaded ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Download className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#14263D]">Brochure Ready!</h3>
                <p className="text-xs text-[#697386]">
                  A high-resolution presentation kit for <strong>{brochureProject.title}</strong> has been prepared.
                </p>
                <button
                  type="button"
                  onClick={() => setBrochureModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-[#14263D] text-[#D6B36A] text-xs font-bold hover:bg-[#167C80] hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-bold text-[#167C80] uppercase tracking-wider">
                  Developer Project Kit
                </span>
                <h3 className="text-lg font-bold text-[#14263D] mt-1">
                  Download {brochureProject.title} Kit
                </h3>
                <p className="text-xs text-[#697386] mt-0.5 mb-4">
                  Includes floor plans, payment schedules, and spot payout mandate agreements.
                </p>

                <form onSubmit={handleSubmitBrochure} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={brochureForm.name}
                      onChange={(e) => setBrochureForm({ ...brochureForm, name: e.target.value })}
                      placeholder="Your name..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E3DC] focus:border-[#167C80] outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={brochureForm.phone}
                      onChange={(e) => setBrochureForm({ ...brochureForm, phone: e.target.value })}
                      placeholder="10-digit phone number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E3DC] focus:border-[#167C80] outline-none text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#14263D] hover:bg-[#167C80] text-[#D6B36A] hover:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Project PDF Kit</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
