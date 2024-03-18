const fflate = require('fflate');
const postgres = require("../models/postgres.js");

const extractLogEvents = (eventsArr) => {
  return eventsArr.filter(
    (obj) =>
      obj.data.plugin === "rrweb/console@1" &&
      obj.data.payload.level !== "error"
  );
};

const extractNetworkEvents = (eventsArr) => {
  return eventsArr.filter((obj) => obj.type === 50);
};

const extractErrorEvents = (eventsArr) => {
  return eventsArr.filter((obj) => {
    return (
      obj.data.plugin === "rrweb/console@1" &&
      obj.data.payload.level === "error"
    );
  });
};

const retrieveEventData = (sessionId) => {
  return postgres.db.one("SELECT encode(session_data::bytea, 'escape') as session_data FROM sessions WHERE id = $1", [sessionId], session => session.session_data)
            .then(data => JSON.parse(data))
            .then(data => Object.keys(data).map((key) => data[key]))
            .then(data => new Uint8Array(data))
            .then(data => JSON.parse(fflate.strFromU8(fflate.decompressSync(data))))
            .catch((error) => {
              console.log('Unable to retrieve event data from PostgreSQL:', error.message);
              res.json(error)
            });
}

const retrieveMetadata = async (sessionId) => {
  const metadata = {};
  const rawMetadata = await postgres.db.one("SELECT session_start, ip_address, url, city, region, country, os_name, os_version, browser_name, browser_version, https_protected, viewport_height, viewport_width FROM sessions WHERE id = $1", [sessionId])              
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

  return metadata;
}

const findSessionIds = (projectId) => {
  return postgres.db.query("SELECT id FROM sessions WHERE project_id = $1", [projectId])
    .catch((error) => {
      console.log('Unable to retrieve relevant session IDs from PostgreSQL:', error.message);
      return [];
    });
}

module.exports = { extractLogEvents, extractNetworkEvents, extractErrorEvents, retrieveEventData, retrieveMetadata, findSessionIds }