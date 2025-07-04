import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Heading } from "@/components/ui/heading";
import { resumeTemplates } from "@/data/resumeTemplates";
import { TemplateCard } from "@/components/resume/TemplateCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Palette, Users, Briefcase, Lightbulb } from "lucide-react";

export default function ResumeTemplateSelection() {
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Redirect if no user or wrong user type
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "user") {
    return <Navigate to="/organization-dashboard" replace />;
  }

  const categories = [
    { id: 'modern', label: 'Modern', icon: Lightbulb, description: 'Contemporary and clean designs' },
    { id: 'classic', label: 'Classic', icon: FileText, description: 'Traditional professional formats' },
    { id: 'creative', label: 'Creative', icon: Palette, description: 'Bold and artistic layouts' },
    { id: 'minimalist', label: 'Minimalist', icon: Users, description: 'Simple and elegant styles' },
    { id: 'executive', label: 'Executive', icon: Briefcase, description: 'Premium professional designs' },
  ];

  const filteredTemplates = selectedCategory 
    ? resumeTemplates.filter(template => template.category === selectedCategory)
    : resumeTemplates;

  const templateCount = {
    modern: resumeTemplates.filter(t => t.category === 'modern').length,
    classic: resumeTemplates.filter(t => t.category === 'classic').length,
    creative: resumeTemplates.filter(t => t.category === 'creative').length,
    minimalist: resumeTemplates.filter(t => t.category === 'minimalist').length,
    executive: resumeTemplates.filter(t => t.category === 'executive').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Heading 
            title="Choose Your Resume Template" 
            description="Select from our professionally designed templates to create a standout resume"
          />
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              Each template is carefully crafted to help you make a great impression. 
              Choose one that matches your industry and personal style.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2"
            >
              All Templates
              <Badge variant="secondary" className="ml-1">
                {resumeTemplates.length}
              </Badge>
            </Button>
            {categories.map((category) => {
              const Icon = category.icon;
              const count = templateCount[category.id as keyof typeof templateCount];
              
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                  <Badge variant="secondary" className="ml-1">
                    {count}
                  </Badge>
                </Button>
              );
            })}
          </div>

          {selectedCategory && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {categories.find(c => c.id === selectedCategory)?.description}
              </p>
            </div>
          )}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              Try selecting a different category or view all templates.
            </p>
            <Button onClick={() => setSelectedCategory(null)}>
              View All Templates
            </Button>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">What's included with every template:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              ATS-friendly formatting
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Professional design
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Easy customization
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              PDF export ready
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
