import "@fontsource/ubuntu";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ProjectCard = React.memo(({ image, name, designation }) => {
  return (
    <div className="bg-gradient-to-b from-white to-[#00984a18] shadow-2xl rounded-2xl sm:w-[299px] w-full transition-transform duration-700 transform hover:-translate-y-3">
      <div className="relative w-full">
        <img
          src={image}
          alt={`${name}'s profile`}
          className="w-full shadow-xl rounded-3xl h-[350px] object-cover object-top opacity-95 p-2"
          loading="lazy"
        />
      </div>
      <div className="py-7 flex flex-col text-center">
        <p className="text-gray-600 px-2 font-bold font-ubuntu text-[24px]">
          {name}
        </p>
        <p className="text-[#808080] px-2 font-medium font-ubuntu text-[16px]">
          {designation}
        </p>
      </div>
    </div>
  );
});

ProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
};

const SkeletonLoader = () => (
  <div className="bg-gradient-to-b from-white to-[#00984a18] shadow-2xl rounded-2xl sm:w-[299px] w-full">
    <div className="relative w-full">
      <div className="w-full shadow-xl rounded-3xl h-[350px] bg-gray-200 animate-pulse p-2" />
    </div>
    <div className="py-7 flex flex-col text-center space-y-2">
      <div className="h-6 bg-gray-200 rounded animate-pulse mx-2" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="w-full py-10 text-center">
    <p className="text-red-500 font-ubuntu text-lg">{message}</p>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const About = () => {
  const [managementData, setManagementData] = useState({
    row1: [],
    row2: [],
    row3: [],
    row4: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.populardiagnostic.com/api/management-team",
          {
            params: {
              token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
            },
            timeout: 5000, // 5 seconds timeout
          }
        );

        setManagementData({
          row1: response.data.data["Row - 1"]?.slice(0, 2) || [],
          row2: response.data.data["Row - 2"]?.slice(0, 3) || [],
          row3: response.data.data["Row - 3"]?.slice(0, 3) || [],
          row4: response.data.data["Row - 4"]?.slice(0, 5) || [],
        });
      } catch (err) {
        console.error("Failed to fetch management data:", err);
        setError(
          "Failed to load management team data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderManagementRow = (teamMembers, key) => (
    <div
      key={key}
      className="flex mx-auto p-3 py-10 max-w-7xl justify-center flex-wrap gap-7">
      {loading
        ? Array(teamMembers.length || 3)
            .fill()
            .map((_, i) => <SkeletonLoader key={`skeleton-${i}`} />)
        : teamMembers.map((member) => (
            <ProjectCard key={member._id} {...member} />
          ))}
    </div>
  );

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="bg-[#ffffff]">
      <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
        <h2 className="text-gray-900/50 pb-5 text-center text-[35px] font-bold font-ubuntu">
          Top Management
        </h2>
      </div>

      {renderManagementRow(managementData.row1, "row1")}
      {renderManagementRow(managementData.row2, "row2")}
      {renderManagementRow(managementData.row3, "row3")}

      <div className="flex mx-auto p-3 px-10 py-20 justify-center flex-wrap gap-4">
        {loading
          ? Array(5)
              .fill()
              .map((_, i) => <SkeletonLoader key={`skeleton-bottom-${i}`} />)
          : managementData.row4.map((member) => (
              <ProjectCard key={member._id} {...member} />
            ))}
      </div>
    </div>
  );
};

export default React.memo(About);
