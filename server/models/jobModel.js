const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    
    city: {
        type: String,
        required: [true, 'Please enter a city']
    },
    state: {
        type: String,
        required: [true, 'Please enter a state']
    },
    phone: {
        type: String,
        required: [true, 'Please enter a phone']
        
    },
    email: {
        type: String,
        required: [true, 'Please enter an email']
    },
    pay: {
        type: Number,
        required: [true, 'Please enter a pay']
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;


