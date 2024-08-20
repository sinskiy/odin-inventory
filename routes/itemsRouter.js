const { Router } = require("express");
const { itemsGet } = require("../controllers/itemsController");
const router = Router();

router.get("/", itemsGet);

module.exports = router;
