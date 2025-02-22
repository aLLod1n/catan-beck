const express = require('express');
const router = express.Router();
const gameStateController = require('../controllers/gameStateController');
const gameController = require('../controllers/gameController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/savegamestate')
.put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), gameStateController.saveGameState);

router.route('/getgamestate')
.get(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), gameStateController.getGameState);

router.route('/getstats')
.post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), gameController.getGameStatistics);

module.exports = router;