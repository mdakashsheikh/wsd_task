const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

//Register User
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password ) {
        res.status(400)
        throw new Error('Please fill in all required fields');
    }

    if(password.length < 6) {
        res.status(400)
        throw new Error('Password must be up to 6 characters');
    }

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('Email has already been registered');
    }

    //Create User
    const user = await User.create({
        name, email, password
    })

    //Generate Token
    const token = generateToken(user._id)

    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 *86400), // 1 day
        sameSite: 'none',
        secure: true
    })

    if(user) {
        const { _id, name, email } = user;
        res.status(201).json({
            _id, name, email, token
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})


//Login User
const loginUser = asyncHandler(async(req, res) => {{
    const { email, password } = req.body;

    if( !email || !password ) {
        res.status(400);
        throw new Error('Pleas add email and password!');
    }

    //Check User Exists
    const user = await User.findOne({ email });

    //Generate Token
    const token = generateToken(user._id);

    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 Day
        sameSite: 'none',
        secure: true
    })

    if(!user) {
        res.status(400)
        throw new Error('User not found, please signup')
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if( user && passwordCorrect ) {
        const { _id, name, email } = user;
        res.json({
            _id, name, email, token
        })
    } else {
        res.status(400)
        throw new Error('Invalid email and password!');
    }

}})

 //Logout User
 const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true
    })

    return res.status(200).json({ message: 'Successfully Logged Out'})
 })


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}