const mongoose = require('mongoose');

const Rates = mongoose.Schema({
    currency: String,
    rate: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Rates', Rates);