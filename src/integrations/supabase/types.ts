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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      answer_choices: {
        Row: {
          choice_order: number
          choice_text: string
          created_at: string
          explanation: string | null
          id: string
          leadership_trait: string | null
          points: number
          question_id: string
        }
        Insert: {
          choice_order: number
          choice_text: string
          created_at?: string
          explanation?: string | null
          id?: string
          leadership_trait?: string | null
          points: number
          question_id: string
        }
        Update: {
          choice_order?: number
          choice_text?: string
          created_at?: string
          explanation?: string | null
          id?: string
          leadership_trait?: string | null
          points?: number
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_choices_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          assigned_by: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          lesson_id: string | null
          module_id: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          lesson_id?: string | null
          module_id?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          lesson_id?: string | null
          module_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          name: string
          points_required: number | null
          requirements: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
          points_required?: number | null
          requirements?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          points_required?: number | null
          requirements?: Json | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          level: string | null
          name: string
          requirements: Json | null
          template_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          level?: string | null
          name: string
          requirements?: Json | null
          template_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          level?: string | null
          name?: string
          requirements?: Json | null
          template_url?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          likes_count: number | null
          parent_comment_id: string | null
          replies_count: number | null
          updated_at: string
          user_id: string
          video_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          replies_count?: number | null
          updated_at?: string
          user_id: string
          video_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          replies_count?: number | null
          updated_at?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          category_type: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          location: string | null
          name: string
          posts_count: number | null
          updated_at: string
        }
        Insert: {
          category_type?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name: string
          posts_count?: number | null
          updated_at?: string
        }
        Update: {
          category_type?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          name?: string
          posts_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          category_id: string
          content: string
          created_at: string
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          last_reply_at: string | null
          last_reply_by: string | null
          replies_count: number | null
          title: string
          updated_at: string
          user_id: string
          views_count: number | null
        }
        Insert: {
          category_id: string
          content: string
          created_at?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_reply_at?: string | null
          last_reply_by?: string | null
          replies_count?: number | null
          title: string
          updated_at?: string
          user_id: string
          views_count?: number | null
        }
        Update: {
          category_id?: string
          content?: string
          created_at?: string
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_reply_at?: string | null
          last_reply_by?: string | null
          replies_count?: number | null
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string
          id: string
          is_solution: boolean | null
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_solution?: boolean | null
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_solution?: boolean | null
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          anonymous_id: string
          created_at: string
          description: string
          evidence_urls: string[] | null
          id: string
          incident_type: Database["public"]["Enums"]["incident_type"]
          latitude: number | null
          location_address: string | null
          longitude: number | null
          reporter_contact: string | null
          severity: Database["public"]["Enums"]["severity_level"]
          status: Database["public"]["Enums"]["incident_status"]
          title: string
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          anonymous_id?: string
          created_at?: string
          description: string
          evidence_urls?: string[] | null
          id?: string
          incident_type: Database["public"]["Enums"]["incident_type"]
          latitude?: number | null
          location_address?: string | null
          longitude?: number | null
          reporter_contact?: string | null
          severity?: Database["public"]["Enums"]["severity_level"]
          status?: Database["public"]["Enums"]["incident_status"]
          title: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          anonymous_id?: string
          created_at?: string
          description?: string
          evidence_urls?: string[] | null
          id?: string
          incident_type?: Database["public"]["Enums"]["incident_type"]
          latitude?: number | null
          location_address?: string | null
          longitude?: number | null
          reporter_contact?: string | null
          severity?: Database["public"]["Enums"]["severity_level"]
          status?: Database["public"]["Enums"]["incident_status"]
          title?: string
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          audio_url: string | null
          content: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          is_published: boolean
          lesson_type: Database["public"]["Enums"]["lesson_type"]
          module_id: string
          order_index: number
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          content?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          lesson_type?: Database["public"]["Enums"]["lesson_type"]
          module_id: string
          order_index?: number
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          lesson_type?: Database["public"]["Enums"]["lesson_type"]
          module_id?: string
          order_index?: number
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          followers_count: number | null
          following_count: number | null
          id: string
          location: string | null
          reputation_score: number | null
          role: string | null
          total_likes: number | null
          total_rewards: number | null
          updated_at: string
          user_id: string
          verified_reports: number | null
          videos_count: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          location?: string | null
          reputation_score?: number | null
          role?: string | null
          total_likes?: number | null
          total_rewards?: number | null
          updated_at?: string
          user_id: string
          verified_reports?: number | null
          videos_count?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          followers_count?: number | null
          following_count?: number | null
          id?: string
          location?: string | null
          reputation_score?: number | null
          role?: string | null
          total_likes?: number | null
          total_rewards?: number | null
          updated_at?: string
          user_id?: string
          verified_reports?: number | null
          videos_count?: number | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string
          difficulty_weight: number
          id: string
          question_order: number
          question_text: string
          scenario_id: string
        }
        Insert: {
          created_at?: string
          difficulty_weight: number
          id?: string
          question_order: number
          question_text: string
          scenario_id: string
        }
        Update: {
          created_at?: string
          difficulty_weight?: number
          id?: string
          question_order?: number
          question_text?: string
          scenario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: number
          created_at: string
          explanation: string | null
          id: string
          lesson_id: string
          options: Json
          order_index: number
          question: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          explanation?: string | null
          id?: string
          lesson_id: string
          options: Json
          order_index?: number
          question: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          explanation?: string | null
          id?: string
          lesson_id?: string
          options?: Json
          order_index?: number
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      scenarios: {
        Row: {
          category: string
          context: string
          created_at: string
          description: string
          difficulty_level: number
          id: string
          title: string
        }
        Insert: {
          category: string
          context: string
          created_at?: string
          description: string
          difficulty_level: number
          id?: string
          title: string
        }
        Update: {
          category?: string
          context?: string
          created_at?: string
          description?: string
          difficulty_level?: number
          id?: string
          title?: string
        }
        Relationships: []
      }
      training_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_modules: {
        Row: {
          category_id: string
          created_at: string
          description: string
          difficulty_level: Database["public"]["Enums"]["difficulty_level"]
          duration_minutes: number | null
          id: string
          is_published: boolean
          order_index: number
          prerequisite_module_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description: string
          difficulty_level?: Database["public"]["Enums"]["difficulty_level"]
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          order_index?: number
          prerequisite_module_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string
          difficulty_level?: Database["public"]["Enums"]["difficulty_level"]
          duration_minutes?: number | null
          id?: string
          is_published?: boolean
          order_index?: number
          prerequisite_module_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "training_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_modules_prerequisite_module_id_fkey"
            columns: ["prerequisite_module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activities: {
        Row: {
          activity_details: Json | null
          activity_type: string
          created_at: string
          duration_seconds: number | null
          id: string
          ip_address: unknown | null
          page_url: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          activity_details?: Json | null
          activity_type: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          activity_details?: Json | null
          activity_type?: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_assessments: {
        Row: {
          completed_at: string | null
          created_at: string
          current_question: number | null
          difficulty_level: number | null
          id: string
          scenario_id: string
          started_at: string
          status: string
          total_score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_question?: number | null
          difficulty_level?: number | null
          id?: string
          scenario_id: string
          started_at?: string
          status?: string
          total_score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_question?: number | null
          difficulty_level?: number | null
          id?: string
          scenario_id?: string
          started_at?: string
          status?: string
          total_score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_assessments_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_certificates: {
        Row: {
          certificate_id: string
          certificate_url: string | null
          earned_at: string
          id: string
          user_id: string
          verification_code: string | null
        }
        Insert: {
          certificate_id: string
          certificate_url?: string | null
          earned_at?: string
          id?: string
          user_id: string
          verification_code?: string | null
        }
        Update: {
          certificate_id?: string
          certificate_url?: string | null
          earned_at?: string
          id?: string
          user_id?: string
          verification_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_certificates_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_engagement_metrics: {
        Row: {
          assessments_completed: number | null
          average_session_duration: number | null
          created_at: string
          engagement_score: number | null
          id: string
          metric_date: string
          pages_visited: number | null
          podcasts_listened: number | null
          questions_answered: number | null
          total_sessions: number | null
          total_time_minutes: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assessments_completed?: number | null
          average_session_duration?: number | null
          created_at?: string
          engagement_score?: number | null
          id?: string
          metric_date?: string
          pages_visited?: number | null
          podcasts_listened?: number | null
          questions_answered?: number | null
          total_sessions?: number | null
          total_time_minutes?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assessments_completed?: number | null
          average_session_duration?: number | null
          created_at?: string
          engagement_score?: number | null
          id?: string
          metric_date?: string
          pages_visited?: number | null
          podcasts_listened?: number | null
          questions_answered?: number | null
          total_sessions?: number | null
          total_time_minutes?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_learning_progress: {
        Row: {
          attempts_count: number | null
          best_score: number | null
          completion_percentage: number | null
          created_at: string
          id: string
          improvement_areas: string[] | null
          last_activity: string | null
          scenario_id: string | null
          strengths: string[] | null
          time_spent_minutes: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts_count?: number | null
          best_score?: number | null
          completion_percentage?: number | null
          created_at?: string
          id?: string
          improvement_areas?: string[] | null
          last_activity?: string | null
          scenario_id?: string | null
          strengths?: string[] | null
          time_spent_minutes?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts_count?: number | null
          best_score?: number | null
          completion_percentage?: number | null
          created_at?: string
          id?: string
          improvement_areas?: string[] | null
          last_activity?: string | null
          scenario_id?: string | null
          strengths?: string[] | null
          time_spent_minutes?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string | null
          module_id: string
          score: number | null
          status: Database["public"]["Enums"]["progress_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string | null
          module_id: string
          score?: number | null
          status?: Database["public"]["Enums"]["progress_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string | null
          module_id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["progress_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_responses: {
        Row: {
          answer_choice_id: string
          assessment_id: string
          created_at: string
          id: string
          points_earned: number
          question_id: string
          response_time_seconds: number | null
        }
        Insert: {
          answer_choice_id: string
          assessment_id: string
          created_at?: string
          id?: string
          points_earned: number
          question_id: string
          response_time_seconds?: number | null
        }
        Update: {
          answer_choice_id?: string
          assessment_id?: string
          created_at?: string
          id?: string
          points_earned?: number
          question_id?: string
          response_time_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_responses_answer_choice_id_fkey"
            columns: ["answer_choice_id"]
            isOneToOne: false
            referencedRelation: "answer_choices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          activities_count: number | null
          browser: string | null
          created_at: string
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          location: string | null
          os: string | null
          pages_visited: number | null
          session_id: string
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activities_count?: number | null
          browser?: string | null
          created_at?: string
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          location?: string | null
          os?: string | null
          pages_visited?: number | null
          session_id: string
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activities_count?: number | null
          browser?: string | null
          created_at?: string
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          location?: string | null
          os?: string | null
          pages_visited?: number | null
          session_id?: string
          started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      video_likes: {
        Row: {
          created_at: string
          id: string
          user_id: string
          video_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
          video_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_likes_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          comments_count: number | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          hashtags: string[] | null
          id: string
          is_public: boolean | null
          likes_count: number | null
          shares_count: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          video_url: string
          views_count: number | null
        }
        Insert: {
          comments_count?: number | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          hashtags?: string[] | null
          id?: string
          is_public?: boolean | null
          likes_count?: number | null
          shares_count?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          video_url: string
          views_count?: number | null
        }
        Update: {
          comments_count?: number | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          hashtags?: string[] | null
          id?: string
          is_public?: boolean | null
          likes_count?: number | null
          shares_count?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          video_url?: string
          views_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_level: "beginner" | "intermediate" | "advanced"
      incident_status:
        | "pending"
        | "under_review"
        | "verified"
        | "dismissed"
        | "resolved"
      incident_type:
        | "theft"
        | "fraud"
        | "safety_violation"
        | "environmental_damage"
        | "equipment_tampering"
        | "unauthorized_access"
        | "violence"
        | "other"
      lesson_type: "video" | "text" | "audio" | "quiz"
      progress_status: "not_started" | "in_progress" | "completed"
      severity_level: "low" | "medium" | "high" | "critical"
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
    Enums: {
      difficulty_level: ["beginner", "intermediate", "advanced"],
      incident_status: [
        "pending",
        "under_review",
        "verified",
        "dismissed",
        "resolved",
      ],
      incident_type: [
        "theft",
        "fraud",
        "safety_violation",
        "environmental_damage",
        "equipment_tampering",
        "unauthorized_access",
        "violence",
        "other",
      ],
      lesson_type: ["video", "text", "audio", "quiz"],
      progress_status: ["not_started", "in_progress", "completed"],
      severity_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
