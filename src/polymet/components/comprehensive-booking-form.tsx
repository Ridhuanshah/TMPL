import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserIcon,
  MapPinIcon,
  CreditCardIcon,
  UsersIcon,
  PlusIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";

// Import URS components
import {
  RepeatingCustomerDiscount,
  RepeatingCustomerData,
} from "@/polymet/components/repeating-customer-discount";
import {
  AddOnActivitiesSection,
  AddOnActivitiesData,
} from "@/polymet/components/addon-activities-section";
import {
  InventoryQuotaManagement,
  PackageInventory,
} from "@/polymet/components/inventory-quota-management";
import {
  ParticipantDetailsManagement,
  ParticipantDetailsData,
} from "@/polymet/components/participant-details-management";
import {
  PaymentStructureSection,
  PaymentStructureData,
} from "@/polymet/components/payment-structure-section";
import {
  CouponDiscountSection,
  CouponDiscountData,
} from "@/polymet/components/coupon-discount-section";

export interface ComprehensiveBookingData {
  // Basic booking info
  packageId: string;
  departureDate: string;
  participantCount: number;

  // Customer info
  customerIC: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // URS-specific data
  repeatingCustomerData?: RepeatingCustomerData;
  addOnActivitiesData?: AddOnActivitiesData;
  inventoryData?: PackageInventory;
  participantDetailsData?: ParticipantDetailsData;
  paymentStructureData?: PaymentStructureData;
  couponData?: CouponDiscountData;

  // Calculated totals
  baseAmount: number;
  addOnAmount: number;
  discountAmount: number;
  finalAmount: number;
}

interface ComprehensiveBookingFormProps {
  initialData?: Partial<ComprehensiveBookingData>;
  onDataChange: (data: ComprehensiveBookingData) => void;
  onSubmit: (data: ComprehensiveBookingData) => void;
  isEditing?: boolean;
  errors?: Record<string, string>;
}

