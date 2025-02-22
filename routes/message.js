const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), messageController.sendMessage);

router.route('/:chatId')
    .get(verifyRoles(ROLES_LIST.player, ROLES_LIST.editor), messageController.allMessages);

module.exports = router;