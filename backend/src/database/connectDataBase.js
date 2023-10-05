const dotenv = require("dotenv");
dotenv.config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: localhost,
    dialect: "postgres",
  }
);

async function connectDataBase() {
  try {
    await sequelize.authenticate();
    console.log("Conectado com sucesso!");
  } catch (error) {
    console.error(error);
  }
}

connectDataBase();

module.exports = sequelize;
