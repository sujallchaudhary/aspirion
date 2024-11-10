const express = require('express');
const router = express.Router();
const { getOptions, addOptions } = require('../controllers/optionController');

router.post('/', addOptions);
router.get('/', getOptions);

module.exports = router;