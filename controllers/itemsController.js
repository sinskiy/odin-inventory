const { body, validationResult } = require("express-validator");
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

const validateItem = [
  body("name")
    .isLength({ min: 1, max: 64 })
    .withMessage("Name must be between 1 and 64 characters"),
  body("price").isInt().withMessage("Price must be an int"),
  body("categoryId").isInt().withMessage("Category must be an int"),
];
const editItemPost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO: normal error handling
      res.status("402").redirect("/");
    }
    const { name, price, categoryId } = req.body;
    const id = req.params.itemId;
    await db.updateItem(id, { name, price, categoryId });
    res.redirect("/");
  },
];

async function deleteItemPost(req, res) {
  const id = req.params.itemId;
  await db.deleteItem(id);
  res.redirect("/");
}

module.exports = { itemsGet, editItemGet, editItemPost, deleteItemPost };
