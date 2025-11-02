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

  const handleSubmitBooking = async () => {
    // Validate terms accepted
    if (!state.terms_accepted) {
      setError('Please accept the terms and conditions to continue');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // TODO: Submit booking to Supabase
      console.log('Submitting booking...', state);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Move to confirmation step
      completeStep(4);
      nextStep();
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
      console.error(err);
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
