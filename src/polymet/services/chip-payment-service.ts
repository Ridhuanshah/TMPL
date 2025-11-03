/**
 * Chip Payment Gateway Service
 * https://docs.chip-in.asia/chip-collect/overview/introduction
 * 
 * NOTE: Chip API calls go through Supabase Edge Function to avoid CORS issues
 */

import { supabase } from '../../lib/supabase';

// Export Brand ID for use in components
export const CHIP_BRAND_ID = import.meta.env.VITE_CHIP_BRAND_ID || '';

export interface ChipProduct {
  name: string;
  quantity: number;
  price: number; // Price in cents (100 = RM 1.00)
}

export interface ChipPurchaseRequest {
  client: {
    email: string;
    full_name?: string;
    phone?: string;
  };
  purchase: {
    products: ChipProduct[];
    currency?: string; // Default: MYR
    notes?: string;
  };
  brand_id: string;
  success_redirect: string;
  failure_redirect: string;
  cancel_redirect?: string;
  success_callback?: string;
  reference?: string; // Booking number
}

export interface ChipPurchaseResponse {
  id: string;
  status: string;
  checkout_url: string;
  created_on: number;
  purchase: {
    total: number;
    currency: string;
  };
}

/**
 * Create a Chip payment purchase via Edge Function (to avoid CORS)
 */
export async function createChipPurchase(
  data: ChipPurchaseRequest
): Promise<{ success: boolean; data?: ChipPurchaseResponse; error?: string }> {
  try {
    const { data: result, error } = await supabase.functions.invoke('chip-payment', {
      body: {
        bookingNumber: data.reference,
        email: data.client.email,
        fullName: data.client.full_name,
        phone: data.client.phone,
        amount: data.purchase.products[0].price / 100, // Convert cents back to MYR
        origin: window.location.origin,
      },
    });

    if (error) {
      console.error('Edge Function error:', error);
      return {
        success: false,
        error: error.message || 'Failed to create payment',
      };
    }

    if (result.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      data: result as ChipPurchaseResponse,
    };
  } catch (error) {
    console.error('Chip payment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create payment',
    };
  }
}

/**
 * Get purchase details by ID
 * TODO: Implement via Edge Function if needed
 */
export async function getChipPurchase(
  purchaseId: string
): Promise<{ success: boolean; data?: ChipPurchaseResponse; error?: string }> {
  // Not implemented yet - would need Edge Function
  console.warn('getChipPurchase not implemented yet');
  return {
    success: false,
    error: 'Not implemented',
  };
}

/**
 * Convert MYR amount to cents for Chip API
 * @param amount Amount in MYR (e.g., 12500.00)
 * @returns Amount in cents (e.g., 1250000)
 */
export function convertToCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convert cents to MYR
 * @param cents Amount in cents (e.g., 1250000)
 * @returns Amount in MYR (e.g., 12500.00)
 */
export function convertFromCents(cents: number): number {
  return cents / 100;
}
