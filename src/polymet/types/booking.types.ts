// ============================================================================
// BOOKING TYPES - Direct Booking System
// ============================================================================

export interface PackageDepartureDate {
  id: string;
  package_id: string;
  start_date: string;
  end_date: string;
  capacity: number;
  booked: number;
  available: number;
  status: 'active' | 'full' | 'inactive';
  price_override?: number;
  flight_type?: string;
  flight_company_id?: string;
  trip_code?: string;
  special_notes?: string;
}

export interface TravelerInfo {
  participant_number: number;
  is_lead_traveler: boolean;
  
  // Required fields (11 total)
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  ic_number: string;
  nationality: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  passport_number: string;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_phone: string;
  
  // Optional fields
  passport_expiry?: string;
  dietary_requirements?: string;
  medical_conditions?: string;
  special_needs?: string;
}

export interface PackageAddon {
  id: string;
  package_id?: string;
  name: string;
  description?: string;
  category: 'insurance' | 'equipment' | 'transport' | 'service' | 'accommodation';
  price: number;
  price_type: 'per_person' | 'per_booking';
  currency: string;
  is_active: boolean;
  display_order: number;
  min_participants?: number;
  max_participants?: number;
}

export interface OptionalItineraryItem {
  id: string;
  day_number: number;
  activity_name: string;
  description?: string;
  is_optional: boolean;
  optional_price?: number;
}

export interface SelectedAddon {
  addon_id?: string;
  addon_type: 'package_addon' | 'optional_itinerary';
  itinerary_id?: string;
  addon_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  status: 'active' | 'inactive' | 'expired' | 'scheduled';
  conditions: {
    minimum_amount?: number;
    maximum_discount?: number;
    applicable_packages?: string[];
    applicable_continents?: string[];
    first_time_only?: boolean;
    user_tiers?: string[];
  };
  validity: {
    start_date: string;
    end_date: string;
    timezone: string;
  };
}

export interface PriceSummary {
  subtotal: number;
  addons_total: number;
  coupon_discount: number;
  total_amount: number;
  deposit_amount?: number;
  balance_amount?: number;
  currency: string;
}

export type PaymentPlan = 'pay_later' | 'deposit' | 'full' | 'installment';

export interface BookingState {
  // Step 1: Date & Participants
  package_id: string | null;
  departure_date_id: string | null;
  departure_date: PackageDepartureDate | null;
  participants: number;
  
  // Step 2: Add-ons
  selected_addons: SelectedAddon[];
  
  // Step 3: Travelers
  travelers: TravelerInfo[];
  lead_traveler_index: number;
  
  // Step 4: Review & Payment
  coupon_code: string;
  applied_coupon: Coupon | null;
  payment_plan: PaymentPlan;
  special_requests: string;
  terms_accepted: boolean;
  
  // Pricing
  pricing: PriceSummary;
  
  // Step 5: Confirmation (after submission)
  booking_id?: string;
  booking_number?: string;
  
  // Wizard state
  current_step: number;
  completed_steps: number[];
}

export const INITIAL_BOOKING_STATE: BookingState = {
  package_id: null,
  departure_date_id: null,
  departure_date: null,
  participants: 1,
  selected_addons: [],
  travelers: [],
  lead_traveler_index: 0,
  coupon_code: '',
  applied_coupon: null,
  payment_plan: 'pay_later',
  special_requests: '',
  terms_accepted: false,
  pricing: {
    subtotal: 0,
    addons_total: 0,
    coupon_discount: 0,
    total_amount: 0,
    currency: 'RM'
  },
  current_step: 1,
  completed_steps: []
};

export const BOOKING_STEPS = [
  { number: 1, title: 'Date & Participants', description: 'Select your travel dates' },
  { number: 2, title: 'Add-ons', description: 'Enhance your experience' },
  { number: 3, title: 'Traveler Information', description: 'Complete details' },
  { number: 4, title: 'Review & Payment', description: 'Confirm your booking' },
  { number: 5, title: 'Confirmation', description: 'Booking complete' }
] as const;

export const EMERGENCY_RELATIONS = [
  'Spouse',
  'Parent',
  'Child',
  'Sibling',
  'Friend',
  'Partner',
  'Relative',
  'Other'
] as const;

export const NATIONALITIES = [
  'Malaysian',
  'Singaporean',
  'Indonesian',
  'Thai',
  'Filipino',
  'Vietnamese',
  'Chinese',
  'Indian',
  'American',
  'British',
  'Australian',
  'Canadian',
  'Japanese',
  'Korean',
  'Other'
] as const;
