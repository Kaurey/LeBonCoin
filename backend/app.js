const express = require("express");
const app = express();
app.use(express.json());
/*const bodyParser = require('body-parser');
const Ad = require("./Models/adModel");*/

const PORT = 8080;

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
//app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/leboncoinapinode", {})
    .then(() => {
        console.log("Connected to the mongoDB database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

const routes = require("./routes");
app.use("/", routes);

// Route pour récupérer les catégories uniques
/*app.get('/categories', async (req, res) => {
    try {
        const categories = await Ad.distinct('catégorie');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
    }
});

// Route pour récupérer les annonces filtrées
app.post('/filter', async (req, res) => {
    const { category } = req.body;

    try {
        const ads = await Ad.find({ category: category });
        res.json(ads);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des annonces' });
    }
});*/

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});