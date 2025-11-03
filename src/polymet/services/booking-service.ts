import { supabase } from '../../lib/supabase';
import type {
  PackageDepartureDate,
  PackageAddon,
  OptionalItineraryItem,
  Coupon,
  BookingState
} from '../types/booking.types';

// ============================================================================
// DEPARTURE DATES
// ============================================================================

export async function fetchDepartureDates(packageId: string) {
  try {
    const { data, error } = await supabase
      .from('package_departure_dates')
      .select('*')
      .eq('package_id', packageId)
      .in('status', ['active', 'full'])
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    if (error) throw error;

    // Map database response to our type
    const departureDates: PackageDepartureDate[] = (data || []).map((item: any) => ({
      id: item.id,
      package_id: item.package_id,
      start_date: item.start_date,
      end_date: item.end_date,
      capacity: item.capacity,
      booked: item.booked,
      available: item.available,
      status: item.status as 'active' | 'full' | 'inactive',
      price_override: item.price_override,
      flight_type: item.flight_type,
      flight_company_id: item.flight_company_id,
      trip_code: item.trip_code,
      special_notes: item.special_notes,
    }));

    return { data: departureDates, error: null };
  } catch (error) {
    console.error('Error fetching departure dates:', error);
    return { data: null, error };
  }
}

// ============================================================================
// PACKAGE ADD-ONS
// ============================================================================

export async function fetchPackageAddons(packageId: string) {
  try {
    const { data, error } = await supabase
      .from('package_addons')
      .select('*')
      .eq('package_id', packageId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;

    const addons: PackageAddon[] = (data || []).map((item: any) => ({
      id: item.id,
      package_id: item.package_id,
      name: item.name,
      description: item.description,
      category: item.category as 'insurance' | 'equipment' | 'transport' | 'service' | 'accommodation',
      price: item.price,
      price_type: item.price_type as 'per_person' | 'per_booking',
      currency: item.currency,
      is_active: item.is_active,
      display_order: item.display_order,
      min_participants: item.min_participants,
      max_participants: item.max_participants,
    }));

    return { data: addons, error: null };
  } catch (error) {
    console.error('Error fetching package add-ons:', error);
    return { data: null, error };
  }
}

// ============================================================================
// OPTIONAL ITINERARY ITEMS
// ============================================================================

export async function fetchOptionalItineraryItems(packageId: string) {
  try {
    const { data, error } = await supabase
      .from('daily_itinerary')
      .select('id, day_number, activity_name, description, is_optional, optional_price')
      .eq('package_id', packageId)
      .eq('is_optional', true)
      .order('day_number', { ascending: true });

    if (error) throw error;

    const items: OptionalItineraryItem[] = (data || []).map((item: any) => ({
      id: item.id,
      day_number: item.day_number,
      activity_name: item.activity_name,
      description: item.description,
      is_optional: item.is_optional,
      optional_price: item.optional_price,
    }));

    return { data: items, error: null };
  } catch (error) {
    console.error('Error fetching optional itinerary items:', error);
    return { data: null, error };
  }
}

// ============================================================================
// COUPON VALIDATION
// ============================================================================

export async function validateCoupon(code: string, totalAmount: number) {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('status', 'active')
      .single();

    if (error || !data) {
      return { data: null, error: 'Invalid or expired coupon code' };
    }

    // Check validity dates
    const now = new Date();
    const startDate = new Date(data.validity.start_date);
    const endDate = new Date(data.validity.end_date);

    if (now < startDate || now > endDate) {
      return { data: null, error: 'Coupon has expired or is not yet valid' };
    }

    // Check minimum amount
    if (data.conditions?.minimum_amount && totalAmount < data.conditions.minimum_amount) {
      return {
        data: null,
        error: `Minimum purchase of ${data.conditions.minimum_amount} required`
      };
    }

    // Check usage limit
    if (data.usage.limit !== null && data.usage.used >= data.usage.limit) {
      return { data: null, error: 'Coupon usage limit reached' };
    }

    const coupon: Coupon = {
      id: data.id,
      code: data.code,
      name: data.name,
      description: data.description,
      type: data.type as 'percentage' | 'fixed',
      value: data.value,
      status: data.status as 'active' | 'inactive' | 'expired' | 'scheduled',
      conditions: data.conditions,
      validity: data.validity,
    };

    return { data: coupon, error: null };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { data: null, error: 'Failed to validate coupon' };
  }
}

