const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const middleware = require("./utils/middleware.js");

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(middleware.tokenExtractor);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.static('dist'))
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan(":method :url :status :body"));
}

app.use(cookieParser());
app.set("trust proxy", true);

const testRouter = require("./controllers/test.js");
const recordRouter = require("./controllers/record.js");
const sessionRouter = require("./controllers/session.js");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use("/api/test", testRouter);
app.use("/api/project", sessionRouter);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.sessionCookie);
app.use("/api/record", recordRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler); // needs to be below all routes for all to use

module.exports = app;
