const config = require("../utils/config.js");
const pgp = require('pg-promise')();
const db = pgp(`postgres://postgres:${config.PSQL_PASSWORD}@localhost:${config.POSTGRES_PORT}/mimic`);

async function testPGConnection() {
  await db.connect()
          .then(() => {
            console.log('Connected to PostgreSQL');
          })
          .catch((error) => {
            console.log('Error connecting to PostgreSQL:', error.message);
          });
}

module.exports = { testPGConnection };