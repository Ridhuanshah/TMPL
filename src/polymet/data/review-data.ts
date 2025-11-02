export interface Review {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    loyaltyTier: string;
  };
  package: {
    id: string;
    name: string;
    destination: string;
  };
  booking: {
    id: string;
    bookingNumber: string;
    completedDate: string;
  };
  rating: {
    overall: number;
    service: number;
    value: number;
    cleanliness: number;
    location: number;
    amenities: number;
  };
  content: {
    title: string;
    review: string;
    pros: string[];
    cons: string[];
  };
  images: string[];
  status: "pending" | "approved" | "rejected" | "flagged";
  moderation: {
    moderatedBy?: string;
    moderatedAt?: string;
    reason?: string;
    notes?: string;
  };
  helpfulness: {
    helpful: number;
    notHelpful: number;
  };
  response?: {
    content: string;
    respondedBy: string;
    respondedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ReviewStats {
  totalReviews: number;
  pendingReviews: number;
  averageRating: number;
  responseRate: number;
  ratingDistribution: {
    [rating: number]: number;
  };
  statusDistribution: {
    pending: number;
    approved: number;
    rejected: number;
    flagged: number;
  };
  monthlyTrends: {
    month: string;
    reviews: number;
    averageRating: number;
  }[];
}

export const reviews: Review[] = [
  {
    id: "rev-001",
    customer: {
      id: "user-001",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "https://github.com/yusufhilmi.png",
      loyaltyTier: "gold",
    },
    package: {
      id: "pkg-001",
      name: "Himalayan Base Camp Trek",
      destination: "Nepal",
    },
    booking: {
      id: "book-001",
      bookingNumber: "TMPL-2024-001",
      completedDate: "2024-01-15T10:00:00Z",
    },
    rating: {
      overall: 5,
      service: 5,
      value: 4,
      cleanliness: 5,
      location: 5,
      amenities: 4,
    },
    content: {
      title: "Absolutely Amazing Experience!",
      review:
        "This trek was beyond my expectations. The guides were knowledgeable and friendly, the accommodation was comfortable, and the views were breathtaking. TMPL Escapade organized everything perfectly from start to finish. I would definitely book with them again!",
      pros: [
        "Professional guides",
        "Great organization",
        "Stunning views",
        "Comfortable accommodation",
      ],

      cons: ["Weather was unpredictable", "Some meals could be improved"],
    },
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=300&fit=crop",
    ],

    status: "approved",
    moderation: {
      moderatedBy: "admin-001",
      moderatedAt: "2024-01-16T09:30:00Z",
      reason: "Approved - Genuine positive review",
    },
    helpfulness: {
      helpful: 24,
      notHelpful: 2,
    },
    response: {
      content:
        "Thank you so much for your wonderful review, Sarah! We're thrilled that you had such an amazing experience on the Himalayan Base Camp Trek. Your feedback about the guides and organization means a lot to us. We look forward to planning your next adventure!",
      respondedBy: "TMPL Customer Service",
      respondedAt: "2024-01-16T14:20:00Z",
    },
    createdAt: "2024-01-15T18:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "rev-002",
    customer: {
      id: "user-002",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "https://github.com/kdrnp.png",
      loyaltyTier: "silver",
    },
    package: {
      id: "pkg-002",
      name: "Bali Cultural Discovery",
      destination: "Indonesia",
    },
    booking: {
      id: "book-002",
      bookingNumber: "TMPL-2024-002",
      completedDate: "2024-01-10T16:00:00Z",
    },
    rating: {
      overall: 4,
      service: 4,
      value: 5,
      cleanliness: 4,
      location: 5,
      amenities: 3,
    },
    content: {
      title: "Great Value for Money",
      review:
        "Had a wonderful time exploring Bali's culture and temples. The itinerary was well-planned and our guide was very informative. The hotels were decent and the food experiences were authentic. Only minor issue was some transportation delays.",
      pros: [
        "Authentic experiences",
        "Knowledgeable guide",
        "Great value",
        "Well-planned itinerary",
      ],

      cons: ["Some transportation delays", "Hotel amenities could be better"],
    },
    images: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
    ],

    status: "approved",
    moderation: {
      moderatedBy: "admin-002",
      moderatedAt: "2024-01-11T11:15:00Z",
      reason: "Approved - Balanced and helpful review",
    },
    helpfulness: {
      helpful: 18,
      notHelpful: 1,
    },
    response: {
      content:
        "Thank you for your detailed review, Michael! We're glad you enjoyed the cultural experiences in Bali. We'll work on improving our transportation coordination and hotel amenities. Your feedback helps us provide better service!",
      respondedBy: "TMPL Customer Service",
      respondedAt: "2024-01-11T15:45:00Z",
    },
    createdAt: "2024-01-10T20:15:00Z",
    updatedAt: "2024-01-11T15:45:00Z",
  },
  {
    id: "rev-003",
    customer: {
      id: "user-003",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      avatar: "https://github.com/yahyabedirhan.png",
      loyaltyTier: "platinum",
    },
    package: {
      id: "pkg-003",
      name: "Tokyo Modern & Traditional",
      destination: "Japan",
    },
    booking: {
      id: "book-003",
      bookingNumber: "TMPL-2024-003",
      completedDate: "2024-01-08T12:00:00Z",
    },
    rating: {
      overall: 2,
      service: 2,
      value: 2,
      cleanliness: 3,
      location: 4,
      amenities: 2,
    },
    content: {
      title: "Disappointing Experience",
      review:
        "Unfortunately, this trip didn't meet my expectations. The itinerary felt rushed, some attractions were closed without prior notice, and our guide seemed inexperienced. The hotel location was good but the service was poor. For the price paid, I expected much better quality.",
      pros: ["Good hotel location", "Some interesting sites"],
      cons: [
        "Rushed itinerary",
        "Poor communication",
        "Inexperienced guide",
        "Overpriced for quality",
      ],
    },
    images: [],
    status: "flagged",
    moderation: {
      moderatedBy: "admin-001",
      moderatedAt: "2024-01-09T10:30:00Z",
      reason: "Flagged for investigation - Serious service complaints",
      notes: "Need to follow up with operations team about this booking",
    },
    helpfulness: {
      helpful: 12,
      notHelpful: 3,
    },
    createdAt: "2024-01-08T19:45:00Z",
    updatedAt: "2024-01-09T10:30:00Z",
  },
  {
    id: "rev-004",
    customer: {
      id: "user-004",
      name: "David Rodriguez",
      email: "david.rodriguez@email.com",
      avatar: "https://github.com/denizbuyuktas.png",
      loyaltyTier: "bronze",
    },
    package: {
      id: "pkg-004",
      name: "Santorini Sunset Romance",
      destination: "Greece",
    },
    booking: {
      id: "book-004",
      bookingNumber: "TMPL-2024-004",
      completedDate: "2024-01-12T14:30:00Z",
    },
    rating: {
      overall: 5,
      service: 5,
      value: 4,
      cleanliness: 5,
      location: 5,
      amenities: 5,
    },
    content: {
      title: "Perfect Honeymoon Trip",
      review:
        "My wife and I had the most romantic honeymoon in Santorini. The sunset views were incredible, the hotel was luxurious, and every detail was perfectly arranged. The private dinner on the terrace was unforgettable. Thank you TMPL for making our honeymoon so special!",
      pros: [
        "Romantic atmosphere",
        "Luxury accommodation",
        "Perfect organization",
        "Stunning views",
      ],

      cons: ["A bit expensive", "Limited dining options in some areas"],
    },
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop",
    ],

    status: "pending",
    moderation: {},
    helpfulness: {
      helpful: 0,
      notHelpful: 0,
    },
    createdAt: "2024-01-12T21:00:00Z",
    updatedAt: "2024-01-12T21:00:00Z",
  },
  {
    id: "rev-005",
    customer: {
      id: "user-005",
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      avatar: "https://github.com/shoaibux1.png",
      loyaltyTier: "gold",
    },
    package: {
      id: "pkg-005",
      name: "Langkawi Island Getaway",
      destination: "Malaysia",
    },
    booking: {
      id: "book-005",
      bookingNumber: "TMPL-2024-005",
      completedDate: "2024-01-14T11:00:00Z",
    },
    rating: {
      overall: 4,
      service: 4,
      value: 4,
      cleanliness: 4,
      location: 5,
      amenities: 4,
    },
    content: {
      title: "Relaxing Island Paradise",
      review:
        "Langkawi was exactly what I needed for a relaxing getaway. Beautiful beaches, clear waters, and peaceful atmosphere. The resort was comfortable and the staff was friendly. The cable car ride was a highlight. Would recommend for anyone looking to unwind.",
      pros: [
        "Beautiful beaches",
        "Peaceful atmosphere",
        "Friendly staff",
        "Great activities",
      ],

      cons: ["Limited nightlife", "Some areas need maintenance"],
    },
    images: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    ],

    status: "pending",
    moderation: {},
    helpfulness: {
      helpful: 0,
      notHelpful: 0,
    },
    createdAt: "2024-01-14T17:30:00Z",
    updatedAt: "2024-01-14T17:30:00Z",
  },
  {
    id: "rev-006",
    customer: {
      id: "user-006",
      name: "James Park",
      email: "james.park@email.com",
      loyaltyTier: "silver",
    },
    package: {
      id: "pkg-006",
      name: "Penang Food & Heritage Tour",
      destination: "Malaysia",
    },
    booking: {
      id: "book-006",
      bookingNumber: "TMPL-2024-006",
      completedDate: "2024-01-13T15:45:00Z",
    },
    rating: {
      overall: 1,
      service: 1,
      value: 2,
      cleanliness: 2,
      location: 3,
      amenities: 1,
    },
    content: {
      title: "Terrible service and organization",
      review:
        "This was the worst travel experience I've ever had. The guide didn't show up on the first day, the food tour was poorly organized, and the hotel was dirty. Customer service was unresponsive when I tried to complain. I want a full refund!",
      pros: ["Some good local food"],
      cons: [
        "No guide on first day",
        "Dirty hotel",
        "Poor organization",
        "Unresponsive customer service",
        "Overpriced",
      ],
    },
    images: [],
    status: "rejected",
    moderation: {
      moderatedBy: "admin-003",
      moderatedAt: "2024-01-14T09:00:00Z",
      reason:
        "Rejected - Contains inappropriate language and unsubstantiated claims",
      notes:
        "Customer complaint has been escalated to management for resolution",
    },
    helpfulness: {
      helpful: 5,
      notHelpful: 8,
    },
    createdAt: "2024-01-13T22:15:00Z",
    updatedAt: "2024-01-14T09:00:00Z",
  },
];

