import { useSearchParams, Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export function PaymentCancelledPage() {
  const [searchParams] = useSearchParams();
  const bookingNumber = searchParams.get('booking');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-orange-200 shadow-lg">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-orange-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-orange-700">
              Payment Cancelled
            </CardTitle>
            <p className="text-gray-600">
              You cancelled the payment process.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {bookingNumber && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
                <p className="text-2xl font-bold text-orange-700">{bookingNumber}</p>
                <p className="text-xs text-gray-500 mt-2">Your booking is on hold for 24 hours</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Your booking has been saved and is on hold for 24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You can complete the payment anytime within this period</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>After 24 hours, the booking will be automatically cancelled</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button className="flex-1" size="lg" asChild>
                <Link to={`/packages/amazon-rainforest-explorer/book`}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Complete Payment
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" size="lg" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 mb-2">Have questions?</p>
              <p className="text-sm">
                Contact us at{' '}
                <a href="mailto:hi@tmplescapade.my" className="text-blue-600 hover:underline font-medium">
                  hi@tmplescapade.my
                </a>
                {' '}or call{' '}
                <a href="tel:+60198816388" className="text-blue-600 hover:underline font-medium">
                  019-8816388
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
