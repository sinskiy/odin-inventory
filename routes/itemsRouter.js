const { Router } = require("express");
const {
  itemsGet,
  editItemGet,
  editItemPost,
  deleteItemPost,
  createItemGet,
  createItemPost,
} = require("../controllers/itemsController");
const router = Router();

router.get("/", itemsGet);
router.get("/create", createItemGet);
router.post("/create", createItemPost);
router.get("/:itemId", editItemGet);
router.post("/:itemId", editItemPost);
router.post("/:itemId/delete", deleteItemPost);

module.exports = router;
