const User = require('../models/User');
const Assignment = require('../models/Assignment'); // Import Assignment model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    //console.log("Register endpoint hit");

    const { username, password, mobile } = req.body;

    if (!username || !password || !mobile) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, mobile });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Login User
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Upload Assignment
exports.uploadAssignment = async (req, res) => {
    const { userId, task, admin } = req.body;

    if (!userId || !task || !admin) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const assignment = new Assignment({
            userId,
            task,
            admin,
            status: "Pending",
        });

        await assignment.save();
        res.status(201).json({ message: "Assignment uploaded successfully", assignment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get All Admins
exports.getAdmins = async (req, res) => {
    try {
        // Find only admins and select their usernames
        const admins = await User.find({ role: "admin" }).select("username -_id"); // Select username and exclude _id
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

