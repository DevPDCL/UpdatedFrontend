import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./tabs.css";
import "@fontsource/ubuntu";
import whatsapp from "../assets/whatsapp.png"
// import { FacebookProvider, CustomChat } from 'react-facebook';

const Sidemenu = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < window.innerHeight / 0.25); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);



  return (
    <>
      <div className="fixed z-20 hidden sm:block">
        <div>
          <Link to="/hotlines" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[300px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center rounded-t-xl p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Hotlines
                </span>
              </span>
            </div>
          </Link>

          <Link to="/complain" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[340px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center  p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM224 160c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H288v48c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V272H176c-8.8 0-16-7.2-16-16V224c0-8.8 7.2-16 16-16h48V160z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Complain Submission
                </span>
              </span>
            </div>
          </Link>
          <Link to="/patient_portal" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[380px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center  p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 384 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM160 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H224v48c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V352H112c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16h48V240z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Report Download
                </span>
              </span>
            </div>
          </Link>
          <Link to="/sample" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[420px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center  p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 64C0 46.3 14.3 32 32 32H88h48 56c17.7 0 32 14.3 32 32s-14.3 32-32 32V400c0 44.2-35.8 80-80 80s-80-35.8-80-80V96C14.3 96 0 81.7 0 64zM136 96H88V256h48V96zM288 64c0-17.7 14.3-32 32-32h56 48 56c17.7 0 32 14.3 32 32s-14.3 32-32 32V400c0 44.2-35.8 80-80 80s-80-35.8-80-80V96c-17.7 0-32-14.3-32-32zM424 96H376V256h48V96z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Home Sample Collection
                </span>
              </span>
            </div>
          </Link>
          <Link to="/" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[460px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center rounded-b-xl p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Video Consultancy
                </span>
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="fixed z-20  sm:hidden">
        <div>
          <Link to="/hotlines" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[120px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center rounded-t-xl p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Hotlines
                </span>
              </span>
            </div>
          </Link>

          <Link to="/complain" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[160px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center  p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM224 160c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H288v48c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V272H176c-8.8 0-16-7.2-16-16V224c0-8.8 7.2-16 16-16h48V160z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Complain Submission
                </span>
              </span>
            </div>
          </Link>
          <Link to="/patient_portal" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[200px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center  p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 384 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM160 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H224v48c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V352H112c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16h48V240z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Report Download
                </span>
              </span>
            </div>
          </Link>
          <Link to="/sample" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[240px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center  p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 64C0 46.3 14.3 32 32 32H88h48 56c17.7 0 32 14.3 32 32s-14.3 32-32 32V400c0 44.2-35.8 80-80 80s-80-35.8-80-80V96C14.3 96 0 81.7 0 64zM136 96H88V256h48V96zM288 64c0-17.7 14.3-32 32-32h56 48 56c17.7 0 32 14.3 32 32s-14.3 32-32 32V400c0 44.2-35.8 80-80 80s-80-35.8-80-80V96c-17.7 0-32-14.3-32-32zM424 96H376V256h48V96z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Home Sample Collection
                </span>
              </span>
            </div>
          </Link>
          <Link to="/" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[280px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center rounded-b-xl p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0"
              >
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Video Consultancy
                </span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidemenu;
