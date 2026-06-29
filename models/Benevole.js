const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Benevole = sequelize.define(
  "Benevole",
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
    pays: {
      type: DataTypes.STRING(100),
    },
    competence: {
      type: DataTypes.STRING(100),
    },
    skills: {
      type: DataTypes.STRING(255),
    },
    details: {
      type: DataTypes.TEXT,
    },
    disponibilite: {
      type: DataTypes.STRING(100),
    },
    statut: {
      type: DataTypes.ENUM("actif", "inactif"),
      defaultValue: "actif",
    },
  },
  {
    tableName: "benevoles",
    timestamps: true,
    createdAt: "date_inscription",
    updatedAt: false,
  },
);

module.exports = Benevole;
