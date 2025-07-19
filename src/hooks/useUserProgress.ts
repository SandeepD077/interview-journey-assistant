import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProgress {
  id: string;
  user_id: string;
  resume_completion_percentage: number;
  aptitude_test_score: number;
  aptitude_tests_taken: number;
  dsa_questions_attempted: number;
  dsa_questions_correct: number;
  dsa_accuracy_percentage: number;
  interview_rounds_completed: number;
  total_interview_rounds: number;
  last_activity_date: string;
  created_at: string;
  updated_at: string;
}

export interface InterviewAttempt {
  id: string;
  user_id: string;
  round_number: number;
  round_name: string;
  status: 'pending' | 'completed' | 'failed' | 'in_progress';
  score?: number;
  feedback?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export function useUserProgress() {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [interviewAttempts, setInterviewAttempts] = useState<InterviewAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser?.id) {
      fetchUserProgress();
    }
  }, [currentUser?.id]);

  const fetchUserProgress = async () => {
    if (!currentUser?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (progressError) {
        throw progressError;
      }

      // Fetch interview attempts
      const { data: attemptsData, error: attemptsError } = await supabase
        .from('interview_attempts')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('round_number', { ascending: true });

      if (attemptsError) {
        throw attemptsError;
      }

      setProgress(progressData);
      setInterviewAttempts((attemptsData || []) as InterviewAttempt[]);
    } catch (err) {
      console.error('Error fetching user progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch progress data');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!currentUser?.id) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: currentUser.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setProgress(data);
    } catch (err) {
      console.error('Error updating progress:', err);
      throw err;
    }
  };

  const addInterviewAttempt = async (attempt: Omit<InterviewAttempt, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!currentUser?.id) return;

    try {
      const { data, error } = await supabase
        .from('interview_attempts')
        .insert({
          user_id: currentUser.id,
          ...attempt
        })
        .select()
        .single();

      if (error) throw error;

      setInterviewAttempts(prev => [...prev, data as InterviewAttempt]);
      return data;
    } catch (err) {
      console.error('Error adding interview attempt:', err);
      throw err;
    }
  };

  return {
    progress,
    interviewAttempts,
    loading,
    error,
    fetchUserProgress,
    updateProgress,
    addInterviewAttempt
  };
}