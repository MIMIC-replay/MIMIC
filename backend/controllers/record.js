const express = require("express");

const recordRouter = express.Router();

const logger = require("../utils/logger.js");
const postgres = require("../models/postgres.js")
const fflate = require('fflate');
const requestIp = require("request-ip");
const uap = require("ua-parser-js");
const app = express();

const allRecordedEvents = [];
let sessionIndex;

const userMetadata = {
  ip: null,
  browser: null,
  os: null,
  location: null,
};

recordRouter.get("/", (req, res) => { // method to be deleted when we migrate from sandbox frontend to true frontend
  postgres.db.one("SELECT encode(session_data::bytea, 'escape') as session_data FROM sessions WHERE id = $1", [1], session => session.session_data)
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
  if (!userMetadata.ip) {
    //let testIP = "68.145.123.233";
    //userMetadata.ip = testIP;
    userMetadata.ip = requestIp.getClientIp(req);
    fetch(`https://api.country.is/${userMetadata.ip}`)
      .then((res) => res.json())
      .then((data) => (userMetadata.location = data.country));
  }

  if (!userMetadata.browser || !userMetadata.os) {
    let ua = uap(req.headers["user-agent"]);
    userMetadata.browser = ua.browser;
    userMetadata.os = ua.os;
  }

  console.log(userMetadata)
  const batchOfEvents = req.body;
  
  allRecordedEvents.push(batchOfEvents);

  const compressedEventsString = fflate.strToU8(JSON.stringify(allRecordedEvents));
  const allEventsCompressed = fflate.compressSync(compressedEventsString, { level: 6})
  
  if (sessionIndex) {
    postgres.db.any('UPDATE sessions SET session_data = $1 WHERE id = $2', [allEventsCompressed, sessionIndex])
    .then(data => {
        res.sendStatus(200);
        console.log(`Successfully updated session ${sessionIndex} events in PostgreSQL.`)
    })
    .catch((error) => {
      console.log(`Unable to update session ${sessionIndex} events in PostgreSQL:`, error.message);
    });
  } else {
    postgres.db.one('INSERT INTO sessions(session_data, url, ip_address, city, region, country, os_name, os_version, browser_name, browser_version, https_protected, viewport_height, viewport_width) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id', 
      [allEventsCompressed, "www.website.com/stuff", userMetadata.ip, "Kakariko Village", "Dueling Peaks", "Hyrule", userMetadata.os.name, userMetadata.os.version, userMetadata.browser.name, userMetadata.browser.version, true, 1280, 567], session => session.id)
    .then(data => {
        sessionIndex = data;
        res.sendStatus(200);
        console.log(`Successfully added new session to database. Current ID is ${sessionIndex}`)
    })
    .catch((error) => {
      console.log('Unable to add new session to PostgreSQL:', error.message);
    });
  }
});



module.exports = recordRouter;
