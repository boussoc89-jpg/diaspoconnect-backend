const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Association = sequelize.define(
  "Association",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    utilisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    pays: {
      type: DataTypes.STRING(100),
    },
    regions: {
      type: DataTypes.STRING(255),
    },
    domaines: {
      type: DataTypes.STRING(255),
    },
    logo: {
      type: DataTypes.STRING(255),
    },
    email_public: {
      type: DataTypes.STRING(150),
    },
    telephone: {
      type: DataTypes.STRING(50),
    },
    site_web: {
      type: DataTypes.STRING(255),
    },
    facebook: {
      type: DataTypes.STRING(255),
    },
    badge: {
      type: DataTypes.ENUM("Membre", "Vérifiée", "Certifiée"),
      defaultValue: "Membre",
    },
    depuis: {
      type: DataTypes.INTEGER,
    },
    statut: {
      type: DataTypes.ENUM("actif", "inactif", "en_attente"),
      defaultValue: "en_attente",
    },
  },
  {
    tableName: "associations",
    timestamps: true,
    createdAt: "date_creation",
    updatedAt: false,
  },
);

module.exports = Association;
