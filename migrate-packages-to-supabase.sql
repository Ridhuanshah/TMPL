-- ================================================================
-- TMPL ESCAPADE - MIGRATE PACKAGE MOCK DATA TO SUPABASE
-- ================================================================
-- Date: November 2, 2025
-- Packages: 4 complete packages with all relationships
-- Run this in Supabase SQL Editor
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clear existing data (CAREFUL: This deletes all package data!)
TRUNCATE TABLE essential_items CASCADE;
TRUNCATE TABLE travel_tips CASCADE;
TRUNCATE TABLE package_images CASCADE;
TRUNCATE TABLE daily_itinerary CASCADE;
TRUNCATE TABLE package_departure_dates CASCADE;
TRUNCATE TABLE packages CASCADE;

-- ================================================================
-- PACKAGE 1: HIMALAYAN BASE CAMP TREK
-- ================================================================

INSERT INTO packages (id, name, slug, description, continent, country, region, category, difficulty, base_price, currency, duration_days, duration_nights, min_group_size, max_group_size, status, highlights, inclusions, exclusions, hero_image, gallery_images, pdf_itinerary_url, total_bookings, total_revenue, average_rating, total_reviews, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'Himalayan Base Camp Trek', 'himalayan-base-camp-trek', 
  'Experience the ultimate adventure with our 14-day trek to Everest Base Camp. Journey through stunning landscapes, Sherpa villages, and witness the world''s highest peak up close.',
  'Asia', 'Nepal', 'Himalayas', 'Trekking', 'challenging', 4500.00, 'RM', 14, 13, 6, 12, 'active',
  ARRAY['Everest Base Camp at 5,364m altitude', 'Sherpa culture immersion', 'Himalayan mountain panoramas', 'Professional certified guide', 'Sagarmatha National Park', 'Tengboche Monastery'],
  ARRAY['Professional certified trekking guide', 'Tea house accommodation', 'All meals during trek', 'National park permits', 'Kathmandu transfers', 'Emergency oxygen', 'Porter services', 'Domestic flights'],
  ARRAY['International flights', 'Personal gear', 'Travel insurance', 'Personal expenses', 'Tips', 'Helicopter evacuation', 'Beverages', 'Extra Kathmandu nights'],
  'https://picsum.photos/seed/himalaya-hero/1200/800',
  ARRAY['https://picsum.photos/seed/himalaya-1/800/600', 'https://picsum.photos/seed/himalaya-2/800/600', 'https://picsum.photos/seed/himalaya-3/800/600', 'https://picsum.photos/seed/himalaya-4/800/600'],
  '/sample-itinerary.pdf', 89, 445000.00, 4.8, 67, '2024-01-15', '2024-02-10');

-- Itinerary PKG 1
INSERT INTO daily_itinerary (package_id, day_number, title, description, activities, location_from, location_to, is_optional, optional_price) VALUES
('00000000-0000-0000-0000-000000000001'::uuid, 1, 'Arrival in Kathmandu', 'Airport arrival, hotel transfer, trek briefing', ARRAY['Airport pickup', 'Hotel check-in', 'Trek briefing', 'Equipment check'], 'Airport', 'Kathmandu Hotel', false, NULL),
('00000000-0000-0000-0000-000000000001'::uuid, 2, 'Fly to Lukla, Trek to Phakding', 'Flight to Lukla, begin trek to Phakding', ARRAY['Domestic flight', 'Trek start', 'Village exploration'], 'Kathmandu', 'Phakding (2,610m)', false, NULL),
('00000000-0000-0000-0000-000000000001'::uuid, 3, 'Phakding to Namche Bazaar', 'Trek through forests, suspension bridges to Namche', ARRAY['Bridge crossing', 'Forest trek', 'Market visit'], 'Phakding', 'Namche Bazaar (3,440m)', false, NULL),
('00000000-0000-0000-0000-000000000001'::uuid, 4, 'Acclimatization in Namche', 'Rest day, optional hike to Everest View Hotel', ARRAY['Acclimatization', 'Museum visit', 'Market', 'Views'], 'Namche', 'Namche', true, 150.00);

