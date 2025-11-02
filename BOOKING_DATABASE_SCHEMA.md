# 🗄️ DIRECT BOOKING SYSTEM - DATABASE SCHEMA
## TMPL Escapade Travel Agency

> **Last Updated**: Nov 3, 2025  
> **Status**: Schema Design Phase

---

## 📊 EXISTING TABLES (From Supabase)

### Current Schema
```
✅ packages
✅ package_departure_dates
✅ package_images
✅ daily_itinerary
✅ travel_tips
✅ essential_items
✅ users
✅ bookings (basic structure exists)
✅ coupons
```

---

## 🆕 NEW TABLES NEEDED

### 1. Enhanced Bookings Table

```sql
-- Enhance existing bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_number VARCHAR(50) UNIQUE NOT NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS departure_date_id UUID REFERENCES package_departure_dates(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS lead_traveler_id UUID REFERENCES booking_travelers(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'pay_later';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_plan VARCHAR(50); -- 'full', 'deposit', 'installment'
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS balance_amount NUMERIC(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS balance_due_date DATE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS coupon_id UUID REFERENCES coupons(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS coupon_discount NUMERIC(10,2) DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS subtotal NUMERIC(10,2) NOT NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS total_amount NUMERIC(10,2) NOT NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS special_requests TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS cancelled_by UUID REFERENCES users(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS refund_amount NUMERIC(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS refund_status VARCHAR(50);

-- Add indexes
CREATE INDEX idx_bookings_number ON bookings(booking_number);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_departure_date ON bookings(departure_date_id);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
```

### 2. Booking Travelers Table
**Stores individual traveler information**

```sql
CREATE TABLE booking_travelers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  participant_number INTEGER NOT NULL, -- 1, 2, 3...
  is_lead_traveler BOOLEAN DEFAULT false,
  
  -- Personal Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  
  -- Identity
  ic_number VARCHAR(50), -- Malaysian IC or Passport
  nationality VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL, -- 'male', 'female', 'other'
  passport_number VARCHAR(50),
  passport_expiry DATE,
  
  -- Emergency Contact
  emergency_contact_name VARCHAR(100) NOT NULL,
  emergency_contact_relation VARCHAR(50) NOT NULL,
  emergency_contact_phone VARCHAR(50) NOT NULL,
  
  -- Additional Information
  dietary_requirements TEXT,
  medical_conditions TEXT,
  special_needs TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_booking_participant UNIQUE(booking_id, participant_number)
);

-- Indexes
CREATE INDEX idx_travelers_booking ON booking_travelers(booking_id);
CREATE INDEX idx_travelers_email ON booking_travelers(email);
CREATE INDEX idx_travelers_lead ON booking_travelers(is_lead_traveler);
```

### 3. Package Add-ons Table
**Separate add-ons (insurance, equipment, etc.)**

```sql
CREATE TABLE package_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  
  -- Add-on Details
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- 'insurance', 'equipment', 'transport', 'service'
  
  -- Pricing
  price NUMERIC(10,2) NOT NULL,
  price_type VARCHAR(20) NOT NULL CHECK (price_type IN ('per_person', 'per_booking')),
  currency VARCHAR(3) DEFAULT 'RM',
  
  -- Availability
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  -- Optional constraints
  min_participants INTEGER,
  max_participants INTEGER,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_addons_package ON package_addons(package_id);
CREATE INDEX idx_addons_active ON package_addons(is_active);
CREATE INDEX idx_addons_category ON package_addons(category);
```

### 4. Booking Add-ons Table
**Selected add-ons per booking**

```sql
CREATE TABLE booking_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  
  -- Add-on Reference
  addon_id UUID, -- NULL if optional itinerary item
  addon_type VARCHAR(50) NOT NULL CHECK (addon_type IN ('package_addon', 'optional_itinerary')),
  
  -- For optional itinerary items
  itinerary_id UUID REFERENCES daily_itinerary(id),
  
  -- Pricing
  addon_name VARCHAR(255) NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_booking_addons_booking ON booking_addons(booking_id);
CREATE INDEX idx_booking_addons_type ON booking_addons(addon_type);
```

