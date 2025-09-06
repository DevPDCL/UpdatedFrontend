import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/ubuntu";
import axios from "axios";
import { API_TOKEN, BASE_URL } from "../secrets";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useHoverDepth } from "../hooks/useHoverDepth";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { navigationVariants, emergencyButtonVariants, getGlassStyle } from "../utils/3d-effects";
import clsx from "clsx";

const Nav = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);

  const { hasScrolled } = useScrollPosition();
  const { prefersReducedMotion, getVariants } = useReducedMotion();
  const emergencyHover = useHoverDepth({ maxScale: 1.1, enableMobile: true });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Check if it's after-hours for enhanced emergency service indication
  useEffect(() => {
    const hour = currentTime.getHours();
    setIsEmergencyMode(hour < 7 || hour >= 23);
  }, [currentTime]);

  // Measure nav height and set CSS custom property for other components
  useEffect(() => {
    const updateNavHeight = () => {
            if (navRef.current) {
        const height = navRef.current.offsetHeight;
        setNavHeight(height);
        // Set CSS custom property that Navbar can use
        document.documentElement.style.setProperty('--nav-height', `${height}px`);
      }
    };

    updateNavHeight();
    
    // Update on window resize
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, [isEmergencyMode]); // Re-calculate when emergency mode changes (banner appears/disappears)

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/social-links`, {
          params: {
            token: `${API_TOKEN}`,
          },
        });
        setSocialLinks(response.data.data);
      } catch (err) {
        console.warn("Could not fetch social links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  // Social media icon components for better reusability
  const SocialIcon = ({ href, ariaLabel, children, className = "" }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={clsx(
        "relative p-2 rounded-lg text-white/90 hover:text-white transition-colors duration-200",
        "hover-lift glass-dark",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      {...(!prefersReducedMotion && {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: 0.1 },
      })}>
      {children}
    </motion.a>
  );

  // Intelligent Contact Selection Component
  const SmartContactButton = () => {
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowContactOptions(false);
        }
      };

      if (showContactOptions) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [showContactOptions]);

    const getContactMessage = () => {
      // During emergency mode, let the banner handle emergency messaging
      // Button becomes a utility for additional options
      if (isEmergencyMode) {
        return {
          primary: "Need Help?",
          secondary: "More contact options",
          icon: "📞"
        };
      }
      return {
        primary: "Need Help?",
        secondary: "Emergency or routine care?",
        icon: "📞"
      };
    };

    const { primary, secondary, icon } = getContactMessage();

    return (
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setShowContactOptions(!showContactOptions)}
          className={clsx(
            "relative inline-flex items-center gap-2 px-4 py-2 rounded-full",
            "font-semibold text-sm transition-all duration-200 cursor-pointer",
            isEmergencyMode
              ? "bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 border border-gray-200" // Subtle during emergency mode
              : "bg-PDCL-green text-white shadow-medical hover:shadow-lg hover:bg-PDCL-green-dark"
          )}
          variants={getVariants(emergencyButtonVariants)}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          {...emergencyHover.motionProps}
          aria-label={primary}
          aria-expanded={showContactOptions}>
          
          <motion.svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 512 512"
            animate={isEmergencyMode ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}>
            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
          </motion.svg>
          
          <div className="text-left">
            <div className="font-semibold font-ubuntu">{primary}</div>
            <div className="text-xs opacity-90">{secondary}</div>
          </div>
          
          {/* Subtle indicator during emergency mode - no longer needed since button is subtle */}
        </motion.button>

        {/* Smart Contact Options Dropdown */}
        <AnimatePresence>
          {showContactOptions && (
            <motion.div
              className="absolute top-full left-0 mt-2 w-80 glass shadow-depth-4 rounded-xl border border-white/20 p-4 z-50"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              style={getGlassStyle('light', 0.95)}>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-3 font-ubuntu">
                {isEmergencyMode ? "Additional Contact Options" : "How can we help you?"}
              </h3>
              
              {/* Emergency Contact */}
              <motion.a
                href="tel:10636"
                className="block p-4 rounded-lg glass-medical border border-PDCL-green/20 mb-3 hover:border-PDCL-green/40 transition-all duration-200 group touch-manipulation"
                style={{ minHeight: '64px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-PDCL-green rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-PDCL-green text-base font-ubuntu">
                      {isEmergencyMode ? "Emergency Hotline" : "Emergency / Urgent Care"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isEmergencyMode 
                        ? "Direct line to head office" 
                        : "Call 10636 • Available 24/7 • Head Office"
                      }
                    </div>
                  </div>
                  <div className="text-xs text-PDCL-green font-medium">
                    TAP TO CALL
                  </div>
                </div>
              </motion.a>

              {/* Branch Contact */}
              <motion.div
                className="p-4 rounded-lg glass border border-gray-200 group"
                style={{ minHeight: '64px' }}
                whileHover={{ scale: 1.02 }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-base font-ubuntu">
                      Schedule Visit / Routine Care
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Contact your preferred branch • Business hours only
                    </div>
                    <Link 
                      to="/hotlines"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-PDCL-green text-white text-xs rounded-md hover:bg-PDCL-green-dark transition-colors duration-200 touch-manipulation"
                      onClick={() => setShowContactOptions(false)}>
                      <span>Find Branch Contacts</span>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Helper text */}
              <div className="text-xs text-gray-500 mt-3 text-center">
                {isEmergencyMode 
                  ? "For immediate assistance, call the emergency number shown above" 
                  : "Need help choosing? Emergency line can redirect you"
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.nav
      ref={navRef}
      className={clsx(
        "fixed top-0 left-0 right-0 z-80 transition-all duration-300",
        hasScrolled
          ? "glass-medical shadow-depth-3 backdrop-blur-lg"
          : "bg-medical-gradient shadow-depth-2"
      )}
      variants={getVariants(navigationVariants)}
      initial="hidden"
      animate="visible"
      style={hasScrolled ? getGlassStyle("medical", 0.15) : {}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 lg:h-14">
          {/* Left Section: Intelligent Contact & Service Status */}
          <div className="flex items-center space-x-4">
            {/* Smart Contact Button - Priority #1 */}
            <SmartContactButton />

            {/* Service Status Indicator */}
            <motion.div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-white/90"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}>
              <motion.div
                className={clsx(
                  "w-2 h-2 rounded-full",
                  isEmergencyMode ? "bg-amber-400" : "bg-green-400"
                )}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-sm font-medium font-ubuntu">
                {isEmergencyMode ? "After Hours" : "Business Hours"}
              </span>
            </motion.div>
          </div>

          {/* Center Section: Clear Service Information */}
          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white/90">
              <svg
                className="w-4 h-4 fill-current text-blue-400"
                viewBox="0 0 512 512">
                <path d="M256 80C141.1 80 48 173.1 48 288V392c0 13.3-10.7 24-24 24s-24-10.7-24-24V288C0 146.6 114.6 32 256 32s256 114.6 256 256V392c0 13.3-10.7 24-24 24s-24-10.7-24-24V288c0-114.9-93.1-208-208-208zM80 352c0-35.3 28.7-64 64-64h16c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V352zm288-64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V320c0-17.7 14.3-32 32-32h16z" />
              </svg>
              <div className="text-sm">
                <div className="font-medium font-ubuntu">Dhanmondi-HO (24/7)</div>
                <div className="text-xs opacity-80"></div>
              </div>
            </div>

            <div className="h-6 w-px bg-white/20"></div>

            <Link
              to="/our-branches"
              className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors duration-200 font-ubuntu">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 512 512">
                <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
              </svg>
              <span>22+ Branch Locations</span>
            </Link>
          </motion.div>

          {/* Right Section: Quick Actions & Social */}
          <div className="flex items-center space-x-2">
            {/* Complaints Quick Access */}
            <motion.a
              href="https://complain.populardiagnostic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg glass-dark text-white/90 hover:text-white transition-all duration-200 hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512">
                <path d="M215.4 96H144 107.8 96v8.8V144v40.4 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3V96c0-26.5 21.5-48 48-48h76.6l49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48H416c26.5 0 48 21.5 48 48v44.3l22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4v-89V144 104.8 96H404.2 368 296.6 215.4zM0 448V242.1L217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1V448v0c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v0zM176 160H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
              </svg>
              <span className="text-sm font-medium">Support</span>
            </motion.a>

            {/* Social Media Icons */}
            <div className="hidden lg:flex items-center space-x-1 ml-4 border-l border-white/20 pl-4">
              <AnimatePresence>
                {!loading && (
                  <>
                    {socialLinks.facebook && (
                      <SocialIcon
                        href={socialLinks.facebook}
                        ariaLabel="Facebook">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 448 512"
                          fill="currentColor">
                          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                        </svg>
                      </SocialIcon>
                    )}

                    {socialLinks.youtube && (
                      <SocialIcon
                        href={socialLinks.youtube}
                        ariaLabel="YouTube">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 448 512"
                          fill="currentColor">
                          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                        </svg>
                      </SocialIcon>
                    )}

                    {socialLinks.linkedin && (
                      <SocialIcon
                        href={socialLinks.linkedin}
                        ariaLabel="LinkedIn">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 448 512"
                          fill="currentColor">
                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                        </svg>
                      </SocialIcon>
                    )}

                    {socialLinks.instagram && (
                      <SocialIcon
                        href={socialLinks.instagram}
                        ariaLabel="Instagram">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 448 512"
                          fill="currentColor">
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                      </SocialIcon>
                    )}
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Emergency Banner - Now Primary Emergency Indicator */}
      <AnimatePresence>
        {isEmergencyMode && (
          <motion.div
            className="lg:hidden bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 text-center py-3 border-b border-amber-200 shadow-sm"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}>
            <div className="flex items-center justify-center gap-3 px-4">
              <motion.div
                className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}>
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 512 512">
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
              </motion.div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-amber-900 font-ubuntu">
                  After Hours Emergency
                </div>
                <div className="text-xs text-amber-700">
                  24/7 medical assistance available
                </div>
              </div>
              <a
                href="tel:10636"
                className="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold text-sm hover:bg-amber-600 transition-colors duration-200 touch-manipulation">
                Call 10636
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Nav;
