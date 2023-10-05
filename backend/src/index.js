const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./routes/route');
const dotonev = require('dotenv');
dotonev.config();

app.use(express.json());
app.use(cors());
app.use('/point', route);

app.listen(process.env.API_PORT, ()=>{
    console.log("Servidor rodando na porta "+ process.env.API_PORT);
});