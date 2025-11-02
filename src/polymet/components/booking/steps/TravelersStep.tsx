import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '../../../contexts/BookingContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';

export function TravelersStep() {
  const { state, nextStep, previousStep, completeStep } = useBooking();

  const handleContinue = () => {
    completeStep(3);
    nextStep();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Traveler Information</CardTitle>
          <CardDescription>
            Complete details for all {state.participants} {state.participants === 1 ? 'traveler' : 'travelers'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            🚧 Traveler forms coming next (11 fields per person)
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue to Review
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
