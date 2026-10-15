"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Bot,
  Send,
  Plus,
  Clock,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  Building2,
  MapPin,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  Compass,
  ArrowRight,
  Mic,
  Star,
  Check
} from "lucide-react";
import { PROJECTS, CITIES, getProjectSlug } from "@/data";
import WishlistButton from "@/components/common/WishlistButton";

// Initial Suggestion Prompts matching PropertyPistol reference
const REFERENCE_PROMPTS = [
  "Which is the best location to invest in Mumbai?",
  "Which Noida localities offer the best ROI?",
  "I want to buy a 2 BHK in Pune",
  "We want a apartment in Worli with sunset view",
  "Which areas in Bangalore are ideal for first-time buyers?",
  "Top developer projects with direct builder discount",
  "Luxury 3 BHK near BKC with zero brokerage",
  "Ready-to-move apartments in Powai under 3 Cr"
];

// Curated Mock Knowledge Base for conversational answers
const MOCK_ANSWERS = {
  mumbai: {
    title: "Top Investment Localities in Mumbai MMR",
    summary: "Based on infrastructure catalysts, price-to-rent ratios, and live buyer demand, the top performing micro-markets in Mumbai are:",
    points: [
      "Sanpada & Navi Mumbai: Driven by the operational Atal Setu (MTHL) and upcoming Navi Mumbai International Airport. Historical 11.2% capital appreciation over the last 24 months.",
      "Powai & Kanjurmarg: Robust IT and corporate corridor with steady rental yields exceeding 3.8% and high tenant absorption.",
      "Mahim West & Dadar: Core city connectivity with brand new sea-view redevelopments by Grade-A developers like L&T Realty."
    ],
    recommendedIds: ["proj-1", "proj-2"],
    followUps: ["Show price breakup for Sanpada", "Calculate EMI for ₹2.68 Cr", "Schedule private chauffeur visit"]
  },
  noida: {
    title: "High ROI Corridors in Noida & Greater Noida",
    summary: "Noida's real estate trajectory is led by expressway connectivity and the upcoming Jewar International Airport:",
    points: [
      "Sector 150: The greenest sector along Noida-Greater Noida Expressway, yielding 12.8% YoY capital appreciation.",
      "Sector 128 & 62: Premium commercial hubs with high executive rental demand and low vacancy rates.",
      "Yamuna Expressway: Rapid industrial corridor development offering high long-term appreciation potential for plotted & mid-segment homes."
    ],
    recommendedIds: ["proj-8", "proj-3"],
    followUps: ["View RERA certificates for Noida", "Compare 3 BHK floor plans", "Check bank pre-approvals"]
  },
  pune: {
    title: "Best 2 BHK Residential Options in Pune",
    summary: "For 2 BHK homebuyers in Pune, tech proximity and social infrastructure are key drivers:",
    points: [
      "Hinjewadi Phases 1 & 2: Walking distance to Rajiv Gandhi Infotech Park. 2 BHK prices average ₹65L - ₹95L with 4.1% rental returns.",
      "Kharadi & Viman Nagar: East Pune's IT powerhouse with established schools, hospitals, and shopping malls.",
      "Baner & Balewadi: Cosmopolitan residential neighborhood with rapid metro phase expansion."
    ],
    recommendedIds: ["proj-1", "proj-7"],
    followUps: ["Filter ready-to-move 2 BHKs in Hinjewadi", "Zero brokerage booking procedure", "Talk to Pune area specialist"]
  },
  worli: {
    title: "Luxury Sea View Residences in Worli, South Mumbai",
    summary: "Worli represents the pinnacle of luxury coastal living in India:",
    points: [
      "Worli Sea Face & Lower Parel: Ultra-luxury high-rises offering unobstructed Arabian Sea sunset views and private concierge amenities.",
      "Coastal Road & Bandra-Worli Sea Link: Drastically reduced commute times to Bandra (under 10 mins) and Marine Lines (12 mins).",
      "Direct Builder Inventory: Direct allotments in Grade-A developments with zero brokerage fees."
    ],
    recommendedIds: ["proj-2", "proj-4"],
    followUps: ["Request sea-view floor plans", "Schedule VIP chauffeur inspection", "Speak with luxury desk"]
  },
  bangalore: {
    title: "Ideal Neighborhoods in Bangalore for First-Time Buyers",
    summary: "For first-time property buyers in Bengaluru, balanced affordability and tech connectivity are essential:",
    points: [
      "Whitefield & Kadugodi: Operational Purple Line Metro, gated townships, and self-sustained social infrastructure.",
      "Electronic City & Sarjapur Road: Abundant Grade-A developer inventory with 2 BHKs starting at ₹75L.",
      "Thanisandra & North Bangalore: High appreciation corridor along the airport expressway with proposed metro connectivity."
    ],
    recommendedIds: ["proj-5", "proj-7"],
    followUps: ["Check 2 BHK availability in Whitefield", "Review builder delivery track record", "Calculate down payment"]
  }
};

