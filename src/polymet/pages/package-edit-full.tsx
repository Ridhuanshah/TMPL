import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  SaveIcon,
  EyeIcon,
  Loader2Icon,
  CheckCircleIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { TravelPackage } from "@/polymet/data/package-data";
import { InclusionsExclusionsData } from "@/polymet/components/inclusions-exclusions-section";
import { EssentialItemsData } from "@/polymet/components/essential-items-section";
import { PackageFormTabs } from "@/polymet/components/package-form-tabs";
import { User } from "@/polymet/data/user-data";

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

export function PackageEditFull() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

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

  // Fetch existing package data
  useEffect(() => {
    if (id) {
      fetchPackageData();
    }
  }, [id]);

  const fetchPackageData = async () => {
    try {
      setFetchingData(true);

      console.log("📦 Fetching package data for ID:", id);

      // Get auth token from localStorage
      const sessionData = localStorage.getItem(
        "sb-vvrmfgealitetfgwsdeu-auth-token"
      );
      if (!sessionData) {
        throw new Error("Not authenticated - please log in again");
      }

      const session = JSON.parse(sessionData);
      const accessToken = session?.access_token;

      if (!accessToken) {
        throw new Error("Session expired - please log in again");
      }

      // Direct API call to fetch package
      const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      console.log("🔗 Fetching from Supabase API...");

      // Fetch main package data
      const packageResponse = await fetch(
        `${supabaseUrl}/rest/v1/packages?id=eq.${id}`,
        {
          method: "GET",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!packageResponse.ok) {
        throw new Error("Failed to fetch package");
      }

      const packages = await packageResponse.json();
      const data = packages[0];

      console.log("✅ Package data loaded:", data);

      if (data) {
        // Set form data
        setFormData({
          name: data.name || "",
          description: data.description || "",
          continent: data.continent || "",
          country: data.country || "",
          duration: data.duration_days || 1,
          difficulty: data.difficulty || "Easy",
          groupSize: {
            min: data.min_group_size || 1,
            max: data.max_group_size || 10,
          },
          pricing: {
            basePrice: data.base_price || 0,
            currency: data.currency || "RM",
          },
          status: data.status || "draft",
          category: data.category || "",
          highlights: data.highlights && data.highlights.length > 0 ? data.highlights : [""],
          images: {
            hero: data.hero_image || "",
            gallery: data.gallery_images && data.gallery_images.length > 0 ? data.gallery_images : [""],
          },
          availability: {
            startDate: data.available_from || "",
            endDate: data.available_until || "",
            capacity: 10,
            booked: 0,
          },
        });

        // Set inclusions and exclusions
        setInclusionsExclusions({
          inclusions:
            data.inclusions && data.inclusions.length > 0
              ? data.inclusions.map((text: string, idx: number) => ({
                  id: `inc_${idx + 1}`,
                  text,
                }))
              : [{ id: "inc_1", text: "" }],
          exclusions:
            data.exclusions && data.exclusions.length > 0
              ? data.exclusions.map((text: string, idx: number) => ({
                  id: `exc_${idx + 1}`,
                  text,
                }))
              : [{ id: "exc_1", text: "" }],
        });

        // Fetch itinerary items
        const itineraryResponse = await fetch(
          `${supabaseUrl}/rest/v1/daily_itinerary?package_id=eq.${id}&order=day_number.asc`,
          {
            method: "GET",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (itineraryResponse.ok) {
          const itineraryData = await itineraryResponse.json();
          if (itineraryData && itineraryData.length > 0) {
            setItineraryItems(
              itineraryData.map((item: any) => ({
                id: item.id || `day_${item.day_number}`,
                dayNumber: item.day_number,
                title: item.title || "",
                description: item.description || "",
                activities: item.activities || [],
                location: {
                  from: item.location_from || "",
                  to: item.location_to || "",
                },
                isOptional: item.is_optional || false,
                optionalPrice: item.optional_price || 0,
              }))
            );
          }
        }

        // Fetch travel tips
        const tipsResponse = await fetch(
          `${supabaseUrl}/rest/v1/travel_tips?package_id=eq.${id}&order=display_order.asc`,
          {
            method: "GET",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (tipsResponse.ok) {
          const tipsData = await tipsResponse.json();
          if (tipsData && tipsData.length > 0) {
            setTravelTips({
              tips: tipsData.map((tip: any) => ({
                id: tip.id || `tip_${tip.display_order}`,
                title: tip.title || "",
                description: tip.description || "",
              })),
            });
          }
        }

        // Fetch essential items
        const itemsResponse = await fetch(
          `${supabaseUrl}/rest/v1/essential_items?package_id=eq.${id}&order=display_order.asc`,
          {
            method: "GET",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (itemsResponse.ok) {
          const itemsData = await itemsResponse.json();
          if (itemsData && itemsData.length > 0) {
            setEssentialItems({
              items: itemsData.map((item: any) => ({
                id: item.id || `item_${item.display_order}`,
                text: item.item_name || "",  // FIX: Use item_name to match database column
              })),
            });
          }
        }

        // Fetch booking dates
        const datesResponse = await fetch(
          `${supabaseUrl}/rest/v1/package_departure_dates?package_id=eq.${id}`,
          {
            method: "GET",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (datesResponse.ok) {
          const datesData = await datesResponse.json();
          if (datesData && datesData.length > 0) {
            setBookingDates(
              datesData.map((date: any, idx: number) => ({
                id: date.id || `date_${idx + 1}`,
                startDate: date.start_date || "",
                endDate: date.end_date || "",
                capacity: date.capacity || 10,
                booked: date.booked || 0,
                status: date.status || "active",
                price: date.price_override,
                tripCode: date.trip_code,
                guides: {
                  leadGuide: undefined,
                  companions: [],
                },
              }))
            );
          }
        }
      }
    } catch (error: any) {
      console.error("Error fetching package:", error);
      toast({
        title: "Error",
        description: "Failed to load package data",
        variant: "destructive",
      });
      navigate("/admin/packages");
    } finally {
      setFetchingData(false);
    }
  };

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🚀 Form update started");

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
      // Get session token
      const sessionData = localStorage.getItem(
        "sb-vvrmfgealitetfgwsdeu-auth-token"
      );
      if (!sessionData) {
        throw new Error("Not authenticated - please log in again");
      }

      const session = JSON.parse(sessionData);
      const accessToken = session?.access_token;

      if (!accessToken) {
        throw new Error("Session expired - please log in again");
      }

      // Update main package
      const packageData = {
        name: formData.name,
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
        updated_at: new Date().toISOString(),
      };

      console.log("📦 Package data to update:", packageData);

      const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/packages?id=eq.${id}`,
        {
          method: "PATCH",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify(packageData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Update error:", errorText);
        throw new Error(`Failed to update package: ${errorText}`);
      }

      console.log("✅ Package updated successfully");

      // Show success immediately - main package update is done
      console.log("🎉 Main package update complete!");
      setSaveSuccess(true);
      
      toast({
        title: "✅ Package Updated!",
        description: "Your changes have been saved successfully.",
        duration: 3000,
      });

      // Reset success state after showing feedback
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);

      // Delete existing related data first (MUST await to prevent race condition)
      // WORKAROUND: Using fetch() instead of supabase client due to hanging issue
      if (id) {
        console.log("🔄 Deleting old related data using REST API...");
        
        try {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
          const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          const tables = ["daily_itinerary", "travel_tips", "essential_items", "package_departure_dates"];
          
          // Use direct REST API calls with fetch (bypasses JS client hanging issue)
          const deletePromises = tables.map(table => 
            fetch(`${supabaseUrl}/rest/v1/${table}?package_id=eq.${id}`, {
              method: 'DELETE',
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
              }
            }).then(response => {
              if (response.ok) {
                console.log(`✅ Deleted from ${table} via REST API`);
                return { table, success: true };
              } else {
                console.error(`❌ Delete ${table} failed:`, response.status, response.statusText);
                return { table, success: false, error: response.statusText };
              }
            })
          );
          
          await Promise.all(deletePromises);
          console.log("✅ Old related data deleted, ready to insert new data");
        } catch (deleteError) {
          console.error("❌ DELETE operation error:", deleteError);
          // Continue anyway - better to try INSERT than fail completely
        }
      }

      // Create itinerary items
      console.log("📝 Itinerary items count:", itineraryItems.length);
      if (itineraryItems.length > 0) {
        const itineraryData = itineraryItems
          .filter((item) => item.title.trim() !== "")
          .map((item) => ({
            package_id: id,
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
          console.log("➕ Inserting", itineraryData.length, "itinerary items");
          // Use REST API instead of JS client to avoid hanging
          const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
          const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          const insertResponse = await fetch(`${supabaseUrl}/rest/v1/daily_itinerary`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify(itineraryData)
          });
          console.log("Insert itinerary result:", insertResponse.ok ? "✅ Success" : `❌ Failed: ${insertResponse.statusText}`);
        } else {
          console.log("⏭️ No itinerary items to insert");
        }
      } else {
        console.log("⏭️ Skipping itinerary (no items)");
      }

      // Create travel tips
      console.log("💡 Travel tips count:", travelTips.tips.length);
      if (travelTips.tips.length > 0) {
        const tipsData = travelTips.tips
          .filter((tip) => tip.title.trim() !== "")
          .map((tip, index) => ({
            package_id: id,
            title: tip.title,
            description: tip.description,
            display_order: index + 1,
          }));

        if (tipsData.length > 0) {
          console.log("➕ Inserting", tipsData.length, "travel tips");
          // Use REST API instead of JS client to avoid hanging
          const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
          const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          const insertResponse = await fetch(`${supabaseUrl}/rest/v1/travel_tips`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify(tipsData)
          });
          console.log("Insert tips result:", insertResponse.ok ? "✅ Success" : `❌ Failed: ${insertResponse.statusText}`);
        } else {
          console.log("⏭️ No travel tips to insert");
        }
      } else {
        console.log("⏭️ Skipping travel tips (no items)");
      }

      // Create essential items
      console.log("🎒 Essential items count:", essentialItems.items.length);
      if (essentialItems.items.length > 0) {
        const itemsData = essentialItems.items
          .filter((item) => item.text.trim() !== "")
          .map((item, index) => ({
            package_id: id,
            item_name: item.text,
            display_order: index + 1,
          }));

        if (itemsData.length > 0) {
          console.log("➕ Inserting", itemsData.length, "essential items");
          // Use REST API instead of JS client to avoid hanging
          const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
          const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          const insertResponse = await fetch(`${supabaseUrl}/rest/v1/essential_items`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify(itemsData)
          });
          console.log("Insert items result:", insertResponse.ok ? "✅ Success" : `❌ Failed: ${insertResponse.statusText}`);
        } else {
          console.log("⏭️ No essential items to insert");
        }
      } else {
        console.log("⏭️ Skipping essential items (no items)");
      }

      // Create booking dates
      console.log("📅 Booking dates count:", bookingDates.length);
      if (bookingDates.length > 0) {
        const datesData = bookingDates
          .filter((date) => date.startDate && date.endDate)
          .map((date) => ({
            package_id: id,
            start_date: date.startDate,
            end_date: date.endDate,
            capacity: date.capacity,
            booked: date.booked || 0,
            status: date.status || "active",
            price_override: date.price,
            trip_code: date.tripCode,
          }));

        if (datesData.length > 0) {
          console.log("➕ Inserting", datesData.length, "booking dates");
          const insertResult = await supabase
            .from("package_departure_dates")
            .insert(datesData as any);
          console.log("Insert dates result:", insertResult.error ? insertResult.error : "✅ Success");
        } else {
          console.log("⏭️ No booking dates to insert");
        }
      } else {
        console.log("⏭️ Skipping booking dates (no items)");
      }

      console.log("🎉 All related data processed!");
    } catch (error: any) {
      console.error("❌ Error updating package:", error);

      toast({
        title: "Error",
        description: error.message || "Failed to update package",
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

  if (fetchingData) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
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
          <h1 className="text-3xl font-bold">Edit Package</h1>
          <p className="text-muted-foreground mt-1">
            Update package information
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            type="submit" 
            form="package-form" 
            disabled={isLoading}
            className={saveSuccess ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {saveSuccess ? (
              <>
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                {isLoading ? (
                  <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <SaveIcon className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Updating..." : "Update Package"}
              </>
            )}
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
            />
          </div>

          {/* Sidebar Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Package status info can go here if needed */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PackageEditFull;
