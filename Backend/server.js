const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Ensure this path is correct

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // This will map the /api/auth path to the auth.js routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
