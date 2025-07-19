import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUserProgress } from "@/hooks/useUserProgress";
import { AlertCircle, CheckCircle, Clock, Trophy, Target, BookOpen, Brain, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ProgressDashboard() {
  const { progress, interviewAttempts, loading, error } = useUserProgress();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
              <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Resume Completion */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resume</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress?.resume_completion_percentage || 0}%</div>
            <Progress value={progress?.resume_completion_percentage || 0} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Completion Progress</p>
          </CardContent>
        </Card>

        {/* Aptitude Tests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aptitude Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress?.aptitude_test_score || 0}</div>
            <p className="text-xs text-muted-foreground">
              Tests taken: {progress?.aptitude_tests_taken || 0}
            </p>
          </CardContent>
        </Card>

        {/* DSA Practice */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DSA Practice</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress?.dsa_accuracy_percentage || 0}%</div>
            <p className="text-xs text-muted-foreground">
              {progress?.dsa_questions_correct || 0}/{progress?.dsa_questions_attempted || 0} correct
            </p>
          </CardContent>
        </Card>

        {/* Interview Progress */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.interview_rounds_completed || 0}/{progress?.total_interview_rounds || 0}
            </div>
            <p className="text-xs text-muted-foreground">Rounds completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* DSA Progress Detail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              DSA Practice Statistics
            </CardTitle>
            <CardDescription>Your data structures and algorithms progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Questions Attempted</span>
              <span className="font-semibold">{progress?.dsa_questions_attempted || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Correct Answers</span>
              <span className="font-semibold">{progress?.dsa_questions_correct || 0}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Accuracy Rate</span>
                <span className="font-semibold">{progress?.dsa_accuracy_percentage || 0}%</span>
              </div>
              <Progress value={Number(progress?.dsa_accuracy_percentage) || 0} />
            </div>
          </CardContent>
        </Card>

        {/* Interview Attempts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Interview Rounds
            </CardTitle>
            <CardDescription>Your interview preparation journey</CardDescription>
          </CardHeader>
          <CardContent>
            {interviewAttempts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No interview rounds yet. Start your preparation!</p>
            ) : (
              <div className="space-y-3">
                {interviewAttempts.map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(attempt.status)}
                      <div>
                        <div className="font-medium">{attempt.round_name}</div>
                        <div className="text-sm text-muted-foreground">Round {attempt.round_number}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {attempt.score && (
                        <span className="text-sm font-medium">{attempt.score}/100</span>
                      )}
                      <Badge className={getStatusColor(attempt.status)}>
                        {attempt.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resume Progress Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resume Builder Progress
          </CardTitle>
          <CardDescription>Complete your professional resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Completion Status</span>
              <span className="font-semibold">{progress?.resume_completion_percentage || 0}%</span>
            </div>
            <Progress value={progress?.resume_completion_percentage || 0} />
            <div className="text-sm text-muted-foreground">
              {progress?.resume_completion_percentage === 100 
                ? "🎉 Resume completed! Ready to apply for jobs."
                : progress && progress.resume_completion_percentage > 0
                ? "Keep going! Add more sections to complete your resume."
                : "Start building your professional resume to showcase your skills."
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}