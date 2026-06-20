const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Projet = sequelize.define(
  "Projet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    porteur_id: {
      type: DataTypes.INTEGER,
    },
    association_id: {
      type: DataTypes.INTEGER,
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    domaine: {
      type: DataTypes.STRING(100),
    },
    localite: {
      type: DataTypes.STRING(150),
    },
    region: {
      type: DataTypes.STRING(100),
    },
    montant_objectif: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    montant_collecte: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    urgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    statut: {
      type: DataTypes.ENUM("En cours", "Financé", "Clôturé"),
      defaultValue: "En cours",
    },
  },
  {
    tableName: "projets",
    timestamps: true,
    createdAt: "date_publication",
    updatedAt: false,
  },
);

module.exports = Projet;
