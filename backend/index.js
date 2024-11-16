require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware

app.use(express.json());



  //  console.log(`Incoming request: ${req.method} ${req.url}`);



// Routes
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

// Default Route
app.get('/', (req, res) => res.send('Assignment Portal API is running'));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
