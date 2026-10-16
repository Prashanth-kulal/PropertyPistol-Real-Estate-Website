"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Home,
  MapPin,
  IndianRupee,
  Users,
  Building2,
  TrendingUp,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PropertyAdvisoryPage() {
  const router = useRouter();

  const [propertyType, setPropertyType] = useState("Apartment");
  const [city, setCity] = useState("Mumbai");
  const [budget, setBudget] = useState("50L - 1Cr");
  const [purpose, setPurpose] = useState("Self Use");
  const [bhk, setBhk] = useState("2 BHK");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const recommendation = useMemo(() => {
    if (purpose === "Investment") {
      return {
        title: "Investment-focused properties",
        text:
          "Based on your preferences, we recommend properties with strong connectivity, rental demand and long-term appreciation potential.",
      };
    }

    if (budget === "Under 50L") {
      return {
        title: "Affordable residential options",
        text:
          "We recommend exploring emerging locations where you can get better space and connectivity within your budget.",
      };
    }

    if (propertyType === "Villa") {
      return {
        title: "Premium villa options",
        text:
          "We recommend looking at gated communities and well-connected suburban locations with good lifestyle amenities.",
      };
    }

    if (propertyType === "Plot") {
      return {
        title: "Plot investment options",
        text:
          "We recommend checking developing locations with planned infrastructure, clear titles and strong future connectivity.",
      };
    }

    return {
      title: `${bhk} homes in ${city}`,
      text:
        "We recommend comparing RERA-registered projects, location connectivity, builder reputation and total purchase cost before making a decision.",
    };
  }, [propertyType, city, budget, purpose, bhk]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#252525] flex flex-col">
      <Header />

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-[#6B7280]">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#AE7419] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="hover:text-[#AE7419] transition-colors">
                Services
              </Link>
            </li>
            <li>/</li>
            <li className="font-bold text-[#252525]">Property Advisory</li>
          </ol>

          <a
            href="#advisor"
            className="flex items-center gap-1.5 text-[#AE7419] font-bold hover:text-[#D29324] transition-colors"
          >
            <span>Consult an Advisor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-[#E8E3DA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/30 text-[#AE7419] text-xs font-bold mb-5">
              <Sparkles className="w-4 h-4" />
              Smart Property Advisory
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Find the right property with
              <span className="text-[#D29324]"> smarter guidance.</span>
            </h1>

            <p className="mt-4 text-[#6B7280] text-sm sm:text-base leading-relaxed max-w-2xl">
              Tell us what you are looking for and get a simple,
              personalized property recommendation based on your budget,
              location and purpose.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1.5fr_0.8fr] gap-7">
          {/* Preferences */}
          <div className="bg-white rounded-3xl border border-[#E8E3DA] shadow-sm p-5 sm:p-7">
            <div className="mb-7">
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Tell us your requirements
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Choose your preferences and we'll create a recommendation.
              </p>
            </div>

            {/* Property Type */}
            <div className="mb-7">
              <label className="text-sm font-bold block mb-3">
                What type of property are you looking for?
              </label>

              <div className="grid grid-cols-3 gap-3">
                {["Apartment", "Villa", "Plot"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`p-4 rounded-2xl border text-sm font-bold transition ${
                      propertyType === type
                        ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419]"
                        : "border-[#E8E3DA] hover:border-[#D29324]"
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-2" />
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="mb-7">
              <label className="text-sm font-bold block mb-3">
                Preferred city
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D29324]" />

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full appearance-none border border-[#E8E3DA] rounded-xl px-10 py-3.5 text-sm outline-none focus:border-[#D29324] bg-white"
                >
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Bangalore</option>
                  <option>Delhi NCR</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                  <option>Gurugram</option>
                  <option>Noida</option>
                  <option>Kolkata</option>
                  <option>Ahmedabad</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="mb-7">
              <label className="text-sm font-bold block mb-3">
                Your approximate budget
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Under 50L", "50L - 1Cr", "1Cr - 2Cr", "2Cr+"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => setBudget(item)}
                      className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-bold transition ${
                        budget === item
                          ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419]"
                          : "border-[#E8E3DA] hover:border-[#D29324]"
                      }`}
                    >
                      <IndianRupee className="inline w-3.5 h-3.5 mr-1" />
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Purpose */}
            <div className="mb-7">
              <label className="text-sm font-bold block mb-3">
                What is the main purpose?
              </label>

              <div className="grid grid-cols-2 gap-3">
                {["Self Use", "Investment"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setPurpose(item)}
                    className={`p-4 rounded-xl border text-sm font-bold transition ${
                      purpose === item
                        ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419]"
                        : "border-[#E8E3DA] hover:border-[#D29324]"
                    }`}
                  >
                    {item === "Investment" ? (
                      <TrendingUp className="w-5 h-5 mx-auto mb-2" />
                    ) : (
                      <Home className="w-5 h-5 mx-auto mb-2" />
                    )}
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* BHK */}
            {propertyType === "Apartment" && (
              <div>
                <label className="text-sm font-bold block mb-3">
                  Preferred configuration
                </label>

                <div className="grid grid-cols-4 gap-3">
                  {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setBhk(item)}
                      className={`py-3 rounded-xl border text-xs sm:text-sm font-bold transition ${
                        bhk === item
                          ? "border-[#D29324] bg-[#FBF1DF] text-[#AE7419]"
                          : "border-[#E8E3DA] hover:border-[#D29324]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommendation */}
          <div className="bg-[#252525] text-white rounded-3xl p-6 sm:p-7 h-fit lg:sticky lg:top-24">
            <div className="w-12 h-12 rounded-2xl bg-[#D29324]/20 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6 text-[#D29324]" />
            </div>

            <p className="text-xs uppercase tracking-widest text-[#D29324] font-bold">
              Your recommendation
            </p>

            <h2 className="text-2xl font-extrabold mt-2">
              {recommendation.title}
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed mt-4">
              {recommendation.text}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
                RERA-registered projects
              </div>

              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
                Location and connectivity analysis
              </div>

              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
                Budget-conscious suggestions
              </div>

              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#D29324]" />
                Builder and project comparison
              </div>
            </div>

            <a
              href="#advisor"
              className="mt-7 w-full bg-[#D29324] hover:bg-[#AE7419] rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold transition"
            >
              Get Expert Advice
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-[#E8E3DA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-9">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D29324]">
              Simple process
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">
              How AuraLiving Advisory works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                number: "01",
                title: "Tell us what you need",
                text: "Share your budget, location and property preferences.",
              },
              {
                number: "02",
                title: "We analyse your requirements",
                text: "Our advisory process considers location, budget and property suitability.",
              },
              {
                number: "03",
                title: "Get personalised guidance",
                text: "Connect with an advisor and explore suitable property options.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="border border-[#E8E3DA] rounded-2xl p-6"
              >
                <div className="text-[#D29324] font-extrabold text-2xl">
                  {item.number}
                </div>

                <h3 className="font-bold mt-4">{item.title}</h3>

                <p className="text-sm text-[#6B7280] leading-relaxed mt-2">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor Form */}
      <section id="advisor" className="max-w-[1000px] mx-auto px-4 sm:px-6 py-12">
        <div className="bg-[#FBF1DF] border border-[#D29324]/30 rounded-3xl p-6 sm:p-9">
          {!submitted ? (
            <>
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#D29324]" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  Talk to a Property Advisor
                </h2>

                <p className="text-sm text-[#6B7280] mt-2">
                  Share your details and an AuraLiving advisor can help you
                  understand your options.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid sm:grid-cols-3 gap-4"
              >
                <div>
                  <label className="text-xs font-bold block mb-2">
                    Your name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-[#E8E3DA] rounded-xl px-4 py-3 outline-none focus:border-[#D29324]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold block mb-2">
                    Phone number
                  </label>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D29324]" />

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full bg-white border border-[#E8E3DA] rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#D29324]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold block mb-2">
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D29324]" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full bg-white border border-[#E8E3DA] rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#D29324]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="sm:col-span-3 bg-[#D29324] hover:bg-[#AE7419] text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 transition"
                >
                  Request Property Advice
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-14 h-14 text-[#D29324] mx-auto" />

              <h2 className="text-2xl font-extrabold mt-4">
                Request received!
              </h2>

              <p className="text-sm text-[#6B7280] mt-2 max-w-md mx-auto">
                Thank you, {name}. Your property preferences have been recorded.
                An AuraLiving advisor can contact you using the details you
                provided.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 border border-[#D29324] text-[#AE7419] px-5 py-2.5 rounded-xl font-bold"
              >
                Submit another request
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}