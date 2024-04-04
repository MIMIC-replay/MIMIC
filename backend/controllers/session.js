const express = require("express");
const sessionsRouter = express.Router();
const {
  addProjectCredentials,
  validateProjectName,
  extractLogEvents,
  extractNetworkEvents,
  extractErrorEvents,
  retrieveEventData,
  retrieveMetadata,
  findSessionIds,
} = require("../utils/sessionHelpers.js");

sessionsRouter.post("/validate", async (req, res) => {
  // checks if the provided project name exists in the database
  const projectName = req.body.name;
  validateProjectName(projectName, res);
});

sessionsRouter.post("/new", async (req, res) => {
  // collects all new project IDs and add them to the database
  const projectId = req.body.projectId;
  const projectName = req.body.name;
  const projectPassword = req.body.password;
  addProjectCredentials(projectId, projectName, projectPassword, res);
});

const { projectExtractor } = require('../utils/middleware')

sessionsRouter.get("/:projectId", projectExtractor, async (req, res) => {
  if (!req.project) {
    return res.status(401).json({ error: "invalid project id" });
  }

  try {
    const validSessionIds = await findSessionIds(req.params.projectId);

    const sessionPromises = validSessionIds.map(async (session) => {
      const sessionId = session.id;
      const sessionObj = { id: sessionId };
      
      let events = await retrieveEventData(sessionId);
      events = events.flat();
      
      sessionObj.events = events;
      sessionObj.network = extractNetworkEvents(events);
      sessionObj.logs = extractLogEvents(events);
      sessionObj.errors = extractErrorEvents(events);
      
      const metadata = await retrieveMetadata(sessionId);
      sessionObj.metadata = metadata;
      
      return sessionObj;
    });

    const sessions = await Promise.all(sessionPromises);

    res.json({ sessions });
  } catch (error) {
    console.error("Error retrieving sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = sessionsRouter;
