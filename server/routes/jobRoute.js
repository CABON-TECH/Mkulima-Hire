const router = require('express').Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, jobController.getAllJobs);
router.post('/', protect, jobController.createJob);
router.get('/:id', protect, jobController.getJobById);
router.put('/:id', protect, jobController.updateJobById);
router.post('/:jobId/apply', protect, jobController.applicationSubmission);
router.get('/:jobId/applications', protect, jobController.applications);
router.put('/:jobId/applications/:applicationId/approve', protect, jobController.approve);
router.put('/:jobId/applications/:applicationId/reject', protect, jobController.reject);
router.delete('/:id', protect, jobController.deleteJobById);


module.exports = router;