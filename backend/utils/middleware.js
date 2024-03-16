const SESSION_DURATION = 1000 * 10;
const logger = require("./logger.js");
const uuid = require("uuid");

const sessionIdCookie = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  const currentTime = new Date().getTime();

  if (!sessionId || currentTime - sessionId.lastActivity > SESSION_DURATION) {
    console.log("No sessionId cookie on this request or expired");
    const newSessionId = uuid.v4();
    console.log("New sessionId: ", newSessionId);
    console.log("--------------------------------------------------");
    res.cookie(
      "sessionId",
      { id: newSessionId, lastActivity: currentTime },
      {
        maxAge: SESSION_DURATION,
      }
    );
    req.sessionId = { id: newSessionId, lastActivity: currentTime };
  } else {
    console.log("Valid SessionId cookie attached");
    console.log("Id: ", sessionId.id);
    console.log("--------------------------------------------------");
    // Update last activity time
    sessionId.lastActivity = currentTime;
    res.cookie("sessionId", sessionId, {
      maxAge: SESSION_DURATION,
    });
    req.sessionId = sessionId;
  }
  next();
}

const errorHandler = (error, request, response, next) => {

  logger.error(error.message);

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Your token has expired." });
  }

  next(error);
};

module.exports = { errorHandler, sessionIdCookie };
