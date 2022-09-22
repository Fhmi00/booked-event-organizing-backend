const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");
const uploadEvent = require("../middleware/upload");

Router.get("/", eventController.getAllEvent);
Router.get("/:id", eventController.getEventById);
Router.post("/", uploadEvent.uploadEvent, eventController.createEvent);
Router.patch("/:id", uploadEvent.uploadEvent, eventController.updateEvent);
Router.delete("/:id", eventController.deleteEvent);

module.exports = Router;
