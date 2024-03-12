const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const allRecordedEvents = [];

app.post("/record", (req, res) => {
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
  console.log(batchOfEvents);
  allRecordedEvents.push(batchOfEvents);
  res.sendStatus(200);
});

app.get("/allRecordedEvents", (req, res) => {
  res.json(allRecordedEvents);
});

app.get("/random", (req, res) => {
  res.json("aslkdfgnalksgnalksdgnaksl");
});

app.delete("/deleteTest", (req, res) => {
  res.status(500).json("deleted");
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
