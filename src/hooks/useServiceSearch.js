import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { API_TOKEN, BASE_URL } from '../secrets';
import { useDebouncedCallback } from './useDebounce';

const INITIAL_SERVICE_STATE = {
  selectedBranch: null,
  services: [],
  allServices: [], 
  searchTerm: "",
  loading: false,
  isFetchingAll: false, 
  allPagesFetched: false, 
  error: null,
  totalCount: 0, 
};

/**
 * Custom hook for managing service search functionality
 * @returns {Object} Service search state and methods
 */
export const useServiceSearch = () => {
  const [serviceState, setServiceState] = useState(INITIAL_SERVICE_STATE);
  const serviceSearchInputRef = useRef(null);

  // Fetch all pages of services for a branch
  const fetchAllPages = useCallback(
    async (branchId, initialData, totalPages) => {
      try {
        let currentPage = 2;
        let fetchedData = [...initialData];

        while (currentPage <= totalPages) {
          const pageResponse = await axios.get(
            `${BASE_URL}/api/test-service-charges`,
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

          setServiceState((prev) => ({
            ...prev,
            allServices: fetchedData,
            services: prev.searchTerm ? prev.services : fetchedData,
            totalCount: fetchedData.length,
          }));
        }

        setServiceState((prev) => ({
          ...prev,
          isFetchingAll: false,
          allPagesFetched: true,
        }));
      } catch (err) {
        setServiceState((prev) => ({
          ...prev,
          isFetchingAll: false,
          error: "Failed to load all services. Showing partial results.",
        }));
      }
    },
    []
  );

  // Handle branch selection change
  const handleBranchChange = useCallback(async (branchId) => {
    setServiceState((prev) => ({
      ...prev,
      selectedBranch: branchId,
      services: [],
      allServices: [],
      searchTerm: "",
      loading: !!branchId,
      isFetchingAll: !!branchId,
      allPagesFetched: false,
      totalCount: 0,
      error: null,
    }));

    if (!branchId) return;

    try {
      // First fetch to get initial data and total pages
      const firstPageResponse = await axios.get(
        `${BASE_URL}/api/test-service-charges`,
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

      setServiceState((prev) => ({
        ...prev,
        services: firstPageData,
        allServices: firstPageData,
        loading: false,
        totalCount: firstPageData.length,
      }));

      // If there are more pages, fetch them in the background
      if (totalPages > 1) {
        fetchAllPages(branchId, firstPageData, totalPages);
      } else {
        setServiceState((prev) => ({
          ...prev,
          isFetchingAll: false,
          allPagesFetched: true,
        }));
      }

      // Focus search input after branch selection
      if (serviceSearchInputRef.current) {
        serviceSearchInputRef.current.focus();
      }
    } catch (err) {
      setServiceState((prev) => ({
        ...prev,
        loading: false,
        isFetchingAll: false,
        error: "Failed to fetch services. Please try again later.",
      }));
    }
  }, [fetchAllPages]);

  // Debounced service search
  const debouncedServiceSearch = useDebouncedCallback(
    async (searchValue) => {
      if (!serviceState.selectedBranch) return;

      setServiceState((prev) => ({
        ...prev,
        searchTerm: searchValue,
        loading: !!searchValue,
      }));

      try {
        if (!searchValue) {
          // If search is cleared, show all services
          setServiceState((prev) => ({
            ...prev,
            services: prev.allServices,
            loading: false,
          }));
          return;
        }

        // Perform API search
        const response = await axios.get(
          `${BASE_URL}/api/test-service-charges`,
          {
            params: {
              token: API_TOKEN,
              branch_id: serviceState.selectedBranch,
              test_service_category_id: 0,
              name: searchValue,
              fast_search: "yes",
            },
          }
        );

        setServiceState((prev) => ({
          ...prev,
          services: response.data?.data?.data || [],
          loading: false,
        }));
      } catch (err) {
        setServiceState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to search services. Please try again.",
        }));
      }
    },
    500
  );

  // Handle search input change
  const handleSearchChange = useCallback((searchValue) => {
    debouncedServiceSearch(searchValue);
  }, [debouncedServiceSearch]);

  // Reset service search state
  const resetServiceSearch = useCallback(() => {
    setServiceState(INITIAL_SERVICE_STATE);
  }, []);

  return {
    // State
    serviceState,
    serviceSearchInputRef,
    
    // Actions
    handleBranchChange,
    handleSearchChange,
    resetServiceSearch,
  };
};