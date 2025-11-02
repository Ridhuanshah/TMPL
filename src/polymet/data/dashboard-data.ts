// Mock data for TMPL Escapade Admin Dashboard

export interface DashboardMetrics {
  packages: {
    total: number;
    active: number;
    inactive: number;
    mostPopular: Array<{
      id: string;
      name: string;
      bookings: number;
      revenue: number;
    }>;
    revenueByCategory: Array<{
      continent: string;
      revenue: number;
      packages: number;
    }>;
  };
  bookings: {
    today: number;
    week: number;
    month: number;
    year: number;
    statusBreakdown: {
      confirmed: number;
      pending: number;
      cancelled: number;
      completed: number;
    };
    revenue: {
      gross: number;
      net: number;
      pending: number;
    };
    conversionRate: number;
  };
  users: {
    total: number;
    newToday: number;
    newWeek: number;
    newMonth: number;
    activeUsers: number;
    geographicDistribution: Array<{
      country: string;
      users: number;
      percentage: number;
    }>;
  };
  stores: {
    active: number;
    totalRevenue: number;
    topPerforming: Array<{
      id: string;
      name: string;
      location: string;
      revenue: number;
      bookings: number;
    }>;
  };
}

export const dashboardMetrics: DashboardMetrics = {
  packages: {
    total: 156,
    active: 142,
    inactive: 14,
    mostPopular: [
      {
        id: "pkg_001",
        name: "Himalayan Base Camp Trek",
        bookings: 89,
        revenue: 445000,
      },
      {
        id: "pkg_002",
        name: "African Safari Adventure",
        bookings: 76,
        revenue: 380000,
      },
      {
        id: "pkg_003",
        name: "Antarctic Expedition Cruise",
        bookings: 45,
        revenue: 675000,
      },
      {
        id: "pkg_004",
        name: "Amazon Rainforest Explorer",
        bookings: 67,
        revenue: 268000,
      },
    ],

    revenueByCategory: [
      { continent: "Asia", revenue: 1250000, packages: 45 },
      { continent: "Europe", revenue: 980000, packages: 32 },
      { continent: "Africa", revenue: 850000, packages: 28 },
      { continent: "North America", revenue: 720000, packages: 25 },
      { continent: "South America", revenue: 560000, packages: 18 },
      { continent: "Oceania", revenue: 340000, packages: 12 },
      { continent: "Antarctica", revenue: 890000, packages: 8 },
    ],
  },
  bookings: {
    today: 12,
    week: 89,
    month: 356,
    year: 2847,
    statusBreakdown: {
      confirmed: 1456,
      pending: 234,
      cancelled: 156,
      completed: 1001,
    },
    revenue: {
      gross: 8750000,
      net: 7875000,
      pending: 875000,
    },
    conversionRate: 68.5,
  },
  users: {
    total: 15847,
    newToday: 23,
    newWeek: 167,
    newMonth: 689,
    activeUsers: 4521,
    geographicDistribution: [
      { country: "Malaysia", users: 4521, percentage: 28.5 },
      { country: "Singapore", users: 2847, percentage: 18.0 },
      { country: "Thailand", users: 1896, percentage: 12.0 },
      { country: "Indonesia", users: 1584, percentage: 10.0 },
      { country: "Philippines", users: 1267, percentage: 8.0 },
      { country: "Others", users: 3732, percentage: 23.5 },
    ],
  },
  stores: {
    active: 8,
    totalRevenue: 8750000,
    topPerforming: [
      {
        id: "store_001",
        name: "TMPL Escapade KL Central",
        location: "Kuala Lumpur",
        revenue: 2450000,
        bookings: 567,
      },
      {
        id: "store_002",
        name: "TMPL Escapade Penang",
        location: "George Town",
        revenue: 1890000,
        bookings: 423,
      },
      {
        id: "store_003",
        name: "TMPL Escapade JB",
        location: "Johor Bahru",
        revenue: 1560000,
        bookings: 389,
      },
      {
        id: "store_004",
        name: "TMPL Escapade Kota Kinabalu",
        location: "Sabah",
        revenue: 1340000,
        bookings: 298,
      },
    ],
  },
};

