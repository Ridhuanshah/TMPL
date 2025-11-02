import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftIcon,
  SaveIcon,
  EyeIcon,
  CalendarIcon,
  CheckCircleIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { packageStatuses } from "@/polymet/data/package-data";
import { User } from "@/polymet/data/user-data";
import { TravelPackage } from "@/polymet/data/package-data";
import { InclusionsExclusionsData } from "@/polymet/components/inclusions-exclusions-section";
import { EssentialItemsData } from "@/polymet/components/essential-items-section";
import { PackageFormTabs } from "@/polymet/components/package-form-tabs";

// Updated interface to use User instead of TravelAgent
interface UpdatedPackageBookingDate {
  id: string;
  startDate: string;
  endDate: string;
  capacity: number;
  booked: number;
  status: "active" | "full" | "cancelled";
  price?: number;
  flightType?: "economy" | "premium_economy" | "business" | "first_class";
  flightCompany?: string;
  tripCode?: string;
  guides: {
    leadGuide?: User;
    companions: User[];
  };
}

export function PackageCreateFull() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<TravelPackage>>({
    name: "",
    description: "",
    continent: "",
    country: "",
    duration: 1,
    difficulty: "Easy",
    groupSize: { min: 1, max: 10 },
    pricing: { basePrice: 0, currency: "RM" },
    status: "draft",
    category: "",
    highlights: [""],
    images: {
      hero: "",
      gallery: [""],
    },
    availability: {
      startDate: "",
      endDate: "",
      capacity: 10,
      booked: 0,
    },
  });

  // Booking dates with tour guides
  const [bookingDates, setBookingDates] = useState<UpdatedPackageBookingDate[]>(
    [
      {
        id: "date_1",
        startDate: "",
        endDate: "",
        capacity: 10,
        booked: 0,
        status: "active",
        guides: {
          leadGuide: undefined,
          companions: [],
        },
      },
    ]
  );

  // Daily itinerary items
  const [itineraryItems, setItineraryItems] = useState([
    {
      id: "day_1",
      dayNumber: 1,
      title: "",
      description: "",
      activities: [],
      location: {
        from: "",
        to: "",
      },
      isOptional: false,
      optionalPrice: 0,
    },
  ]);

  // Inclusions and exclusions
  const [inclusionsExclusions, setInclusionsExclusions] =
    useState<InclusionsExclusionsData>({
      inclusions: [{ id: "inc_1", text: "" }],
      exclusions: [{ id: "exc_1", text: "" }],
    });

  // Essential items to pack
  const [essentialItems, setEssentialItems] = useState<EssentialItemsData>({
    items: [{ id: "item_1", text: "" }],
  });

  // Travel tips
  const [travelTips, setTravelTips] = useState({
    tips: [{ id: "tip_1", title: "", description: "" }],
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Package name is required";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.continent) {
      newErrors.continent = "Continent is required";
    }

    if (!formData.country?.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.duration || formData.duration < 1) {
      newErrors.duration = "Duration must be at least 1 day";
    }

    if (!formData.pricing?.basePrice || formData.pricing.basePrice < 0) {
      newErrors.basePrice = "Base price must be greater than 0";
    }

    if (!formData.groupSize?.min || formData.groupSize.min < 1) {
      newErrors.groupSizeMin = "Minimum group size must be at least 1";
    }

    if (
      !formData.groupSize?.max ||
      formData.groupSize.max < (formData.groupSize?.min || 1)
    ) {
      newErrors.groupSizeMax =
        "Maximum group size must be greater than minimum";
    }

    if (
      !formData.availability?.capacity ||
      formData.availability.capacity < 1
    ) {
      newErrors.capacity = "Capacity must be at least 1";
    }

    if (!formData.availability?.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.availability?.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.availability?.startDate && formData.availability?.endDate) {
      if (
        new Date(formData.availability.startDate) >=
        new Date(formData.availability.endDate)
      ) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    // Validate booking dates (temporarily optional for testing)
    // if (bookingDates.length === 0) {
    //   newErrors.bookingDates = "At least one booking date is required";
    // } else {
    //   bookingDates.forEach((bookingDate) => {
    //     if (!bookingDate.startDate) {
    //       newErrors[`startDate-${bookingDate.id}`] = "Start date is required";
    //     }
    //     if (!bookingDate.endDate) {
    //       newErrors[`endDate-${bookingDate.id}`] = "End date is required";
    //     }
    //     if (bookingDate.startDate && bookingDate.endDate) {
    //       if (
    //         new Date(bookingDate.startDate) >= new Date(bookingDate.endDate)
    //       ) {
    //         newErrors[`endDate-${bookingDate.id}`] =
    //           "End date must be after start date";
    //       }
    //     }
    //     if (!bookingDate.capacity || bookingDate.capacity < 1) {
    //       newErrors[`capacity-${bookingDate.id}`] =
    //         "Capacity must be at least 1";
    //     }
    //   });
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("🚀 Form submission started");
    console.log("📋 Form data:", formData);

    if (!validateForm()) {
      console.log("❌ Validation failed");
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log("✅ Validation passed");
    setIsLoading(true);

    try {
      // Generate slug from name
      const slug = formData.name!
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      console.log("📝 Generated slug:", slug);

      // 1. Create main package with simpler structure
      const packageData = {
        name: formData.name,
        slug: slug,
        description: formData.description,
        continent: formData.continent,
        country: formData.country,
        region: "",
        category: formData.category,
        difficulty: (formData.difficulty?.toLowerCase() || "easy") as any,
        base_price: formData.pricing?.basePrice || 0,
        currency: formData.pricing?.currency || "RM",
        duration_days: formData.duration || 1,
        duration_nights: (formData.duration || 1) - 1,
        min_group_size: formData.groupSize?.min || 1,
        max_group_size: formData.groupSize?.max || 10,
        status: (formData.status || "draft") as any,
        highlights: formData.highlights?.filter((h) => h.trim() !== "") || [],
        inclusions:
          inclusionsExclusions.inclusions
            .map((i) => i.text)
            .filter((t) => t.trim() !== "") || [],
        exclusions:
          inclusionsExclusions.exclusions
            .map((e) => e.text)
            .filter((t) => t.trim() !== "") || [],
        hero_image: formData.images?.hero || "",
        gallery_images:
          formData.images?.gallery?.filter((g) => g.trim() !== "") || [],
      };

      console.log("📦 Package data to insert:", packageData);

      // Get user's session token from localStorage (bypasses hanging getSession call)
      const sessionData = localStorage.getItem('sb-vvrmfgealitetfgwsdeu-auth-token');
      if (!sessionData) {
        throw new Error("Not authenticated - please log in again");
      }

      const session = JSON.parse(sessionData);
      const accessToken = session?.access_token;

      if (!accessToken) {
        throw new Error("Session expired - please log in again");
      }

      // Direct API call with proper authentication
      const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      console.log("🔗 Making direct API call to Supabase with auth token...");
      console.log("🔑 Using access token from session storage");
      
      const response = await fetch(`${supabaseUrl}/rest/v1/packages`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(packageData)
      });

      console.log("📡 Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error:", errorText);
        throw new Error(`Failed to create package: ${errorText}`);
      }

      const responseData = await response.json();
      const newPackage = Array.isArray(responseData) ? responseData[0] : responseData;
      
      console.log("✅ Package created:", newPackage);

      const packageId = (newPackage as any).id;

      // 2. Create daily itinerary items
      if (itineraryItems.length > 0) {
        const itineraryData = itineraryItems
          .filter((item) => item.title.trim() !== "")
          .map((item) => ({
            package_id: packageId,
            day_number: item.dayNumber,
            title: item.title,
            description: item.description,
            activities: item.activities || [],
            location_from: item.location?.from || "",
            location_to: item.location?.to || "",
            is_optional: item.isOptional || false,
            optional_price: item.optionalPrice || 0,
          }));

        if (itineraryData.length > 0) {
          const { error: itineraryError } = await supabase
            .from("daily_itinerary")
            .insert(itineraryData as any);

          if (itineraryError) throw itineraryError;
        }
      }

      // 3. Create travel tips
      if (travelTips.tips.length > 0) {
        const tipsData = travelTips.tips
          .filter((tip) => tip.title.trim() !== "")
          .map((tip, index) => ({
            package_id: packageId,
            title: tip.title,
            description: tip.description,
            display_order: index + 1,
          }));

        if (tipsData.length > 0) {
          const { error: tipsError } = await supabase
            .from("travel_tips")
            .insert(tipsData as any);

          if (tipsError) throw tipsError;
        }
      }

      // 4. Create essential items
      if (essentialItems.items.length > 0) {
        const itemsData = essentialItems.items
          .filter((item) => item.text.trim() !== "")
          .map((item, index) => ({
            package_id: packageId,
            item_name: item.text,
            display_order: index + 1,
          }));

        if (itemsData.length > 0) {
          const { error: itemsError} = await supabase
            .from("essential_items")
            .insert(itemsData as any);

          if (itemsError) throw itemsError;
        }
      }

      // 5. Create departure dates (booking dates)
      if (bookingDates.length > 0) {
        const datesData = bookingDates
          .filter((date) => date.startDate && date.endDate)
          .map((date) => ({
            package_id: packageId,
            start_date: date.startDate,
            end_date: date.endDate,
            capacity: date.capacity,
            booked: date.booked || 0,
            status: date.status || "active",
            price_override: date.price,
            trip_code: date.tripCode,
          }));

        if (datesData.length > 0) {
          const { error: datesError } = await supabase
            .from("package_departure_dates")
            .insert(datesData as any);

          if (datesError) throw datesError;
        }
      }

      console.log("🎉 All data inserted successfully!");
      
      toast({
        title: "Success!",
        description: "Package created successfully",
      });

      setIsSubmitted(true);
      
      // Redirect to packages list after short delay
      setTimeout(() => {
        console.log("🔄 Redirecting to packages list");
        navigate("/admin/packages");
      }, 1500);
      
    } catch (error: any) {
      console.error("❌ Error creating package:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      toast({
        title: "Error",
        description: error.message || "Failed to create package. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    console.log("Preview package:", {
      formData,
      bookingDates,
      itineraryItems,
      inclusionsExclusions,
      essentialItems,
      travelTips,
    });
  };

  // Show success message after submission
  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-600">
                Package Created Successfully!
              </h2>
              <p className="text-muted-foreground">
                Your new package has been created and is now available in the
                system.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button asChild>
                  <Link to="/admin/packages">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Packages
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin/packages">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Packages
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Package</h1>
          <p className="text-muted-foreground mt-1">
            Add a new travel package to your catalog
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button type="submit" form="package-form" disabled={isLoading}>
            <SaveIcon className="h-4 w-4 mr-2" />
            {isLoading ? "Creating..." : "Create Package"}
          </Button>
        </div>
      </div>

      <form id="package-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Tabbed Content */}
          <div className="lg:col-span-3 space-y-6">
            <PackageFormTabs
              formData={formData}
              onFormDataChange={setFormData}
              bookingDates={bookingDates}
              onBookingDatesChange={setBookingDates}
              itineraryItems={itineraryItems}
              onItineraryItemsChange={setItineraryItems}
              inclusionsExclusions={inclusionsExclusions}
              onInclusionsExclusionsChange={setInclusionsExclusions}
              essentialItems={essentialItems}
              onEssentialItemsChange={setEssentialItems}
              travelTips={travelTips}
              onTravelTipsChange={setTravelTips}
              errors={errors}
              isEditing={false}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Availability */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Package Status</Label>
                  <Select
                    value={formData.status || "draft"}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {packageStatuses
                        .filter((status) => status !== "All Status")
                        .map((status) => (
                          <SelectItem key={status} value={status}>
                            <Badge className="capitalize">
                              {status.replace("_", " ")}
                            </Badge>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Available From *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.availability?.startDate || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availability: {
                          ...(formData.availability || {
                            capacity: 10,
                            booked: 0,
                            startDate: "",
                            endDate: "",
                          }),
                          startDate: e.target.value,
                        },
                      })
                    }
                    className={errors.startDate ? "border-red-500" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Available Until *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.availability?.endDate || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availability: {
                          ...(formData.availability || {
                            capacity: 10,
                            booked: 0,
                            startDate: "",
                            endDate: "",
                          }),
                          endDate: e.target.value,
                        },
                      })
                    }
                    className={errors.endDate ? "border-red-500" : ""}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Package Preview */}
            {formData.name && (
              <Card>
                <CardContent className="p-6 space-y-3">
                  {formData.images?.hero && (
                    <img
                      src={formData.images.hero}
                      alt={formData.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-sm">{formData.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formData.country} • {formData.duration} days
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className="text-xs">
                      {formData.difficulty}
                    </Badge>
                    <span className="font-medium">
                      RM {formData.pricing?.basePrice?.toLocaleString() || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PackageCreateFull;
