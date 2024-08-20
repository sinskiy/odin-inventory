const pool = require("./pool");

async function getAllItems() {
  return await pool.query("SELECT * FROM items");
}

async function getItemsByCategory(categoryId) {
  return await pool.query("SELECT * FROM items WHERE category_id = $1", [
    categoryId,
  ]);
}

async function getItemById(itemId) {
  return await pool.query("SELECT * FROM items WHERE id = $1", [itemId]);
}

async function updateItem(id, { name, price, categoryId }) {
  return await pool.query(
    "UPDATE items SET name = $1, price_cents = $2, category_id = $3 WHERE id = $4",
    [name, price, categoryId, id],
  );
}

async function deleteItem(id) {
  return await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

async function getAllCategories() {
  return await pool.query("SELECT * FROM categories");
}

async function getCategoryById(id) {
  return await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
}

async function updateCategory(id, { name }) {
  return await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [
    name,
    id,
  ]);
}

async function deleteCategory(id) {
  return await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

module.exports = {
  getAllItems,
  getItemsByCategory,
  getItemById,
  updateItem,
  deleteItem,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
