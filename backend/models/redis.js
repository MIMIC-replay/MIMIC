const { createClient } = require("redis");
const { compressEvents } = require("../utils/recordHelpers");
const { updateSessionEndTime } = require("../utils/sessionHelpers");
const { uploadToEventStorage } = require("../models/minio");

// redis connection (will act as publisher of expiration messages and main data mangement client)
const publisher = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

publisher.on("connect", () => console.log("publisher connected"));
publisher.on("error", (err) => console.log("publisher connection error", err));
publisher.on("ready", async () => {
  console.log("Redis clients ready for commands");
  // Configure redis client to notify subscribers of key expiry notifications
  await publisher.configSet("notify-keyspace-events", "Ex");
});

// Separate instance for subscribing to messages
const subscriber = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

subscriber.on("connect", async () => {
  console.log("subscriber connected");
  // Subscribe to key expiry events
  await subscriber.subscribe("__keyevent@0__:expired", async (expiredKey) => {
    console.log("Expired Key Notice: ", expiredKey);

    // Check if the expired key is an expiration placeholder
    if (expiredKey.endsWith("_exp")) {
      // Retrieve the data from the actual key
      const sessionId = expiredKey.replace("_exp", "");
      const expiredValue = await publisher.json.get(sessionId);

      // Handle the expired key and its associated value here (send to minio/s3)
      console.log("Expired value:", expiredValue);
      const compressedEvents = compressEvents(expiredValue);
      uploadToEventStorage(sessionId, compressedEvents)
        .then(async (data) => {
          updateSessionEndTime(sessionId);
          console.log(data);
          // Delete the actual key
          await publisher.del(sessionId);
          console.log("Deleted actual key:", sessionId);
        })
        .catch((err) => console.error(err));
    }
  });
});

subscriber.on("error", (err) =>
  console.log("subscriber Connection Error", err)
);

(async () => {
  await subscriber.connect();
  await publisher.connect();
})();

module.exports = { publisher, subscriber };
