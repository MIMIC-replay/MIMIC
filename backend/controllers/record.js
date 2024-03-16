const express = require("express");

const recordRouter = express.Router();

const logger = require("../utils/logger.js");
const postgres = require("../models/postgres.js")

const { extractMetadata, compressEvents, updateSessionEvents, createNewSession } = require("../utils/recordHelpers.js")

const app = express();

const allRecordedEvents = [];
let sessionIndex;

const userMetadata = {
  ip: null,
  browser: null,
  os: null,
  location: null,
};

recordRouter.post("/", async (req, res) => {
  extractMetadata(req, userMetadata)

  const batchOfEvents = req.body;
  
  allRecordedEvents.push(batchOfEvents);

  const allEventsCompressed = compressEvents(allRecordedEvents);
  const sessionId = req.sessionId;
  console.log("Session ID is: ", sessionId)
/*
  // When using cookie-session, causes there to be a response header "Set Cookie", that is consistent across post requests in targetApp
  req.session.cat = "meow";
*/
  if (sessionIndex) {
    updateSessionEvents(allEventsCompressed, sessionIndex, res)
  } else {
    sessionIndex = await createNewSession(allEventsCompressed, userMetadata, res)
  }
});

module.exports = recordRouter;
