const db = require("../db/queries");

async function categoriesGet(req, res) {
  const { rows } = await db.getAllCategories();
  res.render("categories", { categories: rows });
}

module.exports = { categoriesGet };
