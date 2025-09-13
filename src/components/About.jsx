import "@fontsource/ubuntu";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { API_TOKEN, BASE_URL } from "../secrets";

const ProjectCard = ({ image, name, designation }) => {
  return (
    <div className="glass-medical rounded-2xl sm:rounded-3xl w-full sm:w-[280px] lg:w-[299px] h-full shadow-depth-2 transition-all duration-500 hover-lift group touch-manipulation relative lg:hover:z-50 lg:hover:scale-110 lg:hover:shadow-depth-5 flex flex-col">
      {/* Image section - restored glassmorphism */}
      <div className="relative w-full overflow-hidden p-2 rounded-t-2xl sm:rounded-t-3xl flex-shrink-0">
        <img
          src={image}
          alt={`${name}&apos;s profile - ${designation}`}
          className="w-full h-72 bg-white sm:h-80 lg:h-[350px] object-cover object-top transition-all duration-500 group-hover:scale-105 rounded-2xl sm:rounded-3xl"
          loading="lazy"
          decoding="async"
          style={{ WebkitBackfaceVisibility: "hidden" }}
        />
        {/* Subtle overlay for better text readability on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-PDCL-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl m-2"></div>
        
        {/* Professional corner accent - visible on hover */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-PDCL-green-light rounded-full flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
      
      {/* Content section - restored glassmorphism transparency with flex-grow */}
      <div className="p-4 sm:p-6 lg:p-7 text-center flex-grow flex flex-col justify-center relative">
        <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-gray-900 font-bold font-ubuntu text-lg sm:text-xl lg:text-2xl mb-2 leading-tight group-hover:text-PDCL-green-light transition-colors duration-300">
            {name}
          </h3>
          <p className="text-gray-600 font-medium font-ubuntu text-sm sm:text-base leading-relaxed lg:group-hover:text-PDCL-green transition-colors duration-300">
            {designation}
          </p>
        </div>
        
        {/* Enhanced info badge - appears on hover for large screens */}
        <div className="mt-3 inline-flex items-center justify-center px-3 py-1 rounded-full bg-PDCL-green-light/10 text-PDCL-green-light text-xs font-medium opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
          Leadership Team
        </div>
        
        {/* Bottom accent line - enhanced on hover */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 lg:group-hover:w-16 h-1 bg-gradient-to-r from-PDCL-green-light to-PDCL-green rounded-full transition-all duration-300"></div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
};

const SkeletonLoader = () => (
  <div className="glass-medical rounded-2xl sm:rounded-3xl w-full sm:w-[280px] lg:w-[299px] h-full shadow-depth-1 animate-pulse flex flex-col">
    <div className="relative w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl flex-shrink-0">
      <div className="w-full h-72 sm:h-80 lg:h-[350px] bg-gray-200 p-2 rounded-2xl sm:rounded-3xl" />
    </div>
    <div className="p-4 sm:p-6 lg:p-7 text-center space-y-3 flex-grow flex flex-col justify-center">
      <div className="h-5 sm:h-6 bg-gray-200 rounded mx-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="w-full py-12 px-4 text-center">
    <div className="glass-medical rounded-2xl p-6 sm:p-8 max-w-md mx-auto border-l-4 border-red-400">
      <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-red-600 font-ubuntu text-base sm:text-lg font-medium leading-relaxed">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 touch-manipulation min-h-[44px]"
      >
        Try Again
      </button>
    </div>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const About = () => {
  const [managementData, setManagementData] = useState({
    row1: [],
    row2: [],
    row3: [],
    row4: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionsRef = useRef([]);

  // Mobile-first scroll animation observer with iOS optimizations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // iOS performance optimization
            entry.target.style.transform = 'translateZ(0)';
          }
        });
      },
      { 
        threshold: prefersReducedMotion ? 0.3 : 0.1, 
        rootMargin: '30px'
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [loading]); // Re-run when loading changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/management-team`, {
          params: {
            token: `${API_TOKEN}`,
          },
          timeout: 5000,
        });

        setManagementData({
          row1: response.data.data["Row - 1"]?.slice(0, 2) || [],
          row2: response.data.data["Row - 2"]?.slice(0, 3) || [],
          row3: response.data.data["Row - 3"]?.slice(0, 3) || [],
          row4: response.data.data["Row - 4"]?.slice(0, 5) || [],
        });
      } catch (err) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error("Failed to fetch management data:", err);
        }
        setError(
          "Failed to load management team data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderManagementRow = (teamMembers, key, rowIndex) => (
    <div
      key={key}
      className="scroll-fade px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto"
      ref={(el) => (sectionsRef.current[rowIndex] = el)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 justify-items-center items-start">
        {loading
          ? Array(teamMembers.length || 3)
              .fill()
              .map((_, i) => <SkeletonLoader key={`skeleton-${key}-${i}`} />)
          : teamMembers.map((member, index) => (
              <div 
                key={member._id} 
                className="w-full max-w-sm h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard {...member} />
              </div>
            ))}
      </div>
    </div>
  );

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen overflow-x-hidden">
      {/* Mobile-first hero section with iOS safe areas */}
      <section 
        className="relative pt-16 pb-8 px-4 sm:pt-20 sm:pb-12 md:pt-28 md:pb-16 lg:px-8 max-w-7xl mx-auto"
        style={{ paddingTop: "max(4rem, env(safe-area-inset-top))" }}
      >
        <div className="text-center max-w-4xl mx-auto scroll-fade" ref={(el) => (sectionsRef.current[0] = el)}>
          <h1 className="text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our{" "}
            <span className="text-PDCL-green-light bg-gradient-to-r from-PDCL-green-light to-PDCL-green bg-clip-text text-transparent">
              Leadership Team
            </span>
          </h1>
          <p className="text-lg leading-relaxed sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 font-light px-2 sm:px-0">
            Meet the visionary leaders driving healthcare excellence and innovation at Popular Diagnostic Centre Ltd.
          </p>
          
          {/* Leadership Philosophy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
            {[
              { 
                icon: "🎯", 
                title: "Visionary Leadership", 
                description: "Pioneering healthcare innovation since 1983"
              },
              { 
                icon: "🤝", 
                title: "Collaborative Excellence", 
                description: "United in our commitment to patient care"
              },
              { 
                icon: "🌟", 
                title: "Healthcare Innovation", 
                description: "Leading Bangladesh's diagnostic revolution"
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-4 sm:p-6 glass-medical rounded-2xl hover-lift group transition-all duration-300">
                <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-PDCL-green-light transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management rows with improved spacing and mobile-first design */}
      {renderManagementRow(managementData.row1, "row1", 1)}
      {renderManagementRow(managementData.row2, "row2", 2)}
      {renderManagementRow(managementData.row3, "row3", 3)}
      {renderManagementRow(managementData.row4, "row4", 4)}
      
      {/* Bottom spacing with iOS safe area */}
      <div style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }} />
    </div>
  );
};

About.displayName = 'About';

export default About;
