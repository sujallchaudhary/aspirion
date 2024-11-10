const express = require('express');
const router = express.Router();

const {fetchUser,deleteUser,updateUser} = require('../controllers/userController');

router.get('/', fetchUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;