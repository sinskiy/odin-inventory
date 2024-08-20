const { Router } = require("express");
const {
  categoriesGet,
  categoryGet,
  editCategoryGet,
  editCategoryPost,
  deleteCategoryPost,
} = require("../controllers/categoriesController");
const router = Router();

router.get("/", categoriesGet);
router.get("/:categoryId", categoryGet);
router.get("/:categoryId/edit", editCategoryGet);
router.post("/:categoryId/edit", editCategoryPost);
router.post("/:categoryId/delete", deleteCategoryPost);

module.exports = router;
