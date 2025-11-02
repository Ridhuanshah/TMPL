import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  EyeIcon,
  EditIcon,
  MessageSquareIcon,
  CreditCardIcon,
  CalendarIcon,
  UsersIcon,
  DollarSignIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AlertCircleIcon,
} from "lucide-react";
import {
  bookings,
  bookingStatuses,
  paymentStatuses,
  bookingStats,
  Booking,
} from "@/polymet/data/booking-data";

export function BookingManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState("All Payments");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedBookingForAction, setSelectedBookingForAction] =
    useState<Booking | null>(null);

  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.package.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All Status" || booking.status === selectedStatus;
    const matchesPaymentStatus =
      selectedPaymentStatus === "All Payments" ||
      booking.paymentStatus === selectedPaymentStatus;

    return matchesSearch && matchesStatus && matchesPaymentStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "inquiry":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "completed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
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
      case "refunded":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "inquiry":
        return <AlertCircleIcon className="h-4 w-4" />;

      case "confirmed":
        return <CheckCircleIcon className="h-4 w-4" />;

      case "completed":
        return <CheckCircleIcon className="h-4 w-4" />;

      case "cancelled":
        return <XCircleIcon className="h-4 w-4" />;

      default:
        return <ClockIcon className="h-4 w-4" />;
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

  const handleEditBooking = (booking: Booking) => {
    // Navigate to edit booking page with booking ID
    navigate(`/bookings/edit/${booking.id}`);
  };

  const handleContactCustomer = (booking: Booking) => {
    setSelectedBookingForAction(booking);
    setContactDialogOpen(true);
  };

  const handleProcessPayment = (booking: Booking) => {
    setSelectedBookingForAction(booking);
    setPaymentDialogOpen(true);
  };

  const sendMessage = (message: string) => {
    // In a real app, this would send an email or SMS
    console.log(
      `Sending message to ${selectedBookingForAction?.customer.name}: ${message}`
    );
    setContactDialogOpen(false);
    setSelectedBookingForAction(null);
  };

  const processPayment = (amount: number, method: string) => {
    // In a real app, this would process the payment
    console.log(
      `Processing payment of RM${amount} via ${method} for booking ${selectedBookingForAction?.bookingNumber}`
    );
    setPaymentDialogOpen(false);
    setSelectedBookingForAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Booking Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer bookings, payments, and travel arrangements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar View
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/payment-follow-up">
              <CreditCardIcon className="h-4 w-4 mr-2" />
              Payment Follow-Up
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUpIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" asChild>
            <Link to="/admin/bookings/new">
              <UsersIcon className="h-4 w-4 mr-2" />
              Create Booking
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">
                  {bookingStats.totalBookings}
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(bookingStats.totalRevenue)}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <DollarSignIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recent Bookings</p>
                <p className="text-2xl font-bold">
                  {bookingStats.recentBookings}
                </p>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">
                  {bookingStats.conversionRate}%
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <UsersIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(bookingStats.statusBreakdown).map(([status, count]) => (
          <Card key={status}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                {getStatusIcon(status)}
              </div>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {status}
              </p>
            </CardContent>
          </Card>
        ))}
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Booking Status" />
              </SelectTrigger>
              <SelectContent>
                {bookingStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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

            <Button variant="outline" className="justify-start">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Bookings ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Travel Dates</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
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
                          <UsersIcon className="h-5 w-5 text-muted-foreground" />
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
                        {booking.package.continent} • {booking.package.duration}{" "}
                        days
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{formatDate(booking.travelDates.startDate)}</p>
                      <p className="text-muted-foreground">
                        to {formatDate(booking.travelDates.endDate)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <UsersIcon className="h-3 w-3 text-muted-foreground" />

                      <span className="text-sm">{booking.participants}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">
                        {formatCurrency(booking.totalAmount)}
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
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getPaymentStatusColor(booking.paymentStatus)}
                    >
                      {booking.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <EyeIcon className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                              <DialogDescription>
                                {booking.bookingNumber} -{" "}
                                {booking.customer.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Customer Information
                                  </h4>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <strong>Name:</strong>{" "}
                                      {booking.customer.name}
                                    </p>
                                    <p>
                                      <strong>Email:</strong>{" "}
                                      {booking.customer.email}
                                    </p>
                                    <p>
                                      <strong>Phone:</strong>{" "}
                                      {booking.customer.phone}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Package Information
                                  </h4>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <strong>Package:</strong>{" "}
                                      {booking.package.name}
                                    </p>
                                    <p>
                                      <strong>Duration:</strong>{" "}
                                      {booking.package.duration} days
                                    </p>
                                    <p>
                                      <strong>Participants:</strong>{" "}
                                      {booking.participants}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {booking.specialRequests &&
                                booking.specialRequests.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Special Requests
                                    </h4>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                      {booking.specialRequests.map(
                                        (request, index) => (
                                          <li key={index}>{request}</li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              {booking.notes && (
                                <div>
                                  <h4 className="font-medium mb-2">Notes</h4>
                                  <p className="text-sm">{booking.notes}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem
                          onClick={() => handleEditBooking(booking)}
                        >
                          <EditIcon className="mr-2 h-4 w-4" />
                          Edit Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleContactCustomer(booking)}
                        >
                          <MessageSquareIcon className="mr-2 h-4 w-4" />
                          Contact Customer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => handleProcessPayment(booking)}
                        >
                          <CreditCardIcon className="mr-2 h-4 w-4" />
                          Process Payment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contact Customer Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Customer</DialogTitle>
            <DialogDescription>
              Send a message to {selectedBookingForAction?.customer.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Customer Details</label>
              <div className="mt-1 p-3 bg-muted rounded-lg text-sm">
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedBookingForAction?.customer.name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedBookingForAction?.customer.email}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedBookingForAction?.customer.phone}
                </p>
                <p>
                  <strong>Booking:</strong>{" "}
                  {selectedBookingForAction?.bookingNumber}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={() =>
                  sendMessage(
                    "Thank you for your booking. We will contact you shortly with more details."
                  )
                }
                className="w-full justify-start"
                variant="outline"
              >
                <MessageSquareIcon className="mr-2 h-4 w-4" />
                Send Confirmation Message
              </Button>
              <Button
                onClick={() =>
                  sendMessage(
                    "We need to discuss some details about your upcoming trip. Please call us at your convenience."
                  )
                }
                className="w-full justify-start"
                variant="outline"
              >
                <MessageSquareIcon className="mr-2 h-4 w-4" />
                Request Callback
              </Button>
              <Button
                onClick={() =>
                  sendMessage(
                    "Your travel documents are ready for pickup. Please visit our office or we can email them to you."
                  )
                }
                className="w-full justify-start"
                variant="outline"
              >
                <MessageSquareIcon className="mr-2 h-4 w-4" />
                Document Ready Notification
              </Button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setContactDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>
              Process payment for {selectedBookingForAction?.customer.name}'s
              booking
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Booking Details</label>
              <div className="mt-1 p-3 bg-muted rounded-lg text-sm">
                <p>
                  <strong>Booking:</strong>{" "}
                  {selectedBookingForAction?.bookingNumber}
                </p>
                <p>
                  <strong>Package:</strong>{" "}
                  {selectedBookingForAction?.package.name}
                </p>
                <p>
                  <strong>Total Amount:</strong>{" "}
                  {selectedBookingForAction &&
                    formatCurrency(selectedBookingForAction.totalAmount)}
                </p>
                <p>
                  <strong>Paid Amount:</strong>{" "}
                  {selectedBookingForAction &&
                    formatCurrency(selectedBookingForAction.paidAmount)}
                </p>
                <p>
                  <strong>Outstanding:</strong>{" "}
                  {selectedBookingForAction &&
                    formatCurrency(
                      selectedBookingForAction.totalAmount -
                        selectedBookingForAction.paidAmount
                    )}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={() =>
                  processPayment(
                    selectedBookingForAction
                      ? selectedBookingForAction.totalAmount -
                          selectedBookingForAction.paidAmount
                      : 0,
                    "Credit Card"
                  )
                }
                className="w-full justify-start"
                variant="outline"
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Process Full Payment (Credit Card)
              </Button>
              <Button
                onClick={() => processPayment(1000, "Bank Transfer")}
                className="w-full justify-start"
                variant="outline"
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Process Partial Payment (RM 1,000)
              </Button>
              <Button
                onClick={() =>
                  processPayment(
                    selectedBookingForAction
                      ? selectedBookingForAction.totalAmount -
                          selectedBookingForAction.paidAmount
                      : 0,
                    "Cash"
                  )
                }
                className="w-full justify-start"
                variant="outline"
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Process Cash Payment
              </Button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setPaymentDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookingManagement;
