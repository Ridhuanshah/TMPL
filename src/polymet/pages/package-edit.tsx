import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export function PackageEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
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
      
      // Get auth token from localStorage (same as create form)
      const sessionData = localStorage.getItem('sb-vvrmfgealitetfgwsdeu-auth-token');
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
      
      const response = await fetch(`${supabaseUrl}/rest/v1/packages?id=eq.${id}`, {
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("📡 Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Fetch error:", errorText);
        throw new Error(`Failed to fetch package: ${errorText}`);
      }
      
      const packages = await response.json();
      const data = packages[0];
      
      console.log("✅ Package data loaded:", data);

      if (data) {
        setFormData({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          continent: data.continent || "",
          country: data.country || "",
          region: data.region || "",
          category: data.category || "",
          difficulty: data.difficulty || "easy",
          base_price: data.base_price || 0,
          currency: data.currency || "RM",
          duration_days: data.duration_days || 1,
          duration_nights: data.duration_nights || 0,
          min_group_size: data.min_group_size || 1,
          max_group_size: data.max_group_size || 10,
          status: data.status || "draft",
          hero_image: data.hero_image || "",
          highlights: data.highlights && data.highlights.length > 0 ? data.highlights : [""],
          inclusions: data.inclusions && data.inclusions.length > 0 ? data.inclusions : [""],
          exclusions: data.exclusions && data.exclusions.length > 0 ? data.exclusions : [""],
        });
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

      console.log("🚀 Updating package...");
      
      // Get auth token from localStorage (same as create form)
      const sessionData = localStorage.getItem('sb-vvrmfgealitetfgwsdeu-auth-token');
      if (!sessionData) {
        throw new Error("Not authenticated - please log in again");
      }
      
      const session = JSON.parse(sessionData);
      const accessToken = session?.access_token;
      
      if (!accessToken) {
        throw new Error("Session expired - please log in again");
      }

      // Filter out empty array items
      const cleanedData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        continent: formData.continent,
        country: formData.country,
        region: formData.region,
        category: formData.category,
        difficulty: formData.difficulty,
        base_price: formData.base_price,
        currency: formData.currency,
        duration_days: formData.duration_days,
        duration_nights: formData.duration_nights,
        min_group_size: formData.min_group_size,
        max_group_size: formData.max_group_size,
        status: formData.status,
        hero_image: formData.hero_image,
        highlights: formData.highlights.filter((h) => h.trim() !== ""),
        inclusions: formData.inclusions.filter((i) => i.trim() !== ""),
        exclusions: formData.exclusions.filter((e) => e.trim() !== ""),
        updated_at: new Date().toISOString(),
      };

      console.log("📦 Data to update:", cleanedData);

      // Direct API call for UPDATE
      const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      console.log("🔗 Making direct API call to update package...");
      
      const response = await fetch(`${supabaseUrl}/rest/v1/packages?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(cleanedData)
      });
      
      console.log("📡 Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Update error:", errorText);
        throw new Error(`Failed to update package: ${errorText}`);
      }
      
      console.log("✅ Package updated successfully!");

      toast({
        title: "Success!",
        description: "Package updated successfully",
      });

      navigate(`/admin/packages`);
    } catch (error: any) {
      console.error("Error updating package:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update package",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold mt-2">Edit Package</h1>
          <p className="text-muted-foreground mt-1">
            Update package information
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
                Updating...
              </>
            ) : (
              <>
                <SaveIcon className="h-4 w-4 mr-2" />
                Update Package
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PackageEdit;
