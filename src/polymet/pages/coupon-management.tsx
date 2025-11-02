import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Download,
  Percent,
  DollarSign,
  Gift,
  Truck,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
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
import { Progress } from "@/components/ui/progress";
import {
  coupons,
  couponStats,
  couponTypes,
  couponStatuses,
} from "@/polymet/data/coupon-data";

export function CouponManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "All" ||
      coupon.type === typeFilter.toLowerCase().replace(" ", "_");
    const matchesStatus =
      statusFilter === "All" || coupon.status === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "bg-green-100 text-green-800";
      case "fixed":
        return "bg-blue-100 text-blue-800";
      case "bogo":
        return "bg-purple-100 text-purple-800";
      case "free_shipping":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-3 w-3" />;

      case "fixed":
        return <DollarSign className="h-3 w-3" />;

      case "bogo":
        return <Gift className="h-3 w-3" />;

      case "free_shipping":
        return <Truck className="h-3 w-3" />;

      default:
        return <Gift className="h-3 w-3" />;
    }
  };

  const formatCouponValue = (type: string, value: number) => {
    switch (type) {
      case "percentage":
        return `${value}%`;
      case "fixed":
        return `RM ${value}`;
      case "bogo":
        return `BOGO ${value}%`;
      case "free_shipping":
        return "Free Service";
      default:
        return `${value}`;
    }
  };

  const getUsagePercentage = (used: number, limit: number | null) => {
    if (!limit) return 0;
    return (used / limit) * 100;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coupon Management</h1>
          <p className="text-muted-foreground mt-2">
            Create, manage, and track promotional coupons and discounts
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Link to="/admin/coupons/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Coupon
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{couponStats.totalCoupons}</div>
            <p className="text-xs text-green-600 mt-1">
              {couponStats.activeCoupons} active coupons
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Redemptions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {couponStats.totalRedemptions.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Discount Given
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {(couponStats.totalDiscountGiven / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-purple-600 mt-1">Total savings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue Impact
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {(couponStats.revenueImpact / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-orange-600 mt-1">Generated revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Coupon Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Coupon Directory</CardTitle>
          <CardDescription>
            Manage all promotional coupons and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

                <Input
                  placeholder="Search coupons by name, code, or description..."
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
                {couponTypes.map((type) => (
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
                {couponStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Coupons Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coupon</TableHead>
                  <TableHead>Type & Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{coupon.name}</div>
                        <div className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded inline-block mt-1">
                          {coupon.code}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {coupon.description}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(coupon.type)}>
                          <div className="flex items-center space-x-1">
                            {getTypeIcon(coupon.type)}
                            <span>{coupon.type.replace("_", " ")}</span>
                          </div>
                        </Badge>
                        <div className="font-medium">
                          {formatCouponValue(coupon.type, coupon.value)}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(coupon.status)}>
                        {coupon.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            {coupon.usage.used} / {coupon.usage.limit || "∞"}
                          </span>
                          <span className="text-muted-foreground">
                            {coupon.usage.limit
                              ? `${coupon.usage.remaining} left`
                              : "Unlimited"}
                          </span>
                        </div>
                        {coupon.usage.limit && (
                          <Progress
                            value={getUsagePercentage(
                              coupon.usage.used,
                              coupon.usage.limit
                            )}
                            className="h-2"
                          />
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1 text-green-600" />

                          <span className="font-medium">
                            RM{" "}
                            {(coupon.performance.totalRevenue / 1000).toFixed(
                              0
                            )}
                            K
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <TrendingUp className="h-3 w-3 mr-1" />

                          <span>
                            {coupon.performance.conversionRate}% conversion
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          Avg: RM{" "}
                          {coupon.performance.averageOrderValue.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />

                          <span>
                            Start:{" "}
                            {new Date(
                              coupon.validity.startDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />

                          <span>
                            End:{" "}
                            {new Date(
                              coupon.validity.endDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Coupon
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          {coupon.status === "active" ? (
                            <DropdownMenuItem className="text-yellow-600">
                              <Pause className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : coupon.status === "inactive" ? (
                            <DropdownMenuItem className="text-green-600">
                              <Play className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCoupons.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No coupons found matching your criteria.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredCoupons.length} of {coupons.length} coupons
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CouponManagement;
