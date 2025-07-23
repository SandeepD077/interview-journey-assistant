import { supabase } from '@/integrations/supabase/client';

export interface AptitudeTestResult {
  user_id: string;
  category_name: string;
  questions_data: any;
  answers: any;
  score: number;
  correct_answers: number;
  total_questions: number;
  time_taken_seconds: number;
}

export const saveAptitudeTestResult = async (result: AptitudeTestResult) => {
  try {
    const { data, error } = await supabase
      .rpc('save_aptitude_test_result', {
        p_user_id: result.user_id,
        p_category_name: result.category_name,
        p_questions_data: result.questions_data,
        p_answers: result.answers,
        p_score: result.score,
        p_correct_answers: result.correct_answers,
        p_total_questions: result.total_questions,
        p_time_taken_seconds: result.time_taken_seconds
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving aptitude test result:', error);
    throw error;
  }
};

export const getRandomAptitudeQuestions = async (category: string, count: number = 5) => {
  try {
    const { data, error } = await supabase
      .rpc('get_random_aptitude_questions', {
        category_name: category,
        question_count: count
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching random questions:', error);
    throw error;
  }
};

export const getUserAptitudeHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('aptitude_test_attempts')
      .select(`
        *,
        aptitude_categories:category_id (
          name,
          description
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user aptitude history:', error);
    throw error;
  }
};