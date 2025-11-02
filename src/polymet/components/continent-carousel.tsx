import React from "react";
import { Link } from "react-router-dom";
import { Continent } from "@/polymet/data/customer-data";

export interface ContinentCarouselProps {
  continents: Continent[];
  className?: string;
}

export function ContinentCarousel({
  continents,
  className = "",
}: ContinentCarouselProps) {
  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Choose Your Travel Location
          </h2>
          <p className="text-lg text-muted-foreground">
            Embark on a journey where every choice blossoms into unforgettable
            memories. Let your heart guide you to the adventure that awaits.
          </p>
        </div>

        {/* Continent Cards - Even Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {continents.map((continent) => (
            <Link
              key={continent.id}
              to={`/packages?continent=${continent.id}`}
              className="group"
            >
              <div className="relative w-full h-72 rounded-[100px] overflow-hidden shadow-xl transition-transform hover:scale-105">
                  <img
                    src={continent.image}
                    alt={continent.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-3xl font-bold tracking-wider text-center px-4">
                      {continent.name}
                    </h3>
                  </div>
                </div>
              </Link>
          ))}
        </div>

        {/* Description */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Discover breathtaking destinations across all continents. From
            ancient wonders to modern marvels, each location offers unique
            experiences waiting to be explored.
          </p>
        </div>
      </div>
    </section>
  );
}
