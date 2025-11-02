import React from "react";
import { HeroBannerWithLocations } from "@/polymet/components/hero-banner-with-locations";
import { ContinentCarousel } from "@/polymet/components/continent-carousel";
import { GalleryGrid } from "@/polymet/components/gallery-grid";
import { CustomerReviewCarousel } from "@/polymet/components/customer-review-carousel";
import {
  heroSlides,
  continents,
  galleryImages,
  customerReviews,
} from "@/polymet/data/customer-data";

export function CustomerHome() {
  return (
    <div className="w-full">
      {/* Hero Banner with Featured Locations */}
      <HeroBannerWithLocations slides={heroSlides} />

      {/* Continent Selection Carousel */}
      <ContinentCarousel continents={continents} />

      {/* Gallery Section */}
      <GalleryGrid images={galleryImages} />

      {/* Customer Reviews */}
      <CustomerReviewCarousel reviews={customerReviews} />
    </div>
  );
}
