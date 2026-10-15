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
import { useWishlist } from "@/context/WishlistContext";

export default function Header({
  selectedCity,
  onOpenCityModal,
  onOpenAiModal
}) {
  const pathname = usePathname();
  const { savedCount } = useWishlist();
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
          {/* WhatsApp Talk to us with Balanced Circular Icon */}
          <a
            href="https://wa.me/918080190190?text=Hi%20AuraLiving"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 group cursor-pointer"
            title="Talk to us on WhatsApp (+91 8080 190190)"
            aria-label="Talk to us on WhatsApp"
          >
            <div className="w-8.5 h-8.5 rounded-full bg-[#E7FCE8] text-[#25D366] border border-[#25D366]/30 flex items-center justify-center shrink-0 transition-all shadow-2xs group-hover:scale-105 group-hover:bg-[#25D366] group-hover:text-white">
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] text-gray-400 font-normal">WhatsApp</span>
              <span className="text-[12.5px] font-bold text-gray-900 group-hover:text-[#25D366] transition-colors">
                Talk to us
              </span>
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

          {/* Wishlist Heart Link with Real-time Count */}
          <Link
            href="/saved-properties"
            className={`relative w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all cursor-pointer group ${
              pathname === "/saved-properties"
                ? "bg-rose-50 text-rose-500 ring-2 ring-rose-300"
                : "text-gray-500 hover:text-rose-500 hover:bg-rose-50/80"
            }`}
            title={savedCount > 0 ? `Saved Properties (${savedCount})` : "Saved Properties"}
            aria-label={`Saved Properties, ${savedCount} properties saved`}
          >
            <Heart
              className={`w-4.5 h-4.5 transition-colors ${
                savedCount > 0
                  ? "text-rose-500 fill-rose-500"
                  : "group-hover:text-rose-500"
              }`}
            />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs border-2 border-white animate-in zoom-in-50 duration-200">
                {savedCount > 9 ? "9+" : savedCount}
              </span>
            )}
          </Link>

          {/* User Account Icon -> Post Property (Matching PropertyPistol behavior) */}
          <Link
            href="/post-property"
            className={`w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
              pathname === "/post-property"
                ? "bg-[#FBF1DF] text-[#AE7419] border-[#D29324] shadow-xs"
                : "bg-gray-100 hover:bg-[#FBF1DF] text-gray-600 hover:text-[#AE7419] border-gray-200/80 hover:border-[#D29324]/40"
            }`}
            title="Post Property (Free)"
            aria-label="Post Property"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Header Right: Quick WhatsApp + Quick Heart + Quick Account + Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick WhatsApp on Mobile with Balanced Circle */}
          <a
            href="https://wa.me/918080190190?text=Hi%20AuraLiving"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-[#E7FCE8] text-[#25D366] border border-[#25D366]/30 flex items-center justify-center transition-all shadow-2xs hover:bg-[#25D366] hover:text-white shrink-0"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-4.5 h-4.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Quick Heart on Mobile */}
          <Link
            href="/saved-properties"
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-rose-500"
            title="Saved Properties"
            aria-label={`Saved Properties (${savedCount})`}
          >
            <Heart
              className={`w-4.5 h-4.5 ${
                savedCount > 0 ? "text-rose-500 fill-rose-500" : ""
              }`}
            />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border border-white">
                {savedCount > 9 ? "9+" : savedCount}
              </span>
            )}
          </Link>

          {/* Quick User -> Post Property on Mobile */}
          <Link
            href="/post-property"
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-[#D29324]"
            title="Post Property"
            aria-label="Post Property"
          >
            <User className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-5 py-4 space-y-3 shadow-lg">
          <Link
            href="/saved-properties"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-semibold text-gray-800 py-2 border-b border-gray-100 hover:text-[#D29324]"
          >
            <span className="flex items-center gap-2.5">
              <Heart className={`w-4.5 h-4.5 ${savedCount > 0 ? "fill-rose-500 text-rose-500" : "text-gray-400"}`} />
              <span>Saved Properties</span>
            </span>
            {savedCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {savedCount} Saved
              </span>
            ) : (
              <span className="text-xs text-gray-400 font-normal">0</span>
            )}
          </Link>

          <Link
            href="/post-property"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-semibold text-gray-800 py-2 border-b border-gray-100 hover:text-[#D29324]"
          >
            <span className="flex items-center gap-2.5">
              <User className="w-4.5 h-4.5 text-gray-400" />
              <span>Post Property</span>
            </span>
            <span className="px-1.5 py-0.5 rounded-xs bg-[#5B51D8] text-white text-[9px] font-bold">
              FREE
            </span>
          </Link>

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
