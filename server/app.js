const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();          // Load .env
connectDB();              // Connect to MongoDB

const app = express();    // Create express app
app.use(cors());          // Allow cross-origin requests
app.use(express.json());  // Accept JSON request bodies

app.use("/api/recommend", require("./routes/recommend")); // Route for AI
app.use("/api/upload", require("./routes/upload"));


// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
