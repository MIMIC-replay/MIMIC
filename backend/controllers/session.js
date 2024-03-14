const express = require("express");

const postgres = require("../models/postgres.js")
const fflate = require('fflate');
const sessionsRouter = express.Router();
const { extractLogEvents, extractNetworkEvents, extractErrorEvents, retrieveEventData, retrieveMetadata } = require("../utils/sessionHelpers.js")
const sessions = [];
const validSessionIds = [2, 3, 4, 12, 14]; // temporary until we instate projects/admins in backend

sessionsRouter.get('/:projectId', async (req, res) => {
  // requests all sessions associated with a project id
  for (index = 0; index < validSessionIds.length; index++) {
    const sessionId = validSessionIds[index];
    const session = {id: sessionId};

    let events = await retrieveEventData(sessionId); 
 
    events = events.flat();
    session.events = events;
    session.network = extractNetworkEvents(events);
    session.logs = extractLogEvents(events);
    session.errors = extractErrorEvents(events);
   
    const metadata = await retrieveMetadata(sessionId);
    session.metadata = metadata
    sessions.push(session)
  }
  
  res.json({
    sessions: sessions
  })
})

module.exports = sessionsRouter