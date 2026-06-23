const { Association, Utilisateur } = require("../models");

const getAll = async (req, res) => {
  try {
    const associations = await Association.findAll({
      where: { statut: "actif" },
    });
    res.json(associations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association)
      return res.status(404).json({ message: "Association introuvable" });
    res.json(association);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const create = async (req, res) => {
  try {
    const {
      nom,
      description,
      pays,
      regions,
      domaines,
      email_public,
      telephone,
      site_web,
      facebook,
      depuis,
    } = req.body;
    const association = await Association.create({
      nom,
      description,
      pays,
      regions,
      domaines,
      email_public,
      telephone,
      site_web,
      facebook,
      depuis,
      utilisateur_id: req.utilisateur.id,
      statut: "en_attente",
    });
    res.status(201).json({ message: "Association créée", association });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const update = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association)
      return res.status(404).json({ message: "Association introuvable" });
    if (association.utilisateur_id !== req.utilisateur.id)
      return res.status(403).json({ message: "Non autorisé" });
    await association.update(req.body);
    res.json({ message: "Association mise à jour", association });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association)
      return res.status(404).json({ message: "Association introuvable" });
    if (association.utilisateur_id !== req.utilisateur.id)
      return res.status(403).json({ message: "Non autorisé" });
    await association.destroy();
    res.json({ message: "Association supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const approuver = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association)
      return res.status(404).json({ message: "Association introuvable" });
    await association.update({ statut: "actif" });
    res.json({ message: "Association approuvée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const rejeter = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association)
      return res.status(404).json({ message: "Association introuvable" });
    await association.update({ statut: "inactif" });
    res.json({ message: "Association rejetée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

const getPending = async (req, res) => {
  try {
    const associations = await Association.findAll({
      where: { statut: "en_attente" },
    });
    res.json(associations);
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
  approuver,
  rejeter,
  getPending,
};
