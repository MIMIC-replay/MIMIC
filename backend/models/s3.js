const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const config = require('../utils/config');

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload data to S3
function uploadToEventStorage(sessionId, allEventsCompressed) {
  const buffer = Buffer.from(allEventsCompressed);
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: sessionId,
        Body: buffer,
      };
      const command = new PutObjectCommand(params);
      s3.send(command).then((data) => {
        console.log('Data uploaded successfully');
        resolve(data);
      });
    } catch (err) {
      console.error('Error uploading data:', err);
      reject(err);
    }
  });
}

// Function to retrieve object content
async function getObjectContent(objectName) {
  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: objectName,
  };

  return new Promise((resolve, reject) => {
    try {
      const command = new GetObjectCommand(params);
      s3.send(command).then((response) => {
        const responseDataChunks = [];

        // Handle an error while streaming the response body
        response.Body.on('error', (err) => reject(err));

        // Attach a 'data' listener to add the chunks of data to our array
        // Each chunk is a Buffer instance
        response.Body.on('data', (chunk) => responseDataChunks.push(chunk));

        response.Body.on('end', () => {
          const content = Buffer.concat(responseDataChunks);
          console.log(typeof content, content);
          resolve(content);
        });
      });
    } catch (err) {
      console.error('Error retrieving object content:', err);
      throw err;
    }
  });
}

module.exports = { uploadToEventStorage, getObjectContent };
