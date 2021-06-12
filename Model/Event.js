const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    numberofguests: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);