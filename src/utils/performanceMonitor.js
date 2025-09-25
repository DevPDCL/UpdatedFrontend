/**
 * Performance Monitoring Utility
 * Tracks and reports Core Web Vitals and custom performance metrics
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB, onINP } from 'web-vitals';

// Configuration for performance monitoring
const PERFORMANCE_CONFIG = {
  // API endpoint for sending performance data (replace with your analytics endpoint)
  endpoint: '/api/analytics/performance',
  
  // Sampling rate (0-1) - set to 0.1 for 10% of users
  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
  
  // Local storage key for performance data
  storageKey: 'pdcl_performance_data',
  
  // Thresholds for performance budgets
  thresholds: {
    cls: { good: 0.1, poor: 0.25 },
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    inp: { good: 200, poor: 500 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 },
  }
};

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.startTime = performance.now();
    this.pageLoadTime = null;
    this.customMetrics = new Map();
    
    // Only monitor if sampling allows it
    if (Math.random() > PERFORMANCE_CONFIG.sampleRate) {
      return;
    }

    this.initializeWebVitals();
    this.trackPageLoad();
    this.trackCustomMetrics();
  }

  /**
   * Initialize Core Web Vitals tracking
   */
  initializeWebVitals() {
    // Track all Core Web Vitals
    getCLS(this.handleMetric.bind(this, 'CLS'));
    getFID(this.handleMetric.bind(this, 'FID'));
    getFCP(this.handleMetric.bind(this, 'FCP'));
    getLCP(this.handleMetric.bind(this, 'LCP'));
    getTTFB(this.handleMetric.bind(this, 'TTFB'));
    
    // Track Interaction to Next Paint (new metric)
    if (onINP) {
      onINP(this.handleMetric.bind(this, 'INP'));
    }
  }

  /**
   * Handle incoming metrics from web-vitals
   */
  handleMetric(name, metric) {
    const metricData = {
      name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.metrics.set(name, metricData);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${metric.value} (${metric.rating})`);
    }

    // Store locally and send to analytics
    this.storeMetric(metricData);
    this.sendMetric(metricData);
  }

  /**
   * Track page load performance
   */
  trackPageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.pageLoadTime = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
          timestamp: Date.now(),
        };
        
        this.storeCustomMetric('pageLoad', this.pageLoadTime);
      }
    });
  }

  /**
   * Track custom performance metrics
   */
  trackCustomMetrics() {
    // Track JavaScript bundle size
    if ('connection' in navigator) {
      const connection = navigator.connection;
      this.storeCustomMetric('networkInfo', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        saveData: connection.saveData,
      });
    }

    // Track memory usage (Chrome only)
    if ('memory' in performance) {
      this.storeCustomMetric('memoryInfo', {
        usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576),
        totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576),
        jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576),
      });
    }

    // Track device information
    this.storeCustomMetric('deviceInfo', {
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      devicePixelRatio: window.devicePixelRatio,
    });
  }

  /**
   * Store metric locally
   */
  storeMetric(metric) {
    try {
      const stored = JSON.parse(localStorage.getItem(PERFORMANCE_CONFIG.storageKey) || '[]');
      stored.push(metric);
      
      // Keep only last 50 metrics to avoid storage bloat
      const trimmed = stored.slice(-50);
      localStorage.setItem(PERFORMANCE_CONFIG.storageKey, JSON.stringify(trimmed));
    } catch (error) {
      console.warn('Failed to store performance metric:', error);
    }
  }

  /**
   * Store custom metrics
   */
  storeCustomMetric(name, data) {
    this.customMetrics.set(name, {
      name,
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Send metric to analytics endpoint
   */
  async sendMetric(metric) {
    try {
      // Add session information
      const payload = {
        ...metric,
        sessionId: this.getSessionId(),
        customMetrics: Object.fromEntries(this.customMetrics),
      };

      // Use sendBeacon for reliability, fallback to fetch
      if ('sendBeacon' in navigator) {
        navigator.sendBeacon(
          PERFORMANCE_CONFIG.endpoint,
          JSON.stringify(payload)
        );
      } else {
        await fetch(PERFORMANCE_CONFIG.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          keepalive: true, // Keep request alive even if page unloads
        });
      }
    } catch (error) {
      // Silently fail - don't impact user experience
      console.warn('Failed to send performance metric:', error);
    }
  }

  /**
   * Get or create session ID
   */
  getSessionId() {
    let sessionId = sessionStorage.getItem('pdcl_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('pdcl_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    const summary = {
      coreWebVitals: {},
      customMetrics: Object.fromEntries(this.customMetrics),
      recommendations: [],
    };

    // Process Core Web Vitals
    this.metrics.forEach((metric, name) => {
      const threshold = PERFORMANCE_CONFIG.thresholds[name.toLowerCase()];
      summary.coreWebVitals[name] = {
        value: metric.value,
        rating: metric.rating,
        threshold,
        isGood: threshold && metric.value <= threshold.good,
        isPoor: threshold && metric.value >= threshold.poor,
      };

      // Generate recommendations
      if (threshold && metric.value >= threshold.poor) {
        summary.recommendations.push(this.getRecommendation(name, metric.value));
      }
    });

    return summary;
  }

  /**
   * Get performance recommendations based on metrics
   */
  getRecommendation(metricName, value) {
    const recommendations = {
      CLS: 'Consider using CSS transforms for animations, avoid inserting content above existing content, and ensure images have size attributes.',
      LCP: 'Optimize your largest content element: compress images, use CDN, implement lazy loading, and minimize render-blocking resources.',
      FID: 'Reduce JavaScript execution time, break up long tasks, use web workers for heavy computations, and implement code splitting.',
      INP: 'Optimize event handlers, use debouncing for frequent events, and consider using requestIdleCallback for non-critical updates.',
      FCP: 'Minimize render-blocking resources, optimize critical rendering path, and use resource hints like preload and preconnect.',
      TTFB: 'Optimize server response times, use CDN, implement caching strategies, and minimize server processing time.',
    };

    return {
      metric: metricName,
      value,
      recommendation: recommendations[metricName] || 'Review performance optimization opportunities for this metric.',
    };
  }

  /**
   * Export performance data
   */
  exportPerformanceData() {
    return {
      metrics: Object.fromEntries(this.metrics),
      customMetrics: Object.fromEntries(this.customMetrics),
      summary: this.getPerformanceSummary(),
      timestamp: Date.now(),
    };
  }

  /**
   * Clear stored performance data
   */
  clearStoredData() {
    try {
      localStorage.removeItem(PERFORMANCE_CONFIG.storageKey);
      sessionStorage.removeItem('pdcl_session_id');
    } catch (error) {
      console.warn('Failed to clear performance data:', error);
    }
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export utility functions
export const trackCustomEvent = (eventName, data) => {
  performanceMonitor.storeCustomMetric(eventName, data);
};

export const getPerformanceData = () => {
  return performanceMonitor.exportPerformanceData();
};

export const getPerformanceSummary = () => {
  return performanceMonitor.getPerformanceSummary();
};

export const clearPerformanceData = () => {
  performanceMonitor.clearStoredData();
};

// Export monitor instance
export default performanceMonitor;
