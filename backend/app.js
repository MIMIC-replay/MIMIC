const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const session = require("express-session");
const cookieSession = require('cookie-session');

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

// Using cookie-session
app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
// End of using cookie-session

/* Using express-session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
      // Configuration options for the session cookie
      secure: true, // Ensures the cookie is only sent over HTTPS
      maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour in this example)
      httpOnly: true // Ensures the cookie is not accessible via client-side JavaScript
  }
}));


app.use(session({
  secret: 'neko',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // Configuration options for the session cookie
    secure: false, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour in this example)
    httpOnly: true // Ensures the cookie is not accessible via client-side JavaScript
}
}))

app.use(function (req, res, next) {
  console.log("Recording: ", req.sessionID)
  console.log("Recording?: ", req.session.id)
  if (!req.session.cat) {
    // req.session.id = genuuid()
    req.session.cat = "Meow"
    console.log("Cookie created!")
  } else {
    console.log("You already have a cookie!")
    console.log(`The cat goes ${req.session.cat}`)
  }

  next()
})
//End of Express Session
*/ 

const testRouter = require("./controllers/test.js");
const recordRouter = require("./controllers/record.js");
const sessionRouter = require("./controllers/session.js")

app.use("/api/record", recordRouter);
app.use("/api/test", testRouter);
app.use("/api/project", sessionRouter)

app.use(middleware.errorHandler); // needs to be below all routes for all to use

module.exports = app;
