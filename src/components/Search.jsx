import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/ubuntu";
import { styles } from "../styles";
import { reportDownload } from "../constants";

const API_TOKEN = "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4";
const API_BASE_URL = "https://api.populardiagnostic.com/api";

const TABS = [
  { id: "doctors", label: "Doctors" },
  { id: "appointment", label: "Appointment" },
  { id: "test-prices", label: "Test Prices" },
];

const ListHeader = ({ columns }) => (
  <div className="flex justify-between px-8 py-2 bg-gray-400 font-bold">
    {columns.map((col, index) => (
      <p key={index}>{col}</p>
    ))}
  </div>
);

ListHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const ServiceRow = React.memo(({ service, style }) => (
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
));

ServiceRow.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  style: PropTypes.object.isRequired,
};

const DoctorRow = React.memo(({ doctor, style }) => {
  const specialties =
    doctor.specialists?.map((s) => s.specialist?.name).join(", ") ||
    "Not specified";

  return (
    <Link to={`/doctordetail/${doctor.id}`}>
      <li
        style={style}
        className="flex justify-between bg-white hover:bg-gray-100 px-4 py-2">
        <p className="text-gray-600 font-ubuntu">{doctor.name}</p>
        <p className="text-gray-600 font-ubuntu">{specialties}</p>
      </li>
    </Link>
  );
});

DoctorRow.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    specialists: PropTypes.array,
  }).isRequired,
  style: PropTypes.object.isRequired,
};

const LoadingSpinner = ({ text = "", size = "medium" }) => (
  <div className="text-center py-4">
    <div className="flex justify-center items-center space-x-2">
      <div
        className={`animate-spin rounded-full ${
          size === "small" ? "h-4 w-4 border-b-2" : "h-8 w-8 border-b-2"
        } border-[#00984a]`}></div>
      {text && <span>{text}</span>}
    </div>
  </div>
);

LoadingSpinner.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
};

const DoctorList = ({ doctors, isFetchingMore, onScroll }) => (
  <div className="flex flex-col min-h-[200px]">
    <ListHeader columns={["Doctor Name", "Speciality"]} />
    <AutoSizer>
      {({ width }) => (
        <List
          height={250}
          rowCount={doctors.length}
          rowHeight={50}
          rowRenderer={({ index, style }) => (
            <DoctorRow doctor={doctors[index]} style={style} />
          )}
          overscanRowCount={5}
          width={width}
          onScroll={onScroll}
        />
      )}
    </AutoSizer>
    {isFetchingMore && (
      <LoadingSpinner text="Loading more doctors..." size="small" />
    )}
  </div>
);

DoctorList.propTypes = {
  doctors: PropTypes.array.isRequired,
  isFetchingMore: PropTypes.bool.isRequired,
  onScroll: PropTypes.func.isRequired,
};

const ServiceList = ({ services, isFetchingAll }) => (
  <div className="flex flex-col min-h-[220px]">
    <ListHeader columns={["Service Name", "Service Cost"]} />
    {isFetchingAll && (
      <div className="text-center py-2 text-sm text-gray-500">
        Loading more services... ({services.length} loaded)
      </div>
    )}
    <AutoSizer>
      {({ width }) => (
        <List
          height={250}
          rowCount={services.length}
          rowHeight={50}
          rowRenderer={({ index, style }) => (
            <ServiceRow service={services[index]} style={style} />
          )}
          overscanRowCount={5}
          width={width}
        />
      )}
    </AutoSizer>
  </div>
);

ServiceList.propTypes = {
  services: PropTypes.array.isRequired,
  isFetchingAll: PropTypes.bool.isRequired,
};

