import { useSearchParams, Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export function PaymentFailedPage() {
  const [searchParams] = useSearchParams();
  const bookingNumber = searchParams.get('booking');

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-red-200 shadow-lg">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-red-700">
              Payment Failed
            </CardTitle>
            <p className="text-gray-600">
              We couldn't process your payment. Please try again.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {bookingNumber && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
                <p className="text-2xl font-bold text-red-700">{bookingNumber}</p>
                <p className="text-xs text-gray-500 mt-2">Your booking is on hold for 24 hours</p>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Common reasons for payment failure:</h3>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Insufficient funds in your account</li>
                <li>Incorrect card details entered</li>
                <li>Card expired or blocked</li>
                <li>Transaction declined by your bank</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button className="flex-1" size="lg" asChild>
                <Link to={`/packages/amazon-rainforest-explorer/book`}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
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
              <p className="text-sm text-gray-600 mb-2">Need assistance?</p>
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
