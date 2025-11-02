import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryImage } from "@/polymet/data/customer-data";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface GalleryGridProps {
  images: GalleryImage[];
  showAll?: boolean;
  className?: string;
}

export function GalleryGrid({
  images,
  showAll = false,
  className = "",
}: GalleryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const displayImages = showAll ? images : images.slice(0, 6);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + images.length) % images.length
      );
    }
  };

  return (
    <>
      <section className={`py-20 relative ${className}`}>
        {/* Background Image with Black Fade */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Gallery Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="flex items-start justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-white mb-4">Gallery</h2>
              <p className="text-lg text-white/90">
                Cherished moments from our family adventures around the world,
                captured with TMPL Escapade. Every memory reflects a perfectly
                planned journey and joyful experiences together.
              </p>
            </div>
            {!showAll && (
              <Button
                variant="secondary"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                See More
              </Button>
            )}
          </div>

          {/* Masonry Grid - Matching Reference Layout */}
          <div className="grid grid-cols-3 auto-rows-[200px] gap-4">
            {displayImages.map((image, index) => {
              // Exact pattern from reference image:
              // Image 1: Tall left (row-span-2)
              // Image 2: Small middle-top (row-span-1) 
              // Image 3: Tall right (row-span-2)
              // Image 4: Small middle-bottom (row-span-1)
              // Image 5: Wide bottom-left (col-span-2, row-span-1)
              // Image 6: Small bottom-right (row-span-1)
              const masonryPatterns = [
                "col-span-1 row-span-2", // #1 Tall left
                "col-span-1 row-span-1", // #2 Small middle-top
                "col-span-1 row-span-2", // #3 Tall right
                "col-span-1 row-span-1", // #4 Small middle-bottom
                "col-span-2 row-span-1", // #5 Wide bottom-left
                "col-span-1 row-span-1", // #6 Small bottom-right
              ];
              
              const sizeClass = masonryPatterns[index % masonryPatterns.length];

              return (
                <button
                  key={image.id}
                  onClick={() => openLightbox(index)}
                  className={`relative overflow-hidden rounded-lg group cursor-pointer ${sizeClass}`}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-4">
                      <p className="font-semibold">{image.title}</p>
                      <p className="text-sm">{image.location}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent className="max-w-6xl w-full p-0 bg-black border-0">
          <DialogTitle className="sr-only">
            {selectedImageIndex !== null
              ? images[selectedImageIndex].title
              : "Gallery Image"}
          </DialogTitle>
          {selectedImageIndex !== null && (
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Image */}
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                <img
                  src={images[selectedImageIndex].url}
                  alt={images[selectedImageIndex].title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {images[selectedImageIndex].title}
                </h3>
                <p className="text-white/80">
                  {images[selectedImageIndex].location}
                </p>
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {selectedImageIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
