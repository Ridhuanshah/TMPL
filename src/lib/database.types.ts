export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          continent: string
          country: string
          region: string | null
          category: string | null
          difficulty: string | null
          base_price: number
          currency: string | null
          duration_days: number
          duration_nights: number | null
          min_group_size: number | null
          max_group_size: number
          status: string | null
          highlights: string[] | null
          inclusions: string[] | null
          exclusions: string[] | null
          hero_image: string | null
          gallery_images: string[] | null
          pdf_itinerary_url: string | null
          total_bookings: number | null
          total_revenue: number | null
          average_rating: number | null
          total_reviews: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          continent: string
          country: string
          region?: string | null
          category?: string | null
          difficulty?: string | null
          base_price: number
          currency?: string | null
          duration_days: number
          duration_nights?: number | null
          min_group_size?: number | null
          max_group_size: number
          status?: string | null
          highlights?: string[] | null
          inclusions?: string[] | null
          exclusions?: string[] | null
          hero_image?: string | null
          gallery_images?: string[] | null
          pdf_itinerary_url?: string | null
          total_bookings?: number | null
          total_revenue?: number | null
          average_rating?: number | null
          total_reviews?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          continent?: string
          country?: string
          region?: string | null
          category?: string | null
          difficulty?: string | null
          base_price?: number
          currency?: string | null
          duration_days?: number
          duration_nights?: number | null
          min_group_size?: number | null
          max_group_size?: number
          status?: string | null
          highlights?: string[] | null
          inclusions?: string[] | null
          exclusions?: string[] | null
          hero_image?: string | null
          gallery_images?: string[] | null
          pdf_itinerary_url?: string | null
          total_bookings?: number | null
          total_revenue?: number | null
          average_rating?: number | null
          total_reviews?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      bookings: {
        Row: {
          id: string
          booking_number: string
          customer_id: string
          package_id: string
          departure_date_id: string
          travel_start_date: string
          travel_end_date: string
          participants: number
          status: string | null
          total_amount: number
          paid_amount: number | null
          payment_status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          booking_number: string
          customer_id: string
          package_id: string
          departure_date_id: string
          travel_start_date: string
          travel_end_date: string
          participants: number
          status?: string | null
          total_amount: number
          paid_amount?: number | null
          payment_status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          booking_number?: string
          customer_id?: string
          package_id?: string
          departure_date_id?: string
          travel_start_date?: string
          travel_end_date?: string
          participants?: number
          status?: string | null
          total_amount?: number
          paid_amount?: number | null
          payment_status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string
          phone: string | null
          avatar: string | null
          role: string
          status: string | null
          flag_tier: string | null
          total_bookings: number | null
          total_spent: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          name: string
          phone?: string | null
          avatar?: string | null
          role: string
          status?: string | null
          flag_tier?: string | null
          total_bookings?: number | null
          total_spent?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          name?: string
          phone?: string | null
          avatar?: string | null
          role?: string
          status?: string | null
          flag_tier?: string | null
          total_bookings?: number | null
          total_spent?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      tour_guides: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          avatar: string | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          avatar?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          avatar?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      package_departure_dates: {
        Row: {
          id: string
          package_id: string
          start_date: string
          end_date: string
          capacity: number
          booked: number | null
          status: string | null
          trip_code: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          package_id: string
          start_date: string
          end_date: string
          capacity: number
          booked?: number | null
          status?: string | null
          trip_code: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          package_id?: string
          start_date?: string
          end_date?: string
          capacity?: number
          booked?: number | null
          status?: string | null
          trip_code?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
