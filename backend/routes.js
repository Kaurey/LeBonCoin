const express = require("express");
const { Register, Login, getUsers, updateUser, deleteUser } = require("./Controllers/userController");
const { createAd, getAds, updateAd, deleteAd } = require("./Controllers/adController");
const authMiddleware = require("./Middleware/authMiddleware");
const router = express.Router();

router.post("/", Register);
router.post("/login", Login);
router.get("/users", authMiddleware, getUsers);
router.put("/users/update/:id", authMiddleware, updateUser);
router.delete("/users/delete/:id", authMiddleware, deleteUser);
router.post("/ad", authMiddleware, createAd);
router.get("/ads", authMiddleware, getAds);
router.put("/ad/:adId", authMiddleware, updateAd);
router.delete("/ad/:adId", authMiddleware, deleteAd);

module.exports = router;
