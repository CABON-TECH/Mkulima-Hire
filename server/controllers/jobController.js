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

// get a job by id
const getJobById = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};

// update a job by id
const updateJobById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, description, city, state, phone, email, pay} = req.body;

        const updatedJob = await Job.findByIdAndUpdate(id, {title, description, city, state, phone, email, pay}, {new: true});

        if (!updatedJob) {
            return next(new ErrorResponse('Job not found', 404));
        }

        res.status(200).json({
            success: true,
            data: updatedJob
        });
    } catch (err) {
        next(err);
    }
};

// delete a job by id
const deleteJobById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return next(new ErrorResponse('Job not found', 404));
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};




module.exports = {
    getAllJobs,
    createJob,
    getJobById,
    updateJobById,
    deleteJobById
};


