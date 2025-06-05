import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "@fontsource/ubuntu";

const API_URL =
  "https://api.populardiagnostic.com/api/branches?token=UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4";
const ANIMATION_SPRING = { type: "spring", stiffness: 700, damping: 30 };

const buttonVariants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1.1 },
  hover: { scale: 1.05 },
};

const searchBoxVariants = {
  initial: { opacity: 1, scale: 1 },
  hover: { scale: 1.03 },
};

const countUnits = (branchName) => {
  const unitMatch = branchName.match(/\(U\d+(?:,\s*U\d+)*\)/g);
  if (unitMatch) {
    return unitMatch.reduce((count, match) => {
      return count + (match.match(/U\d+/g) || []).length;
    }, 0);
  }
  return 1;
};

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
  ({ id, image, city, address, Hotline, Email, heading, units }) => {
    const navigate = useNavigate();

    const handleBranchClick = useCallback(() => {
      const routePath = `/${heading.replace(/\s+/g, "").toLowerCase()}`;
      navigate(`${routePath}?id=${id}`);
    }, [navigate, id, heading]);

    return (
      <div className="bg-gradient-to-b from-[#F5FFFA] to-[#f0fff0] shadow-2xl rounded-2xl sm:w-[299px] w-full transition-transform duration-700 transform hover:-translate-y-3 relative">
        {" "}
        {/* Added relative positioning */}
        {/* Unit indicator - subtle corner ribbon */}
        {units > 1 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-[#00984a] text-white text-xs font-bold px-2 py-1 rounded-tr-2xl rounded-bl-lg z-10 shadow-md"
            initial={{ scale: 0.5, rotate: 15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500 }}>
            {units} Units
          </motion.div>
        )}
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
            <div className="flex justify-center items-center relative">
              <h1 className="text-[#00984a] px-2 font-ubuntu font-bold text-center text-[25px]">
                {heading}
              </h1>
            </div>

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
  units: PropTypes.number.isRequired,
};

const FilterControls = React.memo(
  ({
    filterInsideDhaka,
    filterOutsideDhaka,
    searchTerm,
    onInsideDhakaToggle,
    onOutsideDhakaToggle,
    onSearchChange,
    insideDhakaCount,
    outsideDhakaCount,
    totalUnits,
    filteredTotalUnits,
  }) => (
    <div className="sticky top-[70px] z-10 rounded-xl shadow-2xl bg-white flex flex-col-reverse gap-2 sm:flex-row p-5 row-span-1 mx-12 xl:mx-auto xl:max-w-7xl justify-between items-center">
      <div className="flex gap-2">
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
          <motion.span
            className="ml-2 bg-white text-[#00984a] rounded-full px-2 py-1 text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}>
            {insideDhakaCount}
          </motion.span>
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
          <motion.span
            className="ml-2 bg-white text-[#00984a] rounded-full px-2 py-1 text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}>
            {outsideDhakaCount}
          </motion.span>
          <input
            type="checkbox"
            checked={filterOutsideDhaka}
            onChange={onOutsideDhakaToggle}
            className="ml-2 form-checkbox h-4 w-4 rounded"
          />
        </motion.label>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}>
          <span className="text-[#00984a] font-ubuntu font-medium">
            Units:{" "}
            <span className="font-bold">
              {filteredTotalUnits}/{totalUnits}
            </span>
          </span>
        </motion.div>

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
  insideDhakaCount: PropTypes.number.isRequired,
  outsideDhakaCount: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
  filteredTotalUnits: PropTypes.number.isRequired,
};

const useBranchCounts = (branches) => {
  return useMemo(() => {
    const totalBranches = branches.length;
    const totalUnits = branches.reduce((sum, branch) => sum + branch.units, 0);

    const insideDhakaBranches = branches.filter(
      (b) => b.city.toLowerCase() === "dhaka"
    ).length;

    const outsideDhakaBranches = totalBranches - insideDhakaBranches;

    return {
      totalBranches,
      insideDhakaBranches,
      outsideDhakaBranches,
      totalUnits,
    };
  }, [branches]);
};

const Branch = () => {
  const [filterState, setFilterState] = useState({
    insideDhaka: false,
    outsideDhaka: false,
    searchTerm: "",
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            units: countUnits(branch.name), // Pre-calculate units here
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

  const handleInsideDhakaToggle = useCallback(() => {
    setFilterState((prev) => ({ ...prev, insideDhaka: !prev.insideDhaka }));
  }, []);

  const handleOutsideDhakaToggle = useCallback(() => {
    setFilterState((prev) => ({ ...prev, outsideDhaka: !prev.outsideDhaka }));
  }, []);

  const handleSearchChange = useCallback((e) => {
    setFilterState((prev) => ({ ...prev, searchTerm: e.target.value }));
  }, []);

  const filteredBranches = useMemo(() => {
    const { insideDhaka, outsideDhaka, searchTerm } = filterState;

    let result = branches;

    if (insideDhaka && !outsideDhaka) {
      result = result.filter((branch) => branch.city.toLowerCase() === "dhaka");
    } else if (!insideDhaka && outsideDhaka) {
      result = result.filter((branch) => branch.city.toLowerCase() !== "dhaka");
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((branch) =>
        branch.cleanedName.toLowerCase().includes(term)
      );
    }

    return result;
  }, [branches, filterState]);

  // Calculate counts
  const {
    totalBranches,
    insideDhakaBranches,
    outsideDhakaBranches,
    totalUnits,
  } = useBranchCounts(branches);
  const {
    totalBranches: filteredTotalBranches,
    insideDhakaBranches: filteredInsideDhakaBranches,
    outsideDhakaBranches: filteredOutsideDhakaBranches,
    totalUnits: filteredTotalUnits,
  } = useBranchCounts(filteredBranches);

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
        <motion.h2
          className="text-gray-900/50 pb-5 text-center pl-2 text-[28px] font-bold font-ubuntu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          BRANCHES
          <motion.span
            className="ml-2 bg-[#00984a] text-white rounded-full px-3 py-1 text-sm font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500 }}>
            {filteredTotalBranches}/{totalBranches}
          </motion.span>
          <motion.span
            className="ml-2 bg-[#00984a] text-white rounded-full px-3 py-1 text-sm font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500 }}>
            {filteredTotalUnits} Units
          </motion.span>
        </motion.h2>
      </div>

      <FilterControls
        filterInsideDhaka={filterState.insideDhaka}
        filterOutsideDhaka={filterState.outsideDhaka}
        searchTerm={filterState.searchTerm}
        onInsideDhakaToggle={handleInsideDhakaToggle}
        onOutsideDhakaToggle={handleOutsideDhakaToggle}
        onSearchChange={handleSearchChange}
        insideDhakaCount={filteredInsideDhakaBranches}
        outsideDhakaCount={filteredOutsideDhakaBranches}
        totalUnits={totalUnits}
        filteredTotalUnits={filteredTotalUnits}
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
              units={branch.units}
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
