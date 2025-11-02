import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerReview } from "@/polymet/data/customer-data";

export interface CustomerReviewCarouselProps {
  reviews: CustomerReview[];
  className?: string;
}

export function CustomerReviewCarousel({
  reviews,
  className = "",
}: CustomerReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 3 reviews at a time on desktop, 1 on mobile
  const reviewsPerPage = 3;

  const nextReviews = () => {
    setCurrentIndex((prev) =>
      prev + reviewsPerPage >= reviews.length ? 0 : prev + reviewsPerPage
    );
  };

  const prevReviews = () => {
    setCurrentIndex((prev) =>
      prev - reviewsPerPage < 0
        ? Math.max(0, reviews.length - reviewsPerPage)
        : prev - reviewsPerPage
    );
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + reviewsPerPage
  );

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Customer Review</h2>
          <p className="text-lg text-muted-foreground">
            Discover traveler stories from wanderers who've journeyed with TMPL
            Escapade. Each review is a testament to the magic, care, and
            unforgettable memories we bring to every adventure.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevReviews}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full w-12 h-12 shadow-lg hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextReviews}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full w-12 h-12 shadow-lg hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((review) => (
              <Card
                key={review.id}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Review Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Star Rating */}
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-center text-muted-foreground leading-relaxed italic">
                    "{review.review}"
                  </p>

                  {/* Customer Name and Location */}
                  <div className="text-center pt-2">
                    <h3 className="font-semibold text-base">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({
              length: Math.ceil(reviews.length / reviewsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * reviewsPerPage)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / reviewsPerPage) === index
                    ? "bg-primary w-8"
                    : "bg-muted hover:bg-muted-foreground"
                }`}
                aria-label={`Go to review set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
