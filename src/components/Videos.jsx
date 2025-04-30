import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { FiPlay, FiX } from "react-icons/fi";

const Videos = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoUrls = [
    {
      url: "https://www.youtube.com/watch?v=OoEcHuLVqMo",
      title: "Corporate Overview",
    },
    {
      url: "https://www.youtube.com/watch?v=0sAkXLU-W0k",
      title: "Our Facilities Tour",
    },
    {
      url: "https://www.youtube.com/watch?v=oChQH0QcUZQ",
      title: "Patient Testimonials",
    },
    {
      url: "https://www.youtube.com/watch?v=kDEaE-Cra7s",
      title: "Medical Technology",
    },
  ];

  const openLightbox = (index) => {
    setCurrentVideoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const navigateVideos = (direction) => {
    setCurrentVideoIndex((prevIndex) => {
      if (direction === "prev") {
        return (prevIndex - 1 + videoUrls.length) % videoUrls.length;
      } else {
        return (prevIndex + 1) % videoUrls.length;
      }
    });
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#00984a]">Corporate Videos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our healthcare services through these featured videos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videoUrls.map((video, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(index)}>
              <div className="relative w-full pt-[56.25%]">
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  light={true}
                  playIcon={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-[#00984a] bg-opacity-90 rounded-full p-4 text-white transform group-hover:scale-110 transition-transform duration-300">
                        <FiPlay className="w-8 h-8" />
                      </div>
                    </div>
                  }
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-medium text-lg">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl p-2 hover:text-[#00984a] transition-colors"
              aria-label="Close video">
              <FiX />
            </button>

            <button
              onClick={() => navigateVideos("prev")}
              className="absolute left-4 text-white text-3xl p-2 hover:text-[#00984a] transition-colors z-10 md:left-8"
              aria-label="Previous video">
              <FiChevronLeft />
            </button>

            <div className="relative w-full max-w-4xl">
              <ReactPlayer
                url={videoUrls[currentVideoIndex].url}
                width="100%"
                height="100%"
                controls
                playing={lightboxOpen}
                style={{ borderRadius: "0.5rem" }}
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center text-white">
                <h3 className="text-xl font-medium">
                  {videoUrls[currentVideoIndex].title}
                </h3>
                <p className="text-gray-300 mt-1">
                  {currentVideoIndex + 1} / {videoUrls.length}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateVideos("next")}
              className="absolute right-4 text-white text-3xl p-2 hover:text-[#00984a] transition-colors z-10 md:right-8"
              aria-label="Next video">
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Videos;
