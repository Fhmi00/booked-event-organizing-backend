const express = require("express");

const Router = express.Router();

const userController = require("../controllers/user");
const authMiddleware = require("../middleware/auth");
const uploadUser = require("../middleware/upload");

Router.get(
  "/",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  userController.getAllUser
);

Router.get("/:id", authMiddleware.authentication, userController.getUserById);
Router.post("/", uploadUser.uploadUser, userController.createUser);
Router.delete("/:id", authMiddleware.authentication, userController.deleteUser);

// UPDATE DATA USER
Router.patch(
  "/updateUser/:id",
  authMiddleware.authentication,
  uploadUser.uploadUser,
  userController.updateUser
);

// UPDATE IMAGE
Router.patch(
  "/updateImage/:id",
  authMiddleware.authentication,
  uploadUser.uploadUser,
  userController.updateImage
);

module.exports = Router;
