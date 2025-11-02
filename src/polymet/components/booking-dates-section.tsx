import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CalendarIcon,
  PlusIcon,
  XIcon,
  UsersIcon,
  UserCheckIcon,
  CrownIcon,
  AlertCircleIcon,
  EditIcon,
  PlaneIcon,
  DollarSignIcon,
  HashIcon,
} from "lucide-react";
import {
  PackageBookingDate,
  flightTypes,
  flightCompanies,
  getFlightCompanyById,
  getActiveFlightCompanies,
} from "@/polymet/data/travel-agent-data";
import { TourGuideAssignmentDialog } from "@/polymet/components/tour-guide-assignment-dialog";
import { User } from "@/polymet/data/user-data";

// Updated interface to use User instead of TravelAgent
interface UpdatedPackageBookingDate {
  id: string;
  startDate: string;
  endDate: string;
  capacity: number;
  booked: number;
  status: "active" | "full" | "cancelled";
  price?: number;
  flightType?: "economy" | "premium_economy" | "business" | "first_class";
  flightCompany?: string;
  tripCode?: string;
  guides: {
    leadGuide?: User;
    companions: User[];
  };
}

interface BookingDatesSectionProps {
  bookingDates: UpdatedPackageBookingDate[];
  onBookingDatesChange: (dates: UpdatedPackageBookingDate[]) => void;
  packageDuration: number;
  errors?: Record<string, string>;
}

