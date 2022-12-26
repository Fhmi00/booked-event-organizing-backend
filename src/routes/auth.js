const express = require("express");

const Router = express.Router();

const authController = require("../controllers/auth");

Router.post("/register", authController.register);
Router.post("/login", authController.login);
Router.get("/verify/:OTP", authController.verify);
Router.post("/logout", authController.logout);
Router.post("/refresh", authController.refresh);
Router.get("/forgotPassword", authController.forgotPassword);
Router.patch("/resetPassword/:OTPReset", authController.ResetPassword);

module.exports = Router;
