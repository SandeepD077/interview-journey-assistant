
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Heading } from "@/components/ui/heading";
import { SectionContainer } from "@/components/ui/section-container";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { studyResources } from "@/data/studyResources";

export default function StudyResourcesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    { id: "all", name: "All Resources" },
    { id: "algorithms", name: "Algorithms" },
    { id: "dataStructures", name: "Data Structures" },
    { id: "systemDesign", name: "System Design" },
    { id: "behavioral", name: "Behavioral" }
  ];
  
  const filteredResources = studyResources.filter(resource => {
    const matchesCategory = activeTab === "all" || resource.category === activeTab;
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <Heading 
        title="Study Resources" 
        description="Curated learning materials to help you prepare for your interviews"
      />
      
      <SectionContainer className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-5">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="w-full md:w-64">
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.source}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline text-sm font-medium"
                  >
                    View Resource
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No resources found. Try adjusting your search criteria.</p>
          </div>
        )}
      </SectionContainer>
    </DashboardLayout>
  );
}
