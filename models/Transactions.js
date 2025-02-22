const mongoose = require('mongoose');

const Transactions = mongoose.Schema({
    receipt: {},
    playerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }],
    amount: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Transactions', Transactions);