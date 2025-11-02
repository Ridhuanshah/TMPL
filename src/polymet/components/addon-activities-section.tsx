import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  PlusIcon,
  MinusIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  StarIcon,
} from "lucide-react";

export interface AddOnActivity {
  id: string;
  name: string;
  description: string;
  price: number;
  isFree: boolean;
  duration: string;
  location: string;
  maxQuota: number;
  currentBookings: number;
  availableSlots: number;
  category:
    | "adventure"
    | "cultural"
    | "relaxation"
    | "dining"
    | "shopping"
    | "sightseeing";
  difficulty?: "easy" | "moderate" | "challenging";
  minParticipants?: number;
  includes: string[];
  excludes: string[];
  images?: string[];
  rating?: number;
  reviews?: number;
}

export interface SelectedAddOn {
  activityId: string;
  quantity: number;
  totalPrice: number;
}

export interface AddOnActivitiesData {
  selectedActivities: SelectedAddOn[];
  totalAddOnAmount: number;
}

interface AddOnActivitiesSectionProps {
  packageId: string;
  participantCount: number;
  onAddOnChange: (data: AddOnActivitiesData) => void;
  errors?: Record<string, string>;
}

export function AddOnActivitiesSection({
  packageId,
  participantCount,
  onAddOnChange,
  errors = {},
}: AddOnActivitiesSectionProps) {
  const [selectedActivities, setSelectedActivities] = useState<SelectedAddOn[]>(
    []
  );
  const [availableActivities, setAvailableActivities] = useState<
    AddOnActivity[]
  >([]);

  // Mock data for add-on activities
  useEffect(() => {
    // In real implementation, fetch activities based on packageId
    const mockActivities: AddOnActivity[] = [
      {
        id: "addon_001",
        name: "Sunset Hot Air Balloon Ride",
        description:
          "Experience breathtaking views of the landscape from a hot air balloon during golden hour. Professional pilot and safety briefing included.",
        price: 299,
        isFree: false,
        duration: "3 hours",
        location: "Cappadocia Valley",
        maxQuota: 12,
        currentBookings: 8,
        availableSlots: 4,
        category: "adventure",
        difficulty: "easy",
        minParticipants: 2,
        includes: [
          "Professional pilot",
          "Safety equipment",
          "Certificate",
          "Light refreshments",
        ],

        excludes: ["Hotel transfers", "Insurance"],
        rating: 4.8,
        reviews: 156,
      },
      {
        id: "addon_002",
        name: "Traditional Cooking Class",
        description:
          "Learn to prepare authentic local dishes with a professional chef. Take home recipes and enjoy your creations.",
        price: 85,
        isFree: false,
        duration: "4 hours",
        location: "Local Culinary School",
        maxQuota: 20,
        currentBookings: 12,
        availableSlots: 8,
        category: "cultural",
        difficulty: "easy",
        includes: ["All ingredients", "Recipe book", "Apron", "Lunch"],
        excludes: ["Beverages", "Transportation"],
        rating: 4.9,
        reviews: 203,
      },
      {
        id: "addon_003",
        name: "Spa & Wellness Package",
        description:
          "Relax and rejuvenate with a full spa treatment including massage, facial, and access to wellness facilities.",
        price: 0,
        isFree: true,
        duration: "2 hours",
        location: "Resort Spa",
        maxQuota: 15,
        currentBookings: 10,
        availableSlots: 5,
        category: "relaxation",
        includes: [
          "60-min massage",
          "Facial treatment",
          "Sauna access",
          "Herbal tea",
        ],

        excludes: ["Additional treatments", "Products"],
        rating: 4.7,
        reviews: 89,
      },
      {
        id: "addon_004",
        name: "Private City Photography Tour",
        description:
          "Explore hidden gems of the city with a professional photographer who will capture your best moments.",
        price: 150,
        isFree: false,
        duration: "5 hours",
        location: "City Center",
        maxQuota: 8,
        currentBookings: 8,
        availableSlots: 0,
        category: "sightseeing",
        difficulty: "moderate",
        minParticipants: 1,
        includes: [
          "Professional photographer",
          "Edited photos (20)",
          "City map",
          "Local insights",
        ],

        excludes: ["Camera equipment", "Meals", "Transportation"],
        rating: 4.6,
        reviews: 74,
      },
      {
        id: "addon_005",
        name: "Local Market Food Tour",
        description:
          "Discover authentic flavors and local delicacies with a knowledgeable food guide through bustling markets.",
        price: 65,
        isFree: false,
        duration: "3 hours",
        location: "Traditional Markets",
        maxQuota: 25,
        currentBookings: 15,
        availableSlots: 10,
        category: "dining",
        difficulty: "easy",
        includes: [
          "Food tastings",
          "Local guide",
          "Market map",
          "Recipe cards",
        ],

        excludes: ["Full meals", "Beverages", "Shopping"],
        rating: 4.5,
        reviews: 128,
      },
    ];

    setAvailableActivities(mockActivities);
  }, [packageId]);

  const handleActivityToggle = (activity: AddOnActivity, checked: boolean) => {
    if (checked) {
      // Add activity with quantity 1
      const newSelection: SelectedAddOn = {
        activityId: activity.id,
        quantity: 1,
        totalPrice: activity.isFree ? 0 : activity.price,
      };
      setSelectedActivities((prev) => [...prev, newSelection]);
    } else {
      // Remove activity
      setSelectedActivities((prev) =>
        prev.filter((item) => item.activityId !== activity.id)
      );
    }
  };

  const handleQuantityChange = (activityId: string, newQuantity: number) => {
    const activity = availableActivities.find((a) => a.id === activityId);
    if (!activity) return;

    if (newQuantity <= 0) {
      // Remove if quantity is 0 or less
      setSelectedActivities((prev) =>
        prev.filter((item) => item.activityId !== activityId)
      );
    } else {
      // Update quantity
      setSelectedActivities((prev) =>
        prev.map((item) =>
          item.activityId === activityId
            ? {
                ...item,
                quantity: Math.min(
                  newQuantity,
                  activity.availableSlots,
                  participantCount
                ),
                totalPrice: activity.isFree
                  ? 0
                  : activity.price *
                    Math.min(
                      newQuantity,
                      activity.availableSlots,
                      participantCount
                    ),
              }
            : item
        )
      );
    }
  };

  // Calculate total add-on amount
  useEffect(() => {
    const totalAmount = selectedActivities.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const data: AddOnActivitiesData = {
      selectedActivities,
      totalAddOnAmount: totalAmount,
    };

    onAddOnChange(data);
  }, [selectedActivities, onAddOnChange]);

  const isActivitySelected = (activityId: string) => {
    return selectedActivities.some((item) => item.activityId === activityId);
  };

  const getSelectedQuantity = (activityId: string) => {
    const selected = selectedActivities.find(
      (item) => item.activityId === activityId
    );
    return selected ? selected.quantity : 0;
  };

  const getCategoryColor = (category: AddOnActivity["category"]) => {
    const colors = {
      adventure: "bg-orange-100 text-orange-800",
      cultural: "bg-purple-100 text-purple-800",
      relaxation: "bg-green-100 text-green-800",
      dining: "bg-red-100 text-red-800",
      shopping: "bg-blue-100 text-blue-800",
      sightseeing: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyColor = (difficulty?: string) => {
    const colors = {
      easy: "bg-green-100 text-green-800",
      moderate: "bg-yellow-100 text-yellow-800",
      challenging: "bg-red-100 text-red-800",
    };
    return difficulty
      ? colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800"
      : "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Optional Add-On Activities
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enhance your experience with these optional activities. Activities may
          be free or paid, and have limited availability.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {availableActivities.length === 0 ? (
          <Alert>
            <AlertCircleIcon className="h-4 w-4" />

            <AlertDescription>
              No add-on activities are available for this package at the moment.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {availableActivities.map((activity) => {
              const isSelected = isActivitySelected(activity.id);
              const selectedQuantity = getSelectedQuantity(activity.id);
              const isFullyBooked = activity.availableSlots === 0;
              const maxSelectableQuantity = Math.min(
                activity.availableSlots,
                participantCount
              );

              return (
                <Card
                  key={activity.id}
                  className={`transition-colors ${isSelected ? "ring-2 ring-primary" : ""} ${isFullyBooked ? "opacity-60" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleActivityToggle(activity, checked as boolean)
                            }
                            disabled={isFullyBooked}
                            className="mt-1"
                          />

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{activity.name}</h4>
                              {activity.isFree && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800"
                                >
                                  FREE
                                </Badge>
                              )}
                              {isFullyBooked && (
                                <Badge variant="destructive">
                                  Fully Booked
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge
                                variant="outline"
                                className={getCategoryColor(activity.category)}
                              >
                                {activity.category}
                              </Badge>
                              {activity.difficulty && (
                                <Badge
                                  variant="outline"
                                  className={getDifficultyColor(
                                    activity.difficulty
                                  )}
                                >
                                  {activity.difficulty}
                                </Badge>
                              )}
                              {activity.rating && (
                                <Badge
                                  variant="outline"
                                  className="flex items-center"
                                >
                                  <StarIcon className="h-3 w-3 mr-1 fill-current" />
                                  {activity.rating} ({activity.reviews})
                                </Badge>
                              )}
                            </div>

                            <p className="text-sm text-muted-foreground">
                              {activity.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          {activity.isFree ? (
                            <div className="text-lg font-bold text-green-600">
                              FREE
                            </div>
                          ) : (
                            <div className="text-lg font-bold">
                              RM {activity.price.toLocaleString()}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            per person
                          </div>
                        </div>
                      </div>

                      {/* Activity Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <ClockIcon className="h-4 w-4 mr-2" />

                          {activity.duration}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPinIcon className="h-4 w-4 mr-2" />

                          {activity.location}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <UsersIcon className="h-4 w-4 mr-2" />
                          {activity.availableSlots} / {activity.maxQuota}{" "}
                          available
                        </div>
                      </div>

                      {/* Includes/Excludes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-green-700 mb-1">
                            Includes:
                          </h5>
                          <ul className="space-y-1">
                            {activity.includes
                              .slice(0, 3)
                              .map((item, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-muted-foreground"
                                >
                                  <CheckCircleIcon className="h-3 w-3 mr-2 text-green-600" />

                                  {item}
                                </li>
                              ))}
                            {activity.includes.length > 3 && (
                              <li className="text-xs text-muted-foreground">
                                +{activity.includes.length - 3} more items
                              </li>
                            )}
                          </ul>
                        </div>

                        {activity.excludes.length > 0 && (
                          <div>
                            <h5 className="font-medium text-red-700 mb-1">
                              Excludes:
                            </h5>
                            <ul className="space-y-1">
                              {activity.excludes
                                .slice(0, 2)
                                .map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center text-muted-foreground"
                                  >
                                    <MinusIcon className="h-3 w-3 mr-2 text-red-600" />

                                    {item}
                                  </li>
                                ))}
                              {activity.excludes.length > 2 && (
                                <li className="text-xs text-muted-foreground">
                                  +{activity.excludes.length - 2} more items
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Quantity Selection */}
                      {isSelected && !isFullyBooked && (
                        <>
                          <Separator />

                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label className="text-sm font-medium">
                                Quantity
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Maximum {maxSelectableQuantity} participants
                                {activity.minParticipants &&
                                  ` (minimum ${activity.minParticipants})`}
                              </p>
                            </div>

                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(
                                    activity.id,
                                    selectedQuantity - 1
                                  )
                                }
                                disabled={
                                  selectedQuantity <=
                                  (activity.minParticipants || 1)
                                }
                              >
                                <MinusIcon className="h-4 w-4" />
                              </Button>

                              <Input
                                type="number"
                                value={selectedQuantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    activity.id,
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                min={activity.minParticipants || 1}
                                max={maxSelectableQuantity}
                                className="w-16 text-center"
                              />

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(
                                    activity.id,
                                    selectedQuantity + 1
                                  )
                                }
                                disabled={
                                  selectedQuantity >= maxSelectableQuantity
                                }
                              >
                                <PlusIcon className="h-4 w-4" />
                              </Button>

                              <div className="text-right ml-4">
                                <div className="font-medium">
                                  RM{" "}
                                  {(activity.isFree
                                    ? 0
                                    : activity.price * selectedQuantity
                                  ).toLocaleString()}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  subtotal
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Summary */}
        {selectedActivities.length > 0 && (
          <>
            <Separator />

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Add-On Activities Summary</h4>
                <div className="space-y-2">
                  {selectedActivities.map((selected) => {
                    const activity = availableActivities.find(
                      (a) => a.id === selected.activityId
                    );
                    if (!activity) return null;

                    return (
                      <div
                        key={selected.activityId}
                        className="flex justify-between items-center text-sm"
                      >
                        <span>
                          {activity.name} × {selected.quantity}
                        </span>
                        <span className="font-medium">
                          RM {selected.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}

                  <Separator />

                  <div className="flex justify-between items-center font-medium">
                    <span>Total Add-On Amount:</span>
                    <span className="text-lg">
                      RM{" "}
                      {selectedActivities
                        .reduce((sum, item) => sum + item.totalPrice, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default AddOnActivitiesSection;
