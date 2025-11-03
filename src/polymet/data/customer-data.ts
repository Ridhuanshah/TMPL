// Featured location packages for hero banner
export interface FeaturedLocation {
  id: string;
  title: string;
  region: string;
  countries: string[];
  image: string;
  packageId?: string;
}

// Continent categories
export interface Continent {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Gallery images
export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  location: string;
  size: "small" | "medium" | "large";
}

// Customer reviews
export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
  location: string;
}

// Hero slides with featured locations
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  featuredLocations: FeaturedLocation[];
}

// Hero slides data
export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Patagonia",
    subtitle:
      "An unforgettable journey through Patagonia's culture, cuisine, and traditions.",
    backgroundImage:
      "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=1920&q=80", // Patagonia mountains
    featuredLocations: [
      {
        id: "loc-1",
        title: "DISCOVER",
        region: "SOUTH AMERICA",
        countries: ["Peru", "Bolivia", "Chile"],
        image:
          "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80", // Machu Picchu
        packageId: "pkg_003", // South American Expedition
      },
      {
        id: "loc-2",
        title: "DISCOVER",
        region: "CENTRAL ASIA",
        countries: ["Kyrgyzstan"],
        image:
          "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&q=80", // Kyrgyzstan mountains
        packageId: "pkg_004", // Central Asian Trek
      },
      {
        id: "loc-3",
        title: "DISCOVER",
        region: "SCANDINAVIA",
        countries: ["Finland", "Sweden", "Norway"],
        image:
          "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80", // Norway fjords
        packageId: "pkg_005", // Nordic Adventure
      },
      {
        id: "loc-4",
        title: "DISCOVER",
        region: "EAST AFRICA",
        countries: ["Kenya", "Tanzania"],
        image:
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80", // Safari elephants
        packageId: "pkg_002", // African Safari Adventure
      },
      {
        id: "loc-5",
        title: "DISCOVER",
        region: "PATAGONIA",
        countries: ["Chile", "Argentina"],
        image:
          "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80", // Patagonia peaks
        packageId: "pkg_006", // Patagonia Expedition
      },
    ],
  },
  {
    id: "slide-2",
    title: "European Wonders",
    subtitle:
      "Discover the rich history, art, and culture across Europe's most iconic destinations.",
    backgroundImage:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=80", // Paris cityscape
    featuredLocations: [
      {
        id: "loc-6",
        title: "DISCOVER",
        region: "WESTERN EUROPE",
        countries: ["France", "Switzerland"],
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", // Paris
      },
      {
        id: "loc-7",
        title: "DISCOVER",
        region: "MEDITERRANEAN",
        countries: ["Italy", "Greece"],
        image:
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80", // Rome
      },
      {
        id: "loc-8",
        title: "DISCOVER",
        region: "IBERIAN",
        countries: ["Spain", "Portugal"],
        image:
          "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80", // Barcelona
      },
      {
        id: "loc-9",
        title: "DISCOVER",
        region: "BRITISH ISLES",
        countries: ["UK", "Ireland"],
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", // London
      },
      {
        id: "loc-10",
        title: "DISCOVER",
        region: "EASTERN EUROPE",
        countries: ["Czech", "Austria"],
        image:
          "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&q=80", // Prague
      },
    ],
  },
  {
    id: "slide-3",
    title: "Asian Adventures",
    subtitle:
      "Experience the mystique and beauty of Asia's diverse landscapes and ancient cultures.",
    backgroundImage:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1920&q=80", // Japanese temple
    featuredLocations: [
      {
        id: "loc-11",
        title: "DISCOVER",
        region: "EAST ASIA",
        countries: ["Japan", "South Korea"],
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", // Tokyo
      },
      {
        id: "loc-12",
        title: "DISCOVER",
        region: "SOUTHEAST ASIA",
        countries: ["Thailand", "Vietnam"],
        image:
          "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80", // Thai temple
      },
      {
        id: "loc-13",
        title: "DISCOVER",
        region: "SOUTH ASIA",
        countries: ["India", "Nepal"],
        image:
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80", // Taj Mahal
      },
      {
        id: "loc-14",
        title: "DISCOVER",
        region: "ISLAND PARADISE",
        countries: ["Indonesia", "Malaysia"],
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", // Bali
      },
      {
        id: "loc-15",
        title: "DISCOVER",
        region: "MIDDLE EAST",
        countries: ["UAE", "Jordan"],
        image:
          "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80", // Dubai
      },
    ],
  },
];

// Continents data
export const continents: Continent[] = [
  {
    id: "europe",
    name: "EUROPE",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80", // Eiffel Tower at night
    description:
      "Explore historic cities, stunning architecture, and rich cultural heritage",
  },
  {
    id: "america",
    name: "AMERICA",
    image:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80", // Statue of Liberty
    description:
      "From vibrant cities to natural wonders across North and South America",
  },
  {
    id: "south-america",
    name: "SOUTH AMERICA",
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80", // Desert sunset
    description:
      "Discover ancient ruins, rainforests, and breathtaking landscapes",
  },
  {
    id: "asia",
    name: "ASIA",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80", // Japanese torii gate
    description:
      "Experience diverse cultures, spiritual sites, and exotic destinations",
  },
  {
    id: "africa",
    name: "AFRICA",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", // Hot air balloon safari
    description:
      "Safari adventures, ancient wonders, and stunning natural beauty",
  },
];

