const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function itemsGet(req, res, next) {
  try {
    const { rows } = await db.getAllItems();
    res.render("items", { items: rows });
  } catch (error) {
    next(error);
  }
}

async function editItemGet(req, res, next) {
  try {
    const itemQueryResults = await db.getItemById(req.params.itemId);
    const item = itemQueryResults.rows[0];
    const { rows } = await db.getAllCategories();
    res.render("edit-item", { item, categories: rows });
  } catch (error) {
    next(error);
  }
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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const itemQueryResults = await db.getItemById(req.params.itemId);
      const item = itemQueryResults.rows[0];
      const { rows } = await db.getAllCategories();
      return res.status(400).render("edit-item", {
        item,
        categories: rows,
        errors: errors.array(),
      });
    }
    const { name, price, categoryId } = req.body;
    const id = req.params.itemId;
    try {
      await db.updateItem(id, { name, price, categoryId });
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];

async function deleteItemPost(req, res, next) {
  const id = req.params.itemId;
  try {
    await db.deleteItem(id);
    res.redirect("/");
  } catch (error) {
    next(erorr);
  }
}

module.exports = { itemsGet, editItemGet, editItemPost, deleteItemPost };
