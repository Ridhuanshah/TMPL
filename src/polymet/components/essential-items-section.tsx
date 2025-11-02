import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, XIcon, PackageIcon, AlertCircleIcon } from "lucide-react";

export interface EssentialItem {
  id: string;
  text: string;
}

export interface EssentialItemsData {
  items: EssentialItem[];
}

interface EssentialItemsSectionProps {
  data: EssentialItemsData;
  onChange: (data: EssentialItemsData) => void;
  errors?: Record<string, string>;
}

export function EssentialItemsSection({
  data,
  onChange,
  errors = {},
}: EssentialItemsSectionProps) {
  const addItem = () => {
    const newItem: EssentialItem = {
      id: `item_${Date.now()}`,
      text: "",
    };

    onChange({
      ...data,
      items: [...data.items, newItem],
    });
  };

  const removeItem = (itemId: string) => {
    if (data.items.length <= 1) return; // Keep at least one item

    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== itemId),
    });
  };

  const updateItem = (itemId: string, text: string) => {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === itemId ? { ...item, text } : item
      ),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PackageIcon className="h-5 w-5 mr-2" />
          Essential Items to Pack
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          List important items that travelers should pack for this trip. Help
          customers prepare properly for their adventure.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  value={item.text}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  placeholder="e.g., Waterproof hiking boots, Sunscreen SPF 50+, Warm jacket"
                  className={
                    errors[`essentialItem-${item.id}`] ? "border-red-500" : ""
                  }
                />

                {errors[`essentialItem-${item.id}`] && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircleIcon className="h-3 w-3 mr-1" />

                    {errors[`essentialItem-${item.id}`]}
                  </p>
                )}
              </div>

              {data.items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            className="flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Essential Item
          </Button>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              Total Items: {data.items.length}
            </Badge>
          </div>
        </div>

        {data.items.length > 0 && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <Label className="text-sm font-medium text-muted-foreground">
              Preview:
            </Label>
            <div className="mt-2 space-y-1">
              {data.items
                .filter((item) => item.text.trim())
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center text-sm text-muted-foreground"
                  >
                    <PackageIcon className="h-3 w-3 mr-2 text-blue-500" />

                    {item.text}
                  </div>
                ))}
              {data.items.filter((item) => item.text.trim()).length > 3 && (
                <div className="text-xs text-muted-foreground ml-5">
                  +{data.items.filter((item) => item.text.trim()).length - 3}{" "}
                  more items...
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
