import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, XIcon, LightbulbIcon, InfoIcon } from "lucide-react";

export interface TravelTip {
  id: string;
  title: string;
  description: string;
}

export interface TravelTipsData {
  tips: TravelTip[];
}

interface TravelTipsSectionProps {
  data: TravelTipsData;
  onChange: (data: TravelTipsData) => void;
  errors?: Record<string, string>;
}

export function TravelTipsSection({
  data,
  onChange,
  errors = {},
}: TravelTipsSectionProps) {
  const generateId = () =>
    `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addTravelTip = () => {
    const newTip: TravelTip = {
      id: generateId(),
      title: "",
      description: "",
    };

    onChange({
      ...data,
      tips: [...data.tips, newTip],
    });
  };

  const removeTravelTip = (tipId: string) => {
    // Keep at least one tip
    if (data.tips.length <= 1) return;

    onChange({
      ...data,
      tips: data.tips.filter((tip) => tip.id !== tipId),
    });
  };

  const updateTravelTip = (
    tipId: string,
    field: keyof TravelTip,
    value: string
  ) => {
    onChange({
      ...data,
      tips: data.tips.map((tip) =>
        tip.id === tipId ? { ...tip, [field]: value } : tip
      ),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <LightbulbIcon className="h-5 w-5 mr-2" />
          Essential Travel Tips
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Provide helpful travel tips and advice to help customers prepare for
          their journey and make the most of their experience.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Travel Tips List */}
        <div className="space-y-4">
          {data.tips.map((tip, index) => (
            <div
              key={tip.id}
              className="space-y-3 p-4 border rounded-lg bg-muted/20"
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Travel Tip #{index + 1}
                </Label>
                {data.tips.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTravelTip(tip.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor={`tip-title-${tip.id}`} className="text-xs">
                    Tip Title *
                  </Label>
                  <Input
                    id={`tip-title-${tip.id}`}
                    value={tip.title}
                    onChange={(e) =>
                      updateTravelTip(tip.id, "title", e.target.value)
                    }
                    placeholder="e.g., Pack Light and Smart"
                    className={
                      errors[`tip-title-${tip.id}`] ? "border-red-500" : ""
                    }
                  />

                  {errors[`tip-title-${tip.id}`] && (
                    <p className="text-xs text-red-500">
                      {errors[`tip-title-${tip.id}`]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={`tip-description-${tip.id}`}
                    className="text-xs"
                  >
                    Tip Description *
                  </Label>
                  <Textarea
                    id={`tip-description-${tip.id}`}
                    value={tip.description}
                    onChange={(e) =>
                      updateTravelTip(tip.id, "description", e.target.value)
                    }
                    placeholder="Provide detailed advice and explanation for this travel tip..."
                    rows={3}
                    className={
                      errors[`tip-description-${tip.id}`]
                        ? "border-red-500"
                        : ""
                    }
                  />

                  {errors[`tip-description-${tip.id}`] && (
                    <p className="text-xs text-red-500">
                      {errors[`tip-description-${tip.id}`]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Tip Button */}
        <Button
          type="button"
          variant="outline"
          onClick={addTravelTip}
          className="w-full"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Travel Tip
        </Button>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Total Tips: {data.tips.length}</span>
          <Badge variant="secondary" className="text-xs">
            {data.tips.length}
          </Badge>
        </div>

        <Separator />

        {/* Preview Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <InfoIcon className="h-4 w-4 text-blue-500" />

            <Label className="text-sm font-medium">Preview:</Label>
          </div>

          <div className="bg-card p-4 rounded-lg border space-y-3">
            <p className="text-xs text-muted-foreground">
              How travel tips will appear to customers:
            </p>

            {data.tips.slice(0, 3).map((tip, index) => (
              <div key={tip.id} className="space-y-2">
                <div className="flex items-start space-x-2">
                  <LightbulbIcon className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />

                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-medium">
                      {tip.title || `Travel Tip ${index + 1}`}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {tip.description || "Tip description will appear here..."}
                    </p>
                  </div>
                </div>
                {index < Math.min(data.tips.length - 1, 2) && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}

            {data.tips.length > 3 && (
              <p className="text-xs text-muted-foreground text-center pt-2">
                ... and {data.tips.length - 3} more tips
              </p>
            )}

            {data.tips.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">
                No travel tips added yet
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
