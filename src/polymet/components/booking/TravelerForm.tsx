import { useState } from 'react';
import { User, Mail, Phone, CreditCard, MapPin, Calendar as CalendarIcon, Heart, Copy, ChevronDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../components/ui/collapsible';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../lib/utils';
import type { TravelerInfo } from '../../types/booking.types';
import { NATIONALITIES, EMERGENCY_RELATIONS } from '../../types/booking.types';

interface TravelerFormProps {
  traveler: TravelerInfo;
  index: number;
  totalTravelers: number;
  onUpdate: (index: number, data: Partial<TravelerInfo>) => void;
  onCopyFrom?: (fromIndex: number, toIndex: number) => void;
  errors?: Partial<Record<keyof TravelerInfo, string>>;
}

export function TravelerForm({
  traveler,
  index,
  totalTravelers,
  onUpdate,
  onCopyFrom,
  errors = {},
}: TravelerFormProps) {
  const [isOpen, setIsOpen] = useState(index === 0); // First traveler open by default
  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (field: keyof TravelerInfo, value: any) => {
    onUpdate(index, { [field]: value });
  };

  const handleCopyFrom = (fromIndex: number) => {
    if (onCopyFrom) {
      onCopyFrom(fromIndex, index);
    }
  };

  const isComplete = traveler.first_name && traveler.last_name && traveler.email && traveler.phone;

  return (
    <Card className={cn('transition-all', isOpen && 'ring-2 ring-blue-500')}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                  isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                )}>
                  {index + 1}
                </div>
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {traveler.first_name && traveler.last_name
                      ? `${traveler.first_name} ${traveler.last_name}`
                      : `Traveler ${index + 1}`}
                    {traveler.is_lead_traveler && (
                      <Badge variant="default" className="text-xs">Lead</Badge>
                    )}
                  </CardTitle>
                  {isComplete && !isOpen && (
                    <p className="text-sm text-gray-500">{traveler.email}</p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={cn('w-5 h-5 text-gray-500 transition-transform', isOpen && 'transform rotate-180')}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
            {/* Copy from previous traveler */}
            {index > 0 && onCopyFrom && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-900">
                    Save time by copying details from another traveler
                  </p>
                  <Select onValueChange={(value) => handleCopyFrom(parseInt(value))}>
                    <SelectTrigger className="w-[200px]">
                      <Copy className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Copy from..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: index }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          Traveler {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor={`first-name-${index}`}>
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`first-name-${index}`}
                    value={traveler.first_name}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    placeholder="John"
                    className={errors.first_name ? 'border-red-500' : ''}
                  />
                  {errors.first_name && (
                    <p className="text-xs text-red-500">{errors.first_name}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor={`last-name-${index}`}>
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`last-name-${index}`}
                    value={traveler.last_name}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                    placeholder="Doe"
                    className={errors.last_name ? 'border-red-500' : ''}
                  />
                  {errors.last_name && (
                    <p className="text-xs text-red-500">{errors.last_name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor={`email-${index}`}>
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={traveler.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john.doe@example.com"
                      className={cn('pl-10', errors.email && 'border-red-500')}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor={`phone-${index}`}>
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id={`phone-${index}`}
                      type="tel"
                      value={traveler.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+60 12-345 6789"
                      className={cn('pl-10', errors.phone && 'border-red-500')}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* IC/Passport Number */}
                <div className="space-y-2">
                  <Label htmlFor={`ic-${index}`}>
                    IC/Passport Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id={`ic-${index}`}
                      value={traveler.ic_number}
                      onChange={(e) => handleChange('ic_number', e.target.value)}
                      placeholder="123456-78-9012"
                      className={cn('pl-10', errors.ic_number && 'border-red-500')}
                    />
                  </div>
                  {errors.ic_number && (
                    <p className="text-xs text-red-500">{errors.ic_number}</p>
                  )}
                </div>

                {/* Nationality */}
                <div className="space-y-2">
                  <Label htmlFor={`nationality-${index}`}>
                    Nationality <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={traveler.nationality}
                    onValueChange={(value) => handleChange('nationality', value)}
                  >
                    <SelectTrigger className={errors.nationality ? 'border-red-500' : ''}>
                      <MapPin className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {NATIONALITIES.map((nat) => (
                        <SelectItem key={nat} value={nat}>
                          {nat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.nationality && (
                    <p className="text-xs text-red-500">{errors.nationality}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor={`dob-${index}`}>
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id={`dob-${index}`}
                      type="date"
                      value={traveler.date_of_birth}
                      onChange={(e) => handleChange('date_of_birth', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className={cn('pl-10', errors.date_of_birth && 'border-red-500')}
                    />
                  </div>
                  {errors.date_of_birth && (
                    <p className="text-xs text-red-500">{errors.date_of_birth}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor={`gender-${index}`}>
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={traveler.gender}
                    onValueChange={(value: 'male' | 'female' | 'other') => handleChange('gender', value)}
                  >
                    <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-xs text-red-500">{errors.gender}</p>
                  )}
                </div>

                {/* Passport Number */}
                <div className="space-y-2">
                  <Label htmlFor={`passport-${index}`}>
                    Passport Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`passport-${index}`}
                    value={traveler.passport_number}
                    onChange={(e) => handleChange('passport_number', e.target.value)}
                    placeholder="A12345678"
                    className={errors.passport_number ? 'border-red-500' : ''}
                  />
                  {errors.passport_number && (
                    <p className="text-xs text-red-500">{errors.passport_number}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Emergency Contact
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Emergency Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor={`emergency-name-${index}`}>
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`emergency-name-${index}`}
                    value={traveler.emergency_contact_name}
                    onChange={(e) => handleChange('emergency_contact_name', e.target.value)}
                    placeholder="Jane Doe"
                    className={errors.emergency_contact_name ? 'border-red-500' : ''}
                  />
                  {errors.emergency_contact_name && (
                    <p className="text-xs text-red-500">{errors.emergency_contact_name}</p>
                  )}
                </div>

                {/* Emergency Contact Relation */}
                <div className="space-y-2">
                  <Label htmlFor={`emergency-relation-${index}`}>
                    Relationship <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={traveler.emergency_contact_relation}
                    onValueChange={(value) => handleChange('emergency_contact_relation', value)}
                  >
                    <SelectTrigger className={errors.emergency_contact_relation ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMERGENCY_RELATIONS.map((rel) => (
                        <SelectItem key={rel} value={rel}>
                          {rel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.emergency_contact_relation && (
                    <p className="text-xs text-red-500">{errors.emergency_contact_relation}</p>
                  )}
                </div>

                {/* Emergency Contact Phone */}
                <div className="space-y-2">
                  <Label htmlFor={`emergency-phone-${index}`}>
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`emergency-phone-${index}`}
                    type="tel"
                    value={traveler.emergency_contact_phone}
                    onChange={(e) => handleChange('emergency_contact_phone', e.target.value)}
                    placeholder="+60 12-345 6789"
                    className={errors.emergency_contact_phone ? 'border-red-500' : ''}
                  />
                  {errors.emergency_contact_phone && (
                    <p className="text-xs text-red-500">{errors.emergency_contact_phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Optional Fields */}
            <div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowOptional(!showOptional)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {showOptional ? '− Hide' : '+ Show'} Optional Information
              </Button>

              {showOptional && (
                <div className="mt-4 space-y-4 border-t pt-4">
                  {/* Passport Expiry */}
                  <div className="space-y-2">
                    <Label htmlFor={`passport-expiry-${index}`}>Passport Expiry Date</Label>
                    <Input
                      id={`passport-expiry-${index}`}
                      type="date"
                      value={traveler.passport_expiry || ''}
                      onChange={(e) => handleChange('passport_expiry', e.target.value)}
                    />
                  </div>

                  {/* Dietary Requirements */}
                  <div className="space-y-2">
                    <Label htmlFor={`dietary-${index}`}>Dietary Requirements</Label>
                    <Textarea
                      id={`dietary-${index}`}
                      value={traveler.dietary_requirements || ''}
                      onChange={(e) => handleChange('dietary_requirements', e.target.value)}
                      placeholder="e.g., Vegetarian, Halal, Allergies..."
                      rows={2}
                      maxLength={500}
                    />
                  </div>

                  {/* Medical Conditions */}
                  <div className="space-y-2">
                    <Label htmlFor={`medical-${index}`}>Medical Conditions</Label>
                    <Textarea
                      id={`medical-${index}`}
                      value={traveler.medical_conditions || ''}
                      onChange={(e) => handleChange('medical_conditions', e.target.value)}
                      placeholder="Any medical conditions we should know about..."
                      rows={2}
                      maxLength={500}
                    />
                  </div>

                  {/* Special Needs */}
                  <div className="space-y-2">
                    <Label htmlFor={`special-${index}`}>Special Needs</Label>
                    <Textarea
                      id={`special-${index}`}
                      value={traveler.special_needs || ''}
                      onChange={(e) => handleChange('special_needs', e.target.value)}
                      placeholder="Any special requirements or assistance needed..."
                      rows={2}
                      maxLength={500}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
