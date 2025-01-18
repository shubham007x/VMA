const express = require("express");
const { connection } = require("./config/db");
const bcrypt = require("bcrypt");
const { UserModel } = require("./models/User.module.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const { VideoModel } = require("./models/Video.module.js");
const { authenticate } = require("./middlewares/Authentication.js");
require("dotenv").config();

const app = express();
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Middleware to parse incoming JSON requests

// Base route
app.get("/", async (req, res) => {
  res.send("BASE URL ENDPOINT");
});

// User signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  
  // Hash the password before saving the user
  bcrypt.hash(password, 5, async (err, hash) => {
    if (err) {
      return res.status(500).send("Signup failed");
    } else {
      // Save the new user to the database
      await UserModel.create({ email, password: hash });
      res.status(201).send("Signup successful");
    }
  });
});

// User login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await UserModel.findOne({ email });
  
  if (!user) {
    return res.status(400).send({ msg: "User not found" });
  }

  // Compare provided password with the stored hash
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      // If password matches, generate a JWT token with the userId
      var token = jwt.sign({ userId: user._id }, process.env.Secret_KEY);
      res.status(200).send({ msg: "Login successful", token });
    } else {
      res.status(400).send({ msg: "Login failed" });
    }
  });
});

// Video upload route (only accessible after authentication)
app.post("/api/upload", authenticate, async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { googleDriveUrl, title, description, tags } = req.body;
    const userId = req.userId; // Get the userId from the authenticated request

    // Validate if Google Drive URL is provided
    if (!googleDriveUrl) {
      return res.status(400).json({ message: "Google Drive URL is required" });
    }

    // Save video metadata in MongoDB
    const newVideo = new VideoModel({
      title: title || "Untitled Video", // Default title if not provided
      description,
      tags: tags ? tags.split(",") : [], // Split tags by comma if provided
      googleDriveLink: googleDriveUrl,
      uploadedBy: userId, // Associate the video with the user
    });

    // Save the video document to the database
    await newVideo.save();

    // Send success response
    res.status(201).json({ message: "Video added successfully", video: newVideo });
  } catch (error) {
    // Send error response if something goes wrong
    res.status(500).json({ error: "Failed to save video", details: error.message });
  }
});

// Start the server and connect to the database
app.listen(8000, async () => {
  try {
    await connection; // Ensure the DB connection is successful
    console.log("Connected to DB");
    console.log("Listening on port 8000");
  } catch (error) {
    console.log(error); // Log any errors related to DB connection
  }
});
