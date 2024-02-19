import { createClient } from "@supabase/supabase-js";

// Garanta que supabaseUrl e supabaseAnonKey sejam strings não vazias
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Verifique se as variáveis de ambiente foram definidas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
