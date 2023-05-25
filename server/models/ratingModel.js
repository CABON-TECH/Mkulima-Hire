const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    onModel: {
        type: String,
        enum: ['Farmer', 'Worker'],
        required: [true, 'onModel is required']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Rating is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required']
    }
}, {
    timestamps: true
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;

