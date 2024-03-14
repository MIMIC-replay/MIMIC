const requestIp = require("request-ip");
const uap = require("ua-parser-js");
const fflate = require('fflate');
const postgres = require("../models/postgres.js");

function extractMetadata(req, userMetadata) {
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
}

function compressEvents(allRecordedEvents) {
  const compressedEventsString = fflate.strToU8(JSON.stringify(allRecordedEvents));
  return fflate.compressSync(compressedEventsString, { level: 6})
}

function updateSessionEvents(allEventsCompressed, sessionIndex, res) {
  postgres.db.any('UPDATE sessions SET session_data = $1 WHERE id = $2', [allEventsCompressed, sessionIndex])
    .then(data => {
        res.sendStatus(200);
        console.log(`Successfully updated session ${sessionIndex} events in PostgreSQL.`)
    })
    .catch((error) => {
      console.log(`Unable to update session ${sessionIndex} events in PostgreSQL:`, error.message);
    });
}

function createNewSession(allEventsCompressed, userMetadata, res) {
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
module.exports = { extractMetadata, compressEvents, updateSessionEvents, createNewSession }
