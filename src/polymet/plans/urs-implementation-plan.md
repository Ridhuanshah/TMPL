# TMPL Escapade URS Implementation Plan

## User Request
Implement all features specified in the URS (User Requirements Specification) that are not yet available in the current TMPL Escapade admin dashboard system.

## Related Files
- @/polymet/components/payment-structure-section (existing - needs enhancement)
- @/polymet/components/coupon-discount-section (existing - needs enhancement)
- @/polymet/pages/package-management (existing - needs major enhancements)
- @/polymet/pages/booking-management (existing - needs enhancements)
- @/polymet/pages/user-management (existing - needs customer retention features)
- @/polymet/data/package-data (existing - needs inventory features)
- @/polymet/data/booking-data (existing - needs participant details)
- @/polymet/pages/new-booking-fixed (existing - needs add-ons, inventory, participants)
- @/polymet/components/role-permissions-info (existing - matches URS roles)
- @/polymet/pages/customer-dashboard (to create - new requirement)
- @/polymet/pages/refund-cancellation (to create - new requirement)
- @/polymet/components/invoice-generator (to create - new requirement)
- @/polymet/components/payment-followup (to create - new requirement)
- @/polymet/components/trip-history (to create - new requirement)
- @/polymet/components/booking-checklist (to create - new requirement)

## TODO List

### Phase 1: Core Payment & Booking Enhancements
- [x] Enhance payment-structure-section with proper instalment calculations and deposit logic (already implemented)
- [x] Add repeating customer discount feature (IC-based identification)
- [x] Implement add-on optional activities in booking flow
- [x] Add inventory/quota management to packages
- [x] Create participant details management for multiple bookings
- [x] Enhance booking data structure for waitlist functionality
- [x] Integrate new components into existing booking flow (comprehensive booking form created)

### Phase 2: Advanced Package Management
- [ ] Add inventory tracking to package-management page
- [ ] Implement waitlist functionality for full packages
- [ ] Create booking checklist component for operational tasks
- [ ] Add export functionality for participant data
- [ ] Enhance package-data with quota and add-on structures

### Phase 3: Customer-Facing Features
- [ ] Create customer dashboard page with trip history
- [ ] Implement trip details view with itinerary and payment summary
- [ ] Add downloadable itinerary functionality
- [ ] Create refund/cancellation request system
- [ ] Build customer trip materials access

### Phase 4: Administrative Tools
- [ ] Create invoice generator with PDF export
- [ ] Implement payment follow-up tracking system
- [ ] Add manual payment status updates with remarks
- [ ] Create refund processing workflow
- [ ] Build email/SMS/WhatsApp integration for reminders

### Phase 5: Role-Based Access Control
- [ ] Enhance role permissions for specific URS requirements
- [ ] Add promotional email blast functionality for Sales & Marketing
- [ ] Implement operational checklist for Booking & Reservation role
- [ ] Add manual invoice/receipt creation for Admin role

## Important Notes
- Payment structure component already exists but needs enhancement for proper instalment/deposit calculations
- User management and role system already implemented - matches URS requirements
- Package management exists but lacks inventory, add-ons, and participant features
- Booking system exists but needs major enhancements for URS compliance
- Customer dashboard is completely missing and needs to be built from scratch
- Refund/cancellation system is completely missing
- Invoice generation and payment follow-up systems need to be created
- Current system has good foundation but needs significant feature additions to meet URS requirements
  
## Plan Information
*This plan is created when the project is at iteration 41, and date 2025-09-21T10:50:46.173Z*
