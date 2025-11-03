import { useState, useEffect } from 'react';
import { Calendar, Users, Plane, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { cn } from '../../../lib/utils';
import type { PackageDepartureDate } from '../../types/booking.types';

interface DateSelectorProps {
  packageId: string;
  selectedDateId?: string;
  onSelect: (date: PackageDepartureDate) => void;
}

export function DateSelector({ packageId, selectedDateId, onSelect }: DateSelectorProps) {
  const [departureDates, setDepartureDates] = useState<PackageDepartureDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartureDates();
  }, [packageId]);

  const fetchDepartureDates = async () => {
    setLoading(true);
    setError('');

    try {
      // Import the service function
      const { fetchDepartureDates: fetchDates } = await import('../../services/booking-service');
      const { data, error: fetchError } = await fetchDates(packageId);

      if (fetchError) {
        throw new Error('Failed to load departure dates');
      }

      if (data && data.length > 0) {
        setDepartureDates(data);
        setLoading(false);
        return;
      }

      // Fallback to mock data if no real data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockDates: PackageDepartureDate[] = [
        {
          id: 'a1111111-1111-1111-1111-111111111111',
          package_id: packageId,
          start_date: '2025-02-15',
          end_date: '2025-02-22',
          capacity: 20,
          booked: 5,
          available: 15,
          status: 'active',
          price_override: 12500,
          flight_type: 'Direct',
          trip_code: 'TRP-001',
        },
        {
          id: 'a2222222-2222-2222-2222-222222222222',
          package_id: packageId,
          start_date: '2025-03-10',
          end_date: '2025-03-17',
          capacity: 20,
          booked: 18,
          available: 2,
          status: 'active',
          price_override: 13000,
          flight_type: 'Direct',
          trip_code: 'TRP-002',
        },
        {
          id: 'a3333333-3333-3333-3333-333333333333',
          package_id: packageId,
          start_date: '2025-04-05',
          end_date: '2025-04-12',
          capacity: 20,
          booked: 20,
          available: 0,
          status: 'full',
          price_override: 14000,
          flight_type: 'Transit',
          trip_code: 'TRP-003',
        },
        {
          id: 'a4444444-4444-4444-4444-444444444444',
          package_id: packageId,
          start_date: '2025-05-20',
          end_date: '2025-05-27',
          capacity: 25,
          booked: 8,
          available: 17,
          status: 'active',
          price_override: 13500,
          flight_type: 'Direct',
          trip_code: 'TRP-004',
        },
      ];

      setDepartureDates(mockDates);
    } catch (err) {
      setError('Failed to load departure dates. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysUntilDeparture = (dateString: string) => {
    const departure = new Date(dateString);
    const today = new Date();
    const diffTime = departure.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getAvailabilityColor = (available: number, capacity: number) => {
    const percentage = (available / capacity) * 100;
    if (percentage === 0) return 'text-red-600';
    if (percentage < 20) return 'text-orange-600';
    if (percentage < 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (departureDates.length === 0) {
    return (
      <Alert>
        <Calendar className="h-4 w-4" />
        <AlertDescription>
          No departure dates available at the moment. Please check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {departureDates.map((date) => {
        const isSelected = date.id === selectedDateId;
        const isFull = date.status === 'full' || date.available === 0;
        const daysUntil = getDaysUntilDeparture(date.start_date);
        const availabilityColor = getAvailabilityColor(date.available, date.capacity);

        return (
          <Card
            key={date.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-md',
              isSelected && 'ring-2 ring-blue-500 shadow-md',
              isFull && 'opacity-60 cursor-not-allowed'
            )}
            onClick={() => !isFull && onSelect(date)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                {/* Date Information */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        {formatDate(date.start_date)} - {formatDate(date.end_date)}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>
                          {daysUntil > 0 
                            ? `${daysUntil} days until departure`
                            : 'Departing soon'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flight & Trip Info */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Plane className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">{date.flight_type}</span>
                    </div>
                    {date.trip_code && (
                      <Badge variant="outline" className="text-xs">
                        {date.trip_code}
                      </Badge>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-2">
                    <Users className={cn('w-4 h-4', availabilityColor)} />
                    <span className={cn('text-sm font-medium', availabilityColor)}>
                      {isFull ? (
                        'Sold Out'
                      ) : (
                        <>
                          {date.available} / {date.capacity} spots available
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Price & Status */}
                <div className="flex flex-col items-end gap-2">
                  {date.price_override && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        RM {date.price_override.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                  )}

                  {isFull ? (
                    <Badge variant="destructive" className="whitespace-nowrap">
                      <XCircle className="w-3 h-3 mr-1" />
                      Sold Out
                    </Badge>
                  ) : isSelected ? (
                    <Badge className="whitespace-nowrap bg-green-600">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Selected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="whitespace-nowrap">
                      Available
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Info Note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        💡 Prices shown are per person. Select a date to continue with your booking.
      </p>
    </div>
  );
}
