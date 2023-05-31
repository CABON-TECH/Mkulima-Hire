//const Worker = require('../models/workerModel');
const router = require('express').Router();
const workerController = require('../controllers/workerController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, workerController.getAllWorkers);
router.post('/', protect, workerController.createWorker);
router.get('/:id', protect, workerController.getWorkerById);
router.put('/:id', protect, workerController.updateWorkerById);
router.delete('/:id', protect, workerController.deleteWorkerById);





module.exports = router;

