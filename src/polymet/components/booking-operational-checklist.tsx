import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  FileTextIcon,
  UsersIcon,
  MapPinIcon,
  CameraIcon,
  ShoppingBagIcon,
  MessageSquareIcon,
  DownloadIcon,
  CalendarIcon,
  UserCheckIcon,
} from "lucide-react";

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  completedBy?: string;
  completedDate?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high" | "urgent";
  notes?: string;
  attachments?: string[];
}

export interface BookingChecklistData {
  bookingId: string;
  packageName: string;
  departureDate: string;
  participantCount: number;

  // Booking Tasks
  bookingTasks: {
    accommodation: ChecklistItem;
    transportation: ChecklistItem;
    tourGuide: ChecklistItem;
    visaOthers: ChecklistItem;
  };

  // Documents/Management
  documentsManagement: {
    guidebook: ChecklistItem;
    preTourBriefing: ChecklistItem;
    taskChecklist: ChecklistItem;
    customerDetails: ChecklistItem;
    groupingTemplates: ChecklistItem;
    sharedAlbum: ChecklistItem;
    cashBills: ChecklistItem;
    merchandise: ChecklistItem;
    tourGuideAssignment: ChecklistItem;
    customerFeedback: ChecklistItem;
  };

  // Overall progress
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
}

interface BookingOperationalChecklistProps {
  bookingId: string;
  onChecklistUpdate?: (data: BookingChecklistData) => void;
  isReadOnly?: boolean;
}

