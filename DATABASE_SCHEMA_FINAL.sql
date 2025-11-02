-- ============================================================
-- TMPL ESCAPADE - COMPLETE DATABASE SCHEMA
-- Version: 3.0 - Production Ready
-- Date: November 1, 2025
-- All Business Rules Implemented
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create invoice sequence
CREATE SEQUENCE IF NOT EXISTS invoice_sequence START 1;

-- ============================================================
-- CORE TABLES
-- ============================================================

-- 1. USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  avatar VARCHAR(500),
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin', 'booking_reservation', 'tour_guide', 'travel_agent', 'finance', 'sales_marketing', 'customer')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  flag_tier VARCHAR(20) DEFAULT 'normal' CHECK (flag_tier IN ('normal', 'vip', 'vvip')),
  total_bookings INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  country VARCHAR(100),
  city VARCHAR(100),
  registration_date TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. PACKAGES (Rule #5: One primary destination)
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  continent VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  region VARCHAR(100),
  category VARCHAR(100),
  difficulty VARCHAR(50) CHECK (difficulty IN ('easy', 'moderate', 'challenging', 'expert')),
  base_price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'RM',
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER,
  min_group_size INTEGER DEFAULT 1,
  max_group_size INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('active', 'inactive', 'draft', 'archived')),
  highlights TEXT[],
  inclusions TEXT[],
  exclusions TEXT[],
  hero_image VARCHAR(500),
  gallery_images TEXT[],
  pdf_itinerary_url VARCHAR(500),
  total_bookings INTEGER DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  average_rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. DAILY ITINERARY (Rule #9: Package level only)
CREATE TABLE daily_itinerary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  activities TEXT[],
  location_from VARCHAR(255),
  location_to VARCHAR(255),
  meals TEXT[],
  accommodation VARCHAR(255),
  is_optional BOOLEAN DEFAULT FALSE,
  optional_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(package_id, day_number)
);

-- 4. PACKAGE IMAGES
CREATE TABLE package_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_hero BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. TRAVEL TIPS
CREATE TABLE travel_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. ESSENTIAL ITEMS
CREATE TABLE essential_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  item_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  is_mandatory BOOLEAN DEFAULT TRUE,
  notes TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. FLIGHT COMPANIES (Rule #10)
CREATE TABLE flight_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10) UNIQUE,
  logo_url VARCHAR(500),
  rating DECIMAL(2,1),
  fleet_size INTEGER,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 8. PACKAGE DEPARTURE DATES (Rule #1: Required for booking)
CREATE TABLE package_departure_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  capacity INTEGER NOT NULL,
  booked INTEGER DEFAULT 0,
  available INTEGER GENERATED ALWAYS AS (capacity - booked) STORED,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'full', 'cancelled')),
  price_override DECIMAL(10,2),
  flight_type VARCHAR(50) CHECK (flight_type IN ('economy', 'premium_economy', 'business', 'first_class')),
  flight_company_id UUID REFERENCES flight_companies(id),
  trip_code VARCHAR(50) UNIQUE NOT NULL,
  special_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_date_range CHECK (end_date > start_date),
  CONSTRAINT valid_capacity CHECK (capacity > 0),
  CONSTRAINT valid_booked CHECK (booked >= 0 AND booked <= capacity)
);

-- 9. TOUR GUIDES (Unified entity)
CREATE TABLE tour_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50) NOT NULL,
  avatar VARCHAR(500),
  license_number VARCHAR(100) UNIQUE,
  license_expiry DATE,
  specialties JSONB,
  languages JSONB,
  certifications JSONB,
  experience_years INTEGER DEFAULT 0,
  bio TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  total_trips INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 10. DEPARTURE GUIDE ASSIGNMENTS (Rule #3: Prevent overlaps)
CREATE TABLE departure_guide_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  departure_date_id UUID NOT NULL REFERENCES package_departure_dates(id) ON DELETE CASCADE,
  tour_guide_id UUID NOT NULL REFERENCES tour_guides(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('lead', 'companion')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(departure_date_id, tour_guide_id)
);

-- Rule #3: Trigger to prevent overlapping assignments
CREATE OR REPLACE FUNCTION check_tour_guide_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM departure_guide_assignments dga
    JOIN package_departure_dates pdd1 ON dga.departure_date_id = pdd1.id
    JOIN package_departure_dates pdd2 ON pdd2.id = NEW.departure_date_id
    WHERE dga.tour_guide_id = NEW.tour_guide_id
    AND dga.id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
    AND (pdd1.start_date, pdd1.end_date) OVERLAPS (pdd2.start_date, pdd2.end_date)
  ) THEN
    RAISE EXCEPTION 'Tour guide already assigned to overlapping departure date';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_tour_guide_availability
