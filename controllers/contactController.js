const { Contact } = require("../models");

// Envoyer un message de contact
const create = async (req, res) => {
  try {
    const { nom, email, message, associationId } = req.body;
    const contact = await Contact.create({
      nom,
      email,
      message,
      associationId,
    });
    res.status(201).json({ message: "Message envoyé", contact });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Récupérer tous les messages d'une association
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      where: { associationId: req.params.associationId },
    });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// Supprimer un message
const remove = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact)
      return res.status(404).json({ message: "Message introuvable" });

    await contact.destroy();
    res.json({ message: "Message supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

module.exports = { create, getAll, remove };
