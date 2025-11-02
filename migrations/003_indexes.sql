-- ============================================================================
-- DIRECT BOOKING SYSTEM - PART 3: INDEXES FOR PERFORMANCE
-- Version: 1.0.0
-- Created: Nov 3, 2025
-- ============================================================================

-- Booking travelers indexes
CREATE INDEX IF NOT EXISTS idx_travelers_booking ON booking_travelers(booking_id);
CREATE INDEX IF NOT EXISTS idx_travelers_email ON booking_travelers(email);
CREATE INDEX IF NOT EXISTS idx_travelers_lead ON booking_travelers(is_lead_traveler);

-- Package add-ons indexes
CREATE INDEX IF NOT EXISTS idx_addons_package ON package_addons(package_id);
CREATE INDEX IF NOT EXISTS idx_addons_active ON package_addons(is_active);
CREATE INDEX IF NOT EXISTS idx_addons_category ON package_addons(category);

-- Booking add-ons indexes
CREATE INDEX IF NOT EXISTS idx_booking_addons_booking ON booking_addons(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_addons_type ON booking_addons(addon_type);

-- Booking payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_booking ON booking_payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON booking_payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_due_date ON booking_payments(due_date);
CREATE INDEX IF NOT EXISTS idx_payments_type ON booking_payments(payment_type);

-- Installment indexes
CREATE INDEX IF NOT EXISTS idx_installments_plan ON installment_schedule(plan_id);
CREATE INDEX IF NOT EXISTS idx_installments_status ON installment_schedule(status);
CREATE INDEX IF NOT EXISTS idx_installments_due_date ON installment_schedule(due_date);

-- Coupon usage indexes
CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon ON coupon_usage(coupon_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_booking ON coupon_usage(booking_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_user ON coupon_usage(user_id);

-- Notification indexes
CREATE INDEX IF NOT EXISTS idx_notifications_booking ON booking_notifications(booking_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON booking_notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON booking_notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_notifications_sent_at ON booking_notifications(sent_at);

-- Admin notification indexes
CREATE INDEX IF NOT EXISTS idx_admin_notif_read ON admin_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_admin_notif_type ON admin_notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_admin_notif_priority ON admin_notifications(priority);
CREATE INDEX IF NOT EXISTS idx_admin_notif_created ON admin_notifications(created_at DESC);

-- Bookings table new indexes
CREATE INDEX IF NOT EXISTS idx_bookings_number ON bookings(booking_number);
CREATE INDEX IF NOT EXISTS idx_bookings_departure_date ON bookings(departure_date_id);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_plan ON bookings(payment_plan);
CREATE INDEX IF NOT EXISTS idx_bookings_balance_due ON bookings(balance_due_date) WHERE payment_status IN ('pending', 'partial');
CREATE INDEX IF NOT EXISTS idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX IF NOT EXISTS idx_bookings_package_departure ON bookings(package_id, departure_date_id);
