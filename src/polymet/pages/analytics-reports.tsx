import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  MapPin,
  Star,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { dashboardMetrics, chartData } from "@/polymet/data/dashboard-data";

export function AnalyticsReports() {
  const [timeRange, setTimeRange] = useState("last-6-months");
  const [reportType, setReportType] = useState("overview");

  // Sample analytics data
  const revenueData = [
    { month: "Jan", revenue: 2400000, bookings: 145, packages: 23 },
    { month: "Feb", revenue: 2100000, bookings: 132, packages: 25 },
    { month: "Mar", revenue: 2800000, bookings: 167, packages: 28 },
    { month: "Apr", revenue: 3200000, bookings: 189, packages: 31 },
    { month: "May", revenue: 2900000, bookings: 156, packages: 29 },
    { month: "Jun", revenue: 3500000, bookings: 201, packages: 34 },
  ];

  const destinationData = [
    {
      name: "Malaysia",
      bookings: 1456,
      revenue: 2890000,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Indonesia",
      bookings: 1234,
      revenue: 2450000,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Japan",
      bookings: 987,
      revenue: 3120000,
      color: "hsl(var(--chart-3))",
    },
    {
      name: "Greece",
      bookings: 876,
      revenue: 2670000,
      color: "hsl(var(--chart-4))",
    },
    {
      name: "Others",
      bookings: 654,
      revenue: 1890000,
      color: "hsl(var(--chart-5))",
    },
  ];

  const customerSegmentData = [
    {
      segment: "New Customers",
      count: 2456,
      percentage: 45,
      color: "hsl(var(--chart-1))",
    },
    {
      segment: "Returning Customers",
      count: 1890,
      percentage: 35,
      color: "hsl(var(--chart-2))",
    },
    {
      segment: "VIP Customers",
      count: 1087,
      percentage: 20,
      color: "hsl(var(--chart-3))",
    },
  ];

  const performanceMetrics = [
    {
      title: "Revenue Growth",
      value: "+23.1%",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Booking Conversion",
      value: "68.5%",
      change: "+2.4%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Customer Satisfaction",
      value: "4.6/5",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Average Response Time",
      value: "2.4h",
      change: "-0.8h",
      trend: "down",
      icon: Clock,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive business intelligence and performance insights
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {metric.trend === "up" ? "↗" : "↘"} {metric.change}
                </span>{" "}
                from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Bookings Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Revenue & Bookings Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="aspect-[none] h-80" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis yAxisId="left" />

                <YAxis yAxisId="right" orientation="right" />

                <ChartTooltip />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  name="Revenue (RM)"
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  name="Bookings"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Destination Performance & Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Top Destinations by Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="aspect-[none] h-64" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={destinationData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <ChartTooltip />

                  <Bar dataKey="bookings" radius={4}>
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="aspect-[none] h-64" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={customerSegmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="count"
                    nameKey="segment"
                  >
                    {customerSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {customerSegmentData.map((segment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: segment.color }}
                    />

                    <span>{segment.segment}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">
                      {segment.count.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      ({segment.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Package Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Himalayan Base Camp Trek",
                  bookings: 89,
                  revenue: 445000,
                  rating: 4.8,
                },
                {
                  name: "Bali Cultural Discovery",
                  bookings: 76,
                  revenue: 380000,
                  rating: 4.6,
                },
                {
                  name: "Tokyo Modern & Traditional",
                  bookings: 65,
                  revenue: 520000,
                  rating: 4.4,
                },
                {
                  name: "Santorini Sunset Romance",
                  bookings: 54,
                  revenue: 432000,
                  rating: 4.9,
                },
                {
                  name: "Langkawi Island Getaway",
                  bookings: 43,
                  revenue: 215000,
                  rating: 4.5,
                },
              ].map((pkg, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{pkg.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{pkg.bookings} bookings</span>
                      <span>★ {pkg.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      RM {(pkg.revenue / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  activity: "New booking confirmed",
                  time: "2 minutes ago",
                  type: "booking",
                },
                {
                  activity: "Package review approved",
                  time: "15 minutes ago",
                  type: "review",
                },
                {
                  activity: "New user registered",
                  time: "32 minutes ago",
                  type: "user",
                },
                {
                  activity: "Coupon campaign launched",
                  time: "1 hour ago",
                  type: "coupon",
                },
                {
                  activity: "Store performance updated",
                  time: "2 hours ago",
                  type: "store",
                },
                {
                  activity: "Destination data synced",
                  time: "3 hours ago",
                  type: "destination",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.type === "booking"
                        ? "bg-green-500"
                        : item.type === "review"
                          ? "bg-blue-500"
                          : item.type === "user"
                            ? "bg-purple-500"
                            : item.type === "coupon"
                              ? "bg-yellow-500"
                              : item.type === "store"
                                ? "bg-orange-500"
                                : "bg-gray-500"
                    }`}
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />

              <span>Revenue Report</span>
              <span className="text-xs text-muted-foreground">PDF, Excel</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />

              <span>Customer Analytics</span>
              <span className="text-xs text-muted-foreground">PDF, CSV</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />

              <span>Package Performance</span>
              <span className="text-xs text-muted-foreground">PDF, Excel</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsReports;
