export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          display_name: string;
          posse: string | null;
          cohort: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          display_name: string;
          posse?: string | null;
          cohort?: string | null;
        };
        Update: {
          display_name?: string;
          posse?: string | null;
          cohort?: string | null;
        };
        Relationships: [];
      };
      learning_settings: {
        Row: {
          user_id: string;
          phase: "ph1" | "ph2";
          created_at: string;
          updated_at: string;
        };
        Insert: { user_id: string; phase?: "ph1" | "ph2" };
        Update: { phase?: "ph1" | "ph2" };
        Relationships: [];
      };
      answer_records: {
        Row: {
          user_id: string;
          record_id: string;
          session_id: string;
          question_id: string;
          revision: number;
          week_unit_id: string;
          correct: boolean;
          hint_used: boolean;
          option_id: string;
          received_at: string;
        };
        Insert: {
          user_id: string;
          record_id: string;
          session_id: string;
          question_id: string;
          revision: number;
          week_unit_id: string;
          correct: boolean;
          hint_used: boolean;
          option_id: string;
        };
        Update: never;
        Relationships: [];
      };
      push_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          endpoint: string;
          p256dh: string;
          auth: string;
          enabled: boolean;
          reminder_time: string;
          reminder_timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          endpoint: string;
          p256dh: string;
          auth: string;
          enabled?: boolean;
          reminder_time?: string;
          reminder_timezone?: string;
        };
        Update: {
          user_id?: string;
          endpoint?: string;
          p256dh?: string;
          auth?: string;
          enabled?: boolean;
          reminder_time?: string;
          reminder_timezone?: string;
        };
        Relationships: [];
      };
      reminder_dispatches: {
        Row: {
          subscription_id: string;
          local_date: string;
          status: "claimed" | "sent" | "skipped" | "failed";
          updated_at: string;
        };
        Insert: {
          subscription_id: string;
          local_date: string;
          status: "claimed" | "sent" | "skipped" | "failed";
          updated_at?: string;
        };
        Update: {
          status?: "claimed" | "sent" | "skipped" | "failed";
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_due_learning_reminders: {
        Args: Record<string, never>;
        Returns: {
          subscription_id: string;
          user_id: string;
          endpoint: string;
          p256dh: string;
          auth: string;
          local_date: string;
          studied_today: boolean;
        }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
