export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  images: {
    hero: string;
    gallery: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  climate: {
    bestTime: string;
    temperature: {
      min: number;
      max: number;
    };
    season: string;
  };
  attractions: {
    id: string;
    name: string;
    type: string;
    rating: number;
    description: string;
  }[];
  packages: {
    total: number;
    active: number;
  };
  popularity: {
    rank: number;
    bookings: number;
    rating: number;
    reviews: number;
  };
  status: "active" | "inactive" | "seasonal";
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DestinationStats {
  totalDestinations: number;
  activeDestinations: number;
  totalBookings: number;
  averageRating: number;
  continentDistribution: {
    [continent: string]: number;
  };
  popularityTrends: {
    month: string;
    bookings: number;
    revenue: number;
  }[];
}

export const destinations: Destination[] = [
  {
    id: "dest-001",
    name: "Kuala Lumpur",
    country: "Malaysia",
    continent: "Asia",
    description:
      "The vibrant capital city of Malaysia, known for its iconic Petronas Twin Towers, diverse culture, and amazing street food.",
    images: {
      hero: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      ],
    },
    coordinates: {
      latitude: 3.139,
      longitude: 101.6869,
    },
    climate: {
      bestTime: "May - July, December - February",
      temperature: {
        min: 24,
        max: 33,
      },
      season: "Tropical",
    },
    attractions: [
      {
        id: "attr-001",
        name: "Petronas Twin Towers",
        type: "Landmark",
        rating: 4.5,
        description: "Iconic twin skyscrapers and symbol of Malaysia",
      },
      {
        id: "attr-002",
        name: "Batu Caves",
        type: "Religious Site",
        rating: 4.3,
        description: "Hindu temple complex in limestone caves",
      },
      {
        id: "attr-003",
        name: "Central Market",
        type: "Shopping",
        rating: 4.1,
        description: "Cultural heritage site with local crafts and food",
      },
    ],

    packages: {
      total: 24,
      active: 18,
    },
    popularity: {
      rank: 1,
      bookings: 1456,
      rating: 4.4,
      reviews: 892,
    },
    status: "active",
    tags: ["city", "culture", "food", "shopping", "business"],
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "dest-002",
    name: "Langkawi",
    country: "Malaysia",
    continent: "Asia",
    description:
      "A tropical paradise archipelago known for its pristine beaches, duty-free shopping, and stunning natural landscapes.",
    images: {
      hero: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      ],
    },
    coordinates: {
      latitude: 6.35,
      longitude: 99.8,
    },
    climate: {
      bestTime: "November - April",
      temperature: {
        min: 25,
        max: 32,
      },
      season: "Tropical",
    },
    attractions: [
      {
        id: "attr-004",
        name: "Langkawi Sky Bridge",
        type: "Adventure",
        rating: 4.6,
        description: "Curved pedestrian bridge with panoramic views",
      },
      {
        id: "attr-005",
        name: "Pantai Cenang",
        type: "Beach",
        rating: 4.4,
        description: "Popular beach with water sports and nightlife",
      },
      {
        id: "attr-006",
        name: "Kilim Karst Geoforest Park",
        type: "Nature",
        rating: 4.5,
        description: "UNESCO Global Geopark with mangroves and caves",
      },
    ],

    packages: {
      total: 18,
      active: 15,
    },
    popularity: {
      rank: 2,
      bookings: 1234,
      rating: 4.6,
      reviews: 756,
    },
    status: "active",
    tags: ["beach", "island", "nature", "adventure", "relaxation"],
    createdAt: "2023-02-20T10:15:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
  },
  {
    id: "dest-003",
    name: "Penang",
    country: "Malaysia",
    continent: "Asia",
    description:
      "UNESCO World Heritage site famous for its colonial architecture, street art, and incredible food scene.",
    images: {
      hero: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      ],
    },
    coordinates: {
      latitude: 5.4164,
      longitude: 100.3327,
    },
    climate: {
      bestTime: "December - March",
      temperature: {
        min: 24,
        max: 32,
      },
      season: "Tropical",
    },
    attractions: [
      {
        id: "attr-007",
        name: "George Town",
        type: "Heritage",
        rating: 4.7,
        description: "UNESCO World Heritage historic city center",
      },
      {
        id: "attr-008",
        name: "Penang Hill",
        type: "Nature",
        rating: 4.2,
        description: "Hill station with funicular railway and city views",
      },
      {
        id: "attr-009",
        name: "Gurney Drive",
        type: "Food",
        rating: 4.5,
        description: "Famous food court and hawker center",
      },
    ],

    packages: {
      total: 16,
      active: 12,
    },
    popularity: {
      rank: 3,
      bookings: 987,
      rating: 4.5,
      reviews: 623,
    },
    status: "active",
    tags: ["heritage", "food", "culture", "art", "history"],
    createdAt: "2023-03-10T12:30:00Z",
    updatedAt: "2024-01-05T11:20:00Z",
  },
  {
    id: "dest-004",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    description:
      "Island of the Gods, known for its stunning temples, rice terraces, beaches, and vibrant Hindu culture.",
    images: {
      hero: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop",
      ],
    },
    coordinates: {
      latitude: -8.4095,
      longitude: 115.1889,
    },
    climate: {
      bestTime: "April - October",
      temperature: {
        min: 24,
        max: 31,
      },
      season: "Tropical",
    },
    attractions: [
      {
        id: "attr-010",
        name: "Tanah Lot Temple",
        type: "Religious Site",
        rating: 4.4,
        description: "Iconic sea temple on a rock formation",
      },
      {
        id: "attr-011",
        name: "Tegallalang Rice Terraces",
        type: "Nature",
        rating: 4.6,
        description: "Beautiful terraced rice fields in Ubud",
      },
      {
        id: "attr-012",
        name: "Seminyak Beach",
        type: "Beach",
        rating: 4.3,
        description: "Upscale beach area with resorts and dining",
      },
    ],

    packages: {
      total: 22,
      active: 19,
    },
    popularity: {
      rank: 4,
      bookings: 1567,
      rating: 4.7,
      reviews: 1234,
    },
    status: "active",
    tags: ["beach", "culture", "temples", "nature", "wellness"],
    createdAt: "2023-01-25T09:45:00Z",
    updatedAt: "2024-01-12T13:15:00Z",
  },
  {
    id: "dest-005",
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    description:
      "Modern metropolis blending traditional culture with cutting-edge technology, famous for its cuisine, shopping, and pop culture.",
    images: {
      hero: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop",
      ],
    },
    coordinates: {
      latitude: 35.6762,
      longitude: 139.6503,
    },
    climate: {
      bestTime: "March - May, September - November",
      temperature: {
        min: 5,
        max: 30,
      },
      season: "Temperate",
    },
    attractions: [
      {
        id: "attr-013",
        name: "Senso-ji Temple",
        type: "Religious Site",
        rating: 4.5,
        description: "Ancient Buddhist temple in Asakusa",
      },
      {
        id: "attr-014",
        name: "Shibuya Crossing",
        type: "Landmark",
        rating: 4.2,
        description: "World's busiest pedestrian crossing",
      },
      {
        id: "attr-015",
        name: "Tsukiji Outer Market",
        type: "Food",
        rating: 4.6,
        description: "Famous fish market and street food",
      },
    ],

    packages: {
      total: 28,
      active: 24,
    },
    popularity: {
      rank: 5,
      bookings: 1345,
      rating: 4.8,
      reviews: 1567,
    },
    status: "active",
    tags: ["city", "culture", "technology", "food", "shopping"],
    createdAt: "2023-02-14T11:00:00Z",
    updatedAt: "2024-01-09T15:30:00Z",
  },
  {
    id: "dest-006",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    description:
      "Stunning Greek island known for its white-washed buildings, blue domes, spectacular sunsets, and volcanic landscapes.",
    images: {
      hero: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop",
      ],
    },
    coordinates: {
      latitude: 36.3932,
      longitude: 25.4615,
    },
    climate: {
      bestTime: "April - October",
      temperature: {
        min: 15,
        max: 28,
      },
      season: "Mediterranean",
    },
    attractions: [
      {
        id: "attr-016",
        name: "Oia Village",
        type: "Village",
        rating: 4.8,
        description: "Picturesque village famous for sunsets",
      },
      {
        id: "attr-017",
        name: "Red Beach",
        type: "Beach",
        rating: 4.3,
        description: "Unique beach with red volcanic sand",
      },
      {
        id: "attr-018",
        name: "Akrotiri Archaeological Site",
        type: "Historical",
        rating: 4.4,
        description: "Ancient Minoan Bronze Age settlement",
      },
    ],

    packages: {
      total: 14,
      active: 11,
    },
    popularity: {
      rank: 6,
      bookings: 876,
      rating: 4.9,
      reviews: 654,
    },
    status: "seasonal",
    tags: ["island", "romance", "sunset", "architecture", "wine"],
    createdAt: "2023-03-20T14:20:00Z",
    updatedAt: "2024-01-07T10:45:00Z",
  },
];

