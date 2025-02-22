const express = require('express');
const router = express.Router();
const brothelController = require('../controllers/brothelController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/getallbrothel')
.get(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), brothelController.getAllBrothel);

router.route('/joinbrothel')
.put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), brothelController.joinBrothel);

router.route('/exitbrothel')
.post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), brothelController.exitBrothel);

router.route('/create')
.post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), brothelController.createBrothel);

router.route('/rename')
.put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), brothelController.renameBrothel);

router.route('/remove')
.put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), brothelController.removeBrothel);

router.route('/brothelremove')
.put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), brothelController.removeFromBrothel);

router.route('/update')
.put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), brothelController.updateBrothel);

module.exports = router;