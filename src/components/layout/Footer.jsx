"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, ShieldCheck } from "lucide-react";
import { FOOTER_LINKS, CITIES } from "@/data";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1F1F1F] text-white pt-16 pb-12 border-t border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline & Logo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xl sm:text-2xl font-light text-gray-300 leading-snug">
              Welcome to a new
              <br />
              <span className="font-bold text-white">age of home buying.</span>
            </p>

            {/* AuraLiving Wordmark Logo */}
            <div className="flex items-center gap-2 pt-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D29324] to-[#AE7419] text-white flex items-center justify-center font-bold text-xl shadow-md">
                AL
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  Aura<span className="text-[#D29324]">Living</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                  Zero Brokerage Real Estate
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              India&apos;s premier real estate service company providing verified developer inventory, transparent legal diligence, and advisory across 15+ major metros globally.
            </p>

            {/* Social Links with standard SVG icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D29324] flex items-center justify-center transition-colors text-white"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D29324] flex items-center justify-center transition-colors text-white"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D29324] flex items-center justify-center transition-colors text-white"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D29324] flex items-center justify-center transition-colors text-white"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 4 Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* OUR SERVICES */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#D29324] mb-4">
                Our Services
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                {FOOTER_LINKS.services.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-[#D29324] transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* KNOW US */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#D29324] mb-4">
                Know Us
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                {FOOTER_LINKS.knowUs.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-[#D29324] transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* REACH US */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#D29324] mb-4">
                Reach Us
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                {FOOTER_LINKS.reachUs.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-[#D29324] transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* BROKER APP */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#D29324] mb-4">
                Broker App
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                {FOOTER_LINKS.brokerApp.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.href} className="hover:text-[#D29324] transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* City Quick Links Section */}
        <div className="py-8 border-b border-gray-800">
          <p className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">
            Popular Real Estate Markets
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
            {CITIES.map((city) => (
              <span key={city.id} className="hover:text-white transition-colors cursor-pointer">
                Properties in {city.name} •
              </span>
            ))}
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 text-xs text-gray-500 space-y-3">
          <div className="flex items-center gap-2 text-gray-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#D29324]" />
            <span>RERA Compliance & Transparency Notice</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Disclaimer: AuraLiving is an independent real estate advisory platform facilitating developer listings. All project specifications, visual renderings, floor plans, and pricing are subject to developer and RERA authority approvals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] pt-3 border-t border-gray-800 text-gray-400">
            <div>
              © 2026 AuraLiving Technologies Private Limited. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:underline">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:underline">RERA Disclosures</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-3">
        {/* WhatsApp Floating Chat */}
        <a
          href="https://wa.me/919876543210?text=Hi%20AuraLiving,%20I%20am%20looking%20for%20property%20recommendations"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer shrink-0"
          title="Chat with AuraLiving on WhatsApp"
        >
          <svg className="w-7 h-7 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </footer>
  );
}
