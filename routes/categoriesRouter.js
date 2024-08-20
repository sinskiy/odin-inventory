const { Router } = require("express");
const {
  categoriesGet,
  categoryGet,
} = require("../controllers/categoriesController");
const router = Router();

router.get("/", categoriesGet);
router.get("/:categoryId", categoryGet);

module.exports = router;
