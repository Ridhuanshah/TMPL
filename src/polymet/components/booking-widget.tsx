import { useState, useEffect } from "react";
import { Calendar, Users, Minus, Plus, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PackageWithRelations } from "@/polymet/services/database.types";

interface BookingWidgetProps {
  package: PackageWithRelations;
}

export function BookingWidget({ package: pkg }: BookingWidgetProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const basePrice = pkg.base_price || 0;
  const childPrice = basePrice * 0.7; // 30% discount for children
  const infantPrice = 0; // Infants free
  
  const totalGuests = adults + children + infants;
  const subtotalAdults = adults * basePrice;
  const subtotalChildren = children * childPrice;
  const totalPrice = subtotalAdults + subtotalChildren;

  const maxGuests = pkg.max_group_size || 10;
  const minGuests = pkg.min_group_size || 1;

  // Format WhatsApp message
  const generateWhatsAppMessage = () => {
    const message = `Hi TMPL Escapade! 🌍

I'd like to get a quote for:

📦 *Package:* ${pkg.name}
📍 *Destination:* ${pkg.country || pkg.continent}
📅 *Preferred Date:* ${selectedDate || "Flexible"}
⏱️ *Duration:* ${pkg.duration_days} days ${pkg.duration_nights} nights

👥 *Guests:*
${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `\n${children} ${children > 1 ? 'Children' : 'Child'} (2-12 years)` : ''}${infants > 0 ? `\n${infants} ${infants > 1 ? 'Infants' : 'Infant'} (0-2 years)` : ''}

💰 *Estimated Total:* RM ${totalPrice.toLocaleString()}

Please send me more details and confirm availability. Thank you! 🙏`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppBooking = () => {
    const phoneNumber = "60198816388"; // WhatsApp number without + or spaces
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Desktop View
  const BookingForm = () => (
    <div className="space-y-6">
      {/* Price Header */}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            RM {basePrice.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600">per person</span>
        </div>
        <Badge variant="secondary" className="mt-2">
          {pkg.difficulty} • {pkg.duration_days} Days
        </Badge>
      </div>

      <Separator />

      {/* Date Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Select Departure Date
        </label>
        <Select value={selectedDate} onValueChange={setSelectedDate}>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <SelectValue placeholder="Choose a date" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flexible">Flexible Dates</SelectItem>
            <SelectItem value="2025-12-01">December 1, 2025</SelectItem>
            <SelectItem value="2025-12-15">December 15, 2025</SelectItem>
            <SelectItem value="2026-01-05">January 5, 2026</SelectItem>
            <SelectItem value="2026-01-20">January 20, 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Guest Counter */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">
          Number of Guests
        </label>
        
        {/* Adults */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium text-gray-900">Adults</div>
            <div className="text-xs text-gray-500">Age 13+</div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAdults(Math.max(1, adults - 1))}
              disabled={adults <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{adults}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAdults(Math.min(maxGuests - children - infants, adults + 1))}
              disabled={totalGuests >= maxGuests}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium text-gray-900">Children</div>
            <div className="text-xs text-gray-500">Age 2-12</div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChildren(Math.max(0, children - 1))}
              disabled={children === 0}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{children}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChildren(Math.min(maxGuests - adults - infants, children + 1))}
              disabled={totalGuests >= maxGuests}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Infants */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium text-gray-900">Infants</div>
            <div className="text-xs text-gray-500">Under 2 (Free)</div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInfants(Math.max(0, infants - 1))}
              disabled={infants === 0}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{infants}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInfants(infants + 1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700">Price Breakdown</div>
        
        {adults > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Adults × {adults}</span>
            <span className="font-medium">RM {subtotalAdults.toLocaleString()}</span>
          </div>
        )}
        
        {children > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Children × {children}</span>
            <span className="font-medium">RM {subtotalChildren.toLocaleString()}</span>
          </div>
        )}
        
        {infants > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Infants × {infants}</span>
            <span className="font-medium">FREE</span>
          </div>
        )}
        
        <Separator />
        
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-yellow-600">RM {totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={handleWhatsAppBooking}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Get Quote via WhatsApp
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="tel:+60198816388">
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:hi@tmplescapade.my">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
        </div>
      </div>

      {/* Info Note */}
      <div className="text-xs text-gray-500 text-center p-3 bg-blue-50 rounded">
        💡 Final price may vary based on availability and season. Our team will confirm the exact price when you submit your request.
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: Sticky Sidebar */}
      <div className="hidden lg:block">
        <Card className="sticky top-24 shadow-lg">
          <CardHeader className="pb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Book This Trip</div>
          </CardHeader>
          <CardContent>
            <BookingForm />
          </CardContent>
        </Card>
      </div>

      {/* Mobile: Fixed Bottom Bar with Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-gray-500">From</div>
            <div className="text-2xl font-bold">RM {basePrice.toLocaleString()}</div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Book Now
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Book Your Adventure</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <BookingForm />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
