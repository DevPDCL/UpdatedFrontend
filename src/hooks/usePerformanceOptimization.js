import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Performance Optimization Hook Collection
 * Provides utilities for runtime performance monitoring and optimization
 */

/**
 * Hook for monitoring Core Web Vitals
 */
export const useWebVitals = () => {
  const [vitals, setVitals] = useState({});
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if web-vitals is available
    if (typeof window !== 'undefined') {
      import('web-vitals')
        .then(({ getCLS, getFID, getFCP, getLCP, getTTFB, onINP }) => {
          setIsSupported(true);
          
          // Collect all Core Web Vitals
          getCLS((metric) => setVitals(prev => ({ ...prev, cls: metric })));
          getFID((metric) => setVitals(prev => ({ ...prev, fid: metric })));
          getFCP((metric) => setVitals(prev => ({ ...prev, fcp: metric })));
          getLCP((metric) => setVitals(prev => ({ ...prev, lcp: metric })));
          getTTFB((metric) => setVitals(prev => ({ ...prev, ttfb: metric })));
          
          // Interaction to Next Paint (new metric)
          if (onINP) {
            onINP((metric) => setVitals(prev => ({ ...prev, inp: metric })));
          }
        })
        .catch(() => {
          console.warn('Web Vitals library not available');
          setIsSupported(false);
        });
    }
  }, []);

  const getPerformanceScore = useCallback(() => {
    if (!vitals.cls || !vitals.lcp || !vitals.fid) return null;
    
    // Calculate score based on Core Web Vitals thresholds
    const clsScore = vitals.cls.value < 0.1 ? 100 : vitals.cls.value < 0.25 ? 50 : 0;
    const lcpScore = vitals.lcp.value < 2500 ? 100 : vitals.lcp.value < 4000 ? 50 : 0;
    const fidScore = vitals.fid.value < 100 ? 100 : vitals.fid.value < 300 ? 50 : 0;
    
    return Math.round((clsScore + lcpScore + fidScore) / 3);
  }, [vitals]);

  return { vitals, isSupported, getPerformanceScore };
};

/**
 * Hook for detecting slow renders and performance bottlenecks
 */
export const useRenderTracker = (componentName) => {
  const [renderTimes, setRenderTimes] = useState([]);
  const [slowRenderCount, setSlowRenderCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const renderTime = performance.now() - startTime;
      
      setRenderTimes(prev => {
        const newTimes = [...prev, renderTime].slice(-10); // Keep last 10 renders
        return newTimes;
      });
      
      // Consider renders > 16ms as slow (60fps threshold)
      if (renderTime > 16) {
        setSlowRenderCount(prev => prev + 1);
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  const averageRenderTime = useMemo(() => {
    if (renderTimes.length === 0) return 0;
    return renderTimes.reduce((sum, time) => sum + time, 0) / renderTimes.length;
  }, [renderTimes]);

  return { averageRenderTime, slowRenderCount, lastRenderTime: renderTimes[renderTimes.length - 1] };
};

/**
 * Hook for memory usage monitoring
 */
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if memory API is available (Chrome only)
    if ('memory' in performance) {
      setIsSupported(true);
      
      const updateMemoryInfo = () => {
        setMemoryInfo({
          usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
          totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
          jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
        });
      };

      updateMemoryInfo();
      const interval = setInterval(updateMemoryInfo, 5000); // Update every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, []);

  const getMemoryUsagePercentage = useCallback(() => {
    if (!memoryInfo) return null;
    return Math.round((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100);
  }, [memoryInfo]);

  return { memoryInfo, isSupported, getMemoryUsagePercentage };
};

/**
 * Hook for optimized intersection observer
 */
export const useOptimizedIntersectionObserver = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [element, setElement] = useState(null);

  const defaultOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  }), [options]);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      defaultOptions
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, defaultOptions]);

  return [setElement, isInView];
};

/**
 * Hook for debounced values with performance optimization
 */
export const useOptimizedDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for lazy loading with priority hints
 */
export const useLazyLoading = (shouldLoad, priority = 'low') => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadResource = useCallback(async (loader) => {
    if (isLoaded || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Use scheduler if available for priority-based loading
      if ('scheduler' in window && window.scheduler.postTask) {
        await window.scheduler.postTask(loader, { priority });
      } else {
        await loader();
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Lazy loading failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isLoading, priority]);

  useEffect(() => {
    if (shouldLoad && !isLoaded && !isLoading) {
      // Automatically trigger loading if shouldLoad is true
    }
  }, [shouldLoad, isLoaded, isLoading]);

  return { isLoaded, isLoading, loadResource };
};

/**
 * Hook for performance budget monitoring
 */
export const usePerformanceBudget = (budgets = {}) => {
  const [violations, setViolations] = useState([]);
  
  const defaultBudgets = {
    maxBundleSize: 1000, // KB
    maxImageSize: 500,   // KB  
    maxRenderTime: 16,   // ms
    maxMemoryUsage: 50,  // MB
    ...budgets
  };

  const checkBudget = useCallback((metric, value) => {
    const budget = defaultBudgets[metric];
    if (budget && value > budget) {
      const violation = {
        metric,
        value,
        budget,
        timestamp: Date.now(),
        severity: value > budget * 1.5 ? 'high' : 'medium'
      };
      
      setViolations(prev => [...prev.slice(-9), violation]); // Keep last 10
      console.warn(`Performance budget violation: ${metric} (${value}) exceeds budget (${budget})`);
      
      return false;
    }
    return true;
  }, [defaultBudgets]);

  return { violations, checkBudget };
};

/**
 * Hook for adaptive loading based on network conditions
 */
export const useAdaptiveLoading = () => {
  const [networkInfo, setNetworkInfo] = useState({
    effectiveType: '4g',
    saveData: false,
  });

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      const updateNetworkInfo = () => {
        setNetworkInfo({
          effectiveType: connection.effectiveType,
          saveData: connection.saveData,
          downlink: connection.downlink,
        });
      };

      updateNetworkInfo();
      connection.addEventListener('change', updateNetworkInfo);
      
      return () => connection.removeEventListener('change', updateNetworkInfo);
    }
  }, []);

  const shouldReduceQuality = useMemo(() => {
    return networkInfo.saveData || 
           networkInfo.effectiveType === 'slow-2g' || 
           networkInfo.effectiveType === '2g';
  }, [networkInfo]);

  const getOptimalImageQuality = useMemo(() => {
    if (shouldReduceQuality) return 60;
    if (networkInfo.effectiveType === '3g') return 75;
    return 90; // High quality for 4g and better
  }, [shouldReduceQuality, networkInfo]);

  return {
    networkInfo,
    shouldReduceQuality,
    getOptimalImageQuality,
  };
};

export default {
  useWebVitals,
  useRenderTracker,
  useMemoryMonitor,
  useOptimizedIntersectionObserver,
  useOptimizedDebounce,
  useLazyLoading,
  usePerformanceBudget,
  useAdaptiveLoading,
};
