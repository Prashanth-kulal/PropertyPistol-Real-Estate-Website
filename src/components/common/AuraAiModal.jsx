"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Sparkles, Send, Bot, Building, ArrowRight } from "lucide-react";

export default function AuraAiModal({ isOpen, onClose, onSelectProject }) {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am Aura AI, your smart real estate advisor. Tell me your preferred city, budget, BHK requirements, or work locality, and I will recommend curated zero-brokerage properties."
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "2 BHK in Powai or Sanpada under 2.8 Cr",
    "Luxury ready-to-move projects in Bangalore",
    "High rental yield investment in Dubai"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || prompt;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setPrompt("");
    setLoading(true);

    setTimeout(() => {
      let aiReply = "Based on current RERA verified inventory, here are the top 2 matching properties:";
      let suggestions = [
        {
          name: "Godrej Eternal Palms",
          slug: "godrej-eternal-palms",
          loc: "Sanpada, Navi Mumbai",
          price: "₹2.68 Cr",
          bhk: "2 & 3 BHK"
        },
        {
          name: "L&T Elixir Reserve",
          slug: "lt-elixir-reserve",
          loc: "Powai, Mumbai",
          price: "₹2.61 Cr",
          bhk: "2, 3 & 4 BHK"
        }
      ];

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: aiReply,
          cards: suggestions
        }
      ]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E8E3DA] max-w-lg w-full overflow-hidden flex flex-col h-[560px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E3DA] bg-gradient-to-r from-[#FAF8F4] to-[#FBF1DF]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D29324] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#252525] flex items-center gap-1.5">
                Aura AI Property Specialist
                <span className="text-[10px] bg-[#D29324] text-white px-1.5 py-0.5 rounded font-semibold">
                  LIVE
                </span>
              </h3>
              <p className="text-xs text-[#6B7280]">AI-powered personalized home matching</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-gray-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-[#FBF1DF] border border-[#D29324] text-[#D29324] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#D29324] text-white rounded-br-xs"
                    : "bg-white text-[#252525] border border-[#E8E3DA] shadow-xs rounded-bl-xs"
                }`}
              >
                <p>{m.text}</p>
                {m.cards && (
                  <div className="mt-3 space-y-2">
                    {m.cards.map((card, cidx) => (
                      <div
                        key={cidx}
                        className="p-2.5 rounded-xl border border-[#E8E3DA] bg-[#FAF8F4] flex items-center justify-between text-left"
                      >
                        <div>
                          <div className="font-bold text-[#252525]">{card.name}</div>
                          <div className="text-[11px] text-[#6B7280]">{card.loc} • {card.bhk}</div>
                          <div className="text-[11px] font-semibold text-[#AE7419]">{card.price}</div>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            router.push(`/projects/${card.slug}`);
                          }}
                          className="px-2.5 py-1 rounded-md bg-[#D29324] text-white text-[11px] font-medium hover:bg-[#AE7419] cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-xs text-[#6B7280] pl-9">
              <Sparkles className="w-3.5 h-3.5 text-[#D29324] animate-spin" />
              <span>Analyzing 30,000+ verified listings...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-white border-t border-[#E8E3DA] flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full border border-[#E8E3DA] text-[#6B7280] hover:border-[#D29324] hover:text-[#AE7419] transition-colors bg-[#FAF8F4]"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-[#E8E3DA] flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI: e.g. 3 BHK in Mumbai with balcony..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8E3DA] text-xs focus:border-[#D29324] focus:outline-hidden"
          />
          <button
            onClick={() => handleSend()}
            disabled={!prompt.trim()}
            className="p-2.5 rounded-xl bg-[#D29324] text-white hover:bg-[#AE7419] transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
