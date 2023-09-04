const { constants } = require('buffer');
//const Worker = require('../models/workerModel');
const User = require('../models/userModel');
const getAllWorkers = async (req, res) => {

    try {
        const workers = await User.find({ role: 'worker'});
        res.json(workers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createWorker = async (req, res) => {
    try {
        const { name, email, age, location, skills, experience, rating, salary, contact } = req.body;

        const worker = new Worker({
            name,
            email,
            age,
            location,
            skills,
            experience,
            rating,
            salary,
            contact,
            password
        });

        await worker.save();

        res.json(worker);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get a single worker by ID
const getWorkerById = async (req, res) => {
    try {
        const worker = await User.findById({role: 'worker'});
        if (!worker) {
            return res.status(404).json({ error: 'Worker not found' });
        }
        res.json(worker);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//update a worker by ID
const updateWorkerById = async (req, res) => {
    try {
        const { name, email, age, location, skills, experience, rating, salary, contact } = req.body;

        const worker = await Worker.findById(req.params.id);

        if (!worker) {
            return res.status(404).json({ error: 'Worker not found' });
        }

        worker.name = name;
        worker.email = email;
        worker.age = age;

        await worker.save();

        res.json(worker);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//delete a worker by ID
const deleteWorkerById = async (req, res) => {
    try {
        const worker = await Worker.findByIdAndDelete(req.params.id);
        if (!worker) {
            return res.status(404).json({ error: 'Worker not found' });
        }
        res.json(worker);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};










    
    
module.exports = {
        getAllWorkers,
        createWorker,
        getWorkerById,
        updateWorkerById,
        deleteWorkerById
    }


