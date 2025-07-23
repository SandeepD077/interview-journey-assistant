import { supabase } from '@/integrations/supabase/client';

export interface DSAPracticeResult {
  user_id: string;
  question_id: string;
  question_title: string;
  difficulty: string;
  category: string;
  is_correct: boolean;
  solution_code: string;
  language: string;
  time_taken_seconds: number;
}

export const saveDSAPracticeResult = async (result: DSAPracticeResult) => {
  try {
    // Update user progress
    const { data: progressData, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', result.user_id)
      .single();

    if (progressError && progressError.code !== 'PGRST116') {
      throw progressError;
    }

    const currentProgress = progressData || {
      user_id: result.user_id,
      dsa_questions_attempted: 0,
      dsa_questions_correct: 0,
      dsa_accuracy_percentage: 0
    };

    const newAttempted = currentProgress.dsa_questions_attempted + 1;
    const newCorrect = currentProgress.dsa_questions_correct + (result.is_correct ? 1 : 0);
    const newAccuracy = (newCorrect / newAttempted) * 100;

    const { error: updateError } = await supabase
      .from('user_progress')
      .upsert({
        user_id: result.user_id,
        dsa_questions_attempted: newAttempted,
        dsa_questions_correct: newCorrect,
        dsa_accuracy_percentage: newAccuracy,
        last_activity_date: new Date().toISOString()
      });

    if (updateError) throw updateError;

    return { success: true };
  } catch (error) {
    console.error('Error saving DSA practice result:', error);
    throw error;
  }
};

export const getUserDSAProgress = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('dsa_questions_attempted, dsa_questions_correct, dsa_accuracy_percentage')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
    return data || {
      dsa_questions_attempted: 0,
      dsa_questions_correct: 0,
      dsa_accuracy_percentage: 0
    };
  } catch (error) {
    console.error('Error fetching DSA progress:', error);
    throw error;
  }
};