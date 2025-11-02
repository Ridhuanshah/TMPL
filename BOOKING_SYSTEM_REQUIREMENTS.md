# 📋 DIRECT BOOKING SYSTEM - BUSINESS REQUIREMENTS
## TMPL Escapade Travel Agency

> **Last Updated**: Nov 3, 2025  
> **Status**: Requirements Confirmed ✅

---

## 💳 1. PAYMENT & PRICING

### 1.1 Payment Methods (Phase 1)
✅ **PAY LATER** - No payment gateway initially
- Customer books without immediate payment
- Admin sends invoice manually
- Customer pays via bank transfer or at office

**Future:** Multiple payment gateways (Stripe, Razorpay, iPay88, FPX, E-Wallets)

### 1.2 Deposit Structure
*Source: `/src/polymet/plans/payment-structure-implementation.md`*

| Package Price | Required Deposit | Balance Due |
|---------------|------------------|-------------|
| < RM 10,000 | RM 500 | 60 days before departure |
| ≥ RM 10,000 | RM 1,000 | 60 days before departure |

**Rules:**
- Customer may choose full payment instead
- Balance MUST be paid 60 days before departure
- System calculates and displays due dates

### 1.3 Installment Plans (0% Interest)
*Source: `/src/polymet/plans/payment-structure-implementation.md`*

| Total Amount | Payments | Example |
|--------------|----------|---------|
| < RM 10,000 | 3 equal payments | RM 9,000 → 3 x RM 3,000 |
| RM 10,001 - RM 30,000 | 4 equal payments | RM 15,000 → 4 x RM 3,750 |
| > RM 30,000 | 6 equal payments | RM 36,000 → 6 x RM 6,000 |

### 1.4 Pricing Rules
✅ **Same price for all customers** - No age-based discounts
- Price based on: Package + Departure Date + Add-ons + Promo codes
- Variable pricing per departure date (already in database)
- No group discounts (use coupon codes instead)

---

## 👤 2. CUSTOMER INFORMATION

### 2.1 Seamless Account Creation
✅ **Required but automatic**
- Account needed to book
- Auto-created during checkout if new customer
- Existing users can login first
- No separate registration page

**Flow:**
```
Click "Book Now" → Check login
  ├─ Logged in → Continue booking
  └─ Not logged in → Collect email
       └─ Email exists? → Ask to login
       └─ New email? → Auto-create account at checkout
```

### 2.2 Required Fields Per Traveler
*From customer's provided booking form image*

**For EACH Participant (11 fields):**
1. Full Name (First + Last)
2. Email Address
3. Phone Number
4. IC Number / Passport Number
5. Nationality
6. Date of Birth (mm/dd/yyyy)
7. Gender (dropdown)
8. Passport ID (optional)
9. Emergency Contact Name
10. Emergency Contact Relation (Mother/Father/Spouse)
11. Emergency Contact Number

**Optional:**
- Dietary requirements
- Medical conditions
- Special requests

### 2.3 Multiple Travelers
✅ **All details needed for EACH traveler**
- Form repeats for each participant
- "Copy from previous" feature
- Collapsible accordion design
- Auto-save progress

---

## 📝 3. BOOKING MANAGEMENT

### 3.1 Booking Confirmation
✅ **INSTANT CONFIRMATION**
- Confirmed immediately after form submit
- Booking number generated
- Confirmation email sent
- Appears in dashboard

### 3.2 Modifications
✅ **Contact Admin Only**
- No self-service modifications
- Contact via email/WhatsApp/phone
- Admin makes changes in dashboard

### 3.3 Cancellation Policy
✅ **Partial Refund** (detailed policy TBD)

**Placeholder:**
- 30+ days: 100% refund (less admin fee)
- 15-29 days: 50% refund  
- <15 days: No refund / credit voucher

### 3.4 Booking Statuses
```
Status: "inquiry" | "confirmed" | "completed" | "cancelled"
Payment: "pending" | "partial" | "paid" | "refunded"
```

**New statuses to add:**
- `waitlisted`
- `payment_overdue`
- `pending_cancellation`

### 3.5 Capacity Management
✅ **HARD LIMIT** - No overbooking
- Stop bookings when full
- No waitlist (Phase 1)
- Admin can manually close dates

