-- ============================================================================
-- DIRECT BOOKING SYSTEM - PART 1: NEW TABLES
-- Version: 1.0.0
-- Created: Nov 3, 2025
-- ============================================================================

-- booking_travelers: Individual traveler information
CREATE TABLE IF NOT EXISTS booking_travelers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  participant_number INTEGER NOT NULL,
  is_lead_traveler BOOLEAN DEFAULT false,
  
  -- Personal Information (11 required fields)
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  ic_number VARCHAR(50),
  nationality VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  passport_number VARCHAR(50),
  emergency_contact_name VARCHAR(100) NOT NULL,
  emergency_contact_relation VARCHAR(50) NOT NULL,
  emergency_contact_phone VARCHAR(50) NOT NULL,
  
  -- Optional fields
  passport_expiry DATE,
  dietary_requirements TEXT,
  medical_conditions TEXT,
  special_needs TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_booking_participant UNIQUE(booking_id, participant_number)
);

-- package_addons: Optional add-ons (insurance, equipment, etc.)
CREATE TABLE IF NOT EXISTS package_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('insurance', 'equipment', 'transport', 'service', 'accommodation')),
  price NUMERIC(10,2) NOT NULL,
  price_type VARCHAR(20) NOT NULL CHECK (price_type IN ('per_person', 'per_booking')),
  currency VARCHAR(3) DEFAULT 'RM',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  min_participants INTEGER,
  max_participants INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- booking_addons: Selected add-ons per booking
CREATE TABLE IF NOT EXISTS booking_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  addon_id UUID,
  addon_type VARCHAR(50) NOT NULL CHECK (addon_type IN ('package_addon', 'optional_itinerary')),
  itinerary_id UUID REFERENCES daily_itinerary(id),
  addon_name VARCHAR(255) NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- booking_payments: All payment transactions
CREATE TABLE IF NOT EXISTS booking_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  payment_number VARCHAR(50) UNIQUE NOT NULL,
  payment_type VARCHAR(50) NOT NULL CHECK (payment_type IN ('deposit', 'balance', 'full', 'installment', 'refund')),
  payment_method VARCHAR(50),
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'RM',
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
  due_date DATE,
  paid_date TIMESTAMP,
  transaction_id VARCHAR(255),
  receipt_url VARCHAR(500),
  invoice_url VARCHAR(500),
  notes TEXT,
  admin_notes TEXT,
  recorded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- installment_plans & schedule
CREATE TABLE IF NOT EXISTS installment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  total_amount NUMERIC(10,2) NOT NULL,
  installment_count INTEGER NOT NULL,
  installment_amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'defaulted', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS installment_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES installment_plans(id) ON DELETE CASCADE,
  installment_number INTEGER NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'waived')),
  paid_date TIMESTAMP,
  payment_id UUID REFERENCES booking_payments(id),
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_plan_installment UNIQUE(plan_id, installment_number)
);

-- booking_sequences: For generating unique booking numbers
CREATE TABLE IF NOT EXISTS booking_sequences (
  year INTEGER NOT NULL,
  month VARCHAR(3) NOT NULL,
  package_prefix VARCHAR(10) NOT NULL,
  last_number INTEGER DEFAULT 0,
  PRIMARY KEY (year, month, package_prefix)
);

-- coupon_usage: Track coupon redemptions
CREATE TABLE IF NOT EXISTS coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES coupons(id),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES users(id),
  discount_amount NUMERIC(10,2) NOT NULL,
  original_amount NUMERIC(10,2) NOT NULL,
  final_amount NUMERIC(10,2) NOT NULL,
  used_at TIMESTAMP DEFAULT NOW()
);

-- booking_notifications: Email tracking
CREATE TABLE IF NOT EXISTS booking_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  notification_type VARCHAR(100) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  recipient_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'bounced', 'opened', 'clicked')),
  subject VARCHAR(500),
  email_body TEXT,
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  next_retry_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- admin_notifications: Dashboard notifications
CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_entity_type VARCHAR(50),
  related_entity_id UUID,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  read_by UUID REFERENCES users(id),
  priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  action_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);
