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

//Get All Messages
const getAllMessages = asyncHandler(async(req, res) => {
    
    const allData = await Message.find({}).sort('-date');

    res.status(200).json({
        allData
    })
})


//Create an API to return the number of words.
const numberOfWord = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const data = await Message.findById(id);
    if(!data) {
        res.status(404)
        throw new Error('data is not found!')
    }

    const num = data.message?.split(" ").length;

    res.status(200).json(num)
})

//Create an API to return the number of characters
const numberOfCharacter = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const data = await Message.findById(id);
    if(!data) {
        res.status(404)
        throw new Error('data is not found!')
    }

    let regex = /[a-zA-Z0-9]/g;
    const num = data.message?.match(regex).length;

    res.status(200).json(num)
})


//Create an API to return the number of sentences
const numberOfSentence = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const data = await Message.findById(id);
    if(!data) {
        res.status(404)
        throw new Error('data is not found!')
    }

    let regex = /[.!?]/;
    const num = data.message?.split(regex).length;

    res.status(200).json(num-1)
})


//Create an API to return the number of paragraphs
const numberOfParagraph = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const data = await Message.findById(id);
    if(!data) {
        res.status(404)
        throw new Error('data is not found!')
    }

    const num = data.message?.split(/\n\s*\n/).filter(Boolean).length;

    res.status(200).json(num)
})

//Create an API to return the longest words in paragraphs
const longestWordsParagraph = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const data = await Message.findById(id);
    if(!data) {
        res.status(404)
        throw new Error('data is not found!')
    }

    let str = data.message?.match(/[a-zA-Z0-9]+/gi);
    let largest = "";
 

    for (let i = 0; i < str.length; i++) {
     
        if (str[i].length > largest.length) {
            largest = str[i];
        }
    }

    res.status(200).json(largest)
})


module.exports = {
    sentenceStore,
    getAllMessages,
    numberOfWord,
    numberOfCharacter,
    numberOfSentence,
    numberOfParagraph,
    longestWordsParagraph
}