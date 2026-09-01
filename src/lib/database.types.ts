/**
 * Zeilenformen der Datenbank, von Hand aus `supabase/migrations/*.sql`
 * abgeleitet (die CLI erreicht das Projekt von hier aus nicht).
 *
 * Wichtig: bleibt diese Datei hinter einer Migration zurück, meldet sich der
 * Compiler — vorher war jede gelesene Zeile `any`, und eine umbenannte Spalte
 * fiel erst zur Laufzeit auf.
 */

type Zeitstempel = string
type Datum = string

export type ProgressRow = {
  id: number
  user_id: string
  course_id: string
  topic_id: string
  completed: boolean
  quiz_score: number
  last_seen: Zeitstempel
}

export type StreakRow = {
  user_id: string
  current_streak: number
  longest_streak: number
  last_active_date: Datum | null
}

export type UserRoleRow = {
  user_id: string
  role: 'admin' | 'tutor' | 'student'
}

export type ContentReportRow = {
  id: string
  reported_by: string
  course_id: string
  topic_id: string
  content_type: string
  content_id: string | null
  issue_type: string
  description: string
  suggested_correction: string | null
  status: 'open' | 'resolved' | 'dismissed'
  resolved_by: string | null
  resolved_at: Zeitstempel | null
  resolution_note: string | null
  created_at: Zeitstempel
}

/** Inhalt eines Vorschlags: entweder eine Quizfrage oder eine Karteikarte. */
export type SuggestionContent = {
  question?: string
  options?: string[]
  correct?: number
  explanation?: string
  front?: string
  back?: string
}

export type ContentSuggestionRow = {
  id: string
  submitted_by: string
  course_id: string
  topic_id: string
  suggestion_type: string
  content: SuggestionContent
  approvals: string[]
  status: 'pending' | 'approved' | 'rejected'
  reviewed_by: string | null
  reviewed_at: Zeitstempel | null
  created_at: Zeitstempel
}

export type AttemptRow = {
  id: number
  user_id: string
  course_id: string
  topic_id: string
  question_id: string
  source: 'topic-quiz' | 'practice' | 'exam-sim'
  correct: boolean
  points_earned: number
  points_possible: number
  ms_taken: number | null
  answered_at: Zeitstempel
}

export type ReviewRowDb = {
  user_id: string
  item_type: 'card' | 'question'
  item_id: string
  course_id: string
  topic_id: string
  ease: number
  interval_days: number
  reps: number
  lapses: number
  due_at: Zeitstempel
  last_reviewed_at: Zeitstempel
}

/** Was beim Einfügen weggelassen werden darf, weil die Datenbank es setzt. */
type Einfuegen<T, Pflicht extends keyof T> = Pick<T, Pflicht> & Partial<Omit<T, Pflicht>>

export interface Database {
  public: {
    Tables: {
      progress: {
        Row: ProgressRow
        Insert: Einfuegen<ProgressRow, 'user_id' | 'course_id' | 'topic_id'>
        Update: Partial<ProgressRow>
        Relationships: []
      }
      streaks: {
        Row: StreakRow
        Insert: Einfuegen<StreakRow, 'user_id'>
        Update: Partial<StreakRow>
        Relationships: []
      }
      user_roles: {
        Row: UserRoleRow
        Insert: UserRoleRow
        Update: Partial<UserRoleRow>
        Relationships: []
      }
      content_reports: {
        Row: ContentReportRow
        Insert: Einfuegen<ContentReportRow,
          'reported_by' | 'course_id' | 'topic_id' | 'content_type' | 'issue_type' | 'description'>
        Update: Partial<ContentReportRow>
        Relationships: []
      }
      content_suggestions: {
        Row: ContentSuggestionRow
        Insert: Einfuegen<ContentSuggestionRow,
          'submitted_by' | 'course_id' | 'topic_id' | 'suggestion_type' | 'content'>
        Update: Partial<ContentSuggestionRow>
        Relationships: []
      }
      attempts: {
        Row: AttemptRow
        Insert: Einfuegen<AttemptRow,
          'user_id' | 'course_id' | 'topic_id' | 'question_id' | 'source' | 'correct'>
        Update: Partial<AttemptRow>
        Relationships: []
      }
      reviews: {
        Row: ReviewRowDb
        Insert: ReviewRowDb
        Update: Partial<ReviewRowDb>
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      streak_touch: {
        Args: { p_today: string }
        Returns: { current_streak: number; longest_streak: number; last_active_date: string }[]
      }
      progress_touch: {
        Args: {
          p_course_id: string
          p_topic_id: string
          p_completed?: boolean
          p_quiz_score?: number | null
        }
        Returns: undefined
      }
      has_role: { Args: { p_role: string }; Returns: boolean }
    }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
