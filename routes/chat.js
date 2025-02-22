const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), chatController.createChat)
    .get(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), chatController.getAllChats);

router.route('/group')
    .post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), chatController.createGroup);

router.route('/rename')
    .put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), chatController.renameGroup);

router.route('/groupremove')
    .put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), chatController.removeFromGroup);

router.route('/groupadd')
    .put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), chatController.addToGroup);

router.route('/getgamechat')
    .post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), chatController.getGameChat);

router.route('/removechat')
    .put(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), chatController.removeChat);

module.exports = router;