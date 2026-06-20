const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Utilisateur } = require("../models");

// Inscription
const inscription = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;

    // Vérifier si email existe déjà
    const existant = await Utilisateur.findOne({ where: { email } });
    if (existant) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hacher le mot de passe
    const hash = await bcrypt.hash(mot_de_passe, 10);

    // Créer l'utilisateur
    const utilisateur = await Utilisateur.create({
      nom,
      email,
      mot_de_passe: hash,
      role: role || "visiteur",
      statut: "en_attente",
    });

    res.status(201).json({
      message: "Inscription réussie !",
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Connexion
const connexion = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Vérifier si l'utilisateur existe
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const valide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!valide) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Connexion réussie !",
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = { inscription, connexion };
