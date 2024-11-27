const express = require('express');
const { addUser, getUsers } = require('../controllers/userController');

const router = express.Router();

// POST /api/users
router.post('/add', addUser);
router.get('/get', getUsers);

module.exports = router;
