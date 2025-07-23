import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { getUserAptitudeHistory } from "@/services/aptitudeTestService";
import { getUserDSAProgress } from "@/services/dsaPracticeService";
import { 
  Brain, 
  Code, 
  TrendingUp, 
  Calendar,
  Target,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";

interface DSAProgress {
  dsa_questions_attempted: number;
  dsa_questions_correct: number;
  dsa_accuracy_percentage: number;
}

interface AptitudeAttempt {
  id: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  created_at: string;
  aptitude_categories: {
    name: string;
    description: string;
  };
}

export function ProgressTracker() {
  const { currentUser } = useAuth();
  const { progress, loading: progressLoading } = useUserProgress();
  const [dsaProgress, setDsaProgress] = useState<DSAProgress | null>(null);
  const [aptitudeHistory, setAptitudeHistory] = useState<AptitudeAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!currentUser?.id) return;
      
      try {
        setLoading(true);
        
        // Fetch DSA progress
        const dsaData = await getUserDSAProgress(currentUser.id);
        setDsaProgress(dsaData);
        
        // Fetch aptitude test history
        const aptitudeData = await getUserAptitudeHistory(currentUser.id);
        setAptitudeHistory(aptitudeData);
        
      } catch (error) {
        console.error('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [currentUser?.id]);

  if (loading || progressLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  const getAccuracyColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resume Progress</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.resume_completion_percentage || 0}%
            </div>
            <Progress 
              value={progress?.resume_completion_percentage || 0} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Complete your resume to unlock more features
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aptitude Tests</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.aptitude_tests_taken || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Tests completed
            </p>
            <p className="text-xs text-muted-foreground">
              Best Score: {progress?.aptitude_test_score || 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DSA Practice</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dsaProgress?.dsa_questions_attempted || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Questions attempted
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">Accuracy:</span>
              <span className={`text-xs font-medium ${getAccuracyColor(dsaProgress?.dsa_accuracy_percentage || 0)}`}>
                {(dsaProgress?.dsa_accuracy_percentage || 0).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DSA Detailed Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              DSA Practice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dsaProgress ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Attempted:</span>
                  <span className="font-medium">{dsaProgress.dsa_questions_attempted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Correct Solutions:</span>
                  <span className="font-medium text-green-600">{dsaProgress.dsa_questions_correct}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Accuracy Rate:</span>
                  <span className={`font-medium ${getAccuracyColor(dsaProgress.dsa_accuracy_percentage)}`}>
                    {dsaProgress.dsa_accuracy_percentage.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={dsaProgress.dsa_accuracy_percentage} 
                  className="mt-2"
                />
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No DSA practice data yet. Start solving problems!</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Aptitude Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Recent Aptitude Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aptitudeHistory.length > 0 ? (
              <div className="space-y-3">
                {aptitudeHistory.slice(0, 5).map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-md">
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {attempt.aptitude_categories?.name || 'Unknown Category'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(attempt.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={getScoreColor(attempt.score)}
                        variant="secondary"
                      >
                        {attempt.score}%
                      </Badge>
                      {attempt.score >= 80 ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No aptitude tests taken yet. Take your first test!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}