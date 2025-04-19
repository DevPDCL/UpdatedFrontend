import React from "react";
import ReactPlayer from "react-player/youtube";

const videoUrls = [
  "https://www.youtube.com/watch?v=OoEcHuLVqMo",
  "https://www.youtube.com/watch?v=0sAkXLU-W0k",
  "https://www.youtube.com/watch?v=oChQH0QcUZQ",
  "https://www.youtube.com/watch?v=kDEaE-Cra7s",
];

const Videos = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Corporate Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {videoUrls.map((url, index) => (
            <div
              key={index}
              className="relative w-full overflow-hidden pt-[56.25%] rounded-xl shadow-xl"
            >
              <div className="absolute top-0 left-0 w-full h-full">
                <ReactPlayer
                  url={url}
                  controls
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "0.75rem" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