export function BookingOperationalChecklist({
  bookingId,
  onChecklistUpdate,
  isReadOnly = false,
}: BookingOperationalChecklistProps) {
  const [checklistData, setChecklistData] =
    useState<BookingChecklistData | null>(null);
  const [activeTab, setActiveTab] = useState("booking");

  // Initialize checklist data
  useEffect(() => {
    // In real implementation, fetch data based on bookingId
    const mockData: BookingChecklistData = {
      bookingId: bookingId,
      packageName: "Magical Turkey Adventure",
      departureDate: "2024-08-15",
      participantCount: 4,

      bookingTasks: {
        accommodation: {
          id: "acc_001",
          title: "Accommodation Booking",
          description: "Book hotels and confirm room allocations",
          isCompleted: true,
          completedBy: "Sarah Johnson",
          completedDate: "2024-03-15",
          dueDate: "2024-07-15",
          priority: "high",
          notes:
            "Booked 2 twin rooms at Sultanahmet Hotel. Confirmation #HTL2024001",
        },
        transportation: {
          id: "trans_001",
          title: "Transportation Arrangement",
          description: "Arrange airport transfers and local transportation",
          isCompleted: false,
          dueDate: "2024-07-20",
          priority: "high",
          notes: "Pending confirmation from transport partner",
        },
        tourGuide: {
          id: "guide_001",
          title: "Tour Guide Assignment",
          description: "Assign and brief tour guide for the trip",
          isCompleted: false,
          dueDate: "2024-07-25",
          priority: "medium",
        },
        visaOthers: {
          id: "visa_001",
          title: "Visa & Other Requirements",
          description: "Check visa requirements and other travel documents",
          isCompleted: true,
          completedBy: "Ahmad Rahman",
          completedDate: "2024-03-10",
          priority: "urgent",
          notes:
            "All participants have valid passports. No visa required for Malaysian citizens.",
        },
      },

      documentsManagement: {
        guidebook: {
          id: "guide_book_001",
          title: "Guidebook Preparation",
          description: "Prepare and distribute travel guidebook",
          isCompleted: false,
          dueDate: "2024-08-01",
          priority: "medium",
        },
        preTourBriefing: {
          id: "briefing_001",
          title: "Pre-Tour Briefing",
          description: "Conduct pre-departure briefing session",
          isCompleted: false,
          dueDate: "2024-08-10",
          priority: "high",
        },
        taskChecklist: {
          id: "task_check_001",
          title: "Task Checklist Review",
          description: "Final review of all operational tasks",
          isCompleted: false,
          dueDate: "2024-08-12",
          priority: "high",
        },
        customerDetails: {
          id: "cust_details_001",
          title: "Customer Details Management",
          description: "Organize flights, room lists, and customer information",
          isCompleted: true,
          completedBy: "Emily Chen",
          completedDate: "2024-03-20",
          priority: "high",
          notes: "Flight details updated, room list prepared",
        },
        groupingTemplates: {
          id: "group_temp_001",
          title: "Grouping Templates",
          description: "Create group arrangements and seating plans",
          isCompleted: false,
          dueDate: "2024-08-05",
          priority: "medium",
        },
        sharedAlbum: {
          id: "album_001",
          title: "Shared Album Setup",
          description: "Set up shared photo album for the trip",
          isCompleted: false,
          dueDate: "2024-08-14",
          priority: "low",
        },
        cashBills: {
          id: "cash_001",
          title: "Cash Bills Management",
          description: "Prepare cash requirements and bill tracking",
          isCompleted: false,
          dueDate: "2024-08-13",
          priority: "medium",
        },
        merchandise: {
          id: "merch_001",
          title: "Merchandise Preparation",
          description: "Prepare travel merchandise and souvenirs",
          isCompleted: false,
          dueDate: "2024-08-08",
          priority: "low",
        },
        tourGuideAssignment: {
          id: "guide_assign_001",
          title: "Tour Guide Final Assignment",
          description: "Final confirmation and briefing of tour guide",
          isCompleted: false,
          dueDate: "2024-08-12",
          priority: "high",
        },
        customerFeedback: {
          id: "feedback_001",
          title: "Customer Feedback System",
          description: "Set up post-trip feedback collection",
          isCompleted: false,
          dueDate: "2024-08-20",
          priority: "low",
        },
      },

      totalTasks: 0,
      completedTasks: 0,
      completionPercentage: 0,
    };

    // Calculate totals
    const allTasks = [
      ...Object.values(mockData.bookingTasks),
      ...Object.values(mockData.documentsManagement),
    ];

    mockData.totalTasks = allTasks.length;
    mockData.completedTasks = allTasks.filter(
      (task) => task.isCompleted
    ).length;
    mockData.completionPercentage =
      (mockData.completedTasks / mockData.totalTasks) * 100;

    setChecklistData(mockData);
  }, [bookingId]);

  // Update parent component when data changes
  useEffect(() => {
    if (checklistData && onChecklistUpdate) {
      onChecklistUpdate(checklistData);
    }
  }, [checklistData, onChecklistUpdate]);

  const updateTaskStatus = (
    category: keyof BookingChecklistData,
    taskKey: string,
    isCompleted: boolean
  ) => {
    if (isReadOnly || !checklistData) return;

    setChecklistData((prev) => {
      if (!prev) return null;

      const updatedData = { ...prev };
      const task = (updatedData[category] as any)[taskKey];

      if (task) {
        task.isCompleted = isCompleted;
        if (isCompleted) {
          task.completedBy = "Current User"; // In real app, get from auth context
          task.completedDate = new Date().toISOString().split("T")[0];
        } else {
          task.completedBy = undefined;
          task.completedDate = undefined;
        }
      }

      // Recalculate totals
      const allTasks = [
        ...Object.values(updatedData.bookingTasks),
        ...Object.values(updatedData.documentsManagement),
      ];

      updatedData.completedTasks = allTasks.filter((t) => t.isCompleted).length;
      updatedData.completionPercentage =
        (updatedData.completedTasks / updatedData.totalTasks) * 100;

      return updatedData;
    });
  };

  const updateTaskNotes = (
    category: keyof BookingChecklistData,
    taskKey: string,
    notes: string
  ) => {
    if (isReadOnly || !checklistData) return;

    setChecklistData((prev) => {
      if (!prev) return null;

      const updatedData = { ...prev };
      const task = (updatedData[category] as any)[taskKey];

      if (task) {
        task.notes = notes;
      }

      return updatedData;
    });
  };

  const getPriorityColor = (priority: ChecklistItem["priority"]) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return colors[priority];
  };

  const getTaskIcon = (taskId: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      acc_001: MapPinIcon,
      trans_001: MapPinIcon,
      guide_001: UserCheckIcon,
      visa_001: FileTextIcon,
      guide_book_001: FileTextIcon,
      briefing_001: MessageSquareIcon,
      task_check_001: CheckCircleIcon,
      cust_details_001: UsersIcon,
      group_temp_001: UsersIcon,
      album_001: CameraIcon,
      cash_001: FileTextIcon,
      merch_001: ShoppingBagIcon,
      guide_assign_001: UserCheckIcon,
      feedback_001: MessageSquareIcon,
    };
    return icons[taskId] || CheckCircleIcon;
  };

  const renderTaskItem = (
    task: ChecklistItem,
    category: keyof BookingChecklistData,
    taskKey: string
  ) => {
    const Icon = getTaskIcon(task.id);
    const isOverdue =
      task.dueDate && new Date(task.dueDate) < new Date() && !task.isCompleted;

    return (
      <Card
        key={task.id}
        className={`${task.isCompleted ? "bg-green-50 border-green-200" : isOverdue ? "bg-red-50 border-red-200" : ""}`}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Task Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Checkbox
                  checked={task.isCompleted}
                  onCheckedChange={(checked) =>
                    updateTaskStatus(category, taskKey, checked as boolean)
                  }
                  disabled={isReadOnly}
                  className="mt-1"
                />

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className="h-4 w-4 text-muted-foreground" />

                    <h4
                      className={`font-medium ${task.isCompleted ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </h4>
                  </div>

                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={getPriorityColor(task.priority)}
                >
                  {task.priority}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive">
                    <AlertTriangleIcon className="h-3 w-3 mr-1" />
                    Overdue
                  </Badge>
                )}
              </div>
            </div>

            {/* Task Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
              {task.dueDate && (
                <div className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}

              {task.completedBy && (
                <div className="flex items-center">
                  <UserCheckIcon className="h-3 w-3 mr-1" />
                  By: {task.completedBy}
                </div>
              )}

              {task.completedDate && (
                <div className="flex items-center">
                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                  Completed: {new Date(task.completedDate).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <Label
                htmlFor={`notes-${task.id}`}
                className="text-sm font-medium"
              >
                Notes
              </Label>
              <Textarea
                id={`notes-${task.id}`}
                value={task.notes || ""}
                onChange={(e) =>
                  updateTaskNotes(category, taskKey, e.target.value)
                }
                placeholder="Add notes or comments..."
                disabled={isReadOnly}
                rows={2}
                className="text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!checklistData) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />

          <p className="text-muted-foreground">
            Loading operational checklist...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Operational Checklist</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {checklistData.packageName} - {checklistData.participantCount}{" "}
                participants
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {checklistData.completedTasks} / {checklistData.totalTasks}
              </div>
              <p className="text-sm text-muted-foreground">Tasks Complete</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{checklistData.completionPercentage.toFixed(1)}%</span>
            </div>
            <Progress
              value={checklistData.completionPercentage}
              className="h-2"
            />
          </div>

          {checklistData.completionPercentage === 100 && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />

              <AlertDescription className="text-green-800">
                All operational tasks have been completed! The booking is ready
                for departure.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Checklist Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="booking">
            Booking Tasks
            <Badge variant="secondary" className="ml-2">
              {
                Object.values(checklistData.bookingTasks).filter(
                  (t) => t.isCompleted
                ).length
              }{" "}
              / {Object.values(checklistData.bookingTasks).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="documents">
            Documents & Management
            <Badge variant="secondary" className="ml-2">
              {
                Object.values(checklistData.documentsManagement).filter(
                  (t) => t.isCompleted
                ).length
              }{" "}
              / {Object.values(checklistData.documentsManagement).length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Booking Tasks Tab */}
        <TabsContent value="booking" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(checklistData.bookingTasks).map(([key, task]) =>
              renderTaskItem(task, "bookingTasks", key)
            )}
          </div>
        </TabsContent>

        {/* Documents & Management Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(checklistData.documentsManagement).map(
              ([key, task]) => renderTaskItem(task, "documentsManagement", key)
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      {!isReadOnly && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export Checklist
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default BookingOperationalChecklist;