BEFORE INSERT OR UPDATE ON departure_guide_assignments
FOR EACH ROW EXECUTE FUNCTION check_tour_guide_availability();

-- 11. COUPONS (Rule #7: Flexible application)
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  max_discount_amount DECIMAL(10,2),
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  per_user_limit INTEGER DEFAULT 1,
  min_purchase_amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  applicable_packages UUID[],
  applicable_continents VARCHAR(100)[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_discount CHECK (discount_value > 0),
  CONSTRAINT valid_dates CHECK (valid_until >= valid_from)
);

-- 12. BOOKINGS (Rules #1, #7, #8)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES users(id),
  package_id UUID NOT NULL REFERENCES packages(id),
  departure_date_id UUID NOT NULL REFERENCES package_departure_dates(id), -- Rule #1: REQUIRED
  travel_start_date DATE NOT NULL,
  travel_end_date DATE NOT NULL,
  participants INTEGER NOT NULL CHECK (participants > 0),
  participant_details JSONB,
  status VARCHAR(20) DEFAULT 'inquiry' CHECK (status IN ('inquiry', 'confirmed', 'completed', 'cancelled')),
  total_amount DECIMAL(12,2) NOT NULL,
  paid_amount DECIMAL(12,2) DEFAULT 0,
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
  currency VARCHAR(10) DEFAULT 'RM',
  coupon_id UUID REFERENCES coupons(id),
  coupon_applied_at VARCHAR(20) CHECK (coupon_applied_at IN ('booking', 'payment')), -- Rule #7
  discount_amount DECIMAL(10,2) DEFAULT 0,
  -- Rule #8: Corporate booking fields
  booking_type VARCHAR(20) DEFAULT 'individual' CHECK (booking_type IN ('individual', 'corporate')),
  company_name VARCHAR(255),
  company_registration VARCHAR(100),
  sst_registration VARCHAR(100),
  business_type VARCHAR(100),
  contact_person VARCHAR(255),
  purchase_order_no VARCHAR(100),
  credit_terms VARCHAR(100),
  billing_address TEXT,
  special_requests TEXT[],
  dietary_requirements TEXT,
  medical_conditions TEXT,
  notes TEXT,
  booking_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_payment CHECK (paid_amount >= 0 AND paid_amount <= total_amount)
);

-- Rule #2: Auto-inherit tour guides trigger
CREATE OR REPLACE FUNCTION inherit_tour_guides_on_booking()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO tour_guide_assignments (tour_guide_id, booking_id, package_id, departure_date_id, role, status)
  SELECT dga.tour_guide_id, NEW.id, NEW.package_id, NEW.departure_date_id, dga.role, 'upcoming'
  FROM departure_guide_assignments dga
  WHERE dga.departure_date_id = NEW.departure_date_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_assign_tour_guides
AFTER INSERT ON bookings
FOR EACH ROW EXECUTE FUNCTION inherit_tour_guides_on_booking();

-- Update departure booked count
CREATE OR REPLACE FUNCTION update_departure_booked_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE package_departure_dates SET booked = booked + NEW.participants WHERE id = NEW.departure_date_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.departure_date_id = NEW.departure_date_id THEN
    UPDATE package_departure_dates SET booked = booked - OLD.participants + NEW.participants WHERE id = NEW.departure_date_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE package_departure_dates SET booked = booked - OLD.participants WHERE id = OLD.departure_date_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER manage_departure_capacity
AFTER INSERT OR UPDATE OR DELETE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_departure_booked_count();

-- 13. TOUR GUIDE ASSIGNMENTS (Post-booking)
CREATE TABLE tour_guide_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_guide_id UUID NOT NULL REFERENCES tour_guides(id),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  package_id UUID NOT NULL REFERENCES packages(id),
  departure_date_id UUID NOT NULL REFERENCES package_departure_dates(id),
  role VARCHAR(20) NOT NULL CHECK (role IN ('lead', 'companion')),
  status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'completed', 'cancelled')),
  special_instructions TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 14. ASSIGNMENT ITINERARY
CREATE TABLE assignment_itinerary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES tour_guide_assignments(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255),
  activities JSONB,
  accommodation VARCHAR(255),
  meals JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(assignment_id, day_number)
);

