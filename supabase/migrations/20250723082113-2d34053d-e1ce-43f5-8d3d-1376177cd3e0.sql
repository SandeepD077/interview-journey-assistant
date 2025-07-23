-- Create aptitude test categories table
CREATE TABLE public.aptitude_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  time_limit_minutes INTEGER NOT NULL DEFAULT 15,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default categories
INSERT INTO public.aptitude_categories (name, description, time_limit_minutes) VALUES
('Quantitative Aptitude', 'Test your mathematical and numerical reasoning skills', 15),
('Logical Reasoning', 'Evaluate your logical thinking and problem-solving abilities', 15),
('Verbal Reasoning', 'Assess your language comprehension and interpretation skills', 15),
('Data Interpretation', 'Measure your ability to analyze and interpret data', 15),
('Geography', 'Test your knowledge of world geography', 15);

-- Create aptitude questions table
CREATE TABLE public.aptitude_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.aptitude_categories(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of options
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create aptitude test attempts table
CREATE TABLE public.aptitude_test_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.aptitude_categories(id) ON DELETE CASCADE,
  questions_data JSONB NOT NULL, -- Store the questions used in this attempt
  answers JSONB NOT NULL, -- Store user answers
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  correct_answers INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  time_taken_seconds INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.aptitude_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aptitude_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aptitude_test_attempts ENABLE ROW LEVEL SECURITY;

-- RLS policies for aptitude_categories (public read access)
CREATE POLICY "Categories are viewable by everyone" 
ON public.aptitude_categories 
FOR SELECT 
USING (true);

-- RLS policies for aptitude_questions (public read access for active questions)
CREATE POLICY "Active questions are viewable by everyone" 
ON public.aptitude_questions 
FOR SELECT 
USING (is_active = true);

-- RLS policies for aptitude_test_attempts (user can only see their own attempts)
CREATE POLICY "Users can view their own test attempts" 
ON public.aptitude_test_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own test attempts" 
ON public.aptitude_test_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add triggers for timestamp updates
CREATE TRIGGER update_aptitude_categories_updated_at
  BEFORE UPDATE ON public.aptitude_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_aptitude_questions_updated_at
  BEFORE UPDATE ON public.aptitude_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get random questions for a test
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
) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to save test results and update user progress
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
RETURNS UUID AS $$
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
    aptitude_test_score = GREATEST(user_progress.aptitude_test_score, p_score),
    aptitude_tests_taken = user_progress.aptitude_tests_taken + 1,
    last_activity_date = now();
  
  RETURN attempt_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;