const router = require('express').Router();
const ratingController = require('../controllers/ratingController');

router.get('/', ratingController.getAllRatings);
router.post('/', ratingController.createRating);
//router.get('/:id', ratingController.getFarmerRatings);
//router.get('/worker/:id', ratingController.getWorkerRatings);
//router.get('/farmer/:id/average', ratingController.getFarmerAverageRating);
//router.get('/worker/:id/average', ratingController.getWorkerAverageRating);
//router.get('/farmer/:id/total', ratingController.getFarmerTotalRating);
//router.get('/worker/:id/total', ratingController.getWorkerTotalRating);
router.put('/:id', ratingController.updateRating);
router.delete('/:id', ratingController.deleteRating);



module.exports = router;