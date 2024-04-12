const app = require('./app');
const config = require('./utils/config');
const postgres = require('./models/postgres');

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`MIMIC is running on port ${PORT}`);
  postgres.testPGConnection();
});
