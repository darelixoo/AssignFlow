const mongoose = require('mongoose');

// Assignment schema
const assignmentSchema = new mongoose.Schema({
    userId: { 
        type: String,  // User's name or ID
        required: true 
    },
    task: { 
        type: String,  // The assignment task description
        required: true 
    },
    admin: { 
        type: String,  // The admin who is assigned the task for review
        required: true 
    },
    status: { 
        type: String, 
        
        default: 'pending'  // Status of the assignment
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Assignment', assignmentSchema);
