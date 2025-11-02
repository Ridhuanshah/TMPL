import { Receipt, Tag, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';
import type { PriceSummary as PriceSummaryType } from '../../types/booking.types';

interface PriceSummaryProps {
  pricing: PriceSummaryType;
  participants: number;
  className?: string;
  showDeposit?: boolean;
}

export function PriceSummary({ pricing, participants, className = '', showDeposit = false }: PriceSummaryProps) {
  const { subtotal, addons_total, coupon_discount, total_amount, deposit_amount, balance_amount, currency } = pricing;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Receipt className="w-5 h-5" />
          Price Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Package ({participants} {participants === 1 ? 'traveler' : 'travelers'})
          </span>
          <span className="font-medium">
            {currency} {subtotal.toFixed(2)}
          </span>
        </div>

        {/* Add-ons */}
        {addons_total > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Add-ons</span>
            <span className="font-medium">
              {currency} {addons_total.toFixed(2)}
            </span>
          </div>
        )}

        {/* Coupon discount */}
        {coupon_discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Discount
            </span>
            <span className="font-medium text-green-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -{currency} {coupon_discount.toFixed(2)}
            </span>
          </div>
        )}

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-base font-bold">
          <span>Total Amount</span>
          <span className="text-blue-600">
            {currency} {total_amount.toFixed(2)}
          </span>
        </div>

        {/* Deposit & Balance (if applicable) */}
        {showDeposit && deposit_amount && balance_amount && (
          <>
            <Separator className="my-2" />
            <div className="space-y-2 text-sm bg-blue-50 p-3 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-700">Deposit Amount:</span>
                <span className="font-semibold text-blue-700">
                  {currency} {deposit_amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Balance Due:</span>
                <span className="font-medium text-gray-700">
                  {currency} {balance_amount.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                * Balance must be paid 60 days before departure
              </p>
            </div>
          </>
        )}

        {/* Tax note */}
        <p className="text-xs text-gray-500 pt-2">
          All prices are in {currency}. Taxes included where applicable.
        </p>
      </CardContent>
    </Card>
  );
}
