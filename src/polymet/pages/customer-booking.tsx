import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { BookingProvider } from '@/polymet/contexts/BookingContext';
import { BookingWizard } from '@/polymet/components/booking/BookingWizard';
import { packageService } from '@/polymet/services/package-service';
import { PackageWithRelations } from '@/polymet/services/database.types';

export function CustomerBookingPage() {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<PackageWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPackage() {
      if (!slug) return;

      setLoading(true);
      try {
        const data = await packageService.getBySlug(slug);
        setPkg(data);
        setError(false);
      } catch (err) {
        console.error('Error fetching package for booking:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPackage();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-yellow-500" />
          <p className="text-gray-600">Loading booking form...</p>
        </div>
      </div>
    );
  }

  // Error or not found
  if (error || !pkg) {
    return <Navigate to="/" replace />;
  }

  return (
    <BookingProvider>
      <BookingWizard
        packageId={pkg.id}
        packageName={pkg.name}
        packageSlug={pkg.slug}
      />
    </BookingProvider>
  );
}
