const { Association } = require("../models");

// Récupérer toutes les associations
const getAssociations = async (req, res) => {
  try {
    const associations = await Association.findAll({
      where: { statut: "actif" },
      order: [["date_creation", "DESC"]],
    });
    res.json(associations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Récupérer une association par ID
const getAssociation = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association) {
      return res.status(404).json({ message: "Association introuvable" });
    }
    res.json(association);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Créer une association
const createAssociation = async (req, res) => {
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
      utilisateur_id: req.user.id,
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
      badge: "Membre",
      statut: "en_attente",
    });

    res.status(201).json({
      message: "Association créée avec succès !",
      association,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Mettre à jour une association
const updateAssociation = async (req, res) => {
  try {
    const association = await Association.findByPk(req.params.id);
    if (!association) {
      return res.status(404).json({ message: "Association introuvable" });
    }

    await association.update(req.body);
    res.json({ message: "Association mise à jour !", association });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = {
  getAssociations,
  getAssociation,
  createAssociation,
  updateAssociation,
};