export const reviewStats: ReviewStats = {
  totalReviews: 1247,
  pendingReviews: 23,
  averageRating: 4.2,
  responseRate: 87.5,
  ratingDistribution: {
    5: 567,
    4: 398,
    3: 189,
    2: 67,
    1: 26,
  },
  statusDistribution: {
    pending: 23,
    approved: 1156,
    rejected: 45,
    flagged: 23,
  },
  monthlyTrends: [
    { month: "Jul", reviews: 156, averageRating: 4.1 },
    { month: "Aug", reviews: 189, averageRating: 4.3 },
    { month: "Sep", reviews: 134, averageRating: 4.0 },
    { month: "Oct", reviews: 167, averageRating: 4.2 },
    { month: "Nov", reviews: 198, averageRating: 4.4 },
    { month: "Dec", reviews: 223, averageRating: 4.3 },
  ],
};

export const reviewStatuses = [
  "All Statuses",
  "pending",
  "approved",
  "rejected",
  "flagged",
];

export const ratingFilters = [
  "All Ratings",
  "5 Stars",
  "4 Stars",
  "3 Stars",
  "2 Stars",
  "1 Star",
];

export const loyaltyTiers = [
  "All Tiers",
  "bronze",
  "silver",
  "gold",
  "platinum",
];

// Default export for the module
export default {
  reviews,
  reviewStats,
  reviewStatuses,
  ratingFilters,
  loyaltyTiers,
};
