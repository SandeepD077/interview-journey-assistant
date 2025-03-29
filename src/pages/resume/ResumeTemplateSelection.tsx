
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { resumeTemplates } from "@/data/resumeTemplates";

export default function ResumeTemplateSelection() {
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
        <Heading 
          title="Resume Builder" 
          description="Choose a template to start building your professional resume"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden card-hover">
              <div className="aspect-[4/5] relative">
                <img 
                  src={template.previewImage} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-semibold">{template.name}</h3>
                    <p className="text-sm text-white/80">{template.description}</p>
                  </div>
                </div>
              </div>
              <CardFooter className="p-4">
                <Link to={`/resume-builder/${template.id}`} className="w-full">
                  <Button className="w-full">
                    Select Template
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