### 5. Booking Payments Table
**Track all payment transactions**

```sql
CREATE TABLE booking_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  
  -- Payment Details
  payment_number VARCHAR(50) UNIQUE NOT NULL,
  payment_type VARCHAR(50) NOT NULL, -- 'deposit', 'balance', 'full', 'installment', 'refund'
  payment_method VARCHAR(50), -- 'bank_transfer', 'credit_card', 'cash', etc.
  
  -- Amount
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'RM',
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  
  -- Due/Payment Dates
  due_date DATE,
  paid_date TIMESTAMP,
  
  -- Transaction Details
  transaction_id VARCHAR(255), -- From payment gateway
  receipt_url VARCHAR(500),
  invoice_url VARCHAR(500),
  
  -- Notes
  notes TEXT,
  admin_notes TEXT,
  
  -- Recorded By
  recorded_by UUID REFERENCES users(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payments_booking ON booking_payments(booking_id);
CREATE INDEX idx_payments_status ON booking_payments(status);
CREATE INDEX idx_payments_due_date ON booking_payments(due_date);
```

### 6. Installment Plans Table
**For installment payment schedules**

```sql
CREATE TABLE installment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  
  -- Plan Details
  total_amount NUMERIC(10,2) NOT NULL,
  installment_count INTEGER NOT NULL,
  installment_amount NUMERIC(10,2) NOT NULL,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'defaulted'
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE installment_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES installment_plans(id) ON DELETE CASCADE,
  
  -- Schedule Details
  installment_number INTEGER NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  due_date DATE NOT NULL,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'overdue', 'waived'
  paid_date TIMESTAMP,
  payment_id UUID REFERENCES booking_payments(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_installments_plan ON installment_schedule(plan_id);
CREATE INDEX idx_installments_status ON installment_schedule(status);
CREATE INDEX idx_installments_due_date ON installment_schedule(due_date);
```

### 7. Booking Sequences Table
**For generating unique booking numbers**

```sql
CREATE TABLE booking_sequences (
  year INTEGER NOT NULL,
  month VARCHAR(3) NOT NULL, -- 'JAN', 'FEB', etc.
  package_prefix VARCHAR(10) NOT NULL,
  last_number INTEGER DEFAULT 0,
  
  PRIMARY KEY (year, month, package_prefix)
);

-- Function to get next booking number
CREATE OR REPLACE FUNCTION get_next_booking_number(
  p_package_id VARCHAR,
  p_departure_date DATE
) RETURNS VARCHAR AS $$
DECLARE
  v_year INTEGER;
  v_month VARCHAR(3);
  v_pkg_num VARCHAR(3);
  v_seq_num INTEGER;
  v_booking_number VARCHAR(50);
BEGIN
  -- Extract year and month
  v_year := EXTRACT(YEAR FROM p_departure_date);
  v_month := TO_CHAR(p_departure_date, 'MON');
  
  -- Extract package number (last 3 digits)
  v_pkg_num := LPAD(REGEXP_REPLACE(p_package_id, '\D', '', 'g')::INTEGER::TEXT, 3, '0');
  v_pkg_num := RIGHT(v_pkg_num, 3);
  
  -- Get and increment sequence
  INSERT INTO booking_sequences (year, month, package_prefix, last_number)
  VALUES (v_year, v_month, v_pkg_num, 1)
  ON CONFLICT (year, month, package_prefix)
  DO UPDATE SET last_number = booking_sequences.last_number + 1
  RETURNING last_number INTO v_seq_num;
  
  -- Format booking number
  v_booking_number := 'PKG' || v_pkg_num || '-' || v_year || '-' || v_month || '-' || LPAD(v_seq_num::TEXT, 3, '0');
  
  RETURN v_booking_number;
END;
$$ LANGUAGE plpgsql;
```

### 8. Coupon Usage Table
**Track coupon redemptions**

