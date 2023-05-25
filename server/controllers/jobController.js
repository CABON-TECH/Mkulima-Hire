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

module.exports = {
    getAllJobs
};


