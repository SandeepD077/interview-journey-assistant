
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function MockInterviewPage() {
  const [loading, setLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewType, setInterviewType] = useState("technical");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  
  const interviewTypes = [
    { id: "technical", name: "Technical Interview" },
    { id: "behavioral", name: "Behavioral Interview" },
    { id: "system-design", name: "System Design" }
  ];
  
  const handleStartInterview = async () => {
    setLoading(true);
    
    try {
      // In a real app, you would call the API to get a question
      setTimeout(() => {
        if (interviewType === "technical") {
          setQuestion("Explain the difference between promises and async/await in JavaScript.");
        } else if (interviewType === "behavioral") {
          setQuestion("Tell me about a time when you had to deal with a difficult team member.");
        } else {
          setQuestion("Design a URL shortening service like bit.ly.");
        }
        setInterviewStarted(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error starting interview:", error);
      toast.error("Failed to start interview. Please try again.");
      setLoading(false);
    }
  };
  
  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.error("Please provide an answer before submitting.");
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, you would call the API to get feedback
      setTimeout(() => {
        setFeedback(
          interviewType === "technical" 
            ? "Good explanation of promises and async/await. You correctly highlighted that async/await is syntactic sugar over promises that makes asynchronous code look more synchronous. Consider adding more examples to illustrate the practical differences."
            : interviewType === "behavioral"
              ? "Your response shows good problem-solving and interpersonal skills. Try to structure your answer using the STAR method (Situation, Task, Action, Result) for more clarity."
              : "You've covered the basic requirements and discussed scalability, which is good. Consider discussing data storage options more thoroughly and address potential system bottlenecks."
        );
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error getting feedback:", error);
      toast.error("Failed to analyze your answer. Please try again.");
      setLoading(false);
    }
  };
  
  const handleNewQuestion = () => {
    setQuestion("");
    setAnswer("");
    setFeedback("");
    handleStartInterview();
  };
  
  const handleResetInterview = () => {
    setInterviewStarted(false);
    setQuestion("");
    setAnswer("");
    setFeedback("");
  };

  return (
    <DashboardLayout>
      <Heading 
        title="Mock Interview Practice" 
        description="Practice your interview skills with our AI interviewer"
      />
      
      <SectionContainer className="space-y-6">
        {!interviewStarted ? (
          <Card>
            <CardHeader>
              <CardTitle>Start a Mock Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="technical" 
                value={interviewType} 
                onValueChange={setInterviewType}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  {interviewTypes.map((type) => (
                    <TabsTrigger key={type.id} value={type.id}>
                      {type.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {interviewTypes.map((type) => (
                  <TabsContent key={type.id} value={type.id} className="mt-6">
                    <p className="text-muted-foreground">
                      {type.id === "technical"
                        ? "Practice technical coding questions and algorithmic problems."
                        : type.id === "behavioral"
                          ? "Practice common behavioral questions and improve your soft skills."
                          : "Practice designing large-scale systems and architecture."
                      }
                    </p>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleStartInterview} 
                disabled={loading}
                className="w-full"
              >
                {loading ? "Starting Interview..." : "Start Interview"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Question</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{question}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Type your answer here..." 
                  className="min-h-[150px]"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={loading || feedback}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                {!feedback ? (
                  <Button 
                    onClick={handleSubmitAnswer} 
                    disabled={loading || !answer.trim()}
                    className="w-full sm:w-auto"
                  >
                    {loading ? "Analyzing Answer..." : "Submit Answer"}
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={handleResetInterview}
                      className="w-full sm:w-auto"
                    >
                      End Interview
                    </Button>
                    <Button 
                      onClick={handleNewQuestion}
                      disabled={loading}
                      className="w-full sm:w-auto"
                    >
                      Next Question
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
            
            {feedback && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feedback}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </SectionContainer>
    </DashboardLayout>
  );
}
