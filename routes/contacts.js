const express = require("express");
const router = express.Router();
const { create, getAll, remove } = require("../controllers/contactController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", create);
router.get("/:associationId", verifyToken, getAll);
router.delete("/:id", verifyToken, remove);

module.exports = router;
