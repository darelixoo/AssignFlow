const express = require('express');
const { register, login, getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Admin Registration and Login
router.post('/register', register);
router.post('/login', login);

// Admin Assignment Operations
router.get('/assignments', authMiddleware,adminMiddleware , getAssignments);
router.put('/assignments/:id/accept', authMiddleware,adminMiddleware, acceptAssignment);
router.put('/assignments/:id/reject', authMiddleware,adminMiddleware, rejectAssignment);

module.exports = router;
