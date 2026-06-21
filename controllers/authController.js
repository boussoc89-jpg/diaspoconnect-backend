const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Utilisateur } = require("../models");

// INSCRIPTION
const register = async (req, res) => {
  try {
    const { nom, email, motDePasse, role } = req.body;

    const existe = await Utilisateur.findOne({ where: { email } });
    if (existe) return res.status(400).json({ message: "Email déjà utilisé" });

    const hash = await bcrypt.hash(motDePasse, 10);

    const utilisateur = await Utilisateur.create({
      nom,
      email,
      motDePasse: hash,
      role,
    });

    res
      .status(201)
      .json({ message: "Compte créé avec succès", id: utilisateur.id });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

// CONNEXION
const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur)
      return res.status(404).json({ message: "Utilisateur introuvable" });

    const valide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!valide)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: utilisateur.id, email: utilisateur.email, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      message: "Connexion réussie",
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

module.exports = { register, login };
