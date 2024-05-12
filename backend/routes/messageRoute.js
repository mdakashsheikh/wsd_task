const express = require('express');
const protect = require('../middleware/authMiddleware');
const { 
    sentenceStore, 
    numberOfWord, 
    numberOfCharacter, 
    numberOfSentence, 
    numberOfParagraph, 
    longestWordsParagraph, 
    getAllMessages 
} = require('../controllers/messageController');
const router = express.Router();

router.post('/post-sentence', protect, sentenceStore);
router.get('/all-message',protect, getAllMessages)
router.get('/get-num-word/:id', protect, numberOfWord);
router.get('/get-num-character/:id', protect, numberOfCharacter);
router.get('/get-num-sentence/:id', protect, numberOfSentence);
router.get('/get-num-paragraph/:id', protect, numberOfParagraph);
router.get('/get-long-word/:id', protect, longestWordsParagraph);
module.exports = router;