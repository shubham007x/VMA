const mongoose = require("mongoose");
require("dotenv").config();

// Use process.env.MONGO_URI correctly
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB"); // Log success message when connected
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error); // Log error message if connection fails
  });

module.exports = mongoose;
