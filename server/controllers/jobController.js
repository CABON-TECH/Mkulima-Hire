const Job = require('../models/jobModel');

const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({
            success: true,
            data: jobs
        });
    } catch (err) {
        next(err);
    }
};

//create a job
const createJob = async (req, res, next) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllJobs,
    createJob
};


