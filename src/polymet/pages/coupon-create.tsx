import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Eye,
  Calendar,
  Percent,
  DollarSign,
  Gift,
  Truck,
  Info,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { userTiers, continents } from "@/polymet/data/coupon-data";

interface CouponFormData {
  code: string;
  name: string;
  description: string;
  type: "percentage" | "fixed" | "bogo" | "free_shipping" | "";
  value: string;
  status: "active" | "inactive" | "scheduled";
  usageLimit: string;
  unlimitedUsage: boolean;
  minimumAmount: string;
  maximumDiscount: string;
  applicablePackages: string[];
  applicableContinents: string[];
  firstTimeOnly: boolean;
  userTiers: string[];
  startDate: string;
  endDate: string;
  timezone: string;
}

export function CouponCreate() {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState<CouponFormData>({
    code: "",
    name: "",
    description: "",
    type: "",
    value: "",
    status: "active",
    usageLimit: "",
    unlimitedUsage: true,
    minimumAmount: "",
    maximumDiscount: "",
    applicablePackages: [],
    applicableContinents: [],
    firstTimeOnly: false,
    userTiers: [],
    startDate: "",
    endDate: "",
    timezone: "Asia/Kuala_Lumpur",
  });

  const handleInputChange = (field: keyof CouponFormData, value: any) => {
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

  const addPackage = () => {
    const packageName = prompt("Enter package name:");
    if (packageName && packageName.trim()) {
      handleInputChange("applicablePackages", [
        ...formData.applicablePackages,
        packageName.trim(),
      ]);
    }
  };

  const removePackage = (index: number) => {
    const newPackages = formData.applicablePackages.filter(
      (_, i) => i !== index
    );
    handleInputChange("applicablePackages", newPackages);
  };

  const toggleContinent = (continent: string) => {
    const isSelected = formData.applicableContinents.includes(continent);
    if (isSelected) {
      handleInputChange(
        "applicableContinents",
        formData.applicableContinents.filter((c) => c !== continent)
      );
    } else {
      handleInputChange("applicableContinents", [
        ...formData.applicableContinents,
        continent,
      ]);
    }
  };

  const toggleUserTier = (tier: string) => {
    const isSelected = formData.userTiers.includes(tier);
    if (isSelected) {
      handleInputChange(
        "userTiers",
        formData.userTiers.filter((t) => t !== tier)
      );
    } else {
      handleInputChange("userTiers", [...formData.userTiers, tier]);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required";
    } else if (formData.code.length < 3) {
      newErrors.code = "Coupon code must be at least 3 characters";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Coupon name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.type) {
      newErrors.type = "Coupon type is required";
    }

    if (!formData.value.trim()) {
      newErrors.value = "Value is required";
    } else {
      const numValue = parseFloat(formData.value);
      if (isNaN(numValue) || numValue <= 0) {
        newErrors.value = "Value must be a positive number";
      }
      if (formData.type === "percentage" && numValue > 100) {
        newErrors.value = "Percentage cannot exceed 100%";
      }
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    if (!formData.unlimitedUsage && !formData.usageLimit.trim()) {
      newErrors.usageLimit = "Usage limit is required when not unlimited";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Here you would typically save to backend
      console.log("Saving coupon:", formData);
      setIsSaved(true);
    }
  };

  // Redirect to coupons page after save
  if (isSaved) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg mb-4">Coupon saved successfully!</p>
        <Link to="/admin/coupons">
          <Button>Go to Coupons</Button>
        </Link>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4" />;

      case "fixed":
        return <DollarSign className="h-4 w-4" />;

      case "bogo":
        return <Gift className="h-4 w-4" />;

      case "free_shipping":
        return <Truck className="h-4 w-4" />;

      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const formatPreviewValue = () => {
    if (!formData.type || !formData.value) return "";

    switch (formData.type) {
      case "percentage":
        return `${formData.value}%`;
      case "fixed":
        return `RM ${formData.value}`;
      case "bogo":
        return `BOGO ${formData.value}%`;
      case "free_shipping":
        return "Free Service";
      default:
        return formData.value;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/admin/coupons">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Coupons
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Coupon</h1>
            <p className="text-muted-foreground mt-2">
              Set up a new promotional coupon with custom rules and conditions
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? "Hide" : "Show"} Preview
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Coupon
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
              <TabsTrigger value="usage">Usage Limits</TabsTrigger>
              <TabsTrigger value="validity">Validity</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Configure the basic details of your coupon
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">Coupon Code *</Label>
                      <Input
                        id="code"
                        placeholder="e.g., SUMMER2024"
                        value={formData.code}
                        onChange={(e) =>
                          handleInputChange(
                            "code",
                            e.target.value.toUpperCase()
                          )
                        }
                        className={errors.code ? "border-red-500" : ""}
                      />

                      {errors.code && (
                        <p className="text-sm text-red-500">{errors.code}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Coupon Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Summer Vacation Special"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={errors.name ? "border-red-500" : ""}
                      />

                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this coupon offers and when it can be used"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className={errors.description ? "border-red-500" : ""}
                      rows={3}
                    />

                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Coupon Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          handleInputChange("type", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.type ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select coupon type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">
                            <div className="flex items-center space-x-2">
                              <Percent className="h-4 w-4" />

                              <span>Percentage Discount</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="fixed">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4" />

                              <span>Fixed Amount</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="bogo">
                            <div className="flex items-center space-x-2">
                              <Gift className="h-4 w-4" />

                              <span>Buy One Get One</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="free_shipping">
                            <div className="flex items-center space-x-2">
                              <Truck className="h-4 w-4" />

                              <span>Free Service</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-sm text-red-500">{errors.type}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="value">
                        Value * {formData.type === "percentage" && "(%)"}
                        {formData.type === "fixed" && "(RM)"}
                        {formData.type === "bogo" && "(% off cheaper item)"}
                        {formData.type === "free_shipping" &&
                          "(Service value in RM)"}
                      </Label>
                      <Input
                        id="value"
                        type="number"
                        placeholder={
                          formData.type === "percentage"
                            ? "15"
                            : formData.type === "fixed"
                              ? "500"
                              : formData.type === "bogo"
                                ? "50"
                                : "200"
                        }
                        value={formData.value}
                        onChange={(e) =>
                          handleInputChange("value", e.target.value)
                        }
                        className={errors.value ? "border-red-500" : ""}
                      />

                      {errors.value && (
                        <p className="text-sm text-red-500">{errors.value}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleInputChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conditions Tab */}
            <TabsContent value="conditions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Conditions</CardTitle>
                  <CardDescription>
                    Set specific conditions for when this coupon can be used
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minimumAmount">
                        Minimum Order Amount (RM)
                      </Label>
                      <Input
                        id="minimumAmount"
                        type="number"
                        placeholder="e.g., 2000"
                        value={formData.minimumAmount}
                        onChange={(e) =>
                          handleInputChange("minimumAmount", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maximumDiscount">
                        Maximum Discount (RM)
                      </Label>
                      <Input
                        id="maximumDiscount"
                        type="number"
                        placeholder="e.g., 1000"
                        value={formData.maximumDiscount}
                        onChange={(e) =>
                          handleInputChange("maximumDiscount", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="firstTimeOnly"
                        checked={formData.firstTimeOnly}
                        onCheckedChange={(checked) =>
                          handleInputChange("firstTimeOnly", checked)
                        }
                      />

                      <Label htmlFor="firstTimeOnly">
                        First-time customers only
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Applicable User Tiers</Label>
                    <div className="flex flex-wrap gap-2">
                      {userTiers.map((tier) => (
                        <Badge
                          key={tier}
                          variant={
                            formData.userTiers.includes(tier.toLowerCase())
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleUserTier(tier.toLowerCase())}
                        >
                          {tier}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Applicable Continents</Label>
                    <div className="flex flex-wrap gap-2">
                      {continents.map((continent) => (
                        <Badge
                          key={continent}
                          variant={
                            formData.applicableContinents.includes(continent)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleContinent(continent)}
                        >
                          {continent}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Applicable Packages</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPackage}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Package
                      </Button>
                    </div>
                    {formData.applicablePackages.length > 0 && (
                      <div className="space-y-2">
                        {formData.applicablePackages.map((pkg, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-muted p-2 rounded"
                          >
                            <span className="text-sm">{pkg}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removePackage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Usage Limits Tab */}
            <TabsContent value="usage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Limits</CardTitle>
                  <CardDescription>
                    Control how many times this coupon can be used
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="unlimitedUsage"
                      checked={formData.unlimitedUsage}
                      onCheckedChange={(checked) =>
                        handleInputChange("unlimitedUsage", checked)
                      }
                    />

                    <Label htmlFor="unlimitedUsage">Unlimited usage</Label>
                  </div>

                  {!formData.unlimitedUsage && (
                    <div className="space-y-2">
                      <Label htmlFor="usageLimit">Usage Limit *</Label>
                      <Input
                        id="usageLimit"
                        type="number"
                        placeholder="e.g., 500"
                        value={formData.usageLimit}
                        onChange={(e) =>
                          handleInputChange("usageLimit", e.target.value)
                        }
                        className={errors.usageLimit ? "border-red-500" : ""}
                      />

                      {errors.usageLimit && (
                        <p className="text-sm text-red-500">
                          {errors.usageLimit}
                        </p>
                      )}
                    </div>
                  )}

                  <Alert>
                    <Info className="h-4 w-4" />

                    <AlertTitle>Usage Tracking</AlertTitle>
                    <AlertDescription>
                      Usage limits help control the total redemptions and manage
                      your promotional budget effectively.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Validity Tab */}
            <TabsContent value="validity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Validity Period</CardTitle>
                  <CardDescription>
                    Set when this coupon will be active and available for use
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                        className={errors.startDate ? "border-red-500" : ""}
                      />

                      {errors.startDate && (
                        <p className="text-sm text-red-500">
                          {errors.startDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) =>
                          handleInputChange("endDate", e.target.value)
                        }
                        className={errors.endDate ? "border-red-500" : ""}
                      />

                      {errors.endDate && (
                        <p className="text-sm text-red-500">{errors.endDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={formData.timezone}
                      onValueChange={(value) =>
                        handleInputChange("timezone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kuala_Lumpur">
                          Asia/Kuala Lumpur (MYT)
                        </SelectItem>
                        <SelectItem value="Asia/Singapore">
                          Asia/Singapore (SGT)
                        </SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.startDate && formData.endDate && (
                    <Alert>
                      <Calendar className="h-4 w-4" />

                      <AlertTitle>Validity Summary</AlertTitle>
                      <AlertDescription>
                        This coupon will be active from{" "}
                        <strong>
                          {new Date(formData.startDate).toLocaleString()}
                        </strong>{" "}
                        to{" "}
                        <strong>
                          {new Date(formData.endDate).toLocaleString()}
                        </strong>
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />

                  <span>Coupon Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {formData.type && getTypeIcon(formData.type)}
                        <span className="font-mono text-lg font-bold">
                          {formData.code || "COUPON CODE"}
                        </span>
                      </div>
                      <Badge variant="secondary">
                        {formatPreviewValue() || "Value"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold">
                      {formData.name || "Coupon Name"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.description ||
                        "Coupon description will appear here"}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      <Badge
                        variant={
                          formData.status === "active" ? "default" : "secondary"
                        }
                        className="ml-2"
                      >
                        {formData.status || "active"}
                      </Badge>
                    </div>

                    {formData.minimumAmount && (
                      <div>
                        <span className="font-medium">Min. Order:</span> RM{" "}
                        {formData.minimumAmount}
                      </div>
                    )}

                    {formData.maximumDiscount && (
                      <div>
                        <span className="font-medium">Max. Discount:</span> RM{" "}
                        {formData.maximumDiscount}
                      </div>
                    )}

                    <div>
                      <span className="font-medium">Usage:</span>{" "}
                      {formData.unlimitedUsage
                        ? "Unlimited"
                        : `Limited to ${formData.usageLimit || "N/A"} uses`}
                    </div>

                    {formData.firstTimeOnly && (
                      <div>
                        <span className="font-medium">Restriction:</span>{" "}
                        First-time customers only
                      </div>
                    )}

                    {formData.userTiers.length > 0 && (
                      <div>
                        <span className="font-medium">User Tiers:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.userTiers.map((tier) => (
                            <Badge
                              key={tier}
                              variant="outline"
                              className="text-xs"
                            >
                              {tier}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.applicableContinents.length > 0 && (
                      <div>
                        <span className="font-medium">Continents:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.applicableContinents.map((continent) => (
                            <Badge
                              key={continent}
                              variant="outline"
                              className="text-xs"
                            >
                              {continent}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.applicablePackages.length > 0 && (
                      <div>
                        <span className="font-medium">Packages:</span>
                        <div className="space-y-1 mt-1">
                          {formData.applicablePackages.map((pkg, index) => (
                            <div
                              key={index}
                              className="text-xs bg-muted p-1 rounded"
                            >
                              {pkg}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default CouponCreate;
