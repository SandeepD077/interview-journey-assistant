
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { aptitudeTests, Question, AptitudeTest } from "@/data/aptitudeQuestions";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Timer, Clock, ChevronLeft, ChevronRight, CheckCircle, RefreshCw, Loader2 } from "lucide-react";

export default function AptitudeTestPage() {
  const { currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTest, setSelectedTest] = useState<AptitudeTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [testResult, setTestResult] = useState<{
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeTaken: number;
  } | null>(null);
  const [loadingResult, setLoadingResult] = useState(false);
  
  // Redirect if no user or wrong user type
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role !== "user") {
    return <Navigate to="/organization-dashboard" replace />;
  }

  // Check if a test is selected from URL
  useEffect(() => {
    const testId = searchParams.get('test');
    if (testId) {
      const test = aptitudeTests.find(t => t.id === testId);
      if (test) {
        setSelectedTest(test);
      }
    }
  }, [searchParams]);

  // Initialize timer when test starts
  useEffect(() => {
    if (selectedTest && testActive && !testFinished) {
      setTimeLeft(selectedTest.timeLimit * 60); // Convert minutes to seconds
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [selectedTest, testActive, testFinished]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const selectTest = (test: AptitudeTest) => {
    setSelectedTest(test);
    setSearchParams({ test: test.id });
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setTestFinished(false);
    setTestActive(false);
    setTestResult(null);
  };

  const startTest = () => {
    setTestActive(true);
  };

  const selectAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (selectedTest && currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishTest = () => {
    if (!selectedTest) return;
    
    setLoadingResult(true);
    
    // Calculate result
    setTimeout(() => {
      let correctAnswers = 0;
      
      selectedTest.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      const score = Math.round((correctAnswers / selectedTest.questions.length) * 100);
      const timeTaken = selectedTest.timeLimit * 60 - timeLeft;
      
      setTestResult({
        score,
        correctAnswers,
        totalQuestions: selectedTest.questions.length,
        timeTaken
      });
      
      setTestFinished(true);
      setTestActive(false);
      setLoadingResult(false);
      
      toast.success("Test completed! See your results below.");
    }, 1500);
  };

  const resetTest = () => {
    if (!selectedTest) return;
    
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setTestFinished(false);
    setTestActive(false);
    setTestResult(null);
  };

  const renderTestSelection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aptitudeTests.map((test) => (
          <Card 
            key={test.id}
            className={`card-hover ${selectedTest?.id === test.id ? 'border-primary' : ''}`}
            onClick={() => selectTest(test)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{test.title}</CardTitle>
                {selectedTest?.id === test.id && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span>Questions:</span>
                  <span className="font-medium">{test.questions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Time Limit:</span>
                  <span className="font-medium">{test.timeLimit} minutes</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedTest?.id === test.id ? "default" : "outline"} 
                className="w-full"
                onClick={() => selectTest(test)}
              >
                {selectedTest?.id === test.id ? "Selected" : "Select"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  const renderTestInstructions = () => {
    if (!selectedTest) return null;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>{selectedTest.title} Test</CardTitle>
          <CardDescription>{selectedTest.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Instructions:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>This test contains {selectedTest.questions.length} questions.</li>
              <li>You have {selectedTest.timeLimit} minutes to complete the test.</li>
              <li>Each question has only one correct answer.</li>
              <li>You can navigate between questions using the Next and Previous buttons.</li>
              <li>You can review your answers before submitting the test.</li>
              <li>The test will be automatically submitted when the time is up.</li>
            </ul>
          </div>
          
          <div className="flex items-center p-3 bg-yellow-50 text-yellow-800 rounded-md">
            <Clock className="h-5 w-5 mr-2" />
            <span>Time Limit: <strong>{selectedTest.timeLimit} minutes</strong></span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setSelectedTest(null)}>
            Back to Tests
          </Button>
          <Button onClick={startTest}>
            Start Test
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderTestQuestion = () => {
    if (!selectedTest) return null;
    
    const currentQ = selectedTest.questions[currentQuestion];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{selectedTest.title}</h2>
            <p className="text-muted-foreground">Question {currentQuestion + 1} of {selectedTest.questions.length}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold flex items-center">
              <Timer className="mr-2 h-5 w-5 text-orange-500" />
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-muted-foreground">Time Remaining</p>
          </div>
        </div>
        
        <Progress 
          value={((currentQuestion + 1) / selectedTest.questions.length) * 100} 
          className="h-2"
        />
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="font-medium text-lg">Question {currentQuestion + 1}</div>
                <p>{currentQ.question}</p>
              </div>
              
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div 
                    key={index}
                    className={`
                      p-3 border rounded-md cursor-pointer
                      ${selectedAnswers[currentQ.id] === option 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50'}
                    `}
                    onClick={() => selectAnswer(currentQ.id, option)}
                  >
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`
                          w-5 h-5 rounded-full flex items-center justify-center 
                          ${selectedAnswers[currentQ.id] === option 
                            ? 'bg-primary text-white' 
                            : 'border border-gray-300'}
                        `}
                      >
                        {selectedAnswers[currentQ.id] === option && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={goToPrevQuestion} 
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentQuestion < selectedTest.questions.length - 1 ? (
              <Button onClick={goToNextQuestion}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={finishTest}>
                Finish Test
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2 max-w-lg">
            {selectedTest.questions.map((_, idx) => (
              <Button
                key={idx}
                variant={idx === currentQuestion ? "default" : selectedAnswers[selectedTest.questions[idx].id] ? "secondary" : "outline"}
                size="sm"
                className="w-10 h-10 p-0"
                onClick={() => setCurrentQuestion(idx)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTestResult = () => {
    if (!selectedTest || !testResult) return null;
    
    const { score, correctAnswers, totalQuestions, timeTaken } = testResult;
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const scoreColor = score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600";
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Test Results: {selectedTest.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full h-32 w-32 border-8 border-primary/20">
                <div className={`text-3xl font-bold ${scoreColor}`}>{score}%</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold">{correctAnswers}/{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold">{selectedTest.timeLimit * 60 - timeTaken}s</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold">{minutes}m {seconds}s</div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-semibold">Question Review</h3>
              
              <div className="space-y-4">
                {selectedTest.questions.map((question, idx) => {
                  const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
                  
                  return (
                    <div key={idx} className={`p-4 border rounded-md ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="space-y-2">
                        <div className="font-medium">{idx + 1}. {question.question}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Your Answer: </span>
                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {selectedAnswers[question.id] || "No answer"}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Correct Answer: </span>
                            <span className="text-green-600">{question.correctAnswer}</span>
                          </div>
                        </div>
                        {question.explanation && (
                          <div className="text-sm bg-white/50 p-2 rounded">
                            <span className="font-medium">Explanation: </span>
                            {question.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button variant="outline" onClick={() => setSelectedTest(null)}>
              Back to Tests
            </Button>
            <Button onClick={resetTest}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Test
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderLoadingResult = () => {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
          <h3 className="text-xl font-medium mb-2">Calculating Results</h3>
          <p className="text-muted-foreground">Please wait while we evaluate your test...</p>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Heading 
          title="Aptitude Tests" 
          description="Practice with quantitative, logical, verbal, and data interpretation questions"
        />
        
        {!selectedTest && renderTestSelection()}
        {selectedTest && !testActive && !testFinished && renderTestInstructions()}
        {selectedTest && testActive && !testFinished && renderTestQuestion()}
        {loadingResult && renderLoadingResult()}
        {selectedTest && testFinished && testResult && renderTestResult()}
      </div>
    </DashboardLayout>
  );
}
