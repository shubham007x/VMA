// Import mongoose library to define the schema and interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the Video collection
const VideoSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  tags: { type: [String] },
  fileSize: { type: Number },
  googleDriveLink: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Create the Video model using the schema, this will interact with the "videos" collection in MongoDB
const VideoModel = mongoose.model("Video", VideoSchema);

// Export the VideoModel to use in other parts of the application (for example, to interact with the video data)
module.exports = { VideoModel };
