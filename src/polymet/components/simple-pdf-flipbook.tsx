import React, { useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Download, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimplePDFFlipbookProps {
  pdfUrl: string;
  title?: string;
}

const SimplePDFFlipbook: React.FC<SimplePDFFlipbookProps> = ({ pdfUrl, title }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pages = [
    { 
      number: 1, 
      title: "TMPL ESCAPADE",
      subtitle: "Antarctic Expedition Cruise",
      content: "12-DAY DETAILED ITINERARY",
      details: [
        "Welcome to the Journey of a Lifetime",
        "",
        "Experience the pristine wilderness and incredible wildlife of Antarctica on this luxury expedition cruise.",
        "",
        "Package Highlights:",
        "• 12 days of Antarctic exploration",
        "• Luxury ice-class expedition ship",
        "• Expert naturalist guides",
        "• Daily Zodiac excursions",
        "• All meals and accommodations included",
        "• Expedition gear provided",
        "",
        "Departure: Ushuaia, Argentina",
        "Duration: 12 Days / 11 Nights",
        "Group Size: 20-100 Passengers"
      ]
    },
    {
      number: 2,
      title: "DAY-BY-DAY ITINERARY",
      content: "Days 1-4",
      details: [
        "Day 1: Embarkation in Ushuaia",
        "Board your luxury expedition ship in Ushuaia. Meet your expedition team and fellow travelers during welcome reception.",
        "",
        "Day 2-3: Drake Passage Crossing",
        "Cross the famous Drake Passage towards Antarctica. Attend fascinating lectures about wildlife and history.",
        "",
        "Day 4: First Antarctic Landing",
        "Your first steps on the Antarctic continent! Zodiac landing to observe penguin colonies."
      ]
    },
    {
      number: 3,
      title: "ANTARCTIC EXPLORATION",
      content: "Days 5-9",
      details: [
        "Day 5-6: Antarctic Peninsula",
        "Explore stunning landscapes with daily Zodiac excursions. Visit research stations and penguin rookeries.",
        "",
        "Day 7-8: Wildlife Encounters",
        "Search for humpback and minke whales. Visit emperor penguin colonies.",
        "",
        "Day 9: Deception Island",
        "Explore volcanic caldera. Optional kayaking adventures available ($250)."
      ]
    },
    {
      number: 4,
      title: "RETURN JOURNEY",
      content: "Days 10-12",
      details: [
        "Day 10-11: Return via Drake",
        "Journey back with photography workshops and farewell dinner.",
        "",
        "Day 12: Disembarkation",
        "Final breakfast and transfer to airport.",
        "",
        "What's Included:",
        "✓ Luxury accommodation",
        "✓ All gourmet meals",
        "✓ Expert guides",
        "✓ Daily excursions"
      ]
    },
    {
      number: 5,
      title: "ESSENTIAL INFO",
      content: "Packing & Requirements",
      details: [
        "What to Pack:",
        "• Waterproof jacket",
        "• Insulated gloves",
        "• Warm hat and sun hat",
        "• High SPF sunscreen",
        "• Motion sickness medication",
        "• Camera with extra batteries",
        "",
        "Requirements:",
        "✗ Travel insurance (mandatory)",
        "✗ Valid passport (6 months)",
        "✗ Medical clearance"
      ]
    },
    {
      number: 6,
      title: "PRICING & BOOKING",
      content: "Ready to Explore?",
      details: [
        "Base Price: RM 15,000/person",
        "Early Bird: Save RM 1,500",
        "",
        "Departure Dates:",
        "• December 15-26, 2024",
        "• January 20-31, 2025",
        "• February 25 - March 8, 2025",
        "",
        "Contact Us:",
        "📞 +60 19 661 6388",
        "📧 info@tmplescapade.my",
        "🌐 www.tmplescapade.my"
      ]
    }
  ];

  const totalPages = pages.length;

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const goToPreviousPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title ? `${title}.pdf` : 'itinerary.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-8 shadow-2xl"
      style={{ minHeight: '800px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title || 'Travel Itinerary'}</h3>
          <p className="text-gray-600">Page {currentPage + 1} of {totalPages}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="sm"
          >
            {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Flipbook */}
      <div className="flex items-center justify-center">
        <HTMLFlipBook
          ref={flipBookRef}
          width={420}
          height={594}
          size="fixed"
          minWidth={315}
          maxWidth={420}
          minHeight={445}
          maxHeight={594}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="flipbook-container"
          style={{}}
          startPage={0}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((page) => (
            <div
              key={page.number}
              className="bg-white shadow-xl"
              style={{
                padding: '60px 70px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                lineHeight: '1.8'
              }}
            >
              {/* Page Number - Bottom */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                Page {page.number}
              </div>

              {/* Title - Centered */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center leading-tight">
                {page.title}
              </h1>

              {/* Subtitle - Centered */}
              {page.subtitle && (
                <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center leading-relaxed">
                  {page.subtitle}
                </h2>
              )}
              
              {/* Content Subtitle - Centered */}
              <div className="text-xl font-semibold text-gray-900 mb-12 text-center">
                {page.content}
              </div>

              {/* Details - Better spacing */}
              <div className="flex-1">
                {page.details.map((detail, idx) => (
                  <p
                    key={idx}
                    className={`${
                      detail.startsWith('•')
                        ? 'text-base text-gray-800 ml-0 mb-3 leading-relaxed'
                        : detail.startsWith('✗')
                        ? 'text-base text-gray-800 ml-0 mb-3 leading-relaxed'
                        : detail.includes(':') && !detail.includes('•')
                        ? 'font-semibold text-gray-900 mt-8 mb-4 text-base leading-relaxed'
                        : detail === ''
                        ? 'mb-4'
                        : 'text-base text-gray-800 mb-4 leading-relaxed'
                    }`}
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-6 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>

        <div className="bg-white px-6 py-3 rounded-xl shadow-lg">
          <span className="text-xl font-bold text-gray-900">
            {currentPage + 1} / {totalPages}
          </span>
        </div>

        <Button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-6 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {pages.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx === currentPage
                ? 'w-8 bg-yellow-500'
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Hint */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          💡 Click page edges or use buttons to flip pages
        </p>
      </div>

      <style>{`
        .flipbook-container {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .flipbook-container > div {
          margin: 0 !important;
        }
        
        .flipbook-container .stf__item {
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default SimplePDFFlipbook;
