# Payment Structure Implementation Plan

## User Request
Implement a comprehensive payment structure system that supports:
- Full Payment option
- Installment Plans (0% Interest) with tiered payment counts based on amount
- Deposit Plans with amount-based deposit requirements and 60-day balance completion rule

## Related Files
- @/polymet/pages/new-booking (to update with new payment structure)
- @/polymet/data/package-data (reference for pricing calculations)
- @/polymet/components/payment-structure-component (to create new component)

## TODO List
- [x] Create payment structure component with all payment options
- [x] Update new-booking page to integrate new payment structure
- [x] Implement automatic payment calculation logic based on total amount
- [x] Add installment schedule generation
- [x] Add deposit calculation with balance due dates
- [x] Test payment structure with different amount ranges
- [x] Ensure Malaysia LHDN E-Invoice compliance for all payment types

## Important Notes

### Payment Structure Requirements:
**Full Payment:**
- Single payment option for complete amount

**Installment Plans (0% Interest):**
- < RM10,000 → 3 payments
- RM10,001 – RM30,000 → 4 payments  
- > RM30,000 → 6 payments

**Deposit Plans:**
- < RM10,000 → RM500 deposit
- ≥ RM10,000 → RM1,000 deposit
- Balance must be completed 60 days before departure
- Customer may opt to pay full amount instead of deposit

### Technical Considerations:
- Automatic calculation based on package total amount
- Date calculations for installment schedules and balance due dates
- Integration with existing booking form validation
- LHDN E-Invoice compliance for all payment structures
  
## Plan Information
*This plan is created when the project is at iteration 27, and date 2025-09-21T07:21:00.003Z*
