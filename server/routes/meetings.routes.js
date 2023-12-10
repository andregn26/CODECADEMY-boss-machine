const express = require("express");
const meetingsRouter = express.Router();
const { getAllFromDatabase, createMeeting, deleteAllFromDatabase, addToDatabase } = require("../db");

// /api/meetings
// GET /api/meetings to get an array of all meetings.
meetingsRouter.get("/", (req, res, next) => {
	res.send(getAllFromDatabase("meetings"));
});
// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post("/", (req, res, next) => {
	const addToDB = addToDatabase("meetings", createMeeting());
	res.status("201").send(addToDB);
});
// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete("/", (req, res, next) => {
	deleteAllFromDatabase("meetings");
	res.status("204").send();
});

module.exports = meetingsRouter;
