const db = require("../db/queries");

async function categoriesGet(req, res) {
  const { rows } = await db.getAllCategories();
  res.render("categories", { categories: rows });
}

async function categoryGet(req, res) {
  const { categoryId } = req.params;
  const items = await db.getItemsByCategory(categoryId);
  const category = await db.getCategoryById(categoryId);
  res.render("items", { items: items.rows, category: category.rows[0]?.name });
}

module.exports = { categoriesGet, categoryGet };
