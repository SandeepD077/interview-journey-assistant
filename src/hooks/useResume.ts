import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ResumeFormData } from '@/data/resumeTemplates';
import { toast } from 'sonner';

interface Resume {
  id: string;
  user_id: string;
  template_id: string;
  title: string;
  personal_info: any;
  education: any;
  experience: any;
  skills: any;
  projects: any;
  certifications: any;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
}

export const useResume = (templateId: string) => {
  const { currentUser } = useAuth();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load resume data from Supabase
  const loadResume = async () => {
    if (!currentUser || !templateId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('template_id', templateId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error loading resume:', error);
        toast.error('Failed to load resume data');
        return;
      }

      setResume(data);
    } catch (error) {
      console.error('Error loading resume:', error);
      toast.error('Failed to load resume data');
    } finally {
      setLoading(false);
    }
  };

  // Save resume data to Supabase
  const saveResume = async (formData: ResumeFormData, title: string = 'Untitled Resume') => {
    if (!currentUser || !templateId) return;

    try {
      setSaving(true);

      // Calculate completion percentage
      const resumeData = {
        personalInfo: formData.personalInfo,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        projects: formData.projects,
        certifications: formData.certifications
      };

      const { data: completionData, error: completionError } = await supabase
        .rpc('calculate_resume_completion', { resume_data: resumeData });

      if (completionError) {
        console.error('Error calculating completion:', completionError);
      }

      const completionPercentage = completionData || 0;

      const resumeRecord = {
        user_id: currentUser.id,
        template_id: templateId,
        title,
        personal_info: formData.personalInfo,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        projects: formData.projects,
        certifications: formData.certifications,
        completion_percentage: completionPercentage
      };

      const { data, error } = await supabase
        .from('resumes')
        .upsert(resumeRecord, {
          onConflict: 'user_id,template_id'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving resume:', error);
        toast.error('Failed to save resume');
        return;
      }

      setResume(data);
      
      // Update user progress
      await supabase
        .from('user_progress')
        .upsert({
          user_id: currentUser.id,
          resume_completion_percentage: completionPercentage,
          last_activity_date: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      toast.success('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  // Convert resume data to form data format
  const getFormData = (): ResumeFormData | null => {
    if (!resume) return null;

    return {
      personalInfo: resume.personal_info,
      education: resume.education,
      experience: resume.experience,
      skills: resume.skills,
      projects: resume.projects,
      certifications: resume.certifications
    };
  };

  useEffect(() => {
    loadResume();
  }, [currentUser, templateId]);

  return {
    resume,
    loading,
    saving,
    saveResume,
    getFormData,
    reloadResume: loadResume
  };
};