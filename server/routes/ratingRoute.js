const router = require('express').Router();
const ratingController = require('../controllers/ratingController');

router.get('/', ratingController.getAllRatings);

module.exports = router;