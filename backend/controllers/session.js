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
  // - request all session associated with a project id
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
    let rawMetadata = await postgres.db.one("SELECT ROW_TO_JSON(ROW(session_start, ip_address, url, city, region, country, os_name, os_version, browser_name, browser_version, https_protected, viewport_height, viewport_width)) FROM sessions WHERE id = $1", [sessionId])              
                      .catch((error) => {
                        console.log('Unable to retrieve event data from PostgreSQL:', error.message);
                        res.json(error)
                      });

    rawMetadata = rawMetadata["row_to_json"];
    metadata.ip = rawMetadata["f2"];
    metadata.location = rawMetadata["f4"] + ", " + rawMetadata["f5"] + ", " + rawMetadata["f6"];
    metadata.os = { name: rawMetadata["f7"], version: rawMetadata["f8"]};
    metadata.browser = { name: rawMetadata["f9"], version: rawMetadata["f10"]};
    metadata.https = rawMetadata["f11"];
    metadata.viewport = { height: rawMetadata["f13"], width: rawMetadata["f12"]};
    metadata.date = rawMetadata["f1"];
    metadata.url = rawMetadata["f3"];

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