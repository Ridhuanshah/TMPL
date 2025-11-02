-- ============================================================================
-- DIRECT BOOKING SYSTEM - PART 6: ROW LEVEL SECURITY POLICIES
-- Version: 1.0.0
-- Created: Nov 3, 2025
-- ============================================================================

-- Enable RLS on all new tables
ALTER TABLE booking_travelers ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE installment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE installment_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Booking Travelers Policies
-- ============================================================================

-- Customers can view travelers for their own bookings
CREATE POLICY "Customers can view own booking travelers"
ON booking_travelers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = booking_travelers.booking_id
    AND bookings.user_id = auth.uid()
  )
);

-- Customers can insert travelers for their own bookings
CREATE POLICY "Customers can create booking travelers"
ON booking_travelers FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = booking_travelers.booking_id
    AND bookings.user_id = auth.uid()
  )
);

-- Admin can view all travelers
CREATE POLICY "Admin can view all booking travelers"
ON booking_travelers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin')
  )
);

-- Admin can update travelers
CREATE POLICY "Admin can update booking travelers"
ON booking_travelers FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin')
  )
);

-- ============================================================================
-- Package Add-ons Policies
-- ============================================================================

-- Everyone can view active add-ons
CREATE POLICY "Anyone can view active package addons"
ON package_addons FOR SELECT
USING (is_active = true);

-- Admin can manage all add-ons
CREATE POLICY "Admin can manage package addons"
ON package_addons FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin')
  )
);

-- ============================================================================
-- Booking Add-ons Policies
-- ============================================================================

-- Customers can view add-ons for their bookings
CREATE POLICY "Customers can view own booking addons"
ON booking_addons FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = booking_addons.booking_id
    AND bookings.user_id = auth.uid()
  )
);

-- Customers can add add-ons to their bookings
CREATE POLICY "Customers can add booking addons"
ON booking_addons FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = booking_addons.booking_id
    AND bookings.user_id = auth.uid()
  )
);

-- Admin can view all booking add-ons
CREATE POLICY "Admin can view all booking addons"
ON booking_addons FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin')
  )
);

-- ============================================================================
-- Booking Payments Policies
-- ============================================================================

-- Customers can view payments for their own bookings
CREATE POLICY "Customers can view own booking payments"
ON booking_payments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = booking_payments.booking_id
    AND bookings.user_id = auth.uid()
  )
);

-- Admin can view all payments
CREATE POLICY "Admin can view all booking payments"
ON booking_payments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin', 'finance')
  )
);

-- Admin can manage payments
CREATE POLICY "Admin can manage booking payments"
ON booking_payments FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin', 'finance')
  )
);

-- ============================================================================
-- Installment Policies
-- ============================================================================

-- Customers can view their own installment plans
CREATE POLICY "Customers can view own installment plans"
ON installment_plans FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = installment_plans.booking_id
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Customers can view own installment schedule"
ON installment_schedule FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM installment_plans ip
    JOIN bookings b ON b.id = ip.booking_id
    WHERE ip.id = installment_schedule.plan_id
    AND b.user_id = auth.uid()
  )
);

-- Admin can view and manage all installments
CREATE POLICY "Admin can manage installment plans"
ON installment_plans FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin', 'finance')
  )
);

CREATE POLICY "Admin can manage installment schedule"
ON installment_schedule FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin', 'finance')
  )
);

-- ============================================================================
-- Coupon Usage Policies
-- ============================================================================

-- Users can view their own coupon usage
CREATE POLICY "Users can view own coupon usage"
ON coupon_usage FOR SELECT
USING (user_id = auth.uid());

-- Admin can view all coupon usage
CREATE POLICY "Admin can view all coupon usage"
ON coupon_usage FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin', 'marketing')
  )
);

-- System can insert coupon usage (during booking)
CREATE POLICY "System can record coupon usage"
ON coupon_usage FOR INSERT
WITH CHECK (true); -- Will be controlled by application logic

-- ============================================================================
-- Booking Notifications Policies
-- ============================================================================

-- Admin can view all booking notifications
CREATE POLICY "Admin can view booking notifications"
ON booking_notifications FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin', 'marketing')
  )
);

-- System can manage notifications
CREATE POLICY "System can manage notifications"
ON booking_notifications FOR ALL
USING (true); -- Controlled by application logic

-- ============================================================================
-- Admin Notifications Policies
-- ============================================================================

-- Admin users can view notifications
CREATE POLICY "Admin can view admin notifications"
ON admin_notifications FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin', 'booking_manager', 'finance', 'marketing', 'tour_guide')
  )
);

-- Admin can mark notifications as read
CREATE POLICY "Admin can update admin notifications"
ON admin_notifications FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('admin', 'super_admin', 'booking_manager', 'finance', 'marketing', 'tour_guide')
  )
);

-- System can create admin notifications
CREATE POLICY "System can create admin notifications"
ON admin_notifications FOR INSERT
WITH CHECK (true); -- Controlled by application logic