// Gallery images data
export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    url: "/gallery-1.jpg", // Train
    title: "Scenic Train Journey",
    location: "Peru",
    size: "large",
  },
  {
    id: "gallery-2",
    url: "/gallery-2.jpg", // Market
    title: "Local Market Experience",
    location: "Bolivia",
    size: "medium",
  },
  {
    id: "gallery-3",
    url: "/gallery-3.jpg", // Beach selfie
    title: "Sunset Memories",
    location: "Santorini",
    size: "large",
  },
  {
    id: "gallery-4",
    url: "/gallery-4.jpg", // Cable car
    title: "Road Trip Adventures",
    location: "Iceland",
    size: "small",
  },
  {
    id: "gallery-5",
    url: "/gallery-5.jpg", // Field group jumping
    title: "Team Celebration",
    location: "New Zealand",
    size: "large",
  },
  {
    id: "gallery-6",
    url: "/gallery-6.jpg", // Mountain group
    title: "Mountain Summit",
    location: "Peru",
    size: "medium",
  },
  {
    id: "gallery-7",
    url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80", // Beach group
    title: "Beach Paradise",
    location: "Maldives",
    size: "medium",
  },
  {
    id: "gallery-8",
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", // Lake view
    title: "Lakeside Serenity",
    location: "Switzerland",
    size: "small",
  },
];

// Customer reviews data
export const customerReviews: CustomerReview[] = [
  {
    id: "review-1",
    name: "Yuhani, Wangsa Maju, KL",
    avatar: "/first-review.jpg",
    rating: 5,
    review:
      "Serius Peru ni beyond expectation! Machu Picchu tu memang breathtaking gila, rasa macam masuk dalam postcard. Makanan dia pun sedap, especially yang ada quinoa tu. Paling best guide memang sporting, semua orang enjoy je sepanjang trip.",
    date: "2024-01-15",
    location: "Machu Picchu, Peru",
  },
  {
    id: "review-2",
    name: "Nik, Shah Alam, Selangor",
    avatar: "/second-review.jpg",
    rating: 5,
    review:
      "Trip ni memang puas hati. Dari Lima sampai Cusco, semua itinerary tersusun. Walaupun altitude tinggi, team memang jaga kami baik-baik siap bagi tips. Machu Picchu tu memang bucket list aku, akhirnya dapat tick!",
    date: "2024-02-20",
    location: "Lima to Cusco, Peru",
  },
  {
    id: "review-3",
    name: "Zul, Putrajaya",
    avatar: "/third-review.jpg",
    rating: 5,
    review:
      "Peru ni negara yang penuh dengan culture. Saya suka pasar local dia, warna-warni and orang dia friendly. Gambar semua memang IG-worthy, tak payah filter pun lawa. Rasa macam nak repeat lagi!",
    date: "2024-03-10",
    location: "Peru",
  },
  {
    id: "review-4",
    name: "Sarah Lee",
    avatar: "https://github.com/shoaibux1.png",
    rating: 5,
    review:
      "Our family trip to Iceland with TMPL Escapade exceeded all expectations. From the Northern Lights to the Blue Lagoon, everything was perfectly arranged. The guides were friendly and accommodating to our needs. A truly memorable experience!",
    date: "2024-01-28",
    location: "Reykjavik, Iceland",
  },
  {
    id: "review-5",
    name: "Ahmad Zaki",
    avatar: "https://github.com/denizbuyuktas.png",
    rating: 5,
    review:
      "The African safari organized by TMPL Escapade was a dream come true. We saw the Big Five, stayed in amazing lodges, and learned so much about wildlife conservation. The team's attention to detail and passion for travel really shows. Highly recommended!",
    date: "2024-02-14",
    location: "Serengeti, Tanzania",
  },
];

// Footer data
export const footerData = {
  about: {
    title: "About",
    description:
      "TMPL Escapade is a boutique travel agency specializing in unforgettable adventures across the globe.",
    address: "Pusat Perdagangan Hillpark, Bandar Puncak Alam, 42300, Puncak Alam, Selangor",
    phone: "019-8816388",
    email: "hi@tmplescapade.my",
  },
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Blog & Travel Tips", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
  ],

  workingHours: {
    weekdays: "Mon - Fri: 9:00 AM - 6:00 PM",
    weekend: "Sat - Sun: 8:00 AM - 4:00 PM",
  },
  socialMedia: [
    {
      platform: "Facebook",
      url: "https://facebook.com/tmplescapade",
      icon: "facebook",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/tmplescapade",
      icon: "instagram",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/tmplescapade",
      icon: "twitter",
    },
    {
      platform: "YouTube",
      url: "https://youtube.com/tmplescapade",
      icon: "youtube",
    },
  ],

  paymentMethods: [
    "Visa",
    "Mastercard",
    "American Express",
    "PayPal",
    "Bank Transfer",
  ],
};
