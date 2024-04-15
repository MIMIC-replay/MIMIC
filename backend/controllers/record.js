const express = require('express');

const recordRouter = express.Router();
const redis = require('../models/redis');

const {
  extractMetadata,
  createNewSession,
} = require('../utils/recordHelpers');

const SESSION_DURATION = 10000;

recordRouter.post('/', async (req, res) => {
  console.log('sessionData is: ', req.sessionData);
  const sessionId = req.sessionData.id;
  const batchOfEvents = req.body;

  const keyExists = await redis.publisher.json.type(sessionId);
  if (keyExists) {
    // if the batch wasn't empty - so we don't make unneccesary requests to redis
    if (batchOfEvents.length > 0) {
      // json.arrAppend adds the JSON values to the end of the array
      await redis.publisher.json.arrAppend(sessionId, '$', batchOfEvents);
    }
  } else {
    const projectId = req.get('Project-ID');
    console.log('The project ID is: ', projectId);

    const userMetadata = {
      ip: null,
      browser: null,
      os: null,
      location: {},
      https: null,
      url: null,
    };
    await extractMetadata(req, userMetadata);
    console.log('Updated metadata: ', userMetadata);

    // JSON.SET: Will creates new path adds the values to a JSON object.
    // $ represents root path
    await redis.publisher.json.set(sessionId, '$', [batchOfEvents]);
    await redis.publisher.set(`${sessionId}_exp`, '');

    createNewSession(sessionId, userMetadata, projectId, res);
  }
  console.log('events saved');
  // Refresh (reset) expiry time for the key
  redis.publisher.expire(`${sessionId}_exp`, SESSION_DURATION / 1000);
  return res.sendStatus(200);
});

module.exports = recordRouter;
