const { Projet, Association } = require("../models");

const getAll = async (req, res) => {
  try {
    const projets = await Projet.findAll({
      order: [["date_publication", "DESC"]],
    });
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet introuvable" });
    res.json(projet);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const create = async (req, res) => {
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
    console.log("CREATE PROJET - utilisateur:", req.utilisateur);
    console.log("CREATE PROJET - body:", req.body);
    const projet = await Projet.create({
      titre,
      description,
      domaine,
      localite,
      region,
      montant_objectif: montant_objectif || 0,
      montant_collecte: 0,
      urgent: urgent || false,
      porteur_id: req.utilisateur.id,
      statut: "En cours",
    });
    res.status(201).json({ message: "Projet créé", projet });
  } catch (err) {
    console.error("ERREUR CREATE PROJET:", err.message);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const update = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet introuvable" });
    if (
      projet.porteur_id !== req.utilisateur.id &&
      req.utilisateur.role !== "admin"
    )
      return res.status(403).json({ message: "Non autorisé" });
    await projet.update(req.body);
    res.json({ message: "Projet mis à jour", projet });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet introuvable" });
    if (
      projet.porteur_id !== req.utilisateur.id &&
      req.utilisateur.role !== "admin"
    )
      return res.status(403).json({ message: "Non autorisé" });
    await projet.destroy();
    res.json({ message: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const getPendingProjets = async (req, res) => {
  try {
    const projets = await Projet.findAll({
      where: { statut: "en_attente" },
      order: [["date_publication", "DESC"]],
    });
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const validerProjet = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet introuvable" });
    await projet.update({ statut: "En cours" });
    res.json({ message: "Projet validé", projet });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};
module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getMesProjets,
  getPendingProjets,
  validerProjet,
};
