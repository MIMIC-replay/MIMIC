const express = require("express");
const recordRouter = express.Router();
const logger = require("../utils/logger.js");

const allRecordedEvents = [];

recordRouter.post("/", (req, res) => {
  const batchOfEvents = req.body;
  // let consolePayloads = batchOfEvents.filter((obj) => obj.data.plugin);
  // if (consolePayloads.length > 0) {
  //   consolePayloads.forEach((consolePayload) => {
  //     console.log("Payload: ", consolePayload);
  //   });
  // } else {
  //   console.log("No console payload");
  // }

  // let networkEventPayload = batchOfEvents.filter((obj) => obj.type === 50);
  // if (networkEventPayload.length > 0) {
  //   networkEventPayload.forEach((event) => {
  //     console.log("Network event: ", event);
  //   });
  // } else {
  //   console.log("No network event payload");
  // }
  //   console.log(batchOfEvents);
  allRecordedEvents.push(batchOfEvents);
  res.sendStatus(201);
});

recordRouter.get("/", (req, res) => {
  res.json(allRecordedEvents);
});

module.exports = recordRouter;
