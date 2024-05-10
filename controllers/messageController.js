const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Message = require('../models/messageModel');

//Strore sentece in database
const sentenceStore = asyncHandler(async(req, res) => {
    const { message } = req.body;

    if(!message) {
        res.status(400)
        throw new Error('Please enter the message!')
    }

    const sentence = await Message.create({
        message
    })

    if(sentence) {
        res.status(201).json({
            messages: 'Messages created',
            sentence
        })
    } else {
        res.status(400)
        throw new Error('Invalid message data')
    }
})


//Create an API to return the number of words.
const numberOfWord = asyncHandler(async(req, res) => {

})

module.exports = {
    sentenceStore,
    numberOfWord,
    
}