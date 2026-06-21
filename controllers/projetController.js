const { Projet, Association } = require("../models");

// Récupérer tous les projets
const getAll = async (req, res) => {
  try {
    const projets = await Projet.findAll({
      include: [{ model: Association, attributes: ["nom", "ville", "pays"] }],
    });
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Récupérer un projet par ID
const getOne = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id, {
      include: [{ model: Association, attributes: ["nom", "ville", "pays"] }],
    });
    if (!projet) return res.status(404).json({ message: "Projet introuvable" });
    res.json(projet);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Créer un projet
const create = async (req, res) => {
  try {
    const { titre, description, statut, associationId } = req.body;
    const projet = await Projet.create({
      titre,
      description,
      statut,
      associationId,
    });
    res.status(201).json({ message: "Projet créé", projet });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Modifier un projet
const update = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet introuvable" });

    await projet.update(req.body);
    res.json({ message: "Projet mis à jour", projet });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Supprimer un projet
const remove = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet introuvable" });

    await projet.destroy();
    res.json({ message: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };
