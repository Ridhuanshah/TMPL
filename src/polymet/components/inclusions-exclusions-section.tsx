import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, XIcon, CheckIcon, XCircleIcon } from "lucide-react";

export interface InclusionExclusionItem {
  id: string;
  text: string;
}

export interface InclusionsExclusionsData {
  inclusions: InclusionExclusionItem[];
  exclusions: InclusionExclusionItem[];
}

interface InclusionsExclusionsSectionProps {
  data: InclusionsExclusionsData;
  onChange: (data: InclusionsExclusionsData) => void;
  errors?: Record<string, string>;
}

export function InclusionsExclusionsSection({
  data,
  onChange,
  errors = {},
}: InclusionsExclusionsSectionProps) {
  const handleInclusionChange = (index: number, value: string) => {
    const newInclusions = [...data.inclusions];
    newInclusions[index] = { ...newInclusions[index], text: value };
    onChange({
      ...data,
      inclusions: newInclusions,
    });
  };

  const handleExclusionChange = (index: number, value: string) => {
    const newExclusions = [...data.exclusions];
    newExclusions[index] = { ...newExclusions[index], text: value };
    onChange({
      ...data,
      exclusions: newExclusions,
    });
  };

  const addInclusion = () => {
    const newId = `inclusion_${Date.now()}`;
    onChange({
      ...data,
      inclusions: [...data.inclusions, { id: newId, text: "" }],
    });
  };

  const removeInclusion = (index: number) => {
    if (data.inclusions.length > 1) {
      const newInclusions = data.inclusions.filter((_, i) => i !== index);
      onChange({
        ...data,
        inclusions: newInclusions,
      });
    }
  };

  const addExclusion = () => {
    const newId = `exclusion_${Date.now()}`;
    onChange({
      ...data,
      exclusions: [...data.exclusions, { id: newId, text: "" }],
    });
  };

  const removeExclusion = (index: number) => {
    if (data.exclusions.length > 1) {
      const newExclusions = data.exclusions.filter((_, i) => i !== index);
      onChange({
        ...data,
        exclusions: newExclusions,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckIcon className="h-5 w-5 mr-2 text-green-600" />
          What's Included and Excluded
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Specify what is included and excluded in this package to set clear
          expectations for customers
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inclusions Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-4 w-4 text-green-600" />

              <Label className="text-base font-medium text-green-700">
                What's Included
              </Label>
            </div>

            <div className="space-y-3">
              {data.inclusions.map((inclusion, index) => (
                <div key={inclusion.id} className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <Input
                    value={inclusion.text}
                    onChange={(e) =>
                      handleInclusionChange(index, e.target.value)
                    }
                    placeholder="e.g., All meals included, Professional guide, Transportation"
                    className="flex-1"
                  />

                  {data.inclusions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInclusion(index)}
                      className="flex-shrink-0 text-red-500 hover:text-red-700"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addInclusion}
              className="w-full border-green-200 text-green-700 hover:bg-green-50"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Inclusion
            </Button>
          </div>

          {/* Exclusions Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <XCircleIcon className="h-4 w-4 text-red-600" />

              <Label className="text-base font-medium text-red-700">
                What's Excluded
              </Label>
            </div>

            <div className="space-y-3">
              {data.exclusions.map((exclusion, index) => (
                <div key={exclusion.id} className="flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <Input
                    value={exclusion.text}
                    onChange={(e) =>
                      handleExclusionChange(index, e.target.value)
                    }
                    placeholder="e.g., Personal expenses, Travel insurance, Alcoholic beverages"
                    className="flex-1"
                  />

                  {data.exclusions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExclusion(index)}
                      className="flex-shrink-0 text-red-500 hover:text-red-700"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addExclusion}
              className="w-full border-red-200 text-red-700 hover:bg-red-50"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Exclusion
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Total Inclusions:</span>
              <span className="font-medium text-green-700">
                {data.inclusions.filter((item) => item.text.trim()).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Exclusions:</span>
              <span className="font-medium text-red-700">
                {data.exclusions.filter((item) => item.text.trim()).length}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
