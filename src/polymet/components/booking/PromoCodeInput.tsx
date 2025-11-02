import { useState } from 'react';
import { Tag, Check, X, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { useBooking } from '../../contexts/BookingContext';
import { promoCodeSchema } from '../../schemas/booking-schemas';
import type { Coupon } from '../../types/booking.types';

interface PromoCodeInputProps {
  onApply?: (coupon: Coupon) => void;
  onRemove?: () => void;
}

export function PromoCodeInput({ onApply, onRemove }: PromoCodeInputProps) {
  const { state, applyCoupon, removeCoupon } = useBooking();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    // Validate format
    const validation = promoCodeSchema.safeParse({ code });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Import the service function
      const { validateCoupon } = await import('../../services/booking-service');
      
      // Get current total for validation
      const totalAmount = state.pricing.subtotal + state.pricing.addons_total;
      
      // Validate coupon with Supabase
      const { data: coupon, error: validationError } = await validateCoupon(code, totalAmount);

      if (validationError || !coupon) {
        setError(validationError as string || 'Invalid promo code');
        return;
      }

      // Apply the valid coupon
      applyCoupon(coupon);
      onApply?.(coupon);
      setCode('');
      
    } catch (err) {
      setError('Failed to apply promo code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    removeCoupon();
    onRemove?.();
    setCode('');
    setError('');
  };

  return (
    <div className="space-y-3">
      {/* Applied coupon display */}
      {state.applied_coupon ? (
        <Alert className="border-green-200 bg-green-50">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <p className="font-medium text-green-900">
                {state.applied_coupon.name}
              </p>
              <p className="text-sm text-green-700">
                Code: <span className="font-mono font-semibold">{state.applied_coupon.code}</span>
                {' - '}
                {state.applied_coupon.type === 'percentage'
                  ? `${state.applied_coupon.value}% off`
                  : `RM ${state.applied_coupon.value} off`}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Promo code input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter promo code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleApply();
                  }
                }}
                className="pl-10"
                disabled={loading}
              />
            </div>
            <Button
              onClick={handleApply}
              disabled={!code.trim() || loading}
              variant="outline"
              className="min-w-[100px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Applying
                </>
              ) : (
                'Apply'
              )}
            </Button>
          </div>

          {/* Error message */}
          {error && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Hint */}
          <p className="text-xs text-gray-500">
            💡 Try code <span className="font-mono font-semibold">WELCOME10</span> for 10% off
          </p>
        </>
      )}
    </div>
  );
}
