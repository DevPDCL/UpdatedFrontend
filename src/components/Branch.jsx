import React, { useState } from "react";
import {
  Sidemenu,
  Details
} from "../components";
import { motion } from "framer-motion";
import { projects1 } from "../constants";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
const buttonVariants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1.1 },
  hover: { scale: 1.05 },
};

const searchBoxVariants = {
  initial: { opacity: 1, scale: 1 },
  hover: { scale: 1.03 },
};

const BranchContact = ({ address, Hotline, Email }) => {
  return (
    <div className="h-[180px] flex flex-col justify-between text-gray-500 p-2 font-ubuntu text-[16px]">
      <p>
        <span className="text-[18px] font-medium font-ubuntu py-2">
          Address:{" "}
        </span>
        {address}
      </p>
      <p>
        <span className="text-[18px] font-medium font-ubuntu py-1">
          Hotline:{" "}
        </span>
        {Hotline}
      </p>
      <p>
        <span className="text-[18px] font-medium font-ubuntu py-1">
          Email:{" "}
        </span>
        {Email}
      </p>
    </div>
  );
};

const ProjectCard = ({
  image,
  name,
  address,
  Hotline,
  Email,
  heading,
  branchPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <div className="bg-gradient-to-b from--[#F5FFFA]/20 to-[#f0fff0]/90 shadow-2xl rounded-2xl sm:w-[299px] w-full ">
      <div className="relative w-full">
        <img
          src={image}
          alt="Branch_image"
          className="w-full shadow-xl rounded-3xl object-cover opacity-95 p-2 "
        />
      </div>
      <div className="px-4 pt-2 pb-3 flex flex-col justify-between">
        <h1 className="text-[#00984a] px-2 font-ubuntu font-bold text-center text-[25px]">
          {heading}
        </h1>
        <p className="text-gray-600 px-2 font-ubuntu font-semibold text-[16px]">
          {name}
        </p>
        <BranchContact address={address} Hotline={Hotline} Email={Email} />
        <motion.button
          className="hover:bg-[#00984a] bg-gray-100 text-[#00984a] hover:text-white hover:font-black font-ubuntu font-medium py-2 px-4 rounded-md mt-2 mx-1 focus:outline-none shadow-md"
          onClick={handleOpenModal}
          layout
          transition={spring}
          whileTap={{ scale: 0.9 }}
          variants={buttonVariants}
          whileHover="hover">
          Authority & Map
        </motion.button>
        {isOpen && (
          <Details branchPage={branchPage} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

const Branch = () => {
  const [filterByCity, setFilterByCity] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = filterByCity
    ? projects1.filter((project) => project.branchPage.braCity === "Dhaka")
    : projects1;

  const filteredAndSearchedProjects = filteredProjects.filter((project) => {
    const searchTermLower = searchTerm.toLowerCase();
    const projectNameLower = project.name.toLowerCase();
    return projectNameLower.includes(searchTermLower);
  });

  const handleFilterToggle = () => {
    setFilterByCity(!filterByCity);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-[#ffffff] ">
      <Sidemenu />
        
        <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
          <h2 className="text-gray-900/50 pb-5 text-center pl-2 text-[28px] font-bold font-ubuntu">
            BRANCHES
          </h2>
        </div>

      <div className="sticky top-[70px] z-10 rounded-xl  shadow-2xl bg-white flex flex-col-reverse gap-2 sm:flex-row p-5 row-span-1 mx-12 xl:mx-auto xl:max-w-7xl justify-between">
        <motion.label
          className={` ${
            filterByCity ? "bg-[#00984a]" : "bg-gray-500"
          } hover: text-white font-ubuntu font-medium py-2 px-4 rounded-md focus:outline-none shadow-md`}
          layout
          transition={spring}
          whileTap={{ scale: 0.9 }}
          variants={buttonVariants}
          whileHover="hover">
          Inside Dhaka
          <motion.input
            type="checkbox"
            checked={filterByCity}
            onChange={handleFilterToggle}
            className="ml-2 form-checkbox text-PDCL-green rounded"
          />
        </motion.label>

        <motion.input
          className="px-2 py-1 border text-[#00984a] border-PDCL-green bg-gray-200  rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green"
          type="text"
          placeholder="Search Branches"
          value={searchTerm}
          onChange={handleSearchChange}
          variants={searchBoxVariants}
          whileHover="hover"
        />
      </div>

      <div className="flex mx-auto pb-10 pt-[100px] sm:w-[80%] p-3  max-w-7xl justify-center flex-wrap gap-4">
        {filteredAndSearchedProjects.map((project) => (
          <ProjectCard key={project.branchID} {...project} />
        ))}
      </div>
    </div>
  );
};
//4,6,8,11,19,25

export default Branch;
