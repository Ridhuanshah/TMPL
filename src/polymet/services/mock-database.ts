// Mock Database Service - Mimics Supabase client
// Easy to swap with real Supabase later

import {
  PackageRow,
  PackageWithRelations,
  PackageFilters,
  PaginationParams,
  PaginatedResponse,
  DailyItineraryRow,
  PackageImageRow,
  TravelTipRow,
  EssentialItemRow,
} from './database.types';

// Import existing data and convert to database format
import { travelPackages } from '@/polymet/data/package-data';

class MockDatabase {
  private packages: PackageWithRelations[] = [];

  constructor() {
    this.initializeData();
  }

  // Initialize mock data from existing package data
  private initializeData() {
    this.packages = travelPackages.map((pkg) => this.convertToDbFormat(pkg));
  }

  // Convert old format to database format
  private convertToDbFormat(pkg: any): PackageWithRelations {
    const now = new Date().toISOString();

    // Convert images
    const images: PackageImageRow[] = [
      {
        id: `img_${pkg.id}_hero`,
        package_id: pkg.id,
        url: pkg.images.hero,
        alt_text: `${pkg.name} - Hero Image`,
        type: 'hero',
        display_order: 0,
        created_at: now,
        updated_at: now,
      },
      ...pkg.images.gallery.map((url: string, index: number) => ({
        id: `img_${pkg.id}_gallery_${index}`,
        package_id: pkg.id,
        url,
        alt_text: `${pkg.name} - Gallery Image ${index + 1}`,
        type: 'gallery' as const,
        display_order: index + 1,
        created_at: now,
        updated_at: now,
      })),
    ];

    // Convert daily itinerary
    const daily_itinerary: DailyItineraryRow[] = (pkg.dailyItinerary || []).map(
      (day: any) => ({
        id: day.id,
        package_id: pkg.id,
        day_number: day.dayNumber,
        title: day.title,
        description: day.description,
        location_from: day.location.from,
        location_to: day.location.to,
        activities: day.activities,
        meals_included: day.mealsIncluded || [],
        accommodation: day.accommodation || null,
        is_optional: day.isOptional || false,
        optional_price: day.optionalPrice || null,
        created_at: now,
        updated_at: now,
      })
    );

    // Convert travel tips
    const travel_tips: TravelTipRow[] = (pkg.travelTips || []).map(
      (tip: any, index: number) => ({
        id: tip.id,
        package_id: pkg.id,
        category: tip.category,
        title: tip.title,
        description: tip.description,
        display_order: index,
        created_at: now,
        updated_at: now,
      })
    );

    // Convert essential items
    const essential_items: EssentialItemRow[] = (pkg.essentialItems || []).map(
      (item: any, index: number) => ({
        id: item.id,
        package_id: pkg.id,
        category: item.category || 'general',
        item_name: item.text,
        is_mandatory: item.mandatory || true,
        display_order: index,
        created_at: now,
        updated_at: now,
      })
    );

    return {
      id: pkg.id,
      name: pkg.name,
      slug: pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: pkg.description,
      continent: pkg.continent,
      country: pkg.country,
      region: pkg.region || pkg.country,
      category: pkg.category,
      duration: pkg.duration,
      difficulty: pkg.difficulty,
      base_price: pkg.pricing.basePrice,
      currency: pkg.pricing.currency,
      min_group_size: pkg.groupSize.min,
      max_group_size: pkg.groupSize.max,
      capacity: pkg.availability.capacity,
      booked: pkg.availability.booked,
      rating: pkg.rating,
      review_count: pkg.reviews,
      booking_count: pkg.bookings,
      total_revenue: pkg.revenue,
      status: pkg.status as any,
      meta_title: `${pkg.name} - TMPL Escapade`,
      meta_description: pkg.description.substring(0, 160),
      highlights: pkg.highlights,
      inclusions: pkg.inclusions,
      exclusions: pkg.exclusions,
      pdfItinerary: pkg.pdfItinerary,
      created_at: now,
      updated_at: now,
      daily_itinerary,
      images,
      travel_tips,
      essential_items,
    };
  }

