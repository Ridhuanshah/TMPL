import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  UsersIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserPlusIcon,
  TrendingUpIcon,
  CalendarIcon,
} from "lucide-react";

export interface PackageInventory {
  packageId: string;
  packageName: string;
  maxQuota: number;
  confirmedBookings: number;
  pendingBookings: number;
  availableSeats: number;
  waitlistCount: number;
  bookingDates: {
    date: string;
    maxQuota: number;
    confirmedBookings: number;
    pendingBookings: number;
    availableSeats: number;
    waitlistCount: number;
  }[];
}

export interface WaitlistEntry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  requestedSeats: number;
  joinedDate: string;
  preferredDate?: string;
  status: "waiting" | "contacted" | "confirmed" | "expired";
  priority: number;
}

interface InventoryQuotaManagementProps {
  packageId: string;
  onInventoryUpdate?: (inventory: PackageInventory) => void;
  onWaitlistUpdate?: (waitlist: WaitlistEntry[]) => void;
  isAdminView?: boolean;
}

export function InventoryQuotaManagement({
  packageId,
  onInventoryUpdate,
  onWaitlistUpdate,
  isAdminView = false,
}: InventoryQuotaManagementProps) {
  const [inventory, setInventory] = useState<PackageInventory | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [requestedSeats, setRequestedSeats] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Mock data initialization
  useEffect(() => {
    // In real implementation, fetch inventory data based on packageId
    const mockInventory: PackageInventory = {
      packageId: packageId,
      packageName: "Magical Turkey Adventure",
      maxQuota: 20,
      confirmedBookings: 16,
      pendingBookings: 2,
      availableSeats: 2,
      waitlistCount: 5,
      bookingDates: [
        {
          date: "2024-07-15",
          maxQuota: 20,
          confirmedBookings: 18,
          pendingBookings: 1,
          availableSeats: 1,
          waitlistCount: 3,
        },
        {
          date: "2024-08-15",
          maxQuota: 20,
          confirmedBookings: 14,
          pendingBookings: 1,
          availableSeats: 5,
          waitlistCount: 2,
        },
        {
          date: "2024-09-15",
          maxQuota: 20,
          confirmedBookings: 16,
          pendingBookings: 2,
          availableSeats: 2,
          waitlistCount: 0,
        },
      ],
    };

    const mockWaitlist: WaitlistEntry[] = [
      {
        id: "wl_001",
        customerName: "John Smith",
        customerEmail: "john.smith@email.com",
        customerPhone: "+60123456789",
        requestedSeats: 2,
        joinedDate: "2024-03-10",
        preferredDate: "2024-07-15",
        status: "waiting",
        priority: 1,
      },
      {
        id: "wl_002",
        customerName: "Maria Garcia",
        customerEmail: "maria.garcia@email.com",
        customerPhone: "+60198765432",
        requestedSeats: 1,
        joinedDate: "2024-03-12",
        preferredDate: "2024-07-15",
        status: "contacted",
        priority: 2,
      },
      {
        id: "wl_003",
        customerName: "David Lee",
        customerEmail: "david.lee@email.com",
        customerPhone: "+60187654321",
        requestedSeats: 4,
        joinedDate: "2024-03-15",
        preferredDate: "2024-08-15",
        status: "waiting",
        priority: 3,
      },
    ];

    setInventory(mockInventory);
    setWaitlist(mockWaitlist);
    setSelectedDate(mockInventory.bookingDates[0]?.date || "");
  }, [packageId]);

  // Update parent components when data changes
  useEffect(() => {
    if (inventory && onInventoryUpdate) {
      onInventoryUpdate(inventory);
    }
  }, [inventory, onInventoryUpdate]);

  useEffect(() => {
    if (onWaitlistUpdate) {
      onWaitlistUpdate(waitlist);
    }
  }, [waitlist, onWaitlistUpdate]);

  const handleJoinWaitlist = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return;
    }

    const newEntry: WaitlistEntry = {
      id: `wl_${Date.now()}`,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      requestedSeats: requestedSeats,
      joinedDate: new Date().toISOString().split("T")[0],
      preferredDate: selectedDate,
      status: "waiting",
      priority: waitlist.length + 1,
    };

    setWaitlist((prev) => [...prev, newEntry]);

    // Update inventory waitlist count
    if (inventory) {
      setInventory((prev) =>
        prev
          ? {
              ...prev,
              waitlistCount: prev.waitlistCount + 1,
              bookingDates: prev.bookingDates.map((date) =>
                date.date === selectedDate
                  ? { ...date, waitlistCount: date.waitlistCount + 1 }
                  : date
              ),
            }
          : null
      );
    }

    // Reset form
    setCustomerInfo({ name: "", email: "", phone: "" });
    setRequestedSeats(1);
  };

  const handleWaitlistStatusUpdate = (
    entryId: string,
    newStatus: WaitlistEntry["status"]
  ) => {
    setWaitlist((prev) =>
      prev.map((entry) =>
        entry.id === entryId ? { ...entry, status: newStatus } : entry
      )
    );
  };

  const getSelectedDateInventory = () => {
    if (!inventory || !selectedDate) return null;
    return inventory.bookingDates.find((date) => date.date === selectedDate);
  };

  const getOccupancyPercentage = (
    confirmed: number,
    pending: number,
    max: number
  ) => {
    return ((confirmed + pending) / max) * 100;
  };

  const getAvailabilityStatus = (availableSeats: number, maxQuota: number) => {
    const percentage = (availableSeats / maxQuota) * 100;
    if (percentage === 0)
      return { status: "full", color: "bg-red-500", text: "Fully Booked" };
    if (percentage <= 20)
      return { status: "low", color: "bg-orange-500", text: "Almost Full" };
    if (percentage <= 50)
      return {
        status: "medium",
        color: "bg-yellow-500",
        text: "Limited Seats",
      };
    return { status: "available", color: "bg-green-500", text: "Available" };
  };

  if (!inventory) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />

          <p className="text-muted-foreground">
            Loading inventory information...
          </p>
        </CardContent>
      </Card>
    );
  }

  const selectedDateData = getSelectedDateInventory();
  const isFullyBooked = selectedDateData
    ? selectedDateData.availableSeats === 0
    : inventory.availableSeats === 0;
  const availabilityStatus = selectedDateData
    ? getAvailabilityStatus(
        selectedDateData.availableSeats,
        selectedDateData.maxQuota
      )
    : getAvailabilityStatus(inventory.availableSeats, inventory.maxQuota);

  return (
    <div className="space-y-6">
      {/* Overall Package Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UsersIcon className="h-5 w-5 mr-2" />
            Package Inventory Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{inventory.maxQuota}</div>
              <div className="text-sm text-muted-foreground">Max Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {inventory.confirmedBookings}
              </div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {inventory.pendingBookings}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {inventory.availableSeats}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Occupancy Rate</span>
              <span>
                {getOccupancyPercentage(
                  inventory.confirmedBookings,
                  inventory.pendingBookings,
                  inventory.maxQuota
                ).toFixed(1)}
                %
              </span>
            </div>
            <Progress
              value={getOccupancyPercentage(
                inventory.confirmedBookings,
                inventory.pendingBookings,
                inventory.maxQuota
              )}
              className="h-2"
            />
          </div>

          {inventory.waitlistCount > 0 && (
            <Alert>
              <ClockIcon className="h-4 w-4" />

              <AlertDescription>
                {inventory.waitlistCount} customers are on the waitlist for this
                package.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Date-Specific Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Date-Specific Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Departure Date</Label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              {inventory.bookingDates.map((date) => (
                <option key={date.date} value={date.date}>
                  {new Date(date.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </div>

          {selectedDateData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
                <Badge className={`${availabilityStatus.color} text-white`}>
                  {availabilityStatus.text}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold">
                    {selectedDateData.maxQuota}
                  </div>
                  <div className="text-xs text-muted-foreground">Capacity</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {selectedDateData.confirmedBookings}
                  </div>
                  <div className="text-xs text-muted-foreground">Confirmed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">
                    {selectedDateData.pendingBookings}
                  </div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">
                    {selectedDateData.availableSeats}
                  </div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
              </div>

              <Progress
                value={getOccupancyPercentage(
                  selectedDateData.confirmedBookings,
                  selectedDateData.pendingBookings,
                  selectedDateData.maxQuota
                )}
                className="h-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Waitlist Management */}
      {isFullyBooked && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlusIcon className="h-5 w-5 mr-2" />
              Join Waitlist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangleIcon className="h-4 w-4" />

              <AlertDescription>
                This departure date is fully booked. You can join the waitlist
                to be notified if seats become available.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Full Name *</Label>
                <Input
                  id="customer-name"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-email">Email *</Label>
                <Input
                  id="customer-email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-phone">Phone Number *</Label>
                <Input
                  id="customer-phone"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requested-seats">Number of Seats</Label>
                <Input
                  id="requested-seats"
                  type="number"
                  min="1"
                  max="8"
                  value={requestedSeats}
                  onChange={(e) =>
                    setRequestedSeats(parseInt(e.target.value) || 1)
                  }
                />
              </div>
            </div>

            <Button
              onClick={handleJoinWaitlist}
              disabled={
                !customerInfo.name || !customerInfo.email || !customerInfo.phone
              }
              className="w-full"
            >
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Join Waitlist
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Waitlist Display (Admin View) */}
      {isAdminView && waitlist.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-2" />
                Waitlist Management
              </div>
              <Badge variant="secondary">{waitlist.length} entries</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {waitlist.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{entry.customerName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {entry.customerEmail}
                      </p>
                    </div>
                    <Badge
                      variant={
                        entry.status === "confirmed"
                          ? "default"
                          : entry.status === "contacted"
                            ? "secondary"
                            : entry.status === "expired"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {entry.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground mb-3">
                    <div>Phone: {entry.customerPhone}</div>
                    <div>Seats: {entry.requestedSeats}</div>
                    <div>
                      Joined: {new Date(entry.joinedDate).toLocaleDateString()}
                    </div>
                    <div>Priority: #{entry.priority}</div>
                  </div>

                  {entry.preferredDate && (
                    <div className="text-sm text-muted-foreground mb-3">
                      Preferred Date:{" "}
                      {new Date(entry.preferredDate).toLocaleDateString()}
                    </div>
                  )}

                  {isAdminView && entry.status === "waiting" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleWaitlistStatusUpdate(entry.id, "contacted")
                        }
                      >
                        Mark as Contacted
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleWaitlistStatusUpdate(entry.id, "confirmed")
                        }
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default InventoryQuotaManagement;
