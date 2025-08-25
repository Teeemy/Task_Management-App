const express = require("express");
const { getProfile, updateProfile, getAllUsers, deleteAccount } = require("../controllers/user.controller");
const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();

// Protected routes
router.get("/", authenticate, getProfile);
router.put("/", authenticate, updateProfile);
router.get("/", getAllUsers);
router.delete("/", authenticate, deleteAccount);

module.exports = router;
