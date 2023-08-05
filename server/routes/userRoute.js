const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile} = require('../controllers/userController');
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/').get(getUserProfile);


module.exports = router;

