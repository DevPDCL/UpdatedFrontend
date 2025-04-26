import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "@fontsource/ubuntu";

// Constants
const API_URL =
  "https://api.populardiagnostic.com/api/branches?token=UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4";
const ANIMATION_SPRING = { type: "spring", stiffness: 700, damping: 30 };

// Animation Variants
const buttonVariants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1.1 },
  hover: { scale: 1.05 },
};

const searchBoxVariants = {
  initial: { opacity: 1, scale: 1 },
  hover: { scale: 1.03 },
};

// Sub-components
const BranchContact = ({ address, Hotline, Email }) => (
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
      <span className="text-[18px] font-medium font-ubuntu py-1">Email: </span>
      {Email}
    </p>
  </div>
);

BranchContact.propTypes = {
  address: PropTypes.string.isRequired,
  Hotline: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
};

const ProjectCardSkeleton = () => (
  <div className="bg-gradient-to-b from-[#F5FFFA] to-[#f0fff0] shadow-2xl rounded-2xl sm:w-[299px] w-full h-[550px] animate-pulse">
    <div className="aspect-square w-full bg-gray-200 rounded-t-2xl m-2" />
    <div className="p-4 space-y-3">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      <div className="space-y-2 pt-2">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
      <div className="h-10 bg-gray-200 rounded mt-4 w-full" />
    </div>
  </div>
);

