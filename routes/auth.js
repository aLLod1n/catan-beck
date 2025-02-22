const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verificationHelper = require("../utils/verificationHelper");

router.post("/login-with-email", authController.auth);
router.post("/login-with-address", authController.authWithAddress);
router.post("/register", authController.register);
router.post("/verify", verificationHelper.verify);

module.exports = router;
