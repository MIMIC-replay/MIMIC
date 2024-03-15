require("dotenv").config();

PORT = process.env.PORT;
PSQL_PASSWORD= process.env.PSQL_PASSWORD;
POSTGRES_PORT= process.env.POSTGRES_PORT;

module.exports = { PORT, POSTGRES_PORT, PSQL_PASSWORD };