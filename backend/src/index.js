const dotonev = require('dotenv');
dotonev.config();
const express = require('express');
const app = express();
app.use(express.json());

app.listen(process.env.API_PORT, ()=>{
    console.log("Servidor rodando na porta "+ process.env.API_PORT);
})