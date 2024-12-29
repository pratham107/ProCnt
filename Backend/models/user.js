const bcrypt = require('bcryptjs');
const db = require('../database/db'); // Database connection

// Create a new user (registration)
const createUser = (username, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return callback(err);
        }

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    });
};

// Get a user by username (for login)
const getUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

module.exports = {
    createUser,
    getUserByUsername
};
