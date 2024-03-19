const SESSION_DURATION = 1000 * 10;
const logger = require("./logger.js");
const uuid = require("uuid");

const sessionCookie = (req, res, next) => {
  const sessionData = req.cookies.sessionData;
  const currentTime = new Date().getTime();

  if (
    !sessionData ||
    currentTime - sessionData.lastActivity > SESSION_DURATION
  ) {
    console.log("No sessionData cookie on this request or expired");
    const newSessionId = uuid.v4();
    console.log("New sessionId: ", newSessionId);
    console.log("--------------------------------------------------");
    res.cookie(
      "sessionData",
      { id: newSessionId, lastActivity: currentTime },
      {
        maxAge: SESSION_DURATION,
      }
    );
    req.sessionData = { id: newSessionId, lastActivity: currentTime };
  } else {
    console.log("Valid sessionData cookie attached");
    console.log("Id: ", sessionData.id);
    console.log("--------------------------------------------------");
    // Update last activity time
    sessionData.lastActivity = currentTime;
    res.cookie("sessionData", sessionData, {
      maxAge: SESSION_DURATION,
    });
    req.sessionData = { id: sessionData.id, lastActivity: currentTime };
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Your token has expired." });
  }

  next(error);
};

module.exports = { errorHandler, sessionCookie };
