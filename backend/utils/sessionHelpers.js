const fflate = require("fflate");
const postgres = require("../models/postgres.js");
// const { getObjectContent } = require("../models/minio.js");
const { getObjectContent } = require("../models/s3.js");

const addProjectCredentials = (
  projectId,
  projectName,
  projectPassword,
  res
) => {
  postgres.db
    .one(
      "INSERT INTO projects (id, name, password_hash) VALUES($1, $2, $3) RETURNING id",
      [projectId, projectName, projectPassword],
      (project) => project.id
    )
    .then((data) => {
      res.sendStatus(200);
      console.log(
        `Successfully added new project to database. The project ID is ${projectId}`
      );
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("Unable to add new project ID to PostgreSQL:", error.message);
    });
};

const validateProjectName = (projectName, res) => {
  postgres.db
    .none("SELECT * FROM projects WHERE name = $1", [projectName])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

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

const retrieveEventData = async (sessionId) => {
  return getObjectContent(sessionId) //"mimic", as first arg with minio
    .then((data) => new Uint8Array(data))
    .then((data) => JSON.parse(fflate.strFromU8(fflate.decompressSync(data))))
    .catch((error) => {
      console.log(
        "Unable to retrieve event data from PostgreSQL:",
        error.message
      );
      return [];
    });
};

const retrieveMetadata = async (sessionId) => {
  const metadata = {};
  const rawMetadata = await postgres.db
    .one(
      "SELECT session_start, ip_address, url, city, region, country, os_name, os_version, browser_name, browser_version, https_protected, timezone, longitude, latitude FROM sessions WHERE id = $1",
      [sessionId]
    )
    .catch((error) => {
      console.log(
        "Unable to retrieve event data from PostgreSQL:",
        error.message
      );
      res.json(error);
    });

  metadata.ip = rawMetadata.ip_address;
  metadata.location = {
    city: rawMetadata.city,
    region: rawMetadata.region,
    country: rawMetadata.country,
    longitude: rawMetadata.longitude,
    latitude: rawMetadata.latitude,
    timezone: rawMetadata.timezone,
  };
  metadata.os = { name: rawMetadata.os_name, version: rawMetadata.os_version };
  metadata.browser = {
    name: rawMetadata.browser_name,
    version: rawMetadata.browser_version,
  };
  metadata.https = rawMetadata.https_protected;
  metadata.date = rawMetadata.session_start;
  metadata.url = rawMetadata.url;

  return metadata;
};

const findSessionIds = (projectId) => {
  return postgres.db
    .query(
      "SELECT id FROM sessions WHERE project_id = $1 AND session_end IS NOT NULL",
      [projectId]
    )
    .catch((error) => {
      console.log(
        "Unable to retrieve relevant session IDs from PostgreSQL:",
        error.message
      );
      return [];
    });
};

const updateSessionEndTime = (sessionId) => {
  //Send query to postgres which updates `session_end` column to current time for provided `sessionId`
  postgres.db
    .none("UPDATE sessions SET session_end = CURRENT_TIMESTAMP WHERE id = $1", [
      sessionId,
    ])
    .then(() => {
      console.log(
        `Successfully updated session end time for session: ${sessionId}`
      );
    })
    .catch((error) => {
      console.log(
        `Unable to update session end time for session: ${sessionId}`,
        error.message
      );
    });
};

const findProjectById = async (projectId) => {
  let project
  await postgres.db.one('SELECT * FROM projects WHERE id = $1', [projectId])
             .then((r) => {
              project = r 
            })
             .catch(e => {
              console.log("Error: ", e)
             })

  return project
}

module.exports = {
  addProjectCredentials,
  validateProjectName,
  extractLogEvents,
  extractNetworkEvents,
  extractErrorEvents,
  retrieveEventData,
  retrieveMetadata,
  findSessionIds,
  updateSessionEndTime,
  findProjectById,
};
