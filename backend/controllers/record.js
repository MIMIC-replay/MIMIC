const express = require("express");

const recordRouter = express.Router();
const logger = require("../utils/logger.js");
const postgres = require("../models/postgres.js")

const { extractMetadata, compressEvents, updateSessionEvents, createNewSession } = require("../utils/recordHelpers.js")

const app = express();
const currentSessions = {};

const userMetadata = {
  ip: null,
  browser: null,
  os: null,
  location: {},
  https: null,
  url: null
};

recordRouter.post("/", async (req, res) => {
  console.log("sessionData is: ", req.sessionData)
  const sessionId = req.sessionData.id;
  const batchOfEvents = req.body;

  if (currentSessions[sessionId]) {
    currentSessions[sessionId].push(batchOfEvents);
    const allEventsCompressed = compressEvents(currentSessions[sessionId]);
    updateSessionEvents(allEventsCompressed, sessionId, res)
  } else {
    currentSessions[sessionId] = [batchOfEvents];
    const allEventsCompressed = compressEvents(currentSessions[sessionId]);
    await extractMetadata(req, userMetadata)
    console.log("Updated metadata: ", userMetadata)
    createNewSession(allEventsCompressed, sessionId, userMetadata, res)
  }
});

module.exports = recordRouter;
