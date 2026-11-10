"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import ExclusiveShowcase from "@/components/home/ExclusiveShowcase";
import TopProjects from "@/components/home/TopProjects";
import TopCities from "@/components/home/TopCities";
import DevelopersSection from "@/components/home/DevelopersSection";
import AchievementsCounter from "@/components/home/AchievementsCounter";
import PistonAiSection from "@/components/home/PistonAiSection";
import AuraShots from "@/components/home/AuraShots";
import ConsultationForm from "@/components/home/ConsultationForm";
import TestimonialsSection from "@/components/home/TestimonialsSection";

// Interactive Modals
import CitySelectorModal from "@/components/common/CitySelectorModal";
import ProjectInquiryModal from "@/components/common/ProjectInquiryModal";
import EmiCalculatorModal from "@/components/common/EmiCalculatorModal";
import UnitConverterModal from "@/components/common/UnitConverterModal";
import AuraAiModal from "@/components/common/AuraAiModal";

export default function HomePage() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isConverterModalOpen, setIsConverterModalOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState(null);

  // Smooth scroll reveal observer
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.querySelectorAll(".reveal-on-scroll, .reveal-fade").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const targets = document.querySelectorAll(".reveal-on-scroll, .reveal-fade");
    targets.forEach((el) => observer.observe(el));

    // Safety fallback: reveal all elements after 1.8s in case of edge scenarios
    const safetyTimeout = setTimeout(() => {
      document.querySelectorAll(".reveal-on-scroll, .reveal-fade").forEach((el) => {
        el.classList.add("is-revealed");
      });
    }, 1800);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimeout);
    };
  }, []);

  const handleInquire = (project) => {
    setInquiryProject(project);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#D29324] selection:text-white">
      {/* 1. Header with Sticky Search Bar & Nav */}
      <Header
        selectedCity={selectedCity}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onSearchQuery={(q) => setSearchQuery(q)}
      />

      {/* 2. Hero Banner & Search Panel */}
      <HeroBanner
        selectedCity={selectedCity}
        onSelectCity={(cityId) => {
          setSelectedCity(cityId);
          router.push(`/${cityId}`);
        }}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onSearch={(query) => setSearchQuery(query)}
      />

      {/* 3. AuraLiving Exclusive Showcase */}
      <div className="reveal-on-scroll">
        <ExclusiveShowcase onInquireProject={handleInquire} />
      </div>

      {/* 4. Top Projects Section */}
      <div className="reveal-on-scroll">
        <TopProjects
          selectedCity={selectedCity}
          onSelectCity={(cityId) => setSelectedCity(cityId)}
          onInquireProject={handleInquire}
          searchFilter={searchQuery}
        />
      </div>

      {/* 5. Top Cities Section */}
      <div className="reveal-on-scroll">
        <TopCities onSelectCity={(cityId) => setSelectedCity(cityId)} />
      </div>

      {/* 6. 2,000+ Developers Under One Roof */}
      <div className="reveal-on-scroll">
        <DevelopersSection />
      </div>

      {/* 7. Achievements Counter */}
      <div className="reveal-on-scroll">
        <AchievementsCounter />
      </div>

      {/* 8. Piston AI Section (Image on Left, AI Console on Right) */}
      <div className="reveal-on-scroll">
        <PistonAiSection onOpenAiModal={() => setIsAiModalOpen(true)} />
      </div>

      {/* 9. AuraLiving Shots / Tools */}
      <div className="reveal-on-scroll">
        <AuraShots
          onOpenEmi={() => setIsEmiModalOpen(true)}
          onOpenConverter={() => setIsConverterModalOpen(true)}
          onOpenConsultation={() => {
            const el = document.getElementById("consultation_form");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* 9. FREE Expert Consultation Form */}
      <div className="reveal-on-scroll">
        <ConsultationForm selectedCity={selectedCity} />
      </div>

      {/* 10. Testimonials & Pan-India Reach */}
      <div className="reveal-on-scroll">
        <TestimonialsSection />
      </div>

      {/* 11. Footer */}
      <Footer />

      {/* --- Interactive Modals --- */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(cityId) => {
          setSelectedCity(cityId);
          setIsCityModalOpen(false);
          router.push(`/${cityId}`);
        }}
      />

      <ProjectInquiryModal
        isOpen={!!inquiryProject}
        onClose={() => setInquiryProject(null)}
        project={inquiryProject}
      />

      <EmiCalculatorModal
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
      />

      <UnitConverterModal
        isOpen={isConverterModalOpen}
        onClose={() => setIsConverterModalOpen(false)}
      />

      <AuraAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectProject={handleInquire}
      />
    </div>
  );
}
