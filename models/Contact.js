const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contact = sequelize.define(
  "Contact",
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
      allowNull: false,
    },
    nom_expediteur: {
      type: DataTypes.STRING(100),
    },
    email_expediteur: {
      type: DataTypes.STRING(150),
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    statut: {
      type: DataTypes.ENUM("envoyé", "lu", "répondu"),
      defaultValue: "envoyé",
    },
  },
  {
    tableName: "contacts",
    timestamps: true,
    createdAt: "date_envoi",
    updatedAt: false,
  },
);

module.exports = Contact;
