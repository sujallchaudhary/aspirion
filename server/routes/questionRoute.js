const express = require('express');
const router = express.Router();

const { fetchQuestions, fetchQuestion, createQuestion, updateQuestion, deleteQuestion} = require('../controllers/questionController');

router.get('/', fetchQuestions);
router.get('/:id', fetchQuestion);
router.post('/', createQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;