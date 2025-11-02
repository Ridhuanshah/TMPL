import React from "react";
import { CustomerNavigation } from "@/polymet/components/customer-navigation";
import { CustomerFooter } from "@/polymet/components/customer-footer";
import { CookieConsent } from "@/polymet/components/cookie-consent";

export interface CustomerLayoutProps {
  children: React.ReactNode;
  transparentNav?: boolean;
}

export function CustomerLayout({
  children,
  transparentNav = false,
}: CustomerLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavigation transparent={transparentNav} />

      <main className="flex-1">{children}</main>
      <CustomerFooter />
      <CookieConsent />
    </div>
  );
}
