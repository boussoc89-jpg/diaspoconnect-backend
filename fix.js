require("dotenv").config();
const { sequelize } = require("./models");

sequelize
  .query(
    "ALTER TABLE utilisateurs MODIFY COLUMN role ENUM('visiteur', 'porteur', 'association', 'admin') DEFAULT 'visiteur'",
  )
  .then(() => {
    console.log("✅ ENUM mis à jour");
    process.exit(0);
  })
  .catch((e) => {
    console.log("❌ Erreur:", e.message);
    process.exit(1);
  });
