const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const config = require("./utils/config.js");

const middleware = require("./utils/middleware.js");

const logger = require("./utils/logger.js");

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  cors({
    origin: "http://localhost:5173", // this we have to figure out, we can't manually add the origin in the backend for all target applications
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan(":method :url :status :body"));

app.use(cookieParser())

app.use(middleware.sessionIdCookie)

const testRouter = require("./controllers/test.js");
const recordRouter = require("./controllers/record.js");
const sessionRouter = require("./controllers/session.js")

app.use("/api/record", recordRouter);
app.use("/api/test", testRouter);
app.use("/api/project", sessionRouter)

app.use(middleware.errorHandler); // needs to be below all routes for all to use

module.exports = app;
