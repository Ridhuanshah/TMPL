export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: "active" | "inactive" | "suspended";
  role:
    | "customer"
    | "admin"
    | "sales_marketing"
    | "booking_reservation"
    | "tour_guide";
  registrationDate: string;
  lastLogin: string;
  totalBookings: number;
  totalSpent: number;
  location: {
    country: string;
    city: string;
  };
  preferences: {
    continent: string[];
    travelStyle: string[];
    notifications: boolean;
  };
  flagTier: "normal" | "vip" | "vvip";
  notes?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  userGrowthRate: number;
  averageBookingsPerUser: number;
  topSpendingUsers: number;
  flagDistribution: {
    normal: number;
    vip: number;
    vvip: number;
  };
  geographicDistribution: {
    [country: string]: number;
  };
}

export const users: User[] = [
  {
    id: "USR001",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+60123456789",
    avatar: "https://github.com/yusufhilmi.png",
    status: "active",
    role: "customer",
    registrationDate: "2024-01-15",
    lastLogin: "2024-03-15",
    totalBookings: 8,
    totalSpent: 45600,
    location: {
      country: "Malaysia",
      city: "Kuala Lumpur",
    },
    preferences: {
      continent: ["Asia", "Europe"],
      travelStyle: ["Adventure", "Cultural"],
      notifications: true,
    },
    flagTier: "vip",
    notes: "VIP flag customer, prefers mountain expeditions",
  },
  {
    id: "USR002",
    name: "Ahmad Rahman",
    email: "ahmad.rahman@email.com",
    phone: "+60198765432",
    avatar: "https://github.com/kdrnp.png",
    status: "active",
    role: "customer",
    registrationDate: "2024-02-20",
    lastLogin: "2024-03-14",
    totalBookings: 3,
    totalSpent: 18900,
    location: {
      country: "Malaysia",
      city: "Penang",
    },
    preferences: {
      continent: ["Asia", "Oceania"],
      travelStyle: ["Beach", "Adventure"],
      notifications: true,
    },
    flagTier: "normal",
    notes: "Interested in diving packages",
  },
  {
    id: "USR003",
    name: "Emily Johnson",
    email: "emily.johnson@email.com",
    phone: "+1234567890",
    avatar: "https://github.com/yahyabedirhan.png",
    status: "active",
    role: "customer",
    registrationDate: "2023-11-10",
    lastLogin: "2024-03-13",
    totalBookings: 12,
    totalSpent: 78400,
    location: {
      country: "United States",
      city: "New York",
    },
    preferences: {
      continent: ["Antarctica", "South America", "Africa"],
      travelStyle: ["Expedition", "Wildlife"],
      notifications: true,
    },
    flagTier: "vvip",
    notes: "Frequent traveler, expedition specialist",
  },
  {
    id: "USR004",
    name: "Raj Patel",
    email: "raj.patel@email.com",
    phone: "+919876543210",
    avatar: "https://github.com/denizbuyuktas.png",
    status: "active",
    role: "customer",
    registrationDate: "2024-01-05",
    lastLogin: "2024-03-12",
    totalBookings: 5,
    totalSpent: 32100,
    location: {
      country: "India",
      city: "Mumbai",
    },
    preferences: {
      continent: ["Asia", "Europe"],
      travelStyle: ["Cultural", "Historical"],
      notifications: false,
    },
    flagTier: "normal",
    notes: "Prefers cultural and historical tours",
  },
  {
    id: "USR005",
    name: "Lisa Wong",
    email: "lisa.wong@email.com",
    phone: "+60187654321",
    avatar: "https://github.com/shoaibux1.png",
    status: "inactive",
    role: "customer",
    registrationDate: "2023-08-22",
    lastLogin: "2024-01-20",
    totalBookings: 2,
    totalSpent: 12800,
    location: {
      country: "Malaysia",
      city: "Johor Bahru",
    },
    preferences: {
      continent: ["Asia"],
      travelStyle: ["Leisure", "Beach"],
      notifications: true,
    },
    valueTier: "normal",
    notes: "Inactive for 2 months, follow up needed",
  },
  {
    id: "ADM001",
    name: "Admin User",
    email: "admin@tmplescapade.my",
    phone: "+60196616388",
    avatar: "https://github.com/polymet-ai.png",
    status: "active",
    role: "admin",
    registrationDate: "2023-01-01",
    lastLogin: "2024-03-15",
    totalBookings: 0,
    totalSpent: 0,
    location: {
      country: "Malaysia",
      city: "Kuala Lumpur",
    },
    preferences: {
      continent: [],
      travelStyle: [],
      notifications: true,
    },
    flagTier: "vvip",
    notes:
      "System administrator - Full access to payment requests, invoices, receipts, refund processing",
  },
  {
    id: "USR006",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+82101234567",
    avatar: "https://github.com/yusufhilmi.png",
    status: "active",
    role: "customer",
    registrationDate: "2024-02-14",
    lastLogin: "2024-03-11",
    totalBookings: 4,
    totalSpent: 28700,
    location: {
      country: "South Korea",
      city: "Seoul",
    },
    preferences: {
      continent: ["Asia", "North America"],
      travelStyle: ["Adventure", "Photography"],
      notifications: true,
    },
    valueTier: "normal",
    notes: "Photography enthusiast, mountain lover",
  },
  {
    id: "USR007",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+5511987654321",
    avatar: "https://github.com/kdrnp.png",
    status: "suspended",
    role: "customer",
    registrationDate: "2023-12-03",
    lastLogin: "2024-02-28",
    totalBookings: 1,
    totalSpent: 5600,
    location: {
      country: "Brazil",
      city: "São Paulo",
    },
    preferences: {
      continent: ["South America", "Europe"],
      travelStyle: ["Cultural", "Food"],
      notifications: false,
    },
    valueTier: "normal",
    notes: "Account suspended due to payment dispute",
  },
  {
    id: "SM001",
    name: "Jennifer Lee",
    email: "jennifer.lee@tmplescapade.my",
    phone: "+60123456780",
    avatar: "https://github.com/yahyabedirhan.png",
    status: "active",
    role: "sales_marketing",
    registrationDate: "2023-03-15",
    lastLogin: "2024-03-15",
    totalBookings: 0,
    totalSpent: 0,
    location: {
      country: "Malaysia",
      city: "Kuala Lumpur",
    },
    preferences: {
      continent: [],
      travelStyle: [],
      notifications: true,
    },
    flagTier: "vip",
    notes:
      "Sales & Marketing - Manages tour packages, customer lists, promotional campaigns",
  },
  {
    id: "BR001",
    name: "Michael Chen",
    email: "michael.chen@tmplescapade.my",
    phone: "+60123456781",
    avatar: "https://github.com/denizbuyuktas.png",
    status: "active",
    role: "booking_reservation",
    registrationDate: "2023-02-20",
    lastLogin: "2024-03-15",
    totalBookings: 0,
    totalSpent: 0,
    location: {
      country: "Malaysia",
      city: "Penang",
    },
    preferences: {
      continent: [],
      travelStyle: [],
      notifications: true,
    },
    valueTier: "vip",
    notes:
      "Booking & Reservation - Handles operational readiness, internal checklists, tour management",
  },
  {
    id: "TG001",
    name: "Alex Thompson",
    email: "alex.thompson@tmplescapade.my",
    phone: "+60123456782",
    avatar: "https://github.com/shoaibux1.png",
    status: "active",
    role: "tour_guide",
    registrationDate: "2023-04-10",
    lastLogin: "2024-03-15",
    totalBookings: 0,
    totalSpent: 0,
    location: {
      country: "Malaysia",
      city: "Kuala Lumpur",
    },
    preferences: {
      continent: [],
      travelStyle: [],
      notifications: true,
    },
    valueTier: "vip",
    notes:
      "Tour Guide - Specializes in Southeast Asia tours, 8 years experience, fluent in English, Malay, Mandarin",
  },
  {
    id: "TG002",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@tmplescapade.my",
    phone: "+60123456783",
    avatar: "https://github.com/yusufhilmi.png",
    status: "active",
    role: "tour_guide",
    registrationDate: "2023-05-15",
    lastLogin: "2024-03-14",
    totalBookings: 0,
    totalSpent: 0,
    location: {
      country: "Malaysia",
      city: "Penang",
    },
    preferences: {
      continent: [],
      travelStyle: [],
      notifications: true,
    },
    valueTier: "vip",
    notes:
      "Tour Guide - Cultural heritage specialist, 5 years experience, expert in Malaysian history and traditions",
  },
  {
    id: "TG003",
    name: "James Wilson",
    email: "james.wilson@tmplescapade.my",
    phone: "+60123456784",
    avatar: "https://github.com/kdrnp.png",
    status: "active",
    role: "tour_guide",
    registrationDate: "2023-06-20",
    lastLogin: "2024-03-13",
    totalBookings: 0,
    totalSpent: 0,
    location: {
      country: "Malaysia",
      city: "Sabah",
    },
    preferences: {
      continent: [],
      travelStyle: [],
      notifications: true,
    },
    valueTier: "vip",
    notes:
      "Tour Guide - Adventure and wildlife specialist, 10 years experience, certified mountain guide",
  },
];

