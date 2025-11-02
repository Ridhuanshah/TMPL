-- ============================================================================
-- DIRECT BOOKING SYSTEM - PART 2: ENHANCE EXISTING TABLES
-- Version: 1.0.0
-- Created: Nov 3, 2025
-- ============================================================================

-- Add new columns to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_number VARCHAR(50) UNIQUE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS departure_date_id UUID REFERENCES package_departure_dates(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS lead_traveler_id UUID;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'pay_later';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_plan VARCHAR(50) CHECK (payment_plan IN ('full', 'deposit', 'installment', 'pay_later'));
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS balance_amount NUMERIC(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS balance_due_date DATE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS coupon_id UUID REFERENCES coupons(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS coupon_discount NUMERIC(10,2) DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS subtotal NUMERIC(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS special_requests TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_by UUID REFERENCES users(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS refund_amount NUMERIC(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS refund_status VARCHAR(50) CHECK (refund_status IN ('none', 'pending', 'approved', 'completed', 'rejected'));
