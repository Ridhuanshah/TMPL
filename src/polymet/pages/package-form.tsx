import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeftIcon,
  SaveIcon,
  EyeIcon,
  PlusIcon,
  XIcon,
  ImageIcon,
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  StarIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import {
  travelPackages,
  packageCategories,
  continents,
  difficultyLevels,
  packageStatuses,
  TravelPackage,
} from "@/polymet/data/package-data";
import { User } from "@/polymet/data/user-data";
import { packageService } from "@/polymet/services/package-service";

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
import { InclusionsExclusionsData } from "@/polymet/components/inclusions-exclusions-section";
import { EssentialItemsData } from "@/polymet/components/essential-items-section";
import { PackageFormTabs } from "@/polymet/components/package-form-tabs";

export function PackageForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load existing package data if editing
  useEffect(() => {
    if (isEditing && id) {
      const existingPackage = travelPackages.find((pkg) => pkg.id === id);
      if (existingPackage) {
        setFormData(existingPackage);
      }
    }
  }, [id, isEditing]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [field]: value,
      },
    }));
  };

  const handleArrayInputChange = (
    field: string,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[])?.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[])?.filter(
        (_, i) => i !== index
      ),
    }));
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

    // Validate booking dates
    if (bookingDates.length === 0) {
      newErrors.bookingDates = "At least one booking date is required";
    } else {
      bookingDates.forEach((bookingDate) => {
        if (!bookingDate.startDate) {
          newErrors[`startDate-${bookingDate.id}`] = "Start date is required";
        }
        if (!bookingDate.endDate) {
          newErrors[`endDate-${bookingDate.id}`] = "End date is required";
        }
        if (bookingDate.startDate && bookingDate.endDate) {
          if (
            new Date(bookingDate.startDate) >= new Date(bookingDate.endDate)
          ) {
            newErrors[`endDate-${bookingDate.id}`] =
              "End date must be after start date";
          }
        }
        if (!bookingDate.capacity || bookingDate.capacity < 1) {
          newErrors[`capacity-${bookingDate.id}`] =
            "Capacity must be at least 1";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let pdfUrl = formData.pdfItinerary;

      // Upload PDF if a file was selected
      if ((formData as any).pdfFile) {
        const file = (formData as any).pdfFile;
        const uploadedUrl = await packageService.uploadPDF(file, id || 'new');
        if (uploadedUrl) {
          pdfUrl = uploadedUrl;
        }
      }

      // Prepare package data for Supabase
      const packageData = {
        name: formData.name,
        slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        continent: formData.continent,
        country: formData.country,
        region: formData.region,
        category: formData.category,
        difficulty: formData.difficulty,
        base_price: formData.basePrice,
        currency: formData.currency || 'RM',
        duration_days: formData.duration,
        duration_nights: formData.duration ? formData.duration - 1 : 0,
        min_group_size: formData.minGroupSize || 1,
        max_group_size: formData.maxGroupSize,
        status: formData.status || 'draft',
        highlights: formData.highlights || [],
        inclusions: inclusionsExclusions.inclusions.map(i => i.text).filter(Boolean),
        exclusions: inclusionsExclusions.exclusions.map(e => e.text).filter(Boolean),
        hero_image: formData.images?.hero,
        gallery_images: formData.images?.gallery || [],
        pdf_itinerary_url: pdfUrl,
      };

      let result;
      if (isEditing && id) {
        result = await packageService.update(id, packageData);
      } else {
        result = await packageService.create(packageData);
      }

      if (result) {
        console.log('Package saved successfully:', result);
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to save package');
      }
    } catch (error) {
      console.error("Error saving package:", error);
      alert('Failed to save package. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    console.log("Preview package:", formData);
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
                {isEditing
                  ? "Package Updated Successfully!"
                  : "Package Created Successfully!"}
              </h2>
              <p className="text-muted-foreground">
                {isEditing
                  ? "Your package has been updated and is now available in the system."
                  : "Your new package has been created and is now available in the system."}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button asChild>
                  <Link to="/admin/packages">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Packages
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/admin/packages/view/${formData.id || "new"}`}>
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View Package
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
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Package" : "Create New Package"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing
              ? "Update package details and settings"
              : "Add a new travel package to your catalog"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <EyeIcon className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button type="submit" form="package-form" disabled={isLoading}>
            <SaveIcon className="h-4 w-4 mr-2" />

            {isLoading
              ? "Saving..."
              : isEditing
                ? "Update Package"
                : "Create Package"}
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
              isEditing={isEditing}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Status & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Package Status</Label>
                  <Select
                    value={formData.status || "draft"}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
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

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="startDate">Available From *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.availability?.startDate || ""}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "availability",
                        "startDate",
                        e.target.value
                      )
                    }
                    className={errors.startDate ? "border-red-500" : ""}
                  />

                  {errors.startDate && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Available Until *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.availability?.endDate || ""}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "availability",
                        "endDate",
                        e.target.value
                      )
                    }
                    className={errors.endDate ? "border-red-500" : ""}
                  />

                  {errors.endDate && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.endDate}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="booked">Currently Booked</Label>
                    <Input
                      id="booked"
                      type="number"
                      min="0"
                      value={formData.availability?.booked || 0}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "availability",
                          "booked",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Package Preview */}
            {formData.name && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Package Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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

export default PackageForm;