-- Tips PKG 1
INSERT INTO travel_tips (package_id, title, description, category, display_order) VALUES
('00000000-0000-0000-0000-000000000001'::uuid, 'Altitude Acclimatization', 'Ascend slowly, drink water, avoid alcohol', 'Health', 1),
('00000000-0000-0000-0000-000000000001'::uuid, 'Physical Preparation', 'Train 2-3 months before, focus on cardio', 'Preparation', 2),
('00000000-0000-0000-0000-000000000001'::uuid, 'Weather', 'Carry layers, prepare for cold nights', 'Safety', 3),
('00000000-0000-0000-0000-000000000001'::uuid, 'Cultural Respect', 'Respect customs, ask before photographing', 'Cultural', 4);

-- Essential Items PKG 1
INSERT INTO essential_items (package_id, item_name, category, is_mandatory) VALUES
('00000000-0000-0000-0000-000000000001'::uuid, 'Trekking boots (broken in)', 'Footwear', true),
('00000000-0000-0000-0000-000000000001'::uuid, 'Sleeping bag (-15°C)', 'Camping', true),
('00000000-0000-0000-0000-000000000001'::uuid, 'Layered clothing system', 'Clothing', true),
('00000000-0000-0000-0000-000000000001'::uuid, 'Sunglasses and sunscreen', 'Protection', true),
('00000000-0000-0000-0000-000000000001'::uuid, 'Water purification', 'Health', true),
('00000000-0000-0000-0000-000000000001'::uuid, 'First aid kit', 'Health', true),
('00000000-0000-0000-0000-000000000001'::uuid, 'Headlamp with batteries', 'Equipment', true),
('00000000-0000-0000-0000-000000000001'::uuid, 'Trekking poles', 'Equipment', false);

-- Departure Dates PKG 1 (available is auto-calculated: capacity - booked)
INSERT INTO package_departure_dates (package_id, start_date, end_date, capacity, booked, status, price_override, trip_code) VALUES
('00000000-0000-0000-0000-000000000001'::uuid, '2024-04-15', '2024-04-28', 12, 8, 'active', 4500.00, 'EBC-APR-001'),
('00000000-0000-0000-0000-000000000001'::uuid, '2024-05-20', '2024-06-02', 12, 10, 'active', 4500.00, 'EBC-MAY-002'),
('00000000-0000-0000-0000-000000000001'::uuid, '2024-09-15', '2024-09-28', 12, 6, 'active', 4500.00, 'EBC-SEP-003'),
('00000000-0000-0000-0000-000000000001'::uuid, '2024-10-20', '2024-11-02', 12, 4, 'active', 4500.00, 'EBC-OCT-004');

-- ================================================================
-- PACKAGE 2: AFRICAN SAFARI ADVENTURE  
-- ================================================================

INSERT INTO packages (id, name, slug, description, continent, country, region, category, difficulty, base_price, currency, duration_days, duration_nights, min_group_size, max_group_size, status, highlights, inclusions, exclusions, hero_image, gallery_images, total_bookings, total_revenue, average_rating, total_reviews, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000002'::uuid, 'African Safari Adventure', 'african-safari-adventure',
  'Unforgettable 10-day safari across Kenya and Tanzania. Witness the Great Migration, Big Five animals, and experience authentic African culture.',
  'Africa', 'Kenya/Tanzania', 'East Africa', 'Safari', 'easy', 6200.00, 'RM', 10, 9, 4, 8, 'active',
  ARRAY['Great Migration in Masai Mara', 'Big Five spotting', 'Luxury lodges', 'Masai village visits', 'Ngorongoro Crater', 'Photography guidance'],
  ARRAY['Luxury lodge accommodation', 'All meals', 'Safari guide', 'Game drives', 'Airport transfers', 'Park fees', 'Cultural visit', 'Photography tips'],
  ARRAY['International flights', 'Visa fees', 'Travel insurance', 'Personal expenses', 'Alcoholic drinks', 'Hot air balloon', 'Tips', 'Laundry'],
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
  ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400', 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400'],
  76, 380000.00, 4.9, 54, '2024-01-20', '2024-02-05');