-- 15. ASSIGNMENT EMERGENCY CONTACTS
CREATE TABLE assignment_emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES tour_guide_assignments(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  relationship VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 16. ASSIGNMENT EQUIPMENT
CREATE TABLE assignment_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES tour_guide_assignments(id) ON DELETE CASCADE,
  equipment_name VARCHAR(255) NOT NULL,
  quantity INTEGER DEFAULT 1,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'needed' CHECK (status IN ('needed', 'acquired', 'returned')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 17. ASSIGNMENT TRANSPORTATION
CREATE TABLE assignment_transportation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES tour_guide_assignments(id) ON DELETE CASCADE,
  type VARCHAR(100),
  provider VARCHAR(255),
  details TEXT,
  pickup_time TIME,
  pickup_location VARCHAR(255),
  dropoff_location VARCHAR(255),
  booking_reference VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 18. PAYMENTS
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'RM',
  payment_method VARCHAR(50) NOT NULL,
  payment_reference VARCHAR(255),
  transaction_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  coupon_id UUID REFERENCES coupons(id),
  discount_amount DECIMAL(10,2) DEFAULT 0,
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_payment_amount CHECK (amount > 0)
);

-- Update booking paid amount
CREATE OR REPLACE FUNCTION update_booking_paid_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    UPDATE bookings 
    SET paid_amount = paid_amount + NEW.amount,
        payment_status = CASE 
          WHEN paid_amount + NEW.amount >= total_amount THEN 'paid'
          WHEN paid_amount + NEW.amount > 0 THEN 'partial'
          ELSE 'pending'
        END
    WHERE id = NEW.booking_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_paid_amount
AFTER INSERT OR UPDATE ON payments
FOR EACH ROW EXECUTE FUNCTION update_booking_paid_amount();

-- 19. PAYMENT INSTALLMENTS
CREATE TABLE payment_installments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  installment_number INTEGER NOT NULL,
  total_installments INTEGER NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'RM',
  due_date DATE NOT NULL,
  installment_frequency VARCHAR(20) CHECK (installment_frequency IN ('weekly', 'bi-weekly', 'monthly', 'quarterly')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  payment_id UUID REFERENCES payments(id),
  payment_method VARCHAR(50),
  payment_reference VARCHAR(100),
  paid_date DATE,
  payment_reminder_sent BOOLEAN DEFAULT FALSE,
  reminder_sent_date TIMESTAMP,
  last_reminder_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_installment_number CHECK (installment_number > 0 AND installment_number <= total_installments)
);

-- 20. INVOICES (Rule #4: Track cumulative payment)
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  booking_id UUID NOT NULL REFERENCES bookings(id),
  payment_id UUID REFERENCES payments(id),
  installment_id UUID REFERENCES payment_installments(id),
  invoice_type VARCHAR(30) NOT NULL CHECK (invoice_type IN ('full_payment', 'installment', 'deposit', 'balance', 'refund')),
  amount DECIMAL(12,2) NOT NULL,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL,
  -- Rule #4: Cumulative tracking
  previous_total_paid DECIMAL(12,2) DEFAULT 0,
  cumulative_total_paid DECIMAL(12,2) NOT NULL,
  remaining_balance DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'RM',
  issue_date DATE NOT NULL,
  due_date DATE,
  status VARCHAR(20) DEFAULT 'issued' CHECK (status IN ('draft', 'issued', 'paid', 'overdue', 'cancelled', 'refunded')),
  pdf_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT valid_invoice_amount CHECK (total_amount > 0),
  CONSTRAINT valid_cumulative CHECK (cumulative_total_paid >= previous_total_paid)
);

-- 21. DESTINATIONS
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  continent VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  popular_season VARCHAR(100),
  average_temperature VARCHAR(50),
  timezone VARCHAR(100),
  currency VARCHAR(50),
  language VARCHAR(100),
  visa_requirements TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 22. REVIEWS (Rule #6: Package reviews only)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id),
  customer_id UUID NOT NULL REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'flagged', 'rejected')),
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(package_id, customer_id) -- Rule #6: One review per customer per package
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_packages_status ON packages(status);
CREATE INDEX idx_packages_continent ON packages(continent);
CREATE INDEX idx_daily_itinerary_package ON daily_itinerary(package_id);
CREATE INDEX idx_departure_dates_package ON package_departure_dates(package_id);
CREATE INDEX idx_departure_dates_start ON package_departure_dates(start_date);
CREATE INDEX idx_departure_guide_assignments_departure ON departure_guide_assignments(departure_date_id);
CREATE INDEX idx_departure_guide_assignments_guide ON departure_guide_assignments(tour_guide_id);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_package ON bookings(package_id);
CREATE INDEX idx_bookings_departure_date ON bookings(departure_date_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_tour_guide_assignments_guide ON tour_guide_assignments(tour_guide_id);
CREATE INDEX idx_tour_guide_assignments_booking ON tour_guide_assignments(booking_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payment_installments_booking ON payment_installments(booking_id);
CREATE INDEX idx_payment_installments_due_date ON payment_installments(due_date);
CREATE INDEX idx_invoices_booking ON invoices(booking_id);
CREATE INDEX idx_reviews_package ON reviews(package_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);
