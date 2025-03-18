import axios from "axios";
import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [tabs, setTabs] = useState([]);
  const [contents, setContents] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.populardiagnostic.com/api/gallery`, {
        params: {
          token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
        },
      })
      .then((response) => {
        setTabs(response.data.data);
        setContents(response.data.data.media);
        setIsLoading(false);
        if (response.data.data && response.data.data.length > 0) {
          setActiveTab(response.data.data[0].id);
        }
      })
      .catch((error) => {
        setError("Failed to fetch data");
        setIsLoading(false);
      });
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="max-w-7xl mt-20 mx-auto my-4">
      <div className="flex">
        {isLoading ? (
          <div className="text-center py-4"></div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 text-lg font-semibold rounded border mx-auto transition duration-300 ease-in-out
                ${
                  activeTab === tab.id
                    ? "border-b-2 border-green-500 text-[#00984a]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.name}
            </button>
          ))
        )}
      </div>

      <div className="mt-4 p-4  rounded-md shadow-sm">
        {isLoading ? (
          <div></div>
        ) : activeTabContent ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
              {activeTabContent.media.map((mediaItem) => (
                <div
                  key={mediaItem.id}
                  className="bg-white rounded-md overflow-hidden shadow-md"
                >
                  <img
                    src={mediaItem.file}
                    className="w-full h-60 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
