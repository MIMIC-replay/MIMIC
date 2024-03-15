const app = require("./app.js");
const config = require("./utils/config.js");
const postgres = require("./models/postgres.js");
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
  postgres.testPGConnection();
});
