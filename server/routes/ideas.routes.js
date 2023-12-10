const express = require("express");
const ideasRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require("../db");
const checkMillionDollarIdea = require("../checkMillionDollarIdea");

// /api/ideas
ideasRouter.param("ideaId", (req, res, next, ideaId) => {
	const idea = getFromDatabaseById("ideas", ideaId);
	if (idea) {
		req.idea = idea;
		next();
	} else {
		res.status("404").send();
	}
});
// GET /api/ideas to get an array of all ideas.
ideasRouter.get("/", (req, res, next) => {
	res.send(getAllFromDatabase("ideas"));
});
// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
	const newIdea = req.body;
	const savedNewIdea = addToDatabase("ideas", newIdea);
	res.status("201").send(savedNewIdea);
});
// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get("/:ideaId", (req, res, next) => {
	const selectedIdea = getFromDatabaseById("ideas", req.idea.id);
	res.status("200").send(selectedIdea);
});
// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put("/:ideaId", (req, res, next) => {
	const receivedUpdatedIdea = req.body;
	const updatedIdeaInDB = updateInstanceInDatabase("ideas", receivedUpdatedIdea);
	res.status("200").send(updatedIdeaInDB);
});
// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete("/:ideaId", (req, res, next) => {
	const receivedIdToDelete = req.idea.id;
	deleteFromDatabasebyId("ideas", receivedIdToDelete);
	res.status("204").send();
});

module.exports = ideasRouter;
