import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BellIcon,
  MailIcon,
  PhoneIcon,
  MessageSquareIcon,
  CalendarIcon,
  ClockIcon,
  SendIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Booking } from "@/polymet/data/booking-data";

interface PaymentReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
  onReminderSent: (booking: Booking, reminderData: ReminderData) => void;
}

interface ReminderData {
  method: "email" | "sms" | "phone" | "whatsapp";
  template: string;
  customMessage?: string;
  scheduleDate?: string;
  scheduleTime?: string;
  isImmediate: boolean;
  includePaymentLink: boolean;
  includeInstallmentSchedule: boolean;
}

const reminderTemplates = {
  gentle: {
    name: "Gentle Reminder",
    email: `Dear {customerName},

We hope you're excited about your upcoming {packageName} trip on {travelDate}!

This is a friendly reminder that your payment of {outstandingAmount} is due on {dueDate}. 

To ensure your booking is confirmed, please complete your payment at your earliest convenience.

If you have any questions or need assistance, please don't hesitate to contact us.

Best regards,
TMPL Escapade Team`,
    sms: "Hi {customerName}, friendly reminder: Payment of {outstandingAmount} for your {packageName} trip is due on {dueDate}. Please complete payment to confirm booking. Thanks! - TMPL Escapade",
  },
  urgent: {
    name: "Urgent Payment Required",
    email: `Dear {customerName},

URGENT: Payment Required for {packageName}

Your payment of {outstandingAmount} was due on {dueDate} and is now overdue.

To avoid cancellation of your booking for {travelDate}, please complete payment immediately.

Contact us if you need to discuss payment options.

TMPL Escapade Team`,
    sms: "URGENT: Payment of {outstandingAmount} for {packageName} is overdue. Please pay immediately to avoid booking cancellation. Contact us for assistance. - TMPL Escapade",
  },
  final: {
    name: "Final Notice",
    email: `Dear {customerName},

FINAL NOTICE: Payment Required

This is your final notice for the outstanding payment of {outstandingAmount} for {packageName}.

Your booking will be cancelled within 24 hours if payment is not received.

Please contact us immediately if you wish to retain your booking.

TMPL Escapade Team`,
    sms: "FINAL NOTICE: Pay {outstandingAmount} for {packageName} within 24hrs or booking will be cancelled. Contact us immediately. - TMPL Escapade",
  },
  installment: {
    name: "Installment Due Reminder",
    email: `Dear {customerName},

Your installment payment for {packageName} is due soon.

Payment Details:
- Amount Due: {outstandingAmount}
- Due Date: {dueDate}
- Remaining Payments: {remainingPayments}

Please ensure timely payment to stay on schedule with your payment plan.

Thank you for choosing TMPL Escapade!`,
    sms: "Installment reminder: {outstandingAmount} due on {dueDate} for {packageName}. {remainingPayments} payments remaining. Please pay on time. - TMPL Escapade",
  },
};