export function BookingDatesSection({
  bookingDates,
  onBookingDatesChange,
  packageDuration,
  errors = {},
}: BookingDatesSectionProps) {
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);

  const addBookingDate = () => {
    const newDate: UpdatedPackageBookingDate = {
      id: `date_${Date.now()}`,
      startDate: "",
      endDate: "",
      capacity: 10,
      booked: 0,
      status: "active",
      price: undefined,
      flightType: undefined,
      flightCompany: undefined,
      tripCode: "",
      guides: {
        leadGuide: undefined,
        companions: [],
      },
    };

    onBookingDatesChange([...bookingDates, newDate]);
  };

  const removeBookingDate = (dateId: string) => {
    onBookingDatesChange(bookingDates.filter((date) => date.id !== dateId));
  };

  const updateBookingDate = (
    dateId: string,
    field: keyof UpdatedPackageBookingDate,
    value: any
  ) => {
    onBookingDatesChange(
      bookingDates.map((date) =>
        date.id === dateId ? { ...date, [field]: value } : date
      )
    );
  };

  const calculateEndDate = (startDate: string, duration: number): string => {
    if (!startDate || !duration) return "";
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + duration - 1);
    return end.toISOString().split("T")[0];
  };

  const updateGuideAssignment = (
    dateId: string,
    assignment: { leadGuide?: User; companions: User[] }
  ) => {
    onBookingDatesChange(
      bookingDates.map((date) => {
        if (date.id !== dateId) return date;
        return {
          ...date,
          guides: {
            leadGuide: assignment.leadGuide,
            companions: assignment.companions || [],
          },
        };
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Booking Dates & Tour Guides
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Add multiple booking dates and assign tour guides for each departure
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Booking Dates List */}
        <div className="space-y-3">
          {bookingDates.map((bookingDate, index) => (
            <div
              key={bookingDate.id}
              className="border rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Departure #{index + 1}</h4>
                <div className="flex items-center space-x-2">
                  <TourGuideAssignmentDialog
                    bookingDateId={bookingDate.id}
                    departureIndex={index}
                    startDate={bookingDate.startDate}
                    endDate={bookingDate.endDate}
                    currentAssignment={{
                      leadGuide: bookingDate.guides?.leadGuide,
                      companions: bookingDate.guides?.companions || [],
                    }}
                    onAssignmentChange={(assignment) =>
                      updateGuideAssignment(bookingDate.id, assignment)
                    }
                    disabled={!bookingDate.startDate || !bookingDate.endDate}
                  />

                  {bookingDates.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBookingDate(bookingDate.id)}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${bookingDate.id}`}>
                    Start Date *
                  </Label>
                  <Input
                    id={`startDate-${bookingDate.id}`}
                    type="date"
                    value={bookingDate.startDate}
                    onChange={(e) => {
                      const startDate = e.target.value;
                      updateBookingDate(bookingDate.id, "startDate", startDate);

                      // Auto-calculate end date based on package duration
                      if (startDate && packageDuration) {
                        const endDate = calculateEndDate(
                          startDate,
                          packageDuration
                        );
                        updateBookingDate(bookingDate.id, "endDate", endDate);
                      }
                    }}
                    className={
                      errors[`startDate-${bookingDate.id}`]
                        ? "border-red-500"
                        : ""
                    }
                  />

                  {errors[`startDate-${bookingDate.id}`] && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors[`startDate-${bookingDate.id}`]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`endDate-${bookingDate.id}`}>
                    End Date *
                  </Label>
                  <Input
                    id={`endDate-${bookingDate.id}`}
                    type="date"
                    value={bookingDate.endDate}
                    onChange={(e) =>
                      updateBookingDate(
                        bookingDate.id,
                        "endDate",
                        e.target.value
                      )
                    }
                    className={
                      errors[`endDate-${bookingDate.id}`]
                        ? "border-red-500"
                        : ""
                    }
                  />

                  {errors[`endDate-${bookingDate.id}`] && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors[`endDate-${bookingDate.id}`]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`capacity-${bookingDate.id}`}>
                    Capacity *
                  </Label>
                  <Input
                    id={`capacity-${bookingDate.id}`}
                    type="number"
                    min="1"
                    value={bookingDate.capacity}
                    onChange={(e) =>
                      updateBookingDate(
                        bookingDate.id,
                        "capacity",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className={
                      errors[`capacity-${bookingDate.id}`]
                        ? "border-red-500"
                        : ""
                    }
                  />

                  {errors[`capacity-${bookingDate.id}`] && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors[`capacity-${bookingDate.id}`]}
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`price-${bookingDate.id}`}>Price (RM)</Label>
                  <Input
                    id={`price-${bookingDate.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                    value={bookingDate.price || ""}
                    onChange={(e) =>
                      updateBookingDate(
                        bookingDate.id,
                        "price",
                        parseFloat(e.target.value) || undefined
                      )
                    }
                    className={
                      errors[`price-${bookingDate.id}`] ? "border-red-500" : ""
                    }
                  />

                  {errors[`price-${bookingDate.id}`] && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors[`price-${bookingDate.id}`]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`flightType-${bookingDate.id}`}>
                    Flight Type
                  </Label>
                  <Select
                    value={bookingDate.flightType || ""}
                    onValueChange={(value) =>
                      updateBookingDate(
                        bookingDate.id,
                        "flightType",
                        value || undefined
                      )
                    }
                  >
                    <SelectTrigger
                      className={
                        errors[`flightType-${bookingDate.id}`]
                          ? "border-red-500"
                          : ""
                      }
                    >
                      <SelectValue placeholder="Select flight type" />
                    </SelectTrigger>
                    <SelectContent>
                      {flightTypes.map((flightType) => (
                        <SelectItem
                          key={flightType.value}
                          value={flightType.value}
                        >
                          {flightType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors[`flightType-${bookingDate.id}`] && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors[`flightType-${bookingDate.id}`]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`flightCompany-${bookingDate.id}`}>
                    Flight Company
                  </Label>
                  <Select
                    value={bookingDate.flightCompany || ""}
                    onValueChange={(value) =>
                      updateBookingDate(
                        bookingDate.id,
                        "flightCompany",
                        value || undefined
                      )
                    }
                  >
                    <SelectTrigger
                      className={
                        errors[`flightCompany-${bookingDate.id}`]
                          ? "border-red-500"
                          : ""
                      }
                    >
                      <SelectValue placeholder="Select airline" />
                    </SelectTrigger>
                    <SelectContent>
                      {getActiveFlightCompanies().map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{company.name}</span>
                            <span className="text-muted-foreground text-sm">
                              ({company.code})
                            </span>
                            <span className="text-yellow-500 text-sm">
                              ★ {company.rating}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors[`flightCompany-${bookingDate.id}`] && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors[`flightCompany-${bookingDate.id}`]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`tripCode-${bookingDate.id}`}>
                    Trip Code
                  </Label>
                  <Input
                    id={`tripCode-${bookingDate.id}`}
                    type="text"
                    placeholder="Enter trip code"
                    value={bookingDate.tripCode || ""}
                    onChange={(e) =>
                      updateBookingDate(
                        bookingDate.id,
                        "tripCode",
                        e.target.value
                      )
                    }
                    className={
                      errors[`tripCode-${bookingDate.id}`]
                        ? "border-red-500"
                        : ""
                    }
                  />

                  {errors[`tripCode-${bookingDate.id}`] && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircleIcon className="h-3 w-3 mr-1" />

                      {errors[`tripCode-${bookingDate.id}`]}
                    </p>
                  )}
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-3">
                {/* Booking Details Summary */}
                {(bookingDate.price ||
                  bookingDate.flightType ||
                  bookingDate.flightCompany ||
                  bookingDate.tripCode) && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">
                      Booking Details
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                      {bookingDate.price && (
                        <div className="flex items-center space-x-2">
                          <DollarSignIcon className="h-3 w-3 text-green-600" />

                          <span>
                            <strong>Price:</strong> RM{" "}
                            {bookingDate.price.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {bookingDate.flightType && (
                        <div className="flex items-center space-x-2">
                          <PlaneIcon className="h-3 w-3 text-blue-600" />

                          <span>
                            <strong>Flight:</strong>{" "}
                            {
                              flightTypes.find(
                                (ft) => ft.value === bookingDate.flightType
                              )?.label
                            }
                          </span>
                        </div>
                      )}
                      {bookingDate.flightCompany && (
                        <div className="flex items-center space-x-2">
                          <PlaneIcon className="h-3 w-3 text-orange-600" />

                          <span>
                            <strong>Airline:</strong>{" "}
                            {
                              getFlightCompanyById(bookingDate.flightCompany)
                                ?.name
                            }{" "}
                            (
                            {
                              getFlightCompanyById(bookingDate.flightCompany)
                                ?.code
                            }
                            )
                          </span>
                        </div>
                      )}
                      {bookingDate.tripCode && (
                        <div className="flex items-center space-x-2">
                          <HashIcon className="h-3 w-3 text-purple-600" />

                          <span>
                            <strong>Code:</strong> {bookingDate.tripCode}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Guide Summary */}
                {(bookingDate.guides?.leadGuide ||
                  bookingDate.guides?.companions?.length > 0) && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">
                      Assigned Tour Guides
                    </h5>
                    <div className="space-y-1">
                      {bookingDate.guides?.leadGuide && (
                        <div className="flex items-center space-x-2">
                          <CrownIcon className="h-3 w-3 text-yellow-600" />

                          <span className="text-sm">
                            <strong>Lead:</strong>{" "}
                            {bookingDate.guides?.leadGuide?.name}
                          </span>
                        </div>
                      )}
                      {bookingDate.guides?.companions?.map((companion) => (
                        <div
                          key={companion.id}
                          className="flex items-center space-x-2"
                        >
                          <UserCheckIcon className="h-3 w-3 text-blue-600" />

                          <span className="text-sm">
                            <strong>Companion:</strong> {companion.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Booking Date */}
        <Button
          type="button"
          variant="outline"
          onClick={addBookingDate}
          className="w-full"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Booking Date
        </Button>

        {errors.bookingDates && (
          <p className="text-sm text-red-500 flex items-center">
            <AlertCircleIcon className="h-3 w-3 mr-1" />

            {errors.bookingDates}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default BookingDatesSection;