-- Itinerary PKG 2
INSERT INTO daily_itinerary (package_id, day_number, title, description, activities, location_from, location_to, is_optional, optional_price) VALUES
('00000000-0000-0000-0000-000000000002'::uuid, 1, 'Arrival in Nairobi', 'Airport arrival, hotel transfer, welcome dinner', ARRAY['Airport pickup', 'Check-in', 'Welcome dinner', 'Briefing'], 'Airport', 'Nairobi Hotel', false, NULL),
('00000000-0000-0000-0000-000000000002'::uuid, 2, 'Nairobi to Masai Mara', 'Morning departure, afternoon game drive', ARRAY['Scenic drive', 'Game drive', 'Wildlife photography'], 'Nairobi', 'Masai Mara Lodge', false, NULL),
('00000000-0000-0000-0000-000000000002'::uuid, 3, 'Full Day Masai Mara', 'Full day safari with village visit', ARRAY['Morning drive', 'Village visit', 'Traditional lunch', 'Afternoon drive'], 'Lodge', 'Lodge', false, NULL),
('00000000-0000-0000-0000-000000000002'::uuid, 4, 'Hot Air Balloon (Optional)', 'Optional balloon safari over Mara plains', ARRAY['Balloon ride', 'Aerial photos', 'Champagne breakfast', 'Game drive'], 'Lodge', 'Lodge', true, 450.00);

-- Tips PKG 2  
INSERT INTO travel_tips (package_id, title, description, category, display_order) VALUES
('00000000-0000-0000-0000-000000000002'::uuid, 'Best Viewing Times', 'Early morning and late afternoon for wildlife', 'Wildlife', 1),
('00000000-0000-0000-0000-000000000002'::uuid, 'Photography Equipment', 'Telephoto lens 200-400mm recommended', 'Photography', 2),
('00000000-0000-0000-0000-000000000002'::uuid, 'Clothing', 'Neutral colors, avoid bright clothing', 'Packing', 3),
('00000000-0000-0000-0000-000000000002'::uuid, 'Health', 'Malaria prophylaxis 4-6 weeks before', 'Health', 4);

-- Essential Items PKG 2
INSERT INTO essential_items (package_id, item_name, category, is_mandatory) VALUES
('00000000-0000-0000-0000-000000000002'::uuid, 'Binoculars 8x32 or 10x42', 'Equipment', true),
('00000000-0000-0000-0000-000000000002'::uuid, 'Camera with telephoto lens', 'Photography', true),
('00000000-0000-0000-0000-000000000002'::uuid, 'Neutral safari clothing', 'Clothing', true),
('00000000-0000-0000-0000-000000000002'::uuid, 'Hat and sunscreen SPF 50+', 'Protection', true),
('00000000-0000-0000-0000-000000000002'::uuid, 'Insect repellent DEET', 'Health', true),
('00000000-0000-0000-0000-000000000002'::uuid, 'Walking shoes and sandals', 'Footwear', true),
('00000000-0000-0000-0000-000000000002'::uuid, 'Light jacket', 'Clothing', false),
('00000000-0000-0000-0000-000000000002'::uuid, 'Personal first aid', 'Health', true);

-- Departure Dates PKG 2 (available is auto-calculated: capacity - booked)
INSERT INTO package_departure_dates (package_id, start_date, end_date, capacity, booked, status, price_override, trip_code) VALUES
('00000000-0000-0000-0000-000000000002'::uuid, '2024-07-15', '2024-07-24', 8, 6, 'active', 6200.00, 'SAF-JUL-001'),
('00000000-0000-0000-0000-000000000002'::uuid, '2024-08-20', '2024-08-29', 8, 8, 'full', 6200.00, 'SAF-AUG-002'),
('00000000-0000-0000-0000-000000000002'::uuid, '2024-09-25', '2024-10-04', 8, 4, 'active', 6200.00, 'SAF-SEP-003'),
('00000000-0000-0000-0000-000000000002'::uuid, '2024-11-10', '2024-11-19', 8, 2, 'active', 6200.00, 'SAF-NOV-004');

-- ================================================================
-- PACKAGE 3: ANTARCTIC EXPEDITION CRUISE
-- ================================================================

