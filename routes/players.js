const express = require('express');
const router = express.Router();
const playersController = require('../controllers/playersController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), playersController.getAllPlayers);

router.route('/connected')
    .get(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), playersController.getOnlinePlayers);

module.exports = router;