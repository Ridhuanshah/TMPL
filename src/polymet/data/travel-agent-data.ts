export interface TravelAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  specialties: string[];
  languages: string[];
  experience: number; // years
  rating: number;
  totalTrips: number;
  status: "active" | "inactive" | "on_leave";
  certifications: string[];
  bio: string;
  availability: {
    startDate: string;
    endDate: string;
  };
}

export interface FlightCompany {
  id: string;
  name: string;
  code: string;
  logo?: string;
  rating: number;
  fleetSize: number;
  destinations: string[];
  services: string[];
  status: "active" | "inactive";
}

export interface PackageBookingDate {
  id: string;
  startDate: string;
  endDate: string;
  capacity: number;
  booked: number;
  status: "active" | "full" | "cancelled";
  price?: number;
  flightType?: "economy" | "premium_economy" | "business" | "first_class";
  flightCompany?: string; // Flight company ID
  tripCode?: string;
  agents: {
    leadAgent?: TravelAgent;
    companions: TravelAgent[];
  };
}

export interface TravelAgentAssignment {
  agentId: string;
  role: "leader" | "companion";
  dateId: string;
}

// Mock travel agents data
export const travelAgents: TravelAgent[] = [
  {
    id: "agent_001",
    name: "Sarah Chen",
    email: "sarah.chen@tmpl-escapade.com",
    phone: "+60 12-345-6789",
    avatar: "https://github.com/yusufhilmi.png",
    specialties: ["Adventure Tourism", "Cultural Tours", "Photography Tours"],
    languages: ["English", "Mandarin", "Malay"],
    experience: 8,
    rating: 4.9,
    totalTrips: 156,
    status: "active",
    certifications: [
      "Wilderness First Aid",
      "Tour Guide License",
      "Scuba Diving Instructor",
    ],

    bio: "Experienced adventure guide with expertise in Southeast Asian destinations. Passionate about sustainable tourism and cultural immersion.",
    availability: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  },
  {
    id: "agent_002",
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@tmpl-escapade.com",
    phone: "+60 12-456-7890",
    avatar: "https://github.com/kdrnp.png",
    specialties: ["Luxury Travel", "Wine Tours", "Historical Sites"],
    languages: ["English", "Spanish", "French"],
    experience: 12,
    rating: 4.8,
    totalTrips: 203,
    status: "active",
    certifications: [
      "Sommelier Certificate",
      "Art History Degree",
      "Luxury Travel Specialist",
    ],

    bio: "Luxury travel specialist with extensive knowledge of European destinations and fine dining experiences.",
    availability: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  },
  {
    id: "agent_003",
    name: "Aisha Patel",
    email: "aisha.patel@tmpl-escapade.com",
    phone: "+60 12-567-8901",
    avatar: "https://github.com/yahyabedirhan.png",
    specialties: ["Eco Tourism", "Wildlife Safari", "Trekking"],
    languages: ["English", "Hindi", "Tamil"],
    experience: 6,
    rating: 4.7,
    totalTrips: 89,
    status: "active",
    certifications: [
      "Wildlife Conservation",
      "Mountain Guide",
      "Eco-Tourism Specialist",
    ],

    bio: "Eco-tourism enthusiast specializing in wildlife conservation and sustainable travel practices.",
    availability: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  },
  {
    id: "agent_004",
    name: "David Kim",
    email: "david.kim@tmpl-escapade.com",
    phone: "+60 12-678-9012",
    avatar: "https://github.com/denizbuyuktas.png",
    specialties: ["City Tours", "Food Tourism", "Business Travel"],
    languages: ["English", "Korean", "Japanese"],
    experience: 4,
    rating: 4.6,
    totalTrips: 67,
    status: "active",
    certifications: [
      "Culinary Tourism",
      "City Guide License",
      "Business Travel Coordinator",
    ],

    bio: "Urban exploration expert with deep knowledge of Asian metropolitan areas and culinary scenes.",
    availability: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  },
  {
    id: "agent_005",
    name: "Emma Thompson",
    email: "emma.thompson@tmpl-escapade.com",
    phone: "+60 12-789-0123",
    avatar: "https://github.com/shoaibux1.png",
    specialties: ["Beach Resorts", "Wellness Tourism", "Family Travel"],
    languages: ["English", "German", "Dutch"],
    experience: 10,
    rating: 4.9,
    totalTrips: 178,
    status: "active",
    certifications: [
      "Wellness Tourism",
      "Family Travel Specialist",
      "Resort Management",
    ],

    bio: "Family and wellness travel expert with extensive experience in tropical destinations and resort management.",
    availability: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  },
  {
    id: "agent_006",
    name: "Ahmad Hassan",
    email: "ahmad.hassan@tmpl-escapade.com",
    phone: "+60 12-890-1234",
    avatar: "https://github.com/polymet-ai.png",
    specialties: ["Religious Tourism", "Historical Tours", "Cultural Heritage"],
    languages: ["English", "Arabic", "Malay"],
    experience: 15,
    rating: 4.8,
    totalTrips: 245,
    status: "active",
    certifications: [
      "Religious Tourism Guide",
      "Historical Sites Expert",
      "Cultural Heritage Specialist",
    ],

    bio: "Senior guide specializing in religious and cultural heritage tourism with deep knowledge of Middle Eastern and Southeast Asian history.",
    availability: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
  },
];

