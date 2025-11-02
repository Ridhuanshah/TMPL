import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SearchIcon,
  FilterIcon,
  PhoneIcon,
  MailIcon,
  MessageSquareIcon,
  CreditCardIcon,
  CalendarIcon,
  ClockIcon,
  AlertTriangleIcon,
  DollarSignIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  BellIcon,
  SendIcon,
  HistoryIcon,
  UserIcon,
  PackageIcon,
} from "lucide-react";
import {
  bookings,
  paymentStatuses,
  Booking,
} from "@/polymet/data/booking-data";
import { PaymentFollowUpTable } from "@/polymet/components/payment-follow-up-table";
import {
  getPaymentStatistics,
  getTotalOutstanding,
} from "@/polymet/data/enhanced-payment-data";

interface PaymentReminder {
  id: string;
  bookingId: string;
  type: "email" | "sms" | "call";
  message: string;
  sentAt: string;
  status: "sent" | "delivered" | "read" | "failed";
}

interface PaymentFollowUpData {
  bookingId: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  priority: "low" | "medium" | "high" | "urgent";
  notes: string[];
  reminders: PaymentReminder[];
  paymentPlan?: {
    installments: {
      amount: number;
      dueDate: string;
      status: "pending" | "paid" | "overdue";
    }[];
  };
}

