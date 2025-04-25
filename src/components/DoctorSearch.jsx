import React, { useState, useEffect } from "react";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserSlash, FaUserCheck, FaCalendarAlt } from "react-icons/fa";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const DoctorSearch = () => {
  const [displayedDoctors, setDisplayedDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [branches, setBranches] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_TOKEN = "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4";

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        toast.info("Loading doctors...", { autoClose: 2000 });

        // Fetch branches
        const branchesRes = await axios.get(
          `https://api.populardiagnostic.com/api/branch-for-doctor?token=${API_TOKEN}`
        );
        setBranches(branchesRes.data.data.data);

        // Fetch specializations
        const specializationsRes = await axios.get(
          `https://api.populardiagnostic.com/api/doctor-speciality?token=${API_TOKEN}`
        );
        setSpecializations(specializationsRes.data.data.data);

        // Fetch days
        const daysRes = await axios.get(
          `https://api.populardiagnostic.com/api/practice-days?token=${API_TOKEN}`
        );
        setDays(daysRes.data.data);

        // Fetch initial doctors
        await fetchDoctors(true);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch doctors based on filters
  const fetchDoctors = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const currentPage = reset ? 1 : page;

      const params = {
        token: API_TOKEN,
        page: currentPage,
      };

      // Add search term with fast_search if search term exists
      if (searchTerm) {
        params.name = searchTerm;
        params.fast_search = "yes";
      }

      // Add branches if selected
      if (selectedBranches.length > 0) {
        params.branches = selectedBranches.map((b) => b.value).join(",");
      }

      // Add specializations if selected
      if (selectedSpecializations.length > 0) {
        params.specialities = selectedSpecializations
          .map((s) => s.value)
          .join(",");
      }

      // Add days if selected
      if (selectedDays.length > 0) {
        params.days = selectedDays.map((d) => d.value).join(",");
      }

      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `https://api.populardiagnostic.com/api/doctors?${queryString}`
      );

      if (reset) {
        setDisplayedDoctors(response.data.data.data);
        setPage(1);
        if (response.data.data.data.length === 0) {
          toast.info("No doctors found matching your criteria", {
            autoClose: 3000,
          });
        }
      } else {
        setDisplayedDoctors((prev) => [...prev, ...response.data.data.data]);
      }

      setHasMore(
        response.data.data.current_page < response.data.data.last_page
      );
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handle filter changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoctors(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedBranches, selectedSpecializations, selectedDays]);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight - 100 ||
        loading ||
        loadingMore ||
        !hasMore
      ) {
        return;
      }

      setPage((prev) => prev + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadingMore, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchDoctors();
    }
  }, [page]);

  // Prepare options for react-select
  const branchOptions = branches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const specializationOptions = specializations.map((spec) => ({
    value: spec.id,
    label: spec.name,
  }));

  const dayOptions = days.map((day) => ({
    value: day,
    label: day,
  }));

  // Custom styles for react-select
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: "#00984a",
      "&:hover": { borderColor: "#00984a" },
      minHeight: "44px",
      boxShadow: "none",
      borderRadius: "0.5rem",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#d7ffd7",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#00984a",
      fontWeight: "500",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#00984a",
      ":hover": {
        backgroundColor: "#00984a",
        color: "white",
      },
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#00984a" : isFocused ? "#d7ffd7" : "white",
      color: isSelected ? "white" : "#00984a",
    }),
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="pt-24 pb-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 font-ubuntu mb-2">
            Our Expert Consultants
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 max-w-2xl mx-auto">
            Find and book appointments with our highly qualified medical
            specialists
          </motion.p>
        </div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="sticky top-16 z-20 bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-PDCL-green focus:border-transparent transition-all"
                  type="text"
                  placeholder="Search by doctor's name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </motion.div>
            </div>

            {/* Branch Select */}
            <div>
              <Select
                options={branchOptions}
                isMulti
                placeholder="All Branches"
                value={selectedBranches}
                onChange={setSelectedBranches}
                styles={selectStyles}
                className="text-[#00984a]"
              />
            </div>

            {/* Specialization Select */}
            <div>
              <Select
                options={specializationOptions}
                isMulti
                placeholder="All Specializations"
                value={selectedSpecializations}
                onChange={setSelectedSpecializations}
                styles={selectStyles}
                className="text-[#00984a]"
              />
            </div>

            {/* Day Select */}
            <div>
              <Select
                options={dayOptions}
                isMulti
                placeholder="All Days"
                value={selectedDays}
                onChange={setSelectedDays}
                styles={selectStyles}
                className="text-[#00984a]"
              />
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-PDCL-green mb-4"></div>
              <p className="text-gray-600">Loading doctors...</p>
            </div>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
              {displayedDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}>
                  <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </div>

            {/* Loading More Indicator */}
            {loadingMore && (
              <div className="flex justify-center pb-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-PDCL-green"></div>
              </div>
            )}

            {/* No Results */}
            {!loading && displayedDoctors.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No doctors found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search filters or search for a different
                  name.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};



