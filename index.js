const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");

// Import routes
const statsRoutes = require("./routes/stats");
const authRoutes = require("./routes/auth");
const associationRoutes = require("./routes/associations");
const projetRoutes = require("./routes/projets");
const contactRoutes = require("./routes/contacts");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "https://diaspoconnect-olive.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/stats", statsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/associations", associationRoutes);
app.use("/api/projets", projetRoutes);
app.use("/api/contacts", contactRoutes);

// Route test
app.get("/", (req, res) => {
  res.json({ message: "🌍 DiaspoConnect API est en ligne !" });
});

// Démarrage serveur
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion MySQL réussie !");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur connexion MySQL :", err);
  });
