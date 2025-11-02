export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string; // In production, this would be hashed
  role: UserRole;
  avatar?: string;
  phone: string;
  department?: string;
}

export type UserRole =
  | "super_admin"
  | "admin"
  | "booking_reservation"
  | "tour_guide"
  | "travel_agent"
  | "finance"
  | "sales_marketing";

export interface RolePermissions {
  role: UserRole;
  displayName: string;
  description: string;
  menuItems: string[]; // Menu item IDs that this role can access
  permissions: string[];
}

// Mock user credentials for demo
export const mockUsers: AuthUser[] = [
  {
    id: "SA001",
    name: "Super Admin",
    email: "superadmin@tmplescapade.my",
    password: "super123", // Demo password
    role: "super_admin",
    avatar: "https://github.com/polymet-ai.png",
    phone: "+60196616388",
    department: "Management",
  },
  {
    id: "ADM001",
    name: "Admin User",
    email: "admin@tmplescapade.my",
    password: "admin123", // Demo password
    role: "admin",
    avatar: "https://github.com/yusufhilmi.png",
    phone: "+60196616389",
    department: "Administration",
  },
  {
    id: "BR001",
    name: "Michael Chen",
    email: "booking@tmplescapade.my",
    password: "booking123", // Demo password
    role: "booking_reservation",
    avatar: "https://github.com/denizbuyuktas.png",
    phone: "+60123456781",
    department: "Operations",
  },
  {
    id: "TG001",
    name: "Alex Thompson",
    email: "tourguide@tmplescapade.my",
    password: "guide123", // Demo password
    role: "tour_guide",
    avatar: "https://github.com/shoaibux1.png",
    phone: "+60123456782",
    department: "Field Operations",
  },
  {
    id: "TA001",
    name: "Sarah Williams",
    email: "agent@tmplescapade.my",
    password: "agent123", // Demo password
    role: "travel_agent",
    avatar: "https://github.com/yahyabedirhan.png",
    phone: "+60123456785",
    department: "Sales",
  },
  {
    id: "FIN001",
    name: "David Lee",
    email: "finance@tmplescapade.my",
    password: "finance123", // Demo password
    role: "finance",
    avatar: "https://github.com/kdrnp.png",
    phone: "+60123456786",
    department: "Finance",
  },
  {
    id: "SM001",
    name: "Jennifer Lee",
    email: "marketing@tmplescapade.my",
    password: "marketing123", // Demo password
    role: "sales_marketing",
    avatar: "https://github.com/yahyabedirhan.png",
    phone: "+60123456780",
    department: "Marketing",
  },
];

// Role-based menu permissions
export const rolePermissions: Record<UserRole, RolePermissions> = {
  super_admin: {
    role: "super_admin",
    displayName: "Super Admin",
    description: "Full system access with all administrative privileges",
    menuItems: [
      "dashboard",
      "packages",
      "bookings",
      "calendar",
      "payment-follow-up",
      "coupons",
      "users",
      "tour-guide",
      "destinations",
      "reviews",
      "analytics",
      "settings",
    ],

    permissions: [
      "view_all",
      "create_all",
      "edit_all",
      "delete_all",
      "manage_users",
      "manage_roles",
      "system_settings",
      "financial_reports",
      "refund_processing",
    ],
  },
  admin: {
    role: "admin",
    displayName: "Admin",
    description:
      "Administrative access for payment management and customer follow-up",
    menuItems: [
      "dashboard",
      "packages",
      "bookings",
      "calendar",
      "payment-follow-up",
      "users",
      "reviews",
      "analytics",
    ],

    permissions: [
      "view_dashboard",
      "view_packages",
      "view_bookings",
      "manage_payments",
      "send_payment_requests",
      "create_invoices",
      "manage_refunds",
      "view_customers",
      "follow_up_payments",
    ],
  },
  booking_reservation: {
    role: "booking_reservation",
    displayName: "Booking & Reservation",
    description:
      "Operational management for bookings, checklists, and tour coordination",
    menuItems: [
      "dashboard",
      "bookings",
      "calendar",
      "payment-follow-up",
      "tour-guide",
    ],

    permissions: [
      "view_dashboard",
      "manage_bookings",
      "view_calendar",
      "operational_checklist",
      "assign_tour_guides",
      "manage_accommodation",
      "manage_transportation",
      "customer_details",
      "view_payment_status",
    ],
  },
  tour_guide: {
    role: "tour_guide",
    displayName: "Tour Guide",
    description: "Access to assigned tours and customer information",
    menuItems: ["tour-guide"],
    permissions: [
      "view_assigned_tours",
      "view_tour_schedules",
      "view_customer_details",
      "update_tour_status",
      "submit_reports",
      "view_itinerary",
      "emergency_contacts",
    ],
  },
  travel_agent: {
    role: "travel_agent",
    displayName: "Travel Agent",
    description: "Package viewing and booking creation for customers",
    menuItems: ["dashboard", "packages", "bookings", "calendar", "users"],
    permissions: [
      "view_dashboard",
      "view_packages",
      "create_bookings",
      "view_bookings",
      "view_calendar",
      "view_customers",
      "manage_customer_bookings",
    ],
  },
  finance: {
    role: "finance",
    displayName: "Finance",
    description: "Financial management and payment tracking",
    menuItems: [
      "dashboard",
      "bookings",
      "payment-follow-up",
      "analytics",
      "coupons",
    ],

    permissions: [
      "view_dashboard",
      "view_bookings",
      "manage_payments",
      "view_financial_reports",
      "payment_follow_up",
      "manage_coupons",
      "view_analytics",
      "export_financial_data",
    ],
  },
  sales_marketing: {
    role: "sales_marketing",
    displayName: "Sales & Marketing",
    description: "Package management and promotional campaigns",
    menuItems: [
      "dashboard",
      "packages",
      "bookings",
      "coupons",
      "destinations",
      "reviews",
      "analytics",
      "users",
    ],

    permissions: [
      "view_dashboard",
      "manage_packages",
      "view_bookings",
      "manage_coupons",
      "manage_destinations",
      "manage_reviews",
      "view_analytics",
      "view_customers",
      "send_promotions",
    ],
  },
};

