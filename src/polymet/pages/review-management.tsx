import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  CheckCircle,
  XCircle,
  Eye,
  Reply,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  reviews,
  reviewStats,
  reviewStatuses,
  ratingFilters,
  loyaltyTiers,
} from "@/polymet/data/review-data";

export function ReviewManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [selectedTier, setSelectedTier] = useState("All Tiers");
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.package.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All Statuses" || review.status === selectedStatus;
    const matchesRating =
      selectedRating === "All Ratings" ||
      review.rating.overall === parseInt(selectedRating.split(" ")[0]);
    const matchesTier =
      selectedTier === "All Tiers" ||
      review.customer.loyaltyTier === selectedTier;

    return matchesSearch && matchesStatus && matchesRating && matchesTier;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "flagged":
        return "bg-red-100 text-red-800";
      case "rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-purple-100 text-purple-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800";
      case "silver":
        return "bg-gray-100 text-gray-800";
      case "bronze":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Review Management</h1>
          <p className="text-muted-foreground mt-2">
            Moderate customer reviews and manage feedback
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Flag className="h-4 w-4 mr-2" />
            Flagged ({reviewStats.statusDistribution.flagged})
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Pending ({reviewStats.statusDistribution.pending})
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviewStats.totalReviews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-600">
                +{reviewStats.pendingReviews}
              </span>{" "}
              pending moderation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviewStats.averageRating}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">★</span> Overall satisfaction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviewStats.responseRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Reviews
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviewStats.statusDistribution.approved}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-purple-600">Published</span> and visible
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search reviews, customers, or packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {reviewStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {ratingFilters.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Loyalty tier" />
              </SelectTrigger>
              <SelectContent>
                {loyaltyTiers.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {tier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews ({filteredReviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Helpfulness</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {review.customer.avatar && (
                        <img
                          src={review.customer.avatar}
                          alt={review.customer.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-medium">
                          {review.customer.name}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Badge
                            className={getTierColor(
                              review.customer.loyaltyTier
                            )}
                          >
                            {review.customer.loyaltyTier}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{review.package.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.package.destination}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(review.rating.overall)}
                      </div>
                      <span className="font-medium">
                        {review.rating.overall}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(review.status)}>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1 text-green-600" />

                        <span>{review.helpfulness.helpful}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsDown className="h-3 w-3 mr-1 text-red-600" />

                        <span>{review.helpfulness.notHelpful}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Review Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3">
                                {review.customer.avatar && (
                                  <img
                                    src={review.customer.avatar}
                                    alt={review.customer.name}
                                    className="w-12 h-12 rounded-full"
                                  />
                                )}
                                <div>
                                  <h3 className="font-semibold">
                                    {review.customer.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {review.package.name} •{" "}
                                    {review.package.destination}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  {review.content.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {review.content.review}
                                </p>
                              </div>

                              {review.content.pros.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-green-600 mb-1">
                                    Pros:
                                  </h5>
                                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                                    {review.content.pros.map((pro, index) => (
                                      <li key={index}>{pro}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {review.content.cons.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-red-600 mb-1">
                                    Cons:
                                  </h5>
                                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                                    {review.content.cons.map((con, index) => (
                                      <li key={index}>{con}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {review.images.length > 0 && (
                                <div>
                                  <h5 className="font-medium mb-2">Images:</h5>
                                  <div className="grid grid-cols-2 gap-2">
                                    {review.images.map((image, index) => (
                                      <img
                                        key={index}
                                        src={image}
                                        alt={`Review image ${index + 1}`}
                                        className="w-full h-32 object-cover rounded"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}

                              {review.response && (
                                <div className="bg-muted p-3 rounded">
                                  <h5 className="font-medium mb-1">
                                    Response:
                                  </h5>
                                  <p className="text-sm">
                                    {review.response.content}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    By {review.response.respondedBy} on{" "}
                                    {new Date(
                                      review.response.respondedAt
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              )}

                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-yellow-600"
                                >
                                  <Flag className="h-4 w-4 mr-1" />
                                  Flag
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Reply className="h-4 w-4 mr-1" />
                                  Respond
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {review.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>
                          <Reply className="h-4 w-4 mr-2" />
                          Respond
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-yellow-600">
                          <Flag className="h-4 w-4 mr-2" />
                          Flag for Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(reviewStats.ratingDistribution)
                .reverse()
                .map(([rating, count]) => (
                  <div
                    key={rating}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(parseInt(rating))}
                      </div>
                      <span className="text-sm">{rating} Stars</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(count / reviewStats.totalReviews) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(reviewStats.statusDistribution).map(
                ([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(status)}>{status}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(count / reviewStats.totalReviews) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ReviewManagement;
