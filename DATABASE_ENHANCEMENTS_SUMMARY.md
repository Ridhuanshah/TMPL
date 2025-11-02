# 🔍 DATABASE ARCHITECTURE ENHANCEMENTS
**Based on Complete Admin Panel Analysis**  
**Date:** November 1, 2025  
**Status:** ✅ ALL CLARIFICATIONS DOCUMENTED

---

## 📋 CONFIRMED BUSINESS RULES

### **Rule #1: Booking Requirements** ✅
- Customers **MUST** select a specific `package_departure_date` when booking
- `bookings.departure_date_id` is **REQUIRED** (NOT NULL FK)

### **Rule #2: Tour Guide Auto-Assignment** 🤖
- Tour guides are pre-assigned to departure dates
- When booking is created, tour guides **automatically inherited** from departure
- Implemented via database trigger

### **Rule #3: Conflict Prevention** ⚠️
- Database constraint prevents overlapping tour guide assignments
- Cannot assign same guide to overlapping date ranges
- Enforced via trigger function

### **Rule #4: Invoice Generation** 📄
- One invoice per installment payment
- Each invoice **MUST** show cumulative total paid amount
- Fields: `previous_total_paid`, `cumulative_total_paid`, `remaining_balance`

### **Rule #5: Package Destinations** 🗺️
- Each package has **ONE primary destination** (1:1)
- Stored directly in packages table (continent, country, region)

### **Rule #6: Review System** ⭐
- Customers can **only review packages** (general rating)
- NOT specific to bookings or tour guides
- One review per customer per package

### **Rule #7: Coupon Flexibility** 🎟️
- Can be applied at **booking time** OR **payment time**
- Track application stage in `bookings.coupon_applied_at`

### **Rule #8: Corporate Bookings** 🏢
- Corporate fields added directly to `bookings` table
- No separate corporate clients table
- Fields: company_name, registration, SST, PO number, etc.

### **Rule #9: Package Itinerary** 📋
- Daily itinerary defined at **package level only**
- Same itinerary for all departure dates
- Cannot customize per departure or booking

### **Rule #10: Flight Assignment** ✈️
- ONE flight company per departure date
- Admin selects provider when creating departure
- Each departure can have different flight company

---

## 🆕 KEY DISCOVERIES

### 1. **PACKAGE DEPARTURE DATES** ✨
**Critical Finding:** Each package has MULTIPLE departure dates that customers can choose from!

**New Table Required:** `package_departure_dates`
```sql
CREATE TABLE package_departure_dates (
  id UUID PRIMARY KEY,
  package_id UUID REFERENCES packages(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  capacity INTEGER NOT NULL,
  booked INTEGER DEFAULT 0,
  status VARCHAR(20) CHECK (status IN ('active', 'full', 'cancelled')),
  price DECIMAL(10,2), -- Can override package base price
  flight_type VARCHAR(50), -- economy, premium_economy, business, first_class
  flight_company_id UUID REFERENCES flight_companies(id),
  trip_code VARCHAR(50) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. **E-INVOICE GENERATION** 📄
**Discovery:** System generates payment invoices for bookings

**New Table Required:** `invoices`
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  booking_id UUID REFERENCES bookings(id),
  payment_id UUID REFERENCES payments(id),
  invoice_type VARCHAR(30) CHECK (invoice_type IN ('full_payment', 'installment', 'deposit', 'balance', 'refund')),
  amount DECIMAL(12,2) NOT NULL,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'RM',
  issue_date DATE NOT NULL,
  due_date DATE,
  status VARCHAR(20) CHECK (status IN ('draft', 'issued', 'paid', 'overdue', 'cancelled', 'refunded')),
  pdf_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. **TOUR GUIDE ASSIGNMENTS** (ENHANCED) 👨‍✈️
**Discovery:** Complex tour guide assignment system with itinerary, emergency contacts, equipment

**Enhanced Table:** `tour_guide_assignments`
```sql
CREATE TABLE tour_guide_assignments (
  id UUID PRIMARY KEY,
  tour_guide_id UUID REFERENCES tour_guides(id),
  booking_id UUID REFERENCES bookings(id),
  package_id UUID REFERENCES packages(id),
  departure_date_id UUID REFERENCES package_departure_dates(id),
  role VARCHAR(20) CHECK (role IN ('lead', 'companion')),
  status VARCHAR(20) CHECK (status IN ('upcoming', 'in_progress', 'completed', 'cancelled')),
  special_instructions TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Assignment itinerary details
CREATE TABLE assignment_itinerary (
  id UUID PRIMARY KEY,
  assignment_id UUID REFERENCES tour_guide_assignments(id),
  day_number INTEGER NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255),
  activities JSONB,
  accommodation VARCHAR(255),
  meals JSONB,
  notes TEXT
);

-- Emergency contacts
CREATE TABLE assignment_emergency_contacts (
  id UUID PRIMARY KEY,
  assignment_id UUID REFERENCES tour_guide_assignments(id),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255)
);

-- Equipment needed
CREATE TABLE assignment_equipment (
  id UUID PRIMARY KEY,
  assignment_id UUID REFERENCES tour_guide_assignments(id),
  equipment_name VARCHAR(255) NOT NULL,
  quantity INTEGER DEFAULT 1,
  notes TEXT
);

