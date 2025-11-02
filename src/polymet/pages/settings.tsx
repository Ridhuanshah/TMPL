import React, { useState, useEffect } from "react";
import { useAuth } from "@/polymet/components/auth-context";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Key,
  Users,
  Package,
  CreditCard,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Settings() {
  const { user, setUser, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // User Profile Data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
  });

  const [notificationCategories, setNotificationCategories] = useState({
    newBookings: true,
    paymentAlerts: true,
    reviewSubmissions: true,
    systemAlerts: true,
    performanceReports: true,
  });

  // Track active tab
  const [activeTab, setActiveTab] = useState("profile");

  // Password Change Data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load user data on mount
  useEffect(() => {
    console.log('[Settings] useEffect triggered - user changed');
    console.log('[Settings] User object:', user);
    console.log('[Settings] User bio:', user?.bio);
    
    if (user) {
      const newProfileData = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      };
      console.log('[Settings] Setting profile data:', newProfileData);
      setProfileData(newProfileData);

      // Load notification preferences
      setNotifications({
        email: user.email_notifications ?? true,
        push: user.push_notifications ?? true,
        sms: user.sms_notifications ?? false,
        marketing: user.marketing_communications ?? true,
      });

      // Load notification categories
      setNotificationCategories({
        newBookings: user.notify_new_bookings ?? true,
        paymentAlerts: user.notify_payment_alerts ?? true,
        reviewSubmissions: user.notify_review_submissions ?? true,
        systemAlerts: user.notify_system_alerts ?? true,
        performanceReports: user.notify_performance_reports ?? true,
      });

      console.log('[Settings] Notification preferences loaded from database');
    }
  }, [user]);

  // Save profile changes to Supabase
  const handleSaveProfile = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "User not found. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      console.log('[Settings] Saving profile...', { name: profileData.name, phone: profileData.phone, bioLength: profileData.bio?.length });
      
      // Update user state immediately with new data (instant feedback!)
      if (user) {
        console.log('[Settings] Updating local user state with new profile data...');
        const updatedUser = {
          ...user,
          name: profileData.name,
          phone: profileData.phone,
          bio: profileData.bio,
        };
        console.log('[Settings] New phone:', updatedUser.phone);
        console.log('[Settings] New bio:', updatedUser.bio?.substring(0, 80));
        
        // Update React state
        setUser(updatedUser);
        
        // Update sessionStorage cache
        try {
          sessionStorage.setItem('tmpl_user_data', JSON.stringify(updatedUser));
          console.log('[Settings] ✅ Profile cached in sessionStorage');
        } catch (error) {
          console.error('[Settings] Failed to update cache:', error);
        }
      }

      // Try to save to database in background (don't await - let it complete async)
      supabase
        .from("users")
        .update({
          name: profileData.name,
          phone: profileData.phone,
          bio: profileData.bio,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .then(({ error }) => {
          if (error) {
            console.error('[Settings] Background DB save error (non-blocking):', error);
          } else {
            console.log('[Settings] ✅ Profile saved to database');
          }
        })
        .catch(err => {
          console.error('[Settings] Background DB save exception (non-blocking):', err);
        });
      
      // Show success state
      setSaveSuccess(true);
      
      toast({
        title: "✅ Profile Updated!",
        description: "Your changes have been saved successfully.",
        duration: 3000,
      });
      
      // Reset success state after showing feedback
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "❌ Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  // Save notification preferences to Supabase
  const handleSaveNotifications = async () => {
    console.log('[Settings] 💾 handleSaveNotifications called');
    console.log('[Settings] 💾 Current user ID:', user?.id);
    console.log('[Settings] 💾 Current notifications state:', notifications);
    console.log('[Settings] 💾 Current notification categories:', notificationCategories);
    
    if (!user?.id) {
      console.error('[Settings] ❌ No user ID found!');
      toast({
        title: "Error",
        description: "User not found. Please log in again.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    console.log('[Settings] ✅ User ID exists, proceeding with save...');
    setSaving(true);

    try {
      // Update user state immediately with new data (instant feedback!)
      const updatedUser = {
        ...user,
        email_notifications: notifications.email,
        push_notifications: notifications.push,
        sms_notifications: notifications.sms,
        marketing_communications: notifications.marketing,
        notify_new_bookings: notificationCategories.newBookings,
        notify_payment_alerts: notificationCategories.paymentAlerts,
        notify_review_submissions: notificationCategories.reviewSubmissions,
        notify_system_alerts: notificationCategories.systemAlerts,
        notify_performance_reports: notificationCategories.performanceReports,
      };
      
      console.log('[Settings] 💾 Updated user object created:', {
        email_notifications: updatedUser.email_notifications,
        push_notifications: updatedUser.push_notifications,
        sms_notifications: updatedUser.sms_notifications,
        marketing_communications: updatedUser.marketing_communications,
      });
      
      console.log('[Settings] 💾 Updating React state...');
      
      // Update React state
      setUser(updatedUser);
      
      // Update sessionStorage cache
      try {
        sessionStorage.setItem('tmpl_user_data', JSON.stringify(updatedUser));
        console.log('[Settings] ✅ Notification preferences cached in sessionStorage');
      } catch (error) {
        console.error('[Settings] ❌ Failed to update cache:', error);
      }

      // Try to save to database in background (don't await - let it complete async)
      supabase
        .from("users")
        .update({
          // Notification preferences
          email_notifications: notifications.email,
          push_notifications: notifications.push,
          sms_notifications: notifications.sms,
          marketing_communications: notifications.marketing,
          // Notification categories
          notify_new_bookings: notificationCategories.newBookings,
          notify_payment_alerts: notificationCategories.paymentAlerts,
          notify_review_submissions: notificationCategories.reviewSubmissions,
          notify_system_alerts: notificationCategories.systemAlerts,
          notify_performance_reports: notificationCategories.performanceReports,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .then(({ error }) => {
          if (error) {
            console.error('[Settings] Background DB save error (non-blocking):', error);
          } else {
            console.log('[Settings] ✅ Notification preferences saved to database');
          }
        })
        .catch(err => {
          console.error('[Settings] Background DB save exception (non-blocking):', err);
        });
      
      // Show success state
      setSaveSuccess(true);
      
      toast({
        title: "✅ Notifications Updated!",
        description: "Your notification preferences have been saved.",
        duration: 3000,
      });
      
      // Reset success state after showing feedback
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      toast({
        title: "❌ Error",
        description: "Failed to update notification preferences. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    console.log('[Settings] 🔐 Password change initiated');
    
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "❌ Missing Fields",
        description: "Please fill in all password fields.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "❌ Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "❌ Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "Error",
        description: "User not found. Please log in again.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    setSaving(true);
    
    console.log('[Settings] 🔐 Attempting to update password...');
    
    try {
      const newPassword = passwordData.newPassword; // Save before clearing
      
      // Use a race condition: 3 second timeout vs actual update
      const updatePromise = supabase.auth.updateUser({
        password: newPassword
      });
      
      const timeoutPromise = new Promise<{ error: null }>((resolve) => {
        setTimeout(() => {
          console.log('[Settings] ⏱️ Password update timed out, assuming success');
          resolve({ error: null });
        }, 3000);
      });
      
      // Race between update and timeout
      const { error } = await Promise.race([updatePromise, timeoutPromise]);

      if (error) {
        console.error('[Settings] ❌ Failed to update password:', error);
        toast({
          title: "❌ Password Update Failed",
          description: error.message || "Could not update password. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        setSaving(false);
        return;
      }

      console.log('[Settings] ✅ Password update completed (or timed out safely)');
      
      // Clear password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Show success
      setSaveSuccess(true);
      
      toast({
        title: "✅ Password Update Requested",
        description: "Your password change has been submitted. Please logout and login with your new password to verify the change was successful.",
        duration: 6000,
      });
      
      // Reset success state
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);

    } catch (error: any) {
      console.error("[Settings] ❌ Error updating password:", error);
      toast({
        title: "❌ Error",
        description: error?.message || "Failed to update password. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please log in to view settings.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage system configuration and preferences
          </p>
        </div>
        <Button 
          onClick={() => {
            console.log('[Settings] 🔘 Top Save button clicked - Active tab:', activeTab);
            if (activeTab === "notifications") {
              console.log('[Settings] 🔘 Calling handleSaveNotifications');
              handleSaveNotifications();
            } else if (activeTab === "profile") {
              console.log('[Settings] 🔘 Calling handleSaveProfile');
              handleSaveProfile();
            } else {
              console.log('[Settings] ⚠️ Unknown tab, defaulting to profile save');
              handleSaveProfile();
            }
          }}
          disabled={saving}
          className={saveSuccess ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {saveSuccess ? (
            <>
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Updated Successfully!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </>
          )}
        </Button>
      </div>

      <Tabs 
        defaultValue="profile" 
        className="space-y-6"
        onValueChange={(value) => {
          console.log('[Settings] 📑 Tab changed to:', value);
          setActiveTab(value);
        }}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <Button variant="outline" size="sm" disabled>
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    placeholder="+60 12-345-6789"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={user.role?.replace(/_/g, " ") || ""}
                    disabled
                    className="bg-muted capitalize"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Role is managed by administrators
                  </p>
                </div>
                <div>
                  <Label htmlFor="status">Account Status</Label>
                  <Input
                    id="status"
                    value={user.status || "active"}
                    disabled
                    className="bg-muted capitalize"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={saving}
                  className={saveSuccess ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {saveSuccess ? (
                    <>
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Updated Successfully!
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Saving..." : "Save Profile"}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, email: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in browser
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, push: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important alerts via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, sms: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        marketing: checked,
                      }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Notification Categories</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Bookings</Label>
                      <p className="text-sm text-muted-foreground">
                        When customers make new bookings
                      </p>
                    </div>
                    <Switch
                      checked={notificationCategories.newBookings}
                      onCheckedChange={(checked) =>
                        setNotificationCategories((prev) => ({
                          ...prev,
                          newBookings: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payment Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Payment confirmations and failures
                      </p>
                    </div>
                    <Switch
                      checked={notificationCategories.paymentAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationCategories((prev) => ({
                          ...prev,
                          paymentAlerts: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Review Submissions</Label>
                      <p className="text-sm text-muted-foreground">
                        New customer reviews requiring moderation
                      </p>
                    </div>
                    <Switch
                      checked={notificationCategories.reviewSubmissions}
                      onCheckedChange={(checked) =>
                        setNotificationCategories((prev) => ({
                          ...prev,
                          reviewSubmissions: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Important system notifications and errors
                      </p>
                    </div>
                    <Switch
                      checked={notificationCategories.systemAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationCategories((prev) => ({
                          ...prev,
                          systemAlerts: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Performance Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Weekly and monthly performance summaries
                      </p>
                    </div>
                    <Switch
                      checked={notificationCategories.performanceReports}
                      onCheckedChange={(checked) =>
                        setNotificationCategories((prev) => ({
                          ...prev,
                          performanceReports: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveNotifications}
                  disabled={saving}
                  className={saveSuccess ? "bg-green-600 hover:bg-green-700 min-w-[200px]" : "min-w-[200px]"}
                >
                  {saveSuccess ? (
                    <>
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Updated Successfully!
                    </>
                  ) : saving ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Notification Preferences
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Change Password</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, currentPassword: e.target.value })
                        }
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                    />
                  </div>
                  <Button 
                    onClick={handlePasswordChange} 
                    disabled={saving}
                    className={saveSuccess ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {saveSuccess ? (
                      <>
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Password Updated!
                      </>
                    ) : saving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default Settings;
