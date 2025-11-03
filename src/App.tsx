import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/polymet/components/auth-context";
import { ProtectedRoute } from "@/polymet/components/protected-route";
import { AdminLayout } from "@/polymet/layouts/admin-layout";
import { CustomerLayout } from "@/polymet/layouts/customer-layout";
import { Login } from "@/polymet/pages/login";
import { CustomerHome } from "@/polymet/pages/customer-home";
import { AboutUsPage } from "@/polymet/pages/about-us";
import { HowItWorksPage } from "@/polymet/pages/how-it-works";
import { BlogPage } from "@/polymet/pages/blog";
import { BlogPostPage } from "@/polymet/pages/blog-post";
import { CustomerPackageDetails } from "@/polymet/pages/customer-package-details";
import { CookieSettingsPage } from "@/polymet/pages/cookie-settings";
import { PrivacyPolicyPage } from "@/polymet/pages/privacy-policy";
import { TermsOfServicePage } from "@/polymet/pages/terms-of-service";
import { DashboardOverview } from "@/polymet/pages/dashboard-overview";
import { PackageManagement } from "@/polymet/pages/package-management";
import { PackageForm } from "@/polymet/pages/package-form";
import { PackageCreate } from "@/polymet/pages/package-create";
import { PackageCreateFull } from "@/polymet/pages/package-create-full";
import { PackageEditFull } from "@/polymet/pages/package-edit-full";
import { PackageDetails } from "@/polymet/pages/package-details";
import { BookingManagement } from "@/polymet/pages/booking-management";
import { NewBooking } from "@/polymet/pages/new-booking-fixed";
import { BookingCalendar } from "@/polymet/pages/booking-calendar";
import { UserManagement } from "@/polymet/pages/user-management";
import { AddUser } from "@/polymet/pages/add-user";
import { TourGuideDashboard } from "@/polymet/pages/tour-guide-dashboard";
import { TourGuideTest } from "@/polymet/pages/tour-guide-test";
import { CouponManagement } from "@/polymet/pages/coupon-management";
import { CouponCreate } from "@/polymet/pages/coupon-create";
import { DestinationManagement } from "@/polymet/pages/destination-management";
import { ReviewManagement } from "@/polymet/pages/review-management";
import { AnalyticsReports } from "@/polymet/pages/analytics-reports";
import { Settings } from "@/polymet/pages/settings";
import { Profile } from "@/polymet/pages/profile";
import { PaymentFollowUp } from "@/polymet/pages/payment-follow-up";
import { Toaster } from "@/components/ui/toaster";

export default function AdminDashboard() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Customer-Facing Homepage */}
          <Route
            path="/"
            element={
              <CustomerLayout transparentNav>
                <CustomerHome />
              </CustomerLayout>
            }
          />

          {/* About Us Page */}
          <Route
            path="/about"
            element={
              <CustomerLayout>
                <AboutUsPage />
              </CustomerLayout>
            }
          />

          {/* How It Works Page */}
          <Route
            path="/how-it-works"
            element={
              <CustomerLayout>
                <HowItWorksPage />
              </CustomerLayout>
            }
          />

          {/* Blog & Travel Tips Page */}
          <Route
            path="/blog"
            element={
              <CustomerLayout>
                <BlogPage />
              </CustomerLayout>
            }
          />

          {/* Single Blog Post */}
          <Route
            path="/blog/:slug"
            element={
              <CustomerLayout>
                <BlogPostPage />
              </CustomerLayout>
            }
          />

          {/* Package Details Page (Customer-Facing) */}
          <Route
            path="/packages/:id"
            element={
              <CustomerLayout>
                <CustomerPackageDetails />
              </CustomerLayout>
            }
          />

          {/* Cookie Settings Page */}
          <Route
            path="/cookie-settings"
            element={
              <CustomerLayout>
                <CookieSettingsPage />
              </CustomerLayout>
            }
          />

          {/* Privacy Policy Page */}
          <Route
            path="/privacy"
            element={
              <CustomerLayout>
                <PrivacyPolicyPage />
              </CustomerLayout>
            }
          />

          {/* Terms of Service Page */}
          <Route
            path="/terms"
            element={
              <CustomerLayout>
                <TermsOfServicePage />
              </CustomerLayout>
            }
          />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Dashboard - Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <DashboardOverview />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/packages"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PackageManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/packages/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PackageCreateFull />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/packages/edit/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PackageEditFull />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/packages/view/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PackageDetails />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <BookingManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bookings/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <NewBooking />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bookings/edit/:id"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <NewBooking />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/calendar"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <BookingCalendar />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/coupons"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CouponManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/coupons/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CouponCreate />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <UserManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AddUser />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tour-guide"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <TourGuideDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tour-guide-test"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <TourGuideTest />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/destinations"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <DestinationManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ReviewManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AnalyticsReports />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Profile />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/payment-follow-up"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PaymentFollowUp />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}
