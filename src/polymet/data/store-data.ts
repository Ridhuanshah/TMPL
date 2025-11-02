export interface Store {
  id: string;
  name: string;
  type: "flagship" | "branch" | "kiosk" | "online";
  status: "active" | "inactive" | "maintenance";
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
    manager: string;
  };
  operatingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  performance: {
    monthlyRevenue: number;
    monthlyBookings: number;
    averageOrderValue: number;
    customerSatisfaction: number;
    staffCount: number;
  };
  services: string[];
  openingDate: string;
  lastUpdated: string;
  notes?: string;
}

export interface StoreStats {
  totalStores: number;
  activeStores: number;
  totalRevenue: number;
  totalBookings: number;
  averageRevenue: number;
  topPerformingStore: string;
  revenueGrowth: number;
  storeTypeDistribution: {
    flagship: number;
    branch: number;
    kiosk: number;
    online: number;
  };
}

export const stores: Store[] = [
  {
    id: "STR001",
    name: "TMPL Escapade Flagship - KLCC",
    type: "flagship",
    status: "active",
    address: {
      street: "Level 3, Suria KLCC",
      city: "Kuala Lumpur",
      state: "Federal Territory",
      country: "Malaysia",
      postalCode: "50088",
    },
    contact: {
      phone: "+60321234567",
      email: "klcc@tmplescapade.my",
      manager: "Sarah Chen",
    },
    operatingHours: {
      monday: "10:00 AM - 10:00 PM",
      tuesday: "10:00 AM - 10:00 PM",
      wednesday: "10:00 AM - 10:00 PM",
      thursday: "10:00 AM - 10:00 PM",
      friday: "10:00 AM - 10:00 PM",
      saturday: "10:00 AM - 10:00 PM",
      sunday: "10:00 AM - 10:00 PM",
    },
    performance: {
      monthlyRevenue: 2850000,
      monthlyBookings: 456,
      averageOrderValue: 6250,
      customerSatisfaction: 4.8,
      staffCount: 12,
    },
    services: [
      "Package Consultation",
      "Booking Services",
      "Travel Insurance",
      "Visa Assistance",
      "Equipment Rental",
    ],

    openingDate: "2023-01-15",
    lastUpdated: "2024-03-15",
    notes: "Flagship store with premium consultation services",
  },
  {
    id: "STR002",
    name: "TMPL Escapade - Penang Gurney Plaza",
    type: "branch",
    status: "active",
    address: {
      street: "170, Gurney Drive, Level 2",
      city: "George Town",
      state: "Penang",
      country: "Malaysia",
      postalCode: "10250",
    },
    contact: {
      phone: "+6042345678",
      email: "penang@tmplescapade.my",
      manager: "Ahmad Rahman",
    },
    operatingHours: {
      monday: "10:00 AM - 9:00 PM",
      tuesday: "10:00 AM - 9:00 PM",
      wednesday: "10:00 AM - 9:00 PM",
      thursday: "10:00 AM - 9:00 PM",
      friday: "10:00 AM - 9:00 PM",
      saturday: "10:00 AM - 10:00 PM",
      sunday: "10:00 AM - 10:00 PM",
    },
    performance: {
      monthlyRevenue: 1650000,
      monthlyBookings: 298,
      averageOrderValue: 5537,
      customerSatisfaction: 4.6,
      staffCount: 8,
    },
    services: [
      "Package Consultation",
      "Booking Services",
      "Travel Insurance",
      "Local Tours",
    ],

    openingDate: "2023-03-20",
    lastUpdated: "2024-03-14",
    notes: "Strong performance in local and regional packages",
  },
  {
    id: "STR003",
    name: "TMPL Escapade - Johor Bahru City Square",
    type: "branch",
    status: "active",
    address: {
      street: "106-108, City Square, Jalan Wong Ah Fook",
      city: "Johor Bahru",
      state: "Johor",
      country: "Malaysia",
      postalCode: "80000",
    },
    contact: {
      phone: "+6073456789",
      email: "johor@tmplescapade.my",
      manager: "Lisa Wong",
    },
    operatingHours: {
      monday: "10:00 AM - 9:00 PM",
      tuesday: "10:00 AM - 9:00 PM",
      wednesday: "10:00 AM - 9:00 PM",
      thursday: "10:00 AM - 9:00 PM",
      friday: "10:00 AM - 9:00 PM",
      saturday: "10:00 AM - 10:00 PM",
      sunday: "10:00 AM - 10:00 PM",
    },
    performance: {
      monthlyRevenue: 980000,
      monthlyBookings: 187,
      averageOrderValue: 5240,
      customerSatisfaction: 4.4,
      staffCount: 6,
    },
    services: ["Package Consultation", "Booking Services", "Singapore Tours"],
    openingDate: "2023-06-10",
    lastUpdated: "2024-03-13",
    notes: "Popular with Singapore visitors",
  },
  {
    id: "STR004",
    name: "TMPL Escapade Kiosk - KLIA2",
    type: "kiosk",
    status: "active",
    address: {
      street: "Level 2M, Gateway@klia2 Mall",
      city: "Sepang",
      state: "Selangor",
      country: "Malaysia",
      postalCode: "64000",
    },
    contact: {
      phone: "+60387654321",
      email: "klia2@tmplescapade.my",
      manager: "Raj Patel",
    },
    operatingHours: {
      monday: "6:00 AM - 11:00 PM",
      tuesday: "6:00 AM - 11:00 PM",
      wednesday: "6:00 AM - 11:00 PM",
      thursday: "6:00 AM - 11:00 PM",
      friday: "6:00 AM - 11:00 PM",
      saturday: "6:00 AM - 11:00 PM",
      sunday: "6:00 AM - 11:00 PM",
    },
    performance: {
      monthlyRevenue: 450000,
      monthlyBookings: 89,
      averageOrderValue: 5056,
      customerSatisfaction: 4.2,
      staffCount: 3,
    },
    services: ["Quick Booking", "Travel Insurance", "Emergency Assistance"],
    openingDate: "2023-08-01",
    lastUpdated: "2024-03-12",
    notes: "Airport kiosk for last-minute bookings",
  },
  {
    id: "STR005",
    name: "TMPL Escapade - Ipoh Parade",
    type: "branch",
    status: "maintenance",
    address: {
      street: "105, Jalan Sultan Abdul Jalil",
      city: "Ipoh",
      state: "Perak",
      country: "Malaysia",
      postalCode: "30000",
    },
    contact: {
      phone: "+6052345678",
      email: "ipoh@tmplescapade.my",
      manager: "David Kim",
    },
    operatingHours: {
      monday: "Closed for maintenance",
      tuesday: "Closed for maintenance",
      wednesday: "Closed for maintenance",
      thursday: "Closed for maintenance",
      friday: "Closed for maintenance",
      saturday: "Closed for maintenance",
      sunday: "Closed for maintenance",
    },
    performance: {
      monthlyRevenue: 0,
      monthlyBookings: 0,
      averageOrderValue: 0,
      customerSatisfaction: 0,
      staffCount: 4,
    },
    services: ["Package Consultation", "Booking Services"],
    openingDate: "2023-09-15",
    lastUpdated: "2024-03-01",
    notes: "Undergoing renovation, reopening April 2024",
  },
  {
    id: "STR006",
    name: "TMPL Escapade Online Portal",
    type: "online",
    status: "active",
    address: {
      street: "Digital Platform",
      city: "Kuala Lumpur",
      state: "Federal Territory",
      country: "Malaysia",
      postalCode: "50000",
    },
    contact: {
      phone: "+60196616388",
      email: "online@tmplescapade.my",
      manager: "Tech Team",
    },
    operatingHours: {
      monday: "24/7 Online",
      tuesday: "24/7 Online",
      wednesday: "24/7 Online",
      thursday: "24/7 Online",
      friday: "24/7 Online",
      saturday: "24/7 Online",
      sunday: "24/7 Online",
    },
    performance: {
      monthlyRevenue: 3200000,
      monthlyBookings: 567,
      averageOrderValue: 5644,
      customerSatisfaction: 4.7,
      staffCount: 15,
    },
    services: [
      "Online Booking",
      "Virtual Consultation",
      "24/7 Support",
      "Digital Payment",
      "Mobile App",
    ],

    openingDate: "2023-01-01",
    lastUpdated: "2024-03-15",
    notes: "Primary online booking platform",
  },
];

export const storeStats: StoreStats = {
  totalStores: 8,
  activeStores: 6,
  totalRevenue: 8800000,
  totalBookings: 1597,
  averageRevenue: 1466667,
  topPerformingStore: "Online Portal",
  revenueGrowth: 23.5,
  storeTypeDistribution: {
    flagship: 1,
    branch: 4,
    kiosk: 2,
    online: 1,
  },
};

export const storeTypes = ["All", "Flagship", "Branch", "Kiosk", "Online"];
export const storeStatuses = ["All", "Active", "Inactive", "Maintenance"];
export const storeServices = [
  "Package Consultation",
  "Booking Services",
  "Travel Insurance",
  "Visa Assistance",
  "Equipment Rental",
  "Local Tours",
  "Singapore Tours",
  "Quick Booking",
  "Emergency Assistance",
  "Online Booking",
  "Virtual Consultation",
  "24/7 Support",
  "Digital Payment",
  "Mobile App",
];
