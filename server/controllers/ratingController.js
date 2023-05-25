const Rating = require('../models/ratingModel');
const Farmer = require('../models/farmerModel');
const Worker = require('../models/workerModel');
const asyncHandler = require('express-async-handler');

const getAllRatings = asyncHandler(async (req, res) => {
    const ratings = await Rating.find({});
    res.status(200).json({
        status: 'success',
        results: ratings.length,
        ratings
    });
}
);

//create rating
const createRating = asyncHandler(async (req, res) => {
    const { user, onModel, rating, comment } = req.body;
    const newRating = await Rating.create({
        user,
        onModel,
        rating,
        comment
    });
    res.status(201).json({
        status: 'success',
        newRating
    });
}
);


module.exports = {
    getAllRatings,
    createRating
}

