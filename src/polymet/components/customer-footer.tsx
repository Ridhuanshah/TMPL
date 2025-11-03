import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerData } from "@/polymet/data/customer-data";

export interface CustomerFooterProps {
  className?: string;
}

export function CustomerFooter({ className = "" }: CustomerFooterProps) {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  };

  return (
    <footer className={`bg-yellow-500 ${className}`}>
      {/* Newsletter Section */}
      <div className="border-b border-yellow-600/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Subscribe To Our Newsletter
              </h3>
              <p className="text-black/80">
                Get the latest travel deals and destination updates
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-2 w-full md:w-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-0 min-w-[300px]"
                required
              />

              <Button
                type="submit"
                className="bg-black hover:bg-black/90 text-white"
              >
                Subscribe
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-black">About</h4>
            <p className="text-black/80 text-sm leading-relaxed">
              {footerData.about.description}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-black/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />

                <span>{footerData.about.address}</span>
              </div>
              <div className="flex items-center gap-2 text-black/80">
                <Phone className="w-4 h-4 flex-shrink-0" />

                <span>{footerData.about.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-black/80">
                <Mail className="w-4 h-4 flex-shrink-0" />

                <span>{footerData.about.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-black">About Us</h4>
            <ul className="space-y-2">
              {footerData.quickLinks.slice(0, 7).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-black/80 hover:text-black text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-black">Working Hours</h4>
            <div className="space-y-2 text-sm text-black/80">
              <p>{footerData.workingHours.weekdays}</p>
              <p>{footerData.workingHours.saturday}</p>
              <p>{footerData.workingHours.sunday}</p>
            </div>
            <div className="pt-4">
              <h5 className="font-semibold text-black mb-3">Follow Us</h5>
              <div className="flex gap-3">
                {footerData.socialMedia.map((social) => {
                  const Icon =
                    socialIcons[social.icon as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Icon className="w-5 h-5 text-black" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-black">Secured Payment</h4>
            <img 
              src="/chip-payment.png" 
              alt="Payment Methods - Maybank, AmBank, BSN, RHB, Public Bank, OCBC, HSBC, CIMB, Alliance Bank, Affin Bank, iPay88, Visa, Mastercard, FPX and more"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>
              © {new Date().getFullYear()} TMPL Escapade. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button className="hover:text-yellow-500 transition-colors">
                Cookie Settings
              </button>
              <Link
                to="/privacy"
                className="hover:text-yellow-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-yellow-500 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
