const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const { protect } = require('../middlewares/authMiddleware');


router.get('/', protect, farmerController.getAllFarmers);
router.post('/', protect, farmerController.createFarmer);
router.get('/:id', protect, farmerController.getFarmerById);
router.put('/:id', protect, farmerController.updateFarmer);
router.delete('/:id', protect, farmerController.deleteFarmer);

module.exports = router;