export default function AskAiPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [queryInput, setQueryInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Chat Sessions History
  const [recentChats, setRecentChats] = useState([
    { id: "c1", title: "Best location to invest in Mumbai", date: "Today" },
    { id: "c2", title: "Noida high-growth ROI sectors", date: "Yesterday" },
    { id: "c3", title: "2 BHK near Hinjewadi IT Park", date: "3 days ago" },
    { id: "c4", title: "Worli sea-view luxury penthouses", date: "Last week" }
  ]);

  // Active Messages in current conversation
  const [messages, setMessages] = useState([]);

  // Dream Home Enquiry Modal State
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryProject, setEnquiryProject] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    allowSellers: true,
    whatsappUpdates: true
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll conversation
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Send message logic
  const handleSendMessage = (textToSend) => {
    const query = textToSend || queryInput;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setQueryInput("");
    setIsTyping(true);

    // Save to recent sessions if not duplicate
    if (!recentChats.some((c) => c.title.toLowerCase() === query.toLowerCase())) {
      setRecentChats((prev) => [
        { id: `c-${Date.now()}`, title: query.slice(0, 35) + (query.length > 35 ? "..." : ""), date: "Just now" },
        ...prev.slice(0, 5)
      ]);
    }

    // Determine matching mock response
    const qLower = query.toLowerCase();
    let topic = "mumbai";
    if (qLower.includes("noida") || qLower.includes("ncr") || qLower.includes("gurgaon")) topic = "noida";
    else if (qLower.includes("pune") || qLower.includes("hinjewadi")) topic = "pune";
    else if (qLower.includes("worli") || qLower.includes("sunset") || qLower.includes("sea view")) topic = "worli";
    else if (qLower.includes("bangalore") || qLower.includes("bengaluru") || qLower.includes("whitefield")) topic = "bangalore";

    const topicData = MOCK_ANSWERS[topic] || MOCK_ANSWERS.mumbai;

    // Simulate AI thinking delay
    setTimeout(() => {
      const recommendedProjects = PROJECTS.filter((p) =>
        topicData.recommendedIds.includes(p.id)
      );

      const aiMsg = {
        id: Date.now() + 1,
        sender: "assistant",
        title: topicData.title,
        summary: topicData.summary,
        points: topicData.points,
        cards: recommendedProjects.length > 0 ? recommendedProjects : PROJECTS.slice(0, 2),
        followUps: topicData.followUps,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  // Read URL query parameter if passed from homepage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) {
        const timer = setTimeout(() => {
          handleSendMessage(q);
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleStartNewChat = () => {
    setMessages([]);
    setQueryInput("");
  };

  const handleOpenEnquiryModal = (project) => {
    setEnquiryProject(project);
    setEnquirySubmitted(false);
    setIsEnquiryModalOpen(true);
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) return;
    setEnquirySubmitting(true);
    setTimeout(() => {
      setEnquirySubmitting(false);
      setEnquirySubmitted(true);
    }, 600);
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAF8F4] text-[#252525] font-['Poppins',sans-serif] overflow-hidden">
      
      {/* MAIN TWO-PANE LAYOUT: Sidebar (LEFT) + Chat Workspace (RIGHT) */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ================= LEFT SIDEBAR ================= */}
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col bg-[#1F1F1F] text-white border-r border-gray-800 transition-all duration-300 z-20 ${
            sidebarCollapsed ? "w-20 items-center" : "w-72"
          }`}
        >
          {/* Logo Section */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D29324] to-[#AE7419] flex items-center justify-center font-bold text-white text-sm shadow-md">
                AL
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="text-base font-extrabold tracking-tight text-white">
                    Aura<span className="text-[#D29324]">AI</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                    By AuraLiving
                  </span>
                </div>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              type="button"
              onClick={handleStartNewChat}
              className={`w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D29324] to-[#AE7419] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                sidebarCollapsed ? "px-0" : ""
              }`}
              title="New Chat"
            >
              <Plus className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>New Chat</span>}
            </button>
          </div>

          {/* Recent Conversations List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {!sidebarCollapsed && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 block mb-2">
                Recent Searches
              </span>
            )}
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => handleSendMessage(chat.title)}
                className={`w-full text-left p-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2.5 group cursor-pointer ${
                  sidebarCollapsed ? "justify-center" : ""
                }`}
                title={chat.title}
              >
                <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#D29324] shrink-0" />
                {!sidebarCollapsed && (
                  <span className="truncate flex-1">{chat.title}</span>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="p-3 border-t border-gray-800">
            <Link
              href="/"
              className={`w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-2 transition-colors ${
                sidebarCollapsed ? "justify-center px-0" : ""
              }`}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Back to AuraLiving</span>}
            </Link>
          </div>
        </aside>

        {/* Mobile Slide-Out Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            ></div>
            <div className="relative w-72 bg-[#1F1F1F] text-white flex flex-col h-full shadow-2xl z-10">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <span className="text-sm font-bold text-white">Aura AI Navigation</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-md text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-3">
                <button
                  onClick={() => {
                    handleStartNewChat();
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#D29324] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Chat</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 block mb-2">
                  Recent Searches
                </span>
                {recentChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      handleSendMessage(chat.title);
                      setMobileSidebarOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-xl text-xs text-gray-300 hover:bg-white/10 flex items-center gap-2"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#D29324]" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-gray-800">
                <Link
                  href="/"
                  className="w-full py-2 px-3 rounded-xl bg-white/5 text-gray-300 text-xs font-semibold flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to AuraLiving Home</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ================= RIGHT WORKSPACE ================= */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FAF8F4]">
          
          {/* Top Sub-Header matching PropertyPistol's header-ai */}
          <header className="h-14 bg-white border-b border-[#E8E3DA] px-4 sm:px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {/* Mobile Menu trigger */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden text-gray-600 hover:text-[#252525] p-1.5 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              <nav className="hidden sm:flex items-center gap-6 text-xs font-semibold text-[#6B7280]">
                <Link href="/" className="hover:text-[#D29324] transition-colors">
                  Discover
                </Link>
                <Link href="/post-property" className="hover:text-[#D29324] transition-colors">
                  Post Property
                </Link>
                <Link href="/why-us" className="hover:text-[#D29324] transition-colors">
                  Why Us
                </Link>
                <Link href="/services" className="hover:text-[#D29324] transition-colors">
                  Services
                </Link>
              </nav>
            </div>

            {/* Talk to us hotline */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6B7280] hidden sm:inline">Talk to us:</span>
              <a
                href="tel:18002094040"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#AE7419] bg-[#FBF1DF] px-3 py-1.5 rounded-full border border-[#D29324]/30 hover:bg-[#D29324] hover:text-white transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 8080 190190</span>
              </a>
            </div>
          </header>

          {/* Main Chat Stage / Conversation Container */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-4xl w-full mx-auto flex flex-col">
            
            {/* INITIAL GREETING STATE (Shown when no messages yet) */}
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-8">
                
                {/* AI Animation Orb matching PropertyPistol's ai-animation */}
                <div className="relative mb-6">
                  {/* Outer pulsating golden halo */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#D29324] via-[#FBF1DF] to-[#AE7419] opacity-75 blur-lg animate-pulse"></div>
                  {/* Inner orb with sparkle */}
                  <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#D29324] to-[#AE7419] shadow-xl flex items-center justify-center text-white">
                    <Sparkles className="w-8 h-8 fill-white/20 animate-spin-slow" />
                  </div>
                </div>

                {/* Main Heading & Disclaimer */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
                  How can I help you today?
                </h1>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-2 max-w-md">
                  Ask a clear and specific question to get the most accurate results.
                </p>

                {/* Horizontal Marquee / Track of Example Prompt Cards */}
                <div className="w-full mt-8 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto">
                    {REFERENCE_PROMPTS.slice(0, 6).map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className="p-3.5 rounded-2xl bg-white hover:bg-[#FBF1DF] border border-[#E8E3DA] hover:border-[#D29324] text-xs font-semibold text-[#252525] hover:text-[#AE7419] transition-all text-left flex items-start gap-2.5 shadow-2xs group cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#D29324] group-hover:scale-110 transition-transform shrink-0 mt-0.5" />
                        <span className="leading-snug">{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* ACTIVE CONVERSATION FEED */
              <div className="space-y-6 pb-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    {/* User Message */}
                    {msg.sender === "user" ? (
                      <div className="max-w-[85%] sm:max-w-[70%] bg-gradient-to-r from-[#D29324] to-[#AE7419] text-white p-4 rounded-2xl rounded-tr-xs shadow-md">
                        <p className="text-xs sm:text-sm font-medium leading-relaxed">
                          {msg.text}
                        </p>
                        <span className="text-[10px] text-white/75 block text-right mt-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    ) : (
                      /* AI Assistant Message */
                      <div className="w-full bg-white rounded-2xl border border-[#E8E3DA] p-5 sm:p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E8E3DA]">
                          <div className="w-6 h-6 rounded-full bg-[#FBF1DF] text-[#D29324] flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-[#AE7419] uppercase tracking-wider">
                            Aura AI Property Advisory
                          </span>
                          <span className="text-[10px] text-[#6B7280] ml-auto">
                            {msg.timestamp}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-[#252525]">
                            {msg.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#6B7280] mt-1 leading-relaxed">
                            {msg.summary}
                          </p>
                        </div>

                        {/* Bulleted Points */}
                        <ul className="space-y-2 pt-1">
                          {msg.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-[#252525] leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Recommended Project Cards Matching Query */}
                        {msg.cards && msg.cards.length > 0 && (
                          <div className="pt-3 space-y-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#AE7419] block">
                              Verified Projects Shortlisted:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {msg.cards.map((proj) => (
                                <div
                                  key={proj.id}
                                  className="bg-[#FAF8F4] rounded-xl border border-[#E8E3DA] overflow-hidden p-3 flex flex-col justify-between group hover:border-[#D29324] transition-all"
                                >
                                  <div>
                                    <div className="flex justify-between items-start gap-2 mb-1.5">
                                      <Link
                                        href={`/projects/${getProjectSlug(proj)}`}
                                        className="text-xs font-bold text-[#252525] group-hover:text-[#AE7419] transition-colors line-clamp-1 flex-1"
                                      >
                                        {proj.name}
                                      </Link>
                                      <div className="flex items-center gap-1 shrink-0">
                                        <span className="text-[10px] font-bold text-[#D29324]">
                                          ₹{proj.price}
                                        </span>
                                        <WishlistButton project={proj} size="sm" variant="minimal" />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-[11px] text-[#6B7280] mb-2">
                                      <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                                      <span className="truncate">{proj.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-[#6B7280] pb-2 border-b border-gray-200">
                                      <span>By {proj.builder}</span>
                                      <span>•</span>
                                      <span>{proj.flatTypes}</span>
                                    </div>
                                  </div>

                                  <div className="pt-2 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-emerald-600">
                                      0% Brokerage Verified
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEnquiryModal(proj)}
                                      className="px-2.5 py-1 rounded-lg bg-[#D29324] hover:bg-[#AE7419] text-white text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                                    >
                                      Inquire Details →
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Follow-up Prompts */}
                        {msg.followUps && (
                          <div className="pt-2 flex flex-wrap items-center gap-2">
                            <span className="text-[11px] text-[#6B7280] font-medium">Follow-up:</span>
                            {msg.followUps.map((f, fIdx) => (
                              <button
                                key={fIdx}
                                type="button"
                                onClick={() => handleSendMessage(f)}
                                className="px-3 py-1 rounded-full bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] hover:border-[#D29324] text-[11px] font-semibold text-[#252525] transition-all cursor-pointer"
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Demo Disclaimer */}
                        <div className="text-[10px] text-[#6B7280] pt-2 border-t border-[#E8E3DA] italic">
                          ℹ️ Aura AI Demo Assistant: Recommendations are simulated based on local verified developer inventory. Zero Brokerage Guarantee applies to all partner bookings.
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-[#6B7280] bg-white p-3.5 rounded-2xl border border-[#E8E3DA] w-fit">
                    <Sparkles className="w-4 h-4 text-[#D29324] animate-spin" />
                    <span>Aura AI is analyzing verified developer inventory...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* ================= FIXED BOTTOM INPUT BAR ================= */}
          <div className="bg-white border-t border-[#E8E3DA] p-4 shrink-0 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 bg-[#FAF8F4] rounded-full border border-[#E8E3DA] focus-within:border-[#D29324] focus-within:ring-2 focus-within:ring-[#D29324]/20 p-1.5 transition-all"
              >
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Ask AI..."
                  className="flex-1 px-4 py-2 text-xs sm:text-sm text-[#252525] placeholder-gray-400 bg-transparent focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={!queryInput.trim()}
                  className="w-9 h-9 rounded-full bg-[#D29324] hover:bg-[#AE7419] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs shrink-0"
                  title="Send Query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <p className="text-[11px] text-[#6B7280] text-center mt-2">
                Ask a clear and specific question to get the most accurate results.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= MODAL: Let's Find Your Dream Home ================= */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-[#E8E3DA] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-[#FAF8F4] border-b border-[#E8E3DA]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE7419]">
                  Personalized Advisory
                </span>
                <h3 className="text-lg font-bold text-[#252525]">
                  Let&apos;s Find Your Dream Home
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEnquiryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 border border-[#E8E3DA] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {enquirySubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#252525]">
                    Inquiry Shortlist Registered!
                  </h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    Thank you, <strong>{enquiryForm.name}</strong>. Our certified property advisor for{" "}
                    <strong>{enquiryProject ? enquiryProject.name : "your chosen locality"}</strong>{" "}
                    will contact you at <strong>{enquiryForm.phone}</strong> with complete floor plans, pricing sheets, and direct builder offers.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEnquiryModalOpen(false)}
                      className="px-6 py-2 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white text-xs font-bold cursor-pointer"
                    >
                      Continue Exploring
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  {enquiryProject && (
                    <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E8E3DA] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#252525] block">{enquiryProject.name}</span>
                        <span className="text-[11px] text-[#6B7280]">{enquiryProject.location}</span>
                      </div>
                      <span className="font-bold text-[#D29324]">₹{enquiryProject.price}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#252525] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      placeholder="e.g. Rajiv Mehra"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252525] mb-1">
                      Phone Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E8E3DA] bg-[#FAF8F4] text-xs font-bold text-[#6B7280]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-[#E8E3DA] bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#252525] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      placeholder="rajiv@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3DA] bg-white text-xs text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#D29324]"
                    />
                  </div>

                  {/* Checkboxes matching reference */}
                  <div className="space-y-2 pt-1 text-xs text-[#252525]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enquiryForm.allowSellers}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, allowSellers: e.target.checked })}
                        className="w-4 h-4 accent-[#D29324] rounded"
                      />
                      <span>Allow verified developer partners to contact me</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enquiryForm.whatsappUpdates}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, whatsappUpdates: e.target.checked })}
                        className="w-4 h-4 accent-[#D29324] rounded"
                      />
                      <span>Get WhatsApp updates with shortlisted units &amp; price sheets</span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={enquirySubmitting}
                      className="w-full py-3 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-70"
                    >
                      {enquirySubmitting ? "Processing..." : "Proceed"}
                    </button>
                  </div>

                  {/* DNC Disclaimer matching reference */}
                  <p className="text-[10px] text-[#6B7280] leading-snug">
                    I authorize AuraLiving and its certified representatives to Call, SMS, Email, or WhatsApp me about property options and developer offers. This consent overrides any DNC/NDNC registration.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
