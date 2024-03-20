const express = require("express");
const cors = require("cors");
const requestIp = require("request-ip");
const uap = require("ua-parser-js");
const app = express();
const port = 3001;
app.use(express.json());

const ipMiddleware = function (req, res, next) {
  if (!userMetadata.ip) {
    let testIP = "68.145.123.233";
    userMetadata.ip = testIP;
    // userMetadata.ip = requestIp.getClientIp(req);
    fetch(`https://api.country.is/${userMetadata.ip}`)
      .then((res) => res.json())
      .then((data) => (userMetadata.location = data.country));
  }

  next();
};

app.use(ipMiddleware);
app.use(express.json());
app.use(
  cors({
    origin: true, //"http://localhost:5173", // this we have to figure out, we can't manually add the origin in the backend for all target applications
    credentials: true,
  })
);

const userMetadata = {
  ip: null,
  browser: null,
  os: null,
  location: null,
};

const allRecordedEvents = [];

app.post("/api/record", (req, res) => {
  if (!userMetadata.browser || !userMetadata.os) {
    let ua = uap(req.headers["user-agent"]);
    userMetadata.browser = ua.browser;
    userMetadata.os = ua.os;
  }

  const batchOfEvents = req.body;
  console.log(batchOfEvents);

  allRecordedEvents.push(batchOfEvents);
  res.sendStatus(200);
});

app.get("/allRecordedEvents", (req, res) => {
  const sessionData = {
    events: allRecordedEvents,
    userMetadata,
  };
  res.json(sessionData);
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
