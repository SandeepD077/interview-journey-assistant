
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mic, StopCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function MockInterviewPage() {
  const { currentUser } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [userResponse, setUserResponse] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [interviewType, setInterviewType] = useState<string>("behavioral");
  const [jobRole, setJobRole] = useState<string>("Software Engineer");
  
  // Redirect if no user
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "user") {
    return <Navigate to="/organization-dashboard" replace />;
  }
  
  const startRecording = () => {
    setIsRecording(true);
    toast.success("Recording started");
    
    // In a real implementation, this would use the Web Audio API
    // For now we'll simulate recording
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    toast.success("Recording stopped");
    
    // Simulate processing the recording
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      generateFeedback();
    }, 2000);
  };
  
  const generateNextQuestion = async () => {
    setLoading(true);
    setCurrentQuestion("");
    setUserResponse("");
    setFeedback("");
    
    // Simulated API call to Gemini to generate a question
    setTimeout(() => {
      let question = "";
      
      if (interviewType === "behavioral") {
        const behavioralQuestions = [
          "Tell me about a time when you had to overcome a significant challenge in a project.",
          "Describe a situation where you had to work with a difficult team member. How did you handle it?",
          "Give an example of a time when you showed leadership skills.",
          "Talk about a time when you failed. What did you learn from it?",
          "How do you handle working under pressure or tight deadlines?"
        ];
        question = behavioralQuestions[Math.floor(Math.random() * behavioralQuestions.length)];
      } else if (interviewType === "technical") {
        const technicalQuestions = [
          `For a ${jobRole} role, explain how you would design a scalable system for handling high traffic.`,
          `What's your approach to testing code? Can you explain different testing methodologies you've used as a ${jobRole}?`,
          `How would you optimize the performance of a slow application?`,
          `Explain the concept of dependency injection and when you would use it.`,
          `What version control strategies have you used in your previous projects?`
        ];
        question = technicalQuestions[Math.floor(Math.random() * technicalQuestions.length)];
      }
      
      setCurrentQuestion(question);
      setLoading(false);
    }, 2000);
  };
  
  const generateFeedback = () => {
    // Simulate API call to Gemini to generate feedback
    setLoading(true);
    
    setTimeout(() => {
      const feedbackOptions = [
        "Your answer was well-structured and provided specific examples. To improve, consider quantifying your achievements more precisely.",
        "You demonstrated good knowledge, but your response could be more concise. Try to focus on the most relevant points and avoid tangents.",
        "Your answer showed enthusiasm, which is great! However, consider providing more concrete examples to support your claims.",
        "Good response. To make it stronger, try using the STAR method (Situation, Task, Action, Result) to structure your answers for behavioral questions.",
        "You presented your thoughts clearly. For improvement, consider the audience and tailor your technical explanations accordingly."
      ];
      
      setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
      setLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Mock Interview</h1>
          <p className="text-muted-foreground">
            Practice your interview skills with our AI-powered mock interviewer
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Interview Settings</CardTitle>
            <CardDescription>
              Configure the type of interview you want to practice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Tabs 
                defaultValue="behavioral" 
                value={interviewType} 
                onValueChange={(value) => setInterviewType(value)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {interviewType === "technical" && (
              <div className="space-y-2">
                <label htmlFor="job-role" className="text-sm font-medium">Job Role</label>
                <Input 
                  id="job-role"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g. Software Engineer, Data Scientist"
                />
              </div>
            )}
            
            <Button onClick={generateNextQuestion} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Interview Question"
              )}
            </Button>
          </CardContent>
        </Card>
        
        {currentQuestion && (
          <Card>
            <CardHeader>
              <CardTitle>Interview Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{currentQuestion}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant={isRecording ? "destructive" : "default"}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? (
                  <>
                    <StopCircle className="mr-2 h-4 w-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Start Recording
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={generateNextQuestion} disabled={loading}>
                {loading ? "Loading..." : "Next Question"}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Response</CardTitle>
              <CardDescription>
                Type or record your answer to the question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter or speak your response here..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                rows={8}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={generateFeedback} disabled={!userResponse || loading} className="w-full">
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Get Feedback"
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Feedback</CardTitle>
              <CardDescription>
                Personalized feedback on your interview response
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feedback ? (
                <div className="space-y-4">
                  <p>{feedback}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  <p>Record or type your response to receive feedback</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
