const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Server Initialization
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:3000`);
});
