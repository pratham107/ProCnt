const express = require('express');
const app = express();
const port = 3000; // Or any desired port

// Middleware (optional) - e.g., to parse JSON request bodies
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Hello from Node.js server!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});