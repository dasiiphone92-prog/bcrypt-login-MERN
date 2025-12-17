const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/userController");

// רישום
router.post("/register", register);

// התחברות
router.post("/login", login);

module.exports = router;
