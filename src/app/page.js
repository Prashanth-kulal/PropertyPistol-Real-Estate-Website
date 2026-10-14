"use client";

import React, { useState } from "react";
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
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isConverterModalOpen, setIsConverterModalOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState(null);

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
        onSelectCity={(cityId) => setSelectedCity(cityId)}
        onOpenCityModal={() => setIsCityModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onSearch={(query) => setSearchQuery(query)}
      />

      {/* 3. AuraLiving Exclusive Showcase */}
      <ExclusiveShowcase onInquireProject={handleInquire} />

      {/* 4. Top Projects Section */}
      <TopProjects
        selectedCity={selectedCity}
        onSelectCity={(cityId) => setSelectedCity(cityId)}
        onInquireProject={handleInquire}
        searchFilter={searchQuery}
      />

      {/* 5. Top Cities Section */}
      <TopCities onSelectCity={(cityId) => setSelectedCity(cityId)} />

      {/* 6. 2,000+ Developers Under One Roof */}
      <DevelopersSection />

      {/* 7. Achievements Counter */}
      <AchievementsCounter />

      {/* 8. Piston AI Section (Image on Left, AI Console on Right) */}
      <PistonAiSection onOpenAiModal={() => setIsAiModalOpen(true)} />

      {/* 9. AuraLiving Shots / Tools */}
      <AuraShots
        onOpenEmi={() => setIsEmiModalOpen(true)}
        onOpenConverter={() => setIsConverterModalOpen(true)}
        onOpenConsultation={() => {
          const el = document.getElementById("consultation_form");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 9. FREE Expert Consultation Form */}
      <ConsultationForm selectedCity={selectedCity} />

      {/* 10. Testimonials & Pan-India Reach */}
      <TestimonialsSection />

      {/* 11. Footer */}
      <Footer />

      {/* --- Interactive Modals --- */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(cityId) => setSelectedCity(cityId)}
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