const ProjectCard = React.memo(
  ({ id, image, city, address, Hotline, Email, heading }) => {
    const navigate = useNavigate();

    const handleBranchClick = useCallback(() => {
      const routePath = `/${heading.replace(/\s+/g, "").toLowerCase()}`;
      navigate(`${routePath}?id=${id}`);
    }, [navigate, id, heading]);

    return (
      <div className="bg-gradient-to-b from-[#F5FFFA] to-[#f0fff0] shadow-2xl rounded-2xl sm:w-[299px] w-full transition-transform duration-700 transform hover:-translate-y-3">
        <button onClick={handleBranchClick} className="w-full">
          <div className="relative w-full">
            <div className="aspect-square w-full overflow-hidden shadow-xl rounded-3xl">
              <img
                src={image}
                alt="Branch_image"
                className="w-full h-full rounded-3xl object-cover p-2"
                loading="lazy"
              />
            </div>
          </div>
          <div className="px-4 pt-2 pb-3 flex flex-col justify-between">
            <h1 className="text-[#00984a] px-2 font-ubuntu font-bold text-center text-[25px]">
              {heading}
            </h1>
            <p className="text-gray-600 px-2 font-ubuntu font-semibold text-[16px]">
              {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
            </p>

            <BranchContact address={address} Hotline={Hotline} Email={Email} />
            <motion.button
              className="hover:bg-[#00984a] bg-gray-100 text-[#00984a] hover:text-white hover:font-black font-ubuntu font-medium py-2 px-4 rounded-md mt-2 mx-1 focus:outline-none shadow-md"
              layout
              transition={ANIMATION_SPRING}
              whileTap={{ scale: 0.9 }}
              variants={buttonVariants}
              whileHover="hover">
              Branch Details
            </motion.button>
          </div>
        </button>
      </div>
    );
  }
);

ProjectCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  Hotline: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

// Filter Controls Component
const FilterControls = React.memo(
  ({
    filterInsideDhaka,
    filterOutsideDhaka,
    searchTerm,
    onInsideDhakaToggle,
    onOutsideDhakaToggle,
    onSearchChange,
  }) => (
    <div className="sticky top-[70px] z-10 rounded-xl shadow-2xl bg-white flex flex-col-reverse gap-2 sm:flex-row p-5 row-span-1 mx-12 xl:mx-auto xl:max-w-7xl justify-between">
      <motion.label
        className={`${
          filterInsideDhaka ? "bg-[#00984a]" : "bg-gray-500"
        } text-white font-ubuntu font-medium py-2 px-4 rounded-md focus:outline-none shadow-md flex items-center`}
        layout
        transition={ANIMATION_SPRING}
        whileTap={{ scale: 0.9 }}
        variants={buttonVariants}
        whileHover="hover">
        Inside Dhaka
        <input
          type="checkbox"
          checked={filterInsideDhaka}
          onChange={onInsideDhakaToggle}
          className="ml-2 form-checkbox h-4 w-4 rounded"
        />
      </motion.label>

      <motion.label
        className={`${
          filterOutsideDhaka ? "bg-[#00984a]" : "bg-gray-500"
        } text-white font-ubuntu font-medium py-2 px-4 rounded-md focus:outline-none shadow-md flex items-center`}
        layout
        transition={ANIMATION_SPRING}
        whileTap={{ scale: 0.9 }}
        variants={buttonVariants}
        whileHover="hover">
        Outside Dhaka
        <input
          type="checkbox"
          checked={filterOutsideDhaka}
          onChange={onOutsideDhakaToggle}
          className="ml-2 form-checkbox h-4 w-4 rounded"
        />
      </motion.label>

      <motion.input
        className="px-2 py-1 border text-[#00984a] border-PDCL-green bg-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-PDCL-green font-ubuntu"
        type="text"
        placeholder="Search Branches"
        value={searchTerm}
        onChange={onSearchChange}
        variants={searchBoxVariants}
        whileHover="hover"
      />
    </div>
  )
);

FilterControls.propTypes = {
  filterInsideDhaka: PropTypes.bool.isRequired,
  filterOutsideDhaka: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onInsideDhakaToggle: PropTypes.func.isRequired,
  onOutsideDhakaToggle: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

// Main Component
const Branch = () => {
  const [filterState, setFilterState] = useState({
    insideDhaka: false,
    outsideDhaka: false,
    searchTerm: "",
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch branches data
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { data } = await axios.get(API_URL);
        if (data?.success) {
          const cleanedBranches = data.data.data.map((branch) => ({
            ...branch,
            cleanedName: branch.name.replace(/\(.*?\)/g, "").trim(),
            address: branch.address.replace(/<[^>]*>/g, ""),
            Hotline: branch.telephone_2 || branch.telephone_1 || "N/A",
            Email: branch.email,
          }));
          setBranches(cleanedBranches);
        } else {
          throw new Error("Failed to fetch branches");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  // Filter handlers
  const handleInsideDhakaToggle = useCallback(() => {
    setFilterState((prev) => ({ ...prev, insideDhaka: !prev.insideDhaka }));
  }, []);

  const handleOutsideDhakaToggle = useCallback(() => {
    setFilterState((prev) => ({ ...prev, outsideDhaka: !prev.outsideDhaka }));
  }, []);

  const handleSearchChange = useCallback((e) => {
    setFilterState((prev) => ({ ...prev, searchTerm: e.target.value }));
  }, []);

  // Filtered branches
  const filteredBranches = useMemo(() => {
    const { insideDhaka, outsideDhaka, searchTerm } = filterState;

    let result = branches;

    // Location filter
    if (insideDhaka && !outsideDhaka) {
      result = result.filter((branch) => branch.city.toLowerCase() === "dhaka");
    } else if (!insideDhaka && outsideDhaka) {
      result = result.filter((branch) => branch.city.toLowerCase() !== "dhaka");
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((branch) =>
        branch.cleanedName.toLowerCase().includes(term)
      );
    }

    return result;
  }, [branches, filterState]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl p-4 bg-red-50 rounded-lg">
          Error: {error}. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff]">
      <div className="flex flex-col pt-[80px] mx-auto max-w-7xl">
        <h2 className="text-gray-900/50 pb-5 text-center pl-2 text-[28px] font-bold font-ubuntu">
          BRANCHES
        </h2>
      </div>

      <FilterControls
        filterInsideDhaka={filterState.insideDhaka}
        filterOutsideDhaka={filterState.outsideDhaka}
        searchTerm={filterState.searchTerm}
        onInsideDhakaToggle={handleInsideDhakaToggle}
        onOutsideDhakaToggle={handleOutsideDhakaToggle}
        onSearchChange={handleSearchChange}
      />

      <div className="flex mx-auto pb-10 pt-[100px] sm:w-[80%] p-3 max-w-7xl justify-center flex-wrap gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={`skeleton-${i}`} />
          ))
        ) : filteredBranches.length > 0 ? (
          filteredBranches.map((branch) => (
            <ProjectCard
              key={branch.id}
              id={branch.id}
              image={branch.image}
              city={branch.city}
              address={branch.address}
              Hotline={branch.Hotline}
              Email={branch.Email}
              heading={branch.cleanedName}
            />
          ))
        ) : (
          <div className="text-center w-full py-10">
            <p className="text-gray-500 text-xl font-ubuntu">
              No branches found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Branch;
