import { useState, useEffect } from 'react';
import { Package, Plus, Minus, Check, Users, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Checkbox } from '../../../components/ui/checkbox';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { cn } from '../../../lib/utils';
import type { PackageAddon, OptionalItineraryItem, SelectedAddon } from '../../types/booking.types';

interface AddonsSelectorProps {
  packageId: string;
  participants: number;
  selectedAddons: SelectedAddon[];
  onAddonsChange: (addons: SelectedAddon[]) => void;
}

export function AddonsSelector({ packageId, participants, selectedAddons, onAddonsChange }: AddonsSelectorProps) {
  const [packageAddons, setPackageAddons] = useState<PackageAddon[]>([]);
  const [optionalItems, setOptionalItems] = useState<OptionalItineraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAddons();
  }, [packageId]);

  const fetchAddons = async () => {
    setLoading(true);
    setError('');

    try {
      // Import the service functions
      const {
        fetchPackageAddons,
        fetchOptionalItineraryItems
      } = await import('../../services/booking-service');

      // Fetch real data
      const [addonsResult, itemsResult] = await Promise.all([
        fetchPackageAddons(packageId),
        fetchOptionalItineraryItems(packageId)
      ]);

      if (addonsResult.data || itemsResult.data) {
        setPackageAddons(addonsResult.data || []);
        setOptionalItems(itemsResult.data || []);
        setLoading(false);
        return;
      }

      // Fallback to mock data if no real data
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockAddons: PackageAddon[] = [
        {
          id: 'addon-1',
          package_id: packageId,
          name: 'Travel Insurance',
          description: 'Comprehensive travel insurance covering medical emergencies, trip cancellations, and lost baggage',
          category: 'insurance',
          price: 250,
          price_type: 'per_person',
          currency: 'RM',
          is_active: true,
          display_order: 1,
        },
        {
          id: 'addon-2',
          package_id: packageId,
          name: 'Airport Transfer',
          description: 'Round-trip airport transfer with private vehicle',
          category: 'transport',
          price: 150,
          price_type: 'per_booking',
          currency: 'RM',
          is_active: true,
          display_order: 2,
        },
        {
          id: 'addon-3',
          package_id: packageId,
          name: 'Travel Adapter Kit',
          description: 'Universal travel adapter compatible with multiple countries',
          category: 'equipment',
          price: 50,
          price_type: 'per_person',
          currency: 'RM',
          is_active: true,
          display_order: 3,
        },
      ];

      const mockOptionalItems: OptionalItineraryItem[] = [
        {
          id: 'item-1',
          day_number: 3,
          activity_name: 'Hot Air Balloon Ride',
          description: 'Experience breathtaking views from a hot air balloon',
          is_optional: true,
          optional_price: 380,
        },
        {
          id: 'item-2',
          day_number: 5,
          activity_name: 'Spa & Wellness Package',
          description: 'Relaxing spa treatment with massage and aromatherapy',
          is_optional: true,
          optional_price: 220,
        },
      ];

      setPackageAddons(mockAddons);
      setOptionalItems(mockOptionalItems);
    } catch (err) {
      setError('Failed to load add-ons. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isAddonSelected = (addonId: string) => {
    return selectedAddons.some(a => a.addon_id === addonId || a.itinerary_id === addonId);
  };

  const handleAddonToggle = (addon: PackageAddon) => {
    const isSelected = isAddonSelected(addon.id);
    
    if (isSelected) {
      // Remove addon
      onAddonsChange(selectedAddons.filter(a => a.addon_id !== addon.id));
    } else {
      // Add addon
      const unitPrice = addon.price;
      const totalPrice = addon.price_type === 'per_person' ? unitPrice * participants : unitPrice;
      
      const newAddon: SelectedAddon = {
        addon_id: addon.id,
        addon_type: 'package_addon',
        addon_name: addon.name,
        quantity: addon.price_type === 'per_person' ? participants : 1,
        unit_price: unitPrice,
        total_price: totalPrice,
      };
      
      onAddonsChange([...selectedAddons, newAddon]);
    }
  };

  const handleOptionalItemToggle = (item: OptionalItineraryItem) => {
    const isSelected = isAddonSelected(item.id);
    
    if (isSelected) {
      // Remove item
      onAddonsChange(selectedAddons.filter(a => a.itinerary_id !== item.id));
    } else {
      // Add item
      const unitPrice = item.optional_price || 0;
      const totalPrice = unitPrice * participants;
      
      const newAddon: SelectedAddon = {
        itinerary_id: item.id,
        addon_type: 'optional_itinerary',
        addon_name: item.activity_name,
        quantity: participants,
        unit_price: unitPrice,
        total_price: totalPrice,
      };
      
      onAddonsChange([...selectedAddons, newAddon]);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'insurance':
        return '🛡️';
      case 'transport':
        return '🚗';
      case 'equipment':
        return '🎒';
      case 'service':
        return '🔧';
      default:
        return '📦';
    }
  };

  const calculateTotal = () => {
    return selectedAddons.reduce((sum, addon) => sum + addon.total_price, 0);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const hasAddons = packageAddons.length > 0 || optionalItems.length > 0;

  if (!hasAddons) {
    return (
      <Alert>
        <Package className="h-4 w-4" />
        <AlertDescription>
          No additional add-ons available for this package. You can proceed to the next step.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Package Add-ons */}
      {packageAddons.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Package Add-ons</h3>
            <p className="text-sm text-gray-600">Enhance your travel experience</p>
          </div>

          <div className="space-y-3">
            {packageAddons.map((addon) => {
              const isSelected = isAddonSelected(addon.id);
              const totalPrice = addon.price_type === 'per_person' ? addon.price * participants : addon.price;

              return (
                <Card
                  key={addon.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    isSelected && 'ring-2 ring-blue-500 bg-blue-50'
                  )}
                  onClick={() => handleAddonToggle(addon)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleAddonToggle(addon)}
                        className="mt-1"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl">{getCategoryIcon(addon.category)}</span>
                              <h4 className="font-semibold">{addon.name}</h4>
                              {isSelected && (
                                <Badge className="bg-green-600">
                                  <Check className="w-3 h-3 mr-1" />
                                  Added
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {addon.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              {addon.price_type === 'per_person' ? (
                                <>
                                  <Users className="w-3 h-3" />
                                  <span>Per person</span>
                                </>
                              ) : (
                                <>
                                  <Building className="w-3 h-3" />
                                  <span>Per booking</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              {addon.currency} {addon.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {addon.price_type === 'per_person' ? 'per person' : 'total'}
                            </p>
                            {addon.price_type === 'per_person' && (
                              <p className="text-xs font-medium text-gray-700 mt-1">
                                Total: {addon.currency} {totalPrice.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Optional Itinerary Items */}
      {optionalItems.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Optional Activities</h3>
            <p className="text-sm text-gray-600">Add special experiences to your itinerary</p>
          </div>

          <div className="space-y-3">
            {optionalItems.map((item) => {
              const isSelected = isAddonSelected(item.id);
              const totalPrice = (item.optional_price || 0) * participants;

              return (
                <Card
                  key={item.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    isSelected && 'ring-2 ring-blue-500 bg-blue-50'
                  )}
                  onClick={() => handleOptionalItemToggle(item)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleOptionalItemToggle(item)}
                        className="mt-1"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{item.activity_name}</h4>
                              <Badge variant="outline">Day {item.day_number}</Badge>
                              {isSelected && (
                                <Badge className="bg-green-600">
                                  <Check className="w-3 h-3 mr-1" />
                                  Added
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Users className="w-3 h-3" />
                              <span>Per person × {participants}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">
                              RM {item.optional_price?.toFixed(2) || '0.00'}
                            </p>
                            <p className="text-xs text-gray-500">per person</p>
                            <p className="text-xs font-medium text-gray-700 mt-1">
                              Total: RM {totalPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Add-ons Summary */}
      {selectedAddons.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-900">
                  {selectedAddons.length} {selectedAddons.length === 1 ? 'add-on' : 'add-ons'} selected
                </p>
                <p className="text-sm text-blue-700">
                  Added to your booking
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  RM {calculateTotal().toFixed(2)}
                </p>
                <p className="text-xs text-blue-700">Total add-ons cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-gray-500 text-center">
        💡 Add-ons are optional. You can skip this step or select none to continue.
      </p>
    </div>
  );
}
