const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  update,
  remove,
  approuver,
  rejeter,
  getPending,
} = require("../controllers/associationController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", getAll);
router.get("/pending", verifyToken, getPending);
router.get("/:id", getOne);
router.post("/", verifyToken, create);
router.put("/:id", verifyToken, update);
router.put("/:id/approuver", verifyToken, approuver);
router.put("/:id/rejeter", verifyToken, rejeter);
router.delete("/:id", verifyToken, remove);

module.exports = router;
