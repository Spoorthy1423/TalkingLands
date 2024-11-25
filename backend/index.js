const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

const app = express();
dotenv.config();

// Middleware for parsing JSON
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API routes
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

// Error-handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});