const mongoose = require('mongoose');

const Message = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    },
    content: {
        type: String,
        trim: true
    },
    msgColor: {
        type: String,
        default: ""
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', Message);