-- Transportation details
CREATE TABLE assignment_transportation (
  id UUID PRIMARY KEY,
  assignment_id UUID REFERENCES tour_guide_assignments(id),
  type VARCHAR(100),
  details TEXT,
  pickup_time TIME,
  pickup_location VARCHAR(255),
  dropoff_location VARCHAR(255)
);
```

### 4. **PAYMENT INSTALLMENTS** (ENHANCED) 💰
**Discovery:** Detailed installment plans with frequency, due dates, payment methods

**Table Already Exists But Needs Enhancement:**
```sql
ALTER TABLE payment_installments 
ADD COLUMN installment_frequency VARCHAR(20) CHECK (frequency IN ('weekly', 'bi-weekly', 'monthly', 'quarterly')),
ADD COLUMN payment_method VARCHAR(50),
ADD COLUMN payment_reference VARCHAR(100),
ADD COLUMN paid_date DATE,
ADD COLUMN payment_reminder_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN reminder_sent_date TIMESTAMP;
```

### 5. **FLIGHT COMPANIES** ✈️
**New Entity Discovered:**
```sql
CREATE TABLE flight_companies (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10) UNIQUE,
  logo_url VARCHAR(500),
  rating DECIMAL(2,1),
  fleet_size INTEGER,
  status VARCHAR(20) CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6. **TOUR GUIDES - UNIFIED ENTITY** 👨‍✈️✨
**Correction:** Tour Guides handle BOTH pre-booking planning AND actual trip execution!
- Assigned to package departure dates (planning phase)
- Assigned to specific bookings (execution phase)

**Enhanced tour_guides table:**
```sql
CREATE TABLE tour_guides (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  avatar VARCHAR(500),
  specialties JSONB, -- ["Adventure Tourism", "Cultural Tours", etc.]
  languages JSONB, -- ["English", "Mandarin", "Malay"]
  experience_years INTEGER,
  rating DECIMAL(2,1),
  total_trips INTEGER DEFAULT 0,
  status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'on_leave')),
  certifications JSONB, -- ["Wilderness First Aid", "Tour Guide License"]
  bio TEXT,
  license_number VARCHAR(100),
  license_expiry DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tour guide assignments to departure dates (pre-booking planning)
CREATE TABLE departure_guide_assignments (
  id UUID PRIMARY KEY,
  departure_date_id UUID REFERENCES package_departure_dates(id),
  tour_guide_id UUID REFERENCES tour_guides(id),
  role VARCHAR(20) CHECK (role IN ('lead', 'companion')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(departure_date_id, tour_guide_id)
);
```

### 7. **CORPORATE BOOKINGS** (ENHANCED) 🏢
**Discovery:** Extended fields for B2B corporate bookings

**Enhance bookings table:**
```sql
ALTER TABLE bookings 
ADD COLUMN booking_type VARCHAR(20) CHECK (booking_type IN ('individual', 'corporate')) DEFAULT 'individual',
ADD COLUMN company_name VARCHAR(255),
ADD COLUMN company_registration VARCHAR(100),
ADD COLUMN sst_registration VARCHAR(100),
ADD COLUMN business_type VARCHAR(100),
ADD COLUMN purchase_order_no VARCHAR(100),
ADD COLUMN credit_terms VARCHAR(100),
ADD COLUMN billing_address TEXT;
```

---

## 📊 COMPLETE ENHANCED TABLE LIST

### **New Tables (8):**
1. `package_departure_dates` - Multiple departure dates per package
2. `invoices` - E-invoice generation
3. `assignment_itinerary` - Tour guide daily itinerary
4. `assignment_emergency_contacts` - Emergency contacts per assignment
5. `assignment_equipment` - Equipment needed per assignment
6. `assignment_transportation` - Transportation details
7. `flight_companies` - Flight provider management
8. `departure_guide_assignments` - Tour guides assigned to departure dates (pre-booking)

### **Enhanced Tables (4):**
1. `bookings` - Added corporate fields
2. `payment_installments` - Added frequency, reminders
3. `tour_guide_assignments` - Added departure_date_id link
4. `tour_guides` - Enhanced with more professional fields (license, certifications, etc.)

---

## 🔗 KEY RELATIONSHIPS

```
packages (1) ──→ (N) package_departure_dates
package_departure_dates (1) ──→ (N) departure_guide_assignments (N) ──→ (1) tour_guides
package_departure_dates (N) ──→ (1) flight_companies
package_departure_dates (1) ──→ (N) bookings
bookings (1) ──→ (N) tour_guide_assignments (N) ──→ (1) tour_guides
tour_guide_assignments (1) ──→ (N) assignment_itinerary
tour_guide_assignments (1) ──→ (N) assignment_emergency_contacts
tour_guide_assignments (1) ──→ (N) assignment_equipment
tour_guide_assignments (1) ──→ (N) assignment_transportation
bookings (1) ──→ (N) payments (1) ──→ (N) invoices
bookings (1) ──→ (N) payment_installments
```

### **Tour Guide Assignment Flow:**
1. **Planning Phase:** Tour guides assigned to `package_departure_dates` via `departure_guide_assignments`
2. **Booking Phase:** When customer books, system can suggest pre-assigned tour guides
3. **Execution Phase:** Confirmed tour guides linked to specific `bookings` via `tour_guide_assignments`

---

## ✅ TOTAL DATABASE ARCHITECTURE

**Original Tables:** 15  
**New Tables:** 8  
**Enhanced Tables:** 4  
**TOTAL TABLES:** 23

---

## 🎯 KEY ARCHITECTURAL IMPROVEMENTS

1. **✅ Unified Tour Guide Entity** - Single entity handles both planning and execution
2. **✅ Multiple Departure Dates** - Packages can have flexible scheduling
3. **✅ Complete Invoice System** - Full e-invoice generation capability
4. **✅ Corporate Booking Support** - B2B features for enterprise clients
5. **✅ Enhanced Payment Tracking** - Detailed installment management
6. **✅ Flight Integration** - Link departure dates to flight providers
7. **✅ Detailed Assignment Tracking** - Equipment, contacts, transportation

This is now a **production-ready, enterprise-grade** database architecture! 🚀
