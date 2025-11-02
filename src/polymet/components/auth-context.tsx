import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { UserRole } from "@/polymet/data/auth-data";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  avatar: string | null;
  role: UserRole;
  status: string;
  flag_tier: string | null;
  bio: string | null;
  // Notification preferences
  email_notifications?: boolean;
  push_notifications?: boolean;
  sms_notifications?: boolean;
  marketing_communications?: boolean;
  // Notification categories
  notify_new_bookings?: boolean;
  notify_payment_alerts?: boolean;
  notify_review_submissions?: boolean;
  notify_system_alerts?: boolean;
  notify_performance_reports?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'tmpl_user_data';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper: Save user to sessionStorage
  const saveUserToStorage = (userData: AuthUser) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('[Auth] Failed to save to storage:', error);
    }
  };

  // Helper: Load user from sessionStorage
  const loadUserFromStorage = (): AuthUser | null => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as AuthUser;
      }
    } catch (error) {
      console.error('[Auth] Failed to load from storage:', error);
    }
    return null;
  };

  // Helper: Clear storage
  const clearStorage = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('[Auth] Failed to clear storage:', error);
    }
  };

  // Helper: Fetch user from database
  const fetchUserFromDatabase = async (userId: string): Promise<AuthUser | null> => {
    console.log('[Auth] fetchUserFromDatabase START for user:', userId);
    try {
      console.log('[Auth] Querying Supabase users table...');
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('[Auth] Query complete. Data:', data);
      console.log('[Auth] Query error:', error);

      if (error) {
        console.error('[Auth] Database query error:', error);
        return null;
      }

      console.log('[Auth] fetchUserFromDatabase SUCCESS, returning data');
      return data as AuthUser;
    } catch (error) {
      console.error('[Auth] Exception fetching user:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('[Auth] Initializing with session storage approach...');
    
    const initializeAuth = async () => {
      // Step 1: Immediately load from sessionStorage (instant!)
      const cachedUser = loadUserFromStorage();
      if (cachedUser) {
        console.log('[Auth] Loaded from cache:', cachedUser.name);
        setUser(cachedUser);
        setIsLoading(false);
      }

      // Step 2: Verify session in background
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          console.log('[Auth] No valid session, clearing...');
          setUser(null);
          clearStorage();
          setIsLoading(false);
          return;
        }

        // Step 3: If we have a session, fetch fresh data from database
        console.log('[Auth] Session valid, fetching fresh data...');
        const freshUser = await fetchUserFromDatabase(session.user.id);
        
        if (freshUser) {
          console.log('[Auth] ✅ Fresh data loaded:', freshUser.name);
          console.log('[Auth] 🔄 Updating React state and cache...');
          setUser({...freshUser});  // Force new object reference
          saveUserToStorage(freshUser);
          console.log('[Auth] ✅ Cache updated with fresh bio:', freshUser.bio?.substring(0, 50) + '...');
        } else {
          console.log('[Auth] Failed to fetch user data, clearing...');
          setUser(null);
          clearStorage();
        }
        
      } catch (error) {
        console.error('[Auth] Init error:', error);
        // Keep cached user if we have it, otherwise clear
        if (!cachedUser) {
          setUser(null);
          clearStorage();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[Auth] Auth event:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('[Auth] SIGNED_IN event - Fetching fresh user data...');
          console.log('[Auth] User ID:', session.user.id);
          try {
            const userData = await fetchUserFromDatabase(session.user.id);
            console.log('[Auth] Fetch complete, userData:', userData);
            if (userData) {
              console.log('[Auth] ✅ Fresh data fetched!');
              console.log('[Auth] Fresh bio:', userData.bio?.substring(0, 80) + '...');
              console.log('[Auth] Updating state with NEW object reference...');
              setUser({...userData});  // Force new object reference
              saveUserToStorage(userData);
              console.log('[Auth] ✅ State and storage updated!');
            } else {
              console.log('[Auth] ❌ Failed to fetch user data on SIGNED_IN');
            }
          } catch (error) {
            console.error('[Auth] Error fetching user data:', error);
          }
          setIsLoading(false);
        } else if (event === 'SIGNED_OUT') {
          console.log('[Auth] Signing out, clearing cache...');
          setUser(null);
          clearStorage();
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, message: error.message };
      }

      if (data.user) {
        // Fetch user data immediately
        const userData = await fetchUserFromDatabase(data.user.id);
        if (userData) {
          setUser({...userData});  // Force new object reference
          saveUserToStorage(userData);
        }
      }

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('[Auth] Login error:', error);
      setIsLoading(false);
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    clearStorage();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
