import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

/**
 * Optimized API Hooks for PDCL Frontend
 * Features:
 * - Intelligent caching with stale-while-revalidate
 * - Request deduplication
 * - Background refetching
 * - Error handling and retries
 * - Offline support
 */

// API Configuration
const API_CONFIG = {
  baseURL: 'https://api.populardiagnostic.com', // Update with your API URL
  timeout: 10000,
  retries: 3,
  staleTime: {
    static: 1000 * 60 * 60, // 1 hour for static data
    dynamic: 1000 * 60 * 5,  // 5 minutes for dynamic data
    frequent: 1000 * 60 * 1, // 1 minute for frequently changing data
  }
};

// Create optimized axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
});

// Add request/response interceptors for performance monitoring
apiClient.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: Date.now() };
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(`API Request to ${response.config.url} took ${duration}ms`);
    return response;
  },
  (error) => {
    const duration = Date.now() - error.config?.metadata?.startTime;
    console.error(`API Request failed after ${duration}ms:`, error.config?.url);
    return Promise.reject(error);
  }
);

// Query Keys Factory for better cache management
export const queryKeys = {
  // Doctor related queries
  doctors: {
    all: ['doctors'],
    lists: () => [...queryKeys.doctors.all, 'list'],
    list: (filters) => [...queryKeys.doctors.lists(), { filters }],
    details: () => [...queryKeys.doctors.all, 'detail'],
    detail: (id) => [...queryKeys.doctors.details(), id],
  },
  
  // Branch related queries
  branches: {
    all: ['branches'],
    lists: () => [...queryKeys.branches.all, 'list'],
    list: (filters) => [...queryKeys.branches.lists(), { filters }],
    detail: (id) => [...queryKeys.branches.all, 'detail', id],
  },
  
  // Notice related queries
  notices: {
    all: ['notices'],
    list: (page = 1) => [...queryKeys.notices.all, 'list', page],
    detail: (id) => [...queryKeys.notices.all, 'detail', id],
  },
  
  // Health packages
  packages: {
    all: ['health-packages'],
    list: () => [...queryKeys.packages.all, 'list'],
  },
  
  // Services
  services: {
    all: ['services'],
    list: () => [...queryKeys.services.all, 'list'],
  }
};

// Custom hooks for different types of data

/**
 * Hook for fetching doctors with intelligent caching
 */
export const useDoctors = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.doctors.list(filters),
    queryFn: async () => {
      const response = await apiClient.get('/doctors', { params: filters });
      return response.data;
    },
    staleTime: API_CONFIG.staleTime.dynamic,
    gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
    retry: 2,
    refetchOnWindowFocus: false,
    // Enable background refetch for better UX
    refetchInterval: 1000 * 60 * 10, // Refetch every 10 minutes in background
  });
};

/**
 * Hook for fetching specific doctor details
 */
export const useDoctorDetail = (doctorId, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.doctors.detail(doctorId),
    queryFn: async () => {
      const response = await apiClient.get(`/doctors/${doctorId}`);
      return response.data;
    },
    enabled: !!doctorId && enabled,
    staleTime: API_CONFIG.staleTime.static, // Doctor details don't change often
    gcTime: 1000 * 60 * 60, // 1 hour garbage collection
  });
};

/**
 * Hook for fetching branches (static data with long cache)
 */
export const useBranches = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.branches.list(filters),
    queryFn: async () => {
      const response = await apiClient.get('/branches', { params: filters });
      return response.data;
    },
    staleTime: API_CONFIG.staleTime.static, // Branches rarely change
    gcTime: 1000 * 60 * 60 * 2, // 2 hours garbage collection
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for fetching notices with pagination
 */
export const useNotices = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: queryKeys.notices.list(page),
    queryFn: async () => {
      const response = await apiClient.get('/notices', { 
        params: { page, per_page: perPage } 
      });
      return response.data;
    },
    staleTime: API_CONFIG.staleTime.frequent, // Notices change frequently
    keepPreviousData: true, // For better pagination UX
  });
};

/**
 * Hook for fetching health packages (cached for long periods)
 */
export const useHealthPackages = () => {
  return useQuery({
    queryKey: queryKeys.packages.list(),
    queryFn: async () => {
      const response = await apiClient.get('/health-packages');
      return response.data;
    },
    staleTime: API_CONFIG.staleTime.static,
    gcTime: 1000 * 60 * 60 * 4, // 4 hours garbage collection
  });
};

/**
 * Hook for prefetching data (useful for predictive loading)
 */
export const usePrefetchData = () => {
  const queryClient = useQueryClient();
  
  const prefetchDoctors = async (filters = {}) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.doctors.list(filters),
      queryFn: async () => {
        const response = await apiClient.get('/doctors', { params: filters });
        return response.data;
      },
      staleTime: API_CONFIG.staleTime.dynamic,
    });
  };
  
  const prefetchBranches = async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.branches.list({}),
      queryFn: async () => {
        const response = await apiClient.get('/branches');
        return response.data;
      },
      staleTime: API_CONFIG.staleTime.static,
    });
  };
  
  return { prefetchDoctors, prefetchBranches };
};

/**
 * Hook for invalidating cache (useful after data mutations)
 */
export const useCacheInvalidation = () => {
  const queryClient = useQueryClient();
  
  const invalidateDoctors = () => queryClient.invalidateQueries({ queryKey: queryKeys.doctors.all });
  const invalidateNotices = () => queryClient.invalidateQueries({ queryKey: queryKeys.notices.all });
  const invalidateBranches = () => queryClient.invalidateQueries({ queryKey: queryKeys.branches.all });
  
  const invalidateAll = () => queryClient.invalidateQueries();
  
  return {
    invalidateDoctors,
    invalidateNotices,
    invalidateBranches,
    invalidateAll,
  };
};

/**
 * Hook for search with debouncing and caching
 */
export const useOptimizedSearch = (searchTerm, searchType = 'doctors', debounceMs = 300) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  
  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);
  
  return useQuery({
    queryKey: [searchType, 'search', debouncedTerm],
    queryFn: async () => {
      if (!debouncedTerm || debouncedTerm.length < 2) return [];
      
      const response = await apiClient.get(`/${searchType}/search`, {
        params: { q: debouncedTerm }
      });
      return response.data;
    },
    enabled: debouncedTerm && debouncedTerm.length >= 2,
    staleTime: API_CONFIG.staleTime.frequent,
    keepPreviousData: true,
  });
};

/**
 * Performance monitoring hook
 */
export const useApiPerformance = () => {
  const queryClient = useQueryClient();
  
  const getQueryStats = () => {
    const queryCache = queryClient.getQueryCache();
    const queries = queryCache.getAll();
    
    return {
      totalQueries: queries.length,
      staleQueries: queries.filter(q => q.isStale()).length,
      loadingQueries: queries.filter(q => q.state.status === 'loading').length,
      errorQueries: queries.filter(q => q.state.status === 'error').length,
      successQueries: queries.filter(q => q.state.status === 'success').length,
    };
  };
  
  const clearCache = () => {
    queryClient.clear();
  };
  
  return { getQueryStats, clearCache };
};

// Export default API client for direct use
export { apiClient };
