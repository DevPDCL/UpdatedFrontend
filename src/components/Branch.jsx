import React, { useState } from "react";
import "@fontsource/ubuntu";
import {
  Details
} from "../components";
import { motion } from "framer-motion";
import { branch } from "../constants";

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

  const handleAuthorityMapClick = () => {
    if (branchPage) {
      // If branchPage exists, show the modal
      handleOpenModal();
    } else {
      // If branchPage doesn't exist, redirect to saperate page
      window.location.href = `/${heading.replace(/\s+/g, "").toLowerCase()}`;
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#F5FFFA] to-[#f0fff0] shadow-2xl rounded-2xl sm:w-[299px] w-full transition-transform duration-700 transform hover:-translate-y-3">
      <button onClick={handleAuthorityMapClick} className="">
        <div className="relative w-full">
          <img
            src={image}
            alt="Branch_image"
            className="w-full shadow-xl rounded-3xl object-cover p-2 "
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
            layout
            transition={spring}
            whileTap={{ scale: 0.9 }}
            variants={buttonVariants}
            whileHover="hover">
            Branch Details
          </motion.button>
          {isOpen && branchPage && (
            <Details branchPage={branchPage} onClose={handleCloseModal} />
          )}
        </div>
      </button>
    </div>
  );
};

const Branch = () => {
const [filterInsideDhaka, setFilterInsideDhaka] = useState(false);
const [filterOutsideDhaka, setFilterOutsideDhaka] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

const insideDhakaProjects = branch.filter(
  (project) => project.braCity === "Dhaka"
);
const outsideDhakaProjects = branch.filter(
  (project) => project.braCity !== "Dhaka"
);

const filteredProjects = branch.filter((project) => {


  if (filterInsideDhaka && filterOutsideDhaka) {
    return true; // Show all projects
  } else if (filterInsideDhaka) {
    return insideDhakaProjects.includes(project);
  } else if (filterOutsideDhaka) {
    return outsideDhakaProjects.includes(project);
  }
  else {
    return true;
  }
});


const filteredProjectsIncSearch = filteredProjects.filter((project) => {
    const projectNameLower = project.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return projectNameLower.includes(searchTermLower);
})


const handleInsideDhakaToggle = () => {
  setFilterInsideDhaka(!filterInsideDhaka);
};

const handleOutsideDhakaToggle = () => {
  setFilterOutsideDhaka(!filterOutsideDhaka);
};

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

  return (
    <div className="bg-[#ffffff] ">
      <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
        <h2 className="text-gray-900/50 pb-5 text-center pl-2 text-[28px] font-bold font-ubuntu">
          BRANCHES
        </h2>
      </div>

      <div className="sticky top-[70px] z-10 rounded-xl  shadow-2xl bg-white flex flex-col-reverse gap-2 sm:flex-row p-5 row-span-1 mx-12 xl:mx-auto xl:max-w-7xl justify-between">
        <motion.label
          className={` ${
            filterInsideDhaka ? "bg-[#00984a]" : "bg-gray-500"
          } hover: text-white font-ubuntu font-medium py-2 px-4 rounded-md focus:outline-none shadow-md`}
          layout
          transition={spring}
          whileTap={{ scale: 0.9 }}
          variants={buttonVariants}
          whileHover="hover">
          Inside Dhaka
          <motion.input
            type="checkbox"
            checked={filterInsideDhaka}
            onChange={handleInsideDhakaToggle}
            className="ml-2 form-checkbox text-PDCL-green rounded"
          />
        </motion.label>
        <motion.label
          className={` ${
            filterOutsideDhaka ? "bg-[#00984a]" : "bg-gray-500"
          } hover: text-white font-ubuntu font-medium py-2 px-4 rounded-md focus:outline-none shadow-md`}
          layout
          transition={spring}
          whileTap={{ scale: 0.9 }}
          variants={buttonVariants}
          whileHover="hover">
          Outside Dhaka
          <motion.input
            type="checkbox"
            checked={filterOutsideDhaka}
            onChange={handleOutsideDhakaToggle}
            className="ml-2 form-checkbox text-PDCL-green rounded"
          />
        </motion.label>

        <motion.input
          className="px-2 py-1 border  text-[#00984a] border-PDCL-green bg-gray-200  rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green"
          type="text"
          placeholder="Search Branches"
          value={searchTerm}
          onChange={handleSearchChange}
          variants={searchBoxVariants}
          whileHover="hover"
        />
      </div>

      <div className="flex mx-auto pb-10 pt-[100px] sm:w-[80%] p-3  max-w-7xl justify-center flex-wrap gap-4">
        {filteredProjectsIncSearch.map((project) => (
          <ProjectCard key={project.branchID} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Branch;
