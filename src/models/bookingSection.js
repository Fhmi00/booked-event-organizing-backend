const supabase = require("../config/supabase");

module.exports = {
  createBookingSection: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("bookingSection")
        .insert([data]) // insert([{name: "Tea", price: 5000}])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
