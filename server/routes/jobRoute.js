const router = require('express').Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, jobController.getAllJobs);
router.post('/', protect, jobController.createJob);
router.get('/:id', protect, jobController.getJobById);
router.put('/:id', protect, jobController.updateJobById);
router.delete('/:id', protect, jobController.deleteJobById);


module.exports = router;