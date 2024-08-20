const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function categoriesGet(req, res, next) {
  try {
    const { rows } = await db.getAllCategories();
    res.render("categories", { categories: rows });
  } catch (error) {
    next(error);
  }
}

async function categoryGet(req, res, next) {
  const { categoryId } = req.params;
  try {
    const items = await db.getItemsByCategory(categoryId);
    const category = await db.getCategoryById(categoryId);
    res.render("items", {
      items: items.rows,
      category: category.rows[0]?.name,
    });
  } catch (error) {
    next(error);
  }
}

async function editCategoryGet(req, res, next) {
  try {
    const { rows } = await db.getCategoryById(req.params.categoryId);
    res.render("edit-category", { category: rows[0] });
  } catch (error) {
    next();
  }
}

const validateCategory = [
  body("name")
    .isLength({ min: 1, max: 16 })
    .withMessage("Category must be between 1 and 16 characters"),
];
const editCategoryPost = [
  validateCategory,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { rows } = await db.getCategoryById(req.params.categoryId);
      return res
        .status(400)
        .render("edit-category", { category: rows[0], errors: errors.array() });
    }
    const { name } = req.body;
    const id = req.params.categoryId;
    try {
      await db.updateCategory(id, { name });
      res.redirect("/categories");
    } catch (error) {
      next(error);
    }
  },
];

async function deleteCategoryPost(req, res, next) {
  const id = req.params.categoryId;
  try {
    await db.deleteCategory(id);
    res.redirect("/categories");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  categoriesGet,
  categoryGet,
  editCategoryGet,
  editCategoryPost,
  deleteCategoryPost,
};
