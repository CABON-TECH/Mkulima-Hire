const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },

    age : {
        type: Number,
        required: true,

    },

    location: {
        type: String,
        required: true,

    },





})

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = mongoose.model('Farmer', farmerSchema);