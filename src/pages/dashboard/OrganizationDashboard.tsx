
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Users, BarChart, Settings, ChevronRight, PlusCircle, Download, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OrganizationDashboard() {
  const { currentUser } = useAuth();
  const [showAddPositionDialog, setShowAddPositionDialog] = useState(false);
  const [newPosition, setNewPosition] = useState({
    title: "",
    department: "",
    location: "",
    type: "fulltime"
  });
  
  // Redirect if no user or wrong user type
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "organization") {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAddPosition = () => {
    // In a real application, we would call an API to add the position
    toast.success(`New position '${newPosition.title}' added successfully!`);
    setShowAddPositionDialog(false);
    setNewPosition({
      title: "",
      department: "",
      location: "",
      type: "fulltime"
    });
  };

  const downloadResume = (candidateName: string) => {
    // Simulate file download
    toast.success(`Downloading ${candidateName}'s resume...`);
    
    // Create a temporary link element
    setTimeout(() => {
      // In a real app, we would get the file URL from the server
      // For now, we'll create a simple text file with some dummy content
      const resumeContent = `
Sample Resume for ${candidateName}
---------------------------------------------------
Contact: sample@email.com
Phone: (555) 123-4567
---------------------------------------------------
Experience:
- Senior Developer at Tech Corp (2018-Present)
- Junior Developer at StartupXYZ (2015-2018)
---------------------------------------------------
Education:
- BS in Computer Science, University College (2015)
      `;
      
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = `${candidateName.replace(/\s+/g, '_')}_Resume.txt`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 1000);
  };

  const generateReport = () => {
    toast.success("Generating analytics report...");
    
    setTimeout(() => {
      // Create a simple CSV report
      const reportContent = `
Date,Candidates Applied,Interviews Scheduled,Offers Extended,Offers Accepted
2023-01,15,8,3,2
2023-02,22,12,5,4
2023-03,18,10,4,3
2023-04,25,15,6,5
2023-05,30,18,8,6
2023-06,28,16,7,5
      `;
      
      const blob = new Blob([reportContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = 'Recruitment_Analytics_Report.csv';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {currentUser.organizationName}</h1>
            <p className="text-muted-foreground mt-1">
              Manage your recruitment pipeline and candidate assessments
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Dialog open={showAddPositionDialog} onOpenChange={setShowAddPositionDialog}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Position
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Position</DialogTitle>
                  <DialogDescription>
                    Create a new job position to start recruiting candidates.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      value={newPosition.title}
                      onChange={(e) => setNewPosition({...newPosition, title: e.target.value})}
                      placeholder="e.g. Frontend Developer" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department" 
                      value={newPosition.department}
                      onChange={(e) => setNewPosition({...newPosition, department: e.target.value})}
                      placeholder="e.g. Engineering" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={newPosition.location}
                      onChange={(e) => setNewPosition({...newPosition, location: e.target.value})}
                      placeholder="e.g. Remote, New York, NY" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Employment Type</Label>
                    <Select 
                      value={newPosition.type}
                      onValueChange={(value) => setNewPosition({...newPosition, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddPositionDialog(false)}>Cancel</Button>
                  <Button onClick={handleAddPosition} disabled={!newPosition.title}>Add Position</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Overview Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">For next two weeks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hiring Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18%</div>
              <p className="text-xs text-muted-foreground">+2% from last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Candidates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
            <CardDescription>
              Review and manage candidate applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="screening">Screening</TabsTrigger>
                <TabsTrigger value="interview">Interview</TabsTrigger>
                <TabsTrigger value="offer">Offer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {/* Candidate Items */}
                  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium">Alex Johnson</h4>
                      <p className="text-sm text-muted-foreground">Frontend Developer</p>
                    </div>
                    <div className="hidden sm:block">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-50 text-yellow-800 border-yellow-100">
                        Technical Interview
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-sm">Applied 2 days ago</div>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4 flex space-x-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center" 
                        onClick={() => downloadResume("Alex Johnson")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium">Sarah Miller</h4>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                    <div className="hidden sm:block">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-800 border-green-100">
                        Offer Stage
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-sm">Applied 5 days ago</div>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4 flex space-x-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center" 
                        onClick={() => downloadResume("Sarah Miller")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium">David Chen</h4>
                      <p className="text-sm text-muted-foreground">Backend Developer</p>
                    </div>
                    <div className="hidden sm:block">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-800 border-blue-100">
                        Initial Screening
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-sm">Applied 1 day ago</div>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4 flex space-x-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center" 
                        onClick={() => downloadResume("David Chen")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b">
                    <div className="flex-1">
                      <h4 className="font-medium">Emma Wilson</h4>
                      <p className="text-sm text-muted-foreground">UX Designer</p>
                    </div>
                    <div className="hidden sm:block">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-50 text-purple-800 border-purple-100">
                        Portfolio Review
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-sm">Applied 3 days ago</div>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4 flex space-x-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex items-center" 
                        onClick={() => downloadResume("Emma Wilson")}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="new">
                <div className="py-8 text-center text-muted-foreground">
                  <p>No new candidates to show</p>
                </div>
              </TabsContent>
              
              <TabsContent value="screening">
                <div className="py-8 text-center text-muted-foreground">
                  <p>No candidates in screening stage</p>
                </div>
              </TabsContent>
              
              <TabsContent value="interview">
                <div className="py-8 text-center text-muted-foreground">
                  <p>No candidates in interview stage</p>
                </div>
              </TabsContent>
              
              <TabsContent value="offer">
                <div className="py-8 text-center text-muted-foreground">
                  <p>No candidates in offer stage</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Link to="/candidates" className="w-full">
              <Button variant="outline" className="w-full">
                <span>View All Candidates</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Analytics Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recruitment Analytics</CardTitle>
                <CardDescription>Performance metrics for your hiring pipeline</CardDescription>
              </div>
              <Button onClick={generateReport} variant="outline" size="sm" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Application to Interview Rate</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Interview to Offer Rate</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Offer Acceptance Rate</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Avg. Time to Hire</p>
                  <p className="text-2xl font-bold">18 days</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Open Requisitions</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Cost Per Hire</p>
                  <p className="text-2xl font-bold">$2,450</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Quality of Hire</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Candidate Management</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Manage your candidate pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                View and manage all candidate applications, resumes, and interview schedules.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/candidates" className="w-full">
                <Button variant="outline" className="w-full">
                  <span>View Candidates</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Analytics Dashboard</CardTitle>
                <BarChart className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>View recruitment metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Access detailed analytics on your recruitment process, candidate performance, and hiring metrics.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/analytics" className="w-full">
                <Button variant="outline" className="w-full">
                  <span>View Analytics</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Organization Settings</CardTitle>
                <Settings className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Manage account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Configure your organization profile, interview stages, team members, and notification preferences.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/settings" className="w-full">
                <Button variant="outline" className="w-full">
                  <span>Manage Settings</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