export interface RecentActivity {
  id: string;
  type: "booking" | "package" | "user" | "review";
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error";
}

export const recentActivities: RecentActivity[] = [
  {
    id: "act_001",
    type: "booking",
    title: "New Booking Confirmed",
    description: "Sarah Chen booked Himalayan Base Camp Trek for March 2024",
    timestamp: "2 minutes ago",
    status: "success",
  },
  {
    id: "act_002",
    type: "package",
    title: "Package Updated",
    description: "Antarctic Expedition Cruise pricing updated for peak season",
    timestamp: "15 minutes ago",
  },
  {
    id: "act_003",
    type: "user",
    title: "New User Registration",
    description: "Ahmad Rahman registered from Kuala Lumpur",
    timestamp: "32 minutes ago",
    status: "success",
  },
  {
    id: "act_004",
    type: "review",
    title: "New Review Received",
    description: "5-star review for African Safari Adventure",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: "act_005",
    type: "booking",
    title: "Payment Pending",
    description: "Michael Wong's booking requires payment confirmation",
    timestamp: "2 hours ago",
    status: "warning",
  },
];

export interface ChartData {
  bookingTrends: Array<{
    date: string;
    bookings: number;
    revenue: number;
  }>;
  packagePerformance: Array<{
    name: string;
    bookings: number;
    revenue: number;
  }>;
  userGrowth: Array<{
    month: string;
    newUsers: number;
    totalUsers: number;
  }>;
}

export const chartData: ChartData = {
  bookingTrends: [
    { date: "Jan", bookings: 145, revenue: 725000 },
    { date: "Feb", bookings: 167, revenue: 835000 },
    { date: "Mar", bookings: 234, revenue: 1170000 },
    { date: "Apr", bookings: 298, revenue: 1490000 },
    { date: "May", bookings: 356, revenue: 1780000 },
    { date: "Jun", bookings: 289, revenue: 1445000 },
    { date: "Jul", bookings: 423, revenue: 2115000 },
    { date: "Aug", bookings: 467, revenue: 2335000 },
    { date: "Sep", bookings: 389, revenue: 1945000 },
    { date: "Oct", bookings: 334, revenue: 1670000 },
    { date: "Nov", bookings: 278, revenue: 1390000 },
    { date: "Dec", bookings: 312, revenue: 1560000 },
  ],

  packagePerformance: [
    { name: "Asia", bookings: 567, revenue: 2835000 },
    { name: "Europe", bookings: 423, revenue: 2115000 },
    { name: "Africa", bookings: 389, revenue: 1945000 },
    { name: "Americas", bookings: 334, revenue: 1670000 },
    { name: "Oceania", bookings: 234, revenue: 1170000 },
    { name: "Antarctica", bookings: 156, revenue: 1560000 },
  ],

  userGrowth: [
    { month: "Jan", newUsers: 234, totalUsers: 12456 },
    { month: "Feb", newUsers: 289, totalUsers: 12745 },
    { month: "Mar", newUsers: 356, totalUsers: 13101 },
    { month: "Apr", newUsers: 423, totalUsers: 13524 },
    { month: "May", newUsers: 467, totalUsers: 13991 },
    { month: "Jun", newUsers: 389, totalUsers: 14380 },
    { month: "Jul", newUsers: 512, totalUsers: 14892 },
    { month: "Aug", newUsers: 445, totalUsers: 15337 },
    { month: "Sep", newUsers: 378, totalUsers: 15715 },
    { month: "Oct", newUsers: 298, totalUsers: 16013 },
    { month: "Nov", newUsers: 267, totalUsers: 16280 },
    { month: "Dec", newUsers: 334, totalUsers: 16614 },
  ],
};

// Default export for the module
export default {
  dashboardMetrics,
  recentActivities,
  chartData,
};