export function PaymentReminderDialog({
  open,
  onOpenChange,
  booking,
  onReminderSent,
}: PaymentReminderDialogProps) {
  const [reminderData, setReminderData] = useState<ReminderData>({
    method: "email",
    template: "gentle",
    isImmediate: true,
    includePaymentLink: true,
    includeInstallmentSchedule: false,
  });

  const [isSending, setIsSending] = useState(false);

  if (!booking) return null;

  const outstandingAmount = booking.totalAmount - booking.paidAmount;
  const formatCurrency = (amount: number) => `RM ${amount.toLocaleString()}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTemplateContent = () => {
    const template =
      reminderTemplates[
        reminderData.template as keyof typeof reminderTemplates
      ];

    const content =
      reminderData.method === "email" ? template.email : template.sms;

    return content
      .replace(/{customerName}/g, booking.customer.name)
      .replace(/{packageName}/g, booking.package.name)
      .replace(/{travelDate}/g, formatDate(booking.travelDates.startDate))
      .replace(/{outstandingAmount}/g, formatCurrency(outstandingAmount))
      .replace(/{dueDate}/g, formatDate(booking.travelDates.startDate)) // Simplified for demo
      .replace(/{remainingPayments}/g, "1"); // Simplified for demo
  };

  const handleSendReminder = async () => {
    setIsSending(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onReminderSent(booking, {
      ...reminderData,
      customMessage: reminderData.customMessage || getTemplateContent(),
    });

    setIsSending(false);
    onOpenChange(false);

    // Reset form
    setReminderData({
      method: "email",
      template: "gentle",
      isImmediate: true,
      includePaymentLink: true,
      includeInstallmentSchedule: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BellIcon className="h-5 w-5" />

            <span>Send Payment Reminder</span>
          </DialogTitle>
          <DialogDescription>
            Send a payment reminder to {booking.customer.name} for{" "}
            {booking.package.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer & Booking Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                {booking.customer.avatar ? (
                  <img
                    src={booking.customer.avatar}
                    alt={booking.customer.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium">
                      {booking.customer.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium">{booking.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.bookingNumber}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Package:
                  </span>
                  <span className="text-sm font-medium">
                    {booking.package.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Travel Date:
                  </span>
                  <span className="text-sm">
                    {formatDate(booking.travelDates.startDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Amount:
                  </span>
                  <span className="text-sm font-medium">
                    {formatCurrency(booking.totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Paid:</span>
                  <span className="text-sm text-green-600">
                    {formatCurrency(booking.paidAmount)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium">Outstanding:</span>
                  <span className="text-sm font-bold text-red-600">
                    {formatCurrency(outstandingAmount)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Contact Information
                </Label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <MailIcon className="h-4 w-4" />

                    <span>{booking.customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <PhoneIcon className="h-4 w-4" />

                    <span>{booking.customer.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reminder Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reminder Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Communication Method */}
              <div className="space-y-2">
                <Label>Communication Method</Label>
                <Select
                  value={reminderData.method}
                  onValueChange={(value) =>
                    setReminderData({ ...reminderData, method: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center space-x-2">
                        <MailIcon className="h-4 w-4" />

                        <span>Email</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center space-x-2">
                        <MessageSquareIcon className="h-4 w-4" />

                        <span>SMS</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="phone">
                      <div className="flex items-center space-x-2">
                        <PhoneIcon className="h-4 w-4" />

                        <span>Phone Call</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="whatsapp">
                      <div className="flex items-center space-x-2">
                        <MessageSquareIcon className="h-4 w-4" />

                        <span>WhatsApp</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Template Selection */}
              <div className="space-y-2">
                <Label>Message Template</Label>
                <Select
                  value={reminderData.template}
                  onValueChange={(value) =>
                    setReminderData({ ...reminderData, template: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(reminderTemplates).map(
                      ([key, template]) => (
                        <SelectItem key={key} value={key}>
                          {template.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Scheduling */}
              <div className="space-y-2">
                <Label>Delivery Schedule</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="immediate"
                    checked={reminderData.isImmediate}
                    onCheckedChange={(checked) =>
                      setReminderData({
                        ...reminderData,
                        isImmediate: !!checked,
                      })
                    }
                  />

                  <Label htmlFor="immediate" className="text-sm">
                    Send immediately
                  </Label>
                </div>

                {!reminderData.isImmediate && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Date</Label>
                      <Input
                        type="date"
                        value={reminderData.scheduleDate || ""}
                        onChange={(e) =>
                          setReminderData({
                            ...reminderData,
                            scheduleDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Time</Label>
                      <Input
                        type="time"
                        value={reminderData.scheduleTime || ""}
                        onChange={(e) =>
                          setReminderData({
                            ...reminderData,
                            scheduleTime: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Options */}
              <div className="space-y-2">
                <Label>Additional Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="paymentLink"
                      checked={reminderData.includePaymentLink}
                      onCheckedChange={(checked) =>
                        setReminderData({
                          ...reminderData,
                          includePaymentLink: !!checked,
                        })
                      }
                    />

                    <Label htmlFor="paymentLink" className="text-sm">
                      Include payment link
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="installmentSchedule"
                      checked={reminderData.includeInstallmentSchedule}
                      onCheckedChange={(checked) =>
                        setReminderData({
                          ...reminderData,
                          includeInstallmentSchedule: !!checked,
                        })
                      }
                    />

                    <Label htmlFor="installmentSchedule" className="text-sm">
                      Include installment schedule
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Message Preview</CardTitle>
            <CardDescription>
              Preview of the message that will be sent to the customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={reminderData.customMessage || getTemplateContent()}
              onChange={(e) =>
                setReminderData({
                  ...reminderData,
                  customMessage: e.target.value,
                })
              }
              rows={8}
              placeholder="Customize your message here..."
            />
          </CardContent>
        </Card>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendReminder} disabled={isSending}>
            {isSending ? (
              <>
                <ClockIcon className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <SendIcon className="h-4 w-4 mr-2" />
                Send Reminder
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentReminderDialog;
