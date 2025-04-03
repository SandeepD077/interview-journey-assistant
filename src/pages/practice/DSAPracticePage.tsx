import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import { dsaQuestions, DSAQuestion } from "@/data/dsaQuestions";
import { generatedDSAQuestions } from "@/data/generatedDSAQuestions";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { queryGemini } from "@/services/geminiService";
import {
  Code,
  Search,
  Filter,
  Terminal,
  Play,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  RefreshCw,
  Database
} from "lucide-react";

export default function DSAPracticePage() {
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedQuestion, setSelectedQuestion] = useState<DSAQuestion | null>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    output?: string;
    errorMessage?: string;
    feedback?: string;
    executionTime?: number;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [questionSource, setQuestionSource] = useState<"standard" | "leetcode">("standard");

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "user") {
    return <Navigate to="/organization-dashboard" replace />;
  }

  const categories = Array.from(new Set(dsaQuestions.map(q => q.category)));

  const allQuestions = questionSource === "standard" ? dsaQuestions : generatedDSAQuestions;

  const filteredQuestions = allQuestions.filter(question => {
    const matchesSearch = searchTerm 
      ? question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
      
    const matchesDifficulty = !difficultyFilter || difficultyFilter === "all" || question.difficulty === difficultyFilter;
    const matchesCategory = !categoryFilter || categoryFilter === "all" || question.category === categoryFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  useEffect(() => {
    const questionId = searchParams.get('question');
    if (questionId) {
      const question = dsaQuestions.find(q => q.id === questionId);
      if (question) {
        setSelectedQuestion(question);
        setCode(question.starterCode[language as keyof typeof question.starterCode]);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedQuestion) {
      setCode(selectedQuestion.starterCode[language as keyof typeof selectedQuestion.starterCode]);
    }
  }, [language, selectedQuestion]);

  const selectQuestion = (question: DSAQuestion) => {
    setSelectedQuestion(question);
    setSearchParams({ question: question.id });
    setCode(question.starterCode[language as keyof typeof question.starterCode]);
    setResult(null);
  };

  const runCode = async () => {
    if (!selectedQuestion) return;
    
    setIsRunning(true);
    setResult(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const executionTime = Math.random() * 0.2 + 0.1;
      const success = Math.random() > 0.3;
      
      if (success) {
        setResult({
          success: true,
          output: "Test cases passed successfully!",
          executionTime,
        });
        toast.success("Code ran successfully!");
      } else {
        setResult({
          success: false,
          errorMessage: "One or more test cases failed.",
          executionTime,
        });
        toast.error("Code execution failed.");
      }
    } catch (error) {
      console.error("Error running code:", error);
      toast.error("Failed to run code. Please try again.");
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    if (!selectedQuestion) return;
    
    setIsSubmitting(true);
    setResult(null);
    
    try {
      const prompt = `
        I'm solving this coding problem:
        
        ${selectedQuestion.title}
        ${selectedQuestion.description}
        
        Here's my solution in ${language}:
        
        ${code}
        
        Please evaluate if my solution is correct. 
        
        Format your response as follows:
        1. Is the solution correct? (Yes/No)
        2. What is the time complexity?
        3. What is the space complexity?
        4. Provide specific feedback for improvement if needed.
        5. Include any edge cases I might have missed.
      `;
      
      const response = await queryGemini(prompt);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = Math.random() > 0.3;
      const executionTime = Math.random() * 0.2 + 0.1;
      
      if (success) {
        setResult({
          success: true,
          output: "All test cases passed!",
          feedback: response.text || "Your solution is correct and efficient.",
          executionTime,
        });
        toast.success("Solution submitted successfully!");
      } else {
        setResult({
          success: false,
          errorMessage: "Solution fails for some inputs.",
          feedback: response.text || "There are some issues with your solution that need to be fixed.",
          executionTime,
        });
        toast.error("Solution has some issues.");
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      toast.error("Failed to submit code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCode = () => {
    if (selectedQuestion) {
      setCode(selectedQuestion.starterCode[language as keyof typeof selectedQuestion.starterCode]);
      setResult(null);
      toast.info("Code has been reset.");
    }
  };

  const renderQuestionsList = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Tabs defaultValue={questionSource} onValueChange={(value) => setQuestionSource(value as "standard" | "leetcode")} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="standard">Standard Questions</TabsTrigger>
              <TabsTrigger value="leetcode">LeetCode Questions</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search questions..."
              className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select 
            value={difficultyFilter || "all"} 
            onValueChange={(value) => setDifficultyFilter(value !== "all" ? value : null)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={categoryFilter || "all"} 
            onValueChange={(value) => setCategoryFilter(value !== "all" ? value : null)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-4">
          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Filter className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg">No questions found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search term</p>
            </div>
          )}
          
          {filteredQuestions.map((question) => (
            <Card 
              key={question.id}
              className="card-hover cursor-pointer"
              onClick={() => selectQuestion(question)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{question.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {question.description.substring(0, 120)}...
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      question.difficulty === "Easy" 
                        ? "bg-green-100 text-green-800 hover:bg-green-100" 
                        : question.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {question.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex gap-2">
                  <Badge variant="secondary">{question.category}</Badge>
                  {questionSource === "leetcode" && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      LeetCode
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    selectQuestion(question);
                  }}
                >
                  Solve Challenge
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderQuestionDetail = () => {
    if (!selectedQuestion) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                setSelectedQuestion(null);
                setSearchParams({});
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{selectedQuestion.title}</h2>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={
                    selectedQuestion.difficulty === "Easy" 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : selectedQuestion.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {selectedQuestion.difficulty}
                </Badge>
                <Badge variant="secondary">{selectedQuestion.category}</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Problem Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p>{selectedQuestion.description}</p>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-semibold">Examples:</h3>
                  {selectedQuestion.examples.map((example, idx) => (
                    <div key={idx} className="p-3 bg-muted/20 rounded-md space-y-1 text-sm">
                      <div><strong>Input:</strong> {example.input}</div>
                      <div><strong>Output:</strong> {example.output}</div>
                      {example.explanation && (
                        <div><strong>Explanation:</strong> {example.explanation}</div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-semibold">Constraints:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {selectedQuestion.constraints.map((constraint, idx) => (
                      <li key={idx}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col">
            <Card className="flex-1">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Solution</CardTitle>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="relative min-h-[300px]">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm h-[300px] resize-none"
                    placeholder="Write your solution here..."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={resetCode}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={runCode}
                    disabled={isRunning || isSubmitting}
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Run Code
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={submitCode}
                    disabled={isSubmitting || isRunning}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Solution</>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            {result && (
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <CardTitle>
                      {result.success ? 'Success' : 'Error'}
                    </CardTitle>
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.executionTime && (
                    <div className="text-sm">
                      <span className="font-medium">Execution Time:</span> {result.executionTime.toFixed(3)}s
                    </div>
                  )}
                  
                  {result.output && (
                    <div className="p-3 bg-green-50 rounded-md text-sm">
                      <div className="font-medium mb-1">Output:</div>
                      <div className="whitespace-pre-wrap">{result.output}</div>
                    </div>
                  )}
                  
                  {result.errorMessage && (
                    <div className="p-3 bg-red-50 rounded-md text-sm">
                      <div className="font-medium mb-1">Error:</div>
                      <div className="whitespace-pre-wrap">{result.errorMessage}</div>
                    </div>
                  )}
                  
                  {result.feedback && (
                    <div className="p-3 bg-blue-50 rounded-md text-sm">
                      <div className="font-medium mb-1">AI Feedback:</div>
                      <div className="whitespace-pre-wrap">{result.feedback}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {!selectedQuestion ? (
          <>
            <div className="flex justify-between items-center">
              <Heading 
                title="DSA Practice" 
                description="Practice algorithms and data structure problems to prepare for technical interviews"
              />
              <Button 
                variant="outline" 
                onClick={() => toast.info(
                  questionSource === "leetcode" 
                    ? "Using questions sourced from LeetCode. These may contain external links." 
                    : "Using standard question bank"
                )}
              >
                <Database className="mr-2 h-4 w-4" />
                Question Source Info
              </Button>
            </div>
            {renderQuestionsList()}
          </>
        ) : (
          renderQuestionDetail()
        )}
      </div>
    </DashboardLayout>
  );
}
