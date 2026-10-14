"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CategoryListingPage from "@/components/category/CategoryListingPage";

function NewProjectsPageContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "mumbai";
  return <CategoryListingPage cityId={city} categorySlug="new-projects" />;
}

export default function NewProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-[#D29324] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <NewProjectsPageContent />
    </Suspense>
  );
}
