const express = require("express");
const apiRouter = express.Router();

// /api/minions
const minionsRouter = require("./routes/minions.routes");
apiRouter.use("/minions", minionsRouter);
// /api/ideas
const ideasRouter = require("./routes/ideas.routes");
apiRouter.use("/ideas", ideasRouter);
// /api/meetings
const meetingsRouter = require("./routes/meetings.routes");
apiRouter.use("/meetings", meetingsRouter);

module.exports = apiRouter;
