const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');


router.get('/', farmerController.getAllFarmers);
router.post('/', farmerController.createFarmer);

module.exports = router;