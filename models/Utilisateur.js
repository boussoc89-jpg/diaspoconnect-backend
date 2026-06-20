const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Utilisateur = sequelize.define(
  "Utilisateur",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    mot_de_passe: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("visiteur", "porteur", "association", "admin"),
      defaultValue: "visiteur",
    },
    statut: {
      type: DataTypes.ENUM("actif", "inactif", "en_attente"),
      defaultValue: "en_attente",
    },
  },
  {
    tableName: "utilisateurs",
    timestamps: true,
    createdAt: "date_inscription",
    updatedAt: false,
  },
);

module.exports = Utilisateur;
