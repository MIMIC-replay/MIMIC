const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const config = require("./utils/config.js");
const middleware = require("./utils/middleware.js");
const logger = require("./utils/logger.js");
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :body"));

app.get("/test", (req, res) => {
  res.status(200).send();
});

app.use(middleware.errorHandler);
module.exports = app;
