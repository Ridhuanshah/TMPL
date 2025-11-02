import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Briefcase,
  Star,
  Download,
  MessageSquare,
  Camera,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import {
  getTourGuideSchedule,
  getUpcomingAssignments,
  getCurrentAssignment,
  TourGuideAssignment,
} from "@/polymet/data/tour-guide-assignments";

export function TourGuideDashboard() {
  // In a real app, this would come from authentication context
  const currentTourGuideId = "TG001"; // Alex Thompson
  const [activeTab, setActiveTab] = useState("overview");

  const schedule = getTourGuideSchedule(currentTourGuideId);
  const upcomingAssignments = getUpcomingAssignments(currentTourGuideId);
  const currentAssignment = getCurrentAssignment(currentTourGuideId);

  if (!schedule) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-2">No Assignments Found</h2>
          <p className="text-muted-foreground">
            You don't have any tour assignments yet. Please contact your
            administrator.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysUntilTour = (startDate: string) => {
    const today = new Date();
    const tourDate = new Date(startDate);
    const diffTime = tourDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tour Guide Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {schedule.tourGuideName}! Here are your upcoming
            assignments.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Schedule
          </Button>
          <Button size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Emergency Contact
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Tour</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {schedule.nextAssignment ? (
              <>
                <div className="text-2xl font-bold">
                  {schedule.nextAssignment.daysUntilDeparture} days
                </div>
                <p className="text-xs text-muted-foreground">
                  {schedule.nextAssignment.destination}
                </p>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                No upcoming tours
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tours
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schedule.completedAssignments}
            </div>
            <p className="text-xs text-green-600">
              {schedule.totalCustomersGuided} customers guided
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">★ {schedule.averageRating}</div>
            <p className="text-xs text-yellow-600">Customer feedback</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Status
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {schedule.currentLocation ? (
              <>
                <div className="text-lg font-bold">On Tour</div>
                <p className="text-xs text-blue-600">
                  {schedule.currentLocation}
                </p>
              </>
            ) : (
              <>
                <div className="text-lg font-bold">Available</div>
                <p className="text-xs text-green-600">Ready for assignment</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Tours</TabsTrigger>
          <TabsTrigger value="current">Current Tour</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {schedule.nextAssignment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Next Assignment
                </CardTitle>
                <CardDescription>
                  Your upcoming tour departure in{" "}
                  {schedule.nextAssignment.daysUntilDeparture} days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {schedule.nextAssignment.destination}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Departure:{" "}
                        {formatDate(schedule.nextAssignment.startDate)}
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {schedule.nextAssignment.daysUntilDeparture} days to go
                    </Badge>
                  </div>
                  <Progress
                    value={Math.max(
                      0,
                      100 - schedule.nextAssignment.daysUntilDeparture * 5
                    )}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tours Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAssignments.slice(0, 3).map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {assignment.destination.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(assignment.tourDates.startDate)} •{" "}
                          {assignment.groupSize} travelers
                        </p>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                  ))}
                  {upcomingAssignments.length > 3 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{upcomingAssignments.length - 3} more tours
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Tour Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {schedule.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {schedule.languages.map((language) => (
                        <Badge
                          key={language}
                          className="bg-green-100 text-green-800"
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Upcoming Tours Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />

                        {assignment.packageName}
                      </CardTitle>
                      <CardDescription>
                        {assignment.destination.name} •{" "}
                        {assignment.destination.country}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />

                      <div>
                        <p className="text-sm font-medium">
                          {formatDate(assignment.tourDates.startDate)} -{" "}
                          {formatDate(assignment.tourDates.endDate)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {assignment.tourDates.duration} days •{" "}
                          {getDaysUntilTour(assignment.tourDates.startDate)}{" "}
                          days to go
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />

                      <div>
                        <p className="text-sm font-medium">
                          {assignment.groupSize} travelers
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Group size
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />

                      <div>
                        <p className="text-sm font-medium">Equipment Ready</p>
                        <p className="text-xs text-muted-foreground">
                          {assignment.equipmentNeeded?.length || 0} items
                        </p>
                      </div>
                    </div>
                  </div>

                  {assignment.specialInstructions && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />

                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          Special Instructions
                        </p>
                        <p className="text-sm text-yellow-700">
                          {assignment.specialInstructions}
                        </p>
                      </div>
                    </div>
                  )}

                  <Accordion type="single" collapsible>
                    <AccordionItem value="customers">
                      <AccordionTrigger>
                        Customer Details ({assignment.customers.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {assignment.customers.map((customer) => (
                            <div
                              key={customer.id}
                              className="flex items-center justify-between p-3 bg-muted rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />

                                    {customer.phone}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />

                                    {customer.email}
                                  </span>
                                </div>
                              </div>
                              {customer.specialRequirements && (
                                <Badge
                                  variant="outline"
                                  className="text-orange-600"
                                >
                                  Special Requirements
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="itinerary">
                      <AccordionTrigger>
                        Itinerary ({assignment.itinerary.length} days)
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {assignment.itinerary.map((day) => (
                            <div
                              key={day.day}
                              className="border-l-2 border-blue-200 pl-4"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">Day {day.day}</Badge>
                                <span className="text-sm font-medium">
                                  {day.location}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {day.date}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {day.activities.join(" • ")}
                              </p>
                              {day.accommodation && (
                                <p className="text-xs text-muted-foreground">
                                  🏨 {day.accommodation}
                                </p>
                              )}
                              {day.notes && (
                                <p className="text-xs text-blue-600 mt-1">
                                  📝 {day.notes}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="emergency">
                      <AccordionTrigger>Emergency Contacts</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {assignment.emergencyContacts.map(
                            (contact, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200"
                              >
                                <div>
                                  <p className="font-medium text-red-800">
                                    {contact.name}
                                  </p>
                                  <p className="text-sm text-red-600">
                                    {contact.role}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-red-800">
                                    {contact.phone}
                                  </p>
                                  <p className="text-xs text-red-600">
                                    {contact.email}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex gap-2 pt-4">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Itinerary
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Operations
                    </Button>
                    <Button size="sm" variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Pre-Tour Checklist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Current Tour Tab */}
        <TabsContent value="current" className="space-y-6">
          {currentAssignment ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-green-600" />
                  Current Tour in Progress
                </CardTitle>
                <CardDescription>
                  {currentAssignment.packageName} •{" "}
                  {currentAssignment.destination.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Current tour functionality would be implemented here with
                  real-time updates, daily check-ins, and progress tracking.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                <h3 className="text-lg font-semibold mb-2">No Active Tour</h3>
                <p className="text-muted-foreground">
                  You don't have any tours in progress at the moment.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tour Guide Profile</CardTitle>
              <CardDescription>
                Your professional information and statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="https://github.com/shoaibux1.png"
                    alt={schedule.tourGuideName}
                  />

                  <AvatarFallback>
                    {schedule.tourGuideName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    {schedule.tourGuideName}
                  </h3>
                  <p className="text-muted-foreground">
                    Tour Guide ID: {schedule.tourGuideId}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 text-yellow-500" />

                    <span className="font-medium">
                      {schedule.averageRating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({schedule.totalCustomersGuided} customers)
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Specialties</h4>
                  <div className="space-y-2">
                    {schedule.specialties.map((specialty) => (
                      <div key={specialty} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />

                        <span className="text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Languages</h4>
                  <div className="space-y-2">
                    {schedule.languages.map((language) => (
                      <div key={language} className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-600" />

                        <span className="text-sm">{language}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {schedule.completedAssignments}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tours Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {schedule.totalCustomersGuided}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Customers Guided
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    ★ {schedule.averageRating}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Rating
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TourGuideDashboard;