// Menu item definitions with role requirements
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number;
  requiredRoles: UserRole[];
}

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: "LayoutDashboard",
    requiredRoles: [
      "super_admin",
      "admin",
      "booking_reservation",
      "travel_agent",
      "finance",
      "sales_marketing",
    ],
  },
  {
    id: "packages",
    label: "Package Management",
    path: "/admin/packages",
    icon: "Package",
    badge: 142,
    requiredRoles: ["super_admin", "admin", "travel_agent", "sales_marketing"],
  },
  {
    id: "bookings",
    label: "Booking Management",
    path: "/admin/bookings",
    icon: "Calendar",
    badge: 234,
    requiredRoles: [
      "super_admin",
      "admin",
      "booking_reservation",
      "travel_agent",
      "finance",
      "sales_marketing",
    ],
  },
  {
    id: "calendar",
    label: "Booking Calendar",
    path: "/admin/calendar",
    icon: "CalendarDays",
    requiredRoles: [
      "super_admin",
      "admin",
      "booking_reservation",
      "travel_agent",
    ],
  },
  {
    id: "payment-follow-up",
    label: "Payment Follow-Up",
    path: "/admin/payment-follow-up",
    icon: "DollarSign",
    badge: 8,
    requiredRoles: ["super_admin", "admin", "booking_reservation", "finance"],
  },
  {
    id: "coupons",
    label: "Coupon Management",
    path: "/admin/coupons",
    icon: "Ticket",
    requiredRoles: ["super_admin", "finance", "sales_marketing"],
  },
  {
    id: "users",
    label: "User Management",
    path: "/admin/users",
    icon: "Users",
    requiredRoles: ["super_admin", "admin", "travel_agent", "sales_marketing"],
  },
  {
    id: "tour-guide",
    label: "Tour Guide Assignment",
    path: "/admin/tour-guide-test",
    icon: "MapPin",
    requiredRoles: ["super_admin", "booking_reservation", "tour_guide"],
  },
  {
    id: "destinations",
    label: "Destination Management",
    path: "/admin/destinations",
    icon: "Globe",
    requiredRoles: ["super_admin", "sales_marketing"],
  },
  {
    id: "reviews",
    label: "Review Management",
    path: "/admin/reviews",
    icon: "Star",
    badge: 12,
    requiredRoles: ["super_admin", "admin", "sales_marketing"],
  },
  {
    id: "analytics",
    label: "Analytics & Reports",
    path: "/admin/analytics",
    icon: "BarChart3",
    requiredRoles: ["super_admin", "admin", "finance", "sales_marketing"],
  },
  {
    id: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: "Settings",
    requiredRoles: ["super_admin"],
  },
];

// Helper function to check if user has access to a menu item
export const hasMenuAccess = (
  userRole: UserRole,
  menuItemId: string
): boolean => {
  const menuItem = menuItems.find((item) => item.id === menuItemId);
  if (!menuItem) return false;
  return menuItem.requiredRoles.includes(userRole);
};

// Helper function to get accessible menu items for a role
export const getAccessibleMenuItems = (userRole: UserRole): MenuItem[] => {
  return menuItems.filter((item) => item.requiredRoles.includes(userRole));
};

// Helper function to check if user has a specific permission
export const hasPermission = (
  userRole: UserRole,
  permission: string
): boolean => {
  const rolePerms = rolePermissions[userRole];
  return rolePerms.permissions.includes(permission);
};
