const express = require("express");
const router = express.Router();
const { Association, Projet, Sequelize } = require("../models");

router.get("/", async (req, res) => {
  try {
    const totalAssociations = await Association.count({
      where: { statut: "actif" },
    });

    const totalFonds = (await Projet.sum("montant_collecte")) || 0;

    const pays = await Association.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("pays")), "pays"]],
      where: { statut: "actif" },
    });
    const totalPays = pays.filter((p) => p.pays).length;

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
