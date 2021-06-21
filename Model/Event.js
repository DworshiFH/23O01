const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    description: {
        type: String,
        required: false,
        max: 1024
    },
    location: {
        type: String,
        required: true
    },
    postalcode: {
        type: Number,
        required: true
    },
    numberofguests: {
        type: Number,
        required: true,
        default: 15
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);