const express = require("express");
const router = express.Router();
const { Association, Projet } = require("../models");
const { Sequelize } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const totalAssociations = await Association.count({
      where: { statut: "actif" },
    });

    const totalFonds = (await Projet.sum("montant_collecte")) || 0;

    const paysResult = await Association.findAll({
      attributes: ["pays"],
      where: { statut: "actif" },
      group: ["pays"],
    });
    const totalPays = paysResult.filter((p) => p.pays).length;

    const totalProjets = await Projet.count();

    res.json({
      associations: totalAssociations,
      fonds: totalFonds,
      pays: totalPays,
      projets: totalProjets,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
});

module.exports = router;
