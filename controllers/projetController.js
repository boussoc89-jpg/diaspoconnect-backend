const { Projet } = require("../models");

// Récupérer tous les projets
const getProjets = async (req, res) => {
  try {
    const projets = await Projet.findAll({
      order: [
        ["urgent", "DESC"],
        ["date_publication", "DESC"],
      ],
    });
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Récupérer un projet par ID
const getProjet = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id);
    if (!projet) {
      return res.status(404).json({ message: "Projet introuvable" });
    }
    res.json(projet);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Créer un projet
const createProjet = async (req, res) => {
  try {
    const {
      titre,
      description,
      domaine,
      localite,
      region,
      montant_objectif,
      urgent,
    } = req.body;

    const projet = await Projet.create({
      porteur_id: req.user.id,
      titre,
      description,
      domaine,
      localite,
      region,
      montant_objectif,
      montant_collecte: 0,
      urgent: urgent || false,
      statut: "En cours",
    });

    res.status(201).json({
      message: "Projet publié avec succès !",
      projet,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = { getProjets, getProjet, createProjet };