INSERT INTO packages (id, name, slug, description, continent, country, region, category, difficulty, base_price, currency, duration_days, duration_nights, min_group_size, max_group_size, status, highlights, inclusions, exclusions, hero_image, gallery_images, pdf_itinerary_url, total_bookings, total_revenue, average_rating, total_reviews, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000003'::uuid, 'Antarctic Expedition Cruise', 'antarctic-expedition-cruise',
  'Exclusive 12-day expedition to Antarctica. Experience pristine wilderness, incredible wildlife, and the most remote continent on Earth.',
  'Antarctica', 'Antarctica', 'Antarctic Peninsula', 'Expedition', 'moderate', 15000.00, 'RM', 12, 11, 20, 100, 'active',
  ARRAY['Penguin colonies', 'Zodiac excursions', 'Expert guides', 'Luxury expedition ship', 'Drake Passage', 'Educational lectures'],
  ARRAY['Luxury ship accommodation', 'Gourmet meals', 'Expert guides', 'Zodiac excursions', 'Lecture program', 'Expedition jacket', 'Shore excursions', 'Photography workshops'],
  ARRAY['International flights', 'Pre/post accommodation', 'Travel insurance', 'Personal expenses', 'Gratuities', 'Optional kayaking', 'Premium beverages', 'Satellite charges'],
  'https://picsum.photos/seed/antarctica-hero/1200/800',
  ARRAY['https://picsum.photos/seed/antarctica-1/800/600', 'https://picsum.photos/seed/antarctica-2/800/600', 'https://picsum.photos/seed/antarctica-3/800/600'],
  '/sample-itinerary.pdf', 45, 675000.00, 4.7, 32, '2024-01-10', '2024-02-15');

-- Itinerary PKG 3
INSERT INTO daily_itinerary (package_id, day_number, title, description, activities, location_from, location_to, is_optional, optional_price) VALUES
('00000000-0000-0000-0000-000000000003'::uuid, 1, 'Embarkation in Ushuaia', 'Board ship, meet expedition team', ARRAY['Boarding', 'Orientation', 'Welcome reception', 'Briefing'], 'Ushuaia Port', 'Ship', false, NULL),
('00000000-0000-0000-0000-000000000003'::uuid, 2, 'Drake Passage Crossing', 'Cross Drake Passage, wildlife lectures', ARRAY['Drake crossing', 'Lectures', 'Ship tour', 'Workshop'], 'Beagle Channel', 'Drake Passage', false, NULL),
('00000000-0000-0000-0000-000000000003'::uuid, 3, 'First Antarctic Landing', 'First steps on Antarctica, penguin colonies', ARRAY['Zodiac landing', 'Penguin observation', 'Ice study', 'Photography'], 'Ship', 'Antarctic Peninsula', false, NULL),
('00000000-0000-0000-0000-000000000003'::uuid, 4, 'Kayaking (Optional)', 'Sea kayaking among icebergs', ARRAY['Kayaking', 'Iceberg navigation', 'Wildlife encounters'], 'Ship', 'Antarctic Waters', true, 800.00);

-- Tips PKG 3
INSERT INTO travel_tips (package_id, title, description, category, display_order) VALUES
('00000000-0000-0000-0000-000000000003'::uuid, 'Layered Clothing', 'Pack thermal layers, fleece, waterproof shell', 'Packing', 1),
('00000000-0000-0000-0000-000000000003'::uuid, 'Motion Sickness', 'Drake Passage can be rough, bring medication', 'Health', 2),
('00000000-0000-0000-0000-000000000003'::uuid, 'Cold Photography', 'Extra batteries drain quickly in cold', 'Photography', 3),
('00000000-0000-0000-0000-000000000003'::uuid, 'Environmental', 'Follow Antarctic Treaty guidelines strictly', 'Environmental', 4);

-- Essential Items PKG 3
INSERT INTO essential_items (package_id, item_name, category, is_mandatory) VALUES
('00000000-0000-0000-0000-000000000003'::uuid, 'Waterproof shell jacket', 'Clothing', true),
('00000000-0000-0000-0000-000000000003'::uuid, 'Insulated waterproof gloves', 'Clothing', true),
('00000000-0000-0000-0000-000000000003'::uuid, 'Warm hat and sun hat', 'Clothing', true),
('00000000-0000-0000-0000-000000000003'::uuid, 'Sunscreen SPF 50+ and sunglasses', 'Protection', true),
('00000000-0000-0000-0000-000000000003'::uuid, 'Motion sickness medication', 'Health', true),
('00000000-0000-0000-0000-000000000003'::uuid, 'Camera and extra batteries', 'Photography', true),
('00000000-0000-0000-0000-000000000003'::uuid, 'Thermal underwear', 'Clothing', true),
('00000000-0000-0000-0000-000000000003'::uuid, 'Waterproof day pack', 'Equipment', true);