export const userStats: UserStats = {
  totalUsers: 15847,
  activeUsers: 12456,
  newUsersThisMonth: 689,
  userGrowthRate: 15.3,
  averageBookingsPerUser: 3.2,
  topSpendingUsers: 156,
  flagDistribution: {
    normal: 13179,
    vip: 1876,
    vvip: 792,
  },
  geographicDistribution: {
    Malaysia: 6234,
    Singapore: 2145,
    "United States": 1876,
    "United Kingdom": 1234,
    Australia: 987,
    India: 876,
    Thailand: 654,
    Indonesia: 543,
    Others: 1298,
  },
};

export const userRoles = [
  "All",
  "Customer",
  "Admin",
  "Sales & Marketing",
  "Booking & Reservation",
  "Tour Guide",
];

// Role descriptions for reference
export const roleDescriptions = {
  admin: {
    name: "Admin",
    permissions: [
      "Generate/send payment requests",
      "Manually create invoices and receipts",
      "View incomplete payments",
      "Follow up with customers on instalment balances",
      "Manage refund processing",
    ],
  },
  sales_marketing: {
    name: "Sales & Marketing",
    permissions: [
      "Add or update tour packages",
      "View existing customer list",
      "Send promotional email blasts",
    ],
  },
  booking_reservation: {
    name: "Booking & Reservation",
    permissions: [
      "Monitor payment status for operational readiness",
      "Handle internal checklist for each tour package",
      "Manage booking tasks (Accommodation, Transportation, Tour Guide, Visa/Others)",
      "Handle documents/management (Guidebook, Pre-Tour Briefing, Task Checklist, etc.)",
      "Customer Details management (Flights, Room List, Grouping Templates)",
      "Tour Guide Assignment and Customer Feedback",
    ],
  },
  customer: {
    name: "Customer",
    permissions: [
      "View completed trips list",
      "Access upcoming trips overview",
      "Download itinerary",
      "View payment balance and breakdown",
      "Download invoices and receipts",
      "Request refund/cancellation (if eligible)",
    ],
  },
  tour_guide: {
    name: "Tour Guide",
    permissions: [
      "View assigned tour schedules",
      "Access upcoming tour locations",
      "View customer group details",
      "Update tour status and progress",
      "Submit tour completion reports",
      "Access emergency contact information",
      "View itinerary and special requirements",
    ],
  },
};
export const userStatuses = ["All", "Active", "Inactive", "Suspended"];
export const flagTiers = ["All", "Normal", "VIP", "VVIP"];
export const continents = [
  "All",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Oceania",
  "Antarctica",
];
