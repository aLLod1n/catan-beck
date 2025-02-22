const mongoose = require('mongoose');

const Chat = mongoose.Schema({
    chatName: {
        type: String,
        trim: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', Chat);