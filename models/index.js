const sequelize = require("../config/database");
const Utilisateur = require("./Utilisateur");
const Association = require("./Association");
const Projet = require("./Projet");
const Contact = require("./Contact");

// Relations
Utilisateur.hasOne(Association, { foreignKey: "utilisateur_id" });
Association.belongsTo(Utilisateur, { foreignKey: "utilisateur_id" });

Association.hasMany(Projet, { foreignKey: "association_id" });
Projet.belongsTo(Association, { foreignKey: "association_id" });

Association.hasMany(Contact, { foreignKey: "association_id" });
Contact.belongsTo(Association, { foreignKey: "association_id" });

module.exports = {
  sequelize,
  Utilisateur,
  Association,
  Projet,
  Contact,
};
