// Source: Basic Express setup (adapted from Express docs)

const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const musicRoutes = require("./routes/musicRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Routes
app.use("/auth", authRoutes);
app.use("/music", musicRoutes);

// Export app (IMPORTANT for server.js & Lambda later)
module.exports = app;