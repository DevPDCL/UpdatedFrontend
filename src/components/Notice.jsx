import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import axios from "axios";
import { BASE_URL } from "../secrets";

const SkeletonLoader = () => (
  <div className="mx-auto border border-[#b0e0cb] shadow-lg bg-gradient-to-r from-[#f5fbf8] to-[#e0f2eb] rounded-xl mb-6 w-full h-[400px] overflow-hidden animate-pulse">
    <div className="h-[250px] w-full bg-gray-200 rounded-t-xl"></div>
    <div className="p-5 h-[150px] flex flex-col justify-between">
      <div className="space-y-3">
        <div className="h-5 w-full bg-gray-300 rounded"></div>
        <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
      </div>
      <div className="h-4 w-1/3 bg-gray-300 rounded self-end"></div>
    </div>
  </div>
);

const ProjectCard = React.memo(({ id, title, image, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();

  const isValidImage =
    image?.trim() && image !== "https://populardiagnostic.com/public/news/";

  const handleClick = useCallback(() => {
    navigate(`/notices/${id}`);
  }, [id, navigate]);

  return (
    <div
      className="mx-auto border border-[#b0e0cb] shadow-lg hover:shadow-2xl bg-gradient-to-r from-[#f5fbf8] to-[#e0f2eb] rounded-xl mb-6 w-full h-[400px] overflow-hidden transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 flex flex-col cursor-pointer"
      onClick={handleClick}>
      <div className="h-[250px] overflow-hidden relative bg-gray-100">
        {(!imgLoaded || imgError || !isValidImage) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {isValidImage && (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover rounded-t-xl ${
              !imgLoaded ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            onError={() => setImgError(true)}
            onLoad={() => setImgLoaded(true)}
          />
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <p className="text-gray-900 font-ubuntu text-lg line-clamp-3">
          {title}
        </p>
        <div className="text-right mt-2">
          <span className="text-sm text-[#007a3d] font-medium">
            View Details
          </span>
        </div>
      </div>
    </div>
  );
});

const MarqueeNoticeTitles = React.memo(({ notices, onTitleClick }) => (
  <div className="bg-[#007a3d] text-white py-3 mb-8 overflow-hidden">
    <div className="flex items-center">
      <span className="font-bold font-ubuntu px-4 whitespace-nowrap">
        Latest Notices:
      </span>
      <div className="overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: notices.length * 5,
            repeat: Infinity,
            ease: "linear",
          }}>
          {notices.map((notice, index) => (
            <React.Fragment key={notice.id}>
              <span
                className="px-4 cursor-pointer hover:underline"
                onClick={() => onTitleClick(notice)}>
                {notice.title}
              </span>
              {index < notices.length - 1 && <span className="px-4">•</span>}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
));

const Pagination = ({ pagination, onPageChange }) => {
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const { current_page, last_page } = pagination;

    if (last_page <= maxVisiblePages) {
      for (let i = 1; i <= last_page; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 rounded-md ${
              i === current_page
                ? "bg-[#007a3d] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            {i}
          </button>
        );
      }
    } else {
      // Always show first page
      buttons.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-4 py-2 rounded-md ${
            1 === current_page
              ? "bg-[#007a3d] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}>
          1
        </button>
      );

      // Show ellipsis if current page is not near start
      if (current_page > 3) {
        buttons.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      // Show pages around current page
      const start = Math.max(2, current_page - 1);
      const end = Math.min(last_page - 1, current_page + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 rounded-md ${
              i === current_page
                ? "bg-[#007a3d] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            {i}
          </button>
        );
      }

      // Show ellipsis if current page is not near end
      if (current_page < last_page - 2) {
        buttons.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      // Always show last page
      buttons.push(
        <button
          key={last_page}
          onClick={() => onPageChange(last_page)}
          className={`px-4 py-2 rounded-md ${
            last_page === current_page
              ? "bg-[#007a3d] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}>
          {last_page}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center mt-10">
      <nav className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(pagination.current_page - 1)}
          disabled={pagination.current_page === 1}
          className={`px-4 py-2 rounded-md ${
            pagination.current_page === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#007a3d] text-white hover:bg-[#006633]"
          }`}>
          Previous
        </button>

        {renderPageButtons()}

        <button
          onClick={() => onPageChange(pagination.current_page + 1)}
          disabled={pagination.current_page === pagination.last_page}
          className={`px-4 py-2 rounded-md ${
            pagination.current_page === pagination.last_page
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#007a3d] text-white hover:bg-[#006633]"
          }`}>
          Next
        </button>
      </nav>
    </div>
  );
};

const ErrorDisplay = ({ error, onRetry }) => (
  <div className="bg-white min-h-[300px] flex items-center justify-center">
    <div className="text-center p-6 max-w-md mx-auto">
      <div className="text-red-500 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#007a3d] text-white rounded-md hover:bg-[#006633] transition-colors">
        Retry
      </button>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-10">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="mt-2 text-lg font-medium text-gray-900">No notices found</h3>
    <p className="mt-1 text-gray-500">
      There are currently no notices available.
    </p>
  </div>
);

function Notice() {
  const [notices, setNotices] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNoticeClick = useCallback(
    (notice) => {
      navigate(`/notices/${notice.id}`, { state: { notice } });
    },
    [navigate]
  );

  const handleDownloadImage = useCallback(async (notice) => {
    if (
      !notice.image?.trim() ||
      notice.image === "https://populardiagnostic.com/public/news/"
    ) {
      return;
    }

    try {
      const response = await fetch(notice.image);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const filename = `${notice.title.replace(/\s+/g, "_")}.${
        blob.type.split("/")[1] || "jpg"
      }`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
      window.open(notice.image, "_blank");
    }
  }, []);

  const fetchNotices = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/news-and-notices`,
        {
          params: {
            token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
            page,
          },
        }
      );

      setNotices(response.data.data.data);
      setPagination({
        current_page: response.data.data.current_page,
        last_page: response.data.data.last_page,
        per_page: response.data.data.per_page,
        total: response.data.data.total,
      });
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
      console.error("Error fetching notices:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= pagination.last_page) {
        fetchNotices(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [fetchNotices, pagination.last_page]
  );

  if (error) {
    return <ErrorDisplay error={error} onRetry={() => fetchNotices(1)} />;
  }

  return (
    <div className="bg-white">
      <motion.div variants={textVariant()}>
        <div className="flex flex-col pt-[80px] mx-auto max-w-7xl px-4">
          <h2 className="text-[#007a3d] pb-10 text-center text-4xl font-bold font-ubuntu mb-4">
            KEEPING YOU INFORMED
          </h2>
        </div>
      </motion.div>

      {!loading && notices.length > 0 && (
        <MarqueeNoticeTitles
          notices={notices}
          onTitleClick={handleDownloadImage}
        />
      )}

      <div className="mx-auto pb-10 pt-2 px-4 max-w-7xl">
        {loading && pagination.current_page === 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <>
            {notices.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notices.map((notice) => (
                    <ProjectCard
                      key={notice.id}
                      {...notice}
                      onClick={() => handleNoticeClick(notice)}
                    />
                  ))}
                </div>

                {pagination.last_page > 1 && (
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Notice;
