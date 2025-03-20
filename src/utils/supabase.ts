import { createClient } from "@supabase/supabase-js";

// Read environment variables from Firebase Config
// const supabaseUrl = functions.config().supabase.url;
// const supabaseKey = functions.config().supabase.key;

const supabaseUrl = "https://rzaozbnxhtdugfcyhqvq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YW96Ym54aHRkdWdmY3locXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMzc3NzYsImV4cCI6MjA1NzkxMzc3Nn0.Tmtnc5lnIwwGnEywn9YVDhfK4Ju2vNrONrXfV0Ux64k";

export const supabase = createClient(supabaseUrl, supabaseKey);
