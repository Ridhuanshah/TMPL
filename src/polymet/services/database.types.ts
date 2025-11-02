// Database types that mirror Supabase schema
// This structure is ready for direct Supabase migration

export interface Database {
  public: {
    Tables: {
      packages: {
        Row: PackageRow;
        Insert: PackageInsert;
        Update: PackageUpdate;
      };
      daily_itinerary: {
        Row: DailyItineraryRow;
        Insert: DailyItineraryInsert;
        Update: DailyItineraryUpdate;
      };
      package_images: {
        Row: PackageImageRow;
        Insert: PackageImageInsert;
        Update: PackageImageUpdate;
      };
      travel_tips: {
        Row: TravelTipRow;
        Insert: TravelTipInsert;
        Update: TravelTipUpdate;
      };
      essential_items: {
        Row: EssentialItemRow;
        Insert: EssentialItemInsert;
        Update: EssentialItemUpdate;
      };
    };
  };
}

// Package table
export interface PackageRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  continent: string;
  country: string;
  region: string;
  category: string;
  duration: number;
  difficulty: string;
  
  // Pricing
  base_price: number;
  currency: string;
  
  // Group size
  min_group_size: number;
  max_group_size: number;
  
  // Availability
  capacity: number;
  booked: number;
  
  // Stats
  rating: number;
  review_count: number;
  booking_count: number;
  total_revenue: number;
  
  // Status
  status: 'active' | 'inactive' | 'draft' | 'sold_out';
  
  // SEO
  meta_title: string | null;
  meta_description: string | null;
  
  // Arrays stored as JSONB in real database
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  
  // PDF itinerary
  pdfItinerary?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // Relations (joined data)
  daily_itinerary?: DailyItineraryRow[];
  images?: PackageImageRow[];
  travel_tips?: TravelTipRow[];
  essential_items?: EssentialItemRow[];
}

export type PackageInsert = Omit<PackageRow, 'id' | 'created_at' | 'updated_at' | 'daily_itinerary' | 'images' | 'travel_tips' | 'essential_items'>;
export type PackageUpdate = Partial<PackageInsert>;

// Daily Itinerary table
export interface DailyItineraryRow {
  id: string;
  package_id: string;
  day_number: number;
  title: string;
  description: string;
  location_from: string;
  location_to: string;
  activities: string[]; // JSONB array
  meals_included: string[]; // JSONB array
  accommodation: string | null;
  is_optional: boolean;
  optional_price: number | null;
  created_at: string;
  updated_at: string;
}

export type DailyItineraryInsert = Omit<DailyItineraryRow, 'id' | 'created_at' | 'updated_at'>;
export type DailyItineraryUpdate = Partial<DailyItineraryInsert>;

// Package Images table
export interface PackageImageRow {
  id: string;
  package_id: string;
  url: string;
  alt_text: string;
  type: 'hero' | 'gallery' | 'thumbnail';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type PackageImageInsert = Omit<PackageImageRow, 'id' | 'created_at' | 'updated_at'>;
export type PackageImageUpdate = Partial<PackageImageInsert>;

// Travel Tips table
export interface TravelTipRow {
  id: string;
  package_id: string;
  category: string;
  title: string;
  description: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type TravelTipInsert = Omit<TravelTipRow, 'id' | 'created_at' | 'updated_at'>;
export type TravelTipUpdate = Partial<TravelTipInsert>;

// Essential Items table
export interface EssentialItemRow {
  id: string;
  package_id: string;
  category: string;
  item_name: string;
  is_mandatory: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type EssentialItemInsert = Omit<EssentialItemRow, 'id' | 'created_at' | 'updated_at'>;
export type EssentialItemUpdate = Partial<EssentialItemInsert>;

// Query response types
export interface PackageWithRelations extends PackageRow {
  daily_itinerary: DailyItineraryRow[];
  images: PackageImageRow[];
  travel_tips: TravelTipRow[];
  essential_items: EssentialItemRow[];
}

// Query filters
export interface PackageFilters {
  continent?: string;
  country?: string;
  category?: string;
  status?: string;
  min_price?: number;
  max_price?: number;
  difficulty?: string;
  min_duration?: number;
  max_duration?: number;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
