/**
 * Chip Payment Gateway Service
 * https://docs.chip-in.asia/chip-collect/overview/introduction
 */

const CHIP_API_URL = 'https://gate.chip-in.asia/api/v1';
const CHIP_API_KEY = 'Ydkw2alrtmVOVwRN59GTup02FNKGDduepwDmy0Chz_Y_hPJkwN6AhCFB2ak47P0iC5ydzpzXfnc_vCObmYvblQ=='; // Sandbox key
const CHIP_BRAND_ID = ''; // To be set after getting from portal

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
 * Create a Chip payment purchase
 */
export async function createChipPurchase(
  data: ChipPurchaseRequest
): Promise<{ success: boolean; data?: ChipPurchaseResponse; error?: string }> {
  try {
    const response = await fetch(`${CHIP_API_URL}/purchases/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHIP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        purchase: {
          ...data.purchase,
          currency: data.purchase.currency || 'MYR',
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const result: ChipPurchaseResponse = await response.json();

    return {
      success: true,
      data: result,
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
 */
export async function getChipPurchase(
  purchaseId: string
): Promise<{ success: boolean; data?: ChipPurchaseResponse; error?: string }> {
  try {
    const response = await fetch(`${CHIP_API_URL}/purchases/${purchaseId}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CHIP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const result: ChipPurchaseResponse = await response.json();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Get Chip purchase error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get purchase details',
    };
  }
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
