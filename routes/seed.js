const express = require("express");
const router = express.Router();
const { Association, Projet } = require("../models");

router.post("/", async (req, res) => {
  try {
    await Association.bulkCreate(
      [
        {
          nom: "Sénégal Avenir France",
          description:
            "Association de la diaspora sénégalaise en France, œuvrant pour le développement éducatif et sanitaire des communautés.",
          pays: "France",
          regions: "Dakar, Thiès",
          domaines: "Éducation, Santé",
          badge: "Certifiée",
          depuis: 2015,
          statut: "actif",
          utilisateur_id: 1,
          email_public: "contact@senegalavenir.fr",
          site_web: "www.senegalavenir.fr",
        },
        {
          nom: "Teranga Italia",
          description:
            "Regroupement des Sénégalais d'Italie engagés pour le développement agricole et l'entrepreneuriat local.",
          pays: "Italie",
          regions: "Kaolack, Fatick",
          domaines: "Agriculture, Entrepreneuriat",
          badge: "Certifiée",
          depuis: 2012,
          statut: "actif",
          utilisateur_id: 1,
          email_public: "info@terangaitalia.it",
          site_web: "www.terangaitalia.it",
        },
        {
          nom: "DiaspoSanté USA",
          description:
            "Réseau de professionnels de santé sénégalais aux États-Unis qui soutient les centres de santé communautaires au Sénégal.",
          pays: "États-Unis",
          regions: "Dakar, Saint-Louis",
          domaines: "Santé",
          badge: "Certifiée",
          depuis: 2018,
          statut: "actif",
          utilisateur_id: 1,
          email_public: "contact@diasposante.org",
          site_web: "www.diasposante.org",
        },
        {
          nom: "Sahel Vert Espagne",
          description:
            "Association environnementale basée à Madrid, spécialisée dans la reforestation et la lutte contre la désertification.",
          pays: "Espagne",
          regions: "Louga, Matam",
          domaines: "Environnement, Agriculture",
          badge: "Vérifiée",
          depuis: 2019,
          statut: "actif",
          utilisateur_id: 1,
          email_public: "contact@sahelvert.es",
          site_web: "www.sahelvert.es",
        },
        {
          nom: "Culture Sénégal Bruxelles",
          description:
            "Promotion de la culture sénégalaise en Belgique et soutien aux initiatives culturelles locales au Sénégal.",
          pays: "Belgique",
          regions: "Dakar, Ziguinchor",
          domaines: "Culture, Éducation",
          badge: "Vérifiée",
          depuis: 2016,
          statut: "actif",
          utilisateur_id: 1,
          email_public: "info@culturesn.be",
          site_web: "www.culturesn.be",
        },
        {
          nom: "SportDev Sénégal",
          description:
            "Association franco-sénégalaise axée sur le développement du sport comme vecteur d'inclusion sociale.",
          pays: "France",
          regions: "Dakar, Thiès",
          domaines: "Sport, Éducation",
          badge: "Membre",
          depuis: 2020,
          statut: "actif",
          utilisateur_id: 1,
          email_public: "contact@sportdev.sn",
          site_web: "www.sportdev.sn",
        },
      ],
      { ignoreDuplicates: true },
    );

    await Projet.bulkCreate(
      [
        {
          titre: "Construction d'une bibliothèque communautaire à Pikine",
          description:
            "Construire une bibliothèque pour 500 enfants du quartier de Pikine.",
          domaine: "Éducation",
          localite: "Pikine",
          region: "Dakar",
          montant_objectif: 45000,
          montant_collecte: 32000,
          urgent: false,
          statut: "En cours",
          porteur_id: 1,
        },
        {
          titre: "URGENT — Inondations Matam : relogement 80 familles",
          description:
            "Suite aux inondations, 80 familles ont besoin d'un relogement d'urgence.",
          domaine: "Santé",
          localite: "Matam",
          region: "Matam",
          montant_objectif: 65000,
          montant_collecte: 38000,
          urgent: true,
          statut: "En cours",
          porteur_id: 1,
        },
        {
          titre: "Dotation en matériel scolaire — 500 enfants de Kaolack",
          description:
            "Fournir des fournitures scolaires à 500 enfants défavorisés de Kaolack.",
          domaine: "Éducation",
          localite: "Kaolack",
          region: "Kaolack",
          montant_objectif: 13000,
          montant_collecte: 8000,
          urgent: true,
          statut: "En cours",
          porteur_id: 1,
        },
        {
          titre: "Réhabilitation du forage de Dagana",
          description:
            "Réhabiliter le forage principal de Dagana pour l'accès à l'eau potable.",
          domaine: "Santé",
          localite: "Dagana",
          region: "Saint-Louis",
          montant_objectif: 28000,
          montant_collecte: 28000,
          urgent: false,
          statut: "Financé",
          porteur_id: 1,
        },
        {
          titre: "Centre de santé de Kolda — équipement médical",
          description:
            "Équiper le centre de santé de Kolda en matériel médical de base.",
          domaine: "Santé",
          localite: "Kolda",
          region: "Kolda",
          montant_objectif: 35000,
          montant_collecte: 15000,
          urgent: true,
          statut: "En cours",
          porteur_id: 1,
        },
        {
          titre: "Projet maraîcher coopératif de Ziguinchor",
          description:
            "Développer une coopérative maraîchère pour 30 femmes de Ziguinchor.",
          domaine: "Agriculture",
          localite: "Ziguinchor",
          region: "Ziguinchor",
          montant_objectif: 18000,
          montant_collecte: 11000,
          urgent: false,
          statut: "En cours",
          porteur_id: 1,
        },
      ],
      { ignoreDuplicates: true },
    );

    res.json({ message: "✅ Données insérées avec succès !" });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur", erreur: err.message });
  }
});

module.exports = router;
