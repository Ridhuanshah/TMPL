import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  PaymentStructureSection,
  PaymentStructureData,
} from "@/polymet/components/payment-structure-section";

export function NewBooking() {
  const navigate = useNavigate();
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
    if (selectedPkg) {
      const baseAmount = selectedPkg.pricing.basePrice * formData.participants;
      setFormData((prev) => ({
        ...prev,
        totalAmount: baseAmount,
      }));
    }
  };

  React.useEffect(() => {
    calculateTotal();
  }, [formData.selectedPackage, formData.participants]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Booking submitted:", formData);
    // Form submission will redirect via Link component
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/bookings">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Bookings
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Booking</h1>
            <p className="text-muted-foreground">
              Create a new travel booking with LHDN E-Invoice compliance
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" type="button">
            <SaveIcon className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button type="submit" form="booking-form" asChild>
            <Link to="/bookings">Create Booking</Link>
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
                  onValueChange={(value) =>
                    handleInputChange("selectedPackage", value)
                  }
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
                />
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
                />
              </div>
            </div>
          </CardContent>
        </Card>

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
                totalAmount={formData.totalAmount}
                departureDate={formData.travelStartDate}
                onPaymentStructureChange={handlePaymentStructureChange}
                paymentMethods={paymentMethods}
                errors={{}}
              />
            )}

            {formData.totalAmount === 0 && (
              <div className="bg-muted p-4 rounded-lg text-center text-muted-foreground">
                Please select a travel package to view payment options
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
