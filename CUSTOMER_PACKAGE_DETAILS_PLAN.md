# Customer Package Details Page - Implementation Plan

**Reference:** https://tmplescapade.my/dailyitinerary-copy  
**Screenshot:** package-details.png  
**Created:** October 20, 2025

---

## 📋 Design Analysis from Reference

### Hero Section (Top Banner)
- **Background:** Full-width mountain/landscape image
- **Title:** Large white text "Peru, Bolivia & Chile" centered
- **Subtitle:** Small text below title
- **Floating Image Cards:** 4-5 image cards scattered/floating over the hero
  - Rounded corners
  - Different sizes (vertical and horizontal orientations)
  - Images show destination highlights
  - Stacked/overlapping effect

### Main Content Section
1. **Package Card (Centered)**
   - White card with shadow
   - "SOUTH AMERICA" heading
   - Large pricing badge (yellow): "RM10,500"
   - Trip duration and dates
   - Featured image of destination
   - "Book Package" CTA button (yellow)
   - "Read More" link

2. **Intro Section**
   - Brief description paragraph
   - Gallery carousel with 3-4 images
   - Navigation arrows (< >)

3. **Want to Make a Booking Section**
   - Dark background
   - "WANT TO MAKE A BOOKING" heading
   - Contact information (Name, Email, WhatsApp)
   - "Get A Quote" button (yellow)

4. **Social Sharing Icons**
   - Row of social media icons
   - Facebook, WhatsApp, Email, Copy link, etc.

5. **Highlighted Info Tags**
   - Colored tags showing: "3D+/2N", "10KM", "8K"
   - Represent duration, distance, elevation

### Footer
- Yellow/gold background
- Newsletter signup
- Company information
- Links columns
- Payment method logos
- Social media icons

---

## 🎨 Key Design Elements

