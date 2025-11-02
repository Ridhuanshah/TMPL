import {
  PackageBookingDate,
  TravelAgent,
} from "@/polymet/data/travel-agent-data";

export interface DailyItineraryItem {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
  location: {
    from: string;
    to: string;
  };
  isOptional: boolean;
  optionalPrice?: number;
}

export interface TravelTip {
  id: string;
  title: string;
  description: string;
}

export interface EssentialItem {
  id: string;
  text: string;
}

export interface TravelPackage {
  id: string;
  name: string;
  description: string;
  continent: string;
  country: string;
  duration: number;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Extreme";
  groupSize: {
    min: number;
    max: number;
  };
  pricing: {
    basePrice: number;
    currency: string;
  };
  status: "active" | "inactive" | "draft" | "sold_out";
  category: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  images: {
    hero: string;
    gallery: string[];
  };
  pdfItinerary?: string;
  availability: {
    startDate: string;
    endDate: string;
    capacity: number;
    booked: number;
  };
  bookingDates: PackageBookingDate[];
  dailyItinerary: DailyItineraryItem[];
  travelTips: TravelTip[];
  essentialItems: EssentialItem[];
  createdAt: string;
  updatedAt: string;
  bookings: number;
  revenue: number;
  rating: number;
  reviews: number;
}