export const destinationStats: DestinationStats = {
  totalDestinations: 45,
  activeDestinations: 38,
  totalBookings: 8567,
  averageRating: 4.5,
  continentDistribution: {
    Asia: 28,
    Europe: 12,
    "North America": 3,
    "South America": 1,
    Africa: 1,
  },
  popularityTrends: [
    { month: "Jul", bookings: 1234, revenue: 2450000 },
    { month: "Aug", bookings: 1456, revenue: 2890000 },
    { month: "Sep", bookings: 1123, revenue: 2230000 },
    { month: "Oct", bookings: 987, revenue: 1960000 },
    { month: "Nov", bookings: 1345, revenue: 2670000 },
    { month: "Dec", bookings: 1567, revenue: 3120000 },
  ],
};

export const continents = [
  "All Continents",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Oceania",
];

export const destinationStatuses = [
  "All Statuses",
  "active",
  "inactive",
  "seasonal",
];

export const attractionTypes = [
  "All Types",
  "Landmark",
  "Beach",
  "Nature",
  "Religious Site",
  "Heritage",
  "Food",
  "Adventure",
  "Shopping",
  "Historical",
  "Village",
];

// Helper functions for package management integration
export const getDestinationsForPackageSelection = () => {
  return destinations
    .filter((dest) => dest.status === "active")
    .map((dest) => ({
      id: dest.id,
      name: dest.name,
      country: dest.country,
      continent: dest.continent,
      label: `${dest.name}, ${dest.country}`,
      value: dest.id,
    }));
};

export const getCountriesByContinent = (continent: string) => {
  const countries = destinations
    .filter((dest) => dest.continent === continent && dest.status === "active")
    .map((dest) => dest.country);
  return [...new Set(countries)]; // Remove duplicates
};

export const getCitiesByCountry = (country: string) => {
  return destinations
    .filter((dest) => dest.country === country && dest.status === "active")
    .map((dest) => ({
      id: dest.id,
      name: dest.name,
      label: dest.name,
      value: dest.id,
    }));
};

// Default export for the module
export default {
  destinations,
  destinationStats,
  continents,
  destinationStatuses,
  attractionTypes,
  getDestinationsForPackageSelection,
  getCountriesByContinent,
  getCitiesByCountry,
};
