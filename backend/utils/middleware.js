const logger = require("./logger.js");

const errorHandler = (error, request, response, next) => {

  logger.error(error.message);

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Your token has expired." });
  }

  next(error);
};

module.exports = { errorHandler };
