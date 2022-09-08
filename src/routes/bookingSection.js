const express = require("express");

const Router = express.Router();

const sectionController = require("../controllers/bookingSection");

Router.post("/", sectionController.createBookingSection);

module.exports = Router;
