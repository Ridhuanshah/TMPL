import React from "react";
import { Link } from "react-router-dom";
import { Search, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface CustomerNavigationProps {
  transparent?: boolean;
  className?: string;
}

export function CustomerNavigation({
  transparent = false,
  className = "",
}: CustomerNavigationProps) {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Blog & Travel Tips", href: "/blog" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
      <div className="container mx-auto">
        <nav
          className={`transition-all duration-300 rounded-full shadow-lg ${
            transparent
              ? "bg-slate-800/40 backdrop-blur-md border border-white/20"
              : "bg-white/80 backdrop-blur-md border border-gray-200"
          } ${className}`}
        >
          <div className="px-8 py-3">
          <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/tmpl-logo.png" 
              alt="TMPL Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors hover:text-primary ${
                  transparent
                    ? "text-white hover:text-white/80"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search, Login, and User */}
          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  transparent ? "text-white/70" : "text-muted-foreground"
                }`}
              />

              <Input
                type="search"
                placeholder="Search destinations..."
                className={`pl-10 w-64 ${
                  transparent
                    ? "bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    : ""
                }`}
              />
            </div>
            <Link to="/admin/login">
              <Button
                variant={transparent ? "ghost" : "outline"}
                size="icon"
                className={transparent ? "text-white hover:bg-white/20" : ""}
              >
                <ShieldCheck className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant={transparent ? "ghost" : "outline"}
              size="icon"
              className={transparent ? "text-white hover:bg-white/20" : ""}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
          </div>
        </div>
      </nav>
      </div>
    </div>
  );
}
