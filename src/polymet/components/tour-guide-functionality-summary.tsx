import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircleIcon,
  CalendarIcon,
  AlertTriangleIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  InfoIcon,
  TrendingUpIcon,
} from "lucide-react";

export function TourGuideFunctionalitySummary() {
  const features = [
    {
      title: "Enhanced Assignment Dialog",
      description: "Improved tour guide assignment with tabbed interface",
      status: "completed",
      details: [
        "Tabbed interface with Assignment and Calendar views",
        "Experience-based filtering (Beginner, Intermediate, Expert)",
        "Real-time conflict detection and warnings",
        "Lead guide and companion role assignments",
      ],
    },
    {
      title: "Calendar Conflict Detection",
      description: "Visual calendar showing booking conflicts and availability",
      status: "completed",
      details: [
        "Automatic conflict detection for overlapping dates",
        "Visual indicators for available vs conflicted guides",
        "Detailed conflict information with existing bookings",
        "No restrictions - allows assignment despite conflicts",
      ],
    },
    {
      title: "Comprehensive Test Suite",
      description: "Dedicated test page for validating functionality",
      status: "completed",
      details: [
        "Multiple test booking scenarios",
        "Real-time conflict visualization",
        "System overview with statistics",
        "Interactive assignment testing",
      ],
    },
    {
      title: "Enhanced Data Structure",
      description: "Improved data models with realistic test data",
      status: "completed",
      details: [
        "Extended tour guide assignments with conflicts",
        "Detailed itinerary and customer information",
        "Emergency contacts and special instructions",
        "Equipment and transportation details",
      ],
    },
  ];

  const testScenarios = [
    {
      name: "Japan Discovery Tour",
      dates: "April 15-22, 2024",
      conflict: "Alex Thompson has overlapping Korea tour (April 18-24)",
      status: "conflict",
    },
    {
      name: "Malaysian Heritage Trail",
      dates: "April 20-25, 2024",
      conflict: "Siti Nurhaliza has overlapping Singapore tour (April 22-26)",
      status: "conflict",
    },
    {
      name: "Borneo Wildlife Adventure",
      dates: "May 1-8, 2024",
      conflict: "No conflicts detected",
      status: "available",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center">
          <CheckCircleIcon className="h-6 w-6 mr-2 text-green-600" />
          Tour Guide Functionality
        </h2>
        <p className="text-muted-foreground mt-2">
          Comprehensive tour guide assignment system with calendar view and
          conflict detection
        </p>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{feature.title}</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <CheckCircleIcon className="h-3 w-3 mr-1" />

                  {feature.status}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="text-sm flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Conflict Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testScenarios.map((scenario, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{scenario.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ClockIcon className="h-3 w-3 mr-1" />

                    {scenario.dates}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {scenario.conflict}
                  </p>
                </div>
                <Badge
                  variant={
                    scenario.status === "conflict" ? "destructive" : "secondary"
                  }
                  className={
                    scenario.status === "available"
                      ? "bg-green-100 text-green-800"
                      : ""
                  }
                >
                  {scenario.status === "conflict" ? (
                    <>
                      <AlertTriangleIcon className="h-3 w-3 mr-1" />
                      Conflict
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                      Available
                    </>
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Tour Guides
                </p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Scenarios
                </p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Conflicts Detected
                </p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertTriangleIcon className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Features Added
                </p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <StarIcon className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
