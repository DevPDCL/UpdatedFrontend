import { styles } from "../styles";
import { doctorData1, reportDownload } from "../constants";
import React, { useState, useEffect } from "react";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { Link } from "react-router-dom";
import axios from "axios";
import "@fontsource/ubuntu";

// Constants
const DAYS_OF_WEEK = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

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
    doctor.drGender === "Female" ? "bg-[#fce8f3]" : "bg-[#f0fff0]";

  return (
    <Link to={`/doctordetail/${doctor.drID}`}>
      <li
        style={style}
        className={`flex justify-between ${backgroundColor} px-4 py-2`}>
        <p className="text-gray-600 font-ubuntu">{doctor.drName}</p>
        <p className="text-gray-600 font-ubuntu">{doctor.drSpecilist}</p>
      </li>
    </Link>
  );
};

const Search = () => {
  const [activeTab, setActiveTab] = useState("styled-profile");

  // Doctor search state
  const [doctorSearchState, setDoctorSearchState] = useState({
    searchTerm: "",
    selectedBranch: "",
    selectedSpecialization: "",
    selectedDay: "",
    showFemaleDoctors: false,
    displayedDoctors: [],
  });

  // Service search state
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

  // Derived data
  const branches = Array.from(
    new Set(
      doctorData1.doctors.flatMap((doc) => doc.chember.map((ch) => ch.branch))
    )
  );

  const specializations = Array.from(
    new Set(doctorData1.doctors.map((doc) => doc.drSpecilist))
  );

  // Handlers
  const handleTabClick = (tabId) => setActiveTab(tabId);

  const handleBranchChange = async (event) => {
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
      // Fetch the first page
      const firstPageResponse = await axios.get(
        `https://api.populardiagnostic.com/api/test-service-charges`,
        {
          params: {
            token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
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
    } catch (err) {
      console.error("Error fetching data:", err);
      setServiceSearchState((prev) => ({
        ...prev,
        loading: false,
        isFetchingAll: false,
        error: "Failed to fetch services. Please try again later.",
      }));
    }
  };

  const fetchAllPages = async (branchId, initialData, totalPages) => {
    try {
      let currentPage = 2;
      let fetchedData = [...initialData];

      while (currentPage <= totalPages) {
        const pageResponse = await axios.get(
          `https://api.populardiagnostic.com/api/test-service-charges`,
          {
            params: {
              token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
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

  const handleDoctorSearchChange = (field, value) => {
    setDoctorSearchState((prev) => ({ ...prev, [field]: value }));
  };

  // Effects
  useEffect(() => {
    let result = doctorData1.doctors;
    const {
      selectedBranch,
      selectedSpecialization,
      selectedDay,
      searchTerm,
      showFemaleDoctors,
    } = doctorSearchState;

    if (
      selectedBranch ||
      selectedSpecialization ||
      selectedDay ||
      searchTerm ||
      showFemaleDoctors
    ) {
      if (selectedBranch) {
        result = result.filter((doctor) =>
          doctor.chember.some((ch) => ch.branch === selectedBranch)
        );
      }

      if (selectedSpecialization) {
        result = result.filter(
          (doctor) => doctor.drSpecilist === selectedSpecialization
        );
      }

      if (selectedDay) {
        result = result.filter((doctor) =>
          doctor.chember.some((ch) =>
            ch.weekday.some((wd) => wd.day === selectedDay)
          )
        );
      }

      if (searchTerm) {
        result = result.filter((doctor) =>
          doctor.drName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (showFemaleDoctors) {
        result = result.filter((doctor) => doctor.drGender === "Female");
      }
    } else {
      result = [];
    }

    setDoctorSearchState((prev) => ({ ...prev, displayedDoctors: result }));
  }, [
    doctorSearchState.selectedBranch,
    doctorSearchState.selectedSpecialization,
    doctorSearchState.selectedDay,
    doctorSearchState.searchTerm,
    doctorSearchState.showFemaleDoctors,
  ]);

  // Render functions
  const renderDoctorTab = () => (
    <form className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-8 md:gap-0">
        <div className="relative z-0 col-span-2 p-1 w-full mb-0 group">
          <select
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green text-gray-900 bg-white placeholder-gray-900 peer pl-2"
            onChange={(e) =>
              handleDoctorSearchChange("selectedBranch", e.target.value)
            }
            value={doctorSearchState.selectedBranch}>
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full p-1 col-span-2 mb-0 group">
          <select
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer"
            onChange={(e) =>
              handleDoctorSearchChange("selectedSpecialization", e.target.value)
            }
            value={doctorSearchState.selectedSpecialization}>
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div className="relative col-span-2 p-1 mb-0 group">
          <select
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer"
            onChange={(e) =>
              handleDoctorSearchChange("selectedDay", e.target.value)
            }
            value={doctorSearchState.selectedDay}>
            <option value="">Select Day</option>
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="relative col-span-2 p-1 mb-0 group">
          <label className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl text-gray-900 bg-white pl-2 peer">
            Female Doctor
            <input
              type="checkbox"
              checked={doctorSearchState.showFemaleDoctors}
              onChange={() =>
                handleDoctorSearchChange(
                  "showFemaleDoctors",
                  !doctorSearchState.showFemaleDoctors
                )
              }
              className="form-checkbox text-PDCL-green rounded"
            />
          </label>
        </div>

        <div className="relative col-span-8 mb-1 group">
          <input
            className="block py-2.5 px-0 w-full text-sm rounded-lg shadow-2xl focus:outline-none focus:ring-0 focus:border-PDCL-green text-gray-900 bg-white placeholder-gray-900 peer pl-2"
            type="text"
            placeholder="Search by doctor's name..."
            value={doctorSearchState.searchTerm}
            onChange={(e) =>
              handleDoctorSearchChange("searchTerm", e.target.value)
            }
          />

          {doctorSearchState.displayedDoctors.length > 0 && (
            <div className="flex flex-col min-h-[200px]">
              <ListHeader columns={["Doctor Name", "Speciality"]} />
              <AutoSizer>
                {({ width }) => (
                  <List
                    height={250}
                    rowCount={doctorSearchState.displayedDoctors.length}
                    rowHeight={50}
                    rowRenderer={({ index, style }) => (
                      <DoctorRow
                        doctor={doctorSearchState.displayedDoctors[index]}
                        style={style}
                      />
                    )}
                    overscanRowCount={5}
                    width={width}
                  />
                )}
              </AutoSizer>
            </div>
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

export default Search;
