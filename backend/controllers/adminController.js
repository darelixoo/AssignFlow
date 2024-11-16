const Admin = require('../models/User'); // User model with role check
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Register
exports.register = async (req, res) => {
    const { username, password, mobile } = req.body;

    if (!username || !password || !mobile) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ username, role: 'admin' });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const admin = new Admin({ username, password: hashedPassword, mobile, role: 'admin' });
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Admin Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find the admin by username and role
        const admin = await Admin.findOne({ username, role: 'admin' });
        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ username: admin.username, id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get All Assignments Tagged to Admin
exports.getAssignments = async (req, res) => {
   
    const { username: adminUsername } = req.user;
    //console.log(username);

    try {
        // Fetch all assignments tagged to this admin
        const assignments = await Assignment.find({ admin: adminUsername });

        res.json(assignments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Accept Assignment
exports.acceptAssignment = async (req, res) => {
    
    const { id: assignmentId } = req.params;

    try {
        // Update assignment status to accepted
        const assignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { status: 'accepted' },
            { new: true }
        );

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.json({ message: "Assignment accepted", assignment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Reject Assignment
exports.rejectAssignment = async (req, res) => {
    const { id: assignmentId } = req.params;

    try {
        // Update assignment status to rejected
        const assignment = await Assignment.findByIdAndUpdate(
            assignmentId,
            { status: 'rejected' },
            { new: true }
        );

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        res.json({ message: "Assignment rejected", assignment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
