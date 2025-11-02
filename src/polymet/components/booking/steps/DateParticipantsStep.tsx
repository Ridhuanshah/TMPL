import { Calendar, Users, ChevronRight } from 'lucide-react';
import { useBooking } from '../../../contexts/BookingContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { DateSelector } from '../DateSelector';
import type { PackageDepartureDate } from '../../../types/booking.types';

interface DateParticipantsStepProps {
  packageId: string;
}

export function DateParticipantsStep({ packageId }: DateParticipantsStepProps) {
  const { state, setPackageAndDate, setParticipants, nextStep, completeStep } = useBooking();

  const handleDateSelect = (date: PackageDepartureDate) => {
    setPackageAndDate(packageId, date);
  };

  const handleContinue = () => {
    if (state.departure_date && state.participants > 0) {
      completeStep(1);
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Departure Date
          </CardTitle>
          <CardDescription>
            Choose your preferred travel dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DateSelector
            packageId={packageId}
            selectedDateId={state.departure_date_id || undefined}
            onSelect={handleDateSelect}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Number of Participants
          </CardTitle>
          <CardDescription>
            How many people will be traveling?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setParticipants(Math.max(1, state.participants - 1))}
              disabled={state.participants <= 1}
            >
              -
            </Button>
            
            <div className="text-center min-w-[80px]">
              <div className="text-3xl font-bold">{state.participants}</div>
              <div className="text-sm text-gray-500">
                {state.participants === 1 ? 'Traveler' : 'Travelers'}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setParticipants(state.participants + 1)}
              disabled={state.departure_date ? state.participants >= state.departure_date.available : false}
            >
              +
            </Button>
          </div>

          {state.departure_date && (
            <p className="text-sm text-gray-500 mt-4">
              {state.departure_date.available} spots available
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!state.departure_date || state.participants === 0}
          size="lg"
        >
          Continue to Add-ons
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
