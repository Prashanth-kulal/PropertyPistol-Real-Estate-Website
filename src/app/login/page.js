"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Heart,
  ChevronRight
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import { useWishlist } from "@/context/WishlistContext";

export default function LoginPage() {
  const router = useRouter();
  const { savedCount } = useWishlist();

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Auth mode: "signin" | "signup"
  const [mode, setMode] = useState("signin");
  const [authMethod, setAuthMethod] = useState("phone"); // "phone" | "email"

  // Form states
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successUser, setSuccessUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    const clean = phone.replace(/\D/g, "");
    if (clean.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    setErrorMessage("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOtpSent(true);
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setErrorMessage("Please enter the 4-digit verification code.");
      return;
    }
    setErrorMessage("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessUser({
        name: name || "AuraLiving Member",
        contact: `+91 ${phone}`
      });
    }, 700);
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    setErrorMessage("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessUser({
        name: name || email.split("@")[0],
        contact: email
      });
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Global Header */}
      <Header
        selectedCity="mumbai"
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* 2. Main Authentication Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl border border-[#E8E3DA] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Visual Brand Panel (Desktop) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1F1F1F] via-[#2A2A2A] to-[#151515] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Accent Gradients */}
            <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#D29324]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-[#AE7419]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Brand Logo */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-end gap-[3px] h-7 shrink-0">
                  <span className="w-1.5 h-3 bg-[#D29324] rounded-xs"></span>
                  <span className="w-1.5 h-4.5 bg-[#AE7419] rounded-xs"></span>
                  <span className="w-1.5 h-6 bg-[#D29324] rounded-xs"></span>
                  <span className="w-1.5 h-7 bg-[#8C5810] rounded-xs"></span>
                </div>
                <div className="text-xl font-black tracking-tight">
                  AURA<span className="text-[#D29324]">LIVING</span>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D29324] text-xs font-bold mb-3 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Member Account</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  Welcome to Your Premier Real Estate Journey
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
                  Sign in to access your saved properties, track project inquiries, and enjoy zero brokerage priority advisory.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#D29324]/20 text-[#D29324] flex items-center justify-center shrink-0 mt-0.5 border border-[#D29324]/30">
                    <Heart className="w-3.5 h-3.5 fill-[#D29324]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">Personalized Wishlist</h4>
                    <p className="text-[11px] text-gray-400 leading-snug">
                      Save, compare, and manage your shortlisted dream homes across India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#D29324]/20 text-[#D29324] flex items-center justify-center shrink-0 mt-0.5 border border-[#D29324]/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200">RERA Verified Pricing</h4>
                    <p className="text-[11px] text-gray-400 leading-snug">
                      Direct builder allotments with 100% legal verification and zero fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Zero Brokerage Experience</span>
              </span>
              <span className="text-white/60">AuraLiving.com</span>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            {successUser ? (
              /* Success State */
              <div className="my-auto text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#252525]">
                    Welcome, {successUser.name}!
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Signed in successfully via {successUser.contact}.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/saved-properties"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D29324] text-white text-xs font-bold hover:bg-[#AE7419] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>View Saved Properties ({savedCount})</span>
                  </Link>
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#E8E3DA] hover:border-[#D29324] bg-white text-xs font-bold text-[#252525] hover:text-[#AE7419] transition-all"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              /* Auth Form */
              <div className="space-y-6">
                {/* Tabs: Sign In / Create Account */}
                <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-4">
                  <div className="flex items-center gap-6">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signin");
                        setOtpSent(false);
                        setErrorMessage("");
                      }}
                      className={`text-base font-extrabold pb-1 transition-all cursor-pointer relative ${
                        mode === "signin"
                          ? "text-[#252525]"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <span>Sign In</span>
                      {mode === "signin" && (
                        <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#D29324]"></span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setOtpSent(false);
                        setErrorMessage("");
                      }}
                      className={`text-base font-extrabold pb-1 transition-all cursor-pointer relative ${
                        mode === "signup"
                          ? "text-[#252525]"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <span>Create Account</span>
                      {mode === "signup" && (
                        <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#D29324]"></span>
                      )}
                    </button>
                  </div>

                  {/* Method toggle */}
                  <div className="flex items-center gap-1 bg-[#FAF8F4] border border-[#E8E3DA] p-1 rounded-xl text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod("phone");
                        setErrorMessage("");
                      }}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        authMethod === "phone"
                          ? "bg-white text-[#AE7419] shadow-2xs"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Phone
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMethod("email");
                        setErrorMessage("");
                      }}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        authMethod === "email"
                          ? "bg-white text-[#AE7419] shadow-2xs"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Email
                    </button>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* Method 1: Phone Auth */}
                {authMethod === "phone" ? (
                  !otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      {mode === "signup" && (
                        <div>
                          <label className="text-xs font-bold text-[#252525] block mb-1.5">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Rahul Sharma"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium text-[#252525] focus:outline-hidden focus:border-[#D29324]"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-xs font-bold text-[#252525] block mb-1.5">
                          Mobile Number
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-xs font-bold text-gray-500">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            placeholder="Enter 10-digit mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-14 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium text-[#252525] focus:outline-hidden focus:border-[#D29324]"
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          We will send a 4-digit verification code to this number.
                        </span>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Continue with Mobile OTP</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* OTP verification step */
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-[#252525]">
                            Enter Verification Code
                          </label>
                          <button
                            type="button"
                            onClick={() => setOtpSent(false)}
                            className="text-[11px] font-bold text-[#AE7419] hover:underline cursor-pointer"
                          >
                            Change Number
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-500 mb-2">
                          OTP sent to +91 {phone} (Demo code: any 4 digits, e.g. 1234)
                        </p>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          autoFocus
                          placeholder="4-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="w-full px-4 py-3 text-center tracking-widest text-lg font-black rounded-xl border border-[#E8E3DA] text-[#252525] focus:outline-hidden focus:border-[#D29324]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Verify &amp; Sign In</span>
                            <CheckCircle2 className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )
                ) : (
                  /* Method 2: Email Auth */
                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    {mode === "signup" && (
                      <div>
                        <label className="text-xs font-bold text-[#252525] block mb-1.5">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Priya Nambiar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium text-[#252525] focus:outline-hidden focus:border-[#D29324]"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-bold text-[#252525] block mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium text-[#252525] focus:outline-hidden focus:border-[#D29324]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#252525] block mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] text-xs font-medium text-[#252525] focus:outline-hidden focus:border-[#D29324]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>{mode === "signin" ? "Sign In" : "Create AuraLiving Account"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Honest Transparency Note */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] text-[11px] text-gray-500 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-gray-700 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D29324]" />
                    <span>Client-side Demonstration Mode</span>
                  </div>
                  Authentication is interactive and client-side for demonstration. Your saved properties and preferences are persisted locally on your device without transmitting credentials to an external server.
                </div>
              </div>
            )}

            {/* Bottom Links */}
            <div className="pt-6 mt-6 border-t border-[#E8E3DA] flex items-center justify-between text-xs text-[#6B7280]">
              <Link href="/saved-properties" className="hover:text-[#AE7419] flex items-center gap-1 font-semibold">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Go to Saved Properties ({savedCount})</span>
              </Link>
              <Link href="/" className="hover:text-[#AE7419]">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity="mumbai"
        onSelectCity={() => setIsCityModalOpen(false)}
      />
      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}
