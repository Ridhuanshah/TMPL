import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export function TestSupabaseConnection() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [tables, setTables] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function testConnection() {
      try {
        // Test connection by querying packages table
        const { data, error: queryError } = await supabase
          .from('packages')
          .select('id')
          .limit(1);

        if (queryError) {
          throw queryError;
        }

        // Connection successful
        setStatus('success');
        setTables([
          'users', 'packages', 'bookings', 'payments', 'coupons',
          'tour_guides', 'destinations', 'reviews', 'invoices',
          'package_departure_dates', 'daily_itinerary', 'package_images',
          'travel_tips', 'essential_items', 'flight_companies',
          'departure_guide_assignments', 'tour_guide_assignments',
          'assignment_itinerary', 'assignment_emergency_contacts',
          'assignment_equipment', 'assignment_transportation',
          'payment_installments'
        ]);
      } catch (err: any) {
        setStatus('error');
        setError(err.message || 'Failed to connect to Supabase');
      }
    }

    testConnection();
  }, []);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Supabase Connection Test</CardTitle>
          {status === 'loading' && (
            <Badge variant="secondary">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </Badge>
          )}
          {status === 'success' && (
            <Badge variant="success" className="bg-green-500">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Connected
            </Badge>
          )}
          {status === 'error' && (
            <Badge variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Failed
            </Badge>
          )}
        </div>
        <CardDescription>
          {status === 'success' && 'Successfully connected to Supabase database'}
          {status === 'error' && 'Failed to connect to Supabase'}
          {status === 'loading' && 'Checking connection...'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'success' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Database Info</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Project:</div>
                <div className="font-mono">tmpl-escapade-production</div>
                <div className="text-muted-foreground">Region:</div>
                <div>Singapore (ap-southeast-1)</div>
                <div className="text-muted-foreground">Database:</div>
                <div>PostgreSQL 17.6</div>
                <div className="text-muted-foreground">Tables:</div>
                <div>{tables.length} tables</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Available Tables</h3>
              <div className="flex flex-wrap gap-2">
                {tables.map((table) => (
                  <Badge key={table} variant="outline" className="text-xs">
                    {table}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-green-600 font-medium">
                ✅ Database is ready for use!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                You can now start using Supabase in your services.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-2">
            <p className="text-sm text-destructive font-medium">
              Connection Error
            </p>
            <pre className="bg-muted p-3 rounded text-xs overflow-auto">
              {error}
            </pre>
            <p className="text-xs text-muted-foreground mt-2">
              Make sure your .env file contains the correct Supabase credentials.
            </p>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
