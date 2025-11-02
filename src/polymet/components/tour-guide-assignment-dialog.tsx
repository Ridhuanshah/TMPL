import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  UsersIcon,
  UserCheckIcon,
  CrownIcon,
  XIcon,
  CalendarIcon,
  AlertTriangleIcon,
  InfoIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react";
import { users, User } from "@/polymet/data/user-data";
import {
  tourGuideAssignments,
  getAssignmentsForTourGuide,
} from "@/polymet/data/tour-guide-assignments";

interface TourGuideAssignment {
  leadGuide?: User;
  companions: User[];
}

interface TourGuideAssignmentDialogProps {
  bookingDateId: string;
  departureIndex: number;
  startDate: string;
  endDate: string;
  currentAssignment: TourGuideAssignment;
  onAssignmentChange: (assignment: TourGuideAssignment) => void;
  disabled?: boolean;
}

export function TourGuideAssignmentDialog({
  bookingDateId,
  departureIndex,
  startDate,
  endDate,
  currentAssignment,
  onAssignmentChange,
  disabled = false,
}: TourGuideAssignmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState("All Experience");

  // Get all tour guides from user data
  const tourGuides = users.filter(
    (user) => user.role === "tour_guide" && user.status === "active"
  );

  // Check for booking conflicts
  const getGuideConflicts = (guideId: string) => {
    const guideAssignments = getAssignmentsForTourGuide(guideId);
    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(endDate);

    return guideAssignments.filter((assignment) => {
      const assignmentStart = new Date(assignment.tourDates.startDate);
      const assignmentEnd = new Date(assignment.tourDates.endDate);

      // Check if dates overlap
      return (
        (requestedStart >= assignmentStart &&
          requestedStart <= assignmentEnd) ||
        (requestedEnd >= assignmentStart && requestedEnd <= assignmentEnd) ||
        (requestedStart <= assignmentStart && requestedEnd >= assignmentEnd)
      );
    });
  };

  const assignGuide = (guide: User, role: "leader" | "companion") => {
    if (role === "leader") {
      onAssignmentChange({
        ...currentAssignment,
        leadGuide: guide,
      });
    } else {
      // Check if guide is already assigned as companion
      const isAlreadyCompanion = currentAssignment.companions.some(
        (comp) => comp.id === guide.id
      );
      if (isAlreadyCompanion) return;

      onAssignmentChange({
        ...currentAssignment,
        companions: [...currentAssignment.companions, guide],
      });
    }
  };

  const removeGuide = (guideId: string, role: "leader" | "companion") => {
    if (role === "leader") {
      onAssignmentChange({
        ...currentAssignment,
        leadGuide: undefined,
      });
    } else {
      onAssignmentChange({
        ...currentAssignment,
        companions: currentAssignment.companions.filter(
          (comp) => comp.id !== guideId
        ),
      });
    }
  };

  const getFilteredGuides = (): User[] => {
    let guides = tourGuides;

    if (experienceFilter !== "All Experience") {
      // Filter based on experience level from notes
      guides = guides.filter((guide) => {
        const notes = guide.notes?.toLowerCase() || "";
        switch (experienceFilter) {
          case "Beginner (0-2 years)":
            return notes.includes("1 year") || notes.includes("2 year");
          case "Intermediate (3-7 years)":
            return (
              notes.includes("3 year") ||
              notes.includes("4 year") ||
              notes.includes("5 year") ||
              notes.includes("6 year") ||
              notes.includes("7 year")
            );

          case "Expert (8+ years)":
            return (
              notes.includes("8 year") ||
              notes.includes("9 year") ||
              notes.includes("10 year") ||
              notes.match(/\d{2,}\s*year/)
            );

          default:
            return true;
        }
      });
    }

    return guides;
  };

  const experienceOptions = [
    "All Experience",
    "Beginner (0-2 years)",
    "Intermediate (3-7 years)",
    "Expert (8+ years)",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || !startDate || !endDate}
        >
          <UsersIcon className="h-4 w-4 mr-2" />
          Assign Tour Guides
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Assign Tour Guides - Departure #{departureIndex + 1}
          </DialogTitle>
          <DialogDescription>
            {startDate && endDate && (
              <>
                Travel dates: {startDate} to {endDate}
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="assignment" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assignment">Tour Guide Assignment</TabsTrigger>
            <TabsTrigger value="calendar">Availability Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="assignment" className="space-y-6">
            {/* Current Assignments */}
            <div className="space-y-3">
              <h4 className="font-medium">Current Assignments</h4>

              {/* Lead Guide */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <CrownIcon className="h-4 w-4 mr-2 text-yellow-600" />

                    <span className="font-medium">Lead Tour Guide</span>
                  </div>
                </div>
                {currentAssignment.leadGuide ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {currentAssignment.leadGuide.avatar && (
                        <img
                          src={currentAssignment.leadGuide.avatar}
                          alt={currentAssignment.leadGuide.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {currentAssignment.leadGuide.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {currentAssignment.leadGuide.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {currentAssignment.leadGuide.location.city},{" "}
                          {currentAssignment.leadGuide.location.country}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        removeGuide(currentAssignment.leadGuide!.id, "leader")
                      }
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No lead tour guide assigned
                  </p>
                )}
              </div>

              {/* Companion Guides */}
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <UserCheckIcon className="h-4 w-4 mr-2 text-blue-600" />

                    <span className="font-medium">
                      Companion Tour Guides (
                      {currentAssignment.companions.length})
                    </span>
                  </div>
                </div>
                {currentAssignment.companions.length > 0 ? (
                  <div className="space-y-2">
                    {currentAssignment.companions.map((companion) => (
                      <div
                        key={companion.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          {companion.avatar && (
                            <img
                              src={companion.avatar}
                              alt={companion.name}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div>
                            <p className="font-medium text-sm">
                              {companion.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {companion.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {companion.location.city},{" "}
                              {companion.location.country}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGuide(companion.id, "companion")}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No companion tour guides assigned
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Available Guides */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Available Tour Guides</h4>
                <Select
                  value={experienceFilter}
                  onValueChange={setExperienceFilter}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {getFilteredGuides().map((guide) => {
                  const isLeadGuide =
                    currentAssignment.leadGuide?.id === guide.id;
                  const isCompanion = currentAssignment.companions.some(
                    (comp) => comp.id === guide.id
                  );
                  const isAssigned = isLeadGuide || isCompanion;

                  return (
                    <div
                      key={guide.id}
                      className={`border rounded-lg p-3 ${
                        isAssigned ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {guide.avatar && (
                            <img
                              src={guide.avatar}
                              alt={guide.name}
                              className="w-10 h-10 rounded-full"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-sm">{guide.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {guide.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {guide.location.city}, {guide.location.country}
                            </p>
                            {guide.notes && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {guide.notes}
                              </p>
                            )}
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="text-xs">
                                {guide.valueTier.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {isAssigned ? (
                        <div className="mt-2">
                          <Badge
                            variant={isLeadGuide ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {isLeadGuide ? "Lead Tour Guide" : "Companion"}
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => assignGuide(guide, "leader")}
                            disabled={Boolean(currentAssignment.leadGuide)}
                          >
                            <CrownIcon className="h-3 w-3 mr-1" />
                            Leader
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => assignGuide(guide, "companion")}
                          >
                            <UserCheckIcon className="h-3 w-3 mr-1" />
                            Companion
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {getFilteredGuides().length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No tour guides available with the selected criteria
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            {/* Calendar View */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Tour Guide Availability Calendar
                </h4>
                <div className="text-sm text-muted-foreground">
                  {startDate && endDate && (
                    <span>
                      Requested: {startDate} to {endDate}
                    </span>
                  )}
                </div>
              </div>

              <Alert>
                <InfoIcon className="h-4 w-4" />

                <AlertDescription>
                  View tour guide schedules and potential conflicts. Red dates
                  indicate existing bookings.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {tourGuides.map((guide) => {
                  const conflicts = getGuideConflicts(guide.id);
                  const hasConflict = conflicts.length > 0;

                  return (
                    <Card
                      key={guide.id}
                      className={
                        hasConflict ? "border-orange-200" : "border-green-200"
                      }
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {guide.avatar && (
                              <img
                                src={guide.avatar}
                                alt={guide.name}
                                className="w-6 h-6 rounded-full"
                              />
                            )}
                            <span>{guide.name}</span>
                          </div>
                          {hasConflict ? (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangleIcon className="h-3 w-3 mr-1" />
                              Conflict
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-800"
                            >
                              Available
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <MapPinIcon className="h-3 w-3 mr-1" />
                            {guide.location.city}, {guide.location.country}
                          </div>
                        </div>

                        {conflicts.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-orange-600">
                              Existing Bookings:
                            </p>
                            {conflicts.map((conflict) => (
                              <div
                                key={conflict.id}
                                className="bg-orange-50 p-2 rounded text-xs"
                              >
                                <div className="font-medium">
                                  {conflict.packageName}
                                </div>
                                <div className="text-muted-foreground flex items-center">
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  {conflict.tourDates.startDate} to{" "}
                                  {conflict.tourDates.endDate}
                                </div>
                                <div className="text-muted-foreground">
                                  {conflict.destination.name}
                                </div>
                              </div>
                            ))}
                            <Alert className="border-orange-200">
                              <AlertTriangleIcon className="h-4 w-4" />

                              <AlertDescription className="text-xs">
                                This guide has overlapping bookings but can
                                still be assigned if needed.
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {conflicts.length === 0 && (
                          <div className="bg-green-50 p-2 rounded text-xs">
                            <div className="text-green-600 font-medium">
                              ✓ Available for assignment
                            </div>
                            <div className="text-muted-foreground">
                              No conflicts found for the requested dates
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => assignGuide(guide, "leader")}
                            disabled={Boolean(currentAssignment.leadGuide)}
                            className="text-xs"
                          >
                            <CrownIcon className="h-3 w-3 mr-1" />
                            Leader
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => assignGuide(guide, "companion")}
                            className="text-xs"
                          >
                            <UserCheckIcon className="h-3 w-3 mr-1" />
                            Companion
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
