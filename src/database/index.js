const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 30000, // Tempo limite para estabelecer a conexão (opcional)
      requestTimeout: 30000   // Tempo limite para a execução da consulta
    }
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("\n DATABASE: Connection has been established successfully.\n");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
