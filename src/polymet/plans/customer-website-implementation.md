# Customer Website Implementation Plan

## User Request
Create a customer-facing website for TMPL Escapade that matches the design from the reference images, starting with the homepage featuring:
1. Top hero banner with available location cards overlay
2. Continent category carousel section
3. Gallery section with clickable image preview
4. Customer review carousel
5. Footer section with company info and links

## Related Files
- @/polymet/layouts/customer-layout (to create) - Main layout for customer website
- @/polymet/pages/customer-home (to create) - Homepage with all sections
- @/polymet/components/hero-banner-with-locations (to create) - Hero section with floating location cards
- @/polymet/components/continent-carousel (to create) - Continent selection carousel
- @/polymet/components/gallery-grid (to create) - Gallery with lightbox preview
- @/polymet/components/customer-review-carousel (to create) - Review testimonials carousel
- @/polymet/components/customer-footer (to create) - Footer with links and info
- @/polymet/components/customer-navigation (to create) - Top navigation bar
- @/polymet/prototypes/customer-website (to create) - New prototype for customer site
- @/polymet/data/customer-data (to create) - Mock data for locations, reviews, gallery

## TODO List
- [x] Analyze design details from reference images
- [x] Create customer data file with locations, continents, gallery images, reviews
- [x] Create customer navigation component (transparent overlay on hero)
- [x] Create hero banner with locations component (Patagonia background + floating cards)
- [x] Create continent carousel component (Europe, America, South America, Asia, Africa)
- [x] Create gallery grid component with lightbox/modal preview
- [x] Create customer review carousel component
- [x] Create customer footer component (yellow background, links, payment methods)
- [x] Create customer layout (navigation + content + footer)
- [x] Create customer home page (compose all sections)
- [x] Create customer website prototype (separate from admin)
- [x] Use AI-generated travel images for realistic look and feel

## Important Notes

### Design Analysis from Reference Images:

**1. Hero Banner Section:**
- Full-screen background image (Patagonia mountains and lake)
- Semi-transparent blue overlay on top navigation bar
- Left side: Large "Patagonia" heading with subtitle text
- Yellow circular home icon button + "Discover Location" button
- Right side: 5 floating location cards in scattered/organic layout:
  - Cards have rounded corners with travel destination images
  - Text overlay: Region name + "DISCOVER" + Country names
  - Cards: Peru/Bolivia/Chile, Kyrgyzstan, Finland/Sweden/Norway, Kenya/Tanzania, Chile/Argentina
- Navigation carousel dots at bottom right (indicating multiple hero slides)

**2. Continent Carousel Section:**
- White background
- Heading: "Choose Your Travel Location"
- Subtitle: "Embark on a journey where every choice blossoms into unforgettable memories..."
- 5 large pill-shaped/oval cards with images:
  - EUROPE (Eiffel Tower at night)
  - AMERICA (Statue of Liberty)
  - SOUTH AMERICA (Desert/mountain sunset)
  - ASIA (Japanese torii gate)
  - AFRICA (Hot air balloon safari)
- Cards are horizontally scrollable/carousel

**3. Gallery Section:**
- Teal/turquoise blue background
- Heading: "Gallery" with descriptive text
- "See More" button (yellow/gold) in top right
- Masonry/Pinterest-style grid layout with varying sizes:
  - Large vertical image (train)
  - Medium images (market, sunset group photo)
  - Small images (inside vehicle)
  - Large horizontal images (group photos at scenic locations)
- Real travel photos showing groups of tourists

**4. Customer Review Section:**
- White background
- Heading: "Customer Review"
- Subtitle about member stories and unforgettable adventures
- Carousel with 3 visible review cards:
  - Each card has customer photo at top
  - Customer name and rating stars below
  - Review text/testimonial
  - Navigation arrows on sides
  - Dot indicators at bottom

**5. Footer Section:**
- Bright yellow/gold background (#F4D03F or similar)
- Newsletter signup section at top
- Three columns:
  - About (company info, address)
  - About Us (links to pages)
  - Working Hours (business hours, contact info)
- Payment method logos (Visa, Mastercard, etc.)
- Social media icons
- Black bar at very bottom with cookie notice

### Technical Approach:
- Use AI-generated images for travel destinations to get realistic look
- Implement smooth carousels with navigation
- Create lightbox/modal for gallery image preview
- Responsive design for mobile/tablet/desktop
- Separate prototype from admin dashboard
- Use existing package data from admin for location cards
- **Hero slides**: Each slide features different destination with 5 featured location cards overlay
- Featured locations are packages marked as featured in admin dashboard
- Customer website is completely separate from admin (new prototype)

  
## Plan Information
*This plan is created when the project is at iteration 62, and date 2025-10-14T04:15:01.743Z*
