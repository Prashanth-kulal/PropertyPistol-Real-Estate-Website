"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CitySelectorModal from "@/components/common/CitySelectorModal";
import AuraAiModal from "@/components/common/AuraAiModal";
import ConsultationForm from "@/components/home/ConsultationForm";
import {
  Car,
  CheckCircle2,
  Percent,
  Globe2,
  Landmark,
  Layers,
  UserCheck,
  UserCheck2,
  ShieldCheck,
  Tag,
  Play,
  X,
  Star,
  Building2,
  ArrowRight,
  TrendingUp,
  Award,
  PhoneCall,
  Sparkles,
  Quote
} from "lucide-react";

export default function WhyUsPage() {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeStoryModal, setActiveStoryModal] = useState(null);

  // 10 Pillars of AuraLiving
  const pillars = [
    {
      title: "Free Pickup & Drop",
      description: "Convenience at its finest—enjoy complimentary sanitized transportation services for guided property visits.",
      icon: Car,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
      tag: "Convenience"
    },
    {
      title: "End to End Services",
      description: "Comprehensive solutions covering every milestone of your transaction, from shortlisting to key handover.",
      icon: CheckCircle2,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
      tag: "Complete Lifecycle"
    },
    {
      title: "Zero Brokerage",
      description: "Eliminate intermediary commissions completely, guaranteeing transparent, direct, and cost-effective property buying.",
      icon: Percent,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      tag: "100% Free Advisory"
    },
    {
      title: "Global Expertise!",
      description: "With dedicated desks across Dubai, Sharjah, Abu Dhabi, and Singapore, our services cater seamlessly to global buyers.",
      icon: Globe2,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      tag: "International Hubs"
    },
    {
      title: "Home Loans Assistance",
      description: "Direct tie-ups with 25+ premier banks ensure instant pre-approval and the lowest negotiated interest rates.",
      icon: Landmark,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
      tag: "Lowest Interest"
    },
    {
      title: "One-Stop Destination",
      description: "A singular platform offering legal verification, site tours, home financing, and registration effortlessly.",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
      tag: "Everything Under One Roof"
    },
    {
      title: "Personalized Consultation",
      description: "Tailored matchmaking matching your exact family budget, preferred commute radius, and amenities requirements.",
      icon: UserCheck,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      tag: "Bespoke Portfolio"
    },
    {
      title: "Relationship Manager",
      description: "A certified real estate specialist assigned exclusively to represent your best interests throughout the journey.",
      icon: UserCheck2,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
      tag: "Single Point Contact"
    },
    {
      title: "Data Confidentiality",
      description: "Bank-grade data encryption and zero spam policy ensure your phone number and personal details remain confidential.",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
      tag: "100% Privacy"
    },
    {
      title: "Best Offers & Deals",
      description: "Exclusive builder pre-launch discounts, festive cashbacks, and subsidized stamp-duty schemes on prime inventory.",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
      tag: "Exclusive Pricing"
    }
  ];

  // Verified Buyer Stories
  const clientStories = [
    {
      id: 1,
      name: "Mr. Deepak Pakhare",
      designation: "Senior UX Designer, Amazon",
      city: "Mumbai",
      project: "Godrej Eternal Palms, Sanpada",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
      story: "Their deep knowledge, personalized advice, and ethical zero-brokerage approach set them apart. The dedicated relationship manager handled everything from cab pickups to bank loan sanction within 4 days. Absolutely no stress!"
    },
    {
      id: 2,
      name: "Mr. Sajan V M",
      designation: "Aircraft Maintenance Engineer, Jet Airways",
      city: "Pune",
      project: "Kolte Patil Life Republic, Hinjewadi",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      story: "Being on frequent flight schedules, I needed someone trustworthy to guide my family. AuraLiving shortlisted verified RERA projects, arranged doorstep inspections, and even negotiated developer waivers. Exceptional dedication!"
    },
    {
      id: 3,
      name: "Mrs. Kavitha & Mr. Panish Kumar",
      designation: "Asst. Vice President, Reliance JIO",
      city: "Bangalore",
      project: "Prestige Falcon City, Kanakapura Road",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&h=200&q=80",
      story: "We were skeptical about brokers charging high fees with poor advice. AuraLiving proved how modern real estate should be: zero brokerage, complete legal due diligence, and zero bias towards builders."
    },
    {
      id: 4,
      name: "Mr. Irfan Shirwani",
      designation: "AVP, ICICI Lombard",
      city: "Delhi NCR",
      project: "DLF Privana South, Sector 76 Gurugram",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
      story: "The NRI Desk was a lifesaver. My overseas property documentation was executed through their Dubai office while the physical registry in NCR was handled smoothly with local biometric coordinators."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Header */}
      <Header
        selectedCity="mumbai"
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Top Hero Section */}
        <section className="relative bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F4] to-white py-14 sm:py-20 border-b border-[#E8E3DA] overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D29324_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#D29324] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#AE7419] font-semibold">Why Us?</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Headlines & Pillars */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D29324]/10 border border-[#D29324]/30 text-[#AE7419] text-xs font-bold tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#D29324]" />
                  <span>Your Shield in Real Estate Deals</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#252525] tracking-tight leading-[1.15]">
                  India&apos;s Most Trusted <br />
                  <span className="text-[#252525]">Real Estate Expert</span>
                </h1>

                <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324] flex items-center gap-2">
                  <span>Avail Zero Brokerage</span>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#AE7419] text-white font-bold uppercase tracking-wider">
                    Guaranteed
                  </span>
                </div>

                <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                  AuraLiving is engineered to redefine how India buys and invests in real estate. With zero broker fee, comprehensive legal verification, doorstep property site visits, and dedicated relationship advisors, we make home buying completely stress-free.
                </p>

                {/* Key Stat Badges */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-[#E8E3DA] shadow-xs">
                    <p className="text-xl sm:text-2xl font-black text-[#252525]">50,000+</p>
                    <p className="text-[11px] text-gray-500 font-medium">Families Assisted</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-[#E8E3DA] shadow-xs">
                    <p className="text-xl sm:text-2xl font-black text-[#252525]">40+ Cities</p>
                    <p className="text-[11px] text-gray-500 font-medium">Pan-India & Global</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-[#E8E3DA] shadow-xs">
                    <p className="text-xl sm:text-2xl font-black text-[#D29324]">₹ 0 Fee</p>
                    <p className="text-[11px] text-gray-500 font-medium">Zero Brokerage</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#consultation_form"
                    className="px-6 py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Free Site Visit</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <Link
                    href="/#top-projects"
                    className="px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-[#E8E3DA] shadow-xs transition-all flex items-center gap-2"
                  >
                    <span>Browse Verified Projects</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Founder Video Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                    alt="Leadership Message"
                    className="w-full h-[380px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setVideoModalOpen(true)}
                      className="w-20 h-20 rounded-full bg-[#D29324]/90 hover:bg-[#D29324] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer group/btn"
                      aria-label="Play Story"
                    >
                      <Play className="w-8 h-8 fill-current translate-x-0.5 group-hover/btn:scale-105 transition-transform" />
                    </button>
                  </div>

                  {/* Bottom Video Badge */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <span className="px-2.5 py-1 rounded bg-[#D29324] text-white text-[10px] font-bold uppercase tracking-wider inline-block mb-2">
                      Leadership Vision
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      From Vision to Victory: Building India&apos;s PropTech Future
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Hear our leadership explain how we guarantee zero-brokerage advisory and transparent developer agreements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 10 Core Pillars Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBF1DF] border border-[#D29324]/30 text-[#AE7419] text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D29324]" />
                <span>The AuraLiving Advantage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
                End-to-End Real Estate Services Platform!
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-3 leading-relaxed">
                Discover 10 powerful advantages that ensure your property purchase is completely secure, effortless, and financially rewarding.
              </p>
            </div>

            {/* 10 Pillars Grid (2 rows of 5 on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden border border-[#E8E3DA] bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[340px]"
                  >
                    {/* Background Card Photo */}
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 group-hover:from-black/95 group-hover:via-black/75 group-hover:to-black/50 transition-colors duration-300" />

                    {/* Top Tag & Icon */}
                    <div className="relative z-10 p-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D29324] bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10">
                        {pillar.tag}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                        <Icon className="w-4 h-4 text-[#FFE2A7]" />
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="relative z-10 p-5 text-white">
                      <h3 className="text-lg font-bold tracking-tight text-white mb-2 group-hover:text-[#FFE2A7] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. What Are We Aiming For? (Dark Section with Key Milestones) */}
        <section className="py-20 bg-[#161B26] text-white relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D29324]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Mission & Vision */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D29324]/20 border border-[#D29324]/40 text-[#FFE2A7] text-xs font-semibold">
                  <Award className="w-3.5 h-3.5 text-[#D29324]" />
                  <span>Our Vision & Values</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  What Are We Aiming For?
                </h2>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  We envision a transparent Indian real estate ecosystem where homebuyers never have to worry about hidden commissions, inflated pricing, or unverified developer claims.
                </p>

                <p className="text-sm text-gray-400 leading-relaxed">
                  Through cutting-edge proprietary data analytics, direct Grade-A builder alliances, and doorstep personalized consultation, AuraLiving sets the national gold standard in property transactions.
                </p>

                <div className="pt-2">
                  <a
                    href="#consultation_form"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
                  >
                    <span>Connect with Leadership Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: 6 Stat Milestone Cards */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#D29324]/50 transition-all">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#FFE2A7]">₹ 25,000 Cr+</p>
                    <p className="text-xs text-gray-300 mt-1 font-medium">Worth of Deals Facilitated</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#D29324]/50 transition-all">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#FFE2A7]">40+ Metros</p>
                    <p className="text-xs text-gray-300 mt-1 font-medium">Offices Across India & UAE</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#D29324]/50 transition-all">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#FFE2A7]">10,000+</p>
                    <p className="text-xs text-gray-300 mt-1 font-medium">Channel Partner Network</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#D29324]/50 transition-all">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#FFE2A7]">50,000+</p>
                    <p className="text-xs text-gray-300 mt-1 font-medium">Families Handed Over</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#D29324]/50 transition-all">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#FFE2A7]">2,000+</p>
                    <p className="text-xs text-gray-300 mt-1 font-medium">Grade-A Builder Alliances</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#D29324]/50 transition-all">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#FFE2A7]">12+ Years</p>
                    <p className="text-xs text-gray-300 mt-1 font-medium">Unbroken Proven Track Record</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Verified Client Stories & Testimonials */}
        <section className="py-20 bg-[#FAF8F4] border-b border-[#E8E3DA]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF1DF] border border-[#D29324]/40 text-[#AE7419] text-xs font-semibold mb-2">
                <Quote className="w-3.5 h-3.5 text-[#D29324]" />
                <span>Buyer Experiences</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
                People Love the AuraLiving Experience
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Read authentic feedback from corporate leaders, engineers, and families who found their dream homes with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clientStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl p-6 border border-[#E8E3DA] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-[#D29324] mb-3">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed italic mb-4">
                      &ldquo;{story.story}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#D29324]/30"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{story.name}</h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1">{story.designation}</p>
                      <p className="text-[10px] text-[#AE7419] font-medium mt-0.5">{story.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Embedded Free Consultation Form */}
        <ConsultationForm />
      </main>

      {/* 7. Footer */}
      <Footer onSelectCity={() => {}} />

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1C1B1F] rounded-2xl max-w-2xl w-full p-6 text-white relative shadow-2xl border border-white/10">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-2">AuraLiving — From Vision to Victory</h3>
            <p className="text-xs text-gray-400 mb-4">A special address by our Founder & Executive Leadership on building India&apos;s leading Zero-Brokerage real estate network.</p>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#D29324] mx-auto flex items-center justify-center text-white animate-pulse">
                  <Play className="w-7 h-7 fill-current translate-x-0.5" />
                </div>
                <p className="text-sm font-semibold text-white">Full Video Stream Presentation</p>
                <p className="text-xs text-gray-400 max-w-md">Streaming 1080p presentation: 12 Years of Innovation, 50,000+ happy buyers, and zero-brokerage guarantees.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* City Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity="mumbai"
        onSelectCity={() => setIsCityModalOpen(false)}
      />

      {/* AI Modal */}
      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        selectedCity="mumbai"
      />
    </div>
  );
}
