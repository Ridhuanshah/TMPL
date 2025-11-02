import React from "react";
import { Info, Shield, Users, Package, Calendar, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roleDescriptions } from "@/polymet/data/user-data";

interface RolePermissionsInfoProps {
  selectedRole?: string;
  className?: string;
}

export function RolePermissionsInfo({
  selectedRole,
  className = "",
}: RolePermissionsInfoProps) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Shield;
      case "sales_marketing":
        return Package;
      case "booking_reservation":
        return Calendar;
      case "tour_guide":
        return MapPin;
      case "customer":
        return Users;
      default:
        return Info;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "sales_marketing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "booking_reservation":
        return "bg-green-100 text-green-800 border-green-200";
      case "tour_guide":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "customer":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (
    !selectedRole ||
    !roleDescriptions[selectedRole as keyof typeof roleDescriptions]
  ) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <Info className="h-4 w-4 mr-2" />
            Role Permissions
          </CardTitle>
          <CardDescription>
            Select a role to view its permissions and responsibilities
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const roleInfo =
    roleDescriptions[selectedRole as keyof typeof roleDescriptions];
  const IconComponent = getRoleIcon(selectedRole);

  return (
    <Card className={`${className} ${getRoleColor(selectedRole)}`}>
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <IconComponent className="h-4 w-4 mr-2" />
          {roleInfo.name} Permissions
        </CardTitle>
        <CardDescription className="text-xs">
          What this role can access and manage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {roleInfo.permissions.map((permission, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />

              <p className="text-xs leading-relaxed">{permission}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RolePermissionsInfo;