-- Departure Dates PKG 3 (available is auto-calculated: capacity - booked)
INSERT INTO package_departure_dates (package_id, start_date, end_date, capacity, booked, status, price_override, trip_code) VALUES
('00000000-0000-0000-0000-000000000003'::uuid, '2024-12-15', '2024-12-26', 100, 85, 'active', 15000.00, 'ANT-DEC-001'),
('00000000-0000-0000-0000-000000000003'::uuid, '2025-01-20', '2025-01-31', 100, 60, 'active', 15000.00, 'ANT-JAN-002'),
('00000000-0000-0000-0000-000000000003'::uuid, '2025-02-25', '2025-03-08', 100, 35, 'active', 15000.00, 'ANT-FEB-003');

-- ================================================================
-- PACKAGE 4: AMAZON RAINFOREST EXPLORER
-- ================================================================

INSERT INTO packages (id, name, slug, description, continent, country, region, category, difficulty, base_price, currency, duration_days, duration_nights, min_group_size, max_group_size, status, highlights, inclusions, exclusions, hero_image, gallery_images, total_bookings, total_revenue, average_rating, total_reviews, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000004'::uuid, 'Amazon Rainforest Explorer', 'amazon-rainforest-explorer',
  'Discover the incredible biodiversity of the Amazon in this 8-day eco-adventure. Sustainable eco-lodges with indigenous guides.',
  'South America', 'Peru', 'Amazon Basin', 'Eco-Adventure', 'moderate', 3800.00, 'RM', 8, 7, 6, 14, 'active',
  ARRAY['Indigenous Shipibo community', 'Biodiversity 3000+ species', 'Eco-lodge on stilts', 'River boat excursions', 'Night jungle walks', 'Plant medicine ceremonies'],
  ARRAY['Eco-lodge accommodation', 'Organic meals', 'Indigenous guide', 'Boat excursions', 'Wildlife activities', 'Airport transfers', 'Cultural workshops', 'Rubber boots and rain gear'],
  ARRAY['International flights', 'Travel insurance', 'Personal expenses', 'Alcoholic drinks', 'Tips', 'Ayahuasca ceremony', 'Laundry', 'Yellow fever vaccination'],
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
  67, 268000.00, 4.6, 48, '2024-01-25', '2024-02-08');

-- Itinerary PKG 4
INSERT INTO daily_itinerary (package_id, day_number, title, description, activities, location_from, location_to, is_optional, optional_price) VALUES
('00000000-0000-0000-0000-000000000004'::uuid, 1, 'Arrival in Iquitos', 'Gateway to Peruvian Amazon, canoe transfer', ARRAY['Airport pickup', 'Canoe transfer', 'Lodge orientation', 'Welcome dinner'], 'Iquitos Airport', 'Amazon Eco-Lodge', false, NULL),
('00000000-0000-0000-0000-000000000004'::uuid, 2, 'Amazon River Exploration', 'Full day river exploration, pink dolphins', ARRAY['Boat excursion', 'Dolphin spotting', 'Bird watching', 'Fishing'], 'Eco-Lodge', 'Amazon River', false, NULL),
('00000000-0000-0000-0000-000000000004'::uuid, 3, 'Indigenous Community', 'Visit Shipibo community, traditional crafts', ARRAY['Community visit', 'Traditional crafts', 'Medicinal plants', 'Cultural exchange'], 'Eco-Lodge', 'Shipibo Village', false, NULL),
('00000000-0000-0000-0000-000000000004'::uuid, 4, 'Night Jungle Walk (Optional)', 'Guided night walk, nocturnal wildlife', ARRAY['Night walk', 'Wildlife spotting', 'Insects', 'Jungle sounds'], 'Eco-Lodge', 'Amazon Jungle', true, 120.00);

