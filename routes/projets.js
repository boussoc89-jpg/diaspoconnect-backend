const express = require("express");
const router = express.Router();
const {
  getProjets,
  getProjet,
  createProjet,
} = require("../controllers/projetController");
const verifyToken = require("../middlewares/verifyToken");

// Routes publiques
router.get("/", getProjets);
router.get("/:id", getProjet);

// Routes protégées
router.post("/", verifyToken, createProjet);

module.exports = router;
