import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./Context/Auth";
import VideoModal from "./VideoModal";
import VideoPreview from "../video-preview.jpg";
const Videos = () => {
  const { token } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [selectedVideoData, setSelectedVideoData] = useState({});
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(6); // Set how many videos to show per page

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

  // Pagination logic: Get the videos for the current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-900 min-h-screen ">
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-bold mb-6 text-white">My Uploaded Videos</h1>

        {/* Search Bar */}
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Search videos"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Video List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentVideos.length > 0 ? (
            currentVideos.map((video, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-4 rounded-lg cursor-pointer"
                onClick={() => openModal(video.googleDriveUrl, video)}
              >
                <img src={VideoPreview} alt="Logo" />
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} of {Math.ceil(filteredVideos.length / videosPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
            disabled={currentPage === Math.ceil(filteredVideos.length / videosPerPage)}
          >
            Next
          </button>
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