```sql
CREATE TABLE coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES coupons(id),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Usage Details
  discount_amount NUMERIC(10,2) NOT NULL,
  original_amount NUMERIC(10,2) NOT NULL,
  final_amount NUMERIC(10,2) NOT NULL,
  
  -- Timestamps
  used_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_coupon_usage_coupon ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_booking ON coupon_usage(booking_id);
CREATE INDEX idx_coupon_usage_user ON coupon_usage(user_id);
```

### 9. Booking Notifications Table
**Track all sent notifications**

```sql
CREATE TABLE booking_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  
  -- Notification Details
  notification_type VARCHAR(100) NOT NULL, -- 'confirmation', 'payment_reminder', 'trip_reminder', etc.
  recipient_email VARCHAR(255) NOT NULL,
  recipient_name VARCHAR(255),
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'failed', 'bounced'
  
  -- Content
  subject VARCHAR(500),
  email_body TEXT,
  
  -- Delivery Info
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  error_message TEXT,
  
  -- Retry Info
  retry_count INTEGER DEFAULT 0,
  next_retry_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_booking ON booking_notifications(booking_id);
CREATE INDEX idx_notifications_status ON booking_notifications(status);
CREATE INDEX idx_notifications_type ON booking_notifications(notification_type);
CREATE INDEX idx_notifications_sent_at ON booking_notifications(sent_at);
```

### 10. Admin Notifications Table
**For dashboard notifications**

```sql
CREATE TABLE admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Notification Details
  notification_type VARCHAR(100) NOT NULL, -- 'new_booking', 'payment_received', 'cancellation', etc.
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  -- Related Entity
  related_entity_type VARCHAR(50), -- 'booking', 'payment', 'user'
  related_entity_id UUID,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  read_by UUID REFERENCES users(id),
  
  -- Priority
  priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  
  -- Action Link
  action_url VARCHAR(500),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_admin_notif_read ON admin_notifications(is_read);
CREATE INDEX idx_admin_notif_type ON admin_notifications(notification_type);
CREATE INDEX idx_admin_notif_priority ON admin_notifications(priority);
CREATE INDEX idx_admin_notif_created ON admin_notifications(created_at DESC);
```

---

## 🔐 ROW LEVEL SECURITY (RLS) POLICIES

### Bookings Table Policies

```sql
-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_travelers ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_payments ENABLE ROW LEVEL SECURITY;

-- Customers can view their own bookings
CREATE POLICY "Customers can view own bookings"
ON bookings FOR SELECT
USING (auth.uid() = user_id);

-- Customers can insert their own bookings
CREATE POLICY "Customers can create bookings"
ON bookings FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admin can view all bookings
CREATE POLICY "Admin can view all bookings"
ON bookings FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin')
  )
);

-- Admin can update all bookings
CREATE POLICY "Admin can update bookings"
ON bookings FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin')
  )
);

-- Similar policies for related tables...
```

---

## 📈 DATABASE VIEWS

### Booking Summary View

```sql
CREATE VIEW booking_summary AS
SELECT 
  b.id,
  b.booking_number,
  b.status,
  b.payment_status,
  
  -- Package Info
  p.name as package_name,
  p.continent,
  
  -- Departure Info
  pdd.start_date as departure_date,
  pdd.end_date as return_date,
  
  -- Customer Info
  u.email as customer_email,
  bt.first_name || ' ' || bt.last_name as lead_traveler_name,
  bt.phone as lead_traveler_phone,
  
  -- Participants
  (SELECT COUNT(*) FROM booking_travelers WHERE booking_id = b.id) as total_travelers,
  
  -- Pricing
  b.subtotal,
  b.coupon_discount,
  b.total_amount,
  b.paid_amount,
  (b.total_amount - b.paid_amount) as balance_remaining,
  
  -- Dates
  b.created_at as booking_date,
  b.balance_due_date,
  
  -- Days until departure
  (pdd.start_date - CURRENT_DATE) as days_until_departure
  
FROM bookings b
JOIN packages p ON b.package_id = p.id
JOIN package_departure_dates pdd ON b.departure_date_id = pdd.id
JOIN users u ON b.user_id = u.id
LEFT JOIN booking_travelers bt ON b.lead_traveler_id = bt.id;
```

