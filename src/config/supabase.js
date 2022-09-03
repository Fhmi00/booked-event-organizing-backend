const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://bhnwbygksdpqacyxdopl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJobndieWdrc2RwcWFjeXhkb3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwODc3MjEsImV4cCI6MTk3NzY2MzcyMX0.s5Si9XZNmQgLfQ6tFR3kTaHPm9RPqCqBaW3zDR8jPdM";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
