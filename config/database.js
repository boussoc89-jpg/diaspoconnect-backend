const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    dialectOptions:
      process.env.NODE_ENV === "production"
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {},
    logging: false,
  },
);

module.exports = sequelize;
