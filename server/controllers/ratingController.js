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

module.exports = {
    getAllRatings
}

