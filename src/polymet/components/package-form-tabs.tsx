import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MapPinIcon,
  ClockIcon,
  StarIcon,
  PackageIcon,
  LightbulbIcon,
  CalendarIcon,
  ImageIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  RouteIcon,
} from "lucide-react";
import { TravelPackage } from "@/polymet/data/package-data";
import { User } from "@/polymet/data/user-data";

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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  packageCategories,
  continents,
  difficultyLevels,
} from "@/polymet/data/package-data";
import { BookingDatesSection } from "@/polymet/components/booking-dates-section";
import { DailyItinerarySection } from "@/polymet/components/daily-itinerary-section";
import { InclusionsExclusionsSection } from "@/polymet/components/inclusions-exclusions-section";
import { EssentialItemsSection } from "@/polymet/components/essential-items-section";
import { TravelTipsSection } from "@/polymet/components/travel-tips-section";
import { PlusIcon, XIcon } from "lucide-react";

export interface PackageFormTabsProps {
  formData: Partial<TravelPackage>;
  onFormDataChange: (data: Partial<TravelPackage>) => void;
  bookingDates: UpdatedPackageBookingDate[];
  onBookingDatesChange: (dates: UpdatedPackageBookingDate[]) => void;
  itineraryItems: any[];
  onItineraryItemsChange: (items: any[]) => void;
  inclusionsExclusions: InclusionsExclusionsData;
  onInclusionsExclusionsChange: (data: InclusionsExclusionsData) => void;
  essentialItems: EssentialItemsData;
  onEssentialItemsChange: (data: EssentialItemsData) => void;
  travelTips: any;
  onTravelTipsChange: (data: any) => void;
  errors: Record<string, string>;
  isEditing: boolean;
}

interface TabInfo {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  requiredFields: string[];
}

