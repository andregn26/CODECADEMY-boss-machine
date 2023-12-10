const express = require("express");
const minionsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require("../db");

minionsRouter.param("minionId", (req, res, next, minionId) => {
	const minion = getFromDatabaseById("minions", minionId);
	if (minion) {
		req.minion = minion;
		next();
	} else {
		res.sendStatus(404);
	}
});

// /api/minions
minionsRouter.get("/", (req, res, next) => {
	res.status(200).send(getAllFromDatabase("minions"));
});
// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post("/", (req, res, next) => {
	const newMinion = addToDatabase("minions", req.body);
	res.status(201).send(newMinion);
});
// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get("/:minionId", (req, res, next) => {
	res.send(req.minion);
});
// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put("/:minionId", (req, res, next) => {
	const updatedMinion = updateInstanceInDatabase("minions", req.body);
	res.send(updatedMinion);
});
// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete("/:minionId", (req, res, next) => {
	const receivedIdToDelete = req.minion.id;
	deleteFromDatabasebyId("minions", receivedIdToDelete);
	res.status("204").send();
});

module.exports = minionsRouter;
