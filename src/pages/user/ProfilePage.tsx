
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/ui/heading";

export default function ProfilePage() {
  const { currentUser, isLoading } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Redirect if no user
  if (!currentUser && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated successfully!");
      setIsUpdating(false);
    }, 1000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Password updated successfully!");
      setIsUpdating(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Heading 
            title="Profile" 
            description="View and update your personal information"
          />
          <Separator className="my-6" />
        </div>
        
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Personal information and account details</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src="https://github.com/shadcn.png" alt={currentUser?.name || "User"} />
                    <AvatarFallback className="text-4xl">
                      {currentUser?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center mb-2">
                    <h3 className="text-xl font-bold">{currentUser?.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Member since January 2023</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Update your profile information and password</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="profile">Profile Information</TabsTrigger>
                      <TabsTrigger value="password">Change Password</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile">
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              name="name" 
                              defaultValue={currentUser?.name} 
                              placeholder="John Doe" 
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              defaultValue={currentUser?.email} 
                              placeholder="john@example.com" 
                              disabled 
                            />
                            <p className="text-xs text-muted-foreground">
                              You cannot change your email address after registration.
                            </p>
                          </div>
                          
                          {currentUser?.role === 'organization' && (
                            <div className="grid gap-2">
                              <Label htmlFor="organizationName">Organization Name</Label>
                              <Input 
                                id="organizationName" 
                                name="organizationName" 
                                defaultValue={currentUser?.organizationName} 
                                placeholder="Acme Inc." 
                              />
                            </div>
                          )}
                          
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              name="phone" 
                              placeholder="(555) 123-4567" 
                            />
                          </div>
                        </div>
                        
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="password">
                      <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input 
                              id="current-password" 
                              name="current-password"
                              type="password"
                              placeholder="••••••••" 
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input 
                              id="new-password" 
                              name="new-password"
                              type="password"
                              placeholder="••••••••" 
                            />
                            <p className="text-xs text-muted-foreground">
                              Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                            </p>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input 
                              id="confirm-password" 
                              name="confirm-password"
                              type="password"
                              placeholder="••••••••" 
                            />
                          </div>
                        </div>
                        
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Change Password"}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="preferences">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="email-notifications" 
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                            <Label htmlFor="email-notifications">
                              Email Notifications
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Receive email notifications about your interview preparation progress.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="weekly-digest" 
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor="weekly-digest">
                              Weekly Digest
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Receive a weekly summary of your activities and progress.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="marketing-emails" 
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                            <Label htmlFor="marketing-emails">
                              Marketing Emails
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">
                            Receive emails about new features, tips, and special offers.
                          </p>
                        </div>
                        
                        <Button>
                          Save Preferences
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
