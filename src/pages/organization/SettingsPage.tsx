import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading, Separator } from "@/components/ui/heading";

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Redirect if no user or wrong user type
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "organization") {
    return <Navigate to="/dashboard" replace />;
  }

  const [organizationProfile, setOrganizationProfile] = useState({
    name: currentUser.organizationName || "Company Name",
    website: "https://example.com",
    industry: "technology",
    size: "medium",
    description: "A technology company focused on innovative solutions."
  });

  const [emailNotifications, setEmailNotifications] = useState({
    newApplications: true,
    interviewReminders: true,
    candidateUpdates: false,
    weeklyReports: true,
    systemAlerts: true
  });

  const [recruitmentStages, setRecruitmentStages] = useState([
    { id: 1, name: "Application Review", isActive: true },
    { id: 2, name: "Phone Screening", isActive: true },
    { id: 3, name: "Technical Assessment", isActive: true },
    { id: 4, name: "First Interview", isActive: true },
    { id: 5, name: "Second Interview", isActive: true },
    { id: 6, name: "Reference Check", isActive: true },
    { id: 7, name: "Offer Stage", isActive: true },
    { id: 8, name: "Onboarding", isActive: true }
  ]);

  const handleProfileUpdate = () => {
    toast.success("Organization profile updated successfully!");
  };

  const handleNotificationUpdate = () => {
    toast.success("Notification preferences updated successfully!");
  };

  const handleStageToggle = (id: number) => {
    setRecruitmentStages(stages => 
      stages.map(stage => 
        stage.id === id ? { ...stage, isActive: !stage.isActive } : stage
      )
    );
  };

  const handleStageUpdate = () => {
    toast.success("Recruitment stages updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Heading 
            title="Organization Settings" 
            description={`Configure settings for ${currentUser?.organizationName || 'your organization'}`} 
          />
          <Separator className="my-6" />
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Organization Profile</TabsTrigger>
            <TabsTrigger value="recruitment">Recruitment Process</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>
                  Update your organization's basic information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleProfileUpdate();
                }} className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      value={organizationProfile.name}
                      onChange={(e) => setOrganizationProfile({...organizationProfile, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      type="url" 
                      value={organizationProfile.website}
                      onChange={(e) => setOrganizationProfile({...organizationProfile, website: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        value={organizationProfile.industry}
                        onValueChange={(value) => setOrganizationProfile({...organizationProfile, industry: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="size">Company Size</Label>
                      <Select
                        value={organizationProfile.size}
                        onValueChange={(value) => setOrganizationProfile({...organizationProfile, size: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (1-50 employees)</SelectItem>
                          <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                          <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea 
                      id="description"
                      rows={4}
                      value={organizationProfile.description}
                      onChange={(e) => setOrganizationProfile({...organizationProfile, description: e.target.value})}
                    />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recruitment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Stages</CardTitle>
                <CardDescription>
                  Configure the stages in your recruitment process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleStageUpdate();
                }} className="space-y-6">
                  <div className="space-y-4">
                    {recruitmentStages.map(stage => (
                      <div key={stage.id} className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">{stage.name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={stage.isActive} 
                            onCheckedChange={() => handleStageToggle(stage.id)} 
                            id={`stage-${stage.id}`}
                          />
                          <Label htmlFor={`stage-${stage.id}`} className="cursor-pointer">
                            {stage.isActive ? "Active" : "Inactive"}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button type="submit">Update Stages</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Customize which email notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleNotificationUpdate();
                }} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">New Applications</p>
                        <p className="text-sm text-muted-foreground">Receive an email when new candidates apply</p>
                      </div>
                      <Switch 
                        checked={emailNotifications.newApplications} 
                        onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, newApplications: checked})} 
                        id="new-applications"
                      />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Interview Reminders</p>
                        <p className="text-sm text-muted-foreground">Get reminders before scheduled interviews</p>
                      </div>
                      <Switch 
                        checked={emailNotifications.interviewReminders} 
                        onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, interviewReminders: checked})} 
                        id="interview-reminders"
                      />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Candidate Status Updates</p>
                        <p className="text-sm text-muted-foreground">Get notified when candidate statuses change</p>
                      </div>
                      <Switch 
                        checked={emailNotifications.candidateUpdates} 
                        onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, candidateUpdates: checked})} 
                        id="candidate-updates"
                      />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Weekly Reports</p>
                        <p className="text-sm text-muted-foreground">Receive weekly recruitment summary reports</p>
                      </div>
                      <Switch 
                        checked={emailNotifications.weeklyReports} 
                        onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, weeklyReports: checked})} 
                        id="weekly-reports"
                      />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">System Alerts</p>
                        <p className="text-sm text-muted-foreground">Important system notifications and updates</p>
                      </div>
                      <Switch 
                        checked={emailNotifications.systemAlerts} 
                        onCheckedChange={(checked) => setEmailNotifications({...emailNotifications, systemAlerts: checked})} 
                        id="system-alerts"
                      />
                    </div>
                  </div>
                  <Button type="submit">Update Preferences</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
