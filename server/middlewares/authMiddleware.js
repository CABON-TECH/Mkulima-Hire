const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            // Check the user's role here
            if (req.user.role !== 'farmer' && req.user.role !== 'worker') {
                res.status(403);
                throw new Error('Access forbidden');
            }

            next();

        } catch(error){
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}
)

module.exports = {protect};
