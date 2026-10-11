"use client";

import React, { useState } from "react";
import { X, Calculator, IndianRupee } from "lucide-react";

export default function EmiCalculatorModal({ isOpen, onClose }) {
  const [loanAmount, setLoanAmount] = useState(7500000); // 75 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  if (!isOpen) return null;

  // Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E3DA] bg-[#FAF8F4]">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#D29324]" />
            <h3 className="text-lg font-semibold text-[#252525]">Home Loan EMI Calculator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Output Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF8F4] to-[#FBF1DF] border border-[#E8E3DA] text-center space-y-1">
            <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
              Estimated Monthly EMI
            </p>
            <div className="text-3xl font-extrabold text-[#AE7419]">
              {formatCurrency(emi)} <span className="text-xs font-normal text-gray-600">/ month</span>
            </div>
            <div className="flex justify-center gap-6 pt-3 text-xs text-gray-600 border-t border-[#E8E3DA]/80 mt-3">
              <div>
                Principal: <strong className="text-gray-900">{formatCurrency(loanAmount)}</strong>
              </div>
              <div>
                Total Interest: <strong className="text-gray-900">{formatCurrency(totalInterest)}</strong>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-gray-700">Loan Amount</span>
                <span className="text-[#AE7419] font-bold">{formatCurrency(loanAmount)}</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="50000000"
                step="500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-[#D29324]"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>₹10 Lakhs</span>
                <span>₹5 Crores</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-gray-700">Interest Rate (% p.a.)</span>
                <span className="text-[#AE7419] font-bold">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="6.5"
                max="14.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#D29324]"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>6.5%</span>
                <span>14.0%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-gray-700">Loan Tenure</span>
                <span className="text-[#AE7419] font-bold">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#D29324]"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>5 Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#D29324] text-white font-medium text-sm hover:bg-[#AE7419] transition-colors"
            >
              Done Calculating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
