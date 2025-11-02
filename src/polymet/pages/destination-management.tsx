import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  Star,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  Globe,
  Calendar,
  Users,
  Package,
} from "lucide-react";
import {
  AddDestinationDialog,
  LocationDestination,
} from "@/polymet/components/add-destination-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  destinations,
  destinationStats,
  continents,
  destinationStatuses,
  attractionTypes,
} from "@/polymet/data/destination-data";

export function DestinationManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All Continents");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedAttractionType, setSelectedAttractionType] =
    useState("All Types");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [customDestinations, setCustomDestinations] = useState<
    LocationDestination[]
  >([]);

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent =
      selectedContinent === "All Continents" ||
      destination.continent === selectedContinent;
    const matchesStatus =
      selectedStatus === "All Statuses" ||
      destination.status === selectedStatus;
    const matchesAttractionType =
      selectedAttractionType === "All Types" ||
      destination.attractions.some(
        (attr) => attr.type === selectedAttractionType
      );

    return (
      matchesSearch &&
      matchesContinent &&
      matchesStatus &&
      matchesAttractionType
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "seasonal":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Destination Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage travel locations (countries, cities, regions) for package
            selection
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Destination
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Destinations
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {destinationStats.totalDestinations}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                +{destinationStats.activeDestinations}
              </span>{" "}
              active destinations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {destinationStats.totalBookings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+12.5%</span> from last month
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
            <div className="text-2xl font-bold">
              {destinationStats.averageRating}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-purple-600">★</span> Overall satisfaction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Continent</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Asia</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">
                {destinationStats.continentDistribution.Asia}
              </span>{" "}
              destinations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Destinations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search destinations or countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={selectedContinent}
              onValueChange={setSelectedContinent}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select continent" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((continent) => (
                  <SelectItem key={continent} value={continent}>
                    {continent}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {destinationStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedAttractionType}
              onValueChange={setSelectedAttractionType}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Attraction type" />
              </SelectTrigger>
              <SelectContent>
                {attractionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Destinations ({filteredDestinations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destination</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Packages</TableHead>
                <TableHead>Popularity</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Best Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDestinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={destination.images.hero}
                        alt={destination.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />

                      <div>
                        <div className="font-medium">{destination.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {destination.attractions.length} attractions
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{destination.country}</div>
                      <div className="text-sm text-muted-foreground">
                        {destination.continent}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(destination.status)}>
                      {destination.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {destination.packages.active}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        of {destination.packages.total} total
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        #{destination.popularity.rank}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {destination.popularity.bookings} bookings
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />

                      <span className="font-medium">
                        {destination.popularity.rating}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">
                        ({destination.popularity.reviews})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {destination.climate.bestTime}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Destination
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="h-4 w-4 mr-2" />
                          Manage Packages
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
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

      {/* Custom Added Destinations */}
      {customDestinations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{destination.name}</h3>
                    <Badge className={getStatusColor(destination.status)}>
                      {destination.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {destination.country} • {destination.continent}
                  </p>
                  <p className="text-sm mb-2">{destination.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="capitalize">{destination.type}</span>
                    <span>
                      Added{" "}
                      {new Date(destination.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Destinations Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Available Destinations for Package Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations
              .sort((a, b) => b.popularity.bookings - a.popularity.bookings)
              .slice(0, 6)
              .map((destination) => (
                <div key={destination.id} className="border rounded-lg p-4">
                  <img
                    src={destination.images.hero}
                    alt={destination.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{destination.name}</h3>
                    <Badge className={getStatusColor(destination.status)}>
                      {destination.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {destination.country} • {destination.continent}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />

                      <span>{destination.popularity.rating}</span>
                      <span className="text-muted-foreground ml-1">
                        ({destination.popularity.reviews})
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        #{destination.popularity.rank}
                      </div>
                      <div className="text-muted-foreground">
                        {destination.popularity.bookings} bookings
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {destination.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      {/* Add Destination Dialog */}
      <AddDestinationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onDestinationAdded={(destination) => {
          setCustomDestinations((prev) => [destination, ...prev]);
          console.log("New destination added:", destination);
        }}
      />
    </div>
  );
}

const handleDestinationAdded = (destination: LocationDestination) => {
  // This function can be used to update the destinations list
  // and potentially sync with the package management system
  console.log("Destination added for package selection:", destination);
};

export default DestinationManagement;
