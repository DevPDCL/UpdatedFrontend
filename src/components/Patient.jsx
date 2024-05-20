import { Sidemenu } from ".";
import React, { useState, useEffect } from "react";
import { reportDownload } from "../constants";
import { motion } from "framer-motion";

const searchBoxVariants = {
  initial: { opacity: 1, scale: 1 },
  hover: { scale: 1.03 },
};





const BranchCard = ({ branch, handleReportDownload }) => {
  return (
    <div className="bg-gradient-to-b from-[#F5FFFA]/10 to-[#f0fff0]/80 hover:bg-gray-200 shadow-2xl m-2 rounded-2xl sm:w-[150px] w-full transform hover:scale-105 transition duration-300 ease-in-out">
      <li
        key={branch.braID}
        className="text-gray-600 branch-card cursor-pointer flex items-center justify-center"
        onClick={() => handleReportDownload(branch.downloadLink)}>
        <div className="flex flex-col branch-info p-4 justify-center items-center">
          <div className="h-18 w-20">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 242.92 204.7">
              <style>
                {`.cls-1 { fill: #4C9380; }
         .cls-2 { fill: #00984a; }
         .cls-3 { fill: #5E2750; }`}
              </style>
              <path
                className="cls-1"
                d="M129.52,236.4v-136l14.14,9.32V234.37c1.52-.18,3.05-.36,4.58-.52V107.29L129.52,95l-26.89,18.29V242.13C111.4,239.83,120.39,237.93,129.52,236.4Z"
                transform="translate(-61.04 -59)"
              />
              <path
                className="cls-1"
                d="M221.34,234.37V109.76l14.14-9.32v136c9.13,1.53,18.12,3.43,26.89,5.73V113.24L235.48,95l-18.72,12.34V233.85C218.29,234,219.82,234.19,221.34,234.37Z"
                transform="translate(-61.04 -59)"
              />
              <path
                className="cls-2"
                d="M182.5,232c9,0,18,.39,26.89,1.12V77.29L182.5,59h0L155.61,77.29V233.16C164.49,232.43,173.46,232,182.5,232Z"
                transform="translate(-61.04 -59)"
              />
              <path
                className="cls-3"
                d="M182.5,251.16c45,0,86.76,4.62,121.46,12.54-34.7-15.94-76.49-25.24-121.46-25.24S95.74,247.76,61,263.7C95.74,255.78,137.52,251.16,182.5,251.16Z"
                transform="translate(-61.04 -59)"
              />
            </svg>
          </div>
          <h3 className="text-center font-bold">{branch.braName}</h3>
        </div>
      </li>
    </div>
  );
};

const Patient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allDhakaBranches, setAllDhakaBranches] = useState([]);
  const [allOtherBranches, setAllOtherBranches] = useState([]);
  const [filteredDhakaBranches, setFilteredDhakaBranches] = useState([]);
  const [filteredOtherBranches, setFilteredOtherBranches] = useState([]);

  useEffect(() => {
    const dhaka = reportDownload.filter((branch) => branch.braCity === "Dhaka");
    const others = reportDownload.filter(
      (branch) => branch.braCity !== "Dhaka"
    );

    setAllDhakaBranches(dhaka);
    setAllOtherBranches(others);

    // Initial render: Set initial filtered lists to all branches
    setFilteredDhakaBranches(dhaka);
    setFilteredOtherBranches(others);
  }, []);

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);

    const filteredBranches = reportDownload.filter((branch) =>
      branch.braName.toLowerCase().includes(searchQuery)
    );

    const dhaka = filteredBranches.filter(
      (branch) => branch.braCity === "Dhaka"
    );
    const others = filteredBranches.filter(
      (branch) => branch.braCity !== "Dhaka"
    );

    setFilteredDhakaBranches(dhaka);
    setFilteredOtherBranches(others);
  };

  const handleReportDownload = (reportDownloadLink) => {
    // Handle branch click event (consider opening link in new tab or redirecting)
    window.open(reportDownloadLink, "_blank"); // Open report in new tab
  };

  return (
    <div className="bg-[#ffffff]">
      <Sidemenu />
      <div className="p-10 flex sm:w-[80%] flex-wrap mx-auto max-w-7xl">
        <div className="flex flex-col w-full  pt-[10px] pb-10">
          <h2 className="text-gray-500/50 pb-2 text-center pl-2 text-[36px] font-bold font-ubuntu">
            EMPOWERING PATIENTS: THE PATIENT PORTAL
          </h2>
          <h2 className="text-gray-500/50 pt-10 pb-2 text-center pl-2 text-[28px] font-bold font-ubuntu">
            ONLINE REPORT DOWNLOAD
          </h2>
          <motion.input
            type="text"
            placeholder="Search branches..."
            className="px-2 py-1 border text-[#00984a] border-PDCL-green bg-gray-100  rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green"
            value={searchTerm}
            variants={searchBoxVariants}
            onChange={handleSearchChange}
            whileHover="hover"
          />
        </div>
        <div className="report-container w-full flex flex-wrap justify-between">
          {" "}
          {/* Use flexbox with justify-between for even card distribution */}
          <div className="border-x-2 px-3 flex flex-wrap w-full md:w-1/2">
            {" "}
            {/* Use flexbox with md:w-1/2 for two sections */}
            <div className="flex flex-col items-center">
              <h2 className="text-[#00984a] text-center text-xl  font-semibold border-b-2 mb-10">
                Branches Inside Dhaka
              </h2>
              {filteredDhakaBranches.length > 0 ? (
                <ul className="flex flex-wrap justify-between">
                  {" "}
                  {/* Use flexbox with justify-between for even card distribution */}
                  {filteredDhakaBranches.map((branch) => (
                    <BranchCard
                      key={branch.braID}
                      branch={branch}
                      handleReportDownload={handleReportDownload}
                    />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 p-5">
                  No branches found inside Dhaka.
                </p>
              )}
            </div>
          </div>
          <div className="border-x-2 px-3 flex flex-wrap w-full md:w-1/2">
            <div className="flex flex-col items-center">
              <h2 className="text-[#00984a] text-center text-xl font-semibold border-b-2 mb-10">
                Branches Outside Dhaka
              </h2>
              {filteredOtherBranches.length > 0 ? (
                <ul className="flex flex-wrap justify-between">
                  {" "}
                  {/* Use grid for 4 columns within this section */}
                  {filteredOtherBranches.map((branch) => (
                    <BranchCard
                      key={branch.braID}
                      branch={branch}
                      handleReportDownload={handleReportDownload}
                    />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 p-5">
                  No branches found outside Dhaka.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;