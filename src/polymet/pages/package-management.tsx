import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  EditIcon,
  EyeIcon,
  CopyIcon,
  TrashIcon,
  TrendingUpIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  StarIcon,
  Loader2Icon,
} from "lucide-react";
import {
  packageCategories,
  continents,
  difficultyLevels,
  packageStatuses,
} from "@/polymet/data/package-data";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export function PackageManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedContinent, setSelectedContinent] = useState("All Continents");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  // Fetch packages from Supabase
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select(`
          *,
          package_departure_dates(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Error loading packages",
        description: "Could not fetch packages from database",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageId: string, packageName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${packageName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(packageId);
      
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', packageId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Package deleted successfully",
      });

      // Refresh the list
      fetchPackages();
    } catch (error: any) {
      console.error('Error deleting package:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete package",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (packageId: string) => {
    try {
      setDuplicatingId(packageId);

      // Fetch the original package
      const { data: originalPackage, error: fetchError } = await supabase
        .from('packages')
        .select('*')
        .eq('id', packageId)
        .single();

      if (fetchError) throw fetchError;

      // Create a copy with modified fields
      const duplicatedPackage = {
        name: `${originalPackage.name} (Copy)`,
        slug: `${originalPackage.slug}-copy-${Date.now()}`,
        description: originalPackage.description,
        continent: originalPackage.continent,
        country: originalPackage.country,
        region: originalPackage.region,
        category: originalPackage.category,
        difficulty: originalPackage.difficulty,
        base_price: originalPackage.base_price,
        currency: originalPackage.currency,
        duration_days: originalPackage.duration_days,
        duration_nights: originalPackage.duration_nights,
        min_group_size: originalPackage.min_group_size,
        max_group_size: originalPackage.max_group_size,
        status: 'draft', // Set as draft
        hero_image: originalPackage.hero_image,
        gallery_images: originalPackage.gallery_images,
        highlights: originalPackage.highlights,
        inclusions: originalPackage.inclusions,
        exclusions: originalPackage.exclusions,
        pdf_itinerary_url: originalPackage.pdf_itinerary_url,
        total_bookings: 0, // Reset bookings
        total_revenue: 0, // Reset revenue
        average_rating: 0, // Reset rating
        total_reviews: 0, // Reset reviews
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Insert the duplicated package
      const { data: newPackage, error: insertError } = await supabase
        .from('packages')
        .insert([duplicatedPackage])
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: `Package duplicated successfully. Redirecting to edit...`,
      });

      // Redirect to edit page for the new package
      setTimeout(() => {
        window.location.href = `/admin/packages/edit/${newPackage.id}`;
      }, 1000);
    } catch (error: any) {
      console.error('Error duplicating package:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to duplicate package",
        variant: "destructive",
      });
      setDuplicatingId(null);
    }
  };

  // Filter packages based on search and filters
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      pkg.category === selectedCategory;
    const matchesContinent =
      selectedContinent === "All Continents" ||
      pkg.continent === selectedContinent;
    const matchesStatus =
      selectedStatus === "All Status" || pkg.status === selectedStatus;
    const matchesDifficulty =
      selectedDifficulty === "All Levels" ||
      pkg.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase();

    return (
      matchesSearch &&
      matchesCategory &&
      matchesContinent &&
      matchesStatus &&
      matchesDifficulty
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "sold_out":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Moderate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Challenging":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Extreme":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString()}`;
  };

  const calculateOccupancy = (pkg: any) => {
    // Calculate from departure dates
    const departureDates = pkg.package_departure_dates || [];
    if (departureDates.length === 0) return 0;
    
    const totalCapacity = departureDates.reduce((sum: number, d: any) => sum + (d.capacity || 0), 0);
    const totalBooked = departureDates.reduce((sum: number, d: any) => sum + (d.booked || 0), 0);
    
    return totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0;
  };

  const getTotalBookings = () => {
    return packages.reduce((sum, p) => sum + (p.total_bookings || 0), 0);
  };

  const getAverageRating = () => {
    const packagesWithRating = packages.filter(p => p.average_rating > 0);
    if (packagesWithRating.length === 0) return 0;
    return (packages.reduce((sum, p) => sum + (p.average_rating || 0), 0) / packagesWithRating.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Package Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage travel packages, pricing, and availability
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/packages/new">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Package
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Packages</p>
                <p className="text-2xl font-bold">{packages.length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Packages</p>
                <p className="text-2xl font-bold">
                  {packages.filter((p) => p.status === "active").length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">
                  {getTotalBookings()}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <UsersIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {getAverageRating()}
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <StarIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search packages, destinations, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <FilterIcon className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {packageCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedContinent}
              onValueChange={setSelectedContinent}
            >
              <SelectTrigger>
                <SelectValue placeholder="Continent" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((continent) => (
                  <SelectItem key={continent} value={continent}>
                    {continent}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {packageStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Package Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Packages ({filteredPackages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => {
                const departureDates = pkg.package_departure_dates || [];
                const totalCapacity = departureDates.reduce((sum: number, d: any) => sum + (d.capacity || 0), 0);
                const totalBooked = departureDates.reduce((sum: number, d: any) => sum + (d.booked || 0), 0);
                
                return (
                <TableRow key={pkg.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={pkg.hero_image || 'https://picsum.photos/seed/default/200'}
                        alt={pkg.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />

                      <div>
                        <p className="font-medium">{pkg.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {pkg.category}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="h-3 w-3 text-muted-foreground" />

                      <span className="text-sm">{pkg.country}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {pkg.continent}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{pkg.duration_days} days</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(pkg.difficulty?.charAt(0).toUpperCase() + pkg.difficulty?.slice(1) || 'Easy')}>
                      {pkg.difficulty?.charAt(0).toUpperCase() + pkg.difficulty?.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {formatCurrency(pkg.base_price)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(pkg.status)}>
                      {pkg.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${calculateOccupancy(pkg)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {calculateOccupancy(pkg)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {totalBooked}/{totalCapacity}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{pkg.total_bookings || 0} bookings</p>
                      <p className="text-muted-foreground">
                        {formatCurrency(pkg.total_revenue || 0)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* View Frontend Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <Link 
                          to={`/packages/${pkg.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View customer page"
                        >
                          <EyeIcon className="h-4 w-4 text-blue-600" />
                        </Link>
                      </Button>

                      {/* Actions Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/packages/view/${pkg.id}`}>
                            <EyeIcon className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/packages/edit/${pkg.id}`}>
                            <EditIcon className="mr-2 h-4 w-4" />
                            Edit Package
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDuplicate(pkg.id)}
                          disabled={duplicatingId === pkg.id}
                        >
                          <CopyIcon className="mr-2 h-4 w-4" />
                          {duplicatingId === pkg.id ? "Duplicating..." : "Duplicate"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(pkg.id, pkg.name)}
                          disabled={deletingId === pkg.id}
                        >
                          <TrashIcon className="mr-2 h-4 w-4" />
                          {deletingId === pkg.id ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default PackageManagement;
