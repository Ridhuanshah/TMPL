-- ============================================================================
-- DIRECT BOOKING SYSTEM - PART 5: VIEWS FOR EASY QUERYING
-- Version: 1.0.0
-- Created: Nov 3, 2025
-- ============================================================================

-- booking_summary: Complete booking information
CREATE OR REPLACE VIEW booking_summary AS
SELECT 
  b.id,
  b.booking_number,
  b.status,
  b.payment_status,
  b.payment_plan,
  
  -- Package Info
  p.id as package_id,
  p.name as package_name,
  p.slug as package_slug,
  p.continent,
  p.category,
  
  -- Departure Info
  pdd.id as departure_date_id,
  pdd.start_date as departure_date,
  pdd.end_date as return_date,
  pdd.flight_type,
  pdd.flight_company,
  
  -- Customer Info
  u.id as user_id,
  u.email as customer_email,
  u.full_name as customer_name,
  bt.first_name || ' ' || bt.last_name as lead_traveler_name,
  bt.phone as lead_traveler_phone,
  bt.email as lead_traveler_email,
  
  -- Participants
  (SELECT COUNT(*) FROM booking_travelers WHERE booking_id = b.id) as total_travelers,
  
  -- Pricing
  b.subtotal,
  b.coupon_discount,
  b.total_amount,
  b.paid_amount,
  (b.total_amount - COALESCE(b.paid_amount, 0)) as balance_remaining,
  b.deposit_amount,
  b.balance_amount,
  
  -- Coupon
  c.code as coupon_code,
  c.name as coupon_name,
  
  -- Dates
  b.created_at as booking_date,
  b.balance_due_date,
  b.updated_at,
  
  -- Days calculations
  (pdd.start_date - CURRENT_DATE) as days_until_departure,
  CASE 
    WHEN b.balance_due_date IS NOT NULL THEN (b.balance_due_date - CURRENT_DATE)
    ELSE NULL
  END as days_until_payment_due,
  
  -- Special info
  b.special_requests,
  b.admin_notes,
  b.cancellation_reason,
  b.cancelled_at,
  b.refund_amount,
  b.refund_status
  
FROM bookings b
JOIN packages p ON b.package_id = p.id
LEFT JOIN package_departure_dates pdd ON b.departure_date_id = pdd.id
LEFT JOIN users u ON b.user_id = u.id
LEFT JOIN booking_travelers bt ON b.lead_traveler_id = bt.id
LEFT JOIN coupons c ON b.coupon_id = c.id;

-- payment_followup: Bookings requiring payment follow-up
CREATE OR REPLACE VIEW payment_followup AS
SELECT 
  b.id as booking_id,
  b.booking_number,
  b.status,
  b.payment_status,
  b.payment_plan,
  b.total_amount,
  COALESCE(b.paid_amount, 0) as paid_amount,
  (b.total_amount - COALESCE(b.paid_amount, 0)) as outstanding_amount,
  b.balance_due_date,
  
  -- Customer
  u.email,
  u.full_name as customer_name,
  bt.first_name || ' ' || bt.last_name as lead_traveler_name,
  bt.phone,
  bt.email as traveler_email,
  
  -- Package & Departure
  p.name as package_name,
  pdd.start_date as departure_date,
  (pdd.start_date - CURRENT_DATE) as days_until_departure,
  
  -- Payment timing
  CASE 
    WHEN b.balance_due_date IS NOT NULL THEN (b.balance_due_date - CURRENT_DATE)
    ELSE NULL
  END as days_until_payment_due,
  
  -- Priority calculation
  CASE
    WHEN b.balance_due_date IS NOT NULL AND (b.balance_due_date - CURRENT_DATE) < 0 AND (b.total_amount - COALESCE(b.paid_amount, 0)) > 0 THEN 'overdue'
    WHEN b.balance_due_date IS NOT NULL AND (b.balance_due_date - CURRENT_DATE) < 7 AND (b.total_amount - COALESCE(b.paid_amount, 0)) > 0 THEN 'urgent'
    WHEN b.balance_due_date IS NOT NULL AND (b.balance_due_date - CURRENT_DATE) < 14 AND (b.total_amount - COALESCE(b.paid_amount, 0)) > 0 THEN 'high'
    WHEN b.balance_due_date IS NOT NULL AND (b.balance_due_date - CURRENT_DATE) < 30 AND (b.total_amount - COALESCE(b.paid_amount, 0)) > 0 THEN 'medium'
    ELSE 'low'
  END as follow_up_priority,
  
  b.created_at as booking_date,
  b.updated_at as last_updated
  
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN packages p ON b.package_id = p.id
LEFT JOIN package_departure_dates pdd ON b.departure_date_id = pdd.id
LEFT JOIN booking_travelers bt ON b.lead_traveler_id = bt.id
WHERE b.payment_status IN ('pending', 'partial')
  AND b.status = 'confirmed'
ORDER BY 
  CASE 
    WHEN b.balance_due_date IS NOT NULL AND (b.balance_due_date - CURRENT_DATE) < 0 THEN 1
    WHEN b.balance_due_date IS NOT NULL AND (b.balance_due_date - CURRENT_DATE) < 7 THEN 2
    WHEN b.balance_due_date IS NOT NULL AND (b.balance_due_date - CURRENT_DATE) < 14 THEN 3
    WHEN b.balance_due_date IS NOT NULL AND (b.balance_due_date - CURRENT_DATE) < 30 THEN 4
    ELSE 5
  END,
  b.balance_due_date ASC NULLS LAST;
