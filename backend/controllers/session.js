const express = require("express");

const postgres = require("../models/postgres.js")
const fflate = require('fflate');
const sessionsRouter = express.Router();
const sessions = [];
const validSessionIds = [2, 3, 4]; // temporary until we instate projects/admins in backend

/*
const extractConsoleEvents = (eventsArr) => {
  return eventsArr.filter((obj) => obj.data.plugin === "rrweb/console@1");
};

const extractNetworkEvents = (eventsArr) => {
  return eventsArr.filter((obj) => obj.type === 50);
};
*/

sessionsRouter.get('/:projectId', async (req, res) => {
  // requests all sessions associated with a project id
  for (index = 0; index < validSessionIds.length; index++) {
    const sessionId = validSessionIds[index];
    const session = {id: sessionId};
    const metadata = {};
    let events = await postgres.db.one("SELECT encode(session_data::bytea, 'escape') as session_data FROM sessions WHERE id = $1", [sessionId], session => session.session_data)
                    .then(data => JSON.parse(data))
                    .then(data => Object.keys(data).map((key) => data[key]))
                    .then(data => new Uint8Array(data))
                    .then(data => JSON.parse(fflate.strFromU8(fflate.decompressSync(data))))
                    .catch((error) => {
                      console.log('Unable to retrieve event data from PostgreSQL:', error.message);
                      res.json(error)
                    });
    
    session.events = events;
    /*
    session.network = extractNetworkEvents(events);
    session.logs = extractConsoleEvents(events)
    */
   
    let rawMetadata = await postgres.db.one("SELECT session_start, ip_address, url, city, region, country, os_name, os_version, browser_name, browser_version, https_protected, viewport_height, viewport_width FROM sessions WHERE id = $1", [sessionId])              
                      .catch((error) => {
                        console.log('Unable to retrieve event data from PostgreSQL:', error.message);
                        res.json(error)
                      });

    metadata.ip = rawMetadata.ip_address;
    metadata.location = rawMetadata.city + ", " + rawMetadata.region + ", " + rawMetadata.country;
    metadata.os = { name: rawMetadata.os_name, version: rawMetadata.os_version };
    metadata.browser = { name: rawMetadata.browser_name, version: rawMetadata.browser_version };
    metadata.https = rawMetadata.https_protected;
    metadata.viewport = { height: rawMetadata.viewport_height, width: rawMetadata.viewport_width };
    metadata.date = rawMetadata.session_start;
    metadata.url = rawMetadata.url;

    session.metadata = metadata
    sessions.push(session)
  }
  
  res.json({
    sessions: sessions
  })
})

  /*
  Session object prototype:
    { id: , 
      metadata: {
          ip:,
          location:,
          os: {name: , version: },
          browser: {name: , version: }, 
          https: boolean (if it's SSL protected or not),
          viewport: {height: , width: },
          date:,
          url:,
        },

      events: [],
      network: [],
      logs: [],
      errors: [],
    }
  */




module.exports = sessionsRouter