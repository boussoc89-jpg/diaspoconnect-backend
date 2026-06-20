const express = require("express");
const router = express.Router();
const {
  getAssociations,
  getAssociation,
  createAssociation,
  updateAssociation,
} = require("../controllers/associationController");
const verifyToken = require("../middlewares/verifyToken");

// Routes publiques
router.get("/", getAssociations);
router.get("/:id", getAssociation);

// Routes protégées
router.post("/", verifyToken, createAssociation);
router.put("/:id", verifyToken, updateAssociation);

module.exports = router;
