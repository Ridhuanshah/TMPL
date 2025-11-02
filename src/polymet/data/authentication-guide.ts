/**
 * TMPL Escapade Authentication & Role-Based Access Control (RBAC) Guide
 * ======================================================================
 *
 * This guide explains how the authentication system works and how to use it.
 */

export const authenticationGuide = {
  overview: {
    title: "Authentication System Overview",
    description:
      "The TMPL Escapade admin dashboard now requires users to login before accessing any features. Different user roles have access to different menu items and features.",
    features: [
      "Secure login with email and password",
      "Role-based access control (RBAC)",
      "7 different user roles with specific permissions",
      "Dynamic sidebar menu based on user role",
      "Protected routes requiring authentication",
      "Persistent login using localStorage",
      "Logout functionality",
    ],
  },

  userRoles: {
    title: "User Roles & Access Levels",
    roles: [
      {
        role: "super_admin",
        displayName: "Super Admin",
        description: "Full system access with all administrative privileges",
        accessiblePages: [
          "Dashboard",
          "Package Management",
          "Booking Management",
          "Booking Calendar",
          "Payment Follow-Up",
          "Coupon Management",
          "User Management",
          "Tour Guide Assignment",
          "Destination Management",
          "Review Management",
          "Analytics & Reports",
          "Settings",
        ],

        credentials: {
          email: "superadmin@tmplescapade.my",
          password: "super123",
        },
      },
      {
        role: "admin",
        displayName: "Admin",
        description:
          "Administrative access for payment management and customer follow-up",
        accessiblePages: [
          "Dashboard",
          "Package Management",
          "Booking Management",
          "Booking Calendar",
          "Payment Follow-Up",
          "User Management",
          "Review Management",
          "Analytics & Reports",
        ],

        credentials: {
          email: "admin@tmplescapade.my",
          password: "admin123",
        },
      },
      {
        role: "booking_reservation",
        displayName: "Booking & Reservation",
        description:
          "Operational management for bookings, checklists, and tour coordination",
        accessiblePages: [
          "Dashboard",
          "Booking Management",
          "Booking Calendar",
          "Payment Follow-Up",
          "Tour Guide Assignment",
        ],

        credentials: {
          email: "booking@tmplescapade.my",
          password: "booking123",
        },
      },
      {
        role: "tour_guide",
        displayName: "Tour Guide",
        description: "Access to assigned tours and customer information",
        accessiblePages: ["Tour Guide Assignment"],

        credentials: {
          email: "tourguide@tmplescapade.my",
          password: "guide123",
        },
      },
      {
        role: "travel_agent",
        displayName: "Travel Agent",
        description: "Package viewing and booking creation for customers",
        accessiblePages: [
          "Dashboard",
          "Package Management",
          "Booking Management",
          "Booking Calendar",
          "User Management",
        ],

        credentials: {
          email: "agent@tmplescapade.my",
          password: "agent123",
        },
      },
      {
        role: "finance",
        displayName: "Finance",
        description: "Financial management and payment tracking",
        accessiblePages: [
          "Dashboard",
          "Booking Management",
          "Payment Follow-Up",
          "Analytics & Reports",
          "Coupon Management",
        ],

        credentials: {
          email: "finance@tmplescapade.my",
          password: "finance123",
        },
      },
      {
        role: "sales_marketing",
        displayName: "Sales & Marketing",
        description: "Package management and promotional campaigns",
        accessiblePages: [
          "Dashboard",
          "Package Management",
          "Booking Management",
          "Coupon Management",
          "Destination Management",
          "Review Management",
          "Analytics & Reports",
          "User Management",
        ],

        credentials: {
          email: "marketing@tmplescapade.my",
          password: "marketing123",
        },
      },
    ],
  },

  howToLogin: {
    title: "How to Login",
    steps: [
      "Navigate to the login page (you'll be redirected automatically if not logged in)",
      "Enter your email and password",
      "Click 'Sign In' button",
      "You'll be redirected to the dashboard upon successful login",
    ],

    quickLogin:
      "On the login page, you can click any demo user card to quickly login with their credentials (for demo purposes only)",
  },

  howToLogout: {
    title: "How to Logout",
    steps: [
      "Click the 'Logout' button at the bottom of the sidebar",
      "You'll be redirected to the login page",
      "Your session will be cleared",
    ],
  },

  technicalDetails: {
    title: "Technical Implementation",
    components: [
      {
        name: "AuthProvider",
        path: "@/polymet/components/auth-context",
        description: "React Context provider that manages authentication state",
        features: [
          "Stores user information",
          "Provides login/logout functions",
          "Persists auth state in localStorage",
          "Provides role checking utilities",
        ],
      },
      {
        name: "ProtectedRoute",
        path: "@/polymet/components/protected-route",
        description:
          "Wrapper component that protects routes requiring authentication",
        features: [
          "Checks if user is authenticated",
          "Redirects to login if not authenticated",
          "Shows loading state while checking auth",
          "Supports role-based access control",
        ],
      },
      {
        name: "Login Page",
        path: "@/polymet/pages/login",
        description: "Login page with form validation and demo credentials",
        features: [
          "Email and password input",
          "Form validation",
          "Error handling",
          "Quick login buttons for demo users",
        ],
      },
      {
        name: "Sidebar Navigation",
        path: "@/polymet/components/sidebar-navigation",
        description: "Dynamic sidebar that shows menu items based on user role",
        features: [
          "Role-based menu filtering",
          "Active route highlighting",
          "Collapsible sidebar",
          "Logout button",
        ],
      },
    ],

    dataFiles: [
      {
        name: "auth-data",
        path: "@/polymet/data/auth-data",
        description:
          "Contains mock users, role definitions, and menu permissions",
      },
    ],
  },

  securityNotes: {
    title: "Security Notes",
    notes: [
      "This is a DEMO implementation with mock authentication",
      "Passwords are stored in plain text for demo purposes only",
      "In production, you should:",
      "  - Use a backend API for authentication",
      "  - Hash passwords securely",
      "  - Use JWT tokens or session cookies",
      "  - Implement proper CSRF protection",
      "  - Add rate limiting for login attempts",
      "  - Implement password reset functionality",
      "  - Add two-factor authentication (2FA)",
    ],
  },

  customization: {
    title: "How to Customize",
    addNewRole: [
      "1. Add new role type to UserRole in @/polymet/data/auth-data",
      "2. Add role permissions to rolePermissions object",
      "3. Define which menu items the role can access",
      "4. Create a mock user with the new role",
      "5. Test the new role by logging in",
    ],

    addNewMenuItem: [
      "1. Add new menu item to menuItems array in @/polymet/data/auth-data",
      "2. Specify which roles can access it in requiredRoles",
      "3. Add the route to the prototype",
      "4. Wrap the route with ProtectedRoute",
    ],

    changePermissions: [
      "1. Edit rolePermissions in @/polymet/data/auth-data",
      "2. Update the menuItems array to change requiredRoles",
      "3. Test by logging in with different roles",
    ],
  },
};

export default authenticationGuide;
