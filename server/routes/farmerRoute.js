const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');


router.get('/', farmerController.getAllFarmers);
router.post('/', farmerController.createFarmer);
router.get('/:id', farmerController.getFarmerById);

module.exports = router;