### Colors
- **Primary:** Yellow/Gold (#FFC715 or similar)
- **Dark:** Black/Dark gray for text
- **Background:** White for content cards
- **Accent:** Various colors for badges

### Typography
- **Headings:** Large, bold, sans-serif
- **Body:** Regular weight, readable
- **Accent Text:** Sometimes in color for emphasis

### Layout
- **Centered content** with max-width container
- **Card-based design** with shadows
- **Generous whitespace**
- **Responsive grid** for images

---

## 🏗️ Component Structure

```
CustomerPackageDetailsPage
├── HeroSectionWithFloatingImages
│   ├── Background hero image
│   ├── Package title overlay
│   └── Floating image gallery cards
├── PackageSummaryCard
│   ├── Continent badge
│   ├── Pricing (large yellow badge)
│   ├── Duration and dates
│   ├── Featured image
│   ├── Book Package CTA
│   └── Read More link
├── PackageIntroduction
│   ├── Description paragraph
│   └── Image carousel (3-4 images)
├── DailyItinerarySection
│   ├── Day-by-day breakdown
│   ├── Activities per day
│   └── Locations
├── InclusionsExclusionsSection
│   ├── What's included (checkmarks)
│   └── What's not included (X marks)
├── TravelTipsSection
│   └── Important information
├── EssentialItemsSection
│   └── Packing list
├── BookingCallToAction
│   ├── Dark background
│   ├── Contact information
│   ├── WhatsApp/Email buttons
│   └── "Get A Quote" CTA
└── SocialSharingBar
    └── Social media share buttons
```

---

## 📊 Data Structure Needed

All data already exists in `package-data.ts`:
- ✅ Package name, description
- ✅ Images (hero + gallery)
- ✅ Pricing
- ✅ Duration
- ✅ Daily itinerary (already structured!)
- ✅ Inclusions/Exclusions
- ✅ Travel tips
- ✅ Essential items
- ✅ Continent, country

---

## 🔗 Routing Updates Needed

### New Route (Customer-Facing)
```tsx
<Route
  path="/packages/:id"
  element={
    <CustomerLayout>
      <CustomerPackageDetails />
    </CustomerLayout>
  }
/>
```

### Link from Homepage
Update hero location cards to link to:
```
/packages/pkg_001  (for Peru, Bolivia & Chile)
/packages/pkg_002  (for African Safari)
etc.
```

---

## 🎯 Key Features to Implement

### 1. Hero Section with Floating Images ⭐
- Full-width background image
- Centered title with semi-transparent overlay
- 4-5 floating image cards with:
  - Random positioning (pre-defined positions)
  - Different sizes
  - Hover effects (scale/shadow)
  - Rounded corners

### 2. Package Summary Card
- Prominent pricing display (large yellow badge)
- Trip duration prominently shown
- High-quality featured image
- Clear CTA button
- Continental badge/tag

### 3. Image Carousel
- Smooth horizontal scrolling
- Navigation arrows
- Dots indicator
- Auto-play (optional)

### 4. Daily Itinerary
- Expandable/collapsible day sections
- Day number badge
- Activity list per day
- Location information
- Optional activities marked clearly

### 5. Booking CTA Section
- Eye-catching design (dark background)
- Multiple contact methods
- WhatsApp click-to-chat integration
- Email mailto: link
- Quote request button

### 6. Social Sharing
- Share to Facebook, WhatsApp, Twitter
- Copy link to clipboard
- Email share
- Icons with hover effects

### 7. Responsive Design
- Mobile: Stacked layout
- Tablet: 2-column where appropriate
- Desktop: Full layout with sidebars

---

## 🎨 Styling Guidelines

### Spacing
- Section padding: `py-12` or `py-16`
- Card padding: `p-6` or `p-8`
- Element gaps: `gap-4`, `gap-6`, `gap-8`

### Colors to Use
```css
Primary Yellow: #FFC715 or bg-yellow-400
Dark Background: bg-gray-900 or bg-black
Light Background: bg-white
Text Dark: text-gray-900
Text Light: text-gray-600
Accent Green: text-green-600 (for checkmarks)
Accent Red: text-red-600 (for exclusions)
```

### Borders & Shadows
- Cards: `shadow-lg` or `shadow-xl`
- Rounded: `rounded-lg` or `rounded-xl`
- Borders: `border border-gray-200`

---

## 📱 Responsive Breakpoints

```tsx
Mobile: default (< 640px)
- Stacked layout
- Full-width images
- Collapsed sections

Tablet: sm, md (640px - 1024px)
- 2-column grids
- Smaller floating images
- Adjusted spacing

Desktop: lg, xl (> 1024px)
- Full floating image effect
- 3-column layouts
- Larger typography
```

---

## 🔧 Technical Implementation

### Libraries to Use
- ✅ **Embla Carousel** (already installed) - for image carousel
- ✅ **Lucide React** - for icons
- ✅ **Framer Motion** - for animations on floating images
- ✅ **React Router** - for navigation
- ✅ **Tailwind CSS** - for styling

### Animations
- Floating images: `animate-float` with different delays
- Scroll animations: Fade in on scroll (AOS library)
- Button hovers: Scale and shadow effects
- Carousel: Smooth transitions

### Performance
- Lazy load images below the fold
- Optimize hero image (WebP format)
- Preload critical images
- Use `loading="lazy"` for gallery images

---

## ✅ Acceptance Criteria

1. **Visual Match:** Page closely matches reference design
2. **Responsive:** Works perfectly on mobile, tablet, desktop
3. **Interactive:** All buttons, links, carousels functional
4. **Data-Driven:** Pulls from existing package-data.ts
5. **Navigation:** Accessible from homepage package cards
6. **Performance:** Fast loading, smooth animations
7. **Accessibility:** Proper ARIA labels, keyboard navigation

---

## 🚀 Improvements Over Reference

1. **Better Animations:** Smooth floating effect on images
2. **Enhanced Carousel:** Better controls and indicators
3. **WhatsApp Integration:** Direct click-to-chat
4. **Share Functionality:** Actual working share buttons
5. **Better Mobile UX:** Optimized touch interactions
6. **Loading States:** Skeleton screens while loading
7. **SEO Optimization:** Proper meta tags and schema
8. **Print Functionality:** Option to print/download itinerary

---

## 📂 Files to Create/Modify

### New Files
1. `/src/polymet/pages/customer-package-details.tsx` - Main page component
2. `/src/polymet/components/package-hero-floating.tsx` - Hero with floating images
3. `/src/polymet/components/package-summary-card.tsx` - Summary card component
4. `/src/polymet/components/package-booking-cta.tsx` - Booking CTA section
5. `/src/polymet/components/package-social-share.tsx` - Social share bar

### Modified Files
1. `/src/App.tsx` - Add new route
2. `/src/polymet/pages/customer-home.tsx` - Update package card links
3. `/src/polymet/components/hero-banner-with-locations.tsx` - Add navigation links

---

## 🎯 Implementation Order

### Phase 1: Core Structure (Now)
1. Create main page component
2. Set up routing
3. Hero section with basic layout
4. Package summary card
5. Test navigation from homepage

### Phase 2: Content Sections
6. Daily itinerary section
7. Inclusions/Exclusions
8. Travel tips
9. Essential items

### Phase 3: Interactive Elements
10. Image carousel
11. Floating images animation
12. Booking CTA section
13. Social share functionality

### Phase 4: Polish & Optimization
14. Responsive refinements
15. Animations and transitions
16. Performance optimization
17. Accessibility improvements

---

**Let's build this! 🚀**
