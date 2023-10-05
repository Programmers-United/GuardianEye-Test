const dotonev = require('dotenv');
dotonev.config();
const express = require('express');
const app = express();
app.use(express.json());

const Point = require("./modal/point");

app.post("/point", async function (req, res){
    const point = Point.build(req.body);
    try{
        await point.save();
        res.status(202).send("Saved");
    }catch(err){
        console.log(err);
        res.status(400).send("Falid save");
    }
});

app.get("/point", async function (req, res){
    const point = await Point.findAll();
    res.status(200).send(point);
});

app.listen(process.env.API_PORT, ()=>{
    console.log("Servidor rodando na porta "+ process.env.API_PORT);
})