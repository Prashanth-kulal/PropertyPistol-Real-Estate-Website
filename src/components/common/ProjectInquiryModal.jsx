"use client";

import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, Phone, Mail, User } from "lucide-react";
import { submitLead } from "@/lib/api";

export default function ProjectInquiryModal({ isOpen, onClose, project }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "This Weekend",
    agree: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    await submitLead({
      ...formData,
      projectId: project.id,
      projectName: project.name,
      city: project.city
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E3DA] bg-[#FAF8F4]">
          <div>
            <span className="text-xs font-semibold uppercase text-[#D29324] tracking-wider">
              Zero Brokerage VIP Advisory
            </span>
            <h3 className="text-lg font-bold text-[#252525] truncate max-w-xs sm:max-w-md">
              {project.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#FBF1DF] text-[#D29324] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-[#252525]">Inquiry Received!</h4>
            <p className="text-sm text-[#6B7280]">
              Our certified real estate specialist for <strong>{project.name}</strong> will contact you within 15 minutes with complete pricing sheets, floor plans, and exclusive builder discounts.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-[#D29324] text-white font-medium hover:bg-[#AE7419] transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Project Summary Banner */}
            <div className="bg-[#FAF8F4] p-3.5 rounded-xl border border-[#E8E3DA] flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                <img
                  src={project.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-sm text-[#252525]">{project.location}</div>
                <div className="text-[#6B7280]">By {project.builder} • {project.flatTypes}</div>
                <div className="text-[#AE7419] font-bold text-sm">Starting at ₹{project.price}</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-[#E8E3DA] rounded-lg text-sm focus:border-[#D29324] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number *</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#E8E3DA] bg-gray-50 text-gray-600 text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E3DA] rounded-r-lg text-sm focus:border-[#D29324] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address (Optional)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-[#E8E3DA] rounded-lg text-sm focus:border-[#D29324] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="agree"
                checked={formData.agree}
                onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                className="mt-1 accent-[#D29324] rounded"
              />
              <label htmlFor="agree" className="text-xs text-gray-500 leading-snug">
                I agree to be contacted by AuraLiving property advisors via call/WhatsApp. RERA verified zero brokerage policy applies.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-[#D29324] text-white font-semibold text-sm hover:bg-[#AE7419] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {submitting ? "Sending Request..." : "Request Call Back & Brochure"}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#D29324]" />
              <span>100% Privacy Protection • Never Spammed</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
