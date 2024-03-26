const Minio = require("minio");
const config = require("../utils/config.js");
// Instantiate the MinIO client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
  endPoint: config.MINIO_URL,
  port: config.MINIO_PORT,
  useSSL: false,
  accessKey: config.MINIO_USER,
  secretKey: config.MINIO_USER_PASSWORD,
});

function uploadToEventStorage(sessionId, allEventsCompressed) {
  const buffer = Buffer.from(allEventsCompressed);
  return new Promise((resolve, reject) => {
    minioClient.putObject("mimic", `${sessionId}`, buffer, (err, etag) => {
      if (err) {
        console.error("Error uploading data:", err);
        reject(err);
      } else {
        console.log("Data uploaded successfully");
        resolve(etag);
      }
    });
  });
}

// Function to retrieve object content
const getObjectContent = (bucketName, objectName) => {
  return new Promise((resolve, reject) => {
    minioClient.getObject(bucketName, objectName, (err, dataStream) => {
      if (err) {
        reject(err);
        return;
      }

      let chunks = [];

      // Read data from the stream
      dataStream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      // Handle errors during data retrieval
      dataStream.on("error", (error) => {
        reject(error);
      });

      // When the stream ends, concatenate chunks and resolve with the content
      dataStream.on("end", () => {
        const content = Buffer.concat(chunks);
        resolve(content);
      });
    });
  });
};

module.exports = { uploadToEventStorage, getObjectContent };
