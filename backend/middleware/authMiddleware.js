const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            res.status(400)
            throw new Error('Not authorized please login')
        }


        //Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //GET user id from token
        user = await User.findById(verified.id).select('-pasword');

        if(!user) {
            res.status(404)
            throw new Error('User not found');
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(400)
        throw new Error('Not authorized please login');
    }
})

module.exports = protect;