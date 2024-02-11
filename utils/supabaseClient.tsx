import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jxyernjrvmmbpyovigjh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4eWVybmpydm1tYnB5b3ZpZ2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyNjkxNTYsImV4cCI6MjAyMDg0NTE1Nn0.9KtDtJB4_1g8mRbpS-QeAw1TIDDAJqtuYSi9yweDtVo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
