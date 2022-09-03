const express = require("express");

const Router = express.Router();

const userController = require("../controllers/user");

Router.get("/", userController.getAllUser);

module.exports = Router;
