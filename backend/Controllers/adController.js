const Ad = require("../Models/adModel");

const createAd = async (req, res) => {
    const authorId = req.user.id;
    try {
        const ad = new Ad({
            ...req.body,
            author: authorId,
        });
        if (!ad) {
            return res.status(400).send("Merci de remplir tous les champs");
        }
        await ad.save();
        res.status(201).send(ad);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const getAds = async (req, res) => {
    try {
        const filter = {};
        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: "i" };
        }
        if (req.query.adType) {
            filter.adType = { $regex: req.query.cuisineType, $options: "i" };
        }

        const ads = await Ad.find(filter).populate(
            "author",
            "username email"
        );

        res.status(200).send(ads);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const updateAd = async (req, res) => {
    try {
        const ad = await Ad.findByIdAndUpdate(
            req.params.adId,
            req.body,
            {
                new: true,
            }
        );
        if (!ad) {
            return res.status(404).send({ error: "Annonce introuvable" });
        }
        res.status(200).send(ad);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteAd = async (req, res) => {
    try {
        const ad = await Ad.findByIdAndDelete(req.params.adId);
        if (!ad) {
            return res.status(404).send({ error: "Annonce introuvable" });
        }
        res.status(200).send({ message: "Annonce supprimée" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { createAd, getAds, updateAd, deleteAd };