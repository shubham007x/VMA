// Import mongoose library to interact with MongoDB
const mongoose = require("mongoose");

require("dotenv").config();

// Connect to MongoDB using the connection string stored in .env
const connection = mongoose.connect(`${process.env.MongoDB_URL}/vma`)
  .then(() => {
    console.log("Connected to MongoDB"); // Log success message when connected
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error); // Log error message if the connection fails
  });

// Export the connection to use in other parts of the application
module.exports = { connection };
