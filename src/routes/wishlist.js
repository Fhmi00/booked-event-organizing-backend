const express = require("express");

const Router = express.Router();

const wishlistController = require("../controllers/wishlist");

Router.get("/", wishlistController.getAllWishlist);
Router.get("/:id", wishlistController.getWishlistById);
Router.post("/", wishlistController.createWishlist);
Router.delete("/:id", wishlistController.deleteWishlist);

module.exports = Router;
