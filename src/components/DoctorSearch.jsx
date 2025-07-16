import React, { useState, useEffect, useMemo, useRef } from "react";
import "@fontsource/ubuntu";
import { motion } from "framer-motion";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../secrets";
import DoctorCard from "./DoctorCard";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const API_TOKEN = "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4";

const selectStyles = {
  control: (base) => ({ ...base, borderColor: "#00984a", "&:hover": { borderColor: "#00984a" }, minHeight: "44px", boxShadow: "none", borderRadius: "0.5rem" }),
  multiValue: (base) => ({ ...base, backgroundColor: "#d7ffd7", borderRadius: "0.375rem" }),
  multiValueLabel: (base) => ({ ...base, color: "#00984a", fontWeight: "500" }),
  multiValueRemove: (base) => ({ ...base, color: "#00984a", ":hover": { backgroundColor: "#00984a", color: "white" } }),
  option: (base, { isFocused, isSelected }) => ({ ...base, backgroundColor: isSelected ? "#00984a" : isFocused ? "#d7ffd7" : "white", color: isSelected ? "white" : "#00984a" }),
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
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        toast.info("Loading doctors...", { autoClose: 2000 });

        const branchesRes = await axios.get(
          `${BASE_URL}/api/branch-for-doctor?token=${API_TOKEN}`
        );
        setBranches(branchesRes.data.data.data);

        const specializationsRes = await axios.get(
          `${BASE_URL}/api/doctor-speciality?token=${API_TOKEN}`
        );
        setSpecializations(specializationsRes.data.data.data);

        const daysRes = await axios.get(
          `${BASE_URL}/api/practice-days?token=${API_TOKEN}`
        );
        setDays(daysRes.data.data);

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

      if (searchTerm) {
        params.name = searchTerm;
        params.fast_search = "yes";
      }

      if (selectedBranches.length > 0) {
        params.branches = selectedBranches.map((b) => b.value).join(",");
      }

      if (selectedSpecializations.length > 0) {
        params.specialities = selectedSpecializations
          .map((s) => s.value)
          .join(",");
      }

      if (selectedDays.length > 0) {
        params.days = selectedDays.map((d) => d.value).join(",");
      }

      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${BASE_URL}/api/doctors?${queryString}`
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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      fetchDoctors(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedBranches, selectedSpecializations, selectedDays]);

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

  const branchOptions = useMemo(
    () => branches.map((branch) => ({ value: branch.id, label: branch.name })),
    [branches]
  );

  const specializationOptions = useMemo(
    () =>
      specializations.map((spec) => ({ value: spec.id, label: spec.name })),
    [specializations]
  );

  const dayOptions = useMemo(
    () => days.map((day) => ({ value: day, label: day })),
    [days]
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="pt-24 pb-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-800 font-ubuntu mb-2"
          >
            Our Expert Consultants
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Find and book appointments with our highly qualified medical
            specialists
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="sticky top-16 z-20 bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  type="text"
                  placeholder="Search by doctor's name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </motion.div>
            </div>

            <div>
              <Select
                options={branchOptions}
                isMulti
                placeholder="All Branches"
                value={selectedBranches}
                onChange={setSelectedBranches}
                styles={selectStyles}
                className="text-green-700"
              />
            </div>

            <div>
              <Select
                options={specializationOptions}
                isMulti
                placeholder="All Specializations"
                value={selectedSpecializations}
                onChange={setSelectedSpecializations}
                styles={selectStyles}
                className="text-green-700"
              />
            </div>

            <div>
              <Select
                options={dayOptions}
                isMulti
                placeholder="All Days"
                value={selectedDays}
                onChange={setSelectedDays}
                styles={selectStyles}
                className="text-green-700"
              />
            </div>
          </div>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
              <p className="text-gray-600">Loading doctors...</p>
            </div>
          </div>
        )}

        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12 max-w-screen-xl mx-auto">
              {displayedDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full sm:w-auto"
                >
                  <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </div>

            {loadingMore && (
              <div className="flex justify-center pb-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
              </div>
            )}

            {!loading && displayedDoctors.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
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

export default DoctorSearch;
