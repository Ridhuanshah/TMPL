import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Content */}
        <div className="flex items-center gap-4 flex-1">
          <h3 className="text-sm md:text-base font-bold whitespace-nowrap">
            WE USE COOKIES
          </h3>
          <p className="text-xs md:text-sm text-white/80">
            This website use cookies to ensure you get best experience on our
            website
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleAccept}
            className="bg-white text-black hover:bg-gray-200 font-semibold px-6 rounded-full"
            size="sm"
          >
            Accept
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 font-semibold px-6 rounded-full"
            size="sm"
          >
            Decline
          </Button>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
