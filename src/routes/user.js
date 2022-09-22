const express = require("express");

const Router = express.Router();

const userController = require("../controllers/user");
const uploadUser = require("../middleware/upload");

Router.get("/", userController.getAllUser);
Router.get("/:id", userController.getUserById);
Router.post("/", uploadUser.uploadUser, userController.createUser);
Router.patch("/:id", uploadUser.uploadUser, userController.updateUser);
Router.delete("/:id", userController.deleteUser);

module.exports = Router;
