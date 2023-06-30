import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "tjnagdjelhjyqalistir.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbmFnZGplbGhqeXFhbGlzdGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4ODI4MDMsImV4cCI6MjAwMzQ1ODgwM30.ZIOIYnlQNU7YJ6LetL3Q52lINa1LFlk2YoJedy5mC9c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
