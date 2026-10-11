"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, CheckCircle2, Phone, Mail, User, MapPin } from "lucide-react";
import { submitLead } from "@/lib/api";
import { CITIES } from "@/data";

export default function ConsultationForm({ selectedCity }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: selectedCity || "mumbai",
    agree: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    await submitLead(formData);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="consultation_form" className="py-16 bg-white border-b border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF8F4] via-white to-[#FBF1DF] rounded-3xl border border-[#E8E3DA] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Column: Trust & Highlights */}
            <div className="lg:col-span-5 p-8 sm:p-12 text-center lg:text-left space-y-4">
              {/* Star Rating */}
              <div className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-[#E8E3DA] shadow-2xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-gray-800 ml-1">4.9 / 5</span>
              </div>

              <div className="text-xs uppercase font-bold text-[#AE7419] tracking-wider">
                Trusted by 50,000+ Home Buyers
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight leading-tight">
                FREE Expert <span className="text-[#D29324]">Consultation</span>
              </h2>

              <p className="text-sm text-[#6B7280] leading-relaxed">
                Connect with our certified property advisors. Get tailored project options, site visit arrangements, zero brokerage verification, and instant bank pre-approvals.
              </p>

              <div className="space-y-2.5 pt-2 text-xs font-medium text-gray-700">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0" />
                  <span>100% Free Service — Zero Brokerage Guaranteed</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0" />
                  <span>Dedicated Relationship Manager Assigned</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D29324] shrink-0" />
                  <span>Exclusive Pre-Launch Developer Pricing</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Form */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-white border-t lg:border-t-0 lg:border-l border-[#E8E3DA]">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#252525]">
                    Talk to a Property Expert Today
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Fill in your details below and an expert will call you back within 15 minutes.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-[#FAF8F4] border border-[#E8E3DA] text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#FBF1DF] text-[#D29324] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-[#252525]">Consultation Booked!</h4>
                    <p className="text-xs text-[#6B7280]">
                      Thank you, <strong>{formData.name}</strong>. Our senior property advisor will reach out to you shortly on <strong>+91 {formData.phone}</strong>.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 rounded-xl bg-[#D29324] text-white text-xs font-semibold hover:bg-[#AE7419] transition-colors"
                    >
                      Book Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Amit Verma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] text-sm focus:border-[#D29324] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#E8E3DA] bg-gray-50 text-gray-600 text-sm">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="9876543210"
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-r-xl border border-[#E8E3DA] text-sm focus:border-[#D29324] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                          <input
                            type="email"
                            placeholder="amit@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] text-sm focus:border-[#D29324] focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          City of Interest
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                          <select
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E3DA] text-sm focus:border-[#D29324] focus:outline-hidden bg-white"
                          >
                            {CITIES.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="c-agree"
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="mt-1 accent-[#D29324] rounded"
                      />
                      <label htmlFor="c-agree" className="text-[11px] text-gray-500 leading-snug">
                        I authorize AuraLiving to contact me via Call, SMS, and WhatsApp regarding property recommendations and project pricing.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-[#D29324] hover:bg-[#AE7419] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? "Booking Your Consultation..." : "Get Free Expert Consultation"}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D29324]" />
                      <span>Zero Spam • Your privacy is strictly protected</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
