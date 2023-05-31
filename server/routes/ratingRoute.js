const router = require('express').Router();
const ratingController = require('../controllers/ratingController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, ratingController.getAllRatings);
router.post('/', protect, ratingController.createRating);
//router.get('/:id', ratingController.getFarmerRatings);
//router.get('/worker/:id', ratingController.getWorkerRatings);
//router.get('/farmer/:id/average', ratingController.getFarmerAverageRating);
//router.get('/worker/:id/average', ratingController.getWorkerAverageRating);
//router.get('/farmer/:id/total', ratingController.getFarmerTotalRating);
//router.get('/worker/:id/total', ratingController.getWorkerTotalRating);
router.put('/:id', protect, ratingController.updateRating);
router.delete('/:id', protect, ratingController.deleteRating);



module.exports = router;