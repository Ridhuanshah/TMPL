import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "lucide-react";
import { TourGuideAssignmentDialog } from "@/polymet/components/tour-guide-assignment-dialog";
import { TourGuideFunctionalitySummary } from "@/polymet/components/tour-guide-functionality-summary";
import { users, User } from "@/polymet/data/user-data";
import {
  tourGuideAssignments,
  getAssignmentsForTourGuide,
} from "@/polymet/data/tour-guide-assignments";

interface TourGuideAssignment {
  leadGuide?: User;
  companions: User[];
}

interface TestBookingDate {
  id: string;
  startDate: string;
  endDate: string;
  capacity: number;
  booked: number;
  status: "active" | "full" | "cancelled";
  guides: TourGuideAssignment;
  packageName: string;
  destination: string;
}

export function TourGuideTest() {
  const [testBookingDates, setTestBookingDates] = useState<TestBookingDate[]>([
    {
      id: "test_1",
      startDate: "2024-04-15",
      endDate: "2024-04-22",
      capacity: 12,
      booked: 0,
      status: "active",
      packageName: "Japan Discovery Tour",
      destination: "Tokyo, Kyoto, Osaka",
      guides: {
        leadGuide: undefined,
        companions: [],
      },
    },
    {
      id: "test_2",
      startDate: "2024-05-01",
      endDate: "2024-05-08",
      capacity: 8,
      booked: 0,
      status: "active",
      packageName: "Borneo Wildlife Adventure",
      destination: "Sabah, Borneo",
      guides: {
        leadGuide: undefined,
        companions: [],
      },
    },
    {
      id: "test_3",
      startDate: "2024-04-20",
      endDate: "2024-04-25",
      capacity: 6,
      booked: 0,
      status: "active",
      packageName: "Malaysian Heritage Trail",
      destination: "Penang, Malacca, KL",
      guides: {
        leadGuide: undefined,
        companions: [],
      },
    },
  ]);

  const handleGuideAssignmentChange = (
    bookingId: string,
    assignment: TourGuideAssignment
  ) => {
    setTestBookingDates((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, guides: assignment } : booking
      )
    );
  };

  const getConflictInfo = (startDate: string, endDate: string) => {
    const tourGuides = users.filter(
      (user) => user.role === "tour_guide" && user.status === "active"
    );
    const conflicts = [];
    const available = [];

    for (const guide of tourGuides) {
      const guideAssignments = getAssignmentsForTourGuide(guide.id);
      const requestedStart = new Date(startDate);
      const requestedEnd = new Date(endDate);

      const hasConflict = guideAssignments.some((assignment) => {
        const assignmentStart = new Date(assignment.tourDates.startDate);
        const assignmentEnd = new Date(assignment.tourDates.endDate);

        return (
          (requestedStart >= assignmentStart &&
            requestedStart <= assignmentEnd) ||
          (requestedEnd >= assignmentStart && requestedEnd <= assignmentEnd) ||
          (requestedStart <= assignmentStart && requestedEnd >= assignmentEnd)
        );
      });

      if (hasConflict) {
        conflicts.push(guide);
      } else {
        available.push(guide);
      }
    }

    return { conflicts, available, total: tourGuides.length };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Tour Guide Assignment</h1>
        <p className="text-muted-foreground mt-2">
          Set booking schedule for tour guide
        </p>
      </div>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <InfoIcon className="h-5 w-5 mr-2" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Total Tour Guides
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {
                      users.filter(
                        (u) => u.role === "tour_guide" && u.status === "active"
                      ).length
                    }
                  </p>
                </div>
                <UsersIcon className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Active Assignments
                  </p>
                  <p className="text-2xl font-bold text-green-700">
                    {
                      tourGuideAssignments.filter(
                        (a) =>
                          a.status === "upcoming" || a.status === "in_progress"
                      ).length
                    }
                  </p>
                </div>
                <CalendarIcon className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">
                    Bookings
                  </p>
                  <p className="text-2xl font-bold text-orange-700">
                    {testBookingDates.length}
                  </p>
                </div>
                <MapPinIcon className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Booking Dates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Booking Dates</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {testBookingDates.map((booking, index) => {
            const conflictInfo = getConflictInfo(
              booking.startDate,
              booking.endDate
            );
            const hasAssignedGuides =
              booking.guides.leadGuide || booking.guides.companions.length > 0;

            return (
              <Card key={booking.id} className="relative">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Departure #{index + 1}</span>
                    {hasAssignedGuides && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Assigned
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{booking.packageName}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPinIcon className="h-3 w-3 mr-1" />

                      {booking.destination}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {booking.startDate} to {booking.endDate}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Availability Summary */}
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      Guide Availability
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Available: {conflictInfo.available.length}
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        Conflicts: {conflictInfo.conflicts.length}
                      </div>
                    </div>
                  </div>

                  {/* Current Assignments */}
                  {hasAssignedGuides && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Current Assignments:
                      </p>

                      {booking.guides.leadGuide && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Badge variant="default" className="text-xs">
                            Lead
                          </Badge>
                          <span>{booking.guides.leadGuide.name}</span>
                        </div>
                      )}

                      {booking.guides.companions.map((companion) => (
                        <div
                          key={companion.id}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <Badge variant="secondary" className="text-xs">
                            Companion
                          </Badge>
                          <span>{companion.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  {/* Assignment Dialog */}
                  <TourGuideAssignmentDialog
                    bookingDateId={booking.id}
                    departureIndex={index}
                    startDate={booking.startDate}
                    endDate={booking.endDate}
                    currentAssignment={booking.guides}
                    onAssignmentChange={(assignment) =>
                      handleGuideAssignmentChange(booking.id, assignment)
                    }
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Functionality Summary */}
      <TourGuideFunctionalitySummary />

      {/* Existing Assignments Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Tour Guide Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tourGuideAssignments
              .filter((assignment) => assignment.status === "upcoming")
              .sort(
                (a, b) =>
                  new Date(a.tourDates.startDate).getTime() -
                  new Date(b.tourDates.startDate).getTime()
              )
              .slice(0, 5)
              .map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">
                      {assignment.packageName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Guide: {assignment.tourGuideName}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {assignment.tourDates.startDate} to{" "}
                      {assignment.tourDates.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {assignment.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {assignment.groupSize} travelers
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
