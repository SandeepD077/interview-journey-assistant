export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      aptitude_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          time_limit_minutes: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          time_limit_minutes?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          time_limit_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      aptitude_questions: {
        Row: {
          category_id: string
          correct_answer: string
          created_at: string
          difficulty_level: string | null
          explanation: string | null
          id: string
          is_active: boolean
          options: Json
          question_text: string
          updated_at: string
        }
        Insert: {
          category_id: string
          correct_answer: string
          created_at?: string
          difficulty_level?: string | null
          explanation?: string | null
          id?: string
          is_active?: boolean
          options: Json
          question_text: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          correct_answer?: string
          created_at?: string
          difficulty_level?: string | null
          explanation?: string | null
          id?: string
          is_active?: boolean
          options?: Json
          question_text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "aptitude_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "aptitude_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      aptitude_test_attempts: {
        Row: {
          answers: Json
          category_id: string
          completed_at: string
          correct_answers: number
          created_at: string
          id: string
          questions_data: Json
          score: number
          time_taken_seconds: number
          total_questions: number
          user_id: string
        }
        Insert: {
          answers: Json
          category_id: string
          completed_at?: string
          correct_answers?: number
          created_at?: string
          id?: string
          questions_data: Json
          score: number
          time_taken_seconds?: number
          total_questions?: number
          user_id: string
        }
        Update: {
          answers?: Json
          category_id?: string
          completed_at?: string
          correct_answers?: number
          created_at?: string
          id?: string
          questions_data?: Json
          score?: number
          time_taken_seconds?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aptitude_test_attempts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "aptitude_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_attempts: {
        Row: {
          completed_at: string | null
          created_at: string
          feedback: string | null
          id: string
          round_name: string
          round_number: number
          score: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          round_name: string
          round_number: number
          score?: number | null
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          round_name?: string
          round_number?: number
          score?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resumes: {
        Row: {
          certifications: Json
          completion_percentage: number | null
          created_at: string
          education: Json
          experience: Json
          id: string
          is_active: boolean
          personal_info: Json
          projects: Json
          skills: Json
          template_id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          certifications?: Json
          completion_percentage?: number | null
          created_at?: string
          education?: Json
          experience?: Json
          id?: string
          is_active?: boolean
          personal_info: Json
          projects?: Json
          skills?: Json
          template_id: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          certifications?: Json
          completion_percentage?: number | null
          created_at?: string
          education?: Json
          experience?: Json
          id?: string
          is_active?: boolean
          personal_info?: Json
          projects?: Json
          skills?: Json
          template_id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          aptitude_test_score: number | null
          aptitude_tests_taken: number | null
          created_at: string
          dsa_accuracy_percentage: number | null
          dsa_questions_attempted: number | null
          dsa_questions_correct: number | null
          id: string
          interview_rounds_completed: number | null
          last_activity_date: string | null
          resume_completion_percentage: number | null
          total_interview_rounds: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          aptitude_test_score?: number | null
          aptitude_tests_taken?: number | null
          created_at?: string
          dsa_accuracy_percentage?: number | null
          dsa_questions_attempted?: number | null
          dsa_questions_correct?: number | null
          id?: string
          interview_rounds_completed?: number | null
          last_activity_date?: string | null
          resume_completion_percentage?: number | null
          total_interview_rounds?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          aptitude_test_score?: number | null
          aptitude_tests_taken?: number | null
          created_at?: string
          dsa_accuracy_percentage?: number | null
          dsa_questions_attempted?: number | null
          dsa_questions_correct?: number | null
          id?: string
          interview_rounds_completed?: number | null
          last_activity_date?: string | null
          resume_completion_percentage?: number | null
          total_interview_rounds?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_resume_completion: {
        Args: { resume_data: Json }
        Returns: number
      }
      get_random_aptitude_questions: {
        Args: { category_name: string; question_count?: number }
        Returns: {
          id: string
          question_text: string
          options: Json
          correct_answer: string
          explanation: string
          difficulty_level: string
        }[]
      }
      save_aptitude_test_result: {
        Args: {
          p_user_id: string
          p_category_name: string
          p_questions_data: Json
          p_answers: Json
          p_score: number
          p_correct_answers: number
          p_total_questions: number
          p_time_taken_seconds: number
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
