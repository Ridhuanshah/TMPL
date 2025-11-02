import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Settings,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  stores,
  storeStats,
  storeTypes,
  storeStatuses,
} from "@/polymet/data/store-data";

export function StoreManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "All" || store.type === typeFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "All" || store.status === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "flagship":
        return "bg-purple-100 text-purple-800";
      case "branch":
        return "bg-blue-100 text-blue-800";
      case "kiosk":
        return "bg-orange-100 text-orange-800";
      case "online":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Store Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage physical locations, performance, and operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Store
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storeStats.totalStores}</div>
            <p className="text-xs text-green-600 mt-1">
              {storeStats.activeStores} active stores
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {(storeStats.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-blue-600 mt-1">
              +{storeStats.revenueGrowth}% from last month
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
            <div className="text-2xl font-bold">{storeStats.totalBookings}</div>
            <p className="text-xs text-purple-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {(storeStats.averageRevenue / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-orange-600 mt-1">Per store</p>
          </CardContent>
        </Card>
      </div>

      {/* Store Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Store Directory</CardTitle>
          <CardDescription>
            Monitor and manage all store locations and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

                <Input
                  placeholder="Search stores by name, location, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {storeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {storeStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stores Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{store.name}</CardTitle>
                        <Badge className={getTypeColor(store.type)}>
                          {store.type}
                        </Badge>
                        <Badge className={getStatusColor(store.status)}>
                          {store.status}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {store.address.street}, {store.address.city}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Store
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Manage Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        {store.status === "maintenance" && (
                          <DropdownMenuItem className="text-red-600">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Maintenance Mode
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-3 w-3 mr-2" />

                      {store.contact.phone}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-3 w-3 mr-2" />

                      {store.contact.email}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-3 w-3 mr-2" />
                      Manager: {store.contact.manager}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-2" />

                      {store.operatingHours.monday}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  {store.status !== "maintenance" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          RM{" "}
                          {(store.performance.monthlyRevenue / 1000).toFixed(0)}
                          K
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Revenue
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {store.performance.monthlyBookings}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Bookings
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          RM{" "}
                          {store.performance.averageOrderValue.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Avg Order
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600 flex items-center justify-center">
                          <Star className="h-3 w-3 mr-1" />

                          {store.performance.customerSatisfaction}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Services */}
                  <div className="pt-3 border-t">
                    <div className="text-sm font-medium mb-2">
                      Services Offered:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {store.services.slice(0, 3).map((service) => (
                        <Badge
                          key={service}
                          variant="secondary"
                          className="text-xs"
                        >
                          {service}
                        </Badge>
                      ))}
                      {store.services.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{store.services.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {store.notes && (
                    <div className="pt-3 border-t">
                      <div className="text-sm text-muted-foreground italic">
                        {store.notes}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No stores found matching your criteria.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredStores.length} of {stores.length} stores
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StoreManagement;