  // Simulate Supabase query builder
  async getPackageById(id: string): Promise<PackageWithRelations | null> {
    await this.simulateNetworkDelay();
    return this.packages.find((pkg) => pkg.id === id) || null;
  }

  async getPackageBySlug(slug: string): Promise<PackageWithRelations | null> {
    await this.simulateNetworkDelay();
    return this.packages.find((pkg) => pkg.slug === slug) || null;
  }

  async getPackages(
    filters?: PackageFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<PackageWithRelations>> {
    await this.simulateNetworkDelay();

    let filtered = [...this.packages];

    // Apply filters
    if (filters) {
      if (filters.continent) {
        filtered = filtered.filter(
          (pkg) => pkg.continent.toLowerCase() === filters.continent?.toLowerCase()
        );
      }
      if (filters.country) {
        filtered = filtered.filter(
          (pkg) => pkg.country.toLowerCase() === filters.country?.toLowerCase()
        );
      }
      if (filters.category) {
        filtered = filtered.filter((pkg) => pkg.category === filters.category);
      }
      if (filters.status) {
        filtered = filtered.filter((pkg) => pkg.status === filters.status);
      }
      if (filters.difficulty) {
        filtered = filtered.filter((pkg) => pkg.difficulty === filters.difficulty);
      }
      if (filters.min_price !== undefined) {
        filtered = filtered.filter((pkg) => pkg.base_price >= filters.min_price!);
      }
      if (filters.max_price !== undefined) {
        filtered = filtered.filter((pkg) => pkg.base_price <= filters.max_price!);
      }
      if (filters.min_duration !== undefined) {
        filtered = filtered.filter((pkg) => pkg.duration >= filters.min_duration!);
      }
      if (filters.max_duration !== undefined) {
        filtered = filtered.filter((pkg) => pkg.duration <= filters.max_duration!);
      }
    }

    const total = filtered.length;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const total_pages = Math.ceil(total / limit);

    // Apply pagination
    if (pagination) {
      const start = (page - 1) * limit;
      const end = start + limit;
      filtered = filtered.slice(start, end);
    }

    return {
      data: filtered,
      total,
      page,
      limit,
      total_pages,
    };
  }

  async getPackagesByContinent(
    continent: string
  ): Promise<PackageWithRelations[]> {
    await this.simulateNetworkDelay();
    return this.packages.filter(
      (pkg) => pkg.continent.toLowerCase() === continent.toLowerCase()
    );
  }

  async getPackagesByCategory(
    category: string
  ): Promise<PackageWithRelations[]> {
    await this.simulateNetworkDelay();
    return this.packages.filter((pkg) => pkg.category === category);
  }

  async getFeaturedPackages(limit: number = 6): Promise<PackageWithRelations[]> {
    await this.simulateNetworkDelay();
    return this.packages
      .filter((pkg) => pkg.status === 'active')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  async searchPackages(query: string): Promise<PackageWithRelations[]> {
    await this.simulateNetworkDelay();
    const lowerQuery = query.toLowerCase();
    return this.packages.filter(
      (pkg) =>
        pkg.name.toLowerCase().includes(lowerQuery) ||
        pkg.description.toLowerCase().includes(lowerQuery) ||
        pkg.country.toLowerCase().includes(lowerQuery) ||
        pkg.continent.toLowerCase().includes(lowerQuery) ||
        pkg.highlights.some((h) => h.toLowerCase().includes(lowerQuery))
    );
  }

  // Simulate network delay for realistic behavior
  private async simulateNetworkDelay() {
    const delay = Math.random() * 100 + 50; // 50-150ms
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Method to add new package (for admin)
  async addPackage(pkg: any): Promise<PackageWithRelations> {
    const newPkg = this.convertToDbFormat(pkg);
    this.packages.push(newPkg);
    return newPkg;
  }

  // Get all packages (no filters, for admin)
  async getAllPackages(): Promise<PackageWithRelations[]> {
    await this.simulateNetworkDelay();
    return [...this.packages];
  }
}

// Export singleton instance
export const mockDb = new MockDatabase();

// Export class for testing or multiple instances
export { MockDatabase };
