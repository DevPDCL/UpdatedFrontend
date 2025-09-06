import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/ubuntu";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useHoverDepth } from "../hooks/useHoverDepth";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useSmartNavigation } from "../hooks/useSmartNavigation";
import { 
  glassCardVariants, 
  emergencyButtonVariants,
  getGlassStyle,
  medicalColors 
} from "../utils/3d-effects";
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  BeakerIcon,
  PlayCircleIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const SmartSidemenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissedSuggestions, setDismissedSuggestions] = useState(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [menuHeight, setMenuHeight] = useState(0);
  
  const location = useLocation();
  const { scrollPosition, hasScrolled, isAtTop, direction, y } = useScrollPosition();
  const { contextualActions, emergencyMode, trackAction, getSmartSuggestions } = useSmartNavigation();
  const { prefersReducedMotion, getVariants } = useReducedMotion();

  // Viewport resize handler
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate safe positioning based on content and viewport
  const getSafePositioning = () => {
    const suggestions = getSmartSuggestions.filter(
      suggestion => !dismissedSuggestions.has(suggestion.action)
    );
    
    // Responsive sizing based on screen size
    const isSmallScreen = window.innerWidth < 768;
    const baseActionHeight = isSmallScreen ? 50 : 60;
    const baseSuggestionHeight = isSmallScreen ? 60 : 80;
    const maxSuggestionsHeight = isSmallScreen ? 150 : 200;
    
    const suggestionHeight = Math.min(suggestions.length * baseSuggestionHeight, maxSuggestionsHeight);
    const actionsHeight = contextualActions.length * baseActionHeight;
    const padding = isSmallScreen ? 60 : 100;
    const totalHeight = suggestionHeight + actionsHeight + padding;
    
    // Ensure menu doesn't go beyond viewport boundaries
    const minTop = 20;
    const maxTop = Math.max(minTop, viewportHeight - totalHeight - 20);
    const centeredTop = (viewportHeight - totalHeight) / 2;
    const safeTop = Math.max(minTop, Math.min(centeredTop, maxTop));
    
    return {
      top: `${safeTop}px`,
      maxSuggestions: Math.min(suggestions.length, isSmallScreen ? 2 : 3),
      shouldScroll: suggestions.length > (isSmallScreen ? 2 : 3)
    };
  };

  // Update time every minute for time-based suggestions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto-collapse when user scrolls up significantly
  useEffect(() => {
    if (direction === 'up' && y > 200) {
      setIsExpanded(false);
    }
  }, [direction, y]);

  // Smart Action Button Component
  const SmartActionButton = ({ action, index, isExpanded }) => {
    const hoverDepth = useHoverDepth({ maxScale: 1.1, enableMobile: true });
    
    const getActionIcon = (type) => {
      const iconMap = {
        'emergency': PhoneIcon,
        'primary': DocumentArrowDownIcon,
        'secondary': ChatBubbleLeftRightIcon,
        'frequent': SparklesIcon,
      };
      return iconMap[type] || BeakerIcon;
    };

    const Icon = getActionIcon(action.type);

    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: 100, rotateY: 45 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        exit={{ opacity: 0, x: 100, rotateY: -45 }}
        transition={{ 
          delay: index * 0.1, 
          type: "spring", 
          stiffness: 200, 
          damping: 20 
        }}
        {...hoverDepth.motionProps}>
        
        {action.href ? (
          <motion.a
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            onClick={() => trackAction(action.id, action.type)}
            className={clsx(
              "flex items-center justify-end group cursor-pointer",
              "perspective-1000 transform-3d"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <ActionContent action={action} Icon={Icon} isExpanded={isExpanded} />
          </motion.a>
        ) : (
          <Link 
            to={action.href || action.to} 
            onClick={() => trackAction(action.id, action.type)}
            className={clsx(
              "flex items-center justify-end group cursor-pointer",
              "perspective-1000 transform-3d"
            )}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <ActionContent action={action} Icon={Icon} isExpanded={isExpanded} />
            </motion.div>
          </Link>
        )}
      </motion.div>
    );
  };

  // Action Content Component - Fixed Left Overflow
  const ActionContent = ({ action, Icon, isExpanded }) => {
    const [labelRef, setLabelRef] = useState(null);
    const [useAlternatePosition, setUseAlternatePosition] = useState(false);
    
    // Check horizontal boundaries and adjust positioning
    useEffect(() => {
      if (labelRef && isExpanded) {
        const labelRect = labelRef.getBoundingClientRect();
        const buttonRect = labelRef.parentElement.getBoundingClientRect();
        
        // Estimate label width based on text length if not yet rendered
        const estimatedWidth = Math.max(action.label.length * 8 + 32, 120); // Rough estimate
        const actualWidth = labelRect.width || estimatedWidth;
        
        // Check if label would extend beyond left edge of viewport with some margin
        const leftEdgePosition = buttonRect.right - actualWidth - 12; // 12px for mr-3 margin
        const wouldOverflow = leftEdgePosition < 20; // 20px margin from viewport edge
        
        setUseAlternatePosition(wouldOverflow);
      }
    }, [labelRef, isExpanded, action.label]);
    
    // Calculate positioning classes based on available space
    const getLabelClasses = () => {
      if (useAlternatePosition) {
        // Position above the button when horizontal space is constrained
        return "absolute right-0 bottom-full mb-2 glass rounded-xl px-3 py-2 shadow-depth-2 text-sm max-w-48";
      } else {
        // Default position to the left of the button
        return "absolute right-full top-1/2 -translate-y-1/2 mr-3 glass rounded-xl px-4 py-2 shadow-depth-2 whitespace-nowrap";
      }
    };

    return (
      <div className="relative">
        {/* Expanded Label - Smart positioned to prevent overflow */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              ref={setLabelRef}
              initial={{ 
                opacity: 0, 
                x: useAlternatePosition ? 0 : 20, 
                y: useAlternatePosition ? 10 : 0, 
                scale: 0.8 
              }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ 
                opacity: 0, 
                x: useAlternatePosition ? 0 : 20, 
                y: useAlternatePosition ? 10 : 0, 
                scale: 0.8 
              }}
              className={getLabelClasses()}
              style={getGlassStyle('light', 0.9)}>
              <div className={useAlternatePosition ? "text-center" : "text-right"}>
                <div className="font-semibold text-gray-900 text-sm font-ubuntu">
                  {action.label}
                </div>
                {action.type === 'emergency' && emergencyMode && (
                  <div className="text-xs text-red-600 animate-pulse">
                    🚨 After Hours Emergency
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
      <motion.div
        className={clsx(
          "relative p-3 rounded-xl shadow-depth-3 border transition-all duration-200",
          "group-hover:shadow-depth-4 group-hover:-translate-y-1",
          action.type === 'emergency' && emergencyMode 
            ? "bg-red-600 border-red-500 text-white animate-pulse" 
            : action.type === 'primary'
            ? "glass-medical border-PDCL-green/30 text-PDCL-green"
            : "glass border-white/30 text-gray-700"
        )}
        whileHover={{ rotateY: 5, rotateX: 5 }}
        style={
          action.type === 'emergency' && emergencyMode 
            ? {} 
            : getGlassStyle(action.type === 'primary' ? 'medical' : 'light', 0.9)
        }>
        
        <Icon className="w-5 h-5" />
        
        {/* Priority Indicator */}
        {action.priority === 'high' && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-PDCL-green rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        {/* Emergency Pulse */}
        {action.type === 'emergency' && emergencyMode && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-red-400"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        </motion.div>
      </div>
    );
  };

  // Smart Suggestions Component - Limited Height with Scrolling
  const SmartSuggestions = () => {
    const suggestions = getSmartSuggestions.filter(
      suggestion => !dismissedSuggestions.has(suggestion.action)
    );

    const { maxSuggestions, shouldScroll } = getSafePositioning();

    if (suggestions.length === 0) return null;

    const visibleSuggestions = suggestions.slice(0, maxSuggestions);

    return (
      <div 
        className={clsx(
          "max-h-48 overflow-y-auto overscroll-contain",
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
          shouldScroll && "pr-2" // Add padding for scrollbar
        )}
        style={{ scrollbarWidth: 'thin' }}>
        <AnimatePresence>
          {visibleSuggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="mr-4 mb-3 glass rounded-xl p-3 shadow-depth-2"
              style={getGlassStyle('light', 0.95)}>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0"> {/* Prevent overflow */}
                  <div className="text-sm font-medium text-gray-900 font-ubuntu truncate">
                    💡 {suggestion.text}
                  </div>
                  <Link 
                    to={suggestion.action}
                    className="text-xs text-PDCL-green hover:underline">
                    Take action →
                  </Link>
                </div>
                
                <motion.button
                  onClick={() => setDismissedSuggestions(prev => new Set([...prev, suggestion.action]))}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}>
                  <XMarkIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Show remaining count if there are hidden suggestions */}
        {suggestions.length > maxSuggestions && (
          <motion.div
            className="mr-4 text-xs text-gray-500 text-center py-1 font-ubuntu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            +{suggestions.length - maxSuggestions} more suggestions
          </motion.div>
        )}
      </div>
    );
  };

  // Show only if there are contextual actions
  if (!contextualActions.length) return null;

  const { top: safeTop } = getSafePositioning();

  return (
    <motion.div
      className="fixed right-4 z-60 hidden sm:block"
      style={{ top: safeTop }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}>
      
      {/* Smart Suggestions */}
      <div className="mb-4">
        <SmartSuggestions />
      </div>

      {/* Contextual Actions Panel with Toggle */}
      <div className="relative">
        {/* Expand/Collapse Toggle - Positioned relative to actions */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 glass rounded-full shadow-depth-2 text-PDCL-green hover:text-PDCL-green-light transition-colors duration-200 z-10"
          whileHover={{ scale: 1.1, rotateY: 10 }}
          whileTap={{ scale: 0.9 }}
          style={getGlassStyle('medical', 0.9)}
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}>
            <SparklesIcon className="w-4 h-4" />
          </motion.div>
        </motion.button>

        <motion.div
          className="space-y-3"
          layout
          transition={{ type: "spring", stiffness: 200, damping: 30 }}>
        
        <AnimatePresence>
          {contextualActions.slice(0, 6).map((action, index) => (
            <SmartActionButton
              key={action.id}
              action={action}
              index={index}
              isExpanded={isExpanded}
            />
          ))}
        </AnimatePresence>
        </motion.div>
      </div>

      {/* AI Indicator */}
      <motion.div
        className="mt-4 mr-2 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}>
        <div className="text-xs text-gray-500 font-ubuntu flex items-center justify-end gap-1">
          <SparklesIcon className="w-3 h-3" />
          Smart Actions
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SmartSidemenu;
