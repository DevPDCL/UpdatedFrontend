import "@fontsource/ubuntu";
import React, { useState, useEffect } from "react";
import { reportDownload } from "../constants";
import { motion } from "framer-motion";
import BranchIcon from "../assets/branchIcon.webp"


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
            
            <img
              src={BranchIcon}
              alt="Branch Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-center font-bold">{branch.braName}</h3>
        </div>
      </li>
    </div>
  );
};

const ReportDownload = () => {
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
   
    window.open(reportDownloadLink, "_blank");
  };

  return (
    <div className="bg-[#ffffff]">
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

          <div className="border-x-2 px-3 flex flex-wrap w-full md:w-1/2">
            {" "}

            <div className="flex flex-col items-center">
              <h2 className="text-[#00984a] text-center text-xl  font-semibold border-b-2 mb-10">
                Branches Inside Dhaka
              </h2>
              {filteredDhakaBranches.length > 0 ? (
                <ul className="flex flex-wrap justify-between">
                  {" "}
               
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

export default ReportDownload;