-- ============================================================================
-- DIRECT BOOKING SYSTEM - PART 4: FUNCTIONS & TRIGGERS
-- Version: 1.0.0
-- Created: Nov 3, 2025
-- ============================================================================

-- Generate unique booking number: PKG###-YYYY-MMM-###
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
  v_year := EXTRACT(YEAR FROM p_departure_date);
  v_month := TO_CHAR(p_departure_date, 'MON');
  
  -- Extract package number (last 3 digits)
  v_pkg_num := REGEXP_REPLACE(p_package_id, '\D', '', 'g');
  IF LENGTH(v_pkg_num) = 0 THEN
    v_pkg_num := '000';
  ELSE
    v_pkg_num := LPAD(v_pkg_num::INTEGER::TEXT, 3, '0');
    v_pkg_num := RIGHT(v_pkg_num, 3);
  END IF;
  
  -- Get and increment sequence
  INSERT INTO booking_sequences (year, month, package_prefix, last_number)
  VALUES (v_year, v_month, v_pkg_num, 1)
  ON CONFLICT (year, month, package_prefix)
  DO UPDATE SET last_number = booking_sequences.last_number + 1
  RETURNING last_number INTO v_seq_num;
  
  -- Format: PKG###-YYYY-MMM-###
  v_booking_number := 'PKG' || v_pkg_num || '-' || v_year || '-' || v_month || '-' || LPAD(v_seq_num::TEXT, 3, '0');
  
  RETURN v_booking_number;
END;
$$ LANGUAGE plpgsql;

-- Calculate deposit: <RM10k=RM500, ≥RM10k=RM1000
CREATE OR REPLACE FUNCTION calculate_deposit_amount(p_total_amount NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
  IF p_total_amount < 10000 THEN
    RETURN 500;
  ELSE
    RETURN 1000;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Calculate installment count: <10k=3, 10-30k=4, >30k=6
CREATE OR REPLACE FUNCTION calculate_installment_count(p_total_amount NUMERIC)
RETURNS INTEGER AS $$
BEGIN
  IF p_total_amount < 10000 THEN
    RETURN 3;
  ELSIF p_total_amount <= 30000 THEN
    RETURN 4;
  ELSE
    RETURN 6;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_travelers_updated_at 
  BEFORE UPDATE ON booking_travelers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addons_updated_at 
  BEFORE UPDATE ON package_addons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at 
  BEFORE UPDATE ON booking_payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_installment_plans_updated_at 
  BEFORE UPDATE ON installment_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
