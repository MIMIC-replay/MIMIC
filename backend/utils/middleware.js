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

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else request.token = null;

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  request.user = await User.findById(decodedToken.id); // replace with findByProjectId

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  errorHandler,
  sessionCookie,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
};
