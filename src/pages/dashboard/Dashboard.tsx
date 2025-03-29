
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { FileText, Code, BookOpen, Mic, Award, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  
  // Redirect if no user or wrong user type
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "user") {
    return <Navigate to="/organization-dashboard" replace />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {currentUser.name}</h1>
            <p className="text-muted-foreground mt-1">
              Track your progress and continue your interview preparation
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/practice/interview">
              <Button>Start Mock Interview</Button>
            </Link>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resume Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60%</div>
              <Progress value={60} className="h-2 mt-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Aptitude Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2/4</div>
              <Progress value={50} className="h-2 mt-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">DSA Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5/20</div>
              <Progress value={25} className="h-2 mt-1" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Mock Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1/5</div>
              <Progress value={20} className="h-2 mt-1" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resume Builder</CardTitle>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Create and improve your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Build a professional resume, get AI feedback, and download it in multiple formats.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/resume-builder" className="w-full">
                <Button variant="outline" className="w-full">
                  <span>Continue</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Aptitude Tests</CardTitle>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Practice common aptitude questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Test your quantitative, logical reasoning, verbal, and data interpretation skills.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/practice/aptitude" className="w-full">
                <Button variant="outline" className="w-full">
                  <span>Start Practice</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>DSA Practice</CardTitle>
                <Code className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Sharpen your coding skills</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Solve algorithms and data structure problems with real-time feedback.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/practice/dsa" className="w-full">
                <Button variant="outline" className="w-full">
                  <span>Solve Problems</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mock Interviews</CardTitle>
                <Mic className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Practice with AI interviewer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Simulate real interview experiences and get feedback on your responses.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/practice/interview" className="w-full">
                <Button variant="outline" className="w-full">
                  <span>Start Interview</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Study Resources</CardTitle>
                <Award className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Access learning materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Find curated resources to improve your knowledge in various technical areas.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/resources" className="w-full">
                <Button variant="outline" className="w-full">
                  <span>Explore Resources</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="text-sm flex-1">Completed Quantitative Aptitude Test with score 80%</div>
                <div className="text-xs text-muted-foreground">2 days ago</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <div className="text-sm flex-1">Created Modern Resume template</div>
                <div className="text-xs text-muted-foreground">3 days ago</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <div className="text-sm flex-1">Solved "Two Sum" DSA problem</div>
                <div className="text-xs text-muted-foreground">5 days ago</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                <div className="text-sm flex-1">Completed Mock Interview session</div>
                <div className="text-xs text-muted-foreground">1 week ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
