/**
 * useSmartNavigation Hook
 * AI-powered contextual navigation that adapts based on user behavior and page context
 */

import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useSmartNavigation = () => {
  const location = useLocation();
  const [userBehavior, setUserBehavior] = useState({
    frequentPages: [],
    lastVisitedPages: [],
    sessionStartTime: Date.now(),
    pageViews: {},
    preferredActions: [],
  });

  const [contextualActions, setContextualActions] = useState([]);
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Track user behavior
  useEffect(() => {
    const currentPath = location.pathname;
    const timestamp = Date.now();

    setUserBehavior(prev => {
      const updatedPageViews = {
        ...prev.pageViews,
        [currentPath]: (prev.pageViews[currentPath] || 0) + 1,
      };

      const updatedLastVisited = [
        currentPath,
        ...prev.lastVisitedPages.filter(page => page !== currentPath).slice(0, 4)
      ];

      // Calculate frequent pages (visited more than 2 times)
      const frequentPages = Object.entries(updatedPageViews)
        .filter(([_, count]) => count > 2)
        .sort(([,a], [,b]) => b - a)
        .map(([page]) => page)
        .slice(0, 5);

      return {
        ...prev,
        pageViews: updatedPageViews,
        lastVisitedPages: updatedLastVisited,
        frequentPages,
      };
    });

    // Store in localStorage for persistence
    localStorage.setItem('pdcl_navigation_behavior', JSON.stringify({
      timestamp,
      path: currentPath,
    }));
  }, [location.pathname]);

  // Generate contextual actions based on current page
  const generateContextualActions = useCallback(() => {
    const currentPath = location.pathname;
    let actions = [];

    // Dynamic hotline action based on time and location
    const isOnHotlinesPage = currentPath === '/hotlines';
    const shouldShowCalling = emergencyMode || isOnHotlinesPage;
    
    actions.push({
      id: 'hotline',
      label: shouldShowCalling ? (emergencyMode ? '24/7 Emergency Support' : 'Medical Hotline') : 'Medical Hotline',
      icon: 'phone',
      ...(shouldShowCalling 
        ? { 
            href: 'tel:10636', // Direct call link
            external: true,
            type: 'emergency'
          }
        : { 
            to: '/hotlines', // Navigate to hotlines page
            type: 'primary'
          }
      ),
      priority: 'high',
      description: shouldShowCalling 
        ? (emergencyMode ? 'Immediate medical assistance available' : 'Call for medical consultation')
        : 'View hotline numbers and information',
    });

    // Page-specific contextual actions
    if (currentPath === '/') {
      // Homepage actions - The 3 most important actions
      actions.push(
        {
          id: 'report-download',
          label: 'Report Download',
          icon: 'download',
          href: '/patient_portal',
          priority: 'high',
          type: 'primary',
        },
        {
          id: 'find-doctor',
          label: 'Find Doctor',
          icon: 'user-doctor',
          href: '/our-doctors',
          priority: 'high',
          type: 'primary',
        },
        {
          id: 'book-appointment',
          label: 'Book Appointment',
          icon: 'calendar',
          href: 'https://appointment.populardiagnostic.com/appointment',
          priority: 'high',
          type: 'primary',
          external: true,
        }
      );
    } else if (currentPath.includes('/our-doctors')) {
      // Doctor pages
      actions.push(
        {
          id: 'book-appointment',
          label: 'Book Appointment',
          icon: 'calendar',
          href: 'https://appointment.populardiagnostic.com/appointment',
          priority: 'high',
          type: 'primary',
          external: true,
        },
        {
          id: 'find-branch',
          label: 'Find Branch',
          icon: 'map-pin',
          href: '/our-branches',
          priority: 'medium',
          type: 'secondary',
        }
      );
    } else if (currentPath.includes('/health')) {
      // Health package pages
      actions.push(
        {
          id: 'sample-collection',
          label: 'Home Collection',
          icon: 'truck',
          href: 'https://docs.google.com/forms/d/e/1FAIpQLSfnFAHgePOjueWSh2mAoPOuyCjw93Iwdp7jwK7vHvzvVIWxJw/viewform',
          priority: 'high',
          type: 'primary',
          external: true,
        },
        {
          id: 'report-download',
          label: 'Report Download',
          icon: 'download',
          href: '/patient_portal',
          priority: 'high',
          type: 'primary',
        }
      );
    } else if (currentPath.includes('/patient_portal')) {
      // Patient portal
      actions.push(
        {
          id: 'help-support',
          label: 'Need Help?',
          icon: 'question-circle',
          href: '/contact-us',
          priority: 'medium',
          type: 'secondary',
        }
      );
    }

    // Add frequent pages as quick actions
    userBehavior.frequentPages.slice(0, 2).forEach((page, index) => {
      if (page !== currentPath) {
        actions.push({
          id: `frequent-${index}`,
          label: getPageTitle(page),
          icon: 'star',
          href: page,
          priority: 'low',
          type: 'frequent',
        });
      }
    });

    // Sort by priority
    actions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    return actions.slice(0, 6); // Limit to 6 actions to avoid overwhelming
  }, [location.pathname, userBehavior.frequentPages, emergencyMode]);

  // Helper function to get page titles
  const getPageTitle = (path) => {
    const pageTitles = {
      '/': 'Home',
      '/our-doctors': 'Doctors',
      '/our-branches': 'Branches',
      '/health': 'Health Packages',
      '/patient_portal': 'Report Download',
      '/contact-us': 'Contact',
      '/about': 'About Us',
      '/hotlines': 'Hotlines',
      '/complain': 'Complaints',
    };
    return pageTitles[path] || 'Page';
  };

  // Update contextual actions when dependencies change
  useEffect(() => {
    const actions = generateContextualActions();
    setContextualActions(actions);
  }, [generateContextualActions]);

  // Enhanced emergency detection for healthcare context
  const detectEmergencyContext = useCallback(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    // After-hours detection (7 AM to 11 PM, 7 days a week)
    const isAfterHours = currentHour < 7 || currentHour >= 23;
    // PDCL operates 7 days a week - no weekend emergency mode
    const isHoliday = checkIfHoliday(now); // Could be enhanced with actual holiday data
    
    // Page context detection
    const isEmergencyPage = location.pathname.includes('/hotlines') || 
                           location.pathname.includes('/emergency');
    
    // User behavior patterns (emergency indicators)
    const hasRepeatedVisits = userBehavior.pageViews[location.pathname] > 3;
    const quickNavigation = Date.now() - userBehavior.sessionStartTime < 2 * 60 * 1000; // Within 2 minutes
    
    // Enhanced emergency mode for healthcare (7 days operation)
    return isAfterHours || isHoliday || isEmergencyPage || (quickNavigation && hasRepeatedVisits);
  }, [location.pathname, userBehavior.pageViews, userBehavior.sessionStartTime]);

  // Basic holiday detection (can be enhanced with actual holiday API)
  const checkIfHoliday = (date) => {
    // Add basic holiday detection for Bangladesh
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Some major holidays in Bangladesh (can be expanded)
    const holidays = [
      { month: 2, day: 21 }, // International Mother Language Day
      { month: 3, day: 26 }, // Independence Day
      { month: 12, day: 16 }, // Victory Day
      // Add more holidays as needed
    ];
    
    return holidays.some(holiday => holiday.month === month && holiday.day === day);
  };

  useEffect(() => {
    setEmergencyMode(detectEmergencyContext());
  }, [detectEmergencyContext]);

  // Track user actions for learning
  const trackAction = useCallback((actionId, actionType) => {
    setUserBehavior(prev => {
      const updatedActions = [...prev.preferredActions];
      const existingIndex = updatedActions.findIndex(a => a.id === actionId);
      
      if (existingIndex >= 0) {
        updatedActions[existingIndex].count += 1;
      } else {
        updatedActions.push({ id: actionId, type: actionType, count: 1 });
      }

      // Keep only top 10 preferred actions
      updatedActions.sort((a, b) => b.count - a.count);
      
      return {
        ...prev,
        preferredActions: updatedActions.slice(0, 10),
      };
    });
  }, []);

  // Get smart suggestions based on healthcare context and behavior
  const getSmartSuggestions = useCallback(() => {
    const suggestions = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentPath = location.pathname;
    
    // Healthcare-specific time-based suggestions (7 AM to 11 PM business hours)
    if (currentHour >= 7 && currentHour < 23) {
      suggestions.push({
        text: 'Schedule your health checkup during business hours',
        action: '/patient_portal',
        type: 'healthcare-time',
        priority: 'medium'
      });
    } else if (emergencyMode) {
      suggestions.push({
        text: '24/7 emergency medical assistance available',
        action: 'tel:10636',
        type: 'emergency-care',
        priority: 'high'
      });
    }

    // Health-focused behavior suggestions
    if (userBehavior.frequentPages.includes('/our-doctors') && currentPath !== '/our-doctors') {
      suggestions.push({
        text: 'Find your specialist doctor quickly',
        action: '/our-doctors',
        type: 'healthcare-behavior',
        priority: 'medium'
      });
    }

    // Proactive healthcare suggestions
    if (currentPath === '/' && userBehavior.pageViews['/'] > 3) {
      suggestions.push({
        text: 'Consider our comprehensive health packages',
        action: '/health',
        type: 'proactive-health',
        priority: 'low'
      });
    }

    // Quick access suggestions for frequent users
    if (userBehavior.frequentPages.length > 0) {
      const topPage = userBehavior.frequentPages[0];
      if (topPage !== currentPath && getPageTitle(topPage) !== 'Page') {
        suggestions.push({
          text: `Quick access to ${getPageTitle(topPage)}`,
          action: topPage,
          type: 'quick-access',
          priority: 'low'
        });
      }
    }

    // Sort by priority and return top suggestions
    return suggestions
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 3); // Limit to 3 suggestions to avoid overwhelming users
  }, [userBehavior.frequentPages, userBehavior.pageViews, location.pathname, emergencyMode]);

  return {
    contextualActions,
    emergencyMode,
    userBehavior,
    trackAction,
    getSmartSuggestions: getSmartSuggestions(),
    isNewUser: userBehavior.sessionStartTime > Date.now() - 5 * 60 * 1000, // First 5 minutes
  };
};