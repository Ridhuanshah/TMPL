import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CHIP_API_URL = "https://gate.chip-in.asia/api/v1/purchases/";
// TODO: Move these to environment variables in production
const CHIP_SECRET_KEY = Deno.env.get("CHIP_SECRET_KEY") || "Ydkw2alrtmVOVwRN59GTup02FNKGDduepwDmy0Chz_Y_hPJkwN6AhCFB2ak47P0iC5ydzpzXfnc_vCObmYvblQ==";
const CHIP_BRAND_ID = Deno.env.get("CHIP_BRAND_ID") || "e2abb8a2-c64d-48f3-a78e-354358a2abde";

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { bookingNumber, email, fullName, phone, amount, origin } = await req.json();

    if (!CHIP_SECRET_KEY || !CHIP_BRAND_ID) {
      throw new Error("Chip configuration missing");
    }

    // Convert amount to cents (RM 1,000 = 100,000 cents)
    const amountInCents = Math.round(amount * 100);

    const chipPayload = {
      client: {
        email,
        full_name: fullName,
        phone,
      },
      purchase: {
        products: [
          {
            name: `Travel Package Booking - ${bookingNumber}`,
            quantity: 1,
            price: amountInCents,
          },
        ],
        currency: "MYR",
      },
      brand_id: CHIP_BRAND_ID,
      success_redirect: `${origin}/booking/payment-success?booking=${bookingNumber}`,
      failure_redirect: `${origin}/booking/payment-failed?booking=${bookingNumber}`,
      cancel_redirect: `${origin}/booking/payment-cancelled?booking=${bookingNumber}`,
      reference: bookingNumber,
    };

    console.log("Creating Chip purchase:", chipPayload);

    const response = await fetch(CHIP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CHIP_SECRET_KEY}`,
      },
      body: JSON.stringify(chipPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Chip API error:", data);
      throw new Error(data.message || "Failed to create Chip payment");
    }

    console.log("Chip purchase created:", data.id);

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error creating Chip payment:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
