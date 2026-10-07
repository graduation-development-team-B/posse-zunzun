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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
