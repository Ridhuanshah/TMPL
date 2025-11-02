import { z } from 'zod';

// ============================================================================
// TRAVELER VALIDATION SCHEMA
// ============================================================================

export const travelerSchema = z.object({
  participant_number: z.number().int().positive(),
  is_lead_traveler: z.boolean(),
  
  // Required fields (11 total)
  first_name: z.string().min(2, 'First name must be at least 2 characters').max(100),
  last_name: z.string().min(2, 'Last name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits').max(20),
  ic_number: z.string().min(5, 'IC/Passport number is required').max(50),
  nationality: z.string().min(2, 'Nationality is required'),
  date_of_birth: z.string().refine((date) => {
    const dob = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    return age >= 1 && age <= 120;
  }, 'Invalid date of birth'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Please select a gender' })
  }),
  passport_number: z.string().min(5, 'Passport number is required').max(50),
  emergency_contact_name: z.string().min(2, 'Emergency contact name is required').max(100),
  emergency_contact_relation: z.string().min(2, 'Relationship is required').max(50),
  emergency_contact_phone: z.string().min(8, 'Emergency contact phone is required').max(20),
  
  // Optional fields
  passport_expiry: z.string().optional(),
  dietary_requirements: z.string().max(500).optional(),
  medical_conditions: z.string().max(500).optional(),
  special_needs: z.string().max(500).optional(),
});

export type TravelerFormData = z.infer<typeof travelerSchema>;

// ============================================================================
// STEP 1: DATE & PARTICIPANTS VALIDATION
// ============================================================================

export const dateParticipantsSchema = z.object({
  package_id: z.string().uuid('Invalid package ID'),
  departure_date_id: z.string().uuid('Please select a departure date'),
  participants: z.number().int().min(1, 'At least 1 participant required').max(50, 'Maximum 50 participants allowed'),
});

// ============================================================================
// STEP 2: ADD-ONS VALIDATION
// ============================================================================

export const addonSchema = z.object({
  addon_id: z.string().uuid().optional(),
  addon_type: z.enum(['package_addon', 'optional_itinerary']),
  itinerary_id: z.string().uuid().optional(),
  addon_name: z.string().min(1),
  quantity: z.number().int().min(1),
  unit_price: z.number().nonnegative(),
  total_price: z.number().nonnegative(),
});

export const addonsStepSchema = z.object({
  selected_addons: z.array(addonSchema).optional(),
});

// ============================================================================
// STEP 3: TRAVELERS VALIDATION
// ============================================================================

export const travelersStepSchema = z.object({
  travelers: z.array(travelerSchema).min(1, 'At least one traveler is required'),
}).refine((data) => {
  // Ensure at least one lead traveler
  return data.travelers.some(t => t.is_lead_traveler);
}, {
  message: 'At least one traveler must be designated as lead traveler',
  path: ['travelers'],
});

// ============================================================================
// STEP 4: REVIEW & PAYMENT VALIDATION
// ============================================================================

export const reviewPaymentSchema = z.object({
  payment_plan: z.enum(['pay_later', 'deposit', 'full', 'installment']),
  special_requests: z.string().max(1000).optional(),
  terms_accepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  coupon_code: z.string().optional(),
});

// ============================================================================
// COMPLETE BOOKING VALIDATION
// ============================================================================

export const completeBookingSchema = z.object({
  // Step 1
  package_id: z.string().uuid(),
  departure_date_id: z.string().uuid(),
  participants: z.number().int().positive(),
  
  // Step 2
  selected_addons: z.array(addonSchema).optional(),
  
  // Step 3
  travelers: z.array(travelerSchema).min(1),
  
  // Step 4
  payment_plan: z.enum(['pay_later', 'deposit', 'full', 'installment']),
  special_requests: z.string().max(1000).optional(),
  terms_accepted: z.literal(true),
  coupon_code: z.string().optional(),
});

export type CompleteBookingData = z.infer<typeof completeBookingSchema>;

// ============================================================================
// PROMO CODE VALIDATION
// ============================================================================

export const promoCodeSchema = z.object({
  code: z.string().min(3, 'Promo code must be at least 3 characters').max(50).toUpperCase(),
});

// ============================================================================
// HELPER VALIDATION FUNCTIONS
// ============================================================================

export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{8,20}$/;
  return phoneRegex.test(phone);
};

export const validateAge = (dateOfBirth: string, minAge: number = 1, maxAge: number = 120): boolean => {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    return age - 1 >= minAge && age - 1 <= maxAge;
  }
  
  return age >= minAge && age <= maxAge;
};

export const validatePassportExpiry = (expiryDate: string, departureDate: string): boolean => {
  const expiry = new Date(expiryDate);
  const departure = new Date(departureDate);
  
  // Passport should be valid for at least 6 months after departure
  const sixMonthsAfterDeparture = new Date(departure);
  sixMonthsAfterDeparture.setMonth(sixMonthsAfterDeparture.getMonth() + 6);
  
  return expiry >= sixMonthsAfterDeparture;
};
