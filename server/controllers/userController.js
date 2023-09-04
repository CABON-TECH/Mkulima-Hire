const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');


//genrate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const userExists = await User.findOne({ email });
    
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const selectedRole = req.body.role;
    const role = selectedRole === 'farmer' ? 'farmer' : 'worker';

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

    //login user after registration
    const loginUser = asyncHandler(async (req, res) => {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
              _id: user.id,
              name: user.name,
              email: user.email,
              token: generateToken(user._id),
            })
          } else {
            res.status(400)
            throw new Error('Invalid credentials')
          }
        
    })

    //get user data
    const getUserProfile = asyncHandler(async (req, res) => {
        res.status(200).json(req.user);
    })



    










    


    


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
}