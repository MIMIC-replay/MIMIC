const requestIp = require("request-ip");
const uap = require("ua-parser-js");
const fflate = require("fflate");
const postgres = require("../models/postgres.js");
const config = require("../utils/config.js");

async function extractMetadata(req, userMetadata) {
  if (!userMetadata.ip) {
    // let testIP = "68.145.123.233";
    // userMetadata.ip = testIP;

    userMetadata.ip = requestIp.getClientIp(req);

    await fetch(
      `${config.LOCATION_API_URL}/${userMetadata.ip}/?token=${config.LOCATION_API_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => {
        userMetadata.location["city"] = data.city.names.en;
        userMetadata.location["region"] = data.subdivisions[0]["iso_code"];
        userMetadata.location["country"] = data.country.names.en;
        userMetadata.location["timezone"] = data.location["time_zone"];
        userMetadata.location["latitude"] = data.location["latitude"];
        userMetadata.location["longitude"] = data.location["longitude"];
      });
    /*
    fetch(`https://api.country.is/${userMetadata.ip}`)
      .then((res) => res.json())
      .then((data) => (userMetadata.location = data.country));
    */
  }

  if (!userMetadata.browser || !userMetadata.os) {
    let ua = uap(req.headers["user-agent"]);
    userMetadata.browser = ua.browser;
    userMetadata.os = ua.os;
  }

  if (!userMetadata.https || !userMetadata.url) {
    userMetadata.https = req.protocol === "https";
    userMetadata.url = req.headers.referer;
  }
}

function compressEvents(allRecordedEvents) {
  const compressedEventsString = fflate.strToU8(
    JSON.stringify(allRecordedEvents)
  );
  return fflate.compressSync(compressedEventsString, { level: 6 });
}

function createNewSession(sessionId, userMetadata, projectId, res) {
  postgres.db
    .one(
      "INSERT INTO sessions(id, project_id, url, ip_address, city, region, country, timezone, longitude, latitude, os_name, os_version, browser_name, browser_version, https_protected) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id",
      [
        sessionId,
        projectId,
        userMetadata.url,
        userMetadata.ip,
        userMetadata.location.city,
        userMetadata.location.region,
        userMetadata.location.country,
        userMetadata.location.timezone,
        userMetadata.location.longitude,
        userMetadata.location.latitude,
        userMetadata.os.name,
        userMetadata.os.version,
        userMetadata.browser.name,
        userMetadata.browser.version,
        userMetadata.https,
      ],
      (session) => session.id
    )
    .then((data) => {
      console.log(
        `Successfully added new session to database. Current ID is ${sessionId}`
      );
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("Unable to add new session to PostgreSQL:", error.message);
    });
}

module.exports = {
  extractMetadata,
  compressEvents,
  createNewSession,
};