export function ComprehensiveBookingForm({
  initialData,
  onDataChange,
  onSubmit,
  isEditing = false,
  errors = {},
}: ComprehensiveBookingFormProps) {
  const [bookingData, setBookingData] = useState<ComprehensiveBookingData>({
    packageId: "",
    departureDate: "",
    participantCount: 1,
    customerIC: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    baseAmount: 15000, // Mock base amount
    addOnAmount: 0,
    discountAmount: 0,
    finalAmount: 15000,
    ...initialData,
  });

  const [currentStep, setCurrentStep] = useState("basic");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Mock package data for demo
  const mockPackageData = {
    id: "pkg_turkey_001",
    name: "Magical Turkey Adventure",
    basePrice: 15000,
    duration: 8,
  };

  // Update parent component when data changes
  useEffect(() => {
    onDataChange(bookingData);
  }, [bookingData, onDataChange]);

  // Calculate totals when relevant data changes
  useEffect(() => {
    const baseAmount = mockPackageData.basePrice * bookingData.participantCount;
    const addOnAmount = bookingData.addOnActivitiesData?.totalAddOnAmount || 0;

    // Calculate discounts
    let discountAmount = 0;

    // Repeating customer discount
    if (bookingData.repeatingCustomerData?.discountApproved) {
      discountAmount += bookingData.repeatingCustomerData.discountAmount;
    }

    // Coupon discount
    if (bookingData.couponData?.discountAmount) {
      discountAmount += bookingData.couponData.discountAmount;
    }

    const finalAmount = Math.max(0, baseAmount + addOnAmount - discountAmount);

    setBookingData((prev) => ({
      ...prev,
      baseAmount,
      addOnAmount,
      discountAmount,
      finalAmount,
    }));
  }, [
    bookingData.participantCount,
    bookingData.addOnActivitiesData?.totalAddOnAmount,
    bookingData.repeatingCustomerData?.discountAmount,
    bookingData.repeatingCustomerData?.discountApproved,
    bookingData.couponData?.discountAmount,
  ]);

  const handleBasicInfoChange = (field: string, value: any) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRepeatingCustomerChange = (data: RepeatingCustomerData) => {
    setBookingData((prev) => ({ ...prev, repeatingCustomerData: data }));
  };

  const handleAddOnActivitiesChange = (data: AddOnActivitiesData) => {
    setBookingData((prev) => ({ ...prev, addOnActivitiesData: data }));
  };

  const handleInventoryUpdate = (data: PackageInventory) => {
    setBookingData((prev) => ({ ...prev, inventoryData: data }));
  };

  const handleParticipantDetailsChange = (data: ParticipantDetailsData) => {
    setBookingData((prev) => ({ ...prev, participantDetailsData: data }));
  };

  const handlePaymentStructureChange = (data: PaymentStructureData) => {
    setBookingData((prev) => ({ ...prev, paymentStructureData: data }));
  };

  const handleCouponChange = (data: CouponDiscountData) => {
    setBookingData((prev) => ({ ...prev, couponData: data }));
  };

  const validateStep = (step: string): boolean => {
    switch (step) {
      case "basic":
        return !!(
          bookingData.customerName &&
          bookingData.customerEmail &&
          bookingData.customerPhone &&
          bookingData.customerIC
        );

      case "inventory":
        return !!(bookingData.packageId && bookingData.departureDate);
      case "participants":
        return bookingData.participantDetailsData?.isComplete || false;
      case "payment":
        return !!bookingData.paymentStructureData?.selectedPaymentMethod;
      default:
        return true;
    }
  };

  const markStepCompleted = (step: string) => {
    if (validateStep(step) && !completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const handleStepChange = (newStep: string) => {
    markStepCompleted(currentStep);
    setCurrentStep(newStep);
  };

  const handleSubmit = () => {
    markStepCompleted(currentStep);
    onSubmit(bookingData);
  };

  const getStepStatus = (step: string) => {
    if (completedSteps.includes(step)) return "completed";
    if (currentStep === step) return "current";
    return "pending";
  };

  const isStepValid = (step: string) => validateStep(step);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              {isEditing ? "Edit Booking" : "New Booking"} -{" "}
              {mockPackageData.name}
            </div>
            <Badge variant="outline">
              {completedSteps.length} / 4 Steps Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            {[
              { key: "basic", label: "Basic Info" },
              { key: "inventory", label: "Package & Dates" },
              { key: "participants", label: "Participants" },
              { key: "payment", label: "Payment" },
            ].map((step, index) => {
              const status = getStepStatus(step.key);
              return (
                <div key={step.key} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      status === "completed"
                        ? "bg-green-500 border-green-500 text-white"
                        : status === "current"
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {status === "completed" ? (
                      <CheckCircleIcon className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`ml-2 ${status === "current" ? "font-medium" : ""}`}
                  >
                    {step.label}
                  </span>
                  {index < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-4" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Form Tabs */}
      <Tabs value={currentStep} onValueChange={handleStepChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic" disabled={false}>
            Basic Info
            {getStepStatus("basic") === "completed" && (
              <CheckCircleIcon className="h-3 w-3 ml-1" />
            )}
          </TabsTrigger>
          <TabsTrigger value="inventory" disabled={!isStepValid("basic")}>
            Package & Dates
            {getStepStatus("inventory") === "completed" && (
              <CheckCircleIcon className="h-3 w-3 ml-1" />
            )}
          </TabsTrigger>
          <TabsTrigger
            value="participants"
            disabled={!isStepValid("inventory")}
          >
            Participants
            {getStepStatus("participants") === "completed" && (
              <CheckCircleIcon className="h-3 w-3 ml-1" />
            )}
          </TabsTrigger>
          <TabsTrigger value="payment" disabled={!isStepValid("participants")}>
            Payment
            {getStepStatus("payment") === "completed" && (
              <CheckCircleIcon className="h-3 w-3 ml-1" />
            )}
          </TabsTrigger>
        </TabsList>

        {/* Step 1: Basic Information & Repeating Customer Check */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    value={bookingData.customerName}
                    onChange={(e) =>
                      handleBasicInfoChange("customerName", e.target.value)
                    }
                    placeholder="Enter full name"
                    className={errors.customerName ? "border-red-500" : ""}
                  />

                  {errors.customerName && (
                    <p className="text-sm text-red-600">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Address *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={bookingData.customerEmail}
                    onChange={(e) =>
                      handleBasicInfoChange("customerEmail", e.target.value)
                    }
                    placeholder="Enter email address"
                    className={errors.customerEmail ? "border-red-500" : ""}
                  />

                  {errors.customerEmail && (
                    <p className="text-sm text-red-600">
                      {errors.customerEmail}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    value={bookingData.customerPhone}
                    onChange={(e) =>
                      handleBasicInfoChange("customerPhone", e.target.value)
                    }
                    placeholder="Enter phone number"
                    className={errors.customerPhone ? "border-red-500" : ""}
                  />

                  {errors.customerPhone && (
                    <p className="text-sm text-red-600">
                      {errors.customerPhone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participantCount">
                    Number of Participants *
                  </Label>
                  <Input
                    id="participantCount"
                    type="number"
                    min="1"
                    max="10"
                    value={bookingData.participantCount}
                    onChange={(e) =>
                      handleBasicInfoChange(
                        "participantCount",
                        parseInt(e.target.value) || 1
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repeating Customer Discount Check */}
          <RepeatingCustomerDiscount
            onDiscountChange={handleRepeatingCustomerChange}
            discountAmount={100}
            isAdminView={false}
          />
        </TabsContent>

        {/* Step 2: Package Selection & Inventory */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2" />
                Package Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">{mockPackageData.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {mockPackageData.duration} days adventure through Turkey's
                  most iconic destinations
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    RM {mockPackageData.basePrice.toLocaleString()}
                  </span>
                  <Badge variant="secondary">per person</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory & Quota Management */}
          <InventoryQuotaManagement
            packageId={mockPackageData.id}
            onInventoryUpdate={handleInventoryUpdate}
            isAdminView={false}
          />

          {/* Add-On Activities */}
          <AddOnActivitiesSection
            packageId={mockPackageData.id}
            participantCount={bookingData.participantCount}
            onAddOnChange={handleAddOnActivitiesChange}
          />
        </TabsContent>

        {/* Step 3: Participant Details */}
        <TabsContent value="participants" className="space-y-6">
          <ParticipantDetailsManagement
            bookingId={isEditing ? "existing-booking" : undefined}
            initialParticipantCount={bookingData.participantCount}
            onParticipantsChange={handleParticipantDetailsChange}
            errors={errors}
            isAdminView={false}
            isReadOnly={false}
          />
        </TabsContent>

        {/* Step 4: Payment & Final Review */}
        <TabsContent value="payment" className="space-y-6">
          {/* Coupon Section */}
          <CouponDiscountSection
            totalAmount={bookingData.baseAmount + bookingData.addOnAmount}
            selectedPackageId={mockPackageData.id}
            onCouponApplied={handleCouponChange}
            errors={errors}
          />

          {/* Payment Structure */}
          <PaymentStructureSection
            totalAmount={bookingData.finalAmount}
            departureDate={bookingData.departureDate || "2024-08-15"}
            onPaymentStructureChange={handlePaymentStructureChange}
            paymentMethods={[
              "Credit Card",
              "Bank Transfer",
              "Online Banking",
              "Cash",
            ]}
            errors={errors}
          />

          {/* Final Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    Package ({bookingData.participantCount} participants)
                  </span>
                  <span>RM {bookingData.baseAmount.toLocaleString()}</span>
                </div>

                {bookingData.addOnAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Add-on Activities</span>
                    <span>RM {bookingData.addOnAmount.toLocaleString()}</span>
                  </div>
                )}

                {bookingData.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Total Discounts</span>
                    <span>
                      -RM {bookingData.discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Final Amount</span>
                  <span>RM {bookingData.finalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Validation Status */}
              <div className="space-y-2">
                <h4 className="font-medium">Booking Status</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div
                    className={`flex items-center ${isStepValid("basic") ? "text-green-600" : "text-red-600"}`}
                  >
                    {isStepValid("basic") ? (
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                    )}
                    Customer Info
                  </div>
                  <div
                    className={`flex items-center ${isStepValid("participants") ? "text-green-600" : "text-red-600"}`}
                  >
                    {isStepValid("participants") ? (
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                    )}
                    Participant Details
                  </div>
                  <div
                    className={`flex items-center ${isStepValid("payment") ? "text-green-600" : "text-red-600"}`}
                  >
                    {isStepValid("payment") ? (
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                    )}
                    Payment Method
                  </div>
                  <div
                    className={`flex items-center ${bookingData.inventoryData ? "text-green-600" : "text-red-600"}`}
                  >
                    {bookingData.inventoryData ? (
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                    )}
                    Availability Check
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={
                  !isStepValid("basic") ||
                  !isStepValid("participants") ||
                  !isStepValid("payment")
                }
                className="w-full"
                size="lg"
              >
                {isEditing ? "Update Booking" : "Create Booking"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ComprehensiveBookingForm;
