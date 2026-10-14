"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import CategoryListingPage from "@/components/category/CategoryListingPage";

function CityCategoryPageContent() {
  const params = useParams();
  const rawCity = params?.city;
  const rawSlug = params?.slug;

  const city = Array.isArray(rawCity) ? rawCity[0] : rawCity || "mumbai";
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "new-projects";

  return <CategoryListingPage cityId={city} categorySlug={slug} />;
}

export default function CityCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CityCategoryPageContent />
    </Suspense>
  );
}
