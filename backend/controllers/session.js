const express = require("express");

const postgres = require("../models/postgres.js");
const fflate = require("fflate");
const sessionsRouter = express.Router();
const {
  extractLogEvents,
  extractNetworkEvents,
  extractErrorEvents,
  retrieveEventData,
  retrieveMetadata,
  findSessionIds,
} = require("../utils/sessionHelpers.js");

// const { userExtractor } = require('../utils/middleware')

// the idea is to add a userExtractor middleware function to
// allow only to authorized users access to the session database:
// (you can see the function signature above the actual signature)

// sessionsRouter.get("/:projectId", userExtractor, async (req, res) => {
sessionsRouter.get("/:projectId", async (req, res) => {
  // requests all sessions associated with a project id

  const validSessionIds = await findSessionIds(req.params.projectId); // ["02bc742b-e176-4780-ae1c-5d62d569d9f0"]

  const sessions = [];
  for (index = 0; index < validSessionIds.length; index++) {
    const sessionId = validSessionIds[index].id;

    const session = { id: sessionId };

    let events = await retrieveEventData(sessionId);

    events = events.flat();
    session.events = events;
    session.network = extractNetworkEvents(events);
    session.logs = extractLogEvents(events);
    session.errors = extractErrorEvents(events);

    const metadata = await retrieveMetadata(sessionId);
    session.metadata = metadata;
    sessions.push(session);
  }

  res.json({
    sessions: sessions,
  });
});

module.exports = sessionsRouter;
