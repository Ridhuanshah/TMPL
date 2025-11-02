// Supabase Auth Demo Users
// These are the credentials for Supabase Auth (not mock data)

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string; // Supabase Auth password
  role: string;
  avatar?: string;
  displayRole: string;
}

export const supabaseDemoUsers: DemoUser[] = [
  {
    id: "SA001",
    name: "Super Admin",
    email: "superadmin@tmplescapade.my",
    password: "Super@123!",
    role: "super_admin",
    avatar: "https://github.com/polymet-ai.png",
    displayRole: "Super Admin",
  },
  {
    id: "ADM001",
    name: "Admin User",
    email: "admin@tmplescapade.my",
    password: "Admin@123!",
    role: "admin",
    avatar: "https://github.com/yusufhilmi.png",
    displayRole: "Admin",
  },
  {
    id: "BR001",
    name: "Michael Chen",
    email: "booking@tmplescapade.my",
    password: "Booking@123!",
    role: "booking_reservation",
    avatar: "https://github.com/denizbuyuktas.png",
    displayRole: "Booking & Reservation",
  },
  {
    id: "TG001",
    name: "Alex Thompson",
    email: "tourguide@tmplescapade.my",
    password: "Guide@123!",
    role: "tour_guide",
    avatar: "https://github.com/shoaibux1.png",
    displayRole: "Tour Guide",
  },
  {
    id: "TA001",
    name: "Sarah Williams",
    email: "agent@tmplescapade.my",
    password: "Agent@123!",
    role: "travel_agent",
    avatar: "https://github.com/yahyabedirhan.png",
    displayRole: "Travel Agent",
  },
  {
    id: "FIN001",
    name: "David Lee",
    email: "finance@tmplescapade.my",
    password: "Finance@123!",
    role: "finance",
    avatar: "https://github.com/kdrnp.png",
    displayRole: "Finance",
  },
  {
    id: "SM001",
    name: "Jennifer Lee",
    email: "marketing@tmplescapade.my",
    password: "Marketing@123!",
    role: "sales_marketing",
    avatar: "https://github.com/yahyabedirhan.png",
    displayRole: "Sales & Marketing",
  },
];
