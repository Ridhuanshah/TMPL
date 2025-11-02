import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { chartData, dashboardMetrics } from "@/polymet/data/dashboard-data";

interface AnalyticsChartsProps {
  className?: string;
}

export function AnalyticsCharts({ className }: AnalyticsChartsProps) {
  // Prepare data for continent revenue pie chart
  const continentData = dashboardMetrics.packages.revenueByCategory.map(
    (item, index) => ({
      ...item,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })
  );

  // Prepare data for geographic distribution
  const geographicData = dashboardMetrics.users.geographicDistribution.map(
    (item, index) => ({
      ...item,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })
  );

  const formatCurrency = (value: number) => {
    return `RM ${(value / 1000000).toFixed(1)}M`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Booking Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Booking Trends (12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="aspect-[none] h-80" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.bookingTrends}>
                <ChartTooltip />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />

                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                  radius={8}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="aspect-[none] h-64" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.bookingTrends.slice(-6)}>
                  <ChartTooltip
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      "Revenue",
                    ]}
                  />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                  />

                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--chart-2))"
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Package Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Package Performance by Continent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="aspect-[none] h-64" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.packagePerformance}>
                  <ChartTooltip
                    formatter={(value, name) => [
                      name === "bookings"
                        ? formatNumber(Number(value))
                        : formatCurrency(Number(value)),
                      name === "bookings" ? "Bookings" : "Revenue",
                    ]}
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />

                  <Bar
                    dataKey="bookings"
                    fill="hsl(var(--chart-3))"
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Continent */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Revenue Distribution by Continent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <ChartContainer className="aspect-square h-48" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip
                      formatter={(value) => [
                        formatCurrency(Number(value)),
                        "Revenue",
                      ]}
                    />

                    <Pie
                      data={continentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="revenue"
                    >
                      {continentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="space-y-2 flex-1">
                {continentData.map((item, index) => (
                  <div
                    key={item.continent}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />

                      <span className="text-sm">{item.continent}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatCurrency(item.revenue)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.packages} packages
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              User Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <ChartContainer className="aspect-square h-48" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip
                      formatter={(value, name, props) => [
                        `${formatNumber(Number(value))} (${props.payload.percentage}%)`,
                        "Users",
                      ]}
                    />

                    <Pie
                      data={geographicData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="users"
                    >
                      {geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="space-y-2 flex-1">
                {geographicData.map((item, index) => (
                  <div
                    key={item.country}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />

                      <span className="text-sm">{item.country}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatNumber(item.users)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Growth Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="aspect-[none] h-80" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.userGrowth}>
                <ChartTooltip
                  formatter={(value, name) => [
                    formatNumber(Number(value)),
                    name === "newUsers" ? "New Users" : "Total Users",
                  ]}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs"
                />

                <Line
                  type="monotone"
                  dataKey="newUsers"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
                  radius={8}
                />

                <Line
                  type="monotone"
                  dataKey="totalUsers"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--chart-5))", strokeWidth: 2, r: 4 }}
                  radius={8}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsCharts;
