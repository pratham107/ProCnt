const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const router = express.Router();

// Registration Route
// Registration Route
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the username already exists
    userModel.getUserByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password and create the user
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password' });
            }

            // Create a new user with hashed password
            userModel.createUser(username, hashedPassword, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Error creating user' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });
});
