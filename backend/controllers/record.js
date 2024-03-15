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

  const allEventsCompressed = compressEvents(allRecordedEvents)

  if (sessionIndex) {
    updateSessionEvents(allEventsCompressed, sessionIndex, res)
  } else {
    sessionIndex = await createNewSession(allEventsCompressed, userMetadata, res)
  }
});

module.exports = recordRouter;
