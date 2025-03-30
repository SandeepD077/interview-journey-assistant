import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Brain, MessageSquare, BookOpen, Bot } from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  
  // Redirect if no user
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "user") {
    return <Navigate to="/organization-dashboard" replace />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {currentUser.name}! Prepare for your dream job.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume Builder
              </CardTitle>
              <CardDescription>Create professional resumes</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Generate ATS-optimized resumes with AI-powered suggestions
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/resume-builder">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Practice Tests
              </CardTitle>
              <CardDescription>Aptitude and DSA preparation</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Practice with simulated tests and coding challenges
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/practice/aptitude">Aptitude</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/practice/dsa">DSA</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Mock Interview
              </CardTitle>
              <CardDescription>AI-powered interview preparation</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Practice interviews with AI feedback and evaluation
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/practice/interview">Start Practice</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Study Resources
              </CardTitle>
              <CardDescription>Learning materials</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Access curated resources for better preparation
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/resources">Explore</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Assistant
              </CardTitle>
              <CardDescription>Personalized career guidance</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Get advice on job search, interviews, and career development
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/assistant">Chat Now</Link>
              </Button>
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
