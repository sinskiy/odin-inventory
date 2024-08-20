const { body, validationResult } = require("express-validator");
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

async function editCategoryGet(req, res) {
  const { rows } = await db.getCategoryById(req.params.categoryId);
  res.render("edit-category", { category: rows[0] });
}

const validateCategory = [
  body("name")
    .isLength({ min: 1, max: 16 })
    .withMessage("Category must be between 1 and 16 characters"),
];
const editCategoryPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { rows } = await db.getCategoryById(req.params.categoryId);
      return res
        .status(400)
        .render("edit-category", { category: rows[0], errors: errors.array() });
    }
    const { name } = req.body;
    const id = req.params.categoryId;
    await db.updateCategory(id, { name });
    res.redirect("/categories");
  },
];

async function deleteCategoryPost(req, res) {
  const id = req.params.categoryId;
  await db.deleteCategory(id);
  res.redirect("/categories");
}

module.exports = {
  categoriesGet,
  categoryGet,
  editCategoryGet,
  editCategoryPost,
  deleteCategoryPost,
};
