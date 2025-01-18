// Import mongoose library to define the schema and interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the User collection
const UserSchema = mongoose.Schema({
  // Define the email field with type String, required, and unique (no duplicates allowed)
  email: { type: String, required: true, unique: true },

  // Define the password field with type String and required (cannot be empty)
  password: { type: String, required: true },
});

// Create the User model using the schema
const UserModel = mongoose.model("user", UserSchema);


module.exports = { UserModel };
