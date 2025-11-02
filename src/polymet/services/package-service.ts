// Package Service - Abstraction layer for database access
// Switch between mock DB and real Supabase by changing one line

import { mockDb } from './mock-database';
import {
  PackageWithRelations,
  PackageFilters,
  PaginationParams,
  PaginatedResponse,
} from './database.types';

// TODO: When Supabase is ready, import and use real client:
// import { supabase } from './supabase-client';

class PackageService {
  // Get single package by ID
  async getById(id: string): Promise<PackageWithRelations | null> {
    // Using mock database
    return mockDb.getPackageById(id);

    // TODO: Replace with Supabase:
    // const { data, error } = await supabase
    //   .from('packages')
    //   .select(`
    //     *,
    //     daily_itinerary(*),
    //     images(*),
    //     travel_tips(*),
    //     essential_items(*)
    //   `)
    //   .eq('id', id)
    //   .single();
    // return data;
  }

  // Get single package by slug (SEO-friendly URLs)
  async getBySlug(slug: string): Promise<PackageWithRelations | null> {
    return mockDb.getPackageBySlug(slug);

    // TODO: Replace with Supabase:
    // const { data } = await supabase
    //   .from('packages')
    //   .select(`*, daily_itinerary(*), images(*), travel_tips(*), essential_items(*)`)
    //   .eq('slug', slug)
    //   .single();
    // return data;
  }

  // Get packages with filters and pagination
  async getAll(
    filters?: PackageFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<PackageWithRelations>> {
    return mockDb.getPackages(filters, pagination);

    // TODO: Replace with Supabase:
    // Build query with filters, pagination
  }

  // Get packages by continent
  async getByContinent(continent: string): Promise<PackageWithRelations[]> {
    return mockDb.getPackagesByContinent(continent);
  }

  // Get packages by category
  async getByCategory(category: string): Promise<PackageWithRelations[]> {
    return mockDb.getPackagesByCategory(category);
  }

  // Get featured packages for homepage
  async getFeatured(limit: number = 6): Promise<PackageWithRelations[]> {
    return mockDb.getFeaturedPackages(limit);
  }

  // Search packages
  async search(query: string): Promise<PackageWithRelations[]> {
    return mockDb.searchPackages(query);
  }

  // Get all packages (for admin)
  async getAllForAdmin(): Promise<PackageWithRelations[]> {
    return mockDb.getAllPackages();
  }
}

// Export singleton instance
export const packageService = new PackageService();

// Export class for testing
export { PackageService };
