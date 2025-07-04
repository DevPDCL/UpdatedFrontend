import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { logo } from "../assets";
import { healthPakage } from "../constants";
import video from "../assets/contacts.mp4";
import { styles } from "../styles";
import "@fontsource/ubuntu";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { BASE_URL } from "../secrets";


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
    <div ref={countRef} className="flex items-center justify-center">
      <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
      {suffix && <span>{suffix}</span>}
      {suffixExt && (
        <span className="text-[20px] text-gray-400 ml-1">{suffixExt}</span>
      )}
    </div>
  );
};

const StatCard = ({ icon, value, label, suffix = "", suffixExt = "" }) => {
  return (
    <div className="p-5 items-center flex flex-row gap-5 mx-auto text-center hover:scale-110 transition duration-500 group">
      <div className="rounded-full p-3 border-2 border-dashed border-gray-600 hover:scale-110 group-hover:bg-gray-600 transition duration-500">
        <svg
          className="w-[40px] h-[60px] fill-gray-600 group-hover:fill-white group-hover:-rotate-12 transition duration-500"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg">
          <path d={icon} />
        </svg>
      </div>
      <div>
        <h2 className="text-gray-600 text-center font-bold font-ubuntu text-[40px]">
          <Counter n={value} suffix={suffix} suffixExt={suffixExt} />
        </h2>
        <p className="text-gray-500 text-center font-bold font-ubuntu text-[16px]">
          {label}
        </p>
      </div>
    </div>
  );
};

const ProjectCard = ({ name, description, video, source_code_link, link }) => {
  return (
    <div className="h-full flex">
      {" "}
      <div className="h-full flex flex-col bg-gradient-to-b from-[#F5FFFA]/0 to-[#f0fff0]/60 shadow-md rounded-xl overflow-hidden transition-transform duration-700 hover:-translate-y-3 w-full">
        <div className="relative w-full aspect-video">
          {" "}
          <video
            src={video}
            alt="project_image"
            className="w-full h-full object-cover opacity-90"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 flex justify-end p-3">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="green-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
              <img
                src={logo}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 flex-grow">
          {" "}
          <h3 className="text-gray-900 font-medium font-ubuntu text-[24px] mb-2">
            {name}
          </h3>
          <p className="text-gray-500 font-medium font-ubuntu text-[16px] mb-4 flex-grow">
            {description}
          </p>
          <div>
            <button
              onClick={() => window.open(link, "_blank")}
              className="text-gray-500 font-ubuntu transition duration-300 hover:text-[#00984a]">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmergencyBanner = () => {
  return (
    <div className="w-full h-[400px] mt-20 pt-20 relative">
      <video
        className="w-full h-full object-cover object-top absolute top-0 left-0"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 left-0 bg-[#00984a]/70" />
      <div
        className={`${styles.paddingX} absolute inset-0 flex flex-col justify-center items-center text-center text-white`}>
        <h1 className="text-[32px] font-ubuntu font-bold mb-4">
          Do you need Emergency Medical Care? <br />
          Call @ 10636
        </h1>
        <p className="text-[16px] font-medium mb-6">
          or 09666 787801. You can also reach us by the <br /> email:
          info@populardiagnostic.com
        </p>
        <div className="flex flex-row">
          <a
            href="tel:10636"
            className="bg-white text-[#00984a] border rounded m-2 p-3 hover:bg-[#00984a] hover:text-white transition duration-300">
            Call Now
          </a>
          <Link
            to="/hotlines"
            className="bg-transparent border border-white text-white rounded m-2 p-3 hover:bg-white hover:text-[#00984a] transition duration-300">
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
          `${BASE_URL}/api/branches?token=UCbuv3xIyFsMS9pycQzIiwdwaiS3izz4`
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
      icon: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zm53.5-96.7l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z",
      value: 10,
      label: "HAPPY PATIENTS",
      suffix: "M+",
      suffixExt: "/YR",
    },
    {
      icon: "M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z",
      value: 42,
      label: "YEARS EXPERIENCE",
      suffix: "+",
    },
  ];

  return (
    <div className="relative pt-20 fontFamily-ubuntu">
      <div className="overflow-hidden mt-[-140px] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 -mt-20">
          {healthPakage.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>

      <EmergencyBanner />
    </div>
  );
};

export default HomeContent;
