import { CheckCircle2, Download, Home } from 'lucide-react';
import { useBooking } from '../../../contexts/BookingContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';

export function ConfirmationStep() {
  const { state, clearBooking } = useBooking();

  const handleDownloadPDF = () => {
    // TODO: Generate and download PDF
    console.log('Downloading PDF...');
  };

  const handleGoHome = () => {
    clearBooking();
    window.location.href = '/';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
            <p className="text-gray-600 mt-2">
              Your booking number: <span className="font-mono font-bold">{state.booking_number || 'PKG004-2025-JAN-001'}</span>
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">✓ What happens next?</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>✓ Confirmation email sent to your inbox</li>
              <li>✓ Trip details will be sent 3-7 days after booking</li>
              <li>✓ Payment instructions included in email</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Booking Summary</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Travelers:</span>
                <span className="font-medium">{state.participants}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">{state.pricing.currency} {state.pricing.total_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Plan:</span>
                <span className="font-medium capitalize">{state.payment_plan.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownloadPDF} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleGoHome} className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
