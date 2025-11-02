import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useBooking } from '../../../contexts/BookingContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Alert, AlertDescription } from '../../../../components/ui/alert';
import { TravelerForm } from '../TravelerForm';
import { travelerSchema } from '../../../schemas/booking-schemas';
import type { TravelerInfo } from '../../../types/booking.types';

export function TravelersStep() {
  const { state, updateTraveler, copyTravelerData, nextStep, previousStep, completeStep } = useBooking();
  const [errors, setErrors] = useState<Record<number, any>>({});

  const validateAndContinue = () => {
    const newErrors: Record<number, any> = {};
    let hasErrors = false;

    // Validate each traveler
    state.travelers.forEach((traveler, index) => {
      const result = travelerSchema.safeParse(traveler);
      if (!result.success) {
        const travelerErrors: any = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            travelerErrors[err.path[0]] = err.message;
          }
        });
        newErrors[index] = travelerErrors;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      completeStep(3);
      nextStep();
    } else {
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Traveler Information
          </CardTitle>
          <CardDescription>
            Complete details for all {state.participants} {state.participants === 1 ? 'traveler' : 'travelers'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              <p className="font-medium mb-2">📝 Required Information:</p>
              <ul className="text-sm space-y-1 ml-4 list-disc">
                <li>Personal details (name, email, phone, IC/passport, nationality, DOB, gender)</li>
                <li>Passport information</li>
                <li>Emergency contact details (name, relationship, phone)</li>
              </ul>
              <p className="text-xs mt-2 text-gray-600">
                * All fields marked with red asterisk are mandatory
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Traveler Forms */}
      <div className="space-y-4">
        {state.travelers.map((traveler, index) => (
          <TravelerForm
            key={index}
            traveler={traveler}
            index={index}
            totalTravelers={state.travelers.length}
            onUpdate={updateTraveler}
            onCopyFrom={copyTravelerData}
            errors={errors[index]}
          />
        ))}
      </div>

      {/* Error Summary */}
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            Please complete all required fields for all travelers before continuing.
            {Object.keys(errors).length === 1
              ? ` 1 traveler has incomplete information.`
              : ` ${Object.keys(errors).length} travelers have incomplete information.`}
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep} size="lg">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={validateAndContinue} size="lg">
          Continue to Review
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
