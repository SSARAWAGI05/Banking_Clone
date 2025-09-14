// src/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ✅ These env vars must be in .env (or .env.local) at the project root
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// ✅ Strongly typed Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
