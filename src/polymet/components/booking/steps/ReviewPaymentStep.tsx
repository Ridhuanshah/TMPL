import { useState } from 'react';
import { ChevronLeft, CheckCircle2, Calendar, Users, MapPin, Package } from 'lucide-react';
import { useBooking } from '../../../contexts/BookingContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Separator } from '../../../../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../../../../components/ui/radio-group';
import { Label } from '../../../../components/ui/label';
import { Checkbox } from '../../../../components/ui/checkbox';
import { Textarea } from '../../../../components/ui/textarea';
import { Alert, AlertDescription } from '../../../../components/ui/alert';
import { PriceSummary } from '../PriceSummary';
import { PromoCodeInput } from '../PromoCodeInput';
import type { PaymentPlan } from '../../../types/booking.types';

interface ReviewPaymentStepProps {
  packageName: string;
  packageSlug: string;
}

export function ReviewPaymentStep({ packageName }: ReviewPaymentStepProps) {
  const {
    state,
    previousStep,
    nextStep,
    setPaymentPlan,
    setSpecialRequests,
    setTermsAccepted,
    completeStep,
  } = useBooking();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const calculateDepositAmount = (): number => {
    return state.pricing.total_amount < 10000 ? 500 : 1000;
  };

  const handlePaymentPlanChange = (plan: PaymentPlan) => {
    setPaymentPlan(plan);
  };

  const handleChipPayment = async (bookingNumber: string, customerEmail: string) => {
    try {
      const { createChipPurchase, convertToCents, CHIP_BRAND_ID } = await import('../../../services/chip-payment-service');
      
      const leadTraveler = state.travelers.find(t => t.is_lead_traveler) || state.travelers[0];
      
      // Calculate payment amount based on payment plan
      let amount = state.pricing.total_amount;
      if (state.payment_plan === 'deposit') {
        amount = calculateDepositAmount();
      }
      
      // Create Chip purchase
      const result = await createChipPurchase({
        client: {
          email: customerEmail,
          full_name: `${leadTraveler.first_name} ${leadTraveler.last_name}`,
          phone: leadTraveler.phone,
        },
        purchase: {
          products: [
            {
              name: `Travel Package Booking - ${bookingNumber}`,
              quantity: 1,
              price: convertToCents(amount),
            },
          ],
          currency: 'MYR',
          notes: `Booking: ${bookingNumber} | Payment Plan: ${state.payment_plan}`,
        },
        brand_id: CHIP_BRAND_ID,
        success_redirect: `${window.location.origin}/booking/payment-success?booking=${bookingNumber}`,
        failure_redirect: `${window.location.origin}/booking/payment-failed?booking=${bookingNumber}`,
        cancel_redirect: `${window.location.origin}/booking/payment-cancelled?booking=${bookingNumber}`,
        reference: bookingNumber,
      });
      
      if (!result.success || !result.data) {
        setError(result.error || 'Failed to initialize payment');
        return;
      }
      
      console.log('✅ Chip payment created:', result.data.id);
      
      // Redirect to Chip checkout
      window.location.href = result.data.checkout_url;
    } catch (err) {
      setError('Failed to initialize payment gateway');
      console.error('Chip payment error:', err);
    }
  };

  const handleSubmitBooking = async () => {
    // Validate terms accepted
    if (!state.terms_accepted) {
      setError('Please accept the terms and conditions to continue');
      return;
    }

    setSubmitting(true);
    setError('');

    // Debug logger - START
    console.log('========================================');
    console.log('🚀 BOOKING SUBMISSION STARTED');
    console.log('========================================');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Payment Plan:', state.payment_plan);
    console.log('Total Amount:', state.pricing.total_amount);

    try {
      const leadTraveler = state.travelers.find(t => t.is_lead_traveler) || state.travelers[0];
      const email = leadTraveler?.email;
      
      if (!email) {
        setError('Lead traveler email is required');
        return;
      }

      // Import the service function and supabase
      const { submitBooking } = await import('../../../services/booking-service');
      const { supabase } = await import('../../../../lib/supabase');
      
      // SIMPLIFIED: No account registration, create guest user via RPC (bypasses RLS)
      console.log('✅ Processing as guest booking for:', email);
      
      // Create or get guest user using server function (bypasses RLS)
      const { data: userId, error: userError } = await supabase
        .rpc('create_guest_user', {
          p_email: email,
          p_name: `${leadTraveler.first_name} ${leadTraveler.last_name}`,
          p_phone: leadTraveler.phone
        });
      
      if (userError || !userId) {
        console.error('Failed to create user:', userError);
        setError('Failed to create user record. Please try again.');
        return;
      }
      
      console.log('✅ Guest user created/retrieved:', userId);
      console.log('User UUID format valid:', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId));
      
      // Submit booking to Supabase
      console.log('📤 Submitting booking to database...');
      const result = await submitBooking(state, userId);
      
      console.log('📥 Booking submission result:', {
        success: result.success,
        booking_number: result.booking_number,
        error: result.error
      });
      
      if (!result.success || !result.booking_number) {
        console.error('❌ BOOKING FAILED:', result.error);
        console.log('========================================');
        console.log('🚫 BOOKING SUBMISSION FAILED');
        console.log('========================================');
        setError(result.error || 'Failed to submit booking');
        return;
      }
      
      // Update state with booking details
      console.log('✅ Booking successful!', result);
      
      // Check if payment is required (not pay later)
      if (state.payment_plan !== 'pay_later') {
        console.log('💳 Payment required - Initializing Chip payment...');
        console.log('Payment Plan:', state.payment_plan);
        console.log('Amount:', state.payment_plan === 'deposit' ? calculateDepositAmount() : state.pricing.total_amount);
        
        // Redirect to Chip payment gateway
        await handleChipPayment(result.booking_number, email);
        return;
      }
      
      console.log('✅ Pay Later selected - Proceeding to confirmation');
      console.log('========================================');
      console.log('🎉 BOOKING COMPLETED SUCCESSFULLY');
      console.log('========================================');
      
      // Move to confirmation step for pay later
      completeStep(4);
      nextStep();
    } catch (err) {
      console.error('========================================');
      console.error('💥 EXCEPTION CAUGHT');
      console.error('========================================');
      console.error('Error type:', err instanceof Error ? err.constructor.name : typeof err);
      console.error('Error message:', err instanceof Error ? err.message : String(err));
      console.error('Full error:', err);
      console.error('========================================');
      
      setError('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const depositAmount = calculateDepositAmount();
  const balanceAmount = state.pricing.total_amount - depositAmount;

  return (
    <div className="space-y-6">
      {/* Trip Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Review Your Booking
          </CardTitle>
          <CardDescription>{packageName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Departure Details */}
          {state.departure_date && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">Departure Date</p>
                <p className="text-sm text-gray-600">
                  {new Date(state.departure_date.start_date).toLocaleDateString('en-MY', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' to '}
                  {new Date(state.departure_date.end_date).toLocaleDateString('en-MY', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}

          <Separator />

          {/* Travelers */}
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium mb-2">
                {state.participants} {state.participants === 1 ? 'Traveler' : 'Travelers'}
              </p>
              <div className="space-y-1">
                {state.travelers.map((traveler, idx) => (
                  <p key={idx} className="text-sm text-gray-600">
                    {idx + 1}. {traveler.first_name} {traveler.last_name}
                    {traveler.is_lead_traveler && <span className="ml-2 text-xs text-blue-600">(Lead)</span>}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Add-ons */}
          {state.selected_addons.length > 0 && (
            <>
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium mb-2">Selected Add-ons</p>
                  <div className="space-y-1">
                    {state.selected_addons.map((addon, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{addon.addon_name}</span>
                        <span className="font-medium">{state.pricing.currency} {addon.total_price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}
        </CardContent>
      </Card>

      {/* Promo Code */}
      <Card>
        <CardHeader>
          <CardTitle>Promo Code</CardTitle>
          <CardDescription>Have a discount code? Apply it here</CardDescription>
        </CardHeader>
        <CardContent>
          <PromoCodeInput />
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Options</CardTitle>
          <CardDescription>Choose how you'd like to pay</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={state.payment_plan}
            onValueChange={(value) => handlePaymentPlanChange(value as PaymentPlan)}
          >
            {/* Pay Later */}
            <div className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="pay_later" id="pay_later" />
              <Label htmlFor="pay_later" className="flex-1 cursor-pointer">
                <div className="font-medium">Pay Later</div>
                <p className="text-sm text-gray-600">
                  Reserve your spot now, pay the full amount later
                </p>
              </Label>
            </div>

            {/* Deposit */}
            <div className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="deposit" id="deposit" />
              <Label htmlFor="deposit" className="flex-1 cursor-pointer">
                <div className="font-medium">Pay Deposit</div>
                <p className="text-sm text-gray-600 mb-2">
                  Pay {state.pricing.currency} {depositAmount.toFixed(2)} now, balance of{' '}
                  {state.pricing.currency} {balanceAmount.toFixed(2)} due 60 days before departure
                </p>
              </Label>
            </div>

            {/* Full Payment */}
            <div className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full" className="flex-1 cursor-pointer">
                <div className="font-medium">Pay Full Amount</div>
                <p className="text-sm text-gray-600">
                  Pay the total amount of {state.pricing.currency} {state.pricing.total_amount.toFixed(2)} now
                </p>
              </Label>
            </div>
          </RadioGroup>

          <Alert>
            <MapPin className="h-4 w-4" />
            <AlertDescription>
              💡 Payment gateway will be available in Phase 2. For now, you'll receive payment instructions via email.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Special Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Special Requests</CardTitle>
          <CardDescription>Any special requirements or preferences?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., Room preferences, special occasions, accessibility needs..."
            value={state.special_requests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={4}
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-2">
            {state.special_requests.length}/1000 characters
          </p>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <PriceSummary
        pricing={state.pricing}
        participants={state.participants}
        showDeposit={state.payment_plan === 'deposit'}
      />

      {/* Terms & Conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={state.terms_accepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            />
            <Label
              htmlFor="terms"
              className="text-sm leading-relaxed cursor-pointer"
            >
              I agree to the{' '}
              <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>
              {' and '}
              <a href="/cancellation-policy" target="_blank" className="text-blue-600 hover:underline">
                Cancellation Policy
              </a>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep} size="lg" disabled={submitting}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleSubmitBooking}
          size="lg"
          disabled={!state.terms_accepted || submitting}
        >
          {submitting ? 'Submitting...' : 'Confirm Booking'}
          <CheckCircle2 className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
