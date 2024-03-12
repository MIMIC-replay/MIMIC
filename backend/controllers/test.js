const express = require("express");
const testRouter = express.Router();
const logger = require("../utils/logger.js");

testRouter.get("/random", (req, res) => {
  res.json("aslkdfgnalksgnalksdgnaksl");
});

testRouter.delete("/deleteTest", (req, res) => {
  res.status(500).json("deleted");
});

module.exports = testRouter;