### Payment Follow-up View

```sql
CREATE VIEW payment_followup AS
SELECT 
  b.id as booking_id,
  b.booking_number,
  b.status,
  b.payment_status,
  b.total_amount,
  b.paid_amount,
  (b.total_amount - b.paid_amount) as outstanding_amount,
  b.balance_due_date,
  
  -- Customer
  u.email,
  bt.first_name || ' ' || bt.last_name as customer_name,
  bt.phone,
  
  -- Departure
  pdd.start_date as departure_date,
  (pdd.start_date - CURRENT_DATE) as days_until_departure,
  (b.balance_due_date - CURRENT_DATE) as days_until_payment_due,
  
  -- Priority calculation
  CASE
    WHEN (b.balance_due_date - CURRENT_DATE) < 7 AND (b.total_amount - b.paid_amount) > 0 THEN 'urgent'
    WHEN (b.balance_due_date - CURRENT_DATE) < 14 AND (b.total_amount - b.paid_amount) > 0 THEN 'high'
    WHEN (b.balance_due_date - CURRENT_DATE) < 30 AND (b.total_amount - b.paid_amount) > 0 THEN 'medium'
    ELSE 'low'
  END as follow_up_priority
  
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN package_departure_dates pdd ON b.departure_date_id = pdd.id
LEFT JOIN booking_travelers bt ON b.lead_traveler_id = bt.id
WHERE b.payment_status IN ('pending', 'partial')
  AND b.status = 'confirmed'
ORDER BY follow_up_priority DESC, b.balance_due_date ASC;
```

---

## 🔄 DATABASE TRIGGERS

### Update timestamps trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_travelers_updated_at BEFORE UPDATE ON booking_travelers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply to all relevant tables...
```

### Capacity check trigger

```sql
CREATE OR REPLACE FUNCTION check_departure_capacity()
RETURNS TRIGGER AS $$
DECLARE
  v_capacity INTEGER;
  v_booked INTEGER;
  v_new_total INTEGER;
BEGIN
  -- Get current capacity and bookings
  SELECT capacity, booked INTO v_capacity, v_booked
  FROM package_departure_dates
  WHERE id = NEW.departure_date_id;
  
  -- Calculate new participant count
  v_new_total := (SELECT COUNT(*) FROM booking_travelers WHERE booking_id = NEW.id);
  
  -- Check if over capacity
  IF (v_booked + v_new_total) > v_capacity THEN
    RAISE EXCEPTION 'Departure date is fully booked. Available: %, Requested: %', 
      (v_capacity - v_booked), v_new_total;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_capacity_before_booking
BEFORE INSERT ON bookings
FOR EACH ROW EXECUTE FUNCTION check_departure_capacity();
```

---

## 📊 INDEXES FOR PERFORMANCE

```sql
-- Composite indexes for common queries
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_bookings_package_departure ON bookings(package_id, departure_date_id);
CREATE INDEX idx_bookings_payment_due ON bookings(payment_status, balance_due_date) 
  WHERE payment_status IN ('pending', 'partial');

-- Full-text search indexes
CREATE INDEX idx_travelers_name ON booking_travelers 
  USING gin(to_tsvector('english', first_name || ' ' || last_name));
CREATE INDEX idx_bookings_search ON bookings 
  USING gin(to_tsvector('english', booking_number || ' ' || special_requests));
```

---

## ✅ MIGRATION CHECKLIST

- [ ] Create new tables
- [ ] Add columns to existing tables
- [ ] Create indexes
- [ ] Create views
- [ ] Create functions
- [ ] Create triggers
- [ ] Setup RLS policies
- [ ] Seed test data
- [ ] Test all queries
- [ ] Backup database
- [ ] Document schema

---

*This schema provides a complete foundation for the Direct Booking System.*