// ============================================================================
// BOOKING SUBMISSION
// ============================================================================

export async function submitBooking(bookingState: BookingState, customerId: string) {
  try {
    console.log('📝 Booking Service: Starting submission...');
    console.log('Customer ID:', customerId);
    console.log('Package ID:', bookingState.package_id);
    console.log('Departure Date ID:', bookingState.departure_date_id);
    
    // Start a transaction-like operation
    // 1. Generate booking number
    console.log('1️⃣  Generating booking number...');
    const { data: bookingNumberData, error: bookingNumberError } = await supabase
      // @ts-ignore
      .rpc('get_next_booking_number', {
        p_package_id: String(bookingState.package_id),
        p_departure_date: bookingState.departure_date?.start_date
      });

    if (bookingNumberError) {
      console.error('❌ Failed to generate booking number:', bookingNumberError);
      throw bookingNumberError;
    }
    const bookingNumber = bookingNumberData as string;
    console.log('✅ Booking number generated:', bookingNumber);

    // 2. Calculate dates
    const departureDate = bookingState.departure_date!;
    const balanceDueDate = new Date(departureDate.start_date);
    balanceDueDate.setDate(balanceDueDate.getDate() - 60); // 60 days before departure

    // 3. Insert booking
    console.log('2️⃣  Inserting booking record...');
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        // @ts-ignore - New table not in generated types yet
        booking_number: bookingNumber,
        customer_id: customerId,
        package_id: bookingState.package_id,
        departure_date_id: bookingState.departure_date_id,
        travel_start_date: departureDate.start_date,
        travel_end_date: departureDate.end_date,
        participants: bookingState.participants,
        status: 'confirmed',
        total_amount: bookingState.pricing.total_amount,
        paid_amount: 0,
        payment_status: 'pending',
        currency: bookingState.pricing.currency,
        coupon_id: bookingState.applied_coupon?.id,
        coupon_discount: bookingState.pricing.coupon_discount,
        subtotal: bookingState.pricing.subtotal,
        payment_plan: bookingState.payment_plan,
        payment_method: 'pay_later',
        deposit_amount: bookingState.pricing.deposit_amount,
        balance_amount: bookingState.pricing.balance_amount,
        balance_due_date: bookingState.payment_plan === 'deposit' ? balanceDueDate.toISOString().split('T')[0] : null,
        special_requests: bookingState.special_requests || null,
        booking_date: new Date().toISOString(),
      })
      .select()
      .single();

    if (bookingError) {
      console.error('❌ Failed to insert booking:', bookingError);
      throw bookingError;
    }
    console.log('✅ Booking record created:', booking.id);

    // 4. Insert travelers
    const travelersToInsert = bookingState.travelers.map((traveler, index) => ({
      booking_id: booking.id,
      participant_number: index + 1,
      is_lead_traveler: traveler.is_lead_traveler,
      first_name: traveler.first_name,
      last_name: traveler.last_name,
      email: traveler.email,
      phone: traveler.phone,
      ic_number: traveler.ic_number,
      nationality: traveler.nationality,
      date_of_birth: traveler.date_of_birth,
      gender: traveler.gender,
      passport_number: traveler.passport_number,
      passport_expiry: traveler.passport_expiry,
      emergency_contact_name: traveler.emergency_contact_name,
      emergency_contact_relation: traveler.emergency_contact_relation,
      emergency_contact_phone: traveler.emergency_contact_phone,
      dietary_requirements: traveler.dietary_requirements,
      medical_conditions: traveler.medical_conditions,
      special_needs: traveler.special_needs,
    }));

    console.log('3️⃣  Inserting travelers...', travelersToInsert.length, 'travelers');
    const { error: travelersError } = await supabase
      .from('booking_travelers')
      // @ts-ignore - New table not in generated types yet
      .insert(travelersToInsert);

    if (travelersError) {
      console.error('❌ Failed to insert travelers:', travelersError);
      throw travelersError;
    }
    console.log('✅ Travelers inserted successfully');

    // 5. Insert add-ons if any
    if (bookingState.selected_addons.length > 0) {
      const addonsToInsert = bookingState.selected_addons.map(addon => ({
        booking_id: booking.id,
        addon_id: addon.addon_id,
        addon_type: addon.addon_type,
        itinerary_id: addon.itinerary_id,
        addon_name: addon.addon_name,
        quantity: addon.quantity,
        unit_price: addon.unit_price,
        total_price: addon.total_price,
      }));

      const { error: addonsError } = await supabase
        .from('booking_addons')
        // @ts-ignore - New table not in generated types yet
        .insert(addonsToInsert);

      if (addonsError) throw addonsError;
    }

    // 6. Record coupon usage if applicable
    if (bookingState.applied_coupon) {
      const { error: couponUsageError } = await supabase
        .from('coupon_usage')
        // @ts-ignore - New table not in generated types yet
        .insert({
          coupon_id: bookingState.applied_coupon.id,
          booking_id: booking.id,
          customer_id: customerId,
          discount_amount: bookingState.pricing.coupon_discount,
          original_amount: bookingState.pricing.subtotal + bookingState.pricing.addons_total,
          final_amount: bookingState.pricing.total_amount,
        });

      if (couponUsageError) throw couponUsageError;
    }

    // 7. Update capacity
    console.log('4️⃣  Updating departure date capacity...');
    console.log('Departure Date ID:', bookingState.departure_date_id);
    console.log('Current booked:', departureDate.booked);
    console.log('Current available:', departureDate.available);
    console.log('Participants to add:', bookingState.participants);
    
    const { error: capacityError } = await supabase
      .from('package_departure_dates')
      // @ts-ignore
      .update({
        booked: departureDate.booked + bookingState.participants,
        available: departureDate.available - bookingState.participants,
      })
      .eq('id', bookingState.departure_date_id);

    if (capacityError) {
      console.error('❌ Failed to update capacity - FULL ERROR:');
      console.error('Error code:', capacityError.code);
      console.error('Error message:', capacityError.message);
      console.error('Error details:', capacityError.details);
      console.error('Error hint:', capacityError.hint);
      console.error('Complete error object:', JSON.stringify(capacityError, null, 2));
      throw capacityError;
    }
    console.log('✅ Capacity updated successfully');

    // 8. Create initial payment record
    const { error: paymentError } = await supabase
      .from('booking_payments')
      // @ts-ignore - New table not in generated types yet
      .insert({
        booking_id: booking.id,
        payment_number: `PAY-${bookingNumber}`,
        payment_type: bookingState.payment_plan === 'full' ? 'full' : 'deposit',
        amount: bookingState.payment_plan === 'deposit' ? bookingState.pricing.deposit_amount : bookingState.pricing.total_amount,
        currency: bookingState.pricing.currency,
        status: 'pending',
        due_date: new Date().toISOString().split('T')[0],
      });

    if (paymentError) throw paymentError;

    // Success!
    return {
      success: true,
      booking_id: booking.id,
      booking_number: bookingNumber,
      error: null
    };

  } catch (error) {
    console.error('Error submitting booking:', error);
    return {
      success: false,
      booking_id: null,
      booking_number: null,
      error: error instanceof Error ? error.message : 'Failed to submit booking'
    };
  }
}
