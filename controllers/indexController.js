const db = require("../db/queries");

async function indexGet(req, res) {
  const { rows } = await db.getAllItems();
  res.render("index", { items: rows });
}

module.exports = { indexGet };
