"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Calendar,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Calculator,
  Download,
  Heart,
  Layers,
  Train,
  Plane,
  Building,
  GraduationCap,
  Activity,
  Waves,
  Zap,
  Trophy,
  Smile,
  ExternalLink,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  User,
  Home,
  Star,
  Car,
  Trees,
  Dumbbell,
  PlayCircle,
  Wifi,
  Utensils,
  Shield,
  Clock,
  IndianRupee,
  Info,
  Maximize2,
  SquareStack,
  Compass,
  TrendingUp,
  Check,
  ShoppingBag,
  Navigation,
  Eye,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import WishlistButton from "@/components/common/WishlistButton";
import { useWishlist } from "@/context/WishlistContext";

import {
  getProjectBySlug,
  getProjectSlug,
  CANONICAL_PROJECTS,
} from "@/data/projectsData";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getAmenityIcon(iconName) {
  const map = {
    Waves: Waves,
    Building2: Building2,
    Sparkles: Sparkles,
    Activity: Activity,
    Zap: Zap,
    Trophy: Trophy,
    Smile: Smile,
    ShieldCheck: ShieldCheck,
    Trees: Trees,
    Dumbbell: Dumbbell,
    Wifi: Wifi,
    Utensils: Utensils,
    PlayCircle: PlayCircle,
    Car: Car,
  };
  const Icon = map[iconName] || Sparkles;
  return <Icon className="w-5 h-5" />;
}

