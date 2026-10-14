"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Heart,
  User,
  ChevronDown,
  Building2,
  Handshake,
  Layers3,
  Globe2,
  ArrowRight
} from "lucide-react";

export default function Header({
  selectedCity,
  onOpenCityModal,
  onOpenAiModal
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceItems = [
    {
      title: "Syndicate by AuraLiving",
      description: "India's Most Trusted Platform for Real Estate Brokers",
      icon: Handshake,
      href: "/services/syndicate"
    },
    {
      title: "Builder Service",
      description: "Channel Partner Services for Builders",
      icon: Building2,
      href: "/services/builder-service"
    },
    {
      title: "Radiate by AuraLiving",
      description: "Platform Designed for Developers",
      icon: Layers3,
      href: "/services/radiate"
    },
    {
      title: "NRI Desk",
      description: "Dedicated Real Estate Services for NRI Customers",
      icon: Globe2,
      href: "/services/nri-desk"
    }
  ];

  return (
    <header className="bg-white border-b border-gray-200/80 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-[70px] flex items-center justify-between">
        {/* Left: Brand Logo & Main Nav Menu */}
        <div className="flex items-center gap-8 lg:gap-10">
          {/* AuraLiving Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Visual Skyline Bars Icon */}
            <div className="flex items-end gap-[3px] h-7 shrink-0">
              <span className="w-1.5 h-3 bg-[#D29324] rounded-xs"></span>
              <span className="w-1.5 h-4.5 bg-[#AE7419] rounded-xs"></span>
              <span className="w-1.5 h-6 bg-[#D29324] rounded-xs"></span>
              <span className="w-1.5 h-7 bg-[#8C5810] rounded-xs"></span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-[20px] font-extrabold tracking-tight text-[#252525]">
                  AURA<span className="text-[#D29324]">LIVING</span>
                </span>
                <span className="text-[12px] font-semibold text-gray-400">.com</span>
              </div>
              <span className="text-[8px] font-bold tracking-widest text-[#AE7419] uppercase -mt-1">
                Your Trusted Real Estate Partner
              </span>
            </div>
          </Link>

          {/* Primary Navigation Menu */}
          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-gray-700">
            {/* 1. Why Us? */}
            <Link
              href="/why-us"
              className="hover:text-[#D29324] transition-colors py-2"
            >
              Why Us?
            </Link>

            {/* 2. Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                onClick={() => setServicesDropdownOpen(false)}
                className={`flex items-center gap-1 hover:text-[#D29324] transition-colors py-2 cursor-pointer ${
                  pathname?.startsWith("/services") ? "text-[#D29324] font-semibold" : ""
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-[#D29324]" : "text-gray-400"}`} />
              </Link>

              {/* Mega Dropdown Panel */}
              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-[390px] z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 ring-1 ring-black/5 overflow-hidden">
                    <div className="flex flex-col divide-y divide-gray-50">
                      {serviceItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={index}
                            href={item.href}
                            onClick={() => setServicesDropdownOpen(false)}
                            className={`p-3 rounded-xl transition-all flex items-center gap-3.5 group border ${
                              isActive
                                ? "bg-[#FAF8F4] border-[#F2E8D8]"
                                : "border-transparent hover:bg-[#FAF8F4] hover:border-[#F2E8D8]"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors border ${
                                isActive
                                  ? "bg-[#FBF1DF] text-[#AE7419] border-[#D29324]/40"
                                  : "bg-gray-100 text-[#D29324] border-gray-200/60 group-hover:bg-[#FBF1DF] group-hover:text-[#AE7419] group-hover:border-[#D29324]/30"
                              }`}
                            >
                              <Icon className="w-4.5 h-4.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4
                                  className={`text-xs font-bold transition-colors line-clamp-1 ${
                                    isActive
                                      ? "text-[#AE7419]"
                                      : "text-gray-800 group-hover:text-[#AE7419]"
                                  }`}
                                >
                                  {item.title}
                                </h4>
                                {isActive && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#FBF1DF] text-[#AE7419] border border-[#D29324]/30 shrink-0">
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-500 leading-snug line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Dropdown Bottom Banner */}
                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between px-2.5 py-2 bg-[#FAF8F4] rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D29324] animate-pulse"></span>
                        <span className="text-[11px] font-medium text-gray-600">
                          Looking for all services?
                        </span>
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="text-[11px] font-bold text-[#AE7419] hover:text-[#D29324] flex items-center gap-1 group"
                      >
                        <span>View Overview</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Post Property */}
            <Link
              href="/post-property"
              className="flex items-center hover:text-[#D29324] transition-colors py-2"
            >
              <span>Post Property</span>
              <span className="ml-1.5 px-1.5 py-[1px] rounded-xs bg-[#5B51D8] text-white text-[9px] font-extrabold tracking-wider animate-pulse">
                FREE
              </span>
            </Link>
          </nav>
        </div>

        {/* Right: Utility Area (WhatsApp, Toll Free, Wishlist, Profile) */}
        <div className="hidden sm:flex items-center gap-5">
          {/* WhatsApp Talk to us */}
          <a
            href="https://wa.me/918080190190?text=Hi%20AuraLiving"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-start leading-tight group"
          >
            <span className="text-[10px] text-gray-400 font-normal">WhatsApp</span>
            <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-gray-800 group-hover:text-[#25D366] transition-colors">
              <span className="w-3.5 h-3.5 text-[#25D366] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.056-2.072-.511-1.636-.677-2.738-2.317-2.82-2.427-.08-.109-.661-.881-.661-1.68 0-.8.419-1.192.569-1.353.15-.162.329-.202.439-.202.11 0 .22.002.316.007.102.006.239-.039.373.284.144.35.492 1.202.535 1.29.043.088.072.19.014.306-.058.115-.088.188-.175.29-.088.102-.185.228-.264.306-.088.087-.18.182-.077.359.102.175.455.751.977 1.216.671.597 1.238.783 1.413.87.175.088.277.073.38-.044.103-.117.439-.511.556-.686.117-.175.234-.146.395-.088.161.058 1.023.482 1.199.57.175.088.293.131.336.204.044.074.044.431-.1.836z" />
                </svg>
              </span>
              <span>Talk to us</span>
            </div>
          </a>

          {/* Vertical Divider */}
          <div className="h-7 w-px bg-gray-200"></div>

          {/* Toll Free Number */}
          <a
            href="tel:18008080190"
            className="flex flex-col items-start leading-tight hover:text-[#D29324] transition-colors"
          >
            <span className="text-[10px] text-gray-400 font-normal">Toll Free Number</span>
            <span className="text-[12.5px] font-bold text-gray-900 tracking-tight">
              +91 8080 190190
            </span>
          </a>

          {/* Wishlist Heart Icon */}
          <button
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors ml-1 cursor-pointer"
            title="Saved Properties"
          >
            <Heart className="w-4.5 h-4.5" />
          </button>

          {/* User Account Avatar */}
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 flex items-center justify-center transition-colors cursor-pointer"
            title="User Account"
          >
            <User className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-5 py-4 space-y-3 shadow-lg">
          <Link
            href="/why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-800 py-1 hover:text-[#D29324]"
          >
            Why Us?
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-800 py-1 hover:text-[#D29324]"
          >
            Services
          </Link>
          <Link
            href="/post-property"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center text-sm font-medium text-gray-800 py-1 hover:text-[#D29324]"
          >
            <span>Post Property</span>
            <span className="ml-1.5 px-1.5 py-0.5 rounded-xs bg-[#5B51D8] text-white text-[9px] font-bold">
              FREE
            </span>
          </Link>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span>Toll Free: +91 8080 190190</span>
            <span className="text-[#25D366] font-semibold">WhatsApp Available</span>
          </div>
        </div>
      )}
    </header>
  );
}
