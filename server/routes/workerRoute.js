//const Worker = require('../models/workerModel');
const router = require('express').Router();
const workerController = require('../controllers/workerController');

router.get('/', workerController.getAllWorkers);





module.exports = router;

