import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSlide } from "@/polymet/data/customer-data";

export interface HeroBannerWithLocationsProps {
  slides: HeroSlide[];
  className?: string;
}

export function HeroBannerWithLocations({
  slides,
  className = "",
}: HeroBannerWithLocationsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={slide.backgroundImage}
          alt={slide.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 w-full items-center">
          {/* Left Side - Title and CTA */}
          <div className="space-y-6 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {slide.title}
              </h1>
              <p className="text-base lg:text-lg text-white/90">
                {slide.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full w-14 h-14 p-0"
              >
                <Home className="w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm font-semibold"
              >
                Discover Location
              </Button>
            </div>
          </div>

          {/* Right Side - Location Cards Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {slide.featuredLocations.map((location) => (
                <Link
                  key={location.id}
                  to={location.packageId ? `/packages/${location.packageId}` : `/packages?location=${location.region}`}
                  className="group cursor-pointer transition-transform hover:scale-105"
                >
                  <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={location.image}
                      alt={location.region}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-xs font-semibold tracking-wider mb-1 opacity-90">
                        {location.region}
                      </p>
                      <h3 className="text-xl font-bold mb-1">
                        {location.title}
                      </h3>
                      <p className="text-xs font-medium">
                        {location.countries.join(", ")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-12 h-12"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-12 h-12"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-2 h-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          <span className="text-white text-2xl font-bold mt-2">
            {currentSlide + 1}
          </span>
        </div>
      )}
    </div>
  );
}
