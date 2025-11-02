// Package Service - NOW USING REAL SUPABASE DATA!
// Switched from mock database to production Supabase

import { supabase } from '../../lib/supabase';
import { mockDb } from './mock-database';
import {
  PackageWithRelations,
  PackageFilters,
  PaginationParams,
  PaginatedResponse,
} from './database.types';

class PackageService {
  // Get single package by ID
  async getById(id: string): Promise<PackageWithRelations | null> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select(`
          *,
          daily_itinerary(*),
          package_images(*),
          travel_tips(*),
          essential_items(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as any;
    } catch (error) {
      console.error('Error fetching package by ID:', error);
      // Fallback to mock only if Supabase fails
      return mockDb.getPackageById(id);
    }
  }

  // Get single package by slug (SEO-friendly URLs)
  async getBySlug(slug: string): Promise<PackageWithRelations | null> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select(`
          *,
          daily_itinerary(*),
          package_images(*),
          travel_tips(*),
          essential_items(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as any;
    } catch (error) {
      console.error('Error fetching package by slug:', error);
      // Fallback to mock only if Supabase fails
      return mockDb.getPackageBySlug(slug);
    }
  }

  // Get packages with filters and pagination
  async getAll(
    filters?: PackageFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<PackageWithRelations>> {
    try {
      let query = supabase
        .from('packages')
        .select(`
          *,
          daily_itinerary(*),
          package_images(*),
          travel_tips(*),
          essential_items(*)
        `, { count: 'exact' });

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.continent) {
        query = query.eq('continent', filters.continent);
      }
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      // Apply pagination
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []) as any,
        total: count || 0,
        page,
        limit,
        total_pages: Math.ceil((count || 0) / limit),
      };
    } catch (error) {
      console.error('Error fetching packages:', error);
      return mockDb.getPackages(filters, pagination);
    }
  }

  // Get packages by continent
  async getByContinent(continent: string): Promise<PackageWithRelations[]> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select(`*,daily_itinerary(*),package_images(*),travel_tips(*),essential_items(*)`)
        .eq('continent', continent)
        .eq('status', 'active');

      if (error) throw error;
      return (data || []) as any;
    } catch (error) {
      console.error('Error fetching packages by continent:', error);
      return mockDb.getPackagesByContinent(continent);
    }
  }

  // Get packages by category
  async getByCategory(category: string): Promise<PackageWithRelations[]> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select(`*,daily_itinerary(*),package_images(*),travel_tips(*),essential_items(*)`)
        .eq('category', category)
        .eq('status', 'active');

      if (error) throw error;
      return (data || []) as any;
    } catch (error) {
      console.error('Error fetching packages by category:', error);
      return mockDb.getPackagesByCategory(category);
    }
  }

  // Get featured packages for homepage
  async getFeatured(limit: number = 6): Promise<PackageWithRelations[]> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select(`*,daily_itinerary(*),package_images(*),travel_tips(*),essential_items(*)`)
        .eq('status', 'active')
        .order('average_rating', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data || []) as any;
    } catch (error) {
      console.error('Error fetching featured packages:', error);
      return mockDb.getFeaturedPackages(limit);
    }
  }

  // Search packages
  async search(query: string): Promise<PackageWithRelations[]> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select(`*,daily_itinerary(*),package_images(*),travel_tips(*),essential_items(*)`)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,country.ilike.%${query}%`)
        .eq('status', 'active');

      if (error) throw error;
      return (data || []) as any;
    } catch (error) {
      console.error('Error searching packages:', error);
      return mockDb.searchPackages(query);
    }
  }

  // Get all packages (for admin)
  async getAllForAdmin(): Promise<PackageWithRelations[]> {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select(`*,daily_itinerary(*),package_images(*),travel_tips(*),essential_items(*)`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as any;
    } catch (error) {
      console.error('Error fetching all packages for admin:', error);
      return mockDb.getAllPackages();
    }
  }
}

// Export singleton instance
export const packageService = new PackageService();

// Export class for testing
export { PackageService };
