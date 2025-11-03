import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Download, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const bookingNumber = searchParams.get('booking');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-700">
              Payment Successful!
            </CardTitle>
            <p className="text-gray-600">
              Thank you for your payment. Your booking has been confirmed.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {bookingNumber && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
                <p className="text-2xl font-bold text-green-700">{bookingNumber}</p>
              </div>
            )}

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Confirmation email sent</p>
                  <p className="text-gray-600">Check your inbox for booking details</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Payment processed</p>
                  <p className="text-gray-600">Your payment has been successfully received</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Booking confirmed</p>
                  <p className="text-gray-600">Your travel package has been reserved</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button className="flex-1" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex-1" size="lg" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500 pt-4">
              Need help? Contact us at{' '}
              <a href="mailto:hi@tmplescapade.my" className="text-blue-600 hover:underline">
                hi@tmplescapade.my
              </a>
              {' '}or call{' '}
              <a href="tel:+60198816388" className="text-blue-600 hover:underline">
                019-8816388
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
