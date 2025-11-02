import { supabase } from './supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  name: string
  phone: string | null
  avatar: string | null
  role: UserRole
  status: string | null
  flag_tier: string | null
}

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'booking_reservation'
  | 'tour_guide'
  | 'travel_agent'
  | 'finance'
  | 'sales_marketing'
  | 'customer'

export interface LoginResult {
  success: boolean
  message?: string
  user?: AuthUser
}

/**
 * Supabase Authentication Service
 * Replaces mock authentication with real Supabase Auth
 */
export const supabaseAuth = {
  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<LoginResult> {
    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        console.error('Auth error:', authError)
        return {
          success: false,
          message: authError.message || 'Login failed. Please check your credentials.',
        }
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'User not found.',
        }
      }

      // 2. Fetch user profile from database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, name, phone, avatar, role, status, flag_tier')
        .eq('email', email)
        .single()

      if (userError || !userData) {
        console.error('User profile error:', userError)
        // Sign out if profile fetch fails
        await supabase.auth.signOut()
        return {
          success: false,
          message: 'User profile not found. Please contact administrator.',
        }
      }

      // 3. Check if user is active
      if (userData.status !== 'active') {
        await supabase.auth.signOut()
        return {
          success: false,
          message: 'Your account is not active. Please contact administrator.',
        }
      }

      return {
        success: true,
        message: 'Login successful!',
        user: userData as AuthUser,
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      }
    }
  },

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  },

  /**
   * Get current session
   */
  async getSession() {
    const { data } = await supabase.auth.getSession()
    return data.session
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      // 1. Check auth session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user) {
        return null
      }

      // 2. Fetch user profile
      const { data: userData, error } = await supabase
        .from('users')
        .select('id, email, name, phone, avatar, role, status, flag_tier')
        .eq('email', session.user.email)
        .single()

      if (error || !userData) {
        console.error('Error fetching user profile:', error)
        return null
      }

      return userData as AuthUser
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const user = await this.getCurrentUser()
        callback(user)
      } else if (event === 'SIGNED_OUT') {
        callback(null)
      }
    })
  },

  /**
   * Check if user has specific role(s)
   */
  hasRole(user: AuthUser | null, roles: UserRole | UserRole[]): boolean {
    if (!user) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.role)
  },
}
