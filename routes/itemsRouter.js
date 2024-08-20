const { Router } = require("express");
const { itemsGet, editItemGet } = require("../controllers/itemsController");
const router = Router();

router.get("/", itemsGet);
router.get("/:itemId", editItemGet);

module.exports = router;
