import React, { useState, useRef, useCallback, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFFlipbookProps {
  pdfUrl: string;
  title?: string;
}

const PDFFlipbook: React.FC<PDFFlipbookProps> = ({ pdfUrl, title }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate book dimensions based on container
  const [bookDimensions, setBookDimensions] = useState({
    width: 400,
    height: 550
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = window.innerHeight - 200;
        
        // Calculate optimal book size
        const pageWidth = Math.min(containerWidth / 2 - 40, 450);
        const pageHeight = Math.min(containerHeight - 100, 600);
        
        setBookDimensions({
          width: Math.floor(pageWidth),
          height: Math.floor(pageHeight)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isFullscreen]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToNextPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, []);

  const goToPreviousPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6));
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
    link.download = title ? `${title}.pdf` : 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl"
      style={{ minHeight: isFullscreen ? '100vh' : '700px' }}
    >
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-yellow-400" />
            <div>
              <h3 className="text-white font-bold text-lg">{title || 'PDF Flipbook'}</h3>
              <p className="text-gray-300 text-sm">
                Page {currentPage + 1} of {numPages}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleZoomOut}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
            
            <span className="text-white text-sm font-medium px-2">
              {Math.round(zoom * 100)}%
            </span>
            
            <Button
              onClick={handleZoomIn}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            
            <div className="w-px h-6 bg-white/30 mx-2" />
            
            <Button
              onClick={handleDownload}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Download className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Flipbook Container */}
      <div 
        className="flex items-center justify-center pt-20 pb-12"
        style={{ 
          minHeight: isFullscreen ? '100vh' : '700px',
          transform: `scale(${zoom})`,
          transition: 'transform 0.3s ease'
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent mb-4" />
              <p className="text-gray-600 font-medium">Loading flipbook...</p>
            </div>
          }
          error={
            <div className="text-center p-12">
              <p className="text-red-600 font-medium">Failed to load PDF</p>
              <p className="text-gray-600 text-sm mt-2">Please check the file path or try again</p>
            </div>
          }
        >
          {numPages > 0 && (
            <HTMLFlipBook
              ref={flipBookRef}
              width={bookDimensions.width}
              height={bookDimensions.height}
              size="stretch"
              minWidth={300}
              maxWidth={600}
              minHeight={400}
              maxHeight={800}
              drawShadow={true}
              flippingTime={800}
              usePortrait={true}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={handleFlip}
              className="shadow-2xl"
              style={{}}
              startPage={0}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <div key={`page_${index + 1}`} className="bg-white shadow-xl">
                  <Page
                    pageNumber={index + 1}
                    width={bookDimensions.width}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="flipbook-page"
                  />
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="flex items-center justify-center gap-4 max-w-4xl mx-auto">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            Previous
          </Button>
          
          <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg">
            <p className="text-gray-900 font-bold text-lg">
              {currentPage + 1} / {numPages}
            </p>
          </div>
          
          <Button
            onClick={goToNextPage}
            disabled={currentPage >= numPages - 1}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
        
        {/* Page Indicator Dots */}
        <div className="flex justify-center gap-1 mt-4">
          {Array.from(new Array(Math.min(numPages, 20)), (_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === currentPage
                  ? 'w-8 bg-yellow-400'
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hint Text */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full animate-pulse">
          💡 Click pages or use arrow keys to flip
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <style>{`
        .flipbook-page {
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
        }
        
        .react-pdf__Page {
          box-shadow: none !important;
        }
        
        .react-pdf__Page__canvas {
          max-width: 100% !important;
          height: auto !important;
        }
      `}</style>
    </div>
  );
};

export default PDFFlipbook;
