const router = require('express').Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getAllJobs);
router.post('/', jobController.createJob);


module.exports = router;