const Search = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const searchTimeout = useRef(null);
  const doctorSearchInputRef = useRef(null);
  const serviceSearchInputRef = useRef(null);

  const [doctorSearchUI, setDoctorSearchUI] = useState({
    searchTerm: "",
    selectedBranch: "",
    selectedSpecialization: "",
    selectedDay: "",
  });

  const [doctorSearchData, setDoctorSearchData] = useState({
    displayedDoctors: [],
    branches: [],
    specializations: [],
    days: [],
    loading: false,
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
    isFetchingMore: false,
    initialDataLoaded: false,
  });

  const [serviceSearchState, setServiceSearchState] = useState({
    selectedBranch: null,
    services: [],
    allServices: [],
    searchTerm: "",
    loading: false,
    isFetchingAll: false,
    allPagesFetched: false,
    error: null,
  });

  const fetchInitialDoctorData = useCallback(async () => {
    try {
      const [branchesRes, specializationsRes, daysRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/branch-for-doctor?token=${API_TOKEN}`),
        axios.get(`${API_BASE_URL}/doctor-speciality?token=${API_TOKEN}`),
        axios.get(`${API_BASE_URL}/practice-days?token=${API_TOKEN}`),
      ]);

      setDoctorSearchData((prev) => ({
        ...prev,
        branches: branchesRes.data.data.data,
        specializations: specializationsRes.data.data.data,
        days: daysRes.data.data,
        initialDataLoaded: true,
      }));
    } catch (error) {
      console.error("Error fetching initial data:", error);
      toast.error("Failed to load doctor data. Please try again.");
    }
  }, []);

  const fetchDoctors = useCallback(
    async (page = 1, append = false, filters = null) => {
      const {
        selectedBranch,
        selectedSpecialization,
        selectedDay,
        searchTerm,
      } = filters || doctorSearchUI;

      const hasActiveFilters =
        selectedBranch || selectedSpecialization || selectedDay || searchTerm;

      try {
        if (!append) {
          setDoctorSearchData((prev) => ({
            ...prev,
            loading: hasActiveFilters,
          }));
        } else {
          setDoctorSearchData((prev) => ({ ...prev, isFetchingMore: true }));
        }

        const params = {
          token: API_TOKEN,
          page: page,
          ...(searchTerm && { name: searchTerm, fast_search: "yes" }),
          ...(selectedBranch && { branches: selectedBranch }),
          ...(selectedSpecialization && {
            specialities: selectedSpecialization,
          }),
          ...(selectedDay && { days: selectedDay }),
        };

        const queryString = new URLSearchParams(params).toString();
        const response = await axios.get(
          `${API_BASE_URL}/doctors?${queryString}`
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
    },
    [doctorSearchUI]
  );

  const debounceSearch = useCallback(
    (searchValue) => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      setDoctorSearchUI((prev) => ({
        ...prev,
        searchTerm: searchValue,
      }));

      searchTimeout.current = setTimeout(() => {
        const filters = {
          ...doctorSearchUI,
          searchTerm: searchValue,
        };
        fetchDoctors(1, false, filters);
      }, 500);
    },
    [doctorSearchUI, fetchDoctors]
  );

  const handleDoctorFilterChange = useCallback(
    (field, value) => {
      setDoctorSearchUI((prev) => {
        const newState = { ...prev, [field]: value };

        if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
          fetchDoctors(1, false, newState);
        }, 500);

        return newState;
      });
    },
    [fetchDoctors]
  );

  const handleScroll = useCallback(
    ({ clientHeight, scrollHeight, scrollTop }) => {
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;

      if (
        isNearBottom &&
        !doctorSearchData.isFetchingMore &&
        doctorSearchData.hasMore
      ) {
        fetchDoctors(doctorSearchData.currentPage + 1, true);
      }
    },
    [doctorSearchData, fetchDoctors]
  );

  const handleBranchChange = useCallback(async (event) => {
    const branchId = event.target.value;
    setServiceSearchState((prev) => ({
      ...prev,
      selectedBranch: branchId,
      services: [],
      allServices: [],
      searchTerm: "",
      loading: !!branchId,
      isFetchingAll: false,
      allPagesFetched: false,
      error: null,
    }));

    if (!branchId) return;

    try {
      const firstPageResponse = await axios.get(
        `${API_BASE_URL}/test-service-charges`,
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

      if (hasMorePages) {
        fetchAllPages(branchId, firstPageData, totalPages);
      }

      if (serviceSearchInputRef.current) {
        serviceSearchInputRef.current.focus();
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setServiceSearchState((prev) => ({
        ...prev,
        loading: false,
        isFetchingAll: false,
        error: "Failed to fetch services. Please try again later.",
      }));
    }
  }, []);

  const fetchAllPages = useCallback(
    async (branchId, initialData, totalPages) => {
      try {
        let currentPage = 2;
        let fetchedData = [...initialData];

        while (currentPage <= totalPages) {
          const pageResponse = await axios.get(
            `${API_BASE_URL}/test-service-charges`,
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

          setServiceSearchState((prev) => ({
            ...prev,
            services: fetchedData,
            allServices: fetchedData,
          }));
        }

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
    },
    []
  );

  const handleServiceSearchChange = useCallback((event) => {
    const searchValue = event.target.value.toLowerCase();
    setServiceSearchState((prev) => ({
      ...prev,
      searchTerm: searchValue,
      services: prev.allServices.filter((service) =>
        service.name.toLowerCase().includes(searchValue)
      ),
    }));
  }, []);

  useEffect(() => {
    if (activeTab === "doctors") {
      fetchInitialDoctorData();
    }
  }, [activeTab, fetchInitialDoctorData]);

  const renderDoctorTab = () => (
    <form className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-6 md:gap-0">
        <div className="relative z-0 col-span-2 p-1 w-full mb-0 group">
          <select
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green text-gray-900 bg-white placeholder-gray-900 peer pl-2"
            onChange={(e) =>
              handleDoctorFilterChange("selectedBranch", e.target.value)
            }
            value={doctorSearchUI.selectedBranch}
            disabled={!doctorSearchData.initialDataLoaded}>
            <option value="">Select Branch</option>
            {doctorSearchData.branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full p-1 col-span-2 mb-0 group">
          <select
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer"
            onChange={(e) =>
              handleDoctorFilterChange("selectedSpecialization", e.target.value)
            }
            value={doctorSearchUI.selectedSpecialization}
            disabled={!doctorSearchData.initialDataLoaded}>
            <option value="">Select Specialization</option>
            {doctorSearchData.specializations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative col-span-2 p-1 mb-0 group">
          <select
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer"
            onChange={(e) =>
              handleDoctorFilterChange("selectedDay", e.target.value)
            }
            value={doctorSearchUI.selectedDay}
            disabled={!doctorSearchData.initialDataLoaded}>
            <option value="">Select Day</option>
            {doctorSearchData.days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="relative col-span-6 mb-1 group">
          <input
            ref={doctorSearchInputRef}
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green text-gray-900 bg-white placeholder-gray-900 peer pl-2"
            type="text"
            placeholder="Search by doctor's name..."
            value={doctorSearchUI.searchTerm}
            onChange={(e) => debounceSearch(e.target.value)}
            disabled={!doctorSearchData.initialDataLoaded}
          />

          {doctorSearchData.loading ? (
            <LoadingSpinner text="Loading doctors..." />
          ) : doctorSearchData.displayedDoctors.length > 0 ? (
            <DoctorList
              doctors={doctorSearchData.displayedDoctors}
              isFetchingMore={doctorSearchData.isFetchingMore}
              onScroll={handleScroll}
            />
          ) : (
            (doctorSearchUI.searchTerm ||
              doctorSearchUI.selectedBranch ||
              doctorSearchUI.selectedSpecialization ||
              doctorSearchUI.selectedDay) && (
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
        <div className="relative z-0 w-full col-span-12 mb-1 group">
          <select
            value={serviceSearchState.selectedBranch}
            onChange={handleBranchChange}
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer">
            <option value="">Select Branch</option>
            {reportDownload.map((branch) => (
              <option key={branch.braID} value={branch.braID}>
                {branch.braName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative col-span-12 mb-1 group">
          <div className="relative">
            <input
              ref={serviceSearchInputRef}
              type="text"
              value={serviceSearchState.searchTerm}
              onChange={handleServiceSearchChange}
              placeholder={
                !serviceSearchState.selectedBranch
                  ? "Select a branch first to start searching..."
                  : "Search test prices..."
              }
              className={`block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green text-gray-900 bg-white placeholder-gray-900 peer pl-2 ${
                !serviceSearchState.selectedBranch
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!serviceSearchState.selectedBranch}
              required
            />
            {serviceSearchState.isFetchingAll && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <LoadingSpinner size="small" />
              </div>
            )}
          </div>

          {serviceSearchState.loading ? (
            <LoadingSpinner text="Loading services..." />
          ) : serviceSearchState.error ? (
            <div className="text-center py-4 text-red-500">
              {serviceSearchState.error}
            </div>
          ) : serviceSearchState.selectedBranch &&
            serviceSearchState.services.length > 0 ? (
            <ServiceList
              services={serviceSearchState.services}
              isFetchingAll={serviceSearchState.isFetchingAll}
            />
          ) : serviceSearchState.selectedBranch &&
            serviceSearchState.services.length === 0 ? (
            <div className="text-center py-4">
              {serviceSearchState.searchTerm
                ? "No matching services found"
                : "No services available for this branch"}
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );

  return (
    <div
      className={`${styles.paddingX} md:-mt-[250px] -mt-[50px] bg-gradient-to-t from-transparent to-white/80 to-40% rounded-t-2xl pt-4 flex relative z-10 max-w-7xl mx-auto justify-center items-bottom text-center flex-col text-gray-900`}>
      <div className="mb-4">
        <ul className="text-sm font-medium text-center text-gray-900 sm:flex">
          {TABS.map((tab) => (
            <li key={tab.id} className="w-full p-1 focus-within:z-10">
              <button
                type="button"
                className={`inline-block w-full p-3 shadow-2xl rounded text-gray-900 border-r border-gray-200 ${
                  activeTab === tab.id
                    ? "bg-[#ffffff] text-gray-900"
                    : "bg-[#00984a] text-white"
                }`}
                onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div id="search-tab-content">
        {activeTab === "doctors" && (
          <div
            className="p-2 rounded"
            role="tabpanel"
            aria-labelledby="doctors-tab">
            {renderDoctorTab()}
          </div>
        )}

        {activeTab === "appointment" && (
          <div
            className="p-2 rounded"
            role="tabpanel"
            aria-labelledby="appointment-tab">
            {renderAppointmentTab()}
          </div>
        )}

        {activeTab === "test-prices" && (
          <div
            className="p-2 rounded"
            role="tabpanel"
            aria-labelledby="test-prices-tab">
            {renderTestPricesTab()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
