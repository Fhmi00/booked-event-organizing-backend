const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://bhnwbygksdpqacyxdopl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJobndieWdrc2RwcWFjeXhkb3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwODc3MjEsImV4cCI6MTk3NzY2MzcyMX0.s5Si9XZNmQgLfQ6tFR3kTaHPm9RPqCqBaW3zDR8jPdM";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

// const getData = async () => {
//   const { data, error } = await supabase.from("tblWishlist").select(`*,
//       tblUser ( * )
//       `);
//   console.log(data);
//   console.log(error);
// };

// const getData = async () => {
//   const { data, error } = await supabase.from("tblWishlist").select(`*,
//     tblUser:userId ( * ),
//     tblEvent:eventId ( * )
//     `);
//   console.log(data);
//   console.log(error);
// };

// WITH VIEW
// const getData = async () => {
//   const { data, error } = await supabase
//     .from("viewwishlistuser")
//     .select(`*`)
//     .eq("userId", "ca2973ed-9414-4135-84ac-799b6602d7b1");
//   console.log(data);
//   console.log(error);
// };

// getData();
