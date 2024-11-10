const express = require('express');
const router = express.Router();

const {chatSession, chatQuery} = require('../controllers/chatController');

router.post('/chatSession', chatSession);
router.post('/chatQuery', chatQuery);


module.exports = router;