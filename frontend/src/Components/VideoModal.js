import React from "react";

const VideoModal = ({ isOpen, videoData, onClose }) => {
  if (!isOpen) return null; // Don't render if modal is not open

  // Extract the video ID from Google Drive URL
  let videoId = null;
  if (videoData.googleDriveLink) {
    try {
      // Try to extract the video ID from various Google Drive link formats
      const match = videoData.googleDriveLink.match(
        /(?:\/d\/|file\/d\/|id=)([\w-]+)/
      );
      if (match && match[1]) {
        videoId = match[1];
      }
    } catch (error) {
      console.error("Error extracting video ID from URL:", error);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-6 rounded-lg w-full h-full max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="relative w-full h-full">
          {/* Close Button */}
          <button
            className="text-white font-bold text-3xl absolute top-0 right-0 mt-4 mr-4"
            onClick={onClose}
          >
            X
          </button>

          {/* Video Section */}
          <div className="w-full h-full flex">
            <div className="w-2/3 h-full">
              {/* Only render iframe if videoId is valid */}
              {videoId ? (
                <iframe
                  src={`https://drive.google.com/file/d/${videoId}/preview`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay"
                  title="Video"
                ></iframe>
              ) : (
                <p className="text-red-500">Invalid video URL</p>
              )}
            </div>

            {/* Metadata Section */}
            <div className="w-1/3 h-full p-4 overflow-y-auto text-white">
              <h2 className="text-2xl font-semibold mb-4">{videoData.title}</h2>
              <p className="mb-4">{videoData.description}</p>
              <div className="space-y-2">
                <div>
                  <strong>Tags:</strong>
                  <div className="mt-2">
                    {videoData.tags.length > 0 ? (
                      videoData.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-gray-600 text-sm rounded-full px-3 py-1 mr-2"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No tags available</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
