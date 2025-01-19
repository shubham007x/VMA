import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./Context/Auth"; // Assuming AuthContext is set up for token management
import VideoModal from "./VideoModal"; // Import the new VideoModal component
import VideoPreview from "../";
const Videos = () => {
  const { token } = useContext(AuthContext); // Access the token from the context
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [selectedVideoData, setSelectedVideoData] = useState({});

  // Fetch videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/videos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVideos(response.data);
        setFilteredVideos(response.data);
        // console.log(response.data)
        // Extract unique tags from the videos
        const videoTags = response.data.reduce((acc, video) => {
          video.tags.forEach((tag) => {
            if (!acc.includes(tag)) acc.push(tag);
          });
          return acc;
        }, []);
        setTags(videoTags);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [token]);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterVideos(e.target.value, selectedTag);
  };

  // Function to filter videos based on search and selected tag
  const filterVideos = (search, tag) => {
    const filtered = videos.filter((video) => {
      const matchesSearch =
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag = tag ? video.tags.includes(tag) : true;
      return matchesSearch && matchesTag;
    });
    setFilteredVideos(filtered);
  };

  // Open the video modal
  const openModal = (videoUrl, videoData) => {
    console.log(videoUrl);
    setSelectedVideoUrl(videoUrl);
    setSelectedVideoData(videoData);
    setIsModalOpen(true);
  };

  // Close the video modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoUrl("");
    setSelectedVideoData({});
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">
          My Uploaded Videos
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Search videos"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Video List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-4 rounded-lg cursor-pointer"
                onClick={() => openModal(video.googleDriveUrl, video)} // Open modal on click
              >
                <img src={VideoPreview} alt="Logo"></img>
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p>{video.description}</p>
                <a
                  href={video.googleDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  Watch Video
                </a>
                <div className="mt-2">
                  {video.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-gray-600 text-sm rounded-full px-3 py-1 mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No videos found</p>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        videoData={selectedVideoData}
        onClose={closeModal}
      />
    </div>
  );
};

export default Videos;
