export interface TourGuideAssignment {
  id: string;
  tourGuideId: string;
  tourGuideName: string;
  packageId: string;
  packageName: string;
  bookingId: string;
  destination: {
    name: string;
    country: string;
    continent: string;
  };
  tourDates: {
    startDate: string;
    endDate: string;
    duration: number;
  };
  groupSize: number;
  customers: {
    id: string;
    name: string;
    phone: string;
    email: string;
    specialRequirements?: string;
  }[];
  status: "upcoming" | "in_progress" | "completed" | "cancelled";
  itinerary: {
    day: number;
    date: string;
    location: string;
    activities: string[];
    accommodation?: string;
    meals: string[];
    notes?: string;
  }[];
  emergencyContacts: {
    name: string;
    role: string;
    phone: string;
    email: string;
  }[];
  specialInstructions?: string;
  equipmentNeeded?: string[];
  transportationDetails?: {
    type: string;
    details: string;
    pickupTime?: string;
    pickupLocation?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TourGuideSchedule {
  tourGuideId: string;
  tourGuideName: string;
  currentLocation?: string;
  nextAssignment?: {
    assignmentId: string;
    destination: string;
    startDate: string;
    daysUntilDeparture: number;
  };
  upcomingAssignments: TourGuideAssignment[];
  completedAssignments: number;
  totalCustomersGuided: number;
  averageRating: number;
  specialties: string[];
  languages: string[];
}

// Sample tour guide assignments with realistic conflicts
export const tourGuideAssignments: TourGuideAssignment[] = [
  {
    id: "TGA001",
    tourGuideId: "TG001",
    tourGuideName: "Alex Thompson",
    packageId: "PKG001",
    packageName: "Magical Japan Discovery",
    bookingId: "BK001",
    destination: {
      name: "Tokyo, Kyoto, Osaka",
      country: "Japan",
      continent: "Asia",
    },
    tourDates: {
      startDate: "2024-04-15",
      endDate: "2024-04-22",
      duration: 8,
    },
    groupSize: 12,
    customers: [
      {
        id: "USR001",
        name: "Sarah Chen",
        phone: "+60123456789",
        email: "sarah.chen@email.com",
        specialRequirements: "Vegetarian meals",
      },
      {
        id: "USR002",
        name: "Ahmad Rahman",
        phone: "+60198765432",
        email: "ahmad.rahman@email.com",
      },
      {
        id: "USR006",
        name: "David Kim",
        phone: "+82101234567",
        email: "david.kim@email.com",
        specialRequirements: "Photography equipment assistance",
      },
    ],

    status: "upcoming",
    itinerary: [
      {
        day: 1,
        date: "2024-04-15",
        location: "Tokyo",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Welcome dinner",
          "Tokyo orientation",
        ],

        accommodation: "Tokyo Grand Hotel",
        meals: ["Dinner"],
        notes: "Flight arrives at 14:30 JST",
      },
      {
        day: 2,
        date: "2024-04-16",
        location: "Tokyo",
        activities: [
          "Senso-ji Temple",
          "Tokyo Skytree",
          "Asakusa district tour",
          "Traditional lunch",
        ],

        accommodation: "Tokyo Grand Hotel",
        meals: ["Breakfast", "Lunch"],
      },
      {
        day: 3,
        date: "2024-04-17",
        location: "Tokyo to Kyoto",
        activities: [
          "Shinkansen to Kyoto",
          "Fushimi Inari Shrine",
          "Gion district walking tour",
        ],

        accommodation: "Kyoto Heritage Inn",
        meals: ["Breakfast", "Dinner"],
        notes: "Shinkansen departure at 09:30",
      },
    ],

    emergencyContacts: [
      {
        name: "TMPL Escapade Emergency",
        role: "24/7 Support",
        phone: "+60196616388",
        email: "emergency@tmplescapade.my",
      },
      {
        name: "Japan Local Partner",
        role: "Local Support",
        phone: "+81-3-1234-5678",
        email: "support@japanpartner.jp",
      },
    ],

    specialInstructions:
      "Group includes photography enthusiasts - allow extra time at scenic spots",
    equipmentNeeded: [
      "First aid kit",
      "Group umbrella",
      "Portable speaker",
      "Emergency phone",
    ],

    transportationDetails: {
      type: "Private coach",
      details: "45-seater coach with AC and WiFi",
      pickupTime: "08:00",
      pickupLocation: "Hotel lobby",
    },
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
  },
  {
    id: "TGA002",
    tourGuideId: "TG002",
    tourGuideName: "Siti Nurhaliza",
    packageId: "PKG002",
    packageName: "Malaysian Heritage Trail",
    bookingId: "BK002",
    destination: {
      name: "Penang, Malacca, Kuala Lumpur",
      country: "Malaysia",
      continent: "Asia",
    },
    tourDates: {
      startDate: "2024-04-20",
      endDate: "2024-04-25",
      duration: 6,
    },
    groupSize: 8,
    customers: [
      {
        id: "USR003",
        name: "Emily Johnson",
        phone: "+1234567890",
        email: "emily.johnson@email.com",
        specialRequirements: "Mobility assistance needed",
      },
      {
        id: "USR004",
        name: "Raj Patel",
        phone: "+919876543210",
        email: "raj.patel@email.com",
      },
    ],

    status: "upcoming",
    itinerary: [
      {
        day: 1,
        date: "2024-04-20",
        location: "Penang",
        activities: [
          "George Town UNESCO sites",
          "Street art tour",
          "Local food tasting",
        ],

        accommodation: "Heritage Hotel Penang",
        meals: ["Lunch", "Dinner"],
      },
      {
        day: 2,
        date: "2024-04-21",
        location: "Penang",
        activities: ["Penang Hill", "Kek Lok Si Temple", "Clan houses tour"],
        accommodation: "Heritage Hotel Penang",
        meals: ["Breakfast", "Lunch"],
      },
    ],

    emergencyContacts: [
      {
        name: "TMPL Escapade Emergency",
        role: "24/7 Support",
        phone: "+60196616388",
        email: "emergency@tmplescapade.my",
      },
    ],

    specialInstructions:
      "One customer requires mobility assistance - ensure wheelchair accessible venues",
    equipmentNeeded: ["First aid kit", "Wheelchair", "Portable microphone"],
    createdAt: "2024-03-05T09:00:00Z",
    updatedAt: "2024-03-15T11:00:00Z",
  },
  {
    id: "TGA003",
    tourGuideId: "TG003",
    tourGuideName: "James Wilson",
    packageId: "PKG003",
    packageName: "Borneo Wildlife Adventure",
    bookingId: "BK003",
    destination: {
      name: "Sabah, Borneo",
      country: "Malaysia",
      continent: "Asia",
    },
    tourDates: {
      startDate: "2024-05-01",
      endDate: "2024-05-08",
      duration: 8,
    },
    groupSize: 6,
    customers: [
      {
        id: "USR005",
        name: "Lisa Wong",
        phone: "+60187654321",
        email: "lisa.wong@email.com",
      },
    ],

    status: "upcoming",
    itinerary: [
      {
        day: 1,
        date: "2024-05-01",
        location: "Kota Kinabalu",
        activities: ["Arrival", "City orientation", "Equipment briefing"],
        accommodation: "Sabah Lodge",
        meals: ["Dinner"],
      },
      {
        day: 2,
        date: "2024-05-02",
        location: "Kinabalu National Park",
        activities: [
          "Mount Kinabalu base trek",
          "Botanical garden tour",
          "Wildlife spotting",
        ],

        accommodation: "Mountain Lodge",
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
    ],

    emergencyContacts: [
      {
        name: "TMPL Escapade Emergency",
        role: "24/7 Support",
        phone: "+60196616388",
        email: "emergency@tmplescapade.my",
      },
      {
        name: "Sabah Parks Emergency",
        role: "Park Rangers",
        phone: "+60-88-211881",
        email: "emergency@sabahparks.org.my",
      },
    ],

    specialInstructions:
      "Wildlife photography tour - bring telephoto lenses and be prepared for early morning starts",
    equipmentNeeded: [
      "First aid kit",
      "Binoculars",
      "Wildlife reference guide",
      "Emergency satellite phone",
    ],

    transportationDetails: {
      type: "4WD vehicles",
      details: "Two 4WD vehicles for rough terrain",
      pickupTime: "06:00",
      pickupLocation: "Hotel lobby",
    },
    createdAt: "2024-03-10T08:00:00Z",
    updatedAt: "2024-03-15T16:00:00Z",
  },
  // Additional assignments to create conflicts for testing
  {
    id: "TGA004",
    tourGuideId: "TG001", // Alex Thompson (same as TGA001)
    tourGuideName: "Alex Thompson",
    packageId: "PKG004",
    packageName: "Korea Cultural Experience",
    bookingId: "BK004",
    destination: {
      name: "Seoul, Busan",
      country: "South Korea",
      continent: "Asia",
    },
    tourDates: {
      startDate: "2024-04-18", // Overlaps with TGA001 (April 15-22)
      endDate: "2024-04-24",
      duration: 7,
    },
    groupSize: 10,
    customers: [
      {
        id: "USR010",
        name: "Michael Chen",
        phone: "+60123456789",
        email: "michael.chen@email.com",
      },
    ],

    status: "upcoming",
    itinerary: [
      {
        day: 1,
        date: "2024-04-18",
        location: "Seoul",
        activities: ["Arrival", "City tour"],
        accommodation: "Seoul Hotel",
        meals: ["Dinner"],
      },
    ],

    emergencyContacts: [
      {
        name: "TMPL Escapade Emergency",
        role: "24/7 Support",
        phone: "+60196616388",
        email: "emergency@tmplescapade.my",
      },
    ],

    createdAt: "2024-03-12T10:00:00Z",
    updatedAt: "2024-03-15T18:00:00Z",
  },
  {
    id: "TGA005",
    tourGuideId: "TG002", // Siti Nurhaliza (same as TGA002)
    tourGuideName: "Siti Nurhaliza",
    packageId: "PKG005",
    packageName: "Singapore City Break",
    bookingId: "BK005",
    destination: {
      name: "Singapore",
      country: "Singapore",
      continent: "Asia",
    },
    tourDates: {
      startDate: "2024-04-22", // Overlaps with TGA002 (April 20-25)
      endDate: "2024-04-26",
      duration: 5,
    },
    groupSize: 6,
    customers: [
      {
        id: "USR011",
        name: "Sarah Johnson",
        phone: "+65987654321",
        email: "sarah.johnson@email.com",
      },
    ],

    status: "upcoming",
    itinerary: [
      {
        day: 1,
        date: "2024-04-22",
        location: "Singapore",
        activities: ["Marina Bay", "Gardens by the Bay"],
        accommodation: "Marina Bay Hotel",
        meals: ["Lunch", "Dinner"],
      },
    ],

    emergencyContacts: [
      {
        name: "TMPL Escapade Emergency",
        role: "24/7 Support",
        phone: "+60196616388",
        email: "emergency@tmplescapade.my",
      },
    ],

    createdAt: "2024-03-14T09:00:00Z",
    updatedAt: "2024-03-15T20:00:00Z",
  },
];

// Helper function to get assignments for a specific tour guide
export const getAssignmentsForTourGuide = (
  tourGuideId: string
): TourGuideAssignment[] => {
  return tourGuideAssignments.filter(
    (assignment) => assignment.tourGuideId === tourGuideId
  );
};

// Helper function to get upcoming assignments for a tour guide
export const getUpcomingAssignments = (
  tourGuideId: string
): TourGuideAssignment[] => {
  return tourGuideAssignments
    .filter(
      (assignment) =>
        assignment.tourGuideId === tourGuideId &&
        assignment.status === "upcoming" &&
        new Date(assignment.tourDates.startDate) > new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.tourDates.startDate).getTime() -
        new Date(b.tourDates.startDate).getTime()
    );
};

// Helper function to get current assignment (in progress)
export const getCurrentAssignment = (
  tourGuideId: string
): TourGuideAssignment | null => {
  const currentAssignment = tourGuideAssignments.find(
    (assignment) =>
      assignment.tourGuideId === tourGuideId &&
      assignment.status === "in_progress"
  );
  return currentAssignment || null;
};

// Helper function to get tour guide schedule summary
export const getTourGuideSchedule = (
  tourGuideId: string
): TourGuideSchedule | null => {
  const assignments = getAssignmentsForTourGuide(tourGuideId);
  const upcomingAssignments = getUpcomingAssignments(tourGuideId);
  const currentAssignment = getCurrentAssignment(tourGuideId);

  if (assignments.length === 0) return null;

  const tourGuide = assignments[0]; // Get tour guide info from first assignment
  const completedAssignments = assignments.filter(
    (a) => a.status === "completed"
  ).length;
  const totalCustomers = assignments.reduce((sum, a) => sum + a.groupSize, 0);

  const nextAssignment = upcomingAssignments[0];
  let nextAssignmentInfo = null;

  if (nextAssignment) {
    const startDate = new Date(nextAssignment.tourDates.startDate);
    const today = new Date();
    const daysUntil = Math.ceil(
      (startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    nextAssignmentInfo = {
      assignmentId: nextAssignment.id,
      destination: nextAssignment.destination.name,
      startDate: nextAssignment.tourDates.startDate,
      daysUntilDeparture: daysUntil,
    };
  }

  return {
    tourGuideId,
    tourGuideName: tourGuide.tourGuideName,
    currentLocation: currentAssignment?.destination.name,
    nextAssignment: nextAssignmentInfo,
    upcomingAssignments,
    completedAssignments,
    totalCustomersGuided: totalCustomers,
    averageRating: 4.8, // This would come from customer feedback
    specialties: [
      "Cultural Tours",
      "Adventure Tourism",
      "Wildlife Expeditions",
    ],

    languages: ["English", "Malay", "Mandarin"],
  };
};

export default {
  tourGuideAssignments,
  getAssignmentsForTourGuide,
  getUpcomingAssignments,
  getCurrentAssignment,
  getTourGuideSchedule,
};
