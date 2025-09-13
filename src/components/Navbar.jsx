import image from "../assets/logo1.webp";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  HeartIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useHoverDepth } from "../hooks/useHoverDepth";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useSmartNavigation } from "../hooks/useSmartNavigation";
import { 
  navigationVariants, 
  dropdownVariants, 
  menuItemVariants,
  getGlassStyle 
} from "../utils/3d-effects";
import clsx from "clsx";

// Enhanced NavLink with 3D effects and responsive design
const NavLink = ({ to, children, onClick, icon: Icon, description }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const hoverDepth = useHoverDepth({ maxRotation: 5, maxScale: 1.02 });

  return (
    <motion.div
      className="group"
      {...hoverDepth.motionProps}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}>
      <Link
        to={to}
        onClick={onClick}
        className={clsx(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 touch-manipulation",
          "group-hover:glass group-hover:shadow-depth-2 group-hover:-translate-y-0.5",
          "min-h-[48px] active:bg-PDCL-green/5", // Better touch target and active state
          isActive
            ? "bg-emerald-400/20 md:bg-PDCL-green/10 text-emerald-300 md:text-PDCL-green border border-emerald-400/30 md:border-PDCL-green/20"
            : "text-white/90 md:text-gray-700 hover:text-emerald-300 md:hover:text-PDCL-green hover:bg-white/10 md:hover:bg-transparent"
        )}
        style={{ WebkitTapHighlightColor: 'transparent' }}>
        {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
        <div className="flex-1 min-w-0">
          <div className="font-medium font-ubuntu text-base">{children}</div>
          {description && (
            <div className="text-sm text-white/70 md:text-gray-500 group-hover:text-white/80 md:group-hover:text-gray-600 transition-colors">
              {description}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

// Mega Menu Component
const MegaMenu = ({ isOpen, onClose, title, children }) => {
  const { prefersReducedMotion, getVariants } = useReducedMotion();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 w-80 sm:w-96 md:w-[520px] lg:w-[600px] z-[60] mt-2 mega-menu-dropdown"
          style={{
            ...getGlassStyle('light', 0.95)
          }}
          variants={getVariants(dropdownVariants)}
          initial="hidden"
          animate="visible"
          exit="exit">
          <div className="glass shadow-depth-4 rounded-2xl border border-white/20 backdrop-blur-xl">
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6 font-ubuntu">
                {title}
              </h3>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoverTimer, setHoverTimer] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);
  const location = useLocation();
  const { hasScrolled, isAtTop } = useScrollPosition();
  const { contextualActions, trackAction } = useSmartNavigation();
  const { prefersReducedMotion, getVariants } = useReducedMotion();

  // Measure navbar height for internal use
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        const height = navbarRef.current.offsetHeight;
        setNavbarHeight(height);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  // Smooth hover delay management
  const handleMouseEnter = (menu) => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // Slightly longer delay for better UX
    setHoverTimer(timer);
  };

  // Handle navigation container mouse leave
  const handleNavMouseLeave = () => {
    const timer = setTimeout(() => {
      setActiveMenu(null);
    }, 300); // Longer delay when leaving entire nav area
    setHoverTimer(timer);
  };

  // Menu configuration with intelligent grouping
  const menuConfig = {
    services: {
      title: 'Services & Tests',
      items: [
        {
          to: '/health',
          title: 'Health Packages',
          description: 'Comprehensive health checkups',
          icon: HeartIcon,
          featured: true
        },
        {
          href: 'https://docs.google.com/forms/d/e/1FAIpQLSfnFAHgePOjueWSh2mAoPOuyCjw93Iwdp7jwK7vHvzvVIWxJw/viewform',
          title: 'Home Collection',
          description: 'Sample collection at your doorstep',
          external: true
        }
      ]
    },
    care: {
      title: 'Find Care',
      items: [
        {
          to: '/our-doctors',
          title: 'Find a Doctor',
          description: 'Expert specialists across all fields',
          icon: UserIcon,
          featured: true
        },
        {
          to: '/our-branches',
          title: 'Our Branches',
          description: '22+ locations across Bangladesh',
          icon: BuildingOfficeIcon,
          featured: true
        },
        {
          to: '/hotlines',
          title: 'Emergency Hotlines',
          description: '24/7 emergency support',
          icon: PhoneIcon
        }
      ]
    },
    about: {
      title: 'About PDCL',
      items: [
        {
          to: '/goals',
          title: 'Our Mission',
          description: 'Objectives & Goals'
        },
        {
          to: '/chairman',
          title: 'Chairman\'s Message',
          description: 'Leadership vision'
        },
        {
          to: '/director',
          title: 'Managing Director',
          description: 'Executive message'
        },
        {
          to: '/dmd',
          title: 'Deputy MD',
          description: 'Leadership insights'
        },
        {
          to: '/about',
          title: 'Management Team',
          description: 'Our leadership'
        },
        {
          to: '/tech',
          title: 'Our Technologies',
          description: 'Advanced medical equipment'
        },
        {
          to: '/gallery',
          title: 'Photo Gallery',
          description: 'Facilities & events'
        },
        {
          to: '/video',
          title: 'Corporate Videos',
          description: 'Learn more about us'
        },
        {
          to: '/notice',
          title: 'Notices',
          description: 'Latest announcements'
        }
      ]
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        ref={navbarRef}
        className={clsx(
          "sticky top-0 z-40 transition-all duration-300", 
          hasScrolled
            ? "glass shadow-depth-3 backdrop-blur-xl"
            : "bg-white shadow-depth-2"
        )}
        style={{ 
          ...(hasScrolled ? getGlassStyle('light', 0.9) : {})
        }}
        variants={getVariants(navigationVariants)}
        initial="hidden"
        animate="visible">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            
            {/* Logo with 3D hover effect */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              className="perspective-1000">
              <Link to="/" className="flex items-center">
                <img
                  src={image}
                  alt="Popular Diagnostic Centre"
                  className="w-12 h-12 lg:w-14 lg:h-14 object-contain hover-lift"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation - Now shows from 768px+ for 720p desktop users */}
            <nav className="hidden md:flex items-center space-x-2 relative"
                 role="navigation" 
                 aria-label="Main navigation"
                 onMouseLeave={handleNavMouseLeave}>
              
              {/* Services Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={(e) => {
                  // Don't close if moving to dropdown
                  const rect = e.currentTarget.getBoundingClientRect();
                  const dropdown = e.currentTarget.querySelector('.mega-menu-dropdown');
                  if (dropdown) {
                    const dropdownRect = dropdown.getBoundingClientRect();
                    if (e.clientY >= rect.bottom && e.clientY <= dropdownRect.bottom) {
                      return; // Don't close, moving to dropdown
                    }
                  }
                  handleMouseLeave();
                }}>
                <motion.button
                  className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 text-gray-700 hover:text-PDCL-green font-medium rounded-lg hover:glass transition-all duration-200 font-ubuntu"
                  whileHover={{ scale: 1.02 }}>
                  <HeartIcon className="w-4 h-4" />
                  Services
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.button>
                
                <MegaMenu
                  isOpen={activeMenu === 'services'}
                  onClose={() => setActiveMenu(null)}
                  title={menuConfig.services.title}>
                  <div className="grid grid-cols-1 gap-4">
                    {menuConfig.services.items.map((item, index) => (
                      <motion.div
                        key={item.to || item.href}
                        custom={index}
                        variants={getVariants(menuItemVariants)}
                        initial="hidden"
                        animate="visible">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackAction('external-link', 'services')}
                            className={clsx(
                              "flex items-center gap-3 p-4 rounded-xl transition-all duration-200",
                              "hover:glass hover:shadow-depth-2 hover:-translate-y-0.5",
                              item.featured && "border border-PDCL-green/20 bg-PDCL-green/5"
                            )}>
                            {item.icon && <item.icon className="w-6 h-6 text-PDCL-green" />}
                            <div>
                              <div className="font-medium text-gray-900 font-ubuntu">{item.title}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                          </a>
                        ) : (
                          <NavLink
                            to={item.to}
                            icon={item.icon}
                            description={item.description}
                            onClick={() => {
                              setActiveMenu(null);
                              trackAction(item.to, 'services');
                            }}>
                            {item.title}
                          </NavLink>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </MegaMenu>
              </div>

              {/* Find Care Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('care')}
                onMouseLeave={(e) => {
                  // Don't close if moving to dropdown
                  const rect = e.currentTarget.getBoundingClientRect();
                  const dropdown = e.currentTarget.querySelector('.mega-menu-dropdown');
                  if (dropdown) {
                    const dropdownRect = dropdown.getBoundingClientRect();
                    if (e.clientY >= rect.bottom && e.clientY <= dropdownRect.bottom) {
                      return; // Don't close, moving to dropdown
                    }
                  }
                  handleMouseLeave();
                }}>
                <motion.button
                  className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 text-gray-700 hover:text-PDCL-green font-medium rounded-lg hover:glass transition-all duration-200 font-ubuntu"
                  whileHover={{ scale: 1.02 }}>
                  <BuildingOfficeIcon className="w-4 h-4" />
                  Find Care
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.button>
                
                <MegaMenu
                  isOpen={activeMenu === 'care'}
                  onClose={() => setActiveMenu(null)}
                  title={menuConfig.care.title}>
                  <div className="grid grid-cols-1 gap-4">
                    {menuConfig.care.items.map((item, index) => (
                      <motion.div
                        key={item.to}
                        custom={index}
                        variants={getVariants(menuItemVariants)}
                        initial="hidden"
                        animate="visible">
                        <NavLink
                          to={item.to}
                          icon={item.icon}
                          description={item.description}
                          onClick={() => {
                            setActiveMenu(null);
                            trackAction(item.to, 'care');
                          }}>
                          {item.title}
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                </MegaMenu>
              </div>

              {/* About Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={(e) => {
                  // Don't close if moving to dropdown
                  const rect = e.currentTarget.getBoundingClientRect();
                  const dropdown = e.currentTarget.querySelector('.mega-menu-dropdown');
                  if (dropdown) {
                    const dropdownRect = dropdown.getBoundingClientRect();
                    if (e.clientY >= rect.bottom && e.clientY <= dropdownRect.bottom) {
                      return; // Don't close, moving to dropdown
                    }
                  }
                  handleMouseLeave();
                }}>
                <motion.button
                  className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 text-gray-700 hover:text-PDCL-green font-medium rounded-lg hover:glass transition-all duration-200 font-ubuntu"
                  whileHover={{ scale: 1.02 }}>
                  About
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.button>
                
                <MegaMenu
                  isOpen={activeMenu === 'about'}
                  onClose={() => setActiveMenu(null)}
                  title={menuConfig.about.title}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuConfig.about.items.map((item, index) => (
                      <motion.div
                        key={item.to}
                        custom={index}
                        variants={getVariants(menuItemVariants)}
                        initial="hidden"
                        animate="visible">
                        <NavLink
                          to={item.to}
                          description={item.description}
                          onClick={() => {
                            setActiveMenu(null);
                            trackAction(item.to, 'about');
                          }}>
                          {item.title}
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                </MegaMenu>
              </div>

              {/* Report Download Link with Animated Border */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <div className="relative p-0.5 rounded-lg overflow-hidden group">
                  {/* Animated Border Background */}
                  <div 
                    className="absolute inset-0 rounded-lg border-animation"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 270deg, #006642 300deg, #00984a 330deg, transparent 360deg)',
                      animation: 'borderSpin 3s linear infinite'
                    }}
                  />
                  {/* Button Content */}
                  <Link
                    to="/patient_portal"
                    onClick={() => trackAction('/patient_portal', 'primary')}
                    className="relative flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 text-gray-700 font-medium rounded-lg hover:text-PDCL-green hover:bg-white/80 hover:backdrop-blur-md transition-all duration-300 font-ubuntu bg-white"
                    aria-label="Download medical reports">
                    <ArrowDownTrayIcon className="w-4 h-4 text-PDCL-green stroke-2" />
                    Report Download
                  </Link>
                </div>
              </motion.div>

              {/* Contact Link */}
              <NavLink to="/contact-us" onClick={() => trackAction('/contact-us', 'primary')}>
                Contact
              </NavLink>
            </nav>

            {/* Right Section: Support Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Support Button - Desktop Only */}
              <motion.a
                href="https://complain.populardiagnostic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg glass-dark text-gray-700 hover:text-PDCL-green transition-all duration-200 hover-lift"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512">
                  <path d="M215.4 96H144 107.8 96v8.8V144v40.4 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3V96c0-26.5 21.5-48 48-48h76.6l49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48H416c26.5 0 48 21.5 48 48v44.3l22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4v-89V144 104.8 96H404.2 368 296.6 215.4zM0 448V242.1L217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1V448v0c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v0zM176 160H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                </svg>
                <span className="text-sm font-medium font-ubuntu">Support</span>
              </motion.a>

              {/* Mobile Report Download Icon Button */}
              <motion.div 
                className="md:hidden"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}>
                <div className="relative p-0.5 rounded-xl overflow-hidden">
                  {/* Animated Border Background */}
                  <div 
                    className="absolute inset-0 rounded-xl border-animation"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 270deg, #006642 300deg, #00984a 330deg, transparent 360deg)',
                      animation: 'borderSpin 3s linear infinite'
                    }}
                  />
                  {/* Icon Button Content */}
                  <Link
                    to="/patient_portal"
                    onClick={() => trackAction('/patient_portal', 'mobile')}
                    className="relative flex items-center justify-center p-3 text-gray-700 hover:text-white font-medium rounded-xl hover:bg-black/30 hover:backdrop-blur-md transition-all duration-300 bg-white touch-manipulation"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                    aria-label="Download medical reports">
                    <ArrowDownTrayIcon className="w-5 h-5 text-PDCL-green" />
                  </Link>
                </div>
              </motion.div>

              {/* Mobile Menu Button - Enhanced for Touch */}
              <motion.button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-3 rounded-xl glass-dark text-gray-700 hover:text-PDCL-green transition-colors duration-200 touch-manipulation"
                style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target minimum
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open mobile menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu">
                <Bars3Icon className="h-6 w-6 mx-auto" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Modal */}
      <Transition appear show={mobileOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[100] md:hidden"
          onClose={setMobileOpen}
          id="mobile-menu"
          aria-labelledby="mobile-menu-title">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-end p-2 sm:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden glass rounded-2xl shadow-depth-5 transition-all max-h-screen">
                  
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                    <div className="flex items-center gap-3">
                      <img src={image} alt="PDCL" className="w-10 h-10 object-contain rounded-lg border-2 border-white/80 bg-white p-1 shadow-sm" />
                      <h2 id="mobile-menu-title" className="text-lg font-semibold text-white font-ubuntu">
                        Menu
                      </h2>
                    </div>
                    <motion.button
                      className="p-3 rounded-xl glass-dark text-white/80 hover:text-white touch-manipulation"
                      style={{ minWidth: '44px', minHeight: '44px' }}
                      onClick={() => setMobileOpen(false)}
                      whileHover={{ scale: 1.05, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Close mobile menu">
                      <XMarkIcon className="h-5 w-5 mx-auto" />
                    </motion.button>
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="p-4 sm:p-6 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain"
                       style={{ scrollbarWidth: 'thin' }}>
                    
                    {/* Primary Actions */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white font-ubuntu">Quick Actions</h3>
                      
                      <NavLink 
                        to="/patient_portal" 
                        onClick={() => setMobileOpen(false)}
                        icon={UserIcon}
                        description="Download reports from your visited branch">
                        Report Download
                      </NavLink>
                      
                      <NavLink 
                        to="/our-doctors" 
                        onClick={() => setMobileOpen(false)}
                        icon={UserIcon}
                        description="Find expert specialists">
                        Find a Doctor
                      </NavLink>
                      
                      <NavLink 
                        to="/health" 
                        onClick={() => setMobileOpen(false)}
                        icon={HeartIcon}
                        description="Comprehensive health checkups">
                        Health Packages
                      </NavLink>
                    </div>

                    {/* Services Section */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white font-ubuntu">Services</h3>
                      
                      <NavLink 
                        to="/our-branches" 
                        onClick={() => setMobileOpen(false)}
                        icon={BuildingOfficeIcon}
                        description="22+ locations">
                        Our Branches
                      </NavLink>
                      
                      <motion.a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfnFAHgePOjueWSh2mAoPOuyCjw93Iwdp7jwK7vHvzvVIWxJw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl glass hover:shadow-depth-2 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}>
                        <svg className="w-5 h-5 text-emerald-300" viewBox="0 0 512 512" fill="currentColor">
                          <path d="M0 64C0 46.3 14.3 32 32 32H88h48 56c17.7 0 32 14.3 32 32s-14.3 32-32 32V400c0 44.2-35.8 80-80 80s-80-35.8-80-80V96C14.3 96 0 81.7 0 64zM136 96H88V256h48V96zM288 64c0-17.7 14.3-32 32-32h56 48 56c17.7 0 32 14.3 32 32s-14.3 32-32 32V400c0 44.2-35.8 80-80 80s-80-35.8-80-80V96c-17.7 0-32-14.3-32-32zM424 96H376V256h48V96z"/>
                        </svg>
                        <div>
                          <div className="font-medium text-white font-ubuntu">Home Collection</div>
                          <div className="text-sm text-white/70">Sample collection at your doorstep</div>
                        </div>
                      </motion.a>
                    </div>

                    {/* About Section - Accordion Style */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white font-ubuntu">About PDCL</h3>
                      
                      <div className="space-y-2">
                        {[
                          { to: '/goals', title: 'Our Mission' },
                          { to: '/chairman', title: "Chairman's Message" },
                          { to: '/director', title: 'Managing Director' },
                          { to: '/dmd', title: 'Deputy MD' },
                          { to: '/about', title: 'Management Team' },
                          { to: '/tech', title: 'Our Technologies' },
                          { to: '/gallery', title: 'Photo Gallery' },
                          { to: '/video', title: 'Corporate Videos' },
                          { to: '/notice', title: 'Notices' }
                        ].map((item, index) => (
                          <motion.div
                            key={item.to}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}>
                            <Link
                              to={item.to}
                              onClick={() => setMobileOpen(false)}
                              className="block px-4 py-2 text-white/90 hover:text-emerald-300 hover:bg-white/10 rounded-lg transition-all duration-200 font-ubuntu">
                              {item.title}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-3 border-t border-white/20 pt-6">
                      <NavLink 
                        to="/contact-us" 
                        onClick={() => setMobileOpen(false)}
                        description="Get in touch with us">
                        Contact Us
                      </NavLink>
                      
                      <NavLink 
                        to="/complain" 
                        onClick={() => setMobileOpen(false)}
                        description="Feedback & suggestions">
                        Complain and Advise
                      </NavLink>
                    </div>

                    {/* Emergency Contact - Enhanced */}
                    <motion.a 
                      href="tel:10636"
                      className="block glass-medical rounded-xl p-4 border border-PDCL-green/20 hover:border-PDCL-green/40 transition-all duration-200 touch-manipulation"
                      style={{ minHeight: '64px' }}
                      animate={{ scale: [1, 1.01, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      whileTap={{ scale: 0.98 }}>
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="flex-shrink-0 w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 10 }}>
                          <PhoneIcon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="font-semibold text-emerald-300 font-ubuntu text-base">Emergency Hotline</div>
                          <div className="text-sm text-white/80">10636 - Available 24/7</div>
                        </div>
                        <div className="text-xs text-emerald-300 font-medium">
                          TAP TO CALL
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
