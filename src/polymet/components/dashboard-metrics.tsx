import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  PackageIcon,
  CalendarIcon,
  UsersIcon,
  DollarSignIcon,
  PercentIcon,
} from "lucide-react";
import { dashboardMetrics } from "@/polymet/data/dashboard-data";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
    period: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
}

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  badge,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {change && (
          <div className="flex items-center mt-2">
            {change.type === "increase" ? (
              <TrendingUpIcon className="h-3 w-3 text-green-600 mr-1" />
            ) : (
              <TrendingDownIcon className="h-3 w-3 text-red-600 mr-1" />
            )}
            <span
              className={`text-xs ${
                change.type === "increase" ? "text-green-600" : "text-red-600"
              }`}
            >
              {change.value > 0 ? "+" : ""}
              {change.value}% from {change.period}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface DashboardMetricsProps {
  className?: string;
}

export function DashboardMetrics({ className }: DashboardMetricsProps) {
  const formatCurrency = (amount: number) => {
    return `RM ${(amount / 1000000).toFixed(1)}M`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Packages"
          value={dashboardMetrics.packages.total}
          change={{ value: 12.5, type: "increase", period: "last month" }}
          icon={PackageIcon}
          description={`${dashboardMetrics.packages.active} active packages`}
          badge="Active"
        />

        <MetricCard
          title="Monthly Bookings"
          value={dashboardMetrics.bookings.month}
          change={{ value: 8.2, type: "increase", period: "last month" }}
          icon={CalendarIcon}
          description={`${dashboardMetrics.bookings.week} this week`}
        />

        <MetricCard
          title="Total Users"
          value={formatNumber(dashboardMetrics.users.total)}
          change={{ value: 15.3, type: "increase", period: "last month" }}
          icon={UsersIcon}
          description={`+${dashboardMetrics.users.newMonth} new this month`}
        />
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Gross Revenue"
          value={formatCurrency(dashboardMetrics.bookings.revenue.gross)}
          change={{ value: 23.1, type: "increase", period: "last quarter" }}
          icon={DollarSignIcon}
          description="Total revenue generated"
        />

        <MetricCard
          title="Net Revenue"
          value={formatCurrency(dashboardMetrics.bookings.revenue.net)}
          change={{ value: 18.7, type: "increase", period: "last quarter" }}
          icon={DollarSignIcon}
          description="After commissions & fees"
        />

        <MetricCard
          title="Conversion Rate"
          value={`${dashboardMetrics.bookings.conversionRate}%`}
          change={{ value: 5.2, type: "increase", period: "last month" }}
          icon={PercentIcon}
          description="Inquiry to booking ratio"
        />
      </div>

      {/* Booking Status Breakdown */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Booking Status Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatNumber(
                    dashboardMetrics.bookings.statusBreakdown.confirmed
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Confirmed</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {formatNumber(
                    dashboardMetrics.bookings.statusBreakdown.pending
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatNumber(
                    dashboardMetrics.bookings.statusBreakdown.completed
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {formatNumber(
                    dashboardMetrics.bookings.statusBreakdown.cancelled
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Performing Packages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dashboardMetrics.packages.mostPopular.map((pkg, index) => (
              <div
                key={pkg.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{pkg.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {pkg.bookings} bookings
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    RM {pkg.revenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardMetrics;
