import React, { useState, useEffect } from "react";
import axios from "axios";
import { reportDownload } from "../constants";
import { BASE_URL } from "../secrets";

const TestApi = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [services, setServices] = useState([]); // To store data being displayed
  const [allServices, setAllServices] = useState([]); // To store the full dataset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetchingAll, setIsFetchingAll] = useState(false); // For background fetch indication

  const handleBranchChange = async (event) => {
    const branchName = event.target.value;
    const branch = reportDownload.find((b) => b.braName === branchName);
    setSelectedBranch(branch);
    setServices([]);
    setAllServices([]);
    setSearchTerm("");
    setError(null);

    if (branch) {
      setLoading(true);

      try {
        // Fetch the first page
        const firstPageResponse = await axios.get(
          `${BASE_URL}/api/test-service-charges`,
          {
            params: {
              token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
              branch_id: branch.braID,
              test_service_category_id: 0,
              page: 1,
            },
          }
        );

        const firstPageData = firstPageResponse.data.data.data;
        setServices(firstPageData); // Populate first page instantly
        setAllServices(firstPageData); // Temporarily set as full data

        // Start fetching all pages in the background
        setIsFetchingAll(true);
        fetchAllPages(branch.braID, firstPageData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchAllPages = async (branchId, initialData) => {
    try {
      let currentPage = 2;
      let fetchedData = [...initialData];
      const response = await axios.get(
        `${BASE_URL}/api/test-service-charges`,
        {
          params: {
            token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
            branch_id: branchId,
            test_service_category_id: 0,
            page: 1,
          },
        }
      );
      const totalPages = response.data.data.last_page;

      while (currentPage <= totalPages) {
        const pageResponse = await axios.get(
          `${BASE_URL}/api/test-service-charges`,
          {
            params: {
              token: "UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4",
              branch_id: branchId,
              test_service_category_id: 0,
              page: currentPage,
            },
          }
        );

        fetchedData = [...fetchedData, ...pageResponse.data.data.data];
        currentPage++;
      }

      setAllServices(fetchedData);
      setServices(fetchedData); // Replace first page with full data
    } catch (err) {
      console.error("Error fetching all pages:", err);
    } finally {
      setIsFetchingAll(false);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = allServices.filter((service) =>
      service.name.toLowerCase().includes(searchValue)
    );
    setServices(filtered);
  };

  return (
    <div>
      <label htmlFor="branch-select">Select a branch:</label>
      <select id="branch-select" onChange={handleBranchChange}>
        <option value="">--Please choose a branch--</option>
        {reportDownload.map((branch) => (
          <option key={branch.braID} value={branch.braName}>
            {branch.braName}
          </option>
        ))}
      </select>

      {loading && <p>Loading first page...</p>}
      {error && <p>{error}</p>}

      {selectedBranch && !loading && !error && (
        <div>
          <h3>Selected Branch ID: {selectedBranch.braID}</h3>
          <input
            type="text"
            placeholder="Search by service name..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {isFetchingAll && <p>Fetching remaining data...</p>}
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TestApi;
