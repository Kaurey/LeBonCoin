const express = require("express");
const { Register, Login, getUsers, updateUser, deleteUser } = require("./Controllers/userController");
const { createAd, getAds, updateAd, deleteAd, getAdById } = require("./Controllers/adController");
const authMiddleware = require("./Middleware/authMiddleware");
const router = express.Router();

router.post("/", Register);
router.post("/login", Login);
router.get("/users", authMiddleware, getUsers);
router.put("/user/update/:id", authMiddleware, updateUser);
router.delete("/user/delete/:id", authMiddleware, deleteUser);
router.post("/ad", authMiddleware, createAd);
router.get("/ads", authMiddleware, getAds);
router.put("/ad/:adId", authMiddleware, updateAd);
router.delete("/ad/:adId", authMiddleware, deleteAd);
router.get("/ad/:adId", authMiddleware, getAdById);

module.exports = router;
