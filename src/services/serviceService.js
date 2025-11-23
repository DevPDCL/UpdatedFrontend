import { legacyApi } from './api/legacyApi';
import { akhilApi } from './api/akhilApi';
import { normalizeResponse } from './api/apiFactory';

/**
 * List of branches that use the Akhil API backend
 * Based on exact branch name matching
 */
const AKHIL_API_BRANCHES = [
  'Dhanmondi',
  'English Road',
  'Shantinagar',
  'Mirpur',
  'Badda',
  'Jatrabari',
  'Savar',
  'Gazipur',
  'Narayangonj',
  'Rajshahi',
  'Noakhali',
  'Chattogram',
  'Mymensingh',
  'Khulna',
  'Kushtia',
  'Barishal',
];

/**
 * Determines which API to use based on branch name
 * @param {string|number} branchIdentifier - Branch name or ID
 * @param {object} branch - Branch object from reportDownload
 * @returns {object} API configuration
 */
const getApiForBranch = (branch) => {
  if (!branch) {
    return {
      api: legacyApi,
      apiType: 'LEGACY',
    };
  }

  // Check if branch name is in the Akhil API list
  const usesAkhilApi = AKHIL_API_BRANCHES.includes(branch.braName);

  return {
    api: usesAkhilApi ? akhilApi : legacyApi,
    apiType: usesAkhilApi ? 'AKHIL' : 'LEGACY',
    branch,
  };
};

/**
 * Normalizes service data from Akhil API format to legacy format
 * @param {array} services - Services from Akhil API
 * @returns {array} Normalized services
 */
const normalizeAkhilApiServices = (services) => {
  return services.map((service) => ({
    name: service.serviceName,
    price: parseFloat(service.serviceCharge),
    // Preserve original fields for potential future use
    _original: {
      serviceId: service.serviceId,
      subDeptId: service.subDeptId,
      subName: service.subName,
      facilityId: service.facilityId,
    },
  }));
};

/**
 * Fetches service charges using the appropriate API
 * @param {object} params - Request parameters
 * @param {number} params.branchId - Branch ID
 * @param {object} params.branch - Branch object from reportDownload
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.categoryId - Category ID (default: 0)
 * @param {string} params.searchTerm - Search term (optional)
 * @param {AbortSignal} params.signal - AbortSignal for cancelling requests (optional)
 * @returns {Promise<object>} Normalized response
 */
export const fetchServiceCharges = async ({
  branchId,
  branch = null,
  page = 1,
  categoryId = 0,
  searchTerm = null,
  signal = null,
}) => {
  try {
    const { api, apiType } = getApiForBranch(branch);

    if (apiType === 'AKHIL') {
      // Akhil API call - build payload
      const payload = {
        facilityId: String(branchId), // facilityId = braID
        pageNo: page,
      };

      // Only include serviceName if there's an actual search term
      // Empty string returns limited results, omitting it returns all services
      if (searchTerm) {
        payload.serviceName = searchTerm;
      }

      const response = await api.post('/api/VCP/GetServiceTariff', payload, {
        signal,
      });

      const { items, hasMore, count, errorCode, message, status } = response.data;

      // Special case: End of pagination (errorCode 400 with no items)
      // Akhil API returns errorCode 400 when reaching last page - this is NOT an error
      const isEndOfPagination =
        errorCode === 400 &&
        (!items || items.length === 0) &&
        (hasMore === false || hasMore === null || hasMore === 'false');

      if (isEndOfPagination) {
        // Successfully reached end of pagination - return empty result with success
        return normalizeResponse({
          success: true, // Not an error, just no more pages
          data: [],
          pagination: {
            currentPage: page,
            hasMore: false,
            total: 0,
            lastPage: null,
            itemsCount: 0,
          },
          apiType,
        });
      }

      // Check for actual API-level errors (excluding the "end of pagination" case above)
      if (errorCode !== 200 || status !== 'sucess') {
        return normalizeResponse({
          success: false,
          error: message || 'Failed to fetch services from new API',
          errorCode,
        });
      }

      // Normalize services to match legacy format
      const normalizedServices = normalizeAkhilApiServices(items || []);

      return normalizeResponse({
        success: true,
        data: normalizedServices,
        pagination: {
          currentPage: page,
          hasMore: hasMore === 'true' || hasMore === true,
          total: parseInt(count) || 0,
          // Akhil API: count field represents total number of pages
          lastPage: parseInt(count) || null,
          itemsCount: normalizedServices.length, // Track items per page
        },
        apiType,
      });
    } else {
      // Legacy API call
      const params = {
        branch_id: branchId,
        test_service_category_id: categoryId,
        page,
      };

      // Add search parameters if search term exists
      if (searchTerm) {
        params.name = searchTerm;
        params.fast_search = 'yes';
      }

      const response = await api.get('/api/test-service-charges', {
        params,
        signal,
      });

      const data = response.data?.data?.data || [];
      const currentPage = response.data?.data?.current_page || page;
      const lastPage = response.data?.data?.last_page || 1;
      const total = response.data?.data?.total || 0;

      return normalizeResponse({
        success: true,
        data,
        pagination: {
          currentPage,
          lastPage,
          total,
          hasMore: currentPage < lastPage,
        },
        apiType,
      });
    }
  } catch (error) {
    // If request was aborted, throw the error to be handled by caller
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      throw error;
    }

    console.error('Service fetch error:', error);

    return normalizeResponse({
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch services',
      errorCode: error.response?.status,
    });
  }
};

/**
 * Fetches all pages of service charges
 * @param {object} params - Request parameters
 * @param {number} params.branchId - Branch ID
 * @param {object} params.branch - Branch object from reportDownload
 * @param {number} params.startPage - Starting page number
 * @param {number} params.endPage - Ending page number
 * @param {function} params.onPageFetched - Callback for each page fetched
 * @param {AbortSignal} params.signal - AbortSignal for cancelling requests (optional)
 * @returns {Promise<object>} Combined response with all services
 */
export const fetchAllServicePages = async ({
  branchId,
  branch = null,
  startPage = 2,
  endPage,
  onPageFetched = null,
  signal = null,
}) => {
  const allServices = [];
  let hasError = false;
  let errorMessage = null;

  for (let page = startPage; page <= endPage; page++) {
    try {
      const result = await fetchServiceCharges({
        branchId,
        branch,
        page,
        categoryId: 0,
        signal,
      });

      if (result.success) {
        allServices.push(...result.data);

        // Call callback with progress
        if (onPageFetched) {
          onPageFetched({
            page,
            totalPages: endPage,
            services: result.data,
            allServices,
          });
        }

        // No special break condition needed - loop stops at endPage naturally
      } else {
        hasError = true;
        errorMessage = result.error;
        break;
      }
    } catch (error) {
      // If request was aborted, throw the error immediately
      if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
        throw error;
      }

      hasError = true;
      errorMessage = error.message;
      break;
    }
  }

  return normalizeResponse({
    success: !hasError,
    data: allServices,
    error: errorMessage,
    pagination: {
      totalFetched: allServices.length,
      lastPageFetched: Math.min(startPage + allServices.length - 1, endPage),
    },
  });
};
