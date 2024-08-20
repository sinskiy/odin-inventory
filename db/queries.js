const pool = require("./pool");

async function getAllItems() {
  return await pool.query("SELECT * FROM items");
}

module.exports = { getAllItems };