export function PackageFormTabs({
  formData,
  onFormDataChange,
  bookingDates,
  onBookingDatesChange,
  itineraryItems,
  onItineraryItemsChange,
  inclusionsExclusions,
  onInclusionsExclusionsChange,
  essentialItems,
  onEssentialItemsChange,
  travelTips,
  onTravelTipsChange,
  errors,
  isEditing,
}: PackageFormTabsProps) {
  const [activeTab, setActiveTab] = useState("basic-info");

  const tabs: TabInfo[] = [
    {
      id: "basic-info",
      label: "Basic Info",
      icon: MapPinIcon,
      description: "Package name, description, location",
      requiredFields: [
        "name",
        "description",
        "continent",
        "country",
        "category",
      ],
    },
    {
      id: "details",
      label: "Details",
      icon: ClockIcon,
      description: "Duration, difficulty, pricing, group size",
      requiredFields: ["duration", "basePrice", "groupSizeMin", "groupSizeMax"],
    },
    {
      id: "highlights",
      label: "Highlights",
      icon: StarIcon,
      description: "Key selling points and features",
      requiredFields: [],
    },
    {
      id: "essential-items",
      label: "Packing List",
      icon: PackageIcon,
      description: "Essential items customers should pack",
      requiredFields: [],
    },
    {
      id: "travel-tips",
      label: "Travel Tips",
      icon: LightbulbIcon,
      description: "Helpful advice and recommendations",
      requiredFields: [],
    },
    {
      id: "inclusions",
      label: "Inclusions",
      icon: CheckCircleIcon,
      description: "What's included and excluded",
      requiredFields: [],
    },
    {
      id: "itinerary",
      label: "Itinerary",
      icon: RouteIcon,
      description: "Daily schedule and activities",
      requiredFields: ["itinerary"],
    },
    {
      id: "booking-dates",
      label: "Booking Dates",
      icon: CalendarIcon,
      description: "Available dates and tour guides",
      requiredFields: ["bookingDates"],
    },
    {
      id: "images",
      label: "Images",
      icon: ImageIcon,
      description: "Hero image and gallery photos",
      requiredFields: ["heroImage"],
    },
  ];

  // Calculate completion status for each tab
  const getTabCompletionStatus = (tab: TabInfo) => {
    const hasErrors = tab.requiredFields.some((field) => errors[field]);
    const hasRequiredData = tab.requiredFields.every((field) => {
      if (field === "bookingDates") {
        return (
          bookingDates.length > 0 &&
          bookingDates.every((date) => date.startDate && date.endDate)
        );
      }
      if (field === "itinerary") {
        return (
          itineraryItems.length > 0 &&
          itineraryItems.every((item) => item.title && item.description)
        );
      }
      if (field === "heroImage") {
        return formData.images?.hero && formData.images.hero.trim() !== "";
      }
      return formData[field as keyof typeof formData];
    });

    if (hasErrors) return "error";
    if (tab.requiredFields.length === 0) return "optional";
    return hasRequiredData ? "complete" : "incomplete";
  };

  // Calculate overall progress
  const requiredTabs = tabs.filter((tab) => tab.requiredFields.length > 0);
  const completedTabs = requiredTabs.filter(
    (tab) => getTabCompletionStatus(tab) === "complete"
  );
  const progressPercentage =
    requiredTabs.length > 0
      ? (completedTabs.length / requiredTabs.length) * 100
      : 0;

  const handleInputChange = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value,
    });
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: any
  ) => {
    onFormDataChange({
      ...formData,
      [parent]: {
        ...(formData[parent as keyof typeof formData] as any),
        [field]: value,
      },
    });
  };

  const handleArrayInputChange = (
    field: string,
    index: number,
    value: string
  ) => {
    onFormDataChange({
      ...formData,
      [field]: (formData[field as keyof typeof formData] as string[])?.map(
        (item, i) => (i === index ? value : item)
      ),
    });
  };

  const addArrayItem = (field: string) => {
    onFormDataChange({
      ...formData,
      [field]: [...(formData[field as keyof typeof formData] as string[]), ""],
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    onFormDataChange({
      ...formData,
      [field]: (formData[field as keyof typeof formData] as string[])?.filter(
        (_, i) => i !== index
      ),
    });
  };

  // Navigation helpers
  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const canGoNext = currentTabIndex < tabs.length - 1;
  const canGoPrevious = currentTabIndex > 0;

  const goToNextTab = () => {
    if (canGoNext) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    if (canGoPrevious) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Package Form Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Complete all required sections to create your package
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedTabs.length} of {requiredTabs.length} required
                sections completed
              </span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Complete</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-muted-foreground">Errors</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">Optional</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Interface */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="flex flex-wrap justify-start w-full h-auto p-1 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const status = getTabCompletionStatus(tab);

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col items-center space-y-1 p-3 h-auto relative flex-1 min-w-[100px]"
              >
                <div className="flex items-center space-x-1">
                  <Icon className="h-4 w-4" />

                  {status === "complete" && (
                    <CheckCircleIcon className="h-3 w-3 text-green-500" />
                  )}
                  {status === "error" && (
                    <AlertCircleIcon className="h-3 w-3 text-red-500" />
                  )}
                  {status === "optional" && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  )}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="basic-info" className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Package Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter package name"
                    className={errors.name ? "border-red-500" : ""}
                  />

                  {errors.name && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category || ""}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {packageCategories
                        .filter((cat) => cat !== "All Categories")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the package experience, activities, and what makes it special..."
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />

                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircleIcon className="h-3 w-3 mr-1" />

                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="continent">Continent *</Label>
                  <Select
                    value={formData.continent || ""}
                    onValueChange={(value) =>
                      handleInputChange("continent", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.continent ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select continent" />
                    </SelectTrigger>
                    <SelectContent>
                      {continents
                        .filter((cont) => cont !== "All Continents")
                        .map((continent) => (
                          <SelectItem key={continent} value={continent}>
                            {continent}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.continent && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.continent}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country || ""}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    placeholder="Enter country/countries"
                    className={errors.country ? "border-red-500" : ""}
                  />

                  {errors.country && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.country}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "duration",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className={errors.duration ? "border-red-500" : ""}
                  />

                  {errors.duration && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.duration}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={formData.difficulty || "Easy"}
                    onValueChange={(value) =>
                      handleInputChange("difficulty", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels
                        .filter((level) => level !== "All Levels")
                        .map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (RM) *</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.pricing?.basePrice || ""}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "pricing",
                        "basePrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className={errors.basePrice ? "border-red-500" : ""}
                  />

                  {errors.basePrice && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.basePrice}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="groupSizeMin">Group Size (Min) *</Label>
                  <Input
                    id="groupSizeMin"
                    type="number"
                    min="1"
                    value={formData.groupSize?.min || ""}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "groupSize",
                        "min",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className={errors.groupSizeMin ? "border-red-500" : ""}
                  />

                  {errors.groupSizeMin && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.groupSizeMin}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupSizeMax">Group Size (Max) *</Label>
                  <Input
                    id="groupSizeMax"
                    type="number"
                    min="1"
                    value={formData.groupSize?.max || ""}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "groupSize",
                        "max",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className={errors.groupSizeMax ? "border-red-500" : ""}
                  />

                  {errors.groupSizeMax && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors.groupSizeMax}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="highlights" className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Package Highlights</Label>
                <p className="text-sm text-muted-foreground">
                  Add key selling points and unique features of your package
                </p>
              </div>
              {formData.highlights?.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={highlight}
                    onChange={(e) =>
                      handleArrayInputChange(
                        "highlights",
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Enter package highlight"
                    className="flex-1"
                  />

                  {formData.highlights && formData.highlights.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeArrayItem("highlights", index)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("highlights")}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Highlight
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="essential-items" className="space-y-6">
          <EssentialItemsSection
            data={essentialItems}
            onChange={onEssentialItemsChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="travel-tips" className="space-y-6">
          <TravelTipsSection
            data={travelTips}
            onChange={onTravelTipsChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="inclusions" className="space-y-6">
          <InclusionsExclusionsSection
            data={inclusionsExclusions}
            onChange={onInclusionsExclusionsChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="itinerary" className="space-y-6">
          <DailyItinerarySection
            itineraryItems={itineraryItems}
            onItineraryItemsChange={onItineraryItemsChange}
            packageDuration={formData.duration || 1}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="booking-dates" className="space-y-6">
          <BookingDatesSection
            bookingDates={bookingDates}
            onBookingDatesChange={onBookingDatesChange}
            packageDuration={formData.duration || 1}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image URL</Label>
                <Input
                  id="heroImage"
                  value={formData.images?.hero || ""}
                  onChange={(e) =>
                    handleNestedInputChange("images", "hero", e.target.value)
                  }
                  placeholder="https://example.com/hero-image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label>Gallery Images</Label>
                {formData.images?.gallery?.map((image, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={image}
                      onChange={(e) => {
                        const newGallery = [
                          ...(formData.images?.gallery || []),
                        ];

                        newGallery[index] = e.target.value;
                        handleNestedInputChange(
                          "images",
                          "gallery",
                          newGallery
                        );
                      }}
                      placeholder="https://example.com/gallery-image.jpg"
                      className="flex-1"
                    />

                    {formData.images?.gallery &&
                      formData.images.gallery.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newGallery =
                              formData.images?.gallery?.filter(
                                (_, i) => i !== index
                              ) || [];
                            handleNestedInputChange(
                              "images",
                              "gallery",
                              newGallery
                            );
                          }}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newGallery = [
                      ...(formData.images?.gallery || []),
                      "",
                    ];

                    handleNestedInputChange("images", "gallery", newGallery);
                  }}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Gallery Image
                </Button>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="pdfItinerary">3D PDF Itinerary (Optional)</Label>
                <p className="text-sm text-gray-500">
                  Upload a PDF file that will be displayed as an interactive 3D flipbook for customers
                </p>
                <Input
                  id="pdfItinerary"
                  value={formData.pdfItinerary || ""}
                  onChange={(e) =>
                    onFormDataChange({ ...formData, pdfItinerary: e.target.value })
                  }
                  placeholder="https://example.com/itinerary.pdf"
                />
                <p className="text-xs text-gray-400">
                  💡 Tip: Upload your PDF to a cloud storage service (Google Drive, Dropbox, etc.) and paste the public URL here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Navigation Footer */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousTab}
                disabled={!canGoPrevious}
              >
                Previous: {canGoPrevious ? tabs[currentTabIndex - 1].label : ""}
              </Button>

              <div className="text-center">
                <div className="text-sm font-medium">
                  {tabs[currentTabIndex].label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {tabs[currentTabIndex].description}
                </div>
              </div>

              <Button type="button" onClick={goToNextTab} disabled={!canGoNext}>
                Next: {canGoNext ? tabs[currentTabIndex + 1].label : ""}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
