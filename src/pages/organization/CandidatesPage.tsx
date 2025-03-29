
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { generateResumePDF } from "@/utils/pdfGenerator";

// Mock data for candidates
const mockCandidates = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "Frontend Developer",
    stage: "Technical Interview",
    stageColor: "yellow",
    appliedDate: "2023-06-15",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    education: "BS in Computer Science, University College",
    experience: "5 years of front-end development",
    skills: ["React", "TypeScript", "CSS", "HTML5", "Jest"]
  },
  {
    id: "2",
    name: "Sarah Miller",
    position: "Product Manager",
    stage: "Offer Stage",
    stageColor: "green",
    appliedDate: "2023-06-12",
    email: "sarah.miller@example.com",
    phone: "(555) 234-5678",
    location: "San Francisco, CA",
    education: "MBA, Business School",
    experience: "7 years in product management",
    skills: ["Product Strategy", "User Research", "Agile", "Roadmapping", "Analytics"]
  },
  {
    id: "3",
    name: "David Chen",
    position: "Backend Developer",
    stage: "Initial Screening",
    stageColor: "blue",
    appliedDate: "2023-06-17",
    email: "david.chen@example.com",
    phone: "(555) 345-6789",
    location: "Austin, TX",
    education: "MS in Computer Engineering, Tech University",
    experience: "3 years of backend development",
    skills: ["Node.js", "Python", "MongoDB", "AWS", "Docker"]
  },
  {
    id: "4",
    name: "Emma Wilson",
    position: "UX Designer",
    stage: "Portfolio Review",
    stageColor: "purple",
    appliedDate: "2023-06-14",
    email: "emma.wilson@example.com",
    phone: "(555) 456-7890",
    location: "Chicago, IL",
    education: "BFA in Graphic Design, Art Institute",
    experience: "4 years of UX/UI design",
    skills: ["Figma", "Sketch", "User Research", "Prototyping", "Wireframing"]
  }
];

export default function CandidatesPage() {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  
  // Redirect if no user or wrong user type
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "organization") {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadResume = async (candidateName: string) => {
    try {
      // Create mock resume data for the candidate
      const mockResumeData = {
        personalInfo: {
          fullName: candidateName,
          email: mockCandidates.find(c => c.name === candidateName)?.email || "email@example.com",
          phone: mockCandidates.find(c => c.name === candidateName)?.phone || "(555) 123-4567",
          address: mockCandidates.find(c => c.name === candidateName)?.location || "City, State",
          summary: `Experienced professional with a background in ${mockCandidates.find(c => c.name === candidateName)?.position || "technology"}.`,
        },
        education: [{
          institution: mockCandidates.find(c => c.name === candidateName)?.education.split(',')[0] || "University Name",
          degree: "Bachelor's Degree",
          fieldOfStudy: "Computer Science",
          startDate: "2015",
          endDate: "2019",
          gpa: "3.8",
          description: "Graduated with honors"
        }],
        experience: [{
          company: "Previous Company",
          position: mockCandidates.find(c => c.name === candidateName)?.position || "Developer",
          location: mockCandidates.find(c => c.name === candidateName)?.location || "City, State",
          startDate: "2019",
          endDate: "Present",
          current: true,
          description: mockCandidates.find(c => c.name === candidateName)?.experience || "Professional experience in the field."
        }],
        skills: mockCandidates.find(c => c.name === candidateName)?.skills || ["Skill 1", "Skill 2"],
        projects: [{
          title: "Sample Project",
          description: "A project demonstrating skills and expertise",
          technologies: mockCandidates.find(c => c.name === candidateName)?.skills.slice(0, 3) || ["Tech 1", "Tech 2"],
          link: "https://example.com/project"
        }],
        certifications: [{
          name: "Industry Certification",
          issuer: "Certification Authority",
          date: "2021",
          expiration: "2024"
        }]
      };

      toast.success(`Downloading ${candidateName}'s resume...`);
      
      // Generate PDF using our utility function
      const pdfBlob = await generateResumePDF("modern", mockResumeData);
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${candidateName.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast.error("Failed to download resume. Please try again.");
    }
  };

  const getStageColorClass = (color: string) => {
    switch (color) {
      case 'yellow': return 'bg-yellow-50 text-yellow-800 border-yellow-100';
      case 'green': return 'bg-green-50 text-green-800 border-green-100';
      case 'blue': return 'bg-blue-50 text-blue-800 border-blue-100';
      case 'purple': return 'bg-purple-50 text-purple-800 border-purple-100';
      default: return 'bg-gray-50 text-gray-800 border-gray-100';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            Manage and track all your job applicants
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="relative w-full sm:w-auto flex-grow max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Candidates</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
            <TabsTrigger value="offer">Offer Stage</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Candidates</CardTitle>
                <CardDescription>
                  View all candidates who have applied to your job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredCandidates.length > 0 ? filteredCandidates.map(candidate => (
                    <div 
                      key={candidate.id}
                      className={`flex flex-col sm:flex-row sm:items-center py-4 border-b cursor-pointer ${selectedCandidate === candidate.id ? 'bg-gray-50' : ''}`}
                      onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.position}</p>
                      </div>
                      <div className="hidden sm:block">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStageColorClass(candidate.stageColor)}`}>
                          {candidate.stage}
                        </span>
                      </div>
                      <div className="hidden sm:block">
                        <div className="text-sm">Applied {new Date(candidate.appliedDate).toLocaleDateString()}</div>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:ml-4 flex space-x-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center" 
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadResume(candidate.name);
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Resume
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-10 text-muted-foreground">
                      No candidates found matching your search criteria.
                    </div>
                  )}
                  
                  {selectedCandidate && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">
                        {mockCandidates.find(c => c.id === selectedCandidate)?.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p>{mockCandidates.find(c => c.id === selectedCandidate)?.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p>{mockCandidates.find(c => c.id === selectedCandidate)?.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p>{mockCandidates.find(c => c.id === selectedCandidate)?.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Education</p>
                          <p>{mockCandidates.find(c => c.id === selectedCandidate)?.education}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-muted-foreground">Experience</p>
                          <p>{mockCandidates.find(c => c.id === selectedCandidate)?.experience}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-muted-foreground">Skills</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {mockCandidates.find(c => c.id === selectedCandidate)?.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm">Schedule Interview</Button>
                        <Button size="sm" variant="outline">Send Message</Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="flex items-center"
                          onClick={() => downloadResume(mockCandidates.find(c => c.id === selectedCandidate)?.name || "")}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download Resume
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shortlisted" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Shortlisted Candidates</CardTitle>
                <CardDescription>
                  Candidates who have been shortlisted for further consideration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center text-muted-foreground">
                  <p>No shortlisted candidates to show</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interviewing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Interviewing Candidates</CardTitle>
                <CardDescription>
                  Candidates currently in the interview process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center text-muted-foreground">
                  <p>No candidates in interview stage</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="offer" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Offer Stage Candidates</CardTitle>
                <CardDescription>
                  Candidates who have received or pending job offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center text-muted-foreground">
                  <p>No candidates in offer stage</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Candidates</CardTitle>
                <CardDescription>
                  Candidates who were not selected for current opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center text-muted-foreground">
                  <p>No rejected candidates to show</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
