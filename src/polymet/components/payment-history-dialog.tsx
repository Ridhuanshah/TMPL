import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCardIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  DollarSignIcon,
  HistoryIcon,
  TrendingUpIcon,
  DownloadIcon,
} from "lucide-react";
import { Booking } from "@/polymet/data/booking-data";
import { getEnhancedPaymentData } from "@/polymet/data/enhanced-payment-data";

interface PaymentHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
}

export function PaymentHistoryDialog({
  open,
  onOpenChange,
  booking,
}: PaymentHistoryDialogProps) {
  if (!booking) return null;

  const enhancedData = getEnhancedPaymentData(booking.id);
  const formatCurrency = (amount: number) => `RM ${amount.toLocaleString()}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-MY", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;

      case "pending":
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;

      case "overdue":
        return <AlertTriangleIcon className="h-4 w-4 text-red-500" />;

      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProgress = () => {
    return Math.round((booking.paidAmount / booking.totalAmount) * 100);
  };

  const getUpcomingPayments = () => {
    if (!enhancedData?.installments) return [];
    return enhancedData.installments.filter(
      (installment) => installment.status === "pending"
    );
  };

  const getPaidPayments = () => {
    if (!enhancedData?.installments) return [];
    return enhancedData.installments.filter(
      (installment) => installment.status === "paid"
    );
  };

  const getOverduePayments = () => {
    if (!enhancedData?.installments) return [];
    return enhancedData.installments.filter(
      (installment) =>
        installment.status === "pending" &&
        new Date(installment.dueDate) < new Date()
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCardIcon className="h-5 w-5" />

            <span>Payment History & Schedule</span>
          </DialogTitle>
          <DialogDescription>
            Complete payment information for {booking.customer.name} -{" "}
            {booking.package.name}
          </DialogDescription>
        </DialogHeader>

        {/* Payment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSignIcon className="h-4 w-4 text-blue-500" />

                <span className="text-sm font-medium">Total Amount</span>
              </div>
              <p className="text-2xl font-bold">
                {formatCurrency(booking.totalAmount)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />

                <span className="text-sm font-medium">Paid Amount</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(booking.paidAmount)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangleIcon className="h-4 w-4 text-red-500" />

                <span className="text-sm font-medium">Outstanding</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(booking.totalAmount - booking.paidAmount)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUpIcon className="h-4 w-4 text-purple-500" />

                <span className="text-sm font-medium">Progress</span>
              </div>
              <p className="text-2xl font-bold">{calculateProgress()}%</p>
              <Progress value={calculateProgress()} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          {/* Payment Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />

                  <span>Complete Payment Schedule</span>
                </CardTitle>
                <CardDescription>
                  All installments and payment timeline for this booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enhancedData?.installments ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Installment</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enhancedData.installments.map((installment) => (
                        <TableRow key={installment.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getPaymentStatusIcon(installment.status)}
                              <span className="font-medium">
                                #{installment.installmentNumber}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(installment.amount)}
                          </TableCell>
                          <TableCell>
                            {formatDate(installment.dueDate)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getPaymentStatusColor(
                                installment.status
                              )}
                            >
                              {installment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {installment.paidDate
                              ? formatDateTime(installment.paidDate)
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {installment.paymentMethod || "-"}
                          </TableCell>
                          <TableCell>
                            {installment.status === "paid" && (
                              <Button variant="outline" size="sm">
                                <DownloadIcon className="h-4 w-4 mr-1" />
                                Receipt
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <CreditCardIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                    <p className="text-muted-foreground">
                      No detailed payment schedule available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HistoryIcon className="h-5 w-5" />

                  <span>Payment History</span>
                </CardTitle>
                <CardDescription>
                  All completed payments for this booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getPaidPayments().length > 0 ? (
                  <div className="space-y-4">
                    {getPaidPayments().map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Installment #{payment.installmentNumber}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Paid on {formatDateTime(payment.paidDate!)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {formatCurrency(payment.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {payment.paymentMethod}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                    <p className="text-muted-foreground">
                      No payment history available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Payments Tab */}
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5" />

                  <span>Upcoming Payments</span>
                </CardTitle>
                <CardDescription>
                  Pending payments and due dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getUpcomingPayments().length > 0 ? (
                  <div className="space-y-4">
                    {getUpcomingPayments().map((payment) => {
                      const isOverdue = new Date(payment.dueDate) < new Date();
                      return (
                        <div
                          key={payment.id}
                          className={`flex items-center justify-between p-4 border rounded-lg ${
                            isOverdue
                              ? "border-red-200 bg-red-50 dark:bg-red-900/10"
                              : ""
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isOverdue
                                  ? "bg-red-100 dark:bg-red-900/20"
                                  : "bg-yellow-100 dark:bg-yellow-900/20"
                              }`}
                            >
                              {isOverdue ? (
                                <AlertTriangleIcon className="h-5 w-5 text-red-600" />
                              ) : (
                                <ClockIcon className="h-5 w-5 text-yellow-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">
                                Installment #{payment.installmentNumber}
                              </p>
                              <p
                                className={`text-sm ${
                                  isOverdue
                                    ? "text-red-600"
                                    : "text-muted-foreground"
                                }`}
                              >
                                Due: {formatDate(payment.dueDate)}
                                {isOverdue && " (Overdue)"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-bold ${
                                isOverdue ? "text-red-600" : "text-yellow-600"
                              }`}
                            >
                              {formatCurrency(payment.amount)}
                            </p>
                            <Badge
                              className={
                                isOverdue
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {isOverdue ? "Overdue" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />

                    <p className="text-muted-foreground">
                      All payments completed!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Payment Type:
                      </span>
                      <span className="font-medium capitalize">
                        {enhancedData?.paymentType || "Standard"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Installments:
                      </span>
                      <span className="font-medium">
                        {enhancedData?.installments?.length || 1}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Completed Payments:
                      </span>
                      <span className="font-medium text-green-600">
                        {getPaidPayments().length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Remaining Payments:
                      </span>
                      <span className="font-medium text-yellow-600">
                        {getUpcomingPayments().length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Overdue Payments:
                      </span>
                      <span className="font-medium text-red-600">
                        {getOverduePayments().length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Schedule Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enhancedData?.paymentSchedule && (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Frequency:
                        </span>
                        <span className="font-medium capitalize">
                          {enhancedData.paymentSchedule.frequency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Start Date:
                        </span>
                        <span className="font-medium">
                          {formatDate(enhancedData.paymentSchedule.startDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">End Date:</span>
                        <span className="font-medium">
                          {formatDate(enhancedData.paymentSchedule.endDate)}
                        </span>
                      </div>
                    </div>
                  )}

                  {enhancedData?.nextPaymentDue && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200">
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">
                        Next Payment Due
                      </p>
                      <p className="text-lg font-bold text-yellow-900 dark:text-yellow-100">
                        {formatCurrency(enhancedData.nextPaymentDue.amount)}
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Due: {formatDate(enhancedData.nextPaymentDue.dueDate)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentHistoryDialog;
