import { styles } from "../styles";
import React, { useState, useEffect, useRef } from "react";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { Link } from "react-router-dom";
import axios from "axios";
import "@fontsource/ubuntu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sub-components
const ListHeader = ({ columns }) => (
  <div className="flex justify-between px-8 py-2 bg-gray-400 font-bold">
    {columns.map((col, index) => (
      <p key={index}>{col}</p>
    ))}
  </div>
);

const ServiceRow = ({ service, style }) => (
  <li
    style={style}
    className="flex justify-between px-4 py-2 bg-white hover:bg-gray-100">
    <p className="text-gray-600 font-ubuntu">{service.name}</p>
    <p className="font-medium text-gray-700 font-ubuntu">
      {service.price.toLocaleString("en-BD", {
        style: "currency",
        currency: "BDT",
      })}
    </p>
  </li>
);

const DoctorRow = ({ doctor, style }) => {
  const backgroundColor =
    doctor.gender === "Female" ? "bg-[#fce8f3]" : "bg-[#f0fff0]";

  return (
    <Link to={`/doctordetail/${doctor.id}`}>
      <li
        style={style}
        className={`flex justify-between ${backgroundColor} px-4 py-2`}>
        <p className="text-gray-600 font-ubuntu">{doctor.name}</p>
        <p className="text-gray-600 font-ubuntu">
          {doctor.specialists?.map((s) => s.specialist?.name).join(", ") ||
            "Not specified"}
        </p>
      </li>
    </Link>
  );
};

