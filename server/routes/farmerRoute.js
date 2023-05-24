const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');


router.get('/', farmerController.getAllFarmers);

module.exports = router;