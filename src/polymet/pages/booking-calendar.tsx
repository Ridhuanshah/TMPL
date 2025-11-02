import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookings, bookingStatuses } from "@/polymet/data/booking-data";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  SearchIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  bookings: typeof bookings;
}

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Get the first day of the current month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Get the first day of the calendar (might be from previous month)
  const firstDayOfCalendar = new Date(firstDayOfMonth);
  firstDayOfCalendar.setDate(
    firstDayOfCalendar.getDate() - firstDayOfMonth.getDay()
  );

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: CalendarDay[] = [];
    const currentCalendarDate = new Date(firstDayOfCalendar);

    for (let i = 0; i < 42; i++) {
      // 6 weeks * 7 days
      const dateStr = currentCalendarDate.toISOString().split("T")[0];
      const dayBookings = bookings.filter((booking) => {
        const startDate = new Date(booking.travelDates.startDate);
        const endDate = new Date(booking.travelDates.endDate);
        const checkDate = new Date(currentCalendarDate);

        return checkDate >= startDate && checkDate <= endDate;
      });

      days.push({
        date: new Date(currentCalendarDate),
        isCurrentMonth:
          currentCalendarDate.getMonth() === currentDate.getMonth(),
        bookings: dayBookings,
      });

      currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
    }

    return days;
  }, [currentDate, firstDayOfCalendar]);

  // Filter bookings for selected date
  const selectedDateBookings = useMemo(() => {
    if (!selectedDate) return [];

    const dateStr = selectedDate.toISOString().split("T")[0];
    return bookings.filter((booking) => {
      const startDate = new Date(booking.travelDates.startDate);
      const endDate = new Date(booking.travelDates.endDate);
      const checkDate = new Date(selectedDate);

      const isInDateRange = checkDate >= startDate && checkDate <= endDate;
      const matchesStatus =
        statusFilter === "All Status" || booking.status === statusFilter;
      const matchesSearch =
        searchQuery === "" ||
        booking.customer.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        booking.package.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase());

      return isInDateRange && matchesStatus && matchesSearch;
    });
  }, [selectedDate, statusFilter, searchQuery]);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500";
      case "paid":
        return "bg-green-500";
      case "completed":
        return "bg-purple-500";
      case "cancelled":
        return "bg-red-500";
      case "inquiry":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "paid":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      case "inquiry":
        return "secondary";
      default:
        return "outline";
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Booking Calendar</h1>
          <p className="text-muted-foreground mt-1">
            View and manage travel bookings by date
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Today
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`
                    relative p-2 min-h-[80px] border rounded-lg cursor-pointer transition-colors
                    ${day.isCurrentMonth ? "bg-background hover:bg-muted/50" : "bg-muted/20 text-muted-foreground"}
                    ${
                      selectedDate &&
                      day.date.toDateString() === selectedDate.toDateString()
                        ? "ring-2 ring-primary bg-primary/5"
                        : ""
                    }
                  `}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className="text-sm font-medium mb-1">
                    {day.date.getDate()}
                  </div>

                  {/* Booking indicators */}
                  <div className="space-y-1">
                    {day.bookings.slice(0, 2).map((booking, bookingIndex) => (
                      <div
                        key={booking.id}
                        className={`
                          w-full h-1.5 rounded-full ${getStatusColor(booking.status)}
                        `}
                        title={`${booking.customer.name} - ${booking.package.name}`}
                      />
                    ))}
                    {day.bookings.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{day.bookings.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate
                ? `Bookings for ${selectedDate.toLocaleDateString()}`
                : "Select a date to view bookings"}
            </CardTitle>

            {selectedDate && (
              <div className="space-y-3">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                  <Input
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {bookingStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {selectedDateBookings.length > 0 ? (
                  selectedDateBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">
                            {booking.customer.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.bookingNumber}
                          </p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPinIcon className="h-4 w-4 mr-2" />

                          {booking.package.name}
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {booking.package.duration} days
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground">
                          <UsersIcon className="h-4 w-4 mr-2" />
                          {booking.participants} participant
                          {booking.participants > 1 ? "s" : ""}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm font-medium">
                            Total Amount
                          </span>
                          <span className="font-semibold">
                            {booking.currency}{" "}
                            {booking.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                    <p className="text-muted-foreground">
                      No bookings found for this date
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                <p className="text-muted-foreground">
                  Click on a date to view bookings
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {[
              { status: "inquiry", label: "Inquiry" },
              { status: "confirmed", label: "Confirmed" },
              { status: "paid", label: "Paid" },
              { status: "completed", label: "Completed" },
              { status: "cancelled", label: "Cancelled" },
            ].map(({ status, label }) => (
              <div key={status} className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}
                />

                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingCalendar;
