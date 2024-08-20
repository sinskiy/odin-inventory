const pool = require("./pool");

async function getAllItems() {
  return await pool.query("SELECT * FROM items");
}

async function getAllCategories() {
  return await pool.query("SELECT * FROM categories");
}

module.exports = { getAllItems, getAllCategories };
