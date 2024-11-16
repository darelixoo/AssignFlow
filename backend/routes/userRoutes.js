
const express = require('express');
const { register, login, uploadAssignment, getAdmins } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// User Registration and Login
router.post('/register', register);
router.post('/login', login);

// User Assignment Upload
router.post('/upload', authMiddleware, uploadAssignment);

// Get All Admins
router.get('/admins', authMiddleware, getAdmins);

module.exports = router;