// ─────────────────────────────────────────────
// Gallery Lightbox Modal
// ─────────────────────────────────────────────
function GalleryLightbox({ images, startIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      if (e.key === "ArrowRight")
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  const captions = [
    "Exterior Elevation & Grand Architectural Facade",
    "Panoramic Horizon Views & Landscaped Enclave along Palm Beach Road",
    "Opulent Designer Interior & Double-Height Living Room",
    "Luxury Master Suite with Scenic Balcony Vistas",
  ];
  const currentCaption = captions[currentIndex % captions.length];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-between p-4 sm:p-6 backdrop-blur-md">
      {/* Top Bar with Counter and Close Button (non-overlapping) */}
      <div className="w-full flex items-center justify-between px-2 sm:px-6 z-20">
        <div className="bg-black/60 border border-white/20 text-white text-xs font-mono px-3.5 py-1.5 rounded-full shadow-lg">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image with Nav Arrows */}
      <div className="relative flex-1 flex items-center justify-center w-full px-4 sm:px-16 my-auto max-h-[70vh]">
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-h-[68vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
        />

        {/* Nav Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
              }
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-xl"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % images.length)
              }
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20 shadow-xl"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Photo Caption & Description Container */}
      <div className="w-full max-w-2xl text-center px-4 py-2 z-10">
        <p className="text-xs sm:text-sm text-gray-200 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl inline-block leading-relaxed break-words shadow-lg border border-white/10 max-w-full">
          {currentCaption}
        </p>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-2 px-4 pb-2 overflow-x-auto no-scrollbar max-w-full z-10">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${currentIndex === i
                ? "border-[#D29324] opacity-100 scale-105 shadow-md"
                : "border-transparent opacity-50 hover:opacity-80"
              }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Enquiry Modal (unified for all CTA types)
// ─────────────────────────────────────────────
function EnquiryModal({ isOpen, onClose, project, mode = "enquire" }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: "", phone: "", email: "", date: "", message: "" });
      setErrors({});
      setSubmitting(false);
      setSubmitted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modeConfig = {
    enquire: {
      title: "Enquire Now",
      subtitle: "Get instant pricing & availability",
      cta: "Send Enquiry",
      showDate: false,
      showMessage: true,
    },
    callback: {
      title: "Request a Callback",
      subtitle: "Speak with a verified property advisor within 15 minutes",
      cta: "Request Callback Now",
      showDate: false,
      showMessage: false,
    },
    brochure: {
      title: "Download Official Brochure",
      subtitle: "Get floor plans, price sheet, and project deck delivered instantly",
      cta: "Download Brochure PDF",
      showDate: false,
      showMessage: false,
    },
    visit: {
      title: "Schedule a Site Visit",
      subtitle: "Complimentary guided tour & pick-up assistance",
      cta: "Confirm Visit Schedule",
      showDate: true,
      showMessage: true,
    },
  };

  const cfg = modeConfig[mode] || modeConfig.enquire;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your full name";
    if (!form.phone.trim()) {
      errs.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) {
      errs.phone = "Please enter a valid 10-digit Indian mobile number";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (cfg.showDate && !form.date) {
      errs.date = "Please select a preferred visit date";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${errors[field]
      ? "border-red-400 bg-red-50 focus:border-red-500"
      : "border-[#E8E3DA] bg-white focus:border-[#D29324]"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E8E3DA] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-[#FBF1DF] to-white border-b border-[#E8E3DA]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#AE7419] uppercase tracking-wider block">
                {project.builder}
              </span>
              <h3 className="text-xl font-black text-[#252525] mt-0.5">
                {cfg.title}
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">{cfg.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#E8E3DA] flex items-center justify-center text-[#6B7280] hover:text-[#252525] hover:bg-[#FAF8F4] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-[#252525]">Request Confirmed!</h4>
            <p className="text-xs text-[#6B7280] max-w-xs mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#252525]">{form.name}</span>. An authorized advisor for {project.title} will contact you shortly at +91 {form.phone}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#252525] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-[#6B7280]" />
                <input
                  type="text"
                  className={`${inputClass("name")} pl-9`}
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#252525] mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E8E3DA] bg-[#FAF8F4] text-[#6B7280] text-sm font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  className={`flex-1 px-3.5 py-2.5 rounded-r-xl border text-sm outline-none transition-all ${errors.phone
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-[#E8E3DA] bg-white focus:border-[#D29324]"
                    }`}
                  placeholder="98765 43210"
                  value={form.phone}
                  maxLength={10}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, phone: val });
                    if (errors.phone) setErrors({ ...errors, phone: "" });
                  }}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#252525] mb-1">
                Email Address <span className="text-[#6B7280] font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#6B7280]" />
                <input
                  type="email"
                  className={`${inputClass("email")} pl-9`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>
              )}
            </div>

            {/* Date (for visit) */}
            {cfg.showDate && (
              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Preferred Visit Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-3 text-[#6B7280]" />
                  <input
                    type="date"
                    className={`${inputClass("date")} pl-9`}
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => {
                      setForm({ ...form, date: e.target.value });
                      if (errors.date) setErrors({ ...errors, date: "" });
                    }}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-[11px] mt-1">{errors.date}</p>
                )}
              </div>
            )}

            {/* Message */}
            {cfg.showMessage && (
              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Message <span className="text-[#6B7280] font-normal">(optional)</span>
                </label>
                <textarea
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3DA] text-sm outline-none focus:border-[#D29324] resize-none"
                  rows={2}
                  placeholder="Any specific questions or preferred time..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-sm transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting…</span>
                </>
              ) : (
                cfg.cta
              )}
            </button>

            <p className="text-[10px] text-[#6B7280] text-center">
              <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-[#D29324]" />
              100% privacy protected · Zero brokerage · Verified advisory
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 1. Sticky "Interested? Enquire Now" Card
// ─────────────────────────────────────────────
function StickyEnquiryCard({ project, onScheduleVisit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [allowOtherSellers, setAllowOtherSellers] = useState(true);
  const [getWhatsappUpdates, setGetWhatsappUpdates] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      errs.phone = "Enter 10-digit mobile number";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Invalid email format";
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5 shadow-lg space-y-4">
      {/* Card Header: Developer Logo & Project Name */}
      <div className="flex items-center gap-3 pb-3 border-b border-[#E8E3DA]">
        <div className="w-12 h-12 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] p-1 flex items-center justify-center shrink-0 overflow-hidden">
          {project.developerInfo?.logo ? (
            <img
              src={project.developerInfo.logo}
              alt={project.builder}
              className="w-full h-full object-contain"
            />
          ) : (
            <Building2 className="w-6 h-6 text-[#D29324]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-extrabold text-[#252525] truncate leading-tight">
            {project.title} - {project.builder}
          </h4>
          <span className="text-[11px] text-[#6B7280] font-medium block">
            Developer
          </span>
        </div>
      </div>

      <div className="text-xs font-bold text-[#252525]">
        Interested? Enquire Now
      </div>

      {submitted ? (
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <div className="text-xs font-bold text-emerald-800">
            Thank you, {name}!
          </div>
          <p className="text-[11px] text-emerald-700 leading-snug">
            Your enquiry has been received. Our team will contact you at +91 {phone} with full pricing details.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${errors.name
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-[#E8E3DA] bg-white focus:border-[#D29324]"
                  }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <div className="flex">
              <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-[#E8E3DA] bg-[#FAF8F4] text-[#6B7280] text-xs font-semibold">
                +91
              </span>
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ""));
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                className={`flex-1 px-3 py-2.5 rounded-r-xl border text-xs outline-none transition-all ${errors.phone
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-[#E8E3DA] bg-white focus:border-[#D29324]"
                  }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-all ${errors.email
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-[#E8E3DA] bg-white focus:border-[#D29324]"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-2 pt-1 text-[11px] text-[#252525]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allowOtherSellers}
                onChange={(e) => setAllowOtherSellers(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#D29324] accent-[#D29324] cursor-pointer"
              />
              <span>Allow other sellers to Contact</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={getWhatsappUpdates}
                onChange={(e) => setGetWhatsappUpdates(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#D29324] accent-[#D29324] cursor-pointer"
              />
              <span>Get WhatsApp Updates</span>
            </label>
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            {loading ? "Submitting..." : "Enquire Now"}
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={onScheduleVisit}
            className="w-full py-2.5 rounded-xl border border-[#EA580C] text-[#EA580C] hover:bg-[#EA580C]/5 bg-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Schedule a Visit
          </button>

          {/* Disclaimer text */}
          <p className="text-[10px] text-[#6B7280] leading-tight pt-1">
            I authorize PROPERTYPISTOL / AuraLiving and its representatives to Call, SMS, RCS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
          </p>
        </form>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. Price Insights of Locality Chart Component
// ─────────────────────────────────────────────
function PriceInsightsChart({ project }) {
  const [range, setRange] = useState("3Y");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const locality = project?.location ? project.location.split(",")[0].trim() : "Local Area";
  const citySlug = project?.city || "mumbai";
  const cityName = project?.cityName || (citySlug.charAt(0).toUpperCase() + citySlug.slice(1));
  const fullLocation = project?.location || `${locality}, ${cityName}`;
  const baseAvgPrice = project?.priceNumeric ? Math.round(project.priceNumeric / 950) : 33480;

  // Nearby localities tailored to the city/locality
  const nearbyLocalities = useMemo(() => {
    const locLower = (locality || "").toLowerCase();
    const cityLower = (citySlug || "").toLowerCase();
    if (cityLower === "thane") {
      return [
        { name: "Kolshet", avg: "₹24.5 K" },
        { name: "Majiwada", avg: "₹26.2 K" },
        { name: "Ghodbunder", avg: "₹18.9 K" },
        { name: "Naupada", avg: "₹31.0 K" },
        { name: "Panchpakhadi", avg: "₹32.5 K" },
      ];
    }
    if (locLower.includes("sanpada") || locLower.includes("vashi") || locLower.includes("nerul") || locLower.includes("navi mumbai")) {
      return [
        { name: "Vashi", avg: "₹29.2 K" },
        { name: "Nerul", avg: "₹26.8 K" },
        { name: "Seawoods", avg: "₹31.5 K" },
        { name: "Kharghar", avg: "₹18.5 K" },
        { name: "Palm Beach Rd", avg: "₹38.0 K" },
      ];
    }
    if (cityLower === "pune") {
      return [
        { name: "Kharadi", avg: "₹11.2 K" },
        { name: "Baner", avg: "₹12.5 K" },
        { name: "Hinjewadi", avg: "₹8.8 K" },
        { name: "Koregaon Park", avg: "₹19.5 K" },
        { name: "Viman Nagar", avg: "₹13.2 K" },
      ];
    }
    if (cityLower === "bangalore") {
      return [
        { name: "Whitefield", avg: "₹10.5 K" },
        { name: "Indiranagar", avg: "₹18.2 K" },
        { name: "Sarjapur", avg: "₹9.8 K" },
        { name: "Koramangala", avg: "₹17.0 K" },
        { name: "Bellandur", avg: "₹11.0 K" },
      ];
    }
    // Default Mumbai Island / Suburban
    return [
      { name: "Bandra West", avg: "₹65.0 K" },
      { name: "Worli", avg: "₹62.0 K" },
      { name: "Lower Parel", avg: "₹52.0 K" },
      { name: "Powai", avg: "₹28.5 K" },
      { name: "Andheri West", avg: "₹32.0 K" },
    ];
  }, [locality, citySlug]);

  // Dynamic time-range trend data calibrated to project's base price
  const trendData = useMemo(() => {
    const p = baseAvgPrice;
    return {
      "3Y": {
        periodLabel: "3 Years",
        changeText: "+26.3% Change in last 3 years",
        points: [
          { date: "Apr 23", price: Math.round(p * 0.79), display: `₹${(p * 0.79 / 1000).toFixed(1)} K` },
          { date: "Oct 23", price: Math.round(p * 0.83), display: `₹${(p * 0.83 / 1000).toFixed(1)} K` },
          { date: "Apr 24", price: Math.round(p * 0.88), display: `₹${(p * 0.88 / 1000).toFixed(1)} K` },
          { date: "Oct 24", price: Math.round(p * 0.93), display: `₹${(p * 0.93 / 1000).toFixed(1)} K` },
          { date: "Apr 25", price: Math.round(p * 0.96), display: `₹${(p * 0.96 / 1000).toFixed(1)} K` },
          { date: "Oct 25", price: Math.round(p * 0.99), display: `₹${(p * 0.99 / 1000).toFixed(1)} K` },
          { date: "Oct 26", price: p, display: `₹${(p / 1000).toFixed(2)} K` },
        ],
      },
      "4Y": {
        periodLabel: "4 Years",
        changeText: "+44.9% Change in last 4 years",
        points: [
          { date: "Apr 22", price: Math.round(p * 0.69), display: `₹${(p * 0.69 / 1000).toFixed(1)} K` },
          { date: "Oct 22", price: Math.round(p * 0.74), display: `₹${(p * 0.74 / 1000).toFixed(1)} K` },
          { date: "Apr 23", price: Math.round(p * 0.79), display: `₹${(p * 0.79 / 1000).toFixed(1)} K` },
          { date: "Oct 23", price: Math.round(p * 0.83), display: `₹${(p * 0.83 / 1000).toFixed(1)} K` },
          { date: "Apr 24", price: Math.round(p * 0.88), display: `₹${(p * 0.88 / 1000).toFixed(1)} K` },
          { date: "Oct 24", price: Math.round(p * 0.93), display: `₹${(p * 0.93 / 1000).toFixed(1)} K` },
          { date: "Apr 25", price: Math.round(p * 0.96), display: `₹${(p * 0.96 / 1000).toFixed(1)} K` },
          { date: "Oct 25", price: Math.round(p * 0.99), display: `₹${(p * 0.99 / 1000).toFixed(1)} K` },
          { date: "Oct 26", price: p, display: `₹${(p / 1000).toFixed(2)} K` },
        ],
      },
      "6Y": {
        periodLabel: "6 Years",
        changeText: "+81.9% Change in last 6 years",
        points: [
          { date: "Oct 20", price: Math.round(p * 0.55), display: `₹${(p * 0.55 / 1000).toFixed(1)} K` },
          { date: "Oct 21", price: Math.round(p * 0.64), display: `₹${(p * 0.64 / 1000).toFixed(1)} K` },
          { date: "Apr 22", price: Math.round(p * 0.69), display: `₹${(p * 0.69 / 1000).toFixed(1)} K` },
          { date: "Apr 23", price: Math.round(p * 0.79), display: `₹${(p * 0.79 / 1000).toFixed(1)} K` },
          { date: "Oct 23", price: Math.round(p * 0.83), display: `₹${(p * 0.83 / 1000).toFixed(1)} K` },
          { date: "Apr 24", price: Math.round(p * 0.88), display: `₹${(p * 0.88 / 1000).toFixed(1)} K` },
          { date: "Oct 24", price: Math.round(p * 0.93), display: `₹${(p * 0.93 / 1000).toFixed(1)} K` },
          { date: "Oct 25", price: Math.round(p * 0.99), display: `₹${(p * 0.99 / 1000).toFixed(1)} K` },
          { date: "Oct 26", price: p, display: `₹${(p / 1000).toFixed(2)} K` },
        ],
      },
    };
  }, [baseAvgPrice]);

  // Comparison series for selected nearby localities (Blue #2563EB)
  const comparisonDatasets = useMemo(() => {
    const ds = {};
    nearbyLocalities.forEach((item) => {
      const parsed = parseFloat(item.avg.replace(/[^\d.]/g, "")) * 1000 || 28000;
      ds[item.name] = {
        "3Y": [
          Math.round(parsed * 0.80),
          Math.round(parsed * 0.84),
          Math.round(parsed * 0.88),
          Math.round(parsed * 0.93),
          Math.round(parsed * 0.96),
          Math.round(parsed * 0.99),
          parsed,
        ],
        "4Y": [
          Math.round(parsed * 0.70),
          Math.round(parsed * 0.75),
          Math.round(parsed * 0.80),
          Math.round(parsed * 0.84),
          Math.round(parsed * 0.88),
          Math.round(parsed * 0.93),
          Math.round(parsed * 0.96),
          Math.round(parsed * 0.99),
          parsed,
        ],
        "6Y": [
          Math.round(parsed * 0.58),
          Math.round(parsed * 0.65),
          Math.round(parsed * 0.70),
          Math.round(parsed * 0.80),
          Math.round(parsed * 0.84),
          Math.round(parsed * 0.88),
          Math.round(parsed * 0.93),
          Math.round(parsed * 0.99),
          parsed,
        ],
      };
    });
    return ds;
  }, [nearbyLocalities]);

  const currentTrend = trendData[range] || trendData["3Y"];
  const points = currentTrend.points;

  // Comparison points
  const compRaw = selectedLocality && comparisonDatasets[selectedLocality]?.[range];
  const compPoints = useMemo(() => {
    if (!compRaw) return null;
    return compRaw.map((price, i) => ({
      date: points[i]?.date || "",
      price: price,
      display: `₹${(price / 1000).toFixed(1)} K`,
    }));
  }, [compRaw, points]);

  // Chart dimensions
  const width = 640;
  const height = 230;
  const padLeft = 48;
  const padRight = 24;
  const padTop = 26;
  const padBottom = 34;

  // Dynamic Y-axis scale based on both series
  const allPrices = useMemo(() => {
    const list = points.map((p) => p.price);
    if (compPoints) {
      compPoints.forEach((p) => list.push(p.price));
    }
    return list;
  }, [points, compPoints]);

  const minPrice = useMemo(() => {
    const min = Math.min(...allPrices);
    return Math.floor(min / 4000) * 4000 - 2000;
  }, [allPrices]);

  const maxPrice = useMemo(() => {
    const max = Math.max(...allPrices);
    return Math.ceil(max / 4000) * 4000 + 2000;
  }, [allPrices]);

  const getX = (idx) => {
    return padLeft + (idx / (points.length - 1)) * (width - padLeft - padRight);
  };

  const getY = (price) => {
    const ratio = (price - minPrice) / (maxPrice - minPrice);
    return height - padBottom - ratio * (height - padTop - padBottom);
  };

  // Build SVG path for Locality
  const pathD = useMemo(() => {
    if (!points.length) return "";
    let d = `M ${getX(0)} ${getY(points[0].price)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const x0 = getX(i);
      const y0 = getY(points[i].price);
      const x1 = getX(i + 1);
      const y1 = getY(points[i + 1].price);
      const mx = (x0 + x1) / 2;
      d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  }, [points, minPrice, maxPrice]);

  // Area path for Locality
  const areaD = useMemo(() => {
    if (!points.length) return "";
    const lastX = getX(points.length - 1);
    const firstX = getX(0);
    const bottomY = height - padBottom;
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [pathD, points]);

  // Build SVG path for Comparison Locality
  const compPathD = useMemo(() => {
    if (!compPoints || !compPoints.length) return "";
    let d = `M ${getX(0)} ${getY(compPoints[0].price)}`;
    for (let i = 0; i < compPoints.length - 1; i++) {
      const x0 = getX(i);
      const y0 = getY(compPoints[i].price);
      const x1 = getX(i + 1);
      const y1 = getY(compPoints[i + 1].price);
      const mx = (x0 + x1) / 2;
      d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
    }
    return d;
  }, [compPoints, minPrice, maxPrice]);

  // Y-axis grid ticks (4-5 steps)
  const yTicks = useMemo(() => {
    const step = (maxPrice - minPrice) / 4;
    return [
      minPrice + step * 0.5,
      minPrice + step * 1.5,
      minPrice + step * 2.5,
      minPrice + step * 3.5,
    ].map((v) => Math.round(v / 1000) * 1000);
  }, [minPrice, maxPrice]);

  return (
    <div className="rounded-2xl border border-[#E8E3DA] bg-white p-5 sm:p-6 space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-black text-[#252525]">
              Price Insights of {locality}
            </h3>
            {selectedLocality && (
              <span className="text-xs font-bold text-[#2563EB]">
                vs {selectedLocality}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {currentTrend.changeText}
            </span>
          </div>
        </div>

        {/* Time Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F4] border border-[#E8E3DA] rounded-xl self-start">
          {["3Y", "4Y", "6Y"].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                setRange(btn);
                setHoveredIndex(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                range === btn
                  ? "bg-[#D29324] text-white shadow-sm"
                  : "text-[#6B7280] hover:text-[#252525]"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Legend (identifying both locations) */}
      <div className="flex items-center gap-4 text-xs font-semibold pt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#D29324]" />
          <span className="text-[#252525]">{locality} (Current)</span>
        </div>

        {selectedLocality && (
          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
            <span className="w-3 h-3 rounded-full bg-[#2563EB]" />
            <span className="text-[#2563EB] font-bold">{selectedLocality}</span>
            <button
              onClick={() => setSelectedLocality(null)}
              className="ml-1 text-gray-400 hover:text-red-500 font-bold cursor-pointer"
              title="Remove comparison"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="chartGoldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D29324" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#D29324" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines & Y-axis labels */}
          {yTicks.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#E8E3DA"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#6B7280"
                  fontFamily="sans-serif"
                >
                  {(val / 1000).toFixed(0)} K
                </text>
              </g>
            );
          })}

          {/* Locality Area fill */}
          <path d={areaD} fill="url(#chartGoldGrad)" />

          {/* Locality Line curve (Gold) */}
          <path
            d={pathD}
            fill="none"
            stroke="#D29324"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Comparison Line curve (Blue) */}
          {compPathD && (
            <path
              d={compPathD}
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Locality Data Points */}
          {points.map((pt, i) => {
            const cx = getX(i);
            const cy = getY(pt.price);
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={`loc-pt-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke="#D29324"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all duration-200"
                />
                {/* Transparent hit area */}
                <circle cx={cx} cy={cy} r="14" fill="transparent" />
              </g>
            );
          })}

          {/* Comparison Data Points */}
          {compPoints &&
            compPoints.map((pt, i) => {
              const cx = getX(i);
              const cy = getY(pt.price);
              const isHovered = hoveredIndex === i;
              return (
                <g
                  key={`comp-${i}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 6 : 4}
                    fill="#ffffff"
                    stroke="#2563EB"
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-all duration-200"
                  />
                  <circle cx={cx} cy={cy} r="14" fill="transparent" />
                </g>
              );
            })}

          {/* X-axis labels */}
          {points.map((pt, i) => {
            const x = getX(i);
            return (
              <text
                key={i}
                x={x}
                y={height - 12}
                textAnchor="middle"
                fontSize="9"
                fill="#6B7280"
                fontFamily="sans-serif"
              >
                {pt.date}
              </text>
            );
          })}
        </svg>

        {/* Hover Tooltip (shows comparison when selected) */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div
            className="absolute pointer-events-none bg-[#252525] text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-2xl -translate-x-1/2 -translate-y-full z-20 space-y-1"
            style={{
              left: `${(getX(hoveredIndex) / width) * 100}%`,
              top: `${(getY(points[hoveredIndex].price) / height) * 100 - 10}%`,
            }}
          >
            <div className="text-[9px] text-gray-300 font-mono">
              {points[hoveredIndex].date}
            </div>
            <div className="flex items-center gap-1.5 text-[#D29324]">
              <span className="w-2 h-2 rounded-full bg-[#D29324]" />
              <span>{locality}: {points[hoveredIndex].display}/sq.ft</span>
            </div>
            {compPoints && compPoints[hoveredIndex] && (
              <div className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>
                  {selectedLocality}: {compPoints[hoveredIndex].display}/sq.ft
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Locality Tags & Functional "More +" Button */}
      <div className="pt-2 border-t border-[#E8E3DA] space-y-3 text-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#FAF8F4] border border-[#D29324] text-[#AE7419] font-bold text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D29324]" />
              {locality}
            </span>

            {/* Functional "More +" toggle button */}
            <button
              type="button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={`px-3 py-1 rounded-full border text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isMoreOpen
                  ? "bg-[#D29324] text-white border-[#D29324]"
                  : "bg-[#FAF8F4] text-[#6B7280] hover:text-[#252525] border-[#E8E3DA] hover:border-[#D29324]"
              }`}
            >
              <span>{isMoreOpen ? "Show Less ▲" : "More +"}</span>
            </button>
          </div>

          <Link
            href={`/${citySlug}`}
            className="text-[#D29324] hover:text-[#AE7419] font-bold text-xs inline-flex items-center gap-1 hover:underline"
          >
            See price trends in {cityName} →
          </Link>
        </div>

        {/* Revealed comparison localities panel when "More +" is clicked */}
        {isMoreOpen && (
          <div className="p-3 bg-[#FAF8F4] rounded-xl border border-[#E8E3DA] space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
              Compare {locality} with nearby {cityName} localities:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {nearbyLocalities.map((loc) => {
                const isSelected = selectedLocality === loc.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() =>
                      setSelectedLocality(isSelected ? null : loc.name)
                    }
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#2563EB] text-white border-[#2563EB] shadow-sm"
                        : "bg-white text-[#252525] border-[#E8E3DA] hover:border-[#2563EB] hover:text-[#2563EB]"
                    }`}
                  >
                    <span>{loc.name}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? "text-blue-100" : "text-[#6B7280]"
                      }`}
                    >
                      ({loc.avg}/sq.ft)
                    </span>
                    {isSelected && <span className="font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <p className="text-[10px] text-[#6B7280] leading-relaxed">
        * Price trends based on historical registry and market averages for {fullLocation} (Illustrative Market Insights). Baseline reflects verified luxury project averages.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. Configurations with 2D / 3D Image Tabs
// ─────────────────────────────────────────────
function ConfigurationsSection({ project, onOpenEnquiry, onScheduleVisit }) {
  const [activeBhkIndex, setActiveBhkIndex] = useState(0);
  const [viewMode, setViewMode] = useState("2D"); // '2D' or '3D'
  const [lightboxUrl, setLightboxUrl] = useState(null);

  const floorPlans = project.floorPlans || [];
  const currentPlan = floorPlans[activeBhkIndex] || floorPlans[0];

  // Verified 2D blueprint vs 3D interior visualization images
  const viewImages = useMemo(() => {
    return {
      "2D": {
        0: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        1: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      },
      "3D": {
        0: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      },
    };
  }, []);

  const displayedImage =
    viewImages[viewMode]?.[activeBhkIndex] ||
    currentPlan?.layoutImage ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  return (
    <section
      id="configurations"
      className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E3DA] shadow-sm space-y-5"
    >
      {/* Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#252525]">
          Configurations
        </h2>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 rounded-md border border-[#D29324] text-[#D29324] font-bold text-xs bg-amber-50/50">
            Unit Plans
          </span>
        </div>
      </div>

      {/* BHK Selectors */}
      <div className="flex items-center gap-2 border-b border-[#E8E3DA] pb-2">
        {floorPlans.map((fp, idx) => (
          <button
            key={idx}
            onClick={() => setActiveBhkIndex(idx)}
            className={`px-4 py-2 text-xs font-bold transition-all cursor-pointer border-b-2 -mb-2.5 ${activeBhkIndex === idx
                ? "text-[#D29324] border-[#D29324]"
                : "text-[#6B7280] border-transparent hover:text-[#252525]"
              }`}
          >
            {fp.bhk || fp.type}
          </button>
        ))}
      </div>

      {/* 2D / 3D View Switcher & Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Image with 2D / 3D Switcher */}
        <div className="md:col-span-7 space-y-3">
          {/* Switcher Pill Tabs */}
          <div className="flex items-center justify-between">
            <div className="inline-flex p-1 bg-[#FAF8F4] border border-[#E8E3DA] rounded-xl">
              <button
                onClick={() => setViewMode("2D")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${viewMode === "2D"
                    ? "bg-[#D29324] text-white shadow-sm"
                    : "text-[#6B7280] hover:text-[#252525]"
                  }`}
              >
                <SquareStack className="w-3.5 h-3.5" />
                2D Floor Plan
              </button>
              <button
                onClick={() => setViewMode("3D")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${viewMode === "3D"
                    ? "bg-[#D29324] text-white shadow-sm"
                    : "text-[#6B7280] hover:text-[#252525]"
                  }`}
              >
                <Eye className="w-3.5 h-3.5" />
                3D View
              </button>
            </div>

            <button
              onClick={() => setLightboxUrl(displayedImage)}
              className="text-xs font-bold text-[#AE7419] hover:text-[#D29324] flex items-center gap-1 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
          </div>

          {/* Interactive Image Frame */}
          <div
            onClick={() => setLightboxUrl(displayedImage)}
            className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#FAF8F4] border border-[#E8E3DA] group cursor-pointer shadow-inner"
          >
            <img
              src={displayedImage}
              alt={`${currentPlan?.type || "Floor Plan"} ${viewMode}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* View Mode Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-bold backdrop-blur-sm flex items-center gap-1">
              <span>
                {viewMode === "2D"
                  ? "2D Architectural Floor Plan"
                  : "3D Isometric Interior View"}
              </span>
            </div>
            {/* Area Badge */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#D29324] text-white text-[11px] font-extrabold shadow-md">
              {currentPlan?.carpetArea}
            </div>
          </div>

          <p className="text-[10px] text-[#6B7280] italic">
            * Sample 2D & 3D visualizations for {project.title}. Official architectural CAD drawings and unit allocation plans provided upon enquiry.
          </p>
        </div>

        {/* Right: Plan Specifications */}
        <div className="md:col-span-5 space-y-4">
          <div>
            <span className="text-[10px] font-bold text-[#AE7419] uppercase tracking-wider block">
              Configuration Details
            </span>
            <h3 className="text-xl font-black text-[#252525] mt-0.5">
              {currentPlan?.type}
            </h3>
            <div className="text-2xl font-black text-[#D29324] mt-1">
              {currentPlan?.price}
            </div>
          </div>

          {currentPlan?.description && (
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {currentPlan.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: "Carpet Area", value: currentPlan?.carpetArea },
              { label: "Super Area", value: currentPlan?.superArea },
              { label: "Facing", value: currentPlan?.facing },
              {
                label: "Parking",
                value: currentPlan?.specs?.parking || "1 Covered",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-2.5 bg-[#FAF8F4] rounded-xl border border-[#E8E3DA]"
              >
                <span className="text-[10px] text-[#6B7280] block font-medium">
                  {label}
                </span>
                <span className="font-bold text-[#252525] text-xs mt-0.5 block truncate">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onOpenEnquiry}
              className="flex-1 py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Request Quote
            </button>
            <button
              onClick={onScheduleVisit}
              className="flex-1 py-2.5 rounded-xl border border-[#D29324] bg-amber-50/50 hover:bg-amber-100/50 text-[#AE7419] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D29324]" />
              Schedule Visit
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxUrl && (
        <div className="fixed inset-0 z-[110] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxUrl(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center cursor-pointer hover:bg-white/30"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxUrl}
            alt="Preview"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// 2. Functional Location Map with Category Filters
// ─────────────────────────────────────────────
function LocationMapSection({ project }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  // Category filter definitions matching user requirements
  const categories = [
    "All",
    "Hospitals",
    "Schools",
    "Parks",
    "Shopping Centers",
    "Transport",
  ];

  // Dynamic places derived from project landmarks or nearby facilities
  const places = useMemo(() => {
    if (project?.landmarks && Array.isArray(project.landmarks) && project.landmarks.length > 0) {
      return project.landmarks.map((lm, idx) => {
        let category = "Transport";
        const type = (lm.type || "").toLowerCase();
        const name = (lm.name || "").toLowerCase();
        if (type.includes("health") || type.includes("hospital") || name.includes("hospital")) category = "Hospitals";
        else if (type.includes("school") || type.includes("education") || name.includes("school") || name.includes("college") || name.includes("institute")) category = "Schools";
        else if (type.includes("park") || type.includes("garden") || name.includes("park") || name.includes("waterfront")) category = "Parks";
        else if (type.includes("mall") || type.includes("retail") || type.includes("market") || name.includes("mall") || name.includes("market")) category = "Shopping Centers";
        else category = "Transport";

        return {
          id: `lm-${idx}`,
          category,
          name: lm.name,
          distance: lm.distance || "1.0 km",
          time: lm.time || "5 mins",
          type: lm.type || "Nearby Landmark",
        };
      });
    }

    // Default verified landmarks fallback
    return [
      {
        id: "h1",
        category: "Hospitals",
        name: "Millat Hospital - Sector 18",
        distance: "0.8 km",
        time: "3 mins",
        type: "Multi-speciality Hospital",
      },
      {
        id: "h2",
        category: "Hospitals",
        name: "Super Speciality Hospital",
        distance: "1.2 km",
        time: "5 mins",
        type: "Super Speciality Healthcare",
      },
      {
        id: "s1",
        category: "Schools",
        name: "International K-12 Academy",
        distance: "0.9 km",
        time: "4 mins",
        type: "ICSE / CBSE Affiliated",
      },
      {
        id: "p1",
        category: "Parks",
        name: "Central Botanical Promenade",
        distance: "0.6 km",
        time: "2 mins",
        type: "Jogging & Recreation Park",
      },
      {
        id: "c1",
        category: "Shopping Centers",
        name: "City Center Retail Mall",
        distance: "1.5 km",
        time: "5 mins",
        type: "Regional Shopping & Dining",
      },
      {
        id: "t1",
        category: "Transport",
        name: "Expressway & Arterial Corridor",
        distance: "0.5 km",
        time: "2 mins",
        type: "Major Transit Link",
      },
      {
        id: "t2",
        category: "Transport",
        name: "Metro / Suburban Station",
        distance: "1.2 km",
        time: "5 mins",
        type: "Rapid Mass Transit",
      },
    ];
  }, [project]);

  const filteredPlaces = useMemo(() => {
    if (activeCategory === "All") return places;
    return places.filter((p) => p.category === activeCategory);
  }, [activeCategory, places]);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Hospitals":
        return <Activity className="w-4 h-4 text-rose-500" />;
      case "Schools":
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case "Parks":
        return <Trees className="w-4 h-4 text-emerald-500" />;
      case "Shopping Centers":
        return <ShoppingBag className="w-4 h-4 text-amber-500" />;
      case "Transport":
        return <Train className="w-4 h-4 text-indigo-500" />;
      default:
        return <MapPin className="w-4 h-4 text-[#D29324]" />;
    }
  };

  const projectTitle = project?.title || "Property";
  const projectLocation = project?.location || "Prime Location, Mumbai";

  return (
    <section
      id="location"
      className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E3DA] shadow-sm space-y-6"
    >
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Locality & Connectivity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#252525]">
            Location
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            {projectLocation}
          </p>
        </div>

        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            `${projectTitle}, ${projectLocation}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] hover:border-[#D29324] text-xs font-bold text-[#AE7419] transition-all self-start"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open in Google Maps</span>
        </a>
      </div>

      {/* Main Map & Places Split View (matching screenshot 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Map Container (60% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* Category Filter Pills (floating style above/on top of map) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#EA580C] text-white shadow-md scale-105"
                    : "bg-[#FAF8F4] text-[#6B7280] hover:text-[#252525] border border-[#E8E3DA]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Interactive OpenStreetMap Embed */}
          <div className="relative flex-1 min-h-[380px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#E8E3DA] bg-[#FAF8F4] shadow-inner">
            <iframe
              title={`${projectTitle} Location Map`}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.9980%2C19.0430%2C73.0280%2C19.0700&layer=mapnik&marker=19.0560%2C73.0130"
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
            />

            {/* Overlaid Project Pin Info Card */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E8E3DA] shadow-lg pointer-events-auto">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EA580C] text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-extrabold text-[#252525] block truncate">
                    {projectTitle}
                  </span>
                  <span className="text-[10px] text-[#6B7280] block truncate">
                    {projectLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Scrollable Nearby Places List (40% width on desktop) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-[#E8E3DA] bg-[#FAF8F4] overflow-hidden">
          <div className="p-4 bg-white border-b border-[#E8E3DA] flex items-center justify-between">
            <span className="text-xs font-bold text-[#252525]">
              Nearby Landmarks ({filteredPlaces.length})
            </span>
            <span className="text-[10px] text-[#D29324] font-bold uppercase">
              {activeCategory}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[420px] divide-y divide-[#E8E3DA] p-2 space-y-1">
            {filteredPlaces.map((pl) => (
              <div
                key={pl.id}
                onClick={() => setSelectedPlaceId(pl.id)}
                className={`p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 ${selectedPlaceId === pl.id
                    ? "bg-amber-100/60 border border-[#D29324]"
                    : "bg-white hover:bg-amber-50/40 border border-transparent"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-center shrink-0">
                    {getCategoryIcon(pl.category)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#252525] truncate">
                      {pl.name}
                    </h4>
                    <span className="text-[10px] text-[#6B7280] block truncate">
                      {pl.type}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end text-xs font-black text-[#AE7419]">
                    <span>{pl.distance}</span>
                    <Compass className="w-3 h-3 text-[#D29324]" />
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${pl.name}, ${projectLocation}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] text-[#D29324] hover:underline block"
                  >
                    Directions →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Inline EMI Calculator Section
// ─────────────────────────────────────────────
function EmiCalculatorSection({ basePrice }) {
  const [propertyPrice, setPropertyPrice] = useState(basePrice || 26800000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const loanAmount = Math.round(propertyPrice * (1 - downPaymentPct / 100));
  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;
  const emi =
    r === 0
      ? Math.round(loanAmount / n)
      : Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const totalPayment = emi * n;
  const totalInterest = totalPayment - loanAmount;
  const downPaymentAmt = propertyPrice - loanAmount;

  return (
    <section
      id="emi"
      className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E3DA] shadow-sm space-y-6"
    >
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
          <Calculator className="w-3.5 h-3.5" />
          <span>Payment Calculator</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#252525]">
          Estimate Your Monthly EMI
        </h2>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Based on 20% down payment and current prevailing interest rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-semibold text-[#252525]">Property Value</span>
              <span className="font-black text-[#AE7419]">
                {formatINR(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min={10000000}
              max={60000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-[#D29324] cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-semibold text-[#252525]">Down Payment</span>
              <span className="font-black text-[#AE7419]">
                {downPaymentPct}% ({formatINR(downPaymentAmt)})
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-[#D29324] cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-semibold text-[#252525]">Interest Rate</span>
              <span className="font-black text-[#AE7419]">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={7.0}
              max={12.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-[#D29324] cursor-pointer"
            />
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-semibold text-[#252525]">Loan Tenure</span>
              <span className="font-black text-[#AE7419]">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-[#D29324] cursor-pointer"
            />
          </div>
        </div>

        {/* Breakdown Card (5 cols) */}
        <div className="lg:col-span-5 p-5 bg-[#FAF8F4] rounded-2xl border border-[#E8E3DA] space-y-4">
          <div className="text-center p-4 bg-white rounded-xl border border-[#E8E3DA]">
            <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
              Estimated Monthly EMI
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#AE7419] mt-0.5">
              {formatINR(emi)} / mo*
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#E8E3DA]">
              <span className="text-[#6B7280]">Principal Loan Amount</span>
              <span className="font-bold text-[#252525]">{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E8E3DA]">
              <span className="text-[#6B7280]">Total Interest Payable</span>
              <span className="font-bold text-[#252525]">{formatINR(totalInterest)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#6B7280]">Total Payment</span>
              <span className="font-bold text-[#AE7419]">{formatINR(totalPayment)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FAQ Section
// ─────────────────────────────────────────────
function FaqSection({ project }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: `What is the starting price of ${project.title}?`,
      a: `${project.title} starts at ₹${project.price}. The price varies depending on the BHK configuration and floor. Contact our advisor for the latest pricing and available units.`,
    },
    {
      q: `What BHK configurations are available in ${project.title}?`,
      a: `${project.title} offers ${project.flatTypes} configurations. Carpet areas range from ${project.carpetArea}. Please enquire for exact unit availability.`,
    },
    {
      q: `What is the RERA registration number of ${project.title}?`,
      a: project.rera
        ? `The project is registered under MahaRERA with registration number ${project.rera}. You can verify this on the official MahaRERA portal.`
        : `RERA registration details are available on request. Please contact our advisor for the latest compliance documentation.`,
    },
    {
      q: `What is the expected possession date?`,
      a: `The project has a target possession of ${project.possession || "December 2026"}. Confirm with our advisory team for tower-wise schedules.`,
    },
    {
      q: `Who is the developer of ${project.title}?`,
      a: `${project.title} is developed by ${project.builder}, celebrated for excellence, sustainability, and quality construction.`,
    },
    {
      q: `How can I schedule a site visit?`,
      a: `You can schedule a free, guided site visit by clicking "Schedule a Visit" on this page. Our advisor will confirm your appointment and arrange complimentary pick-up.`,
    },
  ];

  return (
    <section
      id="faqs"
      className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] border border-[#E8E3DA] space-y-4"
    >
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D29324] uppercase tracking-wider mb-1">
          <Info className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#252525]">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#E8E3DA] bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-[#252525] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
            >
              <span className="flex-1 pr-4">{faq.q}</span>
              {openIndex === i ? (
                <ChevronUp className="w-4 h-4 text-[#D29324] shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6B7280] shrink-0" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-xs text-[#6B7280] leading-relaxed border-t border-[#E8E3DA] pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Main ProjectDetailContent
// ─────────────────────────────────────────────
function ProjectDetailContent() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const project = useMemo(() => getProjectBySlug(slug), [slug]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Read more overview toggle
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  // Amenities show more
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Sticky nav active section
  const [activeSection, setActiveSection] = useState("overview");

  // Modals
  const [enquiryMode, setEnquiryMode] = useState(null); // null = closed
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState("");
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }, []);

  // Save / Share via Centralized Wishlist
  const { isSaved: checkIsSaved, toggleSave } = useWishlist();
  const isSaved = project ? checkIsSaved(project.id || project.slug) : false;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href).catch(() => { });
      showToast("Project link copied to clipboard!");
    }
  };

  const handleToggleSave = () => {
    if (project) {
      toggleSave(project);
    }
  };

  // Sticky in-page navigation sections (strictly matching DOM section flow)
  const navSections = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "configurations", label: "Configurations" },
      { id: "price-insights", label: "Price Insights" },
      { id: "amenities", label: "Amenities" },
      { id: "location", label: "Location" },
      { id: "emi", label: "Payment Calculator" },
      { id: "developer", label: "Developer" },
      { id: "similar", label: "Similar Projects" },
      { id: "faqs", label: "FAQs" },
    ],
    []
  );

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // 70px (Global Header) + ~46px (Sticky Section Nav) + 12px breathing room = 128px
      const headerOffset = 128;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = navSections.map((s) => s.id);
      let current = sectionIds[0];
      const threshold = 138;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navSections]);

  // Related projects
  const relatedProjects = useMemo(() => {
    if (!project) return [];
    const list = [];
    for (const relSlug of project.relatedProjectSlugs || []) {
      const rel = getProjectBySlug(relSlug);
      if (rel && rel.slug !== project.slug) list.push(rel);
    }
    if (list.length < 3) {
      for (const p of CANONICAL_PROJECTS) {
        if (p.slug !== project.slug && !list.some((r) => r.slug === p.slug)) {
          list.push(p);
          if (list.length >= 3) break;
        }
      }
    }
    return list.slice(0, 3);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525]">
        <Header
          selectedCity="mumbai"
          onOpenCityModal={() => setIsCityModalOpen(true)}
          onOpenAiModal={() => setIsAiModalOpen(true)}
        />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-3xl bg-[#FBF1DF] border border-[#D29324]/30 flex items-center justify-center text-[#D29324] mb-6">
            <Building2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#252525] mb-3">
            Project Not Found
          </h1>
          <p className="text-sm text-[#6B7280] max-w-md mb-8">
            The project &quot;{slug}&quot; could not be found in our directory.
          </p>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-sm font-bold"
          >
            Return to Homepage
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Hero gallery images
  const images = project.images?.length
    ? project.images
    : [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ];

  const amenities = project.amenities || [];
  const visibleAmenities = showAllAmenities ? amenities : amenities.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[90] bg-[#252525] text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
          {toast}
        </div>
      )}

      {/* Gallery Lightbox */}
      {lightboxOpen && (
        <GalleryLightbox
          images={images}
          startIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={!!enquiryMode}
        onClose={() => setEnquiryMode(null)}
        project={{
          id: project.id,
          title: project.title,
          builder: project.builder,
          price: project.price,
          location: project.location,
          flatTypes: project.flatTypes,
          images: project.images,
        }}
        mode={enquiryMode || "enquire"}
      />

      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={project.city || "mumbai"}
        onSelectCity={(cityId) => router.push(`/${cityId}`)}
      />
      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectProject={() => { }}
      />

      {/* 1. Header */}
      <Header
        selectedCity={project.city || "mumbai"}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Breadcrumbs Bar */}
      <div className="bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <ol className="flex items-center gap-1.5 text-[11px] text-[#6B7280] overflow-x-auto no-scrollbar whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-[#AE7419] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${project.city || "mumbai"}`} className="hover:text-[#AE7419] transition-colors">
                {project.cityName || "Mumbai"}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${project.city || "mumbai"}/buy/real-estate`} className="hover:text-[#AE7419] transition-colors">
                Flats for sale in {project.cityName || "Mumbai"}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${project.city || "mumbai"}/buy/real-estate`} className="hover:text-[#AE7419] transition-colors">
                New Projects in {project.location ? project.location.split(",")[0].trim() : (project.cityName || "Mumbai")}
              </Link>
            </li>
            <li>/</li>
            <li className="font-bold text-[#252525] truncate max-w-xs">
              {project.title}
            </li>
          </ol>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleToggleSave}
              title={isSaved ? "Saved" : "Save project"}
              className={`p-2 rounded-xl border cursor-pointer transition-all ${
                isSaved
                  ? "bg-rose-50 border-rose-300 text-rose-500"
                  : "bg-white border-[#E8E3DA] text-[#6B7280] hover:border-[#D29324]"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              title="Share"
              className="p-2 rounded-xl border border-[#E8E3DA] bg-white text-[#6B7280] hover:border-[#D29324] hover:text-[#AE7419] transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Hero Project Identity Bar (matching screenshot 1) */}
      <div className="bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-[#252525] tracking-tight">
                {project.title}
              </h1>
              <p className="text-xs text-[#6B7280] leading-snug">
                Flats by{" "}
                <span className="text-[#EA580C] font-bold">
                  {project.builder}
                </span>{" "}
                at {project.location || `${project.cityName || "Mumbai"}, India`}
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-[#252525] flex-wrap">
                <span className="px-2 py-0.5 rounded bg-gray-100 font-mono text-[#252525] border border-gray-200">
                  RERA: {project.rera || "PM1330002500429"}
                </span>
                <span className="text-[#6B7280]">
                  Agent RERA - A51700000043
                </span>
                <a
                  href="https://maharera.maharashtra.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EA580C] hover:underline"
                >
                  Visit maharera.maharashtra.gov.in
                </a>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-[#252525]">
                  INR {project.price}
                </div>
                <span className="text-[10px] text-[#6B7280]">Onwards</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEnquiryMode("brochure")}
                  className="px-3.5 py-2 rounded-xl border border-[#E8E3DA] bg-white hover:border-[#EA580C] text-xs font-bold text-[#252525] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#EA580C]" />
                  Brochure
                </button>
                <button
                  onClick={() => setEnquiryMode("enquire")}
                  className="px-5 py-2 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Top Hero 3-Image Gallery */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[280px] sm:h-[380px] lg:h-[440px]">
          {/* Main Large Image (Left 8 cols) */}
          <div
            onClick={() => {
              setActiveImageIndex(0);
              setLightboxOpen(true);
            }}
            className="md:col-span-8 relative rounded-2xl overflow-hidden bg-gray-100 border border-[#E8E3DA] group cursor-pointer shadow-sm"
          >
            <img
              src={images[0]}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Top Bar with Badges and RERA info (responsive, non-overlapping) */}
            <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-10 flex items-start justify-between gap-2 pointer-events-none">
              <div className="flex flex-col gap-1.5 pointer-events-auto">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#EA580C] text-white text-[10px] font-bold tracking-wide shadow-sm">
                  0% Zero Brokerage
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[10px] font-bold tracking-wide shadow-sm">
                  ₹ Best Price Guarantee
                </span>
              </div>

              {/* MahaRERA QR Badge */}
              <div className="bg-black/65 backdrop-blur-md p-1.5 sm:p-2 rounded-xl border border-white/20 text-white flex items-center gap-2 pointer-events-auto shadow-md max-w-[210px]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white p-1 rounded shrink-0">
                  <div className="w-full h-full bg-black/90 flex items-center justify-center text-[7px] font-mono text-white">
                    QR
                  </div>
                </div>
                <div className="text-[9px] leading-tight min-w-0">
                  <div className="font-bold truncate">MAHA RERA</div>
                  <div className="font-mono text-gray-200 truncate text-[8px] sm:text-[9px]">
                    {project.rera || "PM1330002500429"}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Dark Gradient for Maximum Overlay Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

            {/* Bottom Details & Photo Counter Button */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 z-10 pointer-events-none">
              <div className="min-w-0 max-w-[65%]">
                <div className="text-white text-xs sm:text-sm font-extrabold truncate drop-shadow">
                  {project.title}
                </div>
                <div className="text-white/85 text-[10px] sm:text-xs truncate drop-shadow">
                  {project.location} · {project.builder}
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 pointer-events-auto shadow-md transition-all shrink-0 border border-white/20">
                <Maximize2 className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Photos ({images.length})</span>
              </div>
            </div>
          </div>

          {/* Right Two Stacked Images (Right 4 cols) */}
          <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-3 h-full">
            <div
              onClick={() => {
                setActiveImageIndex(1);
                setLightboxOpen(true);
              }}
              className="relative rounded-2xl overflow-hidden bg-gray-100 border border-[#E8E3DA] group cursor-pointer shadow-sm"
            >
              <img
                src={images[1] || images[0]}
                alt="Exterior Perspective"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none">
                <span className="text-white text-xs font-semibold block truncate drop-shadow">
                  Scenic Architecture
                </span>
              </div>
            </div>
            <div
              onClick={() => {
                setActiveImageIndex(2);
                setLightboxOpen(true);
              }}
              className="relative rounded-2xl overflow-hidden bg-gray-100 border border-[#E8E3DA] group cursor-pointer shadow-sm"
            >
              <img
                src={images[2] || images[0]}
                alt="Interior Perspective"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 hover:bg-black/55 transition-colors flex items-center justify-center p-3">
                <span className="text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
                  <Eye className="w-4 h-4 text-[#D29324]" />
                  View All {images.length} Images
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Quick Specs Strip (matching screenshot 2) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-white rounded-2xl border border-[#E8E3DA] shadow-sm text-center">
          <div>
            <span className="text-[10px] text-[#6B7280] block">Configurations</span>
            <span className="text-sm font-extrabold text-[#252525] mt-0.5 block">
              {project.flatTypes || "2 BHK, 3 BHK"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B7280] block">Possession Date</span>
            <span className="text-sm font-extrabold text-[#252525] mt-0.5 block">
              {project.possession || "Dec 2026"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B7280] block">Built up Area</span>
            <span className="text-sm font-extrabold text-[#252525] mt-0.5 block">
              On request
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B7280] block">Carpet Area</span>
            <span className="text-sm font-extrabold text-[#252525] mt-0.5 block">
              {project.carpetArea || "800 - 1,408 Sq.ft"}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-[#6B7280] block">Min. Price per Sqft.</span>
            <span className="text-sm font-extrabold text-[#252525] mt-0.5 block">
              INR {project.avgPrice || "33.48 K"} per Sqft.
            </span>
          </div>
        </div>
      </div>

      {/* 6. Sticky In-Page Navigation Bar */}
      <div className="sticky top-[70px] z-30 bg-white border-y border-[#E8E3DA] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0">
            {navSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${activeSection === s.id
                    ? "text-[#EA580C] border-[#EA580C]"
                    : "text-[#6B7280] border-transparent hover:text-[#252525]"
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 7. UPPER CONTAINER — 2-Column Grid with Sticky Sidebar     */}
      {/* (Stops precisely at the end of Amenities before Location) */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Overview, Configs, Price Insight, Amenities */}
          <div className="lg:col-span-8 space-y-6">
            {/* Overview Section */}
            <section
              id="overview"
              className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E3DA] shadow-sm space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-black text-[#252525]">
                About {project.title}, {project.location ? project.location.split(",")[0].trim() : (project.cityName || "India")}
              </h2>

              {/* Status specs strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#FAF8F4] rounded-xl border border-[#E8E3DA] text-xs">
                <div>
                  <span className="text-[10px] text-[#6B7280] block">Project Status</span>
                  <span className="font-bold text-[#252525]">{project.status || "Launch"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] block">Project Type</span>
                  <span className="font-bold text-[#252525]">High Rise</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] block">Total Floors</span>
                  <span className="font-bold text-[#252525]">36</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] block">Plot Area</span>
                  <span className="font-bold text-[#252525]">87,120 Sq.ft</span>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs text-[#252525] leading-relaxed">
                {isOverviewExpanded ? (
                  <p className="whitespace-pre-line">{project.overview}</p>
                ) : (
                  <p>
                    {project.overview
                      ? (project.overview.length > 260
                          ? `${project.overview.slice(0, 260)}...`
                          : project.overview)
                      : `Welcome to ${project.title}, an ultra-premium residential landmark by ${project.builder} featuring thoughtfully designed apartments with contemporary architecture and lifestyle amenities.`}
                  </p>
                )}
                <button
                  onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                  className="text-[#EA580C] font-bold text-xs mt-1 hover:underline cursor-pointer"
                >
                  {isOverviewExpanded ? "Read less" : "Read more"}
                </button>
              </div>
            </section>

            {/* Configurations Section (with 2D / 3D image selector) */}
            <ConfigurationsSection
              project={project}
              onOpenEnquiry={() => setEnquiryMode("enquire")}
              onScheduleVisit={() => setEnquiryMode("visit")}
            />

            {/* Price Insights of Locality (Interactive SVG Graph) */}
            <div id="price-insights" className="scroll-mt-32">
              <PriceInsightsChart project={project} />
            </div>

            {/* Price Details & Table */}
            <section
              id="price"
              className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E3DA] shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#D29324] uppercase tracking-wider block">
                    Verified Registry
                  </span>
                  <h3 className="text-xl font-black text-[#252525]">
                    Pricing Breakdown
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#AE7419]">
                    ₹{project.price}
                  </div>
                  <span className="text-[10px] text-[#6B7280]">
                    ₹{project.avgPrice || "33.48 K/sq.ft"}
                  </span>
                </div>
              </div>

              {project.floorPlans?.length > 0 && (
                <div className="rounded-2xl border border-[#E8E3DA] overflow-hidden">
                  <div className="divide-y divide-[#E8E3DA]">
                    {project.floorPlans.map((fp, i) => (
                      <div
                        key={i}
                        className="p-3.5 flex items-center justify-between hover:bg-[#FAF8F4] transition-colors text-xs"
                      >
                        <div>
                          <div className="font-bold text-[#252525]">{fp.type}</div>
                          <div className="text-[11px] text-[#6B7280]">{fp.carpetArea}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-extrabold text-[#AE7419]">{fp.price}</div>
                          <button
                            onClick={() => setEnquiryMode("enquire")}
                            className="text-[10px] text-[#D29324] font-bold hover:underline cursor-pointer"
                          >
                            Check Availability →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Amenities Section */}
            {amenities.length > 0 && (
              <section
                id="amenities"
                className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] border border-[#E8E3DA] shadow-sm space-y-4"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#252525]">
                    World-Class Amenities
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    {amenities.length} curated lifestyle amenities for residents
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {visibleAmenities.map((am, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-[#E8E3DA] hover:border-[#D29324] transition-all flex items-start gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#FBF1DF] text-[#D29324] flex items-center justify-center shrink-0">
                        {getAmenityIcon(am.icon)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold text-[#AE7419] block">
                          {am.category}
                        </span>
                        <h4 className="text-[11px] font-bold text-[#252525] truncate">
                          {am.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                {amenities.length > 8 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-xs font-bold text-[#AE7419] hover:underline cursor-pointer block"
                  >
                    {showAllAmenities ? "Show Less" : `Show All ${amenities.length} Amenities →`}
                  </button>
                )}
              </section>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Enquiry Card */}
          <div className="lg:col-span-4 relative h-full">
            <div className="lg:sticky lg:top-[124px] space-y-4">
              <StickyEnquiryCard
                project={project}
                onScheduleVisit={() => setEnquiryMode("visit")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 8. LOWER CONTAINER — Full Width Sections                  */}
      {/* (Location, Payment Calculator, Developer, Similar, FAQs)  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-8">
        {/* Location Section with Category Filters & Map */}
        <LocationMapSection project={project} />

        {/* Payment Calculator Section */}
        <EmiCalculatorSection basePrice={project.priceNumeric} />

        {/* Developer Profile */}
        {project.developerInfo && (
          <section
            id="developer"
            className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E3DA] shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] p-2 flex items-center justify-center overflow-hidden shrink-0">
                  {project.developerInfo.logo ? (
                    <img
                      src={project.developerInfo.logo}
                      alt={project.developerInfo.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-[#D29324]" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D29324] uppercase tracking-wider block">
                    Developer Profile
                  </span>
                  <h3 className="text-lg font-black text-[#252525]">
                    {project.developerInfo.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <span>{project.developerInfo.experience} Experience</span>
                    <span>•</span>
                    <span>{project.developerInfo.projectsCount}</span>
                  </div>
                </div>
              </div>

              {project.developerInfo.slug && (
                <Link
                  href={`/developers/${project.developerInfo.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-[#FAF8F4] hover:bg-white text-xs font-bold text-[#AE7419] transition-all self-start"
                >
                  <span>View All Projects</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {project.developerInfo.description && (
              <p className="text-xs text-[#6B7280] leading-relaxed">
                {project.developerInfo.description}
              </p>
            )}
          </section>
        )}

        {/* Similar Projects Section */}
        {relatedProjects.length > 0 && (
          <section id="similar" className="scroll-mt-32 space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#252525]">
              Similar Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.slug}
                  className="rounded-2xl border border-[#E8E3DA] bg-white overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <Link
                      href={`/projects/${rel.slug}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={
                          rel.images?.[0] ||
                          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                        }
                        alt={rel.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#D29324] text-white text-[10px] font-bold uppercase pointer-events-none">
                        {rel.tag || "Verified"}
                      </span>
                      <div className="absolute bottom-3 left-3 text-white pointer-events-none">
                        <div className="text-base font-black">₹{rel.price}</div>
                        <div className="text-[11px] text-gray-300">
                          {rel.flatTypes}
                        </div>
                      </div>
                    </Link>

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 z-20">
                      <WishlistButton project={rel} size="sm" variant="floating" />
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-[#AE7419] uppercase block truncate">
                      {rel.builder}
                    </span>
                    <Link
                      href={`/projects/${rel.slug}`}
                      className="text-sm font-extrabold text-[#252525] group-hover:text-[#EA580C] transition-colors line-clamp-1"
                    >
                      {rel.title}
                    </Link>
                    <div className="flex items-center gap-1 text-[11px] text-[#6B7280]">
                      <MapPin className="w-3 h-3 text-[#EA580C] shrink-0" />
                      <span className="truncate">{rel.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8E3DA] text-xs">
                      <Link
                        href={`/projects/${rel.slug}`}
                        className="font-bold text-[#EA580C] hover:underline"
                      >
                        View Details →
                      </Link>
                      <span className="text-[10px] text-[#6B7280]">
                        {rel.rera ? "RERA Verified" : "Direct Builder"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <FaqSection project={project} />
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8E3DA] shadow-2xl px-4 py-3 flex items-center gap-2">
        <button
          onClick={() => setEnquiryMode("enquire")}
          className="flex-1 py-3 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <PhoneCall className="w-4 h-4" />
          Enquire Now
        </button>
        <button
          onClick={() => setEnquiryMode("visit")}
          className="flex-1 py-3 rounded-xl border border-[#EA580C] bg-amber-50/50 text-xs font-bold text-[#EA580C] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          Schedule Visit
        </button>
      </div>

      {/* Footer */}
      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Page Export
// ─────────────────────────────────────────────
export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-[#6B7280] font-medium">
              Loading project details…
            </span>
          </div>
        </div>
      }
    >
      <ProjectDetailContent />
    </Suspense>
  );
}
