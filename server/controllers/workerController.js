const Worker = require('../models/workerModel');

const getAllWorkers = async (req, res) => {

    try {
        const workers = await Worker.find();
        res.json(workers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }

    module.exports = {
        getAllWorkers
    }