const SearchBoxBranch = ({ branchId }) => {
  const [activeTab, setActiveTab] = useState("styled-profile");
  const API_TOKEN = "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4";

  // Refs for debouncing search and preserving input focus
  const searchTimeout = useRef(null);
  const doctorSearchInputRef = useRef(null);
  const serviceSearchInputRef = useRef(null);

  // Doctor search state - separate UI state from data fetching state
  const [doctorSearchUI, setDoctorSearchUI] = useState({
    searchTerm: "",
    selectedSpecialization: "",
    selectedDay: "",
    showFemaleDoctors: false,
  });

  const [doctorSearchData, setDoctorSearchData] = useState({
    displayedDoctors: [],
    specializations: [],
    days: [],
    loading: false,
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
    isFetchingMore: false,
  });

  // Service search state
  const [serviceSearchState, setServiceSearchState] = useState({
    services: [],
    allServices: [],
    searchTerm: "",
    loading: true,
    isFetchingAll: true,
    allPagesFetched: false,
    error: null,
  });

  // Fetch initial data for doctors
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setDoctorSearchData((prev) => ({ ...prev, loading: true }));

        // Fetch specializations
        const specializationsRes = await axios.get(
          `https://api.populardiagnostic.com/api/doctor-speciality?token=${API_TOKEN}`
        );

        // Fetch days
        const daysRes = await axios.get(
          `https://api.populardiagnostic.com/api/practice-days?token=${API_TOKEN}`
        );

        setDoctorSearchData((prev) => ({
          ...prev,
          specializations: specializationsRes.data.data.data,
          days: daysRes.data.data,
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load doctor data. Please try again.");
        setDoctorSearchData((prev) => ({ ...prev, loading: false }));
      }
    };

    if (activeTab === "styled-profile") {
      fetchInitialData();
    }
  }, [activeTab]);

  // Fetch doctors when filters change
  const fetchDoctors = async (page = 1, append = false, filters = null) => {
    // Use provided filters or current state
    const {
      selectedSpecialization,
      selectedDay,
      searchTerm,
      showFemaleDoctors,
    } = filters || doctorSearchUI;

    // Always use the branchId from props
    // Don't fetch if no filters are selected and it's not an append operation
    if (
      !selectedSpecialization &&
      !selectedDay &&
      !searchTerm &&
      !showFemaleDoctors &&
      !append
    ) {
      setDoctorSearchData((prev) => ({ ...prev, displayedDoctors: [] }));
      return;
    }

    try {
      if (!append) {
        setDoctorSearchData((prev) => ({ ...prev, loading: true }));
      } else {
        setDoctorSearchData((prev) => ({ ...prev, isFetchingMore: true }));
      }

      const params = {
        token: API_TOKEN,
        page: page,
        branches: branchId, // Always include the branch ID from props
      };

      if (searchTerm) {
        params.name = searchTerm;
        params.fast_search = "yes";
      }

      if (selectedSpecialization) {
        params.specialities = selectedSpecialization;
      }

      if (selectedDay) {
        params.days = selectedDay;
      }

      if (showFemaleDoctors) {
        params.gender = "Female";
      }

      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `https://api.populardiagnostic.com/api/doctors?${queryString}`
      );

      const newDoctors = response.data.data.data;
      const totalPages = response.data.data.last_page;

      setDoctorSearchData((prev) => ({
        ...prev,
        displayedDoctors: append
          ? [...prev.displayedDoctors, ...newDoctors]
          : newDoctors,
        currentPage: page,
        totalPages: totalPages,
        hasMore: page < totalPages,
        loading: false,
        isFetchingMore: false,
      }));

      // Restore focus after data loading completes
      if (doctorSearchInputRef.current && !append) {
        doctorSearchInputRef.current.focus();
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors. Please try again.");
      setDoctorSearchData((prev) => ({
        ...prev,
        loading: false,
        isFetchingMore: false,
      }));
    }
  };

  // Improved debounced search for doctor search
  const debounceSearch = (searchValue) => {
    // Clear any existing timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Store the updated search term immediately so the UI reflects the typing
    setDoctorSearchUI((prev) => ({
      ...prev,
      searchTerm: searchValue,
    }));

    // Set a new timeout to fetch data after debounce delay
    searchTimeout.current = setTimeout(() => {
      const filters = {
        ...doctorSearchUI,
        searchTerm: searchValue,
      };
      fetchDoctors(1, false, filters);
    }, 500);
  };

  // Handle filter changes without immediate search (non-search filters)
  const handleFilterChange = (field, value) => {
    setDoctorSearchUI((prev) => {
      const newState = { ...prev, [field]: value };

      // Clear any existing timeout
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      // Schedule a new search with all current filters
      searchTimeout.current = setTimeout(() => {
        fetchDoctors(1, false, newState);
      }, 500);

      return newState;
    });
  };

  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;

    if (
      isNearBottom &&
      !doctorSearchData.isFetchingMore &&
      doctorSearchData.hasMore
    ) {
      fetchDoctors(doctorSearchData.currentPage + 1, true);
    }
  };

  // Fetch services for this branch
  useEffect(() => {
    const fetchServices = async () => {
      if (!branchId) {
        setServiceSearchState((prev) => ({
          ...prev,
          error: "Branch ID not provided",
          loading: false,
          isFetchingAll: false,
        }));
        return;
      }

      setServiceSearchState((prev) => ({
        ...prev,
        loading: true,
        isFetchingAll: true,
        allPagesFetched: false,
        error: null,
      }));

      try {
        // Fetch the first page
        const firstPageResponse = await axios.get(
          "https://api.populardiagnostic.com/api/test-service-charges",
          {
            params: {
              token: API_TOKEN,
              branch_id: branchId,
              test_service_category_id: 0,
              page: 1,
            },
          }
        );

        const firstPageData = firstPageResponse.data?.data?.data || [];
        const totalPages = firstPageResponse.data?.data?.last_page || 1;
        const hasMorePages = totalPages > 1;

        setServiceSearchState((prev) => ({
          ...prev,
          services: firstPageData,
          allServices: firstPageData,
          loading: false,
          isFetchingAll: hasMorePages,
          allPagesFetched: !hasMorePages,
        }));

        // Fetch all pages in the background if there are more pages
        if (hasMorePages) {
          fetchAllPages(branchId, firstPageData, totalPages);
        }

        // Restore focus to service search input if it exists
        if (serviceSearchInputRef.current) {
          serviceSearchInputRef.current.focus();
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setServiceSearchState((prev) => ({
          ...prev,
          loading: false,
          isFetchingAll: false,
          error: "Failed to fetch services. Please try again later.",
        }));
      }
    };

    if (activeTab === "styled-profile2" && branchId) {
      fetchServices();
    }
  }, [branchId, activeTab]);

  const fetchAllPages = async (branchId, initialData, totalPages) => {
    try {
      let currentPage = 2;
      let fetchedData = [...initialData];

      while (currentPage <= totalPages) {
        const pageResponse = await axios.get(
          "https://api.populardiagnostic.com/api/test-service-charges",
          {
            params: {
              token: API_TOKEN,
              branch_id: branchId,
              test_service_category_id: 0,
              page: currentPage,
            },
          }
        );

        const pageData = pageResponse.data?.data?.data || [];
        fetchedData = [...fetchedData, ...pageData];
        currentPage++;

        // Update the state with the latest data
        setServiceSearchState((prev) => ({
          ...prev,
          services: fetchedData,
          allServices: fetchedData,
        }));
      }

      // Mark all pages as fetched
      setServiceSearchState((prev) => ({
        ...prev,
        isFetchingAll: false,
        allPagesFetched: true,
      }));
    } catch (err) {
      console.error("Error fetching all pages:", err);
      setServiceSearchState((prev) => ({
        ...prev,
        isFetchingAll: false,
        error: "Failed to load all services. Showing partial results.",
      }));
    }
  };

  const handleServiceSearchChange = (event) => {
    // Only allow search if all pages are fetched
    if (!serviceSearchState.allPagesFetched) return;

    const searchValue = event.target.value.toLowerCase();
    setServiceSearchState((prev) => ({
      ...prev,
      searchTerm: searchValue,
      services: prev.allServices.filter((service) =>
        service.name.toLowerCase().includes(searchValue)
      ),
    }));
  };

  // Handlers
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

    // If switching to doctor tab and we haven't fetched doctors yet, fetch them
    if (
      tabId === "styled-profile" &&
      doctorSearchData.displayedDoctors.length === 0
    ) {
      // Only fetch if at least one filter is set
      if (
        doctorSearchUI.searchTerm ||
        doctorSearchUI.selectedSpecialization ||
        doctorSearchUI.selectedDay ||
        doctorSearchUI.showFemaleDoctors
      ) {
        fetchDoctors(1, false);
      }
    }
  };

  // Render functions
  const renderDoctorTab = () => (
    <form className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-9 md:gap-0">
        <div className="relative z-0 w-full p-1 col-span-3 mb-0 group">
          <select
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer"
            onChange={(e) =>
              handleFilterChange("selectedSpecialization", e.target.value)
            }
            value={doctorSearchUI.selectedSpecialization}
            disabled={doctorSearchData.loading}>
            <option value="">Select Specialization</option>
            {doctorSearchData.specializations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative col-span-3 p-1 mb-0 group">
          <select
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer"
            onChange={(e) => handleFilterChange("selectedDay", e.target.value)}
            value={doctorSearchUI.selectedDay}
            disabled={doctorSearchData.loading}>
            <option value="">Select Day</option>
            {doctorSearchData.days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="relative col-span-3 p-1 mb-0 group">
          <label className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer">
            Female Doctor
            <input
              type="checkbox"
              checked={doctorSearchUI.showFemaleDoctors}
              onChange={() =>
                handleFilterChange(
                  "showFemaleDoctors",
                  !doctorSearchUI.showFemaleDoctors
                )
              }
              disabled={doctorSearchData.loading}
              className="form-checkbox text-PDCL-green rounded"
            />
          </label>
        </div>

        <div className="relative col-span-9 mb-1 group">
          <input
            ref={doctorSearchInputRef}
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green text-gray-900 bg-white placeholder-gray-900 peer pl-2"
            type="text"
            placeholder="Search by doctor's name..."
            value={doctorSearchUI.searchTerm}
            onChange={(e) => debounceSearch(e.target.value)}
          />

          {doctorSearchData.loading ? (
            <div className="text-center py-4">
              <div className="flex justify-center items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00984a]"></div>
                <span>Loading doctors...</span>
              </div>
            </div>
          ) : doctorSearchData.displayedDoctors.length > 0 ? (
            <div className="flex flex-col min-h-[200px]">
              <ListHeader columns={["Doctor Name", "Speciality"]} />
              <AutoSizer>
                {({ width }) => (
                  <List
                    height={250}
                    rowCount={doctorSearchData.displayedDoctors.length}
                    rowHeight={50}
                    rowRenderer={({ index, style }) => (
                      <DoctorRow
                        doctor={doctorSearchData.displayedDoctors[index]}
                        style={style}
                      />
                    )}
                    overscanRowCount={5}
                    width={width}
                    onScroll={handleScroll}
                  />
                )}
              </AutoSizer>
              {doctorSearchData.isFetchingMore && (
                <div className="text-center py-2">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00984a]"></div>
                    <span>Loading more doctors...</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            (doctorSearchUI.searchTerm ||
              doctorSearchUI.selectedSpecialization ||
              doctorSearchUI.selectedDay ||
              doctorSearchUI.showFemaleDoctors) && (
              <div className="text-center py-4">
                No doctors found matching your criteria
              </div>
            )
          )}
        </div>
      </div>
    </form>
  );

  const renderAppointmentTab = () => (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-12 md:gap-1">
        <div className="relative z-0 col-span-12 w-full group">
          <Link
            to="http://appointment.populardiagnostic.com/appointment"
            target="_blank"
            rel="noopener noreferrer">
            <button
              type="button"
              className="text-gray-600 w-full rounded block col-span-12 mb-2 h-[43px] hover:text-gray-900 border bg-white shadow-2xl border-none focus:ring-4 focus:outline-none focus:ring-[#00984a] font-ubuntu text-[16px] font-bold px-5 py-2.5 text-center">
              Make An Appointment <span className="animate-ping">Now</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderTestPricesTab = () => (
    <form className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 md:gap-1">
        <div className="relative col-span-12 mb-1 group">
          <div className="relative">
            <input
              ref={serviceSearchInputRef}
              type="text"
              value={serviceSearchState.searchTerm}
              onChange={handleServiceSearchChange}
              placeholder={
                serviceSearchState.isFetchingAll
                  ? "Loading all test prices..."
                  : "Search test prices..."
              }
              className={`block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green text-gray-900 bg-white placeholder-gray-900 peer pl-2 ${
                serviceSearchState.isFetchingAll
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={serviceSearchState.isFetchingAll}
              required
            />
            {serviceSearchState.isFetchingAll && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00984a]"></div>
              </div>
            )}
          </div>

          {serviceSearchState.loading ? (
            <div className="text-center py-4">
              <div className="flex justify-center items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00984a]"></div>
                <span>Loading services...</span>
              </div>
            </div>
          ) : serviceSearchState.error ? (
            <div className="text-center py-4 text-red-500">
              {serviceSearchState.error}
            </div>
          ) : serviceSearchState.services.length > 0 ? (
            <div className="flex flex-col min-h-[220px]">
              <ListHeader columns={["Service Name", "Service Cost"]} />
              {serviceSearchState.isFetchingAll && (
                <div className="text-center py-2 text-sm text-gray-500">
                  Loading more services... ({serviceSearchState.services.length}{" "}
                  loaded)
                </div>
              )}
              <AutoSizer>
                {({ width }) => (
                  <List
                    height={250}
                    rowCount={serviceSearchState.services.length}
                    rowHeight={50}
                    rowRenderer={({ index, style }) => (
                      <ServiceRow
                        service={serviceSearchState.services[index]}
                        style={style}
                      />
                    )}
                    overscanRowCount={5}
                    width={width}
                  />
                )}
              </AutoSizer>
            </div>
          ) : (
            <div className="text-center py-4">
              {serviceSearchState.searchTerm
                ? "No matching services found"
                : "No services available for this branch"}
            </div>
          )}
        </div>
      </div>
    </form>
  );

  return (
    <div
      className={`${styles.paddingX} md:-mt-[250px] -mt-[50px] bg-gradient-to-t from-transparent to-white/80 to-40% rounded-t-2xl pt-4 flex relative z-10 max-w-7xl mx-auto justify-center items-bottom text-center flex-col text-gray-900`}>
      <div className="mb-4">
        <ul className="text-sm font-medium text-center text-gray-900 sm:flex">
          {[
            { id: "styled-profile", label: "Doctors" },
            { id: "styled-profile1", label: "Appointment" },
            { id: "styled-profile2", label: "Test Prices" },
          ].map((tab) => (
            <li key={tab.id} className="w-full p-1 focus-within:z-10">
              <a
                href="#"
                className={`inline-block w-full p-3 shadow-2xl rounded text-gray-900 border-r border-gray-200 ${
                  activeTab === tab.id
                    ? "bg-[#ffffff] text-gray-900"
                    : "bg-[#00984a] text-white"
                }`}
                onClick={() => handleTabClick(tab.id)}>
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div id="default-styled-tab-content">
        <div
          className={`p-2 rounded ${
            activeTab === "styled-profile" ? "" : "hidden"
          }`}
          id="styled-profile"
          role="tabpanel"
          aria-labelledby="profile-tab">
          {renderDoctorTab()}
        </div>

        <div
          className={`p-2 rounded ${
            activeTab === "styled-profile1" ? "" : "hidden"
          }`}
          id="styled-profile1"
          role="tabpanel"
          aria-labelledby="profile-tab">
          {renderAppointmentTab()}
        </div>

        <div
          className={`p-2 rounded ${
            activeTab === "styled-profile2" ? "" : "hidden"
          }`}
          id="styled-profile2"
          role="tabpanel"
          aria-labelledby="profile-tab">
          {renderTestPricesTab()}
        </div>
      </div>
    </div>
  );
};

export default SearchBoxBranch;
