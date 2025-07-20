-- Create resume data table for storing user resume information
CREATE TABLE public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  personal_info JSONB NOT NULL,
  education JSONB NOT NULL DEFAULT '[]'::jsonb,
  experience JSONB NOT NULL DEFAULT '[]'::jsonb,
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  certifications JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, template_id)
);

-- Enable RLS
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create policies for resumes
CREATE POLICY "Users can view their own resumes" 
ON public.resumes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own resumes" 
ON public.resumes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes" 
ON public.resumes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes" 
ON public.resumes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate resume completion percentage
CREATE OR REPLACE FUNCTION public.calculate_resume_completion(resume_data JSONB)
RETURNS INTEGER AS $$
DECLARE
  completion_score INTEGER := 0;
  total_possible INTEGER := 100;
BEGIN
  -- Personal info (40 points total)
  IF resume_data->'personalInfo'->>'fullName' != '' AND resume_data->'personalInfo'->>'fullName' IS NOT NULL THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF resume_data->'personalInfo'->>'email' != '' AND resume_data->'personalInfo'->>'email' IS NOT NULL THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF resume_data->'personalInfo'->>'phone' != '' AND resume_data->'personalInfo'->>'phone' IS NOT NULL THEN
    completion_score := completion_score + 5;
  END IF;
  
  IF resume_data->'personalInfo'->>'summary' != '' AND resume_data->'personalInfo'->>'summary' IS NOT NULL THEN
    completion_score := completion_score + 15;
  END IF;
  
  -- Education (20 points)
  IF jsonb_array_length(COALESCE(resume_data->'education', '[]'::jsonb)) > 0 THEN
    completion_score := completion_score + 20;
  END IF;
  
  -- Experience (25 points)
  IF jsonb_array_length(COALESCE(resume_data->'experience', '[]'::jsonb)) > 0 THEN
    completion_score := completion_score + 25;
  END IF;
  
  -- Skills (10 points)
  IF jsonb_array_length(COALESCE(resume_data->'skills', '[]'::jsonb)) > 0 THEN
    completion_score := completion_score + 10;
  END IF;
  
  -- Projects (5 points)
  IF jsonb_array_length(COALESCE(resume_data->'projects', '[]'::jsonb)) > 0 THEN
    completion_score := completion_score + 5;
  END IF;
  
  RETURN completion_score;
END;
$$ LANGUAGE plpgsql;