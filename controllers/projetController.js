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

const getMesProjets = async (req, res) => {
  try {
    const projets = await Projet.findAll({
      where: { porteur_id: req.utilisateur.id },
      order: [["date_publication", "DESC"]],
    });
    res.json(projets);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};
const soutenir = async (req, res) => {
  try {
    const projet = await Projet.findByPk(req.params.id);
    if (!projet) return res.status(404).json({ message: "Projet introuvable" });

    const { montant } = req.body;
    if (!montant || montant <= 0)
      return res.status(400).json({ message: "Montant invalide" });

    const nouveauMontant =
      parseFloat(projet.montant_collecte) + parseFloat(montant);
    const nouveauStatut =
      nouveauMontant >= parseFloat(projet.montant_objectif)
        ? "Financé"
        : "En cours";

    await projet.update({
      montant_collecte: nouveauMontant,
      statut: nouveauStatut,
    });

    res.json({ message: "Contribution enregistrée", projet });
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
  soutenir,
};
