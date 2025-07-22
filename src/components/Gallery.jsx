import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { API_TOKEN, BASE_URL } from "../secrets";

const Gallery = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/gallery`, {
          params: {
            token: `${API_TOKEN}`,
          },
        });

        setTabs(response.data.data);
        if (response.data.data?.length > 0) {
          setActiveTab(response.data.data[0].id);
        }
      } catch (err) {
        setError("Failed to load gallery. Please try again later.");
        console.error("Gallery fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = useCallback((id) => {
    setActiveTab(id);
    setCurrentImageIndex(0);
  }, []);

  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden"; 
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const navigateImages = useCallback(
    (direction) => {
      const activeTabContent = tabs.find((tab) => tab.id === activeTab);
      if (!activeTabContent) return;

      setCurrentImageIndex((prevIndex) => {
        if (direction === "prev") {
          return (
            (prevIndex - 1 + activeTabContent.media.length) %
            activeTabContent.media.length
          );
        } else {
          return (prevIndex + 1) % activeTabContent.media.length;
        }
      });
    },
    [activeTab, tabs]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxOpen) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navigateImages("prev");
        if (e.key === "ArrowRight") navigateImages("next");
      }
    },
    [lightboxOpen, closeLightbox, navigateImages]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Our <span className="text-[#00984a]">Gallery</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore moments from our healthcare journey
        </p>
      </div>

      <div className="overflow-x-auto pb-4 mb-8 scrollbar-hide">
        <div className="inline-flex space-x-2 sm:space-x-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))
          ) : error ? (
            <div className="text-center text-red-500 py-4 w-full">{error}</div>
          ) : (
            tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-5 text-sm sm:text-base font-medium rounded-full transition-all duration-300 whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "bg-[#00984a] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                onClick={() => handleTabClick(tab.id)}>
                {tab.name}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : activeTabContent?.media?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {activeTabContent.media.map((mediaItem, index) => (
              <div
                key={mediaItem.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 aspect-square cursor-pointer"
                onClick={() => openLightbox(index)}>
                <img
                  src={mediaItem.file}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No images found in this category
          </div>
        )}
      </div>

      {lightboxOpen && activeTabContent && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl p-2 hover:text-[#00984a] transition-colors"
            aria-label="Close lightbox">
            <FiX />
          </button>

          <button
            onClick={() => navigateImages("prev")}
            className="absolute left-4 text-white text-3xl p-2 hover:text-[#00984a] transition-colors md:left-8"
            aria-label="Previous image">
            <FiChevronLeft />
          </button>

          <div className="relative max-w-full max-h-full">
            <img
              src={activeTabContent.media[currentImageIndex].file}
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <button
            onClick={() => navigateImages("next")}
            className="absolute right-4 text-white text-3xl p-2 hover:text-[#00984a] transition-colors md:right-8"
            aria-label="Next image">
            <FiChevronRight />
          </button>

          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            {currentImageIndex + 1} / {activeTabContent.media.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
