const supabase = require("../config/supabase");

module.exports = {
  // showGreetings: () => new Promise((resolve, reject) => {}),
  getCountProduct: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("product")
        .select("*", { count: "exact" })
        .then((result) => {
          if (!result.error) {
            resolve(result.count);
          } else {
            reject(result);
          }
        });
    }),
  getAllProduct: (offset, limit) =>
    new Promise((resolve, reject) => {
      supabase
        .from("product")
        .select("*")
        .range(offset, offset + limit - 1)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getProductById: (id) =>
    new Promise((resolve, reject) => {
      // SELECT * FROM product WHERE id = "123"
      supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createProduct: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("product")
        .insert([data]) // insert([{name: "Tea", price: 5000}])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  updateProduct: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("product")
        .update(data)
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
