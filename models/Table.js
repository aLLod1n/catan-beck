const mongoose = require('mongoose');

const Table = mongoose.Schema({
    tableName: {
        type: String,
        trim: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }],
    adminPlayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Table', Table);