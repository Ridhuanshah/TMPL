import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PhoneIcon,
  MailIcon,
  BellIcon,
  HistoryIcon,
  UserIcon,
  CreditCardIcon,
  CalendarIcon,
  AlertTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  FileTextIcon,
} from "lucide-react";
import { Booking } from "@/polymet/data/booking-data";
import { EnhancedPaymentDetails } from "@/polymet/components/enhanced-payment-details";
import { PaymentReminderDialog } from "@/polymet/components/payment-reminder-dialog";
import { PaymentHistoryDialog } from "@/polymet/components/payment-history-dialog";
import { PaymentInvoiceDialog } from "@/polymet/components/payment-invoice-dialog";
import { getEnhancedPaymentData } from "@/polymet/data/enhanced-payment-data";

interface PaymentFollowUpData {
  bookingId: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  priority: "low" | "medium" | "high" | "urgent";
  notes: string[];
}

interface PaymentFollowUpTableProps {
  bookings: Booking[];
  paymentFollowUps: PaymentFollowUpData[];
  onPriorityUpdate: (
    bookingId: string,
    priority: "low" | "medium" | "high" | "urgent"
  ) => void;
  onReminderSend: (booking: Booking) => void;
  onViewHistory: (booking: Booking) => void;
  className?: string;
}

