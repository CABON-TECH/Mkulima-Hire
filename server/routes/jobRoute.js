const router = require('express').Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getAllJobs);


module.exports = router;