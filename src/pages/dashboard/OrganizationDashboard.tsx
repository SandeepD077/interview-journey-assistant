
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Users, BarChart, Settings, ChevronRight, PlusCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function OrganizationDashboard() {
  const { currentUser } = useAuth();
  
  // Redirect if no user or wrong user type
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "organization") {
    return <Navigate to="/dashboard" replace />;
  }

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
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Position
            </Button>
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
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                      <Button variant="outline" size="sm">View Profile</Button>
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
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                      <Button variant="outline" size="sm">View Profile</Button>
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
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                      <Button variant="outline" size="sm">View Profile</Button>
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
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                      <Button variant="outline" size="sm">View Profile</Button>
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
