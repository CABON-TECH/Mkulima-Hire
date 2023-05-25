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

//get all ratings of a farmer
const getFarmerRatings = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.params.id);
    if (farmer) {

        const ratings = await Rating.find({ onModel: 'Farmer', user: req.params.id });
        res.status(200).json({
            status: 'success',
            results: ratings.length,
            ratings
        });
    } else {
        res.status(404);
        throw new Error('Farmer not found');
    }
}
);

//get all ratings of a worker
const getWorkerRatings = asyncHandler(async (req, res) => {
    const worker = await Worker.findById(req.params.id);
    if (worker) {

        const ratings = await Rating.find({ onModel: 'Worker', user: req.params.id });
        res.status(200).json({
            status: 'success',
            results: ratings.length,
            ratings
        });
    } else {
        res.status(404);
        throw new Error('Worker not found');
    }
}
);

//get average rating of a farmer
const getFarmerAverageRating = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.params.id);
    if (farmer) {

        const ratings = await Rating.find({ onModel: 'Farmer', user: req.params.id });
        let sum = 0;
        for (let i = 0; i < ratings.length; i++) {
            sum += ratings[i].rating;
        }
        const averageRating = sum / ratings.length;
        res.status(200).json({
            status: 'success',
            averageRating
        });
    } else {
        res.status(404);
        throw new Error('Farmer not found');
    }
}
);

//get average rating of a worker
const getWorkerAverageRating = asyncHandler(async (req, res) => {
    const worker = await Worker.findById(req.params.id);
    if (worker) {

        const ratings = await Rating.find({ onModel: 'Worker', user: req.params.id });
        let sum = 0;
        for (let i = 0; i < ratings.length; i++) {
            sum += ratings[i].rating;
        }
        const averageRating = sum / ratings.length;
        res.status(200).json({
            status: 'success',
            averageRating
        });
    } else {
        res.status(404);
        throw new Error('Worker not found');
    }
}
);




module.exports = {
    getAllRatings,
    createRating,
    getFarmerRatings,
    getWorkerRatings,
    getFarmerAverageRating,
    getWorkerAverageRating
    
}

