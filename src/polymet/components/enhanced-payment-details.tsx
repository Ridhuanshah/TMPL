import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  CreditCardIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-react";

export interface PaymentInstallment {
  id: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "upcoming";
  paidDate?: string;
  paymentMethod?: string;
}

export interface EnhancedPaymentData {
  bookingId: string;
  totalAmount: number;
  paidAmount: number;
  paymentType: "full" | "installment" | "deposit";
  installments?: PaymentInstallment[];
  nextPaymentDue?: {
    amount: number;
    dueDate: string;
    installmentNumber: number;
  };
  remainingPayments: number;
  paymentSchedule?: {
    frequency: "monthly" | "bi-weekly" | "custom";
    startDate: string;
    endDate: string;
  };
}

interface EnhancedPaymentDetailsProps {
  paymentData: EnhancedPaymentData;
  customerName: string;
  packageName: string;
  travelDate: string;
  className?: string;
}

export function EnhancedPaymentDetails({
  paymentData,
  customerName,
  packageName,
  travelDate,
  className = "",
}: EnhancedPaymentDetailsProps) {
  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getOutstandingAmount = () => {
    return paymentData.totalAmount - paymentData.paidAmount;
  };

  const getPaymentProgress = () => {
    return Math.round((paymentData.paidAmount / paymentData.totalAmount) * 100);
  };

  const getInstallmentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInstallmentIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;

      case "overdue":
        return <AlertTriangleIcon className="h-4 w-4 text-red-600" />;

      case "pending":
        return <ClockIcon className="h-4 w-4 text-yellow-600" />;

      case "upcoming":
        return <CalendarIcon className="h-4 w-4 text-blue-600" />;

      default:
        return <CreditCardIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Payment Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <CreditCardIcon className="h-5 w-5" />

            <span>Payment Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="font-medium">{customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Package</p>
              <p className="font-medium">{packageName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Travel Date</p>
              <p className="font-medium">{formatDate(travelDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Type</p>
              <Badge variant="outline" className="capitalize">
                {paymentData.paymentType}
              </Badge>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Payment Progress</span>
              <span className="text-sm text-muted-foreground">
                {getPaymentProgress()}%
              </span>
            </div>
            <Progress value={getPaymentProgress()} className="h-2" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Paid: {formatCurrency(paymentData.paidAmount)}
              </span>
              <span className="font-medium text-red-600">
                Outstanding: {formatCurrency(getOutstandingAmount())}
              </span>
            </div>
          </div>

          {/* Next Payment Due */}
          {paymentData.nextPaymentDue && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    Next Payment Due
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Installment #{paymentData.nextPaymentDue.installmentNumber}{" "}
                    - {formatCurrency(paymentData.nextPaymentDue.amount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    {formatDate(paymentData.nextPaymentDue.dueDate)}
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    {getDaysUntilDue(paymentData.nextPaymentDue.dueDate) > 0
                      ? `${getDaysUntilDue(paymentData.nextPaymentDue.dueDate)} days left`
                      : "Overdue"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Payments Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">
                {paymentData.remainingPayments}
              </p>
              <p className="text-sm text-muted-foreground">
                Payments Remaining
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">
                {formatCurrency(getOutstandingAmount())}
              </p>
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installment Schedule */}
      {paymentData.installments && paymentData.installments.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Payment Schedule</CardTitle>
            <p className="text-sm text-muted-foreground">
              {paymentData.installments.length} installments •{" "}
              {paymentData.paymentSchedule?.frequency || "Custom"} payments
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentData.installments.map((installment) => {
                const daysUntilDue = getDaysUntilDue(installment.dueDate);
                const isOverdue =
                  daysUntilDue < 0 && installment.status !== "paid";

                return (
                  <div
                    key={installment.id}
                    className={`p-4 rounded-lg border ${
                      isOverdue
                        ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10"
                        : installment.status === "paid"
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10"
                          : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getInstallmentIcon(
                          isOverdue ? "overdue" : installment.status
                        )}
                        <div>
                          <p className="font-medium">
                            Installment #{installment.installmentNumber}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(installment.amount)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={getInstallmentStatusColor(
                            isOverdue ? "overdue" : installment.status
                          )}
                        >
                          {isOverdue ? "overdue" : installment.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Due: {formatDate(installment.dueDate)}
                        </p>
                        {installment.status === "paid" &&
                          installment.paidDate && (
                            <p className="text-xs text-green-600">
                              Paid: {formatDate(installment.paidDate)}
                            </p>
                          )}
                        {installment.status === "pending" && (
                          <p
                            className={`text-xs ${
                              daysUntilDue < 0
                                ? "text-red-600"
                                : daysUntilDue <= 7
                                  ? "text-yellow-600"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {daysUntilDue < 0
                              ? `${Math.abs(daysUntilDue)} days overdue`
                              : daysUntilDue === 0
                                ? "Due today"
                                : `${daysUntilDue} days left`}
                          </p>
                        )}
                      </div>
                    </div>
                    {installment.paymentMethod && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Payment Method: {installment.paymentMethod}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Schedule Info */}
      {paymentData.paymentSchedule && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Schedule Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Frequency</p>
                <p className="font-medium capitalize">
                  {paymentData.paymentSchedule.frequency}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-medium">
                  {formatDate(paymentData.paymentSchedule.startDate)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">End Date</p>
                <p className="font-medium">
                  {formatDate(paymentData.paymentSchedule.endDate)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default EnhancedPaymentDetails;
