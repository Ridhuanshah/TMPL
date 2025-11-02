import { ChevronLeft } from 'lucide-react';
import { useBooking } from '../../../contexts/BookingContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';

interface ReviewPaymentStepProps {
  packageName: string;
  packageSlug: string;
}

export function ReviewPaymentStep({ packageName, packageSlug }: ReviewPaymentStepProps) {
  const { state, previousStep } = useBooking();

  const handleSubmitBooking = () => {
    // TODO: Submit booking to Supabase
    console.log('Submitting booking...', state);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Booking</CardTitle>
          <CardDescription>{packageName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Trip Details</h4>
            <p className="text-sm text-gray-600">
              {state.participants} {state.participants === 1 ? 'traveler' : 'travelers'}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Price Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{state.pricing.currency} {state.pricing.subtotal.toFixed(2)}</span>
              </div>
              {state.pricing.addons_total > 0 && (
                <div className="flex justify-between">
                  <span>Add-ons:</span>
                  <span>{state.pricing.currency} {state.pricing.addons_total.toFixed(2)}</span>
                </div>
              )}
              {state.pricing.coupon_discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-{state.pricing.currency} {state.pricing.coupon_discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>{state.pricing.currency} {state.pricing.total_amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            🚧 Full review & payment options coming next
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleSubmitBooking} size="lg">
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
