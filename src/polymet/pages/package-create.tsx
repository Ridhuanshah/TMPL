import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { ArrowLeftIcon, SaveIcon, Loader2Icon } from "lucide-react";

interface PackageFormData {
  name: string;
  slug: string;
  description: string;
  continent: string;
  country: string;
  region: string;
  category: string;
  difficulty: string;
  base_price: number;
  currency: string;
  duration_days: number;
  duration_nights: number;
  min_group_size: number;
  max_group_size: number;
  status: string;
  hero_image: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
}

export function PackageCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    slug: "",
    description: "",
    continent: "",
    country: "",
    region: "",
    category: "",
    difficulty: "easy",
    base_price: 0,
    currency: "RM",
    duration_days: 1,
    duration_nights: 0,
    min_group_size: 1,
    max_group_size: 10,
    status: "draft",
    hero_image: "",
    highlights: [""],
    inclusions: [""],
    exclusions: [""],
  });

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (value: string) => {
    setFormData({
      ...formData,
      name: value,
      slug: generateSlug(value),
    });
  };

  const handleArrayChange = (
    field: "highlights" | "inclusions" | "exclusions",
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: "highlights" | "inclusions" | "exclusions") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (
    field: "highlights" | "inclusions" | "exclusions",
    index: number
  ) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Package name is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Package description is required",
        variant: "destructive",
      });
      return;
    }

    if (formData.base_price <= 0) {
      toast({
        title: "Validation Error",
        description: "Base price must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Filter out empty array items
      const cleanedData = {
        ...formData,
        highlights: formData.highlights.filter((h) => h.trim() !== ""),
        inclusions: formData.inclusions.filter((i) => i.trim() !== ""),
        exclusions: formData.exclusions.filter((e) => e.trim() !== ""),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("packages")
        .insert([cleanedData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Package created successfully",
      });

      navigate(`/admin/packages/view/${data.id}`);
    } catch (error: any) {
      console.error("Error creating package:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create package",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/packages")}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Packages
            </Button>
          </div>
          <h1 className="text-3xl font-bold mt-2">Create New Package</h1>
          <p className="text-muted-foreground mt-1">
            Add a new travel package to your catalog
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Package Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Himalayan Base Camp Trek"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="auto-generated"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your package..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="continent">Continent *</Label>
                <Select
                  value={formData.continent}
                  onValueChange={(value) =>
                    setFormData({ ...formData, continent: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select continent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Africa">Africa</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="South America">South America</SelectItem>
                    <SelectItem value="Oceania">Oceania</SelectItem>
                    <SelectItem value="Antarctica">Antarctica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  placeholder="e.g., Nepal"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  placeholder="e.g., Himalayas"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trekking">Trekking</SelectItem>
                    <SelectItem value="Safari">Safari</SelectItem>
                    <SelectItem value="Expedition">Expedition</SelectItem>
                    <SelectItem value="Eco-Adventure">Eco-Adventure</SelectItem>
                    <SelectItem value="Cultural">Cultural</SelectItem>
                    <SelectItem value="Beach">Beach</SelectItem>
                    <SelectItem value="City Tours">City Tours</SelectItem>
                    <SelectItem value="Cruise">Cruise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level *</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    setFormData({ ...formData, difficulty: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Duration */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Duration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base_price">Base Price *</Label>
                <Input
                  id="base_price"
                  type="number"
                  value={formData.base_price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      base_price: parseFloat(e.target.value),
                    })
                  }
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    setFormData({ ...formData, currency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RM">RM (MYR)</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration_days">Days *</Label>
                <Input
                  id="duration_days"
                  type="number"
                  value={formData.duration_days}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration_days: parseInt(e.target.value),
                    })
                  }
                  min="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration_nights">Nights</Label>
                <Input
                  id="duration_nights"
                  type="number"
                  value={formData.duration_nights}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration_nights: parseInt(e.target.value),
                    })
                  }
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="min_group_size">Min Group</Label>
                <Input
                  id="min_group_size"
                  type="number"
                  value={formData.min_group_size}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      min_group_size: parseInt(e.target.value),
                    })
                  }
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max_group_size">Max Group</Label>
                <Input
                  id="max_group_size"
                  type="number"
                  value={formData.max_group_size}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      max_group_size: parseInt(e.target.value),
                    })
                  }
                  min="1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero_image">Hero Image URL</Label>
              <Input
                id="hero_image"
                value={formData.hero_image}
                onChange={(e) =>
                  setFormData({ ...formData, hero_image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-muted-foreground">
                For now, use an external image URL. Image upload coming soon!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card>
          <CardHeader>
            <CardTitle>Package Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={highlight}
                  onChange={(e) =>
                    handleArrayChange("highlights", index, e.target.value)
                  }
                  placeholder={`Highlight ${index + 1}`}
                />
                {formData.highlights.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeArrayItem("highlights", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("highlights")}
            >
              Add Highlight
            </Button>
          </CardContent>
        </Card>

        {/* Inclusions */}
        <Card>
          <CardHeader>
            <CardTitle>What's Included</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.inclusions.map((inclusion, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={inclusion}
                  onChange={(e) =>
                    handleArrayChange("inclusions", index, e.target.value)
                  }
                  placeholder={`Inclusion ${index + 1}`}
                />
                {formData.inclusions.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeArrayItem("inclusions", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("inclusions")}
            >
              Add Inclusion
            </Button>
          </CardContent>
        </Card>

        {/* Exclusions */}
        <Card>
          <CardHeader>
            <CardTitle>What's Not Included</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.exclusions.map((exclusion, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={exclusion}
                  onChange={(e) =>
                    handleArrayChange("exclusions", index, e.target.value)
                  }
                  placeholder={`Exclusion ${index + 1}`}
                />
                {formData.exclusions.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeArrayItem("exclusions", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem("exclusions")}
            >
              Add Exclusion
            </Button>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/packages")}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <SaveIcon className="h-4 w-4 mr-2" />
                Create Package
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PackageCreate;
