const { Router } = require("express");
const {
  categoriesGet,
  categoryGet,
  editCategoryGet,
  editCategoryPost,
  deleteCategoryPost,
  createCategoryGet,
  createCategoryPost,
} = require("../controllers/categoriesController");
const router = Router();

router.get("/", categoriesGet);
router.get("/create", createCategoryGet);
router.post("/create", createCategoryPost);
router.get("/:categoryId", categoryGet);
router.get("/:categoryId/edit", editCategoryGet);
router.post("/:categoryId/edit", editCategoryPost);
router.post("/:categoryId/delete", deleteCategoryPost);

module.exports = router;
