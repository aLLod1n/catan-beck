const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');

// router.post("/", statisticsController.allGameStates);
// router.get("/create", statisticsController.addGameStates);
// router.post("/leaderboard", statisticsController.getLeaderBoard);

router.route('/player')
.post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), statisticsController.addPlayerStats);

router.route('/game')
.post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), statisticsController.addGameStats);

router.route('/dice')
.post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), statisticsController.addDiceStats);

router.route('/rank')
.post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), statisticsController.addRankingStats);

router.route('/getallgamestate')
.get(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), statisticsController.allGameStates);

router.route('/leaderboard')
.get(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), statisticsController.getLeaderBoard);


module.exports = router;
