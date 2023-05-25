const router = require('express').Router();
const ratingController = require('../controllers/ratingController');

router.get('/', ratingController.getAllRatings);
router.post('/', ratingController.createRating);

module.exports = router;