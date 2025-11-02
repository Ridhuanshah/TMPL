import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { useBooking } from '../../../contexts/BookingContext';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { AddonsSelector } from '../AddonsSelector';
import type { SelectedAddon } from '../../../types/booking.types';

interface AddonsStepProps {
  packageId: string;
}

export function AddonsStep({ packageId }: AddonsStepProps) {
  const { state, addAddon, removeAddon, clearAddons, nextStep, previousStep, completeStep } = useBooking();

  const handleAddonsChange = (addons: SelectedAddon[]) => {
    // Clear existing add-ons
    clearAddons();
    
    // Add new add-ons
    addons.forEach(addon => {
      addAddon(addon);
    });
  };

  const handleContinue = () => {
    completeStep(2);
    nextStep();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Optional Add-ons
          </CardTitle>
          <CardDescription>
            Enhance your travel experience with additional services and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddonsSelector
            packageId={packageId}
            participants={state.participants}
            selectedAddons={state.selected_addons}
            onAddonsChange={handleAddonsChange}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep} size="lg">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleContinue} size="lg">
          Continue to Traveler Info
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
