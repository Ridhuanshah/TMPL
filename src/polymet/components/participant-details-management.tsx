import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  UserIcon,
  PlusIcon,
  MinusIcon,
  DownloadIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UsersIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";

export interface ParticipantDetail {
  id: string;
  country: string;
  fullName: string;
  address: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: string;
  passportNumber?: string;
  passportExpiry?: string;
  dietaryRequirements?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  isMainBooker: boolean;
}

export interface ParticipantDetailsData {
  participants: ParticipantDetail[];
  totalParticipants: number;
  isComplete: boolean;
}

interface ParticipantDetailsManagementProps {
  bookingId?: string;
  initialParticipantCount: number;
  onParticipantsChange: (data: ParticipantDetailsData) => void;
  errors?: Record<string, string>;
  isAdminView?: boolean;
  isReadOnly?: boolean;
}

export function ParticipantDetailsManagement({
  bookingId,
  initialParticipantCount,
  onParticipantsChange,
  errors = {},
  isAdminView = false,
  isReadOnly = false,
}: ParticipantDetailsManagementProps) {
  const [participants, setParticipants] = useState<ParticipantDetail[]>([]);
  const [participantCount, setParticipantCount] = useState(
    initialParticipantCount
  );

  // Initialize participants based on count
  useEffect(() => {
    const newParticipants: ParticipantDetail[] = [];

    for (let i = 0; i < participantCount; i++) {
      const existingParticipant = participants[i];

      newParticipants.push({
        id: existingParticipant?.id || `participant_${i + 1}`,
        country: existingParticipant?.country || "",
        fullName: existingParticipant?.fullName || "",
        address: existingParticipant?.address || "",
        email: existingParticipant?.email || "",
        phoneNumber: existingParticipant?.phoneNumber || "",
        dateOfBirth: existingParticipant?.dateOfBirth || "",
        passportNumber: existingParticipant?.passportNumber || "",
        passportExpiry: existingParticipant?.passportExpiry || "",
        dietaryRequirements: existingParticipant?.dietaryRequirements || "",
        emergencyContact: existingParticipant?.emergencyContact || {
          name: "",
          relationship: "",
          phone: "",
        },
        isMainBooker: i === 0,
      });
    }

    setParticipants(newParticipants);
  }, [participantCount]);

  // Update parent component when participants change
  useEffect(() => {
    const isComplete = participants.every(
      (p) =>
        p.fullName.trim() !== "" &&
        p.email.trim() !== "" &&
        p.phoneNumber.trim() !== "" &&
        p.country.trim() !== "" &&
        p.address.trim() !== ""
    );

    const data: ParticipantDetailsData = {
      participants,
      totalParticipants: participants.length,
      isComplete,
    };

    onParticipantsChange(data);
  }, [participants, onParticipantsChange]);

  const updateParticipant = (
    index: number,
    field: keyof ParticipantDetail,
    value: any
  ) => {
    setParticipants((prev) =>
      prev.map((participant, i) =>
        i === index ? { ...participant, [field]: value } : participant
      )
    );
  };

  const updateEmergencyContact = (
    index: number,
    field: keyof ParticipantDetail["emergencyContact"],
    value: string
  ) => {
    setParticipants((prev) =>
      prev.map((participant, i) =>
        i === index
          ? {
              ...participant,
              emergencyContact: {
                ...participant.emergencyContact!,
                [field]: value,
              },
            }
          : participant
      )
    );
  };

  const addParticipant = () => {
    const newParticipant: ParticipantDetail = {
      id: `participant_${participants.length + 1}`,
      country: "",
      fullName: "",
      address: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      passportNumber: "",
      passportExpiry: "",
      dietaryRequirements: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
      isMainBooker: false,
    };

    setParticipants((prev) => [...prev, newParticipant]);
    setParticipantCount((prev) => prev + 1);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1 && !participants[index].isMainBooker) {
      setParticipants((prev) => prev.filter((_, i) => i !== index));
      setParticipantCount((prev) => prev - 1);
    }
  };

  const exportParticipantData = () => {
    const csvContent = [
      // CSV Header
      [
        "Participant ID",
        "Full Name",
        "Email",
        "Phone",
        "Country",
        "Address",
        "Date of Birth",
        "Passport Number",
        "Passport Expiry",
        "Dietary Requirements",
        "Emergency Contact Name",
        "Emergency Contact Relationship",
        "Emergency Contact Phone",
        "Is Main Booker",
      ].join(","),
      // CSV Data
      ...participants.map((p) =>
        [
          p.id,
          `"${p.fullName}"`,
          p.email,
          p.phoneNumber,
          `"${p.country}"`,
          `"${p.address}"`,
          p.dateOfBirth || "",
          p.passportNumber || "",
          p.passportExpiry || "",
          `"${p.dietaryRequirements || ""}"`,
          `"${p.emergencyContact?.name || ""}"`,
          `"${p.emergencyContact?.relationship || ""}"`,
          p.emergencyContact?.phone || "",
          p.isMainBooker ? "Yes" : "No",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `participants_${bookingId || "booking"}_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getCompletionStatus = () => {
    const completed = participants.filter(
      (p) =>
        p.fullName.trim() !== "" &&
        p.email.trim() !== "" &&
        p.phoneNumber.trim() !== "" &&
        p.country.trim() !== "" &&
        p.address.trim() !== ""
    ).length;

    return { completed, total: participants.length };
  };

  const completionStatus = getCompletionStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <UsersIcon className="h-5 w-5 mr-2" />
              Participant Details
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={
                  completionStatus.completed === completionStatus.total
                    ? "default"
                    : "secondary"
                }
              >
                {completionStatus.completed} / {completionStatus.total} Complete
              </Badge>
              {isAdminView && participants.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportParticipantData}
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Please provide details for all participants. The main booker
              information is required.
            </p>
            {!isReadOnly && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={addParticipant}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Participant
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Participant Forms */}
      <div className="space-y-4">
        {participants.map((participant, index) => {
          const participantErrors = Object.keys(errors).filter((key) =>
            key.startsWith(`participant_${index}`)
          );

          const isComplete =
            participant.fullName.trim() !== "" &&
            participant.email.trim() !== "" &&
            participant.phoneNumber.trim() !== "" &&
            participant.country.trim() !== "" &&
            participant.address.trim() !== "";

          return (
            <Card
              key={participant.id}
              className={isComplete ? "border-green-200" : ""}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Participant {index + 1}
                    {participant.isMainBooker && (
                      <Badge variant="default" className="ml-2">
                        Main Booker
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {isComplete && (
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    )}
                    {!isReadOnly &&
                      !participant.isMainBooker &&
                      participants.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeParticipant(index)}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                      )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`fullName_${index}`}>Full Name *</Label>
                    <Input
                      id={`fullName_${index}`}
                      value={participant.fullName}
                      onChange={(e) =>
                        updateParticipant(index, "fullName", e.target.value)
                      }
                      placeholder="Enter full name as per passport"
                      disabled={isReadOnly}
                      className={
                        errors[`participant_${index}_fullName`]
                          ? "border-red-500"
                          : ""
                      }
                    />

                    {errors[`participant_${index}_fullName`] && (
                      <p className="text-sm text-red-600">
                        {errors[`participant_${index}_fullName`]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`country_${index}`}>Country *</Label>
                    <Input
                      id={`country_${index}`}
                      value={participant.country}
                      onChange={(e) =>
                        updateParticipant(index, "country", e.target.value)
                      }
                      placeholder="Enter country of residence"
                      disabled={isReadOnly}
                      className={
                        errors[`participant_${index}_country`]
                          ? "border-red-500"
                          : ""
                      }
                    />

                    {errors[`participant_${index}_country`] && (
                      <p className="text-sm text-red-600">
                        {errors[`participant_${index}_country`]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`email_${index}`}>Email Address *</Label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                      <Input
                        id={`email_${index}`}
                        type="email"
                        value={participant.email}
                        onChange={(e) =>
                          updateParticipant(index, "email", e.target.value)
                        }
                        placeholder="Enter email address"
                        disabled={isReadOnly}
                        className={`pl-10 ${errors[`participant_${index}_email`] ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors[`participant_${index}_email`] && (
                      <p className="text-sm text-red-600">
                        {errors[`participant_${index}_email`]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`phoneNumber_${index}`}>
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                      <Input
                        id={`phoneNumber_${index}`}
                        value={participant.phoneNumber}
                        onChange={(e) =>
                          updateParticipant(
                            index,
                            "phoneNumber",
                            e.target.value
                          )
                        }
                        placeholder="Enter phone number with country code"
                        disabled={isReadOnly}
                        className={`pl-10 ${errors[`participant_${index}_phoneNumber`] ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors[`participant_${index}_phoneNumber`] && (
                      <p className="text-sm text-red-600">
                        {errors[`participant_${index}_phoneNumber`]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`address_${index}`}>Address *</Label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Textarea
                      id={`address_${index}`}
                      value={participant.address}
                      onChange={(e) =>
                        updateParticipant(index, "address", e.target.value)
                      }
                      placeholder="Enter complete address"
                      disabled={isReadOnly}
                      className={`pl-10 ${errors[`participant_${index}_address`] ? "border-red-500" : ""}`}
                      rows={2}
                    />
                  </div>
                  {errors[`participant_${index}_address`] && (
                    <p className="text-sm text-red-600">
                      {errors[`participant_${index}_address`]}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">
                    Additional Information (Optional)
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`dateOfBirth_${index}`}>
                        Date of Birth
                      </Label>
                      <Input
                        id={`dateOfBirth_${index}`}
                        type="date"
                        value={participant.dateOfBirth}
                        onChange={(e) =>
                          updateParticipant(
                            index,
                            "dateOfBirth",
                            e.target.value
                          )
                        }
                        disabled={isReadOnly}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`passportNumber_${index}`}>
                        Passport Number
                      </Label>
                      <Input
                        id={`passportNumber_${index}`}
                        value={participant.passportNumber}
                        onChange={(e) =>
                          updateParticipant(
                            index,
                            "passportNumber",
                            e.target.value
                          )
                        }
                        placeholder="Enter passport number"
                        disabled={isReadOnly}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`passportExpiry_${index}`}>
                        Passport Expiry
                      </Label>
                      <Input
                        id={`passportExpiry_${index}`}
                        type="date"
                        value={participant.passportExpiry}
                        onChange={(e) =>
                          updateParticipant(
                            index,
                            "passportExpiry",
                            e.target.value
                          )
                        }
                        disabled={isReadOnly}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dietaryRequirements_${index}`}>
                      Dietary Requirements / Special Needs
                    </Label>
                    <Textarea
                      id={`dietaryRequirements_${index}`}
                      value={participant.dietaryRequirements}
                      onChange={(e) =>
                        updateParticipant(
                          index,
                          "dietaryRequirements",
                          e.target.value
                        )
                      }
                      placeholder="Enter any dietary requirements, allergies, or special needs"
                      disabled={isReadOnly}
                      rows={2}
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-sm">Emergency Contact</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`emergencyName_${index}`}>
                          Contact Name
                        </Label>
                        <Input
                          id={`emergencyName_${index}`}
                          value={participant.emergencyContact?.name || ""}
                          onChange={(e) =>
                            updateEmergencyContact(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Emergency contact name"
                          disabled={isReadOnly}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`emergencyRelationship_${index}`}>
                          Relationship
                        </Label>
                        <Input
                          id={`emergencyRelationship_${index}`}
                          value={
                            participant.emergencyContact?.relationship || ""
                          }
                          onChange={(e) =>
                            updateEmergencyContact(
                              index,
                              "relationship",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Spouse, Parent, Sibling"
                          disabled={isReadOnly}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`emergencyPhone_${index}`}>
                          Contact Phone
                        </Label>
                        <Input
                          id={`emergencyPhone_${index}`}
                          value={participant.emergencyContact?.phone || ""}
                          onChange={(e) =>
                            updateEmergencyContact(
                              index,
                              "phone",
                              e.target.value
                            )
                          }
                          placeholder="Emergency contact phone"
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Validation Summary */}
      {Object.keys(errors).some((key) => key.includes("participant_")) && (
        <Alert>
          <AlertCircleIcon className="h-4 w-4" />

          <AlertDescription>
            Please complete all required fields for all participants before
            proceeding.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default ParticipantDetailsManagement;
