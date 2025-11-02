import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/polymet/components/auth-context";
import { UserRole } from "@/polymet/data/auth-data";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const location = useLocation();
  let auth;

  try {
    auth = useAuth();
  } catch (error) {
    console.error("Error accessing auth context:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-destructive font-semibold">Authentication Error</p>
          <p className="text-sm text-muted-foreground">
            Please refresh the page
          </p>
        </div>
      </div>
    );
  }

  // Safety check - ensure auth context is available
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />

          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  const { isAuthenticated, isLoading, user } = auth;

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />

          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  // Pass current location so login can redirect back after authentication
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check role-based access if allowedRoles is specified
  if (allowedRoles && allowedRoles.length > 0 && user) {
    const hasAccess = allowedRoles.includes(user.role);

    if (!hasAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">🚫</span>
            </div>
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              You don't have permission to access this page. Please contact your
              administrator if you believe this is an error.
            </p>
            <div className="pt-4">
              <Navigate to="/admin" replace />
            </div>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
}
