export interface Booking {
  id: string;
  bookingNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  package: {
    id: string;
    name: string;
    continent: string;
    duration: number;
  };
  travelDates: {
    startDate: string;
    endDate: string;
  };
  participants: number;
  status: "inquiry" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "partial" | "paid" | "refunded";
  totalAmount: number;
  paidAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  specialRequests?: string[];
  // Extended fields for corporate bookings
  corporateDetails?: {
    companyName: string;
    companyRegistration: string;
    sstRegistration?: string;
    businessType: string;
    contactPerson: string;
    purchaseOrderNo?: string;
    creditTerms?: string;
    billingAddress?: string;
  };
}

export const bookings: Booking[] = [
  {
    id: "book_001",
    bookingNumber: "TMPL-2024-001234",
    customer: {
      id: "cust_001",
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      phone: "+60123456789",
      avatar: "https://github.com/yusufhilmi.png",
    },
    package: {
      id: "pkg_001",
      name: "Himalayan Base Camp Trek",
      continent: "Asia",
      duration: 14,
    },
    travelDates: {
      startDate: "2024-03-15",
      endDate: "2024-03-29",
    },
    participants: 2,
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 9000,
    paidAmount: 9000,
    currency: "RM",
    createdAt: "2024-02-01T10:30:00Z",
    updatedAt: "2024-02-15T14:20:00Z",
    notes: "Customer requested vegetarian meals",
    specialRequests: ["Vegetarian meals", "Airport pickup"],
  },
  {
    id: "book_002",
    bookingNumber: "TMPL-2024-001235",
    customer: {
      id: "cust_002",
      name: "Michael Wong",
      email: "michael.wong@email.com",
      phone: "+60198765432",
      avatar: "https://github.com/kdrnp.png",
    },
    package: {
      id: "pkg_002",
      name: "African Safari Adventure",
      continent: "Africa",
      duration: 10,
    },
    travelDates: {
      startDate: "2024-06-10",
      endDate: "2024-06-20",
    },
    participants: 4,
    status: "confirmed",
    paymentStatus: "partial",
    totalAmount: 24800,
    paidAmount: 12400,
    currency: "RM",
    createdAt: "2024-02-05T09:15:00Z",
    updatedAt: "2024-02-18T11:45:00Z",
    notes: "Family booking with 2 children",
    specialRequests: ["Child-friendly activities", "Family room"],
  },
  {
    id: "book_003",
    bookingNumber: "TMPL-2024-001236",
    customer: {
      id: "cust_003",
      name: "Ahmad Rahman",
      email: "ahmad.rahman@email.com",
      phone: "+60187654321",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    package: {
      id: "pkg_003",
      name: "Antarctic Expedition Cruise",
      continent: "Antarctica",
      duration: 12,
    },
    travelDates: {
      startDate: "2024-11-15",
      endDate: "2024-11-27",
    },
    participants: 1,
    status: "inquiry",
    paymentStatus: "pending",
    totalAmount: 15000,
    paidAmount: 0,
    currency: "RM",
    createdAt: "2024-02-10T16:20:00Z",
    updatedAt: "2024-02-10T16:20:00Z",
    notes: "Customer inquiring about solo travel options",
  },
  {
    id: "book_004",
    bookingNumber: "TMPL-2024-001237",
    customer: {
      id: "cust_004",
      name: "Lisa Tan",
      email: "lisa.tan@email.com",
      phone: "+60176543210",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    package: {
      id: "pkg_004",
      name: "Amazon Rainforest Explorer",
      continent: "South America",
      duration: 8,
    },
    travelDates: {
      startDate: "2024-04-20",
      endDate: "2024-04-28",
    },
    participants: 3,
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 11400,
    paidAmount: 11400,
    currency: "RM",
    createdAt: "2024-01-28T13:45:00Z",
    updatedAt: "2024-02-12T10:30:00Z",
    specialRequests: [
      "Photography equipment transport",
      "Early morning activities",
    ],
  },
  {
    id: "book_005",
    bookingNumber: "TMPL-2024-001238",
    customer: {
      id: "cust_005",
      name: "David Kumar",
      email: "david.kumar@email.com",
      phone: "+60165432109",
      avatar: "https://github.com/shoaibux1.png",
    },
    package: {
      id: "pkg_005",
      name: "European Castle Trail",
      continent: "Europe",
      duration: 12,
    },
    travelDates: {
      startDate: "2024-05-15",
      endDate: "2024-05-27",
    },
    participants: 2,
    status: "completed",
    paymentStatus: "paid",
    totalAmount: 10400,
    paidAmount: 10400,
    currency: "RM",
    createdAt: "2024-01-15T08:20:00Z",
    updatedAt: "2024-01-30T15:10:00Z",
    notes: "Honeymoon trip - completed successfully",
  },
  {
    id: "book_006",
    bookingNumber: "TMPL-2024-001239",
    customer: {
      id: "cust_006",
      name: "Jennifer Lee",
      email: "jennifer.lee@email.com",
      phone: "+60154321098",
    },
    package: {
      id: "pkg_006",
      name: "Great Barrier Reef Dive",
      continent: "Oceania",
      duration: 7,
    },
    travelDates: {
      startDate: "2024-07-08",
      endDate: "2024-07-15",
    },
    participants: 1,
    status: "cancelled",
    paymentStatus: "refunded",
    totalAmount: 4200,
    paidAmount: 0,
    currency: "RM",
    createdAt: "2024-02-08T12:00:00Z",
    updatedAt: "2024-02-16T09:30:00Z",
    notes: "Cancelled due to medical reasons - full refund processed",
  },
  {
    id: "book_007",
    bookingNumber: "TMPL-2024-001240",
    customer: {
      id: "cust_007",
      name: "Robert Johnson",
      email: "robert.johnson@email.com",
      phone: "+60143210987",
    },
    package: {
      id: "pkg_001",
      name: "Himalayan Base Camp Trek",
      continent: "Asia",
      duration: 14,
    },
    travelDates: {
      startDate: "2024-04-01",
      endDate: "2024-04-15",
    },
    participants: 1,
    status: "confirmed",
    paymentStatus: "pending",
    totalAmount: 4500,
    paidAmount: 1350,
    currency: "RM",
    createdAt: "2024-02-12T14:30:00Z",
    updatedAt: "2024-02-18T16:45:00Z",
    notes: "30% deposit paid, balance due 30 days before travel",
    specialRequests: ["Altitude sickness medication", "Single room"],
  },
  {
    id: "book_008",
    bookingNumber: "TMPL-2024-001241",
    customer: {
      id: "cust_008",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "+60132109876",
    },
    package: {
      id: "pkg_002",
      name: "African Safari Adventure",
      continent: "Africa",
      duration: 10,
    },
    travelDates: {
      startDate: "2024-08-12",
      endDate: "2024-08-22",
    },
    participants: 6,
    status: "inquiry",
    paymentStatus: "pending",
    totalAmount: 37200,
    paidAmount: 0,
    currency: "RM",
    createdAt: "2024-02-18T11:15:00Z",
    updatedAt: "2024-02-18T11:15:00Z",
    notes:
      "Group booking inquiry - waiting for confirmation from all participants",
  },
  // September 2025 bookings for calendar visualization
  {
    id: "book_009",
    bookingNumber: "TMPL-2025-002001",
    customer: {
      id: "cust_009",
      name: "Emma Thompson",
      email: "emma.thompson@email.com",
      phone: "+60123456789",
      avatar: "https://github.com/yusufhilmi.png",
    },
    package: {
      id: "pkg_007",
      name: "Bali Cultural Discovery",
      continent: "Asia",
      duration: 5,
    },
    travelDates: {
      startDate: "2025-09-03",
      endDate: "2025-09-08",
    },
    participants: 2,
    status: "confirmed",
    paymentStatus: "partial",
    totalAmount: 3200,
    paidAmount: 1600,
    currency: "RM",
    createdAt: "2025-08-15T10:30:00Z",
    updatedAt: "2025-08-20T14:20:00Z",
    notes: "Honeymoon trip - 50% deposit paid",
    specialRequests: ["Romantic dinner", "Spa treatments"],
  },
  {
    id: "book_010",
    bookingNumber: "TMPL-2025-002002",
    customer: {
      id: "cust_010",
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+60198765432",
      avatar: "https://github.com/kdrnp.png",
    },
    package: {
      id: "pkg_008",
      name: "Tokyo Modern Explorer",
      continent: "Asia",
      duration: 7,
    },
    travelDates: {
      startDate: "2025-09-05",
      endDate: "2025-09-12",
    },
    participants: 1,
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 4800,
    paidAmount: 4800,
    currency: "RM",
    createdAt: "2025-08-10T09:15:00Z",
    updatedAt: "2025-08-25T11:45:00Z",
    notes: "Business traveler - fully paid",
    specialRequests: ["Airport transfers", "Business center access"],
  },
  {
    id: "book_011",
    bookingNumber: "TMPL-2025-002003",
    customer: {
      id: "cust_011",
      name: "Sophie Martinez",
      email: "sophie.martinez@email.com",
      phone: "+60187654321",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    package: {
      id: "pkg_009",
      name: "Swiss Alps Adventure",
      continent: "Europe",
      duration: 10,
    },
    travelDates: {
      startDate: "2025-09-08",
      endDate: "2025-09-18",
    },
    participants: 4,
    status: "inquiry",
    paymentStatus: "pending",
    totalAmount: 16800,
    paidAmount: 0,
    currency: "RM",
    createdAt: "2025-09-01T16:20:00Z",
    updatedAt: "2025-09-01T16:20:00Z",
    notes: "Family inquiry - considering dates",
    specialRequests: ["Family rooms", "Child activities"],
  },
  {
    id: "book_012",
    bookingNumber: "TMPL-2025-002004",
    customer: {
      id: "cust_012",
      name: "Alex Chen",
      email: "alex.chen@email.com",
      phone: "+60176543210",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    package: {
      id: "pkg_010",
      name: "Patagonia Wilderness Trek",
      continent: "South America",
      duration: 12,
    },
    travelDates: {
      startDate: "2025-09-12",
      endDate: "2025-09-24",
    },
    participants: 2,
    status: "completed",
    paymentStatus: "paid",
    totalAmount: 14600,
    paidAmount: 14600,
    currency: "RM",
    createdAt: "2025-07-20T13:45:00Z",
    updatedAt: "2025-09-25T10:30:00Z",
    notes: "Trip completed successfully - excellent feedback",
    specialRequests: ["Photography guide", "Camping equipment"],
  },
  {
    id: "book_013",
    bookingNumber: "TMPL-2025-002005",
    customer: {
      id: "cust_013",
      name: "Rachel Green",
      email: "rachel.green@email.com",
      phone: "+60165432109",
      avatar: "https://github.com/shoaibux1.png",
    },
    package: {
      id: "pkg_011",
      name: "Maldives Paradise Retreat",
      continent: "Asia",
      duration: 6,
    },
    travelDates: {
      startDate: "2025-09-15",
      endDate: "2025-09-21",
    },
    participants: 2,
    status: "cancelled",
    paymentStatus: "refunded",
    totalAmount: 8400,
    paidAmount: 0,
    currency: "RM",
    createdAt: "2025-08-05T08:20:00Z",
    updatedAt: "2025-08-30T15:10:00Z",
    notes: "Cancelled due to work commitments - full refund processed",
  },
  {
    id: "book_014",
    bookingNumber: "TMPL-2025-002006",
    customer: {
      id: "cust_014",
      name: "Kevin Liu",
      email: "kevin.liu@email.com",
      phone: "+60154321098",
    },
    package: {
      id: "pkg_012",
      name: "Morocco Desert Safari",
      continent: "Africa",
      duration: 8,
    },
    travelDates: {
      startDate: "2025-09-18",
      endDate: "2025-09-26",
    },
    participants: 3,
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 9600,
    paidAmount: 9600,
    currency: "RM",
    createdAt: "2025-08-12T12:00:00Z",
    updatedAt: "2025-08-28T09:30:00Z",
    notes: "Group booking - all participants confirmed",
    specialRequests: ["Desert camping", "Camel trekking"],
  },
  {
    id: "book_015",
    bookingNumber: "TMPL-2025-002007",
    customer: {
      id: "cust_015",
      name: "Isabella Rodriguez",
      email: "isabella.rodriguez@email.com",
      phone: "+60143210987",
    },
    package: {
      id: "pkg_013",
      name: "Iceland Northern Lights",
      continent: "Europe",
      duration: 5,
    },
    travelDates: {
      startDate: "2025-09-22",
      endDate: "2025-09-27",
    },
    participants: 1,
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 5200,
    paidAmount: 5200,
    currency: "RM",
    createdAt: "2025-08-18T14:30:00Z",
    updatedAt: "2025-09-02T16:45:00Z",
    notes: "Solo traveler - photography enthusiast",
    specialRequests: ["Northern lights tour", "Photography workshop"],
  },
  {
    id: "book_016",
    bookingNumber: "TMPL-2025-002008",
    customer: {
      id: "cust_016",
      name: "Daniel Park",
      email: "daniel.park@email.com",
      phone: "+60132109876",
    },
    package: {
      id: "pkg_014",
      name: "New Zealand Adventure",
      continent: "Oceania",
      duration: 14,
    },
    travelDates: {
      startDate: "2025-09-25",
      endDate: "2025-10-09",
    },
    participants: 2,
    status: "inquiry",
    paymentStatus: "pending",
    totalAmount: 18200,
    paidAmount: 0,
    currency: "RM",
    createdAt: "2025-09-03T11:15:00Z",
    updatedAt: "2025-09-03T11:15:00Z",
    notes: "Couple inquiry - comparing packages",
    specialRequests: ["Adventure activities", "Scenic routes"],
  },
  {
    id: "book_017",
    bookingNumber: "TMPL-2025-002009",
    customer: {
      id: "cust_017",
      name: "Olivia Johnson",
      email: "olivia.johnson@email.com",
      phone: "+60121098765",
      avatar: "https://github.com/polymet-ai.png",
    },
    package: {
      id: "pkg_015",
      name: "Vietnam Culinary Journey",
      continent: "Asia",
      duration: 9,
    },
    travelDates: {
      startDate: "2025-09-28",
      endDate: "2025-10-07",
    },
    participants: 4,
    status: "confirmed",
    paymentStatus: "partial",
    totalAmount: 7200,
    paidAmount: 2160,
    currency: "RM",
    createdAt: "2025-08-25T15:20:00Z",
    updatedAt: "2025-09-05T12:30:00Z",
    notes: "Food tour group - 30% deposit paid",
    specialRequests: ["Cooking classes", "Market tours", "Vegetarian options"],
  },
  // Corporate Booking - LHDN Compliant Invoice Mockup
  {
    id: "book_corp_001",
    bookingNumber: "TMPL-2024-001250",
    customer: {
      id: "corp_001",
      name: "Tech Solutions Sdn Bhd",
      email: "finance@techsolutions.com.my",
      phone: "+60 3-7890 1234",
      avatar: "https://github.com/polymet-ai.png",
    },
    package: {
      id: "pkg_corp_001",
      name: "Corporate Team Building Retreat - Langkawi",
      continent: "Asia",
      duration: 3,
    },
    travelDates: {
      startDate: "2024-03-20",
      endDate: "2024-03-23",
    },
    participants: 25,
    status: "confirmed",
    paymentStatus: "partial",
    totalAmount: 45300, // Including 6% SST
    paidAmount: 15100, // First installment
    currency: "RM",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-02-20T15:30:00Z",
    notes:
      "Corporate team building event for 25 employees. Payment plan: 3 installments. Second payment overdue.",
    specialRequests: [
      "Team building activities",
      "Conference room setup",
      "Halal meals for all participants",
      "Airport transfers for group",
      "Company invoice required with SST breakdown",
      "Purchase Order: PO-2024-0156",
    ],
  },
];

export const bookingStatuses = [
  "All Status",
  "inquiry",
  "confirmed",
  "completed",
  "cancelled",
];

export const paymentStatuses = [
  "All Payments",
  "pending",
  "partial",
  "paid",
  "refunded",
];

export interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  statusBreakdown: {
    [key: string]: number;
  };
  paymentBreakdown: {
    [key: string]: number;
  };
  recentBookings: number;
  conversionRate: number;
}

export const bookingStats: BookingStats = {
  totalBookings: bookings.length,
  totalRevenue: bookings.reduce((sum, booking) => sum + booking.paidAmount, 0),
  statusBreakdown: {
    inquiry: bookings.filter((b) => b.status === "inquiry").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  },
  paymentBreakdown: {
    pending: bookings.filter((b) => b.paymentStatus === "pending").length,
    partial: bookings.filter((b) => b.paymentStatus === "partial").length,
    paid: bookings.filter((b) => b.paymentStatus === "paid").length,
    refunded: bookings.filter((b) => b.paymentStatus === "refunded").length,
  },
  recentBookings: bookings.filter((b) => {
    const bookingDate = new Date(b.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return bookingDate > weekAgo;
  }).length,
  conversionRate: 78.2,
};

// Default export for the module
export default {
  bookings,
  bookingStatuses,
  paymentStatuses,
  bookingStats,
};