export function PaymentFollowUp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState("All Payments");
  const [selectedTab, setSelectedTab] = useState("pending");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [paymentPlanDialogOpen, setPaymentPlanDialogOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [reminderType, setReminderType] = useState<"email" | "sms" | "call">(
    "email"
  );

  // Mock payment follow-up data
  const [paymentFollowUps, setPaymentFollowUps] = useState<
    PaymentFollowUpData[]
  >([
    {
      bookingId: "book_002",
      lastContactDate: "2024-02-18",
      nextFollowUpDate: "2024-02-25",
      priority: "medium",
      notes: [
        "Customer requested payment plan - agreed to 50% by March 1st",
        "Sent payment reminder email on Feb 18th",
      ],

      reminders: [
        {
          id: "rem_001",
          bookingId: "book_002",
          type: "email",
          message: "Payment reminder for African Safari Adventure booking",
          sentAt: "2024-02-18T10:00:00Z",
          status: "read",
        },
      ],
    },
    {
      bookingId: "book_003",
      lastContactDate: "2024-02-10",
      nextFollowUpDate: "2024-02-24",
      priority: "high",
      notes: [
        "Customer still considering - needs to confirm by Feb 25th",
        "Offered 10% early bird discount",
      ],

      reminders: [],
    },
    {
      bookingId: "book_007",
      lastContactDate: "2024-02-18",
      nextFollowUpDate: "2024-03-01",
      priority: "medium",
      notes: [
        "Balance payment due 30 days before travel",
        "Customer confirmed payment will be made by March 1st",
      ],

      reminders: [
        {
          id: "rem_002",
          bookingId: "book_007",
          type: "sms",
          message: "Reminder: Balance payment due for Himalayan Trek",
          sentAt: "2024-02-18T14:30:00Z",
          status: "delivered",
        },
      ],
    },
    {
      bookingId: "book_008",
      lastContactDate: "2024-02-18",
      nextFollowUpDate: "2024-02-22",
      priority: "urgent",
      notes: [
        "Group booking - waiting for confirmation from all 6 participants",
        "Deadline approaching - need response by Feb 25th",
      ],

      reminders: [],
    },
  ]);

  // Filter bookings that need payment follow-up
  const getBookingsNeedingFollowUp = () => {
    return bookings.filter(
      (booking) =>
        booking.paymentStatus === "pending" ||
        booking.paymentStatus === "partial" ||
        (booking.status === "inquiry" && booking.paymentStatus === "pending")
    );
  };

  const filteredBookings = getBookingsNeedingFollowUp().filter((booking) => {
    const followUp = paymentFollowUps.find((f) => f.bookingId === booking.id);

    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.package.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPaymentStatus =
      selectedPaymentStatus === "All Payments" ||
      booking.paymentStatus === selectedPaymentStatus;

    const matchesPriority =
      selectedPriority === "All Priorities" ||
      followUp?.priority === selectedPriority;

    const matchesTab =
      (selectedTab === "pending" && booking.paymentStatus === "pending") ||
      (selectedTab === "partial" && booking.paymentStatus === "partial") ||
      (selectedTab === "overdue" && isOverdue(booking)) ||
      selectedTab === "all";

    return (
      matchesSearch && matchesPaymentStatus && matchesPriority && matchesTab
    );
  });

  const isOverdue = (booking: Booking) => {
    const followUp = paymentFollowUps.find((f) => f.bookingId === booking.id);
    if (!followUp?.nextFollowUpDate) return false;
    return new Date(followUp.nextFollowUpDate) < new Date();
  };

  const getDaysUntilTravel = (booking: Booking) => {
    const travelDate = new Date(booking.travelDates.startDate);
    const today = new Date();
    const diffTime = travelDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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

  const calculatePaymentProgress = (booking: Booking) => {
    return Math.round((booking.paidAmount / booking.totalAmount) * 100);
  };

  const getOutstandingAmount = (booking: Booking) => {
    return booking.totalAmount - booking.paidAmount;
  };

  const sendReminder = (
    booking: Booking,
    type: "email" | "sms" | "call",
    message: string
  ) => {
    const newReminder: PaymentReminder = {
      id: `rem_${Date.now()}`,
      bookingId: booking.id,
      type,
      message,
      sentAt: new Date().toISOString(),
      status: "sent",
    };

    // Update payment follow-up data
    setPaymentFollowUps((prev) => {
      const existingIndex = prev.findIndex((f) => f.bookingId === booking.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          reminders: [...updated[existingIndex].reminders, newReminder],
          lastContactDate: new Date().toISOString().split("T")[0],
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            bookingId: booking.id,
            lastContactDate: new Date().toISOString().split("T")[0],
            priority: "medium",
            notes: [`${type.toUpperCase()} reminder sent`],
            reminders: [newReminder],
          },
        ];
      }
    });

    setReminderDialogOpen(false);
    setCustomMessage("");
  };

  const updatePriority = (
    bookingId: string,
    priority: "low" | "medium" | "high" | "urgent"
  ) => {
    setPaymentFollowUps((prev) => {
      const existingIndex = prev.findIndex((f) => f.bookingId === bookingId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], priority };
        return updated;
      } else {
        return [
          ...prev,
          {
            bookingId,
            priority,
            notes: [],
            reminders: [],
          },
        ];
      }
    });
  };

  const addNote = (bookingId: string, note: string) => {
    setPaymentFollowUps((prev) => {
      const existingIndex = prev.findIndex((f) => f.bookingId === bookingId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          notes: [
            ...updated[existingIndex].notes,
            `${new Date().toLocaleDateString()}: ${note}`,
          ],
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            bookingId,
            priority: "medium",
            notes: [`${new Date().toLocaleDateString()}: ${note}`],
            reminders: [],
          },
        ];
      }
    });
  };

  // Calculate stats with enhanced payment data
  const enhancedStats = getPaymentStatistics();
  const stats = {
    totalPending: filteredBookings.filter((b) => b.paymentStatus === "pending")
      .length,
    totalPartial: filteredBookings.filter((b) => b.paymentStatus === "partial")
      .length,
    totalOverdue: filteredBookings.filter((b) => isOverdue(b)).length,
    totalOutstanding: getTotalOutstanding(),
    installmentBookings: enhancedStats.totalInstallmentBookings,
    overdueInstallments: enhancedStats.overdueInstallments,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Payment Follow-Up</h1>
          <p className="text-muted-foreground mt-1">
            Chase payments, manage installment plans, and track remaining
            payment schedules
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <TrendingUpIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" asChild>
            <Link to="/admin/bookings">
              <PackageIcon className="h-4 w-4 mr-2" />
              All Bookings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Payments
                </p>
                <p className="text-2xl font-bold">{stats.totalPending}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Partial Payments
                </p>
                <p className="text-2xl font-bold">{stats.totalPartial}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{stats.totalOverdue}</p>
              </div>
              <div className="h-8 w-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(stats.totalOutstanding)}
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Installment Plans
                </p>
                <p className="text-2xl font-bold">
                  {stats.installmentBookings}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Overdue Installments
                </p>
                <p className="text-2xl font-bold">
                  {stats.overdueInstallments}
                </p>
              </div>
              <div className="h-8 w-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search by customer name, booking number, or package..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <FilterIcon className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={selectedPaymentStatus}
              onValueChange={setSelectedPaymentStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPriority}
              onValueChange={setSelectedPriority}
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Priorities">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="justify-start">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Follow-Up Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Payment Follow-Up ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">
                Pending ({stats.totalPending})
              </TabsTrigger>
              <TabsTrigger value="partial">
                Partial ({stats.totalPartial})
              </TabsTrigger>
              <TabsTrigger value="overdue">
                Overdue ({stats.totalOverdue})
              </TabsTrigger>
              <TabsTrigger value="all">
                All ({filteredBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              <PaymentFollowUpTable
                bookings={filteredBookings}
                paymentFollowUps={paymentFollowUps}
                onPriorityUpdate={updatePriority}
                onReminderSend={(booking) => {
                  console.log(
                    "Payment reminder sent for booking:",
                    booking.bookingNumber
                  );
                  // Update last contact date in follow-up data
                  setPaymentFollowUps((prev) => {
                    const existingIndex = prev.findIndex(
                      (f) => f.bookingId === booking.id
                    );
                    if (existingIndex >= 0) {
                      const updated = [...prev];
                      updated[existingIndex] = {
                        ...updated[existingIndex],
                        lastContactDate: new Date().toISOString().split("T")[0],
                      };
                      return updated;
                    }
                    return prev;
                  });
                }}
                onViewHistory={(booking) => {
                  console.log(
                    "Viewing payment history for booking:",
                    booking.bookingNumber
                  );
                  // This is handled by the PaymentHistoryDialog in the PaymentFollowUpTable component
                }}
              />

              {/* Original table kept for reference but hidden */}
              <div className="hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Travel Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => {
                      const followUp = paymentFollowUps.find(
                        (f) => f.bookingId === booking.id
                      );
                      const daysUntilTravel = getDaysUntilTravel(booking);
                      const isUrgent =
                        daysUntilTravel <= 30 &&
                        booking.paymentStatus !== "paid";

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
                                <p className="font-medium">
                                  {booking.customer.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.bookingNumber}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {booking.package.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {booking.package.duration} days
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{formatDate(booking.travelDates.startDate)}</p>
                              <p
                                className={`text-muted-foreground ${isUrgent ? "text-red-600" : ""}`}
                              >
                                {daysUntilTravel > 0
                                  ? `${daysUntilTravel} days`
                                  : "Past due"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p className="font-medium">
                                {formatCurrency(booking.totalAmount)}
                              </p>
                              <p className="text-muted-foreground">
                                Paid: {formatCurrency(booking.paidAmount)}
                              </p>
                              <p className="text-red-600 font-medium">
                                Due:{" "}
                                {formatCurrency(getOutstandingAmount(booking))}
                              </p>
                              {booking.paidAmount > 0 && (
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="w-16 bg-muted rounded-full h-1">
                                    <div
                                      className="bg-green-600 h-1 rounded-full"
                                      style={{
                                        width: `${calculatePaymentProgress(booking)}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {calculatePaymentProgress(booking)}%
                                  </span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getPaymentStatusColor(
                                isOverdue(booking)
                                  ? "overdue"
                                  : booking.paymentStatus
                              )}
                            >
                              {isOverdue(booking)
                                ? "overdue"
                                : booking.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={followUp?.priority || "medium"}
                              onValueChange={(value) =>
                                updatePriority(booking.id, value as any)
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
                                <p className="text-muted-foreground">
                                  No contact
                                </p>
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
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedBooking(booking)}
                                  >
                                    <BellIcon className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Send Payment Reminder
                                    </DialogTitle>
                                    <DialogDescription>
                                      Send a payment reminder to{" "}
                                      {booking.customer.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">
                                        Reminder Type
                                      </label>
                                      <Select
                                        value={reminderType}
                                        onValueChange={(value) =>
                                          setReminderType(value as any)
                                        }
                                      >
                                        <SelectTrigger className="mt-1">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="email">
                                            Email
                                          </SelectItem>
                                          <SelectItem value="sms">
                                            SMS
                                          </SelectItem>
                                          <SelectItem value="call">
                                            Phone Call
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Message
                                      </label>
                                      <Textarea
                                        placeholder="Enter custom message or use template..."
                                        value={customMessage}
                                        onChange={(e) =>
                                          setCustomMessage(e.target.value)
                                        }
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-sm font-medium">
                                        Quick Templates:
                                      </p>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start text-xs"
                                        onClick={() =>
                                          setCustomMessage(
                                            `Dear ${booking.customer.name}, this is a friendly reminder that your payment of ${formatCurrency(getOutstandingAmount(booking))} for ${booking.package.name} is due. Please contact us to arrange payment.`
                                          )
                                        }
                                      >
                                        Friendly Reminder
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start text-xs"
                                        onClick={() =>
                                          setCustomMessage(
                                            `Dear ${booking.customer.name}, your travel date is approaching in ${daysUntilTravel} days. Please settle the outstanding balance of ${formatCurrency(getOutstandingAmount(booking))} to confirm your booking.`
                                          )
                                        }
                                      >
                                        Urgent Payment Due
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start text-xs"
                                        onClick={() =>
                                          setCustomMessage(
                                            `Hi ${booking.customer.name}, we'd like to discuss payment options for your ${booking.package.name} booking. Please call us at your convenience.`
                                          )
                                        }
                                      >
                                        Payment Plan Offer
                                      </Button>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          setReminderDialogOpen(false)
                                        }
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          sendReminder(
                                            booking,
                                            reminderType,
                                            customMessage
                                          )
                                        }
                                      >
                                        <SendIcon className="h-4 w-4 mr-2" />
                                        Send Reminder
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

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

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedBooking(booking)}
                                  >
                                    <HistoryIcon className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Payment Follow-Up History
                                    </DialogTitle>
                                    <DialogDescription>
                                      {booking.customer.name} -{" "}
                                      {booking.bookingNumber}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-medium mb-2">
                                          Booking Details
                                        </h4>
                                        <div className="space-y-1 text-sm">
                                          <p>
                                            <strong>Package:</strong>{" "}
                                            {booking.package.name}
                                          </p>
                                          <p>
                                            <strong>Travel Date:</strong>{" "}
                                            {formatDate(
                                              booking.travelDates.startDate
                                            )}
                                          </p>
                                          <p>
                                            <strong>Total Amount:</strong>{" "}
                                            {formatCurrency(
                                              booking.totalAmount
                                            )}
                                          </p>
                                          <p>
                                            <strong>Paid Amount:</strong>{" "}
                                            {formatCurrency(booking.paidAmount)}
                                          </p>
                                          <p>
                                            <strong>Outstanding:</strong>{" "}
                                            <span className="text-red-600 font-medium">
                                              {formatCurrency(
                                                getOutstandingAmount(booking)
                                              )}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">
                                          Contact Information
                                        </h4>
                                        <div className="space-y-1 text-sm">
                                          <p>
                                            <strong>Email:</strong>{" "}
                                            {booking.customer.email}
                                          </p>
                                          <p>
                                            <strong>Phone:</strong>{" "}
                                            {booking.customer.phone}
                                          </p>
                                          <p>
                                            <strong>Priority:</strong>
                                            <Badge
                                              className={`ml-2 ${getPriorityColor(followUp?.priority || "medium")}`}
                                            >
                                              {followUp?.priority || "medium"}
                                            </Badge>
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {followUp?.reminders &&
                                      followUp.reminders.length > 0 && (
                                        <div>
                                          <h4 className="font-medium mb-2">
                                            Reminder History
                                          </h4>
                                          <div className="space-y-2">
                                            {followUp.reminders.map(
                                              (reminder) => (
                                                <div
                                                  key={reminder.id}
                                                  className="p-3 bg-muted rounded-lg"
                                                >
                                                  <div className="flex items-center justify-between mb-1">
                                                    <Badge variant="outline">
                                                      {reminder.type.toUpperCase()}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                      {formatDate(
                                                        reminder.sentAt
                                                      )}
                                                    </span>
                                                  </div>
                                                  <p className="text-sm">
                                                    {reminder.message}
                                                  </p>
                                                  <div className="flex items-center mt-1">
                                                    <Badge
                                                      className={`text-xs ${
                                                        reminder.status ===
                                                        "read"
                                                          ? "bg-green-100 text-green-800"
                                                          : reminder.status ===
                                                              "delivered"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : reminder.status ===
                                                                "sent"
                                                              ? "bg-yellow-100 text-yellow-800"
                                                              : "bg-red-100 text-red-800"
                                                      }`}
                                                    >
                                                      {reminder.status}
                                                    </Badge>
                                                  </div>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      )}

                                    {followUp?.notes &&
                                      followUp.notes.length > 0 && (
                                        <div>
                                          <h4 className="font-medium mb-2">
                                            Follow-Up Notes
                                          </h4>
                                          <div className="space-y-2">
                                            {followUp.notes.map(
                                              (note, index) => (
                                                <div
                                                  key={index}
                                                  className="p-3 bg-muted rounded-lg"
                                                >
                                                  <p className="text-sm">
                                                    {note}
                                                  </p>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      )}

                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Add Note
                                      </h4>
                                      <div className="flex space-x-2">
                                        <Input
                                          placeholder="Add a follow-up note..."
                                          onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                              const input =
                                                e.target as HTMLInputElement;
                                              if (input.value.trim()) {
                                                addNote(
                                                  booking.id,
                                                  input.value.trim()
                                                );
                                                input.value = "";
                                              }
                                            }
                                          }}
                                        />

                                        <Button size="sm">Add</Button>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentFollowUp;
