const express = require('express');
const router = express.Router();
const {fetchAnswer,fetchAnswers, deleteAnswer, updateAnswer,createAnswer} = require('../controllers/answerController');

router.get('/', fetchAnswers);
router.get('/:id', fetchAnswer);
router.post('/', createAnswer);
router.delete('/:id', deleteAnswer);
router.put('/:id', updateAnswer);

module.exports = router;