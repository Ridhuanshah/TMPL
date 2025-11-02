import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CreditCardIcon, InfoIcon } from "lucide-react";

export interface PaymentStructureData {
  paymentType: "full" | "installment" | "deposit";
  totalAmount: number;
  installmentPlan?: {
    numberOfPayments: number;
    paymentAmount: number;
    paymentDates: string[];
  };
  depositPlan?: {
    depositAmount: number;
    balanceAmount: number;
    balanceDueDate: string;
  };
  selectedPaymentMethod: string;
}

interface PaymentStructureSectionProps {
  totalAmount: number;
  departureDate: string;
  onPaymentStructureChange: (data: PaymentStructureData) => void;
  paymentMethods: string[];
  errors?: Record<string, string>;
}

export function PaymentStructureSection({
  totalAmount,
  departureDate,
  onPaymentStructureChange,
  paymentMethods,
  errors = {},
}: PaymentStructureSectionProps) {
  const [paymentType, setPaymentType] = useState<
    "full" | "installment" | "deposit"
  >("full");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Calculate payment structure based on amount
  const getInstallmentPlan = (amount: number) => {
    if (amount < 10000) {
      return { numberOfPayments: 3, interestRate: 0 };
    } else if (amount <= 30000) {
      return { numberOfPayments: 4, interestRate: 0 };
    } else {
      return { numberOfPayments: 6, interestRate: 0 };
    }
  };

  const getDepositAmount = (amount: number) => {
    return amount < 10000 ? 500 : 1000;
  };

  const calculateBalanceDueDate = (departureDate: string) => {
    if (!departureDate) return "";
    const departure = new Date(departureDate);
    const balanceDue = new Date(departure);
    balanceDue.setDate(balanceDue.getDate() - 60); // 60 days before departure
    return balanceDue.toISOString().split("T")[0];
  };

  const generateInstallmentDates = (numberOfPayments: number) => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < numberOfPayments; i++) {
      const paymentDate = new Date(today);
      paymentDate.setMonth(paymentDate.getMonth() + i);
      dates.push(paymentDate.toISOString().split("T")[0]);
    }

    return dates;
  };

  const installmentPlan = getInstallmentPlan(totalAmount);
  const depositAmount = getDepositAmount(totalAmount);
  const balanceDueDate = calculateBalanceDueDate(departureDate);
  const installmentAmount = totalAmount / installmentPlan.numberOfPayments;
  const installmentDates = generateInstallmentDates(
    installmentPlan.numberOfPayments
  );

  useEffect(() => {
    const paymentStructureData: PaymentStructureData = {
      paymentType,
      totalAmount,
      selectedPaymentMethod,
    };

    if (paymentType === "installment") {
      paymentStructureData.installmentPlan = {
        numberOfPayments: installmentPlan.numberOfPayments,
        paymentAmount: installmentAmount,
        paymentDates: installmentDates,
      };
    } else if (paymentType === "deposit") {
      paymentStructureData.depositPlan = {
        depositAmount,
        balanceAmount: totalAmount - depositAmount,
        balanceDueDate,
      };
    }

    onPaymentStructureChange(paymentStructureData);
  }, [paymentType, totalAmount, selectedPaymentMethod, departureDate]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Payment Structure</h3>
        <p className="text-sm text-muted-foreground">
          Choose your preferred payment option. All plans are 0% interest.
        </p>
      </div>

      <RadioGroup
        value={paymentType}
        onValueChange={(value: any) => setPaymentType(value)}
      >
        {/* Full Payment Option */}
        <Card
          className={`cursor-pointer transition-colors ${paymentType === "full" ? "ring-2 ring-primary" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="full" id="full-payment" className="mt-1" />

              <div className="flex-1">
                <Label htmlFor="full-payment" className="cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Full Payment</span>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Pay the complete amount upfront and secure your booking
                    immediately.
                  </p>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Amount:</span>
                      <span className="text-lg font-bold">
                        RM {totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Installment Plan Option */}
        <Card
          className={`cursor-pointer transition-colors ${paymentType === "installment" ? "ring-2 ring-primary" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <RadioGroupItem
                value="installment"
                id="installment-payment"
                className="mt-1"
              />

              <div className="flex-1">
                <Label htmlFor="installment-payment" className="cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Installment Plan</span>
                    <Badge variant="outline">0% Interest</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Split your payment into {installmentPlan.numberOfPayments}{" "}
                    equal monthly installments with no interest.
                  </p>
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Monthly Payment:
                      </span>
                      <span className="text-lg font-bold">
                        RM {installmentAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Number of Payments:</span>
                      <span>{installmentPlan.numberOfPayments} months</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Total Amount:</span>
                      <span>RM {totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  {paymentType === "installment" && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Payment Schedule
                      </h4>
                      <div className="space-y-1">
                        {installmentDates.map((date, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>Payment {index + 1}:</span>
                            <span>{new Date(date).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deposit Plan Option */}
        <Card
          className={`cursor-pointer transition-colors ${paymentType === "deposit" ? "ring-2 ring-primary" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <RadioGroupItem
                value="deposit"
                id="deposit-payment"
                className="mt-1"
              />

              <div className="flex-1">
                <Label htmlFor="deposit-payment" className="cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Deposit Plan</span>
                    <Badge variant="outline">Flexible</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Pay a deposit now and complete the balance 60 days before
                    departure.
                  </p>
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Deposit Amount:
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        RM {depositAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Balance Amount:</span>
                      <span>
                        RM {(totalAmount - depositAmount).toLocaleString()}
                      </span>
                    </div>
                    {balanceDueDate && (
                      <div className="flex justify-between items-center text-sm">
                        <span>Balance Due Date:</span>
                        <span className="font-medium">
                          {new Date(balanceDueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  {paymentType === "deposit" && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <InfoIcon className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />

                        <div className="text-sm">
                          <p className="font-medium text-amber-800">
                            Important:
                          </p>
                          <p className="text-amber-700">
                            The remaining balance must be paid at least 60 days
                            before your departure date. You may also choose to
                            pay the full amount at any time.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>

      <Separator />

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Payment Method *</Label>
        <RadioGroup
          value={selectedPaymentMethod}
          onValueChange={setSelectedPaymentMethod}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {paymentMethods.map((method) => (
            <Card
              key={method}
              className={`cursor-pointer transition-colors ${selectedPaymentMethod === method ? "ring-2 ring-primary" : ""}`}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={method} id={`method-${method}`} />

                  <Label
                    htmlFor={`method-${method}`}
                    className="cursor-pointer flex items-center"
                  >
                    <CreditCardIcon className="h-4 w-4 mr-2" />

                    {method}
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
        {errors.paymentMethod && (
          <p className="text-sm text-red-600">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Payment Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <CreditCardIcon className="h-4 w-4 mr-2" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Package Total:</span>
            <span className="text-lg font-bold">
              RM {totalAmount.toLocaleString()}
            </span>
          </div>

          {paymentType === "full" && (
            <div className="flex justify-between items-center text-green-700">
              <span className="font-medium">Amount Due Now:</span>
              <span className="text-lg font-bold">
                RM {totalAmount.toLocaleString()}
              </span>
            </div>
          )}

          {paymentType === "installment" && (
            <>
              <div className="flex justify-between items-center text-blue-700">
                <span className="font-medium">First Payment:</span>
                <span className="text-lg font-bold">
                  RM {installmentAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Remaining Payments:</span>
                <span>
                  {installmentPlan.numberOfPayments - 1} × RM{" "}
                  {installmentAmount.toLocaleString()}
                </span>
              </div>
            </>
          )}

          {paymentType === "deposit" && (
            <>
              <div className="flex justify-between items-center text-blue-700">
                <span className="font-medium">Deposit Due Now:</span>
                <span className="text-lg font-bold">
                  RM {depositAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Balance Due Later:</span>
                <span>RM {(totalAmount - depositAmount).toLocaleString()}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentStructureSection;
