import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Loader2, User, Lock } from 'lucide-react';
import { mockUsers } from '@/polymet/data/auth-data';
import { useAuth } from '@/polymet/components/auth-context';

interface TestResult {
  role: string;
  email: string;
  password: string;
  status: 'pending' | 'success' | 'failed';
  message?: string;
  accessiblePages?: string[];
}

export function TestAllLogins() {
  const { login, logout } = useAuth();
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const testUsers = mockUsers.map(user => ({
    role: user.role,
    email: user.email,
    password: user.password,
    status: 'pending' as const,
  }));

  const testAllLogins = async () => {
    setTesting(true);
    const testResults: TestResult[] = [];

    for (const testUser of testUsers) {
      // Test login
      const result = await login(testUser.email, testUser.password);
      
      if (result.success) {
        // Get accessible pages from role permissions
        const user = mockUsers.find(u => u.email === testUser.email);
        const accessiblePages = user ? getAccessiblePages(user.role) : [];
        
        testResults.push({
          ...testUser,
          status: 'success',
          message: 'Login successful',
          accessiblePages,
        });

        // Logout for next test
        logout();
      } else {
        testResults.push({
          ...testUser,
          status: 'failed',
          message: result.message || 'Login failed',
        });
      }

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setResults(testResults);
    setTesting(false);
  };

  const getAccessiblePages = (role: string): string[] => {
    const permissions: Record<string, string[]> = {
      super_admin: ['Dashboard', 'Packages', 'Bookings', 'Calendar', 'Payment Follow-Up', 'Coupons', 'Users', 'Tour Guide', 'Destinations', 'Reviews', 'Analytics', 'Settings'],
      admin: ['Dashboard', 'Packages', 'Bookings', 'Calendar', 'Payment Follow-Up', 'Users', 'Reviews', 'Analytics'],
      booking_reservation: ['Dashboard', 'Bookings', 'Calendar', 'Payment Follow-Up', 'Tour Guide'],
      tour_guide: ['Tour Guide Assignment'],
      travel_agent: ['Dashboard', 'Packages', 'Bookings', 'Calendar', 'Users'],
      finance: ['Dashboard', 'Bookings', 'Payment Follow-Up', 'Analytics', 'Coupons'],
      sales_marketing: ['Dashboard', 'Packages', 'Bookings', 'Coupons', 'Destinations', 'Reviews', 'Analytics', 'Users'],
    };
    return permissions[role] || [];
  };

  const getRoleName = (role: string): string => {
    const names: Record<string, string> = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      booking_reservation: 'Booking & Reservation',
      tour_guide: 'Tour Guide',
      travel_agent: 'Travel Agent',
      finance: 'Finance',
      sales_marketing: 'Sales & Marketing',
    };
    return names[role] || role;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login System Test - All User Roles</CardTitle>
        <CardDescription>
          Test login functionality for all 7 user roles in the system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {results.length === 0 ? 'Ready to test' : `Tested ${results.length} of ${testUsers.length} users`}
          </div>
          <Button
            onClick={testAllLogins}
            disabled={testing}
            className="gap-2"
          >
            {testing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <User className="h-4 w-4" />
                Test All Logins
              </>
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((result, index) => (
              <Card key={index} className="border-l-4" style={{
                borderLeftColor: result.status === 'success' ? 'rgb(34 197 94)' : result.status === 'failed' ? 'rgb(239 68 68)' : 'rgb(156 163 175)'
              }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="font-mono">
                          {getRoleName(result.role)}
                        </Badge>
                        {result.status === 'success' && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                        {result.status === 'failed' && (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span className="font-mono">{result.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          <span className="font-mono">{result.password}</span>
                        </div>
                      </div>

                      {result.message && (
                        <p className={`text-sm mt-2 ${result.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                          {result.message}
                        </p>
                      )}

                      {result.accessiblePages && result.accessiblePages.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium mb-1.5">Accessible Pages ({result.accessiblePages.length}):</p>
                          <div className="flex flex-wrap gap-1">
                            {result.accessiblePages.map((page, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {page}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Total Tests:</p>
                <p className="text-2xl font-bold">{results.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Successful:</p>
                <p className="text-2xl font-bold text-green-600">
                  {results.filter(r => r.status === 'success').length}
                </p>
              </div>
            </div>

            {results.every(r => r.status === 'success') && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✅ All login tests passed! All user roles can access the system.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
