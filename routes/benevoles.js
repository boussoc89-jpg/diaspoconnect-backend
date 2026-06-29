const express = require("express");
const router = express.Router();
const { getAll, create, remove } = require("../controllers/benevoleController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAll);
router.post("/", verifyToken, create);
router.delete("/:id", verifyToken, remove);

module.exports = router;
