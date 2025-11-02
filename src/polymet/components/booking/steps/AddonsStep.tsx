import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '../../../contexts/BookingContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';

interface AddonsStepProps {
  packageId: string;
}

export function AddonsStep({ packageId }: AddonsStepProps) {
  const { nextStep, previousStep, completeStep } = useBooking();

  const handleContinue = () => {
    completeStep(2);
    nextStep();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Optional Add-ons</CardTitle>
          <CardDescription>Enhance your travel experience</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            🚧 Add-ons selector coming next
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue to Traveler Info
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
