import React, { useEffect } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { BOOKING_STEPS } from '../../types/booking.types';
import { StepIndicator } from './StepIndicator';
import { DateParticipantsStep } from './steps/DateParticipantsStep';
import { AddonsStep } from './steps/AddonsStep';
import { TravelersStep } from './steps/TravelersStep';
import { ReviewPaymentStep } from './steps/ReviewPaymentStep';
import { ConfirmationStep } from './steps/ConfirmationStep';

interface BookingWizardProps {
  packageId: string;
  packageName: string;
  packageSlug: string;
}

export function BookingWizard({ packageId, packageName, packageSlug }: BookingWizardProps) {
  const { state, restoreFromLocalStorage, clearBooking } = useBooking();

  // Restore draft on mount
  useEffect(() => {
    const restored = restoreFromLocalStorage();
    if (restored) {
      console.log('📝 Booking draft restored from localStorage');
    }
  }, [restoreFromLocalStorage]);

  // Warn before leaving with unsaved changes
  // DISABLED: This blocks redirects to payment gateways
  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     if (state.current_step > 1 && state.current_step < 5) {
  //       e.preventDefault();
  //       e.returnValue = 'You have an incomplete booking. Are you sure you want to leave?';
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  // }, [state.current_step]);

  // Render current step
  const renderStep = () => {
    switch (state.current_step) {
      case 1:
        return <DateParticipantsStep packageId={packageId} />;
      case 2:
        return <AddonsStep packageId={packageId} />;
      case 3:
        return <TravelersStep />;
      case 4:
        return <ReviewPaymentStep packageName={packageName} packageSlug={packageSlug} />;
      case 5:
        return <ConfirmationStep />;
      default:
        return <DateParticipantsStep packageId={packageId} />;
    }
  };

  return (
    <div className="booking-wizard min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Trip
          </h1>
          <p className="text-gray-600">
            Complete the booking form to secure your spot on {packageName}
          </p>
        </div>

        {/* Step Indicator */}
        {state.current_step < 5 && (
          <StepIndicator
            steps={BOOKING_STEPS}
            currentStep={state.current_step}
            completedSteps={state.completed_steps}
          />
        )}

        {/* Current Step Content */}
        <div className="mt-8">
          {renderStep()}
        </div>

        {/* Debug info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