---

## 📧 4. NOTIFICATIONS

### 4.1 Automated Emails (ALL REQUIRED)
**Using own SMTP server**

1. ✅ Booking Confirmation (immediate)
2. ✅ Payment Receipt (when paid)
3. ✅ Booking Details (3-7 days after)
4. ✅ Payment Reminder (when due)
5. ✅ Trip Reminder (7 days before)
6. ✅ Cancellation Confirmation
7. ✅ Modification Confirmation
8. ✅ Waitlist Notification
9. ✅ Review Request (after trip)

### 4.2 SMS
✅ **NO SMS** - Email only

### 4.3 Admin Notifications
- Email on new booking
- Dashboard notification badge
- Realtime updates

---

## ✨ 5. BOOKING FEATURES

### 5.1 Optional Add-ons
✅ **YES** - Two types

**Type 1: Optional Itinerary Items**
- From `daily_itinerary` where `is_optional = true`
- Example: Day 5 Hot Air Balloon (+RM 350)

**Type 2: Separate Add-ons**
- Travel Insurance (+RM 50/person)
- Equipment Rental (+RM 200/booking)
- Airport Transfer (+RM 100/person)
- Private Guide (+RM 1,000)

### 5.2 Flight Options
✅ **Already assigned** - No customer selection
- Fixed per departure date
- Display info only

### 5.3 Accommodation
✅ **No choice** - Fixed per package
- Info display only

### 5.4 Promo Codes
✅ **YES** - Full coupon system

*Source: `/src/polymet/data/coupon-data.ts`*

**Types:**
- Percentage discount (e.g., 15% off)
- Fixed amount (e.g., RM 500 off)
- BOGO (future)

**Conditions:**
- Minimum purchase amount
- Maximum discount cap
- Package/continent restrictions
- First-time customer only
- User tier restrictions
- Date validity
- Usage limits

---

## 🖥️ 6. ADMIN FEATURES

### 6.1 Booking Management
*Refer to existing `/admin/bookings`*

**Admin can:**
- View all bookings (with filters)
- View booking details
- Cancel bookings
- Modify bookings manually
- Download reports (Excel/PDF)
- Send emails to customers
- Mark as completed
- Add internal notes

### 6.2 Payment Follow-up
*Refer to existing `/admin/payment-follow-up`*

**Features:**
- Track pending payments
- Send payment reminders
- Record partial payments
- Installment tracking
- Overdue alerts

---

## 🎨 7. USER EXPERIENCE

### 7.1 Booking Flow
✅ **Multi-Step Wizard** (5 steps)

```
Step 1: Select Date & Participants
Step 2: Optional Add-ons
Step 3: Traveler Information  
Step 4: Review & Apply Promo
Step 5: Confirmation Page
```

### 7.2 Booking Number Format
✅ **PKG###-YYYY-MMM-###**

Example: `PKG004-2025-JAN-001`

**Structure:**
- Package ID (last 3 digits)
- Year (4 digits)
- Month (3 letters)
- Sequential number (3 digits, resets monthly)

---

## 📊 8. REPORTS & ANALYTICS

### 8.1 Required Reports
*Enhance existing `/admin/analytics`*

- Daily bookings report
- Revenue by package
- Revenue by date range
- Customer contact list
- Upcoming departures (30/60/90 days)
- Cancellation rate
- Average booking value
- Popular packages
- Conversion rate
- Payment collection rate
- Overdue payments
- Coupon usage stats
- Add-ons popularity

---

## 🚀 9. IMPLEMENTATION APPROACH

### 9.1 Development Strategy
✅ **FULL BUILD** - Not MVP
- Complete all features
- High quality over speed
- Flexible timeline
- No budget constraints

### 9.2 Quality Requirements
- Comprehensive testing
- Mobile responsive
- Performance optimized
- Security hardened
- User-friendly
- Admin-friendly

---

## ✅ REQUIREMENTS SIGN-OFF

**Confirmed By:** Customer  
**Date:** Nov 3, 2025  
**Status:** All requirements documented and approved  

**Next Steps:** 
1. Database schema design
2. Implementation phases planning
3. UI/UX mockups
4. Development start

---

*This document serves as the single source of truth for the Direct Booking System requirements.*
