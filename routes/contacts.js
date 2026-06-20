const express = require("express");
const router = express.Router();
const { envoyerContact } = require("../controllers/contactController");

router.post("/", envoyerContact);

module.exports = router;
