export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      email_invites: {
        Row: {
          id: string
          invited_email: string
          room_id: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          id?: string
          invited_email: string
          room_id?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          invited_email?: string
          room_id?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_invites_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_email_invites_room_id"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          id: string
          room_id: string | null
          sent_at: string
          text: string
          user_id: string | null
        }
        Insert: {
          id?: string
          room_id?: string | null
          sent_at?: string
          text: string
          user_id?: string | null
        }
        Update: {
          id?: string
          room_id?: string | null
          sent_at?: string
          text?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          duration: number | null
          genre: string | null
          id: string
          is_published: boolean | null
          thumbnail_url: string | null
          title: string
          video_type: string | null
          video_url: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          genre?: string | null
          id?: string
          is_published?: boolean | null
          thumbnail_url?: string | null
          title: string
          video_type?: string | null
          video_url: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          genre?: string | null
          id?: string
          is_published?: boolean | null
          thumbnail_url?: string | null
          title?: string
          video_type?: string | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "movies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          cam_on: boolean | null
          id: string
          is_host: boolean | null
          joined_at: string
          mic_on: boolean | null
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          cam_on?: boolean | null
          id?: string
          is_host?: boolean | null
          joined_at?: string
          mic_on?: boolean | null
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          cam_on?: boolean | null
          id?: string
          is_host?: boolean | null
          joined_at?: string
          mic_on?: boolean | null
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participants_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          subscription: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          subscription: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          subscription?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          created_at: string
          ended_at: string | null
          host_id: string | null
          id: string
          is_active: boolean | null
          is_playing: boolean | null
          name: string
          password: string | null
          playback_time: number | null
          video_type: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          host_id?: string | null
          id?: string
          is_active?: boolean | null
          is_playing?: boolean | null
          name: string
          password?: string | null
          playback_time?: number | null
          video_type?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          host_id?: string | null
          id?: string
          is_active?: boolean | null
          is_playing?: boolean | null
          name?: string
          password?: string | null
          playback_time?: number | null
          video_type?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          id: string
          is_admin: boolean | null
          phone_number: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name: string
          id: string
          is_admin?: boolean | null
          phone_number?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_admin?: boolean | null
          phone_number?: string | null
        }
        Relationships: []
      }
      video_sync: {
        Row: {
          is_playing: boolean | null
          last_action_by: string | null
          last_updated: string
          playback_position: number | null
          room_id: string
        }
        Insert: {
          is_playing?: boolean | null
          last_action_by?: string | null
          last_updated?: string
          playback_position?: number | null
          room_id: string
        }
        Update: {
          is_playing?: boolean | null
          last_action_by?: string | null
          last_updated?: string
          playback_position?: number | null
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_sync_last_action_by_fkey"
            columns: ["last_action_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_sync_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: true
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_email: {
        Args: Record<PropertyKey, never>
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
