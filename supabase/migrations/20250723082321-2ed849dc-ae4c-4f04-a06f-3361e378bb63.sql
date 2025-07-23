-- Fix security warnings by setting search_path for functions

-- Update the get_random_aptitude_questions function with proper search_path
CREATE OR REPLACE FUNCTION public.get_random_aptitude_questions(
  category_name TEXT,
  question_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  question_text TEXT,
  options JSONB,
  correct_answer TEXT,
  explanation TEXT,
  difficulty_level TEXT
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    q.id,
    q.question_text,
    q.options,
    q.correct_answer,
    q.explanation,
    q.difficulty_level
  FROM public.aptitude_questions q
  JOIN public.aptitude_categories c ON q.category_id = c.id
  WHERE c.name = category_name 
    AND q.is_active = true
  ORDER BY RANDOM()
  LIMIT question_count;
END;
$$;

-- Update the save_aptitude_test_result function with proper search_path
CREATE OR REPLACE FUNCTION public.save_aptitude_test_result(
  p_user_id UUID,
  p_category_name TEXT,
  p_questions_data JSONB,
  p_answers JSONB,
  p_score INTEGER,
  p_correct_answers INTEGER,
  p_total_questions INTEGER,
  p_time_taken_seconds INTEGER
)
RETURNS UUID 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = ''
AS $$
DECLARE
  category_uuid UUID;
  attempt_id UUID;
BEGIN
  -- Get category ID
  SELECT id INTO category_uuid 
  FROM public.aptitude_categories 
  WHERE name = p_category_name;
  
  -- Insert test attempt
  INSERT INTO public.aptitude_test_attempts (
    user_id,
    category_id,
    questions_data,
    answers,
    score,
    correct_answers,
    total_questions,
    time_taken_seconds
  ) VALUES (
    p_user_id,
    category_uuid,
    p_questions_data,
    p_answers,
    p_score,
    p_correct_answers,
    p_total_questions,
    p_time_taken_seconds
  ) RETURNING id INTO attempt_id;
  
  -- Update user progress with best score and increment tests taken
  INSERT INTO public.user_progress (
    user_id,
    aptitude_test_score,
    aptitude_tests_taken,
    last_activity_date
  ) VALUES (
    p_user_id,
    p_score,
    1,
    now()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    aptitude_test_score = GREATEST(public.user_progress.aptitude_test_score, p_score),
    aptitude_tests_taken = public.user_progress.aptitude_tests_taken + 1,
    last_activity_date = now();
  
  RETURN attempt_id;
END;
$$;