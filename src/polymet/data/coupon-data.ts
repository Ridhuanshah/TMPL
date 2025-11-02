export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: "percentage" | "fixed" | "bogo" | "free_shipping";
  value: number;
  status: "active" | "inactive" | "expired" | "scheduled";
  usage: {
    used: number;
    limit: number | null;
    remaining: number | null;
  };
  conditions: {
    minimumAmount?: number;
    maximumDiscount?: number;
    applicablePackages?: string[];
    applicableContinents?: string[];
    firstTimeOnly?: boolean;
    userTiers?: string[];
  };
  validity: {
    startDate: string;
    endDate: string;
    timezone: string;
  };
  createdBy: string;
  createdDate: string;
  lastModified: string;
  performance: {
    totalRevenue: number;
    averageOrderValue: number;
    conversionRate: number;
  };
}

export interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  totalRedemptions: number;
  totalDiscountGiven: number;
  averageDiscountPerCoupon: number;
  topPerformingCoupon: string;
  revenueImpact: number;
  typeDistribution: {
    percentage: number;
    fixed: number;
    bogo: number;
    free_shipping: number;
  };
}

export const coupons: Coupon[] = [
  {
    id: "CPN001",
    code: "WELCOME2024",
    name: "Welcome New Customer",
    description: "Special discount for first-time customers",
    type: "percentage",
    value: 15,
    status: "active",
    usage: {
      used: 234,
      limit: 500,
      remaining: 266,
    },
    conditions: {
      minimumAmount: 2000,
      maximumDiscount: 1000,
      firstTimeOnly: true,
      userTiers: ["bronze", "silver"],
    },
    validity: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      timezone: "Asia/Kuala_Lumpur",
    },
    createdBy: "Admin User",
    createdDate: "2024-01-01",
    lastModified: "2024-03-10",
    performance: {
      totalRevenue: 1456000,
      averageOrderValue: 6222,
      conversionRate: 23.4,
    },
  },
  {
    id: "CPN002",
    code: "EARLYBIRD50",
    name: "Early Bird Special",
    description: "Book 3 months in advance and save",
    type: "fixed",
    value: 500,
    status: "active",
    usage: {
      used: 89,
      limit: 200,
      remaining: 111,
    },
    conditions: {
      minimumAmount: 3000,
      applicableContinents: ["Asia", "Europe"],
    },
    validity: {
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      timezone: "Asia/Kuala_Lumpur",
    },
    createdBy: "Marketing Team",
    createdDate: "2024-01-25",
    lastModified: "2024-03-05",
    performance: {
      totalRevenue: 623000,
      averageOrderValue: 7000,
      conversionRate: 18.7,
    },
  },
  {
    id: "CPN003",
    code: "ADVENTURE20",
    name: "Adventure Seeker Discount",
    description: "For thrill-seekers and adventure lovers",
    type: "percentage",
    value: 20,
    status: "active",
    usage: {
      used: 156,
      limit: null,
      remaining: null,
    },
    conditions: {
      minimumAmount: 4000,
      maximumDiscount: 2000,
      applicablePackages: [
        "Himalayan Base Camp Trek",
        "Antarctic Expedition",
        "Amazon Rainforest Adventure",
      ],
    },
    validity: {
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      timezone: "Asia/Kuala_Lumpur",
    },
    createdBy: "Package Manager",
    createdDate: "2024-02-28",
    lastModified: "2024-03-12",
    performance: {
      totalRevenue: 1248000,
      averageOrderValue: 8000,
      conversionRate: 31.2,
    },
  },
  {
    id: "CPN004",
    code: "LOYALTY25",
    name: "Loyalty Reward",
    description: "Exclusive discount for gold and platinum members",
    type: "percentage",
    value: 25,
    status: "active",
    usage: {
      used: 67,
      limit: 100,
      remaining: 33,
    },
    conditions: {
      minimumAmount: 5000,
      maximumDiscount: 3000,
      userTiers: ["gold", "platinum"],
    },
    validity: {
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      timezone: "Asia/Kuala_Lumpur",
    },
    createdBy: "Customer Success",
    createdDate: "2024-01-10",
    lastModified: "2024-03-08",
    performance: {
      totalRevenue: 892000,
      averageOrderValue: 13313,
      conversionRate: 45.6,
    },
  },
  {
    id: "CPN005",
    code: "FREESHIP",
    name: "Free Consultation",
    description: "Free travel consultation and planning",
    type: "free_shipping",
    value: 200,
    status: "active",
    usage: {
      used: 345,
      limit: null,
      remaining: null,
    },
    conditions: {
      minimumAmount: 1000,
    },
    validity: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      timezone: "Asia/Kuala_Lumpur",
    },
    createdBy: "Sales Team",
    createdDate: "2024-01-01",
    lastModified: "2024-03-14",
    performance: {
      totalRevenue: 2156000,
      averageOrderValue: 6249,
      conversionRate: 28.9,
    },
  },
  {
    id: "CPN006",
    code: "SUMMER2024",
    name: "Summer Getaway",
    description: "Special summer vacation packages",
    type: "percentage",
    value: 18,
    status: "scheduled",
    usage: {
      used: 0,
      limit: 300,
      remaining: 300,
    },
    conditions: {
      minimumAmount: 3500,
      maximumDiscount: 1500,
      applicableContinents: ["Europe", "North America", "Oceania"],
    },
    validity: {
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      timezone: "Asia/Kuala_Lumpur",
    },
    createdBy: "Marketing Team",
    createdDate: "2024-03-01",
    lastModified: "2024-03-01",
    performance: {
      totalRevenue: 0,
      averageOrderValue: 0,
      conversionRate: 0,
    },
  },
  {
    id: "CPN007",
    code: "EXPIRED10",
    name: "March Madness",
    description: "Limited time March promotion",
    type: "percentage",
    value: 10,
    status: "expired",
    usage: {
      used: 78,
      limit: 150,
      remaining: 0,
    },
    conditions: {
      minimumAmount: 2500,
      maximumDiscount: 800,
    },
    validity: {
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      timezone: "Asia/Kuala_Lumpur",
    },
    createdBy: "Marketing Team",
    createdDate: "2024-02-25",
    lastModified: "2024-03-15",
    performance: {
      totalRevenue: 234000,
      averageOrderValue: 3000,
      conversionRate: 15.6,
    },
  },
  {
    id: "CPN008",
    code: "BOGO2024",
    name: "Buy One Get One",
    description: "Book two packages, get the cheaper one 50% off",
    type: "bogo",
    value: 50,
    status: "inactive",
    usage: {
      used: 23,
      limit: 50,
      remaining: 27,
    },
    conditions: {
      minimumAmount: 8000,
      applicablePackages: ["European Grand Tour", "Asian Cultural Journey"],
    },
    validity: {
      startDate: "2024-02-14",
      endDate: "2024-04-14",
      timezone: "Asia/Kuala_Lumpur",
    },
    createdBy: "Sales Manager",
    createdDate: "2024-02-10",
    lastModified: "2024-03-01",
    performance: {
      totalRevenue: 456000,
      averageOrderValue: 19826,
      conversionRate: 12.3,
    },
  },
];

export const couponStats: CouponStats = {
  totalCoupons: 24,
  activeCoupons: 5,
  totalRedemptions: 1192,
  totalDiscountGiven: 456000,
  averageDiscountPerCoupon: 19000,
  topPerformingCoupon: "ADVENTURE20",
  revenueImpact: 7065000,
  typeDistribution: {
    percentage: 15,
    fixed: 4,
    bogo: 3,
    free_shipping: 2,
  },
};

export const couponTypes = [
  "All",
  "Percentage",
  "Fixed",
  "BOGO",
  "Free Shipping",
];

export const couponStatuses = [
  "All",
  "Active",
  "Inactive",
  "Expired",
  "Scheduled",
];

export const userTiers = ["Bronze", "Silver", "Gold", "Platinum"];
export const continents = [
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Oceania",
  "Antarctica",
];
