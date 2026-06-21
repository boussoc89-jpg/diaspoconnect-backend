const { Association, Utilisateur } = require("../models");

// Récupérer toutes les associations
const getAll = async (req, res) => {
  try {
    const associations = await Association.findAll({
      include: [{ model: Utilisateur, attributes: ["nom", "email"] }],
    });
    res.json(associations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Récupérer une association par ID
const getOne = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id, {
      include: [{ model: Utilisateur, attributes: ["nom", "email"] }],
    });
    if (!association)
      return res.status(404).json({ message: "Association introuvable" });
    res.json(association);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Créer une association
const create = async (req, res) => {
  try {
    const { nom, description, ville, pays, siteWeb } = req.body;
    const association = await Association.create({
      nom,
      description,
      ville,
      pays,
      siteWeb,
      utilisateurId: req.utilisateur.id,
    });
    res.status(201).json({ message: "Association créée", association });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Modifier une association
const update = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association)
      return res.status(404).json({ message: "Association introuvable" });
    if (association.utilisateurId !== req.utilisateur.id)
      return res.status(403).json({ message: "Non autorisé" });

    await association.update(req.body);
    res.json({ message: "Association mise à jour", association });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Supprimer une association
const remove = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association)
      return res.status(404).json({ message: "Association introuvable" });
    if (association.utilisateurId !== req.utilisateur.id)
      return res.status(403).json({ message: "Non autorisé" });

    await association.destroy();
    res.json({ message: "Association supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