export const travelPackages: TravelPackage[] = [
  {
    id: "pkg_001",
    name: "Himalayan Base Camp Trek",
    description:
      "Experience the ultimate adventure with our 14-day trek to Everest Base Camp. Journey through stunning landscapes, Sherpa villages, and witness the world's highest peak up close. This challenging trek takes you through diverse terrains, from lush forests to alpine meadows, culminating at the iconic Everest Base Camp at 5,364 meters above sea level.",
    continent: "Asia",
    country: "Nepal",
    duration: 14,
    difficulty: "Challenging",
    groupSize: { min: 6, max: 12 },
    pricing: { basePrice: 4500, currency: "RM" },
    status: "active",
    category: "Trekking",
    highlights: [
      "Everest Base Camp at 5,364m altitude",
      "Sherpa culture immersion in traditional villages",
      "Stunning Himalayan mountain panoramas",
      "Professional certified mountain guide",
      "Sagarmatha National Park exploration",
      "Tengboche Monastery visit",
    ],

    inclusions: [
      "Professional certified trekking guide",
      "Accommodation in mountain tea houses",
      "All meals during the trek (breakfast, lunch, dinner)",
      "Sagarmatha National Park permits and entry fees",
      "Kathmandu airport transfers",
      "First aid kit and emergency oxygen",
      "Porter services for main luggage",
      "Domestic flights Kathmandu-Lukla-Kathmandu",
    ],

    exclusions: [
      "International flights to/from Kathmandu",
      "Personal trekking equipment and gear",
      "Comprehensive travel and medical insurance",
      "Personal expenses and souvenirs",
      "Tips for guides, porters, and local staff",
      "Emergency helicopter evacuation",
      "Alcoholic beverages and soft drinks",
      "Extra nights in Kathmandu",
    ],

    images: {
      hero: "https://picsum.photos/seed/himalaya-hero/1200/800",
      gallery: [
        "https://picsum.photos/seed/himalaya-1/800/600",
        "https://picsum.photos/seed/himalaya-2/800/600",
        "https://picsum.photos/seed/himalaya-3/800/600",
        "https://picsum.photos/seed/himalaya-4/800/600",
      ],
    },
    pdfItinerary: "/sample-itinerary.pdf",
    availability: {
      startDate: "2024-03-15",
      endDate: "2024-11-30",
      capacity: 48,
      booked: 32,
    },
    bookingDates: [
      {
        id: "date_001_1",
        startDate: "2024-04-15",
        endDate: "2024-04-28",
        capacity: 12,
        booked: 8,
        status: "active",
        price: 4500,
        flightType: "economy",
        flightCompany: "Nepal Airlines",
        tripCode: "EBC-APR-001",
        agents: {
          companions: ["agent_001", "agent_003"],
        },
      },
      {
        id: "date_001_2",
        startDate: "2024-05-20",
        endDate: "2024-06-02",
        capacity: 12,
        booked: 10,
        status: "active",
        price: 4500,
        flightType: "economy",
        flightCompany: "Nepal Airlines",
        tripCode: "EBC-MAY-002",
        agents: {
          companions: ["agent_002", "agent_004"],
        },
      },
      {
        id: "date_001_3",
        startDate: "2024-09-15",
        endDate: "2024-09-28",
        capacity: 12,
        booked: 6,
        status: "active",
        price: 4500,
        flightType: "economy",
        flightCompany: "Nepal Airlines",
        tripCode: "EBC-SEP-003",
        agents: {
          companions: ["agent_001", "agent_005"],
        },
      },
      {
        id: "date_001_4",
        startDate: "2024-10-20",
        endDate: "2024-11-02",
        capacity: 12,
        booked: 4,
        status: "active",
        price: 4500,
        flightType: "economy",
        flightCompany: "Nepal Airlines",
        tripCode: "EBC-OCT-004",
        agents: {
          companions: ["agent_003", "agent_006"],
        },
      },
    ],

    dailyItinerary: [
      {
        id: "day_001_1",
        dayNumber: 1,
        title: "Arrival in Kathmandu",
        description:
          "Arrive at Tribhuvan International Airport, meet your guide, and transfer to hotel. Evening briefing about the trek.",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Trek briefing",
          "Equipment check",
        ],

        location: { from: "Airport", to: "Kathmandu Hotel" },
        isOptional: false,
      },
      {
        id: "day_001_2",
        dayNumber: 2,
        title: "Fly to Lukla, Trek to Phakding",
        description:
          "Early morning flight to Lukla (2,840m). Begin trek through beautiful landscapes to Phakding village.",
        activities: [
          "Domestic flight",
          "Trek start",
          "Village exploration",
          "Sherpa culture",
        ],

        location: { from: "Kathmandu", to: "Phakding (2,610m)" },
        isOptional: false,
      },
      {
        id: "day_001_3",
        dayNumber: 3,
        title: "Phakding to Namche Bazaar",
        description:
          "Trek through pine forests and cross suspension bridges. Arrive at the famous Sherpa capital, Namche Bazaar.",
        activities: [
          "Suspension bridge crossing",
          "Pine forest trek",
          "Sherpa market visit",
          "Acclimatization",
        ],

        location: { from: "Phakding (2,610m)", to: "Namche Bazaar (3,440m)" },
        isOptional: false,
      },
      {
        id: "day_001_4",
        dayNumber: 4,
        title: "Acclimatization Day in Namche",
        description:
          "Rest day for acclimatization. Optional hike to Everest View Hotel for stunning mountain views.",
        activities: [
          "Acclimatization hike",
          "Sherpa museum visit",
          "Local market exploration",
          "Mountain views",
        ],

        location: { from: "Namche Bazaar", to: "Namche Bazaar" },
        isOptional: true,
        optionalPrice: 150,
      },
    ],

    travelTips: [
      {
        id: "tip_001_1",
        title: "Altitude Acclimatization",
        description:
          "Ascend slowly and allow your body time to adjust. Drink plenty of water and avoid alcohol during the trek.",
      },
      {
        id: "tip_001_2",
        title: "Physical Preparation",
        description:
          "Start training at least 2-3 months before the trek. Focus on cardiovascular fitness and leg strength exercises.",
      },
      {
        id: "tip_001_3",
        title: "Weather Considerations",
        description:
          "Weather can change rapidly in the mountains. Always carry layers and be prepared for cold temperatures, especially at night.",
      },
      {
        id: "tip_001_4",
        title: "Cultural Respect",
        description:
          "Respect local customs and traditions. Always ask permission before photographing people and religious sites.",
      },
    ],

    essentialItems: [
      {
        id: "item_001_1",
        text: "High-quality trekking boots (broken in)",
      },
      {
        id: "item_001_2",
        text: "Warm sleeping bag (-15°C rating)",
      },
      {
        id: "item_001_3",
        text: "Layered clothing system (base, insulation, shell)",
      },
      {
        id: "item_001_4",
        text: "Sunglasses and high SPF sunscreen",
      },
      {
        id: "item_001_5",
        text: "Water purification tablets or filter",
      },
      {
        id: "item_001_6",
        text: "Personal first aid kit and medications",
      },
      {
        id: "item_001_7",
        text: "Headlamp with extra batteries",
      },
      {
        id: "item_001_8",
        text: "Trekking poles for stability",
      },
    ],

    createdAt: "2024-01-15",
    updatedAt: "2024-02-10",
    bookings: 89,
    revenue: 445000,
    rating: 4.8,
    reviews: 67,
  },
  {
    id: "pkg_002",
    name: "African Safari Adventure",
    description:
      "Embark on an unforgettable 10-day safari across Kenya and Tanzania. Witness the Great Migration, Big Five animals, and experience authentic African culture. This luxury safari takes you through world-renowned national parks including Masai Mara, Serengeti, and Ngorongoro Crater, offering unparalleled wildlife viewing opportunities.",
    continent: "Africa",
    country: "Kenya/Tanzania",
    duration: 10,
    difficulty: "Easy",
    groupSize: { min: 4, max: 8 },
    pricing: { basePrice: 6200, currency: "RM" },
    status: "active",
    category: "Safari",
    highlights: [
      "Great Migration witness in Masai Mara",
      "Big Five animal spotting opportunities",
      "Luxury safari lodges with panoramic views",
      "Authentic Masai cultural village visits",
      "Ngorongoro Crater exploration",
      "Professional wildlife photography guidance",
    ],

    inclusions: [
      "Luxury safari lodge accommodation with full board",
      "All meals and non-alcoholic beverages",
      "Professional English-speaking safari guide",
      "Daily game drives in 4x4 safari vehicles",
      "Nairobi airport transfers and domestic flights",
      "All national park entrance fees and conservancy fees",
      "Cultural village visit and traditional lunch",
      "Professional wildlife photography tips and guidance",
    ],

    exclusions: [
      "International flights to/from Nairobi",
      "Kenya and Tanzania visa fees",
      "Comprehensive travel and medical insurance",
      "Personal expenses and souvenirs",
      "Premium alcoholic beverages and imported drinks",
      "Optional hot air balloon safari",
      "Tips for guides, drivers, and lodge staff",
      "Laundry services at lodges",
    ],

    images: {
      hero: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400",
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400",
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400",
        "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400",
      ],
    },
    availability: {
      startDate: "2024-06-01",
      endDate: "2024-10-31",
      capacity: 32,
      booked: 28,
    },
    bookingDates: [
      {
        id: "date_002_1",
        startDate: "2024-07-15",
        endDate: "2024-07-24",
        capacity: 8,
        booked: 6,
        status: "active",
        price: 6200,
        flightType: "business",
        flightCompany: "Kenya Airways",
        tripCode: "SAF-JUL-001",
        agents: {
          companions: ["agent_007", "agent_008"],
        },
      },
      {
        id: "date_002_2",
        startDate: "2024-08-20",
        endDate: "2024-08-29",
        capacity: 8,
        booked: 8,
        status: "full",
        price: 6200,
        flightType: "business",
        flightCompany: "Kenya Airways",
        tripCode: "SAF-AUG-002",
        agents: {
          companions: ["agent_002", "agent_009"],
        },
      },
      {
        id: "date_002_3",
        startDate: "2024-09-25",
        endDate: "2024-10-04",
        capacity: 8,
        booked: 4,
        status: "active",
        price: 6200,
        flightType: "business",
        flightCompany: "Kenya Airways",
        tripCode: "SAF-SEP-003",
        agents: {
          companions: ["agent_001", "agent_010"],
        },
      },
      {
        id: "date_002_4",
        startDate: "2024-11-10",
        endDate: "2024-11-19",
        capacity: 8,
        booked: 2,
        status: "active",
        price: 6200,
        flightType: "business",
        flightCompany: "Kenya Airways",
        tripCode: "SAF-NOV-004",
        agents: {
          companions: ["agent_007", "agent_003"],
        },
      },
    ],

    dailyItinerary: [
      {
        id: "day_002_1",
        dayNumber: 1,
        title: "Arrival in Nairobi",
        description:
          "Arrive at Jomo Kenyatta International Airport, meet your safari guide, and transfer to luxury hotel. Evening welcome dinner and safari briefing.",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Welcome dinner",
          "Safari briefing",
        ],

        location: { from: "Airport", to: "Nairobi Hotel" },
        isOptional: false,
      },
      {
        id: "day_002_2",
        dayNumber: 2,
        title: "Nairobi to Masai Mara",
        description:
          "Morning departure to Masai Mara National Reserve. Afternoon game drive to spot the Big Five and witness the Great Migration.",
        activities: [
          "Scenic drive",
          "Game drive",
          "Wildlife photography",
          "Sunset viewing",
        ],

        location: { from: "Nairobi", to: "Masai Mara Lodge" },
        isOptional: false,
      },
      {
        id: "day_002_3",
        dayNumber: 3,
        title: "Full Day Masai Mara Safari",
        description:
          "Full day exploring Masai Mara with morning and afternoon game drives. Visit to authentic Masai village for cultural experience.",
        activities: [
          "Morning game drive",
          "Masai village visit",
          "Traditional lunch",
          "Afternoon game drive",
        ],

        location: { from: "Masai Mara Lodge", to: "Masai Mara Lodge" },
        isOptional: false,
      },
      {
        id: "day_002_4",
        dayNumber: 4,
        title: "Hot Air Balloon Safari (Optional)",
        description:
          "Optional early morning hot air balloon safari over the Mara plains, followed by champagne breakfast in the wilderness.",
        activities: [
          "Hot air balloon",
          "Aerial photography",
          "Champagne breakfast",
          "Game drive",
        ],

        location: { from: "Masai Mara Lodge", to: "Masai Mara Lodge" },
        isOptional: true,
        optionalPrice: 450,
      },
    ],

    travelTips: [
      {
        id: "tip_002_1",
        title: "Best Wildlife Viewing Times",
        description:
          "Early morning (6-10 AM) and late afternoon (4-7 PM) offer the best wildlife viewing opportunities when animals are most active.",
      },
      {
        id: "tip_002_2",
        title: "Photography Equipment",
        description:
          "Bring a camera with telephoto lens (200-400mm recommended) for wildlife photography. Extra batteries and memory cards are essential.",
      },
      {
        id: "tip_002_3",
        title: "Clothing Recommendations",
        description:
          "Wear neutral-colored clothing (khaki, brown, green) to blend with the environment. Avoid bright colors that might disturb wildlife.",
      },
      {
        id: "tip_002_4",
        title: "Health Precautions",
        description:
          "Consult your doctor about malaria prophylaxis and required vaccinations at least 4-6 weeks before travel.",
      },
    ],

    essentialItems: [
      {
        id: "item_002_1",
        text: "Binoculars for wildlife viewing (8x32 or 10x42)",
      },
      {
        id: "item_002_2",
        text: "Camera with telephoto lens and extra batteries",
      },
      {
        id: "item_002_3",
        text: "Neutral-colored safari clothing (long sleeves recommended)",
      },
      {
        id: "item_002_4",
        text: "Wide-brimmed hat and high SPF sunscreen",
      },
      {
        id: "item_002_5",
        text: "Insect repellent (DEET-based)",
      },
      {
        id: "item_002_6",
        text: "Comfortable walking shoes and sandals",
      },
      {
        id: "item_002_7",
        text: "Light jacket for early morning game drives",
      },
      {
        id: "item_002_8",
        text: "Personal medications and basic first aid kit",
      },
    ],

    createdAt: "2024-01-20",
    updatedAt: "2024-02-05",
    bookings: 76,
    revenue: 380000,
    rating: 4.9,
    reviews: 54,
  },
  {
    id: "pkg_003",
    name: "Antarctic Expedition Cruise",
    description:
      "Join our exclusive 12-day expedition to Antarctica. Experience pristine wilderness, incredible wildlife, and the most remote continent on Earth. This luxury expedition cruise takes you through the Drake Passage to the Antarctic Peninsula, where you'll encounter massive icebergs, diverse wildlife, and breathtaking landscapes in the world's last great wilderness.",
    continent: "Antarctica",
    country: "Antarctica",
    duration: 12,
    difficulty: "Moderate",
    groupSize: { min: 20, max: 100 },
    pricing: { basePrice: 15000, currency: "RM" },
    status: "active",
    category: "Expedition",
    highlights: [
      "Emperor and Adelie penguin colonies encounters",
      "Zodiac boat excursions through ice fields",
      "Expert naturalist and marine biologist guides",
      "Luxury ice-class expedition ship with panoramic views",
      "Drake Passage crossing adventure",
      "Educational lectures on Antarctic ecosystem",
    ],

    inclusions: [
      "Luxury expedition ship accommodation with ocean view",
      "All gourmet meals and premium beverages",
      "Expert naturalist and marine biologist guides",
      "Daily Zodiac excursions and landings",
      "Comprehensive educational lecture program",
      "Complimentary waterproof expedition jacket and boots",
      "All shore excursions and wildlife viewing",
      "Onboard expedition team and photography workshops",
    ],

    exclusions: [
      "International flights to Ushuaia departure port",
      "Pre and post cruise accommodation in Argentina",
      "Comprehensive travel and evacuation insurance",
      "Personal expenses and spa services",
      "Crew and expedition team gratuities",
      "Optional kayaking and camping experiences",
      "Premium alcoholic beverages and specialty dining",
      "Satellite communication and internet charges",
    ],

    images: {
      hero: "https://picsum.photos/seed/antarctica-hero/1200/800",
      gallery: [
        "https://picsum.photos/seed/antarctica-1/800/600",
        "https://picsum.photos/seed/antarctica-2/800/600",
        "https://picsum.photos/seed/antarctica-3/800/600",
        "https://picsum.photos/seed/antarctica-4/800/600",
        "https://picsum.photos/seed/antarctica-5/800/600",
      ],
    },
    pdfItinerary: "/sample-itinerary.pdf",
    availability: {
      startDate: "2024-11-01",
      endDate: "2025-03-31",
      capacity: 200,
      booked: 145,
    },
    bookingDates: [
      {
        id: "date_003_1",
        startDate: "2024-12-15",
        endDate: "2024-12-26",
        capacity: 100,
        booked: 85,
        status: "active",
        price: 15000,
        flightType: "business",
        flightCompany: "LATAM Airlines",
        tripCode: "ANT-DEC-001",
        agents: {
          companions: ["agent_004", "agent_011", "agent_012"],
        },
      },
      {
        id: "date_003_2",
        startDate: "2025-01-20",
        endDate: "2025-01-31",
        capacity: 100,
        booked: 60,
        status: "active",
        price: 15000,
        flightType: "business",
        flightCompany: "LATAM Airlines",
        tripCode: "ANT-JAN-002",
        agents: {
          companions: ["agent_005", "agent_013", "agent_014"],
        },
      },
      {
        id: "date_003_3",
        startDate: "2025-02-25",
        endDate: "2025-03-08",
        capacity: 100,
        booked: 35,
        status: "active",
        price: 15000,
        flightType: "business",
        flightCompany: "LATAM Airlines",
        tripCode: "ANT-FEB-003",
        agents: {
          companions: ["agent_006", "agent_015", "agent_001"],
        },
      },
    ],

    dailyItinerary: [
      {
        id: "day_003_1",
        dayNumber: 1,
        title: "Embarkation in Ushuaia",
        description:
          "Board your luxury expedition ship in Ushuaia, Argentina. Meet your expedition team and fellow travelers during welcome reception.",
        activities: [
          "Ship boarding",
          "Cabin orientation",
          "Welcome reception",
          "Safety briefing",
        ],

        location: { from: "Ushuaia Port", to: "Expedition Ship" },
        isOptional: false,
      },
      {
        id: "day_003_2",
        dayNumber: 2,
        title: "Drake Passage Crossing",
        description:
          "Cross the famous Drake Passage. Attend lectures about Antarctic wildlife and history while enjoying ocean views.",
        activities: [
          "Drake Passage crossing",
          "Wildlife lectures",
          "Ship facilities tour",
          "Photography workshop",
        ],

        location: { from: "Beagle Channel", to: "Drake Passage" },
        isOptional: false,
      },
      {
        id: "day_003_3",
        dayNumber: 3,
        title: "First Antarctic Landing",
        description:
          "Your first steps on the Antarctic continent! Zodiac landing to observe penguin colonies and pristine landscapes.",
        activities: [
          "Zodiac landing",
          "Penguin observation",
          "Ice formation study",
          "Photography session",
        ],

        location: { from: "Ship", to: "Antarctic Peninsula" },
        isOptional: false,
      },
      {
        id: "day_003_4",
        dayNumber: 4,
        title: "Optional Kayaking Experience",
        description:
          "Optional sea kayaking among icebergs and wildlife. Experience Antarctica from water level in this unique adventure.",
        activities: [
          "Sea kayaking",
          "Iceberg navigation",
          "Wildlife encounters",
          "Underwater viewing",
        ],

        location: { from: "Ship", to: "Antarctic Waters" },
        isOptional: true,
        optionalPrice: 800,
      },
    ],

    travelTips: [
      {
        id: "tip_003_1",
        title: "Layered Clothing System",
        description:
          "Pack multiple layers including thermal underwear, fleece, and waterproof outer shell. Temperatures can vary greatly throughout the day.",
      },
      {
        id: "tip_003_2",
        title: "Motion Sickness Preparation",
        description:
          "The Drake Passage can be rough. Bring motion sickness medication and consider natural remedies like ginger tablets.",
      },
      {
        id: "tip_003_3",
        title: "Photography in Extreme Cold",
        description:
          "Batteries drain quickly in cold weather. Bring extra batteries and keep them warm. Protect your camera from moisture and condensation.",
      },
      {
        id: "tip_003_4",
        title: "Environmental Responsibility",
        description:
          "Follow strict Antarctic Treaty guidelines. Take only photos, leave only footprints. Maintain safe distances from wildlife.",
      },
    ],

    essentialItems: [
      {
        id: "item_003_1",
        text: "Waterproof and windproof outer shell jacket",
      },
      {
        id: "item_003_2",
        text: "Insulated waterproof gloves and liner gloves",
      },
      {
        id: "item_003_3",
        text: "Warm hat covering ears and sun hat with brim",
      },
      {
        id: "item_003_4",
        text: "High SPF sunscreen and UV protection sunglasses",
      },
      {
        id: "item_003_5",
        text: "Motion sickness medication and personal medications",
      },
      {
        id: "item_003_6",
        text: "Camera with extra batteries and memory cards",
      },
      {
        id: "item_003_7",
        text: "Thermal underwear and warm fleece layers",
      },
      {
        id: "item_003_8",
        text: "Waterproof day pack for shore excursions",
      },
    ],

    createdAt: "2024-01-10",
    updatedAt: "2024-02-15",
    bookings: 45,
    revenue: 675000,
    rating: 4.7,
    reviews: 32,
  },
  {
    id: "pkg_004",
    name: "Amazon Rainforest Explorer",
    description:
      "Discover the incredible biodiversity of the Amazon rainforest in this 8-day eco-adventure. Stay in sustainable eco-lodges and explore with knowledgeable indigenous guides who share their ancestral wisdom about the world's most biodiverse ecosystem. Experience the magic of the Amazon through river excursions, wildlife spotting, and cultural immersion.",
    continent: "South America",
    country: "Peru",
    duration: 8,
    difficulty: "Moderate",
    groupSize: { min: 6, max: 14 },
    pricing: { basePrice: 3800, currency: "RM" },
    status: "active",
    category: "Eco-Adventure",
    highlights: [
      "Indigenous Shipibo community cultural immersion",
      "Incredible biodiversity with 3000+ species",
      "Sustainable eco-lodge accommodation on stilts",
      "Amazon River boat excursions and fishing",
      "Night jungle walks and wildlife spotting",
      "Traditional plant medicine and healing ceremonies",
    ],

    inclusions: [
      "Sustainable eco-lodge accommodation with mosquito nets",
      "All organic meals featuring local ingredients",
      "Experienced indigenous guide and naturalist",
      "Daily river boat excursions and canoe trips",
      "All wildlife watching and jungle trekking activities",
      "Iquitos airport transfers and domestic transportation",
      "Cultural activities and traditional craft workshops",
      "Rubber boots and rain gear for jungle exploration",
    ],

    exclusions: [
      "International flights to/from Lima and Iquitos",
      "Comprehensive travel and medical insurance",
      "Personal expenses and handicraft purchases",
      "Alcoholic beverages and imported soft drinks",
      "Tips for guides, boat crew, and lodge staff",
      "Optional ayahuasca ceremony participation",
      "Laundry services and satellite internet access",
      "Yellow fever vaccination (required)",
    ],

    images: {
      hero: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
      ],
    },
    availability: {
      startDate: "2024-04-01",
      endDate: "2024-09-30",
      capacity: 42,
      booked: 35,
    },
    bookingDates: [
      {
        id: "date_004_1",
        startDate: "2024-05-10",
        endDate: "2024-05-17",
        capacity: 14,
        booked: 12,
        status: "active",
        price: 3800,
        flightType: "economy",
        flightCompany: "LATAM Peru",
        tripCode: "AMZ-MAY-001",
        agents: {
          companions: ["agent_016", "agent_017"],
        },
      },
      {
        id: "date_004_2",
        startDate: "2024-06-15",
        endDate: "2024-06-22",
        capacity: 14,
        booked: 8,
        status: "active",
        price: 3800,
        flightType: "economy",
        flightCompany: "LATAM Peru",
        tripCode: "AMZ-JUN-002",
        agents: {
          companions: ["agent_018", "agent_002"],
        },
      },
      {
        id: "date_004_3",
        startDate: "2024-08-05",
        endDate: "2024-08-12",
        capacity: 14,
        booked: 6,
        status: "active",
        price: 3800,
        flightType: "economy",
        flightCompany: "LATAM Peru",
        tripCode: "AMZ-AUG-003",
        agents: {
          companions: ["agent_019", "agent_020"],
        },
      },
      {
        id: "date_004_4",
        startDate: "2024-09-20",
        endDate: "2024-09-27",
        capacity: 14,
        booked: 3,
        status: "active",
        price: 3800,
        flightType: "economy",
        flightCompany: "LATAM Peru",
        tripCode: "AMZ-SEP-004",
        agents: {
          companions: ["agent_001", "agent_016"],
        },
      },
    ],

    dailyItinerary: [
      {
        id: "day_004_1",
        dayNumber: 1,
        title: "Arrival in Iquitos",
        description:
          "Arrive in Iquitos, the gateway to the Peruvian Amazon. Transfer to eco-lodge via motorized canoe through winding tributaries.",
        activities: [
          "Airport pickup",
          "Canoe transfer",
          "Lodge orientation",
          "Welcome dinner",
        ],

        location: { from: "Iquitos Airport", to: "Amazon Eco-Lodge" },
        isOptional: false,
      },
      {
        id: "day_004_2",
        dayNumber: 2,
        title: "Amazon River Exploration",
        description:
          "Full day exploring the Amazon River system. Search for pink dolphins, sloths, and exotic birds while learning about the ecosystem.",
        activities: [
          "River boat excursion",
          "Dolphin spotting",
          "Bird watching",
          "Fishing experience",
        ],

        location: { from: "Eco-Lodge", to: "Amazon River" },
        isOptional: false,
      },
      {
        id: "day_004_3",
        dayNumber: 3,
        title: "Indigenous Community Visit",
        description:
          "Visit a Shipibo indigenous community to learn about traditional crafts, medicinal plants, and sustainable living practices.",
        activities: [
          "Community visit",
          "Traditional crafts",
          "Medicinal plant walk",
          "Cultural exchange",
        ],

        location: { from: "Eco-Lodge", to: "Shipibo Village" },
        isOptional: false,
      },
      {
        id: "day_004_4",
        dayNumber: 4,
        title: "Night Jungle Adventure",
        description:
          "Experience the Amazon after dark with a guided night walk to observe nocturnal wildlife and listen to jungle sounds.",
        activities: [
          "Night jungle walk",
          "Nocturnal wildlife",
          "Sound identification",
          "Stargazing",
        ],

        location: { from: "Eco-Lodge", to: "Primary Rainforest" },
        isOptional: false,
      },
    ],

    travelTips: [
      {
        id: "tip_004_1",
        title: "Vaccination Requirements",
        description:
          "Yellow fever vaccination is mandatory and must be received at least 10 days before travel. Consult your doctor about malaria prophylaxis.",
      },
      {
        id: "tip_004_2",
        title: "Insect Protection",
        description:
          "Bring strong insect repellent with DEET. Wear long sleeves and pants during dawn and dusk when mosquitoes are most active.",
      },
      {
        id: "tip_004_3",
        title: "Waterproof Everything",
        description:
          "Pack all electronics and important items in waterproof bags. The Amazon is humid and rain showers are common.",
      },
      {
        id: "tip_004_4",
        title: "Respect Indigenous Culture",
        description:
          "Be respectful during community visits. Ask permission before taking photos and be open to learning about traditional ways of life.",
      },
    ],

    essentialItems: [
      {
        id: "item_004_1",
        text: "Strong insect repellent with DEET (30% minimum)",
      },
      {
        id: "item_004_2",
        text: "Lightweight rain jacket and waterproof pants",
      },
      {
        id: "item_004_3",
        text: "Long-sleeved shirts and pants in light colors",
      },
      {
        id: "item_004_4",
        text: "Waterproof bags for electronics and documents",
      },
      {
        id: "item_004_5",
        text: "Binoculars for wildlife and bird watching",
      },
      {
        id: "item_004_6",
        text: "Flashlight or headlamp with extra batteries",
      },
      {
        id: "item_004_7",
        text: "Personal medications and basic first aid kit",
      },
      {
        id: "item_004_8",
        text: "Quick-dry towel and biodegradable toiletries",
      },
    ],

    createdAt: "2024-01-25",
    updatedAt: "2024-02-08",
    bookings: 67,
    revenue: 268000,
    rating: 4.6,
    reviews: 43,
  },
  {
    id: "pkg_005",
    name: "European Castle Trail",
    description:
      "Explore magnificent castles across Germany, Austria, and Czech Republic in this 12-day cultural journey through medieval Europe. Walk through centuries of history as you visit fairy-tale castles, imperial palaces, and medieval fortresses while experiencing the rich cultural heritage, traditional cuisine, and stunning architecture of Central Europe.",
    continent: "Europe",
    country: "Germany/Austria/Czech Republic",
    duration: 12,
    difficulty: "Easy",
    groupSize: { min: 8, max: 16 },
    pricing: { basePrice: 5200, currency: "RM" },
    status: "active",
    category: "Cultural",
    highlights: [
      "Neuschwanstein Castle - Disney's inspiration",
      "Prague Castle complex and St. Vitus Cathedral",
      "Salzburg's UNESCO World Heritage old town",
      "Expert art historian and local cultural guides",
      "Traditional beer gardens and wine tastings",
      "Classical music concerts in historic venues",
    ],

    inclusions: [
      "4-star boutique hotel accommodation in city centers",
      "Daily continental breakfast and 6 traditional dinners",
      "Expert art historian and certified local guides",
      "All castle and museum entrance fees",
      "Luxury coach transportation between cities",
      "Cultural activities and classical music concerts",
      "Traditional beer garden and wine cellar visits",
      "Audio headsets for guided tours",
    ],

    exclusions: [
      "International flights to/from Europe",
      "Lunches and 5 dinners for personal exploration",
      "Comprehensive travel and medical insurance",
      "Personal expenses and souvenir shopping",
      "Optional activities and spa treatments",
      "City tourist taxes and hotel incidentals",
      "Alcoholic beverages except during included tastings",
      "Gratuities for guides and drivers",
    ],

    images: {
      hero: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400",
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400",
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400",
      ],
    },
    availability: {
      startDate: "2024-05-01",
      endDate: "2024-10-15",
      capacity: 64,
      booked: 41,
    },
    bookingDates: [
      {
        id: "date_005_1",
        startDate: "2024-06-10",
        endDate: "2024-06-21",
        capacity: 16,
        booked: 12,
        status: "active",
        price: 5200,
        flightType: "premium_economy",
        flightCompany: "Lufthansa",
        tripCode: "EUR-JUN-001",
        agents: {
          companions: ["agent_021", "agent_022"],
        },
      },
      {
        id: "date_005_2",
        startDate: "2024-07-20",
        endDate: "2024-07-31",
        capacity: 16,
        booked: 14,
        status: "active",
        price: 5200,
        flightType: "premium_economy",
        flightCompany: "Lufthansa",
        tripCode: "EUR-JUL-002",
        agents: {
          companions: ["agent_023", "agent_003"],
        },
      },
      {
        id: "date_005_3",
        startDate: "2024-09-05",
        endDate: "2024-09-16",
        capacity: 16,
        booked: 8,
        status: "active",
        price: 5200,
        flightType: "premium_economy",
        flightCompany: "Lufthansa",
        tripCode: "EUR-SEP-003",
        agents: {
          companions: ["agent_024", "agent_025"],
        },
      },
      {
        id: "date_005_4",
        startDate: "2024-10-15",
        endDate: "2024-10-26",
        capacity: 16,
        booked: 5,
        status: "active",
        price: 5200,
        flightType: "premium_economy",
        flightCompany: "Lufthansa",
        tripCode: "EUR-OCT-004",
        agents: {
          companions: ["agent_004", "agent_021"],
        },
      },
    ],

    dailyItinerary: [
      {
        id: "day_005_1",
        dayNumber: 1,
        title: "Arrival in Munich",
        description:
          "Arrive in Munich, check into your boutique hotel. Evening welcome dinner with traditional Bavarian cuisine and beer tasting.",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Welcome dinner",
          "Bavarian beer tasting",
        ],

        location: { from: "Munich Airport", to: "Munich City Center" },
        isOptional: false,
      },
      {
        id: "day_005_2",
        dayNumber: 2,
        title: "Neuschwanstein Castle Day Trip",
        description:
          "Visit the fairy-tale Neuschwanstein Castle, inspiration for Disney's Sleeping Beauty Castle. Explore the romantic castle and surrounding Alpine scenery.",
        activities: [
          "Castle tour",
          "Alpine scenery",
          "Photography session",
          "Local lunch",
        ],

        location: { from: "Munich", to: "Neuschwanstein Castle" },
        isOptional: false,
      },
      {
        id: "day_005_3",
        dayNumber: 3,
        title: "Munich to Salzburg",
        description:
          "Travel to Salzburg, Mozart's birthplace. Explore the UNESCO World Heritage old town and visit Mozart's birth house.",
        activities: [
          "City transfer",
          "Old town tour",
          "Mozart house visit",
          "Classical concert",
        ],

        location: { from: "Munich", to: "Salzburg" },
        isOptional: false,
      },
      {
        id: "day_005_4",
        dayNumber: 4,
        title: "Optional Sound of Music Tour",
        description:
          "Optional full-day tour visiting filming locations from The Sound of Music movie, including Mirabell Gardens and Lake District.",
        activities: [
          "Movie locations",
          "Mirabell Gardens",
          "Lake District",
          "Singing tour",
        ],

        location: { from: "Salzburg", to: "Sound of Music Locations" },
        isOptional: true,
        optionalPrice: 120,
      },
    ],

    travelTips: [
      {
        id: "tip_005_1",
        title: "Best Time to Visit",
        description:
          "May to September offers the best weather for castle visits. Book castle tours in advance, especially for Neuschwanstein which sells out quickly.",
      },
      {
        id: "tip_005_2",
        title: "Cultural Etiquette",
        description:
          "Germans and Austrians appreciate punctuality. Learn basic greetings in German and Czech. Tipping 10% is standard in restaurants.",
      },
      {
        id: "tip_005_3",
        title: "Currency and Payments",
        description:
          "Euro is used in Germany and Austria, Czech Koruna in Czech Republic. Credit cards are widely accepted, but carry some cash for small purchases.",
      },
      {
        id: "tip_005_4",
        title: "Dress Code for Castles",
        description:
          "Wear comfortable walking shoes as castles involve lots of stairs and walking. Some religious sites require modest dress covering shoulders and knees.",
      },
    ],

    essentialItems: [
      {
        id: "item_005_1",
        text: "Comfortable walking shoes with good grip",
      },
      {
        id: "item_005_2",
        text: "Light rain jacket and umbrella",
      },
      {
        id: "item_005_3",
        text: "Camera with extra batteries and memory cards",
      },
      {
        id: "item_005_4",
        text: "Modest clothing for church and castle visits",
      },
      {
        id: "item_005_5",
        text: "Small day pack for castle tours",
      },
      {
        id: "item_005_6",
        text: "European power adapter and portable charger",
      },
      {
        id: "item_005_7",
        text: "Basic German phrase book or translation app",
      },
      {
        id: "item_005_8",
        text: "Sunglasses and sun hat for outdoor activities",
      },
    ],

    createdAt: "2024-02-01",
    updatedAt: "2024-02-12",
    bookings: 52,
    revenue: 312000,
    rating: 4.5,
    reviews: 38,
  },
  {
    id: "pkg_006",
    name: "Great Barrier Reef Dive",
    description:
      "Dive into the world's largest coral reef system with our 7-day diving adventure. Perfect for both beginners and experienced divers, this liveaboard experience takes you to pristine outer reef locations where you'll encounter vibrant coral gardens, tropical fish, sharks, rays, and sea turtles in one of the world's most biodiverse marine environments.",
    continent: "Oceania",
    country: "Australia",
    duration: 7,
    difficulty: "Easy",
    groupSize: { min: 4, max: 10 },
    pricing: { basePrice: 4200, currency: "RM" },
    status: "active",
    category: "Diving",
    highlights: [
      "UNESCO World Heritage reef diving at pristine sites",
      "Encounters with reef sharks, rays, and sea turtles",
      "Professional PADI dive instruction and certification",
      "Underwater photography workshops and equipment",
      "Night diving with bioluminescent marine life",
      "Luxury liveaboard vessel with panoramic viewing deck",
    ],

    inclusions: [
      "Luxury liveaboard dive boat accommodation (shared cabin)",
      "All gourmet meals and snacks prepared by onboard chef",
      "Professional PADI certified dive guides and instructors",
      "Complete diving equipment including wetsuit and BCD",
      "Great Barrier Reef Marine Park fees and permits",
      "Underwater photography session and digital images",
      "Up to 20 guided dives at multiple reef locations",
      "Snorkeling equipment for surface intervals",
    ],

    exclusions: [
      "Flights to/from Cairns and domestic connections",
      "Pre and post dive accommodation in Cairns",
      "Comprehensive dive and travel insurance (mandatory)",
      "Personal expenses and onboard shop purchases",
      "Alcoholic beverages and premium soft drinks",
      "PADI certification course fees (if required)",
      "Nitrox certification and specialty courses",
      "Gratuities for crew and dive guides",
    ],

    images: {
      hero: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
        "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400",
      ],
    },
    availability: {
      startDate: "2024-03-01",
      endDate: "2024-11-30",
      capacity: 40,
      booked: 22,
    },
    bookingDates: [
      {
        id: "date_006_1",
        startDate: "2024-05-15",
        endDate: "2024-05-21",
        capacity: 10,
        booked: 7,
        status: "active",
        price: 4200,
        flightType: "economy",
        flightCompany: "Jetstar Airways",
        tripCode: "GBR-MAY-001",
        agents: {
          companions: ["agent_026", "agent_027"],
        },
      },
      {
        id: "date_006_2",
        startDate: "2024-07-10",
        endDate: "2024-07-16",
        capacity: 10,
        booked: 8,
        status: "active",
        price: 4200,
        flightType: "economy",
        flightCompany: "Jetstar Airways",
        tripCode: "GBR-JUL-002",
        agents: {
          companions: ["agent_028", "agent_005"],
        },
      },
      {
        id: "date_006_3",
        startDate: "2024-09-20",
        endDate: "2024-09-26",
        capacity: 10,
        booked: 3,
        status: "active",
        price: 4200,
        flightType: "economy",
        flightCompany: "Jetstar Airways",
        tripCode: "GBR-SEP-003",
        agents: {
          companions: ["agent_029", "agent_030"],
        },
      },
      {
        id: "date_006_4",
        startDate: "2024-11-05",
        endDate: "2024-11-11",
        capacity: 10,
        booked: 2,
        status: "active",
        price: 4200,
        flightType: "economy",
        flightCompany: "Jetstar Airways",
        tripCode: "GBR-NOV-004",
        agents: {
          companions: ["agent_006", "agent_026"],
        },
      },
    ],

    dailyItinerary: [
      {
        id: "day_006_1",
        dayNumber: 1,
        title: "Departure from Cairns",
        description:
          "Board the luxury liveaboard vessel in Cairns. Safety briefing, equipment fitting, and first check-out dive at Flynn Reef.",
        activities: [
          "Boat boarding",
          "Safety briefing",
          "Equipment fitting",
          "Check-out dive",
        ],

        location: { from: "Cairns Marina", to: "Flynn Reef" },
        isOptional: false,
      },
      {
        id: "day_006_2",
        dayNumber: 2,
        title: "Milln Reef and Thetford Reef",
        description:
          "Three dives at pristine outer reef locations. Encounter coral gardens, reef sharks, and diverse tropical fish species.",
        activities: [
          "Morning dive",
          "Afternoon dive",
          "Night dive",
          "Marine life identification",
        ],

        location: { from: "Flynn Reef", to: "Milln Reef" },
        isOptional: false,
      },
      {
        id: "day_006_3",
        dayNumber: 3,
        title: "Cod Hole and Ribbon Reefs",
        description:
          "Dive with giant potato cod and explore the famous Cod Hole. Afternoon dives at Ribbon Reef formations.",
        activities: [
          "Cod Hole dive",
          "Giant cod encounters",
          "Ribbon reef exploration",
          "Photography session",
        ],

        location: { from: "Milln Reef", to: "Cod Hole" },
        isOptional: false,
      },
      {
        id: "day_006_4",
        dayNumber: 4,
        title: "Optional Nitrox Certification",
        description:
          "Optional Nitrox certification course for extended bottom times. Continue diving at pristine outer reef locations.",
        activities: [
          "Nitrox theory",
          "Certification dives",
          "Extended bottom time",
          "Advanced photography",
        ],

        location: { from: "Cod Hole", to: "Outer Reef Sites" },
        isOptional: true,
        optionalPrice: 300,
      },
    ],

    travelTips: [
      {
        id: "tip_006_1",
        title: "Diving Certification Requirements",
        description:
          "Open Water certification required. Bring your certification card and logbook. Recent diving experience within 12 months recommended.",
      },
      {
        id: "tip_006_2",
        title: "Medical Clearance",
        description:
          "Complete PADI medical form. If you answer 'yes' to any questions, you'll need medical clearance from a dive-qualified doctor.",
      },
      {
        id: "tip_006_3",
        title: "Seasickness Prevention",
        description:
          "Bring seasickness medication even if you don't usually get seasick. The outer reef can have rougher conditions than coastal waters.",
      },
      {
        id: "tip_006_4",
        title: "Underwater Photography",
        description:
          "Bring underwater camera or rent onboard. Respect marine life - don't touch or chase animals for photos. Maintain neutral buoyancy.",
      },
    ],

    essentialItems: [
      {
        id: "item_006_1",
        text: "PADI certification card and logbook",
      },
      {
        id: "item_006_2",
        text: "Reef-safe sunscreen (no oxybenzone)",
      },
      {
        id: "item_006_3",
        text: "Seasickness medication and personal medications",
      },
      {
        id: "item_006_4",
        text: "Underwater camera or GoPro with housing",
      },
      {
        id: "item_006_5",
        text: "Quick-dry towel and swimwear",
      },
      {
        id: "item_006_6",
        text: "Waterproof bag for electronics",
      },
      {
        id: "item_006_7",
        text: "Comfortable casual clothing for boat",
      },
      {
        id: "item_006_8",
        text: "Personal dive computer (recommended)",
      },
    ],

    createdAt: "2024-01-30",
    updatedAt: "2024-02-14",
    bookings: 34,
    revenue: 156000,
    rating: 4.7,
    reviews: 28,
  },
  {
    id: "pkg_007",
    name: "Rocky Mountain Adventure",
    description:
      "Experience the rugged beauty of the Canadian Rockies with hiking, wildlife viewing, and breathtaking mountain scenery in this 10-day adventure. Journey through Banff and Jasper National Parks, witness pristine alpine lakes, towering peaks, and diverse wildlife while staying in comfortable mountain lodges surrounded by some of the world's most spectacular mountain landscapes.",
    continent: "North America",
    country: "Canada",
    duration: 10,
    difficulty: "Moderate",
    groupSize: { min: 6, max: 12 },
    pricing: { basePrice: 4800, currency: "RM" },
    status: "draft",
    category: "Adventure",
    highlights: [
      "Lake Louise and Moraine Lake iconic turquoise waters",
      "Wildlife photography with bears, elk, and mountain goats",
      "Glacier skywalk and Athabasca Glacier exploration",
      "Banff and Jasper National Parks UNESCO sites",
      "Mountain hiking trails with panoramic alpine views",
      "Traditional Canadian lodge experiences",
    ],

    inclusions: [
      "Comfortable mountain lodge accommodation with mountain views",
      "All hearty meals featuring local Canadian cuisine",
      "Professional certified mountain guide and naturalist",
      "Hiking equipment including trekking poles and daypacks",
      "All national park entrance fees and permits",
      "Luxury coach transportation and airport transfers",
      "Wildlife viewing equipment and photography guidance",
      "Glacier skywalk and gondola experiences",
    ],

    exclusions: [
      "International flights to/from Calgary",
      "Comprehensive travel and medical insurance",
      "Personal expenses and souvenir shopping",
      "Alcoholic beverages except during welcome dinner",
      "Optional helicopter tours and spa treatments",
      "Tips for guides, drivers, and lodge staff",
      "Laundry services and internet access",
      "Personal hiking gear and outdoor clothing",
    ],

    images: {
      hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
        "https://images.unsplash.com/photo-1464822759844-d150ad6d1dff?w=400",
        "https://images.unsplash.com/photo-1486022119026-a1e7d2d17b7b?w=400",
      ],
    },
    availability: {
      startDate: "2024-06-15",
      endDate: "2024-09-15",
      capacity: 36,
      booked: 0,
    },
    bookingDates: [
      {
        id: "date_007_1",
        startDate: "2024-07-01",
        endDate: "2024-07-10",
        capacity: 12,
        booked: 0,
        status: "active",
        price: 4800,
        flightType: "economy",
        flightCompany: "Air Canada",
        tripCode: "RMT-JUL-001",
        agents: {
          companions: ["agent_031", "agent_032"],
        },
      },
      {
        id: "date_007_2",
        startDate: "2024-08-15",
        endDate: "2024-08-24",
        capacity: 12,
        booked: 0,
        status: "active",
        price: 4800,
        flightType: "economy",
        flightCompany: "Air Canada",
        tripCode: "RMT-AUG-002",
        agents: {
          companions: ["agent_033", "agent_007"],
        },
      },
      {
        id: "date_007_3",
        startDate: "2024-09-10",
        endDate: "2024-09-19",
        capacity: 12,
        booked: 0,
        status: "active",
        price: 4800,
        flightType: "economy",
        flightCompany: "Air Canada",
        tripCode: "RMT-SEP-003",
        agents: {
          companions: ["agent_034", "agent_035"],
        },
      },
    ],

    dailyItinerary: [
      {
        id: "day_007_1",
        dayNumber: 1,
        title: "Arrival in Calgary",
        description:
          "Arrive in Calgary, meet your guide, and transfer to Banff. Evening welcome dinner at mountain lodge with stunning valley views.",
        activities: [
          "Airport pickup",
          "Scenic drive to Banff",
          "Lodge check-in",
          "Welcome dinner",
        ],

        location: { from: "Calgary Airport", to: "Banff Mountain Lodge" },
        isOptional: false,
      },
      {
        id: "day_007_2",
        dayNumber: 2,
        title: "Lake Louise and Moraine Lake",
        description:
          "Visit the iconic Lake Louise with its turquoise waters and Victoria Glacier backdrop. Afternoon at Moraine Lake in the Valley of Ten Peaks.",
        activities: [
          "Lake Louise visit",
          "Canoeing option",
          "Moraine Lake photography",
          "Valley hiking",
        ],

        location: { from: "Banff Lodge", to: "Lake Louise Area" },
        isOptional: false,
      },
      {
        id: "day_007_3",
        dayNumber: 3,
        title: "Banff Gondola and Wildlife Safari",
        description:
          "Take the Banff Gondola for panoramic mountain views. Afternoon wildlife safari to spot elk, bears, and mountain sheep.",
        activities: [
          "Gondola ride",
          "Summit hiking",
          "Wildlife safari",
          "Photography workshop",
        ],

        location: { from: "Banff Lodge", to: "Sulphur Mountain" },
        isOptional: false,
      },
      {
        id: "day_007_4",
        dayNumber: 4,
        title: "Optional Helicopter Tour",
        description:
          "Optional helicopter tour over the Canadian Rockies for aerial views of glaciers, peaks, and alpine lakes.",
        activities: [
          "Helicopter tour",
          "Aerial photography",
          "Glacier viewing",
          "Mountain peaks",
        ],

        location: { from: "Banff Lodge", to: "Rocky Mountain Peaks" },
        isOptional: true,
        optionalPrice: 650,
      },
    ],

    travelTips: [
      {
        id: "tip_007_1",
        title: "Weather Preparation",
        description:
          "Mountain weather can change rapidly. Pack layers including warm clothing even in summer. Temperatures can drop significantly at higher elevations.",
      },
      {
        id: "tip_007_2",
        title: "Wildlife Safety",
        description:
          "Maintain safe distances from wildlife (100m from bears, 30m from elk). Never feed animals. Carry bear spray when hiking.",
      },
      {
        id: "tip_007_3",
        title: "Altitude Considerations",
        description:
          "Some activities are at high altitude. Stay hydrated, take breaks, and inform your guide of any breathing difficulties.",
      },
      {
        id: "tip_007_4",
        title: "Photography Tips",
        description:
          "Best light for mountain photography is during golden hours. Bring extra batteries as cold weather drains them quickly.",
      },
    ],

    essentialItems: [
      {
        id: "item_007_1",
        text: "Waterproof hiking boots with ankle support",
      },
      {
        id: "item_007_2",
        text: "Layered clothing system including warm jacket",
      },
      {
        id: "item_007_3",
        text: "Waterproof rain jacket and pants",
      },
      {
        id: "item_007_4",
        text: "Warm hat, gloves, and sun hat",
      },
      {
        id: "item_007_5",
        text: "High SPF sunscreen and UV sunglasses",
      },
      {
        id: "item_007_6",
        text: "Camera with extra batteries and memory cards",
      },
      {
        id: "item_007_7",
        text: "Personal water bottle and snacks",
      },
      {
        id: "item_007_8",
        text: "Personal medications and basic first aid",
      },
    ],

    createdAt: "2024-02-10",
    updatedAt: "2024-02-15",
    bookings: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
  },
  {
    id: "pkg_008",
    name: "Patagonia Wilderness Trek",
    description:
      "Trek through the pristine wilderness of Patagonia, experiencing dramatic landscapes, glaciers, and unique wildlife in this 14-day expedition. Journey through Torres del Paine National Park and Los Glaciares National Park, witnessing some of the world's most spectacular mountain scenery, ancient glaciers, and diverse Patagonian wildlife in this ultimate adventure for experienced trekkers.",
    continent: "South America",
    country: "Chile/Argentina",
    duration: 14,
    difficulty: "Challenging",
    groupSize: { min: 8, max: 14 },
    pricing: { basePrice: 6800, currency: "RM" },
    status: "inactive",
    category: "Trekking",
    highlights: [
      "Torres del Paine iconic granite towers",
      "Perito Moreno Glacier up-close encounters",
      "Andean condor spotting in natural habitat",
      "Authentic gaucho culture and estancia visits",
      "Fitz Roy mountain range exploration",
      "Pristine wilderness camping under southern stars",
    ],

    inclusions: [
      "Mountain refuge and camping accommodation",
      "All meals during trek including trail lunches",
      "Professional certified mountain guide and naturalist",
      "Complete trekking equipment including tents and sleeping bags",
      "All national park entrance fees and permits",
      "Ground transportation and airport transfers",
      "Glacier boat excursions and ice trekking equipment",
      "Emergency satellite communication device",
    ],

    exclusions: [
      "International flights to/from Buenos Aires or Santiago",
      "Comprehensive travel and evacuation insurance",
      "Personal trekking gear and outdoor clothing",
      "Personal expenses and souvenir purchases",
      "Tips for guides, drivers, and local staff",
      "Optional helicopter tours and spa treatments",
      "Alcoholic beverages and imported goods",
      "Extra nights in gateway cities",
    ],

    images: {
      hero: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
        "https://images.unsplash.com/photo-1464822759844-d150ad6d1dff?w=400",
        "https://images.unsplash.com/photo-1486022119026-a1e7d2d17b7b?w=400",
      ],
    },
    availability: {
      startDate: "2024-12-01",
      endDate: "2025-03-31",
      capacity: 28,
      booked: 0,
    },
    bookingDates: [
      {
        id: "date_008_1",
        startDate: "2024-12-15",
        endDate: "2024-12-28",
        capacity: 14,
        booked: 0,
        status: "cancelled",
        price: 6800,
        flightType: "business",
        flightCompany: "LATAM Airlines",
        tripCode: "PAT-DEC-001",
        agents: {
          companions: ["agent_036", "agent_037"],
        },
      },
      {
        id: "date_008_2",
        startDate: "2025-01-20",
        endDate: "2025-02-02",
        capacity: 14,
        booked: 0,
        status: "cancelled",
        price: 6800,
        flightType: "business",
        flightCompany: "LATAM Airlines",
        tripCode: "PAT-JAN-002",
        agents: {
          companions: ["agent_038", "agent_008"],
        },
      },
      {
        id: "date_008_3",
        startDate: "2025-03-01",
        endDate: "2025-03-14",
        capacity: 14,
        booked: 0,
        status: "inactive",
        price: 6800,
        flightType: "business",
        flightCompany: "LATAM Airlines",
        tripCode: "PAT-MAR-003",
        agents: {
          companions: ["agent_039", "agent_040"],
        },
      },
    ],

    dailyItinerary: [
      {
        id: "day_008_1",
        dayNumber: 1,
        title: "Arrival in Punta Arenas",
        description:
          "Arrive in Punta Arenas, Chile. Meet your expedition team, equipment check, and transfer to Puerto Natales. Evening briefing about the trek.",
        activities: [
          "Airport pickup",
          "Equipment check",
          "Team briefing",
          "Welcome dinner",
        ],

        location: { from: "Punta Arenas Airport", to: "Puerto Natales" },
        isOptional: false,
      },
      {
        id: "day_008_2",
        dayNumber: 2,
        title: "Torres del Paine Base Trek",
        description:
          "Begin the famous Torres del Paine base trek. Hike through lenga forests and across the Ascencio River to reach the base of the iconic granite towers.",
        activities: [
          "Base trek start",
          "Forest hiking",
          "River crossing",
          "Torres viewpoint",
        ],

        location: { from: "Puerto Natales", to: "Torres Base Camp" },
        isOptional: false,
      },
      {
        id: "day_008_3",
        dayNumber: 3,
        title: "Cuernos del Paine Circuit",
        description:
          "Trek along the famous Cuernos del Paine (Horns of Paine) with spectacular views of the granite horns and Nordenskjöld Lake.",
        activities: [
          "Cuernos circuit",
          "Lake views",
          "Wildlife spotting",
          "Photography",
        ],

        location: { from: "Torres Base", to: "Cuernos Refuge" },
        isOptional: false,
      },
      {
        id: "day_008_4",
        dayNumber: 4,
        title: "French Valley Exploration",
        description:
          "Explore the dramatic French Valley with its hanging glaciers, avalanche zones, and amphitheater of granite peaks.",
        activities: [
          "Valley exploration",
          "Glacier viewing",
          "Peak photography",
          "Wilderness camping",
        ],

        location: { from: "Cuernos Refuge", to: "French Valley" },
        isOptional: false,
      },
    ],

    travelTips: [
      {
        id: "tip_008_1",
        title: "Physical Preparation",
        description:
          "This is a challenging trek requiring excellent fitness. Train for 3-6 months with long hikes carrying a weighted pack. Include cardio and strength training.",
      },
      {
        id: "tip_008_2",
        title: "Weather Extremes",
        description:
          "Patagonian weather is notoriously unpredictable. Be prepared for strong winds, rain, snow, and sun all in one day. Pack accordingly.",
      },
      {
        id: "tip_008_3",
        title: "Gear Requirements",
        description:
          "High-quality gear is essential. Waterproof everything and bring extra layers. Wind-resistant clothing is crucial for Patagonian conditions.",
      },
      {
        id: "tip_008_4",
        title: "Leave No Trace",
        description:
          "Follow strict Leave No Trace principles. Camp only in designated areas, pack out all waste, and respect the pristine wilderness environment.",
      },
    ],

    essentialItems: [
      {
        id: "item_008_1",
        text: "High-quality waterproof trekking boots",
      },
      {
        id: "item_008_2",
        text: "Wind and waterproof shell jacket and pants",
      },
      {
        id: "item_008_3",
        text: "Insulated down jacket for cold conditions",
      },
      {
        id: "item_008_4",
        text: "Warm sleeping bag rated to -10°C",
      },
      {
        id: "item_008_5",
        text: "Trekking poles for stability in wind",
      },
      {
        id: "item_008_6",
        text: "High SPF sunscreen and glacier glasses",
      },
      {
        id: "item_008_7",
        text: "Headlamp with extra batteries",
      },
      {
        id: "item_008_8",
        text: "Personal first aid kit and medications",
      },
    ],

    createdAt: "2024-01-05",
    updatedAt: "2024-02-01",
    bookings: 18,
    revenue: 122400,
    rating: 4.4,
    reviews: 15,
  },
];

export const packageCategories = [
  "All Categories",
  "Trekking",
  "Safari",
  "Expedition",
  "Eco-Adventure",
  "Cultural",
  "Diving",
  "Adventure",
];

export const continents = [
  "All Continents",
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
];

export const difficultyLevels = [
  "All Levels",
  "Easy",
  "Moderate",
  "Challenging",
  "Extreme",
];

export const packageStatuses = [
  "All Status",
  "active",
  "inactive",
  "draft",
  "sold_out",
];

// Default export for the module
export default {
  travelPackages,
  packageCategories,
  continents,
  difficultyLevels,
  packageStatuses,
};
