import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/polymet/components/auth-context";
import {
  getAccessibleMenuItems,
  rolePermissions,
} from "@/polymet/data/auth-data";
import {
  LayoutDashboardIcon,
  PackageIcon,
  CalendarIcon,
  TicketIcon,
  UsersIcon,
  MapPinIcon,
  StarIcon,
  BarChart3Icon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlaneIcon,
  LogOutIcon,
  NavigationIcon,
  TestTubeIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  DollarSignIcon,
  GlobeIcon,
} from "lucide-react";

// Icon mapping for menu items
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard: LayoutDashboardIcon,
  Package: PackageIcon,
  Calendar: CalendarIcon,
  CalendarDays: CalendarDaysIcon,
  DollarSign: DollarSignIcon,
  Ticket: TicketIcon,
  Users: UsersIcon,
  MapPin: NavigationIcon,
  Globe: GlobeIcon,
  Star: StarIcon,
  BarChart3: BarChart3Icon,
  Settings: SettingsIcon,
};

interface SidebarNavigationProps {
  className?: string;
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Get accessible menu items based on user role
  const navigationItems = user ? getAccessibleMenuItems(user.role) : [];
  const userRoleDisplay = user
    ? rolePermissions[user.role].displayName
    : "Guest";

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isCollapsed ? (
          <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden mx-auto">
            <img 
              src="/tmpl-logo.png" 
              alt="TMPL Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
              <img 
                src="/tmpl-logo.png" 
                alt="TMPL Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-blue-600">TMPL</h2>
              <p className="text-xs text-muted-foreground">{userRoleDisplay}</p>
            </div>
          </div>
        )}

        {!isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expand Button when collapsed */}
      {isCollapsed && (
        <div className="p-2 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 mx-auto"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = iconMap[item.icon] || LayoutDashboardIcon;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0")} />

              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs rounded-full",
                        isActive
                          ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t">
        {!isCollapsed && (
          <div className="p-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-3 rounded-lg mb-3">
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400">
                Travel the World
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                Managing adventures across all 7 continents
              </p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className={cn("p-2", !isCollapsed && "px-4 pb-4")}>
          <button
            onClick={() => {
              console.log('🔴 [LOGOUT] Button clicked, clearing session...');
              
              // Clear all storage immediately
              sessionStorage.clear();
              localStorage.clear();
              
              // Call logout (don't await)
              logout().catch(err => console.error('Logout error:', err));
              
              // Force redirect immediately
              console.log('🔴 [LOGOUT] Redirecting to login...');
              window.location.href = '/admin/login';
            }}
            className={cn(
              "flex items-center w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors",
              isCollapsed ? "px-0 justify-center py-2" : "px-3 py-2"
            )}
          >
            <LogOutIcon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />

            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarNavigation;
