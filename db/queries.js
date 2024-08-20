const pool = require("./pool");

async function getAllItems() {
  return await pool.query("SELECT * FROM items");
}

async function getItemsByCategory(categoryId) {
  return await pool.query("SELECT * FROM items WHERE category_id = $1", [
    categoryId,
  ]);
}

async function getAllCategories() {
  return await pool.query("SELECT * FROM categories");
}

async function getCategoryById(id) {
  return await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
}

module.exports = {
  getAllItems,
  getItemsByCategory,
  getAllCategories,
  getCategoryById,
};
