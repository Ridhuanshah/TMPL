import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ArrowLeftIcon,
  SaveIcon,
  UserIcon,
  MapPinIcon,
  CreditCardIcon,
  FileTextIcon,
} from "lucide-react";
import { travelPackages } from "@/polymet/data/package-data";
import { bookings } from "@/polymet/data/booking-data";
import {
  PaymentStructureSection,
  PaymentStructureData,
} from "@/polymet/components/payment-structure-section";
import {
  CouponDiscountSection,
  CouponDiscountData,
} from "@/polymet/components/coupon-discount-section";

export function NewBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState({
    // Customer Information (LHDN E-Invoice Requirements)
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerIC: "",
    customerPassport: "",
    customerAddress: "",
    customerCity: "",
    customerState: "",
    customerPostcode: "",
    customerCountry: "Malaysia",

    // Business Customer (if applicable)
    isBusinessCustomer: false,
    companyName: "",
    companyRegistrationNo: "",
    companyTaxId: "",

    // Travel Package Details
    selectedPackage: "",
    selectedDeparture: "",
    travelStartDate: "",
    travelEndDate: "",
    participants: 1,

    // Participant Details
    participantDetails: [
      { name: "", ic: "", passport: "", age: "", relationship: "Self" },
    ],

    // Special Requirements
    specialRequests: "",
    dietaryRequirements: "",
    medicalConditions: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Payment Information
    totalAmount: 0,
    paymentStructure: null as PaymentStructureData | null,

    // Coupon Information
    couponData: null as CouponDiscountData | null,

    // Invoice Details (LHDN Requirements)
    invoiceDate: new Date().toISOString().split("T")[0],
    currency: "MYR",

    // Terms & Conditions
    agreeTerms: false,
    agreePrivacy: false,
  });

  const malaysianStates = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Malacca",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
  ];

  const paymentMethods = [
    "Credit Card",
    "Bank Transfer",
    "Online Banking",
    "Cash",
    "Cheque",
  ];

  const handlePaymentStructureChange = (data: PaymentStructureData) => {
    setFormData((prev) => ({ ...prev, paymentStructure: data }));
  };

  const handleCouponApplied = (data: CouponDiscountData) => {
    setFormData((prev) => ({ ...prev, couponData: data }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleParticipantChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedParticipants = [...formData.participantDetails];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      participantDetails: updatedParticipants,
    }));
  };

  const addParticipant = () => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants + 1,
      participantDetails: [
        ...prev.participantDetails,
        { name: "", ic: "", passport: "", age: "", relationship: "" },
      ],
    }));
  };

  const removeParticipant = (index: number) => {
    if (formData.participants > 1) {
      const updatedParticipants = formData.participantDetails.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({
        ...prev,
        participants: prev.participants - 1,
        participantDetails: updatedParticipants,
      }));
    }
  };

  const calculateTotal = () => {
    const selectedPkg = travelPackages.find(
      (pkg) => pkg.id === formData.selectedPackage
    );
    if (selectedPkg && formData.selectedDeparture) {
      const selectedBookingDate = selectedPkg.bookingDates.find(
        (date) => date.id === formData.selectedDeparture
      );
      const basePrice = selectedBookingDate
        ? selectedBookingDate.price
        : selectedPkg.pricing.basePrice;
      const baseAmount = basePrice * formData.participants;
      setFormData((prev) => ({
        ...prev,
        totalAmount: baseAmount,
      }));
    } else if (selectedPkg) {
      const baseAmount = selectedPkg.pricing.basePrice * formData.participants;
      setFormData((prev) => ({
        ...prev,
        totalAmount: baseAmount,
      }));
    }
  };

  const handlePackageChange = (packageId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedPackage: packageId,
      selectedDeparture: "",
      travelStartDate: "",
      travelEndDate: "",
    }));
  };

  const handleDepartureChange = (departureId: string) => {
    const selectedPkg = travelPackages.find(
      (pkg) => pkg.id === formData.selectedPackage
    );
    if (selectedPkg) {
      const selectedBookingDate = selectedPkg.bookingDates.find(
        (date) => date.id === departureId
      );
      if (selectedBookingDate) {
        setFormData((prev) => ({
          ...prev,
          selectedDeparture: departureId,
          travelStartDate: selectedBookingDate.startDate,
          travelEndDate: selectedBookingDate.endDate,
        }));
      }
    }
  };

  const getAvailableBookingDates = () => {
    const selectedPkg = travelPackages.find(
      (pkg) => pkg.id === formData.selectedPackage
    );
    if (selectedPkg) {
      return selectedPkg.bookingDates.filter(
        (date) => date.status === "active" && date.booked < date.capacity
      );
    }
    return [];
  };

  // Load existing booking data when editing
  useEffect(() => {
    if (isEditing && id) {
      const existingBooking = bookings.find((booking) => booking.id === id);
      if (existingBooking) {
        setFormData({
          // Customer Information
          customerName: existingBooking.customer.name,
          customerEmail: existingBooking.customer.email,
          customerPhone: existingBooking.customer.phone,
          customerIC: existingBooking.customer.ic || "",
          customerPassport: existingBooking.customer.passport || "",
          customerAddress: existingBooking.customer.address || "",
          customerCity: existingBooking.customer.city || "",
          customerState: existingBooking.customer.state || "",
          customerPostcode: existingBooking.customer.postcode || "",
          customerCountry: existingBooking.customer.country || "Malaysia",

          // Business Customer
          isBusinessCustomer:
            existingBooking.customer.isBusinessCustomer || false,
          companyName: existingBooking.customer.companyName || "",
          companyRegistrationNo:
            existingBooking.customer.companyRegistrationNo || "",
          companyTaxId: existingBooking.customer.companyTaxId || "",

          // Travel Package Details
          selectedPackage: existingBooking.package.id,
          selectedDeparture: existingBooking.selectedDeparture || "",
          travelStartDate: existingBooking.travelDates.startDate,
          travelEndDate: existingBooking.travelDates.endDate,
          participants: existingBooking.participants,

          // Participant Details
          participantDetails: existingBooking.participantDetails || [
            {
              name: existingBooking.customer.name,
              ic: existingBooking.customer.ic || "",
              passport: existingBooking.customer.passport || "",
              age: "",
              relationship: "Self",
            },
          ],

          // Special Requirements
          specialRequests: existingBooking.specialRequests?.join(", ") || "",
          dietaryRequirements: existingBooking.dietaryRequirements || "",
          medicalConditions: existingBooking.medicalConditions || "",
          emergencyContact: existingBooking.emergencyContact?.name || "",
          emergencyPhone: existingBooking.emergencyContact?.phone || "",

          // Payment Information
          totalAmount: existingBooking.totalAmount,
          paymentStructure: existingBooking.paymentStructure || null,

          // Coupon Information
          couponData: existingBooking.couponData || null,

          // Invoice Details
          invoiceDate:
            existingBooking.bookingDate ||
            new Date().toISOString().split("T")[0],
          currency: "MYR",

          // Terms & Conditions
          agreeTerms: true,
          agreePrivacy: true,
        });
      }
    }
  }, [isEditing, id]);

  React.useEffect(() => {
    calculateTotal();
  }, [
    formData.selectedPackage,
    formData.selectedDeparture,
    formData.participants,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    if (isEditing) {
      console.log("Booking updated:", { id, ...formData });
    } else {
      console.log("Booking created:", formData);
    }
    // Form submission will redirect via Link component
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/bookings">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Bookings
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? "Edit Booking" : "Create New Booking"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing
                ? "Update existing booking details with LHDN E-Invoice compliance"
                : "Create a new travel booking with LHDN E-Invoice compliance"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" type="button">
            <SaveIcon className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button type="submit" form="booking-form" asChild>
            <Link to="/admin/bookings">
              {isEditing ? "Update Booking" : "Create Booking"}
            </Link>
          </Button>
        </div>
      </div>

      <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="business-customer"
                checked={formData.isBusinessCustomer}
                onCheckedChange={(checked) =>
                  handleInputChange("isBusinessCustomer", checked)
                }
              />

              <Label htmlFor="business-customer">Business Customer</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) =>
                    handleInputChange("customerName", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Email Address *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) =>
                    handleInputChange("customerEmail", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone Number *</Label>
                <Input
                  id="customerPhone"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    handleInputChange("customerPhone", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerIC">IC/Passport Number *</Label>
                <Input
                  id="customerIC"
                  value={formData.customerIC}
                  onChange={(e) =>
                    handleInputChange("customerIC", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {formData.isBusinessCustomer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-muted rounded-lg">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    required={formData.isBusinessCustomer}
                  />
                </div>
                <div>
                  <Label htmlFor="companyRegistrationNo">
                    Company Registration No *
                  </Label>
                  <Input
                    id="companyRegistrationNo"
                    value={formData.companyRegistrationNo}
                    onChange={(e) =>
                      handleInputChange("companyRegistrationNo", e.target.value)
                    }
                    required={formData.isBusinessCustomer}
                  />
                </div>
                <div>
                  <Label htmlFor="companyTaxId">
                    Tax Identification Number
                  </Label>
                  <Input
                    id="companyTaxId"
                    value={formData.companyTaxId}
                    onChange={(e) =>
                      handleInputChange("companyTaxId", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            <Separator />

            <h4 className="font-medium">Billing Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="customerAddress">Address *</Label>
                <Textarea
                  id="customerAddress"
                  value={formData.customerAddress}
                  onChange={(e) =>
                    handleInputChange("customerAddress", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerCity">City *</Label>
                <Input
                  id="customerCity"
                  value={formData.customerCity}
                  onChange={(e) =>
                    handleInputChange("customerCity", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerState">State *</Label>
                <Select
                  value={formData.customerState}
                  onValueChange={(value) =>
                    handleInputChange("customerState", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {malaysianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="customerPostcode">Postcode *</Label>
                <Input
                  id="customerPostcode"
                  value={formData.customerPostcode}
                  onChange={(e) =>
                    handleInputChange("customerPostcode", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerCountry">Country *</Label>
                <Input
                  id="customerCountry"
                  value={formData.customerCountry}
                  onChange={(e) =>
                    handleInputChange("customerCountry", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Package Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2" />
              Travel Package Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="selectedPackage">Select Package *</Label>
                <Select
                  value={formData.selectedPackage}
                  onValueChange={handlePackageChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a travel package" />
                  </SelectTrigger>
                  <SelectContent>
                    {travelPackages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name} - RM {pkg.pricing.basePrice} ({pkg.duration}{" "}
                        days)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="participants">Number of Participants *</Label>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  value={formData.participants}
                  onChange={(e) =>
                    handleInputChange("participants", parseInt(e.target.value))
                  }
                  required
                />
              </div>
              {formData.selectedPackage && (
                <div>
                  <Label htmlFor="selectedDeparture">
                    Select Departure Date *
                  </Label>
                  <Select
                    value={formData.selectedDeparture}
                    onValueChange={handleDepartureChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose departure date" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableBookingDates().map((bookingDate) => {
                        const availableSpots =
                          bookingDate.capacity - bookingDate.booked;
                        return (
                          <SelectItem
                            key={bookingDate.id}
                            value={bookingDate.id}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {new Date(
                                  bookingDate.startDate
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                  bookingDate.endDate
                                ).toLocaleDateString()}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                RM {bookingDate.price} • {availableSpots} spots
                                available • {bookingDate.tripCode}
                              </span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {formData.selectedDeparture &&
                    (() => {
                      const selectedPkg = travelPackages.find(
                        (pkg) => pkg.id === formData.selectedPackage
                      );
                      const selectedBookingDate =
                        selectedPkg?.bookingDates.find(
                          (date) => date.id === formData.selectedDeparture
                        );
                      if (selectedBookingDate) {
                        return (
                          <div className="mt-2 p-3 bg-muted rounded-lg">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="font-medium">Flight:</span>{" "}
                                {selectedBookingDate.flightCompany} (
                                {selectedBookingDate.flightType})
                              </div>
                              <div>
                                <span className="font-medium">Trip Code:</span>{" "}
                                {selectedBookingDate.tripCode}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Available Spots:
                                </span>{" "}
                                {selectedBookingDate.capacity -
                                  selectedBookingDate.booked}{" "}
                                / {selectedBookingDate.capacity}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Price per person:
                                </span>{" "}
                                RM {selectedBookingDate.price}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                </div>
              )}
              <div>
                <Label htmlFor="travelStartDate">Travel Start Date *</Label>
                <Input
                  id="travelStartDate"
                  type="date"
                  value={formData.travelStartDate}
                  onChange={(e) =>
                    handleInputChange("travelStartDate", e.target.value)
                  }
                  required
                  disabled={!!formData.selectedDeparture}
                />

                {formData.selectedDeparture && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Date automatically set from selected departure
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="travelEndDate">Travel End Date *</Label>
                <Input
                  id="travelEndDate"
                  type="date"
                  value={formData.travelEndDate}
                  onChange={(e) =>
                    handleInputChange("travelEndDate", e.target.value)
                  }
                  required
                  disabled={!!formData.selectedDeparture}
                />

                {formData.selectedDeparture && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Date automatically set from selected departure
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coupon & Discounts */}
        {formData.totalAmount > 0 && (
          <CouponDiscountSection
            totalAmount={formData.totalAmount}
            selectedPackageId={formData.selectedPackage}
            onCouponApplied={handleCouponApplied}
            initialCouponCode={formData.couponData?.couponCode || ""}
            errors={{}}
          />
        )}

        {/* Participant Details */}
        <Card>
          <CardHeader>
            <CardTitle>Participant Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.participantDetails.map((participant, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Participant {index + 1}</h4>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeParticipant(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      value={participant.name}
                      onChange={(e) =>
                        handleParticipantChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>IC Number *</Label>
                    <Input
                      value={participant.ic}
                      onChange={(e) =>
                        handleParticipantChange(index, "ic", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Passport Number</Label>
                    <Input
                      value={participant.passport}
                      onChange={(e) =>
                        handleParticipantChange(
                          index,
                          "passport",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Age *</Label>
                    <Input
                      type="number"
                      value={participant.age}
                      onChange={(e) =>
                        handleParticipantChange(index, "age", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Relationship</Label>
                    <Select
                      value={participant.relationship}
                      onValueChange={(value) =>
                        handleParticipantChange(index, "relationship", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Self">Self</SelectItem>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Sibling">Sibling</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addParticipant}>
              Add Participant
            </Button>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="invoiceDate">Invoice Date *</Label>
                <Input
                  id="invoiceDate"
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) =>
                    handleInputChange("invoiceDate", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {formData.totalAmount > 0 && (
              <PaymentStructureSection
                totalAmount={
                  formData.couponData?.finalAmount || formData.totalAmount
                }
                departureDate={formData.travelStartDate}
                onPaymentStructureChange={handlePaymentStructureChange}
                paymentMethods={paymentMethods}
                errors={{}}
              />
            )}

            {/* Coupon Summary in Payment Section */}
            {formData.couponData?.appliedCoupon && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-800">
                    Applied Coupon:
                  </span>
                  <span className="font-mono text-sm bg-green-100 px-2 py-1 rounded text-green-800">
                    {formData.couponData.appliedCoupon.code}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
                  <div>
                    <span className="font-medium">Original Amount:</span>
                    <span className="ml-2">
                      RM {formData.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Discount:</span>
                    <span className="ml-2">
                      -RM {formData.couponData.discountAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-green-200">
                    <span className="font-semibold">Final Amount:</span>
                    <span className="ml-2 font-semibold">
                      RM {formData.couponData.finalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {formData.totalAmount === 0 && (
              <div className="bg-muted p-4 rounded-lg text-center text-muted-foreground">
                Please select a travel package to view payment and coupon
                options
              </div>
            )}
          </CardContent>
        </Card>

        {/* Special Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Special Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) =>
                  handleInputChange("specialRequests", e.target.value)
                }
                placeholder="Any special requests or preferences..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dietaryRequirements">
                  Dietary Requirements
                </Label>
                <Textarea
                  id="dietaryRequirements"
                  value={formData.dietaryRequirements}
                  onChange={(e) =>
                    handleInputChange("dietaryRequirements", e.target.value)
                  }
                  placeholder="Vegetarian, halal, allergies, etc."
                />
              </div>
              <div>
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) =>
                    handleInputChange("medicalConditions", e.target.value)
                  }
                  placeholder="Any medical conditions to be aware of..."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) =>
                    handleInputChange("emergencyContact", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) =>
                    handleInputChange("emergencyPhone", e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms & Conditions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileTextIcon className="h-5 w-5 mr-2" />
              Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agree-terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeTerms", checked)
                }
                required
              />

              <Label htmlFor="agree-terms" className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and booking policies *
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agree-privacy"
                checked={formData.agreePrivacy}
                onCheckedChange={(checked) =>
                  handleInputChange("agreePrivacy", checked)
                }
                required
              />

              <Label htmlFor="agree-privacy" className="text-sm">
                I agree to the{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>{" "}
                and consent to data processing for LHDN E-Invoice compliance *
              </Label>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default NewBooking;