const DoctorCard = ({ doctor }) => {
  const cardBackgroundColor =
    "bg-gradient-to-b from-transparent via-transparent to-[#f0fff0]/80";
  const backgroundColor = "group-hover:bg-[#d7ffd7]";
  const textColor = "text-[#00984a]";
  const secondaryTextColor = "text-gray-600";

  // Get specialist names
  const specialistNames =
    doctor.specialists
      ?.map((spec) => spec.specialist?.name)
      ?.filter(Boolean)
      ?.join(", ") || "Not specified";

  // Get branch name
  const branchName = doctor.branches?.[0]?.branch?.name || "Not specified";

  // Get all branch IDs
  const branchIds =
    doctor.branches
      ?.map((b) => b.branch_id)
      .filter(Boolean)
      .join(",") || "";

  // Get all specialist IDs
  const specialistIds =
    doctor.specialists
      ?.map((s) => s.specialist_id)
      .filter(Boolean)
      .join(",") || "";

  // Check if doctor is currently absent
  const today = new Date();
  const absentFrom = doctor.absent_from ? new Date(doctor.absent_from) : null;
  const absentTo = doctor.absent_to ? new Date(doctor.absent_to) : null;
  const isAbsent =
    absentFrom && absentTo && today >= absentFrom && today <= absentTo;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "flex";
  };

  return (
    <Link
      to={`/doctordetail/${doctor.id}?branches=${branchIds}&specialists=${specialistIds}`}
      className="doctor-card-link group relative">
      {isAbsent && (
        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full z-10 bg-red-100 text-red-800">
          <FaUserSlash className="text-red-500" />
          <span>Absent</span>
        </div>
      )}

      <div
        className={`relative flex w-72 flex-col rounded-xl ${cardBackgroundColor} bg-clip-border text-gray-700 shadow-md h-full transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg ${
          isAbsent ? "opacity-80" : ""
        }`}>
        <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-clip-border text-gray-700 shadow-lg">
          {doctor.imag ? ( //to stop loading the images, made imag from image. which can be fixed just by adding e after the imag.
            <>
              <img
                src={doctor.image}
                alt={`${doctor.name}'s picture`}
                className={`w-full h-full object-cover object-top shadow-xl ${backgroundColor} rounded-xl transition-all duration-300 group-hover:scale-105 ${
                  isAbsent ? "brightness-95" : ""
                }`}
                onError={handleImageError}
              />
              <div className="no-image absolute inset-0 font-ubuntu flex-col justify-center items-center p-2 h-full bg-gray-100 rounded-xl hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="256"
                  height="256"
                  viewBox="0 0 256 256"
                  className="h-32 w-32 text-gray-400">
                  <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <circle cx="58.145" cy="74.615" r="13.145" fill="#ffffff" />
                    <path
                      d="M45 40.375c-9.415 0-17.118-7.703-17.118-17.118v-6.139C27.882 7.703 35.585 0 45 0s17.118 7.703 17.118 17.118v6.139C62.118 32.672 54.415 40.375 45 40.375z"
                      fill="#d7ffd7"
                    />
                    <path
                      d="M55.078 42.803L45 54.44 34.922 42.803c-12.728 2.118-22.513 13.239-22.513 26.544v17.707c0 1.621 1.326 2.946 2.946 2.946h59.29c1.621 0 2.946-1.326 2.946-2.946V69.346c0-13.305-9.786-24.426-22.513-26.544zM67.204 76.875c0 .667-.541 1.208-1.208 1.208h-3.877v3.877c0 .667-.541 1.208-1.208 1.208H56.73c-.667 0-1.208-.541-1.208-1.208v-3.877h-3.877c-.667 0-1.208-.541-1.208-1.208v-4.179c0-.667.541-1.208 1.208-1.208h3.877V67.61c0-.667.541-1.208 1.208-1.208h4.179c.667 0 1.208.541 1.208 1.208v3.877h3.877c.667 0 1.208.541 1.208 1.208v4.179z"
                      fill="#d7ffd7"
                    />
                  </g>
                </svg>
                <p className="text-gray-500 mt-2">No Image Available</p>
              </div>
            </>
          ) : (
            <div className="no-image font-ubuntu flex flex-col justify-center items-center p-2 h-full bg-gray-100 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="256"
                height="256"
                viewBox="0 0 256 256"
                className="h-32 w-32 text-gray-400">
                <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                  <circle cx="58.145" cy="74.615" r="13.145" fill="#ffffff" />
                  <path
                    d="M45 40.375c-9.415 0-17.118-7.703-17.118-17.118v-6.139C27.882 7.703 35.585 0 45 0s17.118 7.703 17.118 17.118v6.139C62.118 32.672 54.415 40.375 45 40.375z"
                    fill="#d7ffd7"
                  />
                  <path
                    d="M55.078 42.803L45 54.44 34.922 42.803c-12.728 2.118-22.513 13.239-22.513 26.544v17.707c0 1.621 1.326 2.946 2.946 2.946h59.29c1.621 0 2.946-1.326 2.946-2.946V69.346c0-13.305-9.786-24.426-22.513-26.544zM67.204 76.875c0 .667-.541 1.208-1.208 1.208h-3.877v3.877c0 .667-.541 1.208-1.208 1.208H56.73c-.667 0-1.208-.541-1.208-1.208v-3.877h-3.877c-.667 0-1.208-.541-1.208-1.208v-4.179c0-.667.541-1.208 1.208-1.208h3.877V67.61c0-.667.541-1.208 1.208-1.208h4.179c.667 0 1.208.541 1.208 1.208v3.877h3.877c.667 0 1.208.541 1.208 1.208v4.179z"
                    fill="#d7ffd7"
                  />
                </g>
              </svg>
              <p className="text-gray-500 mt-2">No Image Available</p>
            </div>
          )}
        </div>
        <div className="p-6 text-center">
          <h4
            className={`mb-2 block font-sans ${textColor} text-xl font-semibold leading-snug tracking-normal antialiased`}>
            {doctor.name}
          </h4>

          {doctor.degree && (
            <p className="block bg-gradient-to-tr from-gray-400 to-gray-600 bg-clip-text font-sans text-sm font-medium leading-relaxed text-transparent antialiased mb-1">
              <strong>Degrees:</strong> {doctor.degree}
            </p>
          )}

          <p className={`text-sm ${secondaryTextColor} mb-1`}>
            <strong>Specialty:</strong> {specialistNames}
          </p>

          <p className={`text-sm ${secondaryTextColor} mb-1`}>
            <strong>Branch:</strong> {branchName}
          </p>

          {doctor.absent_from &&
            doctor.absent_to &&
            new Date(doctor.absent_to) >= new Date() && (
              <div className="mt-2 bg-yellow-50 text-yellow-800 text-xs font-medium px-2 py-1 rounded-md flex flex-col items-center justify-center gap-1 border border-yellow-200">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-yellow-600" />
                  <span className="font-semibold">On Leave:</span>
                </div>
                <div>
                  {formatDate(doctor.absent_from)} -{" "}
                  {formatDate(doctor.absent_to)}
                </div>
              </div>
            )}
        </div>
      </div>
    </Link>
  );
};

export default DoctorSearch;
