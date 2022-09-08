const supabase = require("../config/supabase");

module.exports = {
  getCountWishlist: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select("*", { count: "exact" })
        .then((result) => {
          if (!result.error) {
            resolve(result.count);
          } else {
            reject(result);
          }
        });
    }),
  getAllWishlist: (offset, limit, id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select(
          `*,
        event:eventId (name)`
        )
        .eq("userId", id)
        .range(offset, offset + limit - 1)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getWishlistById: (id) =>
    new Promise((resolve, reject) => {
      // SELECT * FROM product WHERE id = "123"
      supabase
        .from("wishlist")
        .select(
          `*,
        event:eventId (name)`
        )
        .eq("id", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createWishlist: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .insert([data]) // insert([{name: "Tea", price: 5000}])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  deleteWishlist: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .delete()
        .eq("id", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
