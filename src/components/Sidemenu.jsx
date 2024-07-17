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
      <div className="fixed z-20">
        <div>
          <Link to="/hotlines" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[300px] right-0 hover:cursor-pointer font-extrabold">
              <span
                className="inline-flex items-center rounded-t-xl p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0">
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg">
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
                tabIndex="0">
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg">
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
                tabIndex="0">
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 384 512"
                  xmlns="http://www.w3.org/2000/svg">
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
                tabIndex="0">
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg">
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
                className="inline-flex items-center  p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0">
                <svg
                  id=""
                  className="w-[20px] h-[20px] mr-2 fill-white"
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"></path>
                </svg>
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Video Consultancy
                </span>
              </span>
            </div>
          </Link>
          <Link to="https://wa.me/8801313032593?text=Hello How can I help you?" rel="noopener noreferrer">
            <div className="flex gap-2 fixed top-[500px] right-0 hover:cursor-pointer font-extrabold">
              <a href="https://wa.me/8801313032593?text=Hello How can I help you?" target="_blank">
               <span
                className="inline-flex items-center rounded-b-xl p-2 bg-[#00984a] text-white group transition-all duration-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
                role="alert"
                tabIndex="0">
                  <svg className="w-[20px] h-[20px] mr-2 fill-[#ffffff]" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">

                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>

                  </svg>
                
                 
                   
                 

               
                <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                  Whatsapp Chat with us
                </span>
              </span> </a>
            </div>
          </Link>
        </div>

        

        
      </div>
    </>
  );
};

export default Sidemenu;
