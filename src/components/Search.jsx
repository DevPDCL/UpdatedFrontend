import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { Link } from "react-router-dom";
import "@fontsource/ubuntu";
import { styles } from "../styles";
import { reportDownload } from "../constants";

// Custom hooks
import { useDoctorSearch } from "../hooks/useDoctorSearch";
import { useServiceSearch } from "../hooks/useServiceSearch";

// UI Components
import SearchInput from "./ui/SearchInput";
import SelectDropdown from "./ui/SelectDropdown";

const TABS = [
  { id: "doctors", label: "Doctors" },
  { id: "appointment", label: "Appointment" },
  { id: "test-prices", label: "Test Prices" },
];

// Utility Components
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

const ServiceList = ({ services, isLoading }) => (
  <div className="flex flex-col min-h-[220px]">
    <ListHeader columns={["Service Name", "Service Cost"]} />
    {isLoading && (
      <div className="text-center py-2 text-sm text-gray-500">
        Loading services...
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
  isLoading: PropTypes.bool.isRequired,
};

// Main Search Component
const Search = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  
  // Custom hooks for search functionality
  const {
    searchUI: doctorSearchUI,
    searchData: doctorSearchData,
    doctorSearchInputRef,
    fetchInitialData: fetchDoctorInitialData,
    handleSearchChange: handleDoctorSearchChange,
    handleFilterChange: handleDoctorFilterChange,
    handleScroll: handleDoctorScroll,
  } = useDoctorSearch();

  const {
    serviceState: serviceSearchState,
    serviceSearchInputRef,
    handleBranchChange: handleServiceBranchChange,
    handleSearchChange: handleServiceSearchChange,
  } = useServiceSearch();

  // Initialize doctor data when switching to doctors tab
  useEffect(() => {
    if (activeTab === "doctors") {
      fetchDoctorInitialData();
    }
  }, [activeTab, fetchDoctorInitialData]);

  // Transform data for SelectDropdown components
  const branchOptions = doctorSearchData.branches.map(branch => ({
    value: branch.id,
    label: branch.name
  }));

  const specializationOptions = doctorSearchData.specializations.map(spec => ({
    value: spec.id,
    label: spec.name
  }));

  const dayOptions = doctorSearchData.days
    .filter(day => day !== "Everyday")
    .map(day => ({
      value: day,
      label: day
    }));

  const serviceBranchOptions = reportDownload.map(branch => ({
    value: branch.braID,
    label: branch.braName
  }));

  // Render functions for each tab
  const renderDoctorTab = () => (
    <form className="max-w-7xl mx-auto">
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 gap-1">
        <div className="relative z-0 col-span-12 md:col-span-4 p-1 w-full mb-0 group">
          <SelectDropdown
            value={doctorSearchUI.selectedBranch}
            onChange={(e) => handleDoctorFilterChange("selectedBranch", e.target.value)}
            options={branchOptions}
            placeholder="Select Branch"
            disabled={!doctorSearchData.initialDataLoaded}
          />
        </div>

        <div className="relative z-0 w-full p-1 col-span-12 md:col-span-4 mb-0 group">
          <SelectDropdown
            value={doctorSearchUI.selectedSpecialization}
            onChange={(e) => handleDoctorFilterChange("selectedSpecialization", e.target.value)}
            options={specializationOptions}
            placeholder="Select Specialization"
            disabled={!doctorSearchData.initialDataLoaded}
          />
        </div>

        <div className="relative col-span-12 md:col-span-4 p-1 mb-0 group">
          <SelectDropdown
            value={doctorSearchUI.selectedDay}
            onChange={(e) => handleDoctorFilterChange("selectedDay", e.target.value)}
            options={dayOptions}
            placeholder="Select Day"
            disabled={!doctorSearchData.initialDataLoaded}
          />
        </div>

        <div className="relative col-span-12 mb-1 group">
          <SearchInput
            ref={doctorSearchInputRef}
            value={doctorSearchUI.searchTerm}
            onChange={(e) => handleDoctorSearchChange(e.target.value)}
            placeholder="Search by doctor's name..."
            disabled={!doctorSearchData.initialDataLoaded}
          />

          {doctorSearchData.loading ? (
            <LoadingSpinner text="Loading doctors..." />
          ) : doctorSearchData.displayedDoctors.length > 0 ? (
            <DoctorList
              doctors={doctorSearchData.displayedDoctors}
              isFetchingMore={doctorSearchData.isFetchingMore}
              onScroll={handleDoctorScroll}
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
      <div className="grid md:grid-cols-12 md:gap-4 gap-1">
        <div className="relative z-0 w-full col-span-12 mb-1 group">
          <SelectDropdown
            value={serviceSearchState.selectedBranch || ""}
            onChange={(e) => handleServiceBranchChange(e.target.value)}
            options={serviceBranchOptions}
            placeholder="Select Branch"
          />
        </div>

        <div className="relative col-span-12 mb-1 group">
          <div className="relative">
            <SearchInput
              ref={serviceSearchInputRef}
              value={serviceSearchState.searchTerm}
              onChange={(e) => handleServiceSearchChange(e.target.value)}
              placeholder={
                !serviceSearchState.selectedBranch
                  ? "Select a branch first to start searching..."
                  : "Search test prices..."
              }
              disabled={!serviceSearchState.selectedBranch}
              className={
                !serviceSearchState.selectedBranch
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            />
            {(serviceSearchState.loading ||
              serviceSearchState.isFetchingAll) && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <LoadingSpinner size="small" />
              </div>
            )}
          </div>

          {serviceSearchState.loading ? (
            <LoadingSpinner text="Searching services..." />
          ) : serviceSearchState.error ? (
            <div className="text-center py-4 text-red-500">
              {serviceSearchState.error}
            </div>
          ) : serviceSearchState.selectedBranch ? (
            <>
              {!serviceSearchState.searchTerm && (
                <div className="text-center py-2 text-sm text-gray-500">
                  {serviceSearchState.isFetchingAll
                    ? `Loading services... (${serviceSearchState.totalCount} loaded)`
                    : serviceSearchState.allPagesFetched
                    ? `All ${serviceSearchState.totalCount} services loaded`
                    : `${serviceSearchState.totalCount} services loaded`}
                </div>
              )}
              {serviceSearchState.services.length > 0 ? (
                <ServiceList
                  services={serviceSearchState.services}
                  isLoading={
                    serviceSearchState.loading ||
                    serviceSearchState.isFetchingAll
                  }
                />
              ) : (
                <div className="text-center py-4">
                  {serviceSearchState.searchTerm
                    ? "No matching services found"
                    : "No services available for this branch"}
                </div>
              )}
            </>
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