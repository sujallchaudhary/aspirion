const {checkResume,getResume} = require('../controllers/resumeController');
const uploadFile = require('../middlewares/fileUploadToDO');
const express = require('express');
const router = express.Router();

router.post('/',uploadFile,checkResume);
router.get('/:id',getResume);

module.exports = router;