const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  update,
  remove,
  getMesProjets,
  getPendingProjets,
  validerProjet,
} = require("../controllers/projetController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAll);
router.get("/mes-projets", verifyToken, getMesProjets);
router.get("/pending", verifyToken, getPendingProjets);
router.get("/:id", getOne);
router.post("/", verifyToken, create);
router.put("/:id/valider", verifyToken, validerProjet);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

module.exports = router;
