const { Benevole } = require("../models");

const getAll = async (req, res) => {
  try {
    const benevoles = await Benevole.findAll({
      where: { statut: "actif" },
      order: [["date_inscription", "DESC"]],
    });
    res.json(benevoles);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { nom, pays, competence, skills, details, disponibilite } = req.body;
    const benevole = await Benevole.create({
      nom,
      pays,
      competence,
      skills,
      details,
      disponibilite,
      utilisateur_id: req.utilisateur.id,
      statut: "actif",
    });
    res.status(201).json({ message: "Bénévole créé", benevole });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const benevole = await Benevole.findByPk(req.params.id);
    if (!benevole)
      return res.status(404).json({ message: "Bénévole introuvable" });
    if (
      benevole.utilisateur_id !== req.utilisateur.id &&
      req.utilisateur.role !== "admin"
    )
      return res.status(403).json({ message: "Non autorisé" });
    await benevole.destroy();
    res.json({ message: "Bénévole supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

module.exports = { getAll, create, remove };
