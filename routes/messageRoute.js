const express = require('express');
const protect = require('../middleware/authMiddleware');
const { sentenceStore } = require('../controllers/messageController');
const router = express.Router();

router.post('/post-sentence', protect, sentenceStore);
module.exports = router;