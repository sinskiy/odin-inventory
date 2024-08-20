const { Router } = require("express");
const {
  itemsGet,
  editItemGet,
  editItemPost,
  deleteItemPost,
} = require("../controllers/itemsController");
const router = Router();

router.get("/", itemsGet);
router.get("/:itemId", editItemGet);
router.post("/:itemId", editItemPost);
router.post("/:itemId/delete", deleteItemPost);

module.exports = router;
