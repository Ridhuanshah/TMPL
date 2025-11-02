import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TicketIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  TagIcon,
} from "lucide-react";
import { coupons, Coupon } from "@/polymet/data/coupon-data";

export interface CouponDiscountData {
  couponCode: string;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  finalAmount: number;
  isValid: boolean;
  errorMessage: string;
}

interface CouponDiscountSectionProps {
  totalAmount: number;
  selectedPackageId?: string;
  onCouponApplied: (data: CouponDiscountData) => void;
  initialCouponCode?: string;
  errors?: Record<string, string>;
}

export function CouponDiscountSection({
  totalAmount,
  selectedPackageId,
  onCouponApplied,
  initialCouponCode = "",
  errors = {},
}: CouponDiscountSectionProps) {
  const [couponCode, setCouponCode] = useState(initialCouponCode);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationStatus, setValidationStatus] = useState<
    "none" | "valid" | "invalid"
  >("none");

  // Get available active coupons for suggestions
  const getAvailableCoupons = () => {
    return coupons.filter(
      (coupon) =>
        coupon.status === "active" &&
        new Date(coupon.validity.endDate) > new Date() &&
        (!coupon.usage.limit || coupon.usage.used < coupon.usage.limit) &&
        (!coupon.conditions.minimumAmount ||
          totalAmount >= coupon.conditions.minimumAmount)
    );
  };

  const validateCoupon = (
    code: string
  ): { isValid: boolean; coupon: Coupon | null; error: string } => {
    if (!code.trim()) {
      return {
        isValid: false,
        coupon: null,
        error: "Please enter a coupon code",
      };
    }

    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) {
      return { isValid: false, coupon: null, error: "Invalid coupon code" };
    }

    // Check if coupon is active
    if (coupon.status !== "active") {
      return {
        isValid: false,
        coupon: null,
        error: "This coupon is not currently active",
      };
    }

    // Check validity dates
    const now = new Date();
    const startDate = new Date(coupon.validity.startDate);
    const endDate = new Date(coupon.validity.endDate);

    if (now < startDate) {
      return {
        isValid: false,
        coupon: null,
        error: "This coupon is not yet valid",
      };
    }

    if (now > endDate) {
      return { isValid: false, coupon: null, error: "This coupon has expired" };
    }

    // Check usage limit
    if (coupon.usage.limit && coupon.usage.used >= coupon.usage.limit) {
      return {
        isValid: false,
        coupon: null,
        error: "This coupon has reached its usage limit",
      };
    }

    // Check minimum amount
    if (
      coupon.conditions.minimumAmount &&
      totalAmount < coupon.conditions.minimumAmount
    ) {
      return {
        isValid: false,
        coupon: null,
        error: `Minimum order amount of RM ${coupon.conditions.minimumAmount} required`,
      };
    }

    // Check applicable packages
    if (coupon.conditions.applicablePackages && selectedPackageId) {
      const selectedPackage = coupon.conditions.applicablePackages.find(
        (pkgName) =>
          // This is a simplified check - in real implementation, you'd match by package ID
          selectedPackageId.includes(pkgName.toLowerCase().replace(/\s+/g, "-"))
      );

      if (!selectedPackage) {
        return {
          isValid: false,
          coupon: null,
          error: "This coupon is not applicable to the selected package",
        };
      }
    }

    return { isValid: true, coupon, error: "" };
  };

  const calculateDiscount = (coupon: Coupon, amount: number): number => {
    let discount = 0;

    switch (coupon.type) {
      case "percentage":
        discount = (amount * coupon.value) / 100;
        if (coupon.conditions.maximumDiscount) {
          discount = Math.min(discount, coupon.conditions.maximumDiscount);
        }
        break;
      case "fixed":
        discount = coupon.value;
        break;
      case "free_shipping":
        discount = coupon.value; // This represents the consultation fee waiver
        break;
      case "bogo":
        // For BOGO, apply percentage discount (simplified implementation)
        discount = (amount * coupon.value) / 100;
        break;
      default:
        discount = 0;
    }

    return Math.min(discount, amount); // Discount cannot exceed total amount
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsValidating(true);
    setValidationMessage("");
    setValidationStatus("none");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const validation = validateCoupon(couponCode);

    if (validation.isValid && validation.coupon) {
      const discount = calculateDiscount(validation.coupon, totalAmount);
      const finalAmount = totalAmount - discount;

      setAppliedCoupon(validation.coupon);
      setDiscountAmount(discount);
      setValidationStatus("valid");
      setValidationMessage(
        `Coupon applied successfully! You saved RM ${discount.toFixed(2)}`
      );

      // Notify parent component
      onCouponApplied({
        couponCode: couponCode,
        appliedCoupon: validation.coupon,
        discountAmount: discount,
        finalAmount: finalAmount,
        isValid: true,
        errorMessage: "",
      });
    } else {
      setAppliedCoupon(null);
      setDiscountAmount(0);
      setValidationStatus("invalid");
      setValidationMessage(validation.error);

      // Notify parent component
      onCouponApplied({
        couponCode: couponCode,
        appliedCoupon: null,
        discountAmount: 0,
        finalAmount: totalAmount,
        isValid: false,
        errorMessage: validation.error,
      });
    }

    setIsValidating(false);
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setValidationStatus("none");
    setValidationMessage("");

    // Notify parent component
    onCouponApplied({
      couponCode: "",
      appliedCoupon: null,
      discountAmount: 0,
      finalAmount: totalAmount,
      isValid: false,
      errorMessage: "",
    });
  };

  const handleCouponCodeChange = (value: string) => {
    setCouponCode(value.toUpperCase());
    if (appliedCoupon) {
      handleRemoveCoupon();
    }
  };

  // Reset when total amount changes
  useEffect(() => {
    if (appliedCoupon) {
      const newDiscount = calculateDiscount(appliedCoupon, totalAmount);
      setDiscountAmount(newDiscount);

      onCouponApplied({
        couponCode: couponCode,
        appliedCoupon: appliedCoupon,
        discountAmount: newDiscount,
        finalAmount: totalAmount - newDiscount,
        isValid: true,
        errorMessage: "",
      });
    }
  }, [totalAmount]);

  const availableCoupons = getAvailableCoupons();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TicketIcon className="h-5 w-5 mr-2" />
          Coupon & Discounts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Coupon Input Section */}
        <div className="space-y-3">
          <Label htmlFor="couponCode">Apply Coupon Code</Label>
          <div className="flex space-x-2">
            <Input
              id="couponCode"
              placeholder="Enter coupon code (e.g., WELCOME2024)"
              value={couponCode}
              onChange={(e) => handleCouponCodeChange(e.target.value)}
              disabled={isValidating}
              className={`flex-1 ${
                validationStatus === "valid"
                  ? "border-green-500"
                  : validationStatus === "invalid"
                    ? "border-red-500"
                    : ""
              }`}
            />

            <Button
              type="button"
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || isValidating}
              variant={appliedCoupon ? "secondary" : "default"}
            >
              {isValidating
                ? "Validating..."
                : appliedCoupon
                  ? "Applied"
                  : "Apply"}
            </Button>
          </div>

          {/* Validation Message */}
          {validationMessage && (
            <div
              className={`flex items-center space-x-2 text-sm ${
                validationStatus === "valid" ? "text-green-600" : "text-red-600"
              }`}
            >
              {validationStatus === "valid" ? (
                <CheckCircleIcon className="h-4 w-4" />
              ) : (
                <XCircleIcon className="h-4 w-4" />
              )}
              <span>{validationMessage}</span>
            </div>
          )}

          {/* Error from parent component */}
          {errors.coupon && (
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <AlertCircleIcon className="h-4 w-4" />

              <span>{errors.coupon}</span>
            </div>
          )}
        </div>

        {/* Applied Coupon Details */}
        {appliedCoupon && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TagIcon className="h-4 w-4 text-green-600" />

                <span className="font-medium text-green-800">
                  {appliedCoupon.name}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  {appliedCoupon.code}
                </Badge>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveCoupon}
                className="text-green-700 hover:text-green-900"
              >
                Remove
              </Button>
            </div>

            <p className="text-sm text-green-700">
              {appliedCoupon.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-green-800">
                  Discount Type:
                </span>
                <span className="ml-2 text-green-700">
                  {appliedCoupon.type === "percentage"
                    ? `${appliedCoupon.value}% off`
                    : appliedCoupon.type === "fixed"
                      ? `RM ${appliedCoupon.value} off`
                      : appliedCoupon.type === "free_shipping"
                        ? "Free consultation"
                        : `BOGO ${appliedCoupon.value}% off`}
                </span>
              </div>
              <div>
                <span className="font-medium text-green-800">You Save:</span>
                <span className="ml-2 text-green-700 font-semibold">
                  RM {discountAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Available Coupons Suggestions */}
        {!appliedCoupon && availableCoupons.length > 0 && (
          <div className="space-y-3">
            <Separator />

            <div>
              <h4 className="font-medium text-sm mb-2">Available Coupons</h4>
              <div className="space-y-2">
                {availableCoupons.slice(0, 3).map((coupon) => (
                  <div
                    key={coupon.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => {
                      setCouponCode(coupon.code);
                      handleApplyCoupon();
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {coupon.code}
                        </Badge>
                        <span className="font-medium text-sm">
                          {coupon.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {coupon.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary">
                        {coupon.type === "percentage"
                          ? `${coupon.value}% OFF`
                          : coupon.type === "fixed"
                            ? `RM ${coupon.value} OFF`
                            : coupon.type === "free_shipping"
                              ? "FREE CONSULT"
                              : `BOGO ${coupon.value}%`}
                      </div>
                      {coupon.conditions.minimumAmount && (
                        <div className="text-xs text-muted-foreground">
                          Min: RM {coupon.conditions.minimumAmount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Price Summary */}
        {totalAmount > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>RM {totalAmount.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Coupon Discount:</span>
                <span>-RM {discountAmount.toFixed(2)}</span>
              </div>
            )}
            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span className={discountAmount > 0 ? "text-green-600" : ""}>
                RM {(totalAmount - discountAmount).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
