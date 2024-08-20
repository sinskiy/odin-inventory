const db = require("../db/queries");

async function itemsGet(req, res) {
  const { rows } = await db.getAllItems();
  res.render("items", { items: rows });
}

async function editItemGet(req, res) {
  const itemQueryResults = await db.getItemById(req.params.itemId);
  const item = itemQueryResults.rows[0];
  const { rows } = await db.getAllCategories();
  res.render("edit-item", { item, categories: rows });
}

module.exports = { itemsGet, editItemGet };
