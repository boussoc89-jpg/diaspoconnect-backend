const nodemailer = require("nodemailer");
const { Contact, Association } = require("../models");
require("dotenv").config();

const envoyerContact = async (req, res) => {
  try {
    const { association_id, nom_expediteur, email_expediteur, message } =
      req.body;

    // Vérifier que l'association existe
    const association = await Association.findByPk(association_id);
    if (!association) {
      return res.status(404).json({ message: "Association introuvable" });
    }

    // Sauvegarder le contact en BDD
    const contact = await Contact.create({
      association_id,
      nom_expediteur,
      email_expediteur,
      message,
      statut: "envoyé",
    });

    // Envoyer l'email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: association.email_public,
      subject: `DiaspoConnect — Nouveau message de ${nom_expediteur}`,
      html: `
        <h2>Nouveau message via DiaspoConnect</h2>
        <p><strong>De :</strong> ${nom_expediteur} (${email_expediteur})</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
        <hr/>
        <p><small>Ce message a été envoyé via DiaspoConnect</small></p>
      `,
    });

    res.status(201).json({
      message: "Message envoyé avec succès !",
      contact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = { envoyerContact };
