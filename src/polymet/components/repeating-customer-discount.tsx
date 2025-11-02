import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircleIcon,
  UserCheckIcon,
  AlertCircleIcon,
  SearchIcon,
} from "lucide-react";

export interface RepeatingCustomerData {
  icNumber: string;
  isRepeatingCustomer: boolean;
  previousBookings: number;
  discountAmount: number;
  discountApproved: boolean;
  approvedBy?: string;
  approvalDate?: string;
  customerName?: string;
  lastBookingDate?: string;
}

interface RepeatingCustomerDiscountProps {
  onDiscountChange: (data: RepeatingCustomerData) => void;
  discountAmount?: number; // Customizable by admin, default RM100
  errors?: Record<string, string>;
  isAdminView?: boolean; // For admin approval interface
}

export function RepeatingCustomerDiscount({
  onDiscountChange,
  discountAmount = 100,
  errors = {},
  isAdminView = false,
}: RepeatingCustomerDiscountProps) {
  const [icNumber, setIcNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [customerData, setCustomerData] =
    useState<RepeatingCustomerData | null>(null);
  const [discountApprovalStatus, setDiscountApprovalStatus] = useState<
    "pending" | "approved" | "rejected" | null
  >(null);

  // Mock function to check customer history by IC
  const checkCustomerHistory = async (ic: string) => {
    setIsSearching(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock data - in real implementation, this would query the database
    const mockCustomerData: Record<string, any> = {
      "123456789012": {
        customerName: "Sarah Chen",
        previousBookings: 3,
        lastBookingDate: "2024-01-15",
        isRepeatingCustomer: true,
      },
      "987654321098": {
        customerName: "Ahmad Rahman",
        previousBookings: 1,
        lastBookingDate: "2023-11-20",
        isRepeatingCustomer: true,
      },
      "555666777888": {
        customerName: "Emily Johnson",
        previousBookings: 5,
        lastBookingDate: "2024-02-28",
        isRepeatingCustomer: true,
      },
    };

    const customer = mockCustomerData[ic];

    if (customer) {
      const data: RepeatingCustomerData = {
        icNumber: ic,
        isRepeatingCustomer: customer.isRepeatingCustomer,
        previousBookings: customer.previousBookings,
        discountAmount: discountAmount,
        discountApproved: false, // Requires manual approval
        customerName: customer.customerName,
        lastBookingDate: customer.lastBookingDate,
      };

      setCustomerData(data);
      setDiscountApprovalStatus("pending");
      onDiscountChange(data);
    } else {
      const data: RepeatingCustomerData = {
        icNumber: ic,
        isRepeatingCustomer: false,
        previousBookings: 0,
        discountAmount: 0,
        discountApproved: false,
      };

      setCustomerData(data);
      setDiscountApprovalStatus(null);
      onDiscountChange(data);
    }

    setIsSearching(false);
  };

  const handleApproveDiscount = () => {
    if (customerData) {
      const updatedData = {
        ...customerData,
        discountApproved: true,
        approvedBy: "Admin User", // In real app, get from auth context
        approvalDate: new Date().toISOString(),
      };

      setCustomerData(updatedData);
      setDiscountApprovalStatus("approved");
      onDiscountChange(updatedData);
    }
  };

  const handleRejectDiscount = () => {
    if (customerData) {
      const updatedData = {
        ...customerData,
        discountApproved: false,
        discountAmount: 0,
      };

      setCustomerData(updatedData);
      setDiscountApprovalStatus("rejected");
      onDiscountChange(updatedData);
    }
  };

  const handleIcSearch = () => {
    if (icNumber.trim()) {
      checkCustomerHistory(icNumber.trim());
    }
  };

  const handleIcChange = (value: string) => {
    // Format IC number (remove non-digits and limit to 12 digits)
    const formatted = value.replace(/\D/g, "").slice(0, 12);
    setIcNumber(formatted);

    // Reset customer data when IC changes
    if (customerData) {
      setCustomerData(null);
      setDiscountApprovalStatus(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCheckIcon className="h-5 w-5 mr-2" />
          Repeating Customer Discount
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* IC Number Input */}
        <div className="space-y-2">
          <Label htmlFor="ic-number">Customer IC Number *</Label>
          <div className="flex space-x-2">
            <Input
              id="ic-number"
              placeholder="Enter 12-digit IC number"
              value={icNumber}
              onChange={(e) => handleIcChange(e.target.value)}
              maxLength={12}
              className={errors.icNumber ? "border-red-500" : ""}
            />

            <Button
              onClick={handleIcSearch}
              disabled={icNumber.length !== 12 || isSearching}
              variant="outline"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                  Checking...
                </>
              ) : (
                <>
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Check
                </>
              )}
            </Button>
          </div>
          {errors.icNumber && (
            <p className="text-sm text-red-600">{errors.icNumber}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Enter the customer's IC number to check for previous bookings and
            eligibility for repeating customer discount.
          </p>
        </div>

        {/* Customer Search Results */}
        {customerData && (
          <>
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Customer Information</h4>
                {customerData.isRepeatingCustomer ? (
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                    Repeating Customer
                  </Badge>
                ) : (
                  <Badge variant="secondary">New Customer</Badge>
                )}
              </div>

              {customerData.isRepeatingCustomer ? (
                <div className="bg-green-50 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Customer Name:</span>
                      <p>{customerData.customerName}</p>
                    </div>
                    <div>
                      <span className="font-medium">IC Number:</span>
                      <p>{customerData.icNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium">Previous Bookings:</span>
                      <p>{customerData.previousBookings} trips</p>
                    </div>
                    <div>
                      <span className="font-medium">Last Booking:</span>
                      <p>
                        {customerData.lastBookingDate
                          ? new Date(
                              customerData.lastBookingDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Discount Information */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Eligible Discount:</span>
                      <span className="text-lg font-bold text-green-600">
                        RM {discountAmount.toLocaleString()}
                      </span>
                    </div>

                    {/* Approval Status */}
                    {discountApprovalStatus === "pending" && !isAdminView && (
                      <Alert>
                        <AlertCircleIcon className="h-4 w-4" />

                        <AlertDescription>
                          Discount requires manual approval from Admin or Sales
                          team. Please contact your administrator to approve
                          this discount.
                        </AlertDescription>
                      </Alert>
                    )}

                    {discountApprovalStatus === "approved" && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />

                        <AlertDescription className="text-green-800">
                          Discount approved! RM{" "}
                          {discountAmount.toLocaleString()} will be deducted
                          from the total amount.
                          {customerData.approvedBy && (
                            <div className="mt-1 text-xs">
                              Approved by: {customerData.approvedBy} on{" "}
                              {customerData.approvalDate
                                ? new Date(
                                    customerData.approvalDate
                                  ).toLocaleDateString()
                                : ""}
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}

                    {discountApprovalStatus === "rejected" && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircleIcon className="h-4 w-4 text-red-600" />

                        <AlertDescription className="text-red-800">
                          Discount has been rejected. No discount will be
                          applied to this booking.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Admin Approval Buttons */}
                    {isAdminView && discountApprovalStatus === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleApproveDiscount}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircleIcon className="h-4 w-4 mr-2" />
                          Approve Discount
                        </Button>
                        <Button
                          onClick={handleRejectDiscount}
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Reject Discount
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Alert>
                  <AlertCircleIcon className="h-4 w-4" />

                  <AlertDescription>
                    This customer has no previous bookings in our system. No
                    repeating customer discount is available.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default RepeatingCustomerDiscount;
