import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://djbuiifvrzkksfdlasrl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYnVpaWZ2cnpra3NmZGxhc3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1ODc3MTMsImV4cCI6MjAyNzE2MzcxM30.ZLoHT5Ae7lezQK_vzINwvTa6HBkZ5Gq31RXNWWkN5o4";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);