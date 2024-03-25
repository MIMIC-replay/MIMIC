const requestIp = require("request-ip");
const uap = require("ua-parser-js");
const fflate = require("fflate");
const postgres = require("../models/postgres.js");
const config = require("../utils/config.js");
const Minio = require("minio");

// Instantiate the MinIO client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
  endPoint: config.MINIO_URL,
  port: config.MINIO_PORT,
  useSSL: false,
  accessKey: config.MINIO_USER,
  secretKey: config.MINIO_USER_PASSWORD,
});

async function extractMetadata(req, userMetadata) {
  if (!userMetadata.ip) {
    let testIP = "68.145.123.233";
    userMetadata.ip = testIP;

    // userMetadata.ip = requestIp.getClientIp(req);

    await fetch(
      `${config.LOCATION_API_URL}/${testIP}/?token=${config.LOCATION_API_TOKEN}`
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

function updateSessionEvents(allEventsCompressed, sessionIndex, res) {
  uploadToEventStorage(sessionIndex, allEventsCompressed)
    .then((data) => {
      res.sendStatus(200);
      console.log(
        `Successfully updated session ${sessionIndex} events in PostgreSQL.`
      );
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(
        `Unable to update session ${sessionIndex} events in PostgreSQL:`,
        error.message
      );
    });
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

function uploadToEventStorage(sessionId, allEventsCompressed) {
  const buffer = Buffer.from(allEventsCompressed);
  return new Promise((resolve, reject) => {
    minioClient.putObject("mimic", `${sessionId}`, buffer, (err, etag) => {
      if (err) {
        console.error("Error uploading data:", err);
        reject(err);
      } else {
        console.log("Data uploaded successfully");
        resolve(etag);
      }
    });
  });
}

module.exports = {
  extractMetadata,
  compressEvents,
  updateSessionEvents,
  createNewSession,
  uploadToEventStorage,
};
