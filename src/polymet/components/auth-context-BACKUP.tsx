import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { UserRole } from "@/polymet/data/auth-data";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  avatar: string | null;
  role: UserRole;
  status: string | null;
  flag_tier: string | null;
  bio: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

interface LoginResult {
  success: boolean;
  message?: string;
  user?: AuthUser;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from Supabase session on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user?.email) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('id, email, name, phone, avatar, role, status, flag_tier, bio')
            .eq('email', session.user.email)
            .single();

          if (!error && userData) {
            setUser(userData as AuthUser);
          }
        }
      } catch (error) {
        console.error("Error loading auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, email, name, phone, avatar, role, status, flag_tier, bio')
          .eq('email', session.user.email)
          .single();

        if (userData) {
          setUser(userData as AuthUser);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResult> => {
    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('Auth error:', authError);
        return {
          success: false,
          message: authError.message || 'Login failed. Please check your credentials.',
        };
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'User not found.',
        };
      }

      // 2. Fetch user profile from database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, name, phone, avatar, role, status, flag_tier, bio')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        console.error('User profile error:', userError);
        await supabase.auth.signOut();
        return {
          success: false,
          message: 'User profile not found. Please contact administrator.',
        };
      }

      const userProfile = userData as AuthUser;

      // 3. Check if user is active
      if (userProfile.status !== 'active') {
        await supabase.auth.signOut();
        return {
          success: false,
          message: 'Your account is not active. Please contact administrator.',
        };
      }

      // Update state
      setUser(userProfile);

      return {
        success: true,
        message: 'Login successful!',
        user: userProfile,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a default context instead of throwing to prevent crashes
    console.error("useAuth must be used within an AuthProvider");
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => ({ success: false, message: "Auth not initialized" }),
      logout: async () => {},
      hasRole: () => false,
    };
  }
  return context;
}
