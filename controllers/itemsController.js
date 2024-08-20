const db = require("../db/queries");

async function itemsGet(req, res) {
  const { rows } = await db.getAllItems();
  res.render("items", { items: rows });
}

module.exports = { itemsGet };
