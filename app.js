// Source: Basic Express setup (adapted from Express docs)

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});