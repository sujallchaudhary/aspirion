const express = require('express');
const router = express.Router();

const {getResponse} = require('../controllers/courseController');

router.get('/', getResponse);

module.exports = router;