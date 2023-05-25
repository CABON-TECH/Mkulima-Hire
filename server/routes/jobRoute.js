const router = require('express').Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getAllJobs);
router.post('/', jobController.createJob);
router.get('/:id', jobController.getJobById);
router.put('/:id', jobController.updateJobById);
router.delete('/:id', jobController.deleteJobById);


module.exports = router;