export function PaymentFollowUpTable({
  bookings,
  paymentFollowUps,
  onPriorityUpdate,
  onReminderSend,
  onViewHistory,
  className = "",
}: PaymentFollowUpTableProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [paymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [reminderBooking, setReminderBooking] = useState<Booking | null>(null);
  const [historyBooking, setHistoryBooking] = useState<Booking | null>(null);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);

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

  const getDaysUntilTravel = (booking: Booking) => {
    const travelDate = new Date(booking.travelDates.startDate);
    const today = new Date();
    const diffTime = travelDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getOutstandingAmount = (booking: Booking) => {
    return booking.totalAmount - booking.paidAmount;
  };

  const calculatePaymentProgress = (booking: Booking) => {
    return Math.round((booking.paidAmount / booking.totalAmount) * 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "partial":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isOverdue = (booking: Booking) => {
    const followUp = paymentFollowUps.find((f) => f.bookingId === booking.id);
    if (!followUp?.nextFollowUpDate) return false;
    return new Date(followUp.nextFollowUpDate) < new Date();
  };

  const getPaymentTypeIcon = (bookingId: string) => {
    const enhancedData = getEnhancedPaymentData(bookingId);
    if (!enhancedData)
      return <CreditCardIcon className="h-4 w-4 text-gray-500" />;

    switch (enhancedData.paymentType) {
      case "installment":
        return <CalendarIcon className="h-4 w-4 text-blue-500" />;

      case "deposit":
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;

      case "full":
        return <CreditCardIcon className="h-4 w-4 text-green-500" />;

      default:
        return <CreditCardIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRemainingPaymentsInfo = (bookingId: string) => {
    const enhancedData = getEnhancedPaymentData(bookingId);
    if (!enhancedData) return null;

    return {
      remainingPayments: enhancedData.remainingPayments,
      nextPaymentDue: enhancedData.nextPaymentDue,
      paymentType: enhancedData.paymentType,
    };
  };

  const handleReminderClick = (booking: Booking) => {
    setReminderBooking(booking);
    setReminderDialogOpen(true);
  };

  const handlePaymentHistoryClick = (booking: Booking) => {
    setHistoryBooking(booking);
    setPaymentHistoryOpen(true);
  };

  const handleInvoiceClick = (booking: Booking) => {
    setInvoiceBooking(booking);
    setInvoiceDialogOpen(true);
  };

  const handleInvoiceShared = (booking: Booking, method: string) => {
    console.log("Invoice shared:", {
      booking: booking.bookingNumber,
      method,
    });
    // You could also update follow-up records here
  };

  const handleReminderSent = (booking: Booking, reminderData: any) => {
    console.log("Reminder sent:", {
      booking: booking.bookingNumber,
      reminderData,
    });
    onReminderSend(booking);
    // You could also update the last contact date here
  };

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Travel Date</TableHead>
            <TableHead>Payment Details</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => {
            const followUp = paymentFollowUps.find(
              (f) => f.bookingId === booking.id
            );
            const daysUntilTravel = getDaysUntilTravel(booking);
            const isUrgent =
              daysUntilTravel <= 30 && booking.paymentStatus !== "paid";
            const remainingInfo = getRemainingPaymentsInfo(booking.id);
            const enhancedData = getEnhancedPaymentData(booking.id);

            return (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {booking.customer.avatar ? (
                      <img
                        src={booking.customer.avatar}
                        alt={booking.customer.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{booking.customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.bookingNumber}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{booking.package.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.package.duration} days
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    <p>{formatDate(booking.travelDates.startDate)}</p>
                    <p
                      className={`text-muted-foreground ${
                        isUrgent ? "text-red-600" : ""
                      }`}
                    >
                      {daysUntilTravel > 0
                        ? `${daysUntilTravel} days`
                        : "Past due"}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {getPaymentTypeIcon(booking.id)}
                      <span className="text-sm font-medium capitalize">
                        {enhancedData?.paymentType || "Standard"}
                      </span>
                    </div>

                    <div className="text-sm">
                      <p className="font-medium">
                        {formatCurrency(booking.totalAmount)}
                      </p>
                      <p className="text-muted-foreground">
                        Paid: {formatCurrency(booking.paidAmount)}
                      </p>
                      <p className="text-red-600 font-medium">
                        Due: {formatCurrency(getOutstandingAmount(booking))}
                      </p>
                    </div>

                    {booking.paidAmount > 0 && (
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={calculatePaymentProgress(booking)}
                          className="h-1 w-16"
                        />

                        <span className="text-xs text-muted-foreground">
                          {calculatePaymentProgress(booking)}%
                        </span>
                      </div>
                    )}

                    {/* Next Payment Due Info */}
                    {remainingInfo?.nextPaymentDue && (
                      <div className="p-2 bg-yellow-50 dark:bg-yellow-900/10 rounded text-xs">
                        <p className="font-medium text-yellow-800 dark:text-yellow-200">
                          Next:{" "}
                          {formatCurrency(remainingInfo.nextPaymentDue.amount)}
                        </p>
                        <p className="text-yellow-700 dark:text-yellow-300">
                          Due:{" "}
                          {formatDate(remainingInfo.nextPaymentDue.dueDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-center">
                    {remainingInfo ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-2xl font-bold text-blue-600">
                            {remainingInfo.remainingPayments}
                          </span>
                          {remainingInfo.remainingPayments > 1 && (
                            <AlertTriangleIcon className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {remainingInfo.remainingPayments === 1
                            ? "payment"
                            : "payments"}{" "}
                          left
                        </p>

                        {/* Payment Schedule Indicator */}
                        {enhancedData?.paymentSchedule && (
                          <Badge variant="outline" className="text-xs">
                            {enhancedData.paymentSchedule.frequency}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="text-2xl font-bold text-gray-400">
                          1
                        </span>
                        <p className="text-xs text-muted-foreground">
                          payment left
                        </p>
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    className={getPaymentStatusColor(
                      isOverdue(booking) ? "overdue" : booking.paymentStatus
                    )}
                  >
                    {isOverdue(booking) ? "overdue" : booking.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Select
                    value={followUp?.priority || "medium"}
                    onValueChange={(value) =>
                      onPriorityUpdate(booking.id, value as any)
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <div className="text-sm">
                    {followUp?.lastContactDate ? (
                      <p>{formatDate(followUp.lastContactDate)}</p>
                    ) : (
                      <p className="text-muted-foreground">No contact</p>
                    )}
                    {followUp?.nextFollowUpDate && (
                      <p className="text-xs text-muted-foreground">
                        Next: {formatDate(followUp.nextFollowUpDate)}
                      </p>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReminderClick(booking)}
                      title="Send Payment Reminder"
                    >
                      <BellIcon className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${booking.customer.phone}`}>
                        <PhoneIcon className="h-4 w-4" />
                      </a>
                    </Button>

                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${booking.customer.email}`}>
                        <MailIcon className="h-4 w-4" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePaymentHistoryClick(booking)}
                      title="View Payment History & Schedule"
                    >
                      <CreditCardIcon className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInvoiceClick(booking)}
                      title="Generate Payment Invoice"
                    >
                      <FileTextIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Payment Reminder Dialog */}
      <PaymentReminderDialog
        open={reminderDialogOpen}
        onOpenChange={setReminderDialogOpen}
        booking={reminderBooking}
        onReminderSent={handleReminderSent}
      />

      {/* Payment History Dialog */}
      <PaymentHistoryDialog
        open={paymentHistoryOpen}
        onOpenChange={setPaymentHistoryOpen}
        booking={historyBooking}
      />

      {/* Payment Invoice Dialog */}
      <PaymentInvoiceDialog
        open={invoiceDialogOpen}
        onOpenChange={setInvoiceDialogOpen}
        booking={invoiceBooking}
        onInvoiceShared={handleInvoiceShared}
      />

      {/* Enhanced Payment Details Dialog (Legacy) */}
      <Dialog open={paymentDetailsOpen} onOpenChange={setPaymentDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Detailed payment information and installment schedule
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <EnhancedPaymentDetails
              paymentData={getEnhancedPaymentData(selectedBooking.id)!}
              customerName={selectedBooking.customer.name}
              packageName={selectedBooking.package.name}
              travelDate={selectedBooking.travelDates.startDate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PaymentFollowUpTable;
