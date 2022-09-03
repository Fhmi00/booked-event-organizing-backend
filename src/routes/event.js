const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");

Router.get("/", eventController.getAllEvent);
Router.get("/:id", eventController.getEventById);
Router.post("/", eventController.createEvent);

module.exports = Router;
