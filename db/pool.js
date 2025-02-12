require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL,
});
