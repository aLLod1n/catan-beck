const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');

router.post("/update-user", verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), accountController.updatePlayer);
router.post("/send-verification-email", verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), accountController.sendVerificationEmail);

module.exports = router;