// Agent roles
export const agentRoles = ["leader", "companion"] as const;

// Agent statuses for filtering
export const agentStatuses = [
  "All Status",
  "active",
  "inactive",
  "on_leave",
] as const;

// Agent specialties for filtering
export const agentSpecialties = [
  "All Specialties",
  "Adventure Tourism",
  "Cultural Tours",
  "Photography Tours",
  "Luxury Travel",
  "Wine Tours",
  "Historical Sites",
  "Eco Tourism",
  "Wildlife Safari",
  "Trekking",
  "City Tours",
  "Food Tourism",
  "Business Travel",
  "Beach Resorts",
  "Wellness Tourism",
  "Family Travel",
  "Religious Tourism",
  "Cultural Heritage",
] as const;

// Flight types for booking dates
export const flightTypes = [
  { value: "economy", label: "Economy Class" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business Class" },
  { value: "first_class", label: "First Class" },
] as const;

// Flight companies data
export const flightCompanies: FlightCompany[] = [
  {
    id: "airline_001",
    name: "Malaysia Airlines",
    code: "MH",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Malaysia-Airlines-Logo.png",
    rating: 4.2,
    fleetSize: 88,
    destinations: ["Asia", "Europe", "Australia", "Middle East"],
    services: ["Full Service", "Business Class", "First Class", "Cargo"],
    status: "active",
  },
  {
    id: "airline_002",
    name: "AirAsia",
    code: "AK",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/AirAsia-Logo.png",
    rating: 3.8,
    fleetSize: 200,
    destinations: ["Asia", "Australia"],
    services: ["Low Cost", "Premium Flatbed", "Cargo"],
    status: "active",
  },
  {
    id: "airline_003",
    name: "Singapore Airlines",
    code: "SQ",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Singapore-Airlines-Logo.png",
    rating: 4.8,
    fleetSize: 130,
    destinations: ["Asia", "Europe", "North America", "Australia"],
    services: ["Full Service", "Business Class", "First Class", "Suites"],
    status: "active",
  },
  {
    id: "airline_004",
    name: "Thai Airways",
    code: "TG",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Thai-Airways-Logo.png",
    rating: 4.1,
    fleetSize: 80,
    destinations: ["Asia", "Europe", "Australia"],
    services: ["Full Service", "Business Class", "First Class"],
    status: "active",
  },
  {
    id: "airline_005",
    name: "Emirates",
    code: "EK",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Emirates-Logo.png",
    rating: 4.6,
    fleetSize: 270,
    destinations: ["Asia", "Europe", "North America", "Africa", "Australia"],
    services: ["Full Service", "Business Class", "First Class", "A380"],
    status: "active",
  },
  {
    id: "airline_006",
    name: "Qatar Airways",
    code: "QR",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Qatar-Airways-Logo.png",
    rating: 4.7,
    fleetSize: 250,
    destinations: ["Asia", "Europe", "North America", "Africa", "Australia"],
    services: ["Full Service", "Business Class", "First Class", "QSuite"],
    status: "active",
  },
  {
    id: "airline_007",
    name: "Cathay Pacific",
    code: "CX",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Cathay-Pacific-Logo.png",
    rating: 4.3,
    fleetSize: 150,
    destinations: ["Asia", "Europe", "North America", "Australia"],
    services: ["Full Service", "Business Class", "First Class"],
    status: "active",
  },
  {
    id: "airline_008",
    name: "Jetstar Asia",
    code: "3K",
    logo: "https://logos-world.net/wp-content/uploads/2023/01/Jetstar-Logo.png",
    rating: 3.5,
    fleetSize: 40,
    destinations: ["Asia"],
    services: ["Low Cost", "Business Max"],
    status: "active",
  },
];

// Helper functions
export const getAgentById = (id: string): TravelAgent | undefined => {
  return travelAgents.find((agent) => agent.id === id);
};

export const getAvailableAgents = (
  startDate: string,
  endDate: string
): TravelAgent[] => {
  return travelAgents.filter((agent) => {
    if (agent.status !== "active") return false;

    const agentStart = new Date(agent.availability.startDate);
    const agentEnd = new Date(agent.availability.endDate);
    const requestStart = new Date(startDate);
    const requestEnd = new Date(endDate);

    return agentStart <= requestStart && agentEnd >= requestEnd;
  });
};

export const getAgentsBySpecialty = (specialty: string): TravelAgent[] => {
  if (specialty === "All Specialties") return travelAgents;
  return travelAgents.filter((agent) => agent.specialties.includes(specialty));
};

// Flight company helper functions
export const getFlightCompanyById = (id: string): FlightCompany | undefined => {
  return flightCompanies.find((company) => company.id === id);
};

export const getActiveFlightCompanies = (): FlightCompany[] => {
  return flightCompanies.filter((company) => company.status === "active");
};

export const getFlightCompaniesByDestination = (
  destination: string
): FlightCompany[] => {
  return flightCompanies.filter(
    (company) =>
      company.destinations.includes(destination) && company.status === "active"
  );
};
