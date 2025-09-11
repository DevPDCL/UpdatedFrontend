import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "@fontsource/ubuntu";
import axios from "axios";
import { API_TOKEN, BASE_URL } from "../secrets";
import { getGlassStyle } from "../utils/3d-effects";
import clsx from "clsx";

const Nav = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showContactOptions, setShowContactOptions] = useState(false);
  const navRef = useRef(null);


  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Check if it's after-hours for enhanced emergency service indication
  // Business hours: 7 AM to 11 PM, 7 days a week
  useEffect(() => {
    const hour = currentTime.getHours();
    setIsEmergencyMode(hour < 7 || hour >= 23);
  }, [currentTime]);


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
        // Silently handle social links fetch error
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  // Social media icon components for better reusability
  const SocialIcon = ({ href, ariaLabel, children, className = "" }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={clsx(
        "p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors",
        className
      )}>
      {children}
    </a>
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

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getContactMessage = () => {
      // During emergency mode, emphasize that emergency line is primary option
      // while branches are mostly closed
      if (isEmergencyMode) {
        return {
          primary: "Emergency & Contact Info",
          icon: "🚨"
        };
      }
      return {
        primary: "Branch Contacts & Help",
        icon: "📞"
      };
    };

    const { primary } = getContactMessage();

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowContactOptions(!showContactOptions)}
          className={clsx(
            "relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "font-semibold text-sm transition-all duration-200 cursor-pointer",
            isEmergencyMode
              ? "bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 border border-gray-200"
              : "bg-PDCL-green text-white shadow-medical hover:shadow-lg hover:bg-PDCL-green-dark"
          )}
          aria-label={primary}
          aria-expanded={showContactOptions}>
          
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 512 512">
            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
          </svg>
          
          <span className="font-ubuntu whitespace-nowrap">{primary}</span>
        </button>

        {/* Smart Contact Options Dropdown */}
        {showContactOptions && (
          <div
            className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-sm shadow-lg rounded-xl border border-white/20 p-4 z-[55]"
            style={getGlassStyle('light', 0.95)}>
            
            <h3 className="text-sm font-semibold text-gray-900 mb-3 font-ubuntu">
              {isEmergencyMode ? "Emergency Care & Contact Options" : "How can we help you?"}
            </h3>
            
            {/* After-hours notice */}
            {isEmergencyMode && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.5 7.3 27.7 0 40.2S480.4 480 466.2 480H45.8c-14.2 0-27.3-7.5-34.5-19.8s-7.2-27.7 0-40.2l216-368C234.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
                  </svg>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-amber-900 font-ubuntu">After Business Hours</div>
                    <div className="text-xs text-amber-700 mt-1">
                      Most branches are closed. Only <strong>Dhanmondi Head Office</strong> and the <strong>Emergency Hotline (10636)</strong> are available 24/7.
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Emergency Contact */}
            <a
              href="tel:10636"
              className="block p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-PDCL-green/20 mb-3 hover:border-PDCL-green/40 transition-all duration-200 group touch-manipulation"
              style={{ minHeight: '64px' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-PDCL-green rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-PDCL-green text-base font-ubuntu">
                    {isEmergencyMode ? "Emergency Hotline (24/7)" : "Emergency / Urgent Care"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isEmergencyMode 
                      ? "Always available • Dhanmondi Head Office" 
                      : "Call 10636 • Available 24/7 • Head Office"
                    }
                  </div>
                </div>
                <div className="text-xs text-PDCL-green font-medium">
                  TAP TO CALL
                </div>
              </div>
            </a>

            {/* Branch Contact */}
            <div
              className={clsx(
                "p-4 rounded-lg border group",
                isEmergencyMode 
                  ? "bg-gray-50/80 border-gray-300" 
                  : "bg-white/50 border-gray-200"
              )}
              style={{ minHeight: '64px' }}>
              <div className="flex items-center gap-3">
                <div className={clsx(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  isEmergencyMode ? "bg-gray-400" : "bg-blue-500"
                )}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className={clsx(
                    "font-semibold text-base font-ubuntu",
                    isEmergencyMode ? "text-gray-600" : "text-gray-900"
                  )}>
                    {isEmergencyMode ? "Branch Contacts (Limited)" : "Schedule Visit / Routine Care"}
                  </div>
                  <div className={clsx(
                    "text-sm mb-3",
                    isEmergencyMode ? "text-gray-500" : "text-gray-600"
                  )}>
                    {isEmergencyMode 
                      ? "Most branches closed • Only Dhanmondi-HO open 24/7" 
                      : "Contact your preferred branch • Business hours only"
                    }
                  </div>
                  <Link 
                    to="/hotlines"
                    className={clsx(
                      "inline-flex items-center gap-1 px-3 py-1.5 text-white text-xs rounded-md transition-colors duration-200 touch-manipulation",
                      isEmergencyMode 
                        ? "bg-gray-500 hover:bg-gray-600" 
                        : "bg-PDCL-green hover:bg-PDCL-green-dark"
                    )}
                    onClick={() => setShowContactOptions(false)}>
                    <span>View All Branch Contacts</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Helper text */}
            <div className="text-xs text-gray-500 mt-3 text-center">
              {isEmergencyMode 
                ? "Emergency line (10636) is always available. Most branch contacts are closed until 7 AM." 
                : "Need help choosing? Emergency line (10636) can redirect you to the right branch."
              }
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav ref={navRef} className="relative z-50 bg-medical-gradient shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[44px] py-1.5">
          {/* Left Section: Intelligent Contact & Service Status */}
          <div className="flex items-center space-x-2">
            {/* Dhanmondi Emergency Button - Priority #1 */}
            <a
              href="tel:10636"
              className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-white/90 hover:bg-white/20 transition-colors cursor-pointer group">
              <svg
                className="w-3 h-3 fill-current text-green-400 group-hover:text-green-300"
                viewBox="0 0 512 512">
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              <span className="text-xs font-ubuntu group-hover:text-white">
                Dhanmondi-HO: <span className="text-sm font-bold">10636</span>{" "}
                (24/7)
              </span>
            </a>

            {/* Service Status Indicator */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-white/90">
              <div
                className={clsx(
                  "w-2 h-2 rounded-full",
                  isEmergencyMode ? "bg-amber-400" : "bg-green-400"
                )}
              />
              <span className="text-xs font-medium font-ubuntu">
                {isEmergencyMode ? "After Hours" : "Business Hours"}
              </span>
            </div>
          </div>

          {/* Center Section: Clear Service Information */}
          <div className="flex items-center gap-3">
            {/* Smart Contact Button */}

            <SmartContactButton />

            <div className="hidden md:flex">
              <div className="h-4 w-px bg-white/20"></div>

              <Link
                to="/our-branches"
                className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors font-ubuntu">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 512 512">
                  <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
                </svg>
                <span>22+ Branches</span>
              </Link>
            </div>
          </div>

          {/* Right Section: Social Media */}
          <div className="flex items-center">
            {/* Social Media Icons */}
            <div className="hidden md:flex items-center space-x-1.5">
              {!loading && (
                <>
                  {socialLinks.facebook && (
                    <SocialIcon
                      href={socialLinks.facebook}
                      ariaLabel="Facebook">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 448 512"
                        fill="currentColor">
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                      </svg>
                    </SocialIcon>
                  )}
                  {socialLinks.youtube && (
                    <SocialIcon href={socialLinks.youtube} ariaLabel="YouTube">
                      <svg
                        className="w-3 h-3"
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
                        className="w-3 h-3"
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
                        className="w-3 h-3"
                        viewBox="0 0 448 512"
                        fill="currentColor">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </SocialIcon>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner - Responsive Design */}
      {isEmergencyMode && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 py-1.5 border-b border-amber-200">
          <div className="flex items-center justify-center gap-3 px-4">
            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 512 512">
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
            </div>

            {/* Mobile: Two lines, Desktop: One line */}
            <div className="flex-1 text-left lg:text-center">
              {/* Mobile Layout */}
              <div className="lg:hidden">
                <div className="font-medium text-amber-900 font-ubuntu text-sm">
                  After Hours • Emergency Available
                </div>
                <div className="text-xs text-amber-700">
                  Most branches closed • Emergency line always open
                </div>
              </div>

              {/* Desktop Layout - Single Line */}
              <div className="hidden lg:block">
                <span className="font-medium text-amber-900 font-ubuntu text-sm">
                  🚨 After Hours: Most branches closed • Only{" "}
                  <strong>Dhanmondi HO</strong> &{" "}
                  <strong>Emergency Hotline (10636)</strong> available 24/7
                </span>
              </div>
            </div>

            <a
              href="tel:10636"
              className="px-2.5 py-1 bg-amber-500 text-white rounded text-sm hover:bg-amber-600 transition-colors font-ubuntu font-medium">
              Call 10636
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
