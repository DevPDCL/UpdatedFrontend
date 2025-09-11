import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { logo } from "../assets";
import { healthPakage } from "../constants";
import video from "../assets/contactsResized.mp4";
import { styles } from "../styles";
import "@fontsource/ubuntu";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { BASE_URL, API_TOKEN } from "../secrets";


const Counter = ({ n, suffix = "", suffixExt = "" }) => {
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, []);

  const { number } = useSpring({
    from: { number: 0 },
    number: isVisible ? n : 0,
    delay: 500,
    config: { mass: 1, tension: 10, friction: 10 },
  });

  return (
    <div ref={countRef} className="flex items-center justify-start">
      <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
      {suffix && <span>{suffix}</span>}
      {suffixExt && (
        <span className="text-[20px] text-gray-400 ml-1">{suffixExt}</span>
      )}
    </div>
  );
};

const StatCard = ({ icon, value, label, suffix = "", suffixExt = "" }) => {
  const ariaLabel = `${value}${suffix}${suffixExt} ${label}`;
  
  return (
    <div
      className="relative p-3 sm:p-4 lg:p-6 items-center flex flex-row justify-start gap-3 sm:gap-4 hover:scale-105 transition-all duration-500 group min-h-[100px] sm:min-h-[120px] bg-gradient-to-t from-PDCL-green/10 via-white/60 to-transparent backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-[#00984a] focus-within:ring-offset-2 overflow-hidden"
      role="region"
      aria-label={ariaLabel}
      tabIndex="0">
      {/* Animated background shimmer */}
      <div className="absolute inset-0 stat-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-PDCL-green/20 via-PDCL-green-light/20 to-PDCL-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 rounded-full p-2 sm:p-3 lg:p-4 border-2 border-dashed border-gray-400 group-hover:border-gray-600 hover:scale-105 group-hover:bg-gray-600 transition-all duration-500 flex-shrink-0">
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 fill-gray-600 group-hover:fill-gray-200 group-hover:-rotate-12 transition-all duration-500 icon-color-shift"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path d={icon} />
        </svg>
      </div>

      <div className="relative z-10 text-left flex-1 min-w-0">
        <h2 className="text-gray-700 group-hover:text-PDCL-green font-bold font-ubuntu text-lg sm:text-2xl lg:text-3xl xl:text-4xl leading-tight transition-colors duration-300 stat-pulse">
          <Counter n={value} suffix={suffix} suffixExt={suffixExt} />
        </h2>
        <p className="text-gray-600 group-hover:text-gray-800 font-semibold font-ubuntu text-xs sm:text-sm lg:text-base mt-0.5 sm:mt-1 leading-snug transition-colors duration-300">
          {label}
        </p>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-PDCL-green/5 via-PDCL-green-light/5 to-PDCL-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

const ProjectCard = ({ name, description, video, source_code_link, link }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <article className="h-full flex" ref={cardRef}>
      <div className="h-full flex flex-col bg-gradient-to-b from-[#F5FFFA]/0 to-[#f0fff0]/60 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-full focus-within:outline-none focus-within:ring-2 focus-within:ring-[#00984a] focus-within:ring-offset-2">
        <div className="relative w-full aspect-video bg-gray-100">
          {isVisible && (
            <>
              <video
                src={video}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isVideoLoaded ? 'opacity-90' : 'opacity-0'
                }`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onCanPlay={() => setIsVideoLoaded(true)}
                aria-label={`${name} demonstration video`}
              />
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F5FFFA] to-[#f0fff0]" role="status" aria-label="Loading video">
                  <div className="animate-pulse" aria-hidden="true">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/>
                    </svg>
                  </div>
                  <span className="sr-only">Loading video content</span>
                </div>
              )}
            </>
          )}
          <div className="absolute inset-0 flex justify-end p-2">
            <button
              onClick={() => window.open(source_code_link, "_blank")}
              className="green-gradient w-11 h-11 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#00984a] focus:ring-offset-2 min-w-[44px] min-h-[44px]"
              aria-label={`View source for ${name}`}>
              <img
                src={logo}
                alt=""
                className="w-1/2 h-1/2 object-contain"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col p-5 flex-grow">
          <h3 className="text-gray-900 font-semibold font-ubuntu text-xl mb-2 leading-tight">
            {name}
          </h3>
          <p className="text-gray-600 font-medium font-ubuntu text-base mb-4 flex-grow leading-relaxed">
            {description}
          </p>
          <div>
            <button
              onClick={() => window.open(link, "_blank")}
              className="inline-flex items-center text-gray-600 font-ubuntu font-medium transition-all duration-200 hover:text-[#00984a] focus:outline-none focus:ring-2 focus:ring-[#00984a] focus:ring-offset-2 rounded px-3 py-2 min-h-[44px] min-w-[44px] justify-center sm:justify-start">
              View More
              <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const EmergencyBanner = () => {
  return (
    <div className="w-full h-[300px] sm:h-[350px] lg:h-[400px] mt-16 sm:mt-20 pt-16 sm:pt-20 relative">
      <video
        className="w-full h-full object-cover object-top absolute top-0 left-0"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 left-0 bg-[#00984a]/70" />
      <div
        className={`${styles.paddingX} absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4`}>
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-ubuntu font-bold mb-3 sm:mb-4 leading-tight">
          Do you need Emergency Medical Care? <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>Call @ 10636
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-medium mb-4 sm:mb-6 leading-relaxed max-w-lg">
          or 09666 787801. You can also reach us by the <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>email: info@populardiagnostic.com
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <a
            href="tel:10636"
            className="bg-white text-[#00984a] border rounded px-4 py-3 sm:px-6 sm:py-3 sm:m-2 hover:bg-[#00984a] hover:text-white transition duration-300 font-medium min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00984a]">
            <FaPhoneAlt className="mr-2" />
            Call Now
          </a>
          <Link
            to="/hotlines"
            className="bg-transparent border border-white text-white rounded px-4 py-3 sm:px-6 sm:py-3 sm:m-2 hover:bg-white hover:text-[#00984a] transition duration-300 font-medium min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00984a]">
            <MdLocalHospital className="mr-2" />
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

const HomeContent = () => {


  const [branchData, setBranchData] = useState({
    totalBranches: 0,
    totalUnits: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/branches?token=${API_TOKEN}`
        );

        if (data?.success) {
          let totalUnits = 0;
          data.data.data.forEach((branch) => {
            const unitMatch = branch.name.match(/\(U\d+(?:,\s*U\d+)*\)/g);
            if (unitMatch) {
              unitMatch.forEach((match) => {
                totalUnits += (match.match(/U\d+/g) || []).length;
              });
            } else {
              totalUnits += 1;
            }
          });

          setBranchData({
            totalBranches: data.data.data.length,
            totalUnits,
            loading: false,
            error: null,
          });
        } else {
          throw new Error("Failed to fetch branches");
        }
      } catch (err) {
        setBranchData((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    };

    fetchBranchData();
  }, []);


  const stats = [
    {
      icon: "M192 48c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V512H368V432c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H192V48zM48 96H160V512H48c-26.5 0-48-21.5-48-48V320H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V224H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V144c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v48H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80V464c0 26.5-21.5 48-48 48H480V96H592zM312 64c-8.8 0-16 7.2-16 16v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V152h24c8.8 0 16-7.2 16-16V120c0-8.8-7.2-16-16-16H344V80c0-8.8-7.2-16-16-16H312z",
      value: branchData.loading ? 0 : branchData.totalBranches,
      label: "BRANCHES",
    },
    {
      icon: "M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z",
      value: branchData.loading ? 0 : branchData.totalUnits,
      label: "UNITS",
    },
        {
      icon: "M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96v32V480H384V128 96 56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM96 96h24C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H96V96zM416 480h32c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H416V480zM224 208c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H288v48c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V320H176c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h48V208z",
      value: 3,
      label: "SERVICES",
      suffix: "K+",
    },
    {
      icon: "M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z",
      value: 42,
      label: "YEARS EXPERIENCE",
      suffix: "+",
    },
    {
      icon: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zm53.5-96.7l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z",
      value: 10,
      label: "HAPPY PATIENTS",
      suffix: "M+",
      suffixExt: "/YR",
    },
  ];

  return (
    <main className="relative pt-20 fontFamily-ubuntu" role="main">
      <section className="overflow-hidden mt-[-140px] py-24 sm:py-32" aria-label="Hospital statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center py-6 gap-6">
            {/* Mobile/Tablet: 2 columns, Desktop: 3+2 rows layout */}
            <div className="grid grid-cols-2 lg:hidden gap-3 sm:gap-6 w-full max-w-2xl mx-auto justify-items-center" role="region" aria-label="Key statistics about Popular Diagnostic Centre">
              {stats.map((stat, index) => {
                const delayClass = index > 0 ? `stat-card-entrance-delay-${index}` : '';
                return (
                  <div key={index} className={`w-full stat-card-entrance ${delayClass} opacity-0`}>
                    <StatCard {...stat} />
                  </div>
                );
              })}
            </div>

            {/* Desktop only: Original 3+2 layout */}
            <div className="hidden lg:flex flex-col gap-6">
              {/* First row - 3 cards */}
              <div className="grid grid-cols-3 gap-8 w-full max-w-4xl mx-auto justify-items-center" role="region" aria-label="Key statistics about Popular Diagnostic Centre - First row">
                {stats.slice(0, 3).map((stat, index) => {
                  const delayClass = index > 0 ? `stat-card-entrance-delay-${index}` : '';
                  return (
                    <div key={index} className={`w-full stat-card-entrance ${delayClass} opacity-0`}>
                      <StatCard {...stat} />
                    </div>
                  );
                })}
              </div>
              
              {/* Second row - 2 cards (centered) */}
              <div className="grid grid-cols-2 gap-8 w-full max-w-2xl mx-auto justify-items-center" role="region" aria-label="Key statistics about Popular Diagnostic Centre - Second row">
                {stats.slice(3, 5).map((stat, index) => {
                  const delayClass = `stat-card-entrance-delay-${index + 3}`;
                  return (
                    <div key={index + 3} className={`w-full stat-card-entrance ${delayClass} opacity-0`}>
                      <StatCard {...stat} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col mx-auto max-w-7xl" aria-label="Health packages">
        <h2 className="sr-only">Health Packages and Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 -mt-20" role="region" aria-label="Available health packages">
          {healthPakage.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      <section aria-label="Emergency contact information">
        <EmergencyBanner />
      </section>
    </main>
  );
};

export default HomeContent;
