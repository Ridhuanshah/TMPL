import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftIcon,
  EditIcon,
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  StarIcon,
  DollarSignIcon,
  ClockIcon,
  TrendingUpIcon,
  ImageIcon,
  InfoIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { travelPackages, TravelPackage } from "@/polymet/data/package-data";

export function PackageDetails() {
  const { id } = useParams<{ id: string }>();

  // Find the package by ID, with fallback to first package if ID not found
  const pkg = travelPackages.find((p) => p.id === id) || travelPackages[0];

  if (!pkg) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/packages">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Packages
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Package Not Found</h2>
            <p className="text-muted-foreground">
              The requested package could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "sold_out":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Moderate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Challenging":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Extreme":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString()}`;
  };

  const calculateOccupancy = () => {
    return Math.round(
      (pkg.availability.booked / pkg.availability.capacity) * 100
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/packages">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Packages
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{pkg.name}</h1>
            <p className="text-muted-foreground mt-1">
              Package Details & Management
            </p>
          </div>
        </div>
        <Button asChild>
          <Link to={`/packages/edit/${pkg.id}`}>
            <EditIcon className="h-4 w-4 mr-2" />
            Edit Package
          </Link>
        </Button>
      </div>

      {/* Package Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image & Basic Info */}
          <Card>
            <CardContent className="p-0">
              <img
                src={pkg.images.hero}
                alt={pkg.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge className={getStatusColor(pkg.status)}>
                    {pkg.status.replace("_", " ")}
                  </Badge>
                  <Badge className={getDifficultyColor(pkg.difficulty)}>
                    {pkg.difficulty}
                  </Badge>
                  <Badge variant="outline">{pkg.category}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />

                    <span className="text-sm">{pkg.country}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />

                    <span className="text-sm">{pkg.duration} days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StarIcon className="h-4 w-4 text-yellow-500" />

                    <span className="text-sm">
                      {pkg.rating} ({pkg.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />

                    <span className="text-sm font-medium">
                      {formatCurrency(pkg.pricing.basePrice)}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground">{pkg.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <InfoIcon className="h-5 w-5 mr-2" />
                Package Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pricing */}
              <div>
                <h4 className="font-semibold mb-3">Pricing</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Base Price</p>
                    <p className="font-semibold">
                      {formatCurrency(pkg.pricing.basePrice)}
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Currency</p>
                    <p className="font-semibold">{pkg.pricing.currency}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Group Size</p>
                    <p className="font-semibold">
                      {pkg.groupSize.min} - {pkg.groupSize.max} people
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center text-green-600">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    Inclusions
                  </h4>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />

                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center text-red-600">
                    <XCircleIcon className="h-4 w-4 mr-2" />
                    Exclusions
                  </h4>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <XCircleIcon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />

                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Gallery */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Gallery
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {pkg.images.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${pkg.name} - Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-2" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">
                    Total Bookings
                  </span>
                  <span className="font-semibold">{pkg.bookings}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">
                    Total Revenue
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(pkg.revenue)}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Occupancy
                  </span>
                  <span className="font-semibold">{calculateOccupancy()}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${calculateOccupancy()}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {pkg.availability.booked} / {pkg.availability.capacity} spots
                  filled
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="text-2xl font-bold">
                    {pkg.availability.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Booked</p>
                  <p className="text-2xl font-bold">
                    {pkg.availability.booked}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Remaining Spots</p>
                <p className="text-xl font-semibold text-green-600">
                  {pkg.availability.capacity - pkg.availability.booked}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link to={`/packages/edit/${pkg.id}`}>
                  <EditIcon className="h-4 w-4 mr-2" />
                  Edit Package
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link to="/bookings" className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-2" />
                  View Bookings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
