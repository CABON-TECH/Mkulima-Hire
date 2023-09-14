const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
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

    skills: {
        type: String,
        required: true,

    },

    experience: {
        type: String,
        required: true,

    },

    rating: {
        type: Number,
        required: true,
        default: 0
        

    },

    salary: {
        type: Number,
        required: true,

    },

    contact: {
        type: Number,
        required: true,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User', 
      },

   



    

})

const Worker = mongoose.model('Worker', workerSchema);

module.exports = mongoose.model('Worker', workerSchema);