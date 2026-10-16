"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  HeartHandshake,
  Send,
  X
} from "lucide-react";

const OPEN_POSITIONS = [
  {
    id: "job-1",
    title: "Senior Real Estate Investment Advisor",
    department: "Sales & Advisory",
    location: "Mumbai (BKC / Andheri)",
    type: "Full-Time",
    experience: "3-6 Years",
    description: "Provide high-net-worth clients and luxury home buyers with personalized portfolio advisory, project tours, and deal structuring across premier residential developments."
  },
  {
    id: "job-2",
    title: "Enterprise Developer Relationship Manager",
    department: "Builder Alliances",
    location: "Turbhe, Navi Mumbai",
    type: "Full-Time",
    experience: "4-8 Years",
    description: "Build institutional relationships with Tier-1 real estate developers, securing exclusive launch mandates, pricing advantages, and digital marketing partnerships."
  },
  {
    id: "job-3",
    title: "Senior Full Stack Engineer (Next.js / Python)",
    department: "Technology & AI",
    location: "Turbhe / Hybrid",
    type: "Full-Time",
    experience: "3-5 Years",
    description: "Architect and scale AuraLiving's digital platform, AI recommendation engines (Piston AI), interactive transit maps, and mortgage estimation tools."
  },
  {
    id: "job-4",
    title: "RERA Legal Compliance & Title Specialist",
    department: "Legal & Diligence",
    location: "Mumbai / Pune",
    type: "Full-Time",
    experience: "2-5 Years",
    description: "Conduct rigorous title searches, MahaRERA document scrutiny, building sanction verifications, and draft zero-defect conveyance documentation."
  },
  {
    id: "job-5",
    title: "Growth Marketing & SEO Lead",
    department: "Marketing",
    location: "Mumbai",
    type: "Full-Time",
    experience: "3-7 Years",
    description: "Drive high-intent homebuyer acquisition across organic search, performance channels, hyperlocal content hubs, and social campaigns."
  },
  {
    id: "job-6",
    title: "NRI Portfolio Concierge Specialist",
    department: "Global NRI Desk",
    location: "Mumbai / Dubai",
    type: "Full-Time",
    experience: "3-6 Years",
    description: "Manage cross-border investment inquiries from GCC, US, and UK diaspora, coordinating virtual site walkthroughs and FEMA-compliant fund repatriation."
  }
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("all");
  const [activeJob, setActiveJob] = useState(null);
  const [applicationSent, setApplicationSent] = useState(false);
  const [applicantForm, setApplicantForm] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    note: ""
  });

  const departments = ["all", "Sales & Advisory", "Builder Alliances", "Technology & AI", "Legal & Diligence", "Marketing", "Global NRI Desk"];

  const filteredJobs = OPEN_POSITIONS.filter(
    (job) => selectedDept === "all" || job.department === selectedDept
  );

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setApplicationSent(true);
    setTimeout(() => {
      setApplicationSent(false);
      setActiveJob(null);
      setApplicantForm({ name: "", email: "", phone: "", portfolio: "", note: "" });
    }, 2800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#252525]">
      <Header selectedCity="mumbai" onOpenCityModal={() => {}} onOpenAiModal={() => {}} onSearchQuery={() => {}} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#1F1F1F] via-[#2A2A2A] to-[#1F1F1F] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D29324_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#D29324] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We&apos;re Hiring Leaders & Innovators</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Build the Future of <span className="text-[#D29324]">Zero-Brokerage</span> Real Estate
          </h1>
          <p className="mt-5 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Join 1,200+ passionate technologists, advisory experts, and industry innovators revolutionizing how India searches, evaluates, and buys property.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">15+</div>
              <div className="text-xs text-gray-400 mt-1">Metro City Hubs</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">₹12,000 Cr+</div>
              <div className="text-xs text-gray-400 mt-1">Gross Inventory Value</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">30,000+</div>
              <div className="text-xs text-gray-400 mt-1">Happy Families Served</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D29324]">1,200+</div>
              <div className="text-xs text-gray-400 mt-1">Full-Time Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]">Why Build Your Career at AuraLiving?</h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">Empowering you with autonomy, market-leading rewards, and accelerated career trajectories.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E8E3DA] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#D29324]/10 text-[#D29324] flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1C1C1C] mb-2">High-Growth Compensation</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Competitive industry fixed compensation coupled with uncapped milestone bonuses and quarterly equity incentives for standout performance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8E3DA] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#D29324]/10 text-[#D29324] flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1C1C1C] mb-2">Merit-Driven Culture</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero office bureaucracy. Fast-track leadership promotions based purely on business impact, customer delight, and personal initiative.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8E3DA] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#D29324]/10 text-[#D29324] flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1C1C1C] mb-2">Comprehensive Wellness</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Premium family health insurance coverage, wellness stipends, paid parental leaves, and dedicated leadership mentorship programs.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-16 bg-white border-t border-[#E8E3DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1C1C1C]">Current Openings</h2>
              <p className="text-xs sm:text-sm text-gray-600">Select a department to browse available positions across our regional offices.</p>
            </div>
            <div className="text-xs font-semibold text-[#D29324]">
              {filteredJobs.length} Positions Available
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedDept === dept
                    ? "bg-[#D29324] text-white shadow-sm"
                    : "bg-[#F3EFE6] text-gray-700 hover:bg-[#E8E3DA]"
                }`}
              >
                {dept === "all" ? "All Departments" : dept}
              </button>
            ))}
          </div>

          {/* Job Listings Grid */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-2xl border border-[#E8E3DA] bg-white hover:border-[#D29324] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D29324] bg-[#D29324]/10 px-2.5 py-0.5 rounded-md">
                      {job.department}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {job.location}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {job.experience}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C] group-hover:text-[#D29324] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-gray-600 max-w-2xl leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <button
                  onClick={() => setActiveJob(job)}
                  className="shrink-0 px-5 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#D29324] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-[#E8E3DA]">
            <button
              onClick={() => setActiveJob(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {applicationSent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Application Submitted!</h3>
                <p className="text-xs text-gray-600 mt-2">
                  Thank you for applying for <span className="font-semibold">{activeJob.title}</span>. Our recruitment team will review your profile and reach out shortly.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D29324] bg-[#D29324]/10 px-2 py-0.5 rounded">
                    {activeJob.department}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2">
                    Apply for {activeJob.title}
                  </h3>
                  <p className="text-xs text-gray-500">{activeJob.location} • {activeJob.experience}</p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D29324]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D29324]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={applicantForm.phone}
                        onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D29324]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">LinkedIn Profile or Resume Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://linkedin.com/in/profile or Google Drive link"
                      value={applicantForm.portfolio}
                      onChange={(e) => setApplicantForm({ ...applicantForm, portfolio: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D29324]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Brief Note / Why You&apos;re a Great Fit</label>
                    <textarea
                      rows={3}
                      placeholder="Highlight relevant real estate or technology experience..."
                      value={applicantForm.note}
                      onChange={(e) => setApplicantForm({ ...applicantForm, note: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D29324]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
