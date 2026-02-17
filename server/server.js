require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const generateRoute = require("./routes/generate");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Route
app.use("/api/generate", generateRoute);

// Serve static frontend
app.use(express.static(path.join(__dirname, "../client")));

// Default route (IMPORTANT: must come BEFORE listen)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/builder.html"));
});

// Start server (MUST BE LAST)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});