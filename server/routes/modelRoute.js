const express = require('express');
const router = express.Router();
const {getResponse,getResponseById,getPastResult}=require('../controllers/modelController');
router.post('/', getResponse);
router.get('/:id',getResponseById)
router.get('/',getPastResult)

module.exports = router;