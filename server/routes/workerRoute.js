//const Worker = require('../models/workerModel');
const router = require('express').Router();
const workerController = require('../controllers/workerController');

router.get('/', workerController.getAllWorkers);
router.post('/', workerController.createWorker);
router.get('/:id', workerController.getWorkerById);





module.exports = router;

