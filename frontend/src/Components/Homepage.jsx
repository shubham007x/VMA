import React, { useState, useContext } from "react";
import { AuthContext } from "./Context/Auth"; // Import AuthContext for authentication

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [googleDriveUrl, setGoogleDriveUrl] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext); // Get auth state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !googleDriveUrl.trim()) {
      setMessage("Please enter a title and a valid Google Drive URL.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: JSON.stringify({
          title,
          googleDriveUrl,
          description,
          tags: "", // Optionally allow users to input tags
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Video uploaded successfully!");
        setTitle("");
        setGoogleDriveUrl("");
        setDescription("");
        
      } else {
        setMessage(data.message || "Failed to upload video.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="bg-cover bg-center text-center bg-gray-900" 
    style={{ backgroundImage: 'url("https://media.istockphoto.com/id/1794787410/photo/glitch-noise-static-television-vfx-pack-visual-video-effects-stripes-background-crt-tv-screen.jpg?s=1024x1024&w=is&k=20&c=dkIVQ3ySCazjxkZS3QFoQVcNuezEisLpwVTCgoZGeVw=")' }}>
      {/* Intro Section - Body */}
      <div className=" text-center py-2 ">
        <h1 className="text-3xl font-bold text-purple-400 mb-4">
          🚀 Share Your Videos with the World!
        </h1>
        <p className="text-sm text-gray-300 mb-2">
          📢 Upload your amazing content and let others experience your
          creativity. Add your video link, title, and description below.
        </p>
      </div>
      {/* Form Section */}
      <div className="flex justify-center items-center min-h-[46.9rem] bg-gray-900">
        <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-lg">
          {message && (
            <p className="mb-4 text-red-500 text-center">{message}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-500 border-gray-500 text-gray-900 text-sm rounded-lg"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Google Drive URL
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-500 border-gray-500 text-gray-900 text-sm rounded-lg"
                placeholder="Enter Google Drive video URL"
                value={googleDriveUrl}
                onChange={(e) => setGoogleDriveUrl(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                className="w-full p-2 border rounded bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                placeholder="Enter video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-500 text-gray-300 p-2 rounded hover:bg-purple-700 transition"
            >
              Submit Video
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
