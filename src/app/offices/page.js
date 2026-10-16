"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Building,
  Globe2,
  Navigation,
  Sparkles,
  Send,
  CheckCircle2
} from "lucide-react";

const OFFICES = [
  {
    id: "global-hq",
    name: "Global Head Office — Navi Mumbai",
    isHQ: true,
    address: "D-507, 8th Floor, Shree Sawan Knowledge Park, Turbhe, Navi Mumbai, Maharashtra 400703",
    phone: "+91 8080 190190",
    email: "support@propertypistol.com",
    hours: "Mon - Sat: 9:30 AM – 7:30 PM IST",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    mapQuery: "Shree Sawan Knowledge Park Turbhe Navi Mumbai"
  },
  {
    id: "mumbai-bkc",
    name: "Mumbai Central & BKC Office",
    isHQ: false,
    address: "Level 6, The Capital, Bandra Kurla Complex (BKC), Bandra East, Mumbai, Maharashtra 400051",
    phone: "+91 8080 190190",
    email: "mumbai@propertypistol.com",
    hours: "Mon - Sat: 9:30 AM – 7:30 PM IST",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    mapQuery: "The Capital Bandra Kurla Complex Mumbai"
  },
  {
    id: "pune-hub",
    name: "Pune Regional Hub — Kharadi",
    isHQ: false,
    address: "Tower 2, World Trade Center, Kharadi, Pune, Maharashtra 411014",
    phone: "+91 8080 190190",
    email: "pune@propertypistol.com",
    hours: "Mon - Sat: 9:30 AM – 7:30 PM IST",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    mapQuery: "World Trade Center Kharadi Pune"
  },
  {
    id: "bangalore-hub",
    name: "Bangalore Tech Hub — Whitefield",
    isHQ: false,
    address: "Prestige Shantiniketan Commercial Crescent, ITPL Main Rd, Whitefield, Bangalore, Karnataka 560048",
    phone: "+91 8080 190190",
    email: "bangalore@propertypistol.com",
    hours: "Mon - Sat: 9:30 AM – 7:30 PM IST",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
    mapQuery: "Prestige Shantiniketan Whitefield Bangalore"
  },
  {
    id: "delhi-ncr-hub",
    name: "Delhi NCR Hub — Gurugram",
    isHQ: false,
    address: "DLF Cyber City, Tower 10B, DLF Phase 2, Gurugram, Haryana 122002",
    phone: "+91 8080 190190",
    email: "delhi@propertypistol.com",
    hours: "Mon - Sat: 9:30 AM – 7:30 PM IST",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    mapQuery: "DLF Cyber City Gurugram"
  },
  {
    id: "dubai-global",
    name: "Dubai International Desk — Business Bay",
    isHQ: false,
    address: "The Citadel Tower, Al Marasi Dr, Business Bay, Dubai, United Arab Emirates",
    phone: "+971 4 808 1900",
    email: "nri@propertypistol.com",
    hours: "Sun - Thu: 9:00 AM – 6:00 PM GST",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    mapQuery: "The Citadel Tower Business Bay Dubai"
  }
];

export default function OfficesPage() {
  const [selectedCity, setSelectedCity] = useState("all");
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    city: "Mumbai",
    message: ""
  });

  const filteredOffices = OFFICES.filter((office) => {
    if (selectedCity === "all") return true;
    return office.name.toLowerCase().includes(selectedCity.toLowerCase()) || office.address.toLowerCase().includes(selectedCity.toLowerCase());
  });

  const handleInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryForm({ name: "", phone: "", city: "Mumbai", message: "" });
    }, 3500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#252525]">
      <Header selectedCity="mumbai" onOpenCityModal={() => {}} onOpenAiModal={() => {}} onSearchQuery={() => {}} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#1F1F1F] via-[#2A2A2A] to-[#1F1F1F] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#D29324] text-xs font-semibold mb-4">
            <Building className="w-3.5 h-3.5" />
            <span>Pan-India & Global Reach</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Our Corporate & <span className="text-[#D29324]">Regional Offices</span>
          </h1>
          <p className="mt-4 text-gray-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Headquartered at Turbhe, Navi Mumbai with dedicated local advisory hubs situated across premier metro business corridors and international financial centers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["all", "Navi Mumbai", "Mumbai", "Pune", "Bangalore", "Delhi", "Dubai"].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCity === city
                    ? "bg-[#D29324] text-white shadow-sm"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {city === "all" ? "All Locations" : city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map((office) => (
            <div
              key={office.id}
              className={`rounded-2xl border overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                office.isHQ ? "border-[#D29324] ring-1 ring-[#D29324]" : "border-[#E8E3DA]"
              }`}
            >
              <div>
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.name}
                    className="w-full h-full object-cover"
                  />
                  {office.isHQ && (
                    <div className="absolute top-3 left-3 bg-[#D29324] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                      Global Headquarters
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h2 className="text-base font-bold text-[#1C1C1C]">
                    {office.name}
                  </h2>

                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{office.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-[#D29324] shrink-0" />
                      <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="hover:text-[#D29324] transition-colors font-medium">
                        {office.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#D29324] shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-[#D29324] transition-colors">
                        {office.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D29324] shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 mt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-[#FAF8F4] hover:bg-[#D29324] hover:text-white text-gray-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#E8E3DA]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule a Visit or Consultation Form */}
      <section className="py-14 bg-white border-t border-[#E8E3DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D29324] bg-[#D29324]/10 px-2.5 py-1 rounded">
                Direct Consultation
              </span>
              <h2 className="text-2xl font-bold text-[#1C1C1C]">
                Meet Our Advisors at Any Regional Office
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Prefer an in-person discussion over coffee? Schedule an appointment at any of our regional office lounges. Our senior portfolio managers will have curated developer layouts and comparative price reports ready for you.
              </p>
              <div className="pt-2 text-xs text-gray-500 font-medium">
                Toll Free: <a href="tel:+918080190190" className="text-[#D29324] font-bold">+91 8080 190190</a>
              </div>
            </div>

            <div className="md:col-span-7 bg-[#FAF8F4] p-6 rounded-2xl border border-[#E8E3DA]">
              {inquirySent ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <h3 className="text-base font-bold text-gray-900">Appointment Requested!</h3>
                  <p className="text-xs text-gray-600 mt-1">Our regional office manager will confirm your visit time via phone call.</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Nair"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#D29324]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#D29324]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Preferred Office *</label>
                      <select
                        value={inquiryForm.city}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, city: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#D29324]"
                      >
                        <option value="Navi Mumbai HQ">Navi Mumbai (Turbhe HQ)</option>
                        <option value="Mumbai BKC">Mumbai (BKC)</option>
                        <option value="Pune Kharadi">Pune (Kharadi WTC)</option>
                        <option value="Bangalore Whitefield">Bangalore (Whitefield)</option>
                        <option value="Delhi NCR">Delhi NCR (Gurugram)</option>
                        <option value="Dubai Business Bay">Dubai (Business Bay)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Purpose / Questions</label>
                    <textarea
                      rows={2}
                      placeholder="Interested in 2 BHK in Powai or NRI investments..."
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#D29324]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm Office Visit</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
