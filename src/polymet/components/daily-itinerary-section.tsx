import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusIcon,
  XIcon,
  GripVerticalIcon,
  MapPinIcon,
  ClockIcon,
  AlertCircleIcon,
  DollarSignIcon,
} from "lucide-react";

// Activity tag options
export const activityTags = [
  "Transport",
  "Accommodation",
  "Shopping",
  "Food",
  "Sightseeing",
] as const;

export type ActivityTag = (typeof activityTags)[number];

export interface DailyItineraryItem {
  id: string;
  day: number;
  title: string;
  description: string;
  activityTag: ActivityTag;
  locationFrom: string;
  locationTo: string;
  isOptional: boolean;
  optionalPrice?: number;
}

interface DailyItinerarySectionProps {
  itineraryItems: DailyItineraryItem[];
  onItineraryItemsChange: (items: DailyItineraryItem[]) => void;
  packageDuration: number;
  errors?: Record<string, string>;
}

export function DailyItinerarySection({
  itineraryItems,
  onItineraryItemsChange,
  packageDuration,
  errors = {},
}: DailyItinerarySectionProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const addItineraryItem = () => {
    const newItem: DailyItineraryItem = {
      id: `itinerary_${Date.now()}`,
      day: itineraryItems.length + 1,
      title: "",
      description: "",
      activityTag: "Sightseeing",
      locationFrom: "",
      locationTo: "",
      isOptional: false,
    };

    onItineraryItemsChange([...itineraryItems, newItem]);
  };

  const removeItineraryItem = (id: string) => {
    const updatedItems = itineraryItems
      .filter((item) => item.id !== id)
      .map((item, index) => ({
        ...item,
        day: index + 1,
      }));

    onItineraryItemsChange(updatedItems);
  };

  const updateItineraryItem = (
    id: string,
    field: keyof DailyItineraryItem,
    value: any
  ) => {
    const updatedItems = itineraryItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onItineraryItemsChange(updatedItems);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();

    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      return;
    }

    const draggedIndex = itineraryItems.findIndex(
      (item) => item.id === draggedItem
    );
    const targetIndex = itineraryItems.findIndex(
      (item) => item.id === targetId
    );

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      return;
    }

    const newItems = [...itineraryItems];
    const [draggedItemData] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItemData);

    // Update day numbers
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      day: index + 1,
    }));

    onItineraryItemsChange(updatedItems);
    setDraggedItem(null);
  };

  const getActivityTagColor = (tag: ActivityTag) => {
    switch (tag) {
      case "Transport":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Accommodation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "Shopping":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400";
      case "Food":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Sightseeing":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClockIcon className="h-5 w-5 mr-2" />
          Daily Itinerary
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Create a detailed day-by-day itinerary for your {packageDuration}-day
          package. Items can be reordered by dragging and dropping.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {itineraryItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ClockIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />

            <p className="text-lg font-medium mb-2">No itinerary items yet</p>
            <p className="text-sm mb-4">
              Start building your daily itinerary by adding activities, meals,
              and experiences.
            </p>
            <Button onClick={addItineraryItem}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add First Itinerary Item
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {itineraryItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item.id)}
                  className={`border rounded-lg p-4 space-y-4 transition-all ${
                    draggedItem === item.id
                      ? "opacity-50 scale-95"
                      : "hover:shadow-md cursor-move"
                  }`}
                >
                  {/* Header with Day Number and Drag Handle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <GripVerticalIcon className="h-5 w-5 text-muted-foreground cursor-grab active:cursor-grabbing" />

                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-primary">
                          Day {item.day}
                        </span>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityTagColor(item.activityTag)}`}
                        >
                          {item.activityTag}
                        </div>
                        {item.isOptional && (
                          <div className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                            Optional
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItineraryItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Title and Description */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${item.id}`}>Title *</Label>
                      <Input
                        id={`title-${item.id}`}
                        value={item.title}
                        onChange={(e) =>
                          updateItineraryItem(item.id, "title", e.target.value)
                        }
                        placeholder="e.g., Visit Everest Base Camp, Traditional Sherpa Lunch"
                        className={
                          errors[`title-${item.id}`] ? "border-red-500" : ""
                        }
                      />

                      {errors[`title-${item.id}`] && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircleIcon className="h-3 w-3 mr-1" />

                          {errors[`title-${item.id}`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${item.id}`}>
                        Description *
                      </Label>
                      <Textarea
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) =>
                          updateItineraryItem(
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe the activity, what participants will do, see, or experience..."
                        rows={3}
                        className={
                          errors[`description-${item.id}`]
                            ? "border-red-500"
                            : ""
                        }
                      />

                      {errors[`description-${item.id}`] && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircleIcon className="h-3 w-3 mr-1" />

                          {errors[`description-${item.id}`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Activity Tag and Locations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`activityTag-${item.id}`}>
                        Activity Tag *
                      </Label>
                      <Select
                        value={item.activityTag}
                        onValueChange={(value: ActivityTag) =>
                          updateItineraryItem(item.id, "activityTag", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {activityTags.map((tag) => (
                            <SelectItem key={tag} value={tag}>
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${getActivityTagColor(tag).split(" ")[0]}`}
                                />

                                <span>{tag}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`locationFrom-${item.id}`}>
                        Location From *
                      </Label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                        <Input
                          id={`locationFrom-${item.id}`}
                          value={item.locationFrom}
                          onChange={(e) =>
                            updateItineraryItem(
                              item.id,
                              "locationFrom",
                              e.target.value
                            )
                          }
                          placeholder="Starting location"
                          className={`pl-10 ${errors[`locationFrom-${item.id}`] ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors[`locationFrom-${item.id}`] && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircleIcon className="h-3 w-3 mr-1" />

                          {errors[`locationFrom-${item.id}`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`locationTo-${item.id}`}>
                        Location To *
                      </Label>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                        <Input
                          id={`locationTo-${item.id}`}
                          value={item.locationTo}
                          onChange={(e) =>
                            updateItineraryItem(
                              item.id,
                              "locationTo",
                              e.target.value
                            )
                          }
                          placeholder="Destination location"
                          className={`pl-10 ${errors[`locationTo-${item.id}`] ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors[`locationTo-${item.id}`] && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircleIcon className="h-3 w-3 mr-1" />

                          {errors[`locationTo-${item.id}`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Optional Activity Toggle and Pricing */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`optional-${item.id}`}
                        checked={item.isOptional}
                        onCheckedChange={(checked) => {
                          updateItineraryItem(item.id, "isOptional", checked);
                          if (!checked) {
                            updateItineraryItem(
                              item.id,
                              "optionalPrice",
                              undefined
                            );
                          }
                        }}
                      />

                      <Label
                        htmlFor={`optional-${item.id}`}
                        className="text-sm font-medium"
                      >
                        This is an optional activity
                      </Label>
                    </div>

                    {item.isOptional && (
                      <div className="space-y-2 ml-6">
                        <Label htmlFor={`optionalPrice-${item.id}`}>
                          Optional Activity Price (RM) *
                        </Label>
                        <div className="relative">
                          <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                          <Input
                            id={`optionalPrice-${item.id}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.optionalPrice || ""}
                            onChange={(e) =>
                              updateItineraryItem(
                                item.id,
                                "optionalPrice",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            placeholder="0.00"
                            className={`pl-10 ${errors[`optionalPrice-${item.id}`] ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors[`optionalPrice-${item.id}`] && (
                          <p className="text-sm text-red-500 flex items-center">
                            <AlertCircleIcon className="h-3 w-3 mr-1" />

                            {errors[`optionalPrice-${item.id}`]}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Additional cost for participants who choose this
                          optional activity
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addItineraryItem}
              className="w-full"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Itinerary Item
            </Button>
          </>
        )}

        {/* Summary */}
        {itineraryItems.length > 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Itinerary Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Items:</span>
                <span className="font-medium ml-1">
                  {itineraryItems.length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Optional:</span>
                <span className="font-medium ml-1">
                  {itineraryItems.filter((item) => item.isOptional).length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Activity Types:</span>
                <span className="font-medium ml-1">
                  {new Set(itineraryItems.map((item) => item.activityTag)).size}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Optional Revenue:</span>
                <span className="font-medium ml-1">
                  RM{" "}
                  {itineraryItems
                    .filter((item) => item.isOptional && item.optionalPrice)
                    .reduce((sum, item) => sum + (item.optionalPrice || 0), 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