-- Tips PKG 4
INSERT INTO travel_tips (package_id, title, description, category, display_order) VALUES
('00000000-0000-0000-0000-000000000004'::uuid, 'Yellow Fever', 'Vaccination required 10 days before travel', 'Health', 1),
('00000000-0000-0000-0000-000000000004'::uuid, 'Jungle Clothing', 'Light breathable long sleeves, neutral colors', 'Packing', 2),
('00000000-0000-0000-0000-000000000004'::uuid, 'Wildlife Viewing', 'Move slowly and quietly, best at dawn/dusk', 'Wildlife', 3),
('00000000-0000-0000-0000-000000000004'::uuid, 'River Safety', 'Always wear life jackets during boat trips', 'Safety', 4);

-- Essential Items PKG 4
INSERT INTO essential_items (package_id, item_name, category, is_mandatory) VALUES
('00000000-0000-0000-0000-000000000004'::uuid, 'Yellow fever vaccination certificate', 'Documents', true),
('00000000-0000-0000-0000-000000000004'::uuid, 'Lightweight long-sleeved clothing', 'Clothing', true),
('00000000-0000-0000-0000-000000000004'::uuid, 'Strong insect repellent 30%+ DEET', 'Health', true),
('00000000-0000-0000-0000-000000000004'::uuid, 'Rain jacket and waterproof pants', 'Clothing', true),
('00000000-0000-0000-0000-000000000004'::uuid, 'Binoculars for wildlife', 'Equipment', true),
('00000000-0000-0000-0000-000000000004'::uuid, 'Water bottle with purification', 'Health', true),
('00000000-0000-0000-0000-000000000004'::uuid, 'Headlamp with red light', 'Equipment', true),
('00000000-0000-0000-0000-000000000004'::uuid, 'Quick-dry towel', 'Personal', false);

-- Departure Dates PKG 4 (available is auto-calculated: capacity - booked)
INSERT INTO package_departure_dates (package_id, start_date, end_date, capacity, booked, status, price_override, trip_code) VALUES
('00000000-0000-0000-0000-000000000004'::uuid, '2024-05-10', '2024-05-17', 14, 12, 'active', 3800.00, 'AMZ-MAY-001'),
('00000000-0000-0000-0000-000000000004'::uuid, '2024-06-15', '2024-06-22', 14, 8, 'active', 3800.00, 'AMZ-JUN-002'),
('00000000-0000-0000-0000-000000000004'::uuid, '2024-08-05', '2024-08-12', 14, 6, 'active', 3800.00, 'AMZ-AUG-003'),
('00000000-0000-0000-0000-000000000004'::uuid, '2024-09-20', '2024-09-27', 14, 3, 'active', 3800.00, 'AMZ-SEP-004');

-- ================================================================
-- ENABLE RLS AND CREATE POLICIES
-- ================================================================

-- Enable RLS on all package-related tables
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_itinerary ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE essential_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_departure_dates ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for customer browsing)
CREATE POLICY "Allow public read access to active packages"
  ON packages FOR SELECT
  USING (status = 'active');

CREATE POLICY "Allow public read access to daily itinerary"
  ON daily_itinerary FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to travel tips"
  ON travel_tips FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to essential items"
  ON essential_items FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to departure dates"
  ON package_departure_dates FOR SELECT
  USING (status IN ('active', 'full'));

-- Allow authenticated users with admin roles to manage packages
CREATE POLICY "Allow admin full access to packages"
  ON packages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('super_admin', 'admin', 'sales_marketing')
    )
  );

-- ================================================================
-- VERIFICATION QUERIES
-- ================================================================

-- Count packages
SELECT COUNT(*) as total_packages FROM packages;

-- List all packages with booking stats
SELECT 
  name, 
  continent, 
  country, 
  base_price, 
  total_bookings,
  average_rating,
  status
FROM packages
ORDER BY created_at;

-- Count related records
SELECT 
  (SELECT COUNT(*) FROM packages) as packages_count,
  (SELECT COUNT(*) FROM daily_itinerary) as itinerary_items,
  (SELECT COUNT(*) FROM travel_tips) as travel_tips,
  (SELECT COUNT(*) FROM essential_items) as essential_items,
  (SELECT COUNT(*) FROM package_departure_dates) as departure_dates;

-- ================================================================
-- MIGRATION COMPLETE! ✅
-- ================================================================
-- Next Step: Update package-management.tsx to fetch from Supabase
-- ================================================================
