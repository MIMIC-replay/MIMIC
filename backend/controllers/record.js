const express = require("express");

const recordRouter = express.Router();

const logger = require("../utils/logger.js");
const postgres = require("../models/postgres.js")
const fflate = require('fflate');

const allRecordedEvents = [];

recordRouter.get("/", (req, res) => { // method to be deleted when we migrate from sandbox frontend to true frontend
  postgres.db.one("SELECT encode(session_data::bytea, 'escape') as session_data FROM sessions WHERE id = $1", [currentSessionId], session => session.session_data)
    .then(data => JSON.parse(data))
    .then(data => Object.keys(data).map((key) => data[key]))
    .then(data => new Uint8Array(data))
    .then(data => JSON.parse(fflate.strFromU8(fflate.decompressSync(data))))
    .then(data => res.json(data))
    .catch((error) => {
      console.log('Unable to retrieve event data from PostgreSQL:', error.message);
      res.json(error)
    });
});

recordRouter.post("/", (req, res) => {
  const batchOfEvents = req.body;
  
  allRecordedEvents.push(batchOfEvents);

  const compressedEventsString = fflate.strToU8(JSON.stringify(allRecordedEvents));
  const allEventsCompressed = fflate.compressSync(compressedEventsString, { level: 6})
  postgres.db.one('INSERT INTO sessions(session_data) VALUES($1) RETURNING id', [allEventsCompressed], session => session.id)
    .then(data => {
        currentSessionId = data;
        res.sendStatus(200);
        console.log(`Successfully added events to database. Current ID is ${currentSessionId}`)
    })
    .catch((error) => {
      console.log('Unable to send event data to PostgreSQL:', error.message);
    });
});



module.exports = recordRouter;
