require("dotenv").config();
const mongoose = require("mongoose");

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conectado ao Banco de dados com sucesso!");
  } catch {
    (error) => {
      return console.log(error);
    };
  }
};

module.exports = connectDataBase;
