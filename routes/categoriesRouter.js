const { Router } = require("express");
const { categoriesGet } = require("../controllers/categoriesController");
const router = Router();

router.get("/", categoriesGet);

module.exports = router;
